import type { LevelMusic } from '../../types'

/**
 * Level 15's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's pieces had no usable recording under an allowed license and were replaced, as
 * the script itself says: Wikimedia Commons has no recording of Handel's Samson and only a
 * 15-second clip from Carissimi's Jephte, and the 78s of Samson and Jephtha on the Internet
 * Archive were made in 1927 or later. Handel's own "Harmonious Blacksmith" stands in for
 * Samson.
 */
export const level15Music: LevelMusic = {
  story: ['bach-aus-tiefer-not', 'mozart-laudate-dominum', 'bach-brandenburg-1-allegro', 'mozart-lacrimosa', 'handel-harmonious-blacksmith', 'bach-ich-ruf'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
