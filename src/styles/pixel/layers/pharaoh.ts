import type { PixelLayerArt } from '../art'
import { C } from '../palette'
import { fill } from './creation'

/**
 * Level 5, Episode 3 in pixel art: Pharaoh's throne hall, with painted columns, a starry
 * blue ceiling, the dais and bright doorways. The shapes follow the paper version, at a
 * fifth of its size.
 */

const COLUMNS = [16, 104, 208, 296]
const DOORS = [60, 240]

export const pharaohLayers: Record<string, PixelLayerArt> = {
  'pharaoh-hall': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 156) return (x + y) % 16 === 0 ? C.sand2 : C.wood3
        if (y < 23) return (x * 7 + y * 11) % 53 === 0 ? C.gold : C.navy
        if (y < 28) return C.gold
        for (const c of COLUMNS) {
          if (x >= c && x < c + 18) {
            if (y < 34) return C.teal
            const band = y % 24
            return band === 4 || band === 5 ? (Math.floor(y / 24) % 2 ? C.rose : C.blue) : C.sand
          }
        }
        for (const d of DOORS) if (x >= d && x < d + 24 && y >= 60) return C.white
        if (y >= 124 && x >= 140 - (y - 124) * 0.4 && x < 220 + (y - 124) * 0.4) return y === 140 ? C.sand2 : C.sand
        return C.pale
      }),
  },
}
