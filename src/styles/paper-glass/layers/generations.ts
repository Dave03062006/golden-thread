import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 1, Episode 6: the path Enoch walked with God (Genesis 5:24), rising gently from
 * the foot of the frame into a great light, with soft hills either side.
 */

/** Where the light is, at the top of the path. */
const LIGHT = { x: 980, y: 250 }

export const generationsLayers: Record<string, PaperLayerArt> = {
  'enoch-path': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="${TOP}" x2="0" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3a3a7a"/>
          <stop offset=".6" stop-color="#c890a0"/>
          <stop offset="1" stop-color="#ffe0b0"/>
        </linearGradient>
        <radialGradient id="light" cx="${LIGHT.x}" cy="${LIGHT.y}" r="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset=".12" stop-color="#fff6d8" stop-opacity=".95"/>
          <stop offset=".45" stop-color="#ffe0a0" stop-opacity=".4"/>
          <stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="path" x1="0" y1="${BOTTOM}" x2="0" y2="${LIGHT.y + 160}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#d8b888"/>
          <stop offset="1" stop-color="#fff8e0"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#sky)"/>
      <path d="M${LEFT} 640C200 560 500 520 760 470C880 450 940 420 980 400L1100 420C1300 470 1600 560 ${RIGHT} 620L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5a6a5a"/>
      <path d="M${LEFT} 760C300 690 600 640 820 560L1200 600C1500 680 1700 740 ${RIGHT} 760L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#4a5a4a"/>
      <path d="M560 ${BOTTOM}C640 860 780 720 880 600C920 540 950 470 972 410L988 410C990 470 1000 540 1020 600C1060 720 1100 860 1140 ${BOTTOM}Z" fill="url(#path)"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#light)"/>`,
  },
}
