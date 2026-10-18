import { createRng } from '../../../engine/random'
import { PixelBuffer } from '../buffer'
import { C, dither, hash } from '../palette'

/**
 * The main background in pixel art: heaven and earth, and the love of God coming down
 * (the same picture as Paper & Glass, at a fifth of its size). Heaven is pixel stained
 * glass radiating from a rose window with the dove; the clouds part, and a column of
 * light falls to a cross on a hill, and spreads from it across the earth at dusk, to its
 * city and its people.
 *
 * Drawn once into a 320 × 180 picture by `npm run bake`, and enlarged with hard edges.
 */

export const PIXEL_BACKDROP_W = 320
export const PIXEL_BACKDROP_H = 180

/** Right of centre, like the Paper & Glass picture, so the menus never hide the cross. */
const LX = 200
const GLORY = { x: LX, y: 23, r: 22 }
const CROSS = { x: LX, top: 92, foot: 142, arm: 106, half: 16 }
/** Heaven's glass reaches down to here; below it is earth's sky at dusk. */
const HEAVEN_BOTTOM = 117

/** Heaven's colors, from the glory outward. */
const BANDS = [C.white, C.gold, C.gold, C.orange, C.rose, C.purple, C.blue, C.navy]

type Buf = PixelBuffer

/** Colors every pixel in the box for which `color` gives a color. */
function fillWhere(buf: Buf, x0: number, y0: number, x1: number, y1: number, color: (x: number, y: number) => string | null) {
  for (let y = Math.max(0, Math.floor(y0)); y < Math.min(PIXEL_BACKDROP_H, Math.ceil(y1)); y++)
    for (let x = Math.max(0, Math.floor(x0)); x < Math.min(PIXEL_BACKDROP_W, Math.ceil(x1)); x++) {
      const c = color(x, y)
      if (c) buf.set(x, y, c)
    }
}

function heavenGlass(buf: Buf) {
  const rng = createRng(77)
  const sites: { x: number; y: number; band: number }[] = []
  for (let r = GLORY.r + 7, ring = 0; r < 260; r += 7 + r * 0.05, ring++) {
    const count = Math.max(10, Math.round((Math.PI * 2 * r) / (9 + r * 0.06)))
    for (let k = 0; k < count; k++) {
      const a = ((k + (ring % 2) * 0.5) / count) * Math.PI * 2 + (rng.next() - 0.5) * 0.05
      const x = GLORY.x + Math.cos(a) * r
      const y = GLORY.y + Math.sin(a) * r
      if (x < -12 || x > PIXEL_BACKDROP_W + 12 || y < -12 || y > HEAVEN_BOTTOM + 12) continue
      const turn = (((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)
      const ray = Math.floor(turn * 24) % 2 === 0
      // Lighter along the column of light, so the cross stands out against it.
      const nearBeam = Math.max(0, 1 - Math.abs(x - LX) / 40) * (y > GLORY.y + GLORY.r ? 1.6 : 0)
      const t = ((r - GLORY.r) / 150) * (BANDS.length - 1) + (rng.next() - 0.5) * 0.7 - (ray ? 0.8 : 0) - nearBeam
      sites.push({ x, y, band: Math.max(0, Math.min(BANDS.length - 1, Math.round(t))) })
    }
  }
  const W = PIXEL_BACKDROP_W
  const owner = new Int32Array(W * HEAVEN_BOTTOM)
  for (let y = 0; y < HEAVEN_BOTTOM; y++)
    for (let x = 0; x < W; x++) {
      let best = 0
      let bestD = Infinity
      for (let i = 0; i < sites.length; i++) {
        const d = (sites[i]!.x - x) ** 2 + (sites[i]!.y - y) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      }
      owner[y * W + x] = best
    }
  // Each piece in its color, with one-pixel lead where pieces meet.
  fillWhere(buf, 0, 0, W, HEAVEN_BOTTOM, (x, y) => {
    const me = owner[y * W + x]!
    const lead = (x + 1 < W && owner[y * W + x + 1] !== me) || (y + 1 < HEAVEN_BOTTOM && owner[(y + 1) * W + x] !== me)
    return lead ? C.ink : BANDS[sites[me]!.band]!
  })
}

/** The rose window of glory, with the dove of the Spirit at its heart. */
function roseWindow(buf: Buf) {
  const { x: cx, y: cy, r } = GLORY
  fillWhere(buf, cx - r - 4, cy - r - 4, cx + r + 4, cy + r + 4, (x, y) => {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy)
    const turn = ((Math.atan2(y + 0.5 - cy, x + 0.5 - cx) + Math.PI) / (Math.PI * 2)) % 1
    if (d > r + 3) return null
    if (d > r + 1.5) return C.wood3
    if (d > r) return C.ink
    if (d > r * 0.55) {
      // Twelve round petals, rose and blue.
      const petal = Math.floor(turn * 12)
      const pa = ((petal + 0.5) / 12) * Math.PI * 2 - Math.PI
      const pd = Math.hypot(x + 0.5 - (cx + Math.cos(pa) * r * 0.77), y + 0.5 - (cy + Math.sin(pa) * r * 0.77))
      if (pd < r * 0.2) return petal % 2 ? C.rose : C.blue
      if (pd < r * 0.26) return C.ink
      return C.gold
    }
    if (d > r * 0.5) return C.ink
    if (d > r * 0.32) return Math.floor(turn * 8) % 2 ? C.gold : C.orange
    if (d > r * 0.27) return C.ink
    return C.blue
  })
  const dove = ['w.......w', 'ww.....ww', '.www.www.', '..wwwww..', '....w....', '...w.w...']
  dove.forEach((row, j) => [...row].forEach((c, i) => c === 'w' && buf.set(cx - 4 + i, cy - 3 + j, C.white)))
}

/** The light coming down: a white heart, and dithered gold around it, widening as it falls. */
function beam(buf: Buf) {
  const top = GLORY.y + GLORY.r + 3
  for (let y = top; y < CROSS.foot; y++) {
    const t = (y - top) / (CROSS.foot - top)
    const half = 12 + t * 36
    const core = 3 + t * 9
    for (let x = Math.floor(LX - half); x <= LX + half; x++) {
      const off = Math.abs(x + 0.5 - LX)
      if (off < core) buf.set(x, y, off < core * 0.5 || (x + y) % 2 ? C.white : C.gold)
      else {
        const strength = (1 - (off - core) / (half - core)) * (y < HEAVEN_BOTTOM ? 0.55 : 0.8)
        if (strength > dither(x, y)) buf.set(x, y, C.gold)
      }
    }
  }
}

/** A cloud: a cluster of rounds, cut flat underneath, white with its underside shaded. */
function cloud(buf: Buf, cx: number, cy: number, w: number, h: number, seed: number) {
  const rng = createRng(seed)
  const count = Math.max(3, Math.round(w / 10))
  const rounds = Array.from({ length: count }, (_, i) => {
    const u = (i + 0.5) / count
    const r = h * (0.42 + 0.58 * Math.sin(u * Math.PI)) * (0.75 + rng.next() * 0.45)
    return { x: cx - w / 2 + u * w + (rng.next() - 0.5) * 4, y: cy - r * 0.55, r }
  })
  const within = (x: number, y: number) => rounds.some((c) => Math.hypot(x + 0.5 - c.x, y + 0.5 - c.y) < c.r)
  fillWhere(buf, cx - w, cy - h * 2, cx + w, cy + 1, (x, y) => {
    if (y > cy || !within(x, y)) return null
    if (y >= cy - 1) return C.slate
    if (y >= cy - h * 0.3) return (y - (cy - h * 0.3)) / (h * 0.3) > dither(x, y) ? C.pale : C.white
    return within(x, y - 1) ? C.white : C.pale
  })
}

function clouds(buf: Buf) {
  const gap = 38
  const inner = LX - gap - 148 + 12
  const bank: [number, number, number, number][] = [
    [-12, 120, 72, 18],
    [50, 117, 60, 16],
    [104, 120, 56, 14],
    [142 + inner / 2, 118, inner, 12],
    [LX + gap + 14, 118, 40, 12],
    [LX + gap + 58, 120, 56, 16],
    [312, 117, 60, 18],
  ]
  const front: [number, number, number, number][] = [
    [24, 125, 76, 13],
    [92, 126, 60, 11],
    [LX + gap + 36, 126, 60, 11],
    [292, 126, 72, 13],
  ]
  ;[...bank, ...front].forEach(([x, y, w, h], i) => cloud(buf, x, y, w, h, 40 + i))
}

/** Jerusalem on its ridge, with lamps lit in its windows. */
function city(buf: Buf) {
  const box = (x: number, y: number, w: number, h: number) => fillWhere(buf, x, y, x + w, y + h, () => C.dslate)
  box(16, 124, 84, 7)
  for (const [x, h] of [[19, 12], [35, 14], [51, 12], [67, 14], [83, 12], [95, 13]] as const) box(x, 131 - h, 4, h)
  box(54, 114, 18, 11) // the Temple
  fillWhere(buf, 52, 108, 75, 114, (x, y) => (Math.abs(x + 0.5 - 63) < (y - 107) * 1.9 ? C.dslate : null))
  box(30, 119, 12, 6)
  fillWhere(buf, 30, 113, 42, 119, (x, y) => (Math.hypot(x + 0.5 - 36, y - 119) < 6 ? C.dslate : null))
  for (let i = 0; i < 12; i++) buf.set(20 + Math.floor(hash(i * 3.1) * 76), 125 + Math.floor(hash(i * 7.7) * 5), C.gold)
}

/** A person standing, looking up. */
function person(buf: Buf, x: number, ground: number, h: number) {
  fillWhere(buf, x - 1, ground - h, x + 3, ground, (px, py) => {
    const fromTop = py - (ground - h)
    if (fromTop < 2) return px === x || px === x + 1 ? C.ink : null
    return Math.abs(px + 0.5 - (x + 1)) <= 0.5 + (fromTop / h) * 1.6 ? C.ink : null
  })
}

export function drawHeavenAndEarth(): PixelBuffer {
  const W = PIXEL_BACKDROP_W
  const H = PIXEL_BACKDROP_H
  const buf = new PixelBuffer(W, H)

  heavenGlass(buf)
  // Earth's sky at dusk, below the glass, darkening downward.
  fillWhere(buf, 0, HEAVEN_BOTTOM, W, H, (x, y) => ((y - HEAVEN_BOTTOM) / 26 > dither(x, y) ? C.navy : C.blue))
  roseWindow(buf)
  beam(buf)
  clouds(buf)

  // Earth, in layers, back to front. The far hills:
  fillWhere(buf, 0, 120, W, H, (x, y) => (y >= 130 + Math.sin(x / 22) * 3 + Math.sin(x / 9 + 1) * 1.5 ? C.dslate : null))
  city(buf)
  // The middle hills, left and right, lit faintly where they face the light.
  const lit = (x: number, y: number) => (1 - Math.hypot(x + 0.5 - LX, (y - CROSS.foot) * 2) / 120) * 0.5 > dither(x, y)
  fillWhere(buf, 0, 128, W, H, (x, y) => (y >= 136 - Math.sin(x / 30) * 2 - Math.sin(x / 13 + 2) * 1 ? (lit(x, y) ? C.slate : C.navy) : null))
  // A halo behind the cross: white light close around it, below the glass.
  fillWhere(buf, LX - 20, HEAVEN_BOTTOM - 14, LX + 21, CROSS.foot, (x, y) => {
    const glow = 1 - Math.hypot(x + 0.5 - LX, y + 0.5 - CROSS.arm) / 20
    if (glow <= 0 || glow * 1.2 < dither(x, y)) return null
    return glow > 0.45 ? C.white : C.gold
  })
  // Calvary, the hill of the cross, with the light along its crest and lit ground around it.
  const crestAt = (x: number) => CROSS.foot - 1 + Math.pow(Math.abs(x + 0.5 - LX) / 52, 2) * 16
  fillWhere(buf, LX - 110, 130, LX + 110, H, (x, y) => {
    const crest = Math.round(crestAt(x))
    if (y < crest) return null
    if (y === crest) return Math.abs(x + 0.5 - LX) < 80 ? C.gold : C.slate
    const glow = 1 - Math.hypot((x + 0.5 - LX) / 44, (y - CROSS.foot) / 12)
    if (glow > 0 && glow * 0.8 > dither(x, y)) return glow > 0.55 ? C.gold : C.orange
    return C.purple
  })
  // The cross: dark wood, its edges catching the light from above.
  fillWhere(buf, LX - 2, CROSS.top, LX + 2, CROSS.foot, (x) => (x === LX - 2 ? C.gold : C.wood1))
  fillWhere(buf, LX - CROSS.half, CROSS.arm - 2, LX + CROSS.half, CROSS.arm + 2, (_x, y) => (y === CROSS.arm - 2 ? C.gold : C.wood1))

  // The foreground hills: two rounded mounds, lit along their edges near the light.
  const mound = (cx: number, rx: number, ry: number) => (x: number) => {
    const u = (x + 0.5 - cx) / rx
    return Math.abs(u) >= 1 ? Infinity : 200 - ry * Math.sqrt(1 - u * u)
  }
  const leftTop = mound(40, 132, 52)
  const rightTop = mound(304, 108, 50)
  for (const top of [leftTop, rightTop])
    fillWhere(buf, 0, 140, W, H, (x, y) => {
      const t = top(x)
      if (y < t) return null
      return y < t + 1 && Math.abs(x + 0.5 - LX) < 120 ? C.gold : C.ink
    })

  // People of the earth, looking up toward the light: a family, and a shepherd with his flock.
  // (They stand on the mounds: each one's feet are where the ground is.)
  const groundAt = (x: number) => Math.round(Math.min(leftTop(x), rightTop(x)))
  person(buf, 100, groundAt(101) + 1, 14)
  person(buf, 108, groundAt(109) + 1, 13)
  person(buf, 114, groundAt(115) + 1, 9)
  const shepherd = groundAt(280) + 1
  person(buf, 279, shepherd, 14)
  for (let y = shepherd - 15; y < shepherd; y++) buf.set(276 - Math.floor((shepherd - y) / 4), y, C.ink)
  for (const x of [266, 288, 296]) {
    const y = groundAt(x + 3) + 1
    fillWhere(buf, x, y - 4, x + 6, y - 1, () => C.pale)
    for (const [dx, dy] of [[-1, -4], [-1, -3], [1, -1], [4, -1]] as const) buf.set(x + dx, y + dy, C.ink)
  }
  return buf
}
