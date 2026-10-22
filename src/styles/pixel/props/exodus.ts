import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 7 · Moses Is Called in pixel art: the basket of bulrushes, woven row by row,
 * sealed and closed; a loose reed; the burning bush; and the water that turns red.
 */

const ROWS = 6

const reedBasket: PixelDrawnArt = {
  kind: 'drawn',
  poses: [...Array.from({ length: ROWS + 1 }, (_, n) => `row-${n}`), 'sealed', 'closed'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(12, Math.round(width))
    const half = Math.round(w / 2)
    const rowH = Math.max(1, Math.round(w * 0.07))
    const woven = pose === 'sealed' || pose === 'closed' ? ROWS : Number(pose.slice(4))
    const sealed = pose === 'sealed' || pose === 'closed'
    // The base.
    paint.rect(-half + 2, -2, w - 4, 2, C.wood2)
    paint.rect(-half + 1, -3, w - 2, 1, C.sand2)
    // The rows, narrowing a little as they rise, over and under.
    for (let i = 0; i < woven; i++) {
      const inset = 1 + Math.floor(i / 2)
      const y = -3 - (i + 1) * rowH
      paint.rect(-half + inset, y, w - inset * 2, rowH, sealed ? C.wood0 : i % 2 ? C.sand : C.sand2)
      for (let x = -half + inset + 1 + (i % 2); x < half - inset; x += 3) paint.rect(x, y, 1, rowH, sealed ? C.wood1 : C.wood3)
    }
    if (pose === 'closed') {
      const top = -3 - ROWS * rowH
      paint.rect(-half + 1, top - 2, w - 2, 2, C.wood1)
      paint.rect(-half + 3, top - 3, w - 6, 1, C.sand)
    }
  },
}

const looseReed: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    paint.rect(-Math.round(w / 2), 0, w, 1, C.sand)
    paint.rect(-Math.round(w / 2) + 2, -1, w - 4, 1, C.sand2)
  },
}

const burningBush: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['far', 'near'],
  anchor: 'base',
  fps: 6,
  loop: 1,
  draw(paint, { width, pose, time }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 1.1)
    const flicker = Math.round(Math.sin(time * Math.PI * 2 * 2) * 1)
    // The flame, wide at the bottom, licking up.
    for (let y = 0; y < h; y++) {
      const t = y / h
      const half = Math.round((w / 2) * Math.sin(Math.PI * Math.min(1, (1 - t) * 1.15)) * (0.6 + 0.4 * (1 - t)))
      const dx = t > 0.5 ? flicker : 0
      if (half > 0) paint.rect(dx - half, -y - 1, half * 2, 1, C.orange)
      if (half > 2 && t < 0.75) paint.rect(dx - Math.round(half * 0.55), -y - 1, Math.round(half * 1.1), 1, C.gold)
    }
    // The branches, and close by the green leaves the fire doesn't burn.
    const near = pose === 'near'
    paint.rect(0, -Math.round(h * 0.5), 1, Math.round(h * 0.5), C.wood0)
    paint.rect(-Math.round(w * 0.25), -Math.round(h * 0.4), Math.round(w * 0.5), 1, C.wood0)
    if (near) {
      for (const [lx, ly] of [
        [-0.28, 0.3],
        [0.22, 0.34],
        [-0.12, 0.5],
        [0.08, 0.6],
        [0.3, 0.2],
        [-0.32, 0.18],
      ] as const) {
        paint.rect(Math.round(lx * w) - 1, -Math.round(ly * h) - 1, 3, 2, C.green)
        paint.rect(Math.round(lx * w) - 1, -Math.round(ly * h) - 1, 1, 1, C.lime)
      }
    }
  },
}

const pouredWater: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['water', 'red'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(8, Math.round(width))
    const red = pose === 'red'
    paint.rect(-Math.round(w / 2) + 1, -2, w - 2, 1, red ? C.rose : C.sky)
    paint.rect(-Math.round(w / 2), -1, w, 1, red ? C.purple : C.blue)
  },
}

export const exodusProps: Record<string, PixelDrawnArt> = { 'reed-basket': reedBasket, 'loose-reed': looseReed, 'burning-bush': burningBush, 'poured-water': pouredWater }
