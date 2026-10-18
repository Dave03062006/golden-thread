import { WINDOW, medallionCentres } from '../../../cathedral/layout'
import type { CathedralWindow, PanelState } from '../../../cathedral/model'
import { createRng } from '../../../engine/random'
import { PixelBuffer } from '../buffer'
import { C } from '../palette'

/**
 * The cathedral's glass in pixel art (spec §9.2): each window a pixel lancet of glass
 * pieces with one-pixel lead lines between them, and its medallions with pixel emblems.
 * Windows are drawn a third of the nave's size, one art pixel to three nave units.
 */

export const PX = 3
export const PW = Math.round(WINDOW.w / PX)
export const PH = Math.round(WINDOW.h / PX)
/** A medallion's ring and disc radius, in art pixels. */
const RING = 8
const DISC = 6

/** Each lit color, and the dull one it has when its panel is dark. */
const UNLIT: Record<string, string> = {
  [C.navy]: C.ink,
  [C.blue]: C.dslate,
  [C.sky]: C.dslate,
  [C.rose]: C.purple,
  [C.gold]: C.wood2,
  [C.white]: C.slate,
  [C.green]: C.teal,
  [C.lime]: C.teal,
  [C.orange]: C.wood2,
  [C.wood2]: C.wood1,
  [C.wood3]: C.wood2,
  [C.pale]: C.slate,
  [C.purple]: C.ink,
  [C.teal]: C.dslate,
}
const dull = (color: string) => UNLIT[color] ?? C.dslate

/**
 * Each episode's emblem as a 9 × 9 pixel picture; a letter is a color, '.' shows the
 * medallion's background.
 */
export const EMBLEMS: Record<string, { rows: string[]; colors: Record<string, string> }> = {
  creation: { rows: ['....o....', '.o..o..o.', '..oyyyo..', '..yWWWy..', 'ooyWWWyoo', '..yWWWy..', '..oyyyo..', '.o..o..o.', '....o....'], colors: { o: C.orange, y: C.gold, W: C.white } },
  garden: { rows: ['...ggg...', '..gGGGg..', '.gGGGGGg.', '..gGGGg..', '....b....', '....b....', 'sssssssss', '.s.....s.', 's.......s'], colors: { g: C.green, G: C.lime, b: C.wood2, s: C.sky } },
  fruit: { rows: ['...ggg...', '..ggggg..', '.gggggrr.', '.ggggg.rr', '..ggggg..', '....b....', '.vv.b....', 'v..vb....', '.vv.b....'], colors: { g: C.teal, r: C.rose, b: C.wood2, v: C.lime } },
  promise: { rows: ['....W....', '....W....', '...WyW...', '.WWyyyWW.', 'WWyyWyyWW', '.WWyyyWW.', '...WyW...', '....W....', '....W....'], colors: { W: C.white, y: C.gold } },
  lamb: { rows: ['.........', '..WWWWWw.', '.WWWWWWWw', '.WWWWWWW.', '..k...k..', 'sssssssss', 'sSsSsSsSs', 'sssssssss', '.........'], colors: { W: C.white, w: C.pale, k: C.ink, s: C.slate, S: C.pale } },
  'family-tree': { rows: ['y...b...y', '.b..b..b.', '..b.b.b..', 'y..bbb..y', '.b..b..b.', '..b.b.b..', '...bbb...', '....b....', '...bbb...'], colors: { b: C.wood2, y: C.gold } },
}

/** The pointed outline of a window, inside which the glass is: whether a pixel is in it. */
function inLancet(x: number, y: number, inset = 0): boolean {
  const w = PW
  const r = 0.8 * w
  const spring = Math.sqrt(r * r - (r - w / 2) ** 2)
  if (x < inset || x >= w - inset || y >= PH - inset) return false
  if (y >= spring) return true
  // Above the springing line, a pointed arch: inside both arcs, whose centres are a
  // radius away from each side.
  const cx = x + 0.5
  const cy = y + 0.5
  return Math.hypot(cx - (w - r), cy - spring) <= r - inset && Math.hypot(cx - r, cy - spring) <= r - inset
}

/** Draws a window: its stone frame, its glass, and (if its level is built) its medallions. */
export function drawWindow(window: CathedralWindow, states: Record<string, PanelState>): PixelBuffer {
  const buf = new PixelBuffer(PW, PH)
  const built = !!window.level
  const fieldLit = built && Object.values(states).some((s) => s === 'lit')
  const rng = createRng(2000 + window.number * 41)

  // The glass pieces: every pixel belongs to its nearest site; lead runs where pieces meet.
  const sites: { x: number; y: number; color: string }[] = []
  for (let y = 2; y < PH; y += 5) {
    for (let x = (y / 5) % 2 ? 1 : 3; x < PW; x += 5) {
      const roll = rng.next()
      const color = roll < 0.13 ? C.rose : roll < 0.19 ? C.gold : [C.navy, C.blue, C.blue, C.sky][Math.floor(rng.next() * 4)]!
      sites.push({ x: x + (rng.next() - 0.5) * 3, y: y + (rng.next() - 0.5) * 3, color })
    }
  }
  const owner = new Int32Array(PW * PH).fill(-1)
  for (let y = 0; y < PH; y++) {
    for (let x = 0; x < PW; x++) {
      if (!inLancet(x, y, 1)) continue
      let best = 0
      let bestD = Infinity
      sites.forEach((s, i) => {
        const d = (s.x - x) ** 2 + (s.y - y) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      owner[y * PW + x] = best
    }
  }
  for (let y = 0; y < PH; y++) {
    for (let x = 0; x < PW; x++) {
      const o = owner[y * PW + x]!
      if (o < 0) {
        // The stone frame around the glass.
        if (inLancet(x, y, 0)) buf.set(x, y, C.dslate)
        continue
      }
      const right = x + 1 < PW ? owner[y * PW + x + 1]! : o
      const below = y + 1 < PH ? owner[(y + 1) * PW + x]! : o
      const lead = (right !== o && right >= 0) || (below !== o && below >= 0)
      const color = sites[o]!.color
      buf.set(x, y, lead ? C.ink : fieldLit ? color : dull(color))
    }
  }
  // Iron bars across.
  for (const t of [0.3, 0.55, 0.8]) {
    const y = Math.round(PH * t)
    for (let x = 0; x < PW; x++) if (inLancet(x, y, 1)) buf.set(x, y, C.ink)
  }

  if (built) {
    const centres = medallionCentres(window.panels.length)
    window.panels.forEach((panel, i) => {
      const c = centres[i]!
      drawMedallion(buf, Math.round(c.x / PX), Math.round(c.y / PX), panel.emblem, states[panel.episode] === 'lit')
    })
  }
  return buf
}

/** A medallion: a ruby ring, a deep blue disc, and the emblem. */
export function drawMedallion(buf: PixelBuffer, cx: number, cy: number, emblem: string, lit: boolean, reveal?: (x: number, y: number) => boolean) {
  const paint = (x: number, y: number, color: string) => {
    if (!reveal || reveal(x, y)) buf.set(x, y, lit ? color : dull(color))
  }
  for (let y = -RING; y <= RING; y++) {
    for (let x = -RING; x <= RING; x++) {
      const d = Math.hypot(x, y)
      if (d > RING + 0.4) continue
      if (d > RING - 0.6 || Math.abs(d - (DISC + 0.6)) < 0.5) paint(cx + x, cy + y, C.ink)
      else if (d > DISC + 1) paint(cx + x, cy + y, C.rose)
      else paint(cx + x, cy + y, C.navy)
    }
  }
  const art = EMBLEMS[emblem]
  if (!art) return
  art.rows.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      const color = art.colors[ch]
      if (color) paint(cx - 4 + i, cy - 4 + j, color)
    }),
  )
}

export { RING as PIXEL_RING }
