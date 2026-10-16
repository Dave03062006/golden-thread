import type { PixelDrawnArt, PixelPropArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'
import { disc } from './garden'

/**
 * Props of the promise and the exile (Episode 4) in pixel art: thorns, the cherub and the
 * flaming sword, and the three signs of God's mercy found in "Lights in the dark".
 */

const TAU = Math.PI * 2

/** A line of single pixels from (x0, y0) to (x1, y1). */
function line(paint: Painter, x0: number, y0: number, x1: number, y1: number, color: string) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
  for (let s = 0; s <= steps; s++) paint.rect(Math.round(x0 + ((x1 - x0) * s) / steps), Math.round(y0 + ((y1 - y0) * s) / steps), 1, 1, color)
}

/** A thorn bush: bare stems with thorns, growing up from its base. */
const thorns: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { grow, width }) {
    const g = Math.min(1, Math.max(0, grow))
    if (g < 0.05) return
    const s = (width / 100) * g
    const stems: [number, number][] = [
      [-34, -40],
      [28, -52],
      [-6, -62],
      [-38, -14],
      [40, -16],
    ]
    for (const [x, y] of stems) {
      line(paint, 0, 0, Math.round(x * s), Math.round(y * s), C.wood0)
      // A thorn halfway along, on alternating sides.
      const mx = Math.round(x * s * 0.6)
      const my = Math.round(y * s * 0.6)
      paint.rect(mx + (x < 0 ? -1 : 1), my - 1, 1, 1, C.wood0)
    }
  },
}

/** A cherub guarding the way: a tall form of light with great wings, shimmering. */
const cherub: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 5,
  draw(paint, { time, width }) {
    const s = width / 160
    const shimmer = 0.8 + 0.2 * Math.sin(time * TAU * 0.6)
    disc(paint, 0, 0, 70 * s, C.gold, 0.25 * shimmer)
    // Body and head.
    paint.rect(Math.round(-12 * s), Math.round(-50 * s), Math.round(24 * s), Math.round(150 * s), C.white)
    disc(paint, 0, Math.round(-66 * s), 12 * s, C.white)
    // Raised wings, lifting a pixel now and then.
    const lift = Math.sin(time * TAU * 0.2) > 0 ? 1 : 0
    for (const side of [-1, 1]) {
      for (let i = 0; i < 6; i++) {
        const x0 = side * Math.round(12 * s)
        const y0 = Math.round((-40 + i * 6) * s)
        line(paint, x0, y0, side * Math.round((70 - i * 6) * s), Math.round((-116 + i * 10) * s) - lift, i % 2 ? C.gold : C.white)
      }
      // Folded lower wings.
      line(paint, side * Math.round(10 * s), Math.round(10 * s), side * Math.round(60 * s), Math.round(90 * s), C.gold)
      line(paint, side * Math.round(10 * s), Math.round(20 * s), side * Math.round(50 * s), Math.round(92 * s), C.white)
    }
  },
}

/** The flaming sword which turned every way: a blade of fire, turning. */
const flamingSword: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 8,
  loop: 9,
  draw(paint, { time, width }) {
    const r = width / 2
    disc(paint, 0, 0, r * 0.9, C.orange, 0.3 * (0.75 + 0.25 * Math.sin(time * TAU * 1.3)))
    const a = (time * 40 * Math.PI) / 180 - Math.PI / 2
    const [dx, dy] = [Math.cos(a), Math.sin(a)]
    // The blade, with flames along it, and the hilt opposite.
    for (let d = 0; d <= r * 0.85; d++) {
      const x = Math.round(dx * d)
      const y = Math.round(dy * d)
      paint.rect(x, y, 1, 1, C.white)
      if (d % 2 === 0) paint.rect(x - Math.round(dy), y + Math.round(dx), 1, 1, d % 4 ? C.orange : C.gold)
    }
    paint.rect(Math.round(-dx * 3), Math.round(-dy * 3), 1, 1, C.wood2)
    paint.rect(Math.round(-dx * 4), Math.round(-dy * 4), 1, 1, C.wood2)
  },
}

/** A sign of God's mercy: the promise (a point of light), the garments, or a sprig of life. */
const sign: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['promise', 'garments', 'eve'],
  fps: 4,
  loop: 5,
  draw(paint, { time, width, pose }) {
    const r = width / 2
    disc(paint, 0, 0, r * 0.9, C.gold, 0.3 * (0.75 + 0.25 * Math.sin(time * TAU * 0.6)))
    if (pose === 'promise') {
      paint.rect(0, -3, 1, 7, C.white)
      paint.rect(-3, 0, 7, 1, C.white)
      paint.rect(-1, -1, 3, 3, C.white)
    } else if (pose === 'garments') {
      paint.rect(-2, -3, 5, 6, C.wood3)
      paint.rect(-4, -3, 2, 2, C.wood3)
      paint.rect(3, -3, 2, 2, C.wood3)
      paint.rect(-2, 1, 5, 1, C.wood2)
    } else {
      paint.rect(0, -3, 1, 6, C.green)
      paint.rect(-2, -3, 2, 1, C.lime)
      paint.rect(1, -4, 2, 1, C.lime)
      paint.rect(0, -5, 1, 1, C.white)
    }
  },
}

export const exileProps: Record<string, PixelPropArt> = { thorns, cherub, 'flaming-sword': flamingSword, sign }
