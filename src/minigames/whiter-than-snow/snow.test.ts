import { describe, expect, it } from 'vitest'
import { SNOW, STAINS, episode3 } from '../../content/levels/19-davids-sin-and-repentance/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whiterThanSnow } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whiterThanSnow.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whiterThanSnow.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = whiterThanSnow.step(state, player(state, t), ctx, () => {})
  return { state, view: whiterThanSnow.view(state, ctx) }
}

describe('"Whiter than snow"', () => {
  it('washes every stain away, and the snow falls', () => {
    const { state, view } = run(false, 30, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(STAINS.length)
    expect(view.live['actor:stain-1.opacity']).toBe(0)
    expect(view.live[`actor:${SNOW}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('does nothing for a tap before the drop is ready', () => {
    const { state } = run(false, 0.3, (_s, t) => (t < 0.1 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
