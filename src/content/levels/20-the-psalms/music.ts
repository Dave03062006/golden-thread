import type { LevelMusic } from '../../types'

/**
 * Level 20's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game, most of them
 * settings of the psalms. Neither of the spec's pieces has a usable recording yet: Mendelssohn's
 * "Hear My Prayer" (1927) is protected in the US until 2028, and the only free psalm chant is 17
 * seconds long.
 */
export const level20Music: LevelMusic = {
  story: ['mozart-laudate-dominum', 'bach-sheep-may-safely-graze', 'mozart-lacrimosa', 'bach-aus-tiefer-not', 'handel-zadok', 'parry-psalm-84'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
