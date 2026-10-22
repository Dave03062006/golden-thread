import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 6, Episode 5 in pixel art: the whirlwind, turning, with lightning inside
 * it; the storm clouds over the wonders; the storehouses of the snow; and the Pleiades and
 * Orion.
 */

const whirlwind: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 6,
  loop: 2,
  draw(paint, { width, time }) {
    const w = Math.max(20, Math.round(width))
    const h = Math.round(w * 1.4)
    const bands = 7
    for (let y = 0; y < h; y++) {
      const t = y / h
      const band = Math.min(bands - 1, Math.floor(t * bands))
      const half = Math.max(1, Math.round((w / 2) * (1 - 0.82 * t)))
      // Each band turns its own way.
      const dx = Math.round(Math.sin(time * Math.PI + band * 0.9) * (6 - band * 0.7))
      const rim = Math.floor(t * bands * 3) % 3 === 0
      paint.rect(dx - half, -h + y, half * 2, 1, band % 2 ? C.slate : C.dslate)
      if (rim) paint.dither(dx - half + 2, -h + y, half * 2 - 4, 1, C.pale, 0.5)
    }
    // Lightning flickers inside it.
    if (Math.sin(time * Math.PI * 3) > 0.8) {
      const x0 = -Math.round(w * 0.14)
      const y0 = -h + Math.round(h * 0.18)
      for (let i = 0; i < Math.round(h * 0.2); i++) paint.rect(x0 + Math.round((i % 6 < 3 ? i % 3 : 3 - (i % 3)) - 1), y0 + i, 1, 1, C.gold)
    }
  },
}

const stormCloud: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(12, Math.round(width))
    const r = w / 2
    const puffs = [
      [-0.45, 0.1, 0.42],
      [0, -0.12, 0.55],
      [0.45, 0.08, 0.42],
    ] as const
    for (let y = -Math.round(r * 0.75); y <= Math.round(r * 0.55); y++) {
      for (let x = -Math.round(r); x <= Math.round(r); x++) {
        const inPuff = puffs.some(([px, py, pr]) => Math.hypot(x - px * r, y - py * r) <= pr * r)
        if (!inPuff) continue
        const color = y < -r * 0.3 ? C.pale : y > r * 0.25 ? C.dslate : C.slate
        paint.rect(x, y, 1, 1, color)
      }
    }
  },
}

const snowStore: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(12, Math.round(width))
    const h = Math.round(w * 0.8)
    const top = -Math.round(h / 2)
    for (let y = 0; y < h; y++) {
      const half = Math.round((w / 2) * (0.3 + 0.7 * (y / h)))
      paint.rect(-half, top + y, half * 2, 1, y < h * 0.25 ? C.white : C.pale)
    }
    // The dark mouth of the storehouse, heaped with snow.
    const cave = Math.round(w * 0.22)
    paint.rect(-cave, top + Math.round(h * 0.5), cave * 2, Math.round(h * 0.5), C.dslate)
    paint.rect(-cave + 1, top + h - Math.round(h * 0.18), cave * 2 - 2, Math.round(h * 0.18), C.white)
    for (const [fx, fy] of [
      [-0.38, -0.3],
      [0.3, -0.42],
      [0.42, 0.05],
      [-0.2, -0.55],
    ] as const)
      paint.rect(Math.round(fx * w), Math.round(fy * h), 1, 1, C.white)
  },
}

const constellation: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(16, Math.round(width))
    const at = (fx: number, fy: number) => [Math.round((fx - 0.5) * w), Math.round((fy - 0.5) * w * 0.75)] as const
    // The Pleiades: a little cluster on the left.
    for (const [fx, fy] of [
      [0.12, 0.25],
      [0.19, 0.18],
      [0.24, 0.27],
      [0.17, 0.33],
      [0.27, 0.2],
      [0.1, 0.37],
      [0.25, 0.38],
    ] as const) {
      const [x, y] = at(fx, fy)
      paint.rect(x, y, 1, 1, C.white)
    }
    // Orion: shoulders, belt and feet, joined by faint lines.
    const orion = [
      [0.6, 0.12],
      [0.88, 0.17],
      [0.69, 0.47],
      [0.75, 0.5],
      [0.81, 0.53],
      [0.62, 0.87],
      [0.91, 0.83],
    ] as const
    for (const [a, b] of [
      [0, 2],
      [1, 4],
      [2, 5],
      [4, 6],
    ] as const) {
      const [x0, y0] = at(orion[a][0], orion[a][1])
      const [x1, y1] = at(orion[b][0], orion[b][1])
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
      for (let i = 1; i < n; i += 2) paint.dither(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), 1, 1, C.pale, 0.5)
    }
    for (const [fx, fy] of orion) {
      const [x, y] = at(fx, fy)
      paint.rect(x, y, 2, 2, C.white)
    }
  },
}

export const whirlwindProps: Record<string, PixelDrawnArt> = { whirlwind, 'storm-cloud': stormCloud, 'snow-store': snowStore, constellation }
