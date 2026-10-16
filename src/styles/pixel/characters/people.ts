import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * The man and the woman as pixel sprites: warm silhouettes facing left, with the light
 * catching their outline in gold and no more detail than that (spec §6). They breathe
 * slowly over two frames.
 *
 * Every standing pose is drawn in the same 18-pixel-wide grid with the body in the
 * middle, so an arm can reach out in front without the body shifting between poses.
 */

const COLORS = { S: C.wood1, H: C.wood0, R: C.gold, L: C.green, l: C.teal }

/** What changes between their poses. */
interface Look {
  /** The front arm: hanging, reaching up and out, pointing straight out, or drawn in. */
  arm: 'down' | 'reach' | 'point' | 'in'
  /** Covered with fig leaves (Genesis 3:7). */
  leaves: boolean
  /** How far the whole figure sinks, crouching to hide. */
  crouch: number
  /** The head bowed, in shame. */
  bowed: boolean
}

const LOOKS: Record<string, Look> = {
  idle: { arm: 'down', leaves: false, crouch: 0, bowed: false },
  reach: { arm: 'reach', leaves: false, crouch: 0, bowed: false },
  ashamed: { arm: 'in', leaves: true, crouch: 0, bowed: true },
  hide: { arm: 'in', leaves: true, crouch: 10, bowed: true },
  point: { arm: 'point', leaves: true, crouch: 0, bowed: false },
}

/** Where the body starts across the grid. */
const X = 4
const WIDTH = 18

/** The front arm, from the shoulder at (x, y). */
function arm(g: Grid, look: Look, x: number, y: number, length: number) {
  if (look.arm === 'down') g.rect(x, y, 1, length, 'S')
  else if (look.arm === 'reach') g.line(x, y, x - 4, y - 5, 'S').set(x - 4, y - 6, 'S')
  else if (look.arm === 'point') g.line(x, y + 1, x - 5, y + 1, 'S')
}

/** Fig leaves sewn across the hips. */
function leaves(g: Grid, x: number, y: number, w: number) {
  g.rect(x, y, w, 2, 'L')
  for (let i = 0; i < w; i += 2) g.set(x + i, y + 2, 'L').set(x + i + 1, y, 'l')
}

function figure(draw: (g: Grid, up: number, look: Look) => void, height: number): PixelSpriteArt['poses'] {
  return Object.fromEntries(
    Object.entries(LOOKS).map(([pose, look]) => [pose, { frames: [0, 1].map((lift) => sprite(WIDTH, height, (g) => draw(g, -lift + look.crouch, look))), fps: 0.45 }]),
  )
}

function person(draw: (g: Grid, up: number, look: Look) => void, height: number): PixelSpriteArt {
  return { kind: 'sprite', facing: -1, anchor: 'base', colors: COLORS, poses: figure(draw, height) }
}

const man = person((g, up, look) => {
  const c = look.crouch
  const bow = look.bowed ? 1 : 0
  // Legs and feet, shorter when crouching (the thicket hides the rest).
  g.rect(X + 3, 18 + c, 2, 12 - c, 'S').rect(X + 6, 18 + c, 2, 12 - c, 'S')
  g.rect(X + 2, 30, 3, 1, 'S').rect(X + 5, 30, 3, 1, 'S')
  // Body, the back arm, neck and head.
  g.rect(X + 3, 8 + up, 5, 10 - up + c, 'S').rect(X + 2, 8 + up, 7, 2, 'S')
  g.rect(X + 8, 9 + up, 1, 7, 'S')
  g.rect(X + 5, 6 + up, 2, 2, 'S')
  g.ellipse(X + 5.5 - bow * 0.5, 3.6 + up + bow, 2.6, 2.7, 'S')
  g.set(X + 2 - bow, 4 + up + bow, 'S')
  g.ellipse(X + 6.2, 2.4 + up + bow, 2.2, 1.6, 'H')
  arm(g, look, X + 2, 9 + up, 8)
  // The light, from the left.
  g.rim('S', 'R', 'left')
  if (look.leaves) leaves(g, X + 2, 16 + c, 7)
}, 31)

const woman = person((g, up, look) => {
  const c = look.crouch
  const bow = look.bowed ? 1 : 0
  g.rect(X + 3, 18 + c, 2, 10 - c, 'S').rect(X + 5, 18 + c, 2, 10 - c, 'S')
  g.rect(X + 2, 28, 3, 1, 'S').rect(X + 5, 28, 2, 1, 'S')
  // Long hair down her back, then the body in front of it.
  g.rect(X + 6, 2 + up + bow, 3, 13, 'H')
  g.rect(X + 3, 8 + up, 4, 8 - up + c, 'S').rect(X + 3, 15 + c, 5, 3, 'S').rect(X + 2, 8 + up, 6, 2, 'S')
  g.rect(X + 5, 6 + up, 2, 2, 'S')
  g.ellipse(X + 5.4 - bow * 0.5, 3.6 + up + bow, 2.4, 2.6, 'S')
  g.set(X + 2 - bow, 4 + up + bow, 'S')
  g.ellipse(X + 6, 2.3 + up + bow, 2.2, 1.5, 'H')
  arm(g, look, X + 2, 9 + up, 7)
  g.rim('S', 'R', 'left')
  if (look.leaves) leaves(g, X + 2, 15 + c, 6)
}, 29)

/**
 * The man in the deep sleep the LORD God cast upon him (Genesis 2:21): lying on the
 * ground with his head to the left, his chest rising and falling.
 */
man.poses.sleep = {
  frames: [0, 1].map((lift) =>
    sprite(31, 7, (g) => {
      g.ellipse(3.6, 3.6, 2.7, 2.6, 'S').ellipse(2.6, 3, 1.6, 2.3, 'H')
      g.rect(6, 4, 2, 2, 'S')
      g.rect(8, 3, 10, 4, 'S').rect(10, 3 - lift, 6, 1, 'S')
      g.rect(18, 4, 11, 3, 'S').rect(29, 2, 2, 5, 'S')
      g.rim('S', 'R', 'top')
    }),
  ),
  fps: 0.32,
}

export const people: Record<string, PixelSpriteArt> = { man, woman }
