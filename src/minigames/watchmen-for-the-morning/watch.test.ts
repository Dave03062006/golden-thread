import { describe, expect, it } from 'vitest'
import { DAWN, episode4 } from '../../content/levels/20-the-psalms/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { watchmenForTheMorning } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof watchmenForTheMorning.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = watchmenForTheMorning.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = watchmenForTheMorning.step(state, player(state, t), ctx, () => {})
  return { state, view: watchmenForTheMorning.view(state, ctx) }
}

describe('"Watchmen for the morning"', () => {
  it('calls out each change of the light, until the sun rises', () => {
    const { state, view } = run(false, 40, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(DAWN.length)
    expect(view.live['layer:dawn-sky.opacity']).toBe(1)
    expect(view.live['layer:night-sky.opacity']).toBe(0)
    expect(view.done).toBe(true)
  })

  it('does nothing for a tap in the dark', () => {
    const { state } = run(false, 0.5, (_s, t) => (t < 0.1 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
