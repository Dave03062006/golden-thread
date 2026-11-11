import { level1 } from './levels/01-creation-and-fall/level'
import { level2 } from './levels/02-noah-and-the-nations/level'
import { level3 } from './levels/03-abraham-father-of-faith/level'
import { level4 } from './levels/04-isaac-and-jacob/level'
import { level5 } from './levels/05-joseph-and-his-brothers/level'
import { level6 } from './levels/06-job/level'
import { level7 } from './levels/07-moses-is-called/level'
import { level8 } from './levels/08-the-plagues-and-the-passover/level'
import { level9 } from './levels/09-through-the-sea/level'
import { level10 } from './levels/10-sinai/level'
import { level11 } from './levels/11-the-tabernacle-and-the-holy-life/level'
import { level12 } from './levels/12-forty-years-in-the-wilderness/level'
import { level13 } from './levels/13-moses-last-words/level'
import { level14 } from './levels/14-joshua/level'
import { level15 } from './levels/15-the-judges/level'
import { level16 } from './levels/16-ruth/level'
import { level17 } from './levels/17-samuel-and-saul/level'
import { level18 } from './levels/18-david-the-shepherd-king/level'
import type { Episode, Level } from './types'

/** Every level built so far, in order. */
export const LEVELS: Level[] = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12, level13, level14, level15, level16, level17, level18]

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
