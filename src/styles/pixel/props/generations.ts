import type { PixelDrawnArt, PixelPropArt } from '../art'
import { C } from '../palette'
import { disc } from './garden'

/**
 * Props of the generations from Adam to Noah (Episode 6) in pixel art: the city, the
 * forge, the lyre and pipe, and the family tree with its name-leaves and glowing root.
 */

const TAU = Math.PI * 2

/** The first city: walls and towers, growing up from the plain. */
const city: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { grow, width }) {
    const g = Math.min(1, Math.max(0, grow))
    if (g < 0.05) return
    const w = Math.round(width / 2)
    const s = width / 260
    const h = (units: number) => Math.round(units * s * g)
    paint.rect(-w, -h(50), w * 2, h(50), C.sand2)
    paint.rect(-w, -h(50), w * 2, 1, C.sand)
    // Towers, and the tall gate tower in the middle.
    for (const [x, t] of [
      [-90, 66],
      [-10, 80],
      [70, 62],
    ] as const) {
      paint.rect(Math.round(x * s), -h(t), Math.round(24 * s), h(t), C.sand2)
      paint.rect(Math.round(x * s), -h(t), Math.round(24 * s), 1, C.sand)
    }
    paint.rect(-1, -h(22), 3, h(22), C.wood0)
    for (const x of [-100, -60, -30, 30, 100]) paint.rect(Math.round(x * s), -h(30), 1, 2, C.wood1)
  },
}

/** A forge: fire, anvil, and sparks with each blow of the hammer. */
const forge: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 8,
  loop: 1.25,
  anchor: 'base',
  draw(paint, { time, width }) {
    const s = width / 80
    const flicker = 0.75 + 0.25 * Math.sin(time * TAU * 2.3)
    disc(paint, Math.round(-20 * s), Math.round(-10 * s), 16 * s, C.orange, 0.35 * flicker)
    paint.rect(Math.round(-30 * s), Math.round(-14 * s), Math.round(20 * s), Math.round(14 * s), C.dslate)
    paint.rect(Math.round(-24 * s), Math.round(-20 * s), Math.round(8 * s), Math.round(6 * s), C.gold)
    paint.rect(Math.round(6 * s), Math.round(-16 * s), Math.round(26 * s), Math.round(4 * s), C.slate)
    paint.rect(Math.round(12 * s), Math.round(-12 * s), Math.round(12 * s), Math.round(12 * s), C.dslate)
    const t = (time % 1.25) / 1.25
    if (t < 0.6) {
      const rise = Math.round(t * 10)
      for (const [x, y] of [
        [16, -22],
        [22, -26],
        [12, -28],
      ] as const)
        paint.rect(Math.round(x * s), Math.round(y * s) - rise, 1, 1, C.gold)
    }
  },
}

/** A lyre and a pipe, with a note rising. */
const lyre: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 3,
  anchor: 'base',
  draw(paint, { time, width }) {
    const s = width / 60
    const x = (u: number) => Math.round(u * s)
    paint.rect(x(-20), x(-40), 2, x(38), C.wood3)
    paint.rect(x(4), x(-40), 2, x(38), C.wood3)
    paint.rect(x(-20), x(-40), x(26), 2, C.wood2)
    for (const u of [-14, -8, -2]) paint.rect(x(u), x(-38), 1, x(34), C.sand)
    for (let i = 0; i < x(26); i++) paint.rect(x(12) + Math.round(i * 0.55), -i - 2, 2, 1, C.sand2)
    const t = (time % 3) / 3
    if (t < 0.8) paint.rect(x(-6), x(-48) - Math.round(t * 8), 2, 2, C.white)
  },
}

/** The great family tree: its trunk and roots. Each name's branch is its own prop. */
const familyTree: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { width }) {
    const s = width / 200
    const height = Math.round(260 * s)
    paint.rect(-2, -height, 4, height, C.wood2)
    paint.rect(-2, -height, 1, height, C.wood3)
    paint.rect(-Math.round(30 * s), -2, Math.round(60 * s), 2, C.wood1)
  },
}

/** One branch, growing out from where it joins the trunk (facing left sends it the other way). */
const treeBranch: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 0,
  anchor: 'base',
  draw(paint, { grow, width, facing }) {
    const g = Math.min(1, Math.max(0, grow))
    if (g < 0.05) return
    const s = width / 140
    const reach = Math.round(60 * s * g)
    for (let k = 0; k <= reach; k++) {
      const t = k / (60 * s)
      paint.rect(facing * k, -Math.round(t * t * 18 * s) - Math.round(t * 2 * s), 1, 1, C.wood2)
    }
  },
}

/** A glowing leaf on the family tree, one for each name placed. */
const nameLeaf: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 2.5,
  draw(paint, { time, width }) {
    disc(paint, 0, 0, width * 0.45, C.gold, 0.3 * (0.75 + 0.25 * Math.sin(time * TAU * 0.4)))
    paint.rect(-1, -3, 3, 6, C.lime)
    paint.rect(0, -4, 1, 8, C.green)
  },
}

/** The tree's root, glowing. */
const treeRoot: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 3,
  loop: 3.4,
  draw(paint, { time, width }) {
    const pulse = 0.75 + 0.25 * Math.sin(time * TAU * 0.3)
    const rx = width / 2
    for (let y = -Math.round(rx * 0.35); y <= Math.round(rx * 0.35); y++) {
      const half = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y / (rx * 0.35)) ** 2)))
      paint.dither(-half, y, half * 2 + 1, 1, C.gold, 0.45 * pulse)
    }
  },
}

export const generationsProps: Record<string, PixelPropArt> = { city, forge, lyre, 'family-tree': familyTree, 'tree-branch': treeBranch, 'name-leaf': nameLeaf, 'tree-root': treeRoot }
