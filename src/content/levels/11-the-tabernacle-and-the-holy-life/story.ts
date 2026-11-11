import type { AnyGameRules } from '../../../minigames/framework'
import { giftsForTheSanctuary } from '../../../minigames/gifts-for-the-sanctuary'
import { raiseTheTabernacle } from '../../../minigames/raise-the-tabernacle'
import { clothedForGlory } from '../../../minigames/clothed-for-glory'
import { keepTheFireBurning } from '../../../minigames/keep-the-fire-burning'
import { carriedFarAway } from '../../../minigames/carried-far-away'
import { theFeastsOfTheYear } from '../../../minigames/the-feasts-of-the-year'
import { theEdgesOfTheField } from '../../../minigames/the-edges-of-the-field'
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
  'l11-e1': episode1,
  'l11-e2': episode2,
  'l11-e3': episode3,
  'l11-e4': episode4,
  'l11-e5': episode5,
  'l11-e6': episode6,
  'l11-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'gifts-for-the-sanctuary': giftsForTheSanctuary,
  'raise-the-tabernacle': raiseTheTabernacle,
  'clothed-for-glory': clothedForGlory,
  'keep-the-fire-burning': keepTheFireBurning,
  'carried-far-away': carriedFarAway,
  'the-feasts-of-the-year': theFeastsOfTheYear,
  'the-edges-of-the-field': theEdgesOfTheField,
}
