import { describe, expect, it } from 'vitest'
import { FAMILIES, FRONT, episode7 } from '../../content/levels/14-joshua/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { weWillServeTheLord } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

function run(gentle: boolean, seconds: number, inputs: () => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = weWillServeTheLord.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = weWillServeTheLord.step(state, inputs(), ctx, () => {})
  return { state, view: weWillServeTheLord.view(state, ctx) }
}

describe('"We will serve the LORD"', () => {
  it('brings each family to the stone, one at a time, its idols laid down at the oak', () => {
    const { view } = run(false, 30, () => [{ kind: 'key', key: 'primary', down: true }])
    for (const f of FAMILIES) {
      expect(view.live[`actor:${f.id}.x`]).toBe(f.to)
      expect(view.live[`actor:${f.id}.y`]).toBe(FRONT)
      expect(view.live[`actor:${f.idol}.x`]).toBe(f.laid.x)
    }
    expect(view.message?.title).toBe('The whole people')
    expect(view.done).toBe(true)
  })

  it('lets no family come before the last one’s words are read, however fast the taps', () => {
    expect(run(false, 3, () => [{ kind: 'key', key: 'primary', down: true }]).state.come).toBe(1)
  })

  it('waits for a tap, except in gentle mode', () => {
    expect(run(false, 10).state.come).toBe(0)
    expect(run(true, 10).state.come).toBeGreaterThan(1)
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
