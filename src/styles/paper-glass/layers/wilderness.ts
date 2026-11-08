import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'

/**
 * Level 12 · Forty Years in the Wilderness: the wilderness seen from above, with the dry
 * valley the camp follows the cloud along to Kadesh, for the play "follow the cloud"; and
 * Balaam's road, from open fields through a lane between vineyard walls to a narrow pass in
 * the rocks, for the play "the narrow way".
 */

/** The stages the cloud settles at, as fractions of the frame (the same as the play's, in content/levels/12-forty-years-in-the-wilderness/episode-1.ts). */
const PATH: [number, number][] = [
  [0.08, 0.7],
  [0.2, 0.62],
  [0.42, 0.42],
  [0.64, 0.6],
  [0.84, 0.36],
]
const at = ([x, y]: [number, number]) => `${x * 1600} ${y * 900}`

export const wildernessLayers: Record<string, PaperLayerArt> = {
  'wilderness-map': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#d8b47a"/>
      ${Array.from({ length: 26 }, (_, i) => {
        const x = LEFT + ((i * 389) % (RIGHT - LEFT))
        const y = TOP + ((i * 241) % (BOTTOM - TOP))
        const r = 40 + (i % 5) * 18
        return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#a8744a" opacity=".55"/><ellipse cx="${x - r * 0.2}" cy="${y - r * 0.15}" rx="${r * 0.5}" ry="${r * 0.32}" fill="#c08a5a" opacity=".6"/>`
      }).join('')}
      <path d="M${PATH.map(at).join('L')}" stroke="#f0d8a8" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M${PATH.map(at).join('L')}" stroke="#c8a070" stroke-width="3" stroke-dasharray="10 14" fill="none"/>
      <circle cx="${0.875 * 1600}" cy="${0.32 * 900}" r="46" fill="#5a9a5a"/><circle cx="${0.875 * 1600}" cy="${0.32 * 900}" r="22" fill="#4a8ab8"/>`,
  },
  'balaam-road': {
    bounds: bandFrom(540),
    shadow: true,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="560" width="${800 - LEFT}" height="${BOTTOM - 560}" fill="#7aa84a"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${LEFT + i * 70} 600q20-12 40 0" stroke="#5a8a3a" stroke-width="4" fill="none"/>`).join('')}
      <rect x="800" y="560" width="400" height="${BOTTOM - 560}" fill="#a8744a"/>
      ${Array.from({ length: 8 }, (_, i) => `<path d="M${810 + i * 50} 600L${810 + i * 50} 640" stroke="#6a4a2a" stroke-width="5"/><ellipse cx="${830 + i * 50}" cy="600" rx="30" ry="18" fill="#4a7a3a"/><circle cx="${820 + i * 50}" cy="612" r="5" fill="#6a2a6a"/>`).join('')}
      <rect x="800" y="640" width="400" height="40" fill="#b8bcc4"/><path d="M800 660L1200 660" stroke="#8a8e98" stroke-width="3"/>
      <rect x="800" y="760" width="400" height="30" fill="#b8bcc4"/><path d="M800 775L1200 775" stroke="#8a8e98" stroke-width="3"/>
      <path d="M1200 540L1260 520L1320 560L${RIGHT} 530L${RIGHT} 680L1200 680Z" fill="#8a5a3a"/>
      <path d="M1200 ${BOTTOM}L1200 760L1300 770L1400 750L${RIGHT} 765L${RIGHT} ${BOTTOM}Z" fill="#7a4a2a"/>
      <rect x="${LEFT}" y="680" width="${RIGHT - LEFT}" height="80" fill="#e0c48a"/>
      ${Array.from({ length: 30 }, (_, i) => `<ellipse cx="${LEFT + i * 70}" cy="${700 + (i % 4) * 14}" rx="6" ry="3" fill="#c8a870"/>`).join('')}`,
  },
}
