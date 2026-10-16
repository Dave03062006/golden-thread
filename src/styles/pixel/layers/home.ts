import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { MARGIN_X, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { bandColor, crest, drawHills, fill } from './creation'

/**
 * Level 1, Episode 5 in pixel art: the family's hillside home. Cain's ploughed field on
 * the left, Abel's pasture on the right with its stone fold.
 */

const FAR = [94, 89.2, 86, 90.4, 95.2, 91.6, 88, 90.4, 94, 90, 87.2, 90.4, 94.4]
const NEAR = [112, 111.2, 110.4, 111.2, 112, 110.4, 108, 106, 104, 102.4, 101.2, 102.4, 104]

/** The fold, in frame pixels: an oval of stones with a gate on its left. */
const FOLD = { x: 248, y: 140, rx: 38, ry: 13 }

function drawLand(buf: PixelBuffer) {
  fill(buf, (x, y) => {
    const top = Math.round(crest(NEAR, x))
    if (y < top) return null
    // The field turns to pasture a little left of the middle, softly.
    const pasture = (x - 140) / 24 > dither(x, y) * 2 - 1
    if (y === top) return pasture ? C.lime : C.sand
    const depth = (y - top) / 90
    if (!pasture) {
      // Furrows: darker lines across the field, bending with the hill.
      const row = (y - top + Math.round(x * 0.05)) % 7
      if (row === 0) return C.wood1
      return bandColor([C.wood3, C.wood2, C.wood2], depth, x, y)
    }
    return bandColor([C.green, C.green, C.teal], depth, x, y)
  })
  for (let i = 0; i < 26; i++) {
    const x = 150 + Math.floor(hash(i * 4.1 + 2) * (PX_W + MARGIN_X - 150))
    const y = Math.round(crest(NEAR, x) + 4 + hash(i * 1.7) * 78)
    buf.set(fx(x), fy(y), i % 4 ? C.lime : C.white)
  }
}

function drawFold(buf: PixelBuffer) {
  for (let y = FOLD.y - FOLD.ry - 2; y <= FOLD.y + FOLD.ry + 2; y++) {
    for (let x = FOLD.x - FOLD.rx - 3; x <= FOLD.x + FOLD.rx + 3; x++) {
      const d = Math.hypot((x - FOLD.x) / FOLD.rx, (y - FOLD.y) / FOLD.ry)
      if (d < 0.86) buf.set(fx(x), fy(y), dither(x, y) < 0.3 ? C.lime : C.green)
      else if (d < 1.12) {
        // The wall, with the gate open toward the pasture.
        const angle = Math.atan2((y - FOLD.y) / FOLD.ry, (x - FOLD.x) / FOLD.rx)
        if (Math.abs(Math.abs(angle) - Math.PI) < 0.42) continue
        buf.set(fx(x), fy(y - 1), hash(x * 3 + y) < 0.5 ? C.pale : C.slate)
      }
    }
  }
}

export const homeLayers: Record<string, PixelLayerArt> = {
  'home-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => bandColor([C.cyan, C.sky, C.pale, C.sand], Math.max(0, (y + 14) / 136) * 0.9 + 0.05, x, y))
      for (const [cx, cy, r] of [
        [84, 22, 9],
        [252, 12, 11],
      ] as const) {
        for (let y = cy - r; y <= cy + 3; y++) {
          for (let x = cx - r * 2; x <= cx + r * 2; x++) {
            if (((x - cx) / (r * 2)) ** 2 + ((y - cy) / r) ** 2 < 1) buf.set(fx(x), fy(y), y > cy + 1 ? C.pale : C.white)
          }
        }
      }
    },
  },

  'home-hills': {
    draw: (buf) => drawHills(buf, FAR, 0, C.lime, C.green, C.teal, C.dslate),
  },

  'home-land': { draw: drawLand },

  'home-fold': { draw: drawFold },
}
