import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Props of Level 3, Episode 10 in pixel art: the donkey, the bundle of wood, the ram in the
 * thicket, and the cave of Machpelah.
 */

function donkeyFrame(g: Grid, step: number) {
  g.rect(3 - step, 9, 2, 5, 'D').rect(11 + step, 9, 2, 5, 'D')
  g.rect(2, 4, 13, 6, 'B').rect(6, 4, 5, 3, 'R')
  g.rect(14, 1, 3, 5, 'B').set(15, 0, 'D').set(16, 0, 'D')
  g.set(16, 2, 'k')
  g.set(1, 5, 'B')
}

const donkey: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { B: C.pale, D: C.slate, R: C.rose, k: C.ink },
  poses: {
    idle: { frames: [sprite(18, 14, (g) => donkeyFrame(g, 0))], fps: 0.5 },
    walk: { frames: [sprite(18, 14, (g) => donkeyFrame(g, 1)), sprite(18, 14, (g) => donkeyFrame(g, -1))], fps: 4 },
  },
}

const woodBundle: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(8, width)
    for (let i = 0; i < 3; i++) paint.rect(-Math.round(w / 2) + i, -2 + i, w - i, 1, i % 2 ? C.wood1 : C.wood2)
    paint.rect(-Math.round(w / 4), -2, 1, 3, C.sand)
    paint.rect(Math.round(w / 4), -2, 1, 3, C.sand)
  },
}

const ramInThicket: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(16, width)
    const u = w / 160
    const r = (x0: number, y0: number, x1: number, y1: number, c: string) => paint.rect(Math.round(x0 * u - w / 2), Math.round(y0 * u - 100 * u), Math.max(1, Math.round((x1 - x0) * u)), Math.max(1, Math.round((y1 - y0) * u)), c)
    r(0, 50, 160, 100, C.teal)
    r(10, 40, 70, 56, C.green)
    r(96, 46, 150, 60, C.green)
    r(40, 54, 110, 84, C.white)
    r(102, 44, 126, 68, C.white)
    r(100, 28, 108, 46, C.sand2)
    r(120, 28, 128, 46, C.sand2)
    r(116, 50, 120, 54, C.ink)
  },
}

const caveTomb: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(20, width)
    const h = Math.round(w * 0.55)
    for (let y = 0; y < h; y++) {
      const half = Math.round((w / 2) * Math.min(1, 0.4 + (y / h) * 0.9))
      paint.rect(-half, -h + y, half * 2, 1, y === 0 ? C.sand : C.slate)
    }
    paint.rect(-Math.round(w * 0.1), -Math.round(h * 0.35), Math.round(w * 0.2), Math.round(h * 0.35), C.ink)
    paint.rect(Math.round(w * 0.25), -Math.round(h * 0.5), Math.round(w * 0.15), Math.round(h * 0.2), C.green)
  },
}

export const moriahProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { donkey, 'wood-bundle': woodBundle, 'ram-in-thicket': ramInThicket, 'cave-tomb': caveTomb }
