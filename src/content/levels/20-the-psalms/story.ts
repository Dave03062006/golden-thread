import type { AnyGameRules } from '../../../minigames/framework'
import { howLongOLord } from '../../../minigames/how-long-o-lord'
import { pathsOfRighteousness } from '../../../minigames/paths-of-righteousness'
import { praiseHim } from '../../../minigames/praise-him'
import { songsOfAscents } from '../../../minigames/songs-of-ascents'
import { theHeadOfTheCorner } from '../../../minigames/the-head-of-the-corner'
import { watchmenForTheMorning } from '../../../minigames/watchmen-for-the-morning'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l20-e1': episode1,
  'l20-e2': episode2,
  'l20-e3': episode3,
  'l20-e4': episode4,
  'l20-e5': episode5,
  'l20-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'praise-him': praiseHim,
  'paths-of-righteousness': pathsOfRighteousness,
  'how-long-o-lord': howLongOLord,
  'watchmen-for-the-morning': watchmenForTheMorning,
  'the-head-of-the-corner': theHeadOfTheCorner,
  'songs-of-ascents': songsOfAscents,
}
