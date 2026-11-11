import { describe, expect, it } from 'vitest'
import { ARROW, episode3 } from '../../content/levels/18-david-the-shepherd-king/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theArrowBeyondYou } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theArrowBeyondYou.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theArrowBeyondYou.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theArrowBeyondYou.step(state, player(state, t), ctx, () => {})
  return { state, view: theArrowBeyondYou.view(state, ctx) }
}

describe('"The arrow beyond you"', () => {
  it('shoots the arrow beyond the boy, after a short one', () => {
    const { state, view } = run(false, 8, (s, t) => (Math.round(t / STEP) % 20 === 0 && s.hitAt < 0 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(state.hitAt).toBeGreaterThan(0)
    expect(view.live[`actor:${ARROW.marker}.x`]).toBe(ARROW.target)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
