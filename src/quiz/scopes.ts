import { LEVELS } from '../content/catalog'
import type { Level } from '../content/types'
import type { SaveData } from '../engine/save/types'
import type { Question } from './types'

/**
 * What a quiz run draws from (spec §5): one level, a whole Age, or "Everything so far",
 * a mix from every finished level. Each has its own record in the save, by id.
 */
export interface QuizScope {
  id: string
  title: string
  bank: Question[]
}

export const EVERYTHING = 'all'

/** A level counts as finished once all its episodes are, or its end has been reached. */
export function finishedLevels(save: Pick<SaveData, 'completedLevels' | 'completedEpisodes'>): Level[] {
  return LEVELS.filter((level) => save.completedLevels.includes(level.id) || level.episodes.every((e) => save.completedEpisodes.includes(e.id)))
}

export const levelTitle = (level: Level) => `Level ${level.number} · ${level.title}`

export function levelScope(level: Level): QuizScope {
  return { id: level.id, title: levelTitle(level), bank: level.quiz }
}

/** The finished levels of each Age, by the Age's name. */
export function agesOf(levels: Level[]): Map<string, Level[]> {
  const ages = new Map<string, Level[]>()
  for (const level of levels) ages.set(level.age, [...(ages.get(level.age) ?? []), level])
  return ages
}

export function ageScope(age: string, levels: Level[]): QuizScope {
  return { id: `age:${age}`, title: `Age ${age}`, bank: levels.flatMap((l) => l.quiz) }
}

export function everythingScope(levels: Level[]): QuizScope {
  return { id: EVERYTHING, title: 'Everything so far', bank: levels.flatMap((l) => l.quiz) }
}

/** The scope with this id, drawing only from finished levels; none if nothing in it is finished yet. */
export function scopeById(id: string, finished: Level[]): QuizScope | null {
  if (id === EVERYTHING) return finished.length ? everythingScope(finished) : null
  if (id.startsWith('age:')) {
    const age = id.slice(4)
    const levels = finished.filter((l) => l.age === age)
    return levels.length ? ageScope(age, levels) : null
  }
  const level = finished.find((l) => l.id === id)
  return level ? levelScope(level) : null
}

/** Every question of every level, to find a stored run's questions again. */
export const ALL_QUESTIONS: Question[] = LEVELS.flatMap((l) => l.quiz)
