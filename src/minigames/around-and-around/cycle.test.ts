import { describe, expect, it } from 'vitest'
import { CYCLE, TURNS, episode1 } from '../../content/levels/15-the-judges/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { aroundAndAround } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof aroundAndAround.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = aroundAndAround.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = aroundAndAround.step(state, player(state, t), ctx, () => {})
  return { state, view: aroundAndAround.view(state, ctx) }
}

describe('"Around and around"', () => {
  it('lights the five pictures of the circle as they are set in order, three times round', () => {
    const { view, state } = run(false, 80, (s) => (s.time - s.placedAt > 2.1 ? [{ kind: 'choose', option: `${CYCLE[s.placed % CYCLE.length]!.id}-${Math.floor(s.placed / CYCLE.length) + 1}` }] : []))
    expect(state.placed).toBe(CYCLE.length * TURNS)
    for (const c of CYCLE) expect(view.live[`actor:${c.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
