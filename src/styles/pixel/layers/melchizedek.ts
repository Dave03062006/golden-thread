import type { PixelLayerArt } from '../art'
import { C } from '../palette'
import { crest, fill } from './creation'

/**
 * Level 3, Episode 3 in pixel art: the King's Valley at morning below the small walled
 * city of Salem on its hill. The shapes follow the paper version, at a fifth of its size.
 */

const VALLEY = [640, 620, 650, 660, 640, 650, 630, 640, 650, 640].map((h) => h / 5)

/** The hill Salem stands on: rising from the left, its top on the right. */
function hillTop(x: number): number {
  if (x < 140) return 120 - (x + 48) * (12 / 188)
  if (x < 236) return 108 - (1 - ((x - 236) / 96) ** 2) * 42
  if (x < 312) return 66 + ((x - 236) / 76) ** 2 * 28
  return 94 + (x - 312) * 0.2
}

export const melchizedekLayers: Record<string, PixelLayerArt> = {
  'salem-hill': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The walls of Salem, its gate and its small temple.
        if (x >= 212 && x < 262) {
          const top = x < 218 || (x > 246 && x < 256) ? 52 : 56
          if (y >= top && y < 72) {
            if (x >= 232 && x < 240 && y > 63) return C.wood1
            return y === top ? C.white : C.sand
          }
          if (y === top - 2 && x % 4 < 2) return C.sand
        }
        if (x >= 233 && x < 239 && y >= 46 && y < 52) return C.white
        if (y >= 43 && y < 46 && Math.abs(x - 236) <= 46 - y) return C.gold
        const top = Math.round(hillTop(x))
        const valley = Math.round(crest(VALLEY, x))
        if (y >= valley) return y === valley ? C.lime : C.green
        if (y >= top) return y === top ? C.sand : C.sand2
        return null
      }),
  },
}
