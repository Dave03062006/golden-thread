import { describe, expect, it } from 'vitest'
import { FLIGHT, KING, episode4 } from '../../content/levels/19-davids-sin-and-repentance/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { upTheMountOfOlives } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof upTheMountOfOlives.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = upTheMountOfOlives.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = upTheMountOfOlives.step(state, player(state, t), ctx, () => {})
  return { state, view: upTheMountOfOlives.view(state, ctx) }
}

describe('"Up the Mount of Olives"', () => {
  it('leads the king across the Kidron and up to the summit', () => {
    const { view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: FLIGHT[s.next]!.x, y: FLIGHT[s.next]!.y }])
    expect(view.live[`actor:${KING}.x`]).toBe(FLIGHT.at(-1)!.x)
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
