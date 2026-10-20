import type { PaperLayerArt } from '../art'
import { bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 4, Episode 4: Bethel, the stony hill country at night, where Jacob lies down with
 * a stone for a pillow.
 */

const FAR = [430, 400, 440, 410, 380, 420, 400, 430, 410, 440]
const NEAR = [600, 580, 610, 570, 590, 620, 580, 600, 590, 610]

export const bethelLayers: Record<string, PaperLayerArt> = {
  'bethel-stones': {
    bounds: bandFrom(360),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(FAR)}" fill="#2c3254" opacity=".9"/>
      <path d="${hills(NEAR)}" fill="#3a3a54"/>
      <path d="${hillCrest(NEAR)}" stroke="#8a90b8" stroke-width="4" fill="none" opacity=".6"/>
      ${[
        [80, 660, 40],
        [260, 700, 28],
        [420, 640, 22],
        [980, 650, 30],
        [1180, 700, 44],
        [1400, 660, 26],
        [1560, 690, 34],
        [620, 720, 18],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.6}" fill="#4c4c68"/><path d="M${x! - r! * 0.7} ${y! - r! * 0.3}Q${x} ${y! - r! * 0.7} ${x! + r! * 0.6} ${y! - r! * 0.35}" stroke="#7a80a8" stroke-width="3" fill="none"/>`)
        .join('')}
      <path d="M-240 760C300 740 1100 780 1840 750L1840 1035L-240 1035Z" fill="#2a2840"/>`,
  },
}
