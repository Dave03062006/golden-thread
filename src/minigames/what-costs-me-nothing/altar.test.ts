import { describe, expect, it } from 'vitest'
import { ALTAR_STEPS, episode5 } from '../../content/levels/19-davids-sin-and-repentance/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whatCostsMeNothing } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whatCostsMeNothing.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whatCostsMeNothing.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = whatCostsMeNothing.step(state, player(state, t), ctx, () => {})
  return { state, view: whatCostsMeNothing.view(state, ctx) }
}

describe('"What costs me nothing"', () => {
  it('pays the price and builds the altar, and fire falls', () => {
    const { state, view } = run(false, 20, (s) => (s.time - s.placedAt > 2.1 && s.placed < ALTAR_STEPS.length ? [{ kind: 'choose', option: `altar-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(ALTAR_STEPS.length)
    expect(view.live['actor:altar.opacity']).toBe(1)
    expect(view.live['actor:fire.opacity']).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not that" to taking the gift for nothing', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'decoy-1' }] : []))
    expect(state.placed).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
