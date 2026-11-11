import type { AnyGameRules } from '../../../minigames/framework'
import { letThereBe } from '../../../minigames/let-there-be'
import { naming } from '../../../minigames/naming'
import { twist } from '../../../minigames/twist'
import { lightsInTheDark } from '../../../minigames/lights-in-the-dark'
import { abelsFlock } from '../../../minigames/abels-flock'
import { familyTree } from '../../../minigames/family-tree'
import type { Episode } from '../../types'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l01-e2': episode2,
  'l01-e3': episode3,
  'l01-e4': episode4,
  'l01-e5': episode5,
  'l01-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  ...letThereBe,
  naming,
  twist,
  'lights-in-the-dark': lightsInTheDark,
  'abels-flock': abelsFlock,
  'family-tree': familyTree,
}
