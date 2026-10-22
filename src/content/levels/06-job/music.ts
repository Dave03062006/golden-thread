import type { LevelMusic } from '../../types'

/**
 * Level 6's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Two pieces had no recording under an allowed license and were replaced, by the script's
 * fallback rule: for Episode 2, Purcell's "When I am laid in earth" (Dido's Lament) became
 * Bach's chorale prelude "Aus tiefer Not schrei ich zu dir" ("From deep distress I cry to
 * you", from Level 1), a lament too; and for the minigames, the Brandenburg Concerto No. 3
 * became the Allegro of the Brandenburg Concerto No. 1.
 */
export const level6Music: LevelMusic = {
  story: ['handel-sarabande', 'bach-aus-tiefer-not', 'bach-cello-suite-prelude', 'handel-i-know-that-my-redeemer', 'vivaldi-summer-presto', 'handel-hallelujah'],
  minigame: ['bach-brandenburg-1-allegro'],
  reflection: ['faure-in-paradisum'],
  quiz: ['handel-water-music-air'],
  cues: {},
}
