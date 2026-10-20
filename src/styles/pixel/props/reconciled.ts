import type { PixelDrawnArt } from '../art'
import { C, dither } from '../palette'

/**
 * Props of Level 4, Episode 7 in pixel art: the dust of Esau's company on the far hills,
 * and Jacob's twelve sons in a row.
 */

const dustCloud: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 3,
  loop: 10,
  draw(paint, { width, time }) {
    const w = Math.max(16, Math.round(width))
    const h = Math.round(w * 0.45)
    const drift = Math.round(Math.sin(time * Math.PI * 0.2) * 2)
    for (let y = 0; y < h; y++) {
      const t = y / h
      const half = Math.round((w / 2) * Math.sqrt(Math.max(0, 1 - (1 - t) ** 2)) * (0.6 + 0.4 * t))
      for (let x = -half; x < half; x += 1) if (dither(x + drift + 64, y + 64) < 0.25 + 0.3 * t) paint.rect(x + drift, -h + y, 1, 1, t > 0.6 ? C.sand2 : C.sand)
    }
  },
}

const ROBES = [C.navy, C.green, C.rose, C.orange, C.purple, C.teal, C.wood3, C.slate, C.sand2, C.blue, C.rose, C.wood2]
const twelveSons: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(48, Math.round(width))
    const gap = w / 12
    for (const [i, robe] of ROBES.entries()) {
      const x = Math.round(-w / 2 + gap * (i + 0.5))
      const h = Math.round(w * (i === 11 ? 0.12 : i === 10 ? 0.16 : 0.18 + ((i * 7) % 12) / 400))
      paint.rect(x - 1, -h + 3, 3, h - 3, robe)
      paint.rect(x - 1, -h + 3, 1, h - 3, C.gold)
      paint.rect(x - 1, -h, 3, 3, C.wood1)
    }
  },
}

export const reconciledProps: Record<string, PixelDrawnArt> = { 'dust-cloud': dustCloud, 'twelve-sons': twelveSons }
