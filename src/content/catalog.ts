import { level1 } from './levels/01-creation-and-fall/level'
import type { Episode, Level } from './types'

/** Every level built so far, in order. */
export const LEVELS: Level[] = [level1]

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

/** The episode after this one, if it's built. */
export function nextEpisode(episodeId: string): Episode | undefined {
  const found = findEpisode(episodeId)
  if (!found) return undefined
  const { level, episode } = found
  const next = level.episodes[level.episodes.indexOf(episode) + 1]
  return next && next.scenes.length > 0 ? next : undefined
}
