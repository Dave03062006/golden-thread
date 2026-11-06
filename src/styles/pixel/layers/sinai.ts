import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 10 · Sinai in pixel art: the mountain in profile with the path Moses climbs; the
 * summit above a sea of cloud; and the face of the rock, with its cleft. The shapes follow
 * the paper version, at a fifth of its size.
 */

/** The stops on the mountain path, in frame pixels (see content/levels/10-sinai/episode-1.ts). */
const STOPS = [
  [0.12, 0.8],
  [0.34, 0.71],
  [0.24, 0.6],
  [0.46, 0.5],
  [0.38, 0.39],
  [0.6, 0.3],
  [0.7, 0.19],
].map(([x, y]) => [Math.round(x! * 320), Math.round(y! * 180)] as [number, number])

/** The mountain's outline, as the paper's points at a fifth of the size. */
const RIDGE = [
  [-48, 172],
  [-16, 152],
  [52, 120],
  [104, 72],
  [152, 52],
  [200, 36],
  [226, 24],
  [244, 30],
  [284, 60],
  [320, 84],
  [368, 104],
] as const

function ridgeAt(x: number): number {
  for (let i = 0; i < RIDGE.length - 1; i++) {
    const [x0, y0] = RIDGE[i]!
    const [x1, y1] = RIDGE[i + 1]!
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
  }
  return 200
}

/** Whether a pixel lies on the path between two stops. */
function onPath(x: number, y: number): boolean {
  return STOPS.slice(1).some(([x2, y2], i) => {
    const [x1, y1] = STOPS[i]!
    const len = Math.hypot(x2 - x1, y2 - y1)
    const t = ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (len * len)
    if (t < 0 || t > 1) return false
    return Math.abs((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)) / len < 1.2
  })
}

export const sinaiLayers: Record<string, PixelLayerArt> = {
  'sinai-path': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < Math.round(ridgeAt(x))) return null
        for (const [sx, sy] of STOPS) {
          const d = Math.hypot(x - sx, y - sy)
          if (d < 1.2) return C.white
          if (d < 2.5) return C.sand
        }
        if (onPath(x, y)) return (x + y) % 3 ? C.sand : C.sand2
        // The camp's tents at the foot of the mountain.
        for (const [tx, h] of [
          [8, 8],
          [26, 9],
          [42, 8],
        ] as const) {
          if (y >= 160 - h && y < 160 && Math.abs(x - tx) <= (y - (160 - h)) * 0.9) return tx === 26 ? C.purple : C.wood3
        }
        if (y >= 164 && x < 100) return dither(x, y) < 0.3 ? C.sand2 : C.wood3
        if (x > 230 && x < 290 && y < ridgeAt(x) + 30) return C.wood1
        return (x * 3 + y * 5) % 23 === 0 ? C.wood1 : dither(x, y) < 0.2 ? C.rose : C.wood2
      }),
  },
  'sinai-summit': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = 139 - Math.round(Math.sin((x + 20) / 70) * 3)
        if (y >= top) {
          if (y === top) return C.rose
          for (const [rx, ry, r] of [
            [24, 152, 10],
            [92, 164, 7],
            [236, 160, 8],
            [296, 152, 11],
          ] as const) {
            const d = ((x - rx) / r) ** 2 + ((y - ry) / (r * 0.55)) ** 2
            if (d < 1) return d < 0.4 ? C.rose : C.wood1
          }
          return dither(x, y) < 0.3 ? C.wood1 : C.wood2
        }
        // The sea of cloud below the summit, and the far peaks rising out of it.
        if (y >= 104 && y < 140) return dither(x, y) < 0.7 ? C.white : C.pale
        if ((Math.abs(x - 10) < 22 - (112 - y) * 1.4 && y >= 94) || (Math.abs(x - 300) < 24 - (112 - y) * 1.2 && y >= 92)) return C.wood1
        return null
      }),
  },
  'glory-rock': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The cleft, where Moses stands.
        const cleft = 28 + Math.round(Math.sin(y / 18) * 3)
        if (x >= cleft && x < cleft + 12 + Math.round(y / 40)) return x === cleft ? C.rose : C.ink
        if (y >= 152) return dither(x, y) < 0.3 ? C.wood0 : C.wood1
        if ((x + Math.round(y * 0.4)) % 30 < 2) return C.wood1
        if ((y + Math.round(Math.sin(x / 40) * 3)) % 24 === 0) return C.rose
        return dither(x, y) < 0.25 ? C.rose : C.wood2
      }),
  },
}
