import { describe, expect, it } from 'vitest'
import { RAISE, RAISED, episode2 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW, offered } from '../in-order'
import { playThrough } from '../playthrough'
import { raiseTheTabernacle } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Raise the tabernacle"', () => {
  it('offers three different pieces for each step, the right one among them, not always first', () => {
    RAISED.forEach((_, n) => {
      const three = offered(RAISED.length, n)
      expect(new Set(three).size).toBe(3)
      expect(three).toContain(n)
    })
    expect(new Set(RAISED.map((_, n) => offered(RAISED.length, n).indexOf(n))).size).toBeGreaterThan(1)
  })

  it('raises each piece chosen in order, until the whole tabernacle stands', () => {
    const ctx = context(false)
    let state = raiseTheTabernacle.start(ctx)
    for (const r of RAISED) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = raiseTheTabernacle.step(state, t < STEP ? [{ kind: 'choose', option: r.piece }] : [], ctx, () => {})
    }
    for (let t = 0; t < 1; t += STEP) state = raiseTheTabernacle.step(state, [], ctx, () => {})
    const view = raiseTheTabernacle.view(state, ctx)
    for (const r of RAISED) {
      expect(view.live[`actor:${r.id}.opacity`]).toBe(1)
      expect(view.live[`actor:${r.id}.y`]).toBe(RAISE.y)
    }
    expect(view.done).toBe(true)
  })

  it('says "not yet" to a piece out of order, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = raiseTheTabernacle.step(raiseTheTabernacle.start(ctx), [{ kind: 'choose', option: 'court' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(raiseTheTabernacle.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(raiseTheTabernacle.view(raiseTheTabernacle.start(gentle), gentle).choice?.glow).toBe('frames')
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: RAISED[choice.trail?.length ?? 0]!.piece })
        },
      })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
