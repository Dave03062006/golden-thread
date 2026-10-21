import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 5, Episodes 4 and 5 in pixel art: Joseph's grain hall, mud-brick walls under a
 * timber roof, light from the openings, and heaps of grain. The shapes follow the paper
 * version, at a fifth of its size.
 */

const HEAPS = [
  [24, 120, 52],
  [124, 124, 44],
  [224, 118, 60],
  [328, 124, 44],
] as const

export const grainLayers: Record<string, PixelLayerArt> = {
  'storehouse-hall': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 156) return y === 156 ? C.wood2 : C.sand2
        for (const [hx, top, w] of HEAPS) {
          const t = Math.abs(x - hx) / (w / 2)
          if (t < 1 && y >= top + (156 - top) * t * t) return y < top + 6 ? C.gold : C.sand
        }
        if (y < 13) return x % 20 < 4 ? C.wood0 : C.wood1
        if ([0, 88, 196, 292].some((c) => x >= c && x < c + 16)) return C.wood3
        for (const o of [40, 140, 240]) {
          if (x >= o && x < o + 24 && y >= 24 && y < 68) return C.white
          if (y >= 68 && x >= o - (y - 68) * 0.22 && x < o + 24 + (y - 68) * 0.22 && dither(x, y) < 0.18) return C.gold
        }
        return dither(x, y) < 0.15 ? C.sand2 : C.wood3
      }),
  },
}
