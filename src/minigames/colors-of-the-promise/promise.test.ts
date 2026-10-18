import { describe, expect, it } from 'vitest'
import { PROMISE, episode5, onBand } from '../../content/levels/02-noah-and-the-nations/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { colorsOfThePromise } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof colorsOfThePromise.start>

/** Plays the rules, calling `player` every step with the state and the seconds so far. */
function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = colorsOfThePromise.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = colorsOfThePromise.step(state, player(state, t), ctx, () => {})
  return { state, view: colorsOfThePromise.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }

/** Sweeps the pointer along the band being drawn, left to right, over a second and a half, then lifts it. */
const sweeping = (state: State, t: number): GameInput[] => {
  const phase = (t % 2) / 1.5
  if (phase > 1) return [{ kind: 'pointer', phase: 'up', x: 0, y: 0 }]
  const at = onBand(Math.min(state.band, 6), phase)
  return [{ kind: 'pointer', phase: t % 2 < STEP ? 'down' : 'move', ...at }]
}

describe('"Colors of the promise"', () => {
  it('draws a band each time the pointer sweeps along it, red first, until all seven shine', () => {
    const { state, view } = run(false, 20, sweeping)
    expect(state.band).toBe(7)
    for (let i = 1; i <= 7; i++) expect(view.live[`layer:rainbow-${i}.opacity`]).toBe(1)
    expect(view.message?.text).toBe(PROMISE.join(' '))
    expect(view.done).toBe(true)
  })

  it('lights a few more words of the promise with each band', () => {
    const { state, view } = run(false, 2, sweeping)
    expect(state.band).toBe(1)
    expect(view.message?.text).toBe(PROMISE[0])
    expect(view.live['layer:rainbow-2.opacity']).toBe(0)
  })

  it('draws nothing for a sweep far from the band', () => {
    const { state } = run(false, 3, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.2 + t * 0.2, y: 0.65 }])
    expect(state.band).toBe(0)
    expect(state.lo).toBe(-1)
  })

  it('draws the next band with each press of Space', () => {
    const one = run(false, 2, (_, t) => (t < STEP ? [space] : []))
    expect(one.state.band).toBe(1)
    const all = run(false, 15, (_, t) => (Math.floor((t + STEP) / 1.2) > Math.floor(t / 1.2) ? [space] : []))
    expect(all.state.band).toBe(7)
    expect(all.view.done).toBe(true)
  })

  it('in gentle mode, draws the band as the pointer moves anywhere across the sky', () => {
    const { state } = run(true, 3, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.5 + 0.4 * Math.sin(t * 3), y: 0.3 }])
    expect(state.band).toBeGreaterThan(0)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
