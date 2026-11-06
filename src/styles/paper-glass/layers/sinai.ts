import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'

/**
 * Level 10 · Sinai: the mountain in profile, with the winding path Moses climbs between the
 * camp and the top, for the play "up and down the mountain"; the summit, above a sea of
 * cloud; and the face of the rock, with the cleft where Moses stands while God's glory passes.
 */

/** The stops on the mountain path, as fractions of the frame (the same as the play's, in content/levels/10-sinai/episode-1.ts). */
const STOPS: [number, number][] = [
  [0.12, 0.8],
  [0.34, 0.71],
  [0.24, 0.6],
  [0.46, 0.5],
  [0.38, 0.39],
  [0.6, 0.3],
  [0.7, 0.19],
]
const at = ([x, y]: [number, number]) => [x * 1600, y * 900] as const

export const sinaiLayers: Record<string, PaperLayerArt> = {
  'sinai-path': {
    bounds: bandFrom(80),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 860L-80 760L260 600L520 370L760 260L1000 180L1130 120L1220 150L1420 300L1600 420L${RIGHT} 520L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a6450"/>
      <path d="M1130 120L1220 150L1300 260L1180 240ZM760 260L1000 180L940 300L820 330ZM260 600L520 370L470 520Z" fill="#b87a62"/>
      <path d="M1220 150L1420 300L1600 420L1480 440L1320 330Z" fill="#7a4a3a"/>
      ${[
        [300, 660, 40],
        [700, 520, 34],
        [560, 380, 26],
        [980, 300, 30],
        [1300, 420, 36],
        [140, 760, 30],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.5}" fill="#7a4a3a"/><ellipse cx="${x! - r! * 0.2}" cy="${y! - r! * 0.2}" rx="${r! * 0.55}" ry="${r! * 0.25}" fill="#a8705a"/>`)
        .join('')}
      ${STOPS.slice(1)
        .map((s, i) => {
          const [x1, y1] = at(STOPS[i]!)
          const [x2, y2] = at(s)
          return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#e0b894" stroke-width="10" stroke-linecap="round" opacity=".9"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#c08a62" stroke-width="3" stroke-dasharray="4 10"/>`
        })
        .join('')}
      ${STOPS.map((s) => {
        const [x, y] = at(s)
        return `<circle cx="${x}" cy="${y}" r="10" fill="#c49a6a"/><circle cx="${x}" cy="${y}" r="4" fill="#f4e2c4"/>`
      }).join('')}
      <path d="M${LEFT} 820C100 800 300 830 500 840L500 ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#c8946a"/>
      ${[40, 130, 210].map((x, i) => `<path d="M${x - 34} 800L${x} ${762 - i * 4}L${x + 34} 800Z" fill="${i % 2 ? '#8a6a8a' : '#a8785a'}"/>`).join('')}`,
  },
  'sinai-summit': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 520C200 500 500 540 800 520S1400 500 ${RIGHT} 530L${RIGHT} 700L${LEFT} 700Z" fill="#e8e4ee" opacity=".85"/>
      ${[180, 520, 900, 1260, 1600].map((x, i) => `<ellipse cx="${x}" cy="${560 + (i % 2) * 30}" rx="${200 + (i % 3) * 40}" ry="40" fill="#f4f2f8" opacity=".8"/>`).join('')}
      <path d="M-100 560L40 470L120 520L180 560ZM1380 560L1500 460L1600 540L1700 560Z" fill="#8a5a4a" opacity=".7"/>
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 740C200 700 500 690 800 694C1100 698 1400 700 ${RIGHT} 730L${RIGHT} ${BOTTOM}Z" fill="#9a6450"/>
      <path d="M${LEFT} 740C200 700 500 690 800 694C1100 698 1400 700 ${RIGHT} 730" stroke="#c08a6a" stroke-width="7" fill="none"/>
      ${[
        [120, 760, 50],
        [460, 820, 34],
        [1180, 800, 40],
        [1480, 760, 56],
        [820, 880, 30],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.55}" fill="#7a4a3a"/><ellipse cx="${x! - r! * 0.2}" cy="${y! - r! * 0.2}" rx="${r! * 0.6}" ry="${r! * 0.3}" fill="#b87a62"/>`)
        .join('')}`,
  },
  'glory-rock': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#8a5a48"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${LEFT + i * 150} ${TOP}L${LEFT + 60 + i * 150} ${BOTTOM}" stroke="#7a4a3a" stroke-width="${6 + (i % 3) * 4}" opacity=".7"/>`).join('')}
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${LEFT} ${TOP + 100 + i * 120}C300 ${TOP + 80 + i * 120} 900 ${TOP + 130 + i * 120} ${RIGHT} ${TOP + 100 + i * 120}" stroke="#9a6a54" stroke-width="5" fill="none" opacity=".6"/>`).join('')}
      ${[
        [400, 200, 120],
        [1000, 420, 160],
        [1400, 160, 110],
        [700, 640, 140],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.4}" fill="#a8705a" opacity=".6"/>`)
        .join('')}
      <path d="M120 ${TOP}L190 ${TOP}L230 300L200 520L240 ${BOTTOM}L140 ${BOTTOM}L170 560L130 320Z" fill="#2e1e1a"/>
      <path d="M190 ${TOP}L230 300L200 520L240 ${BOTTOM}" stroke="#b07a62" stroke-width="6" fill="none"/>
      <path d="M${LEFT} 760C300 740 900 770 ${RIGHT} 750L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#6a3e30"/>`,
  },
}
