import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { C, dither } from '../palette'
import { bandColor, fill } from './creation'

/**
 * Level 2, Episode 3 in pixel art: the storm sky gathering, the floodwater rising over
 * the clearing, then the sea under the storm, and at last wide and still under a gray sky.
 */

/** Heavy clouds: rounded masses in two shades. */
function clouds(buf: PixelBuffer, masses: [number, number, number][], dark: string, light: string) {
  fill(buf, (x, y) => {
    for (const [cx, cy, r] of masses) {
      const d = Math.hypot((x - cx) / 2, y - cy)
      if (d < r) return d < r - 2 || dither(x, y) < 0.5 ? (y > cy + r * 0.3 ? dark : light) : null
    }
    return null
  })
}

/** Rows of rolling sea from the horizon down, each crest a little lower and bigger. */
function sea(buf: PixelBuffer, horizon: number, body: string, deep: string, crest: string) {
  fill(buf, (x, y) => {
    if (y < horizon) return null
    for (let i = 5; i >= 0; i--) {
      const row = horizon + 2 + i * i * 2.8 + i * 5
      const amp = 1 + i * 0.6
      const top = Math.round(row - amp * Math.abs(Math.sin((x + i * 13) / (5 + i * 3))))
      if (y >= top && y <= top + 1 && y > horizon) return crest
    }
    return (y - horizon) / 90 > dither(x, y) ? deep : body
  })
}

export const theFloodLayers: Record<string, PixelLayerArt> = {
  'storm-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => bandColor([C.ink, C.dslate, C.slate], Math.max(0, (y + 14) / 154), x, y))
      clouds(
        buf,
        [
          [20, 8, 18],
          [100, -2, 22],
          [180, 6, 18],
          [260, -6, 22],
          [330, 8, 16],
          [60, 44, 12],
          [150, 38, 14],
          [240, 44, 12],
        ],
        C.ink,
        C.dslate,
      )
    },
  },
  'flood-rising': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = 108 + Math.round(Math.sin(x / 9) * 1.5)
        if (y < top) return null
        if (y === top) return C.pale
        return y === 124 + Math.round(Math.sin(x / 13) * 1.2) ? C.sky : y > 124 ? C.navy : C.blue
      }),
  },
  'gray-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => bandColor([C.slate, C.pale, C.white], Math.max(0, (y + 14) / 110), x, y))
      clouds(
        buf,
        [
          [40, 18, 10],
          [210, 8, 13],
        ],
        C.slate,
        C.pale,
      )
    },
  },
  'open-sea': { draw: (buf) => sea(buf, 94, C.blue, C.navy, C.pale) },
}
