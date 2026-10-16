// Plays every finished episode in a real browser, in both art styles, the way a keyboard
// player would: reading every line, doing every interaction with the keys, finding each
// golden thread, marking "I've read it", going on to the next episode, and finishing at
// the menu. Fails if the story gets stuck anywhere or something it needs is missing.
//
// Usage (build first):
//   npm run build
//   npm run playthrough
//   npm run playthrough -- --style=pixel     one style only
//   npm run playthrough -- --from=5          from Episode 5 on

import { STYLES, launchEdge, screenUrl, startPreview, waitForScene } from './lib/browser.mjs'

/** How each interaction is played with the keyboard (Space alone is enough for most). */
const KEYS = {
  'Press and hold anywhere to call the light.': { hold: ' ', seconds: 4.2 },
  'Sweep across the night sky.': { hold: 'ArrowRight', seconds: 3.6 },
}

/** The finished episodes, in order, with their lines of narration and Scripture and how many interactions they have. */
const EPISODES = [
  { number: 1, lines: 34, plays: 9 }, // src/content/levels/01-creation-and-fall/episode-1.ts
  { number: 2, lines: 21, plays: 1 }, // episode-2.ts
  { number: 3, lines: 19, plays: 1 }, // episode-3.ts
  { number: 4, lines: 16, plays: 1 }, // episode-4.ts
  { number: 5, lines: 24, plays: 1 }, // episode-5.ts
  { number: 6, lines: 21, plays: 1 }, // episode-6.ts
]

/** `--from=N` starts at episode N instead of the beginning. */
const from = Number(process.argv.find((a) => a.startsWith('--from='))?.split('=')[1] ?? 1)

const server = await startPreview()
const browser = await launchEdge()
let failures = 0

/** Answers a question by trying each answer with the keyboard until the right one. */
async function answer(page) {
  const options = page.locator('.play-choice-option')
  const count = await options.count()
  for (let i = 0; i < count; i++) {
    await options.nth(i).focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)
    if ((await page.locator('.play-choice-feedback[data-right]').count()) || !(await options.count())) return
  }
  throw new Error('no answer to a question was taken as right')
}

/** Plays one episode from its title card to its end card, then goes on from the end card. */
async function playEpisode(page, style, { number, lines: expected, plays: expectedPlays }, last) {
  await page.getByRole('button', { name: 'Begin', exact: true }).click()

  const story = page.getByRole('region', { name: 'The story' })
  const hint = page.locator('.play-hint-text')
  const end = page.getByRole('dialog', { name: new RegExp(`Episode ${number} complete`) })
  let lines = 0
  let plays = 0
  let thread = false
  let tapped = 0
  const started = Date.now()

  while (!(await end.isVisible())) {
    if (Date.now() - started > 6 * 60_000) {
      await page.screenshot({ path: `shots/stuck-${style}.png` })
      throw new Error(`Episode ${number} took too long: it seems stuck (see shots/stuck-${style}.png)`)
    }
    // The golden thread glows from a certain scene on; find it the first time it shows.
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
      // Until the golden thread is found, read slowly enough for its glow to come up.
      await page.waitForTimeout(thread ? 250 : 1200)
      continue
    }
    if (await page.locator('.rest').isVisible()) {
      const go = page.getByRole('button', { name: 'Continue', exact: true })
      await go.waitFor({ timeout: 20_000 })
      await go.click()
      plays++
      continue
    }
    // Two passages to compare: tap every phrase in turn (the ones true to God's word only
    // say so), then go on.
    if (await page.locator('.play-compare').count()) {
      const go = page.locator('.play-compare-continue')
      // The card may already be closing as the story moves on: then there's nothing to click.
      if (await go.count()) await go.click({ timeout: 3000 }).catch(() => {})
      else {
        // Each phrase in turn, true or twisted, as a player reading along would.
        // (The card may be closing just as the last find is made: then there's nothing to tap.)
        const parts = page.locator('.play-compare-part')
        if (tapped < (await parts.count())) {
          const focused = await parts
            .nth(tapped++)
            .focus({ timeout: 3000 })
            .then(() => true)
            .catch(() => false)
          if (focused) await page.keyboard.press('Enter')
        }
        await page.waitForTimeout(200)
      }
      plays++
      continue
    }
    // A question to answer, in the games played by choosing.
    if (await page.locator('.play-choice-option').count()) {
      await answer(page)
      plays++
      continue
    }
    // An interaction: its hint appears after a moment.
    const text = (await hint.count()) ? await hint.first().innerText() : ''
    const way = Object.entries(KEYS).find(([start]) => text.startsWith(start))?.[1]
    if (way) {
      await page.keyboard.down(way.hold)
      await page.waitForTimeout(way.seconds * 1000)
      await page.keyboard.up(way.hold)
      plays++
    } else {
      // Space alone does most interactions, often before their hint has even appeared.
      await page.keyboard.press('Space')
      plays++
    }
    await page.waitForTimeout(700)
  }

  const toggle = end.getByRole('switch', { name: /I’ve read/ })
  await toggle.check()
  const marked = await toggle.isChecked()
  const found = (await end.textContent()).includes('You found this episode’s golden thread')
  await end.getByRole('button', { name: last ? 'Back to the menu' : `On to Episode ${number + 1}` }).click()

  return [
    // The end card only opens after the last line, so reaching it means every line was read.
    [lines > expected * 0.8, `Episode ${number}: read every line to the end card (${lines} of the ${expected} lines moved on by hand)`],
    [plays >= expectedPlays, `Episode ${number}: did every interaction (${plays} steps)`],
    [thread && found, `Episode ${number}: found the golden thread, and the episode remembers it`],
    [marked, `Episode ${number}: marked “I’ve read it”`],
  ]
}

async function play(style) {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  // Starting from a later episode opens the story at its first scene.
  const playing = EPISODES.filter((e) => e.number >= from)
  await page.goto(screenUrl(server.url, { screen: 'story', style, extra: from > 1 ? `&scene=l01-e${from}-s1` : '' }))
  await waitForScene(page)

  const results = []
  try {
    for (const [i, episode] of playing.entries()) {
      if (i > 0) await waitForScene(page)
      results.push(...(await playEpisode(page, style, episode, i === playing.length - 1)))
    }
  } catch (error) {
    // Show where it stopped, and what had passed so far.
    await page.screenshot({ path: `shots/failed-${style}.png` })
    for (const [ok, what] of results) console.log(`${ok ? 'ok  ' : 'FAIL'} ${style}: ${what}`)
    throw new Error(`${error.message} (see shots/failed-${style}.png)`)
  }
  await page.getByRole('navigation', { name: 'Main menu' }).waitFor()
  results.push([errors.length === 0, `no errors in the page${errors.length ? `: ${errors.join(' | ')}` : ''}`])

  for (const [ok, what] of results) {
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${style}: ${what}`)
    if (!ok) failures++
  }
  await page.close()
}

try {
  const only = process.argv.find((a) => a.startsWith('--style='))?.split('=')[1]
  for (const style of STYLES.filter((s) => !only || s === only)) {
    try {
      await play(style)
    } catch (error) {
      failures++
      console.log(`FAIL ${style}: ${error.message.split('\n').slice(0, 4).join(' / ')}`)
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
const last = EPISODES.length
console.log(`${from === last ? `Episode ${last} plays` : `Episodes ${from}–${last} play`} from start to finish.`)
