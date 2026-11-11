import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 15 in pixel art: the palm of Deborah; Gideon's fleece, dry or wet with dew;
 * the honeycomb Samson found in the lion; and the millstone he turned in the prison at Gaza.
 */

const palmTree: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 1.6)
    paint.rect(-1, -h + 4, 2, h - 4, C.wood2)
    for (let i = -3; i <= 3; i++) {
      const reach = Math.round((w / 2) * (Math.abs(i) / 3))
      paint.rect(i < 0 ? -reach : 0, -h + 2 + Math.abs(i), Math.max(2, reach), 2, i % 2 ? C.green : C.teal)
    }
    paint.rect(-2, -h + 4, 4, 2, C.wood3)
  },
}

const fleece: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['dry', 'wet'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 3, C.white)
    paint.rect(-half + 1, -4, w - 2, 1, C.pale)
    if (pose === 'wet') for (let x = -half + 1; x < half; x += 2) paint.rect(x, -3 + (x & 1), 1, 1, C.cyan)
  },
}

const honeycomb: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(3, Math.round(width))
    paint.rect(-Math.floor(w / 2), -w, w, w, C.orange)
    paint.rect(-Math.floor(w / 2) + 1, -w + 1, Math.max(1, w - 2), Math.max(1, w - 2), C.gold)
  },
}

const millstone: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(8, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 3, C.slate)
    paint.rect(-half + 1, -5, w - 2, 2, C.pale)
    paint.rect(0, -8, 1, 3, C.wood2)
    paint.rect(1, -9, half, 1, C.wood2)
  },
}

/** Level 16: the sandal handed over at the gate of Bethlehem. */
const sandal: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(4, Math.round(width))
    paint.rect(-Math.floor(w / 2), -1, w, 1, C.wood2)
    paint.rect(-1, -2, 2, 1, C.wood1)
  },
}

/** Level 17: the little vial of oil Samuel poured on Saul's head. */
const oilVial: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint) {
    paint.rect(-1, -4, 2, 4, C.sand)
    paint.rect(-1, -2, 2, 2, C.gold)
    paint.rect(0, -5, 1, 1, C.wood2)
  },
}

/** Level 18: Saul's spear, stuck in the ground by his head. */
const spear: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(8, Math.round(width * 10))
    paint.rect(0, -h + 2, 1, h - 2, C.wood2)
    paint.rect(-1, -h, 3, 2, C.pale)
  },
}

export const judgesProps: Record<string, PixelDrawnArt> = { 'palm-tree': palmTree, fleece, honeycomb, millstone, sandal, 'oil-vial': oilVial, spear }
