import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'

/**
 * Level 2, Episode 5: the rainbow covenant. The rainbow is seven layers, one for each
 * band from red outside to violet inside, so it can be drawn across the sky a band at a
 * time ("colors of the promise"). Years later, an evening sky over a vineyard on the
 * hillside, where Noah's tent stands.
 */

/** Where the rainbow's circle is centered (below the hills), and its bands, outermost first. */
export const RAINBOW = { x: 800, y: 640, outer: 600, band: 22 }
const BANDS = ['#e0524a', '#f08a3a', '#f2cc48', '#6ac25a', '#4a9ad8', '#5a62c0', '#9a5ac0']

function band(i: number): PaperLayerArt {
  const r = RAINBOW.outer - i * RAINBOW.band - RAINBOW.band / 2
  const arc = `M${RAINBOW.x - r} ${RAINBOW.y}A${r} ${r} 0 0 1 ${RAINBOW.x + r} ${RAINBOW.y}`
  return {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `<path d="${arc}" stroke="${BANDS[i]}" stroke-width="${RAINBOW.band + 1}" fill="none" opacity=".72"/><path d="${arc}" stroke="#ffffff" stroke-width="3" fill="none" opacity=".12"/>`,
  }
}

/** The hillside the vineyard grows on, rising to the right. */
const HILLSIDE = `M560 ${BOTTOM}C860 720 1240 540 ${RIGHT} 470L${RIGHT} ${BOTTOM}Z`
/** A row of vines along the hillside, `k` rows down from its crest. */
const row = (k: number) => {
  const d = (x: number) => 470 + (1 - (x - 560) / (RIGHT - 560)) ** 1.6 * 560 + 34 + k * 46
  const xs = Array.from({ length: 28 }, (_, i) => 640 + i * 44).filter((x) => d(x) < 1000)
  return `<path d="M${xs.map((x) => `${x} ${d(x).toFixed(0)}`).join('L')}" stroke="#3e6a34" stroke-width="16" fill="none" stroke-linecap="round"/>
    ${xs.map((x, i) => (i % 2 ? `<circle cx="${x}" cy="${(d(x) + 9).toFixed(0)}" r="6" fill="#5a2a5e"/><circle cx="${x + 6}" cy="${(d(x) + 14).toFixed(0)}" r="5" fill="#6e3672"/>` : `<path d="M${x} ${(d(x) - 6).toFixed(0)}L${x} ${(d(x) + 22).toFixed(0)}" stroke="#5a4028" stroke-width="3"/>`)).join('')}`
}

export const theRainbowCovenantLayers: Record<string, PaperLayerArt> = {
  ...Object.fromEntries(BANDS.map((_, i) => [`rainbow-${i + 1}`, band(i)])),
  'vineyard-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="evening" x1="0" y1="${TOP}" x2="0" y2="660" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#2e2e5e"/>
          <stop offset=".45" stop-color="#7a4a78"/>
          <stop offset=".8" stop-color="#e08a62"/>
          <stop offset="1" stop-color="#f6c88a"/>
        </linearGradient>
        <radialGradient id="evening-sun" cx="1250" cy="540" r="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffe2a0" stop-opacity=".8"/>
          <stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#evening)"/>
      <circle cx="1250" cy="540" r="260" fill="url(#evening-sun)"/>
      <circle cx="1250" cy="540" r="46" fill="#ffe0a0"/>`,
  },
  vineyard: {
    bounds: bandFrom(440),
    shadow: true,
    resolution: 0.5,
    svg: `<path d="${HILLSIDE}" fill="#6a8a48"/><path d="M560 ${BOTTOM}C860 720 1240 540 ${RIGHT} 470" stroke="#8aac62" stroke-width="6" fill="none"/>${[0, 1, 2, 3, 4, 5].map(row).join('')}`,
  },
}
