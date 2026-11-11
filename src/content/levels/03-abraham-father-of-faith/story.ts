import type { AnyGameRules } from '../../../minigames/framework'
import { theJourney } from '../../../minigames/the-journey'
import { theClimb } from '../../../minigames/the-climb'
import { dividingTheFlocks } from '../../../minigames/dividing-the-flocks'
import { byNight } from '../../../minigames/by-night'
import { countTheStars } from '../../../minigames/count-the-stars'
import { theWell } from '../../../minigames/the-well'
import { newNames } from '../../../minigames/new-names'
import { servingTheGuests } from '../../../minigames/serving-the-guests'
import { abrahamPleads } from '../../../minigames/abraham-pleads'
import { theFeast } from '../../../minigames/the-feast'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'
import { episode8 } from './episode-8'
import { episode9 } from './episode-9'
import { episode10 } from './episode-10'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l03-e1': episode1,
  'l03-e2': episode2,
  'l03-e3': episode3,
  'l03-e4': episode4,
  'l03-e5': episode5,
  'l03-e6': episode6,
  'l03-e7': episode7,
  'l03-e8': episode8,
  'l03-e9': episode9,
  'l03-e10': episode10,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'the-journey': theJourney,
  'the-climb': theClimb,
  'dividing-the-flocks': dividingTheFlocks,
  'by-night': byNight,
  'count-the-stars': countTheStars,
  'the-well': theWell,
  'new-names': newNames,
  'serving-the-guests': servingTheGuests,
  'abraham-pleads': abrahamPleads,
  'the-feast': theFeast,
}
