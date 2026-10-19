import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, fill } from './creation'

/**
 * Level 3, Episode 8 in pixel art: the gate of Sodom at dawn, and the plain running east
 * to the hills. The shapes follow the paper version, at a fifth of its size.
 */

const HILLS = [520, 500, 520, 480, 470, 440, 420, 430, 410, 420].map((h) => h / 5)

export const sodomLayers: Record<string, PixelLayerArt> = {
  'sodom-gate': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The walls and the gate on the left, the tower beside it.
        if (x < 76 && y >= 72 && y < 132) {
          if (x >= 40 && x < 60 && y >= 108 - Math.round(Math.sqrt(Math.max(0, 100 - (x - 50) ** 2)) * 0.8)) return C.ink
          return C.dslate
        }
        if (x < 76 && y >= 67 && y < 72 && Math.floor((x + 48) / 8) % 2 === 0) return C.dslate
        if (x >= 76 && x < 92 && y >= 56 && y < 132) return y < 60 ? C.ink : C.slate
        const ground = 128
        if (y >= ground) return y === 140 ? C.sand2 : dither(x, y) < 0.15 ? C.sand2 : C.sand
        if (y >= Math.round(crest(HILLS, x))) return dither(x, y) < 0.5 ? C.slate : C.pale
        return null
      }),
  },
}
