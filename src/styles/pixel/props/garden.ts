import type { PixelDrawnArt, PixelPropArt, PixelSpriteArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'
import { sprite } from '../shapes'
import { animal } from './animals'

/**
 * Props of the garden of Eden (Episode 2) in pixel art: God shown as light, the breath
 * of life, the two trees in the middle of the garden, and three more animals to name.
 */

const TAU = Math.PI * 2

/** A filled disc, one run per row. */
function disc(paint: Painter, cx: number, cy: number, r: number, color: string, level = 1) {
  const runs: [number, number, number][] = []
  for (let y = Math.ceil(-r); y <= Math.floor(r); y++) {
    const o = Math.floor(Math.sqrt(Math.max(0, r * r - y * y)))
    runs.push([cy + y, cx - o, cx + o])
  }
  paint.spans(runs, color, level)
}

/**
 * A column of soft light, coming down to the ground, its brightness slowly breathing.
 * It starts a little lower than the paper one, inside the room a drawn light is given.
 */
const glory: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 4,
  draw(paint, { time, width }) {
    // In the paper drawing's units, which are 280 wide.
    const s = width / 280
    const breath = 0.85 + 0.15 * Math.sin(time * TAU * 0.25)
    const top = Math.round(-200 * s)
    const bottom = Math.round(90 * s)
    // In bands, as pixel art draws light: a bright core, a softer middle, a faint edge.
    for (let y = top; y <= bottom; y++) {
      const t = (y - top) / (bottom - top)
      const fade = t < 0.3 ? t / 0.3 : t > 0.9 ? (1 - t) / 0.1 : 1
      const half = Math.round((34 + 36 * t) * s)
      const mid = Math.round(half * 0.6)
      const core = Math.round(half * 0.25)
      paint.dither(-half, y, half * 2 + 1, 1, C.pale, 0.25 * fade * breath)
      paint.dither(-mid, y, mid * 2 + 1, 1, C.white, 0.5 * fade * breath)
      if (fade > 0.6) paint.dither(-core, y, core * 2 + 1, 1, C.white, 0.8)
    }
    disc(paint, 0, Math.round(60 * s), 30 * s, C.gold, 0.35 * breath)
    disc(paint, 0, Math.round(60 * s), 18 * s, C.white, 0.6 * breath)
  },
}

/** The breath of life: three arcs of light, turning slowly like wind. */
const breath: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 8,
  loop: 15,
  draw(paint, { time, width }) {
    const r = width / 2
    const turn = (time * 24 * Math.PI) / 180
    const arcs = [
      [0.75, 0, 4.2, C.white],
      [0.5, 2.1, 2.6, C.gold],
      [0.95, 3.9, 1.8, C.pale],
    ] as const
    for (const [radius, start, sweep, color] of arcs) {
      const steps = Math.ceil(radius * r * sweep)
      for (let i = 0; i <= steps; i++) {
        const a = start + turn + (sweep * i) / steps
        const d = radius * r * (1 - 0.25 * (i / steps))
        paint.rect(Math.round(Math.cos(a) * d), Math.round(Math.sin(a) * d * 0.8), 1, 1, color)
      }
    }
  },
}

/** Grows in quickly and settles. */
const eased = (g: number) => 1 - (1 - Math.min(1, Math.max(0, g))) ** 2

interface TreeLook {
  trunk: [string, string]
  crown: [string, string, string]
  fruit: string
  shine: string
  aura?: string
}

/** One of the two trees in the middle of the garden: a trunk, a round crown, fruit. */
function gardenTree(look: TreeLook, fruit: [number, number][]): PixelDrawnArt {
  return {
    kind: 'drawn',
    poses: ['idle'],
    fps: 4,
    loop: 5,
    anchor: 'base',
    draw(paint, { time, grow, width }) {
      const g = eased(grow)
      if (g < 0.03) return
      const trunk = Math.max(1, Math.round(width * 0.5 * g))
      const cr = (width / 2.8) * g
      const sway = Math.round(Math.sin(time * TAU * 0.2) * 0.7)
      const cy = -trunk - Math.round(cr * 0.5)
      if (look.aura) disc(paint, sway, cy, cr * 1.6, look.aura, 0.3 * (0.8 + 0.2 * Math.sin(time * TAU * 0.4)))
      paint.rect(-1, -trunk, 4, trunk, look.trunk[0])
      paint.rect(-1, -trunk, 1, trunk, look.trunk[1])
      disc(paint, sway, cy, cr, look.crown[0])
      disc(paint, sway - Math.round(cr * 0.12), cy - 1, cr * 0.84, look.crown[1])
      disc(paint, sway - Math.round(cr * 0.36), cy - Math.round(cr * 0.38), cr * 0.36, look.crown[2])
      if (g > 0.75) {
        for (const [x, y] of fruit) {
          paint.rect(sway + Math.round(x * cr), cy + Math.round(y * cr), 2, 2, look.fruit)
          paint.rect(sway + Math.round(x * cr), cy + Math.round(y * cr), 1, 1, look.shine)
        }
      }
    },
  }
}

const treeKnowledge = gardenTree(
  { trunk: [C.wood1, C.wood2], crown: [C.dslate, C.teal, C.green], fruit: C.rose, shine: C.orange },
  [
    [-0.5, 0.15],
    [0.3, -0.25],
    [0.5, 0.35],
    [-0.05, 0.45],
    [-0.55, -0.35],
  ],
)

const treeOfLife = gardenTree(
  { trunk: [C.wood2, C.wood3], crown: [C.green, C.lime, C.white], fruit: C.gold, shine: C.white, aura: C.gold },
  [
    [-0.5, 0.1],
    [0.35, -0.35],
    [0.55, 0.35],
    [-0.1, 0.5],
    [-0.65, 0.45],
    [0.3, 0.1],
    [-0.15, -0.2],
  ],
)

/** An eagle in flight, beating its broad wings. It faces right. */
const eagle: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  colors: { B: C.wood1, b: C.wood2, W: C.white, Y: C.gold, k: C.ink },
  poses: {
    idle: {
      frames: [-5, -1, 3, -1].map((tip) =>
        sprite(22, 14, (g) => {
          g.line(10, 7, 17, 7 + Math.round(tip / 2), 'B')
          g.poly(
            [
              [1, 7],
              [4, 6],
              [16, 6],
              [19, 7],
              [16, 9],
              [4, 9],
            ],
            'b',
          )
          g.poly(
            [
              [0, 6],
              [3, 7],
              [0, 9],
            ],
            'B',
          )
          g.ellipse(18.5, 6.5, 2.2, 1.8, 'W').set(21, 7, 'Y').set(19, 6, 'k')
          g.poly(
            [
              [8, 7],
              [13, 7],
              [6, 7 + tip],
              [3, 7 + tip],
            ],
            'b',
          )
          g.line(3, 7 + tip, 6, 7 + tip, 'B')
        }),
      ),
      fps: 6,
    },
  },
}

const horse: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { H: C.wood2, h: C.wood1, M: C.wood0, k: C.ink },
  poses: animal(
    (g, s, idle) => {
      g.line(9, 20, 9 + s, 33, 'h', 2).rect(Math.round(9 + s), 33, 2, 1, 'M')
      g.line(26, 20, 26 - s, 33, 'h', 2).rect(Math.round(26 - s), 33, 2, 1, 'M')
      g.line(5, 14, 2, 22 - idle, 'M', 2)
      g.ellipse(17, 15.5, 12, 5.5, 'H').ellipse(17, 15.5, 12, 5.5, 'h', (y) => y >= 19)
      g.poly(
        [
          [26, 13],
          [31, 4],
          [35, 6],
          [30, 16],
        ],
        'H',
      )
      g.ellipse(35, 5, 3.5, 2.2, 'H').set(37, 4, 'k').set(32, 1, 'H')
      g.line(27, 12, 31, 3, 'M').line(28, 13, 32, 4, 'M')
      g.line(11, 20, 11 - s, 33, 'H', 2).rect(Math.round(11 - s), 33, 2, 1, 'M')
      g.line(24, 20, 24 + s, 33, 'H', 2).rect(Math.round(24 + s), 33, 2, 1, 'M')
    },
    39,
    34,
    6,
    0.5,
  ),
}

const hare: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { A: C.sand2, a: C.wood3, W: C.white, P: C.rose, k: C.ink },
  poses: animal(
    (g, s, idle) => {
      g.line(4, 9, 4 + s, 11, 'a').line(10, 9, 10 - s, 11, 'a')
      g.ellipse(7, 8, 5, 3, 'A').set(2, 7, 'W')
      g.ellipse(12, 6, 2.6, 2.2, 'A').set(13, 5, 'k').set(14, 7, 'P')
      if (idle) g.line(11, 3, 11, 0, 'A').line(12, 3, 13, 0, 'a')
      else g.line(11, 3, 9, 0, 'A').line(12, 3, 11, 0, 'a')
      g.line(6, 9, 6 - s, 11, 'A').line(12, 8, 12 + s, 11, 'A')
    },
    15,
    12,
    9,
    0.6,
  ),
}

export const gardenProps: Record<string, PixelPropArt> = {
  glory,
  breath,
  'tree-knowledge': treeKnowledge,
  'tree-of-life': treeOfLife,
  eagle,
  horse,
  hare,
}
