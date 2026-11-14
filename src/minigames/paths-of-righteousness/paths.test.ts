import { describe, expect, it } from 'vitest'
import { PSALM_WAY, SHEPHERD, episode2 } from '../../content/levels/20-the-psalms/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { pathsOfRighteousness } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof pathsOfRighteousness.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = pathsOfRighteousness.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = pathsOfRighteousness.step(state, player(state, t), ctx, () => {})
  return { state, view: pathsOfRighteousness.view(state, ctx) }
}

describe('"Paths of righteousness"', () => {
  it('leads the shepherd through Psalm 23 to the house of the Lord', () => {
    const { view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: PSALM_WAY[s.next]!.x, y: PSALM_WAY[s.next]!.y }])
    expect(view.live[`actor:${SHEPHERD}.x`]).toBe(PSALM_WAY.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
