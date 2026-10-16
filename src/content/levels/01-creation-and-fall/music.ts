import type { LevelMusic } from '../../types'

/**
 * Level 1's free music, from the approved script's music table. Haydn set Genesis 1–2
 * almost line by line in The Creation, so each day has its own movement (see the scenes'
 * `music` in episode-1.ts), and the great chord on "and there was light" lands as the
 * light breaks.
 *
 * Episode 3 has Allegri's Miserere (Psalm 51) in place of the chant Attende Domine, and
 * Episode 4 Robert Parsons's Ave Maria in place of the chant Ave Maris Stella (both turn
 * "Eva" into "Ave"), by the script's fallback rule: no recording of either chant under an
 * allowed license was found. Episode 5 has Bach's chorale prelude "I call to you, Lord
 * Jesus Christ" in place of the chant Parce Domine: the only recordings of that chant found
 * are CC BY-SA, which the spec doesn't allow.
 *
 * Still to come (milestones 4 and 5): the chant the script names for reflection
 * (Salve Regina) and Bach's chorale for Episode
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
    'parsons-ave-maria',
    'bach-ich-ruf',
  ],
  minigame: ['creation-awake-the-harp', 'creation-heavens-telling'],
  reflection: ['creation-by-thee'],
  quiz: ['bach-air'],
  cues: {
    'there-was-light': { track: 'creation-in-the-beginning', cue: 'light' },
  },
}
