import type { LevelMusic } from '../../types'

/**
 * Level 9's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * Two pieces had no usable recording under an allowed license and were replaced, as the
 * script itself says: for Episode 2, the Easter Exsultet (whose free recordings are all
 * CC BY-SA) became the Easter sequence "Victimae paschali laudes"; for Episode 3, Handel's
 * Israel in Egypt (whose only free recording is a fragment from 1888) became the prelude of
 * Charpentier's Te Deum.
 */
export const level9Music: LevelMusic = {
  story: ['navy-hymn', 'victimae-paschali', 'charpentier-te-deum', 'franck-panis-angelicus', 'rock-of-ages', 'elgar-nimrod', 'be-thou-my-vision'],
  minigame: ['handel-water-music-hornpipe'],
  reflection: ['bach-sheep-may-safely-graze'],
  quiz: ['mozart-romanze'],
  cues: {},
}
