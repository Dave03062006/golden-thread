import { describe, expect, it } from 'vitest'
import { DANCERS, PHRASES, episode3 } from '../../content/levels/09-through-the-sea/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { BEAT, HELPED_AFTER, TOLERANCE, matches, miriamsSong } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof miriamsSong.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = miriamsSong.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = miriamsSong.step(state, player(state, t), ctx, () => {})
  return { state, view: miriamsSong.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
/** Answers each phrase in time: the first beat a moment after Miriam stops, the rest on the beat after it. */
const inTime = (state: State): GameInput[] => {
  if (state.mode !== 'answer') return []
  const beats = PHRASES[state.phrase]!.beats
  const n = state.taps.length
  if (n === 0) return state.time - state.since > 0.3 ? [space] : []
  return n < beats.length && state.time + STEP - state.taps[0]! >= beats[n]! * BEAT - STEP / 2 ? [space] : []
}

describe('"Miriam’s song"', () => {
  it('takes an answer in time, and not one out of time', () => {
    expect(matches(0, [1, 1 + BEAT, 1 + 2 * BEAT], false)).toBe(true)
    expect(matches(0, [1, 1 + BEAT + TOLERANCE * 2, 1 + 2 * BEAT], false)).toBe(false)
    expect(matches(0, [1, 1 + BEAT], false)).toBe(false)
    expect(matches(0, [1, 1.1, 1.2], true)).toBe(true)
  })

  it('brings a group of dancers with each phrase answered in time, to the end of the song', () => {
    const { state, view } = run(false, 40, inTime)
    expect(state.phrase).toBe(PHRASES.length)
    for (const id of DANCERS) expect(view.live[`actor:${id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('plays a missed phrase again, and after two misses the women sing it with the player', () => {
    // Space held down every step is never in time.
    const { state } = run(false, 12, () => [space])
    expect(state.phrase).toBeGreaterThan(0)
    expect(HELPED_AFTER).toBe(2)
    const missed = run(false, 7, () => [space]).state
    expect(missed.phrase).toBe(0)
    expect(missed.tries).toBeGreaterThan(0)
  })

  it('in gentle mode, takes any answer with the right number of beats', () => {
    const quick = (state: State): GameInput[] => (state.mode === 'answer' && state.taps.length < PHRASES[state.phrase]!.beats.length && state.time - state.since > 0.2 + state.taps.length * 0.1 ? [space] : [])
    const { state, view } = run(true, 40, quick)
    expect(state.phrase).toBe(PHRASES.length)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
