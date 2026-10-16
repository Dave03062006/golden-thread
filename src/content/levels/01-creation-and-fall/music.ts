import type { LevelMusic } from '../../types'

/**
 * Level 1's free music, from the approved script's music table. Haydn set Genesis 1–2
 * almost line by line in The Creation, so each day has its own movement (see the scenes'
 * `music` in episode-1.ts), and the great chord on "and there was light" lands as the
 * light breaks.
 *
 * Episode 3 has Allegri's Miserere (Psalm 51) in place of the chant Attende Domine, by the
 * script's fallback rule: no recording of the chant under an allowed license was found.
 *
 * Still to come (milestones 4 and 5): the chants the script names for Episodes 4–5 and for
 * reflection (Ave Maris Stella, Parce Domine, Salve Regina) and Bach's chorale for Episode
 * 6, or fitting substitutes where no allowed recording exists.
 */
export const level1Music: LevelMusic = {
  story: [
    'creation-chaos',
    'creation-in-the-beginning',
    'creation-now-vanish',
    'creation-marvelous-work',
    'creation-rolling-billows',
    'creation-verdure',
    'creation-splendour',
    'creation-heavens-telling',
    'creation-mighty-pens',
    'creation-most-beautiful',
    'creation-earth-bring-forth',
    'creation-native-worth',
    'creation-glorious-work',
    'creation-fairest',
    'allegri-miserere',
  ],
  minigame: ['creation-awake-the-harp', 'creation-heavens-telling'],
  reflection: ['creation-by-thee'],
  quiz: ['bach-air'],
  cues: {
    'there-was-light': { track: 'creation-in-the-beginning', cue: 'light' },
  },
}
