import type { LevelMusic } from '../../types'

/**
 * Level 16's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's piece, César Franck's oratorio Ruth, has no recording on Wikimedia Commons or the
 * Internet Archive; Franck's own "Panis angelicus" stands in for it, for the bread of
 * Bethlehem, as the script says.
 */
export const level16Music: LevelMusic = {
  story: ['dvorak-largo', 'bach-jesu-joy', 'vivaldi-autumn-allegro', 'franck-panis-angelicus', 'handel-i-know-that-my-redeemer'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
