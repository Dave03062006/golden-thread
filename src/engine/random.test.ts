import { describe, expect, it } from 'vitest'
import { createRng, randomSeed } from './random'

describe('createRng', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = createRng(42)
    const b = createRng(42)
    const seqA = Array.from({ length: 5 }, () => a.next())
    const seqB = Array.from({ length: 5 }, () => b.next())
    expect(seqA).toEqual(seqB)
  })

  it('gives different sequences for different seeds', () => {
    expect(createRng(1).next()).not.toBe(createRng(2).next())
  })

  it('stays in range', () => {
    const rng = createRng(7)
    for (let i = 0; i < 1000; i++) {
      const n = rng.next()
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(1)
      const k = rng.int(3, 6)
      expect(k).toBeGreaterThanOrEqual(3)
      expect(k).toBeLessThan(6)
    }
  })

  it('shuffles without losing or changing items', () => {
    const items = [1, 2, 3, 4, 5, 6]
    const shuffled = createRng(9).shuffle(items)
    expect([...shuffled].sort()).toEqual(items)
    expect(items).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('favors heavier weights', () => {
    const rng = createRng(3)
    const counts = { light: 0, heavy: 0 }
    for (let i = 0; i < 4000; i++) {
      const pick = rng.weighted(['light', 'heavy'] as const, (x) => (x === 'heavy' ? 3 : 1))
      counts[pick]++
    }
    expect(counts.heavy / counts.light).toBeGreaterThan(2.5)
    expect(counts.heavy / counts.light).toBeLessThan(3.5)
  })

  it('refuses impossible picks', () => {
    expect(() => createRng(1).pick([])).toThrow(/at least one item/)
    expect(() => createRng(1).weighted(['a'], () => 0)).toThrow(/positive weight/)
  })
})

describe('randomSeed', () => {
  it('returns a 32-bit whole number', () => {
    const seed = randomSeed()
    expect(Number.isInteger(seed)).toBe(true)
    expect(seed).toBeGreaterThanOrEqual(0)
  })
})
