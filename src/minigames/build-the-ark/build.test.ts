import { describe, expect, it } from 'vitest'
import { ARK, ARK_PARTS, episode2 } from '../../content/levels/02-noah-and-the-nations/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { buildTheArk } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }

function run(gentle: boolean, seconds: number, player: (state: ReturnType<typeof buildTheArk.start>, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = buildTheArk.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = buildTheArk.step(state, player(state, t), ctx, () => {})
  return { state, view: buildTheArk.view(state, ctx) }
}

/** Presses Space once every 0.7 seconds. */
const pressing = (_: unknown, t: number) => (Math.floor(t / 0.7) !== Math.floor((t - STEP) / 0.7) ? [space] : [])

/** Drags the part from where it is to (x, y), over a few steps. */
function drag(from: { x: number; y: number }, to: { x: number; y: number }): GameInput[] {
  return [
    { kind: 'pointer', phase: 'down', x: 0.5, y: 0.3 },
    { kind: 'pointer', phase: 'move', x: 0.5 + (to.x - from.x), y: 0.3 + (to.y - from.y) },
    { kind: 'pointer', phase: 'up', x: 0.5 + (to.x - from.x), y: 0.3 + (to.y - from.y) },
  ]
}

describe('"Building the ark"', () => {
  it('sets every part with Space alone, then spreads the pitch until the ark is sealed', () => {
    const { state, view } = run(false, 40, pressing)
    expect(state.index).toBe(ARK_PARTS.length)
    expect(state.pitch).toBe(1)
    expect(view.done).toBe(true)
  })

  it('snaps a part dragged close to its place, and shows the plan’s words', () => {
    const ctx = context(false)
    let state = buildTheArk.start(ctx)
    state = buildTheArk.step(state, drag(state.part, { x: ARK.x + 0.02, y: ARK.y - 0.02 }), ctx, () => {})
    expect(state.index).toBe(1)
    expect(buildTheArk.view(state, ctx).message?.text).toBe(ARK_PARTS[0]!.words)
  })

  it('sends a part let go far from its place back up, with a hint', () => {
    const ctx = context(false)
    let state = buildTheArk.start(ctx)
    state = buildTheArk.step(state, drag(state.part, { x: 0.15, y: 0.6 }), ctx, () => {})
    expect(state.index).toBe(0)
    expect(buildTheArk.view(state, ctx).message?.text).toBe(ARK_PARTS[0]!.hint)
  })

  it('lets a part snap from much farther away in gentle mode', () => {
    for (const gentle of [false, true]) {
      const ctx = context(gentle)
      let state = buildTheArk.start(ctx)
      state = buildTheArk.step(state, drag(state.part, { x: ARK.x + 0.12, y: ARK.y - 0.05 }), ctx, () => {})
      expect(state.index).toBe(gentle ? 1 : 0)
    }
  })

  it('spreads pitch with a sweep across the ark', () => {
    const ctx = context(false)
    let { state } = run(false, 4.5, pressing)
    expect(state.phase).toBe('pitch')
    const before = state.pitch
    const sweep: GameInput[] = Array.from({ length: 10 }, (_, i) => ({ kind: 'pointer', phase: i ? 'move' : 'down', x: 0.3 + i * 0.04, y: 0.65 }) as GameInput)
    state = buildTheArk.step(state, sweep, ctx, () => {})
    expect(state.pitch).toBeGreaterThan(before + 0.5)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner, seconds) => Math.floor(seconds / 0.7) !== Math.floor((seconds - 1 / 60) / 0.7) && runner.queue(space) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
