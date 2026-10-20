import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 4, Episode 3 in pixel art: inside Isaac's tent. Dark striped goat-hair walls, the
 * tent pole, the lamp's warm glow, a patterned rug, and the open flap on the right with the
 * evening beyond. The shapes follow the paper version, at a fifth of its size.
 */

export const blessingLayers: Record<string, PixelLayerArt> = {
  'tent-inside': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The rug, with its gold borders and diamonds.
        if (y >= 156) {
          if (y === 160 || y === 200) return C.gold
          const d = Math.abs(((x + 8) % 18) - 9) + Math.abs(y - 180)
          return d < 8 && dither(x, y) < 0.6 ? C.wood3 : C.rose
        }
        // The open flap: the evening outside, and the tent cloth folded back either side.
        const doorTop = 46 + Math.abs(x - 276) * 0.12
        if (x >= 258 && x < 294 && y >= doorTop) return y > 140 ? C.orange : y > 110 ? C.rose : (x * 7 + y * 13) % 89 === 0 ? C.white : C.purple
        if ((x >= 246 && x < 258) || (x >= 294 && x < 308)) return C.wood1
        // The pole.
        if (x >= 150 && x < 154) return C.wood2
        // The roof, darker, and the striped walls, lit warmly near the lamp.
        if (y < 24 - 16 * (1 - ((x - 152) / 200) ** 2)) return C.wood0
        const stripe = Math.floor((x + 30 - (x - 152) * (y / 156) * 0.06) / 24) % 2 === 0
        const glow = Math.hypot(x - 128, (y - 124) * 1.4) / 120
        if (glow < 1 && 1 - glow > dither(x, y) * 1.6) return stripe ? C.wood2 : C.wood1
        return stripe ? C.wood1 : C.wood0
      }),
  },
}
