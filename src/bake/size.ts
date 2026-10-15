import { MAX_LAYER_PX } from '../styles/bake-config'
import { FRAME_W } from '../styles/paper-glass/art'

/** The size of a paper layer's image for a frame `frameWidth` device pixels wide. */
export function paperLayerSize(bounds: { w: number; h: number }, resolution: number, frameWidth: number) {
  const pxPerUnit = frameWidth / FRAME_W
  let widthPx = bounds.w * pxPerUnit * resolution
  let heightPx = bounds.h * pxPerUnit * resolution
  if (widthPx > MAX_LAYER_PX) {
    heightPx *= MAX_LAYER_PX / widthPx
    widthPx = MAX_LAYER_PX
  }
  return { widthPx: Math.round(widthPx), heightPx: Math.round(heightPx) }
}
