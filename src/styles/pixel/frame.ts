/**
 * The pixel stage's drawing space. The visible frame is 320 × 180 pixels. Each layer is
 * drawn once into a slightly bigger canvas (368 × 208, with a margin on every side) so
 * the camera can pan without showing an edge.
 */

export const PX_W = 320
export const PX_H = 180
export const MARGIN_X = 24
export const MARGIN_Y = 14
export const LAYER_W = PX_W + MARGIN_X * 2
export const LAYER_H = PX_H + MARGIN_Y * 2

/** Converts frame coordinates to layer-canvas coordinates. */
export const fx = (x: number) => x + MARGIN_X
export const fy = (y: number) => y + MARGIN_Y

/**
 * Draws onto the screen in art pixels, every frame. A painter is handed to the parts of
 * the art that move (twinkling stars, glints, glows), already placed and scaled.
 */
export interface Painter {
  /** A solid block of pixels. */
  rect(x: number, y: number, w: number, h: number, color: string): void
  /**
   * A block where only some pixels are colored, in an ordered checker pattern: `level` 0
   * colors none, 0.5 every other one, 1 all of them. This is how pixel art shades and
   * fades without leaving its palette.
   */
  dither(x: number, y: number, w: number, h: number, color: string, level: number): void
  /** Many one-pixel-high runs at once, `[y, x0, x1]` each, filled in a single step. */
  spans(runs: readonly (readonly [number, number, number])[], color: string, level: number): void
}
