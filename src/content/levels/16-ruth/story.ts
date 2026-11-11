import type { AnyGameRules } from '../../../minigames/framework'
import { theLongRoadHome } from '../../../minigames/the-long-road-home'
import { whereYouGo } from '../../../minigames/where-you-go'
import { gleaning } from '../../../minigames/gleaning'
import { winnowing } from '../../../minigames/winnowing'
import { perezToDavid } from '../../../minigames/perez-to-david'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l16-e1': episode1,
  'l16-e2': episode2,
  'l16-e3': episode3,
  'l16-e4': episode4,
  'l16-e5': episode5,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'the-long-road-home': theLongRoadHome,
  'where-you-go': whereYouGo,
  gleaning,
  winnowing,
  'perez-to-david': perezToDavid,
}
