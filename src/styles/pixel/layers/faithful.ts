import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 5, Episode 2 in pixel art: Potiphar's house by the Nile, and the king's prison lit
 * by one high window. The shapes follow the paper version, at a fifth of its size.
 */

const PALMS = [16, 52, 276, 312]

export const faithfulLayers: Record<string, PixelLayerArt> = {
  'egypt-house': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 148) return y === 152 ? C.sand2 : C.sand
        // The house: white walls under a ledge, painted columns.
        if (x >= 76 && x < 244 && y >= 56) {
          if (y < 62) return C.sand2
          const col = [88, 120, 152, 184, 216].find((c) => x >= c && x < c + 8)
          if (col !== undefined) return y < 67 ? C.blue : y === 74 || y === 80 ? C.rose : C.sand
          return C.white
        }
        // Palms on either side, and the river behind.
        for (const p of PALMS) {
          if (x >= p && x < p + 2 && y >= 76) return C.wood2
          if (y >= 70 && y < 80 && Math.abs(x - p - 1) < 14 - Math.abs(y - 74) * 1.5 && (x + y) % 2) return C.green
        }
        if (y >= 112 && y < 120) return dither(x, y) < 0.3 ? C.sky : C.blue
        return y >= 112 ? C.sand : null
      }),
  },
  prison: {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 156) return y === 156 ? C.wood2 : C.wood0
        // The high window, barred, and its shaft of light.
        if (x >= 140 && x < 180 && y >= 28 && y < 52) return (x - 140) % 8 < 2 ? C.wood0 : C.sand
        const shaft = y >= 52 && x >= 140 - (y - 52) * 0.42 && x < 180 + (y - 52) * 0.42
        if (shaft && dither(x, y) < 0.3 * (1 - (y - 52) / 110)) return C.sand2
        // Mud-brick walls.
        const row = Math.floor((y + 30) / 11)
        const brick = Math.floor((x + 30 + (row % 2) * 14) / 28)
        if ((y + 30) % 11 === 0 || (x + 30 + (row % 2) * 14) % 28 === 0) return C.wood0
        return (row + brick) % 3 ? C.wood1 : C.wood2
      }),
  },
}
