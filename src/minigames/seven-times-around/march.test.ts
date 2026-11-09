import { describe, expect, it } from 'vitest'
import { FALLEN, WALLS, episode3 } from '../../content/levels/14-joshua/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { BEAT, BLAST, CIRCLES, STEPS, sevenTimesAround } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof sevenTimesAround.start>
const press: GameInput = { kind: 'key', key: 'primary', down: true }
const release: GameInput = { kind: 'key', key: 'primary', down: false }

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = sevenTimesAround.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = sevenTimesAround.step(state, player(state, t), ctx, () => {})
  return { state, view: sevenTimesAround.view(state, ctx) }
}

/** Taps exactly on each beat while marching, holds for the trumpets, then shouts. */
const onBeat = (s: State, t: number): GameInput[] => {
  if (s.phase === 'march') return Math.abs(t / BEAT - Math.round(t / BEAT)) < STEP / BEAT / 2 ? [press] : []
  if (s.phase === 'trumpets') return [press]
  if (s.phase === 'shout') return t - s.phaseAt < 0.3 ? [release] : [press]
  return []
}

describe('"Seven times around"', () => {
  it('marches in step around the walls, seven days, then the trumpets and the shout bring the walls down', () => {
    const marching = CIRCLES * STEPS * BEAT
    const { state, view } = run(false, marching + BLAST + 6, onBeat)
    expect(state.phase).toBe('fallen')
    expect(view.live[`layer:${WALLS}.opacity`]).toBe(0)
    expect(view.live[`layer:${FALLEN}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('counts a step only on the beat, but never stops the march for long: after three misses the next tap counts', () => {
    // Taps well off the beat, just before each next one.
    const offBeat = (_: State, t: number): GameInput[] => (Math.abs(t / BEAT - Math.round(t / BEAT) - 0.4) < STEP / BEAT / 2 ? [press] : [])
    const { state } = run(false, BEAT * 8.2, offBeat)
    expect(state.steps).toBe(2)
  })

  it('in gentle mode, counts any tap as a step', () => {
    const offBeat = (_: State, t: number): GameInput[] => (Math.abs(t / BEAT - Math.round(t / BEAT) - 0.4) < STEP / BEAT / 2 ? [press] : [])
    expect(run(true, BEAT * 4.2, offBeat).state.steps).toBe(4)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(press) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
