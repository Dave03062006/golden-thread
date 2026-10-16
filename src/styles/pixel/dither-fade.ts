import { dither, hash } from './palette'

/**
 * Fading pixel art without leaving the palette: instead of making pixels see-through,
 * some of them are left out. Whole pictures (layers, sprites) fade with a "dissolve":
 * each pixel has its own fixed moment to appear, scattered at random, the way classic
 * games fade between scenes. (An ordered pattern would leave a regular grid of dots
 * at the faintest steps.) Sixteen steps are plenty, and each faded copy is made once
 * and kept. Drawn shading still uses the ordered pattern, below.
 */

/** Each pixel's own moment to appear in a dissolve, from 0 to 1. */
const dissolve = (x: number, y: number) => hash(x * 12.9898 + y * 78.233)

export const FADE_STEPS = 16

/** The fade step for an opacity: 0 is invisible, FADE_STEPS is fully drawn. */
export function fadeStep(opacity: number): number {
  return Math.max(0, Math.min(FADE_STEPS, Math.round(opacity * FADE_STEPS)))
}

const masks = new Map<string, HTMLCanvasElement>()

/** The pixels that are drawn at a fade step, for a picture of a given size: shared by every picture that size. */
function dissolveMask(width: number, height: number, step: number): HTMLCanvasElement {
  const key = `${width}x${height}/${step}`
  let mask = masks.get(key)
  if (!mask) {
    mask = document.createElement('canvas')
    mask.width = width
    mask.height = height
    const ctx = mask.getContext('2d')!
    const image = ctx.createImageData(width, height)
    const level = step / FADE_STEPS
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) if (dissolve(x, y) < level) image.data[(y * width + x) * 4 + 3] = 255
    }
    ctx.putImageData(image, 0, 0)
    masks.set(key, mask)
  }
  return mask
}

/** Makes the masks for pictures of this size ahead of time, while nothing is moving yet. */
export function prepareFades(width: number, height: number) {
  for (let step = 1; step < FADE_STEPS; step++) dissolveMask(width, height, step)
}

const copies = new WeakMap<object, Map<number, HTMLCanvasElement>>()

/** A copy of `source` with only the pixels that belong at this fade step. */
export function fadedCopy(source: CanvasImageSource & { width: number; height: number }, step: number): HTMLCanvasElement | CanvasImageSource {
  if (step >= FADE_STEPS) return source
  let byStep = copies.get(source)
  if (!byStep) {
    byStep = new Map()
    copies.set(source, byStep)
  }
  let copy = byStep.get(step)
  if (!copy) {
    // Keep the picture only where the mask has pixels: one step for the graphics card.
    copy = document.createElement('canvas')
    copy.width = source.width
    copy.height = source.height
    const ctx = copy.getContext('2d')!
    ctx.drawImage(source, 0, 0)
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(dissolveMask(source.width, source.height, step), 0, 0)
    byStep.set(step, copy)
  }
  return copy
}

/**
 * Patterns are made once and shared by every canvas: a pattern isn't tied to the canvas
 * that made it, and making one takes far longer than using it.
 */
const patterns = new Map<string, CanvasPattern | null>()

/**
 * A repeating 4 × 4 tile of art pixels, `scale` screen pixels each, where the pixels
 * below `level` in the ordered pattern are colored. Used to dither-fill any area.
 */
export function ditherPattern(ctx: CanvasRenderingContext2D, color: string, step: number, scale: number): CanvasPattern | null {
  const key = `${color}/${step}/${scale}`
  if (patterns.has(key)) return patterns.get(key)!
  const tile = document.createElement('canvas')
  tile.width = 4 * scale
  tile.height = 4 * scale
  const t = tile.getContext('2d')!
  t.fillStyle = color
  const level = step / FADE_STEPS
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) if (dither(x, y) < level) t.fillRect(x * scale, y * scale, scale, scale)
  }
  const pattern = ctx.createPattern(tile, 'repeat')
  patterns.set(key, pattern)
  return pattern
}
