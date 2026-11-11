import { describe, expect, it } from 'vitest'
import { MEN, ROCKS, episode4 } from '../../content/levels/18-david-the-shepherd-king/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theOtherSideOfTheMountain } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theOtherSideOfTheMountain.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theOtherSideOfTheMountain.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theOtherSideOfTheMountain.step(state, player(state, t), ctx, () => {})
  return { state, view: theOtherSideOfTheMountain.view(state, ctx) }
}

describe('"The other side of the mountain"', () => {
  it('moves the men rock by rock while the lookout looks away', () => {
    const { state, view } = run(false, 30, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(ROCKS.length - 1)
    expect(view.live[`actor:${MEN}.x`]).toBe(ROCKS.at(-1))
    expect(view.done).toBe(true)
  })

  it('keeps still while the lookout looks this way', () => {
    expect(run(false, 0.5, () => [{ kind: 'key', key: 'primary', down: true }]).state.taken).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
