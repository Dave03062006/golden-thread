import { describe, expect, it } from 'vitest'
import { JUDGMENT, MOTHER, episode2 } from '../../content/levels/21-solomon-and-the-temple/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLivingChild } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLivingChild.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLivingChild.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theLivingChild.step(state, player(state, t), ctx, () => {})
  return { state, view: theLivingChild.view(state, ctx) }
}

describe('"The living child"', () => {
  it('finds the true mother, and the baby goes to her', () => {
    const { state, view } = run(false, 12, (s) => (s.time - s.placedAt > 2.1 && s.placed < JUDGMENT.length ? [{ kind: 'choose', option: `${JUDGMENT[s.placed]!.answer}-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(JUDGMENT.length)
    expect(view.live['actor:baby.x']).toBeCloseTo(MOTHER.x + 0.02)
    expect(view.done).toBe(true)
  })

  it('says "look again" to the woman who would divide the child', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'other-1' }] : []))
    expect(state.placed).toBe(0)
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
