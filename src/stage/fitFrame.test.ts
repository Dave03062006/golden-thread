import { describe, expect, it } from 'vitest'
import { fitFrame } from './fitFrame'

describe('fitFrame', () => {
  it('fills the width when the space is tall', () => {
    expect(fitFrame(1600, 1200)).toEqual({ width: 1600, height: 900 })
  })

  it('fills the height when the space is wide', () => {
    expect(fitFrame(2000, 900)).toEqual({ width: 1600, height: 900 })
  })
})
