import { describe, expect, it } from 'vitest'
import { PILLAR, TENTS, episode1 } from '../../content/levels/09-through-the-sea/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLightInTheCamp } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLightInTheCamp.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLightInTheCamp.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theLightInTheCamp.step(state, player(state, t), ctx, () => {})
  return { state, view: theLightInTheCamp.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const point = (x: number, y: number): GameInput => ({ kind: 'pointer', phase: 'move', x, y })

describe('"The light in the camp"', () => {
  it('moves the pillar behind the camp, and the chariots vanish into its darkness', () => {
    const { state, view } = run(false, 4, (s) => (s.phase === 'pillar' ? [point(0, 0.6)] : []))
    expect(state.phase).toBe('light')
    expect(view.live['actor:pillar.x']).toBe(PILLAR.behind)
    expect(view.live['actor:chariots.opacity']).toBe(0)
  })

  it('lights each tent the light is brought to, and nothing else', () => {
    // The pillar first, then the light to the first two tents only.
    const { state, view } = run(false, 12, (s) => (s.phase === 'pillar' ? [point(0, 0.6)] : s.count < 2 ? [point(TENTS[s.count]!.x, TENTS[s.count]!.y)] : []))
    expect(state.count).toBe(2)
    expect(view.live[`actor:${TENTS[0]!.light}.opacity`]).toBeGreaterThan(0.6)
    expect(view.live[`actor:${TENTS[2]!.light}.opacity`]).toBe(0)
    expect(view.done).toBe(false)
  })

  it('with Space, moves the pillar and lights every tent in turn', () => {
    const { state, view } = run(false, 30, () => [space])
    expect(state.count).toBe(TENTS.length)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, the light drifts to every tent by itself', () => {
    const { state, view } = run(true, 60)
    expect(state.count).toBe(TENTS.length)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
