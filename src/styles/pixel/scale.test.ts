import { describe, expect, it } from 'vitest'
import { pixelScale } from './scale'

describe('pixelScale', () => {
  it('uses the biggest whole number that fits', () => {
    expect(pixelScale(1280, 720, 1)).toBe(4)
    expect(pixelScale(1440, 810, 1)).toBe(4)
    expect(pixelScale(1920, 1080, 1)).toBe(6)
    expect(pixelScale(844, 475, 3)).toBe(7)
  })

  it('never goes below 1', () => {
    expect(pixelScale(100, 60, 1)).toBe(1)
  })
})
