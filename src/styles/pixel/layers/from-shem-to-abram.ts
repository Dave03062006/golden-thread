import type { PixelLayerArt } from '../art'
import { C } from '../palette'
import { fill } from './creation'

/**
 * Level 2, Episode 7 in pixel art: Ur of the Chaldeans, its walls and houses, its stepped
 * tower, and boats on the Euphrates. The shapes follow the paper version, at a fifth of its size.
 */

/** Boats in the harbor: hull from x0 to x1 at the waterline y, with a mast and sail. */
const BOATS: [number, number, number][] = [
  [226, 246, 140],
  [268, 284, 142],
  [36, 50, 141],
]

export const fromShemToAbramLayers: Record<string, PixelLayerArt> = {
  'ur-city': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The boats, on the water.
        for (const [x0, x1, wy] of BOATS) {
          const mid = (x0 + x1) / 2
          if (y >= wy && y <= wy + 3 && x >= x0 + (y - wy) && x <= x1 - (y - wy)) return C.wood1
          if (Math.round(mid) === x && y < wy && y >= wy - 13) return C.wood0
          if (y < wy - 2 && y >= wy - 13 && x > mid && x - mid <= (y - (wy - 13)) * 0.5) return C.white
        }
        // The river in front of the walls.
        if (y >= 135 && y <= 146) return y === 138 ? C.sky : C.blue
        if (y > 146) return null
        // The walls, with battlements and a gate.
        if (y >= 118 && y < 132) {
          if (x >= 140 && x <= 156 && y > 122 - Math.sqrt(Math.max(0, 64 - (x - 148) ** 2)) * 0.6) return C.wood0
          return y === 120 ? C.sand : C.wood3
        }
        if (y >= 115 && y < 118) return Math.floor((x + 48) / 7) % 2 ? C.wood3 : null
        // The stepped tower.
        for (let k = 0; k < 5; k++) {
          const left = 86 + k * 8
          const right = 158 - k * 8
          const top = 112 - (k + 1) * 11
          if (x >= left && x < right && y >= top && y < top + 11) return y === top ? C.sand : Math.abs(x - 122) <= 2 ? C.sand : k % 2 ? C.wood3 : C.sand2
        }
        if (x >= 118 && x < 126 && y >= 50 && y < 56) return C.gold
        // Houses crowded inside the walls.
        const i = Math.floor((x + 32) / 25.6)
        const left = -32 + i * 25.6
        const h = 12 + ((i * 41) % 50) / 5
        if (left > 76 && left < 168) return null
        if (x - left < 19 + ((i * 17) % 30) / 5 && y >= 120 - h) return Math.abs(x - left - 7) < 1.5 && y > 122 - h && y < 126 - h ? C.wood1 : i % 2 ? C.sand : C.sand2
        return null
      }),
  },
}
