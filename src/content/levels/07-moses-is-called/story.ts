import type { AnyGameRules } from '../../../minigames/framework'
import { theMidwivesNight } from '../../../minigames/the-midwives-night'
import { aBasketOfBulrushes } from '../../../minigames/a-basket-of-bulrushes'
import { wateringTheFlock } from '../../../minigames/watering-the-flock'
import { turnAsideAndSee } from '../../../minigames/turn-aside-and-see'
import { theSigns } from '../../../minigames/the-signs'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l07-e1': episode1,
  'l07-e2': episode2,
  'l07-e3': episode3,
  'l07-e4': episode4,
  'l07-e5': episode5,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'the-midwives-night': theMidwivesNight,
  'a-basket-of-bulrushes': aBasketOfBulrushes,
  'watering-the-flock': wateringTheFlock,
  'turn-aside-and-see': turnAsideAndSee,
  'the-signs': theSigns,
}
