import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 12 · Forty Years in the Wilderness in pixel art: the wilderness seen from above, with
 * the dry valleys the camp follows the cloud along; and Balaam's road, from open fields through
 * a lane between vineyard walls to a narrow pass in the rocks. The shapes follow the paper
 * version, at a fifth of its size.
 */

/** The stages the cloud settles at, in frame pixels (see content/levels/12-forty-years-in-the-wilderness/episode-1.ts). */
const PATH = [
  [0.08, 0.7],
  [0.2, 0.62],
  [0.42, 0.42],
  [0.64, 0.6],
  [0.84, 0.36],
].map(([x, y]) => [x! * 320, y! * 180] as const)

function nearPath(x: number, y: number): number {
  let best = Infinity
  PATH.slice(1).forEach(([x2, y2], i) => {
    const [x1, y1] = PATH[i]!
    const len = Math.hypot(x2 - x1, y2 - y1)
    const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (len * len)))
    best = Math.min(best, Math.hypot(x - (x1 + t * (x2 - x1)), y - (y1 + t * (y2 - y1))))
  })
  return best
}

export const wildernessLayers: Record<string, PixelLayerArt> = {
  'wilderness-map': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The valley the camp follows, paler than the desert around it.
        const d = nearPath(x, y)
        if (d < 4) return (x + y) % 5 ? C.sand : C.sand2
        // Rocky hills, scattered over the desert.
        const hill = Math.sin(x / 23) * Math.cos(y / 17) + Math.sin((x + y) / 31)
        if (hill > 1.1 && d > 10) return hill > 1.5 ? C.wood2 : C.wood3
        // Kadesh's oasis, at the end of the way.
        if (Math.hypot(x - 280, y - 58) < 9) return dither(x, y) < 0.5 ? C.green : C.teal
        return dither(x, y) < 0.15 ? C.sand : C.sand2
      }),
  },
  'balaam-road': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 112) return null
        // The road along the bottom, the ground it crosses.
        if (y >= 136 && y < 152) return (x * 7 + y) % 19 === 0 ? C.wood3 : C.sand
        // The open field at first; then vineyard walls on either side; then the rocks of the narrow pass.
        if (x < 160) return y < 136 ? (dither(x, y) < 0.4 ? C.lime : C.green) : dither(x, y) < 0.3 ? C.green : C.sand2
        if (x < 240) {
          if ((y >= 128 && y < 136) || (y >= 152 && y < 158)) return (x + Math.floor(y / 3)) % 6 ? C.pale : C.slate
          if (y < 128) return x % 10 < 2 ? C.wood2 : dither(x, y) < 0.5 ? C.green : C.purple
          return dither(x, y) < 0.3 ? C.sand2 : C.wood3
        }
        const rocky = y < 136 || y >= 152
        return rocky ? (dither(x, y) < 0.3 ? C.wood1 : C.wood2) : C.sand
      }),
  },
}
