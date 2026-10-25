import { describe, expect, it } from 'vitest'
import { THIRSTY, episode5 } from '../../content/levels/09-through-the-sea/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { ROLL, streamsInTheDesert } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof streamsInTheDesert.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = streamsInTheDesert.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = streamsInTheDesert.step(state, player(state, t), ctx, () => {})
  return { state, view: streamsInTheDesert.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const key = (k: 'left' | 'right'): GameInput => ({ kind: 'key', key: k, down: true })
const tap = (x: number, y: number): GameInput => ({ kind: 'pointer', phase: 'down', x, y })

describe('"Streams in the desert"', () => {
  it('sends the water to whoever’s stone is rolled aside, in any order', () => {
    const last = THIRSTY.at(-1)!
    const { state, view } = run(false, 3, (s) => (s.time < STEP ? [tap(last.stoneX, last.y)] : []))
    expect(state.count).toBe(1)
    expect(view.live[`actor:${last.stream}.opacity`]).toBe(1)
    expect(view.live[`actor:${last.stone}.x`]).toBeCloseTo(last.stoneX + ROLL.x)
    expect(view.live[`actor:${THIRSTY[0]!.stream}.opacity`]).toBe(0)
  })

  it('chooses a stone with the arrow keys, and opens it with Space', () => {
    const { state } = run(false, 1, (s) => (s.time < STEP ? [key('right'), key('right'), space] : []))
    expect(state.openedAt[2]).toBeGreaterThan(0)
    expect(state.count).toBe(1)
  })

  it('with Space, brings water to all the thirsty', () => {
    const { state, view } = run(false, 10, () => [space])
    expect(state.count).toBe(THIRSTY.length)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, the water finds its way by itself', () => {
    const { state, view } = run(true, 20)
    expect(state.count).toBe(THIRSTY.length)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
