import { describe, expect, it } from 'vitest'
import { PLEAS, episode8 } from '../../content/levels/03-abraham-father-of-faith/episode-8'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { PLEA_OPTIONS, abrahamPleads } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode8, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Abraham pleads"', () => {
  it('asks again and again, fewer each time, from fifty down to ten, each answered gently', () => {
    const ctx = context(false)
    let state = abrahamPleads.start(ctx)
    const answers: string[] = []
    for (const plea of PLEA_OPTIONS) {
      for (let t = 0; t < 3; t += STEP) {
        state = abrahamPleads.step(state, t < STEP ? [{ kind: 'choose', option: plea }] : [], ctx, () => {})
        const feedback = abrahamPleads.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) answers.push(feedback.text)
      }
    }
    expect(state.asked).toBe(PLEAS.length)
    expect(answers[0]).toBe('“For the sake of fifty I will not destroy it.”')
    expect(answers.at(-1)).toBe('“For the sake of ten I will not destroy it.”')
    expect(abrahamPleads.view(state, ctx).done).toBe(true)
  })

  it('answers a plea for more than before gently, and asks again', () => {
    const ctx = context(false)
    let state = abrahamPleads.start(ctx)
    const wrong = abrahamPleads.view(state, ctx).choice!.options.find((o) => o.id !== PLEA_OPTIONS[0])!
    state = abrahamPleads.step(state, [{ kind: 'choose', option: wrong.id }], ctx, () => {})
    expect(state.asked).toBe(0)
    expect(abrahamPleads.view(state, ctx).choice?.feedback?.text).toBe('Abraham asked for fewer each time.')
  })

  it('in gentle mode, makes the next plea glow', () => {
    const ctx = context(true)
    expect(abrahamPleads.view(abrahamPleads.start(ctx), ctx).choice?.glow).toBe(PLEA_OPTIONS[0])
  })

  it('plays through Episode 8, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode8, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: PLEA_OPTIONS[choice.trail?.length ?? 0]! })
        },
      })
      expect(comparisons).toHaveLength(episode8.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
