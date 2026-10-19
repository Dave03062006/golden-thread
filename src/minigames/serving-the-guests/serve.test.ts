import { describe, expect, it } from 'vitest'
import { DISHES, episode7 } from '../../content/levels/03-abraham-father-of-faith/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { servingTheGuests } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof servingTheGuests.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = servingTheGuests.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = servingTheGuests.step(state, player(state, t), ctx, () => {})
    const m = servingTheGuests.view(state, ctx).message
    if (m && titles.at(-1) !== m.title) titles.push(m.title)
  }
  return { state, view: servingTheGuests.view(state, ctx), titles }
}

/** Drags the dish being served to its place on the mat, in one stroke each second. */
const dragging = (state: State, t: number): GameInput[] => {
  const phase = t % 1
  const dish = DISHES[Math.min(state.index, DISHES.length - 1)]!
  if (phase < STEP) return [{ kind: 'pointer', phase: 'down', ...state.at }]
  if (phase < 0.5) return [{ kind: 'pointer', phase: 'move', x: dish.from.x + (dish.to.x - dish.from.x) * (phase / 0.5), y: dish.from.y + (dish.to.y - dish.from.y) * (phase / 0.5) }]
  if (phase < 0.5 + STEP) return [{ kind: 'pointer', phase: 'up', ...dish.to }]
  return []
}

describe('"Serving the guests"', () => {
  it('sets each dish on the mat when it’s brought to its place, in turn, with a few words each', () => {
    const { state, view, titles } = run(false, 10, dragging)
    expect(state.index).toBe(DISHES.length)
    expect(titles).toEqual(DISHES.map((d) => d.title))
    for (const d of DISHES) expect(view.live[`actor:${d.id}.x`]).toBeCloseTo(d.to.x)
    expect(view.done).toBe(true)
  })

  it('takes a dish let go away from the mat back to where it came from', () => {
    const dish = DISHES[0]!
    const { state } = run(false, 1, (_, t) => {
      if (t < STEP) return [{ kind: 'pointer', phase: 'down', ...dish.from }]
      if (t < 0.3) return [{ kind: 'pointer', phase: 'move', x: dish.from.x, y: dish.from.y - 0.2 }]
      if (t < 0.3 + STEP) return [{ kind: 'pointer', phase: 'up', x: dish.from.x, y: dish.from.y - 0.2 }]
      return []
    })
    expect(state.index).toBe(0)
    expect(state.at).toEqual(dish.from)
  })

  it('carries a dish that is tapped, and the next with each press of Space', () => {
    const tapped = run(false, 2, (s, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', ...s.at }, { kind: 'pointer', phase: 'up', ...s.at }] : []))
    expect(tapped.state.index).toBe(1)
    const spaced = run(false, 12, (_, t) => (Math.floor((t + STEP) / 1.5) > Math.floor(t / 1.5) ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(spaced.view.done).toBe(true)
  })

  it('in gentle mode, makes the next dish glow', () => {
    const ctx = context(true)
    expect(servingTheGuests.view(servingTheGuests.start(ctx), ctx).live['actor:dish-glow.opacity']).toBeGreaterThan(0.4)
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
