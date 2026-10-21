import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 5, Episodes 4 and 5: Joseph's grain hall, where all the earth came to buy. Thick
 * mud-brick walls under a high timber roof, sunlight falling through the openings, and
 * great heaps of golden grain along the back.
 */

export const grainLayers: Record<string, PaperLayerArt> = {
  'storehouse-hall': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#c8a878"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="200" fill="#6a4a2a"/>
      ${Array.from({ length: 22 }, (_, i) => `<path d="M${LEFT + i * 100} ${TOP}L${LEFT + i * 100 + 22} ${TOP}L${LEFT + i * 100 + 22} 65L${LEFT + i * 100} 65Z" fill="#4a321c"/>`).join('')}
      ${[200, 700, 1200].map((x) => `<path d="M${x} 120L${x + 120} 120L${x + 120} 340L${x} 340Z" fill="#fff0c8"/><path d="M${x} 340L${x + 120} 340L${x + 220} 780L${x - 100} 780Z" fill="#fff0c8" opacity=".25"/>`).join('')}
      ${[0, 440, 980, 1460].map((x) => `<path d="M${x} 65L${x + 80} 65L${x + 80} 780L${x} 780Z" fill="#b08860"/>`).join('')}
      ${[
        [120, 600, 260],
        [620, 620, 220],
        [1120, 590, 300],
        [1640, 620, 220],
      ]
        .map(([x, y, w]) => `<path d="M${x! - w! / 2} 780Q${x} ${y! - 140} ${x! + w! / 2} 780Z" fill="#e0b448"/><path d="M${x! - w! / 4} ${y! + 30}Q${x} ${y! - 50} ${x! + w! / 4} ${y! + 30}" stroke="#f4d070" stroke-width="5" fill="none"/>`)
        .join('')}
      <path d="M${LEFT} 780L${RIGHT} 780L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#a88a5a"/>
      <path d="M${LEFT} 780L${RIGHT} 780" stroke="#8a6e46" stroke-width="6"/>`,
  },
}
