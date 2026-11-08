import type { LevelMusic } from '../../types'

/**
 * Level 13's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's hymn had no usable recording under an allowed license and was replaced, as the
 * script itself says: "O God, Our Help in Ages Past" (and Bach's St Anne Fugue, on the same
 * tune), whose free recordings are all CC BY-SA, became "Abide with Me" for Episode 5.
 */
export const level13Music: LevelMusic = {
  story: ['god-of-abraham-praise', 'mozart-laudate-dominum', 'go-down-moses', 'amazing-grace', 'abide-with-me'],
  minigame: ['handel-water-music-air'],
  reflection: ['elgar-nimrod'],
  quiz: ['mozart-romanze'],
  cues: {},
}
