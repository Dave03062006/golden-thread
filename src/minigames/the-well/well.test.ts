import { describe, expect, it } from 'vitest'
import { SIGNS, WELL_AT, episode5 } from '../../content/levels/03-abraham-father-of-faith/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theWell } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 3)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theWell.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theWell.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theWell.step(state, player(state, t), ctx, () => {})
  return { state, view: theWell.view(state, ctx) }
}

const TARGETS = [...SIGNS.map((s) => s.at), WELL_AT]

/** Sweeps back and forth over the next thing to find. */
const sweeping = (state: State, t: number): GameInput[] => {
  const next = state.revealed.findIndex((r) => r < 1)
  const at = TARGETS[Math.max(0, next)]!
  return [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: at.x + 0.05 * Math.sin(t * 8), y: at.y }]
}

describe('"The well"', () => {
  it('reveals each sign of water in turn where the sweep passes, then the well, clearing the haze', () => {
    const { state, view } = run(false, 12, sweeping)
    expect(state.revealed.every((r) => r === 1)).toBe(true)
    expect(view.live['layer:heat-haze.opacity']).toBe(0)
    expect(view.message?.title).toBe('A well of water')
    expect(view.done).toBe(true)
  })

  it('reveals nothing for a sweep far from the next sign', () => {
    const { state } = run(false, 3, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.9 + 0.05 * Math.sin(t * 8), y: 0.3 }])
    expect(state.revealed[0]).toBe(0)
  })

  it('finds the next sign with each press of Space', () => {
    const { state } = run(false, 1.2, (_, t) => (t < STEP ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.revealed[0]).toBe(1)
    expect(state.revealed[1]).toBe(0)
  })

  it('in gentle mode, lets a sweep anywhere clear the haze, the next sign glowing', () => {
    const { state, view } = run(true, 1, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.9 + 0.05 * Math.sin(t * 8), y: 0.3 }])
    expect(state.revealed[0]).toBeGreaterThan(0)
    expect(view.live['actor:sign-glow.opacity']).toBeGreaterThan(0.4)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
