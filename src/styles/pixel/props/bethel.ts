import type { PixelDrawnArt, PixelSpriteArt } from '../art'
import { C } from '../palette'
import { sprite } from '../shapes'

/**
 * Props of Level 4, Episode 4 in pixel art: Jacob asleep with his head on a stone; the
 * stone, lying, set up as a pillar, and anointed with oil; and the ladder of his dream,
 * lit step by step.
 */

const STEPS = 8

const ladder: PixelDrawnArt = {
  kind: 'drawn',
  poses: Array.from({ length: STEPS + 1 }, (_, k) => `lit-${k}`),
  anchor: 'base',
  // Far taller than it is wide, so it's drawn straight onto the screen rather than kept as a picture.
  live: true,
  draw(paint, { width, pose, time }) {
    const w = Math.max(12, Math.round(width))
    const h = Math.round((w * 700) / 160)
    const lit = Number(pose.split('-')[1])
    if (lit === 0) return
    const shimmer = 0.75 + 0.25 * Math.sin(time * Math.PI * 1.2)
    // The rails, drawing together as they rise.
    const rail = (y: number, side: -1 | 1) => Math.round(side * (w * 0.375 - (y / h) * w * 0.25))
    const rails: [number, number, number][] = []
    for (let y = 0; y < h; y++) for (const side of [-1, 1] as const) rails.push([-y - 1, rail(y, side), rail(y, side)])
    paint.spans(rails, C.gold, 0.35 + (0.55 * lit) / STEPS)
    // The steps lit so far, from the ground up.
    for (let i = 0; i < lit; i++) {
      const y = Math.round(((60 + i * 80) / 700) * h)
      paint.rect(rail(y, -1), -y - 1, rail(y, 1) - rail(y, -1) + 1, 1, C.gold)
      paint.dither(rail(y, -1) - 1, -y - 2, rail(y, 1) - rail(y, -1) + 3, 3, C.white, 0.25 * shimmer)
    }
    // The light at the top, once the ladder reaches it.
    if (lit === STEPS) {
      paint.dither(-6, -h - 6, 13, 13, C.gold, 0.5 * shimmer)
      paint.rect(-2, -h - 2, 5, 5, C.white)
    }
  },
}

const jacobAsleep: PixelSpriteArt = {
  kind: 'sprite',
  facing: -1,
  anchor: 'base',
  colors: { K: C.blue, S: C.wood1, H: C.wood0, W: C.gold, R: C.gold },
  poses: {
    idle: {
      fps: 0.4,
      frames: [0, 1].map((up) =>
        sprite(26, 8, (g) => {
          g.rect(4, 3 - up, 20, 4 + up, 'K').rect(20, 3 - up, 4, 4 + up, 'W')
          g.ellipse(2.6, 4, 2.4, 2.4, 'S')
          g.ellipse(2.2, 3, 2, 1.4, 'H')
          g.rim('K', 'R', 'top')
        }),
      ),
    },
  },
}

const stonePillar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['lying', 'standing', 'anointed'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(5, Math.round(width))
    if (pose === 'lying') {
      paint.rect(-Math.round(w / 2), -3, w, 3, C.slate)
      paint.rect(-Math.round(w / 2) + 1, -3, w - 2, 1, C.pale)
      return
    }
    const h = Math.round(w * 1.15)
    const half = Math.max(2, Math.round(w * 0.24))
    paint.rect(-half, -h, half * 2, h, C.slate)
    paint.rect(-half + 1, -h, half * 2 - 2, 1, C.pale)
    paint.rect(-half, -h + 1, 1, h - 2, C.pale)
    if (pose === 'anointed') {
      paint.rect(-half, -h, half * 2, 2, C.gold)
      paint.rect(0, -h + 2, 1, Math.round(h * 0.4), C.gold)
    }
  },
}

export const bethelProps: Record<string, PixelDrawnArt | PixelSpriteArt> = { ladder, 'jacob-asleep': jacobAsleep, 'stone-pillar': stonePillar }
