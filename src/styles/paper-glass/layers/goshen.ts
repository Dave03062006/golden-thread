import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'
import { hills } from '../shapes'

/**
 * Level 5, Episodes 6 and 7: the land of Goshen in the eastern Nile delta, flat and green,
 * with palms, a canal catching the light, and fields of grain.
 */

export const goshenLayers: Record<string, PaperLayerArt> = {
  'goshen-fields': {
    bounds: bandFrom(420),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([560, 555, 560, 552, 558, 562, 555, 560, 556, 560])}" fill="#8ab06a" opacity=".85"/>
      ${[60, 220, 520, 980, 1300, 1520].map((x, i) => `<path d="M${x} 600L${x + 6} ${470 - (i % 2) * 30}L${x + 12} 600Z" fill="#7a5a32"/><path d="M${x + 6} ${470 - (i % 2) * 30}c-40-14-60 6-70 20M${x + 6} ${470 - (i % 2) * 30}c40-18 60 4 70 18M${x + 6} ${470 - (i % 2) * 30}c-14-30-30-34-46-30M${x + 6} ${470 - (i % 2) * 30}c16-30 34-32 48-26" stroke="#3e7a3a" stroke-width="11" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M${LEFT} 600L${RIGHT} 600L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#6a9a4a"/>
      <path d="M${LEFT} 680C400 660 1200 700 ${RIGHT} 670L${RIGHT} 700C1200 730 400 690 ${LEFT} 712Z" fill="#5aa0c8"/>
      <path d="M${LEFT + 100} 690C500 676 1100 702 ${RIGHT - 140} 688" stroke="#bfe4f4" stroke-width="3" fill="none"/>
      ${Array.from({ length: 14 }, (_, i) => `<path d="M${LEFT + i * 150} 760L${LEFT + i * 150 + 120} 760L${LEFT + i * 150 + 140} 900L${LEFT + i * 150 - 20} 900Z" fill="${i % 2 ? '#7aaa50' : '#c8b858'}" opacity=".8"/>`).join('')}`,
  },
}
