import { describe, expect, it } from 'vitest'
import { INSTRUMENTS, episode1 } from '../../content/levels/20-the-psalms/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { praiseHim } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof praiseHim.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = praiseHim.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = praiseHim.step(state, player(state, t), ctx, () => {})
  return { state, view: praiseHim.view(state, ctx) }
}

describe('"Praise him!"', () => {
  it('brings in every instrument of Psalm 150 on the beat', () => {
    const { state, view } = run(false, 20, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.taken).toBe(INSTRUMENTS.length)
    expect(view.live['actor:cymbals.opacity']).toBe(1)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
