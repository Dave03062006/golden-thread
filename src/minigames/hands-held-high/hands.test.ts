import { describe, expect, it } from 'vitest'
import { BANNERS, episode6 } from '../../content/levels/09-through-the-sea/episode-6'
import { Director } from '../../scene/director'
import type { Cue } from '../../scene/types'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { DOWN, LIFTS, LIFT_BELOW, handsHeldHigh } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof handsHeldHigh.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  const cues: Cue[] = []
  let state = handsHeldHigh.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = handsHeldHigh.step(state, player(state, t), ctx, (cue) => cues.push(cue))
  return { state, view: handsHeldHigh.view(state, ctx), cues }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }

describe('"Hands held high"', () => {
  it('lets the hands sink, and the battle turn to Amalek, if no one lifts them', () => {
    const { state, view, cues } = run(false, 12)
    expect(state.hands).toBeLessThan(DOWN)
    expect(state.tide).toBe(0)
    expect(view.live['actor:banner-amalek.y']).toBeCloseTo(BANNERS.high)
    expect(cues.length).toBeGreaterThan(0)
  })

  it('takes a lift only once the hands begin to sink', () => {
    const { state } = run(false, 0.5, () => [space])
    expect(state.hands).toBeGreaterThan(LIFT_BELOW)
    expect(state.lifts).toBe(0)
  })

  it('with Space, lifts the hands each time, brings Aaron and Hur, and holds them steady until sunset', () => {
    const { state, view } = run(false, 40, () => [space])
    expect(state.lifts).toBe(LIFTS)
    expect(state.phase).toBe('steady')
    expect(view.live['actor:stone.opacity']).toBe(1)
    expect(view.live['layer:evening-sky.opacity']).toBe(1)
    expect(view.live['actor:banner-israel.y']).toBeCloseTo(BANNERS.high)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, the hands sink slowly and Aaron and Hur come sooner', () => {
    const { state, view } = run(true, 40, () => [space])
    expect(state.lifts).toBeLessThan(LIFTS)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
