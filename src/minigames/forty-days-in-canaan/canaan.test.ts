import { describe, expect, it } from 'vitest'
import { CLUSTER, COVERS, SPIES, episode3 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { LOOK, fortyDaysInCanaan, lookingOut } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof fortyDaysInCanaan.start>
const press: GameInput = { kind: 'key', key: 'primary', down: true }

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = fortyDaysInCanaan.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = fortyDaysInCanaan.step(state, player(state, t), ctx, () => {})
    const title = fortyDaysInCanaan.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: fortyDaysInCanaan.view(state, ctx) }
}

describe('"Forty days in Canaan"', () => {
  it('moves the spies on only while the watchman looks away, gathering the fruit, until they are through', () => {
    // A careful player presses only while he looks away.
    const { titles, view } = run(false, 40, (_, t) => (!lookingOut(t, false) ? [press] : []))
    expect(titles).toEqual(['Figs', 'Pomegranates', 'A single cluster of grapes', 'Forty days'])
    expect(view.live[`actor:${SPIES}.x`]).toBe(COVERS.at(-1)!.x)
    expect(view.live[`actor:${CLUSTER}.x`]).toBe(COVERS.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('makes the spies wait when sent on while the watchman looks out', () => {
    const { state, titles } = run(false, LOOK.normal + 0.2, (_, t) => (t > LOOK.normal && t < LOOK.normal + STEP ? [press] : []))
    expect(state.at).toBe(0)
    expect(titles).toEqual(['Wait'])
  })

  it('in gentle mode, keeps a move asked for at the wrong moment until the watchman turns', () => {
    const { state } = run(true, LOOK.gentle * 2 + 0.5, (_, t) => (t > LOOK.gentle && t < LOOK.gentle + STEP ? [press] : []))
    expect(state.at).toBe(1)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(press) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
