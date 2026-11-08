import { describe, expect, it } from 'vitest'
import { JAR, THIRSTY, THIRSTY_Y, episode5 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { waterForAll } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof waterForAll.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = waterForAll.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = waterForAll.step(state, player(state, t), ctx, () => {})
    const title = waterForAll.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: waterForAll.view(state, ctx) }
}

const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: THIRSTY[i]!.x, y: THIRSTY_Y - 0.03 })

describe('"Water for all"', () => {
  it('carries water to each one tapped, until everyone has drunk', () => {
    const { titles, view } = run(false, THIRSTY.length * 3 + 8, (s, t) => (Math.floor(t / 3) !== Math.floor((t - STEP) / 3) && s.count < THIRSTY.length ? [tap(THIRSTY.length - 1 - s.count)] : []))
    expect(titles).toEqual([...THIRSTY.map((p) => p.name).reverse(), 'Water abundantly'])
    for (const p of THIRSTY) expect(view.live[`actor:${p.glow}.opacity`]).toBe(0.8)
    expect(view.live[`actor:${JAR}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('brings water to no one for a tap on bare ground, except in gentle mode', () => {
    const bare: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(1)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
