import type { LevelMusic } from '../../types'

/**
 * Level 7's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * One piece had no recording under an allowed license and was replaced, by the script's
 * fallback rule: for Episode 1, Verdi's "Va, pensiero" (the Chorus of the Hebrew Slaves)
 * became the spiritual "Nobody Knows the Trouble I've Seen" (from Level 5), sung by Marian
 * Anderson: a song of people in slavery, as the Hebrews were.
 */
export const level7Music: LevelMusic = {
  story: ['nobody-knows', 'brahms-wiegenlied', 'dvorak-largo', 'holy-holy-holy', 'go-down-moses'],
  minigame: ['mozart-nachtmusik-allegro'],
  reflection: ['bach-jesu-joy'],
  quiz: ['pachelbel-canon'],
  cues: {},
}
