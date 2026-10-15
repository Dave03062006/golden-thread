import { demoScene } from './demo'
import type { SceneDescription } from './types'

/** Every scene in the game. The bake script and the art checks go through this list. */
export const ALL_SCENES: readonly SceneDescription[] = [demoScene]
