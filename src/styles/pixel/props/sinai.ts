import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 10 · Sinai in pixel art: the two tablets of stone, blank, written, or
 * broken; the golden calf; the rings of gold; the basin of blood; the book of the covenant;
 * the pavement like sapphire; and the lightning.
 */

const stoneTablets: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['blank', 'written', 'broken'],
  anchor: 'center',
  fps: 0,
  draw(paint, { width, pose }) {
    const w = Math.max(8, Math.round(width))
    const tw = Math.max(3, Math.round(w * 0.44))
    const h = Math.round(w * 0.8)
    const top = -Math.round(h / 2)
    for (const side of [-1, 1] as const) {
      const x0 = side < 0 ? -Math.round(w / 2) : Math.round(w / 2) - tw
      if (pose === 'broken') {
        // Two pieces of each tablet, fallen apart.
        paint.rect(x0, top + Math.round(h * 0.55), tw, Math.round(h * 0.45), C.slate)
        paint.rect(x0 + 1, top + Math.round(h * 0.15), tw - 2, Math.round(h * 0.3), C.pale)
        continue
      }
      paint.rect(x0, top + 1, tw, h - 1, C.slate)
      paint.rect(x0 + 1, top, tw - 2, 1, C.slate)
      paint.rect(x0 + 1, top + 1, tw - 2, h - 2, C.pale)
      if (pose === 'written') for (let y = top + 3; y < top + h - 2; y += 2) paint.rect(x0 + 1, y, tw - 2, 1, C.dslate)
    }
  },
}

const goldenCalf: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -2, w, 2, C.wood2)
    const body = Math.round(w * 0.6)
    paint.rect(-half + 2, -Math.round(w * 0.45), body, Math.round(w * 0.2), C.gold)
    paint.rect(-half + 2, -Math.round(w * 0.25), 2, Math.round(w * 0.23), C.gold)
    paint.rect(-half + body - 1, -Math.round(w * 0.25), 2, Math.round(w * 0.23), C.gold)
    paint.rect(-half + body + 1, -Math.round(w * 0.6), 3, Math.round(w * 0.2), C.gold)
    paint.rect(-half + body + 2, -Math.round(w * 0.68), 1, 2, C.white)
    paint.rect(-half + 3, -Math.round(w * 0.45), body - 2, 1, C.white)
  },
}

const goldRings: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width }) {
    const w = Math.max(5, Math.round(width))
    const half = Math.round(w / 2)
    for (let x = -half; x < half; x += 2) paint.rect(x, -1 - ((x + 9) % 3 === 0 ? 1 : 0), 2, 1, (x + 9) % 4 ? C.gold : C.white)
    paint.rect(-half + 1, -3, w - 2, 1, C.gold)
  },
}

const basin: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 1, C.wood3)
    paint.rect(-half + 1, -3, w - 2, 1, C.purple)
    paint.rect(-half + 1, -2, w - 2, 1, C.wood2)
    paint.rect(-half + 2, -1, w - 4, 1, C.wood2)
  },
}

const scroll: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 0,
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -2, 1, 4, C.wood2)
    paint.rect(half - 1, -2, 1, 4, C.wood2)
    paint.rect(-half + 1, -1, w - 2, 3, C.sand)
    paint.rect(-half + 2, 0, w - 4, 1, C.wood3)
  },
}

const sapphirePavement: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  // Wide and flat: drawn straight onto the screen, rather than kept as a picture the size of its width.
  live: true,
  draw(paint, { width }) {
    const w = Math.max(20, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half + 6, -5, w - 12, 1, C.sky)
    for (let y = -4; y < 0; y++) {
      const inset = Math.round(((y + 4) * -6) / 4) + 6
      paint.rect(-half + inset, y, w - inset * 2, 1, (y % 2 ? C.blue : C.navy))
    }
    for (let x = -half + 10; x < half - 10; x += 12) paint.rect(x, -4, 1, 3, C.sky)
  },
}

const lightning: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 10,
  loop: 3.2,
  draw(paint, { width, time }) {
    const t = time % 3.2
    if (!(t < 0.12 || (t >= 0.2 && t < 0.32))) return
    const h = Math.max(8, Math.round(width * 2.4))
    let x = 1
    for (let y = -Math.round(h / 2); y < Math.round(h / 2); y++) {
      if (y % 4 === 0) x += y < 0 ? -1 : 1
      paint.rect(x, y, 2, 1, C.white)
    }
  },
}

export const sinaiProps: Record<string, PixelDrawnArt> = { 'stone-tablets': stoneTablets, 'golden-calf': goldenCalf, 'gold-rings': goldRings, basin, scroll, 'sapphire-pavement': sapphirePavement, lightning }
