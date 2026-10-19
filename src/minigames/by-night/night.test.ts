import { describe, expect, it } from 'vitest'
import { NIGHT, episode3 } from '../../content/levels/03-abraham-father-of-faith/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { byNight, lookingAt } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof byNight.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = byNight.start(ctx)
  const titles = new Set<string>()
  for (let t = 0; t < seconds; t += STEP) {
    state = byNight.step(state, player(state, t), ctx, () => {})
    const m = byNight.view(state, ctx).message
    if (m) titles.add(m.title)
  }
  return { state, view: byNight.view(state, ctx), titles }
}

const key = (k: 'left' | 'right' | 'primary'): GameInput => ({ kind: 'key', key: k, down: true })
const every = (seconds: number, input: (t: number) => GameInput) => (_: State, t: number) => (Math.floor((t + STEP) / seconds) > Math.floor(t / seconds) ? [input(t)] : [])

describe('"By night"', () => {
  it('moves a band only while the watchman looks the other way, until both surround the camp', () => {
    // A careful player: moves the band on the side the watchman isn't watching.
    const { state, view, titles } = run(
      false,
      30,
      every(0.5, (t) => key(lookingAt(t + STEP, false) === 'left' ? 'right' : 'left')),
    )
    state.bands.forEach((b, i) => expect(b.at).toBe(NIGHT.bands[i]!.path.length - 1))
    expect(titles.has('He’s looking this way')).toBe(false)
    expect(titles.has('The captives are freed!')).toBe(true)
    expect(view.done).toBe(true)
  })

  it('keeps a band in its cover when it’s sent while watched, and says to wait', () => {
    // At first the watchman looks left.
    const { state, titles } = run(false, 1, (_, t) => (t < STEP ? [key('left')] : []))
    expect(state.bands[0]!.at).toBe(0)
    expect(titles.has('He’s looking this way')).toBe(true)
  })

  it('surrounds the camp with Space alone', () => {
    const { view } = run(false, 30, every(0.7, () => key('primary')))
    expect(view.done).toBe(true)
  })

  it('in gentle mode, lets a band wait safely until the watchman turns', () => {
    const { state, titles } = run(true, 6, (_, t) => (t < STEP ? [key('left')] : []))
    expect(state.bands[0]!.at).toBe(1)
    expect(titles.has('He’s looking this way')).toBe(false)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(key('primary')) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
