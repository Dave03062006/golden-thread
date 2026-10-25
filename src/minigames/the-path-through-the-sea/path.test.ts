import { describe, expect, it } from 'vitest'
import { DEAD_ENDS, FOLLOWERS, NODES, SHORE, STRAGGLERS, episode2 } from '../../content/levels/09-through-the-sea/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { nextStep, thePathThroughTheSea } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof thePathThroughTheSea.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = thePathThroughTheSea.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = thePathThroughTheSea.step(state, player(state, t), ctx, () => {})
  return { state, view: thePathThroughTheSea.view(state, ctx) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (n: number): GameInput => ({ kind: 'pointer', phase: 'down', x: NODES[n]!.x, y: NODES[n]!.y })

describe('"The path through the sea"', () => {
  it('has one way across, and every straggler waits on it', () => {
    const way = [0]
    while (way.at(-1) !== SHORE) way.push(nextStep(way.at(-1)!))
    for (const n of Object.keys(STRAGGLERS).map(Number)) expect(way).toContain(n)
    for (const n of Object.keys(DEAD_ENDS).map(Number)) expect(way).not.toContain(n)
  })

  it('walks only along the paths, and turns back at a dead end', () => {
    // A tap on a crossroads that isn't next to Moses does nothing but say so.
    expect(run(false, 2, (s) => (s.time < STEP * 2 ? [tap(4)] : [])).state.at).toBe(0)
    const { state, view } = run(false, 3, (s) => (s.at === 0 && s.to === null ? [tap(1)] : s.at === 1 && s.to === null ? [tap(2)] : []))
    expect(state.at).toBe(2)
    expect(view.message?.title).toBe(DEAD_ENDS[2]!.title)
  })

  it('with Space, leads everyone across, gathering each straggler on the way', () => {
    const { state, view } = run(false, 40, () => [space])
    expect(state.at).toBe(SHORE)
    expect(state.joined).toHaveLength(Object.keys(STRAGGLERS).length)
    for (const id of [...FOLLOWERS, ...Object.values(STRAGGLERS).map((s) => s.id)]) expect(view.live[`actor:${id}.x`]).toBeCloseTo(NODES[SHORE]!.x)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, Moses walks on along the way by himself', () => {
    const { state, view } = run(true, 60)
    expect(state.at).toBe(SHORE)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
