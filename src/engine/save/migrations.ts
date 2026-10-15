import { isStyleId } from '../../styles/ids'
import { SAVE_VERSION, SaveError, type Position, type SaveData } from './types'

type Raw = Record<string, unknown>

/**
 * Upgrade steps, one per version. `UPGRADES[1]` turns a version-1 save into version 2,
 * and so on. When the save shape changes, raise SAVE_VERSION and add a step here, so
 * older saves keep working after game updates.
 */
export const UPGRADES: Record<number, (save: Raw) => Raw> = {}

function isObject(value: unknown): value is Raw {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const stringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []

function readPosition(value: unknown): Position | null {
  if (!isObject(value)) return null
  const { level, episode, scene, minigame } = value
  if (typeof level !== 'string' || typeof episode !== 'string' || typeof scene !== 'string') return null
  const position: Position = { level, episode, scene }
  if (minigame === 'start' || minigame === 'half') position.minigame = minigame
  return position
}

/**
 * Checks a save read from storage or a file, upgrades it to the current version, and
 * fills in anything missing with safe defaults.
 */
export function upgradeSave(raw: unknown, upgrades = UPGRADES, current = SAVE_VERSION): SaveData {
  if (!isObject(raw) || typeof raw.version !== 'number' || typeof raw.name !== 'string') {
    throw new SaveError('not-a-save', 'This is not a Golden Thread save.')
  }
  if (raw.version > current) {
    throw new SaveError('from-the-future', 'This save comes from a newer version of the game.')
  }

  let save: Raw = raw
  for (let v = raw.version; v < current; v++) {
    const step = upgrades[v]
    if (!step) throw new SaveError('not-a-save', `No upgrade from save version ${v}.`)
    save = { ...step(save), version: v + 1 }
  }

  const position = readPosition(save.position)

  return {
    version: current,
    name: String(save.name),
    createdAt: typeof save.createdAt === 'string' ? save.createdAt : new Date(0).toISOString(),
    lastPlayedAt: typeof save.lastPlayedAt === 'string' ? save.lastPlayedAt : new Date(0).toISOString(),
    playSeconds: typeof save.playSeconds === 'number' && save.playSeconds >= 0 ? save.playSeconds : 0,
    style: isStyleId(save.style) ? save.style : 'paper-glass',
    position,
    completedEpisodes: stringArray(save.completedEpisodes),
    completedLevels: stringArray(save.completedLevels),
    threadsFound: stringArray(save.threadsFound),
    quiz: isObject(save.quiz) ? (save.quiz as SaveData['quiz']) : {},
    journal: Array.isArray(save.journal) ? (save.journal as SaveData['journal']) : [],
    readMarks: stringArray(save.readMarks),
  }
}
