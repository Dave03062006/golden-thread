import type { LevelMusic } from '../../types'

/**
 * Level 14's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game.
 *
 * The spec's pieces had no usable recording under an allowed license and were replaced, as
 * the script itself says: "Joshua Fit the Battle of Jericho" (only MIDI files on Wikimedia
 * Commons; the old recordings are too recent or non-commercial) and Handel's Joshua became
 * Charpentier's Te Deum fanfare for Jericho's trumpets, and "Swing Low, Sweet Chariot" for
 * the Jordan.
 */
export const level14Music: LevelMusic = {
  story: ['bach-sheep-may-safely-graze', 'swing-low', 'charpentier-te-deum', 'allegri-miserere', 'vivaldi-summer-presto', 'pachelbel-canon', 'bach-wer-nur'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
