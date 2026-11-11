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

export type Pt = [number, number]

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
export function cells(sites: Pt[], box: [number, number, number, number]): Pt[][] {
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

  // Level 2 · Noah and the Nations
  // Walking with God: a path rising toward a lamp of light.
  walk: () => [
    { d: P([[-12, 15], [12, 15], [3, -2], [-3, -2]]), color: '#c8a46a' },
    { d: P([[-7, 15], [-3, 15], [-1, 2], [-2, 2]]), color: '#e8cf94' },
    { d: circ(0, -8, 6, 12), color: '#ffe48a' },
    { d: circ(0, -8, 2.6, 10), color: '#ffffff' },
  ],
  // The ark on the waters.
  ark: () => [
    { d: P([[-14, 2], [14, 2], [10, 9], [-10, 9]]), color: '#8a5a2a' },
    { d: P([[-8, -6], [8, -6], [8, 2], [-8, 2]]), color: '#a8743a' },
    { d: P([[-10, -6], [0, -12], [10, -6]]), color: '#6a4220' },
    { d: P([[-2, -3], [2, -3], [2, 2], [-2, 2]]), color: '#ffd36e' },
    { d: P([[-17, 9], [17, 9], [17, 15], [-17, 15]]), color: '#2f6fb8' },
  ],
  // The storm: rain over the waves.
  storm: () => [
    { d: circ(-5, -9, 7, 12), color: '#5a6278' },
    { d: circ(5, -10, 6, 12), color: '#6a7290' },
    ...[-9, -3, 3, 9].map((x) => ({ d: P([[x, -2], [x + 1.4, -2], [x - 1, 5], [x - 2.4, 5]]), color: '#8ab8e8' })),
    { d: P([[-17, 8], [-10, 5], [-3, 8], [4, 5], [11, 8], [17, 6], [17, 15], [-17, 15]]), color: '#1f5a9a' },
  ],
  // The dove with the olive leaf in her beak.
  'olive-dove': () => [
    { d: P([[-12, 2], [-2, -2], [8, -6], [12, -4], [6, 2], [-4, 6]]), color: '#f6f6fa' },
    { d: P([[-3, -1], [-9, -12], [1, -3]]), color: '#e2e6f0' },
    { d: P([[12, -4], [16, -4], [13, -2]]), color: '#e0a040' },
    { d: P([[15, -3], [19, 0], [15, 1]]), color: '#5aa84a' },
  ],
  // The rainbow over the hills.
  rainbow: () => [
    ...['#d8303a', '#f08a2a', '#f6d43a', '#4aa84a', '#3a7ad0', '#7a4ac0'].map((color, i) => {
      const outer = 16 - i * 2.2
      const inner = outer - 2.2
      const arc = (r: number) => Array.from({ length: 13 }, (_, k) => [Math.cos(Math.PI + (k / 12) * Math.PI) * r, 6 + Math.sin(Math.PI + (k / 12) * Math.PI) * r] as Pt)
      return { d: P([...arc(outer), ...arc(inner).reverse()]), color }
    }),
    { d: P([[-17, 9], [-6, 5], [6, 7], [17, 4], [17, 15], [-17, 15]]), color: '#3e8a46' },
  ],
  // The tower of Babel: a stepped ziggurat of brick.
  tower: () => [
    { d: P([[-14, 15], [14, 15], [14, 9], [-14, 9]]), color: '#b8743a' },
    { d: P([[-10, 9], [10, 9], [10, 3], [-10, 3]]), color: '#c8844a' },
    { d: P([[-6, 3], [6, 3], [6, -3], [-6, -3]]), color: '#d8945a' },
    { d: P([[-3, -3], [3, -3], [3, -9], [-3, -9]]), color: '#e8a86a' },
    { d: P([[-2, -9], [2, -9], [1, -13], [-1, -13]]), color: '#f0c080' },
  ],
  // The star over Abram's tent.
  star: () => [
    { d: star8(0, -5, 11), color: '#fff2c0' },
    { d: circ(0, -5, 3, 10), color: '#ffffff' },
    { d: P([[-12, 15], [0, 6], [12, 15]]), color: '#c8a46a' },
    { d: P([[-2, 15], [0, 10], [2, 15]]), color: '#5a3a1a' },
  ],
  // Level 3 · Abraham, Father of Faith
  // The call: a road into the hills, a shepherd's staff, the sun rising.
  call: () => [
    { d: circ(7, -8, 5, 12), color: '#ffd36e' },
    { d: P([[-17, 15], [17, 15], [17, 4], [8, 0], [0, 3], [-9, -1], [-17, 3]]), color: '#7a9a5a' },
    { d: P([[-4, 15], [4, 15], [1, 2], [-1, 2]]), color: '#e0c48a' },
    { d: P([[-11, 13], [-9, 13], [-9, -8], [-11, -8]]), color: '#7a4a22' },
    { d: P([[-11, -8], [-11, -12], [-6, -13], [-5, -9], [-7, -9], [-7, -11], [-9, -10], [-9, -8]]), color: '#7a4a22' },
  ],
  // An altar of stones on a hilltop, its fire burning.
  'altar-hill': () => [
    { d: P([[-17, 15], [-10, 4], [0, 1], [10, 4], [17, 15]]), color: '#6a8a4a' },
    { d: P([[-6, 2], [6, 2], [6, -3], [-6, -3]]), color: '#a8a090' },
    { d: P([[-6, -3], [6, -3], [6, -7], [-6, -7]]), color: '#c0b8a6' },
    { d: P([[-4, -7], [-2, -14], [0, -9], [2, -15], [4, -7]]), color: '#f08a3a' },
    { d: P([[-2, -7], [0, -11], [2, -7]]), color: '#ffd27a' },
  ],
  // Melchizedek's bread and wine.
  'bread-wine': () => [
    { d: circ(-6, 4, 8, 16), color: '#c8904a' },
    { d: P([[-11, 2], [-1, 2], [-1, 3], [-11, 3]]), color: '#e0b070' },
    { d: P([[3, -12], [13, -12], [11, -2], [5, -2]]), color: '#e8c060' },
    { d: P([[4, -11], [12, -11], [11, -6], [5, -6]]), color: '#8a1a3a' },
    { d: P([[7, -2], [9, -2], [9, 9], [7, 9]]), color: '#e8c060' },
    { d: P([[3, 9], [13, 9], [13, 11], [3, 11]]), color: '#e8c060' },
  ],
  // The stars Abram was told to count.
  stars: () => [
    { d: circ(0, 0, 18, 20), color: '#1a2050' },
    { d: star8(-3, -4, 6), color: '#fff2c0' },
    ...[[-10, 6], [8, -10], [10, 5], [-11, -10], [3, 10], [12, -2], [-6, 12], [-14, 0], [6, 1]].map(([x, y]) => ({ d: circ(x!, y!, 1.3, 6), color: '#f4e4a0' })),
  ],
  // The well in the wilderness.
  well: () => [
    { d: P([[-17, 15], [17, 15], [17, 6], [-17, 6]]), color: '#d8b070' },
    { d: P([[-9, 8], [9, 8], [9, -2], [-9, -2]]), color: '#a89a86' },
    { d: P([[-7, -2], [7, -2], [7, 0], [-7, 0]]), color: '#3a8ad0' },
    { d: P([[8, -2], [9, -2], [11, -15], [10, -15]]), color: '#7a5a32' },
    { d: P([[10, -15], [16, -11], [10, -13], [4, -11]]), color: '#4a8a4a' },
  ],
  // A new name: the letter of God's breath, shining.
  'new-name': () => [
    { d: P([[-10, -10], [10, -10], [10, -6], [-10, -6]]), color: '#ffe48a' },
    { d: P([[6, -6], [10, -6], [10, 12], [6, 12]]), color: '#ffe48a' },
    { d: P([[-10, -1], [-6, -1], [-6, 12], [-10, 12]]), color: '#ffe48a' },
    { d: circ(0, 0, 3, 10), color: '#ffffff' },
  ],
  // The three visitors under the oak at Mamre.
  visitors: () => [
    { d: circ(0, -9, 10, 16), color: '#3e7a40' },
    ...[-9, 0, 9].flatMap((x) => [
      { d: circ(x, -1, 2.6, 10), color: '#fff6dc' },
      { d: P([[x - 3, 14], [x + 3, 14], [x + 2, 2], [x - 2, 2]]), color: '#f6e6b8' },
    ]),
  ],
  // Abraham pleading for Sodom: hands lifted up.
  pleading: () => [
    { d: P([[-8, 15], [-3, 15], [-4, -2], [-9, -6]]), color: '#e8b890' },
    { d: P([[8, 15], [3, 15], [4, -2], [9, -6]]), color: '#e8b890' },
    ...[[-12, -10], [-9, -12], [-6, -11]].map(([x, y]) => ({ d: P([[x!, y!], [x! + 2, y! - 1], [x! + 3, y! + 6], [x! + 1, y! + 7]]), color: '#e8b890' })),
    ...[[12, -10], [9, -12], [6, -11]].map(([x, y]) => ({ d: P([[x!, y!], [x! - 2, y! - 1], [x! - 3, y! + 6], [x! - 1, y! + 7]]), color: '#e8b890' })),
    { d: circ(0, -14, 3, 10), color: '#ffe48a' },
  ],
  // Laughter: the child of promise in his cradle.
  laughter: () => [
    { d: P([[-13, 2], [13, 2], [10, 11], [-10, 11]]), color: '#a8743a' },
    { d: P([[-8, 13], [-6, 11], [6, 11], [8, 13]]), color: '#7a4a22' },
    { d: circ(-3, -3, 5, 12), color: '#e8b890' },
    { d: P([[0, -2], [11, -2], [11, 2], [0, 2]]), color: '#f6f0e4' },
    { d: star8(9, -11, 4), color: '#ffe48a' },
  ],
  // The ram caught in the thicket by its horns.
  ram: () => [
    { d: P([[-17, 15], [-12, 4], [-6, 8], [0, 2], [6, 7], [12, 3], [17, 15]]), color: '#3e6a34' },
    { d: P([[-8, 0], [8, 0], [9, 8], [-9, 8]]), color: '#efe6d4' },
    { d: circ(-9, -3, 4.5, 12), color: '#efe6d4' },
    { d: P([[-12, -6], [-16, -10], [-17, -4], [-14, -1], [-13, -4]]), color: '#a88a5a' },
    { d: P([[-6, -6], [-3, -11], [1, -8], [-1, -4], [-3, -6]]), color: '#a88a5a' },
    { d: circ(-10, -3, 0.9, 6), color: '#2a1e1a' },
  ],
  // Level 4 · Isaac and Jacob
  // Rebekah's jar, pouring water into the trough for the camels.
  jar: () => [
    { d: P([[-17, 15], [17, 15], [17, 8], [-17, 8]]), color: '#a89a86' },
    { d: P([[-15, 8], [15, 8], [15, 11], [-15, 11]]), color: '#3a8ad0' },
    { d: P([[-12, -12], [-2, -14], [4, -8], [2, -2], [-8, 0], [-13, -5]]), color: '#c8784a' },
    { d: P([[4, -8], [9, -9], [10, -6], [5, -5]]), color: '#a85a32' },
    { d: P([[9, -7], [11, -7], [12, 8], [10, 8]]), color: '#8ad0f8' },
  ],
  // The bowl of red stew Esau sold his birthright for, steaming.
  stew: () => [
    { d: P([[-15, 0], [15, 0], [10, 11], [-10, 11]]), color: '#8a5a32' },
    { d: P([[-14, 0], [14, 0], [13, -3], [-13, -3]]), color: '#c0402a' },
    { d: P([[-6, 14], [6, 14], [5, 11], [-5, 11]]), color: '#6a4224' },
    ...[-6, 0, 6].map((x) => ({ d: P([[x - 1, -5], [x + 1, -5], [x + 2, -10], [x, -15], [x - 1, -10]]), color: '#e8e0d0' })),
  ],
  // The blessing: an old man's hand laid on a bowed head, over the borrowed robe.
  blessing: () => [
    { d: P([[-14, 15], [14, 15], [10, 3], [-10, 3]]), color: '#3c6a4a' },
    { d: circ(0, -2, 6, 14), color: '#e8b890' },
    { d: P([[-17, -12], [2, -13], [6, -10], [2, -7], [-17, -7]]), color: '#d8a880' },
    { d: star8(11, -12, 4), color: '#ffe48a' },
  ],
  // The ladder set up on the earth, its top reaching to heaven.
  ladder: () => {
    const left = (y: number) => -7.5 + ((16 - y) / 30) * 4.5
    return [
      { d: P([[-9, 16], [-6, 16], [-2, -14], [-4, -14]]), color: '#ffe48a' },
      { d: P([[6, 16], [9, 16], [4, -14], [2, -14]]), color: '#ffe48a' },
      ...[11, 5, -1, -7].map((y) => ({ d: P([[left(y), y], [-left(y), y], [-left(y + 1.6), y + 1.6], [left(y + 1.6), y + 1.6]]), color: '#f4d070' })),
      { d: star8(0, -13, 5.5), color: '#ffffff' },
    ]
  },
  // The Lion of the tribe of Judah.
  lion: () => [
    { d: P([[-17, 15], [17, 15], [17, 11], [-17, 11]]), color: '#6a8a4a' },
    { d: P([[-12, 11], [7, 11], [7, 0], [-10, -1]]), color: '#d8a040' },
    { d: P([[-12, 0], [-16, -7], [-14, -8], [-10, -2]]), color: '#d8a040' },
    { d: circ(7, -4, 8, 16), color: '#a8602a' },
    { d: circ(8, -4, 4.5, 12), color: '#e8b050' },
    { d: star8(-6, -12, 3.5), color: '#ffe48a' },
  ],
  // Dawn breaking over the hills by the Jabbok.
  dawn: () => [
    ...Array.from({ length: 5 }, (_, i) => {
      const a = Math.PI + ((i + 0.5) / 5) * Math.PI
      return { d: P([[Math.cos(a - 0.18) * 10, 4 + Math.sin(a - 0.18) * 10], [Math.cos(a) * 17, 4 + Math.sin(a) * 17], [Math.cos(a + 0.18) * 10, 4 + Math.sin(a + 0.18) * 10]]), color: '#f3a93b' }
    }),
    { d: circ(0, 4, 8, 16), color: '#ffd27a' },
    { d: P([[-17, 15], [-17, 6], [-8, 2], [0, 6], [8, 1], [17, 6], [17, 15]]), color: '#3a3050' },
    { d: P([[-17, 11], [17, 9], [17, 12], [-17, 14]]), color: '#3a8ad0' },
  ],
  // The brothers in each other's arms.
  embrace: () => [
    { d: P([[-12, 15], [-3, 15], [-1, -2], [-7, -4]]), color: '#3c6a4a' },
    { d: P([[12, 15], [3, 15], [1, -2], [7, -4]]), color: '#8a2a2a' },
    { d: circ(-4, -8, 4, 12), color: '#e8b890' },
    { d: circ(4, -8, 4, 12), color: '#d89870' },
    { d: P([[-7, -2], [7, -2], [7, 1], [-7, 1]]), color: '#e0a880' },
    { d: star8(0, -15, 3), color: '#ffe48a' },
  ],
  // Level 5 · Joseph and His Brothers
  // The twenty pieces of silver, spilled from a purse.
  silver: () => [
    { d: P([[-14, 4], [-4, -6], [2, -4], [0, 8], [-10, 12]]), color: '#8a5a32' },
    ...[[-4, 10], [5, 7], [12, 11], [8, 2], [13, -2], [3, 13]].map(([x, y]) => ({ d: circ(x!, y!, 3.4, 12), color: '#e8eef4' })),
    { d: star8(-9, -12, 3), color: '#ffffff' },
  ],
  // The prison window, and the light that came in: the LORD was with Joseph.
  'prison-window': () => [
    { d: P([[-10, -14], [10, -14], [10, 8], [-10, 8]]), color: '#ffe8a8' },
    ...[-5, 0, 5].map((x) => ({ d: P([[x - 1, -14], [x + 1, -14], [x + 1, 8], [x - 1, 8]]), color: '#3a3a4a' })),
    { d: P([[-10, 8], [10, 8], [16, 16], [-16, 16]]), color: '#e8c870' },
  ],
  // Pharaoh's dream: full ears of grain.
  'grain-ears': () => [
    ...[-8, 0, 8].flatMap((x, i) => [
      { d: P([[x - 0.8, 16], [x + 0.8, 16], [x + 0.8, -2], [x - 0.8, -2]]), color: '#a8843a' },
      ...[0, 1, 2, 3].map((k) => ({ d: circ(x + (k % 2 ? 2 : -2), -4 - k * 3 - (i === 1 ? 2 : 0), 2.4, 10), color: '#f0c850' })),
    ]),
  ],
  // A sack of grain, tied at the neck, spilling over.
  'grain-sack': () => [
    { d: P([[-10, -6], [10, -6], [13, 14], [-13, 14]]), color: '#c8a070' },
    { d: P([[-6, -10], [6, -10], [4, -6], [-4, -6]]), color: '#a8804a' },
    ...[[-3, -12], [1, -13], [4, -12], [-1, -15]].map(([x, y]) => ({ d: circ(x!, y!, 1.6, 8), color: '#f0c850' })),
  ],
  // Joseph's silver cup.
  'silver-cup': () => [
    { d: P([[-10, -12], [10, -12], [6, 0], [-6, 0]]), color: '#dfe6ee' },
    { d: P([[-1.5, 0], [1.5, 0], [1.5, 10], [-1.5, 10]]), color: '#c8d0da' },
    { d: P([[-8, 10], [8, 10], [8, 13], [-8, 13]]), color: '#dfe6ee' },
    { d: star8(7, -10, 3.5), color: '#ffffff' },
  ],
  // Joseph's open arms: "Come near to me."
  'open-arms': () => [
    { d: P([[-5, 15], [5, 15], [4, -2], [-4, -2]]), color: '#efe6d4' },
    { d: circ(0, -6, 4, 12), color: '#d8a880' },
    { d: P([[-4, -1], [-16, -10], [-15, -12], [-3, -4]]), color: '#d8a880' },
    { d: P([[4, -1], [16, -10], [15, -12], [3, -4]]), color: '#d8a880' },
    { d: star8(0, -15, 3), color: '#ffe48a' },
  ],
  // The scepter of Judah.
  scepter: () => [
    { d: P([[-1.5, -8], [1.5, -8], [2, 16], [-2, 16]]), color: '#e8c060' },
    { d: circ(0, -11, 5, 14), color: '#f0d070' },
    { d: P([[-6, -14], [-3, -20], [0, -15], [3, -20], [6, -14]]), color: '#f8e08a' },
    { d: circ(0, -11, 2, 8), color: '#c03a3a' },
  ],
  // Level 6 · Job
  // An open hand, held up: "The LORD gave, and the LORD has taken away."
  'open-hand': () => [
    { d: P([[-7, 16], [5, 16], [7, 2], [-9, 2]]), color: '#d8a880' },
    ...[-7, -3, 1, 5].map((x, i) => ({ d: P([[x - 1.6, 2], [x + 1.6, 2], [x + 1.6, -10 + (i === 0 || i === 3 ? 3 : 0)], [x - 1.6, -10 + (i === 0 || i === 3 ? 3 : 0)]]), color: '#e8b890' })),
    { d: P([[7, 6], [14, -2], [15, 0], [8, 9]]), color: '#e8b890' },
    { d: star8(-1, -15, 3), color: '#ffe48a' },
  ],
  // Seven marks in the dust, under the moon: seven days and seven nights.
  'seven-marks': () => [
    { d: P([[-16, 6], [16, 6], [16, 16], [-16, 16]]), color: '#a89070' },
    ...[-12, -8, -4, 0, 4, 8, 12].map((x) => ({ d: P([[x - 0.8, 8], [x + 0.8, 8], [x + 1.6, 14], [x - 0.2, 14]]), color: '#5a4630' })),
    { d: circ(6, -9, 6, 16), color: '#f0e6c0' },
    { d: circ(9, -11, 5, 16), color: '#24409a' },
    ...[[-10, -12], [-4, -6], [-12, -2]].map(([x, y]) => ({ d: star8(x!, y!, 1.6), color: '#ffffff' })),
  ],
  // Gold coming out of the fire: "When he has tried me, I shall come forth as gold."
  'refined-gold': () => [
    { d: P([[-12, 16], [-8, 4], [-4, 10], [0, -2], [4, 10], [8, 4], [12, 16]]), color: '#e0602a' },
    { d: P([[-7, 16], [-4, 9], [0, 4], [4, 9], [7, 16]]), color: '#f0a83a' },
    { d: P([[-8, -6], [8, -6], [6, -12], [-6, -12]]), color: '#f0c850' },
    { d: P([[-6, -12], [6, -12], [4, -16], [-4, -16]]), color: '#f8e08a' },
    { d: star8(9, -14, 3), color: '#ffffff' },
  ],
  // The words carved in the rock, in letters of light: "I know that my Redeemer lives."
  'carved-rock': () => [
    { d: P([[-14, 16], [-15, -6], [-9, -14], [8, -15], [15, -6], [14, 16]]), color: '#8a8070' },
    ...[-8, -3, 2, 7].map((y, i) => ({ d: P([[-9, y - 0.9], [9 - (i % 2) * 4, y - 0.9], [9 - (i % 2) * 4, y + 0.9], [-9, y + 0.9]]), color: '#ffe48a' })),
    { d: P([[-12, 11], [12, 11], [12, 16], [-12, 16]]), color: '#6a6254' },
  ],
  // The whirlwind, with the light at its heart.
  whirlwind: () => [
    ...[0, 1, 2, 3, 4].map((i) => {
      const w = 15 - i * 2.8
      const y = -14 + i * 6
      return { d: P([[-w + i, y], [w + i, y], [w - 2.4 + i, y + 4.2], [-w + 2.4 + i, y + 4.2]]), color: i % 2 ? '#a0aac4' : '#8a96b0' }
    }),
    { d: P([[3, 14], [5, 14], [4.5, 17], [3.5, 17]]), color: '#a0aac4' },
    { d: circ(0, -2, 3.4, 12), color: '#fff0b0' },
    { d: P([[-12, -6], [-9, -1], [-11, -1], [-8, 5]]), color: '#ffe48a' },
  ],
  // Two sheep side by side: the LORD gave Job twice as much as he had before.
  twofold: () => [
    ...[-7, 7].flatMap((x, i) => [
      { d: circ(x, 4 - i, 7, 16), color: '#f4eee0' },
      { d: circ(x + 6, -1 - i, 3, 12), color: '#3a3030' },
      { d: P([[x - 4, 9], [x - 2, 9], [x - 2, 15], [x - 4, 15]]), color: '#3a3030' },
      { d: P([[x + 2, 9], [x + 4, 9], [x + 4, 15], [x + 2, 15]]), color: '#3a3030' },
    ]),
    { d: star8(0, -13, 3), color: '#ffe48a' },
  ],
  // Level 7 · Moses Is Called
  // A lamp in the window of a Hebrew house, where a baby is safe.
  'window-lamp': () => [
    { d: P([[-14, 16], [-14, -8], [0, -16], [14, -8], [14, 16]]), color: '#b08a5a' },
    { d: P([[-7, 8], [-7, -4], [7, -4], [7, 8]]), color: '#2a2440' },
    { d: P([[-5, 6], [5, 6], [3, 2], [-3, 2]]), color: '#c8784a' },
    { d: P([[0, 2], [2, -2], [0, -5], [-2, -2]]), color: '#ffe48a' },
    { d: star8(0, -2, 4), color: '#fff4c0' },
  ],
  // The little basket of bulrushes among the reeds.
  'reed-basket': () => [
    { d: P([[-16, 10], [16, 10], [16, 16], [-16, 16]]), color: '#3a7ab0' },
    { d: P([[-11, 4], [11, 4], [8, 12], [-8, 12]]), color: '#a8843a' },
    { d: P([[-11, 4], [11, 4], [9, 0], [-9, 0]]), color: '#c8a050' },
    ...[-14, -12, 12, 14].map((x, i) => ({ d: P([[x - 0.8, 12], [x + 0.8, 12], [x + 1.2 * (i < 2 ? -1 : 1), -12 + (i % 2) * 6], [x, -12 + (i % 2) * 6]]), color: '#5a8a3a' })),
    { d: star8(0, -10, 3), color: '#ffe48a' },
  ],
  // The water trough by the well in Midian, full, with a sheep drinking.
  'water-trough': () => [
    { d: P([[-15, 4], [5, 4], [5, 12], [-15, 12]]), color: '#8a6a4a' },
    { d: P([[-13, 4], [3, 4], [3, 7], [-13, 7]]), color: '#5ab0e0' },
    { d: circ(10, 2, 6, 16), color: '#f4eee0' },
    { d: circ(5, 2, 3, 12), color: '#3a3030' },
    { d: P([[8, 7], [10, 7], [10, 14], [8, 14]]), color: '#3a3030' },
    { d: P([[12, 7], [14, 7], [14, 14], [12, 14]]), color: '#3a3030' },
    { d: star8(-6, -10, 3), color: '#ffe48a' },
  ],
  // The bush that burned and was not consumed.
  'burning-bush': () => [
    { d: P([[-16, 16], [16, 16], [14, 12], [-14, 12]]), color: '#8a7a62' },
    { d: P([[-12, 12], [-8, -6], [-2, 2], [0, -14], [3, 0], [8, -8], [12, 12]]), color: '#f08a2a' },
    { d: P([[-7, 12], [-4, 0], [0, 6], [2, -6], [5, 4], [8, 12]]), color: '#ffd84a' },
    ...[[-6, 6], [4, 8], [0, 10], [-9, 9], [8, 6]].map(([x, y]) => ({ d: circ(x!, y!, 2.2, 8), color: '#4a8a3a' })),
  ],
  // The rod of God, and the serpent it became.
  'rod-serpent': () => [
    { d: P([[-9, -16], [-6, -16], [-3, 16], [-6, 16]]), color: '#8a6038' },
    { d: P([[-10, -16], [-4, -16], [-4, -13], [-10, -13]]), color: '#a8743a' },
    { d: P([[2, 14], [8, 10], [3, 4], [9, -2], [4, -8], [8, -12], [11, -11], [7, -7], [12, -2], [6, 4], [11, 10], [4, 16]]), color: '#5a8a3a' },
    { d: circ(9.5, -12.5, 2.4, 10), color: '#4a7a2a' },
  ],
  // Level 8 · The Plagues and the Passover
  // An outstretched arm under an arc of stars: the six "I will"s of God's promise.
  'i-will': () => [
    { d: P([[-15, 16], [-9, 16], [4, -2], [8, -4], [9, -1], [5, 2], [-6, 16]]), color: '#d8b888' },
    { d: P([[-16, 16], [-6, 16], [-8, 12], [-14, 10]]), color: '#3a5a9a' },
    ...[0, 1, 2, 3, 4, 5].map((i) => {
      const a = Math.PI * (0.95 + i * 0.22)
      return { d: star8(Math.round(Math.cos(a) * 12 + 2), Math.round(Math.sin(a) * 12 - 1), 2.2), color: '#ffe48a' }
    }),
  ],
  // Stubble gathered from the field, and a brick that needs it.
  stubble: () => [
    { d: P([[-15, 16], [15, 16], [15, 13], [-15, 13]]), color: '#a8843a' },
    ...[-12, -9, -6, -3, 0, 3].map((x, i) => ({ d: P([[x, 13], [x + 1.6, 13], [x + 1.6 + (i % 2), 2 - (i % 3) * 3], [x + (i % 2), 2 - (i % 3) * 3]]), color: i % 2 ? '#e0c060' : '#c8a04a' })),
    { d: P([[5, 13], [15, 13], [15, 5], [5, 5]]), color: '#b8784a' },
    { d: P([[5, 5], [15, 5], [13, 3], [7, 3]]), color: '#d09060' },
    { d: star8(-4, -12, 3), color: '#ffe48a' },
  ],
  // A frog, the second plague.
  frog: () => [
    { d: P([[-15, 14], [15, 14], [15, 16], [-15, 16]]), color: '#3a7ab0' },
    { d: P([[-12, 12], [-10, 2], [-2, -2], [8, -2], [12, 4], [12, 12]]), color: '#5a9a3a' },
    { d: circ(-4, -4, 3.4, 10), color: '#7aba4a' },
    { d: circ(6, -4, 3.4, 10), color: '#7aba4a' },
    { d: circ(-4, -4.6, 1.4, 8), color: '#1a1a14' },
    { d: circ(6, -4.6, 1.4, 8), color: '#1a1a14' },
    { d: P([[-14, 12], [-10, 6], [-6, 12]]), color: '#4a7a2a' },
    { d: P([[14, 12], [10, 6], [6, 12]]), color: '#4a7a2a' },
  ],
  // A door marked with the blood of the lamb, on its posts and lintel.
  'marked-door': () => [
    { d: P([[-14, 16], [-14, -12], [14, -12], [14, 16]]), color: '#a8845a' },
    { d: P([[-7, 16], [-7, -4], [0, -9], [7, -4], [7, 16]]), color: '#2a2440' },
    { d: P([[-11, -6], [11, -6], [11, -10], [-11, -10]]), color: '#9a1a2a' },
    { d: P([[-10, 16], [-7, 16], [-7, -4], [-10, -4]]), color: '#9a1a2a' },
    { d: P([[7, 16], [10, 16], [10, -4], [7, -4]]), color: '#9a1a2a' },
    { d: star8(0, 6, 2.4), color: '#ffe48a' },
  ],
  // The pillar of fire that went before them by night.
  'pillar-of-fire': () => [
    { d: P([[-16, 16], [16, 16], [16, 12], [-16, 12]]), color: '#c8a46a' },
    { d: P([[-6, 12], [-8, 0], [-5, -10], [0, -17], [5, -10], [8, 0], [6, 12]]), color: '#f08a2a' },
    { d: P([[-3, 12], [-4, 0], [0, -12], [4, 0], [3, 12]]), color: '#ffd84a' },
    ...[-12, 12].map((x) => ({ d: P([[x - 3, 12], [x, 6], [x + 3, 12]]), color: '#e8dcc0' })),
  ],
  // Unleavened bread, flat and quickly baked, for a people leaving in haste.
  'unleavened-bread': () => [
    { d: circ(0, 4, 13, 20), color: '#e8c888' },
    { d: circ(0, 4, 9.6, 18), color: '#d8b070' },
    ...[[-5, 0], [3, -2], [-2, 6], [6, 6], [0, 2], [-6, 8]].map(([x, y]) => ({ d: circ(x!, y!, 1, 6), color: '#8a5a2a' })),
    { d: star8(0, -13, 3), color: '#ffe48a' },
  ],
  // Level 9 · Through the Sea
  // Moses' rod raised over the dark sea, and a star: "Fear not, stand firm."
  'stand-firm': () => [
    { d: P([[-16, 8], [-8, 4], [0, 8], [8, 4], [16, 8], [16, 16], [-16, 16]]), color: '#2e5e8e' },
    { d: P([[-16, 8], [-8, 4], [0, 8], [8, 4], [16, 8], [16, 10], [8, 6], [0, 10], [-8, 6], [-16, 10]]), color: '#8ac0e4' },
    { d: P([[-2, 12], [1, 12], [3, -12], [0, -12]]), color: '#8a6038' },
    { d: star8(1, -14, 3), color: '#ffe48a' },
  ],
  // The sea parted: a wall of water on either side, and the dry path between.
  'parted-sea': () => [
    { d: P([[-16, 16], [-16, -12], [-12, -16], [-6, -12], [-4, 16]]), color: '#2e5e8e' },
    { d: P([[16, 16], [16, -12], [12, -16], [6, -12], [4, 16]]), color: '#2e5e8e' },
    { d: P([[-4, 16], [-2, -10], [2, -10], [4, 16]]), color: '#e2c894' },
    { d: P([[-12, -16], [-6, -12], [-8, -10], [-13, -13]]), color: '#e8f4fc' },
    { d: P([[12, -16], [6, -12], [8, -10], [13, -13]]), color: '#e8f4fc' },
    { d: star8(0, -13, 2.6), color: '#ffe48a' },
  ],
  // Miriam's timbrel, its little bells, and a star.
  timbrel: () => [
    { d: circ(0, 2, 13, 20), color: '#a8743a' },
    { d: circ(0, 2, 10, 18), color: '#f0e0b8' },
    ...[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i / 6) * Math.PI * 2
      return { d: circ(Math.round(Math.cos(a) * 115) / 10, Math.round(Math.sin(a) * 115) / 10 + 2, 1.8, 8), color: '#ffd84a' }
    }),
    { d: star8(0, 2, 3), color: '#ffe48a' },
  ],
  // The jar of manna kept before the LORD.
  'manna-jar': () => [
    { d: P([[-8, 16], [-11, 4], [-9, -4], [-5, -7], [5, -7], [9, -4], [11, 4], [8, 16]]), color: '#b87a4a' },
    { d: P([[-6, -7], [6, -7], [7, -11], [-7, -11]]), color: '#9a5e34' },
    { d: P([[-7, -11], [0, -15], [7, -11]]), color: '#f4f2ea' },
    ...[[-12, -12], [12, -8], [-13, 2], [13, 8]].map(([x, y]) => ({ d: circ(x!, y!, 1.4, 6), color: '#ffffff' })),
  ],
  // The rock at Horeb, and the water running out of it.
  'struck-rock': () => [
    { d: P([[-16, 16], [-15, -2], [-8, -12], [4, -14], [12, -6], [14, 6], [12, 16]]), color: '#9a5a46' },
    { d: P([[-8, -12], [4, -14], [0, -6], [-10, -2]]), color: '#b8745a' },
    { d: P([[0, -2], [3, -2], [6, 16], [-4, 16]]), color: '#5aa0d4' },
    { d: P([[1, 2], [2, 2], [3, 14], [0, 14]]), color: '#d4eefc' },
  ],
  // Moses' hands held high on the hilltop as the sun goes down.
  'raised-hands': () => [
    { d: circ(0, 10, 9, 16), color: '#f0a83a' },
    { d: P([[-16, 16], [-10, 8], [10, 8], [16, 16]]), color: '#8a6a46' },
    { d: P([[-2, 8], [-2, -4], [2, -4], [2, 8]]), color: '#7a5a3a' },
    { d: P([[-2, -2], [-11, -14], [-8, -16], [0, -5]]), color: '#d8b888' },
    { d: P([[2, -2], [11, -14], [8, -16], [0, -5]]), color: '#d8b888' },
    { d: circ(0, -7, 2.6, 10), color: '#d8d4cc' },
  ],
  // The new leaders standing together around Moses, sharing the load.
  'shared-load': () => [
    ...[0, 1, 2, 3, 4].map((i) => {
      const x = -12 + i * 6
      const y = i === 2 ? -4 : 0
      return [
        { d: P([[x - 3, 16], [x - 2, y + 2], [x + 2, y + 2], [x + 3, 16]]), color: i === 2 ? '#7a5a3a' : ['#6a7a3a', '#3a5a9a', '#a84a5a', '#8a7a5a'][i > 2 ? i - 1 : i]! },
        { d: circ(x, y - 1, 2.4, 10), color: '#3a2a42' },
      ]
    }).flat(),
    { d: star8(0, -13, 3), color: '#ffe48a' },
  ],
  // Level 10 · Sinai
  // An eagle with its wings spread over the mountain: "I bore you on eagles' wings."
  'eagles-wings': () => [
    { d: P([[-16, 16], [-4, 0], [4, 6], [16, 16]]), color: '#9a6450' },
    { d: P([[0, -4], [-8, -12], [-16, -10], [-8, -6], [-2, -2]]), color: '#5a3a26' },
    { d: P([[0, -4], [8, -12], [16, -10], [8, -6], [2, -2]]), color: '#5a3a26' },
    { d: circ(0, -2, 3, 10), color: '#4a2e1e' },
    { d: circ(0, -6, 1.8, 8), color: '#f0ead8' },
  ],
  // The two tablets of the law.
  'two-tablets': () => [
    ...[-8, 8].flatMap((x) => [
      { d: P([[x - 7, 16], [x - 7, -6], [x - 5, -12], [x + 5, -12], [x + 7, -6], [x + 7, 16]]), color: '#b8b0a4' },
      ...[-6, -1, 4, 9].map((y) => ({ d: P([[x - 4, y], [x + 4, y], [x + 4, y + 1.4], [x - 4, y + 1.4]]), color: '#6a6258' })),
    ]),
    { d: star8(0, -15, 2.6), color: '#ffe48a' },
  ],
  // The altar at the foot of the mountain, and the twelve pillars around it.
  'twelve-pillars': () => [
    ...Array.from({ length: 12 }, (_, i) => {
      const x = -15 + i * (30 / 11)
      const top = -2 - Math.round(Math.abs(i - 5.5)) * -1
      return { d: P([[x - 1, 12], [x - 1, top], [x + 1, top], [x + 1, 12]]), color: '#a89a84' }
    }),
    { d: P([[-6, 16], [-6, 6], [6, 6], [6, 16]]), color: '#8a7a62' },
    { d: P([[-2, 6], [0, 0], [2, 6]]), color: '#f08a2a' },
  ],
  // The tablets broken at the foot of the mountain.
  'broken-tablets': () => [
    { d: P([[-15, 16], [-12, 4], [-6, 8], [-3, 0], [3, 6], [0, 16]]), color: '#b8b0a4' },
    { d: P([[-10, -2], [-8, -12], [0, -14], [2, -6], [-4, -4]]), color: '#cec6ba' },
    { d: P([[3, 16], [5, 6], [10, 2], [15, 16]]), color: '#b8b0a4' },
    { d: P([[6, -2], [8, -12], [14, -10], [14, -2]]), color: '#cec6ba' },
  ],
  // The tent of meeting, and the pillar of cloud at its door.
  'tent-of-meeting': () => [
    { d: P([[-16, 16], [-4, -2], [8, 16]]), color: '#a8785a' },
    { d: P([[-7, 16], [-4, 6], [-1, 16]]), color: '#2a2440' },
    { d: P([[8, 16], [8, -10], [10, -16], [14, -16], [16, -10], [16, 16]]), color: '#e8e4ee' },
    { d: P([[10, 14], [10, -8], [14, -8], [14, 14]]), color: '#ffe8a0' },
  ],
  // Moses' face, shining from being with God.
  'shining-face': () => [
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const a = (i / 8) * Math.PI * 2
      const x = Math.round(Math.cos(a) * 140) / 10
      const y = Math.round(Math.sin(a) * 140) / 10 - 2
      return { d: P([[x * 0.7, y * 0.7 - 0.6], [x, y], [x * 0.7 + 0.6, y * 0.7]]), color: '#ffe48a' }
    }),
    { d: circ(0, -2, 8, 18), color: '#fff4c0' },
    { d: circ(0, -2, 5.6, 16), color: '#d8b888' },
    { d: P([[-6, 16], [-4, 8], [4, 8], [6, 16]]), color: '#7a5a3a' },
  ],
  // Level 11 · The Tabernacle and the Holy Life
  // The plan of the tabernacle in its court, drawn in light.
  'tabernacle-plan': () => [
    { d: P([[-16, -10], [16, -10], [16, 10], [-16, 10]]), color: '#ffe48a' },
    { d: P([[-14, -8], [14, -8], [14, 8], [-14, 8]]), color: '#2a3a6a' },
    { d: P([[-11, -4], [3, -4], [3, 4], [-11, 4]]), color: '#e0b040' },
    { d: P([[-9, -1.6], [-6, -1.6], [-6, 1.6], [-9, 1.6]]), color: '#fff6d0' },
    { d: P([[7, -2], [11, -2], [11, 2], [7, 2]]), color: '#b07a3a' },
  ],
  // The mercy seat on the ark, and the two cherubim with their wings spread over it.
  'mercy-seat': () => [
    { d: P([[-12, 4], [12, 4], [12, 14], [-12, 14]]), color: '#e0b040' },
    { d: P([[-14, 1], [14, 1], [14, 4], [-14, 4]]), color: '#f4d070' },
    { d: P([[-11, 1], [-12, -10], [-2, -4], [-4, 1]]), color: '#e0b040' },
    { d: P([[11, 1], [12, -10], [2, -4], [4, 1]]), color: '#e0b040' },
    { d: P([[-16, 9], [16, 9], [16, 10.4], [-16, 10.4]]), color: '#8a5a32' },
  ],
  // The breastpiece of the high priest, with the twelve stones of the tribes.
  'twelve-stones': () => [
    { d: P([[-11, -13], [11, -13], [11, 13], [-11, 13]]), color: '#e0b040' },
    ...[0, 1, 2, 3].flatMap((row) => [0, 1, 2].map((col) => ({ d: P([[-8 + col * 6, -10 + row * 6], [-4 + col * 6, -10 + row * 6], [-4 + col * 6, -6 + row * 6], [-8 + col * 6, -6 + row * 6]]), color: ['#b8323a', '#4aa85a', '#5ab8e8', '#6a3a7a'][row]! }))),
  ],
  // The altar of burnt offering, and its fire that never went out.
  'altar-fire': () => [
    { d: P([[-12, 2], [12, 2], [12, 15], [-12, 15]]), color: '#b07a3a' },
    { d: P([[-13, 2], [-12, -2], [-10, 2]]), color: '#b07a3a' },
    { d: P([[13, 2], [12, -2], [10, 2]]), color: '#b07a3a' },
    { d: P([[0, -15], [6, -6], [7, 1], [-7, 1], [-6, -6]]), color: '#e0602a' },
    { d: P([[0, -8], [3, -3], [3, 1], [-3, 1], [-3, -3]]), color: '#ffcf5a' },
  ],
  // The veil before the holy of holies, of blue, purple and scarlet.
  'the-veil': () => [
    { d: P([[-14, -15], [14, -15], [14, 16], [-14, 16]]), color: '#3a5aa8' },
    { d: P([[-14, -15], [-7, -15], [-7, 16], [-14, 16]]), color: '#6a3a7a' },
    { d: P([[7, -15], [14, -15], [14, 16], [7, 16]]), color: '#b8323a' },
    { d: P([[0, -6], [-5, 2], [5, 2]]), color: '#e0b040' },
  ],
  // The first sheaf of the harvest, waved before the LORD.
  'first-sheaf': () => [
    ...[-8, -4, 0, 4, 8].map((x) => ({ d: P([[x - 1, -14], [x + 1, -14], [x * 0.3 + 0.8, 14], [x * 0.3 - 0.8, 14]]), color: '#f0c850' })),
    { d: P([[-6, 0], [6, 0], [6, 3], [-6, 3]]), color: '#8a5a32' },
  ],
  // The stranger gleaning at the edge of the field.
  'edges-of-the-field': () => [
    { d: P([[-16, -6], [-10, -6], [-10, 16], [-16, 16]]), color: '#f0c850' },
    { d: P([[10, -6], [16, -6], [16, 16], [10, 16]]), color: '#f0c850' },
    { d: P([[-6, 16], [-4, -2], [2, -2], [4, 16]]), color: '#2a7a7a' },
    { d: circ(-1, -6, 3.4, 12), color: '#c89a6a' },
    { d: P([[3, 6], [8, 2], [9, 4], [4, 8]]), color: '#e0b040' },
  ],
  // Level 12 · Forty Years in the Wilderness
  // Aaron's hands lifted in blessing, with light falling from them.
  'priestly-blessing': () => [
    ...[-12, 0, 12].map((x) => ({ d: P([[x - 1, -16], [x + 1, -16], [x * 0.4 + 0.8, -6], [x * 0.4 - 0.8, -6]]), color: '#ffe48a' })),
    { d: P([[-9, -2], [-6, -8], [-3, -2], [-4, 6], [-8, 6]]), color: '#d8b888' },
    { d: P([[9, -2], [6, -8], [3, -2], [4, 6], [8, 6]]), color: '#d8b888' },
    { d: P([[-10, 16], [-7, 4], [7, 4], [10, 16]]), color: '#3a5aa8' },
  ],
  // The tent of meeting, and the elders around it, with the spirit resting on them.
  'seventy-elders': () => [
    { d: P([[-4, 4], [0, -6], [4, 4]]), color: '#a8785a' },
    ...[-13, -8, 8, 13].flatMap((x) => [
      { d: P([[x - 2.4, 16], [x - 2, 6], [x + 2, 6], [x + 2.4, 16]]), color: '#c8a870' },
      { d: circ(x, 3, 2, 10), color: '#d8b888' },
      { d: circ(x, -2, 1.6, 8), color: '#ffe48a' },
    ]),
    { d: circ(0, -12, 3, 12), color: '#fff4c0' },
  ],
  // The great cluster of grapes on its pole.
  'cluster-of-grapes': () => [
    { d: P([[-16, -12], [16, -12], [16, -10], [-16, -10]]), color: '#8a5a32' },
    ...[[-4, -6], [0, -6], [4, -6], [-6, -1], [-2, -1], [2, -1], [6, -1], [-4, 4], [0, 4], [4, 4], [-2, 9], [2, 9], [0, 13]].map(([x, y]) => ({ d: circ(x!, y!, 2.4, 10), color: (x! + y!) % 4 ? '#6a2a6a' : '#8a3a7a' })),
  ],
  // Aaron's rod, budded and blossoming.
  'rod-that-budded': () => [
    { d: P([[-1, 16], [-0.6, -15], [0.6, -15], [1, 16]]), color: '#8a5a32' },
    ...[[-4, -12, '#ffffff'], [4, -6, '#f4dce4'], [-4, 0, '#8ac85a'], [4, 6, '#ffffff'], [-4, 10, '#8ac85a']].map(([x, y, c]) => ({ d: circ(x as number, y as number, 2.4, 10), color: c as string })),
  ],
  // Water bursting from the rock.
  'water-from-the-rock': () => [
    { d: P([[-16, -14], [6, -16], [10, -4], [2, 2], [-16, 4]]), color: '#8a5a3a' },
    { d: P([[0, -4], [3, -4], [8, 10], [14, 16], [-2, 16], [2, 8]]), color: '#5ab8e8' },
    { d: P([[1, -2], [2, -2], [4, 8], [3, 8]]), color: '#d8f0ff' },
  ],
  // The bronze serpent on its pole.
  'bronze-serpent': () => [
    { d: P([[-1, 16], [-1, -14], [1, -14], [1, 16]]), color: '#8a5a32' },
    { d: P([[-8, -12], [8, -12], [8, -10], [-8, -10]]), color: '#a8743a' },
    ...[[-4, -6], [4, -2], [-4, 2], [4, 6]].map(([x, y]) => ({ d: circ(x!, y!, 2.6, 10), color: '#d08a3a' })),
    { d: circ(6, -15, 2.4, 10), color: '#e8a84a' },
  ],
  // Balaam's donkey, and the angel she saw in the road.
  'balaams-donkey': () => [
    { d: P([[-14, 4], [6, 4], [6, 12], [-14, 12]]), color: '#8a8a9a' },
    ...[-12, -6, 0, 4].map((x) => ({ d: P([[x, 12], [x + 1.6, 12], [x + 1.6, 16], [x, 16]]), color: '#7a7a8a' })),
    { d: P([[4, 4], [8, -4], [12, -2], [8, 6]]), color: '#8a8a9a' },
    { d: P([[10, -16], [16, -16], [16, 16], [10, 16]]), color: '#fff4c0' },
  ],
  // The star out of Jacob, and the scepter beneath it.
  'star-out-of-jacob': () => [
    { d: star8(0, -8, 7), color: '#ffe48a' },
    { d: circ(0, -8, 2.4, 10), color: '#ffffff' },
    { d: P([[-1, 16], [-1, 2], [1, 2], [1, 16]]), color: '#e0b040' },
    { d: P([[-3, 4], [-2, -1], [0, 2], [2, -1], [3, 4]]), color: '#f4d070' },
  ],
  // Level 13 · Moses' Last Words
  // The road of the forty years, winding from Egypt to the tents on the plains of Moab.
  'remember-the-way': () => [
    { d: P([[-15, 14], [-13, 14], [12, -10], [10, -12]]), color: '#e0c48a' },
    { d: circ(-14, 13, 2.4, 10), color: '#b8323a' },
    { d: P([[8, -10], [12, -16], [16, -10]]), color: '#a8785a' },
  ],
  // The words of the Shema on a doorpost, with the little case of the mezuzah.
  'shema': () => [
    { d: P([[-10, -16], [10, -16], [10, 16], [-10, 16]]), color: '#8a5a32' },
    ...[-10, -4, 2, 8].map((y) => ({ d: P([[-6, y], [4, y], [4, y + 2], [-6, y + 2]]), color: '#e0b040' })),
    { d: P([[6, -12], [8, -12], [8, -4], [6, -4]]), color: '#d8d4cc' },
  ],
  // Moses' hands laid on Joshua's head, and the light passing between them.
  'hands-on-joshua': () => [
    { d: circ(0, -12, 3, 12), color: '#fff4c0' },
    { d: P([[-10, -6], [-2, -4], [-2, -2], [-10, -4]]), color: '#d8b888' },
    { d: P([[10, -6], [2, -4], [2, -2], [10, -4]]), color: '#d8b888' },
    { d: circ(0, 0, 3.4, 12), color: '#c89a6a' },
    { d: P([[-6, 16], [-4, 4], [4, 4], [6, 16]]), color: '#a8743a' },
  ],
  // The two roads: one down to the river and into the green land, one back into the dry hills.
  'two-roads': () => [
    { d: P([[2, -16], [16, -16], [16, 16], [6, 16]]), color: '#5a8a3a' },
    { d: P([[0, -16], [3, -16], [5, 16], [2, 16]]), color: '#5ab8e8' },
    { d: P([[-12, 16], [-8, 16], [12, 0], [10, -2]]), color: '#f0d8a8' },
    { d: P([[-12, 14], [-16, 2], [-14, 1], [-10, 13]]), color: '#a8744a' },
  ],
  // Mount Nebo, and the promised land shining below it at sunset.
  'mount-nebo': () => [
    { d: P([[-16, -16], [16, -16], [16, -12], [-16, -12]]), color: '#ffe48a' },
    { d: P([[-16, 8], [0, -8], [16, 8]]), color: '#8a5a32' },
    { d: P([[-16, 8], [16, 8], [16, 16], [-16, 16]]), color: '#6a9a4a' },
    { d: P([[-4, 10], [4, 10], [4, 14], [-4, 14]]), color: '#4a7ab8' },
  ],
  // Level 14 · Joshua
  // Rahab's window in the wall of Jericho, and the scarlet cord hanging from it.
  'scarlet-cord': () => [
    { d: P([[-16, -10], [16, -10], [16, 16], [-16, 16]]), color: '#c8a06a' },
    { d: P([[-4, -4], [4, -4], [4, 4], [-4, 4]]), color: '#3a2418' },
    { d: P([[0, 4], [2, 4], [2, 16], [0, 16]]), color: '#d42a3a' },
  ],
  // The twelve stones from the Jordan, standing in a ring at Gilgal.
  'stones-from-the-jordan': () => [
    { d: P([[-16, 10], [16, 10], [16, 16], [-16, 16]]), color: '#5ab8e8' },
    ...Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2
      return { d: circ(Math.sin(a) * 11, Math.cos(a) * 6 - 2, 2.2, 8), color: '#9a94a4' }
    }),
  ],
  // The walls of Jericho falling, and a ram's horn trumpet.
  'walls-of-jericho': () => [
    { d: P([[-16, 4], [-8, 0], [0, 6], [8, 2], [16, 6], [16, 16], [-16, 16]]), color: '#c8a06a' },
    { d: P([[-12, -12], [8, -6], [12, -12], [10, -2], [-12, -8]]), color: '#f4d070' },
  ],
  // The lamp in Achan's tent, bringing what was hidden into the light.
  'lamp-in-the-tent': () => [
    { d: circ(0, -6, 10, 16), color: '#fff4c0' },
    { d: P([[-6, 2], [6, 2], [4, 8], [-4, 8]]), color: '#c89a3a' },
    { d: P([[-1, -4], [1, -4], [2, 2], [-2, 2]]), color: '#f08a3a' },
    { d: P([[-14, 12], [14, 12], [14, 16], [-14, 16]]), color: '#8a5a32' },
  ],
  // The sun standing still over Gibeon, and the pale moon over the valley.
  'sun-stands-still': () => [
    { d: star8(-4, -6, 8), color: '#ffe48a' },
    { d: circ(-4, -6, 4, 12), color: '#ffffff' },
    { d: circ(11, -10, 3, 10), color: '#d8d4cc' },
    { d: P([[-16, 8], [-4, 2], [8, 8], [16, 6], [16, 16], [-16, 16]]), color: '#8a7a4a' },
  ],
  // The map of the land, each tribe's portion its own color.
  'twelve-portions': () => [
    { d: P([[-16, -16], [-8, -16], [-12, 16], [-16, 16]]), color: '#4a7ab8' },
    ...['#c8a050', '#a8744a', '#6a9a4a', '#b8323a', '#e0b040', '#8a5a9a'].map((color, i) => ({ d: P([[-8 + (i % 2) * 10 - Math.floor(i / 2), -16 + Math.floor(i / 2) * 11], [2 + (i % 2) * 10 - Math.floor(i / 2), -16 + Math.floor(i / 2) * 11], [2 + (i % 2) * 10 - Math.floor(i / 2), -5 + Math.floor(i / 2) * 11], [-8 + (i % 2) * 10 - Math.floor(i / 2), -5 + Math.floor(i / 2) * 11]]), color })),
  ],
  // The great stone under the oak at Shechem.
  'stone-under-the-oak': () => [
    { d: circ(-2, -8, 10, 14), color: '#4a7a3a' },
    { d: P([[-4, -2], [0, -2], [0, 16], [-4, 16]]), color: '#6a4a2a' },
    { d: P([[6, 16], [5, 2], [8, -2], [12, 2], [12, 16]]), color: '#9a94a4' },
  ],
  // Level 15 · The Judges
  // The circle of the judges: five lights around a wheel, one of them shining.
  'circle-of-the-judges': () => [
    { d: circ(0, 0, 13, 20), color: '#8a6a3a' },
    { d: circ(0, 0, 9, 20), color: '#2a3a6a' },
    ...Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2
      return { d: circ(Math.sin(a) * 11, -Math.cos(a) * 11, 2.6, 8), color: i === 3 ? '#fff4c0' : '#c8a060' }
    }),
  ],
  // The palm of Deborah, where she judged Israel.
  'palm-of-deborah': () => [
    { d: P([[-2, -6], [2, -6], [3, 16], [-3, 16]]), color: '#8a5a32' },
    { d: P([[0, -8], [-14, -2], [-12, -6], [0, -12], [12, -6], [14, -2]]), color: '#4a8a3a' },
    { d: P([[0, -10], [-8, -16], [0, -14], [8, -16]]), color: '#5a9a44' },
    { d: P([[-16, 12], [16, 12], [16, 16], [-16, 16]]), color: '#c8a868' },
  ],
  // A broken clay jar, and the torch blazing out of it.
  'torches-and-jars': () => [
    { d: P([[-8, 4], [8, 4], [10, 14], [-10, 14]]), color: '#a8643a' },
    { d: P([[-4, 4], [-6, -2], [-2, 0], [0, -4], [3, 0], [6, -2], [4, 4]]), color: '#c87a4a' },
    { d: P([[-1, 0], [1, 0], [2, -6], [0, -14], [-2, -6]]), color: '#f8b040' },
    { d: P([[-1, -2], [1, -2], [1, -8], [0, -11], [-1, -8]]), color: '#fff0a0' },
  ],
  // The timbrel of Jephthah's daughter, remembered by the daughters of Israel.
  'timbrel-of-mizpah': () => [
    { d: circ(0, -2, 12, 20), color: '#c89a5a' },
    { d: circ(0, -2, 9, 20), color: '#f0e0b8' },
    ...[0, 1, 2, 3].map((i) => ({ d: circ(Math.sin(i * 1.57) * 10.5, -2 - Math.cos(i * 1.57) * 10.5, 1.6, 6), color: '#f4d070' })),
  ],
  // The two middle pillars of the house of Dagon.
  'two-pillars': () => [
    { d: P([[-16, -14], [16, -14], [16, -10], [-16, -10]]), color: '#a88458' },
    { d: P([[-9, -10], [-3, -10], [-3, 16], [-9, 16]]), color: '#d8b47e' },
    { d: P([[3, -10], [9, -10], [9, 16], [3, 16]]), color: '#d8b47e' },
    { d: circ(0, 2, 3, 8), color: '#fff4c0' },
  ],
  // The little town of Bethlehem on its hill, with one lamp burning.
  'lamp-in-bethlehem': () => [
    { d: P([[-16, 16], [-16, 6], [0, -2], [16, 6], [16, 16]]), color: '#6a8a4a' },
    { d: P([[-8, 2], [-2, 2], [-2, -6], [-8, -6]]), color: '#d8c8a0' },
    { d: P([[0, 0], [8, 0], [8, -8], [0, -8]]), color: '#c8b890' },
    { d: circ(4, -4, 1.6, 6), color: '#f8c040' },
    { d: circ(4, -12, 3, 10), color: '#fff4c0' },
  ],
  // Level 16 · Ruth
  // The road from Moab, winding west toward the light over Bethlehem.
  'road-from-moab': () => [
    { d: P([[-16, 16], [-16, 6], [16, 2], [16, 16]]), color: '#a8844a' },
    { d: P([[12, 16], [6, 8], [-2, 6], [-8, 2], [-6, 2], [0, 4], [8, 6], [16, 16]]), color: '#e8d4a0' },
    { d: circ(-10, -8, 6, 14), color: '#fff4c0' },
  ],
  // Two hands holding on: Ruth will not let Naomi go.
  'where-you-go': () => [
    { d: P([[-16, 2], [-4, -2], [-2, 4], [-16, 8]]), color: '#d8a878' },
    { d: P([[16, 2], [4, -4], [0, 2], [16, 8]]), color: '#a8744a' },
    { d: circ(-1, 1, 4, 10), color: '#f4d070' },
  ],
  // A sheaf of barley, gleaned in the field of Boaz.
  'sheaf-of-barley': () => [
    ...[-8, -4, 0, 4, 8].map((dx) => ({ d: P([[dx - 1, 16], [dx * 0.4 - 1, 0], [dx * 1.4, -12], [dx * 0.4 + 1, 0], [dx + 1, 16]]), color: '#e0b850' })),
    { d: P([[-6, 4], [6, 4], [6, 7], [-6, 7]]), color: '#8a5a32' },
  ],
  // Six measures of barley in Ruth's shawl.
  'six-measures': () => [
    { d: P([[-14, -2], [14, -2], [10, 14], [-10, 14]]), color: '#b8643a' },
    ...Array.from({ length: 6 }, (_, i) => ({ d: circ(-8 + (i % 3) * 8, -4 + Math.floor(i / 3) * 6, 3.5, 8), color: '#f0d070' })),
  ],
  // The sandal handed over at the gate of Bethlehem.
  'sandal-at-the-gate': () => [
    { d: P([[-16, -16], [-6, -16], [-6, 16], [-16, 16]]), color: '#c8b890' },
    { d: P([[6, -16], [16, -16], [16, 16], [6, 16]]), color: '#c8b890' },
    { d: P([[-10, 10], [10, 8], [12, 12], [-10, 14]]), color: '#8a5a32' },
    { d: P([[-2, 8], [0, 2], [4, 2], [4, 8]]), color: '#6a4020' },
  ],
}

/** The medallions' backgrounds: deep blue, with one ruby for the darkest story. */
const MEDALLION_BG: Record<string, string> = { lamb: '#7a1a2a', storm: '#2a2a4a', whirlwind: '#2a2a4a' }

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
