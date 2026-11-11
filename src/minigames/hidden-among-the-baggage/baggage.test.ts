import { describe, expect, it } from 'vitest'
import { HIDING, PILES, SAUL, episode5 } from '../../content/levels/17-samuel-and-saul/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { hiddenAmongTheBaggage } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof hiddenAmongTheBaggage.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = hiddenAmongTheBaggage.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = hiddenAmongTheBaggage.step(state, player(state, t), ctx, () => {})
  return { state, view: hiddenAmongTheBaggage.view(state, ctx) }
}

describe('"Hidden among the baggage"', () => {
  it('finds Saul behind the right pile, searching one by one', () => {
    const { state, view } = run(false, 8, (_s, t) => (Math.round(t / STEP) % 60 === 0 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.searched.filter(Boolean)).toHaveLength(HIDING + 1)
    expect(view.live[`actor:${SAUL}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('finds nothing behind an empty pile that is tapped', () => {
    const p = PILES[0]!
    const { state } = run(false, 0.1, (_s, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: p.x + 0.12, y: 0.8 }] : []))
    expect(state.searched[0]).toBe(true)
    expect(state.foundAt).toBe(-1)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
