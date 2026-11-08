import { describe, expect, it } from 'vitest'
import { FEASTS, MEANINGS, episode6 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, theFeastsOfTheYear } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The feasts of the year"', () => {
  it('gives each feast its own meaning, and keeps them in the order of the year', () => {
    expect(new Set(FEASTS.map((f) => f.answer)).size).toBe(MEANINGS.length)
    expect(FEASTS.map((f) => f.month)).toEqual([...FEASTS.map((f) => f.month)].sort((a, b) => a - b))
  })

  it('sends each feast matched to its season on the wheel', () => {
    const ctx = context(false)
    let state = theFeastsOfTheYear.start(ctx)
    for (const f of FEASTS) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = theFeastsOfTheYear.step(state, t < STEP ? [{ kind: 'choose', option: f.answer }] : [], ctx, () => {})
    }
    for (let t = 0; t < 1; t += STEP) state = theFeastsOfTheYear.step(state, [], ctx, () => {})
    const view = theFeastsOfTheYear.view(state, ctx)
    for (const f of FEASTS) {
      expect(view.live[`actor:${f.id}.x`]).toBeCloseTo(f.at.x)
      expect(view.live[`actor:${f.id}.y`]).toBeCloseTo(f.at.y)
      expect(view.live[`actor:${f.id}.opacity`]).toBe(1)
    }
    expect(view.done).toBe(true)
  })

  it('says "think again" to a wrong match, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = theFeastsOfTheYear.step(theFeastsOfTheYear.start(ctx), [{ kind: 'choose', option: 'tents' }], ctx, () => {})
    expect(state.matched).toBe(0)
    expect(theFeastsOfTheYear.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(theFeastsOfTheYear.view(theFeastsOfTheYear.start(gentle), gentle).choice?.glow).toBe('freed')
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: FEASTS[choice.trail?.length ?? 0]!.answer })
        },
      })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
