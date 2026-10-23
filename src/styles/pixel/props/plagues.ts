import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 8 · The Plagues and the Passover in pixel art: the pictures of the nine
 * plagues, each in a round frame; a frog; a swarm of gnats, flies or locusts; the blood on a
 * doorpost or a lintel; the dishes of the Passover table; a bundle of stubble; and the pillar
 * of cloud that is fire by night.
 */

const PICTURES: Record<string, { rows: string[]; colors: Record<string, string> }> = {
  blood: { rows: ['....g....', '...ggg...', '.........', 'rrrrrrrrr', 'rRrrrRrrr', 'rrrrrrrrr', 'rrrRrrrRr'], colors: { g: C.green, r: C.purple, R: C.rose } },
  frogs: { rows: ['.........', '.l.l.....', '.ggg..l.l', 'ggggg.ggg', '....ggggg', '..l.l....', '.ggggg...'], colors: { g: C.green, l: C.lime } },
  gnats: { rows: ['.k...k..k', '...k...k.', 'k..k.k...', '.k....k.k', '..k.k..k.', '.........', 'sssssssss'], colors: { k: C.ink, s: C.sand2 } },
  flies: { rows: ['.w.w.....', '.kkk..w.w', '......kkk', '..w.w....', '..kkk.w.w', '......kkk', '.........'], colors: { k: C.ink, w: C.pale } },
  cattle: { rows: ['.........', '.......ww', '.bbbbbbbb', 'bbbbbbbb.', 'bbbbbbb..', '.........', 'sssssssss'], colors: { b: C.wood3, w: C.white, s: C.sand2 } },
  boils: { rows: ['...sss...', '..srsss..', '...sss...', '..sssss..', '.srssrss.', '.sssssss.', '.ssrssss.'], colors: { s: C.sand, r: C.rose } },
  hail: { rows: ['w...w...w', '..w...w..', 'w...w...w', '...o.....', '..o.o.o..', '.....o...', 'ggggggggg'], colors: { w: C.white, o: C.orange, g: C.green } },
  locusts: { rows: ['..g...g..', '.ggg.ggg.', '.........', '....g....', '...ggg..g', '.......gg', 'lllllllll'], colors: { g: C.wood3, l: C.lime } },
  darkness: { rows: ['kkkkkkkkk', 'kkkkkgkkk', 'kkkkgggkk', 'kkkkkgkkk', 'kkkkkkkkk', 'kkkkkkkkk', 'kkkkkkkkk'], colors: { k: C.ink, g: C.gold } },
}

const plagueSign: PixelDrawnArt = {
  kind: 'drawn',
  poses: Object.keys(PICTURES),
  anchor: 'center',
  draw(paint, { width, pose }) {
    const r = Math.max(7, Math.round(width / 2))
    for (let y = -r; y <= r; y++) {
      const half = Math.round(Math.sqrt(r * r - y * y))
      paint.rect(-half, y, half * 2 + 1, 1, C.white)
      paint.rect(-half, y, 1, 1, C.gold)
      paint.rect(half, y, 1, 1, C.gold)
    }
    paint.rect(-Math.round(r / 2), -r, r, 1, C.gold)
    paint.rect(-Math.round(r / 2), r, r, 1, C.gold)
    const p = PICTURES[pose]
    if (!p) return
    const s = Math.max(1, Math.floor((r * 2 - 2) / 10))
    p.rows.forEach((row, y) => [...row].forEach((c, x) => c !== '.' && paint.rect(Math.round((x - 4.5) * s), Math.round((y - 3.5) * s), s, s, p.colors[c]!)))
  },
}

const frog: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  fps: 4,
  loop: 2,
  draw(paint, { width, time }) {
    const w = Math.max(5, Math.round(width))
    const hop = time % 2 > 1.75 ? 1 : 0
    const half = Math.round(w / 2)
    paint.rect(-half, -2 - hop, w, 2, C.green)
    paint.rect(-half + 1, -3 - hop, w - 3, 1, C.green)
    paint.rect(half - 2, -4 - hop, 2, 1, C.lime)
    paint.rect(half - 1, -4 - hop, 1, 1, C.ink)
  },
}

/** Where the specks of a swarm are, across a box 1 wide and 0.6 high. */
const scatter = (i: number, salt: number, span: number) => {
  let h = Math.imul(i * 2 + salt, 0x27d4eb2d)
  h ^= h >>> 15
  return (Math.imul(h, 0x2c1b3c6d) >>> 0) % span
}
const SPECKS = Array.from({ length: 40 }, (_, i) => [scatter(i, 1, 97) / 97 - 0.5, scatter(i, 7, 57) / 57 / 1.6 - 0.3] as const)

const swarm: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['gnats', 'flies', 'locusts'],
  anchor: 'center',
  fps: 6,
  loop: 2,
  draw(paint, { width, pose, time }) {
    const w = Math.max(20, Math.round(width))
    const step = pose === 'gnats' ? 1 : pose === 'flies' ? 2 : 3
    const t = Math.floor(time * 6)
    SPECKS.forEach(([sx, sy], i) => {
      if (i % step) return
      const x = Math.round(sx * w) + ((t + i) % 3) - 1
      const y = Math.round(sy * w) + ((t + i * 2) % 2)
      if (pose === 'gnats') paint.rect(x, y, 1, 1, C.ink)
      else if (pose === 'flies') {
        paint.rect(x, y, 2, 1, C.ink)
        paint.rect(x, y - 1, 1, 1, C.pale)
      } else {
        paint.rect(x, y, 3, 1, C.wood3)
        paint.rect(x + 1, y - 1, 2, 1, C.sand2)
      }
    })
  },
}

const bloodMark: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['post', 'lintel'],
  anchor: 'center',
  draw(paint, { width, pose }) {
    const w = Math.max(2, Math.round(width))
    if (pose === 'post') {
      const h = w * 5
      paint.rect(-1, -Math.round(h / 2), 2, h, C.purple)
      paint.rect(0, -Math.round(h / 2) + 2, 1, 3, C.rose)
    } else {
      const span = w + 1
      paint.rect(-Math.round(span / 2), -1, span, 2, C.purple)
      paint.rect(-Math.round(span / 2) + 2, -1, 3, 1, C.rose)
    }
  },
}

const passoverDish: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['lamb', 'bread', 'herbs'],
  anchor: 'base',
  draw(paint, { width, pose }) {
    const w = Math.max(8, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -1, w, 1, C.wood1)
    paint.rect(-half + 1, -2, w - 2, 1, C.wood2)
    if (pose === 'lamb') {
      paint.rect(-half + 2, -4, w - 4, 2, C.wood1)
      paint.rect(-half + 3, -5, w - 6, 1, C.orange)
    } else if (pose === 'bread') {
      paint.rect(-half + 1, -3, half - 1, 1, C.sand)
      paint.rect(1, -4, half - 2, 1, C.sand2)
      paint.rect(-half + 2, -3, 1, 1, C.wood2)
    } else {
      for (let x = -half + 2; x < half - 1; x += 2) {
        paint.rect(x, -4, 1, 2, x % 4 ? C.green : C.lime)
        paint.rect(x + (x % 4 ? 1 : -1), -5, 1, 1, C.green)
      }
    }
  },
}

const stubble: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(6, Math.round(width))
    const half = Math.round(w / 2)
    paint.rect(-half, -1, w, 1, C.wood2)
    for (let x = -half; x < half; x += 2) {
      const h = 3 + ((x * 7 + 20) % 3)
      paint.rect(x, -h, 1, h - 1, C.gold)
      paint.rect(x, -h, 1, 1, C.white)
    }
  },
}

const pillar: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['cloud', 'fire'],
  anchor: 'base',
  // Far taller than it is wide, so it's drawn straight onto the screen rather than kept as a picture.
  live: true,
  draw(paint, { width, pose, time }) {
    const w = Math.max(8, Math.round(width))
    const h = w * 4
    const fire = pose === 'fire'
    const t = Math.floor(time * 6)
    for (let y = 0; y < h; y++) {
      const f = y / h
      // A column that swells a little in the middle and rounds off at the top.
      const half = Math.max(1, Math.round(w * (0.28 + 0.06 * Math.sin(f * Math.PI * 3)) * (f > 0.9 ? (1 - f) * 10 : 1)))
      const dx = fire ? ((t + y) % 5 === 0 ? 1 : 0) : 0
      paint.rect(dx - half, -y - 1, half * 2, 1, fire ? C.orange : C.pale)
      if (half > 2) paint.rect(dx - Math.round(half * 0.45), -y - 1, Math.round(half * 0.9), 1, fire ? C.gold : C.white)
    }
  },
}

export const plaguesProps: Record<string, PixelDrawnArt> = { 'plague-sign': plagueSign, frog, swarm, 'blood-mark': bloodMark, 'passover-dish': passoverDish, stubble, pillar }
