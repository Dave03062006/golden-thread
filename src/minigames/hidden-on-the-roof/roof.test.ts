import { describe, expect, it } from 'vitest'
import { BUNDLES, SOLDIERS, episode1 } from '../../content/levels/14-joshua/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { CLIMB, hiddenOnTheRoof } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof hiddenOnTheRoof.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = hiddenOnTheRoof.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = hiddenOnTheRoof.step(state, player(state, t), ctx, () => {})
  return { state, view: hiddenOnTheRoof.view(state, ctx) }
}

const tapNext = (s: State, t: number): GameInput[] => (s.covered < BUNDLES.length && Math.floor(t * 2) !== Math.floor((t - STEP) * 2) ? [{ kind: 'pointer', phase: 'down', x: BUNDLES[s.covered]!.x, y: BUNDLES[s.covered]!.y }] : [])

describe('"Hidden on the roof"', () => {
  it('covers the spies bundle by bundle, then the soldiers look around and go away', () => {
    const { state, view } = run(false, 15, tapNext)
    expect(state.covered).toBe(BUNDLES.length)
    for (const b of BUNDLES) expect(view.live[`actor:${b.id}.opacity`]).toBe(1)
    expect(view.live[`actor:${SOLDIERS.id}.x`]).toBe(SOLDIERS.from.x)
    expect(view.live[`actor:${SOLDIERS.id}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('never lets the soldiers reach the spies: they wait below the top until the flax is laid', () => {
    const { state, view } = run(false, CLIMB.normal * 2)
    expect(state.climb).toBeCloseTo(0.85)
    expect(view.message?.title).toBe('Searching the house')
    expect(view.done).toBe(false)
  })

  it('in gentle mode, lays the next bundle wherever the tap lands', () => {
    const anywhere: GameInput = { kind: 'pointer', phase: 'down', x: 0.1, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [anywhere] : [])).state.covered).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [anywhere] : [])).state.covered).toBe(1)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
