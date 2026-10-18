import type { Painter } from '../frame'
import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * The ark (Level 2) in pixel art: the same parts as the paper version, from the same
 * drawing (a 640 × 300 box, standing on the middle of its base), scaled to the prop's
 * width: the keel, the ribs, the decks, the planked hull, the roof, the door in its
 * side, the pitch, and the plan in light.
 */

const RIBS = [70, 132, 194, 256, 318, 380, 442, 504, 566]
const DECKS = [250, 212, 174]

/** Draws in the paper drawing's units, scaled to `width`, around the base's middle. */
function units(paint: Painter, width: number) {
  const u = width / 640
  const X = (x: number) => Math.round((x - 320) * u)
  const Y = (y: number) => Math.round((y - 300) * u)
  return {
    u,
    /** A solid box from (x0, y0) to (x1, y1), in drawing units. */
    box(x0: number, y0: number, x1: number, y1: number, color: string) {
      paint.rect(X(x0), Y(y0), Math.max(1, X(x1) - X(x0)), Math.max(1, Y(y1) - Y(y0)), color)
    },
    /** A line of boxes along a path, for beams and outlines. */
    line(x0: number, y0: number, x1: number, y1: number, thick: number, color: string, dash = 0) {
      const steps = Math.max(1, Math.round(Math.hypot(X(x1) - X(x0), Y(y1) - Y(y0))))
      const t = Math.max(1, Math.round(thick * u))
      for (let s = 0; s <= steps; s++) {
        if (dash && Math.floor(s / dash) % 2) continue
        paint.rect(Math.round(X(x0) + ((X(x1) - X(x0)) * s) / steps), Math.round(Y(y0) + ((Y(y1) - Y(y0)) * s) / steps), t, t, color)
      }
    },
  }
}

/** The hull's left and right edges at height y: straight raked ends, rounded at the bottom. */
function hullEdges(y: number): [number, number] {
  const k = Math.min(1, (y - 140) / 130)
  const round = y > 270 ? ((y - 270) / 20) ** 2 * 40 : 0
  return [20 + k * 20 + round, 620 - k * 20 - round]
}

const drawn = (draw: (d: ReturnType<typeof units>) => void): PixelDrawnArt => ({
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw: (paint, { width }) => draw(units(paint, width)),
})

const keel = drawn((d) => {
  d.box(40, 272, 600, 290, C.wood1)
  d.line(20, 140, 40, 272, 14, C.wood1)
  d.line(620, 140, 600, 272, 14, C.wood1)
  d.box(44, 274, 596, 277, C.wood3)
})

const ribs = drawn((d) => {
  for (const x of RIBS) {
    d.line(x, 272, x - 5, 205, 10, C.wood2)
    d.line(x - 5, 205, x, 140, 10, C.wood2)
  }
})

const decks = drawn((d) => {
  for (const y of DECKS) {
    d.box(46, y - 4, 596, y + 4, C.wood3)
    d.box(46, y + 4, 596, y + 6, C.wood1)
  }
})

const hull = drawn((d) => {
  const step = Math.max(2, 2 / d.u)
  for (let y = 140; y < 290; y += step) {
    const [l, r] = hullEdges(y)
    const plank = Math.floor((y - 140) / 17) % 2
    d.box(l, y, r, y + step, plank ? C.wood2 : C.wood3)
  }
  for (let i = 0; i < 9; i++) d.box(30 + i * 2, 152 + i * 17, 610 - i * 2, 153 + i * 17, C.wood1)
  d.box(20, 138, 620, 143, C.sand2)
})

const roof = drawn((d) => {
  d.box(100, 100, 540, 140, C.wood3)
  d.box(100, 120, 540, 122, C.wood1)
  d.box(300, 108, 340, 128, C.wood0)
  const step = Math.max(2, 2 / d.u)
  for (let y = 58; y < 102; y += step) {
    const half = ((y - 58) / 44) * 240
    d.box(320 - half, y, 320 + half, y + step, C.wood1)
  }
  d.line(80, 102, 320, 58, 4, C.sand2)
  d.line(320, 58, 560, 102, 4, C.sand2)
})

const door = drawn((d) => {
  d.box(414, 182, 474, 266, C.wood1)
  d.box(420, 188, 468, 262, C.wood0)
  d.box(414, 182, 474, 186, C.sand2)
})

const pitch = drawn((d) => {
  const step = Math.max(2, 2 / d.u)
  // Dark, glossy pitch over the planks, which still show through faintly.
  for (let y = 140; y < 290; y += step) {
    const [l, r] = hullEdges(y)
    d.box(l, y, r, y + step, C.wood0)
  }
  for (let i = 0; i < 8; i++) d.box(34, 156 + i * 17, 606, 157 + i * 17, C.wood1)
  d.box(100, 100, 540, 140, C.wood0)
  d.box(100, 120, 540, 121, C.wood1)
  d.box(300, 108, 340, 128, C.ink)
  for (let y = 58; y < 102; y += step) {
    const half = ((y - 58) / 44) * 240
    d.box(320 - half, y, 320 + half, y + step, C.ink)
  }
  d.line(80, 102, 320, 58, 4, C.slate)
  d.line(320, 58, 560, 102, 4, C.slate)
  d.box(20, 139, 620, 143, C.slate)
  d.box(48, 166, 260, 168, C.dslate)
})

/** The plan in light: dashed outlines of every part, the next one to place brightest. */
const plan: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'keel', 'ribs', 'decks', 'hull', 'roof', 'door'],
  fps: 2,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, pose, time }) {
    const d = units(paint, width)
    const lit = Math.floor(time * 2) % 2 === 0
    const color = (part: string) => (part === pose ? (lit ? C.white : C.gold) : C.gold)
    const show = (part: string) => pose === 'idle' || part === pose || lit
    if (show('keel')) {
      d.line(40, 281, 600, 281, 4, color('keel'), 4)
      d.line(20, 140, 40, 272, 4, color('keel'), 4)
      d.line(620, 140, 600, 272, 4, color('keel'), 4)
    }
    if (show('ribs')) for (const x of RIBS) d.line(x, 272, x, 140, 4, color('ribs'), 4)
    if (show('decks')) for (const y of DECKS) d.line(46, y, 596, y, 4, color('decks'), 4)
    if (show('hull')) {
      d.line(20, 140, 620, 140, 4, color('hull'), 4)
      d.line(20, 140, 40, 270, 4, color('hull'), 4)
      d.line(620, 140, 600, 270, 4, color('hull'), 4)
      d.line(80, 290, 560, 290, 4, color('hull'), 4)
    }
    if (show('roof')) {
      d.line(80, 102, 320, 58, 4, color('roof'), 4)
      d.line(320, 58, 560, 102, 4, color('roof'), 4)
      d.line(100, 102, 100, 140, 4, color('roof'), 4)
      d.line(540, 102, 540, 140, 4, color('roof'), 4)
    }
    if (show('door')) {
      d.line(414, 182, 474, 182, 4, color('door'), 3)
      d.line(414, 182, 414, 266, 4, color('door'), 3)
      d.line(474, 182, 474, 266, 4, color('door'), 3)
    }
  },
}

const ramp: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.round(width / 2)
    const h = Math.round(width * 0.46)
    for (let y = 0; y < h; y++) {
      const x = Math.round(-w + (y / h) * width * 0.9)
      paint.rect(x, -y - 1, Math.max(2, Math.round(width * 0.1)), 1, y % 4 === 0 ? C.wood1 : C.wood3)
    }
  },
}

const basket: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(3, Math.round(width / 2))
    paint.rect(-w + 1, -4, w * 2 - 2, 4, C.wood3)
    paint.rect(-w + 1, -2, w * 2 - 2, 1, C.wood2)
    paint.rect(-w + 2, -6, 2, 2, C.gold)
    paint.rect(-1, -7, 2, 3, C.rose)
    paint.rect(w - 3, -6, 2, 2, C.lime)
  },
}

/**
 * The finished ark (Episodes 3–5): pitched, with its lit window and the door in its side,
 * open or shut. Rocking and leaning, it tilts about its middle (drawn by shifting each row
 * a little sideways and the ends up and down, the pixel way of tilting).
 */
const ark: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['open', 'shut', 'rock', 'lean-left', 'lean-right'],
  fps: 6,
  loop: 4,
  anchor: 'base',
  draw(paint, { width, pose, time }) {
    const swell = Math.sin(time * Math.PI * 2 * 0.25)
    const turn = pose === 'rock' ? 0.035 * swell : pose === 'lean-left' ? -0.15 + 0.02 * swell : pose === 'lean-right' ? 0.15 + 0.02 * swell : 0
    const u = width / 640
    const tilted: Painter = {
      rect: (x, y, w, h, color) => {
        const shift = Math.round(-turn * (y + 80 * u))
        const lift = Math.round(turn * (x + w / 2) * 0.35)
        paint.rect(x + shift, y + lift, w, h, color)
      },
      dither: paint.dither,
      spans: paint.spans,
    }
    const d = units(tilted, width)
    const step = Math.max(2, 2 / d.u)
    for (let y = 140; y < 290; y += step) {
      const [l, r] = hullEdges(y)
      d.box(l, y, r, y + step, C.wood0)
    }
    for (let i = 0; i < 8; i++) d.box(34, 156 + i * 17, 606, 157 + i * 17, C.wood1)
    d.box(100, 100, 540, 140, C.wood0)
    d.box(100, 120, 540, 121, C.wood1)
    d.box(300, 108, 340, 128, C.gold)
    for (let y = 58; y < 102; y += step) {
      const half = ((y - 58) / 44) * 240
      d.box(320 - half, y, 320 + half, y + step, C.ink)
    }
    d.box(20, 139, 620, 143, C.slate)
    d.box(414, 182, 474, 266, pose === 'open' ? C.ink : C.wood1)
    if (pose !== 'open') for (const y of [196, 224, 252]) d.box(418, y, 470, y + 2, C.wood0)
  },
}

export const arkProps: Record<string, PixelDrawnArt> = {
  ark,
  'ark-keel': keel,
  'ark-ribs': ribs,
  'ark-decks': decks,
  'ark-hull': hull,
  'ark-roof': roof,
  'ark-door': door,
  'ark-pitch': pitch,
  'ark-plan': plan,
  'ark-ramp': ramp,
  basket,
}
