import type { AnyGameRules } from '../../../minigames/framework'
import { jobsBlessings } from '../../../minigames/jobs-blessings'
import { sevenDays } from '../../../minigames/seven-days'
import { trueOrTwisted } from '../../../minigames/true-or-twisted'
import { carvedInTheRock } from '../../../minigames/carved-in-the-rock'
import { whereWereYou } from '../../../minigames/where-were-you'
import { homeToTheFold } from '../../../minigames/home-to-the-fold'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l06-e1': episode1,
  'l06-e2': episode2,
  'l06-e3': episode3,
  'l06-e4': episode4,
  'l06-e5': episode5,
  'l06-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'jobs-blessings': jobsBlessings,
  'seven-days': sevenDays,
  'true-or-twisted': trueOrTwisted,
  'carved-in-the-rock': carvedInTheRock,
  'where-were-you': whereWereYou,
  'home-to-the-fold': homeToTheFold,
}
