import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills } from '../shapes'

/**
 * Level 7 · Moses Is Called: the brick pits below Pharaoh's half-built store-cities; a
 * street in the Hebrew quarter, its houses' windows dark until their lamps are lit; inside a
 * Hebrew house, with a niche for the lamp and the door open on the night; the bank of the
 * Nile, thick with papyrus; and Horeb, the mountain of God, red granite in the wilderness.
 */

/** The houses of the Hebrew quarter: where each stands, and its window (see episode-1's HOUSES). */
const HOUSES = [384, 608, 832, 1056, 1280]

/** A clump of papyrus: tall stalks, each with its fan of a head. */
function papyrus(x: number, base: number, count: number, height: number, seed: number): string {
  let out = ''
  for (let i = 0; i < count; i++) {
    const sx = x + ((i * 37 + seed * 13) % 90) - 45
    const h = height * (0.75 + (((i * 53 + seed) % 10) / 10) * 0.35)
    const lean = ((i % 3) - 1) * 10
    const tx = sx + lean
    const ty = base - h
    out += `<path d="M${sx} ${base}L${tx} ${ty.toFixed(0)}" stroke="#4a7a2a" stroke-width="4"/>`
    out += `<path d="M${tx} ${ty.toFixed(0)}l-22 -18l8 -2l14 14l-2 -22l6 0l2 22l12 -16l6 4z" fill="${i % 2 ? '#7aa840' : '#8ab84a'}"/>`
  }
  return out
}

/** The bank of the Nile, thick with papyrus, its water in the colors given (blue, or turned to blood). */
export function nileReeds(water: string, ripple: string): PaperLayerArt {
  return {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([520, 515, 522, 512, 520, 518, 514, 520, 516, 520])}" fill="#8aa06a" opacity=".85"/>
      ${[80, 300, 520, 1180, 1440].map((x, i) => `<path d="M${x} 540L${x + 5} ${430 - (i % 2) * 24}L${x + 10} 540Z" fill="#6a4a2a"/><path d="M${x + 5} ${430 - (i % 2) * 24}c-34-12-52 6-60 18M${x + 5} ${430 - (i % 2) * 24}c34-14 52 4 60 16M${x + 5} ${430 - (i % 2) * 24}c-12-26-26-30-40-26M${x + 5} ${430 - (i % 2) * 24}c14-26 30-28 42-22" stroke="#3e6a32" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M${LEFT} 556L${RIGHT} 556L${RIGHT} 700L${LEFT} 700Z" fill="${water}"/>
      ${[590, 620, 650, 676].map((y, i) => `<path d="M${LEFT + 80 + i * 60} ${y}C400 ${y - 6} 1000 ${y + 6} ${RIGHT - 120} ${y}" stroke="${ripple}" stroke-width="2.4" fill="none" opacity=".7"/>`).join('')}
      ${papyrus(80, 700, 14, 210, 3)}${papyrus(-120, 700, 10, 190, 7)}${papyrus(1120, 700, 12, 220, 5)}${papyrus(1360, 700, 14, 200, 9)}${papyrus(560, 700, 6, 140, 11)}
      <path d="M${LEFT} 696C300 690 900 704 ${RIGHT} 694L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#7a7a42"/>
      <path d="M${LEFT} 696C300 690 900 704 ${RIGHT} 694" stroke="#a8a860" stroke-width="5" fill="none"/>`,
  }
}

export const exodusLayers: Record<string, PaperLayerArt> = {
  'brick-pits': {
    bounds: bandFrom(340),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="${hills([600, 590, 600, 585, 600, 595, 590, 600, 590, 600])}" fill="#d8c09a" opacity=".85"/>
      <path d="M120 600L120 440L520 440L520 600Z" fill="#c8a070"/>
      <path d="M160 440L160 380L480 380L480 440Z" fill="#b8905e"/>
      <path d="M520 600L700 440L720 440L560 600Z" fill="#a8845a"/>
      <path d="M980 600L980 420L1420 420L1420 600Z" fill="#c8a070"/>
      ${[1010, 1080, 1150, 1220, 1290, 1360].map((x) => `<path d="M${x} 420L${x} 600" stroke="#a8845a" stroke-width="14"/>`).join('')}
      <path d="M1040 420L1040 360L1180 360L1180 420Z" fill="#b8905e"/>
      <path d="M1180 360L1250 360L1250 380L1180 380Z" fill="#d8b888" opacity=".7"/>
      <path d="${hills([640, 630, 645, 632, 640, 650, 636, 644, 630, 640])}" fill="#c4a272"/>
      <path d="${hillCrest([640, 630, 645, 632, 640, 650, 636, 644, 630, 640])}" stroke="#dcc092" stroke-width="4" fill="none"/>
      <ellipse cx="200" cy="760" rx="230" ry="44" fill="#6a4a2e"/>
      <ellipse cx="200" cy="752" rx="200" ry="30" fill="#7a5636"/>
      ${Array.from({ length: 4 }, (_, row) => Array.from({ length: 9 }, (_, i) => `<path d="M${820 + i * 64 + (row % 2) * 30} ${700 + row * 34}l44 0l0 18l-44 0z" fill="${(i + row) % 3 ? '#a8784a' : '#b8885a'}"/>`).join('')).join('')}
      <path d="M${LEFT} 860L${RIGHT} 860L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#b08c60"/>`,
  },
  'hebrew-quarter': {
    bounds: bandFrom(380),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 520L${LEFT + 160} 520L${LEFT + 160} 470L${LEFT + 260} 470L${LEFT + 260} 700L${LEFT} 700Z" fill="#5e4c3a"/>
      ${HOUSES.map((x, i) => {
        const top = 420 + (i % 2) * 24
        return `<path d="M${x - 100} 700L${x - 100} ${top}L${x + 100} ${top}L${x + 100} 700Z" fill="${i % 2 ? '#6e5a44' : '#7a6448'}"/>
          <path d="M${x - 108} ${top}L${x + 108} ${top}L${x + 108} ${top - 12}L${x - 108} ${top - 12}Z" fill="#5e4c3a"/>
          <path d="M${x - 22} 478L${x + 22} 478L${x + 22} 522L${x - 22} 522Z" fill="#241e2c"/>
          <path d="M${x - 26} 524L${x + 26} 524" stroke="#4e3e2e" stroke-width="5"/>
          <path d="M${x + 40} 700L${x + 40} 600Q${x + 62} 580 ${x + 84} 600L${x + 84} 700Z" fill="#2e2630"/>`
      }).join('')}
      <path d="M1400 700L1400 470L${RIGHT} 470L${RIGHT} 700Z" fill="#5e4c3a"/>
      <path d="M${LEFT} 700L${RIGHT} 700L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5a4a3a"/>
      <path d="M${LEFT} 760C400 748 1200 772 ${RIGHT} 756" stroke="#4a3c2e" stroke-width="6" fill="none"/>
      ${Array.from({ length: 18 }, (_, i) => `<circle cx="${LEFT + 60 + i * 115}" cy="${730 + (i % 4) * 40}" r="${2 + (i % 3)}" fill="#7a6a56"/>`).join('')}`,
  },
  'house-inside': {
    bounds: FULL,
    shadow: false,
    resolution: 0.5,
    svg: `
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#7a5c40"/>
      ${Array.from({ length: 16 }, (_, row) => Array.from({ length: 22 }, (_, i) => `<path d="M${LEFT + i * 96 + (row % 2) * 48} ${TOP + row * 52}l92 0l0 48l-92 0z" fill="${(i * 7 + row * 3) % 5 ? '#80603f' : '#74583a'}"/>`).join('')).join('')}
      <path d="M430 530L530 530L530 470Q480 430 430 470Z" fill="#4a3424"/>
      <path d="M1140 700L1140 430L1320 430L1320 700Z" fill="#1a2040"/>
      ${[[1180, 470], [1270, 500], [1220, 540], [1290, 450]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#f0e8c8"/>`).join('')}
      <path d="M1130 430L1330 430L1330 444L1130 444ZM1130 430L1144 430L1144 700L1130 700ZM1316 430L1330 430L1330 700L1316 700Z" fill="#5a4028"/>
      <path d="M${LEFT} 700L${RIGHT} 700L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#5e442c"/>
      <path d="M560 760L1000 760L1020 820L540 820Z" fill="#a8843a" opacity=".85"/>
      ${[600, 680, 760, 840, 920].map((x) => `<path d="M${x} 760L${x - 6} 820" stroke="#8a6a2a" stroke-width="3"/>`).join('')}
      <path d="M180 700L180 610L300 610L300 700Z" fill="#8a6a42"/><ellipse cx="240" cy="610" rx="64" ry="12" fill="#a07a4a"/>`,
  },
  'nile-reeds': nileReeds('#4a8ab8', '#9ad0ee'),
  horeb: {
    bounds: bandFrom(160),
    shadow: true,
    resolution: 0.5,
    svg: `
      <path d="M${LEFT} 620L60 460L220 520L420 240L560 330L700 190L860 300L980 260L1180 420L1360 380L1600 520L${RIGHT} 560L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a6450"/>
      <path d="M420 240L520 420L470 520L560 330ZM700 190L760 360L700 470L860 300ZM980 260L1040 420L1180 420Z" fill="#7a4a3a"/>
      <path d="M420 240L460 300L440 330ZM700 190L740 250L712 270Z" fill="#c8846a" opacity=".8"/>
      <path d="${hills([620, 600, 630, 610, 640, 620, 600, 630, 615, 625])}" fill="#a87058"/>
      <path d="${hillCrest([620, 600, 630, 610, 640, 620, 600, 630, 615, 625])}" stroke="#d09478" stroke-width="5" fill="none"/>
      <path d="M${LEFT} 700C300 694 900 704 ${RIGHT} 696L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#8a5a46"/>
      <path d="M${LEFT} 700C300 694 900 704 ${RIGHT} 696" stroke="#b07a60" stroke-width="5" fill="none"/>
      ${[[150, 700], [520, 702], [880, 704], [1330, 698]].map(([x, y]) => `<path d="M${x} ${y}c-14-24 4-34 14-14c4-22 22-20 18 4c14-10 22 6 10 12z" fill="#6a7a3a"/>`).join('')}
      ${Array.from({ length: 20 }, (_, i) => `<ellipse cx="${LEFT + 50 + i * 108}" cy="${740 + (i % 4) * 46}" rx="${10 + (i % 3) * 6}" ry="${5 + (i % 2) * 3}" fill="#6e4636"/>`).join('')}`,
  },
}
