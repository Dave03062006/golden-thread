import { describe, expect, it } from 'vitest'
import { FOUND, SHRINE, episode6 } from '../../content/levels/15-the-judges/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { inHisOwnEyes } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof inHisOwnEyes.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = inHisOwnEyes.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = inHisOwnEyes.step(state, player(state, t), ctx, () => {})
  return { state, view: inHisOwnEyes.view(state, ctx) }
}

describe('"In his own eyes"', () => {
  it('fades each thing in the shrine once the law it breaks is found', () => {
    const { view } = run(false, 30, (s) => (s.time - s.placedAt > 2.1 && s.placed < SHRINE.length ? [{ kind: 'choose', option: SHRINE[s.placed]!.id }] : []))
    for (const s of SHRINE) expect(view.live[`actor:${s.id}.opacity`]).toBe(FOUND)
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
