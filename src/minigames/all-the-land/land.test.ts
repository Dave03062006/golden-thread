import { describe, expect, it } from 'vitest'
import { REGIONS, episode5 } from '../../content/levels/13-moses-last-words/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { allTheLand } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof allTheLand.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = allTheLand.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = allTheLand.step(state, player(state, t), ctx, () => {})
    const title = allTheLand.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: allTheLand.view(state, ctx) }
}

describe('"All the land"', () => {
  it('lights each part of the land tapped in turn, until the whole land shines', () => {
    const { titles, view } = run(false, REGIONS.length * 2 + 6, (s, t) => (Math.floor(t / 2) !== Math.floor((t - STEP) / 2) && s.lit < REGIONS.length ? [{ kind: 'pointer', phase: 'down', x: REGIONS[s.lit]!.x, y: REGIONS[s.lit]!.y }] : []))
    expect(titles).toEqual([...REGIONS.map((r) => r.name), 'All the land'])
    for (const r of REGIONS) expect(view.live[`actor:${r.glow}.opacity`]).toBe(0.85)
    expect(view.done).toBe(true)
  })

  it('lights nothing for a tap far from the next part, and in gentle mode lights by itself', () => {
    const far: GameInput = { kind: 'pointer', phase: 'down', x: 0.95, y: 0.9 }
    expect(run(false, 1, (_, t) => (t < STEP ? [far] : [])).state.lit).toBe(0)
    expect(run(true, REGIONS.length * 2.5 + 6).view.done).toBe(true)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
