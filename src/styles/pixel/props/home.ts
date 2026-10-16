import type { PixelDrawnArt, PixelPropArt } from '../art'
import { C } from '../palette'
import { disc } from './garden'

/**
 * Props of Cain and Abel (Episode 5) in pixel art: the tent, the altars and their smoke,
 * sin crouching at the door, the shepherd's staff, and the glow of the ground.
 */

const TAU = Math.PI * 2

/** The family's tent of skins, its doorway open. */
const tent: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.round(width / 2)
    const h = Math.round(width * 0.6)
    for (let y = 0; y < h; y++) {
      const half = Math.round(((y + 1) / h) * w)
      paint.rect(-half, -h + y, half, 1, C.wood3)
      paint.rect(0, -h + y, half, 1, C.wood2)
    }
    // The doorway.
    const door = Math.round(h * 0.55)
    for (let y = 0; y < door; y++) {
      const half = Math.max(1, Math.round(((y + 2) / door) * w * 0.28))
      paint.rect(-half, -door + y, half * 2, 1, C.wood0)
    }
    paint.rect(0, -h - 2, 1, 2, C.wood1)
  },
}

/** An altar of piled stones. */
const altar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.round(width / 2)
    paint.rect(-w, -5, w * 2, 5, C.slate)
    paint.rect(-w + 2, -9, w * 2 - 4, 4, C.pale)
    paint.rect(-w + 2, -9, w * 2 - 4, 1, C.white)
    for (let x = -w + 1; x < w; x += 4) paint.rect(x, -3, 1, 1, C.dslate)
  },
}

/** Smoke from an offering: 'rising' straight up into the light, or 'low', hanging and wavering. */
const smoke: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['rising', 'low'],
  fps: 6,
  loop: 5,
  anchor: 'base',
  draw(paint, { time, width, pose }) {
    const s = width / 120
    if (pose === 'rising') {
      // A column rising from the altar.
      const base = 0
      const top = -Math.round(width * 1.85)
      for (let y = base; y > top; y--) {
        const t = (base - y) / (base - top)
        const sway = Math.round(Math.sin(t * 5 - time * TAU * 0.4) * 2 * t)
        const half = Math.round(1 + 3 * t)
        paint.dither(sway - half, y, half * 2 + 1, 1, C.white, 0.85 * (1 - t))
      }
    } else {
      const base = 0
      for (let x = 0; x < Math.round(60 * s); x++) {
        const t = x / (60 * s)
        const y = base - Math.round(t * 24 * s + Math.sin(t * 6 + time * TAU * 0.5) * 2)
        paint.dither(x - 2, y, 1, 3, C.pale, 0.7 * (1 - t))
      }
    }
  },
}

/** Sin couching at the door: a dark crouched shape, breathing. */
const sin: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 2,
  loop: 2,
  anchor: 'base',
  draw(paint, { time, width }) {
    const s = width / 80
    const lift = Math.sin(time * TAU * 0.5) > 0 ? 1 : 0
    disc(paint, Math.round(-6 * s), Math.round(-12 * s) - lift, 12 * s, C.ink)
    disc(paint, Math.round(14 * s), Math.round(-22 * s) - lift, 9 * s, C.ink)
    paint.rect(Math.round(-34 * s), Math.round(-8 * s), Math.round(70 * s), Math.round(8 * s), C.ink)
    paint.rect(Math.round(18 * s), Math.round(-34 * s) - lift, 1, 3, C.ink)
    paint.rect(Math.round(24 * s), Math.round(-33 * s) - lift, 1, 3, C.ink)
  },
}

/** The shepherd's staff the player steers the flock with. Its place is its foot, on the ground. */
const staff: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.round(width * 1.85)
    paint.rect(0, -h + 3, 1, h, C.wood2)
    paint.rect(-3, -h, 3, 1, C.wood2)
    paint.rect(-3, -h + 1, 1, 2, C.wood2)
    paint.rect(0, -h, 1, 3, C.wood2)
  },
}

/** The ground where Abel fell, glowing faintly. */
const groundGlow: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 4,
  draw(paint, { time, width }) {
    const pulse = 0.75 + 0.25 * Math.sin(time * TAU * 0.25)
    const rx = width / 2
    for (let y = -Math.round(rx * 0.35); y <= Math.round(rx * 0.35); y++) {
      const half = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y / (rx * 0.35)) ** 2)))
      paint.dither(-half, y, half * 2 + 1, 1, C.rose, 0.35 * pulse)
      paint.dither(-Math.round(half / 2), y, half + 1, 1, C.gold, 0.4 * pulse)
    }
  },
}

export const homeProps: Record<string, PixelPropArt> = { tent, altar, smoke, sin, staff, 'ground-glow': groundGlow }
