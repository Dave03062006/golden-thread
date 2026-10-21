import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 5, Episode 5 in pixel art: Joseph's silver cup. */

const silverCup: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(4, Math.round(width))
    paint.rect(-Math.round(w / 2), -w - 1, w, Math.round(w / 2), C.pale)
    paint.rect(-Math.round(w / 2) + 1, -w - 1, 1, 1, C.white)
    paint.rect(0, -Math.round(w / 2) - 1, 1, Math.round(w / 2), C.pale)
    paint.rect(-Math.round(w / 3), -1, Math.round((w * 2) / 3) || 1, 1, C.pale)
  },
}

export const silverCupProps: Record<string, PixelDrawnArt> = { 'silver-cup': silverCup }
