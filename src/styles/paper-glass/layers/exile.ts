import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 1, Episode 4: the garden losing its colors, and the wide, harder land east of
 * Eden at dusk, where the man and the woman go out. A faint path runs across it, which
 * brightens as the signs of God's mercy are found (minigames/lights-in-the-dark).
 */

const FAR = [470, 452, 430, 446, 470, 456, 436, 450, 474, 460, 440, 452, 476]
const LAND = [560, 552, 548, 556, 566, 556, 546, 552, 560, 554, 548, 556, 566]

/** Cracks in the dry ground, the same every time. */
function cracks(): string {
  const rng = createRng(404)
  let out = ''
  for (let i = 0; i < 26; i++) {
    let x = LEFT + rng.next() * (RIGHT - LEFT)
    let y = 600 + rng.next() ** 0.8 * 400
    let d = `M${x.toFixed(0)} ${y.toFixed(0)}`
    const scale = 0.5 + (y - 600) / 400
    for (let k = 0; k < 4; k++) {
      x += (14 + rng.next() * 30) * scale * (rng.next() < 0.5 ? -1 : 1)
      y += (rng.next() * 10 - 3) * scale
      d += `L${x.toFixed(0)} ${y.toFixed(0)}`
    }
    out += `<path d="${d}" stroke="#5a3e2a" stroke-width="${(1.2 + scale).toFixed(1)}" fill="none" opacity=".6"/>`
  }
  return out
}

/** Rocks and dry tufts scattered across the land. */
function stones(): string {
  const rng = createRng(77)
  let out = ''
  for (let i = 0; i < 18; i++) {
    const x = LEFT + rng.next() * (RIGHT - LEFT)
    const y = 610 + rng.next() * 380
    const r = 5 + (y - 600) / 30
    out += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${r.toFixed(1)}" ry="${(r * 0.6).toFixed(1)}" fill="#6e5a48"/>`
    out += `<path d="M${(x - r).toFixed(0)} ${(y - r * 0.2).toFixed(0)}Q${x.toFixed(0)} ${(y - r * 0.9).toFixed(0)} ${(x + r * 0.6).toFixed(0)} ${(y - r * 0.4).toFixed(0)}" stroke="#a08870" stroke-width="1.5" fill="none" opacity=".7"/>`
  }
  return out
}

export const exileLayers: Record<string, PaperLayerArt> = {
  // The garden's colors fading: a grey-brown wash over it.
  'eden-grey': {
    bounds: FULL,
    shadow: false,
    resolution: 0.2,
    svg: `<rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#6a6470" opacity=".5"/>`,
  },

  'east-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="dusk" x1="0" y1="${TOP}" x2="0" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#1c1f4a"/>
          <stop offset=".45" stop-color="#4a3a6e"/>
          <stop offset=".8" stop-color="#b0607a"/>
          <stop offset="1" stop-color="#f0a070"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dusk)"/>`,
  },

  'east-hills': {
    bounds: bandFrom(400),
    shadow: true,
    svg: `
      <path d="${hills(FAR)}" fill="#4a3a52"/>
      <path d="${hillCrest(FAR)}" fill="none" stroke="#c07a7a" stroke-width="2.5" opacity=".6"/>`,
  },

  'east-land': {
    bounds: bandFrom(520),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="dry" x1="0" y1="540" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#8a6a50"/>
          <stop offset=".5" stop-color="#6a4e3a"/>
          <stop offset="1" stop-color="#3e2c24"/>
        </linearGradient>
      </defs>
      <path d="${hills(LAND)}" fill="url(#dry)"/>
      <path d="${hillCrest(LAND)}" fill="none" stroke="#d09a7a" stroke-width="2.5" opacity=".55"/>
      ${cracks()}
      ${stones()}`,
  },

  // A faint path of light across the land, running away to the left (the east).
  'east-path': {
    bounds: bandFrom(540),
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <linearGradient id="path" x1="${RIGHT}" y1="0" x2="${LEFT}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffe7a8" stop-opacity=".1"/>
          <stop offset=".5" stop-color="#ffe7a8" stop-opacity=".55"/>
          <stop offset="1" stop-color="#fff4d0" stop-opacity=".8"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <path d="M${RIGHT} 760C1200 740 1000 690 760 680C520 670 260 640 ${LEFT} 600L${LEFT} 640C260 690 520 720 760 730C1000 742 1200 800 ${RIGHT} 840Z" fill="url(#path)" filter="url(#soft)"/>`,
  },
}
