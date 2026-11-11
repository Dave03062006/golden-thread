import { describe, expect, it } from 'vitest'
import { COWS, ROAD, episode3 } from '../../content/levels/17-samuel-and-saul/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theRoadToBethShemesh } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theRoadToBethShemesh.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theRoadToBethShemesh.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theRoadToBethShemesh.step(state, player(state, t), ctx, () => {})
  return { state, view: theRoadToBethShemesh.view(state, ctx) }
}

describe('"The road to Beth-shemesh"', () => {
  it('leads the cows bend by bend to Beth-shemesh', () => {
    const { view } = run(false, 20, (s) => [{ kind: 'pointer', phase: 'move', x: ROAD[s.next]!.x, y: ROAD[s.next]!.y }])
    expect(view.live[`actor:${COWS}.x`]).toBe(ROAD.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
