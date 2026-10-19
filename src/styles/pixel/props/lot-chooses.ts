import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/** Props of Level 3 in pixel art: a stone well, and a goat of Lot's flock. */

/** A round well of stones, its water glinting. */
const stoneWell: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, width)
    const h = Math.round(w * 0.55)
    const half = Math.round(w / 2)
    paint.rect(-half, -h, w, h, C.pale)
    for (let y = -h + 3; y < 0; y += 3) paint.rect(-half, y, w, 1, C.slate)
    paint.rect(-half + 2, -h - 2, w - 4, 3, C.slate)
    paint.rect(-half + 4, -h - 1, w - 8, 1, C.blue)
    paint.rect(-half + 6, -h - 1, 3, 1, C.cyan)
  },
}

/** The goat: dark, with curved horns and a beard; it faces right. */
function goatFrame(g: Grid, step: number) {
  g.rect(3 - step, 9, 2, 4, 'K').rect(10 + step, 9, 2, 4, 'K')
  g.rect(2, 4, 12, 6, 'B')
  g.rect(13, 1, 3, 5, 'B')
  g.set(15, 6, 'K').set(15, 7, 'K')
  g.set(13, 0, 'H').set(12, 0, 'H').set(11, 1, 'H')
  g.set(15, 2, 'W')
  g.set(1, 4, 'B')
}

const goat: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { B: C.wood1, K: C.wood0, H: C.sand2, W: C.gold },
  poses: {
    idle: { frames: [sprite(17, 13, (g) => goatFrame(g, 0))], fps: 0.5 },
    walk: { frames: [sprite(17, 13, (g) => goatFrame(g, 1)), sprite(17, 13, (g) => goatFrame(g, -1))], fps: 4 },
  },
}

export const lotChoosesProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { 'stone-well': stoneWell, goat }
