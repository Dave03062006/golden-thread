import { WAY } from '../../../content/levels/15-the-judges/episode-4'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'

/**
 * Level 15 · The Judges: the plain below Mount Tabor, with the river Kishon dry and in flood;
 * Gideon's wine press under the oak; the camp of Midian filling the valley at night; the map
 * of the way Israel came, as Jephthah told it; the prison mill at Gaza; and the house of Dagon,
 * standing and fallen.
 */

const at = (p: { x: number; y: number }) => `${p.x * 1600} ${p.y * 900}`

/** The river's winding course across the plain, left to right. */
const KISHON = `M${LEFT} 760Q300 700 560 750Q820 800 1080 740Q1340 690 ${RIGHT} 750`

/** Level 19: David's road out of Jerusalem, as heights across the scene (x, y as fractions). */
const KIDRON_GROUND: [number, number][] = [[0, 0.56], [0.14, 0.6], [0.3, 0.78], [0.44, 0.86], [0.58, 0.76], [0.72, 0.6], [0.84, 0.44], [1, 0.5]]
const kidronPath = `M${LEFT} 504${KIDRON_GROUND.map(([x, y]) => `L${x * 1600} ${y * 900 + 8}`).join('')}L${RIGHT} 458L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z`
/** The ground's height (in frame pixels) at a fraction across the scene. */
function kidronGround(fx: number): number {
  const k = Math.max(1, KIDRON_GROUND.findIndex(([px]) => px >= fx))
  const [x1, y1] = KIDRON_GROUND[k - 1]!
  const [x2, y2] = KIDRON_GROUND[k]!
  return (y1 + ((fx - x1) / (x2 - x1)) * (y2 - y1)) * 900 + 8
}
/** The olive trees on the slope: a trunk standing on the ground, and a gray-green crown. */
const OLIVES = [0.62, 0.66, 0.7, 0.75, 0.79, 0.88, 0.93, 0.97]
  .map((fx, i) => {
    const x = fx * 1600
    const g = kidronGround(fx) + (i % 2) * 14
    return `<rect x="${x - 4}" y="${g - 46}" width="8" height="48" fill="#6a4a2a"/><ellipse cx="${x}" cy="${g - 58}" rx="30" ry="22" fill="${i % 3 ? '#7a8a6a' : '#6a7a5a'}"/>`
  })
  .join('')

export const judgesLayers: Record<string, PaperLayerArt> = {
  'tabor-plain': {
    bounds: bandFrom(200),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 640Q120 300 420 260Q700 300 820 640Z" fill="#5a8a4a"/>
      <path d="M120 620Q320 380 600 400Q760 480 800 640Z" fill="#6a9a54" opacity=".8"/>
      <path d="M900 640Q1200 520 ${RIGHT} 560L${RIGHT} 660L900 660Z" fill="#7a9a5a"/>
      <rect x="${LEFT}" y="640" width="${RIGHT - LEFT}" height="${BOTTOM - 640}" fill="#c8b070"/>
      <path d="${KISHON}" stroke="#a88a52" stroke-width="22" fill="none"/>
      <rect x="${LEFT}" y="860" width="${RIGHT - LEFT}" height="${BOTTOM - 860}" fill="#a8925a"/>`,
  },
  'kishon-flood': {
    bounds: bandFrom(640),
    shadow: false,
    resolution: 0.5,
    svg: `
      <path d="${KISHON}" stroke="#5a8ab8" stroke-width="90" stroke-linecap="round" fill="none" opacity=".9"/>
      <rect x="${LEFT}" y="790" width="${RIGHT - LEFT}" height="${BOTTOM - 790}" fill="#7a6a4a" opacity=".85"/>
      ${Array.from({ length: 14 }, (_, i) => `<ellipse cx="${LEFT + 60 + i * 150}" cy="${820 + (i % 3) * 20}" rx="60" ry="10" fill="#5a8ab8" opacity=".7"/>`).join('')}`,
  },
  'wine-press': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 560Q400 420 800 500Q1200 420 ${RIGHT} 520L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a8a5a"/>
      <rect x="${LEFT}" y="720" width="${RIGHT - LEFT}" height="${BOTTOM - 720}" fill="#b8a070"/>
      <ellipse cx="900" cy="740" rx="300" ry="60" fill="#8a7a6a"/>
      <ellipse cx="900" cy="736" rx="260" ry="46" fill="#5a4a3e"/>
      <path d="M640 740Q900 800 1160 740" stroke="#a89a88" stroke-width="10" fill="none"/>
      ${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${780 + i * 48}" cy="${742 + (i % 2) * 6}" rx="18" ry="6" fill="#d8b860"/>`).join('')}`,
  },
  'midian-camp': {
    bounds: bandFrom(300),
    shadow: false,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 420Q100 400 300 540Q500 700 800 720Q1100 700 1300 540Q1500 400 ${RIGHT} 420L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#2a3048"/>
      <path d="M${LEFT} 520Q200 500 400 640Q600 780 800 790Q1000 780 1200 640Q1400 500 ${RIGHT} 520L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#323a58"/>
      ${Array.from({ length: 40 }, (_, i) => {
        const x = 260 + ((i * 263) % 1080)
        const y = 740 + ((i * 37) % 110)
        return `<path d="M${x - 26} ${y}L${x} ${y - 30}L${x + 26} ${y}Z" fill="${i % 3 ? '#4a4a62' : '#5a5470'}"/>`
      }).join('')}`,
  },
  'jephthah-map': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#e2c890"/>
      <path d="M${LEFT} ${TOP}L120 ${TOP}Q60 300 ${LEFT} 520Z" fill="#7aa0c8"/>
      <path d="M520 ${BOTTOM}L560 780L620 ${BOTTOM}Z" fill="#7aa0c8"/>
      <path d="M864 ${BOTTOM}L880 900L920 ${BOTTOM}Z" fill="#7aa0c8"/>
      <rect x="864" y="560" width="230" height="160" rx="40" fill="#c08a5a" opacity=".55"/>
      <rect x="928" y="410" width="322" height="146" rx="40" fill="#b89a5a" opacity=".55"/>
      <ellipse cx="848" cy="390" rx="40" ry="130" fill="#7aa0c8"/>
      <path d="M848 260Q860 140 880 ${TOP}" stroke="#7aa0c8" stroke-width="12" fill="none"/>
      <path d="M856 180Q1000 170 1300 190" stroke="#7aa0c8" stroke-width="8" fill="none"/>
      <path d="M880 378Q1050 370 1320 380" stroke="#7aa0c8" stroke-width="8" fill="none"/>
      <path d="M${WAY.map(at).join('L')}" stroke="#f4e4b8" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M${WAY.map(at).join('L')}" stroke="#a87a4a" stroke-width="3" stroke-dasharray="10 14" fill="none"/>
      ${WAY.map((p) => `<circle cx="${p.x * 1600}" cy="${p.y * 900}" r="9" fill="#8a5a32"/>`).join('')}`,
  },
  'prison-mill': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#2e2a2c"/>
      ${Array.from({ length: 30 }, (_, i) => `<rect x="${LEFT + (i % 10) * 210 + ((Math.floor(i / 10) % 2) * 105)}" y="${60 + Math.floor(i / 10) * 140}" width="200" height="130" fill="#3a3436"/>`).join('')}
      <rect x="1180" y="140" width="80" height="120" fill="#5a5a6a"/>
      ${[1195, 1220, 1245].map((x) => `<rect x="${x}" y="140" width="6" height="120" fill="#2a2628"/>`).join('')}
      <rect x="${LEFT}" y="740" width="${RIGHT - LEFT}" height="${BOTTOM - 740}" fill="#4a4240"/>
      <ellipse cx="800" cy="760" rx="300" ry="34" fill="#3a3432"/>`,
  },
  'dagon-hall': {
    bounds: FULL,
    shadow: true,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#c8a878"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="220" fill="#8a6a48"/>
      <rect x="${LEFT}" y="200" width="${RIGHT - LEFT}" height="40" fill="#a88458"/>
      ${[100, 360, 1240, 1500].map((x) => `<rect x="${x - 40}" y="240" width="80" height="500" fill="#b8925e"/>`).join('')}
      ${[700, 900].map((x) => `<rect x="${x - 50}" y="240" width="100" height="500" fill="#d8b47e"/><rect x="${x - 60}" y="230" width="120" height="20" fill="#a88458"/>`).join('')}
      <rect x="${LEFT}" y="740" width="${RIGHT - LEFT}" height="${BOTTOM - 740}" fill="#9a7a52"/>`,
  },
  // Level 19: the flat roofs of Jerusalem at dusk, lamps in the windows, and the palace roof in front.
  'jerusalem-roofs': {
    bounds: bandFrom(260),
    shadow: true,
    resolution: 0.5,
    svg: `
      ${Array.from({ length: 16 }, (_, i) => {
        const x = LEFT + i * 130
        const top = 300 + ((i * 37) % 5) * 34
        const lit = i % 3 === 1 ? `<rect x="${x + 40}" y="${top + 40}" width="16" height="22" fill="#f4d070"/>` : ''
        return `<rect x="${x}" y="${top}" width="124" height="${700 - top}" fill="${i % 2 ? '#b89870' : '#c8a87e'}"/><rect x="${x}" y="${top - 8}" width="124" height="10" fill="#9a7a58"/>${lit}`
      }).join('')}
      <rect x="${LEFT}" y="630" width="${RIGHT - LEFT}" height="${BOTTOM - 630}" fill="#d8bc8c"/>
      <rect x="${LEFT}" y="618" width="${RIGHT - LEFT}" height="14" fill="#a8885e"/>`,
  },
  // Level 19: the city wall above, the brook Kidron in the valley, and the Mount of Olives rising to the right.
  'kidron-olives': {
    bounds: bandFrom(320),
    shadow: true,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="400" width="560" height="140" fill="#c8a87e"/>
      ${Array.from({ length: 10 }, (_, i) => `<rect x="${LEFT + i * 56}" y="384" width="34" height="18" fill="#c8a87e"/>`).join('')}
      <path d="${kidronPath}" fill="#9a8a5a"/>
      <path d="M560 790Q700 760 840 792" stroke="#5a8ab8" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${OLIVES}`,
  },
  // Level 20: the Temple courts: colonnades, the Temple's gilded front, and the great stairway up to its door.
  'temple-courts': {
    bounds: bandFrom(120),
    shadow: true,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="360" width="${RIGHT - LEFT}" height="22" fill="#c8b898"/>
      ${Array.from({ length: 22 }, (_, i) => LEFT + 30 + i * 96).filter((x) => x < 540 || x > 1060).map((x) => `<rect x="${x}" y="380" width="26" height="300" fill="#e0d4b8"/>`).join('')}
      <rect x="560" y="140" width="480" height="420" fill="#ece2c8"/>
      <rect x="540" y="128" width="520" height="22" fill="#d8a838"/>
      <rect x="730" y="300" width="140" height="260" fill="#3a2a20"/>
      <rect x="742" y="312" width="116" height="248" fill="#7a3a2a" opacity=".7"/>
      ${Array.from({ length: 8 }, (_, i) => { const y = 560 + i * 26; const half = 200 + i * 26; return `<rect x="${800 - half}" y="${y}" width="${half * 2}" height="26" fill="${i % 2 ? '#d8ccb0' : '#e4d8bc'}"/>` }).join('')}
      <rect x="${LEFT}" y="768" width="${RIGHT - LEFT}" height="${BOTTOM - 768}" fill="#d8c8a8"/>
      <rect x="${LEFT}" y="680" width="${RIGHT - LEFT}" height="90" fill="#cfc0a0" opacity=".6"/>`,
  },
  'dagon-fallen': {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 740${Array.from({ length: 30 }, (_, i) => `L${LEFT + i * 70 + 35} ${600 + ((i * 53) % 110)}`).join('')}L${RIGHT} 740Z" fill="#b8925e"/>
      ${Array.from({ length: 24 }, (_, i) => `<rect x="${LEFT + 40 + i * 86}" y="${680 - ((i * 29) % 60)}" width="70" height="${30 + (i % 3) * 12}" fill="${i % 2 ? '#d8b47e' : '#a88458'}" transform="rotate(${(i * 23) % 40 - 20} ${LEFT + 75 + i * 86} 690)"/>`).join('')}
      <rect x="${LEFT}" y="740" width="${RIGHT - LEFT}" height="${BOTTOM - 740}" fill="#9a7a52"/>`,
  },
}
