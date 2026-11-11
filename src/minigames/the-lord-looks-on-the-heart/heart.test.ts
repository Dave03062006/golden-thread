import { describe, expect, it } from 'vitest'
import { episode1 } from '../../content/levels/18-david-the-shepherd-king/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theLordLooksOnTheHeart } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theLordLooksOnTheHeart.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theLordLooksOnTheHeart.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theLordLooksOnTheHeart.step(state, player(state, t), ctx, () => {})
  return { state, view: theLordLooksOnTheHeart.view(state, ctx) }
}

describe('"The LORD looks on the heart"', () => {
  it('passes by the older sons and asks for the youngest', () => {
    const ids = ['son-1-pass', 'son-2-pass', 'son-3-pass', 'son-4-ask']
    const { state, view } = run(false, 15, (s) => (s.time - s.placedAt > 2.1 && s.placed < 4 ? [{ kind: 'choose', option: ids[s.placed]! }] : []))
    expect(state.placed).toBe(4)
    expect(view.done).toBe(true)
  })

  it('says "not that one" to anointing Eliab', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'son-1-anoint' }] : []))
    expect(state.placed).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
