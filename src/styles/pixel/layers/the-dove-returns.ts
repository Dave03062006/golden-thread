import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { C, dither } from '../palette'
import { drawHills, fill } from './creation'

/**
 * Level 2, Episode 4 in pixel art: the clouds parting over the gray water, the mountains
 * of Ararat rising from the sea, the high shelf the ark rests on (rock, then grass), and
 * the green hills of the washed world. The shapes follow the paper version, at a fifth
 * of its size.
 */

/** The height of a line through points at frame x, straight between them. */
function along(points: readonly (readonly [number, number])[], x: number): number {
  if (x <= points[0]![0]) return points[0]![1]
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]!
    const [x1, y1] = points[i]!
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
  }
  return points.at(-1)![1]
}

/** Clouds: rounded masses in two shades. */
function clouds(buf: PixelBuffer, masses: [number, number, number][], dark: string, light: string) {
  fill(buf, (x, y) => {
    for (const [cx, cy, r] of masses) {
      const d = Math.hypot((x - cx) / 2, y - cy)
      if (d < r) return d < r - 2 || dither(x, y) < 0.5 ? (y > cy + r * 0.3 ? dark : light) : null
    }
    return null
  })
}

const PEAKS: [number, number][][] = [
  [
    [-28, 104],
    [12, 70],
    [30, 79],
    [60, 104],
  ],
  [
    [84, 104],
    [120, 64],
    [140, 76],
    [158, 69],
    [188, 104],
  ],
  [
    [224, 104],
    [264, 60],
    [290, 78],
    [320, 68],
    [372, 104],
  ],
]

/** The mountainside the ark rests on: rising to the left, the shelf, and falling away to the right. */
const SLOPE: [number, number][] = [
  [-48, 72],
  [4, 66],
  [28, 74],
  [50, 94],
  [64, 112],
  [76, 126],
  [224, 126],
  [236, 136],
  [244, 144],
  [266, 210],
]

/** The mountainside, in the colors given: a lit rim, the body with its strata, and darker below. */
function drawSlope(buf: PixelBuffer, rim: string, body: string, deep: string, flowers: boolean) {
  fill(buf, (x, y) => {
    // Right of the slope's foot there's only the sea.
    if (x > 266) return null
    const top = Math.round(along(SLOPE, x))
    if (y < top) return null
    if (y <= top + 1) return rim
    if (flowers && y === top + 4 && (x * 7) % 23 === 0) return C.gold
    const strata = [140, 154, 170, 188].some((s) => y === s + Math.round(Math.sin(x / 30) * 2))
    if (strata) return deep
    return (y - top) / 60 > dither(x, y) ? deep : body
  })
}

export const theDoveReturnsLayers: Record<string, PixelLayerArt> = {
  'parting-clouds': {
    draw: (buf) =>
      clouds(
        buf,
        [
          [-20, -6, 24],
          [56, -14, 20],
          [216, -12, 22],
          [300, -4, 18],
          [-6, 32, 12],
          [262, 36, 11],
          [140, 14, 8],
        ],
        C.slate,
        C.pale,
      ),
  },
  'far-peaks': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        for (const points of PEAKS) {
          if (x < points[0]![0] || x > points.at(-1)![0]) continue
          const top = Math.round(along(points, x))
          if (y < top) continue
          const summit = points.reduce((a, b) => (b[1] < a[1] ? b : a))
          if (y < summit[1] + 8 && y - top < 3) return C.white
          return x > summit[0] ? C.dslate : C.slate
        }
        return null
      }),
  },
  'green-hills': {
    draw: (buf) => {
      drawHills(buf, [104, 94, 100, 91, 98, 104, 94, 100, 90, 96], 0, C.lime, C.green, C.green, C.teal)
      drawHills(buf, [122, 116, 124, 130, 120, 126, 118, 128, 120, 124], 0, C.lime, C.green, C.green, C.teal)
    },
  },
  'ararat-slope': { draw: (buf) => drawSlope(buf, C.pale, C.slate, C.dslate, false) },
  'ararat-grass': { draw: (buf) => drawSlope(buf, C.lime, C.green, C.teal, true) },
}
