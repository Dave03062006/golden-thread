import type { PixelDrawnArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'

/**
 * Props of Level 12 · Forty Years in the Wilderness in pixel art: the bronze serpent on its
 * pole, and the small dark serpents; a staff, dry, budded, or a king's scepter; the cluster of
 * grapes on its pole; a quail; and Balaam riding his donkey, walking or lying down. The shapes
 * follow the paper version.
 */

/** Draws in a prop's own units, `w` × `h` with its base at the bottom, scaled to `width` art pixels. */
function units(paint: Painter, width: number, w: number, h: number) {
  const u = width / w
  return (x: number, y: number, rw: number, rh: number, color: string) => {
    const x0 = Math.round((x - w / 2) * u)
    const y0 = Math.round((y - h) * u)
    paint.rect(x0, y0, Math.max(1, Math.round((x + rw - w / 2) * u) - x0), Math.max(1, Math.round((y + rh - h) * u) - y0), color)
  }
}

const bronzeSerpent: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['pole', 'snake'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    if (pose === 'snake') {
      const r = units(paint, width, 40, 12)
      r(2, 8, 8, 3, C.wood1)
      r(9, 6, 10, 3, C.rose)
      r(18, 8, 10, 3, C.wood1)
      r(27, 5, 9, 4, C.rose)
      r(34, 5, 3, 2, C.gold)
      return
    }
    // A tall pole, and the serpent of bronze wound about its top.
    const r = units(paint, width, 40, 200)
    r(19, 20, 3, 180, C.wood2)
    r(10, 26, 21, 4, C.wood3)
    for (let i = 0; i < 4; i++) r(i % 2 ? 22 : 13, 34 + i * 10, 7, 5, C.orange)
    r(24, 18, 9, 6, C.orange)
    r(30, 19, 3, 2, C.gold)
  },
}

const rod: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['dry', 'budded', 'scepter'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 20, 160)
    if (pose === 'scepter') {
      r(9, 30, 3, 130, C.gold)
      r(5, 18, 11, 12, C.gold)
      r(8, 14, 5, 4, C.rose)
      return
    }
    r(9, 4, 3, 156, C.wood2)
    if (pose === 'budded') {
      for (const [x, y, c] of [[3, 14, C.white], [13, 22, C.pale], [4, 34, C.lime], [13, 46, C.white], [2, 58, C.lime], [12, 70, C.white]] as const) r(x, y, 6, 6, c)
      for (const [x, y] of [[6, 26], [10, 52]] as const) r(x, y, 4, 6, C.sand)
    }
  },
}

const grapeCluster: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width }) {
    const r = units(paint, width, 100, 50)
    // The pole carried between two men, and the great cluster hanging from it.
    r(0, 6, 100, 3, C.wood2)
    r(30, 9, 40, 10, C.purple)
    r(35, 19, 30, 10, C.purple)
    r(42, 29, 16, 8, C.purple)
    r(46, 37, 8, 6, C.purple)
    for (const [x, y] of [[33, 11], [44, 21], [52, 13], [60, 23], [48, 31]] as const) r(x, y, 4, 3, C.rose)
    r(46, 3, 8, 6, C.green)
  },
}

const quail: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 0,
  draw(paint, { width }) {
    const r = units(paint, width, 20, 14)
    r(4, 5, 12, 7, C.wood3)
    r(13, 3, 5, 5, C.wood3)
    r(6, 7, 6, 2, C.sand)
    r(17, 5, 2, 1, C.gold)
  },
}

const balaamRiding: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['walk', 'lie'],
  anchor: 'base',
  fps: 3,
  loop: 2,
  draw(paint, { width, pose, time }) {
    const r = units(paint, width, 80, 90)
    const lying = pose === 'lie'
    const down = lying ? 22 : 0
    const step = !lying && Math.floor(time * 3) % 2 ? 2 : 0
    // The donkey: legs, body, neck and head, long ears, facing right.
    if (!lying) for (const x of [16, 24, 50, 58]) r(x + (x % 16 ? step : -step), 66, 4, 24, C.slate)
    r(12, 46 + down, 54, 22, C.slate)
    r(58, 34 + down, 10, 18, C.slate)
    r(62, 28 + down, 16, 12, C.slate)
    r(64, 22 + down, 3, 8, C.dslate)
    r(70, 22 + down, 3, 8, C.dslate)
    r(74, 34 + down, 3, 3, C.ink)
    // Balaam on its back, in his robe, with his staff.
    r(28, 18 + down, 18, 32, C.purple)
    r(30, 8 + down, 13, 12, C.wood1)
    r(28, 4 + down, 17, 6, C.gold)
    r(22, 10 + down, 3, 42, C.wood2)
  },
}

export const wildernessProps: Record<string, PixelDrawnArt> = { 'bronze-serpent': bronzeSerpent, rod, 'grape-cluster': grapeCluster, quail, 'balaam-riding': balaamRiding }
