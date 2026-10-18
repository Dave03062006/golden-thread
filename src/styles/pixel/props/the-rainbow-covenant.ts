import type { PixelDrawnArt } from '../art'
import { C, hash } from '../palette'

/**
 * Props of Level 2, Episode 5 in pixel art: Noah's altar of stones and the smoke rising
 * straight up from it; the first field and the family's tent; and the cloak Shem and
 * Japheth carry to cover their father.
 */

/** The altar: rough stones with wood on top; lit, a fire flickers on it. */
const altar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'lit'],
  fps: 6,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, pose, time }) {
    const u = width / 24
    const s = (v: number) => Math.round(v * u)
    const stones: [number, number, number][] = [
      [-11, -5, 7],
      [-4, -5, 8],
      [4, -5, 7],
      [-9, -10, 6],
      [-3, -10, 7],
      [4, -10, 6],
    ]
    stones.forEach(([x, y, w], i) => {
      paint.rect(s(x), s(y), s(w), s(5), i % 2 ? C.slate : C.pale)
      paint.rect(s(x), s(y), s(w), 1, C.white)
    })
    paint.rect(s(-9), s(-11), s(17), Math.max(1, s(1)), C.wood2)
    if (pose === 'lit') {
      const tick = Math.floor(time * 6) % 3
      for (let i = 0; i < 7; i++) {
        const h = s(3 + ((i * 5 + tick * 3) % 5))
        paint.rect(s(-7 + i * 2), s(-11) - h, s(2), h, i % 2 ? C.orange : C.gold)
      }
    }
  },
}

/** Smoke rising straight up, widening a little as it goes. */
const smokeColumn: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 2,
  anchor: 'base',
  draw(paint, { width, time }) {
    const h = Math.round(width * 4.3)
    const sway = Math.round(Math.sin(time * Math.PI) * 1)
    for (let y = 0; y < h; y++) {
      const half = Math.round(width * (0.12 + (y / h) * 0.3))
      const level = 0.7 - (y / h) * 0.55
      paint.dither(-half + sway, -y - 1, half * 2, 1, C.pale, level)
    }
  },
}

/** A newly sown field: furrows with green shoots coming up. */
const field: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.round(width * 0.25)
    for (let y = 0; y < h; y++) {
      const inset = Math.round((1 - y / h) * width * 0.1)
      const half = Math.round(width / 2) - inset
      paint.rect(-half, y - h, half * 2, 1, y % 3 === 0 ? C.wood1 : C.wood2)
      if (y % 3 === 1) for (let x = -half + 2; x < half - 2; x += 4) if (hash(x + y * 31) > 0.3) paint.rect(x, y - h - 1, 1, 1, C.lime)
    }
  },
}

/** A tent of dark goat hair, striped, its door open or closed. */
const tent: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['open', 'closed'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = width
    const h = Math.round(w * 0.6)
    for (let y = 0; y < h; y++) {
      const t = y / h
      const half = Math.round((w / 2) * (0.35 + 0.65 * Math.min(1, t * 1.6)))
      const stripe = Math.floor(t * 6) % 2 === 1
      paint.rect(-half, y - h, half * 2, 1, y === 0 ? C.wood2 : stripe ? C.wood0 : C.wood1)
    }
    const dw = Math.max(2, Math.round(w * 0.18))
    const dh = Math.round(h * 0.55)
    paint.rect(-Math.round(dw / 2), -dh, dw, dh, pose === 'closed' ? C.wood2 : C.ink)
    if (pose === 'closed') paint.rect(0, -dh, 1, dh, C.wood0)
  },
}

/** The cloak, held up by its corners, hanging in a fold. */
const cloak: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = width
    const h = Math.round(w * 0.55)
    for (let y = 0; y < h; y++) {
      const sag = Math.round(((y / h) ** 2) * w * 0.12)
      paint.rect(-Math.round(w / 2) + sag, y - h, w - sag * 2, 1, y === 0 ? C.white : y % 4 === 3 ? C.sand2 : C.sand)
    }
  },
}

export const theRainbowCovenantProps: Record<string, PixelDrawnArt> = { 'noah-altar': altar, 'smoke-column': smokeColumn, field, 'striped-tent': tent, cloak }
