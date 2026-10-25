import { describe, expect, it } from 'vitest'
import { FAMILY, MANNA, episode4 } from '../../content/levels/09-through-the-sea/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { enoughForEach } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof enoughForEach.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = enoughForEach.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = enoughForEach.step(state, player(state, t), ctx, () => {})
  return { state, view: enoughForEach.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (x: number, y: number): GameInput => ({ kind: 'pointer', phase: 'down', x, y })

describe('"Enough for each"', () => {
  it('fills a jar for each patch gathered, and no more than one for each person', () => {
    // Tapping every patch in turn: only six jars fill, and the rest of the manna melts.
    const { state, view } = run(false, 2.5, (s) => {
      const next = MANNA.find((_, i) => !s.gathered[i])
      return next ? [tap(next.x, next.y)] : []
    })
    expect(state.filled).toBe(FAMILY.length)
    expect(state.gathered.filter(Boolean)).toHaveLength(FAMILY.length)
    for (const f of FAMILY) expect(view.live[`actor:${f.full}.opacity`]).toBe(1)
    expect(state.meltAt).toBeGreaterThan(0)
  })

  it('ignores a tap far from any manna, except in gentle mode', () => {
    expect(run(false, 1, () => [tap(0.1, 0.2)]).state.filled).toBe(0)
    expect(run(true, 1, (s) => (s.time < STEP ? [tap(0.1, 0.2)] : [])).state.filled).toBe(1)
  })

  it('with Space, gathers for both days, heaps the jars on the sixth, and ends with the sabbath', () => {
    const { state, view } = run(false, 30, () => [space])
    expect(state.day).toBe(2)
    for (const f of FAMILY) expect(view.live[`actor:${f.heaped}.opacity`]).toBe(1)
    for (const m of MANNA) expect(view.live[`actor:${m.id}.opacity`]).toBe(0)
    expect(view.message?.title).toBe('The seventh day')
    expect(view.done).toBe(true)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
