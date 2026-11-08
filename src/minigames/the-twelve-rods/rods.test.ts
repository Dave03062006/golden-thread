import { describe, expect, it } from 'vitest'
import { RODS, episode4 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW } from '../in-order'
import { playThrough } from '../playthrough'
import { theTwelveRods } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The twelve rods"', () => {
  it('has twelve tribes, each with its own sign, Levi last', () => {
    expect(RODS).toHaveLength(12)
    expect(new Set(RODS.map((r) => r.sign)).size).toBe(12)
    expect(RODS.at(-1)!.tribe).toBe('Levi')
  })

  it('lays each staff before the ark as its leader is matched, until all twelve are there', () => {
    const ctx = context(false)
    let state = theTwelveRods.start(ctx)
    for (const r of RODS) for (let t = 0; t < SHOW + 0.1; t += STEP) state = theTwelveRods.step(state, t < STEP ? [{ kind: 'choose', option: r.tribe }] : [], ctx, () => {})
    for (let t = 0; t < 1; t += STEP) state = theTwelveRods.step(state, [], ctx, () => {})
    const view = theTwelveRods.view(state, ctx)
    for (const r of RODS) expect(view.live[`actor:${r.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not that one" to a wrong sign, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = theTwelveRods.step(theTwelveRods.start(ctx), [{ kind: 'choose', option: 'Dan' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(theTwelveRods.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(theTwelveRods.view(theTwelveRods.start(gentle), gentle).choice?.glow).toBe('Judah')
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: RODS[choice.trail?.length ?? 0]!.tribe })
        },
      })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
