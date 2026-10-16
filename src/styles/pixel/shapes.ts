/**
 * Builds sprites from simple shapes, one art pixel at a time, into the same text grids
 * that hand-made sprites use (a letter per color, '.' for empty). Animals and people are
 * made this way, so a walking frame is just the same drawing with its legs moved.
 */
export class Grid {
  readonly width: number
  readonly height: number
  private cells: string[][]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => '.'))
  }

  set(x: number, y: number, color: string): this {
    const cx = Math.round(x)
    const cy = Math.round(y)
    if (cx >= 0 && cy >= 0 && cx < this.width && cy < this.height) this.cells[cy]![cx] = color
    return this
  }

  rect(x: number, y: number, w: number, h: number, color: string): this {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, color)
    return this
  }

  /** A filled ellipse around (cx, cy). Pixel (x, y) covers the square from x to x+1. */
  ellipse(cx: number, cy: number, rx: number, ry: number, color: string, onlyRows?: (y: number) => boolean): this {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      if (onlyRows && !onlyRows(y)) continue
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + 0.5 - cx) / rx
        const dy = (y + 0.5 - cy) / ry
        if (dx * dx + dy * dy <= 1) this.set(x, y, color)
      }
    }
    return this
  }

  /** A line, `thick` pixels wide (thickness grows to the right). */
  line(x0: number, y0: number, x1: number, y1: number, color: string, thick = 1): this {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
    for (let s = 0; s <= steps; s++) {
      const x = x0 + ((x1 - x0) * s) / steps
      const y = y0 + ((y1 - y0) * s) / steps
      for (let t = 0; t < thick; t++) this.set(Math.round(x) + t, Math.round(y), color)
    }
    return this
  }

  /** A filled polygon, by testing each pixel's center. */
  poly(points: [number, number][], color: string): this {
    const xs = points.map((p) => p[0])
    const ys = points.map((p) => p[1])
    for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
      for (let x = Math.floor(Math.min(...xs)); x <= Math.ceil(Math.max(...xs)); x++) {
        if (inside(x + 0.5, y + 0.5, points)) this.set(x, y, color)
      }
    }
    return this
  }

  /** Recolors pixels of one color that sit on a given edge (the side facing the light). */
  rim(from: string, to: string, side: 'left' | 'right'): this {
    const dx = side === 'left' ? -1 : 1
    const snapshot = this.cells.map((row) => [...row])
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (snapshot[y]![x] !== from) continue
        const beside = snapshot[y]![x + dx]
        if (beside === undefined || beside === '.') this.cells[y]![x] = to
      }
    }
    return this
  }

  rows(): string[] {
    return this.cells.map((row) => row.join(''))
  }
}

function inside(x: number, y: number, points: [number, number][]): boolean {
  let hit = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]!
    const [xj, yj] = points[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** Draws a sprite frame with shapes. */
export function sprite(width: number, height: number, draw: (g: Grid) => void): string[] {
  const grid = new Grid(width, height)
  draw(grid)
  return grid.rows()
}
