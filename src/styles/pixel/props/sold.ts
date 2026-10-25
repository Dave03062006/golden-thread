import type { PixelDrawnArt } from '../art'
import { C } from '../palette'

/**
 * Props of Level 5, Episode 1 in pixel art: a sheaf of wheat, standing or bowing; the empty
 * pit at Dothan; and the silver.
 */

const sheaf: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['stand', 'bow'],
  anchor: 'base',
  draw(paint, { width, pose, facing }) {
    const w = Math.max(4, Math.round(width))
    const h = Math.round(w * 2.2)
    const lean = pose === 'bow' ? -facing * 0.7 : 0
    for (let y = 0; y < h; y++) {
      const dx = Math.round(lean * y)
      const half = y > h * 0.6 ? Math.round(w * 0.45) : Math.round(w * 0.25)
      paint.rect(dx - half, -y - 1, half * 2 + 1, 1, y === Math.round(h * 0.45) ? C.wood2 : y > h * 0.8 ? C.gold : C.sand)
    }
  },
}

const pit: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(12, Math.round(width))
    paint.rect(-Math.round(w / 2), -5, w, 4, C.wood2)
    paint.rect(-Math.round(w / 2) + 3, -4, w - 6, 2, C.ink)
    paint.rect(-Math.round(w / 2) + 1, -5, w - 2, 1, C.sand2)
  },
}

const silverCoins: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  anchor: 'base',
  draw(paint, { width }) {
    const w = Math.max(5, Math.round(width))
    paint.rect(-Math.round(w / 2), -2, w, 2, C.pale)
    paint.rect(-Math.round(w / 4), -3, Math.round(w / 2), 1, C.white)
  },
}

/** The tokens on the cloth map: 7 × 7 pictures inside a round token. */
const ICONS: Record<string, { rows: string[]; colors: Record<string, string> }> = {
  joseph: { rows: ['...s...', '..sss..', '...s...', '..ppp..', '.pyyyp.', '..ppp..', '..ppp..'], colors: { s: C.wood1, p: C.purple, y: C.gold } },
  fire: { rows: ['...o...', '..ooo..', '..oyo..', '.oyyyo.', '..yyy..', '.bbbbb.', '.......'], colors: { o: C.orange, y: C.gold, b: C.wood1 } },
  man: { rows: ['...s..s', '..sss.s', '...s.s.', '..kkk..', '..kkk..', '..kkk..', '..k.k..'], colors: { s: C.wood1, k: C.sand2 } },
  lamb: { rows: ['.......', '.....ww', '.wwwwww', 'wwwwww.', '.wwwww.', '.k...k.', '.k...k.'], colors: { w: C.white, k: C.ink } },
  // Level 9, the path through the sea: Moses with his rod, a child, an old man, a family.
  moses: { rows: ['...p..r', '..sss.r', '...s..r', '..bbb.r', '.bbbbbr', '..bbb.r', '..b.b.r'], colors: { p: C.pale, s: C.wood1, b: C.wood3, r: C.wood0 } },
  child: { rows: ['.......', '.......', '...h...', '...s...', '..rrr..', '..rrr..', '..r.r..'], colors: { h: C.ink, s: C.wood1, r: C.rose } },
  elder: { rows: ['...w...', '..sss..', '...s...', 'r.ggg..', 'r.ggg..', 'r.ggg..', 'r.g.g..'], colors: { w: C.white, s: C.wood1, g: C.sand2, r: C.wood0 } },
  family: { rows: ['.......', '.h...v.', '.s...s.', 'ggg.rrr', 'ggg.rrr', 'ggg.rrr', 'g.g.r.r'], colors: { h: C.ink, v: C.white, s: C.wood1, g: C.green, r: C.rose } },
}
const mapToken: PixelDrawnArt = {
  kind: 'drawn',
  poses: Object.keys(ICONS),
  anchor: 'center',
  draw(paint, { width, pose }) {
    const r = Math.max(5, Math.round(width / 2))
    for (let y = -r; y <= r; y++) {
      const half = Math.round(Math.sqrt(r * r - y * y))
      paint.rect(-half, y, half * 2 + 1, 1, Math.abs(y) === r || half === 0 ? C.wood2 : C.white)
      paint.rect(-half, y, 1, 1, C.wood2)
      paint.rect(half, y, 1, 1, C.wood2)
    }
    const icon = ICONS[pose]
    if (!icon) return
    icon.rows.forEach((row, y) => [...row].forEach((c, x) => c !== '.' && paint.rect(x - 3, y - 3, 1, 1, icon.colors[c]!)))
  },
}

export const soldProps: Record<string, PixelDrawnArt> = { sheaf, pit, 'silver-coins': silverCoins, 'map-token': mapToken }
