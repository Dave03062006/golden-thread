import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 3, Episode 9 in pixel art: the swaddled baby, the hand drum, and an oil lamp. */

const swaddledBaby: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(6, width)
    paint.rect(-Math.round(w / 2), -2, w - 2, 4, C.white)
    paint.rect(Math.round(w / 2) - 3, -2, 3, 3, C.wood2)
  },
}

const handDrum: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(5, width)
    paint.rect(-Math.round(w / 2), -Math.round(w * 0.8), w, Math.round(w * 0.8), C.wood3)
    paint.rect(-Math.round(w / 2), -Math.round(w * 0.8), w, 1, C.sand)
  },
}

const oilLamp: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, time }) {
    const h = Math.max(10, Math.round(width * 3))
    const tick = Math.floor(time * 4) % 2
    paint.rect(0, -h, 1, h, C.wood1)
    paint.rect(-1, -h, 3, 1, C.wood3)
    paint.dither(-3, -h - 6, 7, 6, C.gold, 0.3)
    paint.rect(0, -h - 2 - tick, 1, 2 + tick, C.gold)
  },
}

export const isaacBornProps: Record<string, PixelDrawnArt> = { 'swaddled-baby': swaddledBaby, 'hand-drum': handDrum, 'oil-lamp': oilLamp }
