/**
 * The paper stage's drawing space. Art is drawn in "frame units": the visible frame is
 * 1600 × 900, and layers reach past its edges (the overscan) so the camera can drift
 * without ever showing a gap.
 */

export const FRAME_W = 1600
export const FRAME_H = 900

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

/** How far layers reach past the frame on each side. */
export const OVER_X = 240
export const OVER_Y = 135
export const LEFT = -OVER_X
export const RIGHT = FRAME_W + OVER_X
export const TOP = -OVER_Y
export const BOTTOM = FRAME_H + OVER_Y

/** The whole drawing space, overscan included. */
export const FULL: Box = { x: LEFT, y: TOP, w: RIGHT - LEFT, h: BOTTOM - TOP }

/** A box from a top edge down to the bottom of the drawing space, across the full width. */
export const bandFrom = (top: number, extraRight = 0): Box => ({ x: LEFT, y: top, w: RIGHT - LEFT + extraRight, h: BOTTOM - top })
