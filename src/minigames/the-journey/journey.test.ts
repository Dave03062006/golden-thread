import { describe, expect, it } from 'vitest'
import { JOURNEY, episode1 } from '../../content/levels/03-abraham-father-of-faith/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theJourney } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theJourney.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theJourney.start(ctx)
  const messages = new Set<string>()
  for (let t = 0; t < seconds; t += STEP) {
    state = theJourney.step(state, player(state, t), ctx, () => {})
    const message = theJourney.view(state, ctx).message
    if (message) messages.add(message.title)
  }
  return { state, view: theJourney.view(state, ctx), messages }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }

/** Holds the pointer on the next stop. */
const pointing = (state: State, t: number): GameInput[] => {
  const at = JOURNEY.stops[Math.min(state.stop, JOURNEY.stops.length - 1)]!.at
  return [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', ...at }]
}

describe('"The journey"', () => {
  it('leads the caravan from stop to stop to Canaan, each stop saying something of the road', () => {
    const { state, view, messages } = run(false, 30, pointing)
    expect(state.stop).toBe(JOURNEY.stops.length)
    expect([...messages]).toEqual(JOURNEY.stops.map((s) => s.title))
    expect(view.done).toBe(true)
  })

  it('leads it on to the next stop with each press of Space', () => {
    const { state } = run(false, 6, (_, t) => (t < STEP ? [space] : []))
    expect(state.stop).toBe(1)
    const all = run(false, 40, (_, t) => (Math.floor((t + STEP) / 0.7) > Math.floor(t / 0.7) ? [space] : []))
    expect(all.view.done).toBe(true)
  })

  it('drifts back to the road when led far away from it', () => {
    const { state } = run(false, 4, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.95, y: 0.05 }])
    // It never strays much farther from the road than allowed.
    const from = JOURNEY.start
    const to = JOURNEY.stops[0]!.at
    const t = Math.max(0, Math.min(1, ((state.x - from.x) * (to.x - from.x) + (state.y - from.y) * (to.y - from.y)) / ((to.x - from.x) ** 2 + (to.y - from.y) ** 2)))
    const off = Math.hypot(from.x + (to.x - from.x) * t - state.x, from.y + (to.y - from.y) * t - state.y)
    expect(off).toBeLessThan(0.09)
  })

  it('stands still when nothing is pressed', () => {
    const { state } = run(false, 3)
    expect(state.stop).toBe(0)
    expect(state.x).toBe(JOURNEY.start.x)
  })

  it('in gentle mode, follows the road while any key is held', () => {
    const { view } = run(true, 40, (_, t) => (t < STEP ? [{ kind: 'key', key: 'right', down: true }] : []))
    expect(view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
