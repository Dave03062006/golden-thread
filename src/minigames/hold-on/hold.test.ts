import { describe, expect, it } from 'vitest'
import { SUN, episode6 } from '../../content/levels/04-isaac-and-jacob/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { holdOn } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof holdOn.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = holdOn.start(ctx)
  const cues: { to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = holdOn.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: holdOn.view(state, ctx), cues }
}

const down: GameInput = { kind: 'key', key: 'primary', down: true }
const up: GameInput = { kind: 'key', key: 'primary', down: false }

/** Holds on, and presses again (up and down) as each ring nearly closes. */
const wrestler = (state: State, t: number): GameInput[] => {
  if (t < STEP) return [down]
  if (state.pull >= 0 && state.closed > 0.85) return [up, down]
  return []
}

describe('"Hold on"', () => {
  it('brings the sun up to the hills while held, keeping the grip at every pull, until the day breaks', () => {
    const { view, cues } = run(false, 30, wrestler)
    expect(cues.map((c) => c.to.pose)).toEqual(['pull', 'hold', 'pull', 'hold', 'pull', 'hold', 'pull', 'hold'])
    expect(view.live['actor:sun.y']).toBeCloseTo(SUN.to)
    expect(view.message?.title).toBe('The day is breaking')
    expect(view.done).toBe(true)
  })

  it('stands still in the dark while nothing is held', () => {
    const { state, view } = run(false, 5)
    expect(state.held).toBe(0)
    expect(view.live['actor:sun.y']).toBe(SUN.from)
  })

  it('lets the grip slip when the ring closes first, and then catches hold again', () => {
    const { state, cues, view } = run(false, 9, (_, t) => (t < STEP ? [down] : []))
    expect(cues.map((c) => c.to.pose).slice(0, 3)).toEqual(['pull', 'slip', 'hold'])
    expect(state.held).toBeGreaterThan(3)
    expect(view.done).toBe(false)
  })

  it('in gentle mode, never slips while held', () => {
    const { cues, view } = run(true, 30, (_, t) => (t < STEP ? [down] : []))
    expect(cues.some((c) => c.to.pose === 'slip')).toBe(false)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue(down) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
