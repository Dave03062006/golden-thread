import { describe, expect, it } from 'vitest'
import { LINE, episode5 } from '../../content/levels/16-ruth/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { perezToDavid } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof perezToDavid.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = perezToDavid.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = perezToDavid.step(state, player(state, t), ctx, () => {})
  return { state, view: perezToDavid.view(state, ctx) }
}

describe('"Perez to David"', () => {
  it('grows a leaf for each name set in order, from Perez to David', () => {
    const { view } = run(false, 40, (s) => (s.time - s.placedAt > 2.1 && s.placed < LINE.length ? [{ kind: 'choose', option: LINE[s.placed]!.id }] : []))
    for (const l of LINE) expect(view.live[`actor:${l.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
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
