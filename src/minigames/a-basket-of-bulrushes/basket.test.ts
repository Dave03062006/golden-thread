import { describe, expect, it } from 'vitest'
import { BASKET, ROWS, episode2 } from '../../content/levels/07-moses-is-called/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { LINED_UP, aBasketOfBulrushes, reedAt } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof aBasketOfBulrushes.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = aBasketOfBulrushes.start(ctx)
  const poses: (string | undefined)[] = []
  for (let t = 0; t < seconds; t += STEP) state = aBasketOfBulrushes.step(state, player(state, t), ctx, (c) => poses.push(c.to.pose))
  return { state, view: aBasketOfBulrushes.view(state, ctx), poses }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
/** Presses when the reed lines up (at most once a second), then Space to seal. */
const skilled = (state: State, t: number): GameInput[] =>
  state.rows < ROWS ? (Math.abs(reedAt(t + STEP)) < LINED_UP / 2 && t + STEP - state.rowAt > 1 ? [space] : []) : state.sealed === 0 ? [space] : []

describe('"A basket of bulrushes"', () => {
  it('weaves the rows when they line up, seals the basket, and closes the lid', () => {
    const { view, poses } = run(false, 30, skilled)
    expect(poses).toEqual([...Array.from({ length: ROWS }, (_, i) => `row-${i + 1}`), 'sealed', 'closed'])
    expect(view.live['actor:loose-reed.opacity']).toBe(0)
    expect(view.done).toBe(true)
  })

  it('doesn’t weave a reed that hasn’t lined up, and says so', () => {
    const ctx = context(false)
    let state = aBasketOfBulrushes.start(ctx)
    while (Math.abs(reedAt(state.time + STEP)) < 0.1) state = aBasketOfBulrushes.step(state, [], ctx, () => {})
    state = aBasketOfBulrushes.step(state, [space], ctx, () => {})
    expect(state.rows).toBe(0)
    expect(aBasketOfBulrushes.view(state, ctx).message?.title).toBe('Not yet')
  })

  it('seals the basket with a sweep over it', () => {
    const ctx = context(false)
    let state = { ...aBasketOfBulrushes.start(ctx), rows: ROWS }
    for (let t = 0; t < 3; t += STEP) {
      const x = BASKET.x + 0.08 * Math.sin(t * 12)
      state = aBasketOfBulrushes.step(state, [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x, y: BASKET.y - 0.06 }], ctx, () => {})
    }
    expect(state.sealedAt).toBeGreaterThan(0)
  })

  it('in gentle mode, weaves a row with every tap', () => {
    const { state } = run(true, 3, (_, t) => (Math.floor(t * 2) !== Math.floor((t - STEP) * 2) ? [space] : []))
    expect(state.rows).toBe(ROWS)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
