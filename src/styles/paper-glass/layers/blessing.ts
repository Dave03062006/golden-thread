import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 4, Episode 3: inside Isaac's tent, where the old man sits blind on his mat. Woven
 * goat-hair walls in dark stripes, the tent pole and its ropes, a warm glow where the lamp
 * stands, a patterned rug, and on the right the open flap with the evening outside.
 */

const STRIPE = 120

export const blessingLayers: Record<string, PaperLayerArt> = {
  'tent-inside': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <radialGradient id="tent-lamp" cx="640" cy="620" r="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f0b060" stop-opacity=".55"/>
          <stop offset=".5" stop-color="#c07838" stop-opacity=".18"/>
          <stop offset="1" stop-color="#c07838" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="tent-door" x1="0" y1="200" x2="0" y2="780" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3a3060"/>
          <stop offset=".7" stop-color="#8a5a7a"/>
          <stop offset="1" stop-color="#d89070"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#2e1e18"/>
      ${Array.from({ length: Math.ceil((RIGHT - LEFT) / STRIPE) }, (_, i) => {
        const x = LEFT + i * STRIPE
        return `<path d="M${x} ${TOP}L${x + STRIPE / 2} ${TOP}L${x + STRIPE / 2 + (x - 760) * 0.06} 780L${x + (x - 760) * 0.06} 780Z" fill="${i % 2 ? '#4a3024' : '#3a261c'}"/>`
      }).join('')}
      <path d="M${LEFT} 120Q760 -40 ${RIGHT} 120L${RIGHT} ${TOP}L${LEFT} ${TOP}Z" fill="#24160f"/>
      <path d="M1250 780L1290 230Q1380 200 1470 230L1510 780Z" fill="url(#tent-door)"/>
      <circle cx="1400" cy="320" r="3" fill="#f4f0ff"/><circle cx="1330" cy="400" r="2" fill="#f4f0ff" opacity=".7"/>
      <path d="M1250 780L1290 230L1230 240L1180 780Z" fill="#5a3a28"/>
      <path d="M1510 780L1470 230L1540 260L1580 780Z" fill="#4a3024"/>
      <path d="M752 ${TOP}L768 ${TOP}L772 790L748 790Z" fill="#5a3c22"/>
      <path d="M760 40L${LEFT} 520M760 40L${RIGHT} 520" stroke="#6a4a30" stroke-width="5" opacity=".7"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#tent-lamp)"/>
      <path d="M${LEFT} 780L${RIGHT} 780L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5a2a22"/>
      <path d="M${LEFT} 800L${RIGHT} 800M${LEFT} 1000L${RIGHT} 1000" stroke="#c8963a" stroke-width="6" opacity=".7"/>
      ${Array.from({ length: 24 }, (_, i) => `<path d="M${LEFT + 40 + i * 90} 860L${LEFT + 80 + i * 90} 900L${LEFT + 40 + i * 90} 940L${LEFT + i * 90} 900Z" fill="#a8743a" opacity=".55"/>`).join('')}`,
  },
}
