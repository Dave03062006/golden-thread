import { describe, expect, it } from 'vitest'
import { CLIMB, THRONE_ROAD, episode6 } from '../../content/levels/18-david-the-shepherd-king/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theRoadToTheThrone } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theRoadToTheThrone.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theRoadToTheThrone.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theRoadToTheThrone.step(state, player(state, t), ctx, () => {})
  return { state, view: theRoadToTheThrone.view(state, ctx) }
}

describe('"The road to the throne"', () => {
  it('climbs to Zion as David’s life is set in order', () => {
    const { view } = run(false, 40, (s) => (s.time - s.placedAt > 2.1 && s.placed < THRONE_ROAD.length ? [{ kind: 'choose', option: `throne-${s.placed + 1}` }] : []))
    expect(view.live[`actor:${CLIMB.id}.y`]).toBe(CLIMB.to.y)
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
