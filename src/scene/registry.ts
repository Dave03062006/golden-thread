import { LEVELS } from '../content/catalog'
import { demoScene } from './demo'
import type { SceneDescription } from './types'

/**
 * Every scene in the game: the milestone 1 demo, and the set of every episode that's
 * built. Tests check each one against both art styles, and the bake draws their art.
 */
export const ALL_SCENES: SceneDescription[] = [
  demoScene,
  ...LEVELS.flatMap((level) => level.episodes.filter((episode) => episode.scenes.length > 0).map((episode) => episode.set)),
]
