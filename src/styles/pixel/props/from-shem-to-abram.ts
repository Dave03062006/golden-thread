import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Props of Level 2, Episode 7 in pixel art: a camel of Terah's caravan, with its hump,
 * striped blanket and pack, facing left, standing or pacing.
 */

/** The camel, with its legs placed by `step` (pacing: both legs on one side move together). */
function camelFrame(g: Grid, step: number) {
  // Legs: far ones first, in shade.
  for (const [x, dir] of [
    [10, -1],
    [26, 1],
  ] as const) {
    g.rect(x + dir * step, 17, 2, 9, 'D')
    g.rect(x + 2 - dir * step, 17, 2, 9, 'B')
  }
  // Body, hump, and the neck curving up to the head on the left.
  g.ellipse(18, 14, 10, 4.5, 'B')
  g.ellipse(21, 9, 5, 4, 'B')
  g.rect(5, 6, 3, 9, 'B').rect(2, 4, 5, 3, 'B')
  g.set(2, 4, 'k')
  // The striped blanket and the pack on the hump.
  g.rect(13, 11, 13, 4, 'R').rect(13, 12, 13, 1, 'Y')
  g.rect(18, 4, 6, 3, 'P')
  g.rim('B', 'L', 'left')
}

const camel: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { B: C.wood3, D: C.wood2, L: C.sand, R: C.rose, Y: C.gold, P: C.pale, k: C.ink },
  poses: {
    idle: { frames: [sprite(32, 26, (g) => camelFrame(g, 0))], fps: 0.5 },
    walk: { frames: [sprite(32, 26, (g) => camelFrame(g, 1)), sprite(32, 26, (g) => camelFrame(g, -1))], fps: 3 },
  },
}

export const fromShemToAbramProps: Record<string, PixelSpriteArt> = { camel }
