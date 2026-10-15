import type { Box } from './art'

/**
 * Turns SVG art into a sharp image, with its soft paper shadow baked in. The bake
 * script (`npm run bake`) uses this to make the image files the game loads; while
 * developing, the game uses it to draw art live.
 */

export interface RasterOptions {
  widthPx: number
  heightPx: number
  /** Soft drop-shadow size in pixels, or 0 for none. */
  shadowPx: number
}

/**
 * The shadow a cut-out casts: its silhouette, darkened and blurred. Blurring is the
 * costly part, so it's done on a quarter-size copy; enlarged again, it's just as soft.
 */
function softShadow(image: HTMLImageElement, widthPx: number, heightPx: number, shadowPx: number): HTMLCanvasElement {
  const shrink = 4
  const small = document.createElement('canvas')
  small.width = Math.max(1, Math.ceil(widthPx / shrink))
  small.height = Math.max(1, Math.ceil(heightPx / shrink))
  const ctx = small.getContext('2d')!
  ctx.filter = `blur(${Math.max(1, shadowPx / shrink)}px)`
  ctx.drawImage(image, 0, 0, small.width, small.height)
  ctx.filter = 'none'
  // Keep the blurred shape, but paint it in the shadow color.
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = 'rgba(12, 10, 46, 0.5)'
  ctx.fillRect(0, 0, small.width, small.height)
  return small
}

export async function rasterize(svgInner: string, box: Box, { widthPx, heightPx, shadowPx }: RasterOptions): Promise<HTMLCanvasElement> {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.x} ${box.y} ${box.w} ${box.h}" ` +
    `width="${widthPx}" height="${heightPx}" preserveAspectRatio="none">${svgInner}</svg>`
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  try {
    const image = new Image()
    image.decoding = 'async'
    image.src = url
    await image.decode()

    const canvas = document.createElement('canvas')
    canvas.width = widthPx
    canvas.height = heightPx
    const ctx = canvas.getContext('2d')!
    if (shadowPx > 0) ctx.drawImage(softShadow(image, widthPx, heightPx, shadowPx), 0, shadowPx * 0.6, widthPx, heightPx)
    ctx.drawImage(image, 0, 0, widthPx, heightPx)
    return canvas
  } finally {
    URL.revokeObjectURL(url)
  }
}
