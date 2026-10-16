// Runs automated accessibility checks (axe) on every screen in both art styles.
// Fails if anything is found.
//
// Usage (build first):
//   npm run build
//   npm run a11y

import AxeBuilder from '@axe-core/playwright'
import { STYLES, launchEdge, screenUrl, startPreview, waitForFonts } from './lib/browser.mjs'

const SCREENS = ['title', 'menu', 'settings', 'scene', 'music', 'credits']

/** The Music Library in its worship modes, set up before the page loads. */
const MUSIC_STATES = [
  { name: 'music · your own songs', settings: { musicMode: 'worship', worshipWay: 'files' } },
  { name: 'music · listening along', settings: { musicMode: 'worship', worshipWay: 'listen-along', musicApp: 'spotify' } },
]

/**
 * The story is checked in several states: its title card, a line of narration, and each
 * of the cards that open over it.
 */
const STORY_STATES = [
  { name: 'story · title card', scene: 'l01-e1-s1' },
  { name: 'story · narration', scene: 'l01-e1-s2', begin: true },
  { name: 'story · paused', scene: 'l01-e1-s2', begin: true, open: 'Pause' },
  { name: 'story · where and when', scene: 'l01-e1-s2', begin: true, open: 'Where & when' },
  { name: 'story · history', scene: 'l01-e1-s3', begin: true, open: 'History' },
  { name: 'story · golden thread', scene: 'l01-e1-s3', begin: true, thread: true },
  // Three lines in, the animals come to be named: a question with answers to choose.
  { name: 'story · naming question', scene: 'l01-e2-s4', begin: true, lines: 3, choice: true },
]

async function check(page, label) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
  if (results.violations.length === 0) {
    console.log(`ok   ${label}`)
    return
  }
  for (const v of results.violations) {
    problems++
    console.log(`FAIL ${label}: ${v.id} (${v.impact}) ${v.help}`)
    for (const node of v.nodes.slice(0, 3)) console.log(`       ${node.target.join(' ')}`)
  }
}

const server = await startPreview()
const browser = await launchEdge()
let problems = 0

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  for (const style of STYLES) {
    for (const screen of SCREENS) {
      const page = await context.newPage()
      await page.goto(screenUrl(server.url, { screen, style }))
      await waitForFonts(page)
      await page.waitForTimeout(600)
      await check(page, `${screen} · ${style}`)
      await page.close()
    }

    for (const state of MUSIC_STATES) {
      const page = await context.newPage()
      await page.addInitScript((settings) => {
        localStorage.setItem('golden-thread-settings', JSON.stringify({ state: settings, version: 1 }))
      }, state.settings)
      await page.goto(screenUrl(server.url, { screen: 'music', style }))
      await waitForFonts(page)
      // Open every Age, so the whole checklist is checked.
      for (const details of await page.locator('details').all()) await details.evaluate((d) => (d.open = true))
      await page.waitForTimeout(400)
      await check(page, `${state.name} · ${style}`)
      await page.close()
    }

    for (const state of STORY_STATES) {
      const page = await context.newPage()
      await page.goto(screenUrl(server.url, { screen: 'story', style, extra: `&scene=${state.scene}` }))
      await waitForFonts(page)
      await page.locator('.stage[data-settled="true"]').waitFor({ timeout: 15000 })
      if (state.begin) {
        const begin = page.getByRole('button', { name: 'Begin', exact: true })
        if (await begin.count()) await begin.click()
        await page.getByRole('region', { name: 'The story' }).waitFor()
      }
      for (let i = 0; i < (state.lines ?? 0); i++) {
        await page.waitForTimeout(400)
        await page.keyboard.press('Space')
      }
      if (state.choice) await page.locator('.play-choice-option').first().waitFor({ timeout: 15000 })
      if (state.open) await page.getByRole('button', { name: state.open, exact: true }).click()
      if (state.thread) await page.getByRole('button', { name: /Something here is glowing/ }).click()
      await page.waitForTimeout(700)
      await check(page, `${state.name} · ${style}`)
      await page.close()
    }
  }
} finally {
  await browser.close()
  await server.close()
}

if (problems > 0) {
  console.error(`${problems} accessibility problem(s).`)
  process.exit(1)
}
console.log('No accessibility problems found.')
