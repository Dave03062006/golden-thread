import type { DrawnState, PixelDrawnArt, PixelPropArt, PixelSpriteArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'
import { sprite } from '../shapes'

/**
 * The lights, plants and creatures of the six days in pixel art. Lights and growing
 * things are drawn by code every frame, in row spans and dithered fills, so they can
 * grow smoothly while staying on the pixel grid. Creatures are sprites.
 */

const TAU = Math.PI * 2

// ---------------------------------------------------------------------------------
// Drawing helpers, all around a center point, in whole art pixels.

/** A ring between two radii, as up to two runs per row, filled in one step. */
function ring(paint: Painter, cx: number, cy: number, inner: number, outer: number, color: string, level: number, clip?: DrawnState['clip']) {
  if (outer <= 0 || level <= 0) return
  const top = Math.max(Math.ceil(-outer), clip ? Math.floor(clip.top - cy) : -Infinity)
  const bottom = Math.min(Math.floor(outer), clip ? Math.ceil(clip.bottom - cy) : Infinity)
  const runs: [number, number, number][] = []
  const add = (y: number, from: number, to: number) => {
    const x0 = clip ? Math.max(from, Math.floor(clip.left)) : from
    const x1 = clip ? Math.min(to, Math.ceil(clip.right)) : to
    if (x1 >= x0) runs.push([y, x0, x1])
  }
  for (let y = top; y <= bottom; y++) {
    const o = Math.floor(Math.sqrt(Math.max(0, outer * outer - y * y)))
    const i = Math.abs(y) < inner ? Math.ceil(Math.sqrt(inner * inner - y * y)) : 0
    if (i > 0) {
      add(cy + y, cx - o, cx - i)
      add(cy + y, cx + i, cx + o)
    } else {
      add(cy + y, cx - o, cx + o)
    }
  }
  paint.spans(runs, color, level)
}

/** A filled disc, one run per row, filled in one step. `level` below 1 dithers it. */
function disc(paint: Painter, cx: number, cy: number, r: number, color: string, level = 1, clip?: DrawnState['clip']) {
  ring(paint, cx, cy, 0, r, color, level, clip)
}

/** A glow: rings that thin out toward the edge. */
function glow(paint: Painter, cx: number, cy: number, r: number, color: string, strength: number, clip?: DrawnState['clip']) {
  const steps = 4
  for (let s = 0; s < steps; s++) {
    const inner = (r * s) / steps
    const outer = (r * (s + 1)) / steps
    ring(paint, cx, cy, inner, outer, color, strength * (1 - s / steps), clip)
  }
}

/** A four-pointed sparkle that turns between + and × as it twinkles. */
function sparkle(paint: Painter, cx: number, cy: number, arm: number, color: string, turned: boolean) {
  paint.rect(cx, cy, 1, 1, color)
  for (let i = 1; i <= arm; i++) {
    if (turned) {
      paint.rect(cx - i, cy - i, 1, 1, color)
      paint.rect(cx + i, cy - i, 1, 1, color)
      paint.rect(cx - i, cy + i, 1, 1, color)
      paint.rect(cx + i, cy + i, 1, 1, color)
    } else {
      paint.rect(cx - i, cy, 1, 1, color)
      paint.rect(cx + i, cy, 1, 1, color)
      paint.rect(cx, cy - i, 1, 1, color)
      paint.rect(cx, cy + i, 1, 1, color)
    }
  }
}

// ---------------------------------------------------------------------------------
// The lights.

/** God's Spirit over the waters: a breath of light with two wings of light, beating slowly. */
const spirit: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 10,
  loop: 12.5,
  draw(paint, { time, width }) {
    const half = Math.round(width * 0.42)
    const breath = 0.82 + 0.18 * Math.sin(time * TAU * 0.24)
    // The breath of light: a flat, soft glow.
    for (let y = -4; y <= 4; y++) {
      const span = Math.round(half * 0.8 * Math.sqrt(1 - (y / 4.6) ** 2))
      paint.dither(-span, y, span * 2 + 1, 1, C.pale, 0.35 * breath)
      const core = Math.round(span * 0.55)
      paint.dither(-core, y, core * 2 + 1, 1, C.white, 0.55 * breath * (1 - Math.abs(y) / 5))
    }
    // Two wings sweeping up and out, their tips rising and falling.
    const lift = Math.sin(time * TAU * 0.32)
    for (const side of [-1, 1]) {
      for (let i = 2; i <= half; i++) {
        const t = i / half
        const y = Math.round(-(t ** 1.6) * (9 + 5 * lift) + t * 2)
        const fade = 1 - t
        paint.dither(side * i, y, 1, 1, C.white, 0.35 + 0.6 * fade)
        if (i % 2 === 0) paint.dither(side * i, y + 1, 1, 1, C.pale, 0.5 * fade)
      }
    }
  },
}

/** Day one's flood of light, which grows from a point until it fills everything. */
const lightFlood: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  live: true,
  draw(paint, { grow, width, clip }) {
    const r = (grow * width) / 2
    if (r < 0.5) return
    ring(paint, 0, 0, r * 0.82, r, C.gold, 0.3, clip)
    ring(paint, 0, 0, r * 0.66, r * 0.82, C.gold, 0.7, clip)
    ring(paint, 0, 0, r * 0.66, r * 0.82, C.white, 0.25, clip)
    ring(paint, 0, 0, r * 0.52, r * 0.66, C.white, 0.7, clip)
    ring(paint, 0, 0, r * 0.52, r * 0.66, C.gold, 1, clip)
    ring(paint, 0, 0, r * 0.52, r * 0.66, C.white, 0.7, clip)
    disc(paint, 0, 0, r * 0.52, C.white, 1, clip)
  },
}

/** The first light: a bright point with a soft halo and a twinkling sparkle. */
const firstLight: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 2,
  draw(paint, { time, width }) {
    const r = width / 2
    const pulse = 0.88 + 0.12 * Math.sin(time * TAU * 0.5 + 1)
    glow(paint, 0, 0, r * 0.75, C.gold, 0.55 * pulse)
    glow(paint, 0, 0, r * 0.4, C.white, 0.8 * pulse)
    sparkle(paint, 0, 0, Math.max(2, Math.round(r * 0.45)), C.white, Math.floor(time * 2) % 2 === 1)
    disc(paint, 0, 0, 1.2, C.white)
  },
}

/** A soft warm light, around the man and the woman. */
const halo: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 5,
  draw(paint, { time, width }) {
    const breath = 0.85 + 0.15 * Math.sin(time * TAU * 0.2)
    glow(paint, 0, 0, width / 2, C.gold, 0.5 * breath)
    glow(paint, 0, 0, width / 4, C.white, 0.45 * breath)
  },
}

/** The sun: a glowing disc ringed with rays that slowly turn. */
const sun: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 4 / 3,
  draw(paint, { time, width }) {
    const r = width / 2
    glow(paint, 0, 0, r, C.gold, 0.45)
    const turn = Math.floor(time * 1.5) % 2
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + (turn ? TAU / 16 : 0)
      const d = r * 0.66
      paint.rect(Math.round(Math.cos(a) * d), Math.round(Math.sin(a) * d), 1, 1, C.white)
    }
    disc(paint, 0, 0, r * 0.38, C.gold)
    disc(paint, -1, -1, r * 0.27, C.white)
  },
}

/** The moon: a silver crescent with a soft glow. */
const moon: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  draw(paint, { width }) {
    const r = width / 2
    glow(paint, 0, 0, r, C.pale, 0.3)
    const body = r * 0.5
    const cut = { x: body * 0.45, y: -body * 0.25, r: body * 0.9 }
    for (let y = Math.ceil(-body); y <= Math.floor(body); y++) {
      for (let x = Math.ceil(-body); x <= Math.floor(body); x++) {
        if (x * x + y * y > body * body) continue
        if ((x - cut.x) ** 2 + (y - cut.y) ** 2 < cut.r * cut.r) continue
        paint.rect(x, y, 1, 1, x < -body * 0.4 ? C.pale : C.white)
      }
    }
  },
}

// ---------------------------------------------------------------------------------
// Plants, which grow from their base.

/** Grows in with a gentle overshoot-free ease, so a plant rises quickly and settles. */
const eased = (g: number) => 1 - (1 - Math.min(1, Math.max(0, g))) ** 2

/** A fruit tree: a trunk and a round crown hung with fruit. */
const fruitTree: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 5,
  anchor: 'base',
  draw(paint, { time, grow, width }) {
    const g = eased(grow)
    if (g < 0.03) return
    const trunk = Math.max(1, Math.round(width * 0.38 * g))
    paint.rect(-1, -trunk, 3, trunk, C.wood2)
    paint.rect(-1, -trunk, 1, trunk, C.wood3)
    const cr = (width / 2.9) * g
    const sway = Math.round(Math.sin(time * TAU * 0.2) * 0.7)
    const cy = -trunk - Math.round(cr * 0.6)
    disc(paint, sway, cy, cr, C.teal)
    disc(paint, sway - Math.round(cr * 0.15), cy - 1, cr * 0.85, C.green)
    disc(paint, sway - Math.round(cr * 0.38), cy - Math.round(cr * 0.38), cr * 0.38, C.lime)
    if (g > 0.75) {
      const fruit: [number, number][] = [
        [-0.5, 0.1],
        [0.35, -0.3],
        [0.55, 0.35],
        [-0.1, 0.5],
        [0.05, -0.05],
        [-0.65, -0.25],
      ]
      for (const [fx, fy] of fruit) paint.rect(sway + Math.round(fx * cr), cy + Math.round(fy * cr), 1, 1, C.rose)
      paint.rect(sway + Math.round(0.35 * cr), cy + Math.round(-0.3 * cr) - 1, 1, 1, C.orange)
    }
  },
}

/** Grain: stalks with golden heads, nodding in the breeze. */
const seedPlant: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 6,
  loop: 4,
  anchor: 'base',
  draw(paint, { time, grow, width }) {
    const g = eased(grow)
    if (g < 0.05) return
    const height = Math.max(2, Math.round(width * 0.8 * g))
    const nod = Math.sin(time * TAU * 0.25)
    for (const [dx, lean] of [
      [-3, -1.5],
      [-1, -0.5],
      [1, 0.5],
      [3, 1.5],
      [0, 0],
    ] as const) {
      const h = height - Math.abs(dx)
      for (let y = 0; y < h; y++) {
        const t = y / h
        const x = Math.round(dx * 0.6 + lean * t * 2 + nod * t * 0.8)
        paint.rect(x, -y - 1, 1, 1, C.green)
      }
      if (g > 0.6) {
        const tip = Math.round(dx * 0.6 + lean * 2 + nod * 0.8)
        paint.rect(tip, -h - 2, 1, 3, C.gold)
      }
    }
  },
}

// ---------------------------------------------------------------------------------
// Creatures: sprites.

/** A golden fish, facing left, tail flicking. */
const fish: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  colors: { g: C.gold, o: C.orange, k: C.ink },
  poses: {
    idle: {
      fps: 5,
      frames: [
        ['..ggg..oo', '.ggggg.o.', 'gkggggoo.', '.ooooo.o.', '..ooo..oo'],
        ['..ggg....', '.ggggg.oo', 'gkggggooo', '.ooooo.oo', '..ooo....'],
      ],
    },
  },
}

/** A bird of the air, facing right: wings up, level, down, level. */
const bird: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  colors: { s: C.slate, d: C.dslate, o: C.gold },
  poses: {
    idle: {
      fps: 10,
      frames: [
        ['..ss.....', '...ss....', '....s....', 'd.dddddo.', '.dddddd..', '.........'],
        ['.........', '.........', '..sss....', 'd.dddddo.', '.dddddd..', '.........'],
        ['.........', '.........', '.........', 'd.dddddo.', '.dddsdd..', '...ss....'],
        ['.........', '.........', '..sss....', 'd.dddddo.', '.dddddd..', '.........'],
      ],
    },
  },
}

/** The great sea creature: a whale surfacing, facing left, its tail rising and falling, sometimes spouting. */
function whaleFrame(tailUp: boolean, spout: boolean) {
  return sprite(40, 12, (g) => {
    if (spout) g.set(5, 0, 'W').set(3, 0, 'W').set(7, 0, 'W').set(4, 1, 'W').set(6, 1, 'W').set(5, 2, 'W').set(5, 3, 'W')
    g.ellipse(18, 9.5, 16, 5, 'N')
    g.ellipse(17, 10.5, 13, 3.4, 'P', (y) => y >= 10)
    g.line(6, 6, 20, 5, 'B')
    g.set(7, 8, 'k')
    g.line(32, 8, 36, 6, 'N', 2)
    if (tailUp)
      g.poly(
        [
          [35.5, 6],
          [38.5, 1],
          [39.5, 4],
          [40, 7],
          [37, 7.5],
        ],
        'N',
      )
    else
      g.poly(
        [
          [35.5, 7],
          [38.5, 4],
          [39.5, 6.5],
          [40, 9.5],
          [37, 8.5],
        ],
        'N',
      )
  })
}
const whale: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  colors: { N: C.navy, B: C.blue, P: C.pale, k: C.ink, W: C.white },
  poses: {
    idle: {
      fps: 1.6,
      frames: [whaleFrame(true, false), whaleFrame(false, false), whaleFrame(true, false), whaleFrame(false, false), whaleFrame(true, true), whaleFrame(false, true)],
    },
  },
}

export const creationProps: Record<string, PixelPropArt> = {
  spirit,
  'light-flood': lightFlood,
  'first-light': firstLight,
  halo,
  sun,
  moon,
  'fruit-tree': fruitTree,
  'seed-plant': seedPlant,
  fish,
  whale,
  bird,
}
