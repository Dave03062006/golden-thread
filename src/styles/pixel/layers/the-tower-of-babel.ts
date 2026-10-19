import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { C, dither, hash } from '../palette'
import { bandColor, fill } from './creation'

/**
 * Level 2, Episode 6 in pixel art: the tapestry map of the nations, with its seas, rivers
 * and mountains; and the plain of Shinar under a hot pale sky, its city, and the high
 * clouds the tower never reaches. The shapes follow the paper version, at a fifth of its size.
 */

type Point = readonly [number, number]

/** Whether a point is inside a polygon. */
function inside(poly: readonly Point[], x: number, y: number): boolean {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!
    const [xj, yj] = poly[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** How far a point is from a line through points, in pixels. */
function fromLine(line: readonly Point[], x: number, y: number): number {
  let best = Infinity
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1]!
    const [bx, by] = line[i]!
    const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)))
    best = Math.min(best, Math.hypot(x - (ax + t * (bx - ax)), y - (ay + t * (by - ay))))
  }
  return best
}

const MEDITERRANEAN: Point[] = [
  [-48, 76],
  [20, 66],
  [60, 72],
  [76, 60],
  [88, 66],
  [84, 76],
  [104, 76],
  [130, 80],
  [141, 86],
  [138, 104],
  [128, 112],
  [112, 118],
  [90, 116],
  [60, 120],
  [20, 116],
  [-48, 120],
]
const GULF: Point[] = [
  [248, 128],
  [266, 130],
  [306, 152],
  [298, 162],
  [260, 142],
]
const RED_SEA: Point[] = [
  [140, 128],
  [148, 128],
  [182, 208],
  [173, 208],
]
const RIVERS: Point[][] = [
  // The Nile and its delta.
  [
    [128, 208],
    [126, 170],
    [123, 140],
    [118, 120],
  ],
  [
    [123, 140],
    [130, 121],
  ],
  // The Euphrates and the Tigris.
  [
    [192, 50],
    [208, 84],
    [220, 100],
    [244, 122],
    [252, 128],
  ],
  [
    [216, 48],
    [228, 80],
    [240, 108],
    [254, 127],
  ],
]
const MOUNTAINS: [number, number, number][] = [
  [208, 42, 1.3],
  [218, 40, 1],
  [196, 48, 0.8],
  [176, 60, 0.8],
  [236, 56, 0.8],
  [152, 52, 0.7],
]

function sea(x: number, y: number): boolean {
  return inside(MEDITERRANEAN, x, y) || inside(GULF, x, y) || inside(RED_SEA, x, y) || ((x - 144) / 34) ** 2 + ((y - 30) / 11) ** 2 < 1 || ((x - 262) / 11) ** 2 + ((y - 42) / 28) ** 2 < 1
}

function drawMap(buf: PixelBuffer) {
  fill(buf, (x, y) => {
    // The border, sewn around the cloth.
    const edge = Math.min(Math.abs(x - 4), Math.abs(x - 315), Math.abs(y - 4), Math.abs(y - 175))
    if (x >= 3 && x <= 316 && y >= 3 && y <= 176 && edge <= 1) return C.wood1
    if (x >= 8 && x <= 311 && y >= 8 && y <= 171 && Math.min(Math.abs(x - 9), Math.abs(x - 310), Math.abs(y - 9), Math.abs(y - 170)) === 0) return (x + y) % 6 < 3 ? C.wood3 : C.sand
    for (const [mx, my, s] of MOUNTAINS) {
      const dy = y - (my - 6 * s)
      if (dy >= 0 && dy <= 11 * s && Math.abs(x - mx) <= dy * 0.75) return dy < 3 * s ? C.white : C.wood2
    }
    // Babel: a little stepped tower by the rivers.
    for (let k = 0; k < 4; k++) if (y >= 110 - k * 3 && y < 113 - k * 3 && x >= 232 + k * 1.5 && x < 242 - k * 1.5) return y === 110 - k * 3 ? C.wood3 : C.wood2
    if (RIVERS.some((line) => fromLine(line, x, y) < 1.2)) return C.blue
    if (sea(x, y)) {
      // A stitched shore, and rows of little woven waves.
      if (!sea(x - 1, y) || !sea(x + 1, y) || !sea(x, y - 1) || !sea(x, y + 1)) return (x + y) % 3 ? C.navy : C.blue
      return y % 7 === 0 && (x + Math.floor(y / 7) * 3) % 10 < 4 ? C.sky : C.blue
    }
    // A palm here and there on the land.
    for (const [px, py] of [
      [94, 138],
      [112, 144],
      [270, 112],
      [284, 120],
      [60, 40],
      [40, 52],
    ] as const) {
      if (x === px && y > py - 6 && y <= py) return C.wood1
      if (y === py - 6 && Math.abs(x - px) <= 3) return C.green
    }
    return (x * 3 + y * 5) % 11 === 0 || dither(x, y) < 0.06 ? C.sand2 : C.sand
  })
}

export const theTowerOfBabelLayers: Record<string, PixelLayerArt> = {
  'nations-tapestry': { draw: drawMap },
  'shinar-sky': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (Math.hypot(x - 264, y - 24) < 10) return C.white
        return bandColor([C.blue, C.sky, C.sky, C.pale, C.white], Math.max(0, (y + 14) / 146), x, y)
      }),
  },
  'high-clouds': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        for (const [cx, cy, r] of [
          [-20, -6, 18],
          [70, -4, 16],
          [160, -8, 20],
          [250, -4, 17],
          [20, 16, 11],
          [205, 14, 12],
        ] as const) {
          const d = Math.hypot((x - cx) / 2, y - cy)
          if (d < r) return d < r - 2 || dither(x, y) < 0.5 ? (y > cy + r * 0.4 ? C.pale : C.white) : null
        }
        return null
      }),
  },
  'babel-city': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y > 132) return null
        const i = Math.floor((x + 36) / 22.4)
        const h = 14 + ((i * 37) % 60) / 5
        const left = -36 + i * 22.4
        const w = 18 + ((i * 23) % 40) / 5
        if (x - left > w || y < 132 - h) return null
        if (y === Math.round(132 - h)) return C.white
        if (Math.abs(x - (left + w / 2)) < 1.6 && y > 132 - h / 2 - 2 && y < 132 - h / 2 + 3) return C.wood1
        return i % 2 ? C.sand : C.sand2
      }),
  },
  'shinar-plain': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = 128 + Math.round(Math.sin(x / 40) * 1.5)
        if (y < top) {
          // Palms along the river.
          for (const px of [16, 28, 292, 306]) {
            if (x === px && y > top - 22) return C.wood1
            if (y === top - 22 && Math.abs(x - px) <= 5) return C.green
            if (y === top - 21 && (Math.abs(x - px) === 5 || Math.abs(x - px) === 6)) return C.green
          }
          return null
        }
        if (y === top) return C.white
        if (Math.abs(y - (140 + Math.round(Math.sin(x / 50) * 1.2))) <= 1) return y % 2 ? C.sky : C.blue
        if ([152, 166, 182].some((r) => y === r + Math.round(Math.sin(x / 60 + r) * 1.5))) return C.sand2
        return hash(x * 7.1 + y * 3.3) > 0.97 ? C.sand2 : C.sand
      }),
  },
}
