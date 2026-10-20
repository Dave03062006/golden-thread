import { describe, expect, it } from 'vitest'
import { BABIES, SONS, episode5 } from '../../content/levels/04-isaac-and-jacob/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { theSonsNames } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 3)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The sons’ names"', () => {
  it('names each son in turn from his mother’s words, lighting his light and saying what it means', () => {
    const ctx = context(false)
    let state = theSonsNames.start(ctx)
    const meanings: string[] = []
    const cues: { to: { pose?: string } }[] = []
    for (const s of SONS) {
      for (let t = 0; t < 2.6; t += STEP) {
        state = theSonsNames.step(state, t < STEP ? [{ kind: 'choose', option: s.name }] : [], ctx, (c) => cues.push(c))
        const feedback = theSonsNames.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) meanings.push(feedback.text)
      }
    }
    for (let t = 0; t < 1; t += STEP) state = theSonsNames.step(state, [], ctx, () => {})
    const view = theSonsNames.view(state, ctx)
    expect(meanings).toEqual(SONS.map((s) => s.meaning))
    expect(view.live[`actor:${BABIES[3]!.light}.opacity`]).toBe(0.8)
    expect(view.live[`actor:${BABIES[4]!.id}.opacity`]).toBe(1)
    expect(cues.map((c) => c.to.pose)).toEqual(['carry'])
    expect(view.done).toBe(true)
  })

  it('answers another name gently, and asks again', () => {
    const ctx = context(false)
    let state = theSonsNames.start(ctx)
    state = theSonsNames.step(state, [{ kind: 'choose', option: 'Judah' }], ctx, () => {})
    const choice = theSonsNames.view(state, ctx).choice!
    expect(state.given).toBe(0)
    expect(choice.feedback?.right).toBe(false)
    expect(choice.question).toContain(SONS[0]!.words)
  })

  it('keeps Joseph hidden until his turn, and in gentle mode makes the right name glow', () => {
    const ctx = context(true)
    const view = theSonsNames.view(theSonsNames.start(ctx), ctx)
    expect(view.live[`actor:${BABIES[4]!.id}.opacity`]).toBe(0)
    expect(view.choice?.glow).toBe('Reuben')
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: SONS[choice.trail?.length ?? 0]!.name })
        },
      })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
