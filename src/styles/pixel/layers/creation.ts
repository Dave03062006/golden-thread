import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { LAYER_H, LAYER_W, MARGIN_X, MARGIN_Y, PX_H, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { drawWater, glints } from './demo'

/**
 * Level 1, Episode 1 in pixel art: the same world as the paper version, a fifth of the
 * size. Light comes from the top-left corner, where the first light rests.
 */

/** Where the first light rests, in frame pixels. */
const LIGHT = { x: 24, y: 18 }

/** Colors a pixel from a list of bands by a value from 0 to 1, dithering between neighbors. */
function bandColor(bands: readonly string[], value: number, x: number, y: number): string {
  const t = Math.min(0.9999, Math.max(0, value)) * (bands.length - 1)
  const i = Math.floor(t)
  const f = Math.max(0, Math.min(1, (t - i - 0.3) / 0.4))
  return f > dither(x, y) ? bands[i + 1]! : bands[i]!
}

/** Fills the whole layer, pixel by pixel, from a function of frame coordinates. */
function fill(buf: PixelBuffer, colorAt: (x: number, y: number, lx: number, ly: number) => string | null) {
  for (let ly = 0; ly < LAYER_H; ly++) {
    for (let lx = 0; lx < LAYER_W; lx++) {
      const color = colorAt(lx - MARGIN_X, ly - MARGIN_Y, lx, ly)
      if (color) buf.set(lx, ly, color)
    }
  }
}

/** How far a frame point is from the first light, as a fraction of the frame width. */
const fromLight = (x: number, y: number) => Math.min(1, Math.hypot(x - LIGHT.x, y - LIGHT.y) / 230)

/** The land's crest heights, from the left margin to the right, as in the paper version. */
const LAND = [104.4, 94.8, 90.4, 95.6, 101.2, 94.8, 90.4, 94, 99.6, 94, 89.6, 93.6, 103.2]

/** The crest height at frame x, smoothly between the listed points. */
function crest(heights: readonly number[], x: number): number {
  const span = (PX_W + MARGIN_X * 4) / (heights.length - 1)
  const t = (x + MARGIN_X * 2) / span
  const i = Math.max(0, Math.min(heights.length - 2, Math.floor(t)))
  const f = t - i
  const s = (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, f)))) / 2
  return heights[i]! + (heights[i + 1]! - heights[i]!) * s
}

/** Hills: a lit rim along the crest where the slope faces the light, a body, and a darker lower band. */
function drawHills(buf: PixelBuffer, heights: readonly number[], lift: number, rimLit: string, rimShade: string, body: string, deep: string) {
  for (let x = -MARGIN_X; x < PX_W + MARGIN_X; x++) {
    const top = Math.round(crest(heights, x) + lift)
    const facingLight = crest(heights, x + 1) >= crest(heights, x - 1)
    for (let y = Math.max(top, -MARGIN_Y); y < PX_H + MARGIN_Y; y++) {
      const depth = y - top
      let color = body
      if (depth === 0) color = facingLight ? rimLit : rimShade
      else if (depth === 1 && facingLight && dither(x, y) < 0.5) color = rimLit
      else if (depth > 7 && (depth - 7) / 10 > dither(x, y)) color = deep
      buf.set(fx(x), fy(y), color)
    }
  }
}

/** The underside of the waters above: a dome, from the cubic curve the paper version uses. */
const DOME = (() => {
  const p = [
    [-48, 58],
    [40, 8],
    [280, 8],
    [368, 58],
  ] as const
  const edge = new Map<number, number>()
  for (let i = 0; i <= 600; i++) {
    const t = i / 600
    const u = 1 - t
    const x = u ** 3 * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t ** 3 * p[3][0]
    const y = u ** 3 * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t ** 3 * p[3][1]
    edge.set(Math.round(x), y)
  }
  return (x: number) => edge.get(x) ?? 58
})()

function drawFirmament(buf: PixelBuffer) {
  fill(buf, (x, y) => {
    const edge = Math.round(DOME(x))
    const above = edge - y
    if (above < 0) return null
    if (above === 0) return C.white
    if (above <= 2) return C.cyan
    // Faint wave lines following the dome.
    if ((above === 11 || above === 23 || above === 35) && hash(x * 0.37 + above) > 0.25) return C.cyan
    // The top fades out, so the waters blend into the sky while they're still low.
    if (y < -4 && dither(x, y) < (-4 - y) / 10) return null
    return bandColor([C.sky, C.blue, C.navy], Math.min(1, above / 46), x, y)
  })
}

function drawStars(buf: PixelBuffer, seed: number, count: number, sparkles: [number, number][]) {
  for (let i = 0; i < count; i++) {
    const x = 156 + Math.floor(hash(i * 7.3 + seed) * 188)
    const y = -12 + Math.floor(hash(i * 3.1 + seed * 2) * 112)
    buf.set(fx(x), fy(y), hash(i + seed * 5) > 0.7 ? C.pale : C.white)
  }
  for (const [x, y] of sparkles) {
    buf.set(fx(x), fy(y), C.white)
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ])
      buf.set(fx(x + dx!), fy(y + dy!), C.gold)
  }
}

/** Light rays fanning from the first light. */
const RAYS = [
  [0.18, 0.05],
  [0.32, 0.035],
  [0.47, 0.06],
  [0.63, 0.03],
  [0.8, 0.05],
  [0.98, 0.04],
] as const

export const creationLayers: Record<string, PixelLayerArt> = {
  void: {
    draw: (buf) => fill(buf, (x, y) => (0.16 * (1 - (y + MARGIN_Y) / LAYER_H) > dither(x, y) ? C.dslate : C.ink)),
  },

  'sky-light': {
    draw: (buf) =>
      fill(buf, (x, y) => bandColor([C.white, C.gold, C.orange, C.rose, C.purple, C.navy, C.ink], 0.55 * (x / PX_W) + 0.45 * fromLight(x, y), x, y)),
  },

  'sky-blue': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const toHorizon = Math.max(0, 1 - Math.abs(y - 104) / 26) * Math.max(0, 1 - x / 200)
        const value = 0.62 * (x / PX_W) + 0.38 * fromLight(x, y) - 0.14 * toHorizon
        return bandColor([C.white, C.cyan, C.sky, C.blue, C.purple, C.navy, C.ink], value, x, y)
      }),
  },

  'stars-a': {
    draw: (buf) => drawStars(buf, 31, 70, []),
  },

  'stars-b': {
    draw: (buf) =>
      drawStars(buf, 47, 40, [
        [192, 24],
        [242, 12],
        [296, 34],
        [338, 16],
        [220, 66],
        [312, 80],
      ]),
  },

  firmament: { draw: drawFirmament },

  'sea-far': {
    draw: (buf) => drawWater(buf, 108, 1.2, 17, C.blue, C.cyan, C.navy),
    animate: (paint, time) => glints(paint, time, 4, 108, 8, 3, C.cyan),
  },

  land: {
    draw: (buf) => drawHills(buf, LAND, 0, C.wood3, C.wood2, C.wood2, C.wood1),
  },

  grass: {
    draw: (buf) => {
      drawHills(buf, LAND, 1, C.lime, C.green, C.green, C.teal)
      // A scattering of flowers.
      for (let i = 0; i < 26; i++) {
        const x = Math.floor(hash(i * 5.7 + 3) * PX_W)
        const y = Math.round(crest(LAND, x) + 3 + hash(i * 2.9) * 12)
        buf.set(fx(x), fy(y), i % 3 ? C.gold : C.white)
      }
    },
  },

  'sea-mid': {
    draw: (buf) => drawWater(buf, 120, 2, 30, C.navy, C.sky, C.ink),
    animate: (paint, time) => glints(paint, time, 5, 120, 12, 6, C.sky),
  },

  'sea-near': {
    draw: (buf) => drawWater(buf, 144, 3, 46, C.ink, C.blue, C.ink),
    animate: (paint, time) => glints(paint, time, 6, 144, 10, 10, C.blue),
  },

  'light-rays': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // In pixel art the rays stay in the sky: dots of light over the land would look like snow.
        if (y > 88) return null
        const angle = Math.atan2(y - LIGHT.y, x - LIGHT.x)
        const inBeam = RAYS.some(([a, w]) => Math.abs(angle - a) < w)
        if (!inBeam) return null
        const strength = 0.3 * (1 - Math.min(1, Math.hypot(x - LIGHT.x, y - LIGHT.y) / 420))
        return strength > dither(x, y) ? (strength > 0.2 ? C.white : C.pale) : null
      }),
  },

  'night-veil': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const across = Math.max(0, Math.min(1, (x - 128) / 170))
        const down = Math.max(0, Math.min(1, (y - 76) / 18))
        return across * down * 0.26 > dither(x, y) ? C.navy : null
      }),
  },

  darkness: {
    draw: (buf) => fill(buf, () => C.ink),
  },
}
