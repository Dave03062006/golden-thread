/**
 * A grid of pixels in memory. Pixel art is drawn here one pixel at a time, then copied
 * to a canvas in one step. This is many times faster than asking the canvas to fill
 * tens of thousands of single-pixel squares.
 */
export class PixelBuffer {
  readonly width: number
  readonly height: number
  readonly data: Uint8ClampedArray<ArrayBuffer>
  private colors = new Map<string, [number, number, number]>()

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.data = new Uint8ClampedArray(width * height * 4)
  }

  private rgb(hex: string): [number, number, number] {
    let rgb = this.colors.get(hex)
    if (!rgb) {
      rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number]
      this.colors.set(hex, rgb)
    }
    return rgb
  }

  /** Colors one pixel. Pixels outside the grid are ignored. */
  set(x: number, y: number, hex: string) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return
    const [r, g, b] = this.rgb(hex)
    const i = (y * this.width + x) * 4
    this.data[i] = r
    this.data[i + 1] = g
    this.data[i + 2] = b
    this.data[i + 3] = 255
  }

  /** Whether a pixel has been colored. */
  filled(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false
    return this.data[(y * this.width + x) * 4 + 3]! > 0
  }

  toCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    canvas.getContext('2d')!.putImageData(new ImageData(this.data, this.width, this.height), 0, 0)
    return canvas
  }
}
