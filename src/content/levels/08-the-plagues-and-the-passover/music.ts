import type { LevelMusic } from '../../types'

/**
 * Level 8's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * One piece had no usable recording under an allowed license and was replaced, as the
 * script itself says: for Episode 3, Handel's Israel in Egypt (whose only free recording is a
 * fragment from 1888) became the Kyrie and "Dies irae" of Mozart's Requiem, "Day of wrath,"
 * for the plagues.
 */
export const level8Music: LevelMusic = {
  story: ['go-down-moses', 'mozart-lacrimosa', 'mozart-dies-irae', 'faure-agnus-dei', 'handel-rejouissance', 'handel-worthy-is-the-lamb'],
  minigame: ['bach-rejouissance'],
  reflection: ['franck-panis-angelicus'],
  quiz: ['mozart-romanze'],
  cues: {},
}
