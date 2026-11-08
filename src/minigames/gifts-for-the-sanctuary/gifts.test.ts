import { describe, expect, it } from 'vitest'
import { GIFTS, HEAP, episode1 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { giftsForTheSanctuary } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof giftsForTheSanctuary.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = giftsForTheSanctuary.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = giftsForTheSanctuary.step(state, player(state, t), ctx, () => {})
    const title = giftsForTheSanctuary.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: giftsForTheSanctuary.view(state, ctx), titles }
}

const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: GIFTS[i]!.from.x, y: GIFTS[i]!.from.y - 0.015 })

describe('"Gifts for the sanctuary"', () => {
  it('brings each gift tapped to its place, then the heap grows past the list', () => {
    const { view, titles } = run(false, GIFTS.length * 2 + 8, (_, t) => {
      const i = Math.floor(t / 2)
      return i < GIFTS.length && Math.floor((t - STEP) / 2) !== i ? [tap(GIFTS.length - 1 - i)] : []
    })
    expect(titles).toEqual([...GIFTS.map((g) => g.name).reverse(), 'Much more than enough'])
    for (const g of GIFTS) {
      expect(view.live[`actor:${g.id}.x`]).toBeCloseTo(g.to.x)
      expect(view.live[`actor:${g.place}.opacity`]).toBe(0)
    }
    expect(view.live[`actor:${HEAP.id}.size`]).toBeCloseTo(HEAP.to)
    expect(view.done).toBe(true)
  })

  it('brings nothing for a tap on bare ground, except in gentle mode', () => {
    const bare: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.3 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(1)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
