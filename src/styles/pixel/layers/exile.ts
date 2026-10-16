import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { MARGIN_X, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { bandColor, crest, drawHills, fill } from './creation'

/**
 * Level 1, Episode 4 in pixel art: the garden losing its colors, and the harder land east
 * of Eden at dusk, with its faint path of light.
 */

const FAR = [94, 90.4, 86, 89.2, 94, 91.2, 87.2, 90, 94.8, 92, 88, 90.4, 95.2]
const LAND = [112, 110.4, 109.6, 111.2, 113.2, 111.2, 109.2, 110.4, 112, 110.8, 109.6, 111.2, 113.2]

/** The dry land: a lit rim, deepening toward the viewer, with cracks and stones. */
function drawLand(buf: PixelBuffer) {
  fill(buf, (x, y) => {
    const top = Math.round(crest(LAND, x))
    if (y < top) return null
    if (y === top) return C.sand2
    return bandColor([C.wood3, C.wood2, C.wood1, C.wood0], (y - top) / 85, x, y)
  })
  for (let i = 0; i < 22; i++) {
    let x = Math.floor(hash(i * 3.7 + 1) * (PX_W + MARGIN_X * 2)) - MARGIN_X
    let y = Math.round(crest(LAND, x) + 6 + hash(i * 1.9) * 70)
    for (let k = 0; k < 5; k++) {
      buf.set(fx(x), fy(y), C.wood0)
      x += hash(i * 7 + k) < 0.5 ? -1 : 1
      if (hash(i * 3 + k * 5) < 0.4) y += 1
      buf.set(fx(x), fy(y), C.wood0)
      x += hash(i * 11 + k) < 0.5 ? -1 : 1
    }
  }
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(hash(i * 5.3 + 9) * PX_W)
    const y = Math.round(crest(LAND, x) + 8 + hash(i * 2.7) * 64)
    buf.set(fx(x), fy(y), C.slate)
    buf.set(fx(x + 1), fy(y), C.slate)
    buf.set(fx(x), fy(y - 1), C.pale)
  }
}

export const exileLayers: Record<string, PixelLayerArt> = {
  'eden-grey': {
    fade: 'ordered',
    draw: (buf) => fill(buf, (x, y) => (0.45 > dither(x, y) ? C.slate : null)),
  },

  'east-sky': {
    draw: (buf) => fill(buf, (x, y) => bandColor([C.navy, C.purple, C.rose, C.orange, C.gold], Math.max(0, (y + 14) / 138), x, y)),
  },

  'east-hills': {
    draw: (buf) => drawHills(buf, FAR, 0, C.rose, C.purple, C.purple, C.navy),
  },

  'east-land': { draw: drawLand },

  // A faint path of light across the land, running away to the left (the east).
  'east-path': {
    fade: 'ordered',
    draw: (buf) =>
      fill(buf, (x, y) => {
        const t = (x + MARGIN_X) / (PX_W + MARGIN_X * 2)
        const centre = 120 + 32 * t
        const half = 3 + 6 * t
        if (Math.abs(y - centre) > half) return null
        const level = 0.25 + 0.45 * (1 - t)
        return level > dither(x, y) ? C.gold : null
      }),
  },
}
