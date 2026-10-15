import { C } from './palette'

/**
 * Turns a text-grid sprite into a small canvas, with a one-pixel dark outline around it
 * so it reads clearly against any sky, and optionally mirrored.
 */
export function buildSprite(
  rows: readonly string[],
  colors: Record<string, string>,
  { mirror = false, outline = C.ink }: { mirror?: boolean; outline?: string | null } = {},
): HTMLCanvasElement {
  const width = Math.max(...rows.map((r) => r.length))
  const height = rows.length
  const pad = outline ? 1 : 0
  const canvas = document.createElement('canvas')
  canvas.width = width + pad * 2
  canvas.height = height + pad * 2
  const ctx = canvas.getContext('2d')!

  const colorAt = (x: number, y: number): string | undefined => {
    if (y < 0 || y >= height || x < 0 || x >= width) return undefined
    const sx = mirror ? width - 1 - x : x
    return colors[rows[y]![sx] ?? '.']
  }

  if (outline) {
    ctx.fillStyle = outline
    for (let y = -1; y <= height; y++) {
      for (let x = -1; x <= width; x++) {
        if (colorAt(x, y)) continue
        if (colorAt(x - 1, y) || colorAt(x + 1, y) || colorAt(x, y - 1) || colorAt(x, y + 1)) {
          ctx.fillRect(x + pad, y + pad, 1, 1)
        }
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = colorAt(x, y)
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect(x + pad, y + pad, 1, 1)
    }
  }
  return canvas
}
