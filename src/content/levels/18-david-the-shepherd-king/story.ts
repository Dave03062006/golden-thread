import type { AnyGameRules } from '../../../minigames/framework'
import { theLordLooksOnTheHeart } from '../../../minigames/the-lord-looks-on-the-heart'
import { fiveSmoothStones } from '../../../minigames/five-smooth-stones'
import { theArrowBeyondYou } from '../../../minigames/the-arrow-beyond-you'
import { theOtherSideOfTheMountain } from '../../../minigames/the-other-side-of-the-mountain'
import { throughTheSleepingCamp } from '../../../minigames/through-the-sleeping-camp'
import { theRoadToTheThrone } from '../../../minigames/the-road-to-the-throne'
import { dancingBeforeTheLord } from '../../../minigames/dancing-before-the-lord'
import { aHouseForEver } from '../../../minigames/a-house-for-ever'
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
  'l18-e1': episode1,
  'l18-e2': episode2,
  'l18-e3': episode3,
  'l18-e4': episode4,
  'l18-e5': episode5,
  'l18-e6': episode6,
  'l18-e7': episode7,
  'l18-e8': episode8,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'the-lord-looks-on-the-heart': theLordLooksOnTheHeart,
  'five-smooth-stones': fiveSmoothStones,
  'the-arrow-beyond-you': theArrowBeyondYou,
  'the-other-side-of-the-mountain': theOtherSideOfTheMountain,
  'through-the-sleeping-camp': throughTheSleepingCamp,
  'the-road-to-the-throne': theRoadToTheThrone,
  'dancing-before-the-lord': dancingBeforeTheLord,
  'a-house-for-ever': aHouseForEver,
}
