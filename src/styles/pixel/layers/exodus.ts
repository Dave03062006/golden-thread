import type { PixelLayerArt } from '../art'
import { C, dither, hash } from '../palette'
import { crest, drawHills, fill } from './creation'

/**
 * Level 7 · Moses Is Called in pixel art: the brick pits and the store-cities; the street
 * of the Hebrew quarter; inside a Hebrew house; the Nile among the papyrus; and Horeb, the
 * mountain of God. The shapes follow the paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)
/** The houses of the Hebrew quarter, in frame pixels (see episode-1's HOUSES). */
const HOUSES = [77, 122, 166, 211, 256]

/** A clump of papyrus, or null where there is none: stalks, each with a fan for a head. */
function papyrus(x: number, y: number, cx: number, base: number, count: number, height: number, seed: number): string | null {
  for (let i = 0; i < count; i++) {
    const sx = cx + ((i * 37 + seed * 13) % 18) - 9
    const h = Math.round(height * (0.75 + (((i * 53 + seed) % 10) / 10) * 0.35))
    const top = base - h
    if (y > top + 2 && y <= base && x === sx + Math.round(((i % 3) - 1) * 2 * ((base - y) / h))) return C.green
    const tx = sx + ((i % 3) - 1) * 2
    if (y >= top - 3 && y <= top + 1 && Math.abs(x - tx) <= 4 - Math.abs(y - (top - 1)) && (x + y) % 2 === 0) return i % 2 ? C.lime : C.green
  }
  return null
}

/** The Nile among the papyrus, its water in the colors given (blue, or turned to blood). */
export function nileReeds(water: string, ripple: string): PixelLayerArt {
  return {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([520, 515, 522, 512, 520, 518, 514, 520, 516, 520]), x)) ? (dither(x, y) < 0.5 ? C.green : C.lime) : null))
      fill(buf, (x, y) => {
        // Palms on the far bank.
        for (const [i, px] of [16, 60, 104, 236, 288].entries()) {
          const top = 86 - (i % 2) * 5
          if (x >= px && x < px + 2 && y >= top && y < 108) return C.wood1
          if (y >= top - 3 && y < top + 3 && Math.abs(x - px - 1) < 10 - Math.abs(y - top) * 2 && (x + y) % 2) return C.teal
        }
        // The river.
        if (y >= 111 && y < 139) return (y === 118 || y === 124 || y === 130) && (x + y * 3) % 11 < 6 ? ripple : water
        // The papyrus along the near bank, and the bank itself.
        const reed = papyrus(x, y, 16, 140, 14, 42, 3) ?? papyrus(x, y, -24, 140, 10, 38, 7) ?? papyrus(x, y, 224, 140, 12, 44, 5) ?? papyrus(x, y, 272, 140, 14, 40, 9) ?? papyrus(x, y, 112, 140, 6, 28, 11)
        if (reed) return reed
        if (y >= 139) return y === 139 ? C.lime : dither(x, y) < 0.3 ? C.wood3 : C.sand2
        return null
      })
    },
  }
}

export const exodusLayers: Record<string, PixelLayerArt> = {
  'brick-pits': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([600, 590, 600, 585, 600, 595, 590, 600, 590, 600]), x)) ? (dither(x, y) < 0.5 ? C.sand : C.pale) : null))
      fill(buf, (x, y) => {
        // The store-cities going up: walls, a ramp, columns.
        if (x >= 24 && x < 104 && y >= 88 && y < 120) return C.sand2
        if (x >= 32 && x < 96 && y >= 76 && y < 88) return C.wood3
        if (y >= 88 && y < 120 && x >= 104 && x < 144 && y >= 120 - (x - 104) * 0.8) return C.wood3
        if (x >= 196 && x < 284 && y >= 84 && y < 120) return (x - 202) % 14 < 3 ? C.wood3 : C.sand2
        if (x >= 208 && x < 236 && y >= 72 && y < 84) return C.wood3
        return null
      })
      drawHills(buf, div([640, 630, 645, 632, 640, 650, 636, 644, 630, 640]), 0, C.sand, C.sand2, C.sand2, C.wood3)
      fill(buf, (x, y) => {
        // The mud pit, and the rows of bricks drying in the sun.
        const mx = (x - 40) / 46
        const my = (y - 152) / 9
        if (mx * mx + my * my <= 1) return my < -0.3 ? C.wood2 : C.wood1
        for (let row = 0; row < 4; row++) {
          const ry = 140 + row * 7
          if (y >= ry && y < ry + 4) {
            const rx = x - 164 - (row % 2) * 6
            if (rx >= 0 && rx < 116 && rx % 13 < 9) return (Math.floor(rx / 13) + row) % 3 ? C.wood3 : C.sand2
          }
        }
        return y > 172 && hash(x * 2.3 + y) > 0.97 ? C.wood2 : null
      })
    },
  },
  'hebrew-quarter': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 140) return y === 152 && x % 9 < 6 ? C.wood0 : hash(x * 3.7 + y * 1.3) > 0.985 ? C.slate : C.wood1
        for (const [i, hx] of HOUSES.entries()) {
          const top = 84 + (i % 2) * 5
          if (x >= hx - 22 && x < hx + 22 && y >= top - 3 && y < top) return C.wood0
          if (x < hx - 20 || x >= hx + 20 || y < top) continue
          // The window, dark until its lamp is lit; the door.
          if (x >= hx - 4 && x < hx + 5 && y >= 96 && y < 105) return C.ink
          if (y === 105 && x >= hx - 5 && x < hx + 6) return C.wood0
          if (x >= hx + 8 && x < hx + 17 && y >= 120 && !(y === 120 && (x === hx + 8 || x === hx + 16))) return C.dslate
          return i % 2 ? C.wood1 : C.wood2
        }
        // Houses beyond the street at either end.
        if ((x < 4 && y >= 94) || (x >= 280 && y >= 94)) return C.wood0
        return null
      }),
  },
  'house-inside': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y >= 140) {
          if (y >= 152 && y < 164 && x >= 112 + (y - 152) * -0.3 && x < 200 + (y - 152) * 0.3) return (x - 112) % 16 < 2 ? C.wood2 : C.wood3
          return C.wood1
        }
        // The door open on the night, with a few stars.
        if (x >= 228 && x < 264 && y >= 86) {
          if (x < 231 || x >= 261 || y < 89) return C.wood0
          return (x * 7 + y * 13) % 97 === 0 ? C.white : C.navy
        }
        // The lamp's niche; a water jar on its stand.
        if (x >= 86 && x < 106 && y >= 90 && y < 106 && (y >= 96 || Math.abs(x - 96) < (y - 84) * 0.9)) return C.wood0
        if (x >= 36 && x < 60 && y >= 122 && y < 140) return C.wood2
        // Mud-brick walls.
        const row = Math.floor((y + 30) / 10)
        const brick = Math.floor((x + 50 + (row % 2) * 10) / 19)
        if ((y + 30) % 10 === 0 || (x + 50 + (row % 2) * 10) % 19 === 0) return C.wood1
        return (brick * 7 + row * 3) % 5 ? C.wood2 : C.wood3
      }),
  },
  'nile-reeds': nileReeds(C.blue, C.sky),
  horeb: {
    draw: (buf) => {
      const peak = [
        [-48, 124],
        [12, 92],
        [44, 104],
        [84, 48],
        [112, 66],
        [140, 38],
        [172, 60],
        [196, 52],
        [236, 84],
        [272, 76],
        [320, 104],
        [368, 112],
      ] as const
      const ridge = (x: number) => {
        for (let i = 0; i < peak.length - 1; i++) {
          const [x0, y0] = peak[i]!
          const [x1, y1] = peak[i + 1]!
          if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
        }
        return 124
      }
      fill(buf, (x, y) => {
        if (y < ridge(x)) return null
        // Shadowed faces below each peak, lit edges on the left.
        const shade = [84, 140, 196].some((px) => x > px && x < px + 18 && y < ridge(x) + 40 && y > ridge(x) + 2)
        return shade ? C.wood1 : y < ridge(x) + 2 ? C.orange : C.wood2
      })
      drawHills(buf, div([620, 600, 630, 610, 640, 620, 600, 630, 615, 625]), 0, C.orange, C.wood3, C.wood2, C.wood1)
      fill(buf, (x, y) => {
        if (y < 140) return null
        if (y === 140) return C.wood3
        return hash(x * 5.1 + y * 2.9) > 0.97 ? C.wood1 : C.wood2
      })
    },
  },
}
