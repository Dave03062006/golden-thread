import { describe, expect, it } from 'vitest'
import { CLAIMS, episode3 } from '../../content/levels/06-job/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { trueOrTwisted } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"True or twisted?"', () => {
  it('weighs each of the friends’ words in turn, with the reason for each', () => {
    const ctx = context(false)
    let state = trueOrTwisted.start(ctx)
    const reasons: string[] = []
    for (const c of CLAIMS) {
      for (let t = 0; t < 3.4; t += STEP) {
        state = trueOrTwisted.step(state, t < STEP ? [{ kind: 'choose', option: c.answer }] : [], ctx, () => {})
        const feedback = trueOrTwisted.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) reasons.push(feedback.text)
      }
    }
    for (let t = 0; t < 1; t += STEP) state = trueOrTwisted.step(state, [], ctx, () => {})
    expect(reasons).toEqual(CLAIMS.map((c) => c.why))
    expect(trueOrTwisted.view(state, ctx).done).toBe(true)
  })

  it('quotes the friends’ words, and asks again after a wrong answer', () => {
    const ctx = context(false)
    const start = trueOrTwisted.start(ctx)
    expect(trueOrTwisted.view(start, ctx).choice?.question).toContain('“Does God pervert justice?')
    const state = trueOrTwisted.step(start, [{ kind: 'choose', option: 'twisted' }], ctx, () => {})
    expect(state.weighed).toBe(0)
    expect(trueOrTwisted.view(state, ctx).choice?.feedback).toEqual({ right: false, text: CLAIMS[0].hint })
  })

  it('in gentle mode, makes the right answer glow', () => {
    const ctx = context(true)
    expect(trueOrTwisted.view(trueOrTwisted.start(ctx), ctx).choice?.glow).toBe('true')
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: CLAIMS[choice.trail?.length ?? 0]!.answer })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
