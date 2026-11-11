import { describe, expect, it } from 'vitest'
import { PROMISE, RUTH, episode2 } from '../../content/levels/16-ruth/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whereYouGo } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whereYouGo.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whereYouGo.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = whereYouGo.step(state, player(state, t), ctx, () => {})
  return { state, view: whereYouGo.view(state, ctx) }
}

describe('"Where you go"', () => {
  it('brings Ruth to Naomi as her promise is put back in order', () => {
    const { view, state } = run(false, 30, (s) => (s.time - s.placedAt > 2.1 && s.placed < PROMISE.length ? [{ kind: 'choose', option: `promise-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(PROMISE.length)
    expect(view.live[`actor:${RUTH.id}.x`]).toBe(RUTH.to)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
