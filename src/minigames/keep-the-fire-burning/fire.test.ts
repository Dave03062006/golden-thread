import { describe, expect, it } from 'vitest'
import { FLAME, RING, episode4 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { DAY, FEEDS, READY, keepTheFireBurning } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof keepTheFireBurning.start>
const press: GameInput = { kind: 'key', key: 'primary', down: true }

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = keepTheFireBurning.start(ctx)
  let lowest = 1
  for (let t = 0; t < seconds; t += STEP) {
    state = keepTheFireBurning.step(state, player(state, t), ctx, () => {})
    lowest = Math.min(lowest, state.fire)
  }
  return { state, lowest, view: keepTheFireBurning.view(state, ctx) }
}

describe('"Keep the fire burning"', () => {
  it('never lets the fire go out, however long it waits for wood', () => {
    const { lowest, view } = run(false, DAY)
    expect(lowest).toBeGreaterThan(0)
    expect(view.live[`actor:${FLAME.id}.size`]).toBeGreaterThanOrEqual(FLAME.min)
    expect(view.live[`actor:${RING}.opacity`]).toBeGreaterThan(0)
    expect(view.done).toBe(false)
  })

  it('makes the priest wait for wood laid on too early', () => {
    const { state, view } = run(false, 0.5, (_, t) => (t < STEP ? [press] : []))
    expect(state.feeds).toBe(0)
    expect(view.message?.title).toBe('Not yet')
  })

  it('keeps the fire through the day and the night with wood laid on when the ring shows, then a new morning', () => {
    const { state, view } = run(false, DAY + 6, (s) => (s.fire <= READY.normal ? [press] : []))
    expect(state.feeds).toBeGreaterThanOrEqual(FEEDS)
    expect(view.message?.title).toBe('A new morning')
    expect(view.live[`actor:${FLAME.id}.size`]).toBe(FLAME.max)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, takes wood much sooner', () => {
    expect(run(true, 1.8, (_, t) => (t > 1.7 && t < 1.7 + STEP ? [press] : [])).state.feeds).toBe(1)
    expect(run(false, 1.8, (_, t) => (t > 1.7 && t < 1.7 + STEP ? [press] : [])).state.feeds).toBe(0)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue(press) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
