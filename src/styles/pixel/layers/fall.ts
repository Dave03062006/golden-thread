import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 1, Episode 3 in pixel art: the veil that dims everything but the fruit as the
 * serpent lies, and the cold of evening after the Fall, both as ordered dithering.
 */

/** Where the fruit hangs, in frame pixels (see episode-3.ts). */
const FRUIT = { x: 117, y: 90 }

export const fallLayers: Record<string, PixelLayerArt> = {
  'eden-dim': {
    fade: 'ordered',
    draw: (buf) =>
      fill(buf, (x, y) => {
        const level = Math.min(0.85, Math.max(0, (Math.hypot(x - FRUIT.x, y - FRUIT.y) - 8) / 45))
        return level > dither(x, y) ? C.ink : null
      }),
  },

  'eden-dusk': {
    fade: 'ordered',
    draw: (buf) =>
      fill(buf, (x, y) => {
        // Deepest at the top of the sky, a little warmer near the horizon, deep again in front.
        const level = y < 100 ? 0.65 - y * 0.0025 : 0.4 + (y - 100) * 0.003
        const color = y > 88 && y < 112 ? C.purple : C.navy
        return level > dither(x, y) ? color : null
      }),
  },
}
