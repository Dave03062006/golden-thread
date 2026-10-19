import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 3, Episode 8: the gate of Sodom at dawn, its walls dark on the left, and the plain
 * running east to the hills where Lot's family flees. The city is never shown inside, and
 * its end is seen only as smoke from far away, from Abraham's hill.
 */

const HILLS = [520, 500, 520, 480, 470, 440, 420, 430, 410, 420]

export const sodomLayers: Record<string, PaperLayerArt> = {
  'sodom-gate': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(HILLS)}" fill="#8a7a6a" opacity=".8"/>
      <path d="${hillCrest(HILLS)}" stroke="#b0987a" stroke-width="4" fill="none"/>
      <path d="M${LEFT} 640C400 630 1000 650 ${RIGHT} 640L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#b89a70"/>
      <path d="M${LEFT} 700C400 690 1100 712 ${RIGHT} 700" stroke="#a08460" stroke-width="5" fill="none"/>
      <path d="M${LEFT} 660L${LEFT} 360L380 360L380 660Z" fill="#5a4a48"/>
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${LEFT + 14 + i * 76}" y="334" width="40" height="30" fill="#5a4a48"/>`).join('')}
      <path d="M200 660L200 520Q250 470 300 520L300 660Z" fill="#2a2024"/>
      <path d="M380 660L380 300L460 300L460 660Z" fill="#4a3c3c"/>
      <path d="M372 300L468 300L468 280L372 280Z" fill="#3a3030"/>`,
  },
}
