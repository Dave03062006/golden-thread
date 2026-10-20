import type { LevelMusic } from '../../types'

/**
 * Level 4's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Three pieces had no recording under an allowed license and were replaced, by the
 * script's fallback rule: for Episode 2, the spiritual "Let Us Break Bread Together" became
 * Franck's Panis angelicus, the bread of angels (from Level 3); for Episode 4, the
 * spiritual "We Are Climbing Jacob's Ladder" became "Nearer, My God, to Thee", whose words
 * retell Jacob's dream (so reflection, which the script gave that hymn, has "Abide with Me"
 * instead); and for Episode 7, the chant Ubi caritas became "Amazing Grace". Bach's Air and
 * Vivaldi's Spring come from Level 1 and Level 2.
 */
export const level4Music: LevelMusic = {
  story: ['bach-sheep-may-safely-graze', 'franck-panis-angelicus', 'bach-air', 'nearer-my-god', 'pachelbel-canon', 'dvorak-largo', 'amazing-grace'],
  minigame: ['vivaldi-spring-allegro'],
  reflection: ['abide-with-me'],
  quiz: ['mozart-romanze'],
  cues: {},
}
