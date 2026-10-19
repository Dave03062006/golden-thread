import type { LevelMusic } from '../../types'

/**
 * Level 3's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Five pieces had no recording under an allowed license and were replaced, by the
 * script's fallback rule: for Episode 3, the chant Adoro te devote became Byrd's Ave verum
 * corpus; for Episode 4, Beethoven's "Die Himmel rühmen" became Haydn's "The heavens are
 * telling" (from Level 2); for Episode 5, "Wayfaring Stranger" became the spiritual
 * "Swing Low, Sweet Chariot"; for Episode 8, the chant Parce Domine became Palestrina's
 * Kyrie; and for reflection, Mozart's Ave verum corpus became Franck's Panis angelicus.
 */
export const level3Music: LevelMusic = {
  story: ['god-of-abraham-praise', 'be-thou-my-vision', 'byrd-ave-verum', 'creation-heavens-telling', 'swing-low', 'bach-jesu-joy', 'holy-holy-holy', 'palestrina-kyrie', 'mozart-alleluja', 'o-haupt-voll-blut'],
  minigame: ['vivaldi-autumn-allegro'],
  reflection: ['franck-panis-angelicus'],
  quiz: ['handel-ombra-mai-fu'],
  cues: {},
}
