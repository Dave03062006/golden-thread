import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 5, Episode 1: Joseph's dream of the sheaves, in a golden harvest field; and the hill
 * country between Shechem and Dothan seen from above, like a map stitched on cloth, for the
 * play "to Dothan": fields, olive groves, walls and streams, and the paths Joseph can take.
 */

/** The map's crossroads, as fractions of the frame (the same as the play's, in content/levels/05-…/episode-1.ts). */
const NODES: [number, number][] = [
  [0.14, 0.74],
  [0.3, 0.62],
  [0.2, 0.42],
  [0.46, 0.56],
  [0.36, 0.26],
  [0.62, 0.44],
  [0.54, 0.16],
  [0.78, 0.34],
  [0.88, 0.16],
]
const PATHS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [7, 8],
]
const at = ([x, y]: [number, number]) => [x * 1600, y * 900] as const

export const soldLayers: Record<string, PaperLayerArt> = {
  'wheat-field': {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([520, 490, 510, 480, 500, 520, 490, 510, 500, 520])}" fill="#9aa86a" opacity=".8"/>
      <path d="${hills([600, 580, 610, 590, 600, 615, 585, 600, 595, 610])}" fill="#d8a840"/>
      <path d="${hillCrest([600, 580, 610, 590, 600, 615, 585, 600, 595, 610])}" stroke="#f4d070" stroke-width="5" fill="none"/>
      ${Array.from({ length: 70 }, (_, i) => {
        const x = LEFT + ((i * 97) % (RIGHT - LEFT))
        const y = 640 + ((i * 53) % 380)
        return `<path d="M${x} ${y}L${x + 4} ${y - 34}" stroke="#b8862a" stroke-width="3"/><ellipse cx="${x + 5}" cy="${y - 40}" rx="4" ry="9" fill="#f0c850"/>`
      }).join('')}`,
  },
  'field-map': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#e6d6ae"/>
      ${[
        [60, 520, 300, 200, '#b8c48a'],
        [420, 600, 260, 220, '#d8c070'],
        [700, 560, 300, 260, '#a8bc7a'],
        [1020, 520, 360, 240, '#d0b868'],
        [120, 120, 280, 240, '#c8b878'],
        [480, 80, 320, 260, '#b0c080'],
        [880, 120, 300, 200, '#d8c47c'],
        [1240, 60, 320, 240, '#a8b878'],
        [1180, 640, 360, 240, '#b8c48a'],
      ]
        .map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${c}" opacity=".8"/>`)
        .join('')}
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${560 + (i % 8) * 34}" cy="${300 + Math.floor(i / 8) * 30}" r="10" fill="#6a8a4a" opacity=".85"/>`).join('')}
      <path d="M-240 300C100 340 200 300 400 370C460 392 500 410 520 430" stroke="#5a9ad0" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M980 900C1000 760 1100 700 1140 600C1180 520 1260 480 1300 460" stroke="#5a9ad0" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M1100 20L1100 260M1100 260L1180 260" stroke="#8a7a62" stroke-width="10" stroke-dasharray="14 8"/>
      ${PATHS.map(([a, b]) => {
        const [x1, y1] = at(NODES[a]!)
        const [x2, y2] = at(NODES[b]!)
        return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#a07a4a" stroke-width="7" stroke-dasharray="2 14" stroke-linecap="round"/>`
      }).join('')}
      ${NODES.map((n) => {
        const [x, y] = at(n)
        return `<circle cx="${x}" cy="${y}" r="12" fill="#c49a5a"/><circle cx="${x}" cy="${y}" r="6" fill="#f4e6c4"/>`
      }).join('')}
      <rect x="${LEFT + 20}" y="${TOP + 20}" width="${RIGHT - LEFT - 40}" height="${BOTTOM - TOP - 40}" fill="none" stroke="#a88a5a" stroke-width="8" stroke-dasharray="20 10"/>`,
  },
}
