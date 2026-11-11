import type { AnyGameRules } from '../../../minigames/framework'
import { godsPromises } from '../../../minigames/gods-promises'
import { gatheringStubble } from '../../../minigames/gathering-stubble'
import { thePlaguesInOrder } from '../../../minigames/the-plagues-in-order'
import { thePassoverNight } from '../../../minigames/the-passover-night'
import { theMarchOut } from '../../../minigames/the-march-out'
import { whenYourChildrenAsk } from '../../../minigames/when-your-children-ask'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l08-e1': episode1,
  'l08-e2': episode2,
  'l08-e3': episode3,
  'l08-e4': episode4,
  'l08-e5': episode5,
  'l08-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'gods-promises': godsPromises,
  'gathering-stubble': gatheringStubble,
  'the-plagues-in-order': thePlaguesInOrder,
  'the-passover-night': thePassoverNight,
  'the-march-out': theMarchOut,
  'when-your-children-ask': whenYourChildrenAsk,
}
