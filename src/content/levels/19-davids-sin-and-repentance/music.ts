import type { LevelMusic } from '../../types'

/**
 * Level 19's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game, including
 * the spec's own Allegri Miserere, Psalm 51 itself.
 */
export const level19Music: LevelMusic = {
  story: ['palestrina-kyrie', 'bach-aus-tiefer-not', 'allegri-miserere', 'o-haupt-voll-blut', 'rock-of-ages'],
  minigame: ['bach-wer-nur'],
  reflection: ['amazing-grace'],
  quiz: ['bach-air'],
  cues: {},
}
