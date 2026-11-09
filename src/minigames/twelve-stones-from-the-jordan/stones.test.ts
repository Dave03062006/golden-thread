import { describe, expect, it } from 'vitest'
import { BANK, STONES, episode2 } from '../../content/levels/14-joshua/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { twelveStonesFromTheJordan } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof twelveStonesFromTheJordan.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = twelveStonesFromTheJordan.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = twelveStonesFromTheJordan.step(state, player(state, t), ctx, () => {})
  return { state, view: twelveStonesFromTheJordan.view(state, ctx) }
}

describe('"Twelve stones from the Jordan"', () => {
  it('carries each stone tapped up to the bank, one for each tribe', () => {
    const { view } = run(false, STONES.length + 5, (s, t) => (Math.floor(t) !== Math.floor(t - STEP) && s.count < STONES.length ? [{ kind: 'pointer', phase: 'down', x: STONES[s.count]!.x, y: STONES[s.count]!.y - 0.01 }] : []))
    for (const s of STONES) {
      expect(view.live[`actor:${s.id}.y`]).toBe(BANK.y)
      expect(view.live[`actor:${s.id}.opacity`]).toBe(0)
    }
    expect(view.done).toBe(true)
  })

  it('has twelve tribes, each named once', () => {
    expect(new Set(STONES.map((s) => s.tribe)).size).toBe(12)
  })

  it('carries nothing for a tap on the riverbed away from the stones, except in gentle mode', () => {
    const away: GameInput = { kind: 'pointer', phase: 'down', x: 0.05, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [away] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [away] : [])).state.count).toBe(1)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
