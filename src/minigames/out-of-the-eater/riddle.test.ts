import { describe, expect, it } from 'vitest'
import { episode5 } from '../../content/levels/15-the-judges/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { outOfTheEater } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof outOfTheEater.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = outOfTheEater.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = outOfTheEater.step(state, player(state, t), ctx, () => {})
  return { state, view: outOfTheEater.view(state, ctx) }
}

describe('"Out of the eater"', () => {
  it('takes the right part of the riddle and groans at a wrong guess', () => {
    const wrong = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'eater-guess-1' }] : []))
    expect(wrong.state.placed).toBe(0)
    expect(wrong.view.choice?.feedback?.right).toBe(false)
    const right = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'eater' }] : []))
    expect(right.state.placed).toBe(1)
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
