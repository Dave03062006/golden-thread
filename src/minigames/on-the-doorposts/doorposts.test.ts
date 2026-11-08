import { describe, expect, it } from 'vitest'
import { MEZUZAH, WORDS, episode2 } from '../../content/levels/13-moses-last-words/episode-2'
import { verseText } from '../../content/bible/verses'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { SHOW } from '../in-order'
import { playThrough } from '../playthrough'
import { onTheDoorposts } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"On the doorposts"', () => {
  it('asks only for words of Deuteronomy 6:4–5, in the order they come', () => {
    const verses = `${verseText('DEU 6:4')} ${verseText('DEU 6:5')}`
    let from = 0
    for (const w of WORDS) {
      const at = verses.indexOf(w.word, from)
      expect(at).toBeGreaterThanOrEqual(from)
      from = at + w.word.length
    }
  })

  it('carves each word chosen in order, then sets the mezuzah on the doorpost', () => {
    const ctx = context(false)
    let state = onTheDoorposts.start(ctx)
    for (const w of WORDS) for (let t = 0; t < SHOW + 0.1; t += STEP) state = onTheDoorposts.step(state, t < STEP ? [{ kind: 'choose', option: w.word }] : [], ctx, () => {})
    for (let t = 0; t < 1; t += STEP) state = onTheDoorposts.step(state, [], ctx, () => {})
    const view = onTheDoorposts.view(state, ctx)
    for (const w of WORDS) expect(view.live[`actor:${w.id}.opacity`]).toBe(1)
    expect(view.live[`actor:${MEZUZAH}.opacity`]).toBe(1)
    expect(view.done).toBe(true)
  })

  it('says "not quite" to a word out of order, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = onTheDoorposts.step(onTheDoorposts.start(ctx), [{ kind: 'choose', option: 'love' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(onTheDoorposts.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(onTheDoorposts.view(onTheDoorposts.start(gentle), gentle).choice?.glow).toBe('Hear')
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: WORDS[choice.trail?.length ?? 0]!.word })
        },
      })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
