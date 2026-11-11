import type { AnyGameRules } from '../../../minigames/framework'
import { upAndDownTheMountain } from '../../../minigames/up-and-down-the-mountain'
import { theTenWords } from '../../../minigames/the-ten-words'
import { twelvePillars } from '../../../minigames/twelve-pillars'
import { theCalf } from '../../../minigames/the-calf'
import { mosesPleads } from '../../../minigames/moses-pleads'
import { theLordPassedBy } from '../../../minigames/the-lord-passed-by'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l10-e1': episode1,
  'l10-e2': episode2,
  'l10-e3': episode3,
  'l10-e4': episode4,
  'l10-e5': episode5,
  'l10-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'up-and-down-the-mountain': upAndDownTheMountain,
  'the-ten-words': theTenWords,
  'twelve-pillars': twelvePillars,
  'the-calf': theCalf,
  'moses-pleads': mosesPleads,
  'the-lord-passed-by': theLordPassedBy,
}
