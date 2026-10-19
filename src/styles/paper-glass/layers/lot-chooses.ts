import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 3, Episode 2: Lot chooses the plain. The hills of Canaan parched in the famine;
 * Egypt, green along the Nile, with Pharaoh's palace and the pyramids far off; and the
 * Jordan valley seen from above, well watered "like the garden of the LORD," with the
 * cities of the plain shining in the distance.
 */

const DRY = [560, 520, 560, 590, 540, 570, 530, 560, 540, 570]
const NEAR = [680, 660, 690, 700, 670, 690, 660, 680, 690, 670]

export const lotChoosesLayers: Record<string, PaperLayerArt> = {
  'dry-hills': {
    bounds: bandFrom(360),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([480, 440, 470, 430, 460, 480, 440, 470, 430, 460])}" fill="#b8a888" opacity=".8"/>
      <path d="${hills(DRY)}" fill="#b89a62"/>
      <path d="${hillCrest(DRY)}" stroke="#d8bc84" stroke-width="5" fill="none"/>
      <path d="${hills(NEAR)}" fill="#a88a52"/>
      ${Array.from({ length: 22 }, (_, i) => `<path d="M${-180 + i * 92} ${740 + (i % 3) * 30}l${8 + (i % 4) * 3} -${10 + (i % 5) * 3}" stroke="#7a6038" stroke-width="3"/>`).join('')}
      ${[
        [220, 690],
        [1340, 680],
      ]
        .map(([x, y]) => `<path d="M${x} ${y}L${x} ${y! - 50}M${x} ${y! - 30}L${x! - 18} ${y! - 46}M${x} ${y! - 36}L${x! + 16} ${y! - 52}" stroke="#5a4430" stroke-width="5" fill="none" stroke-linecap="round"/>`)
        .join('')}`,
  },
  'egypt-nile': {
    bounds: bandFrom(360),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${[
        [240, 520, 90],
        [400, 520, 60],
      ]
        .map(([x, y, s]) => `<path d="M${x! - s!} ${y}L${x} ${y! - s! * 0.9}L${x! + s!} ${y}Z" fill="#e2c890"/><path d="M${x} ${y! - s! * 0.9}L${x! + s!} ${y}L${x! + s! * 0.3} ${y}Z" fill="#c8a870"/>`)
        .join('')}
      <path d="M${LEFT} 520L${RIGHT} 520L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#d8c08a"/>
      <path d="M980 520L980 430L1000 430L1000 400L1260 400L1260 430L1280 430L1280 520Z" fill="#e8dcc0"/>
      ${[1010, 1060, 1110, 1160, 1210].map((x) => `<rect x="${x}" y="430" width="16" height="90" fill="#c8b890"/>`).join('')}
      <path d="M990 400L1270 400" stroke="#4a7ab0" stroke-width="8"/>
      <path d="M${LEFT} 560C300 570 900 550 ${RIGHT} 565L${RIGHT} 620C900 605 300 625 ${LEFT} 615Z" fill="#4a8ab8"/>
      <path d="M${LEFT} 580C400 586 1000 572 ${RIGHT} 584" stroke="#8ac0e0" stroke-width="3" fill="none"/>
      <path d="M${LEFT} 615C300 625 900 605 ${RIGHT} 620L${RIGHT} 700C900 690 300 710 ${LEFT} 700Z" fill="#6a9a4a"/>
      ${Array.from({ length: 9 }, (_, i) => {
        const x = -120 + i * 230
        return `<path d="M${x} 640Q${x + 6} 590 ${x + 2} 550" stroke="#7a5a38" stroke-width="7" fill="none"/>${[-40, -15, 15, 40].map((a) => `<path d="M${x + 2} 550q${a * 0.6} ${-14 + Math.abs(a) * 0.3} ${a * 1.2} ${10 + Math.abs(a) * 0.4}" stroke="#4a8a3a" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('')}`
      }).join('')}`,
  },
  'jordan-valley': {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([470, 450, 480, 460, 470, 450, 470, 460, 480, 460])}" fill="#a49aa8" opacity=".7"/>
      <path d="M${LEFT} 560C300 540 800 600 ${RIGHT} 560L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#7aaa5a"/>
      <path d="M${LEFT} 600C200 640 400 590 700 640C1000 690 1200 620 ${RIGHT} 660" stroke="#4a8ac0" stroke-width="16" fill="none"/>
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${-160 + i * 130}" cy="${590 + ((i * 37) % 70)}" r="${18 + (i % 3) * 6}" fill="#4a8a42"/>`).join('')}
      ${[
        [1180, 560],
        [1320, 572],
      ]
        .map(([x, y]) => `<path d="M${x! - 50} ${y}L${x! - 50} ${y! - 26}L${x! - 20} ${y! - 26}L${x! - 20} ${y! - 46}L${x! + 20} ${y! - 46}L${x! + 20} ${y! - 26}L${x! + 50} ${y! - 26}L${x! + 50} ${y}Z" fill="#e8d8b0"/><circle cx="${x}" cy="${y! - 30}" r="60" fill="#fff0c0" opacity=".25"/>`)
        .join('')}
      <path d="M${LEFT} 760L240 720L520 760L560 ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a7a52"/>
      <path d="M${LEFT} 760L240 720L520 760" stroke="#c8a476" stroke-width="5" fill="none"/>`,
  },
}
