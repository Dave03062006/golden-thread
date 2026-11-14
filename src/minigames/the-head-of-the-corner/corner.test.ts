import { describe, expect, it } from 'vitest'
import { ARCH, SWING, episode5 } from '../../content/levels/20-the-psalms/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theHeadOfTheCorner } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theHeadOfTheCorner.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theHeadOfTheCorner.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theHeadOfTheCorner.step(state, player(state, t), ctx, () => {})
  return { state, view: theHeadOfTheCorner.view(state, ctx) }
}

describe('"The head of the corner"', () => {
  it('drops the stone only when it is over the gap', () => {
    const early = run(false, 0.05, (_s, t) => (t < STEP ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(early.state.hitAt).toBe(-1)
    // Half a swing in, the stone crosses the middle, where the gap is.
    const { view } = run(false, 5, (_s, t) => (Math.abs(t - 0.45) < STEP / 2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(view.done).toBe(true)
    expect(view.live[`actor:${SWING.marker}.y`]).toBeCloseTo(ARCH.gap)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
