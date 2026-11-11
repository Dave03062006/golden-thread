// Uploads the prepared music (media/music/, made by `npm run media`) and the recorded narration (media/voice/, made by scripts/narrate.py) to the game's music
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
/** The recorded narration (scripts/narrate.py), uploaded beside the music once it has been made. */
const VOICE = 'media/voice'
/** What was uploaded last time, by file name: its content hash. Kept beside the files (git-ignored). */
const RECORD = 'media/uploaded.json'

const TYPES = { webm: 'audio/webm', m4a: 'audio/mp4', mp3: 'audio/mpeg' }
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
// Music is recorded by file name (as before), narration as voice/name.
const files = [
  ...(await readdir(FOLDER)).filter((f) => /\.(webm|m4a)$/.test(f)).sort().map((file) => ({ dir: 'music', folder: FOLDER, file, key: file })),
  ...(existsSync(VOICE) ? (await readdir(VOICE)).filter((f) => f.endsWith('.mp3')).sort().map((file) => ({ dir: 'voice', folder: VOICE, file, key: `voice/${file}` })) : []),
]
const changed = []
for (const entry of files) {
  const digest = await hash(`${entry.folder}/${entry.file}`)
  if (all || record[entry.key] !== digest) changed.push({ ...entry, digest })
}

console.log(`Bucket: ${BUCKET}. ${files.length} music and narration files, ${changed.length} to upload.`)
let bytes = 0
for (const { dir, folder, file, key, digest } of changed) {
  const size = (await stat(`${folder}/${file}`)).size
  bytes += size
  const type = TYPES[file.split('.').pop()]
  console.log(`${dryRun ? 'would upload' : 'uploading'} ${dir}/${file} (${(size / 1024).toFixed(0)} KB)`)
  if (dryRun) continue
  await run('npx', ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${dir}/${file}`, '--file', `${folder}/${file}`, '--content-type', type, '--cache-control', `"${CACHE}"`, '--remote'])
  record[key] = digest
  // Saved after each file, so an interrupted upload picks up where it stopped.
  await writeFile(RECORD, JSON.stringify(record, null, 2))
}
console.log(`${dryRun ? 'Would upload' : 'Uploaded'} ${(bytes / 1024 / 1024).toFixed(1)} MB.`)
