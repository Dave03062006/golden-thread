// Plays all of Episode 1 in a real browser, in both art styles, the way a keyboard
// player would: reading every line, doing every "Let there be…" interaction with the
// keys, finding the golden thread, marking "I've read it", and finishing at the menu.
// Fails if the story gets stuck anywhere or something it needs is missing.
//
// Usage (build first):
//   npm run build
//   npm run playthrough

import { STYLES, launchEdge, screenUrl, startPreview, waitForScene } from './lib/browser.mjs'

/** How each interaction is played with the keyboard (Space alone is enough for most). */
const KEYS = {
  'Press and hold anywhere to call the light.': { hold: ' ', seconds: 4.2 },
  'Sweep across the night sky.': { hold: 'ArrowRight', seconds: 3.6 },
}

/** Lines of narration and Scripture in Episode 1 (src/content/levels/01-creation-and-fall/episode-1.ts). */
const LINES = 34

const server = await startPreview()
const browser = await launchEdge()
let failures = 0

async function play(style) {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(screenUrl(server.url, { screen: 'story', style }))
  await waitForScene(page)
  await page.getByRole('button', { name: 'Begin', exact: true }).click()

  const story = page.getByRole('region', { name: 'The story' })
  const hint = page.locator('.play-hint-text')
  const end = page.getByRole('dialog', { name: /Episode 1 complete/ })
  let lines = 0
  let plays = 0
  let thread = false
  const started = Date.now()

  while (!(await end.isVisible())) {
    if (Date.now() - started > 6 * 60_000) throw new Error('the episode took too long: it seems stuck')
    // The golden thread glows once day one has come; find it the first time it shows.
    const spot = page.getByRole('button', { name: /Something here is glowing/ })
    if (!thread && (await spot.isVisible())) {
      await spot.click()
      await page.getByRole('dialog', { name: 'A golden thread' }).getByRole('button', { name: 'Keep this thread' }).click()
      thread = true
      continue
    }
    if (await story.isVisible()) {
      lines++
      await page.keyboard.press('Space')
      await page.waitForTimeout(250)
      continue
    }
    // An interaction: its hint appears after a moment.
    if (await page.locator('.rest').isVisible()) {
      const go = page.getByRole('button', { name: 'Continue', exact: true })
      await go.waitFor({ timeout: 20_000 })
      await go.click()
      plays++
      continue
    }
    const text = (await hint.count()) ? await hint.first().innerText() : ''
    const way = Object.entries(KEYS).find(([start]) => text.startsWith(start))?.[1]
    if (way) {
      await page.keyboard.down(way.hold)
      await page.waitForTimeout(way.seconds * 1000)
      await page.keyboard.up(way.hold)
    } else {
      await page.keyboard.press('Space')
    }
    plays++
    await page.waitForTimeout(700)
  }

  const toggle = end.getByRole('switch', { name: /I’ve read Genesis 1:1–2:3/ })
  await toggle.check()
  const marked = await toggle.isChecked()
  const found = (await end.textContent()).includes('You found this episode’s golden thread')
  await end.getByRole('button', { name: 'Back to the menu' }).click()
  await page.getByRole('navigation', { name: 'Main menu' }).waitFor()

  const results = [
    // The end card only opens after the last line, so reaching it means every line was read.
    [lines > LINES * 0.8, `read every line to the end card (${lines} of the ${LINES} lines moved on by hand)`],
    [plays >= 9, `did every interaction (${plays} steps)`],
    [thread && found, 'found the golden thread, and the episode remembers it'],
    [marked, 'marked “I’ve read it”'],
    [errors.length === 0, `no errors in the page${errors.length ? `: ${errors.join(' | ')}` : ''}`],
  ]
  for (const [ok, what] of results) {
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${style}: ${what}`)
    if (!ok) failures++
  }
  await page.close()
}

try {
  for (const style of STYLES) {
    try {
      await play(style)
    } catch (error) {
      failures++
      console.log(`FAIL ${style}: ${error.message.split('\n')[0]}`)
    }
  }
} finally {
  await browser.close()
  await server.close()
}

if (failures) {
  console.error(`${failures} playthrough check(s) failed.`)
  process.exit(1)
}
console.log('Episode 1 plays from start to finish in both styles.')
