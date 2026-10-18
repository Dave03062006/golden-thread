import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { MARGIN_X, PX_H, PX_W, fx, fy } from '../frame'
import { C, dither, hash } from '../palette'
import { bandColor, crest, fill } from './creation'

/**
 * Level 2, Episode 1 in pixel art: the city at dusk under a smoky red sky, its street of
 * shut doors and a fire left burning, Noah's home just outside it on the right with a
 * lamp in its window; then night on a hill above the sleeping land. The same places as
 * the paper version, a fifth of the size.
 */

const rect = (buf: PixelBuffer, x: number, y: number, w: number, h: number, color: string) => {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) buf.set(fx(Math.round(x) + i), fy(Math.round(y) + j), color)
}

/** A soft column of smoke from (x, y), dithered thinner as it rises. */
function smoke(buf: PixelBuffer, x: number, y: number, height: number) {
  for (let i = 0; i < 7; i++) {
    const t = i / 8
    const cx = x + t * t * 24
    const cy = y - t * height
    const r = 4 + t * 10
    for (let py = Math.floor(cy - r); py <= cy + r; py++)
      for (let px = Math.floor(cx - r); px <= cx + r; px++) {
        if ((px - cx) ** 2 + (py - cy) ** 2 > r * r) continue
        if (dither(px, py) < 0.62 - t * 0.55) buf.set(fx(px), fy(py), C.ink)
      }
  }
}

function drawSky(buf: PixelBuffer) {
  fill(buf, (x, y) => bandColor([C.ink, C.purple, C.rose, C.orange, C.gold], Math.max(0, (y + 14) / 154), x, y))
  // The low sun at the edge of the city.
  for (let y = 100; y < 126; y++)
    for (let x = 262; x < 292; x++) {
      const d = Math.hypot(x - 276, y - 112)
      if (d < 9) buf.set(fx(x), fy(y), d < 6 ? C.white : C.gold)
      else if (d < 16 && dither(x, y) < (16 - d) / 14) buf.set(fx(x), fy(y), C.gold)
    }
  smoke(buf, 48, 94, 84)
  smoke(buf, 128, 86, 92)
  smoke(buf, 192, 94, 76)
}

function drawSkyline(buf: PixelBuffer) {
  let x = -MARGIN_X
  let i = 0
  while (x < 236) {
    const w = 12 + Math.floor(hash(i * 3.7) * 18)
    const tower = hash(i * 9.1) < 0.25
    const top = tower ? 60 + Math.floor(hash(i * 1.3) * 12) : 80 + Math.floor(hash(i * 5.3) * 14)
    rect(buf, x, top, w, 132 - top, C.ink)
    if (tower) for (let k = 0; k < 7; k++) rect(buf, x + w / 2 - k, top - 7 + k, k * 2 + 1, 1, C.ink)
    for (let k = 0; k < 3; k++) if (hash(i * 7 + k) < 0.45) rect(buf, x + 2 + Math.floor(hash(i + k * 13) * (w - 5)), top + 4 + Math.floor(hash(i * 2 + k) * (118 - top)), 2, 2, C.orange)
    x += w - 1
    i++
  }
  // The wall in front, with its crenellations.
  rect(buf, -MARGIN_X, 120, 236 + MARGIN_X, 16, C.ink)
  for (let cx = -MARGIN_X; cx < 236; cx += 9) rect(buf, cx, 117, 5, 3, C.ink)
}

function drawStreet(buf: PixelBuffer) {
  // The street.
  fill(buf, (x, y) => (y >= 138 ? (y === 138 ? C.wood3 : hash(x * 7 + y * 13) < 0.06 ? C.wood1 : y > 160 && dither(x, y) < 0.3 ? C.wood1 : C.wood2) : null))
  // House fronts with shut doors and dark windows.
  let x = -MARGIN_X
  let i = 0
  while (x < 212) {
    const w = 30 + Math.floor(hash(i * 2.9) * 16)
    const top = 94 + Math.floor(hash(i * 4.4) * 12)
    rect(buf, x, top, w, 140 - top, i % 2 ? C.purple : C.dslate)
    rect(buf, x + Math.floor(w * 0.35), 122, 8, 18, C.ink)
    rect(buf, x + Math.floor(w * 0.72), top + 7, 4, 4, C.ink)
    x += w
    i++
  }
  // A fire left burning at a corner, its glow on the wall.
  for (let y = 112; y < 141; y++)
    for (let fxp = 60; fxp < 112; fxp++) {
      const d = Math.hypot(fxp - 86, (y - 140) * 1.2)
      if (d < 26 && dither(fxp, y) < (26 - d) / 40) buf.set(fx(fxp), fy(y), C.orange)
    }
  for (const [px, py, c] of [[84, 132, C.orange], [86, 130, C.gold], [88, 133, C.orange], [86, 134, C.gold], [85, 136, C.gold], [87, 136, C.orange], [83, 137, C.orange], [89, 137, C.orange]] as const) rect(buf, px, py, 2, 2, c)
  // Noah's home outside the city: the low wall, the house, its lit window, an olive tree.
  fill(buf, (px, py) => (px >= 230 && py >= Math.round(129 - (px - 230) * 0.03) && py < 144 ? (py === Math.round(129 - (px - 230) * 0.03) ? C.wood3 : C.wood2) : null))
  rect(buf, 266, 100, 40, 32, C.wood3)
  for (let k = 0; k < 13; k++) rect(buf, 286 - k * 2, 88 + k, k * 4 + 1, 1, C.wood1)
  rect(buf, 281, 114, 9, 18, C.wood0)
  rect(buf, 292, 106, 7, 6, C.gold)
  rect(buf, 292, 106, 7, 1, C.wood1)
  for (let k = 0; k < 4; k++) rect(buf, 232 + k * 8, 130, 7, 3, C.pale)
  rect(buf, 249, 112, 2, 19, C.wood1)
  for (let y = 98; y < 118; y++)
    for (let px = 238; px < 264; px++) if (Math.hypot(px - 249, (y - 108) * 1.3) < 11) buf.set(fx(px), fy(y), dither(px, y) < 0.3 ? C.green : C.teal)
}

const NIGHT_HILL = [140, 138, 132, 126.4, 123.2, 122, 122.4, 124.4, 128, 132.4, 136.8, 140, 142.4]
const LAND = [156, 154, 152, 153.6, 155.2, 154, 152.4, 154, 156, 154.8, 153.2, 154.4, 156]

export const worldGoneWrongLayers: Record<string, PixelLayerArt> = {
  'violent-sky': { draw: drawSky },
  'city-far': { draw: drawSkyline },
  'city-street': { draw: drawStreet },
  'night-sky': {
    draw: (buf) => {
      fill(buf, (x, y) => bandColor([C.ink, C.navy, C.dslate], Math.max(0, (y + 14) / 166), x, y))
      for (let i = 0; i < 70; i++) buf.set(fx(Math.floor(hash(i * 3.3) * (PX_W + 40) - 20)), fy(Math.floor(hash(i * 7.9) * 140) - 10), i % 6 ? C.pale : C.white)
      for (let y = 22; y < 38; y++) for (let x = 236; x < 252; x++) if (Math.hypot(x - 244, y - 30) < 7 && Math.hypot(x - 247, y - 28) > 6) buf.set(fx(x), fy(y), C.white)
    },
  },
  'night-hill': {
    draw: (buf) => {
      fill(buf, (x, y) => {
        const land = Math.round(crest(LAND, x))
        const hill = Math.round(crest(NIGHT_HILL, x))
        if (y >= hill) return y === hill ? C.slate : C.ink
        if (y >= land - 2 && y < PX_H + 20) return y === land - 2 ? C.dslate : hash(x * 11 + y) < 0.012 ? C.gold : C.navy
        return null
      })
    },
  },
}
