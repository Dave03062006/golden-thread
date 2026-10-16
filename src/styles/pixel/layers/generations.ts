import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { bandColor, fill } from './creation'

/**
 * Level 1, Episode 6 in pixel art: the path Enoch walked with God, rising into a great
 * light between two soft hills.
 */

const LIGHT = { x: 196, y: 50 }

export const generationsLayers: Record<string, PixelLayerArt> = {
  'enoch-path': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const glow = Math.max(0, 1 - Math.hypot(x - LIGHT.x, (y - LIGHT.y) * 1.2) / 140)
        // The path: narrow at the light, widening toward the viewer.
        const t = Math.max(0, (y - 82) / 116)
        const centre = 196 - t * 30
        const half = 2 + t * 56
        if (y > 82 && Math.abs(x - centre) < half) return glow * 1.4 + 0.25 > dither(x, y) ? C.white : C.sand
        // Two hills either side, below the line of the light.
        const hill = 128 - 40 * Math.exp(-(((x - 196) / 120) ** 2))
        if (y > hill) return glow > dither(x, y) * 1.5 ? C.green : y > hill + 30 ? C.teal : C.green
        return bandColor([C.white, C.gold, C.rose, C.purple, C.navy], 1 - glow * 1.2 + (y < 0 ? 0.1 : 0), x, y)
      }),
  },
}
