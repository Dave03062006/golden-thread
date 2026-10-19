import { describe, expect, it } from 'vitest'
import { STARS, STAR_FIELDS, episode4 } from '../../content/levels/03-abraham-father-of-faith/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { countTheStars } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof countTheStars.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = countTheStars.start(ctx)
  const texts: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = countTheStars.step(state, player(state, t), ctx, () => {})
    const m = countTheStars.view(state, ctx).message
    if (m && texts.at(-1) !== m.text) texts.push(m.text)
  }
  return { state, view: countTheStars.view(state, ctx), texts }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tapping = (_: State, t: number): GameInput[] => (Math.floor((t + STEP) / 0.4) > Math.floor(t / 0.4) ? [{ kind: 'pointer', phase: 'down', x: 0.1 + ((t * 7) % 0.8), y: 0.2 }] : [])

describe('"Count the stars"', () => {
  it('lights a star where the sky is tapped, and counts it', () => {
    const { state, view, texts } = run(false, 1.3, tapping)
    expect(state.lit.length).toBe(3)
    expect(view.live['actor:star-1.y']).toBeCloseTo(0.2)
    expect(texts).toEqual(['1', '2', '3'])
  })

  it('then the stars come faster than anyone could count, until the whole sky is full', () => {
    const { view, texts } = run(false, 20, tapping)
    for (const id of STAR_FIELDS) expect(view.live[`layer:${id}.opacity`]).toBe(1)
    // The count runs into the thousands, then gives up.
    expect(texts.some((t) => t.includes(','))).toBe(true)
    expect(view.message?.title).toBe('Too many to count')
    expect(view.done).toBe(true)
  })

  it('counts the next star with each press of Space', () => {
    const { state } = run(false, 2, (_, t) => (Math.floor((t + STEP) / 0.5) > Math.floor(t / 0.5) ? [space] : []))
    expect(state.lit.length).toBe(4)
    expect(state.lit[0]).toEqual(STARS[0])
  })

  it('ignores taps below the sky', () => {
    const { state } = run(false, 1, (_, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: 0.5, y: 0.85 }] : []))
    expect(state.lit).toEqual([])
  })

  it('in gentle mode, counts a star wherever a sweep passes', () => {
    const { state } = run(true, 2, (_, t) => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: 0.1 + t * 0.4, y: 0.3 }])
    expect(state.lit.length).toBeGreaterThan(4)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
