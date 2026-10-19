import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { bandColor, crest, drawHills, fill } from './creation'

/**
 * Level 3, Episode 1 in pixel art: Haran at dawn, its walls and moon tower below the hill
 * where Abram's tent stands; and the green hill country of Canaan with a road winding into
 * it. The shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)
const HARAN_HILL = div([690, 660, 640, 580, 600, 640, 620, 600, 640, 660])
const FAR_HILLS = div([470, 430, 460, 420, 450, 470, 430, 450, 420, 460])

export const theCallLayers: Record<string, PixelLayerArt> = {
  'dawn-sky': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const sun = Math.hypot(x - 236, y - 112)
        if (sun < 11) return C.white
        if (sun < 40 && (40 - sun) / 40 > dither(x, y) * 1.5) return C.gold
        if ((x * 7 + y * 13) % 97 === 0 && y < 30) return C.pale
        return bandColor([C.navy, C.purple, C.rose, C.orange, C.gold], Math.max(0, (y + 14) / 142), x, y)
      }),
  },
  'haran-hills': {
    draw: (buf) => {
      // Far hills, then the city walls with the moon tower, then Abram's hill.
      fill(buf, (x, y) => {
        if (y >= Math.round(crest(FAR_HILLS, x))) return dither(x, y) < 0.5 ? C.purple : C.slate
        // The walls of Haran, on the left.
        if (x >= 24 && x < 84) {
          const top = x < 30 ? 108 : x < 42 ? 104 : x < 66 ? 108 : 112
          if (y >= top && y < 120) return y === top ? C.sand : C.sand2
          if (y === top - 2 && x % 6 < 3) return C.sand2
        }
        if (x >= 48 && x < 53 && y >= 88 && y < 104) return C.sand
        if (Math.hypot(x - 50, y - 86) < 2.6) return C.white
        return null
      })
      drawHills(buf, HARAN_HILL, 0, C.orange, C.wood2, C.wood1, C.wood0)
      fill(buf, (x, y) => (y >= 152 + Math.round(Math.sin(x / 50) * 2) ? C.wood0 : null))
    },
  },
  'canaan-hills': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([480, 440, 470, 430, 460, 480, 440, 470, 430, 460]), x)) ? (dither(x, y) < 0.5 ? C.pale : C.slate) : null))
      drawHills(buf, div([560, 520, 560, 590, 540, 570, 530, 560, 540, 570]), 0, C.lime, C.green, C.green, C.teal)
      drawHills(buf, div([680, 660, 690, 700, 670, 690, 660, 680, 690, 670]), 0, C.lime, C.green, C.green, C.teal)
      // The road winding up into the hills, and trees here and there.
      fill(buf, (x, y) => {
        if (y < 136) return null
        const roadX = 160 + (y - 180) * -0.9 + Math.sin(y / 9) * 6
        if (Math.abs(x - roadX) < 3 + (y - 136) * 0.06) return C.sand
        for (const [tx, ty] of [
          [40, 134],
          [64, 136],
          [260, 132],
          [292, 136],
        ] as const)
          if (Math.hypot((x - tx) / 1.2, y - ty) < 5) return y < ty - 1 ? C.green : C.teal
        return null
      })
    },
  },
}
