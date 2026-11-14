import { describe, expect, it } from 'vitest'
import { ASCENTS, STAIRS, episode6 } from '../../content/levels/20-the-psalms/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { songsOfAscents } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof songsOfAscents.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = songsOfAscents.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = songsOfAscents.step(state, player(state, t), ctx, () => {})
  return { state, view: songsOfAscents.view(state, ctx) }
}

describe('"Songs of ascents"', () => {
  it('climbs the stairway one song at a time, to the top', () => {
    const { state, view } = run(false, 20, (s) => (s.time - s.placedAt > 2.1 && s.placed < ASCENTS.length ? [{ kind: 'choose', option: `ascent-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(ASCENTS.length)
    expect(view.live[`actor:${STAIRS.id}.y`]).toBeCloseTo(STAIRS.to.y)
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
