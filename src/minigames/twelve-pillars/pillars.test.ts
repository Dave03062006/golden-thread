import { describe, expect, it } from 'vitest'
import { PILLARS, TRIBES, episode3 } from '../../content/levels/10-sinai/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { RISE, twelvePillars } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof twelvePillars.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = twelvePillars.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = twelvePillars.step(state, player(state, t), ctx, () => {})
  return { state, view: twelvePillars.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (x: number, y: number): GameInput => ({ kind: 'pointer', phase: 'down', x, y })

describe('"Twelve pillars"', () => {
  it('has a pillar for each of the twelve tribes', () => {
    expect(TRIBES).toHaveLength(12)
    expect(PILLARS.map((p) => p.tribe)).toEqual(TRIBES)
  })

  it('sets the next pillar where it glows, and not elsewhere', () => {
    expect(run(false, 1, () => [tap(0.9, 0.2)]).state.set).toBe(0)
    const { state, view } = run(false, 2, (s) => [tap(PILLARS[s.set]!.x, PILLARS[s.set]!.y)])
    expect(state.set).toBeGreaterThan(1)
    expect(view.message?.text).toContain('tribe of')
  })

  it('with Space, sets all twelve, each rising in turn', () => {
    const { state, view } = run(false, RISE * 12 + 6, () => [space])
    expect(state.set).toBe(PILLARS.length)
    for (const p of PILLARS) expect(view.live[`actor:${p.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, a tap anywhere sets the next', () => {
    expect(run(true, RISE + 0.1, (s) => (s.time < STEP ? [tap(0.9, 0.2)] : [])).state.set).toBe(1)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
