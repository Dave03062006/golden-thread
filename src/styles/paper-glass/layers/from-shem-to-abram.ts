import type { PaperLayerArt } from '../art'
import { LEFT, RIGHT, bandFrom } from '../frame'

/**
 * Level 2, Episode 7: Ur of the Chaldeans, a great walled city by the Euphrates, with its
 * own stepped tower, its houses crowded inside the walls, and boats in its harbor.
 */

/** Crenellations along the top of a wall, from x0 to x1 at height y. */
const battlements = (x0: number, x1: number, y: number, color: string) => {
  let out = ''
  for (let x = x0; x < x1; x += 36) out += `<rect x="${x}" y="${y - 16}" width="20" height="18" fill="${color}"/>`
  return out
}

/** A boat in the harbor, its sail up. */
const boat = (x: number, y: number, s: number) =>
  `<path d="M${x - 50 * s} ${y}Q${x} ${y + 26 * s} ${x + 50 * s} ${y}Z" fill="#6a4a2a"/><path d="M${x} ${y}L${x} ${y - 70 * s}" stroke="#5a3a20" stroke-width="${4 * s}"/><path d="M${x + 3 * s} ${y - 66 * s}L${x + 34 * s} ${y - 10 * s}L${x + 3 * s} ${y - 10 * s}Z" fill="#efe2c4"/>`

export const fromShemToAbramLayers: Record<string, PaperLayerArt> = {
  'ur-city': {
    bounds: bandFrom(260),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${[0, 1, 2, 3, 4].map((k) => `<rect x="${430 + k * 40}" y="${560 - (k + 1) * 56}" width="${360 - k * 80}" height="56" fill="${k % 2 ? '#c49a62' : '#b48a56'}"/><path d="M${430 + k * 40} ${560 - (k + 1) * 56}L${790 - k * 40} ${560 - (k + 1) * 56}" stroke="#e2c08a" stroke-width="4"/>`).join('')}
      <path d="M598 560L622 560L616 280L604 280Z" fill="#e2c08a" opacity=".8"/>
      <rect x="590" y="250" width="40" height="30" fill="#f2d49a"/>
      ${Array.from({ length: 16 }, (_, i) => {
        const x = -160 + i * 128 + (i % 3) * 18
        if (x > 380 && x < 840) return ''
        const h = 60 + ((i * 41) % 50)
        return `<rect x="${x}" y="${600 - h}" width="${96 + ((i * 17) % 30)}" height="${h}" fill="${i % 2 ? '#d2b080' : '#c2a070'}"/><rect x="${x + 30}" y="${612 - h}" width="14" height="18" fill="#7a5a3a"/>`
      }).join('')}
      <rect x="${LEFT}" y="590" width="${RIGHT - LEFT}" height="70" fill="#a8845a"/>
      ${battlements(LEFT, RIGHT, 592, '#a8845a')}
      <path d="M${LEFT} 600L${RIGHT} 600" stroke="#c8a476" stroke-width="5"/>
      <path d="M700 660L700 610Q740 584 780 610L780 660Z" fill="#4a3220"/>
      <path d="M${LEFT} 676C300 668 900 684 ${RIGHT} 672L${RIGHT} 730C900 742 300 726 ${LEFT} 734Z" fill="#7a98ae"/>
      <path d="M${LEFT} 690C400 684 1000 698 ${RIGHT} 688" stroke="#a6c0d0" stroke-width="3" fill="none"/>
      ${boat(1180, 700, 1)}${boat(1380, 712, 0.8)}${boat(220, 706, 0.7)}`,
  },
}
