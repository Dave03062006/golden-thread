import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, fill } from './creation'

/**
 * Level 4, Episode 6 in pixel art: the ford of the Jabbok at night, between rocky walls,
 * the stream winding through its stony bed. The shapes follow the paper version, at a
 * fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)
const FAR = div([560, 520, 540, 500, 520, 540, 510, 530, 520, 550])
/** The edge of each rock wall, from the top down: x for each y. */
const leftWall = (y: number) => (y < 32 ? 16 : y < 60 ? 16 + (y - 32) * 0.7 : y < 94 ? 36 + (y - 60) * 0.95 : y < 112 ? 68 - (y - 94) * 0.3 : y < 140 ? 62 + (y - 112) * 0.6 : 76)
const rightWall = (y: number) => (y < 28 ? 304 : y < 64 ? 304 - (y - 28) * 0.55 : y < 100 ? 284 - (y - 64) * 0.75 : y < 120 ? 257 + (y - 100) * 0.3 : y < 142 ? 263 - (y - 120) * 0.8 : 246)

export const jabbokLayers: Record<string, PixelLayerArt> = {
  'jabbok-gorge': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The stream, winding across the bottom, with a glint on it.
        const stream = 170 + Math.sin(x / 34) * 4
        if (y >= stream - 4 && y < stream + 9) return y === Math.round(stream - 1) && (x % 11 < 6) ? C.sky : C.blue
        // The near bank, and stones on it.
        for (const [sx, sy, r] of [
          [24, 152, 6],
          [104, 156, 4],
          [216, 154, 5],
          [292, 152, 7],
        ] as const)
          if (Math.hypot((x - sx) / r, (y - sy) / (r * 0.55)) < 1) return C.slate
        if (y >= 140 + Math.round(Math.sin(x / 60) * 2)) return C.dslate
        // The rock walls, with a lit edge facing the valley.
        if (x < leftWall(y)) return x > leftWall(y) - 2 ? C.slate : C.ink
        if (x > rightWall(y)) return x < rightWall(y) + 2 ? C.dslate : C.ink
        // Far hills between them.
        if (y >= Math.round(crest(FAR, x))) return dither(x, y) < 0.5 ? C.navy : C.dslate
        return null
      }),
  },
}
