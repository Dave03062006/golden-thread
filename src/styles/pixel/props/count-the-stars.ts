import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 3, Episode 4 in pixel art: a counted star, the covenant pieces under
 * their cloths, the smoking fire pot, and the flaming torch.
 */

const star: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 2,
  anchor: 'center',
  draw(paint, { time }) {
    const big = Math.floor(time * 3) % 3 !== 0
    paint.rect(-1, -1, 3, 3, C.gold)
    paint.rect(0, 0, 1, 1, C.white)
    if (big) {
      paint.rect(0, -3, 1, 2, C.white)
      paint.rect(0, 2, 1, 2, C.white)
      paint.rect(-3, 0, 2, 1, C.white)
      paint.rect(2, 0, 2, 1, C.white)
    }
  },
}

const covenantPieces: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(30, width)
    const u = w / 320
    for (const row of [0, 1]) {
      for (let i = 0; i < 3; i++) {
        const x = Math.round((30 + i * 100) * u - w / 2)
        const y = Math.round((row ? 78 : 40) * u - 90 * u)
        const pw = Math.round(68 * u)
        const ph = Math.max(2, Math.round(16 * u))
        for (let k = 0; k < ph; k++) {
          const inset = Math.round((k / ph) ** 2 * pw * 0.3)
          paint.rect(x + inset, y - ph + k, pw - inset * 2, 1, (i + row) % 2 ? C.sand : C.sand2)
        }
      }
    }
  },
}

const firePot: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 2,
  anchor: 'base',
  draw(paint, { width, time }) {
    const w = Math.max(6, width)
    const rise = Math.floor(time * 4) % 4
    paint.rect(-Math.round(w / 2), -Math.round(w * 0.7), w, Math.round(w * 0.7), C.wood1)
    paint.rect(-Math.round(w / 2) + 1, -Math.round(w * 0.7), w - 2, 1, C.gold)
    for (let i = 0; i < 3; i++) paint.dither(-2 + ((i + rise) % 2), -Math.round(w * 0.7) - 4 - i * 4 - rise, 4, 3, C.pale, 0.5 - i * 0.12)
  },
}

const flamingTorch: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 6,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, time }) {
    const h = Math.max(10, Math.round(width * 3))
    const tick = Math.floor(time * 6) % 2
    paint.rect(0, -h, 1, h, C.wood1)
    paint.rect(-1, -h - 3 - tick, 3, 3, C.orange)
    paint.rect(0, -h - 5 - tick, 1, 2, C.gold)
  },
}

export const countTheStarsProps: Record<string, PixelDrawnArt> = { 'counted-star': star, 'covenant-pieces': covenantPieces, 'fire-pot': firePot, 'flaming-torch': flamingTorch }
