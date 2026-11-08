import { describe, expect, it } from 'vitest'
import { AARON, GARMENTS, episode3 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW } from '../in-order'
import { playThrough } from '../playthrough'
import { clothedForGlory } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Clothed for glory"', () => {
  it('dresses Aaron in each garment chosen in order, showing what it means', () => {
    const ctx = context(false)
    let state = clothedForGlory.start(ctx)
    const notes: string[] = []
    for (const g of GARMENTS) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) {
        state = clothedForGlory.step(state, t < STEP ? [{ kind: 'choose', option: g.kind }] : [], ctx, () => {})
        const note = clothedForGlory.view(state, ctx).choice?.feedback
        if (note?.right && notes.at(-1) !== note.text) notes.push(note.text)
      }
    }
    expect(notes).toEqual(GARMENTS.map((g) => g.note))
    for (let t = 0; t < 1; t += STEP) state = clothedForGlory.step(state, [], ctx, () => {})
    const view = clothedForGlory.view(state, ctx)
    for (const g of GARMENTS) expect(view.live[`actor:${g.id}.opacity`]).toBe(0)
    expect(view.live[`actor:${AARON.robed}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not yet" to the golden plate first, and in gentle mode the coat glows', () => {
    const ctx = context(false)
    const state = clothedForGlory.step(clothedForGlory.start(ctx), [{ kind: 'choose', option: 'plate' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(clothedForGlory.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(clothedForGlory.view(clothedForGlory.start(gentle), gentle).choice?.glow).toBe('coat')
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: GARMENTS[choice.trail?.length ?? 0]!.kind })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
