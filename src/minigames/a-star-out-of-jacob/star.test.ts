import { describe, expect, it } from 'vitest'
import { ORACLE, STAR, episode8 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-8'
import { verseText } from '../../content/bible/verses'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW } from '../in-order'
import { playThrough } from '../playthrough'
import { aStarOutOfJacob } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode8, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"A star out of Jacob"', () => {
  it('asks only for words of Numbers 24:17, in the order they come', () => {
    const verse = verseText('NUM 24:17')
    for (const o of ORACLE) expect(verse).toContain(o.line.replace('___', o.word).replace(/[;:,.]$/, ''))
  })

  it('lights a star for each word chosen in order, then the bright star rises', () => {
    const ctx = context(false)
    let state = aStarOutOfJacob.start(ctx)
    for (const o of ORACLE) for (let t = 0; t < SHOW + 0.1; t += STEP) state = aStarOutOfJacob.step(state, t < STEP ? [{ kind: 'choose', option: o.word }] : [], ctx, () => {})
    for (let t = 0; t < 1; t += STEP) state = aStarOutOfJacob.step(state, [], ctx, () => {})
    const view = aStarOutOfJacob.view(state, ctx)
    for (const o of ORACLE) expect(view.live[`actor:${o.star}.opacity`]).toBe(1)
    expect(view.live[`actor:${STAR.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not quite" to a word out of order, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = aStarOutOfJacob.step(aStarOutOfJacob.start(ctx), [{ kind: 'choose', option: 'star' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(aStarOutOfJacob.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(aStarOutOfJacob.view(aStarOutOfJacob.start(gentle), gentle).choice?.glow).toBe('now')
  })

  it('plays through Episode 8, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode8, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: ORACLE[choice.trail?.length ?? 0]!.word })
        },
      })
      expect(comparisons).toHaveLength(episode8.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
