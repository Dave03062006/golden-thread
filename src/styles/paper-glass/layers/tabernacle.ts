import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 11 · The Tabernacle and the Holy Life: the holy place inside the tabernacle, its
 * walls of golden boards lit by the lampstand, and the veil before the ark, worked with
 * cherubim; and the wheel of the year, twelve moons in a ring around the tabernacle, for the
 * play "the feasts of the year".
 */

/** The wheel's middle and its moons' ring, in frame units (the same as the play's, in content/levels/11-the-tabernacle-and-the-holy-life/episode-6.ts). */
const WHEEL = { x: 800, y: 360, rx: 320, ry: 243 }

export const tabernacleLayers: Record<string, PaperLayerArt> = {
  'holy-place': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <linearGradient id="hp-light" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#6a4a22"/><stop offset=".55" stop-color="#b8862e"/><stop offset="1" stop-color="#e8b850"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#hp-light)"/>
      ${Array.from({ length: 34 }, (_, i) => `<rect x="${LEFT + i * 60}" y="${TOP}" width="6" height="${BOTTOM - TOP}" fill="#5a3a1a" opacity=".55"/>`).join('')}
      <path d="M${LEFT} ${TOP}L${RIGHT} ${TOP}L${RIGHT} 90Q800 60 ${LEFT} 90Z" fill="#8a2a2a"/>
      <path d="M${LEFT} 90Q800 60 ${RIGHT} 90" stroke="#5a1a1a" stroke-width="10" fill="none"/>
      <rect x="${LEFT}" y="800" width="${RIGHT - LEFT}" height="${BOTTOM - 800}" fill="#a8743a"/>
      <rect x="${LEFT}" y="800" width="${RIGHT - LEFT}" height="8" fill="#c8945a"/>
      <g>
        <rect x="470" y="80" width="340" height="720" fill="#3a5aa8"/>
        <rect x="470" y="80" width="100" height="720" fill="#6a3a7a"/>
        <rect x="710" y="80" width="100" height="720" fill="#b8323a"/>
        ${[0, 1, 2]
          .map((row) =>
            [0, 1].map((col) => {
              const x = 560 + col * 160
              const y = 200 + row * 220
              return `<path d="M${x} ${y}Q${x - 50} ${y - 50} ${x - 70} ${y + 10}Q${x - 30} ${y - 10} ${x} ${y + 30}Q${x + 30} ${y - 10} ${x + 70} ${y + 10}Q${x + 50} ${y - 50} ${x} ${y}Z" fill="#e0b040" opacity=".85"/><circle cx="${x}" cy="${y + 10}" r="10" fill="#f4d070"/>`
            }),
          )
          .flat()
          .join('')}
        ${Array.from({ length: 12 }, (_, i) => `<path d="M${470 + i * 29} 80L${480 + i * 29} 800" stroke="#1a2a5a" stroke-width="2" opacity=".25"/>`).join('')}
        <rect x="460" y="70" width="360" height="16" fill="#e0b040"/>
      </g>`,
  },
  'year-wheel': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <ellipse cx="${WHEEL.x}" cy="${WHEEL.y}" rx="${WHEEL.rx}" ry="${WHEEL.ry}" fill="none" stroke="#c8d4ec" stroke-width="3" stroke-dasharray="6 14" opacity=".55"/>
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        const x = Math.round(WHEEL.x + Math.sin(a) * WHEEL.rx)
        const y = Math.round(WHEEL.y - Math.cos(a) * WHEEL.ry)
        // Each moon a little further through its phases, as the months go round.
        const shift = Math.round(Math.cos(a) * 22)
        return `<circle cx="${x}" cy="${y}" r="30" fill="#2a3458" opacity=".9"/><circle cx="${x}" cy="${y}" r="24" fill="#f4f0dc"/><circle cx="${x - shift}" cy="${y}" r="24" fill="#3a4468" opacity="${i === 6 ? 0 : 0.92}"/>`
      }).join('')}
      <ellipse cx="${WHEEL.x}" cy="${WHEEL.y + 56}" rx="170" ry="22" fill="#a8743a"/>
      <ellipse cx="${WHEEL.x}" cy="${WHEEL.y + 52}" rx="160" ry="16" fill="#c8945a"/>`,
  },
}
