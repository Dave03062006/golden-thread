import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'

/**
 * Level 5, Episode 2: Potiphar's house in Egypt, white plaster walls and painted columns
 * with palms and the Nile beyond; and the king's prison, dark mud brick, lit only by a high
 * barred window.
 */

export const faithfulLayers: Record<string, PaperLayerArt> = {
  'egypt-house': {
    bounds: bandFrom(260),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 560C300 540 1300 570 ${RIGHT} 550L${RIGHT} 600L${LEFT} 600Z" fill="#5a9ab8"/>
      ${[80, 260, 1380, 1560].map((x) => `<path d="M${x} 600L${x + 8} 380L${x + 16} 600Z" fill="#7a5a32"/><path d="M${x + 8} 380C${x - 60} 360 ${x - 80} 400 ${x - 90} 420M${x + 8} 380C${x + 70} 350 ${x + 90} 390 ${x + 100} 410M${x + 8} 380C${x - 20} 330 ${x - 40} 330 ${x - 60} 340M${x + 8} 380C${x + 30} 330 ${x + 50} 330 ${x + 70} 345" stroke="#4a8a4a" stroke-width="14" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M380 300L1220 300L1220 760L380 760Z" fill="#f0e8d6"/>
      <path d="M360 280L1240 280L1240 310L360 310Z" fill="#d8c8a8"/>
      ${[440, 600, 760, 920, 1080].map((x) => `<path d="M${x} 310L${x + 40} 310L${x + 40} 760L${x} 760Z" fill="#e4d4b4"/><path d="M${x - 6} 310L${x + 46} 310L${x + 40} 336L${x} 336Z" fill="#3a8aa8"/><path d="M${x} 370L${x + 40} 370M${x} 400L${x + 40} 400" stroke="#c8503a" stroke-width="6"/>`).join('')}
      <path d="M${LEFT} 740L${RIGHT} 740L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#d8c49a"/>
      <path d="M${LEFT} 760L${RIGHT} 760" stroke="#c4ae82" stroke-width="6"/>`,
  },
  prison: {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <linearGradient id="prison-shaft" x1="0" y1="140" x2="0" y2="800" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ffe8b0" stop-opacity=".45"/>
          <stop offset="1" stop-color="#ffe8b0" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#3a2a22"/>
      ${Array.from({ length: 18 }, (_, row) =>
        Array.from({ length: 16 }, (_, col) => `<rect x="${LEFT + col * 140 + (row % 2) * 70}" y="${TOP + row * 56}" width="132" height="50" fill="${(row + col) % 3 ? '#4a3628' : '#44322a'}"/>`).join(''),
      ).join('')}
      <path d="M700 140L900 140L900 260L700 260Z" fill="#c8b890"/>
      ${[740, 780, 820, 860].map((x) => `<path d="M${x - 4} 140L${x + 4} 140L${x + 4} 260L${x - 4} 260Z" fill="#2a1e18"/>`).join('')}
      <path d="M700 260L900 260L1120 800L480 800Z" fill="url(#prison-shaft)"/>
      <path d="M${LEFT} 780L${RIGHT} 780L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#2a1e18"/>
      <path d="M${LEFT} 780L${RIGHT} 780" stroke="#5a4636" stroke-width="6"/>`,
  },
}
