import { describe, expect, it } from 'vitest'
import { ANGELS, LADDER, episode4, stepY } from '../../content/levels/04-isaac-and-jacob/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLadder } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLadder.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLadder.start(ctx)
  const cues: { to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = theLadder.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: theLadder.view(state, ctx), cues }
}

const tap: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.4 }
const space: GameInput = { kind: 'key', key: 'primary', down: true }
const everyHalfSecond = (_: State, t: number) => (Math.floor(t * 2) !== Math.floor((t - STEP) * 2) ? [tap] : [])

describe('"The ladder"', () => {
  it('lights the steps one by one from the ground up, to the light at the top', () => {
    const { view, cues } = run(false, 8, everyHalfSecond)
    expect(cues.map((c) => c.to.pose)).toEqual(Array.from({ length: LADDER.steps }, (_, k) => `lit-${k + 1}`))
    expect(view.message?.title).toBe('The gate of heaven')
    expect(view.done).toBe(true)
  })

  it('brings the angels onto the ladder as it grows, only on the steps that are lit', () => {
    const { view } = run(false, 2.1, (_, t) => (t < STEP || (Math.abs(t - 0.5) < STEP / 2) || Math.abs(t - 1) < STEP / 2 ? [space] : []))
    expect(view.live['actor:angel-1.opacity']).toBeGreaterThan(0)
    expect(view.live['actor:angel-3.opacity']).toBe(0)
    for (const a of ANGELS) {
      expect(view.live[`actor:${a.id}.y`]).toBeLessThanOrEqual(stepY(0) + 1e-9)
      expect(view.live[`actor:${a.id}.y`]).toBeGreaterThanOrEqual(stepY(2) - 1e-9)
    }
  })

  it('waits for the first tap, and in gentle mode lights the rest by itself', () => {
    expect(run(true, 5).state.lit).toBe(0)
    expect(run(true, 12, (_, t) => (t < STEP ? [tap] : [])).view.done).toBe(true)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
