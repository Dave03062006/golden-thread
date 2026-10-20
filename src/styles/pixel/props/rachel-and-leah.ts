import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 4, Episode 5 in pixel art: the great round stone over the well. */

const wellStone: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.max(3, Math.round(w * 0.3))
    for (let y = 0; y < h; y++) {
      const t = (y + 0.5) / h
      const half = Math.round((w / 2) * Math.sqrt(1 - (2 * t - 1) ** 2 * 0.7))
      paint.rect(-half, -h + y, half * 2, 1, y === 0 ? C.pale : y < h / 2 ? C.sand2 : C.wood2)
    }
  },
}

export const rachelAndLeahProps: Record<string, PixelDrawnArt> = { 'well-stone': wellStone }
