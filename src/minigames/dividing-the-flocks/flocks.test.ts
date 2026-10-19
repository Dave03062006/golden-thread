import { describe, expect, it } from 'vitest'
import { FLOCKS, episode2 } from '../../content/levels/03-abraham-father-of-faith/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { dividingTheFlocks } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof dividingTheFlocks.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = dividingTheFlocks.start(ctx)
  const titles = new Set<string>()
  for (let t = 0; t < seconds; t += STEP) {
    state = dividingTheFlocks.step(state, player(state, t), ctx, () => {})
    const message = dividingTheFlocks.view(state, ctx).message
    if (message) titles.add(message.title)
  }
  return { state, view: dividingTheFlocks.view(state, ctx), titles }
}

const key = (k: 'left' | 'right' | 'primary'): GameInput => ({ kind: 'key', key: k, down: true })
const every = (seconds: number, input: (state: State) => GameInput | null) => (state: State, t: number) => {
  if (Math.floor((t + STEP) / seconds) === Math.floor(t / seconds)) return []
  const i = input(state)
  return i ? [i] : []
}

/** Drags the next animal at the well over to a side, in one stroke. */
function dragging(to: (owner: string) => number) {
  return (state: State, t: number): GameInput[] => {
    const phase = t % 1.2
    const i = state.animals.findIndex((a) => a.state === 'mixed' || a.state === 'held')
    if (i < 0) return []
    const a = state.animals[i]!
    if (phase < STEP) return [{ kind: 'pointer', phase: 'down', x: a.x, y: a.y }]
    if (phase < 0.6) return [{ kind: 'pointer', phase: 'move', x: a.x + (to(FLOCKS[i]!.owner) - a.x) * 0.2, y: a.y }]
    if (phase < 0.6 + STEP) return [{ kind: 'pointer', phase: 'up', x: a.x, y: a.y }]
    return []
  }
}

describe('"Dividing the flocks"', () => {
  it('sends each animal dragged to its own side home to its flock, and then there is peace', () => {
    const { state, view, titles } = run(false, 30, dragging((owner) => (owner === 'abram' ? 0.2 : 0.8)))
    expect(state.animals.every((a) => a.state === 'home')).toBe(true)
    FLOCKS.forEach((f, i) => expect(state.animals[i]!.x).toBeCloseTo(f.home.x))
    expect(titles.has('Peace between the camps')).toBe(true)
    expect(view.done).toBe(true)
  })

  it('sends an animal brought to the wrong side back to the well, saying whose it is', () => {
    const { state, titles } = run(false, 3, (_, t) => (t < STEP ? [key('right')] : []))
    // The first animal is one of Abram's sheep; sent right, it goes back.
    expect(state.animals[0]!.state).not.toBe('home')
    expect(titles.has('One of Abram’s sheep')).toBe(true)
  })

  it('sends each animal home with Space alone', () => {
    const { view } = run(false, 30, every(0.7, () => key('primary')))
    expect(view.done).toBe(true)
  })

  it('in gentle mode, lets the animals wander home by themselves', () => {
    const { view } = run(true, 30)
    expect(view.done).toBe(true)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue(key('primary')) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
