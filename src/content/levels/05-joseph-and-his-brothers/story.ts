import type { AnyGameRules } from '../../../minigames/framework'
import { toDothan } from '../../../minigames/to-dothan'
import { caringForPrisoners } from '../../../minigames/caring-for-prisoners'
import { pharaohsDreams } from '../../../minigames/pharaohs-dreams'
import { fillingTheSacks } from '../../../minigames/filling-the-sacks'
import { theSilverCup } from '../../../minigames/the-silver-cup'
import { comeNear } from '../../../minigames/come-near'
import { twelveBlessings } from '../../../minigames/twelve-blessings'
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
  'l05-e1': episode1,
  'l05-e2': episode2,
  'l05-e3': episode3,
  'l05-e4': episode4,
  'l05-e5': episode5,
  'l05-e6': episode6,
  'l05-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'to-dothan': toDothan,
  'caring-for-prisoners': caringForPrisoners,
  'pharaohs-dreams': pharaohsDreams,
  'filling-the-sacks': fillingTheSacks,
  'the-silver-cup': theSilverCup,
  'come-near': comeNear,
  'twelve-blessings': twelveBlessings,
}
