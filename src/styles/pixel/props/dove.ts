import type { PixelSpriteArt } from '../art'
import { C } from '../palette'

/** The dove faces right and has four frames of flapping: wings up, level, down, level. */

const DOVE_UP = [
  '..........WW.........',
  '.........WWW.........',
  '........WWWP.........',
  '.......WWWWP.........',
  '......WWWWP..........',
  '.....WWWWWP......WW..',
  '....PWWWWWP.....WWkW.',
  'WW...PPWWWWWWWWWWWWWo',
  'PWW.WWWWWWWWWWWWWWW..',
  '.PWWWWWWWWWWWWWWWWP..',
  '...PPWWWWWWWWWWWPP...',
  '......PPPPPPPPP......',
  '.....................',
]
const DOVE_LEVEL = [
  '.....................',
  '.....................',
  '.....................',
  '.....................',
  '.....................',
  '.................WW..',
  '..PPWWWWWWWP....WWkW.',
  'WWWWWWWWWWWWWWWWWWWWo',
  'PWW.WWWWWWWWWWWWWWW..',
  '.PWWWWWWWWWWWWWWWWP..',
  '...PPWWWWWWWWWWWPP...',
  '......PPPPPPPPP......',
  '.....................',
]
const DOVE_DOWN = [
  '.....................',
  '.....................',
  '.....................',
  '.....................',
  '.....................',
  '.................WW..',
  '................WWkW.',
  'WW...WWWWWWWWWWWWWWWo',
  'PWW.WWWWWWWWWWWWWWW..',
  '.PWWWWWWWWWWWWWWWWP..',
  '...PPWWWWWWPPPPPPP...',
  '.....PWWWWWP.........',
  '......PWWWP..........',
]

export const dove: PixelSpriteArt = {
  kind: 'sprite',
  poses: { idle: { frames: [DOVE_UP, DOVE_LEVEL, DOVE_DOWN, DOVE_LEVEL], fps: 9 } },
  colors: { W: C.white, P: C.pale, k: C.ink, o: C.orange },
  facing: 1,
}
