import type { AnyGameRules } from '../../../minigames/framework'
import { wateringTheCamels } from '../../../minigames/watering-the-camels'
import { whatIsItWorth } from '../../../minigames/what-is-it-worth'
import { theBlessing } from '../../../minigames/the-blessing'
import { theLadder } from '../../../minigames/the-ladder'
import { theSonsNames } from '../../../minigames/the-sons-names'
import { holdOn } from '../../../minigames/hold-on'
import { sevenBows } from '../../../minigames/seven-bows'
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
  'l04-e1': episode1,
  'l04-e2': episode2,
  'l04-e3': episode3,
  'l04-e4': episode4,
  'l04-e5': episode5,
  'l04-e6': episode6,
  'l04-e7': episode7,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'watering-the-camels': wateringTheCamels,
  'what-is-it-worth': whatIsItWorth,
  'the-blessing': theBlessing,
  'the-ladder': theLadder,
  'the-sons-names': theSonsNames,
  'hold-on': holdOn,
  'seven-bows': sevenBows,
}
