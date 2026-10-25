import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 9 · Through the Sea: the shore where the camp stands, the sea before it and the far
 * mountains beyond; the seabed between the walls of water; the same seabed seen from above,
 * like a map, for the play "the path through the sea"; the palms and springs of Elim; the dry
 * red valley of Rephidim; and the hilltop above the valley where Moses holds up his hands.
 */

/** The crossroads on the seabed, as fractions of the frame (the same as the play's, in content/levels/09-…/episode-2.ts). */
const NODES: [number, number][] = [
  [0.08, 0.48],
  [0.2, 0.4],
  [0.24, 0.62],
  [0.34, 0.32],
  [0.44, 0.5],
  [0.38, 0.16],
  [0.56, 0.42],
  [0.58, 0.64],
  [0.68, 0.28],
  [0.78, 0.44],
  [0.76, 0.14],
  [0.92, 0.38],
]
const PATHS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 5],
  [3, 4],
  [4, 7],
  [4, 6],
  [6, 8],
  [8, 10],
  [8, 9],
  [9, 11],
]
/** The pools and the reefs that end the ways going nowhere. */
const POOLS = [2, 7]
const REEFS = [5, 10]
const at = ([x, y]: [number, number]) => [x * 1600, y * 900] as const

/** A palm: a leaning trunk and a crown of fronds. */
function palm(x: number, base: number, height: number, lean: number): string {
  const tx = x + lean
  const ty = base - height
  const fronds = [
    [-70, 10],
    [-50, -26],
    [-10, -40],
    [34, -30],
    [66, 6],
    [44, 28],
    [-40, 30],
  ]
  return `<path d="M${x - 6} ${base}Q${x + lean * 0.3} ${base - height * 0.5} ${tx - 3} ${ty}L${tx + 3} ${ty}Q${x + lean * 0.3 + 8} ${base - height * 0.5} ${x + 6} ${base}Z" fill="#7a5a36"/>
    ${fronds.map(([dx, dy], i) => `<path d="M${tx} ${ty}Q${tx + dx! * 0.5} ${ty + dy! - 18} ${tx + dx!} ${ty + dy!}Q${tx + dx! * 0.5} ${ty + dy! * 0.5 - 4} ${tx} ${ty}Z" fill="${i % 2 ? '#4e7a32' : '#5e8a3a'}"/>`).join('')}`
}

const FAR_SHORE = [440, 420, 446, 414, 432, 448, 422, 436, 418, 440]
const RIDGE = [360, 300, 380, 330, 400, 360, 310, 370, 320, 350]

export const crossingLayers: Record<string, PaperLayerArt> = {
  'red-sea-shore': {
    bounds: bandFrom(340),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(FAR_SHORE)}" fill="#b49ab0" opacity=".75"/>
      <path d="M${LEFT} 468L${RIGHT} 468L${RIGHT} 566L${LEFT} 566Z" fill="#3e78a8"/>
      <path d="M${LEFT} 468L${RIGHT} 468L${RIGHT} 486L${LEFT} 486Z" fill="#5a92c0" opacity=".8"/>
      ${[496, 514, 532, 550].map((y, i) => `<path d="M${LEFT + 40 + i * 90} ${y}C400 ${y - 5} 1100 ${y + 5} ${RIGHT - 60} ${y}" stroke="#8ac0e4" stroke-width="2.4" fill="none" opacity=".6"/>`).join('')}
      <path d="M${LEFT} 572C300 556 900 584 ${RIGHT} 562L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#e2c894"/>
      <path d="M${LEFT} 572C300 556 900 584 ${RIGHT} 562" stroke="#f4e2b8" stroke-width="6" fill="none"/>
      <path d="M${LEFT} 580C300 566 900 592 ${RIGHT} 572" stroke="#c8e0ec" stroke-width="3" fill="none" opacity=".7"/>
      ${[660, 760, 860].map((y, i) => `<path d="M${LEFT} ${y}C300 ${y - 14} 900 ${y + 12} ${RIGHT} ${y - 6}" stroke="#cfae74" stroke-width="${3 + i}" fill="none" opacity=".55"/>`).join('')}
      ${[
        [120, 640, 26],
        [520, 690, 18],
        [1380, 650, 30],
        [1560, 720, 22],
        [-140, 760, 34],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.55}" fill="#a88a62"/><ellipse cx="${x! - r! * 0.2}" cy="${y! - r! * 0.2}" rx="${r! * 0.6}" ry="${r! * 0.3}" fill="#c4a67a"/>`)
        .join('')}`,
  },
  'sea-walls': {
    bounds: bandFrom(150),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 200C300 186 800 214 1200 196S${RIGHT} 206 ${RIGHT} 206L${RIGHT} 660L${LEFT} 660Z" fill="#2e5e8e"/>
      <path d="M${LEFT} 200C300 186 800 214 1200 196S${RIGHT} 206 ${RIGHT} 206L${RIGHT} 260L${LEFT} 260Z" fill="#4a82b4"/>
      <path d="M${LEFT} 200C300 186 800 214 1200 196S${RIGHT} 206 ${RIGHT} 206" stroke="#e8f4fc" stroke-width="10" fill="none"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${LEFT + i * 230} ${300 + (i % 3) * 90}l60 -10l60 10" stroke="#5a92c4" stroke-width="4" fill="none" opacity=".7"/>`).join('')}
      ${Array.from({ length: 7 }, (_, i) => `<path d="M${LEFT + 80 + i * 300} 620L${LEFT + 120 + i * 300} 260" stroke="#7aaed8" stroke-width="3" opacity=".35"/>`).join('')}
      <path d="M${LEFT} 652C300 640 900 668 ${RIGHT} 648L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#a89070"/>
      <path d="M${LEFT} 652C300 640 900 668 ${RIGHT} 648" stroke="#c4ae8a" stroke-width="6" fill="none"/>
      ${Array.from({ length: 16 }, (_, i) => `<ellipse cx="${LEFT + 60 + i * 130}" cy="${700 + (i % 4) * 34}" rx="${16 + (i % 3) * 8}" ry="${5 + (i % 2) * 3}" fill="${i % 3 ? '#8a7458' : '#6a7e8a'}" opacity=".8"/>`).join('')}
      <path d="M${LEFT} 880C400 860 1200 884 ${RIGHT} 866L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#2e5e8e"/>
      <path d="M${LEFT} 880C400 860 1200 884 ${RIGHT} 866" stroke="#e8f4fc" stroke-width="8" fill="none"/>`,
  },
  'sea-map': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#2e5e8e"/>
      ${Array.from({ length: 30 }, (_, i) => `<path d="M${LEFT + ((i * 173) % (RIGHT - LEFT))} ${TOP + 30 + ((i * 97) % 1100)}q20 -10 40 0t40 0" stroke="#5a92c4" stroke-width="4" fill="none" opacity=".7"/>`).join('')}
      <path d="M${LEFT} 40C300 90 700 30 1000 70S1500 40 ${RIGHT} 60L${RIGHT} 680C1500 650 1100 700 800 670S300 690 ${LEFT} 660Z" fill="#d8c08a"/>
      <path d="M${LEFT} 40C300 90 700 30 1000 70S1500 40 ${RIGHT} 60" stroke="#e8f4fc" stroke-width="12" fill="none"/>
      <path d="M${LEFT} 660C300 690 800 670 1100 700S1500 650 ${RIGHT} 680" stroke="#e8f4fc" stroke-width="12" fill="none"/>
      <path d="M${LEFT} ${TOP}L140 ${TOP}Q90 450 140 ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#ecd8a8"/>
      <path d="M${RIGHT} ${TOP}L1460 ${TOP}Q1520 450 1460 ${BOTTOM}L${RIGHT} ${BOTTOM}Z" fill="#ecd8a8"/>
      ${Array.from({ length: 28 }, (_, i) => `<circle cx="${180 + ((i * 211) % 1240)}" cy="${110 + ((i * 131) % 520)}" r="${3 + (i % 3)}" fill="#b89a64" opacity=".8"/>`).join('')}
      ${POOLS.map((n) => {
        const [x, y] = at(NODES[n]!)
        return `<ellipse cx="${x + 30}" cy="${y + 26}" rx="70" ry="40" fill="#3e78a8"/><ellipse cx="${x + 20}" cy="${y + 18}" rx="40" ry="18" fill="#6aa4d0" opacity=".7"/>`
      }).join('')}
      ${REEFS.map((n) => {
        const [x, y] = at(NODES[n]!)
        return `<path d="M${x - 50} ${y - 20}l30 -40l40 10l30 -20l30 50l-20 40l-60 10l-40 -20z" fill="#7a6a5a"/><path d="M${x - 20} ${y - 40}l40 10l20 -10" stroke="#a8968a" stroke-width="5" fill="none"/>`
      }).join('')}
      ${PATHS.map(([a, b]) => {
        const [x1, y1] = at(NODES[a]!)
        const [x2, y2] = at(NODES[b]!)
        return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#8a6a3a" stroke-width="7" stroke-dasharray="2 14" stroke-linecap="round"/>`
      }).join('')}
      ${NODES.map((n) => {
        const [x, y] = at(n)
        return `<circle cx="${x}" cy="${y}" r="12" fill="#b08a52"/><circle cx="${x}" cy="${y}" r="6" fill="#f4e6c4"/>`
      }).join('')}
      <rect x="${LEFT + 20}" y="${TOP + 20}" width="${RIGHT - LEFT - 40}" height="${BOTTOM - TOP - 40}" fill="none" stroke="#a88a5a" stroke-width="8" stroke-dasharray="20 10"/>`,
  },
  'elim-oasis': {
    bounds: bandFrom(260),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([470, 452, 476, 446, 468, 460, 444, 470, 454, 462])}" fill="#e6cfa0" opacity=".85"/>
      ${[140, 300, 1180, 1360, 1500].map((x, i) => palm(x, 600, 210 + (i % 3) * 30, (i % 2 ? 1 : -1) * 24)).join('')}
      <path d="${hills([640, 610, 650, 626, 606, 640, 616, 652, 620, 634])}" fill="#d8b47a"/>
      <path d="${hillCrest([640, 610, 650, 626, 606, 640, 616, 652, 620, 634])}" stroke="#f0d8a8" stroke-width="5" fill="none"/>
      ${[
        [260, 690],
        [560, 720],
        [880, 690],
        [1220, 720],
      ]
        .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="90" ry="16" fill="#6a9a4a" opacity=".85"/><ellipse cx="${x}" cy="${y! + 2}" rx="54" ry="9" fill="#4a8ab8"/><ellipse cx="${x! - 12}" cy="${y}" rx="22" ry="3" fill="#9ad0ee"/>`)
        .join('')}
      ${[-60, 460, 1020, 1660].map((x, i) => palm(x, 760, 260 + (i % 2) * 40, (i % 2 ? -1 : 1) * 30)).join('')}
      <path d="M${LEFT} 860L${RIGHT} 840L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#c8a068" opacity=".5"/>`,
  },
  rephidim: {
    bounds: bandFrom(220),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills(RIDGE)}" fill="#a86a52" opacity=".85"/>
      <path d="M${LEFT} 640L${LEFT} 300L-60 260L80 340L180 300L300 420L360 640Z" fill="#8a4e3e"/>
      <path d="M-60 260L80 340L60 420ZM180 300L300 420L240 460Z" fill="#a8604a"/>
      <path d="M${RIGHT} 640L${RIGHT} 320L1700 280L1580 360L1480 330L1380 440L1300 640Z" fill="#8a4e3e"/>
      <path d="M1700 280L1580 360L1620 420ZM1480 330L1380 440L1440 470Z" fill="#a8604a"/>
      <path d="${hills([620, 600, 630, 612, 640, 620, 606, 632, 614, 624])}" fill="#c08a62"/>
      <path d="${hillCrest([620, 600, 630, 612, 640, 620, 606, 632, 614, 624])}" stroke="#dcaa7e" stroke-width="5" fill="none"/>
      <path d="M${LEFT} 700C300 690 900 706 ${RIGHT} 696L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#c89c70"/>
      ${Array.from({ length: 22 }, (_, i) => `<ellipse cx="${LEFT + 40 + i * 98}" cy="${760 + (i % 4) * 44}" rx="${8 + (i % 3) * 6}" ry="${4 + (i % 2) * 3}" fill="#9a6a4a" opacity=".8"/>`).join('')}
      ${[760, 830].map((y, i) => `<path d="M${LEFT} ${y}C400 ${y - 10} 1100 ${y + 10} ${RIGHT} ${y - 4}" stroke="#a87a54" stroke-width="${3 + i}" fill="none" opacity=".5"/>`).join('')}`,
  },
  hilltop: {
    bounds: bandFrom(300),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([420, 380, 430, 400, 440, 410, 386, 424, 398, 416])}" fill="#b49ab0" opacity=".7"/>
      <path d="M${LEFT} 480C300 470 1000 492 ${RIGHT} 476L${RIGHT} 760L${LEFT} 760Z" fill="#dcc49a" opacity=".85"/>
      ${[520, 560, 600].map((y) => `<path d="M${LEFT} ${y}C400 ${y - 6} 1100 ${y + 6} ${RIGHT} ${y - 2}" stroke="#c8ac80" stroke-width="3" fill="none" opacity=".6"/>`).join('')}
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 840C100 800 300 700 480 672C700 660 1000 660 1200 676C1380 700 1560 800 ${RIGHT} 830L${RIGHT} ${BOTTOM}Z" fill="#a8845a"/>
      <path d="M${LEFT} 840C100 800 300 700 480 672C700 660 1000 660 1200 676C1380 700 1560 800 ${RIGHT} 830" stroke="#c8a476" stroke-width="7" fill="none"/>
      ${[
        [380, 720, 26],
        [1300, 730, 22],
        [700, 780, 16],
        [1020, 800, 20],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.55}" fill="#8a6a46"/><ellipse cx="${x! - r! * 0.2}" cy="${y! - r! * 0.2}" rx="${r! * 0.6}" ry="${r! * 0.3}" fill="#a8845a"/>`)
        .join('')}
      ${[[200, 780], [1460, 790], [900, 860]].map(([x, y]) => `<path d="M${x} ${y}c-14-24 4-34 14-14c4-22 22-20 18 4c14-10 22 6 10 12z" fill="#7a8a3a"/>`).join('')}`,
  },
}
