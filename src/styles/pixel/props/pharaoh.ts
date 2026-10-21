import { C } from '../palette'
import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { sprite } from '../shapes'

/**
 * Props of Level 5, Episode 3 in pixel art: the fat and thin cows and the full and thin ears
 * of Pharaoh's dreams, the throne, the chariot, and a granary.
 */

const cow: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { B: C.wood3, D: C.wood2, T: C.slate, U: C.dslate, k: C.ink, H: C.white },
  poses: {
    fat: {
      fps: 0.5,
      frames: [
        sprite(24, 16, (g) => {
          g.ellipse(13, 7, 9, 4.5, 'B').rect(1, 4, 5, 4, 'B').set(2, 5, 'k').set(2, 3, 'H').set(5, 3, 'H')
          for (const x of [6, 9, 17, 20]) g.rect(x, 11, 2, 5, 'D')
        }),
      ],
    },
    thin: {
      fps: 0.5,
      frames: [
        sprite(24, 16, (g) => {
          g.ellipse(13, 7, 7.5, 2.5, 'T').rect(2, 5, 4, 3, 'T').set(3, 6, 'k')
          for (const x of [8, 11, 15, 18]) g.rect(x, 9, 1, 7, 'U')
        }),
      ],
    },
  },
}

const grainStalk: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['full', 'thin'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const h = Math.max(10, Math.round(width * 3))
    paint.rect(0, -h, 1, h, C.wood3)
    for (let k = 0; k < 6; k++) {
      const y = -h + k * 2
      if (pose === 'full') paint.rect(k % 2 ? 1 : -2, y, 2, 2, C.gold)
      else paint.rect(k % 2 ? 1 : -1, y, 1, 1, C.sand2)
    }
  },
}

const throne: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(8, Math.round(width))
    const h = Math.round(w * 1.3)
    paint.rect(-Math.round(w / 2), -h, Math.round(w / 4), h, C.gold)
    paint.rect(-Math.round(w / 2) + 1, -h + 1, Math.round(w / 4) - 2, Math.round(h * 0.5), C.blue)
    paint.rect(-Math.round(w / 2), -Math.round(h * 0.45), w, Math.round(h * 0.45), C.gold)
    paint.rect(-Math.round(w / 2), -Math.round(h * 0.35), w, 1, C.rose)
  },
}

const chariot: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'walk'],
  anchor: 'base',
  fps: 6,
  loop: 1,
  draw(paint, { width, facing, pose, time }) {
    const w = Math.max(12, Math.round(width))
    const f = facing
    paint.rect(-Math.round(w * 0.1), -Math.round(w * 0.55), Math.round(w * 0.5), Math.round(w * 0.3), C.gold)
    paint.rect(-Math.round(w * 0.1), -Math.round(w * 0.45), Math.round(w * 0.5), 1, C.rose)
    const pole = Math.round(w * 0.45)
    paint.rect(f < 0 ? -pole - Math.round(w * 0.1) : Math.round(w * 0.4), -Math.round(w * 0.3), pole, 1, C.wood2)
    // The wheel, its spokes turning as it rolls.
    const r = Math.round(w * 0.18)
    const cx = Math.round(w * 0.2)
    const cy = -r - 1
    for (let a = 0; a < 16; a++) paint.rect(cx + Math.round(Math.cos((a / 16) * Math.PI * 2) * r), cy + Math.round(Math.sin((a / 16) * Math.PI * 2) * r), 1, 1, C.wood2)
    const turn = pose === 'walk' ? Math.floor(time * 6) % 2 : 0
    for (let k = 0; k < r; k++) {
      if (turn) paint.rect(cx + k - Math.floor(r / 2), cy + k - Math.floor(r / 2), 1, 1, C.wood1)
      else paint.rect(cx, cy - Math.floor(r / 2) + k, 1, 1, C.wood1)
    }
  },
}

const granary: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 1.4)
    for (let y = 0; y < h; y++) {
      const top = y < w / 2
      const half = top ? Math.round(Math.sqrt((w / 2) ** 2 - (w / 2 - y) ** 2)) : Math.round(w / 2)
      paint.rect(-half, -h + y, half * 2, 1, y === Math.round(h * 0.45) || y === Math.round(h * 0.7) ? C.sand2 : C.sand)
    }
    paint.rect(-Math.round(w / 5), -Math.round(h * 0.28), Math.round((w * 2) / 5), Math.round(h * 0.28), C.wood1)
  },
}

export const pharaohProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { cow, 'grain-stalk': grainStalk, throne, chariot, granary }
