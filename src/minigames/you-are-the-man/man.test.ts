import { describe, expect, it } from 'vitest'
import { CARDS, episode2 } from '../../content/levels/19-davids-sin-and-repentance/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { youAreTheMan } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof youAreTheMan.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = youAreTheMan.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = youAreTheMan.step(state, player(state, t), ctx, () => {})
  return { state, view: youAreTheMan.view(state, ctx) }
}

describe('"You are the man"', () => {
  it('matches each part of the story, and the rich man turns out to be David', () => {
    const { state, view } = run(false, 15, (s) => (s.time - s.placedAt > 2.1 && s.placed < CARDS.length ? [{ kind: 'choose', option: CARDS[s.placed]!.id }] : []))
    expect(state.placed).toBe(CARDS.length)
    expect(view.live['actor:rich-david.opacity']).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "look again" to a wrong match', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'rich-man' }] : []))
    expect(state.placed).toBe(0)
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
