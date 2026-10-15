/**
 * Seeded random numbers. The same seed always gives the same sequence, which lets a quiz
 * run be reviewed exactly and makes tests repeatable.
 */

export interface Rng {
  /** A number from 0 (inclusive) to 1 (exclusive). */
  next(): number
  /** A whole number from `min` (inclusive) to `max` (exclusive). */
  int(min: number, max: number): number
  pick<T>(items: readonly T[]): T
  /** A shuffled copy; the original is untouched. */
  shuffle<T>(items: readonly T[]): T[]
  /** Picks one item, where items with a bigger weight are more likely. */
  weighted<T>(items: readonly T[], weightOf: (item: T) => number): T
}

/** The mulberry32 generator: small, fast and good enough for games. */
export function createRng(seed: number): Rng {
  let state = seed >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  return {
    next,
    int(min, max) {
      return min + Math.floor(next() * (max - min))
    },
    pick(items) {
      if (items.length === 0) throw new Error('pick() needs at least one item')
      return items[Math.floor(next() * items.length)]!
    },
    shuffle(items) {
      const copy = [...items]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
      }
      return copy
    },
    weighted(items, weightOf) {
      const weights = items.map((item) => Math.max(0, weightOf(item)))
      const total = weights.reduce((sum, w) => sum + w, 0)
      if (items.length === 0 || total <= 0) throw new Error('weighted() needs a positive weight')
      let roll = next() * total
      for (let i = 0; i < items.length; i++) {
        roll -= weights[i]!
        if (roll < 0) return items[i]!
      }
      return items[items.length - 1]!
    },
  }
}

/** A fresh seed from the browser's secure random source. */
export function randomSeed(): number {
  const buffer = new Uint32Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0]!
}
