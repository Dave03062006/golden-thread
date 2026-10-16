import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * The man and the woman of day six as pixel sprites: warm silhouettes standing in the
 * light, facing left toward it, with the light catching their outline in gold and no
 * more detail than that (spec §6). They breathe slowly over two frames.
 */

const COLORS = { S: C.wood1, H: C.wood0, R: C.gold }

/** Everything above the hips rises a pixel on the in-breath. */
function standing(draw: (g: Grid, lift: number) => void, width: number, height: number): PixelSpriteArt {
  return {
    kind: 'sprite',
    facing: -1,
    anchor: 'base',
    colors: COLORS,
    poses: { idle: { frames: [0, 1].map((lift) => sprite(width, height, (g) => draw(g, lift))), fps: 0.45 } },
  }
}

const man = standing(
  (g, lift) => {
    const up = -lift
    // Legs and feet.
    g.rect(3, 18, 2, 12, 'S').rect(6, 18, 2, 12, 'S')
    g.rect(2, 30, 3, 1, 'S').rect(5, 30, 3, 1, 'S')
    // Body, arms, neck and head.
    g.rect(3, 8 + up, 5, 10 - up, 'S').rect(2, 8 + up, 7, 2, 'S')
    g.rect(2, 9 + up, 1, 8, 'S').rect(8, 9 + up, 1, 7, 'S')
    g.rect(5, 6 + up, 2, 2, 'S')
    g.ellipse(5.5, 3.6 + up, 2.6, 2.7, 'S')
    g.set(2, 4 + up, 'S')
    g.ellipse(6.2, 2.4 + up, 2.2, 1.6, 'H')
    // The light, from the left.
    g.rim('S', 'R', 'left')
  },
  10,
  31,
)

const woman = standing(
  (g, lift) => {
    const up = -lift
    g.rect(3, 18, 2, 10, 'S').rect(5, 18, 2, 10, 'S')
    g.rect(2, 28, 3, 1, 'S').rect(5, 28, 2, 1, 'S')
    // Long hair down her back, then the body in front of it.
    g.rect(6, 2 + up, 3, 13, 'H')
    g.rect(3, 8 + up, 4, 8 - up, 'S').rect(3, 15, 5, 3, 'S').rect(2, 8 + up, 6, 2, 'S')
    g.rect(2, 9 + up, 1, 7, 'S')
    g.rect(5, 6 + up, 2, 2, 'S')
    g.ellipse(5.4, 3.6 + up, 2.4, 2.6, 'S')
    g.set(2, 4 + up, 'S')
    g.ellipse(6, 2.3 + up, 2.2, 1.5, 'H')
    g.rim('S', 'R', 'left')
  },
  10,
  29,
)

export const people: Record<string, PixelSpriteArt> = { man, woman }
