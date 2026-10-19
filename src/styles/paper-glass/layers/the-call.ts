import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 3, Episode 1: the call of Abram. Haran at dawn, the walls of the city below the
 * hill where Abram's tent stands, its moon tower faint in the mist; and the green hill
 * country of Canaan, a road winding into it.
 */

const HARAN_HILL = [690, 660, 640, 580, 600, 640, 620, 600, 640, 660]
const FAR_HILLS = [470, 430, 460, 420, 450, 470, 430, 450, 420, 460]

export const theCallLayers: Record<string, PaperLayerArt> = {
  'dawn-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="dawn" x1="0" y1="${TOP}" x2="0" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3a4a7a"/>
          <stop offset=".45" stop-color="#9a7aa0"/>
          <stop offset=".78" stop-color="#f0a888"/>
          <stop offset="1" stop-color="#ffe0a0"/>
        </linearGradient>
        <radialGradient id="dawn-sun" cx="1180" cy="560" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff0c0" stop-opacity=".9"/>
          <stop offset="1" stop-color="#fff0c0" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dawn)"/>
      <circle cx="1180" cy="560" r="300" fill="url(#dawn-sun)"/>
      <circle cx="1180" cy="560" r="56" fill="#fff4d0"/>
      ${[
        [160, 80],
        [420, 40],
        [700, 110],
        [980, 30],
        [1460, 90],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#f4f0ff" opacity=".7"/>`)
        .join('')}`,
  },
  'haran-hills': {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(FAR_HILLS)}" fill="#8a7090" opacity=".7"/>
      <path d="M120 600L120 540L150 540L150 520L210 520L210 540L330 540L330 560L420 560L420 600Z" fill="#a08870"/>
      ${[130, 170, 230, 290, 350, 400].map((x) => `<rect x="${x}" y="${(x < 210 ? 510 : x < 330 ? 530 : 550) - 8}" width="14" height="10" fill="#a08870"/>`).join('')}
      <path d="M240 520L240 440L262 440L262 520Z" fill="#b09878"/><circle cx="251" cy="430" r="12" fill="#f0e8d0" opacity=".8"/>
      <path d="${hills(HARAN_HILL)}" fill="#6a5a4a"/>
      <path d="${hillCrest(HARAN_HILL)}" stroke="#c8a078" stroke-width="5" fill="none"/>
      <path d="M${LEFT} 760C400 740 1200 780 ${RIGHT} 750L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5a4a3e"/>`,
  },
  'canaan-hills': {
    bounds: bandFrom(360),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([480, 440, 470, 430, 460, 480, 440, 470, 430, 460])}" fill="#8aa4b0" opacity=".8"/>
      <path d="${hills([560, 520, 560, 590, 540, 570, 530, 560, 540, 570])}" fill="#7a9a5a"/>
      <path d="${hillCrest([560, 520, 560, 590, 540, 570, 530, 560, 540, 570])}" stroke="#a8c47a" stroke-width="5" fill="none"/>
      ${[600, 640, 680].map((y, i) => `<path d="M${LEFT} ${y + i * 6}C300 ${y - 12} 900 ${y + 20} ${RIGHT} ${y}" stroke="#6a8a4a" stroke-width="4" fill="none" opacity=".6"/>`).join('')}
      <path d="${hills([680, 660, 690, 700, 670, 690, 660, 680, 690, 670])}" fill="#5f8a4a"/>
      <path d="M760 ${BOTTOM}C780 860 720 800 820 760C900 730 980 720 1040 690" stroke="#d8c08a" stroke-width="30" fill="none" stroke-linecap="round"/>
      ${[
        [200, 690],
        [320, 700],
        [1300, 680],
        [1460, 700],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y! - 20}" r="26" fill="#3e6a3a"/><circle cx="${x! + 22}" cy="${y! - 10}" r="18" fill="#4a7a42"/>`)
        .join('')}`,
  },
}
