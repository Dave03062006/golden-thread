import { describe, expect, it } from 'vitest'
import { DEMANDED, PATCHES, PER_PATCH, PILE, episode2 } from '../../content/levels/08-the-plagues-and-the-passover/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { gatheringStubble } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof gatheringStubble.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = gatheringStubble.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = gatheringStubble.step(state, player(state, t), ctx, () => {})
    const title = gatheringStubble.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: gatheringStubble.view(state, ctx), titles }
}

const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: PATCHES[i]!.x, y: PATCHES[i]!.y - 0.02 })

describe('"Gathering stubble"', () => {
  it('gathers each patch tapped, counting the bricks against the number Pharaoh demands', () => {
    const { view, titles } = run(false, PATCHES.length + 4, (_, t) => {
      const i = Math.floor(t)
      return i < PATCHES.length && Math.floor(t - STEP) !== i ? [tap(PATCHES.length - 1 - i)] : []
    })
    expect(titles.slice(0, -1)).toEqual(PATCHES.map((_, n) => `Straw for ${(n + 1) * PER_PATCH} bricks`))
    expect(titles.at(-1)).toBe('Never enough')
    expect(PATCHES.length * PER_PATCH).toBeLessThan(DEMANDED)
    expect(view.live['actor:pile.size']).toBe(PILE.to)
    expect(view.done).toBe(true)
  })

  it('gathers nothing from a tap on bare ground, except in gentle mode', () => {
    const bare: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.3 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(1)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
