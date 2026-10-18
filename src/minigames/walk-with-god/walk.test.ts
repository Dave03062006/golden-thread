import { describe, expect, it } from 'vitest'
import { CROWDS, WALK, episode1 } from '../../content/levels/02-noah-and-the-nations/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { crowdAt, walkWithGod } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const hold: GameInput = { kind: 'key', key: 'primary', down: true }
const release: GameInput = { kind: 'key', key: 'primary', down: false }

/** Plays the rules, calling `player` every step with the state and the seconds so far. */
function run(gentle: boolean, seconds: number, player: (state: ReturnType<typeof walkWithGod.start>, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = walkWithGod.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = walkWithGod.step(state, player(state, t), ctx, () => {})
  return { state, view: walkWithGod.view(state, ctx) }
}

const holding = (_: unknown, t: number) => (t === 0 ? [hold] : [])

describe('"Walk with God"', () => {
  it('walks Noah home while Space is held, jostled once by each crowd he walks into', () => {
    const { state, view } = run(false, 30, holding)
    expect(state.x).toBe(WALK.home)
    expect(state.parted.sort()).toEqual(CROWDS.map((c) => c.id).sort())
    expect(view.done).toBe(true)
  })

  it('stands still when nothing is pressed, and the crowds go by', () => {
    const { state } = run(false, 20)
    expect(state.x).toBe(WALK.start)
    expect(crowdAt(0, state.time)).toBeLessThan(WALK.start)
  })

  it('lets the crowd pass untouched when the player waits for it', () => {
    // Walk until the first crowd is close, wait for it to pass, then walk on.
    const { state } = run(false, 40, (s, t) => {
      const near = Math.abs(crowdAt(0, t) - s.x) < 0.08 && crowdAt(0, t) > s.x - 0.05
      return [near ? release : hold]
    })
    expect(state.parted).not.toContain('crowd-1')
  })

  it('walks a few steps for each single press', () => {
    const { state } = run(false, 2, (_, t) => (t === 0 ? [hold, release] : []))
    expect(state.x).toBeGreaterThan(WALK.start + 0.02)
    expect(state.x).toBeLessThan(WALK.start + 0.08)
  })

  it('in gentle mode, waits for each crowd by itself', () => {
    const { state } = run(true, 60, holding)
    expect(state.x).toBe(WALK.home)
    expect(state.parted).toEqual([])
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(hold) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
