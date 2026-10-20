import type { PixelDrawnArt, Painter } from '../art'
import { C } from '../palette'

/**
 * Props of Level 4, Episode 6 in pixel art: Jacob and the stranger wrestling by the
 * Jabbok, two figures locked together, leaning, pulling, slipping, and at last Jacob sinking
 * as his thigh is touched, still holding on.
 */

/** How each figure leans in a pose: how far its head is from over its feet, and how low it is. */
const LEAN: Record<string, { jacob: [number, number]; stranger: [number, number] }> = {
  hold: { jacob: [2, 0], stranger: [-2, 0] },
  pull: { jacob: [4, 0], stranger: [1, 0] },
  slip: { jacob: [-2, 1], stranger: [0, 0] },
  touch: { jacob: [2, 3], stranger: [-3, 0] },
}

/** One figure, its feet at (x, 0), leaning `lean` pixels at the head, reaching toward `dir`. */
function figure(paint: Painter, x: number, h: number, lean: number, low: number, dir: -1 | 1, reach: number, robe: string, rim: string) {
  for (let y = 0; y < h - 3; y++) {
    const shift = Math.round((lean * y) / h)
    const half = y < h * 0.65 ? 2 : 1
    paint.rect(x + shift - half, -y - 1 + low, half * 2 + 1, 1, robe)
    paint.rect(x + shift - half * dir, -y - 1 + low, 1, 1, rim)
  }
  const head = x + lean
  paint.rect(head - 1, -h - 1 + low, 3, 3, C.wood1)
  // The arms, reaching across to the other.
  for (let i = 1; i <= reach; i++) paint.rect(head + dir * i, -Math.round(h * 0.7) + low, 1, 1, C.wood1)
}

const wrestlers: PixelDrawnArt = {
  kind: 'drawn',
  poses: Object.keys(LEAN),
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 0.95)
    const lean = LEAN[pose] ?? LEAN.hold!
    const gap = Math.round(w * 0.2)
    figure(paint, gap, h, lean.stranger[0], lean.stranger[1], -1, gap, C.slate, C.pale)
    figure(paint, -gap, h, lean.jacob[0], lean.jacob[1], 1, gap, C.blue, C.gold)
  },
}

export const jabbokProps: Record<string, PixelDrawnArt> = { wrestlers }
