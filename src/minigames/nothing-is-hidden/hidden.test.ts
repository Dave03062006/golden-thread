import { describe, expect, it } from 'vitest'
import { LAMP, SEARCH, episode1 } from '../../content/levels/19-davids-sin-and-repentance/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { nothingIsHidden } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof nothingIsHidden.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = nothingIsHidden.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = nothingIsHidden.step(state, player(state, t), ctx, () => {})
  return { state, view: nothingIsHidden.view(state, ctx) }
}

describe('"Nothing is hidden"', () => {
  it('carries the lamp to everything David tried to hide', () => {
    const { view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: SEARCH[s.next]!.x, y: SEARCH[s.next]!.y }])
    expect(view.live[`actor:${LAMP}.x`]).toBe(SEARCH.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('finds them by itself in gentle mode', () => {
    expect(run(true, 40).view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
