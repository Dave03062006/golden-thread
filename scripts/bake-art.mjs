// Bakes the game's art into image files: every paper layer (at a few sizes), every
// paper puppet part, and every pixel layer. The game then only loads pictures, which
// the browser decodes off the main thread, so preparing scenes never stalls animation.
//
// Usage:
//   npm run bake
//
// Writes public/art/** and src/styles/art-manifest.json. Run it whenever art changes;
// `npm test` fails if the baked art no longer matches the code.

import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { createServer } from 'vite'
import { launchEdge } from './lib/browser.mjs'

const server = await createServer({ logLevel: 'silent', server: { port: 5199, strictPort: false } })
await server.listen()
const base = server.resolvedUrls.local[0]
const browser = await launchEdge()

try {
  const page = await (await browser.newContext({ deviceScaleFactor: 1 })).newPage()
  page.on('console', (m) => {
    if (m.type() === 'error') console.error(m.text())
  })
  await page.goto(`${base}bake.html`)
  await page.waitForFunction(() => typeof window.__bake === 'function', null, { timeout: 30000 })
  const { files, manifest } = await page.evaluate(() => window.__bake())

  await rm('public/art', { recursive: true, force: true })
  let bytes = 0
  for (const file of files) {
    const path = `public/art/${file.path}`
    const data = Buffer.from(file.base64, 'base64')
    bytes += data.length
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, data)
  }
  await writeFile('src/styles/art-manifest.json', `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Baked ${files.length} images (${(bytes / 1024).toFixed(0)} KB) into public/art/.`)
} finally {
  await browser.close()
  await server.close()
}
