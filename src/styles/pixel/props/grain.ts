import { C } from '../palette'
import type { PixelDrawnArt } from '../art'

/** Props of Level 5, Episode 4 in pixel art: a heap of grain, and a sack, empty, half full or full. */

const grainHeap: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 0.4)
    for (let y = 0; y < h; y++) {
      const half = Math.round((w / 2) * Math.sqrt((y + 1) / h))
      paint.rect(-half, -h + y, half * 2, 1, y < 2 ? C.gold : C.sand)
    }
  },
}

const sack: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['empty', 'half', 'full'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(5, Math.round(width))
    const h = pose === 'full' ? Math.round(w * 1.3) : pose === 'half' ? Math.round(w * 0.85) : Math.round(w * 0.5)
    const half = Math.round(w * (pose === 'empty' ? 0.3 : 0.45))
    paint.rect(-half, -h, half * 2, h, C.sand2)
    paint.rect(-half, -h, 1, h, C.sand)
    if (pose === 'half') paint.rect(-half + 1, -h, half * 2 - 2, 1, C.gold)
    if (pose === 'full') paint.rect(-1, -h - 2, 3, 2, C.wood2)
  },
}

export const grainProps: Record<string, PixelDrawnArt> = { 'grain-heap': grainHeap, sack }
