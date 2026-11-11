import type { AnyGameRules } from '../../../minigames/framework'
import { rememberTheWay } from '../../../minigames/remember-the-way'
import { onTheDoorposts } from '../../../minigames/on-the-doorposts'
import { beStrong } from '../../../minigames/be-strong'
import { chooseLife } from '../../../minigames/choose-life'
import { allTheLand } from '../../../minigames/all-the-land'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l13-e1': episode1,
  'l13-e2': episode2,
  'l13-e3': episode3,
  'l13-e4': episode4,
  'l13-e5': episode5,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'remember-the-way': rememberTheWay,
  'on-the-doorposts': onTheDoorposts,
  'be-strong': beStrong,
  'choose-life': chooseLife,
  'all-the-land': allTheLand,
}
