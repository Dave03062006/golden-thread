import type { Question } from '../quiz/types'
import type { SceneDescription, StoryScene } from '../scene/types'

/**
 * The shape of the game's content: levels, episodes, golden threads and the "Where and
 * when" notes (spec §13.3). Content is plain data, written once and drawn by both styles.
 * Bible references are written like "GEN 1:3" or "JHN 1:1-3" (see bible/books.ts).
 */

/** A connection from an Old Testament moment to Christ (spec §3.2, step 4). */
export interface GoldenThread {
  id: string
  /** The episode where the player finds it. */
  episode: string
  /** In a few words: this → that. */
  title: string
  /** The Old Testament side: the verse or verses in the story. */
  from: string[]
  /** The New Testament side. */
  to: string[]
  /** What the connection shows, in our own words. */
  explanation: string
  /** Where the connection comes from: Scripture, the Catechism, the Church Fathers. */
  sources: string[]
}

/** A place on the map (spec §13.3). Coordinates are latitude and longitude. */
export interface Place {
  id: string
  name: string
  kind: 'region' | 'river' | 'city' | 'mountain'
  /** Where it is, if it can be located. A river is a line of points from source to mouth. */
  at?: { lat: number; lon: number }
  course?: { lat: number; lon: number }[]
  /** For places the Bible names but nobody can find today. */
  unknown?: true
  note?: string
}

/** The "Where and when" card (spec §3.2, step 2). */
export interface WhereWhen {
  places: string[]
  /** The approximate date, marked honestly when it's uncertain or debated. */
  when: string
  notes: { title: string; text: string }[]
}

export interface Episode {
  id: string
  number: number
  title: string
  /** The Bible passage it tells. */
  passage: string
  /** About how long it takes, in minutes. */
  minutes: number
  /** Shown before the episode starts, for intense stories (spec §6). */
  contentNote?: string
  /** The world the episode's scenes play in. */
  set: SceneDescription
  /** Every scene is a checkpoint. Empty for episodes not built yet. */
  scenes: StoryScene[]
  /** The golden thread, and the actor in the set that glows where it can be found. */
  thread: { id: string; spot: string; fromScene: string }
  whereWhen: WhereWhen
  /** "Read it in your Bible": the passages to read. */
  read: string[]
}

/**
 * A level's free sacred music (spec §11.5): pieces for each part of the level, by track id
 * (see music/catalog.ts), and the moments a story lands on.
 */
export interface LevelMusic {
  /** Under the story, in the order they play on. A scene can ask for one by name. */
  story: string[]
  /** Livelier, for minigames. */
  minigame: string[]
  /** Calm, for reflection and prayer. */
  reflection: string[]
  /** Light, for the quiz. */
  quiz: string[]
  /** Story events (`music:<name>`) that land a moment of a piece. */
  cues: Record<string, { track: string; cue: string }>
}

export interface Level {
  id: string
  number: number
  title: string
  /** The Age it belongs to, like "I · The Beginning". */
  age: string
  passage: string
  episodes: Episode[]
  music: LevelMusic
  /** The quiz bank: at least 40 questions, every episode with some (spec §5). */
  quiz: Question[]
  /** The end of the level's reflection and prayer (spec §3.3). */
  reflection: Reflection
}

/** A quiet moment at the end of a level: a verse, a question for one's own life, a prayer. */
export interface Reflection {
  /** The verse to ponder. */
  verse: string
  question: string
  /** An original prayer, a line at a time. */
  prayer: string[]
  /** A traditional prayer that follows it, like the Glory Be. */
  traditional?: { name: string; lines: string[] }
}
