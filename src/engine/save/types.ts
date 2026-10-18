import type { StyleId } from '../../styles/ids'

/** Bump this when the save shape changes, and add an upgrade step in `migrations.ts`. */
export const SAVE_VERSION = 1

export const SLOT_COUNT = 3
export const SLOTS = [0, 1, 2] as const
export type SlotIndex = (typeof SLOTS)[number]

/** Exactly where the player is. Every scene is a checkpoint. */
export interface Position {
  level: string
  episode: string
  scene: string
  /** Inside a minigame: its start, or its halfway checkpoint. */
  minigame?: 'start' | 'half'
}

export interface QuizRun {
  seed: number
  score: number
  at: string
  /** How many questions it asked. */
  total?: number
  /** The questions asked, in order, so "Review your answers" can show the run again exactly. */
  questions?: string[]
  /** The answers given, in the same order (null for a question left unanswered). */
  answers?: (string | boolean | string[] | null)[]
}

export interface QuizRecord {
  best: number
  runs: QuizRun[]
  /** How many times each question was missed, by question id. */
  missed: Record<string, number>
}

export interface JournalEntry {
  id: string
  level: string
  question: string
  text: string
  at: string
}

/** Everything one save file remembers (spec §4). */
export interface SaveData {
  version: number
  name: string
  createdAt: string
  lastPlayedAt: string
  playSeconds: number
  style: StyleId
  position: Position | null
  completedEpisodes: string[]
  completedLevels: string[]
  threadsFound: string[]
  quiz: Record<string, QuizRecord>
  journal: JournalEntry[]
  readMarks: string[]
  /**
   * The episodes whose cathedral panel has been set, with its animation (spec §9.1). A
   * finished episode whose panel isn't set yet is set the next time the cathedral is seen.
   */
  panelsSet: string[]
}

/** A save as it's stored: the data plus a checksum that reveals damage. */
export interface SaveEnvelope {
  data: SaveData
  checksum: string
}

export function newSave(name: string, style: StyleId, nowIso: string): SaveData {
  return {
    version: SAVE_VERSION,
    name,
    createdAt: nowIso,
    lastPlayedAt: nowIso,
    playSeconds: 0,
    style,
    position: null,
    completedEpisodes: [],
    completedLevels: [],
    threadsFound: [],
    quiz: {},
    journal: [],
    readMarks: [],
    panelsSet: [],
  }
}

export type SaveErrorCode = 'not-a-save' | 'damaged' | 'from-the-future'

export class SaveError extends Error {
  code: SaveErrorCode
  constructor(code: SaveErrorCode, message: string) {
    super(message)
    this.name = 'SaveError'
    this.code = code
  }
}
