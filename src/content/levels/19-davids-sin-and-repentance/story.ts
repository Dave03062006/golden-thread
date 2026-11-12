import type { AnyGameRules } from '../../../minigames/framework'
import { nothingIsHidden } from '../../../minigames/nothing-is-hidden'
import { upTheMountOfOlives } from '../../../minigames/up-the-mount-of-olives'
import { whatCostsMeNothing } from '../../../minigames/what-costs-me-nothing'
import { whiterThanSnow } from '../../../minigames/whiter-than-snow'
import { youAreTheMan } from '../../../minigames/you-are-the-man'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l19-e1': episode1,
  'l19-e2': episode2,
  'l19-e3': episode3,
  'l19-e4': episode4,
  'l19-e5': episode5,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'nothing-is-hidden': nothingIsHidden,
  'you-are-the-man': youAreTheMan,
  'whiter-than-snow': whiterThanSnow,
  'up-the-mount-of-olives': upTheMountOfOlives,
  'what-costs-me-nothing': whatCostsMeNothing,
}
