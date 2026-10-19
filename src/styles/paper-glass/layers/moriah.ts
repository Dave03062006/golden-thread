import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, RIGHT, bandFrom } from '../frame'

/**
 * Level 3, Episode 10: the land of Moriah. The mountain seen far off on the third day;
 * the steep path up its side, which father and son climb together; and its rocky summit
 * under a wide sky, where the altar is built.
 */

/** The path up the mountainside, from the foot on the left to the bend near the top on the right. */
export const PATH = 'M-100 880C200 860 380 820 520 760C660 700 760 690 900 620C1040 550 1160 520 1300 450C1400 400 1480 380 1560 330'

export const moriahLayers: Record<string, PaperLayerArt> = {
  'moriah-far': {
    bounds: bandFrom(300),
    shadow: false,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 640L400 600L700 520Q860 360 980 350Q1100 360 1240 520L1500 600L${RIGHT} 620L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a8a90" opacity=".85"/>
      <path d="M700 520Q860 360 980 350Q1100 360 1240 520" stroke="#c8b0a8" stroke-width="5" fill="none"/>`,
  },
  'moriah-path': {
    bounds: bandFrom(200),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 900C200 880 600 760 900 640C1200 520 1500 300 ${RIGHT} 220L${RIGHT} ${BOTTOM}Z" fill="#a08a6a"/>
      <path d="M${LEFT} 900C200 880 600 760 900 640C1200 520 1500 300 ${RIGHT} 220" stroke="#c8ae84" stroke-width="5" fill="none"/>
      ${[
        [300, 960, 50],
        [760, 880, 70],
        [1200, 760, 60],
        [1600, 600, 70],
      ]
        .map(([x, y, r]) => `<path d="M${x! - r!} ${y}Q${x} ${y! - r! * 1.2} ${x! + r!} ${y}Z" fill="#8a7458"/>`)
        .join('')}
      <path d="${PATH}" stroke="#d8c094" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
      ${[
        [420, 840],
        [980, 650],
        [1380, 470],
      ]
        .map(([x, y]) => `<path d="M${x} ${y}L${x! - 14} ${y! - 30}M${x} ${y}L${x! + 10} ${y! - 34}M${x} ${y}L${x} ${y! - 40}" stroke="#6a7a4a" stroke-width="4"/>`)
        .join('')}`,
  },
  'moriah-top': {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 760Q200 700 500 650L1100 640Q1400 680 ${RIGHT} 760L${RIGHT} ${BOTTOM}Z" fill="#9a8466"/>
      <path d="M${LEFT} 760Q200 700 500 650L1100 640Q1400 680 ${RIGHT} 760" stroke="#c8ae84" stroke-width="5" fill="none"/>
      ${[
        [260, 720, 60],
        [1360, 700, 50],
      ]
        .map(([x, y, r]) => `<path d="M${x! - r!} ${y}Q${x} ${y! - r!} ${x! + r!} ${y}Z" fill="#8a7458"/>`)
        .join('')}`,
  },
}
