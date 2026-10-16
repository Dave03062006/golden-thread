import type { DrawnState, PixelDrawnArt } from './art'
import { painterAt } from './painter'

/**
 * Pictures of drawn props. Drawing a glowing sun or a fruit tree takes hundreds of small
 * fills, so each look is drawn once, at one screen pixel per art pixel, and kept. On
 * screen it's then a single enlarged copy. A prop's look only changes a few times a
 * second (its `fps`), or as it grows, so a handful of pictures covers it.
 */

export interface DrawnPicture {
  canvas: HTMLCanvasElement
  /** Where the prop's anchor point is in the picture. */
  anchorX: number
  anchorY: number
}

/** Plenty for every look a scene shows at once; the least recently used are forgotten. */
const MAX_PICTURES = 600
/** Growth is pictured in this many steps. */
const GROW_STEPS = 48

const pictures = new Map<string, DrawnPicture>()

/** The room a prop gets around its anchor, from its width: a light spreads all round; a plant grows up. */
function extent(art: PixelDrawnArt, width: number) {
  const half = Math.ceil(width * 0.75) + 2
  if (art.anchor === 'base') return { left: -half, right: half, top: -Math.ceil(width * 1.9) - 2, bottom: 2 }
  return { left: -half, right: half, top: -half, bottom: half }
}

/** The picture of a drawn prop as it looks now. */
export function drawnPicture(prop: string, art: PixelDrawnArt, state: Omit<DrawnState, 'clip'>): DrawnPicture {
  const fps = art.fps ?? 6
  const time = art.loop ? state.time % art.loop : state.time
  const tick = fps > 0 ? Math.floor(time * fps) : 0
  const growth = Math.round(Math.min(1, Math.max(0, state.grow)) * GROW_STEPS)
  const width = Math.max(1, Math.round(state.width))
  const key = `${prop}|${width}|${growth}|${state.pose}|${state.facing}|${tick}`

  const kept = pictures.get(key)
  if (kept) {
    // Recently used: move it to the back of the queue.
    pictures.delete(key)
    pictures.set(key, kept)
    return kept
  }

  const box = extent(art, width)
  const canvas = document.createElement('canvas')
  canvas.width = box.right - box.left
  canvas.height = box.bottom - box.top
  const ctx = canvas.getContext('2d')!
  art.draw(painterAt(ctx, -box.left, -box.top, 1), {
    ...state,
    time: fps > 0 ? tick / fps : 0,
    grow: growth / GROW_STEPS,
    width,
    clip: box,
  })
  const picture = { canvas, anchorX: -box.left, anchorY: -box.top }
  pictures.set(key, picture)
  if (pictures.size > MAX_PICTURES) pictures.delete(pictures.keys().next().value!)
  return picture
}
