import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 3, Episode 3: the King's Valley at morning, below the small walled city of Salem
 * on its hill, where Melchizedek comes out to meet Abram.
 */

const VALLEY = [640, 620, 650, 660, 640, 650, 630, 640, 650, 640]

export const melchizedekLayers: Record<string, PaperLayerArt> = {
  'salem-hill': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 600L700 540Q980 330 1180 330Q1380 330 1560 470L${RIGHT} 520L${RIGHT} ${BOTTOM}Z" fill="#a89470"/>
      <path d="M700 540Q980 330 1180 330Q1380 330 1560 470" stroke="#d0bc90" stroke-width="5" fill="none"/>
      <path d="M1060 350L1060 280L1090 280L1090 260L1130 260L1130 280L1240 280L1240 260L1280 260L1280 280L1310 280L1310 360Z" fill="#e2d4b0"/>
      ${[1066, 1096, 1136, 1176, 1216, 1246, 1286].map((x) => `<rect x="${x}" y="${x > 1240 || (x > 1080 && x < 1140) ? 248 : 268}" width="14" height="12" fill="#e2d4b0"/>`).join('')}
      <path d="M1160 360L1160 318Q1180 300 1200 318L1200 360Z" fill="#5a4630"/>
      <rect x="1166" y="250" width="28" height="30" fill="#f0e6c8"/><path d="M1162 250L1180 232L1198 250Z" fill="#c8a860"/>
      <path d="${hills(VALLEY)}" fill="#8aa45a"/>
      <path d="${hillCrest(VALLEY)}" stroke="#b0c47a" stroke-width="5" fill="none"/>
      ${[
        [120, 640],
        [380, 650],
        [1420, 650],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y! - 22}" r="26" fill="#5a7a40"/><circle cx="${x! + 20}" cy="${y! - 12}" r="18" fill="#6a8a48"/>`)
        .join('')}`,
  },
}
