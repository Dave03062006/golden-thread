// Takes screenshots of every screen in both art styles, at laptop and phone sizes, so
// changes can be checked without clicking around by hand.
//
// Usage (build first):
//   npm run build
//   npm run shots                       everything
//   npm run shots -- --only=phone       one viewport (laptop | phone | phone-upright)
//   npm run shots -- --screen=story     one screen (title | menu | settings | scene | story | quiz | …)
//   npm run shots -- --approve          also keep a small copy of each as the approved baseline
//   npm run shots -- --compare          compare each with its baseline, and fail if any has changed
//
// The story is shot at the start of every scene of the finished episodes, after its first line.
//
// Screenshots are saved in the `shots/` folder, which git ignores. The baselines are small
// copies (256 pixels wide) in `baselines/`, kept in git: enough to see that a screen or
// scene still looks as approved, while allowing for the gentle movement of the scenes.

import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { STYLES, VIEWPORTS, launchEdge, screenUrl, startPreview, waitForFonts, waitForScene } from './lib/browser.mjs'

const args = process.argv.slice(2)
const value = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const only = value('only')
const onlyScreen = value('screen')
const approve = args.includes('--approve')
const compare = args.includes('--compare')

/** Width of a baseline copy, in pixels. */
const BASELINE_WIDTH = 256
/** A pixel has changed if a color channel moved by more than this (of 255)… */
const PIXEL_TOLERANCE = 48
/** …and a picture has changed if more than this share of its pixels did. */
const CHANGED_SHARE = 0.01
const changes = []
let largest = 0

/** A small copy of a screenshot, made by the browser (PNG in, WebP out, to keep git small). */
function shrink(page, png) {
  return page.evaluate(
    async ({ b64, width }) => {
      const image = new Image()
      image.src = `data:image/png;base64,${b64}`
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = Math.round((image.height * width) / image.width)
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/webp', 0.9).split(',')[1]
    },
    { b64: png.toString('base64'), width: BASELINE_WIDTH },
  )
}

/** The share of pixels that differ between two small copies (1 if their sizes differ). */
function difference(page, a, b) {
  return page.evaluate(
    async ({ a, b, tolerance }) => {
      const pixels = async (b64) => {
        const image = new Image()
        image.src = `data:image/webp;base64,${b64}`
        await image.decode()
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        return ctx.getImageData(0, 0, image.width, image.height)
      }
      const [x, y] = await Promise.all([pixels(a), pixels(b)])
      if (x.width !== y.width || x.height !== y.height) return 1
      let changed = 0
      for (let i = 0; i < x.data.length; i += 4) {
        const d = Math.max(Math.abs(x.data[i] - y.data[i]), Math.abs(x.data[i + 1] - y.data[i + 1]), Math.abs(x.data[i + 2] - y.data[i + 2]))
        if (d > tolerance) changed++
      }
      return changed / (x.width * x.height)
    },
    { a, b, tolerance: PIXEL_TOLERANCE },
  )
}

/** Takes a screenshot into shots/, and keeps or compares its baseline if asked. */
async function capture(page, name) {
  const png = await page.screenshot({ path: `shots/${name}.png` })
  console.log(`saved shots/${name}.png`)
  count++
  if (!approve && !compare) return
  const small = await shrink(page, png)
  const baseline = `baselines/${name}.webp`
  if (approve) await writeFile(baseline, Buffer.from(small, 'base64'))
  else if (!existsSync(baseline)) changes.push({ name, what: 'no baseline yet' })
  else {
    const share = await difference(page, small, (await readFile(baseline)).toString('base64'))
    largest = Math.max(largest, share)
    if (share > CHANGED_SHARE) {
      changes.push({ name, what: `${(share * 100).toFixed(1)}% of it changed` })
      await writeFile(`shots/${name}.changed.webp`, Buffer.from(small, 'base64'))
    }
  }
}

const SCREENS = ['title', 'menu', 'settings', 'scene', 'music', 'credits', 'quiz-menu', 'quiz', 'reflection', 'journal', 'ceremony', 'cathedral', 'map']

/** Every scene of the finished episodes (src/content/levels/). */
const STORY_SCENES = [...Array.from({ length: 8 }, (_, i) => `l01-e1-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e2-s${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `l01-e3-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e4-s${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `l01-e5-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l01-e6-s${i + 1}`), ...Array.from({ length: 4 }, (_, i) => `l02-e1-s${i + 1}`), ...Array.from({ length: 4 }, (_, i) => `l02-e2-s${i + 1}`), ...Array.from({ length: 4 }, (_, i) => `l02-e3-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l02-e4-s${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `l02-e5-s${i + 1}`)]

/** Opens the story at a scene, past the episode's title card, and lets the first line settle in. */
async function openStory(page, url, style, scene) {
  await page.goto(screenUrl(url, { screen: 'story', style, extra: `&scene=${scene}` }))
  await waitForFonts(page)
  await waitForScene(page)
  const begin = page.getByRole('button', { name: 'Begin', exact: true })
  if (await begin.count()) await begin.click()
  // The story's first line, or an interaction if the scene opens with one.
  await page.locator('section.story-panel, .play-layer').first().waitFor()
  await page.waitForTimeout(2500)
}

/**
 * A page showing every screenshot in shots/, grouped by size and style side by side, to
 * look over them all at once (for approving the baselines, say). Open shots/index.html.
 */
async function writeGallery() {
  const files = (await readdir('shots')).filter((f) => f.endsWith('.png') && !f.startsWith('failed'))
  const groups = new Map()
  for (const f of files.sort()) {
    const [, size, rest] = /^(laptop|phone-upright|phone)-(.*)\.png$/.exec(f) ?? []
    if (!size) continue
    const subject = rest.replace(/-(paper-glass|pixel)(-reduced)?$/, '$2')
    const key = `${size} · ${subject}`
    groups.set(key, [...(groups.get(key) ?? []), f])
  }
  const rows = [...groups].map(
    ([key, list]) => `<section><h2>${key}</h2><div>${list.map((f) => `<figure><a href="${f}"><img src="${f}" loading="lazy" alt=""></a><figcaption>${f}</figcaption></figure>`).join('')}</div></section>`,
  )
  await writeFile(
    'shots/index.html',
    `<!doctype html><meta charset="utf-8"><title>Golden Thread screenshots</title>
<style>body{background:#14102a;color:#eee;font:14px system-ui;margin:1.5rem}h2{font-size:1rem;margin:1.5rem 0 .4rem}
section>div{display:flex;gap:1rem;flex-wrap:wrap}figure{margin:0;width:min(46vw,720px)}img{width:100%;border:1px solid #444}
figcaption{color:#aaa;font-size:12px}</style>
<h1>Golden Thread · ${files.length} screenshots</h1>${rows.join('')}`,
  )
  console.log('All of them side by side: shots/index.html')
}

await mkdir('shots', { recursive: true })
if (approve) await mkdir('baselines', { recursive: true })
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
          } else if (screen === 'ceremony') {
            // Once every panel of the window has been set.
            await page.getByText('Its window in the cathedral is complete.').waitFor({ timeout: 40_000 })
            await page.waitForTimeout(600)
          } else if (screen === 'cathedral' || screen === 'map') {
            // The glass and the relief are drawn into pictures as they open.
            await page.waitForTimeout(1800)
          } else {
            // The background picture fades in as it loads (the demo scene has its own world instead).
            if (screen !== 'scene') await page.locator('.main-backdrop-image[data-ready]').waitFor({ timeout: 10_000 })
            await page.waitForTimeout(700)
          }
          await capture(page, `${name}-${screen}-${style}${reduced ? '-reduced' : ''}`)
          if (screen === 'title' && !reduced) {
            // A new game, with the two styles' live previews to choose from.
            await page.getByRole('region', { name: 'Save file 1' }).getByRole('button', { name: 'New game' }).click()
            await page.locator('.style-preview[data-ready]').nth(1).waitFor({ timeout: 15000 })
            await page.waitForTimeout(1200)
            await capture(page, `${name}-title-new-game-${style}`)
          }
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
            await capture(page, `${name}-story-intro-${style}`)
          }
          if (name === 'phone-upright') {
            await page.goto(screenUrl(server.url, { screen: 'story', style, extra: `&scene=${scene}` }))
            await waitForFonts(page)
            await page.waitForTimeout(800)
          } else {
            await openStory(page, server.url, style, scene)
          }
          await capture(page, `${name}-story-${scene}-${style}${reduced ? '-reduced' : ''}`)
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
await writeGallery()
if (approve) console.log(`Kept as the approved baselines, in baselines/.`)
if (compare) {
  for (const c of changes) console.log(`CHANGED ${c.name}: ${c.what}`)
  if (changes.length) {
    console.error(`${changes.length} of ${count} screenshots differ from their baselines. Look at them in shots/; if the change is right, approve them again with --approve.`)
    process.exit(1)
  }
  console.log(`Every screenshot matches its baseline (the most changed: ${(largest * 100).toFixed(2)}%).`)
}
