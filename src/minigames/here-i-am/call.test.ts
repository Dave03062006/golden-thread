import { describe, expect, it } from 'vitest'
import { episode2 } from '../../content/levels/17-samuel-and-saul/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { hereIAm } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof hereIAm.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = hereIAm.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = hereIAm.step(state, player(state, t), ctx, () => {})
  return { state, view: hereIAm.view(state, ctx) }
}

describe('"Here I am"', () => {
  it('runs to Eli three times, then answers the LORD', () => {
    const ids = ['call-1-run', 'call-2-run', 'call-3-run', 'call-4-speak']
    const { state, view } = run(false, 15, (s) => (s.time - s.placedAt > 2.1 && s.placed < 4 ? [{ kind: 'choose', option: ids[s.placed]! }] : []))
    expect(state.placed).toBe(4)
    expect(view.done).toBe(true)
  })

  it('says "not yet" to answering before Eli understands', () => {
    const { state, view } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'call-1-speak' }] : []))
    expect(state.placed).toBe(0)
    expect(view.choice?.feedback?.right).toBe(false)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
