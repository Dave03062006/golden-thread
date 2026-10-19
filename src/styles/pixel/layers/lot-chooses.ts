import type { PixelLayerArt } from '../art'
import { C, dither, hash } from '../palette'
import { crest, drawHills, fill } from './creation'

/**
 * Level 3, Episode 2 in pixel art: the hills parched in the famine; Egypt green along the
 * Nile, with Pharaoh's palace and the pyramids; and the Jordan valley seen from above, its
 * river, its trees and the shining cities of the plain. The shapes follow the paper
 * version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)

export const lotChoosesLayers: Record<string, PixelLayerArt> = {
  'dry-hills': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([480, 440, 470, 430, 460, 480, 440, 470, 430, 460]), x)) ? (dither(x, y) < 0.5 ? C.pale : C.sand2) : null))
      drawHills(buf, div([560, 520, 560, 590, 540, 570, 530, 560, 540, 570]), 0, C.sand, C.sand2, C.sand2, C.wood3)
      drawHills(buf, div([680, 660, 690, 700, 670, 690, 660, 680, 690, 670]), 0, C.sand, C.sand2, C.wood3, C.wood2)
      fill(buf, (x, y) => (y > 145 && hash(x * 5.3 + y * 1.7) > 0.985 ? C.wood1 : null))
    },
  },
  'egypt-nile': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The pyramids, far off on the left.
        for (const [px, py, s] of [
          [48, 104, 18],
          [80, 104, 12],
        ] as const) {
          if (y < py && y >= py - s * 0.9 && Math.abs(x - px) <= (y - (py - s * 0.9)) / 0.9) return x > px ? C.sand2 : C.sand
        }
        // Pharaoh's palace, with its columns.
        if (x >= 196 && x < 256 && y >= 80 && y < 104) {
          if (y < 82) return C.blue
          if (y < 86 || (x - 202) % 10 < 3) return C.white
          return C.pale
        }
        if (y < 104) return null
        if (y < 112) return C.sand
        if (y < 124) return y === 116 ? C.sky : C.blue
        if (y < 140) {
          for (let i = 0; i < 9; i++) {
            const px = -24 + i * 46
            if (x === px && y > 112) return C.wood1
          }
          return C.green
        }
        return dither(x, y) < 0.15 ? C.sand2 : C.sand
      }),
  },
  'jordan-valley': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([470, 450, 480, 460, 470, 450, 470, 460, 480, 460]), x)) ? (dither(x, y) < 0.5 ? C.pale : C.slate) : null))
      fill(buf, (x, y) => {
        const ground = 112 + Math.round(Math.sin(x / 40) * 3)
        if (y < ground) {
          // The cities of the plain, shining far off.
          for (const cx of [236, 264]) if (Math.abs(x - cx) < 10 && y > ground - (Math.abs(x - cx) < 4 ? 9 : 5)) return C.white
          return null
        }
        // A high place in the near corner, where Lot stands.
        if (x < 104 && y > 148 - Math.min(8, Math.abs(x - 48) * 0.15)) return y < 151 ? C.sand : C.wood2
        const river = 124 + Math.round(Math.sin(x / 30) * 6)
        if (Math.abs(y - river) <= 1) return C.sky
        if (hash(Math.floor(x / 6) * 3.1 + Math.floor(y / 5) * 7.3) > 0.82) return C.teal
        return y === ground ? C.lime : C.green
      })
    },
  },
}
