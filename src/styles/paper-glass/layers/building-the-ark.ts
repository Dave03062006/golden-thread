import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud, hills } from '../shapes'

/**
 * Level 2, Episode 2: a wide clearing among tall trees, far from any sea, where the ark
 * is built. Cypress trees stand dark around it; the ground is trodden earth, with stacks
 * of cut timber and chips of wood.
 */

/** A tall cypress: a dark flame of a tree on a short trunk. */
function cypress(x: number, base: number, h: number, color: string): string {
  const w = h * 0.16
  return `<path d="M${x} ${base - h}C${x + w * 0.9} ${base - h * 0.62} ${x + w} ${base - h * 0.2} ${x + w * 0.5} ${base - 8}L${x - w * 0.5} ${base - 8}C${x - w} ${base - h * 0.2} ${x - w * 0.9} ${base - h * 0.62} ${x} ${base - h}Z" fill="${color}"/>
    <rect x="${x - 4}" y="${base - 10}" width="8" height="12" fill="#3a2a1a"/>`
}

function forest(): string {
  const rng = createRng(23)
  let back = ''
  let front = ''
  for (let x = LEFT; x < RIGHT; x += 46 + rng.next() * 30) back += cypress(x, 600, 240 + rng.next() * 120, '#2e4a32')
  for (let x = LEFT + 20; x < RIGHT; x += 70 + rng.next() * 50) {
    // The clearing in the middle is open.
    if (x > 260 && x < 1340) continue
    front += cypress(x, 660, 330 + rng.next() * 150, '#1e3624')
  }
  return `<path d="${hills([600, 590, 596, 586, 592, 598, 590, 584, 594, 600, 590, 596, 602])}" fill="#3a5a3a"/>${back}${front}`
}

/** Stacks of cut timber and scattered chips across the trodden earth. */
function clearing(): string {
  const rng = createRng(5)
  let chips = ''
  for (let i = 0; i < 70; i++) chips += `<ellipse cx="${(LEFT + rng.next() * (RIGHT - LEFT)).toFixed(0)}" cy="${(700 + rng.next() * 320).toFixed(0)}" rx="${(4 + rng.next() * 6).toFixed(0)}" ry="2" fill="#c8a070" opacity=".7"/>`
  const logs = (x: number, y: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / 3)
      const cx = x + (i % 3) * 38 + row * 19
      const cy = y - row * 30
      return `<rect x="${cx - 70}" y="${cy - 15}" width="70" height="30" rx="14" fill="#8a5a32"/><circle cx="${cx}" cy="${cy}" r="15" fill="#d8a878"/><circle cx="${cx}" cy="${cy}" r="8" fill="none" stroke="#a87848" stroke-width="2"/>`
    }).join('')
  return `
    <path d="M${LEFT} 660C300 640 600 636 800 640C1000 636 1300 640 ${RIGHT} 660L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#a87e52"/>
    <path d="M${LEFT} 760C400 740 1200 740 ${RIGHT} 760L${RIGHT} ${BOTTOM}L${LEFT} ${BOTTOM}Z" fill="#9a7048"/>
    ${chips}
    ${logs(80, 740, 6)}${logs(1440, 760, 5)}`
}

export const buildingTheArkLayers: Record<string, PaperLayerArt> = {
  'forest-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="fsky" x1="0" y1="${TOP}" x2="0" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#5a92c8"/>
          <stop offset=".7" stop-color="#a8cce0"/>
          <stop offset="1" stop-color="#e8e2c4"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#fsky)"/>
      ${cloud(300, 90, 1.6, ['#ffffff', '#f2f4f8', '#dde4ec'])}
      ${cloud(1180, 40, 2, ['#ffffff', '#f2f4f8', '#dde4ec'])}`,
  },
  'forest-far': { bounds: bandFrom(180), shadow: true, svg: forest() },
  clearing: { bounds: bandFrom(600), shadow: true, svg: clearing() },
}
