import { describe, expect, it } from 'vitest'
import { MAP_CAMP, STAGES, START, episode1 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { followTheCloud } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof followTheCloud.start>

function run(gentle: boolean, seconds: number, player: (state: State) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = followTheCloud.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = followTheCloud.step(state, player(state), ctx, () => {})
    const title = followTheCloud.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: followTheCloud.view(state, ctx) }
}

describe('"Follow the cloud"', () => {
  it('pitches the tents at each stage the camp is led to, until the cloud settles in Paran', () => {
    // The player drags the camp to wherever the cloud is going.
    const { titles, view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: STAGES[s.stage]!.x, y: STAGES[s.stage]!.y }])
    // The last stage is the wilderness of Paran itself.
    expect(titles).toEqual([...STAGES.slice(0, -1).map((_, i) => `Stage ${i + 1} of ${STAGES.length}`), 'The wilderness of Paran'])
    expect(view.live[`actor:${MAP_CAMP}.x`]).toBe(STAGES.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('stays where it is until the player leads it, except in gentle mode', () => {
    expect(run(false, 5).state.camp).toEqual(START)
    expect(run(true, 12).state.stage).toBeGreaterThan(0)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
