import { describe, expect, it } from 'vitest'
import { DREAM, PRAYER, episode1 } from '../../content/levels/21-solomon-and-the-temple/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { anUnderstandingMind } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof anUnderstandingMind.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = anUnderstandingMind.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = anUnderstandingMind.step(state, player(state, t), ctx, () => {})
  return { state, view: anUnderstandingMind.view(state, ctx) }
}

describe('"An understanding mind"', () => {
  it('puts Solomon’s prayer in order, and the dream grows bright', () => {
    const { state, view } = run(false, 12, (s) => (s.time - s.placedAt > 2.1 && s.placed < PRAYER.length ? [{ kind: 'choose', option: `prayer-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(PRAYER.length)
    expect(view.live[`actor:${DREAM}.opacity`]).toBeCloseTo(0.9)
    expect(view.done).toBe(true)
  })

  it('says "not that" to asking for a long life', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'decoy-1' }] : []))
    expect(state.placed).toBe(0)
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
