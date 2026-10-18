import type { PixelSpriteArt } from '../art'
import { C } from '../palette'

/**
 * The dove faces right and has four frames of flapping: wings up, level, down, level. She
 * flies free (idle, fly), or with an olive leaf in her beak (leaf).
 */

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

/** The same frame with an olive leaf hanging from the beak. */
function withLeaf(frame: string[]): string[] {
  return frame.map((row, y) => (y === 8 ? row.slice(0, 19) + 'gl' : y === 9 ? row.slice(0, 19) + 'lg' : y === 10 ? row.slice(0, 20) + 'g' : row))
}

export const dove: PixelSpriteArt = {
  kind: 'sprite',
  poses: {
    idle: { frames: [DOVE_UP, DOVE_LEVEL, DOVE_DOWN, DOVE_LEVEL], fps: 9 },
    fly: { frames: [DOVE_UP, DOVE_LEVEL, DOVE_DOWN, DOVE_LEVEL], fps: 9 },
    leaf: { frames: [DOVE_UP, DOVE_LEVEL, DOVE_DOWN, DOVE_LEVEL].map(withLeaf), fps: 9 },
  },
  colors: { W: C.white, P: C.pale, k: C.ink, o: C.orange, g: C.green, l: C.lime },
  facing: 1,
}
