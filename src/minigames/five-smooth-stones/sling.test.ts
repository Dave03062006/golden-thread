import { describe, expect, it } from 'vitest'
import { GOLIATH, SLING, episode2 } from '../../content/levels/18-david-the-shepherd-king/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { fiveSmoothStones } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof fiveSmoothStones.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = fiveSmoothStones.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = fiveSmoothStones.step(state, player(state, t), ctx, () => {})
  return { state, view: fiveSmoothStones.view(state, ctx) }
}

describe('"Five smooth stones"', () => {
  it('lets the stone fly only when the aim is on the forehead', () => {
    const early = run(false, 0.05, (_s, t) => (t < STEP ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(early.state.hitAt).toBe(-1)
    // Half a swing in, the aim crosses the middle, where the forehead is.
    const { view } = run(false, 5, (_s, t) => (Math.abs(t - 0.4) < STEP / 2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(view.live[`actor:${SLING.marker}.x`]).toBe(SLING.target)
    expect(view.live[`actor:${GOLIATH}.opacity`]).toBe(0)
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
