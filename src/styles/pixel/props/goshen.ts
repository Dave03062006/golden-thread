import { C } from '../palette'
import type { PixelDrawnArt } from '../art'

/** Props of Level 5, Episode 6 in pixel art: the Egyptian wagon. */

const wagon: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'walk'],
  anchor: 'base',
  fps: 6,
  loop: 1,
  draw(paint, { width, facing, pose, time }) {
    const w = Math.max(14, Math.round(width))
    const bump = pose === 'walk' && Math.floor(time * 6) % 2 ? -1 : 0
    paint.rect(-Math.round(w * 0.38), -Math.round(w * 0.42) + bump, Math.round(w * 0.76), Math.round(w * 0.16), C.wood3)
    paint.rect(-Math.round(w * 0.38), -Math.round(w * 0.36) + bump, Math.round(w * 0.76), 1, C.gold)
    paint.rect(-Math.round(w * 0.3), -Math.round(w * 0.52) + bump, Math.round(w * 0.24), Math.round(w * 0.1), C.sand)
    paint.rect(Math.round(w * 0.04), -Math.round(w * 0.55) + bump, Math.round(w * 0.24), Math.round(w * 0.13), C.sand)
    const pole = Math.round(w * 0.2)
    paint.rect(facing < 0 ? -Math.round(w * 0.38) - pole : Math.round(w * 0.38), -Math.round(w * 0.3), pole, 1, C.wood2)
    for (const cx of [-Math.round(w * 0.2), Math.round(w * 0.22)]) {
      const r = Math.round(w * 0.13)
      for (let a = 0; a < 12; a++) paint.rect(cx + Math.round(Math.cos((a / 12) * Math.PI * 2) * r), -r - 1 + Math.round(Math.sin((a / 12) * Math.PI * 2) * r), 1, 1, C.wood1)
    }
  },
}

export const goshenProps: Record<string, PixelDrawnArt> = { wagon }
