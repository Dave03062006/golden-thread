import { describe, expect, it } from 'vitest'
import { MARCHERS, episode5 } from '../../content/levels/08-the-plagues-and-the-passover/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { BEAT, WINDOW, nearestBeat, theMarchOut } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theMarchOut.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theMarchOut.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theMarchOut.step(state, player(state, t), ctx, () => {})
  return { state, view: theMarchOut.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
/** Taps exactly on the beat (time is counted after each step, so a tap lands one step later). */
const onBeat = (state: State): GameInput[] => (nearestBeat(state.time + STEP).off < STEP / 2 ? [space] : [])

describe('"The march out of Egypt"', () => {
  it('brings one more group into the march with each step in time', () => {
    const { state, view } = run(false, BEAT * (MARCHERS.length + 2) + 5, onBeat)
    expect(state.joined).toBe(MARCHERS.length)
    for (const m of MARCHERS) expect(view.live[`actor:${m.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('lets nobody join on a step out of time, and counts each beat only once', () => {
    const offBeat = (state: State): GameInput[] => (Math.abs(nearestBeat(state.time + STEP).off - BEAT / 2) < STEP / 2 ? [space] : [])
    expect(run(false, 6, offBeat).state.joined).toBe(0)
    expect(WINDOW).toBeLessThan(BEAT / 2)
    expect(run(false, BEAT * 1.1, () => [space]).state.joined).toBe(1)
  })

  it('in gentle mode, counts any tap as a step in time', () => {
    const offBeat = (state: State): GameInput[] => (Math.abs(nearestBeat(state.time + STEP).off - BEAT / 2) < STEP / 2 ? [space] : [])
    expect(run(true, BEAT * (MARCHERS.length + 2), offBeat).state.joined).toBe(MARCHERS.length)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
