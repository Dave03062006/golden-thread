import { describe, expect, it } from 'vitest'
import { NAMES, episode6 } from '../../content/levels/03-abraham-father-of-faith/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { newNames } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"New names"', () => {
  it('gives each name in turn, lighting it and saying what it means', () => {
    const ctx = context(false)
    let state = newNames.start(ctx)
    const meanings: string[] = []
    for (const n of NAMES) {
      for (let t = 0; t < 3; t += STEP) {
        state = newNames.step(state, t < STEP ? [{ kind: 'choose', option: n.answer }] : [], ctx, () => {})
        const feedback = newNames.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) meanings.push(feedback.text)
      }
    }
    const view = newNames.view(state, ctx)
    expect(meanings).toEqual(NAMES.map((n) => n.meaning))
    expect(view.live['actor:name-light-3.opacity']).toBe(0.8)
    expect(view.done).toBe(true)
  })

  it('answers another name gently, and asks again', () => {
    const ctx = context(false)
    let state = newNames.start(ctx)
    state = newNames.step(state, [{ kind: 'choose', option: 'Israel' }], ctx, () => {})
    const choice = newNames.view(state, ctx).choice!
    expect(state.given).toBe(0)
    expect(choice.feedback?.right).toBe(false)
    expect(choice.options.map((o) => o.text)).toContain('Abraham')
  })

  it('in gentle mode, makes the right name glow', () => {
    const ctx = context(true)
    expect(newNames.view(newNames.start(ctx), ctx).choice?.glow).toBe('Abraham')
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: NAMES[choice.trail?.length ?? 0]!.answer })
        },
      })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
