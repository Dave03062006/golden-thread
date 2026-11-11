import { describe, expect, it } from 'vitest'
import { BEAMS, PROMISE, episode8 } from '../../content/levels/18-david-the-shepherd-king/episode-8'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { aHouseForEver } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode8, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof aHouseForEver.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = aHouseForEver.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = aHouseForEver.step(state, player(state, t), ctx, () => {})
  return { state, view: aHouseForEver.view(state, ctx) }
}

describe('"A house for ever"', () => {
  it('raises a beam of light for each part of the promise', () => {
    const { view } = run(false, 30, (s) => (s.time - s.placedAt > 2.1 && s.placed < PROMISE.length ? [{ kind: 'choose', option: `promise-${s.placed + 1}` }] : []))
    for (const b of BEAMS) expect(view.live[`actor:${b.id}.opacity`]).toBe(0.9)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode8, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode8.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
