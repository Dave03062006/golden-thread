// Takes screenshots of every screen in both art styles, at laptop and phone sizes, so
// changes can be checked without clicking around by hand.
//
// Usage (build first):
//   npm run build
//   npm run shots                       everything
//   npm run shots -- --only=phone       one viewport (laptop | phone | phone-upright)
//   npm run shots -- --screen=story     one screen (title | menu | settings | scene | story)
//
// The story is shot at the start of every scene of the finished episodes, after its first line.
//
// Screenshots are saved in the `shots/` folder, which git ignores.

import { mkdir } from 'node:fs/promises'
import { STYLES, VIEWPORTS, launchEdge, screenUrl, startPreview, waitForFonts, waitForScene } from './lib/browser.mjs'

const args = process.argv.slice(2)
const value = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const only = value('only')
const onlyScreen = value('screen')

const SCREENS = ['title', 'menu', 'settings', 'scene', 'music', 'credits']

/** Every scene of the finished episodes (src/content/levels/01-creation-and-fall/). */
const STORY_SCENES = [...Array.from({ length: 8 }, (_, i) => `l01-e1-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e2-s${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `l01-e3-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e4-s${i + 1}`)]

/** Opens the story at a scene, past the episode's title card, and lets the first line settle in. */
async function openStory(page, url, style, scene) {
  await page.goto(screenUrl(url, { screen: 'story', style, extra: `&scene=${scene}` }))
  await waitForFonts(page)
  await waitForScene(page)
  const begin = page.getByRole('button', { name: 'Begin', exact: true })
  if (await begin.count()) await begin.click()
  await page.getByRole('region', { name: 'The story' }).waitFor()
  await page.waitForTimeout(2500)
}

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

        if (onlyScreen && onlyScreen !== 'story') continue
        // A phone held upright is asked to turn sideways; one picture of that is enough.
        const scenes = name === 'phone-upright' || reduced ? [STORY_SCENES[1]] : STORY_SCENES
        for (const scene of scenes) {
          const page = await context.newPage()
          if (scene === STORY_SCENES[0]) {
            // The episode's title card, before the story begins.
            await page.goto(screenUrl(server.url, { screen: 'story', style, extra: `&scene=${scene}` }))
            await waitForFonts(page)
            await waitForScene(page)
            await page.waitForTimeout(1800)
            await page.screenshot({ path: `shots/${name}-story-intro-${style}.png` })
            count++
          }
          if (name === 'phone-upright') {
            await page.goto(screenUrl(server.url, { screen: 'story', style, extra: `&scene=${scene}` }))
            await waitForFonts(page)
            await page.waitForTimeout(800)
          } else {
            await openStory(page, server.url, style, scene)
          }
          const file = `shots/${name}-story-${scene}-${style}${reduced ? '-reduced' : ''}.png`
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
