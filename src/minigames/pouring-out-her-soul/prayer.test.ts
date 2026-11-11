import { describe, expect, it } from 'vitest'
import { PRAYER, episode1 } from '../../content/levels/17-samuel-and-saul/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { PRAY, pouringOutHerSoul } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof pouringOutHerSoul.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = pouringOutHerSoul.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = pouringOutHerSoul.step(state, player(state, t), ctx, () => {})
  return { state, view: pouringOutHerSoul.view(state, ctx) }
}

describe('"Pouring out her soul"', () => {
  it('raises the light while Space is held, and finishes', () => {
    const { view } = run(false, PRAY + 3, (_s, t) => (t < STEP ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(view.live[`actor:${PRAYER.id}.y`]).toBe(PRAYER.to)
    expect(view.done).toBe(true)
  })

  it('rests when let go', () => {
    const { state } = run(false, 3, (_s, t) => (t < STEP ? [{ kind: 'key', key: 'primary', down: true }] : t > 1 && t < 1 + STEP ? [{ kind: 'key', key: 'primary', down: false }] : []))
    expect(state.prayed).toBeCloseTo(1 / PRAY, 1)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
