import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, fill } from './creation'

/**
 * Level 9 · Through the Sea in pixel art: the shore of the camp and the sea; the seabed
 * between the walls of water; the seabed seen from above, for "the path through the sea";
 * the palms and springs of Elim; the red valley of Rephidim; and the hilltop above the
 * valley. The shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)

/** The crossroads on the seabed, in frame pixels (see content/levels/09-…/episode-2.ts). */
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
].map(([x, y]) => [Math.round(x! * 320), Math.round(y! * 180)] as [number, number])
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
const POOLS = [2, 7]
const REEFS = [5, 10]

/** Whether a pixel lies on the dotted path between two crossroads. */
function onPath(x: number, y: number): boolean {
  return PATHS.some(([a, b]) => {
    const [x1, y1] = NODES[a]!
    const [x2, y2] = NODES[b]!
    const len = Math.hypot(x2 - x1, y2 - y1)
    const t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (len * len)
    if (t < 0 || t > 1) return false
    const d = Math.abs((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)) / len
    return d < 0.8 && Math.round(t * len) % 4 === 0
  })
}

/** A palm, or null where there is none: a trunk leaning a little, and a crown of fronds. */
function palm(x: number, y: number, px: number, base: number, height: number, lean: number): string | null {
  const top = base - height
  if (y >= top && y <= base) {
    const cx = px + Math.round((lean * (base - y)) / height)
    if (x === cx || x === cx + 1) return C.wood1
  }
  const tx = px + lean
  const dy = y - top
  if (Math.abs(dy) <= 3 && Math.abs(x - tx) <= 9 - Math.abs(dy) * 2 && (x + y) % 2 === 0) return C.green
  if (dy > 0 && dy <= 4 && Math.abs(Math.abs(x - tx) - 5 - dy) <= 1) return C.teal
  return null
}

export const crossingLayers: Record<string, PixelLayerArt> = {
  'red-sea-shore': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= Math.round(crest(div([440, 420, 446, 414, 432, 448, 422, 436, 418, 440]), x)) && y < 94) return dither(x, y) < 0.5 ? C.slate : C.pale
        if (y >= 94 && y < 113) {
          if (y < 97) return C.sky
          return (y === 100 || y === 104 || y === 108) && (x + y * 3) % 13 < 7 ? C.sky : C.blue
        }
        const shore = 114 + Math.round(Math.sin(x / 50) * 2)
        if (y >= 113 && y < shore) return C.white
        if (y >= shore) {
          if ([132, 152, 172].some((r) => y === r + Math.round(Math.sin(x / 40 + r) * 2))) return C.sand2
          for (const [rx, ry, r] of [
            [24, 128, 5],
            [104, 138, 4],
            [276, 130, 6],
            [312, 144, 4],
          ] as const) {
            const d = ((x - rx) / r) ** 2 + ((y - ry) / (r * 0.55)) ** 2
            if (d < 1) return d < 0.4 ? C.sand2 : C.wood3
          }
          return dither(x, y) < 0.15 ? C.sand2 : C.sand
        }
        return null
      }),
  },
  'sea-walls': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = 40 + Math.round(Math.sin(x / 34) * 2)
        if (y >= top && y < 131) {
          if (y < top + 2) return C.white
          if (y < top + 12) return dither(x, y) < 0.5 ? C.blue : C.sky
          if ((x * 3 + y * 7) % 97 === 0) return C.sky
          return dither(x, y) < 0.12 ? C.blue : C.navy
        }
        if (y >= 131 && y < 176) {
          if (y < 133) return C.sand2
          if ((x * 7 + y * 13) % 53 === 0) return C.slate
          return dither(x, y) < 0.3 ? C.wood3 : C.sand2
        }
        if (y >= 176) return y === 176 ? C.white : C.navy
        return null
      }),
  },
  'sea-map': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The shores to the west and east, and the walls of water above and below.
        const west = 28 + Math.round(Math.sin(y / 30) * 3)
        const east = 292 - Math.round(Math.sin(y / 30) * 3)
        if (x < west || x > east) return dither(x, y) < 0.1 ? C.sand2 : C.white
        const north = 12 + Math.round(Math.sin(x / 40) * 3)
        const south = 132 + Math.round(Math.sin(x / 35) * 3)
        if (y < north || y > south) {
          if (y === north - 1 || y === south + 1) return C.white
          return (x + y * 5) % 23 === 0 ? C.sky : C.blue
        }
        for (const n of POOLS) {
          const [px, py] = NODES[n]!
          const d = ((x - px - 6) / 14) ** 2 + ((y - py - 5) / 8) ** 2
          if (d < 1) return d < 0.3 ? C.sky : C.blue
        }
        for (const n of REEFS) {
          const [px, py] = NODES[n]!
          if (Math.abs(x - px + 2) + Math.abs(y - py + 6) * 1.6 < 11) return (x + y) % 3 ? C.slate : C.dslate
        }
        for (const [nx, ny] of NODES) {
          const d = Math.hypot(x - nx, y - ny)
          if (d < 1.5) return C.white
          if (d < 3) return C.wood2
        }
        if (onPath(x, y)) return C.wood1
        return dither(x, y) < 0.2 ? C.sand2 : C.sand
      }),
  },
  'elim-oasis': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= Math.round(crest(div([470, 452, 476, 446, 468, 460, 444, 470, 454, 462]), x)) && y < Math.round(crest(div([640, 610, 650, 626, 606, 640, 616, 652, 620, 634]), x))) {
          const tree = palm(x, y, 28, 120, 42, -5) ?? palm(x, y, 60, 120, 48, 5) ?? palm(x, y, 236, 120, 44, -5) ?? palm(x, y, 272, 120, 50, 5) ?? palm(x, y, 300, 120, 42, -5)
          return tree ?? (dither(x, y) < 0.6 ? C.sand : C.white)
        }
        if (y >= Math.round(crest(div([640, 610, 650, 626, 606, 640, 616, 652, 620, 634]), x))) {
          const near = palm(x, y, -12, 152, 52, 6) ?? palm(x, y, 92, 152, 56, -6) ?? palm(x, y, 204, 152, 52, 6) ?? palm(x, y, 332, 152, 56, -6)
          if (near) return near
          for (const [sx, sy] of [
            [52, 138],
            [112, 144],
            [176, 138],
            [244, 144],
          ] as const) {
            const d = ((x - sx) / 18) ** 2 + ((y - sy) / 3.2) ** 2
            if (d < 0.35) return C.blue
            if (d < 1) return C.green
          }
          return dither(x, y) < 0.25 ? C.sand2 : C.sand
        }
        // The tall palms of the near side reach up above the dunes.
        return palm(x, y, -12, 152, 52, 6) ?? palm(x, y, 92, 152, 56, -6) ?? palm(x, y, 204, 152, 52, 6) ?? palm(x, y, 332, 152, 56, -6) ?? palm(x, y, 28, 120, 42, -5) ?? palm(x, y, 60, 120, 48, 5) ?? palm(x, y, 236, 120, 44, -5) ?? palm(x, y, 272, 120, 50, 5) ?? palm(x, y, 300, 120, 42, -5)
      }),
  },
  rephidim: {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The cliffs to either side, and the ridge between.
        const left = x < 72 ? 52 + Math.round(Math.abs(Math.sin(x / 9)) * 14) + Math.max(0, x - 40) : 999
        const right = x > 260 ? 56 + Math.round(Math.abs(Math.sin(x / 8)) * 12) + Math.max(0, 290 - x) : 999
        if (y >= Math.min(left, right) && y < 140) return (x * 3 + y) % 11 < 3 ? C.rose : C.wood2
        if (y >= Math.round(crest(div([360, 300, 380, 330, 400, 360, 310, 370, 320, 350]), x)) && y < Math.round(crest(div([620, 600, 630, 612, 640, 620, 606, 632, 614, 624]), x))) return dither(x, y) < 0.5 ? C.rose : C.wood3
        if (y >= Math.round(crest(div([620, 600, 630, 612, 640, 620, 606, 632, 614, 624]), x))) {
          if (y < 140) return y === Math.round(crest(div([620, 600, 630, 612, 640, 620, 606, 632, 614, 624]), x)) ? C.sand : C.wood3
          if ((x * 7 + y * 11) % 61 === 0) return C.wood1
          if ([152, 166].some((r) => y === r + Math.round(Math.sin(x / 40 + r) * 2))) return C.wood2
          return dither(x, y) < 0.3 ? C.wood3 : C.sand2
        }
        return null
      }),
  },
  hilltop: {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The hill in front: its top flat where Moses stands, falling away to either side.
        const dx = Math.abs(x - 160)
        const hill = dx < 64 ? 133 : 133 + Math.round(((dx - 64) / 96) ** 2 * 34)
        if (y >= hill) {
          if (y === hill) return C.sand
          if ((x * 5 + y * 3) % 47 === 0) return C.wood1
          return dither(x, y) < 0.25 ? C.wood2 : C.wood3
        }
        // Far below and beyond: the plain of the valley, and the mountains past it.
        if (y >= 96 && y < 152) return [104, 112, 120].includes(y) && (x + y) % 9 < 5 ? C.sand2 : dither(x, y) < 0.3 ? C.sand2 : C.sand
        if (y >= Math.round(crest(div([420, 380, 430, 400, 440, 410, 386, 424, 398, 416]), x)) && y < 96) return dither(x, y) < 0.5 ? C.slate : C.pale
        return null
      }),
  },
}
