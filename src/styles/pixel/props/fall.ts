import type { PixelDrawnArt, PixelPropArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'
import { disc } from './garden'

/**
 * Props of the Fall (Episode 3) in pixel art: the serpent, the one fruit, and the thicket
 * the man and the woman hide in. The serpent is a subtle creature, not a monster.
 */

const TAU = Math.PI * 2

/** The serpent along a branch, its head raised to the right. `sway` tilts the neck; `tongue` flicks. */
function serpentFrame(g: Grid, sway: number, tongue: boolean, branch: boolean) {
  if (branch) g.rect(0, 12, 22, 2, 'B').set(5, 11, 'B').set(6, 10, 'B').set(7, 9, 'L').set(8, 9, 'L')
  // The body, lying in a long curve, with a pattern of gold along its back.
  g.ellipse(7, 11, 7, 2.2, 'T').ellipse(13, 10.5, 4, 2, 'T')
  g.ellipse(7, 12, 6, 1, 'G', (y) => y >= 12)
  for (let x = 2; x < 15; x += 3) g.set(x, 10, 'Y')
  // The neck rising, and the head.
  g.line(15, 10, 17 + sway, 6, 'T', 2)
  g.ellipse(20 + sway, 4.5, 2.6, 1.6, 'T')
  g.set(20 + sway, 4, 'k')
  if (tongue) g.set(23 + sway, 5, 'r').set(24 + sway, 4, 'r').set(24 + sway, 6, 'r')
}

/** The neck sways one way and back; the tongue flicks once on the way. */
const MOVES: [number, boolean][] = [
  [0, false],
  [1, false],
  [1, true],
  [1, false],
  [0, false],
  [-1, false],
]

const serpent: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  colors: { T: C.teal, G: C.green, Y: C.gold, k: C.ink, r: C.rose, B: C.wood1, L: C.green },
  poses: {
    // Along a branch, and (on the ground) without one.
    idle: { frames: MOVES.map(([sway, tongue]) => sprite(26, 14, (g) => serpentFrame(g, sway, tongue, true))), fps: 2 },
    ground: { frames: MOVES.map(([sway, tongue]) => sprite(26, 14, (g) => serpentFrame(g, sway, tongue, false))), fps: 2 },
  },
}

/** The one fruit, glowing. */
const fruit: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 2,
  draw(paint, { time, width }) {
    const pulse = 0.7 + 0.3 * Math.sin(time * TAU * 0.5)
    disc(paint, 0, 0, width * 0.7, C.orange, 0.3 * pulse)
    disc(paint, 0, 0, width * 0.45, C.gold, 0.35 * pulse)
    disc(paint, 0, 0, 2, C.rose)
    paint.rect(-1, -1, 1, 1, C.white)
    paint.rect(0, -3, 1, 1, C.wood1)
    paint.rect(1, -4, 2, 1, C.green)
  },
}

/** A thicket of bushes, thick enough to hide in. */
const thicket: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const w = width / 2
    const s = width / 160
    // Back bushes, then the front ones, then the light catching their tops.
    for (const [x, y, r] of [
      [-40, -36, 30],
      [6, -46, 34],
      [48, -34, 28],
    ] as const)
      disc(paint, Math.round(x * s), Math.round(y * s), r * s, C.teal)
    paint.rect(Math.round(-w * 0.95), Math.round(-22 * s), Math.round(w * 1.9), Math.round(22 * s), C.green)
    for (const [x, y, r] of [
      [-50, -18, 14],
      [-10, -24, 16],
      [32, -22, 15],
      [62, -14, 10],
      [-70, -10, 9],
    ] as const)
      disc(paint, Math.round(x * s), Math.round(y * s), r * s, C.green)
    for (const [x, y] of [
      [-54, -28],
      [-14, -36],
      [28, -33],
      [2, -62],
    ] as const)
      paint.rect(Math.round(x * s), Math.round(y * s), 2, 1, C.lime)
  },
}

export const fallProps: Record<string, PixelPropArt> = { serpent, fruit, thicket }
