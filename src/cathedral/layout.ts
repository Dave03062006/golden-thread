import type { Bay, CathedralWindow } from './model'

/**
 * Where everything stands along the nave, in nave units (the windows are 120 wide and 400
 * tall, the nave 600 tall), shared by both art styles so they place things alike. Bays sit
 * side by side, one for each Age, with a pillar between each.
 */

export const NAVE_H = 600
export const WINDOW = { w: 120, h: 400, top: 70 }
const WINDOW_GAP = 46
const BAY_PAD = 70
export const PILLAR = 34

/**
 * The medallion centres in a window, bottom to top, relative to the window's top-left. Up
 * to seven stand in one column; more than that (Level 3 has ten) zigzag from side to side,
 * so the rounds don't overlap.
 */
export function medallionCentres(count: number): { x: number; y: number }[] {
  const top = 92
  const bottom = WINDOW.h - 34
  const zigzag = count > 7
  return Array.from({ length: count }, (_, i) => ({
    x: WINDOW.w / 2 + (zigzag ? (i % 2 ? 1 : -1) * 27 : 0),
    y: bottom - (i * (bottom - top)) / Math.max(1, count - 1),
  }))
}

export interface PlacedWindow {
  window: CathedralWindow
  x: number
}

export interface PlacedBay {
  bay: Bay
  /** The bay's left edge and width. */
  x: number
  w: number
  windows: PlacedWindow[]
}

export interface NaveLayout {
  width: number
  bays: PlacedBay[]
  /** Pillars between the bays, by their left edge. */
  pillars: number[]
}

export function layNave(bays: Bay[]): NaveLayout {
  let x = PILLAR
  const pillars = [0]
  const placed = bays.map((bay) => {
    const w = BAY_PAD * 2 + bay.windows.length * WINDOW.w + (bay.windows.length - 1) * WINDOW_GAP
    const windows = bay.windows.map((window, i) => ({ window, x: x + BAY_PAD + i * (WINDOW.w + WINDOW_GAP) }))
    const result = { bay, x, w, windows }
    x += w
    pillars.push(x)
    x += PILLAR
    return result
  })
  return { width: x, bays: placed, pillars }
}

/** Where a medallion's centre is in the nave. */
export function medallionAt(layout: NaveLayout, episode: string): { x: number; y: number } | undefined {
  for (const bay of layout.bays) {
    for (const { window, x } of bay.windows) {
      const i = window.panels.findIndex((p) => p.episode === episode)
      if (i >= 0) {
        const c = medallionCentres(window.panels.length)[i]!
        return { x: x + c.x, y: WINDOW.top + c.y }
      }
    }
  }
  return undefined
}

/** The middle of an Age's bay, high up, where threads pointing to it arrive. */
export function bayTarget(layout: NaveLayout, numeral: string): { x: number; y: number } | undefined {
  const bay = layout.bays.find((b) => b.bay.numeral === numeral)
  return bay ? { x: bay.x + bay.w / 2, y: WINDOW.top + 150 } : undefined
}

/** A thread's path across the nave: a high arc from the medallion over to the Age it points to. */
/** The curve's control points: it rises from one medallion and arcs over to the other. */
function threadCurve(from: { x: number; y: number }, to: { x: number; y: number }) {
  const lift = Math.min(260, 60 + Math.abs(to.x - from.x) * 0.08)
  const top = Math.max(16, Math.min(from.y, to.y) - lift)
  return [from, { x: from.x + (to.x - from.x) * 0.25, y: top }, { x: from.x + (to.x - from.x) * 0.75, y: top }, to] as const
}

export function threadPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const [a, b, c, d] = threadCurve(from, to)
  return `M${a.x.toFixed(0)} ${a.y.toFixed(0)}C${b.x.toFixed(0)} ${b.y.toFixed(0)} ${c.x.toFixed(0)} ${c.y.toFixed(0)} ${d.x.toFixed(0)} ${d.y.toFixed(0)}`
}

/**
 * Points along a thread, each with how far along it is (0 to 1, by distance), so light can
 * be sent along it with plain movement from point to point.
 */
export function threadPoints(from: { x: number; y: number }, to: { x: number; y: number }, count = 32): { x: number; y: number; along: number }[] {
  const [a, b, c, d] = threadCurve(from, to)
  const points = Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count
    const u = 1 - t
    const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t] as const
    return { x: w[0] * a.x + w[1] * b.x + w[2] * c.x + w[3] * d.x, y: w[0] * a.y + w[1] * b.y + w[2] * c.y + w[3] * d.y }
  })
  let total = 0
  const lengths = points.map((p, i) => (total += i ? Math.hypot(p.x - points[i - 1]!.x, p.y - points[i - 1]!.y) : 0))
  return points.map((p, i) => ({ ...p, along: total ? lengths[i]! / total : 0 }))
}
