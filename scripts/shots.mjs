// Takes screenshots of every screen in both art styles, at laptop and phone sizes, so
// changes can be checked without clicking around by hand.
//
// Usage (build first):
//   npm run build
//   npm run shots                       everything
//   npm run shots -- --only=phone       one viewport (laptop | phone | phone-upright)
//   npm run shots -- --screen=scene     one screen (title | menu | settings | scene)
//
// Screenshots are saved in the `shots/` folder, which git ignores.

import { mkdir } from 'node:fs/promises'
import { STYLES, VIEWPORTS, launchEdge, screenUrl, startPreview, waitForFonts, waitForScene } from './lib/browser.mjs'

const args = process.argv.slice(2)
const value = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const only = value('only')
const onlyScreen = value('screen')

const SCREENS = ['title', 'menu', 'settings', 'scene']

await mkdir('shots', { recursive: true })
const server = await startPreview()
const browser = await launchEdge()
let count = 0

try {
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    if (only && only !== name) continue
    for (const reduced of [false, true]) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.deviceScaleFactor,
        isMobile: viewport.isMobile ?? false,
        hasTouch: viewport.hasTouch ?? false,
        reducedMotion: reduced ? 'reduce' : 'no-preference',
      })
      for (const style of STYLES) {
        for (const screen of SCREENS) {
          if (onlyScreen && onlyScreen !== screen) continue
          // The reduced-motion run only matters for the scene.
          if (reduced && screen !== 'scene') continue
          const page = await context.newPage()
          await page.goto(screenUrl(server.url, { screen, style }))
          await waitForFonts(page)
          if (screen === 'scene' && name !== 'phone-upright') {
            await waitForScene(page)
            await page.waitForTimeout(1500)
          } else {
            await page.waitForTimeout(400)
          }
          const file = `shots/${name}-${screen}-${style}${reduced ? '-reduced' : ''}.png`
          await page.screenshot({ path: file })
          console.log(`saved ${file}`)
          count++
          await page.close()
        }
      }
      await context.close()
    }
  }
} finally {
  await browser.close()
  await server.close()
}
console.log(`${count} screenshots`)
