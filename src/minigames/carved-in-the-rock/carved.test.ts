import { describe, expect, it } from 'vitest'
import { verseText } from '../../content/bible/verses'
import { FAINT, LINES, REDEEMER, episode4 } from '../../content/levels/06-job/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { carvedInTheRock } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const wait = (state: ReturnType<typeof carvedInTheRock.start>, seconds: number, ctx: GameContext) => {
  for (let t = 0; t < seconds; t += STEP) state = carvedInTheRock.step(state, [], ctx, () => {})
  return state
}

describe('"Carved in the rock"', () => {
  it('quotes Job 19:25 word for word', () => {
    expect(verseText('JOB 19:25')).toBe(REDEEMER.text)
    for (const word of [...REDEEMER.missing]) expect(REDEEMER.text).toContain(word)
  })

  it('shows the whole verse, fades its words, then carves each back in order', () => {
    const ctx = context(false)
    let state = carvedInTheRock.start(ctx)
    expect(carvedInTheRock.view(state, ctx).message?.text).toBe(REDEEMER.text)
    state = wait(state, 4.2, ctx)
    let view = carvedInTheRock.view(state, ctx)
    expect(view.choice?.question).toBe('For I know that my ___ ___, and at last he will ___ upon the ___; Which word comes next?')
    for (const l of LINES) expect(view.live[`actor:${l.id}.opacity`]).toBeCloseTo(FAINT)
    for (const word of REDEEMER.missing) {
      state = carvedInTheRock.step(state, [{ kind: 'choose', option: word }], ctx, () => {})
      state = wait(state, 1.5, ctx)
    }
    state = wait(state, 1.5, ctx)
    view = carvedInTheRock.view(state, ctx)
    expect(view.choice?.question).toBe(REDEEMER.text)
    for (const l of LINES) expect(view.live[`actor:${l.id}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('answers a wrong word gently, and asks again', () => {
    const ctx = context(false)
    let state = wait(carvedInTheRock.start(ctx), 4.2, ctx)
    state = carvedInTheRock.step(state, [{ kind: 'choose', option: 'brother' }], ctx, () => {})
    expect(state.found).toBe(0)
    expect(carvedInTheRock.view(state, ctx).choice?.feedback?.text).toBe('Not “brother”. Listen to Job again.')
  })

  it('in gentle mode, makes the right word glow', () => {
    const ctx = context(true)
    const state = wait(carvedInTheRock.start(ctx), 4.2, ctx)
    expect(carvedInTheRock.view(state, ctx).choice?.glow).toBe('Redeemer')
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: REDEEMER.missing[choice.trail?.length ?? 0]! })
        },
      })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
