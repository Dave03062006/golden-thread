import { describe, expect, it } from 'vitest'
import { DANCER, STEPS, episode7 } from '../../content/levels/18-david-the-shepherd-king/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { dancingBeforeTheLord } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof dancingBeforeTheLord.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = dancingBeforeTheLord.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = dancingBeforeTheLord.step(state, player(state, t), ctx, () => {})
  return { state, view: dancingBeforeTheLord.view(state, ctx) }
}

describe('"Dancing before the LORD"', () => {
  it('dances every step on the beat, and lands at the gate', () => {
    const { state, view } = run(false, 20, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(STEPS)
    expect(view.live[`actor:${DANCER.id}.y`]).toBe(DANCER.y)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
