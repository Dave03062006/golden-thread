import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 5, Episode 3: Pharaoh's throne hall. Painted lotus columns in rows, a ceiling of
 * stars on blue, a raised dais, and bright doorways onto the courts.
 */

export const pharaohLayers: Record<string, PaperLayerArt> = {
  'pharaoh-hall': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#e8dcc0"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="250" fill="#24407a"/>
      ${Array.from({ length: 40 }, (_, i) => `<path d="M${LEFT + 30 + i * 52} ${TOP + 40 + (i % 3) * 50}l6 0l-6 10l-6-10Z" fill="#f0d070"/>`).join('')}
      <path d="M${LEFT} 115L${RIGHT} 115L${RIGHT} 140L${LEFT} 140Z" fill="#c8a040"/>
      ${[300, 1200].map((x) => `<path d="M${x} 300L${x + 120} 300L${x + 120} 760L${x} 760Z" fill="#fff4d8"/>`).join('')}
      ${[80, 520, 1040, 1480].map((x) => `
        <path d="M${x} 140L${x + 90} 140L${x + 80} 780L${x + 10} 780Z" fill="#d8c8a0"/>
        <path d="M${x - 20} 140C${x} 200 ${x + 90} 200 ${x + 110} 140Z" fill="#4a8a7a"/>
        ${[260, 380, 500, 620].map((y) => `<path d="M${x + 4} ${y}L${x + 86} ${y}" stroke="${y % 240 === 20 ? '#c8503a' : '#3a6aa8'}" stroke-width="10"/>`).join('')}`).join('')}
      <path d="M700 620L1100 620L1160 780L640 780Z" fill="#c8b488"/>
      <path d="M660 700L1140 700" stroke="#a8946a" stroke-width="6"/>
      <path d="M${LEFT} 780L${RIGHT} 780L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#b8a478"/>
      ${Array.from({ length: 30 }, (_, i) => `<path d="M${LEFT + i * 80} 780L${LEFT + i * 80 + 40} ${BOTTOM}" stroke="#a8946a" stroke-width="3"/>`).join('')}`,
  },
}
