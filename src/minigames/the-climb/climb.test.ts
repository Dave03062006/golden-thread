import { describe, expect, it } from 'vitest'
import { CLIMB, episode10 } from '../../content/levels/03-abraham-father-of-faith/episode-10'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theClimb } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode10, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theClimb.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theClimb.start(ctx)
  const cues: unknown[] = []
  for (let t = 0; t < seconds; t += STEP) state = theClimb.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: theClimb.view(state, ctx), cues }
}

const hold: GameInput = { kind: 'key', key: 'primary', down: true }
const release: GameInput = { kind: 'key', key: 'primary', down: false }

describe('"The climb"', () => {
  it('walks father and son up the path together while Space is held, to where they rest', () => {
    const { state, view } = run(false, 16, (_, t) => (t < STEP ? [hold] : []))
    expect(state.along).toBe(1)
    expect(view.live['actor:abraham.x']).toBeCloseTo(CLIMB.at(-1)!.x)
    // Isaac walks a little behind, the wood on his back.
    expect(view.live['actor:isaac.x']).toBeLessThan(view.live['actor:abraham.x']!)
    expect(view.live['actor:wood.y']).toBeLessThan(view.live['actor:isaac.y']!)
    expect(view.done).toBe(true)
  })

  it('stands still when nothing is held, and walks a few steps for each press', () => {
    expect(run(false, 3).state.along).toBe(0)
    const { state } = run(false, 3, (_, t) => (t < STEP ? [hold, release] : []))
    expect(state.along).toBeGreaterThan(0.03)
    expect(state.along).toBeLessThan(0.1)
  })

  it('starts and stops their walking as the climb starts and stops', () => {
    const { cues } = run(false, 3, (_, t) => (t < STEP ? [hold, release] : []))
    expect(cues).toHaveLength(4)
  })

  it('in gentle mode, goes on by itself once started', () => {
    const { view } = run(true, 16, (_, t) => (t < STEP ? [hold, release] : []))
    expect(view.done).toBe(true)
  })

  it('plays through Episode 10, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode10, { gentle, player: (runner) => runner.queue(hold) })
      expect(comparisons).toHaveLength(episode10.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
