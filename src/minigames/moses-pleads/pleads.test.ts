import { describe, expect, it } from 'vitest'
import { PLEAS, STORMS, episode5 } from '../../content/levels/10-sinai/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, mosesPleads } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Moses pleads"', () => {
  it('matches each plea, and the storm on the mountain clears', () => {
    const ctx = context(false)
    let state = mosesPleads.start(ctx)
    for (const p of PLEAS) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = mosesPleads.step(state, t < STEP ? [{ kind: 'choose', option: p.answer }] : [], ctx, () => {})
    }
    for (let t = 0; t < 1; t += STEP) state = mosesPleads.step(state, [], ctx, () => {})
    const view = mosesPleads.view(state, ctx)
    for (const id of STORMS) expect(view.live[`actor:${id}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('asks again after a wrong match, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = mosesPleads.step(mosesPleads.start(ctx), [{ kind: 'choose', option: 'promise' }], ctx, () => {})
    expect(state.matched).toBe(0)
    expect(mosesPleads.view(state, ctx).choice?.feedback?.right).toBe(false)
    expect(mosesPleads.view(state, ctx).live[`actor:${STORMS[0]}.opacity`]).toBe(1)
    const gentle = context(true)
    expect(mosesPleads.view(mosesPleads.start(gentle), gentle).choice?.glow).toBe(PLEAS[0]!.answer)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: PLEAS[choice.trail?.length ?? 0]!.answer })
        },
      })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
