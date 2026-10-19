import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 3, Episode 3 in pixel art: campfires, bands of torches in the dark, a cart
 * of goods, and Melchizedek's bread and wine.
 */

const campfire: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 6,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, time }) {
    const w = Math.max(6, width)
    const tick = Math.floor(time * 6) % 3
    paint.dither(-w, -w * 1.2, w * 2, w * 1.2, C.orange, 0.25)
    paint.rect(-Math.round(w / 2), -2, w, 2, C.wood1)
    for (let i = 0; i < 4; i++) {
      const h = Math.round(w * (0.4 + ((i + tick) % 3) * 0.2))
      paint.rect(-Math.round(w / 2) + 1 + i * Math.round(w / 4), -2 - h, Math.max(1, Math.round(w / 5)), h, i % 2 ? C.gold : C.orange)
    }
  },
}

const torches: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 6,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, time }) {
    const w = Math.max(10, width)
    const tick = Math.floor(time * 6) % 2
    for (let i = 0; i < 5; i++) {
      const x = Math.round(-w / 2 + (i + 0.5) * (w / 5))
      const lift = i % 2
      paint.rect(x - 1, -6 + lift, 3, 6 - lift, C.ink)
      paint.rect(x, -9 + lift, 1, 3, C.ink)
      paint.rect(x + 2, -12 + lift, 1, 6, C.wood1)
      paint.rect(x + 1, -14 + lift - ((i + tick) % 2), 3, 2, (i + tick) % 2 ? C.gold : C.orange)
    }
  },
}

const cart: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(12, width)
    const half = Math.round(w / 2)
    paint.rect(-half, -Math.round(w * 0.3), w, Math.round(w * 0.08), C.wood1)
    paint.rect(-half + 2, -Math.round(w * 0.55), w - 4, Math.round(w * 0.25), C.sand2)
    paint.rect(-half + 4, -Math.round(w * 0.55), 3, 2, C.gold)
    paint.rect(half - 8, -Math.round(w * 0.5), 3, 3, C.gold)
    for (const cx of [-half + Math.round(w * 0.25), half - Math.round(w * 0.25)]) {
      const r = Math.max(2, Math.round(w * 0.11))
      paint.rect(cx - r, -2 * r, 2 * r, 2 * r, C.wood0)
      paint.rect(cx - r + 1, -2 * r + 1, 2 * r - 2, 2 * r - 2, C.wood2)
      paint.rect(cx, -2 * r, 1, 2 * r, C.wood0)
    }
  },
}

const breadAndWine: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, width)
    const half = Math.round(w / 2)
    // The basket with its round loaf.
    paint.rect(-half, -4, Math.round(w * 0.55), 4, C.wood2)
    paint.rect(-half + 1, -7, Math.round(w * 0.55) - 2, 3, C.sand2)
    paint.rect(-half + 2, -7, Math.round(w * 0.3), 1, C.sand)
    // The jar of wine.
    const jx = Math.round(w * 0.2)
    paint.rect(jx, -8, 4, 8, C.purple)
    paint.rect(jx + 1, -10, 2, 2, C.purple)
    paint.rect(jx, -11, 4, 1, C.gold)
  },
}

export const melchizedekProps: Record<string, PixelDrawnArt> = { campfire, torches, cart, 'bread-and-wine': breadAndWine }
