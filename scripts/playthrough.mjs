// Plays every finished episode in a real browser, in both art styles, the way a keyboard
// player would: reading every line, doing every interaction with the keys, finding each
// golden thread, marking "I've read it", going on to the next episode, then the level's
// end (the quiz, reflection and prayer, the ceremony), and finishing at the menu. Fails
// if the story gets stuck anywhere or something it needs is missing.
//
// Usage (build first):
//   npm run build
//   npm run playthrough
//   npm run playthrough -- --style=pixel     one style only
//   npm run playthrough -- --level=2         one level only
//   npm run playthrough -- --from=5          from Episode 5 on (of the first level played)

import { STYLES, launchEdge, screenUrl, startPreview, waitForScene } from './lib/browser.mjs'

/** How each interaction is played with the keyboard (Space alone is enough for most). */
const KEYS = {
  'Press and hold anywhere to call the light.': { hold: ' ', seconds: 4.2 },
  'Sweep across the night sky.': { hold: 'ArrowRight', seconds: 3.6 },
  'Hold to walk with Noah': { hold: ' ', seconds: 15 },
  // Each hold draws a jar and carries it; the next one pours it (repeated while the hint shows).
  'Hold to draw water': { hold: ' ', seconds: 1.6 },
  // Held right through the night: when the grip slips, Jacob catches hold again.
  'Hold on through the night.': { hold: ' ', seconds: 32 },
  // Each hold fills a sack; the next press loads it (repeated while the hint shows).
  'Hold to fill the sack': { hold: ' ', seconds: 1.4 },
}

/**
 * The levels to play, each with its finished episodes in order: their lines of narration
 * and Scripture, and how many interactions they have. A level still being made ends at
 * its last built episode, which leads back to the menu.
 */
const LEVELS = [
  {
    number: 1,
    complete: true,
    episodes: [
      { number: 1, lines: 34, plays: 9 }, // src/content/levels/01-creation-and-fall/episode-1.ts
      { number: 2, lines: 21, plays: 1 }, // episode-2.ts
      { number: 3, lines: 19, plays: 1 }, // episode-3.ts
      { number: 4, lines: 16, plays: 1 }, // episode-4.ts
      { number: 5, lines: 24, plays: 1 }, // episode-5.ts
      { number: 6, lines: 21, plays: 1 }, // episode-6.ts
    ],
  },
  {
    number: 2,
    complete: true,
    episodes: [
      { number: 1, lines: 16, plays: 1 }, // src/content/levels/02-noah-and-the-nations/episode-1.ts
      { number: 2, lines: 18, plays: 1 }, // episode-2.ts
      { number: 3, lines: 14, plays: 1 }, // episode-3.ts
      { number: 4, lines: 14, plays: 3 }, // episode-4.ts
      { number: 5, lines: 19, plays: 1 }, // episode-5.ts
      { number: 6, lines: 16, plays: 2 }, // episode-6.ts
      { number: 7, lines: 14, plays: 1 }, // episode-7.ts
    ],
  },
  {
    number: 3,
    complete: true,
    episodes: [
      { number: 1, lines: 11, plays: 1 }, // src/content/levels/03-abraham-father-of-faith/episode-1.ts
      { number: 2, lines: 14, plays: 1 }, // episode-2.ts
      { number: 3, lines: 12, plays: 1 }, // episode-3.ts
      { number: 4, lines: 11, plays: 1 }, // episode-4.ts
      { number: 5, lines: 14, plays: 1 }, // episode-5.ts
      { number: 6, lines: 13, plays: 1 }, // episode-6.ts
      { number: 7, lines: 8, plays: 1 }, // episode-7.ts (a line can be passed by the Space pressed for its play)
      { number: 8, lines: 13, plays: 1 }, // episode-8.ts
      { number: 9, lines: 7, plays: 1 }, // episode-9.ts
      { number: 10, lines: 18, plays: 1 }, // episode-10.ts
    ],
  },
  {
    number: 4,
    complete: true,
    episodes: [
      { number: 1, lines: 14, plays: 1 }, // src/content/levels/04-isaac-and-jacob/episode-1.ts
      { number: 2, lines: 14, plays: 1 }, // episode-2.ts
      { number: 3, lines: 14, plays: 1 }, // episode-3.ts
      { number: 4, lines: 13, plays: 1 }, // episode-4.ts
      { number: 5, lines: 19, plays: 1 }, // episode-5.ts
      { number: 6, lines: 17, plays: 1 }, // episode-6.ts
      { number: 7, lines: 20, plays: 1 }, // episode-7.ts
    ],
  },
  {
    number: 5,
    complete: true,
    episodes: [
      { number: 1, lines: 18, plays: 1 }, // src/content/levels/05-joseph-and-his-brothers/episode-1.ts
      { number: 2, lines: 16, plays: 1 }, // episode-2.ts
      { number: 3, lines: 20, plays: 1 }, // episode-3.ts
      { number: 4, lines: 15, plays: 1 }, // episode-4.ts
      { number: 5, lines: 12, plays: 1 }, // episode-5.ts
      { number: 6, lines: 15, plays: 1 }, // episode-6.ts
      { number: 7, lines: 19, plays: 1 }, // episode-7.ts
    ],
  },
  {
    number: 6,
    complete: true,
    episodes: [
      { number: 1, lines: 19, plays: 1 }, // src/content/levels/06-job/episode-1.ts
      { number: 2, lines: 10, plays: 1 }, // episode-2.ts
      { number: 3, lines: 9, plays: 1 }, // episode-3.ts
      { number: 4, lines: 9, plays: 1 }, // episode-4.ts
      { number: 5, lines: 12, plays: 1 }, // episode-5.ts
      { number: 6, lines: 10, plays: 1 }, // episode-6.ts
    ],
  },
]

const value = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
/** `--level=N` plays one level; `--from=N` starts at its episode N instead of the beginning. */
const onlyLevel = value('level') ? Number(value('level')) : null
const from = Number(value('from') ?? 1)
const PLAYED = LEVELS.filter((l) => onlyLevel === null || l.number === onlyLevel)
const code = (n) => `l${String(n).padStart(2, '0')}`

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

/** Plays one episode from its title card to its end card, then goes on from the end card with `next`. */
async function playEpisode(page, style, { number, lines: expected, plays: expectedPlays }, next) {
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

  const label = `Level ${page.level} · Episode`
  // One switch for each passage the episode sends the reader to.
  const toggles = await end.getByRole('switch', { name: /I’ve read/ }).all()
  for (const toggle of toggles) await toggle.check()
  const marked = toggles.length > 0 && (await Promise.all(toggles.map((t) => t.isChecked()))).every(Boolean)
  const found = (await end.textContent()).includes('You found this episode’s golden thread')
  await end.getByRole('button', { name: next }).click()

  return [
    // The end card only opens after the last line, so reaching it means every line was read.
    [lines > expected * 0.8, `${label} ${number}: read every line to the end card (${lines} of the ${expected} lines moved on by hand)`],
    [plays >= expectedPlays, `${label} ${number}: did every interaction (${plays} steps)`],
    [thread && found, `${label} ${number}: found the golden thread, and the episode remembers it`],
    [marked, `${label} ${number}: marked “I’ve read it”`],
  ]
}

/** What the player writes in each level's reflection, different each time so the journal can tell them apart. */
const REFLECTIONS = { 1: 'I want to stop hiding, and walk with God.', 2: 'Help me trust you when I cannot see, like Noah.', 3: 'Lord, help me go where you call me, even when I cannot see the way.', 4: 'Help me make peace with my brother, and hold on to you in prayer.', 5: 'Help me forgive, and trust that you can bring good out of what is hard.', 6: 'Lord, help me tell you the truth when I am sad, and keep holding on to you.' }

/**
 * The end of a finished level (spec §3.3): the quiz (each question answered as it comes,
 * right or not), its review, reflection and prayer with a few words for the journal, the
 * window ceremony setting the panels of the episodes played, the cathedral showing them,
 * "Step inside" replaying the last episode (and leaving it again from the pause menu),
 * and the journal keeping what was written.
 */
async function levelEnd(page, level, played) {
  const LAST = level.episodes.at(-1).number
  const REFLECTION = REFLECTIONS[level.number]
  let answered = 0
  const results = page.locator('.quiz-results')
  while (!(await results.isVisible())) {
    await page.locator('.quiz-card').waitFor()
    const check = page.getByRole('button', { name: /^(Check|Choose \d)$/ })
    if (await page.locator('.quiz-where').count()) {
      const need = (await page.getByRole('button', { name: /Choose 2/ }).count()) ? 2 : 1
      for (let c = 0; c < need; c++) await page.locator('.map-choice').nth(c).click()
      await check.click()
    } else if (await page.locator('.quiz-finish').count()) {
      for (const group of await page.locator('.quiz-words').all()) await group.locator('.quiz-option').first().click()
      await check.click()
    } else if (await page.locator('.quiz-order').count()) await check.click()
    else await page.locator('.quiz-option').first().click()
    await page.locator('.quiz-next').click()
    answered++
    await page.waitForTimeout(150)
  }
  await page.getByRole('button', { name: 'Review your answers' }).click()
  const reviewed = await page.locator('.quiz-review-list > li').count()
  await page.getByRole('button', { name: 'Back to your score' }).click()
  await page.getByRole('button', { name: 'On to reflection and prayer' }).click()
  await page.getByRole('textbox').fill(REFLECTION)
  await page.getByText('Saved to your journal.').waitFor()
  await page.getByRole('button', { name: 'Amen' }).click()
  await page.getByText(`Level ${level.number} complete`).waitFor()
  // The ceremony sets the window's panels one by one.
  await page.getByText('Its window in the cathedral is complete.').waitFor({ timeout: 60_000 })
  await page.getByRole('button', { name: 'Visit the cathedral' }).click()
  const nave = page.getByRole('region', { name: 'The nave of the cathedral' })
  await nave.waitFor()
  const panels = await nave.getByRole('button', { name: new RegExp(`^Level ${level.number}, episode \\d+, .*: set$`) }).count()
  // Step inside the last panel: its episode plays again, from its title card.
  await nave.getByRole('button', { name: new RegExp(`^Level ${level.number}, episode ${LAST}, `) }).click()
  await page.getByRole('button', { name: 'Step inside' }).click()
  await waitForScene(page)
  const replayed = await page
    .getByRole('button', { name: 'Begin', exact: true })
    .waitFor({ timeout: 10_000 })
    .then(
      () => true,
      () => false,
    )
  if (replayed) await page.getByRole('button', { name: 'Begin', exact: true }).click()
  await page.getByRole('button', { name: 'Pause' }).click()
  await page.getByRole('button', { name: 'Back to the cathedral' }).click()
  await page.getByRole('heading', { name: 'The Cathedral' }).waitFor()
  await page.getByRole('button', { name: 'Back', exact: true }).click()
  await page.getByRole('navigation', { name: 'Main menu' }).getByRole('button', { name: 'Journal' }).click()
  const kept = await page
    .getByText(REFLECTION)
    .waitFor({ timeout: 10_000 })
    .then(
      () => true,
      () => false,
    )
  await page.getByRole('button', { name: 'Back' }).click()
  return [
    [answered === 10, `Level ${level.number} quiz: answered all ten questions (${answered})`],
    [reviewed === 10, `Level ${level.number} quiz: "Review your answers" shows the run (${reviewed} answers)`],
    [panels === played, `Window ceremony: the panels of the ${played} episodes played are set (${panels})`],
    [replayed, `Cathedral: "Step inside" plays Episode ${LAST} again`],
    [kept, `Level ${level.number} reflection: what was written is kept in the journal`],
  ]
}

async function play(style) {
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  // Starting from a later level or episode opens the story at its first scene.
  const first = PLAYED[0]
  const startAt = onlyLevel || from > 1 ? `&scene=${code(first.number)}-e${from}-s1` : ''
  await page.goto(screenUrl(server.url, { screen: 'story', style, extra: startAt }))
  await waitForScene(page)

  const results = []
  try {
    for (const [l, level] of PLAYED.entries()) {
      page.level = level.number
      if (l > 0) {
        // The next level goes on from the menu, where Continue now leads to it.
        await page.getByRole('navigation', { name: 'Main menu' }).getByRole('button', { name: 'Continue' }).click()
        await waitForScene(page)
      }
      const playing = level.episodes.filter((e) => l > 0 || e.number >= from)
      for (const [i, episode] of playing.entries()) {
        if (i > 0) await waitForScene(page)
        const last = i === playing.length - 1
        // After a finished level's last episode comes its end: the quiz first.
        const next = !last ? `On to Episode ${episode.number + 1}` : level.complete ? 'On to the quiz' : 'Back to the menu'
        results.push(...(await playEpisode(page, style, episode, next)))
      }
      if (level.complete && playing.at(-1)?.number === level.episodes.at(-1).number) results.push(...(await levelEnd(page, level, playing.length)))
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
console.log(`${PLAYED.map((l) => `Level ${l.number}${l.complete ? '' : ' (so far)'}`).join(' and ')} play${PLAYED.length > 1 ? '' : 's'} from start to finish.`)
