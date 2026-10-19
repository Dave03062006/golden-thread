import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 3 in pixel art: an angel, a figure of light; and a thorny desert bush. */

const angel: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 2,
  anchor: 'base',
  draw(paint, { width, time }) {
    const h = Math.max(16, Math.round(width * 2))
    const glow = Math.floor(time * 3) % 2
    paint.dither(-Math.round(h * 0.45), -h - 4, Math.round(h * 0.9), h + 4, C.gold, 0.25 + glow * 0.1)
    // Wings of light, the robe, the head.
    paint.dither(-Math.round(h * 0.3), -Math.round(h * 0.72), Math.round(h * 0.18), Math.round(h * 0.45), C.white, 0.6)
    paint.dither(Math.round(h * 0.12), -Math.round(h * 0.72), Math.round(h * 0.18), Math.round(h * 0.45), C.white, 0.6)
    for (let y = 0; y < Math.round(h * 0.7); y++) {
      const half = Math.round(2 + (y / (h * 0.7)) * h * 0.18)
      paint.rect(-half, -Math.round(h * 0.72) + y, half * 2, 1, y % 5 === 4 ? C.gold : C.white)
    }
    paint.rect(-2, -h, 5, 5, C.white)
  },
}

const desertBush: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(8, width)
    const h = Math.round(w * 0.5)
    for (let y = 0; y < h; y++) {
      const half = Math.round((w / 2) * Math.sqrt(Math.max(0, 1 - ((h - y) / h - 0.4) ** 2 / 0.4)))
      if (half > 0) paint.rect(-half, -h + y, half * 2, 1, y % 3 === 0 ? C.slate : C.green)
    }
    paint.rect(-1, -2, 1, 2, C.wood1)
    paint.rect(2, -2, 1, 2, C.wood1)
  },
}

export const hagarProps: Record<string, PixelDrawnArt> = { angel, 'desert-bush': desertBush }
