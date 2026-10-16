import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud, hillCrest, hills } from '../shapes'

/**
 * Level 1, Episode 2: the garden of Eden, in the morning light that comes from the same
 * corner as Episode 1's first light. Bare ground and mist at first; then the meadow, the
 * trees and the river that parts into four.
 */

const LIGHT = { x: 120, y: 90 }

const HILLS = [500, 470, 452, 478, 500, 470, 448, 466, 494, 472, 456, 480, 506]
/** Where the garden's ground begins, just below the tree line. */
const GROUND = [548, 540, 536, 544, 550, 542, 536, 540, 548, 542, 538, 544, 550]

/** Round canopies along the tree line, the same every time. */
function treeLine(): string {
  const rng = createRng(212)
  let out = ''
  for (let x = LEFT; x < RIGHT + 60; x += 34 + rng.next() * 30) {
    const r = 34 + rng.next() * 30
    const y = 540 - r * 0.7 - rng.next() * 16
    const shade = ['#2f7a40', '#3a8a48', '#46994f'][Math.floor(rng.next() * 3)]
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(0)}" fill="${shade}"/>`
    out += `<circle cx="${(x - r * 0.3).toFixed(0)}" cy="${(y - r * 0.35).toFixed(0)}" r="${(r * 0.45).toFixed(0)}" fill="#62b35e" opacity=".7"/>`
  }
  return out
}

/** Flowers scattered over the meadow. */
function flowers(): string {
  const rng = createRng(77)
  let out = ''
  for (let i = 0; i < 70; i++) {
    const x = LEFT + rng.next() * (RIGHT - LEFT)
    const y = 600 + rng.next() ** 0.7 * 420
    const r = 3 + (y - 600) / 90
    const color = ['#fff7e8', '#ffd36e', '#ff9db8', '#c7a6ff'][Math.floor(rng.next() * 4)]
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${color}"/>`
  }
  return out
}

/**
 * The river: it comes out of Eden from under the trees and at once parts into four
 * streams (Genesis 2:10), which fan out across the garden and run off to either side.
 */
function river(): string {
  const fork = { x: 800, y: 548 }
  // Each stream: from the fork to where it leaves the picture, widening as it nears.
  // The lower ones dip toward the viewer before they go.
  const streams = [
    { end: { x: LEFT, y: 590 }, width: 24, dip: 0 },
    { end: { x: LEFT, y: 690 }, width: 40, dip: 40 },
    { end: { x: RIGHT, y: 690 }, width: 40, dip: 40 },
    { end: { x: RIGHT, y: 590 }, width: 24, dip: 0 },
  ]
  let fill = ''
  let shine = ''
  for (const { end, width, dip } of streams) {
    const mid = { x: (fork.x + end.x) / 2, y: fork.y + dip }
    const top = `M${fork.x} ${fork.y - 2}Q${mid.x} ${mid.y - 4} ${end.x} ${end.y - width / 2}`
    fill += `<path d="${top}L${end.x} ${end.y + width / 2}Q${mid.x} ${mid.y + 10} ${fork.x} ${fork.y + 3}Z"/>`
    shine += `<path d="${top}"/>`
  }
  return `
    <ellipse cx="${fork.x}" cy="${fork.y}" rx="22" ry="5" fill="#5fb4e0"/>
    <g fill="#5fb4e0">${fill}</g>
    <g fill="none" stroke="#d4f4ff" stroke-width="3" opacity=".8">${shine}</g>`
}

/** Ferns and broad leaves at the corners, close to the camera. */
function frontLeaves(): string {
  const leaf = (x: number, y: number, angle: number, length: number, color: string) =>
    `<path transform="translate(${x} ${y}) rotate(${angle})" d="M0 0C${length * 0.25} ${-length * 0.18} ${length * 0.7} ${-length * 0.16} ${length} 0C${length * 0.7} ${length * 0.14} ${length * 0.25} ${length * 0.16} 0 0Z" fill="${color}"/>`
  let out = ''
  const left: [number, number, number, number, string][] = [
    [LEFT, 1000, -40, 420, '#2f7a40'],
    [LEFT + 40, 1040, -20, 380, '#3f8f45'],
    [-60, 1035, -62, 300, '#4c9a43'],
    [40, 1050, -80, 260, '#2f7a40'],
    [120, 1060, -50, 230, '#5aaa50'],
  ]
  const right = left.map(([x, y, a, l, c]) => [1600 - x, y, 180 - a, l, c] as [number, number, number, number, string])
  for (const [x, y, a, l, c] of [...left, ...right]) out += leaf(x, y, a, l, c)
  // A few white lilies among the leaves.
  for (const [x, y] of [
    [150, 905],
    [80, 950],
    [1470, 915],
    [1540, 960],
  ]) {
    out += `<g transform="translate(${x} ${y})"><path d="M0 0C-14 -10 -16 -26 -6 -34C-2 -22 0 -14 0 0ZM0 0C14 -10 16 -26 6 -34C2 -22 0 -14 0 0ZM0 0C-4 -14 -2 -30 0 -38C2 -30 4 -14 0 0Z" fill="#fffaf0"/><circle cy="-8" r="3" fill="#ffd36e"/></g>`
  }
  return out
}

export const gardenLayers: Record<string, PaperLayerArt> = {
  'eden-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="${TOP}" x2="0" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#5a96d8"/>
          <stop offset=".55" stop-color="#9fd2f0"/>
          <stop offset="1" stop-color="#fff1d0"/>
        </linearGradient>
        <radialGradient id="morning" cx="${LIGHT.x}" cy="${LIGHT.y}" r="1100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/>
          <stop offset=".35" stop-color="#ffe9b8" stop-opacity=".5"/>
          <stop offset="1" stop-color="#ffe9b8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#sky)"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#morning)"/>
      ${cloud(560, 70, 2.2, ['#ffffff', '#f4f8ff', '#e3eefb'])}
      ${cloud(1150, 140, 1.6, ['#ffffff', '#f4f8ff', '#e3eefb'])}
      ${cloud(1460, 40, 2.6, ['#ffffff', '#f4f8ff', '#e3eefb'])}`,
  },

  'eden-hills': {
    bounds: bandFrom(420),
    shadow: true,
    svg: `
      <path d="${hills(HILLS)}" fill="#6aa8a0"/>
      <path d="${hills(HILLS.map((h, i) => h + 26 + (i % 2) * 10))}" fill="#5d9b93" opacity=".7"/>
      <path d="${hillCrest(HILLS)}" fill="none" stroke="#d8f2e8" stroke-width="3" opacity=".6"/>`,
  },

  'eden-trees': {
    bounds: bandFrom(420),
    shadow: true,
    svg: `${treeLine()}<rect x="${LEFT}" y="530" width="${RIGHT - LEFT}" height="${BOTTOM - 530}" fill="#2f7a40"/>`,
  },

  // Bare earth, before anything has grown.
  'eden-ground': {
    bounds: bandFrom(520),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="earth" x1="0" y1="540" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#c39a68"/>
          <stop offset="1" stop-color="#8a6440"/>
        </linearGradient>
      </defs>
      <path d="${hills(GROUND)}" fill="url(#earth)"/>
      <path d="${hillCrest(GROUND)}" fill="none" stroke="#e8c48c" stroke-width="3" opacity=".7"/>
      <g fill="#a37b52">${[
        [300, 760, 18],
        [1220, 820, 22],
        [640, 920, 14],
        [1000, 700, 10],
      ]
        .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r! * 0.55}"/>`)
        .join('')}</g>`,
  },

  // The meadow of the garden, spreading over the bare earth.
  'eden-meadow': {
    bounds: bandFrom(520),
    shadow: false,
    svg: `
      <defs>
        <linearGradient id="grass" x1="0" y1="540" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#7cc463"/>
          <stop offset=".4" stop-color="#5aab4e"/>
          <stop offset="1" stop-color="#3a8a40"/>
        </linearGradient>
      </defs>
      <path d="${hills(GROUND)}" fill="url(#grass)"/>
      <path d="${hillCrest(GROUND)}" fill="none" stroke="#c8f09a" stroke-width="3" opacity=".8"/>
      ${flowers()}`,
  },

  'eden-river': {
    bounds: { x: LEFT, y: 530, w: RIGHT - LEFT, h: 200 },
    shadow: false,
    svg: river(),
  },

  // The mist that rose from the earth and watered it.
  'eden-mist': {
    bounds: { x: LEFT, y: 470, w: RIGHT - LEFT, h: 360 },
    shadow: false,
    resolution: 0.3,
    svg: `
      <defs><filter id="soft" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="30"/></filter></defs>
      <g fill="#ffffff" filter="url(#soft)" opacity=".75">
        <ellipse cx="300" cy="620" rx="520" ry="70"/>
        <ellipse cx="1000" cy="660" rx="620" ry="80"/>
        <ellipse cx="1600" cy="610" rx="420" ry="60"/>
        <ellipse cx="700" cy="740" rx="700" ry="60" opacity=".7"/>
      </g>`,
  },

  'eden-front': {
    bounds: { x: LEFT, y: 640, w: RIGHT - LEFT, h: BOTTOM - 640 },
    shadow: true,
    svg: frontLeaves(),
  },
}
