import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C, hash } from '../palette'

/**
 * Props of Level 2, Episode 4 in pixel art: the raven, flying to and fro over the waters,
 * and the tops of the trees just showing above them, one of them a silvery olive.
 */

const RAVEN_UP = [
  '......kk......',
  '.....kkk......',
  '....kkkd......',
  'kk..kkkkkkk...',
  'kkkkkkkkkkkkkg',
  '.kkkkkkkkkk...',
  '...dddddd.....',
]
const RAVEN_DOWN = [
  '..............',
  '..............',
  '..............',
  'kk..kkkkkkk...',
  'kkkkkkkkkkkkkg',
  '.kkkkkkkkkk...',
  '....kkkkd.....',
]

/** The raven faces right, with two frames of flapping. */
const raven: PixelSpriteArt = {
  kind: 'sprite',
  poses: { idle: { frames: [RAVEN_UP, RAVEN_DOWN], fps: 5 } },
  colors: { k: C.ink, d: C.dslate, g: C.slate },
  facing: 1,
}

/** A tree's crown just above the water, with a ripple around it: green, or the olive's silvery green. */
const treetop: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'olive'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = width
    const h = Math.round(w * 0.5)
    const [body, light] = pose === 'olive' ? [C.green, C.pale] : [C.teal, C.green]
    for (let y = 0; y < h; y++) {
      // A lumpy dome: wider at the bottom, with bumps along its edge.
      const t = y / h
      const half = Math.round((w / 2) * Math.sqrt(1 - (1 - t) ** 2) * (0.9 + 0.1 * Math.sin(y * 1.7)))
      paint.rect(-half, y - h, half * 2, 1, body)
      for (let x = -half; x < half; x++) if (hash(x * 13.1 + y * 7.7) > 0.8 && y < h * 0.7) paint.rect(x, y - h, 1, 1, light)
    }
    paint.rect(-Math.round(w * 0.55), -1, Math.round(w * 1.1), 1, C.pale)
    paint.rect(-Math.round(w * 0.4), 0, Math.round(w * 0.8), 1, C.blue)
  },
}

export const theDoveReturnsProps: Record<string, PixelSpriteArt | PixelDrawnArt> = { raven, treetop }
