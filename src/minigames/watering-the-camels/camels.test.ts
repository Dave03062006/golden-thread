import { describe, expect, it } from 'vitest'
import { CAMELS, REBEKAH, episode1 } from '../../content/levels/04-isaac-and-jacob/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { wateringTheCamels } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof wateringTheCamels.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = wateringTheCamels.start(ctx)
  const cues: { target: string; to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = wateringTheCamels.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: wateringTheCamels.view(state, ctx), cues }
}

const hold: GameInput = { kind: 'key', key: 'primary', down: true }
const release: GameInput = { kind: 'key', key: 'primary', down: false }

/** Holds Space at the well, and presses it again at the trough. */
const steady = (state: State, t: number): GameInput[] => {
  if (state.rebekah.state === 'well') return state.holding ? [] : [hold]
  if (state.rebekah.state === 'trough') return [release, hold]
  return t < STEP ? [] : [release]
}

describe('"Watering the camels"', () => {
  it('waters all ten camels, jar by jar, and each kneels in its place', () => {
    const { state, view, cues } = run(false, 60, steady)
    expect(state.camels.every((c) => c.state === 'resting')).toBe(true)
    CAMELS.forEach((c) => expect(view.live[`actor:${c.id}.x`]).toBeCloseTo(c.home.x))
    expect(cues.filter((c) => c.to.pose === 'kneel')).toHaveLength(CAMELS.length)
    expect(view.message?.title).toBe('All ten camels watered')
    expect(view.done).toBe(true)
  })

  it('draws the jar only while held, and a camel waits at the empty trough', () => {
    const { state } = run(false, 6, (_, t) => (t < STEP ? [hold] : t > 0.5 && t < 0.5 + STEP ? [release] : []))
    expect(state.rebekah.state).toBe('well')
    expect(state.jar).toBeGreaterThan(0.4)
    expect(state.jar).toBeLessThan(0.6)
    expect(state.camels[0]!.state).toBe('drinking')
    expect(state.camels.some((c) => c.state === 'resting')).toBe(false)
  })

  it('carries a full jar to the trough by herself, and pours it when asked', () => {
    const { state, view } = run(false, 3, (_, t) => (t < STEP ? [hold] : []))
    expect(state.rebekah.state).toBe('trough')
    expect(view.live['actor:rebekah.x']).toBeCloseTo(REBEKAH.atTrough)
    const poured = run(false, 4.5, (_, t) => (t < STEP ? [hold] : t > 3 && t < 3 + STEP ? [release, hold] : []))
    expect(poured.state.water + (CAMELS.length * 0.25 - poured.state.camels.reduce((a, c) => a + c.thirst, 0))).toBeCloseTo(0.5)
  })

  it('in gentle mode, makes the whole trip from one tap', () => {
    const { state } = run(true, 60, (s) => (s.rebekah.state === 'well' && !s.auto ? [hold, release] : []))
    expect(state.camels.every((c) => c.state === 'resting')).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(hold) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
