import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/** Props of Level 5, Episode 7 in pixel art: the pictures of Jacob's blessings, each in a round frame. */

const PICTURES: Record<string, { rows: string[]; colors: Record<string, string> }> = {
  lion: { rows: ['......mmm', '.....mffm', '.....mffm', 'bbbbbbmm.', 'bbbbbbb..', 'b.b..b.b.', 'b.b..b.b.'], colors: { m: C.wood2, f: C.gold, b: C.sand } },
  ship: { rows: ['....k....', '....kW...', '....kWW..', '....kWWW.', 'bbbbbbbbb', '.bbbbbbb.', 'sssssssss'], colors: { k: C.wood1, W: C.white, b: C.wood2, s: C.sky } },
  donkey: { rows: ['.......e.', '......ggg', '.rrrr.gg.', 'ggggggg..', 'ggggggg..', 'g.g...g.g', 'g.g...g.g'], colors: { g: C.pale, e: C.slate, r: C.rose } },
  serpent: { rows: ['.......gg', '......g.r', '.....g...', '..ggg....', '.g...g.g.', 'g.....g..', 'sssssssss'], colors: { g: C.green, r: C.rose, s: C.sand2 } },
  deer: { rows: ['......w.w', '.......w.', '......bb.', 'bbbbbbb..', 'bbbbbbb..', '.b.b..b.b', 'b...b...b'], colors: { w: C.wood1, b: C.wood3 } },
  vine: { rows: ['....gg.g.', '...g.gg..', '..b.r.g.r', '..b..r...', 'sbsssssss', 'sbsssssss', 'sbsssssss'], colors: { g: C.green, b: C.wood1, r: C.rose, s: C.sand2 } },
  wolf: { rows: ['......e.e', '......ggg', 'g.....gg.', '.ggggggg.', '.ggggggg.', '.g.g..g.g', '.g.g..g.g'], colors: { g: C.slate, e: C.dslate } },
  bread: { rows: ['.........', '..ss.ss..', '.sSSsSSs.', '.SSSSSSS.', 'bbbbbbbbb', '.bbbbbbb.', '.........'], colors: { s: C.sand, S: C.wood3, b: C.wood2 } },
}

const blessingSign: PixelDrawnArt = {
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

export const blessingsProps: Record<string, PixelDrawnArt> = { 'blessing-sign': blessingSign }
