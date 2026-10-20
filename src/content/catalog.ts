import { level1 } from './levels/01-creation-and-fall/level'
import { level2 } from './levels/02-noah-and-the-nations/level'
import { level3 } from './levels/03-abraham-father-of-faith/level'
import { level4 } from './levels/04-isaac-and-jacob/level'
import type { Episode, Level } from './types'

/** Every level built so far, in order. */
export const LEVELS: Level[] = [level1, level2, level3, level4]

/** Finds an episode and its level by the episode's id, like "l01-e1". */
export function findEpisode(episodeId: string): { level: Level; episode: Episode } | undefined {
  for (const level of LEVELS) {
    const episode = level.episodes.find((e) => e.id === episodeId)
    if (episode) return { level, episode }
  }
  return undefined
}

/** Finds the episode a scene belongs to, and the scene's number in it. */
export function findScene(sceneId: string): { level: Level; episode: Episode; index: number } | undefined {
  for (const level of LEVELS) {
    for (const episode of level.episodes) {
      const index = episode.scenes.findIndex((s) => s.id === sceneId)
      if (index >= 0) return { level, episode, index }
    }
  }
  return undefined
}

/** Whether a level still has episodes being made (they have no scenes yet). */
export function stillBeingMade(level: Level): boolean {
  return level.episodes.some((e) => e.scenes.length === 0)
}

/** The level after this one, if it has a first episode to play. */
export function nextLevel(levelId: string): Level | undefined {
  const next = LEVELS[LEVELS.findIndex((l) => l.id === levelId) + 1]
  return next && next.episodes[0]!.scenes.length > 0 ? next : undefined
}

/** The episode after this one, if it's built. */
export function nextEpisode(episodeId: string): Episode | undefined {
  const found = findEpisode(episodeId)
  if (!found) return undefined
  const { level, episode } = found
  const next = level.episodes[level.episodes.indexOf(episode) + 1]
  return next && next.scenes.length > 0 ? next : undefined
}
