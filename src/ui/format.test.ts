import { describe, expect, it } from 'vitest'
import { formatDate, formatPlayTime } from './format'

describe('formatPlayTime', () => {
  it('reads naturally', () => {
    expect(formatPlayTime(20)).toBe('Less than a minute')
    expect(formatPlayTime(12 * 60 + 30)).toBe('12 min')
    expect(formatPlayTime(65 * 60)).toBe('1 h 05 min')
  })
})

describe('formatDate', () => {
  it('ignores nonsense', () => {
    expect(formatDate('not a date')).toBe('')
    expect(formatDate('2026-10-15T12:00:00.000Z')).toMatch(/2026/)
  })
})
