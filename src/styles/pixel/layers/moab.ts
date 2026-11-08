import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 13 · Moses' Last Words in pixel art: the two roads, one down to the river and across
 * into a green land full of light, the other turning back into the dry hills; and the view
 * from the top of Nebo over the whole promised land. The shapes follow the paper version, at
 * a fifth of its size.
 */

/** The road of life, from where the family stands to the far side of the river (see content/levels/13-moses-last-words/episode-4.ts). */
const LIFE = [
  [0.46, 0.785],
  [0.56, 0.8],
  [0.64, 0.76],
  [0.72, 0.72],
  [0.8, 0.68],
  [0.88, 0.64],
].map(([x, y]) => [x! * 320, y! * 180] as const)

function nearLife(x: number, y: number): number {
  let best = Infinity
  LIFE.slice(1).forEach(([x2, y2], i) => {
    const [x1, y1] = LIFE[i]!
    const len = Math.hypot(x2 - x1, y2 - y1)
    const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (len * len)))
    best = Math.min(best, Math.hypot(x - (x1 + t * (x2 - x1)), y - (y1 + t * (y2 - y1))))
  })
  return best
}

/** The parts of the land, as the play lights them (see content/levels/13-moses-last-words/episode-5.ts). */
const REGIONS = [
  [0.72, 0.3],
  [0.52, 0.24],
  [0.38, 0.36],
  [0.2, 0.46],
  [0.26, 0.6],
  [0.56, 0.56],
].map(([x, y]) => [x! * 320, y! * 180] as const)

export const moabLayers: Record<string, PixelLayerArt> = {
  'two-roads': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 100) return null
        // The river, and the green land beyond it on the right.
        const river = 214 + Math.round(Math.sin(y / 9) * 3)
        if (x >= river && x < river + 8) return (x + y) % 5 ? C.sky : C.cyan
        if (nearLife(x, y) < 3) return C.sand
        if (x > river + 8) return dither(x, y) < 0.35 ? C.lime : C.green
        // The road away: back to the left, into the dry hills.
        if (Math.abs(y - (141 - (147 - x) * 0.18)) < 2.5 && x < 150) return C.sand2
        return dither(x, y) < 0.25 ? C.wood3 : C.sand2
      }),
  },
  'nebo-view': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y < 20) return null
        // The western sea, far off on the left; the Jordan and the Dead Sea down the middle.
        if (x < 30 - y * 0.05) return dither(x, y) < 0.5 ? C.blue : C.sky
        const jordan = 180 + Math.round(Math.sin(y / 14) * 4)
        if (y > 40 && x >= jordan && x < jordan + 3 && y < 120) return C.sky
        if (y >= 118 && Math.abs(x - 190) < 14 - (y - 118) * 0.1 && y < 168) return C.blue
        // The land in the evening light, its hills marked with darker folds, and a glint at each part the play lights.
        for (const [rx, ry] of REGIONS) if (Math.hypot(x - rx, y - ry) < 2) return C.gold
        const fold = Math.sin(x / 13 + y / 17) + Math.cos(y / 9)
        if (y > 150) return dither(x, y) < 0.3 ? C.wood1 : C.wood2
        return fold > 1.2 ? C.wood3 : dither(x, y) < 0.3 + y / 600 ? C.green : C.sand2
      }),
  },
}
