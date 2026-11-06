import { describe, expect, it } from 'vitest'
import { GLORY, NAMES, episode6 } from '../../content/levels/10-sinai/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLordPassedBy } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLordPassedBy.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLordPassedBy.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theLordPassedBy.step(state, player(state, t), ctx, () => {})
  return { state, view: theLordPassedBy.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const point = (x: number, y: number): GameInput => ({ kind: 'pointer', phase: 'move', x, y })

describe('"The LORD passed by"', () => {
  it('shows each word of God’s name the light passes over, and no other', () => {
    const first = NAMES[0]!
    const { state, view } = run(false, 3, () => [point(first.x, first.y)])
    expect(state.count).toBe(1)
    expect(view.live[`actor:${first.id}.opacity`]).toBeGreaterThan(0.6)
    expect(view.live[`actor:${NAMES.at(-1)!.id}.opacity`]).toBe(0)
  })

  it('with Space, takes the light to every word, then it passes on', () => {
    const { state, view } = run(false, 30, () => [space])
    expect(state.count).toBe(NAMES.length)
    expect(view.live['actor:glory.x']).toBe(GLORY.right)
    expect(view.live['actor:glory.y']).toBe(GLORY.y)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, the light moves by itself', () => {
    const { state, view } = run(true, 60)
    expect(state.count).toBe(NAMES.length)
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
