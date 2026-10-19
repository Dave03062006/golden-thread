import type { PixelDrawnArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'

/**
 * Props of Level 2, Episode 6 in pixel art: the stepped tower raised terrace by terrace,
 * the bricks and the kilns, the builders' words in many scripts, and the families setting
 * out on the map. Drawn to the same boxes as the paper version.
 */

const TIERS = 6

/** A painter that takes the paper version's box units, scaled to the prop's width. */
function boxed(paint: Painter, width: number, boxWidth: number, boxHeight: number) {
  const u = width / boxWidth
  return {
    u,
    box(x0: number, y0: number, x1: number, y1: number, color: string) {
      const x = Math.round(x0 * u - width / 2)
      const y = Math.round(y0 * u - boxHeight * u)
      paint.rect(x, y, Math.max(1, Math.round(x1 * u - width / 2) - x), Math.max(1, Math.round(y1 * u - boxHeight * u) - y), color)
    },
  }
}

const ziggurat: PixelDrawnArt = {
  kind: 'drawn',
  poses: Array.from({ length: TIERS + 1 }, (_, n) => `t${n}`),
  anchor: 'base',
  draw(paint, { width, pose }) {
    const d = boxed(paint, width, 600, 520)
    d.box(10, 510, 590, 520, C.wood1)
    const built = Number(pose.slice(1))
    for (let k = 0; k < built; k++) {
      const w = 560 - k * 80
      const x = 300 - w / 2
      const y = 520 - (k + 1) * 70
      d.box(x, y, x + w, y + 70, C.wood2)
      for (let r = 1; r < 4; r++) d.box(x, y + r * 17.5, x + w, y + r * 17.5 + 2 / d.u, C.wood1)
      d.box(x, y, x + w, y + 2 / d.u, C.wood3)
      d.box(288, y, 312, y + 70, C.wood3)
    }
  },
}

const brickLoad: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const d = boxed(paint, width, 120, 90)
    d.box(59, 0, 61, 34, C.wood1)
    d.box(6, 82, 114, 90, C.wood1)
    for (const [r, n] of [
      [0, 4],
      [1, 4],
      [2, 2],
    ] as const)
      for (let c = 0; c < n; c++) {
        const x = 12 + (c + (r === 2 ? 1 : 0)) * 25 + (r % 2) * 12
        d.box(x, 66 - r * 14, x + 23, 66 - r * 14 + 13, (r + c) % 2 ? C.wood2 : C.wood3)
      }
  },
}

const brick: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(3, width)
    const h = Math.max(2, Math.round(w * 0.4))
    paint.rect(-Math.round(w / 2), -h, w, h, C.wood2)
    paint.rect(-Math.round(w / 2), -h, w, 1, C.wood3)
  },
}

const brickPile: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const d = boxed(paint, width, 140, 70)
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 5 - r; c++) {
        const x = 6 + c * 26 + r * 13
        d.box(x, 54 - r * 16, x + 24, 54 - r * 16 + 15, (r + c) % 2 ? C.wood2 : C.wood3)
      }
  },
}

const kiln: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 6,
  loop: 1,
  anchor: 'base',
  draw(paint, { width, time }) {
    const d = boxed(paint, width, 140, 150)
    for (let y = 40; y < 150; y += 4) {
      const half = y < 90 ? 60 * Math.sqrt(1 - ((90 - y) / 52) ** 2) : 60
      d.box(70 - half, y, 70 + half, y + 4, y < 50 ? C.sand : C.sand2)
    }
    d.box(50, 118, 90, 150, C.ink)
    const tick = Math.floor(time * 6) % 3
    d.box(56, 130 - tick * 3, 84, 150, C.orange)
    d.box(64, 138 - tick * 2, 76, 150, C.gold)
  },
}

/** Words in the air, in the look of many scripts: wedges, picture signs, letters and curls. */
const scriptWords: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['wedges', 'signs', 'letters', 'curls'],
  anchor: 'center',
  draw(paint, { width, pose }) {
    const w = Math.max(16, width)
    const h = Math.max(6, Math.round(w * 0.23))
    paint.rect(-Math.round(w / 2) + 1, -Math.round(h / 2), w - 2, h, C.white)
    paint.rect(-Math.round(w / 2), -Math.round(h / 2) + 1, w, h - 2, C.white)
    const n = Math.floor((w - 6) / 5)
    for (let i = 0; i < n; i++) {
      const x = -Math.round(w / 2) + 4 + i * 5
      const y = -Math.round(h / 2) + 2
      const g = h - 4
      if (pose === 'wedges') {
        paint.rect(x, y, 3, 1, C.ink)
        paint.rect(x + 1, y, 1, g, C.ink)
      } else if (pose === 'signs') {
        if (i % 3 === 0) paint.rect(x, y, 3, g, C.ink)
        else if (i % 3 === 1) paint.rect(x, y + g - 1, 3, 1, C.ink)
        else paint.rect(x + 1, y, 1, g, C.ink)
        paint.rect(x, y + 1, 3, 1, C.ink)
      } else if (pose === 'letters') {
        paint.rect(x, y, 1, g, C.ink)
        paint.rect(x, y + (i % 2 ? 0 : g - 1), 3, 1, C.ink)
        paint.rect(x + 2, y + Math.floor(g / 2), 1, 1, C.ink)
      } else {
        paint.rect(x, y + (i % 2), 3, 1, C.ink)
        paint.rect(x + (i % 2 ? 2 : 0), y + 1, 1, g - 2, C.ink)
        paint.rect(x, y + g - 1 - (i % 2), 3, 1, C.ink)
      }
    }
  },
}

/** A family on the map: three travelers and a pack animal, with a banner in their forefather's color. */
const BANNERS: Record<string, string> = { japheth: C.teal, ham: C.wood3, shem: C.navy }
const familyBand: PixelDrawnArt = {
  kind: 'drawn',
  poses: Object.keys(BANNERS),
  anchor: 'base',
  draw(paint, { width, pose }) {
    const d = boxed(paint, width, 120, 110)
    for (const [x, i] of [
      [20, 0],
      [46, 1],
      [70, 2],
    ] as const) {
      d.box(x - 8, 38 + i * 4, x + 8, 54 + i * 4, C.wood1)
      d.box(x - 9, 56 + i * 4, x + 9, 110, i === 1 ? C.purple : C.slate)
    }
    d.box(84, 76, 112, 92, C.wood2)
    d.box(84, 92, 92, 110, C.wood2)
    d.box(104, 92, 112, 110, C.wood2)
    d.box(106, 68, 118, 80, C.wood2)
    d.box(6, 4, 10, 110, C.wood1)
    d.box(10, 6, 44, 24, BANNERS[pose] ?? C.gold)
    d.box(10, 6, 44, 8, C.gold)
  },
}

export const theTowerOfBabelProps: Record<string, PixelDrawnArt> = { ziggurat, 'brick-load': brickLoad, brick, 'brick-pile': brickPile, kiln, 'script-words': scriptWords, 'family-band': familyBand }
