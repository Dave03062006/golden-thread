import type { PixelDrawnArt } from '../art'
import type { Painter } from '../frame'
import { C } from '../palette'

/**
 * Props of Level 11 · The Tabernacle and the Holy Life in pixel art: the pieces of the
 * tabernacle, each drawn in its own place in one picture 400 units wide (see
 * content/levels/11-the-tabernacle-and-the-holy-life/stage.ts); the gifts for the
 * sanctuary; the holy garments and their rail; the signs of the feasts; the altar's flame;
 * a dark stone; the plan drawn in light; and a row of standing grain. The shapes follow the
 * paper version.
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

const tabernaclePiece: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['frames', 'coverings', 'tent', 'ark', 'veil', 'table', 'lampstand', 'incense', 'screen', 'laver', 'altar', 'court'],
  anchor: 'base',
  // A piece shown close up is the size of the whole tabernacle picture, mostly empty: a few
  // dozen blocks drawn straight onto the screen cost less than keeping a picture that big.
  live: true,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 400, 170)
    const curtain = (x: number) => {
      r(x, 44, 6, 106, C.blue)
      r(x, 44, 2, 106, C.purple)
      r(x + 4, 44, 2, 106, C.rose)
    }
    switch (pose) {
      case 'frames':
        r(40, 44, 210, 106, C.wood2)
        for (let x = 40; x <= 248; x += 10) r(x, 44, 2, 106, C.gold)
        r(40, 146, 212, 4, C.pale)
        break
      case 'coverings':
        r(34, 30, 222, 14, C.rose)
        r(34, 30, 222, 4, C.wood1)
        r(34, 44, 6, 106, C.rose)
        break
      case 'tent':
        r(36, 32, 218, 118, C.wood2)
        r(36, 32, 218, 8, C.rose)
        for (let x = 58; x < 254; x += 22) r(x, 40, 2, 110, C.wood1)
        break
      case 'ark':
        r(46, 141, 48, 2, C.wood3)
        r(55, 134, 30, 16, C.gold)
        r(53, 131, 34, 4, C.white)
        r(56, 119, 7, 12, C.gold)
        r(77, 119, 7, 12, C.gold)
        r(60, 116, 20, 3, C.gold)
        break
      case 'veil':
        curtain(101)
        for (let y = 60; y < 150; y += 22) r(103, y, 2, 3, C.gold)
        break
      case 'table':
        for (const [x, y] of [[129, 122], [135, 122], [141, 122], [147, 122], [132, 118], [144, 118]] as const) r(x, y, 5, 4, C.sand)
        r(127, 127, 27, 3, C.gold)
        r(129, 130, 2, 20, C.gold)
        r(150, 130, 2, 20, C.gold)
        break
      case 'lampstand':
        r(172, 147, 13, 3, C.gold)
        r(177, 104, 3, 44, C.gold)
        for (let k = 1; k <= 3; k++) {
          r(178 - 6 * k, 104, 2, 4 + k * 5, C.gold)
          r(178 + 6 * k, 104, 2, 4 + k * 5, C.gold)
          r(178 - 6 * k, 107 + k * 5, 12 * k + 2, 2, C.gold)
        }
        for (let k = -3; k <= 3; k++) r(178 + 6 * k, 99, 2, 4, k % 2 ? C.orange : C.gold)
        break
      case 'incense':
        r(208, 130, 14, 3, C.gold)
        r(210, 133, 10, 17, C.gold)
        r(214, 120, 2, 9, C.pale)
        break
      case 'screen':
        curtain(247)
        break
      case 'laver':
        r(276, 137, 18, 5, C.wood3)
        r(277, 137, 16, 1, C.sky)
        r(283, 142, 4, 8, C.wood3)
        r(279, 148, 12, 2, C.wood3)
        break
      case 'altar':
        r(318, 126, 34, 24, C.wood3)
        r(318, 138, 34, 2, C.wood1)
        r(317, 121, 5, 5, C.wood3)
        r(348, 121, 5, 5, C.wood3)
        break
      case 'court':
        r(0, 152, 400, 16, C.white)
        r(355, 152, 40, 16, C.blue)
        r(362, 152, 6, 16, C.purple)
        r(376, 152, 6, 16, C.rose)
        for (let x = 0; x <= 398; x += 25) r(x, 149, 2, 21, C.wood2)
        break
    }
  },
}

const gift: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['gold', 'silver', 'bronze', 'yarn', 'linen', 'goats-hair', 'rams-skins', 'acacia', 'oil', 'spices', 'onyx', 'flour', 'heap'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 40, 40)
    switch (pose) {
      case 'gold':
        for (const [x, y] of [[8, 30], [18, 32], [26, 28], [14, 24], [22, 22]] as const) {
          r(x, y, 7, 2, C.gold)
          r(x, y + 4, 7, 2, C.gold)
          r(x, y, 2, 6, C.gold)
          r(x + 5, y, 2, 6, C.gold)
        }
        break
      case 'silver':
        for (const [x, y] of [[6, 32], [20, 32], [13, 26]] as const) r(x, y, 14, 6, C.pale)
        r(13, 26, 14, 2, C.white)
        break
      case 'bronze':
        r(6, 30, 28, 8, C.wood3)
        r(10, 22, 20, 8, C.orange)
        r(12, 22, 16, 2, C.sand)
        break
      case 'yarn':
        r(4, 24, 10, 14, C.blue)
        r(15, 24, 10, 14, C.purple)
        r(26, 24, 10, 14, C.rose)
        break
      case 'linen':
        r(5, 26, 30, 12, C.white)
        r(5, 31, 30, 2, C.pale)
        break
      case 'goats-hair':
        r(5, 24, 30, 14, C.dslate)
        r(5, 24, 30, 3, C.ink)
        break
      case 'rams-skins':
        r(4, 28, 32, 10, C.rose)
        r(8, 22, 24, 6, C.wood1)
        break
      case 'acacia':
        for (let y = 26; y < 38; y += 4) r(2, y, 36, 3, y % 8 ? C.wood3 : C.wood2)
        break
      case 'oil':
        r(13, 18, 14, 20, C.wood2)
        r(16, 14, 8, 4, C.wood2)
        r(15, 22, 10, 3, C.gold)
        break
      case 'spices':
        r(6, 30, 28, 8, C.wood2)
        r(8, 26, 8, 4, C.orange)
        r(16, 25, 8, 5, C.rose)
        r(24, 26, 8, 4, C.gold)
        break
      case 'onyx':
        for (const [x, y, c] of [[6, 32, C.ink], [16, 30, C.teal], [26, 32, C.rose], [11, 25, C.green], [21, 24, C.sky]] as const) r(x, y, 8, 6, c)
        break
      case 'flour':
        r(6, 30, 28, 8, C.wood2)
        r(8, 25, 24, 5, C.white)
        break
      case 'heap':
        r(0, 28, 40, 12, C.wood3)
        r(4, 20, 32, 8, C.gold)
        r(10, 12, 20, 8, C.rose)
        r(15, 6, 10, 6, C.blue)
        r(6, 30, 10, 4, C.pale)
        r(24, 31, 12, 4, C.white)
        break
    }
  },
}

const vestment: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['rail', 'coat', 'girdle', 'robe', 'ephod', 'breastpiece', 'turban', 'plate'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 40, 60)
    switch (pose) {
      case 'rail':
        r(0, 44, 40, 1, C.wood2)
        r(1, 44, 1, 16, C.wood2)
        r(38, 44, 1, 16, C.wood2)
        break
      case 'coat':
        r(10, 8, 20, 48, C.white)
        r(4, 8, 32, 8, C.white)
        break
      case 'girdle':
        r(17, 8, 6, 44, C.blue)
        r(17, 8, 2, 44, C.purple)
        r(21, 8, 2, 44, C.rose)
        break
      case 'robe':
        r(9, 8, 22, 46, C.blue)
        r(4, 8, 32, 8, C.blue)
        for (let x = 10; x < 30; x += 4) r(x, 54, 2, 2, x % 8 ? C.gold : C.rose)
        break
      case 'ephod':
        r(10, 14, 20, 26, C.gold)
        r(10, 14, 20, 3, C.purple)
        r(9, 8, 6, 6, C.ink)
        r(25, 8, 6, 6, C.ink)
        break
      case 'breastpiece':
        r(8, 16, 24, 26, C.gold)
        for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) r(11 + col * 7, 19 + row * 6, 4, 4, [C.rose, C.green, C.sky, C.purple][row]!)
        break
      case 'turban':
        r(8, 30, 24, 16, C.white)
        r(8, 36, 24, 2, C.pale)
        break
      case 'plate':
        r(8, 34, 24, 10, C.gold)
        r(10, 38, 20, 2, C.wood2)
        r(20, 28, 1, 6, C.blue)
        break
    }
  },
}

const feastSign: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['bread', 'sheaf', 'loaves', 'horn', 'veil', 'booth'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 50, 50)
    switch (pose) {
      case 'bread':
        for (let i = 0; i < 4; i++) r(8 + i, 42 - i * 6, 34 - i * 2, 5, i % 2 ? C.sand2 : C.sand)
        break
      case 'sheaf':
        for (let x = 14; x < 36; x += 3) r(x, 8, 2, 40, C.sand2)
        for (let x = 13; x < 37; x += 3) r(x, 4, 3, 8, C.gold)
        r(12, 28, 26, 3, C.wood2)
        break
      case 'loaves':
        r(4, 32, 20, 14, C.sand2)
        r(26, 32, 20, 14, C.sand2)
        r(6, 32, 16, 3, C.sand)
        r(28, 32, 16, 3, C.sand)
        break
      case 'horn':
        r(6, 36, 18, 6, C.sand)
        r(22, 28, 10, 8, C.sand)
        r(30, 18, 8, 12, C.sand2)
        r(36, 10, 8, 10, C.wood3)
        break
      case 'veil':
        r(10, 6, 30, 44, C.blue)
        r(10, 6, 6, 44, C.purple)
        r(34, 6, 6, 44, C.rose)
        r(23, 22, 4, 4, C.gold)
        break
      case 'booth':
        r(4, 14, 2, 36, C.wood2)
        r(44, 14, 2, 36, C.wood2)
        r(0, 6, 50, 10, C.green)
        r(4, 4, 42, 4, C.lime)
        for (let x = 2; x < 50; x += 6) r(x, 16, 3, 4, C.green)
        break
    }
  },
}

const flame: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  // It grows and shrinks with the fire, so it's drawn straight onto the screen.
  live: true,
  draw(paint, { width, time }) {
    const w = Math.max(4, Math.round(width))
    const flicker = Math.round(Math.sin(time * 9) * 1.2)
    const h = Math.round(w * 1.4)
    for (let y = 0; y < h; y++) {
      const half = Math.round((w / 2) * (1 - y / h) * (y % 3 === 0 ? 0.85 : 1))
      paint.rect(-half + (y > h / 2 ? flicker : 0), -y - 1, Math.max(1, half * 2), 1, y < h * 0.3 ? C.gold : y < h * 0.7 ? C.orange : C.rose)
    }
  },
}

const darkStone: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width }) {
    const r = units(paint, width, 30, 20)
    r(3, 8, 24, 12, C.ink)
    r(6, 4, 18, 4, C.dslate)
    r(8, 6, 4, 2, C.slate)
  },
}

const tabernaclePlan: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'center',
  fps: 0,
  draw(paint, { width }) {
    const r = units(paint, width, 200, 110)
    const box = (x: number, y: number, w: number, h: number, c: string) => {
      r(x, y, w, 2, c)
      r(x, y + h - 2, w, 2, c)
      r(x, y, 2, h, c)
      r(x + w - 2, y, 2, h, c)
    }
    // The court, the tent within it, the ark in its innermost room, and the altar before the door.
    box(10, 15, 180, 80, C.gold)
    box(30, 38, 90, 34, C.gold)
    r(52, 38, 2, 34, C.gold)
    r(38, 51, 9, 8, C.white)
    r(150, 49, 14, 12, C.gold)
  },
}

const grainRow: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle', 'edge'],
  anchor: 'base',
  fps: 0,
  draw(paint, { width, pose }) {
    const r = units(paint, width, 200, 40)
    const stalks = (x0: number, x1: number, top: number) => {
      for (let x = x0; x < x1; x += 3) {
        r(x, top + 4, 1, 40 - top - 4, C.sand2)
        r(x, top + ((x * 7) % 3), 2, 4, C.gold)
      }
    }
    if (pose === 'edge') stalks(80, 120, 4)
    else stalks(0, 200, 26)
  },
}

export const tabernacleProps: Record<string, PixelDrawnArt> = {
  'tabernacle-piece': tabernaclePiece,
  gift,
  vestment,
  'feast-sign': feastSign,
  flame,
  'dark-stone': darkStone,
  'tabernacle-plan': tabernaclePlan,
  'grain-row': grainRow,
}
