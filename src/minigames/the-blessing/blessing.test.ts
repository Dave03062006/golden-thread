import { describe, expect, it } from 'vitest'
import { BLESSING, episode3 } from '../../content/levels/04-isaac-and-jacob/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { theBlessing } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The blessing"', () => {
  it('sets the words in the order Isaac spoke them, each shining as it is set', () => {
    const ctx = context(false)
    let state = theBlessing.start(ctx)
    for (const b of BLESSING) for (let t = 0; t < 2; t += STEP) state = theBlessing.step(state, t < STEP ? [{ kind: 'choose', option: b.words }] : [], ctx, () => {})
    const view = theBlessing.view(state, ctx)
    expect(state.given).toBe(BLESSING.length)
    expect(view.choice?.trail?.map((t) => t.title)).toEqual(BLESSING.map((b) => b.words))
    expect(view.live['actor:word-6.opacity']).toBe(0.85)
    for (let t = 0; t < 1; t += STEP) state = theBlessing.step(state, [], ctx, () => {})
    expect(theBlessing.view(state, ctx).done).toBe(true)
  })

  it('offers only the words still to set, and sends words out of place back with a hint', () => {
    const ctx = context(false)
    let state = theBlessing.start(ctx)
    expect(theBlessing.view(state, ctx).choice?.options).toHaveLength(BLESSING.length)
    state = theBlessing.step(state, [{ kind: 'choose', option: 'Lord over your brothers' }], ctx, () => {})
    const choice = theBlessing.view(state, ctx).choice!
    expect(state.given).toBe(0)
    expect(choice.feedback).toEqual({ right: false, text: `Not yet. ${BLESSING[0]!.hint}` })
  })

  it('in gentle mode, makes the next words glow', () => {
    const ctx = context(true)
    expect(theBlessing.view(theBlessing.start(ctx), ctx).choice?.glow).toBe('The dew of heaven')
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: BLESSING[choice.trail?.length ?? 0]!.words })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
