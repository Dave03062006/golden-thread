import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, drawHills, fill } from './creation'

/**
 * Level 4, Episode 4 in pixel art: Bethel, the stony hill country at night. The shapes
 * follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)
const FAR = div([430, 400, 440, 410, 380, 420, 400, 430, 410, 440])
const NEAR = div([600, 580, 610, 570, 590, 620, 580, 600, 590, 610])
const STONES = [
  [16, 132, 8],
  [52, 140, 6],
  [84, 128, 4],
  [196, 130, 6],
  [236, 140, 9],
  [280, 132, 5],
  [312, 138, 7],
  [124, 144, 4],
] as const

export const bethelLayers: Record<string, PixelLayerArt> = {
  'bethel-stones': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(FAR, x)) ? (dither(x, y) < 0.6 ? C.navy : C.dslate) : null))
      drawHills(buf, NEAR, 0, C.slate, C.dslate, C.dslate, C.navy)
      fill(buf, (x, y) => {
        for (const [sx, sy, r] of STONES) {
          const d = Math.hypot((x - sx) / r, (y - sy) / (r * 0.6))
          if (d < 1) return y < sy - r * 0.25 ? C.pale : C.slate
        }
        return y >= 152 + Math.round(Math.sin(x / 40) * 2) ? C.ink : null
      })
    },
  },
}
