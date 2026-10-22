import { describe, expect, it } from 'vitest'
import { BLESSINGS, SUN, episode1, glowOf } from '../../content/levels/06-job/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { jobsBlessings } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof jobsBlessings.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = jobsBlessings.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = jobsBlessings.step(state, player(state, t), ctx, () => {})
    const title = jobsBlessings.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: jobsBlessings.view(state, ctx), titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: BLESSINGS[i]!.x, y: BLESSINGS[i]!.y - 0.03 })
const everyTwoSeconds = (_: State, t: number) => (Math.floor(t / 2) !== Math.floor((t - STEP) / 2) ? [space] : [])

describe('"Job’s blessings"', () => {
  it('lights each blessing in turn with its word of thanks, then the sun rises', () => {
    const { view, titles } = run(false, 20, everyTwoSeconds)
    expect(titles).toEqual([...BLESSINGS.map((b) => b.title), 'Every good gift'])
    for (const b of BLESSINGS) expect(view.live[`actor:${glowOf(b.id)}.opacity`]).toBe(0)
    expect(view.live['actor:sun.y']).toBeCloseTo(SUN.high)
    expect(view.live['layer:forest-sky.opacity']).toBe(1)
    expect(view.done).toBe(true)
  })

  it('lights a tapped blessing in any order, its flash of light fading with its thanks', () => {
    const { state, view, titles } = run(false, 3, (_, t) => (t < STEP ? [tap(3)] : []))
    expect(state.litAt.filter((t) => t >= 0)).toHaveLength(1)
    expect(titles).toEqual(['Three thousand camels'])
    expect(view.live[`actor:${glowOf('camels')}.opacity`]).toBe(0)
    expect(state.litAt[3]).toBeGreaterThan(0)
    expect(view.live[`actor:${glowOf('sons')}.opacity`]).toBe(0)
    expect(view.done).toBe(false)
  })

  it('in gentle mode, makes the next blessing glow and light itself', () => {
    const ctx = context(true)
    expect(jobsBlessings.view(jobsBlessings.start(ctx), ctx).live['actor:next-glow.opacity']).toBeGreaterThan(0.4)
    const { view } = run(true, 30)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
