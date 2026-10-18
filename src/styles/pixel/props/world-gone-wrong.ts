import type { PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Props of Level 2, Episode 1 in pixel art: the crowds of the city at dusk, a knot of
 * silhouettes caught by the red light of the fires, walking left, the other way from Noah.
 */

/** One silhouette with its feet at the bottom row, at x, `h` pixels tall. */
function figure(g: Grid, x: number, h: number, cloak: string, lift: number) {
  const top = 24 - h - lift
  g.ellipse(x + 1.5, top + 2, 2, 2, 'D')
  g.rect(x, top + 4, 4, h - 4, cloak).rect(x - 1, top + 8, 6, h - 8 - 1, cloak)
}

function frame(lifts: number[]) {
  return sprite(28, 24, (g) => {
    figure(g, 7, 20, 'K', lifts[0]!)
    figure(g, 19, 21, 'k', lifts[1]!)
    figure(g, 2, 18, 'k', lifts[2]!)
    figure(g, 13, 22, 'K', lifts[0]!)
    figure(g, 23, 18, 'K', lifts[1]!)
    g.rim('K', 'R', 'left').rim('k', 'R', 'left').rim('D', 'R', 'left')
  })
}

const crowd: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { D: C.wood0, K: C.ink, k: C.wood0, R: C.orange },
  poses: {
    idle: { frames: [frame([0, 0, 0]), frame([0, 1, 0])], fps: 0.6 },
    walk: { frames: [frame([1, 0, 1]), frame([0, 1, 0])], fps: 3.2 },
  },
}

export const worldGoneWrongProps: Record<string, PixelSpriteArt> = { crowd }
