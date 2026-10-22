import { describe, expect, it } from 'vitest'
import { APPROACH, LIGHT, episode4 } from '../../content/levels/07-moses-is-called/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { turnAsideAndSee } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof turnAsideAndSee.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = turnAsideAndSee.start(ctx)
  const cues: { target: string; pose?: string }[] = []
  for (let t = 0; t < seconds; t += STEP) state = turnAsideAndSee.step(state, player(state, t), ctx, (c) => cues.push({ target: c.target, pose: c.to.pose }))
  return { state, view: turnAsideAndSee.view(state, ctx), cues }
}

const tap: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.5 }
const everySecond = (_: State, t: number) => (Math.floor(t) !== Math.floor(t - STEP) ? [tap] : [])

describe('"Turn aside and see"', () => {
  it('brings Moses closer a step at a time, the light growing, until the voice comes', () => {
    const { view, cues } = run(false, APPROACH.steps + 4, everySecond)
    expect(view.live['actor:moses.x']).toBeCloseTo(APPROACH.to)
    expect(view.live['actor:bush-light.size']).toBeCloseTo(LIGHT.near.size)
    expect(cues.filter((c) => c.target === 'actor:bush')).toEqual([{ target: 'actor:bush', pose: 'near' }])
    expect(view.done).toBe(true)
  })

  it('takes one step at a time: a tap mid-step does nothing', () => {
    const { state } = run(false, 0.5, () => [tap])
    expect(state.steps).toBe(1)
  })

  it('stays put without a tap, and in gentle mode walks on by itself', () => {
    expect(run(false, 5).state.steps).toBe(0)
    expect(run(true, 20).view.done).toBe(true)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
