import type { PixelLayerArt } from '../art'
import { MARGIN_X, MARGIN_Y } from '../frame'
import { C, dither } from '../palette'
import { crest, drawHills, fill } from './creation'

/**
 * Level 5, Episode 1 in pixel art: the golden field of Joseph's dream, and the hill
 * country between Shechem and Dothan seen from above, like a cloth map, for the play
 * "to Dothan". The shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)

/** The map's crossroads and paths, as in the paper version (and the play). */
const NODES: [number, number][] = [
  [0.14, 0.74],
  [0.3, 0.62],
  [0.2, 0.42],
  [0.46, 0.56],
  [0.36, 0.26],
  [0.62, 0.44],
  [0.54, 0.16],
  [0.78, 0.34],
  [0.88, 0.16],
]
const PATHS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [7, 8],
]
const FIELDS: [number, number, number, number, string][] = [
  [12, 104, 60, 40, C.lime],
  [84, 120, 52, 44, C.sand],
  [140, 112, 60, 52, C.green],
  [204, 104, 72, 48, C.sand2],
  [24, 24, 56, 48, C.sand2],
  [96, 16, 64, 52, C.lime],
  [176, 24, 60, 40, C.sand],
  [248, 12, 64, 48, C.green],
  [236, 128, 72, 48, C.lime],
]
/** Distance from a point to a segment, in pixels. */
function toSegment(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1
  const dy = y2 - y1
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
  return { d: Math.hypot(x - x1 - t * dx, y - y1 - t * dy), t }
}
const px = ([x, y]: [number, number]) => [x * 320, y * 180] as const
/** The two streams and the wall, as lines through points. */
const STREAMS: [number, number][][] = [
  [
    [-48, 60],
    [40, 64],
    [80, 74],
    [104, 86],
  ],
  [
    [196, 180],
    [220, 140],
    [236, 104],
    [260, 92],
  ],
]
const WALL: [number, number][] = [
  [220, 4],
  [220, 52],
  [236, 52],
]
const near = (x: number, y: number, line: [number, number][], width: number) => line.slice(1).some((p, i) => toSegment(x, y, line[i]![0], line[i]![1], p[0], p[1]).d < width)

export const soldLayers: Record<string, PixelLayerArt> = {
  'wheat-field': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([520, 490, 510, 480, 500, 520, 490, 510, 500, 520]), x)) ? (dither(x, y) < 0.5 ? C.lime : C.sand) : null))
      drawHills(buf, div([600, 580, 610, 590, 600, 615, 585, 600, 595, 610]), 0, C.gold, C.sand, C.sand2, C.wood3)
      // Ears of wheat standing in rows.
      fill(buf, (x, y) => (y > 130 && (x * 5 + Math.floor(y / 6) * 7) % 11 === 0 && y % 6 < 3 ? C.gold : null))
    },
  },
  'field-map': {
    draw: (buf) =>
      fill(buf, (x, y, lx, ly) => {
        // The stitched border.
        if ((lx === 4 || ly === 4 || lx === 320 + MARGIN_X * 2 - 5 || ly === 180 + MARGIN_Y * 2 - 5) && (lx + ly) % 4 < 2) return C.wood2
        for (const [nx, ny] of NODES.map(px)) {
          const d = Math.hypot(x - nx, y - ny)
          if (d < 1.5) return C.white
          if (d < 3) return C.wood3
        }
        for (const [a, b] of PATHS) {
          const [x1, y1] = px(NODES[a]!)
          const [x2, y2] = px(NODES[b]!)
          const { d, t } = toSegment(x, y, x1, y1, x2, y2)
          if (d < 0.8 && Math.round(t * 40) % 3 === 0) return C.wood2
        }
        if (STREAMS.some((s) => near(x, y, s, 2.2))) return C.sky
        if (near(x, y, WALL, 1.2)) return (x + y) % 3 ? C.slate : C.dslate
        // The olive grove.
        if (x >= 112 && x < 172 && y >= 60 && y < 88 && (x % 7) < 3 && (y % 6) < 3) return C.green
        for (const [fx, fy, w, h, c] of FIELDS) if (x >= fx && x < fx + w && y >= fy && y < fy + h) return c
        return dither(x, y) < 0.2 ? C.sand2 : C.sand
      }),
  },
}
