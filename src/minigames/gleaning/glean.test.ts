import { describe, expect, it } from 'vitest'
import { HEAP, STALKS, episode3 } from '../../content/levels/16-ruth/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { gleaning } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof gleaning.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = gleaning.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = gleaning.step(state, player(state, t), ctx, () => {})
  return { state, view: gleaning.view(state, ctx) }
}

describe('"Gleaning"', () => {
  it('gathers every stalk into Ruth’s heap', () => {
    const { view } = run(false, 8, (_s, t) => (Math.round(t / STEP) % 60 === 0 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    for (const s of STALKS) expect(view.live[`actor:${s.id}.opacity`]).toBe(0)
    expect(view.live[`actor:${HEAP}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('gathers the stalk that is tapped', () => {
    const s = STALKS[3]!
    const { state } = run(false, 0.1, (_s, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: s.x, y: s.y - 0.02 }] : []))
    expect(state.gatheredAt[3]).toBeGreaterThanOrEqual(0)
    expect(state.gatheredAt.filter((at) => at >= 0)).toHaveLength(1)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
