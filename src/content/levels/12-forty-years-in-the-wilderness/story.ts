import type { AnyGameRules } from '../../../minigames/framework'
import { followTheCloud } from '../../../minigames/follow-the-cloud'
import { theSpiritOnTheSeventy } from '../../../minigames/the-spirit-on-the-seventy'
import { fortyDaysInCanaan } from '../../../minigames/forty-days-in-canaan'
import { theTwelveRods } from '../../../minigames/the-twelve-rods'
import { waterForAll } from '../../../minigames/water-for-all'
import { lookAndLive } from '../../../minigames/look-and-live'
import { theNarrowWay } from '../../../minigames/the-narrow-way'
import { aStarOutOfJacob } from '../../../minigames/a-star-out-of-jacob'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'
import { episode8 } from './episode-8'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l12-e1': episode1,
  'l12-e2': episode2,
  'l12-e3': episode3,
  'l12-e4': episode4,
  'l12-e5': episode5,
  'l12-e6': episode6,
  'l12-e7': episode7,
  'l12-e8': episode8,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'follow-the-cloud': followTheCloud,
  'the-spirit-on-the-seventy': theSpiritOnTheSeventy,
  'forty-days-in-canaan': fortyDaysInCanaan,
  'the-twelve-rods': theTwelveRods,
  'water-for-all': waterForAll,
  'look-and-live': lookAndLive,
  'the-narrow-way': theNarrowWay,
  'a-star-out-of-jacob': aStarOutOfJacob,
}
