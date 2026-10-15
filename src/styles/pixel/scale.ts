import { PX_H, PX_W } from './art'

/**
 * The biggest whole-number enlargement of 320 × 180 that fits the frame. Whole numbers
 * keep every pixel the same size and perfectly sharp.
 */
export function pixelScale(width: number, height: number, dpr: number): number {
  return Math.max(1, Math.floor(Math.min((width * dpr) / PX_W, (height * dpr) / PX_H)))
}
