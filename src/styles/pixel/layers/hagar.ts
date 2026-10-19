import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, drawHills, fill } from './creation'

/**
 * Level 3, Episode 5 in pixel art: pale dunes in the wilderness, and the heat haze that
 * hides the well. The shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)

export const hagarLayers: Record<string, PixelLayerArt> = {
  desert: {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([470, 450, 480, 440, 470, 460, 440, 470, 450, 460]), x)) ? (dither(x, y) < 0.6 ? C.sand : C.white) : null))
      drawHills(buf, div([640, 600, 650, 620, 600, 640, 610, 650, 620, 630]), 0, C.white, C.sand, C.sand, C.sand2)
      fill(buf, (x, y) => ([136, 148, 162, 178].some((r) => y === r + Math.round(Math.sin(x / 40 + r) * 2)) ? C.sand2 : null))
    },
  },
  'heat-haze': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 76) return null
        const wave = Math.sin(x / 14 + y / 3)
        return (0.2 + 0.1 * wave) > dither(x, y) ? (y % 4 === 0 ? C.white : C.gold) : null
      }),
  },
}
