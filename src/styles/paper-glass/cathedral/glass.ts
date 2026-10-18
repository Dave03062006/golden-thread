import { createRng, type Rng } from '../../../engine/random'
import { WINDOW, medallionCentres } from '../../../cathedral/layout'
import type { CathedralWindow, PanelState } from '../../../cathedral/model'

/**
 * The glass of the cathedral in Paper & Glass (spec §9.1), built from real pieces: a
 * mosaic of cut glass filling a tall pointed window, with one round medallion per
 * episode, read bottom to top, each holding its episode's emblem, and lead lines between
 * every piece. The art is plain data (pieces and lines), so it can be drawn into a cached
 * picture for the nave, or animated piece by piece when a panel is set.
 */

type Pt = [number, number]

export interface Piece {
  d: string
  /** Its color when lit. */
  color: string
}

export interface Medallion {
  episode: string
  cx: number
  cy: number
  /** The pieces inside the round, in the medallion's own space (centred on 0, 0). */
  glass: Piece[]
}

export interface WindowArt {
  width: number
  height: number
  /** The pointed outline of the window, inset by `d`. */
  outline: (d: number) => string
  field: Piece[]
  medallions: Medallion[]
}

export const WIN_W = WINDOW.w
export const WIN_H = WINDOW.h
/** A medallion's outer ring and inner disc. */
export const RING = 22
export const DISC = 18

const P = (pts: Pt[]) => 'M' + pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join('L') + 'Z'
const circ = (cx: number, cy: number, r: number, n = 16) => P(Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * Math.PI * 2), cy + r * Math.sin((i / n) * Math.PI * 2)] as Pt))
const star8 = (x: number, y: number, r: number) =>
  P(Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 - Math.PI / 2
    const rr = i % 2 ? r * 0.42 : i % 4 ? r * 0.7 : r
    return [x + rr * Math.cos(a), y + rr * Math.sin(a)] as Pt
  }))

/** Clips a polygon to one side of the line a·x + b·y = c. */
function clip(poly: Pt[], a: number, b: number, c: number): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i]!
    const q = poly[(i + 1) % poly.length]!
    const pv = a * p[0] + b * p[1] - c
    const qv = a * q[0] + b * q[1] - c
    if (pv <= 0) out.push(p)
    if ((pv < 0 && qv > 0) || (pv > 0 && qv < 0)) {
      const t = pv / (pv - qv)
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])])
    }
  }
  return out
}

/** The mosaic: each site's Voronoi cell within a box. */
function cells(sites: Pt[], box: [number, number, number, number]): Pt[][] {
  return sites
    .map((s, i) => {
      let poly: Pt[] = [
        [box[0], box[1]],
        [box[2], box[1]],
        [box[2], box[3]],
        [box[0], box[3]],
      ]
      for (let j = 0; j < sites.length && poly.length > 2; j++) {
        if (j === i) continue
        const t = sites[j]!
        poly = clip(poly, 2 * (t[0] - s[0]), 2 * (t[1] - s[1]), t[0] * t[0] + t[1] * t[1] - s[0] * s[0] - s[1] * s[1])
      }
      return poly
    })
    .filter((p) => p.length > 2)
}

/** Points on a jittered grid, for a mosaic of roughly even pieces. */
function sitesIn(box: [number, number, number, number], sx: number, sy: number, jitter: number, rng: Rng): Pt[] {
  const out: Pt[] = []
  let row = 0
  for (let y = box[1] + sy / 2; y < box[3] + sy / 2; y += sy, row++) {
    for (let x = box[0] + (row % 2 ? 0 : sx / 2); x < box[2] + sx / 2; x += sx) out.push([x + (rng.next() - 0.5) * sx * jitter, y + (rng.next() - 0.5) * sy * jitter])
  }
  return out
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
const rgb = (c: number[]) => `rgb(${c.map((v) => Math.round(Math.max(0, Math.min(255, v)))).join(',')})`
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i]! - v) * t)
const shade = (c: number[], k: number) => c.map((v) => v * k)

const DARK = [34, 30, 46]

/** A piece's color for a panel's state: full in the light, or the dull glass of an unlit window. */
export function tone(color: string, lit: boolean): string {
  return lit ? color : rgb(shade(mix(hex(color), DARK, 0.78), 0.75))
}

/**
 * The emblem in each episode's medallion, drawn in glass, in the medallion's own space
 * (a disc of radius 18 around 0, 0). Each is a set of pieces and colors.
 */
export const EMBLEMS: Record<string, () => Piece[]> = {
  // The first light: a sun with rays.
  creation: () => [
    ...Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2
      return { d: P([[Math.cos(a - 0.22) * 8, Math.sin(a - 0.22) * 8], [Math.cos(a) * 15, Math.sin(a) * 15], [Math.cos(a + 0.22) * 8, Math.sin(a + 0.22) * 8]]), color: '#f3a93b' }
    }),
    { d: circ(0, 0, 6.8), color: '#f8d24f' },
  ],
  // The garden: a tree, and the river parting into four below it.
  garden: () => [
    { d: P([[-1.6, 2], [1.6, 2], [2, 9], [-2, 9]]), color: '#7a4a22' },
    { d: circ(0, -4, 8.5), color: '#3f9a4a' },
    { d: circ(-3.5, -6, 3.4, 10), color: '#6cc060' },
    { d: P([[-15, 9], [15, 9], [15, 12], [-15, 12]]), color: '#2f7fb8' },
    { d: P([[-2, 12], [2, 12], [-6, 18], [-10, 18]]), color: '#2f7fb8' },
    { d: P([[2, 12], [-2, 12], [6, 18], [10, 18]]), color: '#2f7fb8' },
  ],
  // The one fruit, with the serpent coiled by it.
  fruit: () => [
    { d: P([[-1.6, 1], [1.6, 1], [2, 15], [-2, 15]]), color: '#7a4a22' },
    { d: circ(0, -4, 9.5), color: '#2c6a3a' },
    { d: circ(4, -2, 3.2, 12), color: '#d0283c' },
    { d: P([[-10, 7], [-6, 4], [-2, 6], [-6, 9], [-2, 11], [-7, 12], [-11, 10]]), color: '#8aa25a' },
  ],
  // The promise: one point of light in the dark.
  promise: () => [
    { d: star8(0, -1, 12), color: '#fff2c0' },
    { d: circ(0, -1, 3.6, 12), color: '#ffffff' },
  ],
  // Abel's offering: a lamb on the altar.
  lamb: () => [
    { d: P([[-11, 8], [11, 8], [11, 15], [-11, 15]]), color: '#9a8a7a' },
    { d: P([[-8, -2], [6, -2], [8, 2], [6, 7], [-8, 7], [-10, 2]]), color: '#f4efe4' },
    { d: circ(8, -4, 3.6, 10), color: '#f4efe4' },
    { d: P([[-6, 7], [-4, 7], [-4, 8], [-6, 8]]), color: '#3a3340' },
    { d: P([[3, 7], [5, 7], [5, 8], [3, 8]]), color: '#3a3340' },
  ],
  // The family tree from Adam to Noah: a trunk with leaves of gold.
  'family-tree': () => [
    { d: P([[-1.6, -12], [1.6, -12], [2.2, 15], [-2.2, 15]]), color: '#7a4a22' },
    ...[-8, -2, 4, 10].flatMap((y, i) => [
      { d: P([[0, y], [-9, y - 4], [-9, y - 2], [0, y + 2]]), color: '#7a4a22' },
      { d: circ(-10, y - 4, 2.6, 10), color: i % 2 ? '#f4d06a' : '#e0b040' },
      { d: P([[0, y - 3], [9, y - 7], [9, y - 5], [0, y - 1]]), color: '#7a4a22' },
      { d: circ(10, y - 7, 2.6, 10), color: i % 2 ? '#e0b040' : '#f4d06a' },
    ]),
  ],
}

/** The medallions' backgrounds: deep blue, with one ruby for the darkest story. */
const MEDALLION_BG: Record<string, string> = { lamb: '#7a1a2a' }

/** A window of a built level, or one standing dark and waiting for its level. */
export function windowArt(window: CathedralWindow, seed: number): WindowArt {
  const rng = createRng(seed)
  const W = WIN_W
  const H = WIN_H
  const r = 0.8 * W
  const off = r - W / 2
  const spring = Math.sqrt(r * r - off * off)
  const outline = (d: number) => {
    const rr = r - d
    const apex = spring - Math.sqrt(rr * rr - off * off)
    return `M${d} ${H - d}L${d} ${spring.toFixed(2)}A${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${W / 2} ${apex.toFixed(2)}A${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${W - d} ${spring.toFixed(2)}L${W - d} ${H - d}Z`
  }

  // The mosaic behind everything: mostly blue, with ruby and gold.
  const field: Piece[] = cells(sitesIn([0, 0, W, H], 15, 13, 0.8, rng), [0, 0, W, H]).map((poly) => {
    const roll = rng.next()
    const base = roll < 0.13 ? '#8e1a33' : roll < 0.19 ? '#d9a640' : ['#24409a', '#1d3585', '#2c4fb0'][Math.floor(rng.next() * 3)]!
    return { d: P(poly), color: rgb(shade(hex(base), 0.88 + rng.next() * 0.24)) }
  })
  // A quatrefoil rose in the point of the arch.
  const rose = { x: W / 2, y: 46 }
  for (const [dx, dy] of [
    [0, -7],
    [7, 0],
    [0, 7],
    [-7, 0],
  ] as Pt[])
    field.push({ d: circ(rose.x + dx, rose.y + dy, 6.6, 12), color: '#c9393f' })
  field.push({ d: circ(rose.x, rose.y, 4.2, 10), color: '#f2c94c' })

  // The medallions, bottom to top, where the nave's layout puts them.
  const centres = medallionCentres(window.panels.length)
  const medallions: Medallion[] = window.panels.map((panel, i) => {
    const cy = centres[i]!.y
    const bg = MEDALLION_BG[panel.emblem] ?? '#1d2f7a'
    const box: [number, number, number, number] = [-DISC, -DISC, DISC, DISC]
    const backdrop = cells(sitesIn(box, 8, 8, 0.8, rng), box).map((poly) => ({ d: P(poly), color: rgb(shade(hex(bg), 0.86 + rng.next() * 0.28)) }))
    return { episode: panel.episode, cx: W / 2, cy, glass: [...backdrop, ...(EMBLEMS[panel.emblem]?.() ?? [])] }
  })
  return { width: W, height: H, outline, field, medallions }
}

/**
 * The whole window as SVG, in window units, with each medallion lit or dark. Panels being
 * set (`new`) are left dark here: the setting animation lights them.
 */
export function windowSvg(art: WindowArt, states: Record<string, PanelState>, built: boolean): string {
  const anyLit = Object.values(states).some((s) => s === 'lit')
  const lit = (episode: string) => states[episode] === 'lit'
  const fieldOn = built && anyLit
  const field = art.field.map((p) => `<path d="${p.d}" fill="${tone(p.color, fieldOn)}"/>`).join('')
  const lead = art.field.map((p) => `<path d="${p.d}"/>`).join('')
  const medallions = art.medallions
    .map((m) => {
      const on = lit(m.episode)
      const glass = m.glass.map((p) => `<path d="${p.d}" fill="${tone(p.color, on)}"/>`).join('')
      const leads = m.glass.map((p) => `<path d="${p.d}"/>`).join('')
      return `<g transform="translate(${m.cx} ${m.cy})">
        <circle r="${RING}" fill="${tone('#9e1b32', on)}"/>
        <g clip-path="url(#disc)">${glass}<g fill="none" stroke="#100d14" stroke-width=".8" stroke-linejoin="round">${leads}</g></g>
        <circle r="${DISC}" fill="none" stroke="#100d14" stroke-width="1.4"/><circle r="${RING}" fill="none" stroke="#100d14" stroke-width="1.6"/>
        ${on ? `<circle r="${RING}" fill="url(#halo)"/>` : ''}
      </g>`
    })
    .join('')
  // Iron bars across the window, as real ones have.
  const bars = [0.3, 0.55, 0.8].map((t) => `<path d="M0 ${(art.height * t).toFixed(1)}H${art.width}"/>`).join('')
  return `
    <defs>
      <clipPath id="field"><path d="${art.outline(6)}"/></clipPath>
      <clipPath id="disc"><circle r="${DISC}"/></clipPath>
      <radialGradient id="halo"><stop offset="0" stop-color="#fff6d8" stop-opacity=".28"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
      <filter id="tex" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="6" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0" result="g"/>
        <feBlend in="SourceGraphic" in2="g" mode="soft-light" result="b"/>
        <feComposite in="b" in2="SourceGraphic" operator="in"/>
      </filter>
    </defs>
    <path d="${art.outline(-6)}" fill="#2a2232" stroke="#3a3046" stroke-width="2"/>
    <path d="${art.outline(0)}" fill="${fieldOn ? '#8a1830' : '#2a2030'}"/>
    <g clip-path="url(#field)">
      <g filter="url(#tex)">${field}</g>
      <g fill="none" stroke="#100d14" stroke-width="1" stroke-linejoin="round">${lead}</g>
      <g stroke="#0c0a10" stroke-width="2.4">${bars}</g>
    </g>
    ${built ? medallions : ''}
    <path d="${art.outline(6)}" fill="none" stroke="#100d14" stroke-width="2"/>
    <path d="${art.outline(0)}" fill="none" stroke="#100d14" stroke-width="2.4"/>`
}
