import { describe, expect, it } from 'vitest'
import { STORM_ARK, STORM_WAVES, episode3 } from '../../content/levels/02-noah-and-the-nations/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { throughTheStorm, waveAt } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const key = (k: 'left' | 'right' | 'primary'): GameInput => ({ kind: 'key', key: k, down: true })

/** Plays the rules, calling `player` every step with the state and the seconds so far. */
function run(gentle: boolean, seconds: number, player: (state: ReturnType<typeof throughTheStorm.start>, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = throughTheStorm.start(ctx)
  const cues: unknown[] = []
  for (let t = 0; t < seconds; t += STEP) state = throughTheStorm.step(state, player(state, t), ctx, (cue) => cues.push(cue))
  return { state, view: throughTheStorm.view(state, ctx), cues }
}

/** Presses `press` once, half a second before each wave reaches the ark. */
const ahead = (press: (side: 'left' | 'right') => GameInput) => (state: ReturnType<typeof throughTheStorm.start>, t: number) => {
  const next = STORM_WAVES[state.met.length]
  return next && t < next.at - 0.5 && t + STEP >= next.at - 0.5 ? [press(next.side)] : []
}

describe('"Through the storm"', () => {
  it('rides every wave when the ark leans into each as it comes, and then the storm eases', () => {
    const { state, view } = run(false, 60, ahead((side) => key(side)))
    expect(state.met).toEqual(STORM_WAVES.map(() => 'rode'))
    expect(state.flicker).toBe(0)
    expect(view.done).toBe(true)
  })

  it('rides them with Space alone, which leans into whichever wave comes next', () => {
    const { state } = run(false, 60, ahead(() => key('primary')))
    expect(state.met).toEqual(STORM_WAVES.map(() => 'rode'))
  })

  it('only rocks the ark, never sinks it, when the player leans the wrong way or not at all', () => {
    const wrong = run(false, 60, ahead((side) => key(side === 'left' ? 'right' : 'left')))
    expect(wrong.state.met).toEqual(STORM_WAVES.map(() => 'rocked'))
    expect(wrong.view.done).toBe(true)
    const idle = run(false, 60)
    expect(idle.state.met.every((m) => m === 'rocked')).toBe(true)
    expect(idle.view.done).toBe(true)
  })

  it('flickers the lamplight just after a wave met badly', () => {
    const { view } = run(false, STORM_WAVES[0]!.at + 0.3)
    expect(view.live['actor:ark-window.opacity']).toBeLessThan(0.85)
  })

  it('rolls each wave in from its side to the ark, lifting the ark as it passes', () => {
    const first = STORM_WAVES[0]!
    expect(waveAt(0, 0, false).opacity).toBe(0)
    expect(waveAt(0, first.at, false).x).toBeCloseTo(STORM_ARK.x)
    const { view } = run(false, first.at)
    expect(view.live['actor:ark-sea.y']).toBeLessThan(STORM_ARK.y - 0.03)
  })

  it('in gentle mode, leans into each wave by itself when the player waits', () => {
    const { state, view } = run(true, 80)
    expect(state.met).toEqual(STORM_WAVES.map(() => 'rode'))
    expect(view.done).toBe(true)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: () => {} })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
