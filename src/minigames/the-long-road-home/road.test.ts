import { describe, expect, it } from 'vitest'
import { ROAD, WIDOWS, episode1 } from '../../content/levels/16-ruth/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLongRoadHome } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLongRoadHome.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLongRoadHome.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theLongRoadHome.step(state, player(state, t), ctx, () => {})
  return { state, view: theLongRoadHome.view(state, ctx) }
}

describe('"The long road home"', () => {
  it('walks the widows stop by stop toward Bethlehem', () => {
    const { view } = run(false, 20, (s) => [{ kind: 'pointer', phase: 'move', x: ROAD[s.next]!.x, y: ROAD[s.next]!.y }])
    expect(view.live[`actor:${WIDOWS}.x`]).toBe(ROAD.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
