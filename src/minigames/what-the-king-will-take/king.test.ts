import { describe, expect, it } from 'vitest'
import { TAKEN, episode4 } from '../../content/levels/17-samuel-and-saul/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whatTheKingWillTake } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whatTheKingWillTake.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whatTheKingWillTake.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = whatTheKingWillTake.step(state, player(state, t), ctx, () => {})
  return { state, view: whatTheKingWillTake.view(state, ctx) }
}

describe('"What the king will take"', () => {
  it('takes each thing from the village as it is named, in order', () => {
    const { view } = run(false, 30, (s) => (s.time - s.placedAt > 2.1 && s.placed < TAKEN.length ? [{ kind: 'choose', option: TAKEN[s.placed]!.id }] : []))
    for (const t of TAKEN) expect(view.live[`actor:${t.id}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
