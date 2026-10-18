import { describe, expect, it } from 'vitest'
import { newSave } from '../../engine/save/types'
import { levelMarkers, mapThreads } from './features'
import { NEAR_EAST, projector } from './geo'

const save = (changes: Partial<ReturnType<typeof newSave>> = {}) => ({ ...newSave('Test', 'paper-glass', ''), ...changes })
const all = ['l01-e1', 'l01-e2', 'l01-e3', 'l01-e4', 'l01-e5', 'l01-e6']

describe('the world map', () => {
  it('marks Level 1 at Eden, finished once all its episodes are', () => {
    const [first] = levelMarkers(save())
    expect(first).toMatchObject({ id: 'l01', number: 1, label: 'Eden', finished: false })
    expect(levelMarkers(save({ completedEpisodes: all }))[0]!.finished).toBe(true)
  })

  it('places every marker inside the map', () => {
    const map = projector(NEAR_EAST)
    for (const m of levelMarkers(save())) {
      const { x, y } = map.point(m.at)
      expect(x).toBeGreaterThan(0)
      expect(x).toBeLessThan(map.width)
      expect(y).toBeGreaterThan(0)
      expect(y).toBeLessThan(map.height)
    }
  })

  it('draws only the threads found that reach a place, from the level to that place', () => {
    expect(mapThreads(save())).toEqual([])
    // Creation by the Word is fulfilled in an Age, not a place, so it isn't drawn.
    const threads = mapThreads(save({ threadsFound: ['creation-by-the-word', 'obedience-in-a-garden', 'from-adam-to-jesus'] }))
    expect(threads.map((t) => [t.id, t.toName])).toEqual([
      ['obedience-in-a-garden', 'Jerusalem'],
      ['from-adam-to-jesus', 'Jordan'],
    ])
    expect(threads[0]!.from).toEqual({ lat: 31.2, lon: 47.0 })
    expect(threads[0]!.to).toEqual({ lat: 31.78, lon: 35.23 })
  })
})
