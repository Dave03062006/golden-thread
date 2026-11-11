import type { LevelMusic } from '../../types'

/**
 * Level 17's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's piece, Handel's Saul, has no recording on Wikimedia Commons; the one 78 of its
 * "Dead March" on the Internet Archive has no date or license, so it is left for Dave to decide
 * (see the script). Handel's coronation anthem Zadok the Priest stands in for Saul's anointing.
 */
export const level17Music: LevelMusic = {
  story: ['mozart-alleluja', 'brahms-wiegenlied', 'mozart-lacrimosa', 'god-of-abraham-praise', 'handel-zadok', 'allegri-miserere'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
