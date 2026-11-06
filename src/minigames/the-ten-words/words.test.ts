import { describe, expect, it } from 'vitest'
import { CARVED, COMMANDMENTS, episode2 } from '../../content/levels/10-sinai/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, offered, theTenWords } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The ten words"', () => {
  it('offers three different commandments for each place, the right one among them', () => {
    COMMANDMENTS.forEach((_, n) => {
      const three = offered(n)
      expect(new Set(three).size).toBe(3)
      expect(three).toContain(`word-${n}`)
    })
    // The right one isn't always in the same place.
    expect(new Set(COMMANDMENTS.map((_, n) => offered(n).indexOf(`word-${n}`))).size).toBeGreaterThan(1)
  })

  it('carves each commandment chosen in order, until all ten are on the stone', () => {
    const ctx = context(false)
    let state = theTenWords.start(ctx)
    for (let n = 0; n < COMMANDMENTS.length; n++) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = theTenWords.step(state, t < STEP ? [{ kind: 'choose', option: `word-${n}` }] : [], ctx, () => {})
    }
    for (let t = 0; t < 1; t += STEP) state = theTenWords.step(state, [], ctx, () => {})
    const view = theTenWords.view(state, ctx)
    for (const c of CARVED) expect(view.live[`actor:${c.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not yet" to one out of order, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = theTenWords.step(theTenWords.start(ctx), [{ kind: 'choose', option: 'word-4' }], ctx, () => {})
    expect(state.carved).toBe(0)
    expect(theTenWords.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(theTenWords.view(theTenWords.start(gentle), gentle).choice?.glow).toBe('word-0')
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: `word-${choice.trail?.length ?? 0}` })
        },
      })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
