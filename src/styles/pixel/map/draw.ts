import { ARARAT, MOUNTAINS } from '../../../map/core/features'
import { ISLANDS, RIVERS, SEAS, type LatLon, type Projector } from '../../../map/core/geo'
import { PixelBuffer } from '../buffer'
import { C, dither, hash } from '../palette'

/**
 * The world map in pixel art (spec §9.2): the Bible lands as a little pixel map, like the
 * mockup. Deep seas with a lighter shore, green hills in the north fading to sand in the
 * south, a fertile strip along each river, and the mountains drawn as peaks. It's drawn
 * once into a small picture and enlarged with hard pixel edges.
 */

/** Map units per pixel. */
export const MAP_PX = 4

function inside(poly: { x: number; y: number }[], x: number, y: number): boolean {
  let hit = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]!
    const b = poly[j]!
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) hit = !hit
  }
  return hit
}

/** A pixel peak: a lit face, a shaded face, and snow on the tallest. */
function peak(buf: PixelBuffer, cx: number, base: number, half: number, snow: boolean) {
  const height = Math.round(half * 1.3)
  for (let row = 0; row < height; row++) {
    const y = base - row
    const span = Math.round(half * (1 - row / height))
    for (let dx = -span; dx <= span; dx++) {
      const edge = Math.abs(dx) === span
      const color = snow && row >= height - Math.max(2, Math.round(height / 3)) ? C.white : edge ? C.wood0 : dx < 0 ? C.wood3 : C.wood1
      buf.set(cx + dx, y, color)
    }
  }
  buf.set(cx, base - height, snow ? C.white : C.wood0)
}

export function drawPixelMap(map: Projector): PixelBuffer {
  const w = Math.round(map.width / MAP_PX)
  const h = Math.round(map.height / MAP_PX)
  const buf = new PixelBuffer(w, h)
  const toPx = (p: LatLon) => {
    const { x, y } = map.point(p)
    return { x: x / MAP_PX, y: y / MAP_PX }
  }
  const seas = SEAS.map((s) => s.outline.map(toPx))
  const islands = ISLANDS.map((i) => i.map(toPx))
  const isSea = new Uint8Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const sea = seas.some((s) => inside(s, x + 0.5, y + 0.5)) && !islands.some((i) => inside(i, x + 0.5, y + 0.5))
      isSea[y * w + x] = sea ? 1 : 0
    }
  const seaAt = (x: number, y: number) => x < 0 || y < 0 || x >= w || y >= h || isSea[y * w + x] === 1

  // Rivers, traced pixel by pixel; the land near them is green.
  const river = new Uint8Array(w * h)
  for (const r of RIVERS) {
    const pts = r.course.map(toPx)
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]!
      const b = pts[i]!
      const steps = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) * 2)
      for (let s = 0; s <= steps; s++) {
        const x = Math.round(a.x + ((b.x - a.x) * s) / steps)
        const y = Math.round(a.y + ((b.y - a.y) * s) / steps)
        if (x >= 0 && y >= 0 && x < w && y < h) river[y * w + x] = 1
      }
    }
  }
  const nearRiver = (x: number, y: number, r: number) => {
    for (let dy = -r; dy <= r; dy++)
      for (let dx = -r; dx <= r; dx++) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && ny >= 0 && nx < w && ny < h && river[ny * w + nx] && dx * dx + dy * dy <= r * r) return true
      }
    return false
  }

  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const shore = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].some(([dx, dy]) => seaAt(x + dx!, y + dy!) !== seaAt(x, y))
      if (seaAt(x, y)) {
        // Deep water, a lighter band at the shore, and a few glints of waves.
        const near = shore || [2, -2].some((d) => !seaAt(x + d, y) || !seaAt(x, y + d))
        const glint = hash(x * 913 + y * 37) > 0.985 && !near
        buf.set(x, y, shore ? C.cyan : near ? C.sky : glint ? C.sky : (y + (x >> 3)) % 9 === 0 && hash(x + y * 5) > 0.6 ? C.navy : C.blue)
        continue
      }
      if (river[y * w + x]) {
        buf.set(x, y, C.sky)
        continue
      }
      // North is green hill country, south is desert; between them the green breaks up into
      // scattered pixels along a wavering edge.
      const edge = 0.5 + Math.sin(x / 11) * 0.03 + Math.sin(x / 29 + 1.3) * 0.04
      const green = Math.min(1, Math.max(0, (edge - y / h) / 0.1 + 0.5))
      let color: string = green > hash(x * 7.31 + y * 113.7) ? C.green : hash(x * 31 + y * 17) > 0.93 ? C.sand2 : C.sand
      if (nearRiver(x, y, 3)) color = nearRiver(x, y, 1) || dither(x, y) > 0.4 ? C.lime : C.green
      if (shore) color = color === C.sand ? C.gold : color
      buf.set(x, y, color)
    }

  for (const range of MOUNTAINS)
    for (const [i, p] of range.peaks.entries()) {
      const { x, y } = toPx(p)
      peak(buf, Math.round(x), Math.round(y), 3 + (i % 2), false)
    }
  const ararat = toPx(ARARAT)
  peak(buf, Math.round(ararat.x) - 3, Math.round(ararat.y) + 2, 7, true)
  peak(buf, Math.round(ararat.x) + 5, Math.round(ararat.y) + 3, 4, true)
  return buf
}
