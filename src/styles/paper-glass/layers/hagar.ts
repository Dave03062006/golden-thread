import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 3, Episode 5: the wilderness. Pale dunes under a white-hot sky on the road to
 * Shur and in the wilderness of Beer-sheba; and the heat haze that hides the well until
 * God opens Hagar's eyes.
 */

const FAR = [470, 450, 480, 440, 470, 460, 440, 470, 450, 460]
const NEAR = [640, 600, 650, 620, 600, 640, 610, 650, 620, 630]

export const hagarLayers: Record<string, PaperLayerArt> = {
  desert: {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(FAR)}" fill="#e6cfa0" opacity=".85"/>
      <path d="${hills(NEAR)}" fill="#d8b47a"/>
      <path d="${hillCrest(NEAR)}" stroke="#f0d8a8" stroke-width="5" fill="none"/>
      ${[680, 740, 810, 890].map((y, i) => `<path d="M${LEFT} ${y}C300 ${y - 18} 900 ${y + 16} ${RIGHT} ${y - 6}" stroke="#c8a068" stroke-width="${3 + i}" fill="none" opacity=".55"/>`).join('')}
      <path d="M${LEFT} 860L${RIGHT} 840L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#c8a068" opacity=".5"/>`,
  },
  'heat-haze': {
    bounds: FULL,
    shadow: false,
    resolution: 0.3,
    svg: `
      <defs><filter id="haze" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="30"/></filter></defs>
      <rect x="${LEFT}" y="380" width="${RIGHT - LEFT}" height="${BOTTOM - 380}" fill="#fff4dc" opacity=".55" filter="url(#haze)"/>
      ${[460, 560, 660, 760].map((y) => `<path d="M${LEFT} ${y}Q200 ${y - 20} 500 ${y}T1100 ${y}T1700 ${y}T${RIGHT} ${y}" stroke="#ffffff" stroke-width="18" fill="none" opacity=".3" filter="url(#haze)"/>`).join('')}`,
  },
}
