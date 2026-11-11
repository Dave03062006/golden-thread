import { describe, expect, it } from 'vitest'
import { CHAFF, CLEAN, episode4 } from '../../content/levels/16-ruth/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { TOSSES, winnowing } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof winnowing.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = winnowing.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = winnowing.step(state, player(state, t), ctx, () => {})
  return { state, view: winnowing.view(state, ctx) }
}

describe('"Winnowing"', () => {
  it('cleans the heap toss by toss while the wind blows', () => {
    const { view, state } = run(false, 30, (s) => (s.time >= s.gustAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.tosses).toBe(TOSSES)
    expect(view.live[`actor:${CLEAN}.opacity`]).toBe(1)
    expect(view.live[`actor:${CHAFF}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('does nothing for a toss in still air', () => {
    expect(run(false, 0.5, () => [{ kind: 'key', key: 'primary', down: true }]).state.tosses).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
