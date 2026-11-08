import type { LevelMusic } from '../../types'

/**
 * Level 11's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license).
 *
 * One piece had no usable recording under an allowed license and was replaced, as the
 * script itself says: for Episode 1, Bruckner's Locus iste (whose free recordings are all
 * CC BY-SA) became Psalm 84, "How amiable are thy dwellings," to a chant by Parry.
 */
export const level11Music: LevelMusic = {
  story: ['parry-psalm-84', 'holy-holy-holy', 'handel-zadok', 'faure-agnus-dei', 'o-haupt-voll-blut', 'veni-sancte-spiritus', 'bach-jesu-joy'],
  minigame: ['handel-harmonious-blacksmith'],
  reflection: ['handel-ombra-mai-fu'],
  quiz: ['mozart-romanze'],
  cues: {},
}
