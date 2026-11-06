import { describe, expect, it } from 'vitest'
import { JOURNEYS, STOPS, episode1 } from '../../content/levels/10-sinai/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { upAndDownTheMountain } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof upAndDownTheMountain.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = upAndDownTheMountain.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = upAndDownTheMountain.step(state, player(state, t), ctx, () => {})
  return { state, view: upAndDownTheMountain.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (n: number): GameInput => ({ kind: 'pointer', phase: 'down', x: STOPS[n]!.x, y: STOPS[n]!.y })

describe('"Up and down the mountain"', () => {
  it('walks only to the next stop on the path', () => {
    expect(run(false, 3, (s) => (s.to === null ? [tap(3)] : [])).state.at).toBe(0)
    expect(run(false, 3, (s) => (s.to === null && s.at === 0 ? [tap(1)] : [])).state.at).toBe(1)
  })

  it('takes Moses to the top, and shows God’s word when he arrives', () => {
    const { state, view } = run(false, 20, (s) => (s.to === null && s.journey === 0 ? [tap(s.at + 1)] : []))
    expect(state.journey).toBe(1)
    expect(state.at).toBe(STOPS.length - 1)
    expect(view.live['actor:climber.y']).toBeCloseTo(STOPS.at(-1)!.y)
  })

  it('with Space, makes all four journeys and ends in the camp', () => {
    const { state, view } = run(false, 60, () => [space])
    expect(state.journey).toBe(JOURNEYS.length)
    expect(state.at).toBe(0)
    expect(view.message?.title).toBe(JOURNEYS.at(-1)!.title)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, Moses walks the path by himself', () => {
    const { state, view } = run(true, 80)
    expect(state.journey).toBe(JOURNEYS.length)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
