import { describe, expect, it } from 'vitest'
import { FALL, PROMISES, episode1 } from '../../content/levels/08-the-plagues-and-the-passover/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { godsPromises } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof godsPromises.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = godsPromises.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = godsPromises.step(state, player(state, t), ctx, () => {})
    const text = godsPromises.view(state, ctx).message?.text
    if (text && titles.at(-1) !== text) titles.push(text)
  }
  return { state, view: godsPromises.view(state, ctx), titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
/** Keeps the pointer under the falling promise, as a player dragging Moses would. */
const follow = (state: State): GameInput[] => [{ kind: 'pointer', phase: 'move', x: PROMISES[Math.min(state.falling, PROMISES.length - 1)]!.x, y: 0.7 }]

describe('"God’s promises"', () => {
  it('catches each promise in turn, with its words, and holds them all in the sky', () => {
    const { state, view, titles } = run(false, 60, follow)
    expect(state.falling).toBe(PROMISES.length)
    expect(titles.slice(0, PROMISES.length)).toEqual(PROMISES.map((p) => `“${p.text}.”`))
    for (const p of PROMISES) {
      expect(view.live[`actor:${p.id}.x`]).toBe(p.held.x)
      expect(view.live[`actor:${p.id}.y`]).toBe(p.held.y)
    }
    expect(view.done).toBe(true)
  })

  it('lets a missed promise rise and fall again', () => {
    const { state, titles } = run(false, 6, () => [{ kind: 'pointer', phase: 'move', x: 0.85, y: 0.7 }])
    expect(state.falling).toBe(0)
    expect(titles).toContain('God’s promises don’t fall away. Here it comes again.')
    expect(state.y).toBeLessThan(FALL.gone)
  })

  it('with Space, and in gentle mode, has Moses walk to meet each promise', () => {
    expect(run(false, 60, (_, t) => (Math.floor(t) !== Math.floor(t - STEP) ? [space] : [])).view.done).toBe(true)
    expect(run(true, 80).view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space), limit: 120 })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
