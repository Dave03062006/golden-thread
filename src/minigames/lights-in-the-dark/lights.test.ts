import { describe, expect, it } from 'vitest'
import { LAMP_START, MERCY_SIGNS, episode4 } from '../../content/levels/01-creation-and-fall/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { GAMES } from '../registry'
import { lightsInTheDark } from '.'

/** A scene at rest, where the signs and the light are, for the rules to look at. */
function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 4)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

/** Plays the rules alone: `inputs` at the given seconds, for `seconds` in all. */
function run(gentle: boolean, seconds: number, inputs: Record<number, GameInput[]> = {}) {
  const ctx = context(gentle)
  let state = lightsInTheDark.start(ctx)
  const at = Object.entries(inputs).map(([t, i]) => [Number(t), i] as const)
  for (let t = 0; t < seconds; t += STEP) {
    const now = at.filter(([s]) => s >= t && s < t + STEP).flatMap(([, i]) => i)
    state = lightsInTheDark.step(state, now, ctx, () => {})
  }
  return { state, view: lightsInTheDark.view(state, ctx) }
}

const space: GameInput[] = [{ kind: 'key', key: 'primary', down: true }]

describe('"Lights in the dark"', () => {
  it('starts with the light by the man and the woman, and nothing found', () => {
    const { view } = run(false, 0.1)
    expect(view.live['actor:lamp.x']).toBeCloseTo(LAMP_START.x)
    expect(view.message).toBeNull()
    expect(view.done).toBe(false)
  })

  it('carries the light to the next sign with Space, and recalls its verse', () => {
    const { state, view } = run(false, 3, { 0.1: space })
    expect(state.found['sign-promise']).toBeGreaterThanOrEqual(0)
    expect(view.message?.title).toBe('The promise')
    expect(view.message?.reference).toBe('Genesis 3:15')
    expect(view.live['layer:east-path.opacity']).toBeCloseTo(0.5)
  })

  it('moves the light with the arrow keys', () => {
    const { view } = run(false, 1, { 0.1: [{ kind: 'key', key: 'right', down: true }] })
    expect(view.live['actor:lamp.x']).toBeGreaterThan(LAMP_START.x + 0.2)
  })

  it('follows a finger', () => {
    const { view } = run(false, 2, { 0.1: [{ kind: 'pointer', phase: 'down', x: 0.3, y: 0.7 }] })
    expect(view.live['actor:lamp.x']).toBeLessThan(LAMP_START.x - 0.1)
  })

  it('finishes a little after the last sign is found, with the path at its brightest', () => {
    const presses = Object.fromEntries([0.1, 4, 8].map((t) => [t, space]))
    const { view } = run(false, 20, presses)
    expect(view.live['layer:east-path.opacity']).toBeCloseTo(1)
    expect(view.done).toBe(true)
  })

  it('gives a larger light and an easier reach in gentle mode', () => {
    expect(run(true, 0.1).view.live['actor:lamp.size']).toBeGreaterThan(run(false, 0.1).view.live['actor:lamp.size']!)
    // Stopping just short of a sign finds it in gentle mode only.
    const sign = MERCY_SIGNS[1]
    const near = (gentle: boolean) => {
      const ctx = context(gentle)
      const state = { ...lightsInTheDark.start(ctx), x: sign.x - 0.05, y: sign.y }
      return lightsInTheDark.step(state, [], ctx, () => {}).found[sign.id]! >= 0
    }
    expect(near(true)).toBe(true)
    expect(near(false)).toBe(false)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      let pressedAt = -10
      const comparisons = playThrough(episode4, {
        gentle,
        player(runner, seconds) {
          // Space toward each sign in turn, once its verse has been read.
          if (seconds - pressedAt > 4.5) {
            runner.queue(space[0]!)
            pressedAt = seconds
          }
        },
      })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })

  it('is registered under the name the story uses', () => {
    expect(GAMES['lights-in-the-dark']).toBe(lightsInTheDark)
  })
})
