/**
 * Quiz questions (spec §5, §13.9). Seven types, each holding what's asked, the answers,
 * and what's shown afterwards: a short explanation and the passage to read. The player is
 * never timed and never fails; the quiz teaches as it asks.
 *
 * Every question belongs to one episode, which lets a run spread across the level.
 */

interface QuestionBase {
  id: string
  /** The episode it's about, like "l01-e3". */
  episode: string
  /** Shown after it's answered, right or wrong. */
  explanation?: string
  /** The passage to read, like "GEN 3:1" or "GEN 2:16-17; GEN 3:1". */
  ref: string
}

/** Pick one answer. The first of `options` is the right one; runs shuffle them. */
export interface MultipleChoice extends QuestionBase {
  type: 'mc'
  prompt: string
  options: string[]
}

export interface TrueOrFalse extends QuestionBase {
  type: 'tf'
  statement: string
  answer: boolean
}

/** Who said these words? The first of `options` is the speaker. */
export interface WhoSaidIt extends QuestionBase {
  type: 'who'
  quote: string
  options: string[]
}

/** Put these in order. `items` is the right order; runs shuffle them. */
export interface PutInOrder extends QuestionBase {
  type: 'order'
  prompt: string
  items: string[]
}

/** Tap the place on the map: `answer` is the region (or regions) that fit, among `targets`. */
export interface WhereOnTheMap extends QuestionBase {
  type: 'where'
  prompt: string
  /** The map's regions the player may tap (see map/core/regions.ts). */
  targets: string[]
  answer: string[]
}

/**
 * Finish the verse. `text` marks each blank with ___; for each blank, the first of its
 * words is the right one.
 */
export interface FinishTheVerse extends QuestionBase {
  type: 'finish'
  text: string
  blanks: string[][]
}

/** Match the golden thread: this moment points to which? The first of `options` fits. */
export interface MatchTheThread extends QuestionBase {
  type: 'thread'
  /** The Old Testament side. */
  from: string
  options: string[]
}

export type Question = MultipleChoice | TrueOrFalse | WhoSaidIt | PutInOrder | WhereOnTheMap | FinishTheVerse | MatchTheThread

export type QuestionType = Question['type']

export const QUESTION_TYPES: Record<QuestionType, string> = {
  mc: 'Multiple choice',
  tf: 'True or false',
  who: 'Who said it?',
  order: 'Put in order',
  where: 'Where did it happen?',
  finish: 'Finish the verse',
  thread: 'Match the golden thread',
}

/**
 * The player's answer, by type: the option's text (multiple choice, who, thread), true or
 * false, the items in the order given, the regions tapped, or the word chosen for each blank.
 */
export type Answer = string | boolean | string[]
