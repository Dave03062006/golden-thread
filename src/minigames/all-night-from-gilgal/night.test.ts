import { describe, expect, it } from 'vitest'
import { ARMY, WAY, episode5 } from '../../content/levels/14-joshua/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { allNightFromGilgal } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof allNightFromGilgal.start>

function run(gentle: boolean, seconds: number, player: (state: State) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = allNightFromGilgal.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = allNightFromGilgal.step(state, player(state), ctx, () => {})
  return { state, view: allNightFromGilgal.view(state, ctx) }
}

describe('"All night from Gilgal"', () => {
  it('leads the army turn by turn up to Gibeon, dragged along the way', () => {
    const { view } = run(false, 20, (s) => [{ kind: 'pointer', phase: 'move', x: WAY[s.next]!.x, y: WAY[s.next]!.y }])
    expect(view.live[`actor:${ARMY}.x`]).toBe(WAY.at(-1)!.x)
    expect(view.message?.title).toBe('Before the dawn')
    expect(view.done).toBe(true)
  })

  it('stays where it is until it is led, except in gentle mode', () => {
    expect(run(false, 4).state.army).toEqual(WAY[0])
    expect(run(true, 4).state.next).toBeGreaterThan(1)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
