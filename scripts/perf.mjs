// Plays scenes in headless Edge with the processor slowed down (like a mid-range
// phone) and measures every frame. Fails if the game's own work goes over budget
// or frames are dropped (spec §10, rules 2 and 9).
//
// Usage (build first):
//   npm run build
//   npm run perf
//   npm run perf -- --slowdown=6      slow the processor down more (default 4)
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
 * A style switch may hold up one frame a little, the first time only (the browser sets up
 * the new fonts for real use). At 4× slower, this is about 25 ms on an ordinary laptop.
 */
const SWITCH_MAX_FRAME_MS = 100
const SECONDS = 10

const percentile = (values, p) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))] ?? 0
}

function summarize(samples) {
  const intervals = samples.map((s) => s.intervalMs).filter((ms) => ms > 0)
  const work = samples.map((s) => s.workMs)
  const typical = percentile(intervals, 0.5)
  const late = intervals.filter((ms) => ms > typical * 1.5).length
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
]

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
    await page.goto(screenUrl(server.url, { screen: 'scene', style: scenario.style, extra: '&perf' }))
    await waitForScene(page)
    await page.waitForTimeout(500)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: slowdown })
    await page.evaluate(() => window.__goldenThreadPerf.reset())

    if (scenario.switchAt) {
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
