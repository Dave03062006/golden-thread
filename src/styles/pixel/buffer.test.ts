import { describe, expect, it } from 'vitest'
import { PixelBuffer } from './buffer'

describe('PixelBuffer', () => {
  it('stores colors as red, green, blue and full opacity', () => {
    const buf = new PixelBuffer(4, 3)
    buf.set(1, 2, '#ff8000')
    const i = (2 * 4 + 1) * 4
    expect([...buf.data.slice(i, i + 4)]).toEqual([255, 128, 0, 255])
    expect(buf.filled(1, 2)).toBe(true)
    expect(buf.filled(0, 0)).toBe(false)
  })

  it('ignores pixels outside the grid', () => {
    const buf = new PixelBuffer(2, 2)
    buf.set(-1, 0, '#ffffff')
    buf.set(2, 1, '#ffffff')
    expect(buf.data.every((v) => v === 0)).toBe(true)
    expect(buf.filled(5, 5)).toBe(false)
  })
})
