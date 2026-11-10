import { describe, expect, it } from 'vitest'
import { COMPANIES, episode3 } from '../../content/levels/15-the-judges/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { SIGNALS, torchesAndTrumpets } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof torchesAndTrumpets.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = torchesAndTrumpets.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = torchesAndTrumpets.step(state, player(state, t), ctx, () => {})
  return { state, view: torchesAndTrumpets.view(state, ctx) }
}

describe('"Torches and trumpets"', () => {
  it('blows and breaks with Gideon, company by company, until every torch is lit', () => {
    const { view, state } = run(false, 30, (s) => (s.time >= s.signalAt + 0.2 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.next).toBe(SIGNALS.length)
    for (const c of COMPANIES) expect(view.live[`actor:${c.torch}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('does nothing for a tap before Gideon signals', () => {
    expect(run(false, 0.5, () => [{ kind: 'key', key: 'primary', down: true }]).state.next).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
