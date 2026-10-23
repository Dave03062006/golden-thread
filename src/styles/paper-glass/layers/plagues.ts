import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'
import { nileReeds } from './exodus'

/**
 * Level 8 · The Plagues and the Passover: a harvested field under the hot sun, its stubble
 * cut short in rows, with the mud of the brick pit at its edge; and the Nile turned to blood.
 */

export const plaguesLayers: Record<string, PaperLayerArt> = {
  'stubble-field': {
    bounds: bandFrom(360),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([470, 462, 474, 458, 468, 472, 460, 470, 464, 468])}" fill="#a8a06a" opacity=".8"/>
      ${[160, 420, 980, 1300].map((x, i) => `<path d="M${x} 480L${x + 4} ${400 - (i % 2) * 20}L${x + 8} 480Z" fill="#6a4a2a"/><path d="M${x + 4} ${400 - (i % 2) * 20}c-26-10-40 4-46 14M${x + 4} ${400 - (i % 2) * 20}c26-10 40 4 46 14M${x + 4} ${400 - (i % 2) * 20}c-8-20-20-24-30-20" stroke="#4e6a32" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="${hills([500, 494, 504, 490, 500, 506, 494, 502, 496, 500])}" fill="#d8b878"/>
      <path d="${hillCrest([500, 494, 504, 490, 500, 506, 494, 502, 496, 500])}" stroke="#ecd49a" stroke-width="4" fill="none"/>
      ${Array.from({ length: 9 }, (_, row) => {
        const y = 530 + row * 34 + row * row * 2
        return `<path d="M${LEFT} ${y}C400 ${y - 6} 1100 ${y + 6} ${RIGHT} ${y - 2}" stroke="${row % 2 ? '#c8a462' : '#bc965a'}" stroke-width="${3 + row * 0.6}" fill="none"/>`
      }).join('')}
      ${Array.from({ length: 60 }, (_, i) => {
        const x = LEFT + 30 + ((i * 131) % (RIGHT - LEFT - 60))
        const y = 540 + ((i * 47) % 300)
        return `<path d="M${x} ${y}l-2 -${6 + (i % 3) * 2}M${x + 5} ${y}l1 -${5 + (i % 4) * 2}" stroke="#a8843a" stroke-width="2"/>`
      }).join('')}
      <ellipse cx="60" cy="780" rx="250" ry="46" fill="#6a4a2e"/>
      <ellipse cx="60" cy="772" rx="218" ry="32" fill="#7a5636"/>
      <path d="M${LEFT} 860C300 852 900 868 ${RIGHT} 856L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#b08c58"/>`,
  },
  'blood-nile': nileReeds('#8a1e2a', '#c4505a'),
}
