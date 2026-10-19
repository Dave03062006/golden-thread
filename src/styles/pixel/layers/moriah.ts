import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 3, Episode 10 in pixel art: the mountain of Moriah far off, the path up its side,
 * and its rocky summit. The shapes follow the paper version, at a fifth of its size.
 */

/** The slope's edge, from the foot on the left up to the right. */
const slope = (x: number) => (x < 180 ? 180 - (x + 48) * 0.24 : 128 - (x - 180) * (128 - 44) / 188)
/** The path's middle line, matching the paper version's curve. */
const pathY = (x: number) => (x < 104 ? 176 - (x + 20) * 0.1 : x < 180 ? 152 - (x - 104) * 0.36 : x < 260 ? 124 - (x - 180) * 0.42 : 90 - (x - 260) * 0.5)

export const moriahLayers: Record<string, PixelLayerArt> = {
  'moriah-far': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = x < 140 ? 128 - (x + 48) * 0.1 : x < 196 ? 104 - Math.sqrt(Math.max(0, 1 - ((x - 196) / 56) ** 2)) * 34 : x < 248 ? 70 + ((x - 196) / 52) ** 2 * 34 : 104 + (x - 248) * 0.15
        if (y < Math.round(top)) return null
        return y === Math.round(top) ? C.pale : dither(x, y) < 0.5 ? C.slate : C.purple
      }),
  },
  'moriah-path': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = Math.round(slope(x))
        if (y < top) return null
        if (y === top) return C.sand
        if (Math.abs(y - pathY(x)) <= 2) return C.sand
        return dither(x, y) < 0.2 ? C.wood2 : C.wood3
      }),
  },
  'moriah-top': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = Math.round(x < 100 ? 152 - (x + 48) * 0.15 : x < 220 ? 130 : 130 + (x - 220) * 0.2)
        if (y < top) return null
        return y === top ? C.sand : dither(x, y) < 0.2 ? C.wood2 : C.wood3
      }),
  },
}
