// Runs automated accessibility checks (axe) on every screen in both art styles.
// Fails if anything is found.
//
// Usage (build first):
//   npm run build
//   npm run a11y

import AxeBuilder from '@axe-core/playwright'
import { STYLES, launchEdge, screenUrl, startPreview, waitForFonts } from './lib/browser.mjs'

const SCREENS = ['title', 'menu', 'settings', 'scene']

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
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
      const label = `${screen} · ${style}`
      if (results.violations.length === 0) {
        console.log(`ok   ${label}`)
      } else {
        for (const v of results.violations) {
          problems++
          console.log(`FAIL ${label}: ${v.id} (${v.impact}) ${v.help}`)
          for (const node of v.nodes.slice(0, 3)) console.log(`       ${node.target.join(' ')}`)
        }
      }
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
