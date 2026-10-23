import { describe, expect, it } from 'vitest'
import { STEPS, episode4 } from '../../content/levels/08-the-plagues-and-the-passover/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { thePassoverNight } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof thePassoverNight.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = thePassoverNight.start(ctx)
  const words: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = thePassoverNight.step(state, player(state, t), ctx, () => {})
    const text = thePassoverNight.view(state, ctx).message?.text
    if (text && words.at(-1) !== text) words.push(text)
  }
  return { state, view: thePassoverNight.view(state, ctx), words }
}

const tapNext = (state: State, t: number): GameInput[] => {
  const next = STEPS[Math.min(state.done, STEPS.length - 1)]!
  return Math.floor(t * 0.8) !== Math.floor((t - STEP) * 0.8) ? [{ kind: 'pointer', phase: 'down', x: next.x, y: next.y }] : []
}

describe('"The Passover night"', () => {
  it('marks the door, sets the table and gets the family ready, in order, then lights the lamp', () => {
    const { view, words } = run(false, STEPS.length * 1.3 + 8, tapNext)
    expect(words).toEqual([...STEPS.map((s) => s.word), 'The house is marked, the meal is ready, and the family is ready to go.'])
    expect(view.live['layer:house-inside.opacity']).toBe(1)
    expect(view.live['actor:mark-top.opacity']).toBe(1)
    expect(view.live['actor:staff-1.opacity']).toBe(1)
    expect(view.live['actor:lamp-glow.opacity']).toBeCloseTo(0.85)
    expect(view.done).toBe(true)
  })

  it('does a step only when its own thing is tapped', () => {
    const { state } = run(false, 1, (_, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: STEPS[3].x, y: STEPS[3].y }] : []))
    expect(state.done).toBe(0)
  })

  it('in gentle mode, makes the next thing to do glow', () => {
    const ctx = context(true)
    const view = thePassoverNight.view(thePassoverNight.start(ctx), ctx)
    expect(view.live['actor:next-glow.opacity']).toBeGreaterThan(0.4)
    expect(view.live['actor:next-glow.x']).toBe(STEPS[0].x)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
