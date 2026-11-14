import { describe, expect, it } from 'vitest'
import { PRIESTS, PROCESSION, episode4 } from '../../content/levels/21-solomon-and-the-temple/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { intoTheMostHolyPlace } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof intoTheMostHolyPlace.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = intoTheMostHolyPlace.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = intoTheMostHolyPlace.step(state, player(state, t), ctx, () => {})
  return { state, view: intoTheMostHolyPlace.view(state, ctx) }
}

describe('"Into the Most Holy Place"', () => {
  it('leads the priests and the ark up to the doors of the house', () => {
    const { view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: PROCESSION[s.next]!.x, y: PROCESSION[s.next]!.y }])
    expect(view.live[`actor:${PRIESTS}.y`]).toBe(PROCESSION.at(-1)!.y)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
