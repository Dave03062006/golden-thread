import { createRng } from '../../engine/random'
import { BOTTOM, LEFT, RIGHT } from './frame'

/**
 * Shapes the paper scenes share: water, clouds, stars, rays of light. Each returns SVG
 * markup in frame units.
 */

/** A wavy top edge from LEFT to RIGHT, then down and around: a band of water. */
export function waterPath(y: number, amp: number, period: number, bottom = BOTTOM): { fill: string; crest: string } {
  let crest = `M${LEFT} ${y}`
  for (let x = LEFT; x < RIGHT; x += period) {
    crest += `Q${x + period / 4} ${y - amp} ${x + period / 2} ${y}T${x + period} ${y}`
  }
  return { crest, fill: `${crest}L${RIGHT + period} ${bottom}L${LEFT} ${bottom}Z` }
}

/** Scattered round stars inside a box, the same every time for a given seed. */
export function stars(seed: number, count: number, box: { x: number; y: number; w: number; h: number }, size: [number, number] = [1.6, 5]): string {
  const rng = createRng(seed)
  let out = ''
  for (let i = 0; i < count; i++) {
    const x = box.x + rng.next() * box.w
    const y = box.y + rng.next() * box.h
    const r = size[0] + rng.next() ** 2 * (size[1] - size[0])
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" opacity="${(0.35 + rng.next() * 0.65).toFixed(2)}"/>`
  }
  return out
}

/** A four-pointed sparkle, for the brightest stars. */
export function sparkle(x: number, y: number, r: number): string {
  const t = r * 0.18
  return `<path d="M${x} ${y - r}L${x + t} ${y - t}L${x + r} ${y}L${x + t} ${y + t}L${x} ${y + r}L${x - t} ${y + t}L${x - r} ${y}L${x - t} ${y - t}Z"/>`
}

/** Rays fanning out from a point, between two angles (in radians, 0 = right, clockwise). */
export function rays(cx: number, cy: number, { count = 18, from = Math.PI, to = Math.PI * 2, width = 0.03, length = 2400 } = {}): string {
  let out = ''
  for (let i = 0; i < count; i += 2) {
    const a = from + ((i + 0.5) / count) * (to - from)
    const p1 = `${(cx + Math.cos(a - width) * length).toFixed(1)} ${(cy + Math.sin(a - width) * length).toFixed(1)}`
    const p2 = `${(cx + Math.cos(a + width) * length).toFixed(1)} ${(cy + Math.sin(a + width) * length).toFixed(1)}`
    out += `<path d="M${cx} ${cy}L${p1}L${p2}Z"/>`
  }
  return out
}

/** The layered "cloud of many edges" motif (inspired by the mega mendung batik clouds). */
const CLOUD = 'M6 34C0 34 0 24 8 23C6 13 20 9 28 15C30 5 46 1 54 10C60 2 76 2 80 12C88 6 102 9 102 19C112 18 118 26 112 34Z'
export function cloud(x: number, y: number, scale: number, colors: [string, string, string]): string {
  const [outer, middle, inner] = colors
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="${CLOUD}" fill="${outer}"/>
    <path d="${CLOUD}" fill="${middle}" transform="translate(12.5 7.5) scale(.78)"/>
    <path d="${CLOUD}" fill="${inner}" transform="translate(25.1 15) scale(.56)"/>
  </g>`
}

/**
 * A rolling line of hills across the whole width: a smooth curve through the given
 * heights, spaced evenly from LEFT to RIGHT, closed down to `bottom`.
 */
export function hills(heights: number[], bottom = BOTTOM): string {
  const step = (RIGHT - LEFT) / (heights.length - 1)
  const pts = heights.map((h, i) => [LEFT + i * step, h] as const)
  let d = `M${LEFT} ${bottom}L${pts[0]![0]} ${pts[0]![1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!
    const [x1, y1] = pts[i]!
    const mx = (x0 + x1) / 2
    d += `C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`
  }
  return `${d}L${RIGHT} ${bottom}Z`
}

/** The top edge of `hills`, without closing it, for a lit rim along the crest. */
export function hillCrest(heights: number[]): string {
  const step = (RIGHT - LEFT) / (heights.length - 1)
  const pts = heights.map((h, i) => [LEFT + i * step, h] as const)
  let d = `M${pts[0]![0]} ${pts[0]![1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!
    const [x1, y1] = pts[i]!
    const mx = (x0 + x1) / 2
    d += `C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`
  }
  return d
}
