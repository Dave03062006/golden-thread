import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 3, Episode 8 in pixel art: the pillar of salt. */

const saltPillar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(14, Math.round(width * 3))
    for (let y = 0; y < h; y++) {
      const half = y < 4 ? 1 : y < h * 0.3 ? 2 : 3
      paint.rect(-half, -h + y, half * 2 + 1, 1, y % 5 === 4 ? C.pale : C.white)
    }
  },
}

export const sodomProps: Record<string, PixelDrawnArt> = { 'salt-pillar': saltPillar }
