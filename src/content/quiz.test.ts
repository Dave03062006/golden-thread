import { describe, expect, it } from 'vitest'
import { mapRegion } from '../map/core/regions'
import { parseReference } from './bible/books'
import { LEVELS } from './catalog'
import { verseText } from './bible/verses'

/** Every level's quiz bank holds together (spec §5): enough questions, spread, and each one answerable. */
describe.each(LEVELS.map((l) => [l.id, l] as const))('%s quiz', (_id, level) => {
  const bank = level.quiz

  it('has at least 40 questions, every episode with some', () => {
    expect(bank.length).toBeGreaterThanOrEqual(40)
    const thin = level.episodes.filter((e) => bank.filter((q) => q.episode === e.id).length < 6).map((e) => e.id)
    expect(thin).toEqual([])
  })

  it('gives every question its own id, from this level', () => {
    expect(new Set(bank.map((q) => q.id)).size).toBe(bank.length)
    expect(bank.filter((q) => !level.episodes.some((e) => e.id === q.episode)).map((q) => q.id)).toEqual([])
  })

  it('uses every one of the seven question types', () => {
    expect(new Set(bank.map((q) => q.type))).toEqual(new Set(['mc', 'tf', 'who', 'order', 'where', 'finish', 'thread']))
  })

  it('points every question to real passages', () => {
    const refs = bank.flatMap((q) => q.ref.split(';').map((r) => r.trim()))
    expect(refs.filter((r) => !parseReference(r))).toEqual([])
  })

  it('makes every question answerable, with distinct choices', () => {
    const problems: string[] = []
    const distinct = (id: string, what: string, items: string[]) => new Set(items).size !== items.length && problems.push(`${id}: repeated ${what}`)
    for (const q of bank) {
      if (q.type === 'mc' || q.type === 'who' || q.type === 'thread') {
        if (q.options.length < 3) problems.push(`${q.id}: fewer than 3 options`)
        distinct(q.id, 'options', q.options)
      } else if (q.type === 'order') {
        if (q.items.length < 3) problems.push(`${q.id}: fewer than 3 items`)
        distinct(q.id, 'items', q.items)
      } else if (q.type === 'where') {
        for (const t of q.targets) if (!mapRegion(t)) problems.push(`${q.id}: no map place ${t}`)
        for (const a of q.answer) if (!q.targets.includes(a)) problems.push(`${q.id}: answer ${a} isn't offered`)
        if (q.targets.length <= q.answer.length) problems.push(`${q.id}: nothing wrong to choose`)
      } else if (q.type === 'finish') {
        if (q.text.split('___').length - 1 !== q.blanks.length) problems.push(`${q.id}: blanks don't match`)
        q.blanks.forEach((words) => distinct(q.id, 'words', words))
      }
    }
    expect(problems).toEqual([])
  })

  it('quotes Scripture word for word where it finishes a verse', () => {
    // The verse, with the right words in its blanks, appears in the passage as the game quotes it.
    const wrong: string[] = []
    for (const q of bank) {
      if (q.type !== 'finish') continue
      let i = 0
      const filled = q.text.replace(/___/g, () => q.blanks[i++]![0]!)
      const ref = q.ref.split(';')[0]!.trim()
      // (An ellipsis marks where the quote starts or stops partway through the verse.)
      const words = filled.replace(/[“”]/g, '').replace(/^…|…$/g, '')
      if (!verseText(ref).replace(/[“”]/g, '').includes(words)) wrong.push(q.id)
    }
    expect(wrong).toEqual([])
  })
})
