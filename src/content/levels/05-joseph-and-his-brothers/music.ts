import type { LevelMusic } from '../../types'

/**
 * Level 5's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Six pieces had no recording under an allowed license and were replaced, by the script's
 * fallback rule: for Episode 1, Handel's Joseph and His Brethren became the overture of his
 * Messiah; for Episode 4, "Let All Mortal Flesh Keep Silence" became Alyabyev's Cherubic
 * Hymn; for Episode 5, Bach's "Erbarme dich" became Allegri's Miserere ("Have mercy", from
 * Level 1); for the minigames, Handel's "Arrival of the Queen of Sheba" became his Water
 * Music hornpipe; for reflection, "It Is Well with My Soul" became the chorale "Wer nur den
 * lieben Gott lässt walten" ("If you will only let God guide you", from Level 1); and for
 * the quiz, Boccherini's Minuet became Handel's "Harmonious Blacksmith".
 */
export const level5Music: LevelMusic = {
  story: ['handel-messiah-overture', 'nobody-knows', 'handel-zadok', 'alyabyev-cherubic-hymn', 'allegri-miserere', 'elgar-nimrod', 'handel-glory-of-the-lord'],
  minigame: ['handel-water-music-hornpipe'],
  reflection: ['bach-wer-nur'],
  quiz: ['handel-harmonious-blacksmith'],
  cues: {},
}
