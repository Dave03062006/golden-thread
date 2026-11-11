import type { AnyGameRules } from '../../../minigames/framework'
import { theLightInTheCamp } from '../../../minigames/the-light-in-the-camp'
import { thePathThroughTheSea } from '../../../minigames/the-path-through-the-sea'
import { miriamsSong } from '../../../minigames/miriams-song'
import { enoughForEach } from '../../../minigames/enough-for-each'
import { streamsInTheDesert } from '../../../minigames/streams-in-the-desert'
import { handsHeldHigh } from '../../../minigames/hands-held-high'
import { sharingTheLoad } from '../../../minigames/sharing-the-load'
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
  'l09-e1': episode1,
  'l09-e2': episode2,
  'l09-e3': episode3,
  'l09-e4': episode4,
  'l09-e5': episode5,
  'l09-e6': episode6,
  'l09-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'the-light-in-the-camp': theLightInTheCamp,
  'the-path-through-the-sea': thePathThroughTheSea,
  'miriams-song': miriamsSong,
  'enough-for-each': enoughForEach,
  'streams-in-the-desert': streamsInTheDesert,
  'hands-held-high': handsHeldHigh,
  'sharing-the-load': sharingTheLoad,
}
