import type { AnyGameRules } from '../../../minigames/framework'
import { walkWithGod } from '../../../minigames/walk-with-god'
import { buildTheArk } from '../../../minigames/build-the-ark'
import { throughTheStorm } from '../../../minigames/through-the-storm'
import { theDove } from '../../../minigames/the-dove'
import { colorsOfThePromise } from '../../../minigames/colors-of-the-promise'
import { theTower } from '../../../minigames/the-tower'
import { scatter } from '../../../minigames/the-tower'
import { familyTreeShem } from '../../../minigames/family-tree'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l02-e1': episode1,
  'l02-e2': episode2,
  'l02-e3': episode3,
  'l02-e4': episode4,
  'l02-e5': episode5,
  'l02-e6': episode6,
  'l02-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'walk-with-god': walkWithGod,
  'build-the-ark': buildTheArk,
  'through-the-storm': throughTheStorm,
  ...theDove,
  'colors-of-the-promise': colorsOfThePromise,
  'the-tower': theTower,
  scatter,
  'family-tree-shem': familyTreeShem,
}
