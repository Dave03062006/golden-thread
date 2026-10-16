import type { PixelLayerArt } from '../art'
import type { PixelBuffer } from '../buffer'
import { LAYER_H, LAYER_W, MARGIN_X, MARGIN_Y, PX_H, PX_W, fx, fy, type Painter } from '../frame'
import { C, dither, hash } from '../palette'

/** The milestone 1 demo: evening over the waters, with Ararat's two peaks behind. */

/** The sky: solid color bands with dithered edges, from night above to gold at the horizon. */
function drawSky(buf: PixelBuffer) {
  const bands = [C.ink, C.navy, C.purple, C.rose, C.orange, C.gold]
  const horizon = fy(150)
  for (let y = 0; y < LAYER_H; y++) {
    const t = (Math.min(y, horizon) / horizon) * (bands.length - 1)
    const i = Math.min(bands.length - 2, Math.floor(t))
    const f = Math.max(0, Math.min(1, (t - i - 0.3) / 0.4))
    for (let x = 0; x < LAYER_W; x++) buf.set(x, y, f > dither(x, y) ? bands[i + 1]! : bands[i]!)
  }
  // The evening sun, resting low.
  const sx = fx(267)
  const sy = fy(112)
  for (let y = sy - 14; y <= sy + 14; y++) {
    for (let x = sx - 14; x <= sx + 14; x++) {
      const d = Math.hypot(x - sx, y - sy)
      if (d < 9.5) buf.set(x, y, C.white)
      else if (d < 13) buf.set(x, y, dither(x, y) < 0.55 ? C.white : C.gold)
    }
  }
}

const STARS = [
  [12, 5], [31, 14], [47, 3], [69, 11], [97, 4], [121, 17], [141, 7], [166, 13], [182, 2], [84, 21],
  [57, 24], [205, 9], [229, 19], [24, 33], [110, 30], [150, 26], [6, 18], [196, 28],
] as const

function twinkle(paint: Painter, time: number) {
  STARS.forEach(([x, y], i) => {
    if (Math.sin(time * 1.9 + i * 2.3) > -0.55) paint.rect(fx(x), fy(y), 1, 1, i % 3 ? C.white : C.pale)
  })
}

/**
 * A puffy cloud: a few overlapping round lumps on a flat base. Its top is in shadow and
 * its underside is lit by the low sun, with a dithered blend between them.
 */
function cloud(buf: PixelBuffer, cx: number, cy: number, width: number, height: number, shade: string, body: string, lit: string) {
  const lumps = [
    { x: cx - width * 0.28, y: cy + height * 0.1, r: height * 0.55 },
    { x: cx, y: cy - height * 0.12, r: height * 0.75 },
    { x: cx + width * 0.26, y: cy + height * 0.05, r: height * 0.6 },
  ]
  const base = cy + height * 0.45
  for (let y = Math.floor(cy - height); y <= base; y++) {
    for (let x = Math.floor(cx - width / 2 - 2); x <= cx + width / 2 + 2; x++) {
      const inside = lumps.some((l) => Math.hypot((x - l.x) * 0.8, y - l.y) < l.r) && Math.abs(x - cx) < width / 2
      if (!inside) continue
      const t = (y - (cy - height)) / (base - (cy - height))
      let color = t < 0.35 ? (t / 0.35 > dither(x, y) ? body : shade) : body
      if (y >= base - 1) color = lit
      else if (y >= base - 3 && dither(x, y) < 0.5) color = lit
      buf.set(fx(x), fy(y), color)
    }
  }
}

function drawClouds(buf: PixelBuffer) {
  // Each cloud contrasts with the band of sky it sits in: warm on the cool night sky,
  // dark against the warm glow near the horizon.
  cloud(buf, 244, 30, 70, 13, C.purple, C.rose, C.orange)
  cloud(buf, 290, 74, 44, 9, C.navy, C.purple, C.orange)
  cloud(buf, 58, 50, 58, 10, C.ink, C.navy, C.rose)
}

/** Ararat's two peaks: the greater on the left, the lesser behind on the right. */
function drawHills(buf: PixelBuffer) {
  const mountain = (peakX: number, peakY: number, leftSlope: number, rightSlope: number, seed: number) => {
    for (let x = -MARGIN_X; x < PX_W + MARGIN_X; x++) {
      const top = Math.round(peakY + Math.abs(x - peakX) * (x < peakX ? leftSlope : rightSlope) + hash(x * 3.1 + seed) * 1.6)
      for (let y = Math.max(top, -MARGIN_Y); y < PX_H + MARGIN_Y; y++) {
        const lit = x >= peakX
        const depth = y - top
        const snow = y < peakY + 9 + Math.round(hash(x * 1.7 + seed) * 3)
        let color: string = lit && depth < 8 + hash(x + seed) * 5 ? C.slate : C.dslate
        if (snow) color = lit ? C.white : C.pale
        else if (depth === 0) color = lit ? C.orange : C.slate
        buf.set(fx(x), fy(y), color)
      }
    }
  }
  mountain(200, 92, 0.8, 0.85, 11)
  mountain(83, 68, 0.9, 0.7, 23)
}

/** A band of water with a wavy top edge and a lighter crest line. */
export function drawWater(buf: PixelBuffer, top: number, amp: number, period: number, fill: string, crest: string, deep: string) {
  for (let x = -MARGIN_X; x < PX_W + MARGIN_X; x++) {
    const edge = Math.round(top + amp * Math.sin((x / period) * Math.PI * 2))
    for (let y = edge; y < PX_H + MARGIN_Y; y++) {
      const depth = y - edge
      let color = fill
      if (depth === 0) color = crest
      else if (depth > 10 && (depth - 10) / 14 > dither(x, y)) color = deep
      buf.set(fx(x), fy(y), color)
    }
  }
}

/** Short bright dashes that drift across the water, slower on the far layers. */
export function glints(paint: Painter, time: number, seed: number, top: number, rows: number, speed: number, color: string) {
  for (let i = 0; i < 14; i++) {
    const y = top + 3 + Math.floor(hash(i * 13 + seed) * rows)
    const len = 2 + Math.floor(hash(i * 5 + seed) * 4)
    const span = LAYER_W
    const x = Math.floor((((hash(i * 9 + seed) * span - time * speed) % span) + span) % span)
    paint.rect(x, fy(y), len, 1, color)
  }
}

/** The sun's reflection, shimmering on the far water. */
function sunPath(paint: Painter, time: number) {
  const tick = Math.floor(time * 6)
  for (let y = 139; y < 152; y++) {
    const half = Math.max(1, 10 - (y - 139) * 0.6)
    for (let x = Math.floor(267 - half); x <= 267 + half; x++) {
      const v = hash(x * 3 + y * 57 + tick * 911)
      if (v > 0.55) paint.rect(fx(x), fy(y), 1, 1, v > 0.82 ? C.white : C.gold)
    }
  }
}

export const demoLayers: Record<string, PixelLayerArt> = {
  'evening-sky': { draw: drawSky, animate: twinkle },
  'evening-clouds': { draw: drawClouds },
  'far-hills': { draw: drawHills },
  'water-back': {
    draw: (buf) => drawWater(buf, 138, 1.5, 22, C.blue, C.sky, C.navy),
    animate: (paint, time) => {
      sunPath(paint, time)
      glints(paint, time, 1, 138, 10, 2, C.sky)
    },
  },
  'water-mid': {
    draw: (buf) => drawWater(buf, 150, 2, 30, C.navy, C.blue, C.ink),
    animate: (paint, time) => glints(paint, time, 2, 150, 12, 5, C.blue),
  },
  'water-front': {
    draw: (buf) => drawWater(buf, 164, 2.5, 40, C.ink, C.navy, C.ink),
    animate: (paint, time) => glints(paint, time, 3, 164, 10, 9, C.navy),
  },
}
