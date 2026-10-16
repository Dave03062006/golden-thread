import { describe, expect, it } from 'vitest'
import { verseText, type TranslationId } from '../../content/bible/verses'
import { episode3 } from '../../content/levels/01-creation-and-fall/episode-3'
import type { SceneFrame } from '../../scene/evaluate'
import type { GameContext, GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { twist } from '.'
import { TWISTS, TWIST_LINES } from './passages'

const context = (gentle: boolean): GameContext => ({ gentle, frame: () => ({}) as SceneFrame })

/** Plays the rules with one batch of inputs per step. */
function play(gentle: boolean, ...steps: GameInput[][]) {
  const ctx = context(gentle)
  let state = twist.start(ctx)
  for (const inputs of steps) state = twist.step(state, inputs, ctx, () => {})
  return twist.view(state, ctx)
}

const tap = (option: string): GameInput[] => [{ kind: 'choose', option }]
const space: GameInput[] = [{ kind: 'key', key: 'primary', down: true }]

describe('"Spot the twist"', () => {
  it.each(['rsv', 'dra'] as TranslationId[])('quotes the exact words of each verse in the %s', (translation) => {
    for (const line of TWIST_LINES[translation]) {
      const words = line.parts.map((p) => p.text).join('')
      expect(verseText(line.ref, translation), `${line.speaker}, ${line.ref}`).toContain(words)
    }
  })

  it.each(['rsv', 'dra'] as TranslationId[])('has all four twists to find in the %s', (translation) => {
    const twists = TWIST_LINES[translation].flatMap((l) => l.parts.filter((p) => p.kind === 'twist').map((p) => p.id))
    expect(twists.sort()).toEqual(Object.keys(TWISTS).sort())
  })

  it('explains each twist as it is found', () => {
    const view = play(false, tap('touch'))
    expect(view.compare?.found).toEqual(['touch'])
    expect(view.compare?.note).toEqual({ right: true, text: TWISTS.touch!.explanation })
  })

  it('answers words that are true to God’s with a gentle "not that", and counts nothing', () => {
    const view = play(false, tap('we-may-eat'))
    expect(view.compare?.found).toEqual([])
    expect(view.compare?.note?.right).toBe(false)
  })

  it('finishes only when all four are found and the player moves on', () => {
    const all = Object.keys(TWISTS).map(tap)
    expect(play(false, space).done).toBe(false)
    expect(play(false, ...all.slice(0, 3), space).done).toBe(false)
    const found = play(false, ...all)
    expect(found.compare?.finished).toBe(true)
    expect(found.done).toBe(false)
    expect(play(false, ...all, space).done).toBe(true)
  })

  it('counts a twist found twice only once', () => {
    expect(play(false, tap('not-die'), tap('not-die')).compare?.found).toEqual(['not-die'])
  })

  it('underlines the twists faintly in gentle mode only', () => {
    expect(play(true).compare?.showTwists).toBe(true)
    expect(play(false).compare?.showTwists).toBe(false)
  })

  it('keeps the same view while nothing changes', () => {
    expect(play(false, tap('touch'), []).compare).toBe(play(false, tap('touch')).compare)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      // A word that's true, then each twist a second apart, then Continue.
      const taps = ['we-may-eat', ...Object.keys(TWISTS)]
      let tapped = 0
      const comparisons = playThrough(episode3, {
        gentle,
        player(runner, seconds) {
          if (tapped < taps.length && seconds >= tapped + 1) runner.queue({ kind: 'choose', option: taps[tapped++]! })
          if (runner.view.compare?.finished) runner.queue({ kind: 'key', key: 'primary', down: true })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
