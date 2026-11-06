import { describe, expect, it } from 'vitest'
import { verseText, type TranslationId } from '../../content/bible/verses'
import { episode4 } from '../../content/levels/10-sinai/episode-4'
import type { SceneFrame } from '../../scene/evaluate'
import type { GameContext, GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theCalf } from '.'
import { CALF_LINES, TWISTS } from './passages'

const context = (gentle: boolean): GameContext => ({ gentle, frame: () => ({}) as SceneFrame })

/** Plays the rules with one batch of inputs per step. */
function play(gentle: boolean, ...steps: GameInput[][]) {
  const ctx = context(gentle)
  let state = theCalf.start(ctx)
  for (const inputs of steps) state = theCalf.step(state, inputs, ctx, () => {})
  return theCalf.view(state, ctx)
}

const tap = (option: string): GameInput[] => [{ kind: 'choose', option }]
const space: GameInput[] = [{ kind: 'key', key: 'primary', down: true }]

describe('"The true words and the twisted"', () => {
  it.each(['rsv', 'dra'] as TranslationId[])('quotes the exact words of each verse in the %s', (translation) => {
    for (const line of CALF_LINES[translation]) {
      const words = line.parts.map((p) => p.text).join('')
      expect(verseText(line.ref, translation), `${line.speaker}, ${line.ref}`).toContain(words)
    }
  })

  it.each(['rsv', 'dra'] as TranslationId[])('has all three twists to find in the %s', (translation) => {
    const twists = CALF_LINES[translation].flatMap((l) => l.parts.filter((p) => p.kind === 'twist').map((p) => p.id))
    expect(twists.sort()).toEqual(Object.keys(TWISTS).sort())
  })

  it('explains each twist as it is found, and answers other words with a gentle "not that"', () => {
    const found = play(false, tap('your-gods'))
    expect(found.compare?.found).toEqual(['your-gods'])
    expect(found.compare?.note).toEqual({ right: true, text: TWISTS['your-gods']!.explanation })
    expect(play(false, tap('o-israel')).compare?.note?.right).toBe(false)
  })

  it('finishes only when all three are found and the player moves on', () => {
    const all = Object.keys(TWISTS).map(tap)
    expect(play(false, ...all.slice(0, 2), space).done).toBe(false)
    expect(play(false, ...all).compare?.finished).toBe(true)
    expect(play(false, ...all, space).done).toBe(true)
  })

  it('underlines the twists faintly in gentle mode only', () => {
    expect(play(true).compare?.showTwists).toBe(true)
    expect(play(false).compare?.showTwists).toBe(false)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const taps = ['o-israel', ...Object.keys(TWISTS)]
      let tapped = 0
      const comparisons = playThrough(episode4, {
        gentle,
        player(runner, seconds) {
          if (tapped < taps.length && seconds >= tapped + 1) runner.queue({ kind: 'choose', option: taps[tapped++]! })
          if (runner.view.compare?.finished) runner.queue({ kind: 'key', key: 'primary', down: true })
        },
      })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
