import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { MARGIN_X, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { bandColor, crest, drawHills, fill } from './creation'

/**
 * Level 1, Episode 2 in pixel art: the garden of Eden, the same world as the paper
 * version a fifth of the size, lit from the same top-left corner.
 */

const LIGHT = { x: 24, y: 18 }

const HILLS = [100, 94, 90.4, 95.6, 100, 94, 89.6, 93.2, 98.8, 94.4, 91.2, 96, 101.2]
const GROUND = [109.6, 108, 107.2, 108.8, 110, 108.4, 107.2, 108, 109.6, 108.4, 107.6, 108.8, 110]

/** A puffy cloud: overlapping discs, with a pale underside. */
function cloud(buf: PixelBuffer, cx: number, cy: number, scale: number) {
  const puffs = [
    [-10, 2, 6],
    [-3, -2, 7],
    [5, 0, 6],
    [11, 3, 4.5],
  ] as const
  for (const [dx, dy, r] of puffs) {
    const R = r * scale
    for (let y = Math.floor(-R); y <= Math.ceil(R); y++) {
      for (let x = Math.floor(-R); x <= Math.ceil(R); x++) {
        if (x * x + y * y > R * R) continue
        const px = Math.round(cx + dx * scale + x)
        const py = Math.round(cy + dy * scale + y)
        if (py > cy + 4 * scale) continue
        buf.set(fx(px), fy(py), py > cy + 2 * scale ? C.pale : C.white)
      }
    }
  }
}

/** Open ground from its crest down: a lit rim, then colors that deepen slowly toward the viewer. */
function drawGround(buf: PixelBuffer, rim: string, bands: readonly string[]) {
  fill(buf, (x, y) => {
    const top = Math.round(crest(GROUND, x))
    if (y < top) return null
    if (y === top) return rim
    return bandColor(bands, (y - top) / 90, x, y)
  })
}

/** Round canopies along the tree line, the same every time. */
function drawTreeLine(buf: PixelBuffer) {
  for (let i = 0, x = -MARGIN_X; x < PX_W + MARGIN_X + 12; i++) {
    const r = 7 + hash(i * 3.3 + 1) * 6
    const cy = 108 - r * 0.7 - hash(i * 1.7) * 3
    const shade = [C.teal, C.green, C.green][Math.floor(hash(i * 5.1) * 3)]!
    for (let y = Math.floor(cy - r); y <= 112; y++) {
      for (let dx = Math.floor(-r); dx <= Math.ceil(r); dx++) {
        const dy = y - cy
        if (dx * dx + dy * dy > r * r && y < cy) continue
        if (y >= cy && Math.abs(dx) > r) continue
        // A lit cap on the side facing the light.
        const lit = (dx + r * 0.3) ** 2 + (dy + r * 0.35) ** 2 < (r * 0.45) ** 2
        buf.set(fx(Math.round(x + dx)), fy(y), lit && dither(x + dx, y) < 0.7 ? C.lime : shade)
      }
    }
    x += 7 + hash(i * 2.1 + 4) * 6
  }
  fill(buf, (_x, y) => (y >= 106 ? C.teal : null))
}

/**
 * The river, which comes out of Eden from under the trees and at once parts into four
 * streams, fanning out across the garden to either side.
 */
function drawRiver(buf: PixelBuffer) {
  const fork = { x: 160, y: 110 }
  for (let x = fork.x - 4; x <= fork.x + 4; x++) buf.set(fx(x), fy(fork.y), C.sky)
  const streams = [
    { end: { x: -MARGIN_X, y: 118 }, width: 5, dip: 0 },
    { end: { x: -MARGIN_X, y: 138 }, width: 8, dip: 8 },
    { end: { x: PX_W + MARGIN_X, y: 138 }, width: 8, dip: 8 },
    { end: { x: PX_W + MARGIN_X, y: 118 }, width: 5, dip: 0 },
  ]
  for (const { end, width, dip } of streams) {
    const mid = { x: (fork.x + end.x) / 2, y: fork.y + dip }
    const steps = Math.ceil(Math.abs(end.x - fork.x) * 1.5)
    for (let s = 0; s <= steps; s++) {
      const t = s / steps
      const u = 1 - t
      const x = u * u * fork.x + 2 * u * t * mid.x + t * t * end.x
      const y = u * u * fork.y + 2 * u * t * mid.y + t * t * end.y
      const half = Math.round(0.6 + t * (width / 2 - 0.6))
      for (let dy = -half; dy <= half; dy++) buf.set(fx(Math.round(x)), fy(Math.round(y + dy)), dy === -half ? C.cyan : C.sky)
    }
  }
}

/** Broad leaves at the corners, close to the camera, and a few white lilies. */
function drawFront(buf: PixelBuffer) {
  const leaves: [number, number, number, number, string][] = [
    [-MARGIN_X, 200, -40, 84, C.teal],
    [-MARGIN_X + 8, 208, -20, 76, C.green],
    [-12, 207, -62, 60, C.green],
    [8, 210, -80, 52, C.teal],
    [24, 212, -50, 46, C.lime],
  ]
  const all = [...leaves, ...leaves.map(([x, y, a, l, c]) => [PX_W - x, y, 180 - a, l, c] as [number, number, number, number, string])]
  for (const [x0, y0, angle, length, color] of all) {
    const a = (angle * Math.PI) / 180
    const [cos, sin] = [Math.cos(a), Math.sin(a)]
    const reach = length + 2
    for (let y = Math.floor(y0 - reach); y <= Math.ceil(y0 + reach); y++) {
      for (let x = Math.floor(x0 - reach); x <= Math.ceil(x0 + reach); x++) {
        const u = (x - x0) * cos + (y - y0) * sin
        const v = -(x - x0) * sin + (y - y0) * cos
        if (u < 0 || u > length) continue
        const half = length * 0.16 * Math.sin((Math.PI * u) / length)
        if (Math.abs(v) > half) continue
        buf.set(fx(x), fy(y), Math.abs(v) < 0.5 ? C.teal : color)
      }
    }
  }
  for (const [x, y] of [
    [30, 181],
    [16, 190],
    [294, 183],
    [308, 192],
  ] as const) {
    buf.set(fx(x - 1), fy(y - 3), C.white)
    buf.set(fx(x + 1), fy(y - 3), C.white)
    buf.set(fx(x), fy(y - 4), C.white)
    buf.set(fx(x), fy(y - 2), C.gold)
    buf.set(fx(x), fy(y - 1), C.green)
  }
}

export const gardenLayers: Record<string, PixelLayerArt> = {
  'eden-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => {
        const glow = Math.min(1, Math.hypot(x - LIGHT.x, y - LIGHT.y) / 220)
        return bandColor([C.white, C.cyan, C.sky, C.blue], 0.75 * (1 - Math.max(0, y) / 124) * (0.45 + 0.55 * glow) + 0.08, x, y)
      })
      cloud(buf, 112, 14, 1)
      cloud(buf, 230, 28, 0.75)
      cloud(buf, 292, 8, 1.2)
    },
  },

  'eden-hills': {
    draw: (buf) => drawHills(buf, HILLS, 0, C.cyan, C.pale, C.teal, C.dslate),
  },

  'eden-trees': { draw: drawTreeLine },

  'eden-ground': {
    draw: (buf) => {
      drawGround(buf, C.sand, [C.sand, C.sand2, C.sand2, C.wood2])
      for (const [x, y] of [
        [60, 152],
        [244, 164],
        [128, 184],
        [200, 140],
      ] as const) {
        buf.set(fx(x), fy(y), C.wood2)
        buf.set(fx(x + 1), fy(y), C.wood2)
      }
    },
  },

  'eden-meadow': {
    draw: (buf) => {
      drawGround(buf, C.lime, [C.green, C.green, C.green, C.teal])
      for (let i = 0; i < 40; i++) {
        const x = Math.floor(hash(i * 5.7 + 9) * PX_W)
        const y = Math.round(crest(GROUND, x) + 4 + hash(i * 2.3 + 1) ** 0.7 * 80)
        buf.set(fx(x), fy(y), [C.white, C.gold, C.orange, C.pale][i % 4]!)
      }
    },
  },

  'eden-river': { draw: drawRiver },

  // The mist that rose from the earth and watered it, as thin drifting streaks: loose
  // dots of white would look like snow.
  'eden-mist': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const banks = [
          [60, 124, 104, 14],
          [200, 132, 124, 16],
          [320, 122, 84, 12],
          [140, 148, 140, 12],
        ] as const
        let level = 0
        for (const [cx, cy, rx, ry] of banks) level = Math.max(level, 1 - Math.hypot((x - cx) / rx, (y - cy) / ry))
        if (y % 3 !== 0 || level <= 0) return null
        // Long dashes, shorter and fewer toward the edge of each bank.
        return level * 1.3 > 0.5 + 0.5 * Math.sin(x * 0.07 + y * 2.3) ? C.white : null
      }),
  },

  'eden-front': { draw: drawFront },
}
