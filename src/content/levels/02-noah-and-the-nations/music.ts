import type { LevelMusic } from '../../types'

/**
 * Level 2's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Three pieces had no recording under an allowed license and were replaced, by the
 * script's fallback rule: for Episode 4, the chant Veni Creator Spiritus became the
 * chorale "Come, Holy Spirit, Lord God"; for Episode 5, "Now Thank We All Our God" became
 * Haydn's "The heavens are telling," creation's praise renewed; and for reflection, the
 * chant Vidi aquam became Mozart's Laudate Dominum, Psalm 117. Episode 7 continues with
 * Level 1's chorale of the generations, "Wer nur den lieben Gott lässt walten," as the
 * family line goes on from Shem to Abram.
 */
export const level2Music: LevelMusic = {
  story: ['bach-aus-tiefer-not', 'navy-hymn', 'vivaldi-summer-presto', 'komm-heiliger-geist', 'creation-heavens-telling', 'veni-sancte-spiritus', 'bach-wer-nur'],
  minigame: ['vivaldi-spring-allegro'],
  reflection: ['mozart-laudate-dominum'],
  quiz: ['handel-water-music-air'],
  cues: {},
}
