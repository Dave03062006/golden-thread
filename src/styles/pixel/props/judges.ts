import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 15 in pixel art: the palm of Deborah; Gideon's fleece, dry or wet with dew;
 * the honeycomb Samson found in the lion; and the millstone he turned in the prison at Gaza.
 */

const palmTree: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(10, Math.round(width))
    const h = Math.round(w * 1.6)
    paint.rect(-1, -h + 4, 2, h - 4, C.wood2)
    for (let i = -3; i <= 3; i++) {
      const reach = Math.round((w / 2) * (Math.abs(i) / 3))
      paint.rect(i < 0 ? -reach : 0, -h + 2 + Math.abs(i), Math.max(2, reach), 2, i % 2 ? C.green : C.teal)
    }
    paint.rect(-2, -h + 4, 4, 2, C.wood3)
  },
}

const fleece: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['dry', 'wet'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 3, C.white)
    paint.rect(-half + 1, -4, w - 2, 1, C.pale)
    if (pose === 'wet') for (let x = -half + 1; x < half; x += 2) paint.rect(x, -3 + (x & 1), 1, 1, C.cyan)
  },
}

const honeycomb: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(3, Math.round(width))
    paint.rect(-Math.floor(w / 2), -w, w, w, C.orange)
    paint.rect(-Math.floor(w / 2) + 1, -w + 1, Math.max(1, w - 2), Math.max(1, w - 2), C.gold)
  },
}

const millstone: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(8, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -3, w, 3, C.slate)
    paint.rect(-half + 1, -5, w - 2, 2, C.pale)
    paint.rect(0, -8, 1, 3, C.wood2)
    paint.rect(1, -9, half, 1, C.wood2)
  },
}

/** Level 16: the sandal handed over at the gate of Bethlehem. */
const sandal: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(4, Math.round(width))
    paint.rect(-Math.floor(w / 2), -1, w, 1, C.wood2)
    paint.rect(-1, -2, 2, 1, C.wood1)
  },
}

/** Level 17: the little vial of oil Samuel poured on Saul's head. */
const oilVial: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint) {
    paint.rect(-1, -4, 2, 4, C.sand)
    paint.rect(-1, -2, 2, 2, C.gold)
    paint.rect(0, -5, 1, 1, C.wood2)
  },
}

/** Level 18: Saul's spear, stuck in the ground by his head. */
const spear: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(8, Math.round(width * 10))
    paint.rect(0, -h + 2, 1, h - 2, C.wood2)
    paint.rect(-1, -h, 3, 2, C.pale)
  },
}

/** Level 19: David's linen robe, spread over the basin to be washed. */
const linenRobe: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(12, Math.round(width))
    const h = Math.round(w * 0.75)
    const half = Math.round(w / 2)
    // Body, sleeves spread out, and the neck.
    paint.rect(-Math.round(w * 0.3), -h, Math.round(w * 0.6), h, C.white)
    paint.rect(-half, -Math.round(h * 0.8), w, Math.round(h * 0.25), C.white)
    paint.rect(-2, -h, 4, 1, C.pale)
    for (const fx of [-0.15, 0, 0.15]) paint.rect(Math.round(w * fx), -h + 3, 1, h - 4, C.pale)
  },
}

/** Level 19: a dark stain on David's robe, washed away one by one. */
const stain: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const r = Math.max(2, Math.round(width / 3))
    paint.rect(-r, -r + 1, r * 2, r * 2 - 2, C.wood0)
    paint.rect(-r + 1, -r, r * 2 - 2, r * 2, C.wood0)
  },
}

/** Level 19: a branch of hyssop, for sprinkling. */
const hyssop: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const h = Math.max(8, Math.round(width * 3))
    paint.rect(0, -h, 1, h, C.green)
    for (let y = -h + 2; y < -1; y += 2) paint.rect(y % 4 ? 1 : -1, y, 1, 1, C.lime)
    paint.rect(0, -h - 1, 1, 1, C.white)
  },
}

/** Level 19: snow falling over Jerusalem, the width of the scene. */
const snowfall: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 6,
  loop: 6,
  draw(paint, { width, time }) {
    const w = Math.round(width)
    const h = Math.round(width * 0.5625)
    for (let i = 0; i < 70; i++) {
      const x = ((i * 97) % w) - Math.round(w / 2)
      const y = ((((i * 53) % h) + Math.floor(time * 6) * (1 + (i % 2))) % h) - Math.round(h / 2)
      paint.rect(x, y, 1, 1, i % 5 ? C.white : C.pale)
    }
  },
}

/** Level 20: the shofar, a ram's-horn trumpet. */
const shofar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    for (let x = -half; x < half; x++) paint.rect(x, Math.round(((x + half) / w - 0.5) ** 2 * 4) - 1, 1, x > half - 3 ? 3 : 2, C.sand)
  },
}

/** Level 20: a pair of bronze cymbals. */
const cymbals: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const r = Math.max(2, Math.round(width / 4))
    paint.rect(-r * 2, -1, r * 2 - 1, 2, C.gold)
    paint.rect(1, -1, r * 2 - 1, 2, C.gold)
    paint.rect(-r - 1, -2, 1, 1, C.wood3)
    paint.rect(r, -2, 1, 1, C.wood3)
  },
}

/** Level 20: a stone gateway arch, unfinished, with a gap at the head of the corner. */
const gateArch: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(20, Math.round(width))
    const k = w / 200
    const px = (v: number) => Math.round(v * k)
    // Two pillars, and the arch springing from them, with the gap at the top.
    paint.rect(px(-90), px(-96), px(38), px(96), C.pale)
    paint.rect(px(52), px(-96), px(38), px(96), C.pale)
    paint.rect(px(-86), px(-128), px(66), px(32), C.pale)
    paint.rect(px(20), px(-128), px(66), px(32), C.pale)
    paint.rect(px(-52), px(-100), px(32), px(28), C.pale)
    paint.rect(px(20), px(-100), px(32), px(28), C.pale)
    for (const y of [-80, -48, -16]) {
      paint.rect(px(-90), px(y), px(38), 1, C.slate)
      paint.rect(px(52), px(y), px(38), 1, C.slate)
    }
  },
}

/** Level 20: the cornerstone, the stone the builders rejected. */
const cornerstone: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  draw(paint, { width }) {
    const half = Math.max(2, Math.round(width / 2))
    paint.rect(-half, -half + 1, half * 2, half * 2 - 1, C.white)
    paint.rect(-half, -half, half * 2, 1, C.gold)
  },
}

export const judgesProps: Record<string, PixelDrawnArt> = { 'palm-tree': palmTree, fleece, honeycomb, millstone, sandal, 'oil-vial': oilVial, spear, 'linen-robe': linenRobe, stain, hyssop, snowfall, shofar, cymbals, 'gate-arch': gateArch, cornerstone }
