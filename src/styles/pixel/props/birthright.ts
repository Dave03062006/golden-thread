import type { PixelDrawnArt, Painter } from '../art'
import { C } from '../palette'

/**
 * Props of Level 4, Episode 2 in pixel art: the pot of red lentil stew, the bowl Jacob
 * holds out, and the golden scales of "what is it worth?", tipping as each piece of the
 * birthright is placed against the bowl of stew.
 */

/** Wisps of steam rising and fading, from a point. */
function steam(paint: Painter, xs: number[], top: number, time: number) {
  for (const [i, x] of xs.entries()) {
    const t = (time * 0.6 + i * 0.4) % 1
    for (let k = 0; k < 4; k++) paint.dither(x + Math.round(Math.sin(t * 6 + k) * 1), top - Math.round(t * 4) - k * 2, 1, 2, C.white, 0.6 * (1 - k / 4))
  }
}

const stewPot: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 6,
  loop: 5,
  draw(paint, { width, time }) {
    const w = Math.max(8, Math.round(width))
    const h = Math.round(w * 0.55)
    const left = -Math.round(w / 2)
    for (let y = 0; y < h; y++) {
      const inset = Math.round((y / h) ** 2 * w * 0.2)
      paint.rect(left + inset, -h + y, w - inset * 2, 1, y === 0 ? C.wood1 : C.ink)
    }
    paint.rect(left + 1, -h, w - 2, 1, C.rose)
    paint.rect(left + 2, -h, Math.round(w / 3), 1, C.orange)
    steam(paint, [left + Math.round(w / 3), left + Math.round((w * 2) / 3)], -h - 1, time)
  },
}

const stewBowl: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 6,
  loop: 5,
  draw(paint, { width, time }) {
    const w = Math.max(5, Math.round(width))
    const left = -Math.round(w / 2)
    paint.rect(left, -3, w, 1, C.rose)
    paint.rect(left, -2, w, 1, C.wood2)
    paint.rect(left + 1, -1, w - 2, 1, C.wood1)
    steam(paint, [0], -4, time)
  },
}

/** How far the beam turns in each pose, in degrees, as in the paper style. */
const TILT: Record<string, number> = { stew: -14, 'tip-1': -8, 'tip-2': -2, 'tip-3': 4, 'tip-4': 10, 'tip-5': 18 }

const scales: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['stew', 'tip-1', 'tip-2', 'tip-3', 'tip-4', 'tip-5'],
  anchor: 'center',
  draw(paint, { width, pose }) {
    const w = Math.max(30, Math.round(width))
    const u = w / 300
    const at = (x: number, y: number) => [Math.round((x - 150) * u), Math.round((y - 125) * u)] as const
    const dot = (x: number, y: number, c: string, s = 1) => paint.rect(x, y, s, s, c)
    const line = (x0: number, y0: number, x1: number, y1: number, c: string, s = 1) => {
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
      for (let i = 0; i <= n; i++) dot(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), c, s)
    }
    // The stand and its base.
    const [px, py] = at(150, 44)
    const [, by] = at(150, 236)
    line(px, py, px, by, C.wood3, 2)
    const [bx0] = at(104, 236)
    paint.rect(bx0, by - 2, Math.round(92 * u), 3, C.gold)
    // The beam, turned, and the pans hanging from its ends.
    const tilt = ((TILT[pose] ?? 0) * Math.PI) / 180
    const arm = 120 * u
    const ends = [-1, 1].map((side) => [Math.round(px + side * arm * Math.cos(tilt)), Math.round(py + side * arm * Math.sin(tilt))] as const)
    line(ends[0]![0], ends[0]![1], ends[1]![0], ends[1]![1], C.gold, 2)
    dot(px - 1, py - 2, C.gold, 3)
    const drop = Math.round(76 * u)
    const half = Math.round(30 * u)
    for (const [ex, ey] of ends) {
      line(ex, ey, ex - half + 2, ey + drop, C.wood3)
      line(ex, ey, ex + half - 2, ey + drop, C.wood3)
      paint.rect(ex - half, ey + drop, half * 2, 2, C.gold)
      paint.rect(ex - half + 2, ey + drop + 2, half * 2 - 4, 1, C.wood3)
    }
    // The bowl of stew on the left pan; the pieces placed so far on the right.
    const [lx, ly] = ends[0]!
    const bowl = Math.round(half * 1.3)
    paint.rect(lx - Math.round(bowl / 2), ly + drop - 5, bowl, 2, C.rose)
    paint.rect(lx - Math.round(bowl / 2), ly + drop - 3, bowl, 3, C.wood2)
    paint.rect(lx - Math.round(bowl / 2) + 1, ly + drop - 1, bowl - 2, 1, C.wood1)
    const placed = Number(pose.split('-')[1] ?? 0)
    const [rx, ry] = ends[1]!
    for (let k = 0; k < placed; k++) {
      paint.rect(rx - 1, ry + drop - 4 - k * 4, 3, 3, C.gold)
      paint.rect(rx, ry + drop - 4 - k * 4, 1, 1, C.white)
    }
  },
}

export const birthrightProps: Record<string, PixelDrawnArt> = { 'stew-pot': stewPot, 'stew-bowl': stewBowl, scales }
