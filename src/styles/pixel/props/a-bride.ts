import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 4, Episode 1 in pixel art: the stone trough by the well, the water in it,
 * and the stream poured from Rebekah's jar.
 */

const drawn = (draw: PixelDrawnArt['draw'], anchor: 'base' | 'center' = 'base'): PixelDrawnArt => ({ kind: 'drawn', poses: ['idle'], anchor, draw })
const troughSize = (width: number) => {
  const w = Math.max(20, Math.round(width))
  return { w, h: Math.max(5, Math.round(w * 0.27)) }
}

const trough = drawn((paint, { width }) => {
  const { w, h } = troughSize(width)
  const left = -Math.round(w / 2)
  paint.rect(left, -h, w, 2, C.pale)
  for (let y = 2; y < h; y++) paint.rect(left + Math.round(y / 3), -h + y, w - 2 * Math.round(y / 3), 1, y === Math.round(h * 0.6) ? C.dslate : C.slate)
  for (const f of [0.1, 0.36, 0.64, 0.9]) paint.rect(left + Math.round(w * f), -h + 2, 1, h - 3, C.dslate)
})

/** The water, in the trough's own measurements, so it sits in the top of the trough. */
const troughWater = drawn((paint, { width }) => {
  const { w, h } = troughSize(width)
  paint.rect(-Math.round(w / 2) + 2, -h, w - 4, 2, C.blue)
  paint.rect(-Math.round(w / 2) + 5, -h, w - 10, 1, C.sky)
})

const waterStream = drawn((paint, { width }) => {
  const h = Math.max(6, Math.round(width * 5))
  paint.rect(0, -Math.round(h / 2), 1, h, C.cyan)
  paint.dither(1, -Math.round(h / 2), 1, h, C.sky, 0.5)
}, 'center')

export const aBrideProps: Record<string, PixelDrawnArt> = { trough, 'trough-water': troughWater, 'water-stream': waterStream }
