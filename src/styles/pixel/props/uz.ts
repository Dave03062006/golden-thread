import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite, type Grid } from '../shapes'

/**
 * Props of Level 6 · Job in pixel art: the accuser, a dark hooded shadow; an ox; a mark
 * scratched in the dust; and a line of Job's words carved in the rock in light.
 */

const accuser: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 4,
  loop: 2,
  draw(paint, { width, time }) {
    const w = Math.max(8, Math.round(width))
    const h = Math.round(w * 1.8)
    const sway = Math.round(Math.sin(time * Math.PI))
    for (let y = 0; y < h; y++) {
      const t = y / h
      const half = Math.round(w * (0.2 + 0.28 * Math.min(1, t * 1.6)))
      const dx = t < 0.5 ? sway : 0
      paint.rect(dx - half, -h + y, half * 2, 1, C.ink)
      if (t > 0.85) paint.dither(dx - half - 1, -h + y, half * 2 + 2, 1, C.dslate, 0.5)
    }
    // The hood's dark opening, with no face in it.
    const face = Math.max(2, Math.round(w * 0.2))
    paint.dither(sway - Math.round(face / 2) - 1, -h + Math.round(h * 0.08) - 1, face + 2, face + 2, C.purple, 0.5)
    paint.rect(sway - Math.round(face / 2), -h + Math.round(h * 0.08), face, face, C.wood0)
  },
}

function oxFrame(g: Grid, step: number) {
  g.rect(3 - step, 9, 2, 4, 'D').rect(13 + step, 9, 2, 4, 'D')
  g.rect(2, 3, 15, 7, 'B').rect(6, 2, 6, 2, 'L')
  g.rect(16, 3, 4, 5, 'B')
  g.set(16, 1, 'W').set(16, 2, 'W').set(19, 1, 'W').set(19, 2, 'W')
  g.set(18, 4, 'k')
  g.set(1, 4, 'B').set(1, 5, 'D')
}

const ox: PixelSpriteArt = {
  kind: 'sprite',
  facing: 1,
  anchor: 'base',
  colors: { B: C.wood2, L: C.wood3, D: C.wood1, W: C.white, k: C.ink },
  poses: {
    idle: { frames: [sprite(21, 13, (g) => oxFrame(g, 0))], fps: 0.5 },
    walk: { frames: [sprite(21, 13, (g) => oxFrame(g, 1)), sprite(21, 13, (g) => oxFrame(g, -1))], fps: 4 },
  },
}

const dustMark: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(3, Math.round(width))
    paint.rect(0, -h, 1, h, C.wood1)
    paint.rect(1, -h, 1, h, C.pale)
  },
}

const carvedLine: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(16, Math.round(width))
    const left = -Math.round(w / 2)
    // A groove cut into the rock, and marks like letters in it, cut in light.
    paint.rect(left, -3, w, 6, C.wood2)
    paint.rect(left, 3, w, 1, C.sand)
    for (let x = left + 2, i = 0; x < left + w - 2; x += 4 + (i % 3 === 2 ? 2 : 0), i++) {
      const shape = i % 4
      paint.rect(x, -2, 1, 4, C.white)
      if (shape === 1) paint.rect(x + 1, -2, 1, 1, C.white)
      if (shape === 2) paint.rect(x + 1, 0, 1, 1, C.gold)
      if (shape === 3) paint.rect(x - 1, 1, 3, 1, C.gold)
    }
  },
}

export const uzProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { accuser, ox, 'dust-mark': dustMark, 'carved-line': carvedLine }
