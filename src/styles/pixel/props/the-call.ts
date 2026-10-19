import type { PixelDrawnArt } from '../art'
import { C, hash } from '../palette'

/**
 * Props of Level 3 in pixel art: the great oak (at Shechem, and the oaks of Mamre), and
 * Abram's shepherd's staff.
 */

/** A great spreading oak: a stout trunk and a broad, lumpy crown. */
const greatOak: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = width
    const h = w
    const trunk = Math.max(2, Math.round(w * 0.12))
    paint.rect(-Math.round(trunk / 2), -Math.round(h * 0.4), trunk, Math.round(h * 0.4), C.wood1)
    paint.rect(-Math.round(trunk / 2), -Math.round(h * 0.4), 1, Math.round(h * 0.4), C.wood2)
    const blobs: [number, number, number][] = [
      [-0.24, -0.6, 0.22],
      [0, -0.72, 0.27],
      [0.26, -0.6, 0.22],
      [-0.12, -0.47, 0.19],
      [0.13, -0.47, 0.19],
    ]
    for (const [bx, by, br] of blobs) {
      const r = br * w
      const cx = bx * w
      const cy = by * h
      for (let y = Math.floor(cy - r); y <= cy + r; y++) {
        const half = Math.round(Math.sqrt(Math.max(0, r * r - (y - cy) ** 2)))
        paint.rect(Math.round(cx - half), y, half * 2, 1, C.teal)
        for (let x = Math.round(cx - half); x < cx + half; x++) if (y < cy && hash(x * 3.1 + y * 7.9) > 0.75) paint.rect(x, y, 1, 1, C.green)
      }
    }
  },
}

/** A shepherd's staff with a crook at the top. */
const staff: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(8, Math.round(width * 4))
    paint.rect(0, -h, 1, h, C.wood2)
    paint.rect(1, -h, 2, 1, C.wood2)
    paint.rect(3, -h + 1, 1, 2, C.wood2)
  },
}

export const theCallProps: Record<string, PixelDrawnArt> = { 'great-oak': greatOak, 'walking-staff': staff }
