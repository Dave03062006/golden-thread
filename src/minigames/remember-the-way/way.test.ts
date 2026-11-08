import { describe, expect, it } from 'vitest'
import { STOPS, TOKEN, episode1 } from '../../content/levels/13-moses-last-words/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { rememberTheWay } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof rememberTheWay.start>

function run(gentle: boolean, seconds: number, player: (state: State) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = rememberTheWay.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = rememberTheWay.step(state, player(state), ctx, () => {})
    const title = rememberTheWay.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: rememberTheWay.view(state, ctx) }
}

const tapNext = (s: State): GameInput[] => (s.at < STOPS.length - 1 ? [{ kind: 'pointer', phase: 'down', x: STOPS[s.at + 1]!.x, y: STOPS[s.at + 1]!.y }] : [])

describe('"Remember the way"', () => {
  it('carries the memory from stop to stop, lighting each picture, until the whole way is remembered', () => {
    const { titles, view } = run(false, 40, tapNext)
    expect(titles).toEqual([...STOPS.map((s) => s.place), 'All the way'])
    for (const s of STOPS) expect(view.live[`actor:${s.id}.opacity`]).toBe(1)
    expect(view.live[`actor:${TOKEN}.x`]).toBe(STOPS.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('waits at a stop until the player carries the memory on, except in gentle mode', () => {
    expect(run(false, 5).state.at).toBe(0)
    expect(run(true, 5).state.at).toBeGreaterThan(0)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
