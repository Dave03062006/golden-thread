// Plays scenes in headless Edge with the processor slowed down (like a mid-range
// phone) and measures every frame. Fails if the game's own work goes over budget
// or frames are dropped (spec §10, rules 2 and 9).
//
// Usage (build first):
//   npm run build
//   npm run perf
//   npm run perf -- --slowdown=6      slow the processor down more (default 4)
//   npm run perf -- --only=story      only the story scenes (or: demo, hub)
//   npm run perf -- --scenes=l01-e4   only the story scenes whose id starts with this
//
// The story runs start at each scene of Episode 1 and move on every two seconds, so
// lines change, transitions run and the interactions are played (Space is their
// one-button way to play). The hub runs open the cathedral, scrolling its nave from Age to
// Age, the world map with its threads flowing, and the window ceremony setting its panels.
//
// A JSON report is saved in the `perf/` folder, which git ignores.

import { mkdir, writeFile } from 'node:fs/promises'
import { STYLES, launchEdge, screenUrl, startPreview, waitForScene } from './lib/browser.mjs'

const args = process.argv.slice(2)
const slowdown = Number(args.find((a) => a.startsWith('--slowdown='))?.split('=')[1] ?? 4)

/** Our own work per frame must average under this, in milliseconds. */
const WORK_BUDGET_MS = 8
/** At most this share of frames may arrive late. */
const MAX_LATE_SHARE = 0.01
/**
 * A frame is late if a 60 Hz screen would have had to skip a refresh waiting for it.
 * (Headless Edge isn't tied to a real screen and runs much faster than 60 Hz, so
 * comparing against its own typical frame would count harmless 8 ms frames as late.)
 */
const LATE_MS = (1000 / 60) * 1.25
/**
 * A style switch may hold up one frame a little, the first time only (the browser sets up
 * the new fonts for real use). At 4× slower, this is about 25 ms on an ordinary laptop.
 */
const SWITCH_MAX_FRAME_MS = 100
const SECONDS = 10
const STORY_SECONDS = 8

/** Every scene of the finished episodes (src/content/levels/01-creation-and-fall/). */
const STORY_SCENES = [...Array.from({ length: 8 }, (_, i) => `l01-e1-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e2-s${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `l01-e3-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e4-s${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `l01-e5-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e6-s${i + 1}`)]
const only = args.find((a) => a.startsWith('--only='))?.split('=')[1]
const scenes = args.find((a) => a.startsWith('--scenes='))?.split('=')[1]

const percentile = (values, p) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))] ?? 0
}

function summarize(samples) {
  const intervals = samples.map((s) => s.intervalMs).filter((ms) => ms > 0)
  const work = samples.map((s) => s.workMs)
  const late = intervals.filter((ms) => ms > LATE_MS).length
  return {
    frames: samples.length,
    fps: Math.round(1000 / (intervals.reduce((a, b) => a + b, 0) / Math.max(1, intervals.length))),
    workAvgMs: +(work.reduce((a, b) => a + b, 0) / Math.max(1, work.length)).toFixed(2),
    workP95Ms: +percentile(work, 0.95).toFixed(2),
    workMaxMs: +Math.max(0, ...work).toFixed(2),
    lateFrames: late,
    lateShare: +(late / Math.max(1, intervals.length)).toFixed(4),
    longestFrameMs: +Math.max(0, ...intervals).toFixed(1),
  }
}

const scenarios = [
  ...STYLES.map((style) => ({ name: `demo scene · ${style}`, style, switchAt: null })),
  ...STYLES.map((style) => ({ name: `demo scene · switching from ${style}`, style, switchAt: SECONDS / 2 })),
  ...STORY_SCENES.flatMap((scene) => STYLES.map((style) => ({ name: `${scene} · ${style}`, style, scene, switchAt: null }))),
  ...['cathedral', 'map', 'ceremony'].flatMap((hub) => STYLES.map((style) => ({ name: `${hub} · ${style}`, style, hub, switchAt: null }))),
]
  .filter((s) => !only || (only === 'story' ? s.scene : only === 'hub' ? s.hub : !s.scene && !s.hub))
  .filter((s) => !scenes || s.scene?.startsWith(scenes))

await mkdir('perf', { recursive: true })
const server = await startPreview()
const browser = await launchEdge()
const report = { slowdown, workBudgetMs: WORK_BUDGET_MS, results: [] }
let failed = false

try {
  for (const scenario of scenarios) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
    const page = await context.newPage()
    const cdp = await context.newCDPSession(page)
    const screen = scenario.hub ?? (scenario.scene ? 'story' : 'scene')
    await page.goto(screenUrl(server.url, { screen, style: scenario.style, extra: `&perf${scenario.scene ? `&scene=${scenario.scene}` : ''}` }))
    if (scenario.hub) await page.waitForTimeout(1500)
    else await waitForScene(page)
    if (scenario.scene) {
      const begin = page.getByRole('button', { name: 'Begin', exact: true })
      if (await begin.count()) await begin.click()
      // The story's first line, or an interaction if the scene opens with one.
      await page.locator('section.story-panel, .play-layer').first().waitFor()
    }
    await page.waitForTimeout(500)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: slowdown })
    await page.evaluate(() => window.__goldenThreadPerf.reset())

    if (scenario.hub === 'cathedral') {
      // Along the nave and back, an Age at a time.
      for (const age of ['III', 'VI', 'IX', 'XII', 'XIV', 'VII', 'I']) {
        await page.getByRole('navigation', { name: 'The Ages' }).getByRole('button', { name: age, exact: true }).click()
        await page.waitForTimeout(1400)
      }
    } else if (scenario.hub) {
      await page.waitForTimeout(SECONDS * 1000)
    } else if (scenario.scene) {
      for (let t = 0; t < STORY_SECONDS; t += 2) {
        await page.waitForTimeout(2000)
        await page.keyboard.press('Space')
      }
    } else if (scenario.switchAt) {
      await page.waitForTimeout(scenario.switchAt * 1000)
      await page.getByRole('button', { name: /^Switch to/ }).click()
      await page.waitForTimeout((SECONDS - scenario.switchAt) * 1000)
    } else {
      await page.waitForTimeout(SECONDS * 1000)
    }

    const samples = await page.evaluate(() => window.__goldenThreadPerf.samples)
    const result = { scenario: scenario.name, ...summarize(samples) }
    result.pass =
      result.workAvgMs <= WORK_BUDGET_MS &&
      result.lateShare <= MAX_LATE_SHARE &&
      (scenario.switchAt === null || result.longestFrameMs <= SWITCH_MAX_FRAME_MS)
    if (!result.pass) failed = true
    report.results.push(result)
    await context.close()
  }
} finally {
  await browser.close()
  await server.close()
}

console.table(
  report.results.map((r) => ({
    scenario: r.scenario,
    fps: r.fps,
    'work avg ms': r.workAvgMs,
    'work p95 ms': r.workP95Ms,
    'work max ms': r.workMaxMs,
    'late frames': `${r.lateFrames} (${(r.lateShare * 100).toFixed(1)}%)`,
    'longest frame ms': r.longestFrameMs,
    pass: r.pass ? 'yes' : 'NO',
  })),
)
await writeFile('perf/report.json', JSON.stringify(report, null, 2))
console.log(
  `Processor slowed ${slowdown}×. Budget: ${WORK_BUDGET_MS} ms of work per frame on average, at most ` +
    `${MAX_LATE_SHARE * 100}% of frames late, and no frame over ${SWITCH_MAX_FRAME_MS} ms during a style switch.`,
)
if (failed) {
  console.error('Over budget.')
  process.exit(1)
}
