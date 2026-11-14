import { describe, expect, it } from 'vitest'
import { CROSSROADS, episode6 } from '../../content/levels/21-solomon-and-the-temple/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { aHeartWhollyTrue } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof aHeartWhollyTrue.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = aHeartWhollyTrue.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = aHeartWhollyTrue.step(state, player(state, t), ctx, () => {})
  return { state, view: aHeartWhollyTrue.view(state, ctx) }
}

describe('"A heart wholly true"', () => {
  it('chooses the true way at every crossroads, and every lamp is lit', () => {
    const { state, view } = run(false, 15, (s) => (s.time - s.placedAt > 2.1 && s.placed < CROSSROADS.length ? [{ kind: 'choose', option: `true-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(CROSSROADS.length)
    expect(view.live[`actor:lamp-${CROSSROADS.length}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('turns back the way Solomon’s heart turned', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'turned-1' }] : []))
    expect(state.placed).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
