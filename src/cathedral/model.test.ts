import { describe, expect, it } from 'vitest'
import { newSave } from '../engine/save/types'
import { threadPoints } from './layout'
import { dayLight, nave, panelsToSet, threadLines } from './model'

const save = (changes: Partial<ReturnType<typeof newSave>> = {}) => ({ ...newSave('Test', 'paper-glass', ''), ...changes })

describe('the cathedral', () => {
  it('has 14 bays and 53 windows, with Level 1’s six panels', () => {
    const bays = nave(save())
    expect(bays).toHaveLength(14)
    expect(bays.flatMap((b) => b.windows)).toHaveLength(53)
    const first = bays[0]!.windows[0]!
    expect(first.level?.id).toBe('l01')
    expect(first.panels.map((p) => p.state)).toEqual(['dark', 'dark', 'dark', 'dark', 'dark', 'dark'])
    // Windows of levels still to come stand dark, with no panels yet.
    expect(bays[13]!.windows[0]!.panels).toEqual([])
  })

  it('lights a finished episode’s panel, setting it once', () => {
    const finished = save({ completedEpisodes: ['l01-e1', 'l01-e2'], panelsSet: ['l01-e1'] })
    expect(nave(finished)[0]!.windows[0]!.panels.slice(0, 3).map((p) => p.state)).toEqual(['lit', 'new', 'dark'])
    expect(panelsToSet(finished)).toEqual(['l01-e2'])
  })

  it('completes the window when all six panels are lit', () => {
    const all = ['l01-e1', 'l01-e2', 'l01-e3', 'l01-e4', 'l01-e5', 'l01-e6']
    expect(nave(save({ completedEpisodes: all, panelsSet: all }))[0]!.windows[0]!.complete).toBe(true)
    expect(nave(save({ completedEpisodes: all.slice(0, 5), panelsSet: all }))[0]!.windows[0]!.complete).toBe(false)
  })

  it('draws found threads toward the Age they’re fulfilled in, glimmering until it’s reached', () => {
    const lines = threadLines(save({ threadsFound: ['obedience-in-a-garden', 'creation-by-the-word'] }))
    expect(lines.map((l) => [l.episode, l.toAge, l.reached])).toEqual([
      ['l01-e1', 'XI', false],
      ['l01-e3', 'XII', false],
    ])
  })

  it('follows the time of day', () => {
    const at = (h: number) => dayLight(new Date(2026, 9, 16, h, 30))
    expect([at(6), at(12), at(18), at(23), at(3)]).toEqual(['dawn', 'day', 'dusk', 'night', 'night'])
  })
})

describe('a golden thread across the nave', () => {
  it('runs from one point to the other, its points spaced by distance along it', () => {
    const points = threadPoints({ x: 100, y: 300 }, { x: 900, y: 250 }, 16)
    expect(points[0]).toMatchObject({ x: 100, y: 300, along: 0 })
    expect(points.at(-1)).toMatchObject({ x: 900, y: 250, along: 1 })
    for (let i = 1; i < points.length; i++) expect(points[i]!.along).toBeGreaterThan(points[i - 1]!.along)
    // It arcs up over the nave between them.
    expect(Math.min(...points.map((p) => p.y))).toBeLessThan(250)
  })
})
