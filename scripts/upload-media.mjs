// Uploads the prepared music (media/music/, made by `npm run media`) to the game's music
// host, a Cloudflare R2 bucket, using Cloudflare's own command-line tool, Wrangler. Only
// files that are new or have changed since the last upload are sent.
//
// Before the first upload (once): follow docs/hosting-music.md, then sign in with
//   npx wrangler login
//
// Usage:
//   npm run media:upload                  upload what's new or changed
//   npm run media:upload -- --dry-run     only list what would be uploaded
//   npm run media:upload -- --all         upload everything again
//
// The bucket's name comes from R2_BUCKET (in .env.local, or the shell), and defaults to
// golden-thread-media.

import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const all = args.includes('--all')

/** R2_BUCKET from the shell, or from .env.local (which git ignores). */
function bucketName() {
  if (process.env.R2_BUCKET) return process.env.R2_BUCKET
  if (existsSync('.env.local')) {
    const line = readFileSync('.env.local', 'utf8')
      .split(/\r?\n/)
      .find((l) => l.startsWith('R2_BUCKET='))
    if (line) return line.slice('R2_BUCKET='.length).trim()
  }
  return 'golden-thread-media'
}

const BUCKET = bucketName()
const FOLDER = 'media/music'
/** What was uploaded last time, by file name: its content hash. Kept beside the files (git-ignored). */
const RECORD = 'media/uploaded.json'

const TYPES = { webm: 'audio/webm', m4a: 'audio/mp4' }
/** The files never change under the same name once uploaded, so browsers may keep them a long time. */
const CACHE = 'public, max-age=2592000'

function run(command, commandArgs) {
  return new Promise((resolve, reject) => {
    // On Windows, npx is a .cmd file, which needs a shell to run.
    const child = spawn(command, commandArgs, { stdio: 'inherit', shell: process.platform === 'win32' })
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${command} ${commandArgs.join(' ')} failed (${code})`))))
  })
}

const hash = async (path) => createHash('sha256').update(await readFile(path)).digest('hex')

if (!existsSync(FOLDER)) {
  console.error(`No ${FOLDER}/ folder yet. Run "npm run media" first.`)
  process.exit(1)
}

const record = existsSync(RECORD) ? JSON.parse(await readFile(RECORD, 'utf8')) : {}
const files = (await readdir(FOLDER)).filter((f) => /\.(webm|m4a)$/.test(f)).sort()
const changed = []
for (const file of files) {
  const digest = await hash(`${FOLDER}/${file}`)
  if (all || record[file] !== digest) changed.push({ file, digest })
}

console.log(`Bucket: ${BUCKET}. ${files.length} music files, ${changed.length} to upload.`)
let bytes = 0
for (const { file, digest } of changed) {
  const size = (await stat(`${FOLDER}/${file}`)).size
  bytes += size
  const type = TYPES[file.split('.').pop()]
  console.log(`${dryRun ? 'would upload' : 'uploading'} music/${file} (${(size / 1024).toFixed(0)} KB)`)
  if (dryRun) continue
  await run('npx', ['wrangler', 'r2', 'object', 'put', `${BUCKET}/music/${file}`, '--file', `${FOLDER}/${file}`, '--content-type', type, '--cache-control', `"${CACHE}"`, '--remote'])
  record[file] = digest
  // Saved after each file, so an interrupted upload picks up where it stopped.
  await writeFile(RECORD, JSON.stringify(record, null, 2))
}
console.log(`${dryRun ? 'Would upload' : 'Uploaded'} ${(bytes / 1024 / 1024).toFixed(1)} MB.`)
