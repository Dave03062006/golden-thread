import type { LevelMusic } from '../../types'

/**
 * Level 12's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's hymn had no usable recording under an allowed license and was replaced, as the
 * script itself says: "Guide Me, O Thou Great Jehovah" (Cwm Rhondda), whose free recordings
 * are all CC BY-SA samples, became Franck's Panis angelicus, "the bread of angels," for
 * Episode 2's manna.
 */
export const level12Music: LevelMusic = {
  story: ['be-thou-my-vision', 'franck-panis-angelicus', 'swing-low', 'vivaldi-spring-allegro', 'nobody-knows', 'rock-of-ages', 'handel-water-music-hornpipe', 'mozart-alleluja'],
  minigame: ['mozart-nachtmusik-allegro'],
  reflection: ['dvorak-largo'],
  quiz: ['mozart-romanze'],
  cues: {},
}
