import { describe, expect, it } from 'vitest'
import { SACKS, episode4 } from '../../content/levels/05-joseph-and-his-brothers/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { fillingTheSacks } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof fillingTheSacks.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = fillingTheSacks.start(ctx)
  const cues: { to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = fillingTheSacks.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: fillingTheSacks.view(state, ctx), cues }
}

const down: GameInput = { kind: 'key', key: 'primary', down: true }
const up: GameInput = { kind: 'key', key: 'primary', down: false }
/** Holds to fill, and when the sack is full, lets go and presses again to load it. */
const filler = (state: State): GameInput[] => (state.fill >= 1 ? [up, down] : state.holding ? [] : [down])

describe('"Filling the sacks"', () => {
  it('fills each sack while held and loads it on a press, until every donkey is loaded', () => {
    const { view, cues } = run(false, 20, filler)
    expect(SACKS.every((s) => view.live[`actor:${s.id}.opacity`] === 1)).toBe(true)
    expect(cues.filter((c) => c.to.pose === 'full')).toHaveLength(SACKS.length)
    expect(view.message?.title).toBe('Every sack full')
    expect(view.done).toBe(true)
  })

  it('stops filling when let go, and shows the silver only once the sack is full', () => {
    const half = run(false, 1, (_, t) => (t < STEP ? [down] : t > 0.5 && t < 0.5 + STEP ? [up] : []))
    expect(half.state.fill).toBeGreaterThan(0.4)
    expect(half.state.fill).toBeLessThan(0.6)
    expect(half.view.live['actor:silver.opacity']).toBe(0)
    const full = run(false, 1.5, (_, t) => (t < STEP ? [down] : []))
    expect(full.view.live['actor:silver.opacity']).toBe(1)
    expect(full.state.loaded).toBe(0)
  })

  it('in gentle mode, fills and loads a sack from one tap', () => {
    const { state } = run(true, 2, (_, t) => (t < STEP ? [down, up] : []))
    expect(state.loaded).toBe(1)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue(down) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
