// Plays through the save files in a real browser, with real storage: starts a game,
// changes it, reloads, exports it, deletes it, imports it back and reloads again.
// Fails if anything the player saved goes missing.
//
// Usage (build first):
//   npm run build
//   npm run saves

import { readFile } from 'node:fs/promises'
import { launchEdge, startPreview, waitForScene } from './lib/browser.mjs'

const NAME = 'Test Pilgrim'
const server = await startPreview()
const browser = await launchEdge()
let failures = 0

function check(ok, what) {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`)
  if (!ok) failures++
}

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true })
  const page = await context.newPage()
  const slot = (n) => page.getByRole('region', { name: `Save file ${n}` })

  // A new game in the first file.
  await page.goto(server.url)
  await slot(1).getByRole('button', { name: 'New game' }).click()
  await page.getByRole('textbox', { name: 'Your name' }).fill(NAME)
  await page.getByRole('button', { name: 'Begin', exact: true }).click()
  await page.getByRole('navigation', { name: 'Main menu' }).waitFor()
  check(true, 'a new game starts and opens the menu')

  // Into the scene, where a checkpoint is written, then a style switch.
  await page.getByRole('navigation', { name: 'Main menu' }).getByRole('button').first().click()
  await waitForScene(page)
  const before = await page.evaluate(() => document.documentElement.dataset.artStyle)
  await page.getByRole('button', { name: /^Switch to/ }).click()
  await waitForScene(page)
  await page.waitForTimeout(500)
  const after = await page.evaluate(() => document.documentElement.dataset.artStyle)
  check(before !== after, `the style switches mid-scene (${before} → ${after})`)
  const afterName = after === 'pixel' ? 'Pixel' : 'Paper & Glass'

  // Everything is still there after a reload.
  await page.reload()
  const card = slot(1)
  await card.getByRole('heading', { name: NAME }).waitFor()
  check(true, 'the save is still there after a reload')
  check((await card.textContent()).includes(afterName), `the save remembers the new style (${afterName})`)
  check((await card.textContent()).includes('Demo · '), 'the save remembers where the player was (its checkpoint)')

  // Export, delete, and import it back.
  const downloading = page.waitForEvent('download')
  await card.getByRole('button', { name: 'Export' }).click()
  const download = await downloading
  const exported = JSON.parse(await readFile(await download.path(), 'utf8'))
  check(exported.format === 'golden-thread-save' && exported.save?.data?.name === NAME, 'the exported file holds the save')

  await card.getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('dialog', { name: 'Delete this save?' }).getByRole('button', { name: 'Delete' }).click()
  await slot(1).getByText('Empty').waitFor()
  check(true, 'the save can be deleted')

  await slot(2).locator('input[type="file"]').setInputFiles(await download.path())
  await slot(2).getByRole('heading', { name: NAME }).waitFor()
  check((await slot(2).textContent()).includes(afterName), 'an imported save comes back whole, into another file')

  await page.reload()
  await slot(2).getByRole('heading', { name: NAME }).waitFor()
  check(true, 'the imported save is still there after a reload')
} catch (error) {
  failures++
  console.log(`FAIL ${error.message.split('\n')[0]}`)
} finally {
  await browser.close()
  await server.close()
}

if (failures) {
  console.error(`${failures} save check(s) failed.`)
  process.exit(1)
}
console.log('Saves survive reloading, exporting and importing.')
