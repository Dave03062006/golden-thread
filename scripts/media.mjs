// Prepares the game's free music (spec §11.3, §13.11). For every track in
// src/music/catalog.ts it:
//   1. downloads the original once, into media/source/
//   2. evens out loudness, so no track is much louder than another (measured first, then
//      one steady change of volume, which keeps the music's own soft and loud passages)
//   3. compresses it to Opus (.webm) and AAC (.m4a, for older Safari) in media/music/
//
// Usage:
//   npm run media                 prepare every track (already prepared ones are skipped)
//   npm run media -- --force      prepare them all again
//   npm run media -- --cues=ID    list the moments where the music suddenly grows loud,
//                                 to find a cue (like Haydn's chord on "and there was light")
//
// media/ is git-ignored: the files are uploaded to the music host instead.

import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { TRACKS } from '../src/music/catalog.ts'

const args = process.argv.slice(2)
const force = args.includes('--force')
const cuesFor = args.find((a) => a.startsWith('--cues='))?.split('=')[1]

/** Wikimedia asks scripts to say who they are. */
const USER_AGENT = 'GoldenThreadGame/0.1 (a Bible game; media preparation script)'
/** Loudness target: comfortable background music, a little below typical streaming level. */
const TARGET_LUFS = -18

function run(command, commandArgs, { capture = 'stderr' } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { stdio: ['ignore', 'pipe', 'pipe'] })
    const chunks = []
    child[capture === 'stdout' ? 'stdout' : 'stderr'].on('data', (d) => chunks.push(d))
    if (capture === 'stdout') child.stderr.on('data', () => {})
    else child.stdout.on('data', () => {})
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve(Buffer.concat(chunks)) : reject(new Error(`${command} exited with ${code}: ${Buffer.concat(chunks).toString().slice(-400)}`))))
  })
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Downloads politely: a pause between files, and patience when the server asks for it. */
async function download(track, path) {
  if (existsSync(path) && !force) return
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(track.download, { headers: { 'User-Agent': USER_AGENT }, redirect: 'follow' })
    if (response.ok) {
      await writeFile(path, Buffer.from(await response.arrayBuffer()))
      await wait(2000)
      return
    }
    if (response.status !== 429 || attempt === 6) throw new Error(`${track.id}: download failed (${response.status})`)
    const seconds = Number(response.headers.get('retry-after')) || 15 * attempt
    console.log(`  the server asks to slow down; waiting ${seconds} s`)
    await wait(seconds * 1000)
  }
}

/** First pass: how loud the track is, so the second pass can bring it to the target in one steady step. */
async function measure(path) {
  const out = (await run('ffmpeg', ['-hide_banner', '-i', path, '-af', `loudnorm=I=${TARGET_LUFS}:TP=-1.5:LRA=20:print_format=json`, '-f', 'null', '-'])).toString()
  const json = JSON.parse(out.slice(out.lastIndexOf('{'), out.lastIndexOf('}') + 1))
  return json
}

async function encode(track, source) {
  const m = await measure(source)
  const loudnorm =
    `loudnorm=I=${TARGET_LUFS}:TP=-1.5:LRA=20:linear=true:` +
    `measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}`
  const filters = `${loudnorm},aresample=48000`
  await run('ffmpeg', ['-hide_banner', '-y', '-i', source, '-vn', '-af', filters, '-c:a', 'libopus', '-b:a', '80k', '-ac', '2', `media/music/${track.id}.webm`])
  await run('ffmpeg', ['-hide_banner', '-y', '-i', source, '-vn', '-af', filters, '-c:a', 'aac', '-b:a', '112k', '-ac', '2', `media/music/${track.id}.m4a`])
}

/** Loudness every 50 ms, then the moments where it jumps the most compared with the second before. */
async function findCues(track) {
  const source = `media/source/${track.id}.oga`
  const pcm = await run('ffmpeg', ['-hide_banner', '-i', source, '-ac', '1', '-ar', '8000', '-f', 'f32le', '-'], { capture: 'stdout' })
  const samples = new Float32Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.length / 4))
  const window = 400 // 50 ms at 8 kHz
  const rms = []
  for (let i = 0; i + window <= samples.length; i += window) {
    let sum = 0
    for (let j = i; j < i + window; j++) sum += samples[j] * samples[j]
    rms.push(Math.sqrt(sum / window))
  }
  const jumps = []
  for (let i = 20; i < rms.length - 4; i++) {
    const before = rms.slice(i - 20, i).reduce((a, b) => a + b, 0) / 20
    const after = rms.slice(i, i + 4).reduce((a, b) => a + b, 0) / 4
    jumps.push({ seconds: i * 0.05, ratio: after / Math.max(before, 1e-4) })
  }
  jumps.sort((a, b) => b.ratio - a.ratio)
  const picked = []
  for (const jump of jumps) {
    if (picked.every((p) => Math.abs(p.seconds - jump.seconds) > 3)) picked.push(jump)
    if (picked.length === 5) break
  }
  console.log(`Biggest swells in ${track.id}:`)
  for (const p of picked) console.log(`  ${p.seconds.toFixed(2)} s  (${p.ratio.toFixed(1)}× louder than the second before)`)
}

await mkdir('media/source', { recursive: true })
await mkdir('media/music', { recursive: true })

if (cuesFor) {
  const track = TRACKS.find((t) => t.id === cuesFor)
  if (!track) throw new Error(`No track ${cuesFor}`)
  await download(track, `media/source/${track.id}.oga`)
  await findCues(track)
} else {
  for (const track of TRACKS) {
    const source = `media/source/${track.id}.oga`
    const done = existsSync(`media/music/${track.id}.webm`) && existsSync(`media/music/${track.id}.m4a`)
    if (done && !force) continue
    await download(track, source)
    await encode(track, source)
    console.log(`prepared ${track.id}`)
  }
  console.log(`${TRACKS.length} tracks ready in media/music/.`)
}
