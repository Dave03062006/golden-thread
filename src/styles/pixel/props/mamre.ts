import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Props of Level 3, Episode 7 in pixel art: the water jar, the cakes, the calf, the bowls
 * of curds and milk, and the mat in the shade of the oak.
 */

const drawn = (draw: PixelDrawnArt['draw']): PixelDrawnArt => ({ kind: 'drawn', poses: ['idle'], anchor: 'base', draw })

const waterJar = drawn((paint, { width }) => {
  const w = Math.max(5, width)
  const h = Math.round(w * 1.35)
  paint.rect(-Math.round(w / 2), -h + 3, w, h - 3, C.wood3)
  paint.rect(-Math.round(w / 4), -h, Math.round(w / 2), 3, C.wood3)
  paint.rect(-Math.round(w / 4), -h, Math.round(w / 2), 1, C.sky)
  paint.rect(-Math.round(w / 2), -Math.round(h * 0.6), w, 1, C.wood2)
})

const cakes = drawn((paint, { width }) => {
  const w = Math.max(9, width)
  paint.rect(-Math.round(w / 2), -1, w, 1, C.wood1)
  for (let i = 0; i < 3; i++) paint.rect(-Math.round(w / 2) + 1 + i * Math.round(w / 3), -3 - (i % 2), Math.round(w / 3) - 1, 2, C.sand)
})

function calfFrame(g: Grid, step: number) {
  g.rect(3 - step, 8, 2, 4, 'D').rect(10 + step, 8, 2, 4, 'D')
  g.rect(2, 3, 12, 6, 'B').rect(6, 3, 3, 6, 'W')
  g.rect(13, 1, 3, 4, 'B')
  g.set(15, 2, 'k')
  g.set(1, 4, 'B')
}

const calf: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { B: C.wood2, D: C.wood1, W: C.white, k: C.ink },
  poses: {
    idle: { frames: [sprite(17, 12, (g) => calfFrame(g, 0))], fps: 0.5 },
    walk: { frames: [sprite(17, 12, (g) => calfFrame(g, 1)), sprite(17, 12, (g) => calfFrame(g, -1))], fps: 4 },
  },
}

const milkBowls = drawn((paint, { width }) => {
  const w = Math.max(8, width)
  const b = Math.round(w / 2) - 1
  paint.rect(-Math.round(w / 2), -3, b, 3, C.wood2)
  paint.rect(-Math.round(w / 2), -3, b, 1, C.white)
  paint.rect(1, -3, b, 3, C.wood1)
  paint.rect(1, -3, b, 1, C.sand)
})

const feastMat = drawn((paint, { width }) => {
  const w = Math.max(20, width)
  paint.rect(-Math.round(w / 2), -3, w, 3, C.rose)
  paint.rect(-Math.round(w / 2), -3, w, 1, C.gold)
})

export const mamreProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { 'water-jar': waterJar, cakes, calf, 'milk-bowls': milkBowls, 'feast-mat': feastMat }
