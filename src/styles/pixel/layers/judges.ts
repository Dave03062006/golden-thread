import { WAY } from '../../../content/levels/15-the-judges/episode-4'
import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 15 · The Judges in pixel art: the plain below Mount Tabor, with the river Kishon dry
 * and in flood; Gideon's wine press; the camp of Midian at night; the map of the way Israel
 * came; the prison mill at Gaza; and the house of Dagon, standing and fallen. The shapes follow
 * the paper version, at a fifth of its size.
 */

const W = 320
const H = 180

/** The Kishon's winding course: its height across the plain. */
const kishon = (x: number) => 0.83 * H + Math.sin(x / 40) * 4
/** Mount Tabor, round and alone: its height at x. */
const tabor = (x: number) => 0.3 * H + Math.pow((x - 0.26 * W) / (0.3 * W), 2) * 0.4 * H

/** How far a point is from a path (in frame pixels). */
function nearPath(points: readonly { x: number; y: number }[], x: number, y: number): number {
  let best = Infinity
  points.slice(1).forEach((p2, i) => {
    const p1 = points[i]!
    const [x1, y1, x2, y2] = [p1.x * W, p1.y * H, p2.x * W, p2.y * H]
    const len = Math.hypot(x2 - x1, y2 - y1)
    const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (len * len)))
    best = Math.min(best, Math.hypot(x - (x1 + t * (x2 - x1)), y - (y1 + t * (y2 - y1))))
  })
  return best
}

const inBox = (x: number, y: number, x1: number, y1: number, x2: number, y2: number) => x >= x1 * W && x < x2 * W && y >= y1 * H && y < y2 * H

export const judgesLayers: Record<string, PixelLayerArt> = {
  'tabor-plain': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 0.72 * H) {
          if (Math.abs(y - kishon(x)) < 2) return C.wood3
          return y >= 0.95 * H ? C.wood3 : dither(x, y) < 0.2 ? C.sand2 : C.sand
        }
        if (y >= tabor(x)) return dither(x, y) < 0.3 ? C.teal : C.green
        if (x > 0.56 * W && y >= 0.64 * H) return C.green
        return null
      }),
  },
  'kishon-flood': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (Math.abs(y - kishon(x)) < 6) return dither(x, y) < 0.3 ? C.sky : C.blue
        if (y >= 0.88 * H) return (x + y) % 9 === 0 ? C.blue : C.wood2
        return null
      }),
  },
  'wine-press': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const hill = 0.58 * H + Math.sin(x / 50) * 6
        if (y < hill) return null
        const pit = ((x - 0.56 * W) / (0.19 * W)) ** 2 + ((y - 0.82 * H) / (0.05 * H)) ** 2
        if (pit < 1) return pit < 0.7 ? ((x + y) % 7 === 0 ? C.gold : C.wood1) : C.slate
        return y >= 0.8 * H ? (dither(x, y) < 0.2 ? C.sand2 : C.sand) : dither(x, y) < 0.3 ? C.wood3 : C.sand2
      }),
  },
  'midian-camp': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const valley = 0.47 * H + (1 - Math.abs(x - W / 2) / (W / 2)) * 0.33 * H
        if (y < Math.min(valley, 0.8 * H)) return null
        // Tents filling the valley floor.
        const tx = ((x % 22) + 22) % 22
        if (y > 0.8 * H && y > 0.92 * H - Math.max(0, 6 - Math.abs(tx - 11)) * 1.2 && x > 0.15 * W && x < 0.85 * W) return C.pale
        return dither(x, y) < 0.3 ? C.dslate : C.slate
      }),
  },
  'jephthah-map': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (nearPath(WAY, x, y) < 1.2) return (Math.round(x) + Math.round(y)) % 4 === 0 ? C.wood1 : C.white
        if (x < 0.08 * W - y * 0.1 || (y > 0.87 * H && x > 0.33 * W && x < 0.39 * W)) return C.sky
        if (((x - 0.53 * W) / (0.025 * W)) ** 2 + ((y - 0.43 * H) / (0.14 * H)) ** 2 < 1) return C.sky
        if (Math.abs(y - 0.42 * H) < 1 && x > 0.55 * W && x < 0.82 * W) return C.sky
        if (Math.abs(y - 0.2 * H) < 1 && x > 0.54 * W && x < 0.82 * W) return C.sky
        if (inBox(x, y, 0.54, 0.62, 0.68, 0.8)) return dither(x, y) < 0.5 ? C.wood3 : C.sand2
        if (inBox(x, y, 0.58, 0.46, 0.78, 0.62)) return dither(x, y) < 0.5 ? C.sand2 : C.sand
        return (x * 3 + y * 7) % 41 === 0 ? C.wood3 : C.sand
      }),
  },
  'prison-mill': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 0.82 * H) return dither(x, y) < 0.3 ? C.wood1 : C.wood0
        if (inBox(x, y, 0.74, 0.16, 0.79, 0.29)) return Math.floor(x) % 5 === 0 ? C.wood0 : C.slate
        const row = Math.floor(y / 14)
        return (x + (row % 2) * 10) % 21 === 0 || y % 14 === 0 ? C.wood0 : C.dslate
      }),
  },
  'dagon-hall': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 0.82 * H) return dither(x, y) < 0.2 ? C.wood2 : C.wood3
        if (y < 0.25 * H) return y > 0.22 * H ? C.wood3 : C.wood2
        for (const px of [0.06, 0.22, 0.78, 0.94]) if (Math.abs(x - px * W) < 8) return C.sand2
        for (const px of [0.44, 0.56]) if (Math.abs(x - px * W) < 10) return y < 0.28 * H ? C.wood3 : C.sand
        return dither(x, y) < 0.15 ? C.sand2 : C.sand
      }),
  },
  'dagon-fallen': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 0.82 * H) return dither(x, y) < 0.2 ? C.wood2 : C.wood3
        const heap = 0.82 * H - 14 - Math.round(Math.abs(Math.sin(x / 9)) * 10 + Math.cos(x / 4) * 2)
        if (y >= heap) return (x * 3 + y * 5) % 11 < 2 ? C.wood2 : dither(x, y) < 0.4 ? C.sand : C.sand2
        return null
      }),
  },
}
