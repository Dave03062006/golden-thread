import type { LevelMusic } from '../../types'

/**
 * Level 18's free music, from the approved script's music table (see music/catalog.ts for
 * each recording and its license). Every piece is a recording already in the game, including
 * the spec's own "Sheep May Safely Graze"; Schubert's Psalm 23 has no allowed recording.
 */
export const level18Music: LevelMusic = {
  story: ['bach-sheep-may-safely-graze', 'charpentier-te-deum', 'elgar-nimrod', 'nobody-knows', 'faure-agnus-dei', 'parry-psalm-84', 'handel-water-music-hornpipe', 'handel-hallelujah'],
  minigame: ['handel-rejouissance'],
  reflection: ['bach-air'],
  quiz: ['mozart-romanze'],
  cues: {},
}
