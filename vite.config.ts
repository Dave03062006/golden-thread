import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const MEDIA_TYPES: Record<string, string> = { '.webm': 'audio/webm', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg' }

/**
 * Serves the git-ignored `media/` folder (the music prepared by `npm run media`) at
 * /media while developing and previewing. The finished game loads music from its music
 * host instead (VITE_MEDIA_URL). Range requests are answered, so the browser can jump
 * to any moment of a piece without downloading all of it first.
 */
function localMedia(): Plugin {
  const root = resolve('media')
  const serve: Connect.NextHandleFunction = (req, res, next) => {
    const path = decodeURIComponent((req.url ?? '').split('?')[0]!)
    if (!path.startsWith('/media/')) return next()
    const file = normalize(join(root, path.slice('/media/'.length)))
    if (!file.startsWith(root) || !existsSync(file)) return next()
    const size = statSync(file).size
    res.setHeader('Content-Type', MEDIA_TYPES[extname(file)] ?? 'application/octet-stream')
    res.setHeader('Accept-Ranges', 'bytes')
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '')
    if (range) {
      const start = range[1] ? Number(range[1]) : 0
      const end = range[2] ? Number(range[2]) : size - 1
      res.statusCode = 206
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
      res.setHeader('Content-Length', end - start + 1)
      createReadStream(file, { start, end }).pipe(res)
      return
    }
    res.setHeader('Content-Length', size)
    createReadStream(file).pipe(res)
  }
  return {
    name: 'local-media',
    configureServer: (server) => void server.middlewares.use(serve),
    configurePreviewServer: (server) => void server.middlewares.use(serve),
  }
}

// Vite runs the game locally (`npm run dev`) and builds it for the web (`npm run build`).
// The `test` block configures Vitest, which runs the files ending in `.test.ts(x)`.
export default defineConfig({
  plugins: [react(), localMedia()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
