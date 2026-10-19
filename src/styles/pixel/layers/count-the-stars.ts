import type { PixelLayerArt } from '../art'
import { C, dither, hash } from '../palette'
import { fill } from './creation'

/**
 * Level 3, Episode 4 in pixel art: three fields of stars, each denser than the last, and
 * the Milky Way spilling across the sky.
 */

const field = (seed: number, chance: number, bright: number): PixelLayerArt => ({
  draw: (buf) =>
    fill(buf, (x, y) => {
      if (y > 120) return null
      const h = hash(x * 12.9898 + y * 78.233 + seed)
      if (h < chance) return h < chance * bright ? C.white : C.pale
      return null
    }),
})

export const countTheStarsLayers: Record<string, PixelLayerArt> = {
  'star-field-1': field(1, 0.006, 0.6),
  'star-field-2': field(2, 0.02, 0.4),
  'star-field-3': field(3, 0.05, 0.3),
  'milky-way': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // A band from the upper left down to the right.
        const centre = 24 + (x + 24) * 0.21
        const d = Math.abs(y - centre) / 22
        if (d > 1) return null
        const h = hash(x * 3.7 + y * 9.1 + 5)
        if (h > 0.9 - (1 - d) * 0.25) return h > 0.97 ? C.white : C.pale
        return (1 - d) * 0.35 > dither(x, y) ? C.purple : null
      }),
  },
}
