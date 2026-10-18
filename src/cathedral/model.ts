import { LEVELS } from '../content/catalog'
import { OUTLINE } from '../content/outline'
import { THREADS } from '../content/threads'
import type { Level } from '../content/types'
import type { SaveData } from '../engine/save/types'

/**
 * The glass cathedral, as both art styles draw it (spec §9.1, §9.2). The nave has 14
 * bays, one for each Age. Each level has a tall window in its Age's bay, and each episode
 * is one medallion in it, read bottom to top like a medieval window. This file works out
 * what the cathedral shows for a save; the styles only draw it.
 */

/**
 * A medallion's glass: dark (its episode isn't finished), lit, or newly set (finished, but
 * its setting hasn't been shown yet).
 */
export type PanelState = 'dark' | 'lit' | 'new'

export interface Panel {
  episode: string
  title: string
  emblem: string
  state: PanelState
}

export interface CathedralWindow {
  number: number
  title: string
  /** The level, if it's built. Windows of levels still to come stand dark and waiting. */
  level?: Level
  panels: Panel[]
  /** Every panel is lit: the window is complete. */
  complete: boolean
}

export interface Bay {
  numeral: string
  title: string
  windows: CathedralWindow[]
}

export function panelState(save: Pick<SaveData, 'completedEpisodes' | 'panelsSet'>, episode: string): PanelState {
  if (!save.completedEpisodes.includes(episode)) return 'dark'
  return save.panelsSet.includes(episode) ? 'lit' : 'new'
}

/** The whole nave for a save. */
export function nave(save: Pick<SaveData, 'completedEpisodes' | 'panelsSet'>): Bay[] {
  return OUTLINE.map((age) => ({
    numeral: age.numeral,
    title: age.title,
    windows: age.levels.map((outline) => {
      const level = LEVELS.find((l) => l.number === outline.number)
      const panels: Panel[] = (level?.episodes ?? []).map((e) => ({ episode: e.id, title: e.title, emblem: e.emblem, state: panelState(save, e.id) }))
      return { number: outline.number, title: outline.title, level, panels, complete: panels.length > 0 && panels.every((p) => p.state !== 'dark') }
    }),
  }))
}

/** The panels waiting to be set, in the order they were finished. */
export function panelsToSet(save: Pick<SaveData, 'completedEpisodes' | 'panelsSet'>): string[] {
  return save.completedEpisodes.filter((e) => !save.panelsSet.includes(e))
}

/**
 * A golden thread the player has found, as a line of light across the nave: from its
 * episode's medallion to the windows of the Age where it's fulfilled. If that Age isn't
 * reached yet, the thread glimmers there, waiting.
 */
export interface ThreadLine {
  id: string
  title: string
  episode: string
  toAge: string
  /** Whether the player has reached the Age it points to. */
  reached: boolean
}

export function threadLines(save: Pick<SaveData, 'threadsFound' | 'completedLevels'>): ThreadLine[] {
  const reachedAges = new Set(LEVELS.filter((l) => save.completedLevels.includes(l.id)).map((l) => l.age.split(' · ')[0]))
  return THREADS.filter((t) => save.threadsFound.includes(t.id)).map((t) => ({
    id: t.id,
    title: t.title,
    episode: t.episode,
    toAge: t.fulfilled.age,
    reached: reachedAges.has(t.fulfilled.age),
  }))
}

/** The light through the glass, following the player's own time of day. */
export type DayLight = 'dawn' | 'day' | 'dusk' | 'night'

export function dayLight(date: Date): DayLight {
  const hour = date.getHours() + date.getMinutes() / 60
  if (hour >= 5 && hour < 8) return 'dawn'
  if (hour >= 8 && hour < 17) return 'day'
  if (hour >= 17 && hour < 20) return 'dusk'
  return 'night'
}
