import { describe, expect, it } from 'vitest'
import { level1Quiz } from '../content/levels/01-creation-and-fall/quiz'
import type { QuizRecord } from '../engine/save/types'
import { RUN_LENGTH, ask, isRight, newRun, recordRun, replayRun, starsFor, type Run } from './engine'
import type { Answer, Question } from './types'

const bank = level1Quiz
const ids = (run: Run) => run.asked.map((a) => a.question.id)
const count = <T>(items: T[]) => items.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<T, number>())

/** The right answer to a question as asked, in the form the player gives it. */
function rightAnswerOf(q: Question): Answer {
  switch (q.type) {
    case 'mc':
    case 'who':
    case 'thread':
      return q.options[0]!
    case 'tf':
      return q.answer
    case 'order':
      return q.items
    case 'where':
      return q.answer
    case 'finish':
      return q.blanks.map((b) => b[0]!)
  }
}

describe('the quiz engine', () => {
  it('asks ten different questions a run', () => {
    const run = newRun(bank, {}, 'l01', 1)
    expect(run.asked).toHaveLength(RUN_LENGTH)
    expect(new Set(ids(run)).size).toBe(RUN_LENGTH)
  })

  it('gives different runs for different seeds', () => {
    const sets = new Set(Array.from({ length: 20 }, (_, seed) => ids(newRun(bank, {}, 'l01', seed)).sort().join()))
    expect(sets.size).toBeGreaterThan(15)
  })

  it('asks at most three questions of one type, and spreads them across the episodes', () => {
    for (let seed = 0; seed < 200; seed++) {
      const run = newRun(bank, {}, 'l01', seed)
      expect(Math.max(...count(run.asked.map((a) => a.question.type)).values())).toBeLessThanOrEqual(3)
      const episodes = count(run.asked.map((a) => a.question.episode))
      expect(episodes.size, `seed ${seed}`).toBeGreaterThanOrEqual(5)
      expect(Math.max(...episodes.values())).toBeLessThanOrEqual(2)
    }
  })

  it('brings missed questions back more often, and recent ones less', () => {
    const missed = ['l01-q05', 'l01-q17', 'l01-q41']
    const records: Record<string, QuizRecord> = { l01: { best: 0, runs: [], missed: Object.fromEntries(missed.map((id) => [id, 2])) } }
    const recent = ['l01-q01', 'l01-q11', 'l01-q21']
    const lately: Record<string, QuizRecord> = { l01: { best: 0, runs: [{ seed: 0, score: 0, at: '', questions: recent }], missed: {} } }
    let withMissed = 0
    let plain = 0
    let withRecent = 0
    for (let seed = 0; seed < 400; seed++) {
      withMissed += ids(newRun(bank, records, 'l01', seed)).filter((id) => missed.includes(id)).length
      plain += ids(newRun(bank, {}, 'l01', seed)).filter((id) => missed.includes(id)).length
      withRecent += ids(newRun(bank, lately, 'l01', seed)).filter((id) => recent.includes(id)).length
    }
    expect(withMissed).toBeGreaterThan(plain * 2)
    const plainRecent = Array.from({ length: 400 }, (_, seed) => ids(newRun(bank, {}, 'l01', seed)).filter((id) => recent.includes(id)).length).reduce((a, b) => a + b)
    expect(withRecent).toBeLessThan(plainRecent * 0.6)
  })

  it('never asks the same set twice in a row', () => {
    let records: Record<string, QuizRecord> = {}
    let last: string[] = []
    for (let seed = 0; seed < 30; seed++) {
      const run = newRun(bank.slice(0, 12), records, 'l01', seed)
      expect(ids(run).sort()).not.toEqual(last)
      last = ids(run).sort()
      records = recordRun(records, 'l01', run, run.asked.map((a) => rightAnswerOf(a.question)), '')
    }
  })

  it('shows a stored run again exactly, answers in the same order', () => {
    const run = newRun(bank, {}, 'l01', 77)
    const records = recordRun({}, 'l01', run, [], 'now')
    expect(replayRun(bank, records.l01!.runs[0]!)).toEqual(run)
  })

  it('never shows the items to put in order already in order', () => {
    const order = bank.filter((q) => q.type === 'order')
    for (const q of order) for (let seed = 0; seed < 50; seed++) expect(ask(q, seed).items).not.toEqual(q.type === 'order' ? q.items : [])
  })

  it('marks each type of answer right or wrong', () => {
    for (const q of bank) {
      expect(isRight(q, rightAnswerOf(q))).toBe(true)
      expect(isRight(q, undefined)).toBe(false)
    }
    const order = bank.find((q) => q.type === 'order')!
    expect(isRight(order, order.type === 'order' ? [...order.items].reverse() : [])).toBe(false)
    const where = bank.find((q) => q.id === 'l01-q14')!
    expect(isRight(where, ['euphrates', 'tigris'])).toBe(true)
    expect(isRight(where, ['tigris'])).toBe(false)
  })

  it('keeps the best score, the run, and which questions were missed until answered right', () => {
    const run = newRun(bank, {}, 'l01', 5)
    const answers: (Answer | undefined)[] = run.asked.map((a, i) => (i < 7 ? rightAnswerOf(a.question) : undefined))
    let records = recordRun({}, 'l01', run, answers, 'then')
    expect(records.l01!.best).toBe(7)
    expect(Object.keys(records.l01!.missed).sort()).toEqual(ids(run).slice(7).sort())
    // Answering the missed ones right clears them; a worse score keeps the best.
    const again: Run = { seed: 9, asked: run.asked.slice(7) }
    records = recordRun(records, 'l01', again, again.asked.map((a) => rightAnswerOf(a.question)), 'now')
    expect(records.l01!.missed).toEqual({})
    expect(records.l01!.best).toBe(7)
    expect(records.l01!.runs).toHaveLength(2)
  })

  it('gives 1 to 3 stars, never none', () => {
    expect(starsFor(0, 10)).toBe(1)
    expect(starsFor(6, 10)).toBe(2)
    expect(starsFor(9, 10)).toBe(3)
  })
})
