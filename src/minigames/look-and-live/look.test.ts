import { describe, expect, it } from 'vitest'
import { BITTEN, BITTEN_Y, episode6 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { lookAndLive } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof lookAndLive.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = lookAndLive.start(ctx)
  const emitted: string[] = []
  for (let t = 0; t < seconds; t += STEP) state = lookAndLive.step(state, player(state, t), ctx, (cue) => emitted.push(cue.target))
  return { state, emitted, view: lookAndLive.view(state, ctx) }
}

describe('"Look and live"', () => {
  it('helps each one tapped to look up, until everyone has looked', () => {
    const { emitted, view } = run(false, BITTEN.length + 6, (s, t) => (Math.floor(t) !== Math.floor(t - STEP) && s.count < BITTEN.length ? [{ kind: 'pointer', phase: 'down', x: BITTEN[s.count]!.x, y: BITTEN_Y - 0.03 }] : []))
    expect(emitted).toEqual(BITTEN.map((b) => `actor:${b.id}`))
    for (const b of BITTEN) expect(view.live[`actor:${b.glow}.opacity`]).toBe(0.8)
    expect(view.done).toBe(true)
  })

  it('helps no one for a tap on bare ground, except in gentle mode', () => {
    const bare: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(1)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
