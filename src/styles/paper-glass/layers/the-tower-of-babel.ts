import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud } from '../shapes'

/**
 * Level 2, Episode 6: the Tower of Babel. The world after the Flood as a woven tapestry
 * map, its seas and rivers stitched in, where the families of Noah's sons spread out; and
 * the plain of Shinar between its two rivers, under a hot pale sky, where a city and its
 * stepped tower rise, and high clouds that always stay out of reach.
 */

/** The map's seas, rivers and mountains, in frame pixels (see the map positions in episode-6.ts). */
const MEDITERRANEAN = `M${LEFT} 380L100 330L300 360L380 300L440 330L420 380L520 380L650 400L705 430L690 520L640 560L560 590L450 580L300 600L100 580L${LEFT} 600Z`
const BLACK_SEA = 'M560 150C600 100 840 100 880 150C860 200 620 205 560 150Z'
const CASPIAN = 'M1280 60C1340 70 1370 200 1340 340C1300 360 1270 260 1260 180C1255 110 1260 70 1280 60Z'
const GULF = 'M1240 640L1330 650L1530 760L1490 810L1300 710Z'
const RED_SEA = `M700 640L742 640L910 ${BOTTOM}L866 ${BOTTOM}Z`
const NILE = `M640 ${BOTTOM}C650 900 610 780 615 700C618 660 600 630 590 600M615 700C625 660 640 640 650 605`
const EUPHRATES = 'M960 250C990 330 1040 420 1100 500C1160 570 1220 610 1262 640'
const TIGRIS = 'M1080 240C1110 320 1140 400 1170 470C1200 540 1240 600 1272 638'
const MOUNTAINS: [number, number, number][] = [
  [1040, 210, 1.3],
  [1090, 200, 1],
  [980, 240, 0.8],
  [880, 300, 0.8],
  [1180, 280, 0.8],
  [760, 260, 0.7],
]

/** A row of stitches along a path, like thread sewn through the cloth. */
const stitched = (d: string, color: string, width = 4) => `<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-dasharray="10 7" stroke-linecap="round"/>`

/** Rows of little woven waves across a sea. */
function waves(box: [number, number, number, number]): string {
  const [x0, y0, x1, y1] = box
  let out = ''
  for (let y = y0; y < y1; y += 34)
    for (let x = x0 + ((y / 34) % 2) * 26; x < x1; x += 52) out += `<path d="M${x} ${y}q8 -8 16 0q8 8 16 0" stroke="#9cb6c8" stroke-width="2.4" fill="none"/>`
  return out
}

export const theTowerOfBabelLayers: Record<string, PaperLayerArt> = {
  'nations-tapestry': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <pattern id="weave" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#d8c49a"/>
          <path d="M0 3H12M0 9H12" stroke="#cbb68a" stroke-width="2"/>
          <path d="M3 0V12M9 0V12" stroke="#e2d0a8" stroke-width="1.4"/>
        </pattern>
        <clipPath id="med"><path d="${MEDITERRANEAN}"/></clipPath>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#weave)"/>
      ${[MEDITERRANEAN, BLACK_SEA, CASPIAN, GULF, RED_SEA].map((d) => `<path d="${d}" fill="#7a98ae"/>`).join('')}
      <g clip-path="url(#med)">${waves([LEFT, 300, 720, 620])}</g>
      ${[MEDITERRANEAN, BLACK_SEA, CASPIAN, GULF, RED_SEA].map((d) => stitched(d, '#56748a', 3)).join('')}
      ${[NILE, EUPHRATES, TIGRIS].map((d) => `<path d="${d}" stroke="#7a98ae" stroke-width="9" fill="none" stroke-linecap="round"/>${stitched(d, '#56748a', 2.5)}`).join('')}
      ${MOUNTAINS.map(([x, y, s]) => `<path d="M${x - 40 * s} ${y + 26 * s}L${x} ${y - 30 * s}L${x + 40 * s} ${y + 26 * s}Z" fill="#a88a64"/><path d="M${x - 14 * s} ${y - 10 * s}L${x} ${y - 30 * s}L${x + 14 * s} ${y - 10 * s}" stroke="#f4ecdc" stroke-width="${5 * s}" fill="none"/>`).join('')}
      ${[
        [470, 690],
        [560, 720],
        [1350, 560],
        [1420, 600],
        [300, 200],
        [200, 260],
      ]
        .map(([x, y]) => `<path d="M${x} ${y}L${x} ${y! - 30}" stroke="#7a5a38" stroke-width="4"/><path d="M${x! - 16} ${y! - 26}Q${x} ${y! - 46} ${x! + 16} ${y! - 26}" stroke="#6a8a4a" stroke-width="6" fill="none"/>`)
        .join('')}
      ${[0, 1, 2, 3].map((k) => `<rect x="${1158 + k * 7}" y="${548 - k * 14}" width="${52 - k * 14}" height="14" fill="#a87a4a" stroke="#7a5230" stroke-width="2"/>`).join('')}
      <rect x="20" y="20" width="1560" height="860" rx="10" fill="none" stroke="#8a5a3a" stroke-width="14"/>
      <rect x="44" y="44" width="1512" height="812" rx="6" fill="none" stroke="#b8904e" stroke-width="5" stroke-dasharray="18 10"/>`,
  },
  'shinar-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="shinar" x1="0" y1="${TOP}" x2="0" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#8ab4d4"/>
          <stop offset=".7" stop-color="#d4dcd8"/>
          <stop offset="1" stop-color="#f2e2bc"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#shinar)"/>
      <circle cx="1320" cy="120" r="60" fill="#fff6dc" opacity=".85"/>`,
  },
  'high-clouds': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: [
      [-160, -60, 2.6],
      [300, -40, 2.2],
      [760, -70, 2.8],
      [1220, -50, 2.4],
      [60, 60, 1.6],
      [1000, 50, 1.8],
    ]
      .map(([x, y, s]) => cloud(x!, y!, s!, ['#f6f4f0', '#ebe8e4', '#dedad6']))
      .join(''),
  },
  'babel-city': {
    bounds: bandFrom(420),
    shadow: true,
    resolution: 0.5,
    svg: `${Array.from({ length: 18 }, (_, i) => {
      const x = -180 + i * 112 + (i % 3) * 14
      const h = 70 + ((i * 37) % 60)
      const w = 90 + ((i * 23) % 40)
      return `<path d="M${x} 660L${x} ${660 - h}L${x + w} ${660 - h}L${x + w} 660Z" fill="${i % 2 ? '#c8a878' : '#b8986a'}"/><path d="M${x} ${660 - h}L${x + w} ${660 - h}" stroke="#e2c898" stroke-width="5"/><rect x="${x + w / 2 - 8}" y="${640 - h / 2}" width="16" height="20" fill="#7a5a3a"/>`
    }).join('')}`,
  },
  'shinar-plain': {
    bounds: bandFrom(560),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 640C300 625 1200 650 ${RIGHT} 630L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#d6b67e"/>
      <path d="M${LEFT} 640C300 625 1200 650 ${RIGHT} 630" stroke="#ead0a0" stroke-width="5" fill="none"/>
      <path d="M${LEFT} 700C200 690 500 720 900 705C1200 694 1500 712 ${RIGHT} 702" stroke="#7a98ae" stroke-width="16" fill="none" opacity=".75"/>
      ${[760, 830, 910].map((y) => `<path d="M${LEFT} ${y}C400 ${y - 10} 1100 ${y + 12} ${RIGHT} ${y}" stroke="#c4a46e" stroke-width="5" fill="none"/>`).join('')}
      ${[
        [80, 660],
        [140, 668],
        [1460, 655],
        [1530, 664],
      ]
        .map(([x, y]) => `<path d="M${x} ${y}Q${x! + 6} ${y! - 60} ${x! + 2} ${y! - 110}" stroke="#7a5a38" stroke-width="7" fill="none"/>${[-50, -20, 20, 50].map((a) => `<path d="M${x! + 2} ${y! - 110}q${a * 0.6} ${-18 + Math.abs(a) * 0.3} ${a * 1.2} ${10 + Math.abs(a) * 0.4}" stroke="#5a8a4a" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}`)
        .join('')}`,
  },
}
