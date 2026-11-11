import { GAMES } from '../minigames/live'
import type { SceneDescription } from '../scene/types'
import type { Episode, Level } from './types'

/**
 * Each level's story (its episodes' sets and scenes, most of the game's code) is loaded only
 * when the level is played, so the menus, map and cathedral open quickly. Until then an
 * episode has an empty set and no scenes.
 */

const EMPTY_SET: SceneDescription = { id: 'not-loaded', title: '', layers: [], actors: [], camera: { x: [], y: [], zoom: [], loop: 'hold' } }

/** An episode's set and scenes before its level's story is loaded. */
export function notLoaded(): Pick<Episode, 'set' | 'scenes'> {
  return { set: EMPTY_SET, scenes: [] }
}

const loading = new Map<string, Promise<void>>()

/** Loads a level's story, once: fills in its episodes' sets and scenes, and registers its plays. */
export function loadStory(level: Level): Promise<void> {
  let job = loading.get(level.id)
  if (!job) {
    job = (level.story ? level.story() : Promise.resolve({ story: {} as Record<string, Pick<Episode, 'set' | 'scenes'>>, games: {} })).then(({ story, games }) => {
      Object.assign(GAMES, games)
      for (const episode of level.episodes) {
        const loaded = story[episode.id]
        if (loaded) Object.assign(episode, loaded)
      }
    })
    loading.set(level.id, job)
  }
  return job
}

/** Whether a level's story is ready to play. */
export const storyLoaded = (level: Level) => level.episodes.every((e) => e.scenes.length > 0)
