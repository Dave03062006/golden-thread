import type { AnyGameRules } from '../../../minigames/framework'
import { hiddenOnTheRoof } from '../../../minigames/hidden-on-the-roof'
import { twelveStonesFromTheJordan } from '../../../minigames/twelve-stones-from-the-jordan'
import { sevenTimesAround } from '../../../minigames/seven-times-around'
import { broughtIntoTheLight } from '../../../minigames/brought-into-the-light'
import { allNightFromGilgal } from '../../../minigames/all-night-from-gilgal'
import { aPortionForEach } from '../../../minigames/a-portion-for-each'
import { weWillServeTheLord } from '../../../minigames/we-will-serve-the-lord'
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
  'l14-e1': episode1,
  'l14-e2': episode2,
  'l14-e3': episode3,
  'l14-e4': episode4,
  'l14-e5': episode5,
  'l14-e6': episode6,
  'l14-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'hidden-on-the-roof': hiddenOnTheRoof,
  'twelve-stones-from-the-jordan': twelveStonesFromTheJordan,
  'seven-times-around': sevenTimesAround,
  'brought-into-the-light': broughtIntoTheLight,
  'all-night-from-gilgal': allNightFromGilgal,
  'a-portion-for-each': aPortionForEach,
  'we-will-serve-the-lord': weWillServeTheLord,
}
