import { createRng } from '../engine/random'
import type { QuizRecord, QuizRun } from '../engine/save/types'
import type { Answer, Question, QuestionType } from './types'

/**
 * The quiz engine (spec §5, §13.9): which questions a run asks, in what order the answers
 * appear, whether an answer is right, and what a run leaves in the save.
 *
 * - Ten questions a run, at random and never twice in one run.
 * - Missed questions weigh more until they're answered right; ones asked in the last two
 *   runs weigh less. The same set never comes twice in a row.
 * - Questions spread across the episodes (and, for "Everything so far", the levels), with
 *   at most three of one type.
 * - Everything random comes from the run's seed, and each question's answer order from the
 *   seed and its id, so a stored run can be shown again exactly.
 */

export const RUN_LENGTH = 10
const MAX_OF_A_TYPE = 3
/** How many recent runs make a question count as "seen lately". */
const RECENT_RUNS = 2
/** How many runs a record keeps, newest last. */
const KEPT_RUNS = 12

/** A question as one run asks it: its answers in this run's order. */
export interface AskedQuestion {
  question: Question
  /** Multiple choice, who said it, match the thread: the options, shuffled. */
  options?: string[]
  /** Put in order: the items, shuffled so they're never already in order. */
  items?: string[]
  /** Finish the verse: each blank's words, shuffled. */
  blanks?: string[][]
}

export interface Run {
  seed: number
  asked: AskedQuestion[]
}

const levelOf = (q: Question) => q.episode.split('-')[0]!

/** A number from a question's id, mixed with the seed, for its own shuffles. */
function seedFor(seed: number, id: string): number {
  let h = seed >>> 0
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x5bd1e995) >>> 0
  return h
}

/** How a question is shown in a run with this seed. The same seed and question always give the same. */
export function ask(question: Question, seed: number): AskedQuestion {
  const rng = createRng(seedFor(seed, question.id))
  switch (question.type) {
    case 'mc':
    case 'who':
    case 'thread':
      return { question, options: rng.shuffle(question.options) }
    case 'order': {
      let items = rng.shuffle(question.items)
      // Never already in the right order.
      while (items.every((item, i) => item === question.items[i])) items = rng.shuffle(question.items)
      return { question, items }
    }
    case 'finish':
      return { question, blanks: question.blanks.map((words) => rng.shuffle(words)) }
    default:
      return { question }
  }
}

/** All the questions asked lately, from the most recent runs of every record. */
function recentlyAsked(records: Record<string, QuizRecord>): Set<string> {
  const ids = new Set<string>()
  for (const record of Object.values(records)) for (const run of record.runs.slice(-RECENT_RUNS)) for (const id of run.questions ?? []) ids.add(id)
  return ids
}

/** How many times each question has been missed, gathered from every record. */
function missedCounts(records: Record<string, QuizRecord>): Map<string, number> {
  const missed = new Map<string, number>()
  for (const record of Object.values(records)) for (const [id, n] of Object.entries(record.missed)) missed.set(id, (missed.get(id) ?? 0) + n)
  return missed
}

function pickIds(bank: Question[], records: Record<string, QuizRecord>, seed: number, count: number): Question[] {
  const rng = createRng(seed)
  const recent = recentlyAsked(records)
  const missed = missedCounts(records)
  const chosen: Question[] = []
  const types = new Map<QuestionType, number>()
  const episodes = new Map<string, number>()
  const levels = new Map<string, number>()
  // No episode gets more than its fair share (two of ten, across Level 1's six episodes).
  const perEpisode = Math.ceil(count / new Set(bank.map((q) => q.episode)).size)
  while (chosen.length < Math.min(count, bank.length)) {
    let candidates = bank.filter((q) => !chosen.includes(q) && (types.get(q.type) ?? 0) < MAX_OF_A_TYPE && (episodes.get(q.episode) ?? 0) < perEpisode)
    // If the limits can't be kept (a tiny bank), let them go rather than stop short.
    if (candidates.length === 0) candidates = bank.filter((q) => !chosen.includes(q))
    const pick = rng.weighted(candidates, (q) => {
      let weight = 1 + 1.5 * (missed.get(q.id) ?? 0)
      if (recent.has(q.id)) weight *= 0.35
      weight /= 1 + (episodes.get(q.episode) ?? 0) * 1.5
      weight /= 1 + (levels.get(levelOf(q)) ?? 0) * 0.5
      return weight
    })
    chosen.push(pick)
    types.set(pick.type, (types.get(pick.type) ?? 0) + 1)
    episodes.set(pick.episode, (episodes.get(pick.episode) ?? 0) + 1)
    levels.set(levelOf(pick), (levels.get(levelOf(pick)) ?? 0) + 1)
  }
  return chosen
}

/**
 * A new run over `bank`, given what the save remembers (`records`, every quiz record) and
 * the record for this quiz (`scope`), so its last run isn't repeated.
 */
export function newRun(bank: Question[], records: Record<string, QuizRecord>, scope: string, seed: number, count = RUN_LENGTH): Run {
  const last = records[scope]?.runs.at(-1)?.questions
  const sameSet = (qs: Question[]) => !!last && qs.length === last.length && qs.every((q) => last.includes(q.id))
  let attempt = seed
  let questions = pickIds(bank, records, attempt, count)
  // The same set never comes twice in a row (if the bank is big enough to avoid it).
  for (let tries = 0; sameSet(questions) && tries < 8; tries++) questions = pickIds(bank, records, (attempt = (attempt + 0x9e3779b9) >>> 0), count)
  return { seed: attempt, asked: questions.map((q) => ask(q, attempt)) }
}

/** Shows a stored run again, exactly as it was asked. */
export function replayRun(bank: Question[], run: QuizRun): Run | null {
  if (!run.questions) return null
  const asked = run.questions.map((id) => bank.find((q) => q.id === id))
  if (asked.some((q) => !q)) return null
  return { seed: run.seed, asked: (asked as Question[]).map((q) => ask(q, run.seed)) }
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x))

/** Whether an answer is right. */
export function isRight(question: Question, answer: Answer | undefined): boolean {
  if (answer === undefined) return false
  switch (question.type) {
    case 'mc':
    case 'who':
    case 'thread':
      return answer === question.options[0]
    case 'tf':
      return answer === question.answer
    case 'order':
      return Array.isArray(answer) && answer.length === question.items.length && answer.every((item, i) => item === question.items[i])
    case 'where':
      return Array.isArray(answer) && sameSet(answer, question.answer)
    case 'finish':
      return Array.isArray(answer) && answer.length === question.blanks.length && answer.every((word, i) => word === question.blanks[i]![0])
  }
}

/** The right answer, as words to show after a question is answered. */
export function rightAnswer(question: Question, regionName: (id: string) => string = (id) => id): string {
  switch (question.type) {
    case 'mc':
    case 'who':
    case 'thread':
      return question.options[0]!
    case 'tf':
      return question.answer ? 'True' : 'False'
    case 'order':
      return question.items.join(' → ')
    case 'where':
      return question.answer.map(regionName).join(' and ')
    case 'finish': {
      let i = 0
      return question.text.replace(/___/g, () => question.blanks[i++]![0]!)
    }
  }
}

/** Stars for a score: 1 to 3, never fewer than 1 (spec §5: no failing). */
export function starsFor(score: number, total: number): 1 | 2 | 3 {
  const ratio = total > 0 ? score / total : 0
  return ratio >= 0.85 ? 3 : ratio >= 0.55 ? 2 : 1
}

/**
 * What a finished run leaves in the save: the run (its seed, questions and answers) and the
 * best score in this quiz's record, and in each question's own level record, which
 * questions were missed (they come back more often until answered right).
 */
export function recordRun(records: Record<string, QuizRecord>, scope: string, run: Run, answers: (Answer | undefined)[], at: string): Record<string, QuizRecord> {
  const next: Record<string, QuizRecord> = {}
  for (const [key, record] of Object.entries(records)) next[key] = { ...record, runs: [...record.runs], missed: { ...record.missed } }
  const empty = (): QuizRecord => ({ best: 0, runs: [], missed: {} })
  const score = run.asked.filter((a, i) => isRight(a.question, answers[i])).length
  const record = (next[scope] ??= empty())
  record.best = Math.max(record.best, score)
  record.runs = [...record.runs, { seed: run.seed, score, at, total: run.asked.length, questions: run.asked.map((a) => a.question.id), answers: answers.map((a) => a ?? null) }].slice(-KEPT_RUNS)
  run.asked.forEach((a, i) => {
    const level = (next[levelOf(a.question)] ??= empty())
    if (isRight(a.question, answers[i])) delete level.missed[a.question.id]
    else level.missed[a.question.id] = (level.missed[a.question.id] ?? 0) + 1
  })
  return next
}
