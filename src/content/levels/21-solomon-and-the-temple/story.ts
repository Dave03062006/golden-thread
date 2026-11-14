import type { AnyGameRules } from '../../../minigames/framework'
import { aHeartWhollyTrue } from '../../../minigames/a-heart-wholly-true'
import { anUnderstandingMind } from '../../../minigames/an-understanding-mind'
import { hardQuestions } from '../../../minigames/hard-questions'
import { intoTheMostHolyPlace } from '../../../minigames/into-the-most-holy-place'
import { theLivingChild } from '../../../minigames/the-living-child'
import { withoutASound } from '../../../minigames/without-a-sound'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l21-e1': episode1,
  'l21-e2': episode2,
  'l21-e3': episode3,
  'l21-e4': episode4,
  'l21-e5': episode5,
  'l21-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'an-understanding-mind': anUnderstandingMind,
  'the-living-child': theLivingChild,
  'without-a-sound': withoutASound,
  'into-the-most-holy-place': intoTheMostHolyPlace,
  'hard-questions': hardQuestions,
  'a-heart-wholly-true': aHeartWhollyTrue,
}
