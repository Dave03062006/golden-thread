import { LEVELS } from '../content/catalog'
import { loadStory } from '../content/story-loading'
import { demoScene } from './demo'
import type { SceneDescription } from './types'

/**
 * Every scene in the game: the milestone 1 demo, and the set of every episode. Tests check
 * each one against both art styles, and the bake draws their art. Each level's story is loaded
 * on demand (content/story-loading.ts), so this loads them all first.
 */
export async function allScenes(): Promise<SceneDescription[]> {
  await Promise.all(LEVELS.map(loadStory))
  return [demoScene, ...LEVELS.flatMap((level) => level.episodes.map((episode) => episode.set))]
}
