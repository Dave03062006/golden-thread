import type { LevelMusic } from '../../types'

/**
 * Level 21's free music, from the approved script's music table (see music/catalog.ts for each
 * recording and its license). Every piece is a recording already in the game, including the
 * spec's "Zadok the Priest"; Handel's "Arrival of the Queen of Sheba" has no allowed recording,
 * and his La Réjouissance stands in for it.
 */
export const level21Music: LevelMusic = {
  story: ['handel-zadok', 'brahms-wiegenlied', 'pachelbel-canon', 'handel-glory-of-the-lord', 'handel-rejouissance', 'abide-with-me'],
  minigame: ['handel-water-music-hornpipe'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
