import type { PixelLayerArt } from '../art'
import { C, dither, hash } from '../palette'
import { bandColor, crest, drawHills, fill } from './creation'

/**
 * Level 6 · Job in pixel art: Job's pastures and his stone house; the ash heap outside the
 * town; the court of heaven above the clouds; and the great rock with its smooth face. The
 * shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)
const FAR = div([470, 500, 460, 490, 470, 500, 480, 460, 490, 470])
const MID = div([560, 540, 575, 545, 560, 590, 550, 570, 545, 565])
const NEAR = div([670, 660, 680, 665, 675, 660, 680, 670, 665, 675])

/** Whether a point is inside a polygon. */
function inside(points: readonly (readonly [number, number])[], x: number, y: number): boolean {
  let hit = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]!
    const [xj, yj] = points[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** A round tree: its trunk and crown, or null where it isn't. */
function tree(x: number, y: number, tx: number, ty: number, s: number): string | null {
  if (Math.abs(x - tx) <= 0.6 * s && y < ty && y >= ty - 8 * s) return C.wood1
  const dx = (x - tx) / (6 * s)
  const dy = (y - (ty - 10.5 * s)) / (4.5 * s)
  if (dx * dx + dy * dy <= 1) return dx + dy < -0.3 ? C.lime : dither(x, y) < 0.3 ? C.teal : C.green
  return null
}

const ROCK = [[192, 158], [186, 112], [196, 72], [208, 46], [226, 32], [258, 28], [284, 38], [302, 60], [312, 94], [320, 128], [328, 158]] as const
const FACE = [[208, 80], [216, 58], [230, 47], [254, 44], [274, 51], [284, 66], [286, 84], [282, 106], [212, 110]] as const

export const uzLayers: Record<string, PixelLayerArt> = {
  'uz-pastures': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(FAR, x)) ? (dither(x, y) < 0.5 ? C.pale : C.green) : null))
      drawHills(buf, MID, 0, C.lime, C.green, C.green, C.teal)
      fill(buf, (x, y) => {
        // Job's stone house among the trees.
        if (x >= 216 && x < 252 && y >= 116 && y < 119) return C.sand2
        if (x >= 218 && x < 250 && y >= 119 && y < 131) {
          if (x >= 231 && x < 236 && y >= 124) return C.wood1
          if ((x >= 222 && x < 226) || (x >= 242 && x < 246)) if (y >= 122 && y < 125) return C.wood2
          return C.sand
        }
        return tree(x, y, 210, 130, 1.1) ?? tree(x, y, 260, 130, 0.9) ?? tree(x, y, 28, 120, 0.8) ?? tree(x, y, 164, 120, 0.7)
      })
      drawHills(buf, NEAR, 0, C.lime, C.green, C.green, C.green)
      fill(buf, (x, y) => (y > 142 && hash(x * 3.1 + y * 7.7) > 0.975 ? C.teal : null))
    },
  },
  'ash-heap': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([520, 500, 530, 510, 525, 505, 520, 500, 515, 525]), x)) ? (dither(x, y) < 0.5 ? C.pale : C.slate) : null))
      fill(buf, (x, y) => {
        // The town wall far off, with its towers and gate.
        const top = (x >= 18 && x < 26) || (x >= 60 && x < 68) ? 100 : 104
        if (x >= 8 && x < 94 && y >= top && y < 120) {
          if (x >= 46 && x < 53 && y >= 112) return C.wood1
          return y < top + 2 && x % 4 < 2 ? C.sand : C.sand2
        }
        return null
      })
      drawHills(buf, div([620, 610, 630, 600, 615, 625, 605, 620, 610, 630]), 0, C.pale, C.slate, C.slate, C.dslate)
      fill(buf, (x, y) => {
        const ground = 136 - Math.round(Math.sin(((x + 48) / 368) * Math.PI) * 4)
        if (y < ground) return null
        // The ash heap where Job sits.
        const mx = (x - 156) / 52
        const my = (y - 140) / 9
        if (mx * mx + my * my <= 1 && y < 140) return my < -0.6 ? C.white : dither(x, y) < 0.4 ? C.pale : C.slate
        if (hash(x * 4.7 + y * 2.3) > 0.993) return hash(x + y) > 0.5 ? C.pale : C.dslate
        return dither(x, y) < 0.06 ? C.dslate : C.slate
      })
    },
  },
  'heaven-court': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // Clouds across the bottom, in rounded banks.
        const bank = 118 + Math.round(Math.sin(x / 13) * 4 + Math.sin(x / 31) * 5)
        if (y >= bank + 22) return C.white
        if (y >= bank) return y < bank + 2 ? C.white : dither(x, y) < 0.35 ? C.pale : C.white
        // The light, brightest above the middle, softening toward the edges.
        const d = Math.hypot(x - 160, (y - 32) * 1.2) / 260
        return bandColor([C.white, C.gold, C.sand, C.pale], d, x, y)
      }),
  },
  'rock-face': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (!inside(ROCK, x, y)) return null
        if (inside(FACE, x, y)) return dither(x, y) < 0.15 ? C.sand2 : C.sand
        // The sides in shadow, and a few cracks and strata.
        if (x < 202 || x > 296) return dither(x, y) < 0.5 ? C.wood3 : C.sand2
        if ((y === 128 || y === 140) && x % 7 < 5) return C.wood3
        return C.sand2
      }),
  },
}
