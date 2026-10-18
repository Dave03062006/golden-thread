import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { MARGIN_X, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { bandColor, fill } from './creation'

/**
 * Level 2, Episode 2 in pixel art: the clearing among tall cypress trees where the ark is
 * built, far from any sea; trodden earth, stacks of timber, chips of wood.
 */

function cypress(buf: PixelBuffer, x: number, base: number, h: number, color: string) {
  for (let y = 0; y < h; y++) {
    const t = y / h
    // Narrow at the top, widest a third of the way up, rounding in at the foot.
    const half = Math.round(h * 0.08 * Math.sin(Math.min(1, t * 1.4) * Math.PI * 0.62) * (t > 0.85 ? (1 - t) / 0.15 : 1))
    for (let i = -half; i <= half; i++) buf.set(fx(x + i), fy(base - h + y), i === -half && y % 3 === 0 ? C.green : color)
  }
  buf.set(fx(x), fy(base), C.wood1)
}

export const buildingTheArkLayers: Record<string, PixelLayerArt> = {
  'forest-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => bandColor([C.blue, C.sky, C.cyan, C.white], Math.max(0, (y + 14) / 140), x, y))
      for (const [cx, cy, r] of [
        [60, 18, 8],
        [236, 8, 10],
      ] as const)
        for (let y = cy - r; y <= cy + 3; y++)
          for (let x = cx - r * 2; x <= cx + r * 2; x++) if (((x - cx) / (r * 2)) ** 2 + ((y - cy) / r) ** 2 < 1) buf.set(fx(x), fy(y), y > cy + 1 ? C.pale : C.white)
    },
  },
  'forest-far': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= 118 + Math.round(Math.sin(x / 19) * 2) ? (y === 118 + Math.round(Math.sin(x / 19) * 2) ? C.lime : C.green) : null))
      for (let i = 0, x = -MARGIN_X; x < PX_W + MARGIN_X; i++, x += 9 + Math.floor(hash(i * 3.1) * 6)) cypress(buf, x, 120, 48 + Math.floor(hash(i * 7.7) * 24), C.teal)
      for (let i = 0, x = -MARGIN_X + 4; x < PX_W + MARGIN_X; i++, x += 14 + Math.floor(hash(i * 5.3) * 10)) {
        if (x > 52 && x < 268) continue
        cypress(buf, x, 132, 66 + Math.floor(hash(i * 2.2) * 30), C.dslate)
      }
    },
  },
  clearing: {
    draw: (buf) => {
      fill(buf, (x, y) => {
        const top = 128 + Math.round(Math.abs(x - 160) / 60)
        if (y < top) return null
        if (y === top) return C.sand
        if (hash(x * 13 + y * 7) < 0.04) return C.sand
        return y > 152 && dither(x, y) < 0.25 ? C.wood2 : C.wood3
      })
      const logs = (x: number, y: number, n: number) => {
        for (let i = 0; i < n; i++) {
          const row = Math.floor(i / 3)
          const cx = x + (i % 3) * 8 + row * 4
          const cy = y - row * 6
          for (let k = 0; k < 14; k++) for (const [dy, c] of [[-1, C.wood2], [0, C.wood2], [1, C.wood1]] as const) buf.set(fx(cx - k), fy(cy + dy), c)
          for (const [dy, c] of [[-1, C.sand], [0, C.sand2], [1, C.sand]] as const) buf.set(fx(cx), fy(cy + dy), c)
        }
      }
      logs(16, 148, 6)
      logs(288, 152, 5)
    },
  },
}
