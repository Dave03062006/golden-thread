import type { AnyGameRules } from '../../../minigames/framework'
import { aroundAndAround } from '../../../minigames/around-and-around'
import { theTorrentKishon } from '../../../minigames/the-torrent-kishon'
import { torchesAndTrumpets } from '../../../minigames/torches-and-trumpets'
import { theWayWeCame } from '../../../minigames/the-way-we-came'
import { outOfTheEater } from '../../../minigames/out-of-the-eater'
import { inHisOwnEyes } from '../../../minigames/in-his-own-eyes'
import type { Episode } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'

/** The sets and scenes of this level's episodes, by episode id: the heavy part of a level, loaded only when it's played. */
export const story: Record<string, Pick<Episode, 'set' | 'scenes'>> = {
  'l15-e1': episode1,
  'l15-e2': episode2,
  'l15-e3': episode3,
  'l15-e4': episode4,
  'l15-e5': episode5,
  'l15-e6': episode6,
}

/** The plays this level's episodes use, registered when the level loads (minigames/live.ts). */
export const games: Record<string, AnyGameRules> = {
  'around-and-around': aroundAndAround,
  'the-torrent-kishon': theTorrentKishon,
  'torches-and-trumpets': torchesAndTrumpets,
  'the-way-we-came': theWayWeCame,
  'out-of-the-eater': outOfTheEater,
  'in-his-own-eyes': inHisOwnEyes,
}
