import { describe, expect, it } from 'vitest'
import { DANCERS, LAMPS, episode9 } from '../../content/levels/03-abraham-father-of-faith/episode-9'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { GOAL, theFeast } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode9, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theFeast.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theFeast.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theFeast.step(state, player(state, t), ctx, () => {})
  return { state, view: theFeast.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
/** Presses Space on every beat. */
const onTheBeat = (beat: number) => (_: State, t: number) => (Math.floor((t + STEP) / beat) > Math.floor(t / beat) ? [space] : [])

describe('"The feast"', () => {
  it('keeps the beat with each press on it, bringing dancers and lamps, until the whole camp dances', () => {
    const { state, view } = run(false, 14, onTheBeat(0.75))
    expect(state.kept).toBe(GOAL)
    for (const id of [...DANCERS, ...LAMPS]) expect(view.live[`actor:${id}.opacity`]).toBe(1)
    expect(view.message?.title).toBe('The whole camp is dancing')
    expect(view.done).toBe(true)
  })

  it('counts nothing for presses between the beats, and one beat only once', () => {
    const off = run(false, 5, (_, t) => (Math.floor((t + STEP + 0.37) / 0.75) > Math.floor((t + 0.37) / 0.75) ? [space] : []))
    expect(off.state.kept).toBe(0)
    const twice = run(false, 0.8, (_, t) => (Math.abs(t - 0.72) < STEP / 2 || Math.abs(t - 0.78) < STEP / 2 ? [space] : []))
    expect(twice.state.kept).toBe(1)
  })

  it('ends the song anyway when the beats run out, kept or not', () => {
    const { view } = run(false, 30)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, has a slower beat and counts any press near it', () => {
    const { state } = run(true, 5, onTheBeat(1))
    expect(state.kept).toBeGreaterThan(3)
  })

  it('plays through Episode 9, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode9, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode9.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
