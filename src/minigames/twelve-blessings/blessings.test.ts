import { describe, expect, it } from 'vitest'
import { BLESSINGS, episode7 } from '../../content/levels/05-joseph-and-his-brothers/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { twelveBlessings } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The twelve blessings"', () => {
  it('gives each picture to its son, with Jacob’s words for it, the picture changing each time', () => {
    const ctx = context(false)
    let state = twelveBlessings.start(ctx)
    const words: string[] = []
    const poses: (string | undefined)[] = []
    for (const b of BLESSINGS) {
      for (let t = 0; t < 2.2; t += STEP) {
        state = twelveBlessings.step(state, t < STEP ? [{ kind: 'choose', option: b.son }] : [], ctx, (c) => poses.push(c.to.pose))
        const feedback = twelveBlessings.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) words.push(feedback.text)
      }
    }
    for (let t = 0; t < 1; t += STEP) state = twelveBlessings.step(state, [], ctx, () => {})
    const view = twelveBlessings.view(state, ctx)
    expect(words).toEqual(BLESSINGS.map((b) => b.words))
    expect(poses).toEqual(BLESSINGS.slice(1).map((b) => b.picture))
    expect(view.live['actor:blessing.opacity']).toBe(0)
    expect(view.done).toBe(true)
  })

  it('answers the wrong son with Jacob’s words, and asks again', () => {
    const ctx = context(false)
    let state = twelveBlessings.start(ctx)
    state = twelveBlessings.step(state, [{ kind: 'choose', option: 'Reuben' }], ctx, () => {})
    expect(state.given).toBe(0)
    expect(twelveBlessings.view(state, ctx).choice?.feedback?.text).toContain('Judah is a lion’s whelp')
  })

  it('names the brothers without a picture as it begins, and in gentle mode the right son glows', () => {
    const ctx = context(true)
    const view = twelveBlessings.view(twelveBlessings.start(ctx), ctx)
    expect(view.message?.text).toContain('Reuben, Simeon, Levi and Gad')
    expect(view.choice?.glow).toBe('Judah')
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: BLESSINGS[choice.trail?.length ?? 0]!.son })
        },
      })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
