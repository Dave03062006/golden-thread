import type { AnyGameRules } from '../../../minigames/framework'
import { pouringOutHerSoul } from '../../../minigames/pouring-out-her-soul'
import { hereIAm } from '../../../minigames/here-i-am'
import { theRoadToBethShemesh } from '../../../minigames/the-road-to-beth-shemesh'
import { whatTheKingWillTake } from '../../../minigames/what-the-king-will-take'
import { hiddenAmongTheBaggage } from '../../../minigames/hidden-among-the-baggage'
import { theBleatingOfTheSheep } from '../../../minigames/the-bleating-of-the-sheep'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l17-e1': episode1,
  'l17-e2': episode2,
  'l17-e3': episode3,
  'l17-e4': episode4,
  'l17-e5': episode5,
  'l17-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'pouring-out-her-soul': pouringOutHerSoul,
  'here-i-am': hereIAm,
  'the-road-to-beth-shemesh': theRoadToBethShemesh,
  'what-the-king-will-take': whatTheKingWillTake,
  'hidden-among-the-baggage': hiddenAmongTheBaggage,
  'the-bleating-of-the-sheep': theBleatingOfTheSheep,
}
