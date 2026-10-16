import { FADE_STEPS, ditherPattern, fadeStep } from './dither-fade'
import type { Painter } from './frame'

/**
 * A painter that draws art pixels at `scale` screen pixels each, starting from a point
 * on the canvas. `alpha` below 1 fades whatever it draws by dithering.
 */
export function painterAt(ctx: CanvasRenderingContext2D, ox: number, oy: number, scale: number, alpha = 1): Painter {
  // Patterns are anchored to the art's own grid, so they don't crawl as the art moves.
  const anchor = new DOMMatrix([1, 0, 0, 1, ox, oy])
  /** Sets the fill for a color at a level; false if nothing would show. */
  const fillFor = (color: string, level: number): boolean => {
    const step = fadeStep(level * alpha)
    if (step <= 0) return false
    if (step >= FADE_STEPS) {
      ctx.fillStyle = color
      return true
    }
    const pattern = ditherPattern(ctx, color, step, scale)
    if (!pattern) return false
    pattern.setTransform(anchor)
    ctx.fillStyle = pattern
    return true
  }
  const dither = (x: number, y: number, w: number, h: number, color: string, level: number) => {
    if (w <= 0 || h <= 0 || !fillFor(color, level)) return
    ctx.fillRect(ox + x * scale, oy + y * scale, w * scale, h * scale)
  }
  return {
    rect: (x, y, w, h, color) => dither(x, y, w, h, color, 1),
    dither,
    spans(runs, color, level) {
      if (runs.length === 0 || !fillFor(color, level)) return
      ctx.beginPath()
      for (const [y, x0, x1] of runs) ctx.rect(ox + x0 * scale, oy + y * scale, (x1 - x0 + 1) * scale, scale)
      ctx.fill()
    },
  }
}
