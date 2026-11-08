import { describe, expect, it } from 'vitest'
import { ELDERS, episode2, glowOf } from '../../content/levels/12-forty-years-in-the-wilderness/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theSpiritOnTheSeventy } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theSpiritOnTheSeventy.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theSpiritOnTheSeventy.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theSpiritOnTheSeventy.step(state, player(state, t), ctx, () => {})
  return { state, view: theSpiritOnTheSeventy.view(state, ctx) }
}

const tapNext = (s: State): GameInput[] => (s.lit < ELDERS.length ? [{ kind: 'pointer', phase: 'down', x: ELDERS[s.lit]!.x, y: ELDERS[s.lit]!.y - 0.04 }] : [])

describe('"The spirit on the seventy"', () => {
  it('lights each elder tapped in turn, then Eldad and Medad in the camp', () => {
    const { state, view } = run(false, ELDERS.length + 6, tapNext)
    expect(state.lit).toBe(ELDERS.length)
    for (const e of ELDERS) expect(view.live[`actor:${glowOf(e.id)}.opacity`]).toBe(0.8)
    expect(view.done).toBe(true)
  })

  it('lights nothing for a tap away from the next elder, except in gentle mode', () => {
    const away: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [away] : [])).state.lit).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [away] : [])).state.lit).toBe(1)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
