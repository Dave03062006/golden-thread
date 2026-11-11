import { describe, expect, it } from 'vitest'
import { episode6 } from '../../content/levels/17-samuel-and-saul/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theBleatingOfTheSheep } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theBleatingOfTheSheep.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theBleatingOfTheSheep.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theBleatingOfTheSheep.step(state, player(state, t), ctx, () => {})
  return { state, view: theBleatingOfTheSheep.view(state, ctx) }
}

describe('"The bleating of the sheep"', () => {
  it('sees through each of Saul’s excuses', () => {
    const ids = ['performed', 'the-people', 'to-sacrifice']
    const { state, view } = run(false, 12, (s) => (s.time - s.placedAt > 2.1 && s.placed < 3 ? [{ kind: 'choose', option: ids[s.placed]! }] : []))
    expect(state.placed).toBe(3)
    expect(view.done).toBe(true)
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
