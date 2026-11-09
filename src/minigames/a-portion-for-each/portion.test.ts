import { describe, expect, it } from 'vitest'
import { PORTIONS, episode6 } from '../../content/levels/14-joshua/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW } from '../in-order'
import { playThrough } from '../playthrough'
import { aPortionForEach } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"A portion for each"', () => {
  it('fills each tribe’s portion on the map as it is chosen', () => {
    const ctx = context(false)
    let state = aPortionForEach.start(ctx)
    for (const p of PORTIONS) for (let t = 0; t < SHOW + 0.1; t += STEP) state = aPortionForEach.step(state, t < STEP ? [{ kind: 'choose', option: p.id }] : [], ctx, () => {})
    for (let t = 0; t < 1; t += STEP) state = aPortionForEach.step(state, [], ctx, () => {})
    const view = aPortionForEach.view(state, ctx)
    for (const p of PORTIONS) expect(view.live[`actor:${p.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not that one" to the wrong portion, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = aPortionForEach.step(aPortionForEach.start(ctx), [{ kind: 'choose', option: PORTIONS[1]!.id }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(aPortionForEach.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(aPortionForEach.view(aPortionForEach.start(gentle), gentle).choice?.glow).toBe(PORTIONS[0]!.id)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: PORTIONS[choice.trail?.length ?? 0]!.id })
        },
      })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
