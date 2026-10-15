import { describe, expect, it } from 'vitest'
import { ease, pingPong, progress, sampleTrack, stepSpring, trackLength, type Keyframe } from './motion'

describe('easing curves', () => {
  it('start at 0 and end at 1', () => {
    for (const fn of Object.values(ease)) {
      expect(fn(0)).toBeCloseTo(0)
      expect(fn(1)).toBeCloseTo(1)
    }
  })

  it('are halfway at the middle when symmetric', () => {
    expect(ease.inOutSine(0.5)).toBeCloseTo(0.5)
    expect(ease.inOutCubic(0.5)).toBeCloseTo(0.5)
    expect(ease.smoother(0.5)).toBeCloseTo(0.5)
  })
})

describe('progress', () => {
  it('runs from 0 to 1 over the span and holds', () => {
    expect(progress(2, 4, 1)).toBe(0)
    expect(progress(2, 4, 4)).toBe(0.5)
    expect(progress(2, 4, 99)).toBe(1)
    expect(progress(0, 0, 0)).toBe(1)
  })
})

describe('sampleTrack', () => {
  const track: Keyframe[] = [
    { at: 0, value: 10 },
    { at: 2, value: 20, ease: 'linear' },
    { at: 4, value: 0, ease: 'linear' },
  ]

  it('holds the ends', () => {
    expect(sampleTrack(track, -1)).toBe(10)
    expect(sampleTrack(track, 9)).toBe(0)
  })

  it('interpolates inside a segment', () => {
    expect(sampleTrack(track, 1)).toBe(15)
    expect(sampleTrack(track, 3)).toBe(10)
  })

  it('knows its length', () => {
    expect(trackLength(track)).toBe(4)
    expect(sampleTrack([], 1)).toBe(0)
  })
})

describe('pingPong', () => {
  it('goes there and back', () => {
    expect(pingPong(1, 4)).toBe(1)
    expect(pingPong(5, 4)).toBe(3)
    expect(pingPong(8, 4)).toBe(0)
  })
})

describe('stepSpring', () => {
  it('settles on its target', () => {
    let s = { value: 0, velocity: 0 }
    for (let i = 0; i < 120; i++) s = stepSpring(s, 1, 1 / 60)
    expect(s.value).toBeCloseTo(1, 3)
  })

  it('behaves the same at 60 and 120 frames a second', () => {
    let a = { value: 0, velocity: 0 }
    let b = { value: 0, velocity: 0 }
    for (let i = 0; i < 30; i++) a = stepSpring(a, 1, 1 / 60)
    for (let i = 0; i < 60; i++) b = stepSpring(b, 1, 1 / 120)
    expect(a.value).toBeCloseTo(b.value, 5)
  })
})
