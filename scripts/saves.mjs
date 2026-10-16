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

  // Into the story: a checkpoint is written at the first scene. Then a style switch, from the pause menu.
  await page.getByRole('navigation', { name: 'Main menu' }).getByRole('button').first().click()
  await waitForScene(page)
  await page.getByRole('button', { name: 'Begin', exact: true }).click()
  await page.getByRole('region', { name: 'The story' }).waitFor()
  const before = await page.evaluate(() => document.documentElement.dataset.artStyle)
  await page.getByRole('button', { name: 'Pause' }).click()
  const paused = page.getByRole('dialog', { name: 'Paused' })
  await paused.getByRole('radio', { name: before === 'pixel' ? 'Paper & Glass' : 'Pixel' }).check()
  await paused.getByRole('button', { name: 'Resume' }).click()
  await waitForScene(page)
  await page.waitForTimeout(500)
  const after = await page.evaluate(() => document.documentElement.dataset.artStyle)
  check(before !== after, `the style switches mid-story (${before} → ${after})`)
  check(await page.getByRole('region', { name: 'The story' }).isVisible(), 'the story keeps its place through the switch')
  const afterName = after === 'pixel' ? 'Pixel' : 'Paper & Glass'

  // Read on into the next scene, the second checkpoint.
  for (let line = 0; line < 5; line++) {
    await page.waitForTimeout(350)
    await page.keyboard.press('Space')
  }
  await page.getByText('Then God spoke.').waitFor()
  check(true, 'reading on reaches the next scene')

  // Everything is still there after a reload.
  await page.reload()
  const card = slot(1)
  await card.getByRole('heading', { name: NAME }).waitFor()
  check(true, 'the save is still there after a reload')
  check((await card.textContent()).includes(afterName), `the save remembers the new style (${afterName})`)
  check((await card.textContent()).includes('Day one: light'), 'the save remembers the scene the player reached (its checkpoint)')

  // Continue returns to that very scene.
  await card.getByRole('button', { name: 'Play' }).click()
  await page.getByRole('navigation', { name: 'Main menu' }).getByRole('button', { name: 'Continue' }).click()
  await waitForScene(page)
  await page.getByText('Then God spoke.').waitFor({ timeout: 5000 })
  check(true, 'Continue returns to the exact scene')
  await page.getByRole('button', { name: 'Pause' }).click()
  await page.getByRole('dialog', { name: 'Paused' }).getByRole('button', { name: 'Save & quit' }).click()
  await card.getByRole('heading', { name: NAME }).waitFor()

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
