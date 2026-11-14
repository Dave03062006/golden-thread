import { describe, expect, it } from 'vitest'
import { COURSES, episode3 } from '../../content/levels/21-solomon-and-the-temple/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { withoutASound } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof withoutASound.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = withoutASound.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = withoutASound.step(state, player(state, t), ctx, () => {})
  return { state, view: withoutASound.view(state, ctx) }
}

describe('"Without a sound"', () => {
  it('lowers every course into place, and the walls stand', () => {
    const { state, view } = run(false, 30, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(COURSES.length)
    expect(view.live[`actor:${COURSES.at(-1)!.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('does nothing for a tap while the stone swings', () => {
    const { state } = run(false, 0.5, (_s, t) => (t < 0.1 ? [{ kind: 'key', key: 'primary', down: true }] : []))
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
