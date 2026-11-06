import type { LevelMusic } from '../../types'

/**
 * Level 10's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * One piece had no usable recording under an allowed license and was replaced, as the
 * script itself says: for Episode 2, Bach's chorale "Dies sind die heilgen zehn Gebot" (whose
 * free recordings are all CC BY-SA) became the Kyrie of Palestrina's Missa Papae Marcelli,
 * already heard in Level 3.
 */
export const level10Music: LevelMusic = {
  story: ['bach-toccata', 'palestrina-kyrie', 'byrd-ave-verum', 'allegri-miserere', 'bach-aus-tiefer-not', 'handel-glory-of-the-lord'],
  minigame: ['bach-brandenburg-1-allegro'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
