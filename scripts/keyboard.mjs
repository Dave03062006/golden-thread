// Checks the game can be played with the keyboard alone (spec §6), in both art styles.
//
// On every screen it presses Tab until focus comes round again, and checks that every
// visible control is reached, that focus never lands on something hidden, and that each
// control shows it has focus. Then it takes a short journey with keys only: a new game,
// a style chosen with the arrow keys, the story begun, read on with Space, paused with
// Escape. Fails if anything can't be reached or done.
//
// Usage (build first):
//   npm run build
//   npm run keyboard

import { STYLES, launchEdge, screenUrl, startPreview, waitForFonts, waitForScene } from './lib/browser.mjs'

const SCREENS = ['title', 'menu', 'settings', 'music', 'credits', 'quiz-menu', 'quiz', 'reflection', 'journal', 'ceremony', 'cathedral', 'map']
/** Enough presses to go round any screen; a screen that needs more has a trap or too many stops. */
const MAX_TABS = 250

const server = await startPreview()
const browser = await launchEdge()
let problems = 0

function fail(label, what) {
  problems++
  console.log(`FAIL ${label}: ${what}`)
}

/** Every control a keyboard user should be able to reach, as the page sees it. */
const reachable = () =>
  [...document.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]')]
    .filter((el) => el.tabIndex >= 0 && !el.disabled && !el.closest('[inert], dialog:not([open]), [aria-hidden="true"]'))
    // A radio group is one stop: only its chosen radio (or the first) is reached by Tab.
    .filter((el) => !(el.type === 'radio' && !el.checked && document.querySelector(`input[type=radio][name="${CSS.escape(el.name)}"]:checked`)))
    .filter((el) => {
      const box = el.getBoundingClientRect()
      // Visually hidden file inputs are reached through their label; they're still stops.
      return (box.width > 0 && box.height > 0) || el.classList.contains('visually-hidden')
    })

/** How an element and what's inside it look: if focus changes none of this, focus can't be seen. */
const look = (el) =>
  [el, ...el.querySelectorAll('*'), el.closest('label')]
    .filter(Boolean)
    .map((e) => {
      const s = getComputedStyle(e)
      return [s.outlineStyle, s.outlineColor, s.boxShadow, s.backgroundColor, s.borderColor, s.color, s.textDecorationLine].join()
    })
    .join('|')

/** A short description of an element, to name it in reports. */
const describe = (el) => `${el.tagName.toLowerCase()} “${(el.getAttribute('aria-label') || el.textContent || el.value || '').trim().slice(0, 40)}”`

async function tabAround(page, label) {
  // Start from the top of the page.
  await page.evaluate(() => document.activeElement?.blur())
  const expected = await page.evaluate(() => {
    const els = reachable()
    els.forEach((el, i) => (el.dataset.kbd = String(i)))
    window.plainLooks = els.map(look)
    return els.map(describe)
  })
  const visited = new Set()
  let first = null
  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press('Tab')
    const stop = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const box = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      return {
        id: el.dataset.kbd ?? null,
        name: describe(el),
        // Hidden: no size, or invisible (a visually hidden input shows focus on its label).
        hidden: !el.classList.contains('visually-hidden') && (box.width === 0 || box.height === 0 || style.visibility === 'hidden'),
        // Some sign of focus: it, something inside it, or the label around it looks different.
        shown: el.dataset.kbd === undefined || look(el) !== window.plainLooks[Number(el.dataset.kbd)],
      }
    })
    if (!stop) continue
    if (stop.id !== null && stop.id === first) break
    if (stop.id !== null) first ??= stop.id
    if (stop.hidden) fail(label, `focus landed on something hidden: ${stop.name}`)
    if (!stop.shown) fail(label, `no sign of focus on ${stop.name}`)
    if (stop.id !== null) visited.add(stop.id)
  }
  const missed = expected.filter((_, i) => !visited.has(String(i)))
  if (missed.length) fail(label, `never reached by Tab: ${missed.slice(0, 5).join(', ')}${missed.length > 5 ? ` and ${missed.length - 5} more` : ''}`)
  else console.log(`ok   ${label} (${visited.size} stops)`)
}

/** A new game and the start of the story, with keys only. */
async function journey(page, style) {
  const label = `journey · ${style}`
  await page.goto(server.url)
  await waitForFonts(page)
  // Tab to the first "New game" and press Enter.
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab')
    if (await page.evaluate(() => document.activeElement?.textContent?.trim() === 'New game')) break
  }
  await page.keyboard.press('Enter')
  await page.keyboard.press('Control+A')
  await page.keyboard.type('Keyboard Pilgrim')
  // The previews load as the dialog opens.
  await page.locator('.style-chooser input').first().waitFor()
  // To the style chooser, and the arrow keys pick a style.
  await page.keyboard.press('Tab')
  const target = style === 'pixel' ? 'Pixel' : 'Paper & Glass'
  for (let i = 0; i < 3; i++) {
    const on = await page.evaluate(() => document.activeElement?.closest('label')?.querySelector('strong')?.textContent)
    if (on === target) break
    await page.keyboard.press('ArrowRight')
  }
  const chosen = await page.evaluate(() => document.querySelector('.style-chooser input:checked')?.closest('label')?.querySelector('strong')?.textContent)
  if (chosen !== target) return fail(label, `the arrow keys didn't choose ${target} (${chosen})`)
  // Enter submits the form: the game begins.
  await page.keyboard.press('Enter')
  await page.getByRole('navigation', { name: 'Main menu' }).waitFor()
  if ((await page.evaluate(() => document.documentElement.dataset.artStyle)) !== style) return fail(label, 'the new game is not in the style chosen')
  // "Begin" is the first item of the menu.
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab')
    if (await page.evaluate(() => document.activeElement?.textContent?.trim() === 'Begin')) break
  }
  await page.keyboard.press('Enter')
  await waitForScene(page)
  // The title card's "Begin" has the focus.
  await page.getByRole('button', { name: 'Begin', exact: true }).waitFor()
  await page.keyboard.press('Enter')
  await page.getByRole('region', { name: 'The story' }).waitFor()
  const before = await page.locator('section.story-panel').innerText()
  for (let i = 0; i < 3; i++) {
    await page.waitForTimeout(600)
    await page.keyboard.press('Space')
  }
  await page.waitForTimeout(600)
  if ((await page.locator('section.story-panel').innerText()) === before) return fail(label, 'Space did not read on')
  await page.keyboard.press('Escape')
  if (!(await page.getByRole('dialog', { name: 'Paused' }).isVisible())) return fail(label, 'Escape did not pause')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  if (await page.getByRole('dialog', { name: 'Paused' }).isVisible()) return fail(label, 'Escape did not close the pause menu')
  console.log(`ok   ${label}: a new game, a style, the story begun, read on and paused, with keys only`)
}

try {
  for (const style of STYLES) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    for (const screen of SCREENS) {
      const page = await context.newPage()
      await page.goto(screenUrl(server.url, { screen, style }))
      await waitForFonts(page)
      await page.waitForTimeout(800)
      await page.addScriptTag({ content: `window.reachable = ${reachable}; window.describe = ${describe}; window.look = ${look}` })
      await tabAround(page, `${screen} · ${style}`)
      await page.close()
    }
    await context.close()

    const fresh = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    await journey(await fresh.newPage(), style)
    await fresh.close()
  }
} finally {
  await browser.close()
  await server.close()
}

if (problems > 0) {
  console.error(`${problems} keyboard problem(s).`)
  process.exit(1)
}
console.log('Everything can be reached and done with the keyboard.')
