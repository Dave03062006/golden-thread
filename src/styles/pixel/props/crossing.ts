import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 9 · Through the Sea in pixel art: a stream over the sand; the great rock at
 * Horeb; a pool in the desert; the manna on the ground; an omer jar, empty, full or heaped;
 * and the banners of Israel and of Amalek.
 */

const stream: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 4,
  loop: 1,
  draw(paint, { width, time }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -1, w, 2, C.blue)
    const t = Math.floor(time * 4)
    for (let x = -half + ((t * 2) % 6); x < half - 1; x += 6) paint.rect(x, -1, 2, 1, C.sky)
  },
}

const greatRock: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(16, Math.round(width))
    const h = Math.round(w * 0.78)
    for (let y = 0; y < h; y++) {
      const f = y / h
      // Wide at the foot, rounding off toward the top.
      const half = Math.round((w / 2) * Math.sqrt(Math.max(0, 1 - (f * 0.95) ** 2)))
      paint.rect(-half, -y - 1, half * 2, 1, C.wood2)
      if (f > 0.5 && half > 3) paint.rect(-half + 1, -y - 1, Math.round(half * 0.7), 1, C.rose)
      if (f < 0.6) paint.rect(half - 2, -y - 1, 2, 1, C.wood1)
    }
    // The cleft where Moses struck it.
    for (let y = 0; y < Math.round(h * 0.7); y++) paint.rect(Math.round(w * 0.08) + (y % 5 < 2 ? 0 : 1), -y - 1, 1, 1, C.wood0)
  },
}

const pool: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half + 2, -3, w - 4, 1, C.sand2)
    paint.rect(-half, -2, w, 2, C.sand2)
    paint.rect(-half + 3, -2, w - 6, 1, C.teal)
    paint.rect(-half + 5, -2, Math.round(w / 4), 1, C.cyan)
  },
}

const manna: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    // White flakes, each with a little shadow below, so they show on the pale sand.
    paint.rect(-half + 1, -1, w - 2, 1, C.wood3)
    for (let x = -half; x < half; x++) {
      if ((x * 7 + 3) % 3 === 0) continue
      const y = -2 - ((x * 5 + 2) % 2)
      paint.rect(x, y, 1, 1, C.white)
      paint.rect(x, y + 1, 1, 1, C.sand2)
    }
  },
}

const omerJar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['empty', 'full', 'heaped'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(4, Math.round(width))
    const h = Math.round(w * 1.4)
    const half = Math.round(w / 2)
    paint.rect(-half, -h, w, h, C.wood2)
    paint.rect(-half + 1, -h - 1, w - 2, 1, C.wood1)
    paint.rect(-half, -Math.round(h / 2), w, 1, C.wood3)
    if (pose === 'full') paint.rect(-half + 1, -h - 1, w - 2, 1, C.white)
    if (pose === 'heaped') {
      paint.rect(-half + 1, -h - 1, w - 2, 1, C.white)
      paint.rect(-half + 2, -h - 2, Math.max(1, w - 4), 1, C.white)
    }
  },
}

const banner: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['israel', 'amalek'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const h = Math.max(8, Math.round(width * 2))
    paint.rect(0, -h, 1, h, C.wood1)
    const flag = pose === 'israel' ? C.blue : C.purple
    paint.rect(1, -h, 4, 3, flag)
    paint.rect(1, -h + 1, 3, 1, pose === 'israel' ? C.white : C.ink)
  },
}

export const crossingProps: Record<string, PixelDrawnArt> = { stream, 'great-rock': greatRock, pool, manna, 'omer-jar': omerJar, banner }
