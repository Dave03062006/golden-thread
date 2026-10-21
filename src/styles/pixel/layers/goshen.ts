import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 5, Episodes 6 and 7 in pixel art: the green land of Goshen, palms, a canal and
 * fields. The shapes follow the paper version, at a fifth of its size.
 */

const PALMS = [12, 44, 104, 196, 260, 304]

export const goshenLayers: Record<string, PixelLayerArt> = {
  'goshen-fields': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 152) return Math.floor((x + 48) / 30) % 2 ? C.lime : C.sand
        if (y >= 136 && y < 142) return y === 137 && x % 9 < 4 ? C.cyan : C.sky
        if (y >= 120) return C.green
        for (const [i, p] of PALMS.entries()) {
          const top = 94 - (i % 2) * 6
          if (x >= p && x < p + 2 && y >= top && y < 120) return C.wood2
          if (y >= top - 4 && y < top + 4 && Math.abs(x - p - 1) < 12 - Math.abs(y - top) * 2 && (x + y) % 2) return C.teal
        }
        if (y >= 112) return dither(x, y) < 0.5 ? C.lime : C.green
        return null
      }),
  },
}
