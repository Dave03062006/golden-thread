import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'

/**
 * Level 13 · Moses' Last Words: the two roads, one down to the river and across into a green
 * land full of light, the other turning back into the dry hills, for the play "choose life";
 * and the view from the top of Nebo over the whole promised land, for the play "all the land".
 */

/** The road of life, from where the family stands to the far side of the river (the same as the play's, in content/levels/13-moses-last-words/episode-4.ts). */
const LIFE: [number, number][] = [
  [0.46, 0.785],
  [0.56, 0.8],
  [0.64, 0.76],
  [0.72, 0.72],
  [0.8, 0.68],
  [0.88, 0.64],
]
/** The parts of the land, as the play lights them (see content/levels/13-moses-last-words/episode-5.ts). */
const REGIONS: [number, number][] = [
  [0.72, 0.3],
  [0.52, 0.24],
  [0.38, 0.36],
  [0.2, 0.46],
  [0.26, 0.6],
  [0.56, 0.56],
]
const at = ([x, y]: [number, number]) => `${x * 1600} ${y * 900}`

export const moabLayers: Record<string, PaperLayerArt> = {
  'two-roads': {
    bounds: bandFrom(500),
    shadow: true,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="500" width="${RIGHT - LEFT}" height="${BOTTOM - 500}" fill="#c8945a"/>
      <path d="M1100 500L${RIGHT} 500L${RIGHT} ${BOTTOM}L1150 ${BOTTOM}Z" fill="#7aa84a"/>
      ${Array.from({ length: 10 }, (_, i) => `<circle cx="${1180 + (i % 5) * 120}" cy="${560 + Math.floor(i / 5) * 90}" r="26" fill="#5a8a3a"/>`).join('')}
      <path d="M1060 500Q1100 700 1080 ${BOTTOM}" stroke="#5ab8e8" stroke-width="40" fill="none"/>
      <path d="M${LIFE.map(at).join('L')}" stroke="#f0d8a8" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M736 706L${LEFT} 560" stroke="#b8865a" stroke-width="28" stroke-linecap="round" fill="none"/>
      ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${LEFT + 60 + i * 110}" cy="${540 + (i % 3) * 18}" rx="${50 + (i % 2) * 20}" ry="22" fill="#a8744a"/>`).join('')}`,
  },
  'nebo-view': {
    bounds: bandFrom(100),
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="100" width="${RIGHT - LEFT}" height="${BOTTOM - 100}" fill="#b89a6a"/>
      <path d="M${LEFT} 100L180 100Q140 500 ${LEFT} 700Z" fill="#4a7ab8"/>
      ${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${LEFT + 120 + i * 140}" cy="${200 + (i % 4) * 110}" rx="${110 + (i % 3) * 30}" ry="46" fill="${i % 2 ? '#8aa85a' : '#a89a5a'}" opacity=".8"/>`).join('')}
      <path d="M900 140Q940 300 890 420Q860 500 900 560" stroke="#5ab8e8" stroke-width="10" fill="none"/>
      <path d="M880 560Q960 590 940 760Q900 830 860 760Q840 640 880 560Z" fill="#4a7ab8"/>
      ${REGIONS.map((r) => `<circle cx="${at(r).split(' ')[0]}" cy="${at(r).split(' ')[1]}" r="8" fill="#f4d070"/>`).join('')}
      <path d="M${LEFT} 760Q500 720 900 780T${RIGHT} 760L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#6a4a2a"/>`,
  },
}
