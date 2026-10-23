import { describe, expect, it } from 'vitest'
import { ASKED, MEANINGS, episode6 } from '../../content/levels/08-the-plagues-and-the-passover/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, whenYourChildrenAsk } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"When your children ask"', () => {
  it('answers the child about each thing on the table, pointing to each in turn', () => {
    const ctx = context(false)
    let state = whenYourChildrenAsk.start(ctx)
    const told: string[] = []
    const pointed: number[] = []
    for (const a of ASKED) {
      pointed.push(whenYourChildrenAsk.view(state, ctx).live['actor:asking.x']!)
      for (let t = 0; t < SHOW + 0.1; t += STEP) {
        state = whenYourChildrenAsk.step(state, t < STEP ? [{ kind: 'choose', option: a.answer }] : [], ctx, () => {})
        const feedback = whenYourChildrenAsk.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) told.push(feedback.text)
      }
    }
    for (let t = 0; t < 1; t += STEP) state = whenYourChildrenAsk.step(state, [], ctx, () => {})
    expect(told).toEqual(ASKED.map((a) => MEANINGS.find((m) => m.id === a.answer)!.text))
    expect(pointed).toEqual(ASKED.map((a) => a.x))
    expect(whenYourChildrenAsk.view(state, ctx).done).toBe(true)
  })

  it('asks again after a wrong answer, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = whenYourChildrenAsk.step(whenYourChildrenAsk.start(ctx), [{ kind: 'choose', option: 'bitter' }], ctx, () => {})
    expect(state.answered).toBe(0)
    expect(whenYourChildrenAsk.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(whenYourChildrenAsk.view(whenYourChildrenAsk.start(gentle), gentle).choice?.glow).toBe('passed-over')
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: ASKED[choice.trail?.length ?? 0]!.answer })
        },
      })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
