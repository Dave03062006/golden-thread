import { C } from '../palette'
import type { PixelDrawnArt, Painter } from '../art'

/**
 * Props of Level 5, Episode 2 in pixel art: what each prisoner needs, in a little bubble;
 * the butler's vine and the baker's baskets, seen in their dreams; and Pharaoh's cup.
 */

const ICONS: Record<string, (p: Painter) => void> = {
  bread: (p) => {
    p.rect(-4, -1, 8, 3, C.wood3)
    p.rect(-3, -1, 6, 1, C.sand)
  },
  water: (p) => {
    p.rect(-2, -3, 4, 6, C.wood3)
    p.rect(-1, -4, 2, 1, C.sky)
  },
  blanket: (p) => {
    p.rect(-4, -3, 8, 6, C.rose)
    p.rect(-4, -1, 8, 1, C.gold)
  },
  lamp: (p) => {
    p.rect(-3, 1, 6, 2, C.wood3)
    p.rect(-1, -3, 2, 4, C.gold)
  },
  listen: (p) => {
    p.rect(-4, -3, 8, 5, C.blue)
    for (const x of [-2, 0, 2]) p.rect(x, -1, 1, 1, C.white)
  },
}

const need: PixelDrawnArt = {
  kind: 'drawn',
  poses: Object.keys(ICONS),
  anchor: 'center',
  fps: 2,
  loop: 2,
  draw(paint, { pose, time }) {
    const bob = Math.round(Math.sin(time * Math.PI) * 1)
    const shifted: Painter = { rect: (x, y, w, h, c) => paint.rect(x, y + bob, w, h, c), dither: (x, y, w, h, c, l) => paint.dither(x, y + bob, w, h, c, l), spans: paint.spans }
    shifted.rect(-6, -5, 12, 10, C.white)
    shifted.rect(-5, -6, 10, 1, C.white)
    shifted.rect(-5, 5, 10, 1, C.white)
    shifted.rect(-1, 6, 2, 2, C.white)
    ICONS[pose]?.(shifted)
  },
}

const vine: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const s = Math.max(1, Math.round(width / 32))
    paint.rect(0, 0, s, 14 * s, C.wood2)
    for (const [bx, by] of [
      [-10, -4],
      [10, -2],
      [0, -10],
    ] as const) {
      paint.rect(Math.min(0, bx) * s, by * s, Math.abs(bx) * s || s, s, C.wood2)
      paint.rect((bx - 3) * s, (by - 3) * s, 6 * s, 2 * s, C.green)
      paint.rect((bx - 2) * s, (by + 1) * s, 4 * s, 4 * s, C.purple)
    }
  },
}

const breadBaskets: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 3,
  loop: 2,
  draw(paint, { width, time }) {
    const s = Math.max(1, Math.round(width / 24))
    for (let i = 0; i < 3; i++) {
      paint.rect(-8 * s, (8 - i * 7) * s, 16 * s, 5 * s, C.sand2)
      paint.rect(-6 * s, (7 - i * 7) * s, 12 * s, s, C.sand)
    }
    const fly = Math.round(Math.sin(time * Math.PI) * 2)
    paint.rect(4 * s, (-18 + fly) * s, 4 * s, s, C.ink)
    paint.rect(5 * s, (-19 + fly) * s, 2 * s, s, C.ink)
  },
}

const goldenCup: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(4, Math.round(width))
    paint.rect(-Math.round(w / 2), -w - 1, w, Math.round(w / 2), C.gold)
    paint.rect(0, -Math.round(w / 2) - 1, 1, Math.round(w / 2), C.gold)
    paint.rect(-Math.round(w / 3), -1, Math.round((w * 2) / 3) || 1, 1, C.gold)
  },
}

export const faithfulProps: Record<string, PixelDrawnArt> = { need, vine, 'bread-baskets': breadBaskets, 'golden-cup': goldenCup }
