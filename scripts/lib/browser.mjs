// Shared helpers for the screenshot, performance and accessibility scripts: serve the
// built game (like `npm run preview`) and open it in the installed Microsoft Edge.

import { chromium } from 'playwright-core'
import { preview } from 'vite'

export async function startPreview() {
  const server = await preview({ preview: { port: 4174, strictPort: false }, logLevel: 'silent' })
  const url = server.resolvedUrls.local[0].replace(/\/$/, '')
  return { url, close: () => new Promise((resolve) => server.httpServer.close(resolve)) }
}

export function launchEdge() {
  return chromium.launch({ channel: 'msedge' })
}

/** The address of a screen, opened directly with a throwaway save (see src/app/params.ts). */
export function screenUrl(base, { screen, style, extra = '' }) {
  return `${base}/?test&screen=${screen}&style=${style}${extra}`
}

/** Waits until the scene's art is ready and the opening fade (or a style switch) has finished. */
export async function waitForScene(page) {
  await page.locator('.stage[data-settled="true"]').waitFor({ timeout: 15000 })
}

export async function waitForFonts(page) {
  await page.evaluate(() => document.fonts.ready)
}

export const VIEWPORTS = {
  laptop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  phone: { width: 844, height: 390, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  'phone-upright': { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
}

export const STYLES = ['paper-glass', 'pixel']
