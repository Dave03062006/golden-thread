import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 14 in pixel art: the flax drying on Rahab's roof; the scarlet cord, tied in
 * her window or let down as a rope to the ground; and a little carved idol, laid down at
 * Shechem.
 */

const flax: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 3, C.sand2)
    paint.rect(-half + 1, -4, w - 2, 1, C.sand)
    for (let x = -half + 1; x < half; x += 3) paint.rect(x, -3, 1, 2, C.wood3)
    paint.rect(-1, -4, 2, 4, C.wood2)
  },
}

/** Tied in the window, a short cord; let down, a rope from the window to the ground (as high as it is wide, ten times over). */
const scarletCord: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'rope'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const h = pose === 'rope' ? Math.round(width * 10.7) : Math.max(4, Math.round(width * 1.7))
    paint.rect(0, -h, 1, h, C.rose)
    if (pose === 'idle') paint.rect(-1, -h, 3, 1, C.rose)
  },
}

const idol: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(3, Math.round(width))
    const h = Math.round(w * 1.8)
    paint.rect(-Math.floor(w / 2), -h + 2, w, h - 2, C.wood2)
    paint.rect(-1, -h, 2, 2, C.wood3)
    paint.rect(-Math.floor(w / 2), -1, w, 1, C.wood1)
  },
}

export const joshuaProps: Record<string, PixelDrawnArt> = { flax, 'scarlet-cord': scarletCord, idol }
