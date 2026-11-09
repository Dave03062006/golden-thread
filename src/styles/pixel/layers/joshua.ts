import { PORTIONS } from '../../../content/levels/14-joshua/episode-6'
import { WAY } from '../../../content/levels/14-joshua/episode-5'
import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 14 · Joshua in pixel art: Rahab's roof in Jericho, with flax drying on it; the city
 * wall with her house and window in it, standing and fallen; the moonlit road up through the
 * hills from Gilgal to Gibeon; and the map of the land, for sharing it out among the tribes.
 * The shapes follow the paper version, at a fifth of its size.
 */

const W = 320
const H = 180

/** The wall of Jericho, from its top to the ground, with Rahab's house built into it. */
const WALL = { left: -60, right: W + 60, top: 0.36 * H, ground: 0.8 * H }
const HOUSE = { left: 0.56 * W, right: 0.7 * W }

/** The city behind the wall: flat roofs, and a palm here and there. */
function city(x: number, y: number): string | null {
  const roof = 0.27 * H + Math.round(Math.sin(x / 11) * 3 + Math.cos(x / 5) * 2)
  if (y >= roof && y < WALL.top) return x % 23 < 2 ? C.wood1 : (x + y) % 7 ? C.sand2 : C.wood3
  if ((x % 61) - 30 === 0 && y > roof - 14 && y < roof) return C.wood2
  if (Math.abs((x % 61) - 30) < 6 && Math.abs(y - (roof - 15)) < 2) return C.green
  return null
}

/** Near a path (in frame pixels), how far from it. */
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

/** The coast, the Jordan, and the two lakes on the map of the land. */
const coast = (y: number) => (0.3 - (y / H) * 0.1) * W
const jordan = (y: number) => 0.62 * W + Math.sin(y / 9) * 2

export const joshuaLayers: Record<string, PixelLayerArt> = {
  'jericho-walls': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= WALL.ground) return dither(x, y) < 0.3 ? C.wood3 : C.sand2
        if (x >= WALL.left && x < WALL.right && y >= WALL.top - (Math.floor(x / 6) % 2 ? 4 : 0)) {
          // Rahab's house in the wall, and her window.
          if (x >= HOUSE.left && x < HOUSE.right && y < WALL.ground) {
            if (Math.abs(x - 0.62 * W) < 4 && Math.abs(y - 0.42 * H) < 4) return C.wood0
            return (y % 9 === 0 || x === HOUSE.left) ? C.wood2 : C.sand
          }
          return y % 8 === 0 || (x + Math.floor(y / 8) * 7) % 16 === 0 ? C.wood2 : dither(x, y) < 0.2 ? C.sand : C.sand2
        }
        return city(x, y)
      }),
  },
  'jericho-fallen': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= WALL.ground) return dither(x, y) < 0.3 ? C.wood3 : C.sand2
        // Rahab's house, still standing where the wall has fallen, with the cord at its window.
        if (x >= 0.64 * W && x < 0.76 * W && y >= WALL.top) {
          if (Math.abs(x - 0.7 * W) < 4 && Math.abs(y - 0.44 * H) < 4) return C.wood0
          return y % 9 === 0 || x === Math.round(0.64 * W) ? C.wood2 : C.sand
        }
        // The rest of the wall, a heap of stones.
        const heap = WALL.ground - 14 - Math.round(Math.abs(Math.sin(x / 7)) * 8 + Math.cos(x / 3) * 2)
        if (x >= WALL.left && x < WALL.right && y >= heap) return (x * 3 + y * 5) % 11 < 2 ? C.wood2 : dither(x, y) < 0.4 ? C.sand : C.sand2
        return city(x, y)
      }),
  },
  'rahab-roof': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The flat roof, its low wall at the front, and the stairs going down on the right.
        const stair = (x - 0.76 * W) / (0.14 * W)
        if (stair > 0 && stair < 1 && y >= 0.72 * H + stair * 0.14 * H && y < 0.75 * H + stair * 0.14 * H) return Math.floor(x / 4) % 2 ? C.wood3 : C.wood2
        if (y >= 0.86 * H) return C.wood2
        if (y >= 0.6 * H && x < 0.78 * W) return y >= 0.82 * H ? C.wood3 : (x * 7 + y * 3) % 13 === 0 ? C.sand2 : C.sand
        // The city beyond, and its wall.
        if (y >= 0.44 * H && y < 0.6 * H) return y < 0.47 * H && Math.floor(x / 6) % 2 ? null : y % 6 === 0 ? C.wood2 : C.sand2
        return city(x, y + 0.14 * H)
      }),
  },
  'hill-road-map': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 0.1 * H) return null
        // The road up from Gilgal, marked with small lights, and Gibeon's hill.
        const d = nearPath(WAY, x, y)
        if (d < 1.5) return (Math.round(x) + Math.round(y)) % 9 === 0 ? C.gold : C.slate
        if (Math.hypot(x - WAY.at(-1)!.x * W, y - WAY.at(-1)!.y * H) < 12) return C.dslate
        // Dark ridges and rocks in the moonlight.
        const ridge = Math.sin(x / 17 + y / 23) + Math.cos(y / 11 - x / 29)
        if (ridge > 1.3) return dither(x, y) < 0.5 ? C.slate : C.dslate
        return dither(x, y) < 0.15 ? C.dslate : C.navy
      }),
  },
  'tribes-map': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 0.06 * H) return null
        if (x < coast(y)) return dither(x, y) < 0.4 ? C.blue : C.sky
        if (Math.hypot(x - 0.6 * W, (y - 0.22 * H) * 1.3) < 7) return C.sky
        if (y > 0.62 * H && y < 0.84 * H && Math.abs(x - 0.61 * W) < 7 - Math.abs(y - 0.73 * H) / 6) return C.blue
        if (y > 0.24 * H && y < 0.62 * H && Math.abs(x - jordan(y)) < 1) return C.sky
        // A small dot where each tribe's portion is, and the land itself.
        for (const p of PORTIONS) if (Math.hypot(x - p.x * W, y - p.y * H) < 1.5) return C.wood1
        return (x * 5 + y * 3) % 47 === 0 ? C.wood3 : dither(x, y) < 0.2 ? C.sand2 : C.sand
      }),
  },
}
