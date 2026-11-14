import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · The Glory Fills the House (1 Kings 8; 2 Chronicles 5–7), from the approved Level 21
 * script.
 *
 * The player leads the priests carrying the ark across the Temple courts, past the altar and the
 * bronze sea, up the steps and in at the golden doors ("into the Most Holy Place",
 * minigames/into-the-most-holy-place). Under the wings of the cherubim the ark comes to rest, and
 * the cloud of glory fills the house (this episode's golden thread: "the dwelling of God is with
 * men"). Solomon prays with his hands spread to heaven, and fire falls on the altar.
 */

/** The way the ark is carried, from the courts to the doors of the house. */
export const PROCESSION = [
  { x: 0.1, y: 0.86, leg: 'The courts, crowded with all Israel' },
  { x: 0.24, y: 0.86, leg: 'Past the great altar of bronze' },
  { x: 0.36, y: 0.86, leg: 'Past the bronze sea, where the priests wash' },
  { x: 0.5, y: 0.86, leg: 'To the foot of the steps, between the two bronze pillars' },
  { x: 0.5, y: 0.7, leg: 'Up the steps of the house' },
  { x: 0.5, y: 0.62, leg: 'In at the golden doors, through the holy place, through the veil' },
]
export const PRIESTS = 'priests'

const COURTS = 'temple-courts'
const HOLY = 'holy-place'
const inCourts = personOn(COURTS)

export const glorySet: SceneDescription = {
  id: 'l21-glory',
  title: 'The glory fills the house',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: COURTS, depth: 0.3 },
    { id: HOLY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The courts: the altar, the bronze sea, the people, Solomon, and the priests carrying the ark.
    { id: 'altar', prop: 'altar', above: COURTS, x: 0.24, y: 0.9, size: 0.08 },
    { id: 'sea', prop: 'basin', above: COURTS, x: 0.36, y: 0.9, size: 0.08 },
    inCourts('people', 'hebrew-family', 0.8, { size: 0.12 }),
    inCourts('solomon', 'solomon', 0.68),
    { id: PRIESTS, prop: 'aaron-linen', above: COURTS, x: PROCESSION[0]!.x, y: PROCESSION[0]!.y, size: 0.044, facing: 1 },
    // The Most Holy Place: the cherubim, the ark under their wings, and the cloud of glory.
    { id: 'cherub-1', prop: 'cherub', above: HOLY, x: 0.38, y: 0.66, size: 0.12, facing: 1, opacity: 0 },
    { id: 'cherub-2', prop: 'cherub', above: HOLY, x: 0.62, y: 0.66, size: 0.12, opacity: 0 },
    { id: 'ark', prop: 'tabernacle-piece', above: HOLY, x: pieceX('ark', 0.5, 0.4), y: 0.8, size: 0.4, pose: 'ark', opacity: 0 },
    { id: 'cloud', prop: 'glory', above: HOLY, x: 0.5, y: 0.5, size: 0.6, opacity: 0 },
    { id: 'cloud-glow', prop: 'halo', above: HOLY, x: 0.5, y: 0.6, size: 0.3, opacity: 0 },
    // The fire from heaven on the altar.
    { id: 'fire', prop: 'flame', above: COURTS, x: 0.24, y: 0.82, size: 0.05, opacity: 0 },
    { id: 'temple-glory', prop: 'glory', above: COURTS, x: 0.5, y: 0.35, size: 0.5, opacity: 0 },
  ],
  camera: DRIFT,
}

const inTheHoly = ['cherub-1', 'cherub-2', 'ark', 'cloud', 'cloud-glow']
const inTheCourts = ['altar', 'sea', 'people', 'solomon', PRIESTS]

const scenes: StoryScene[] = [
  {
    id: 'l21-e4-s1',
    title: 'The ark comes home',
    music: 'handel-glory-of-the-lord',
    beats: [
      say('When the Temple was finished, Solomon gathered all Israel to bring the ark of the covenant up to it, from the city of David.', camera({ zoom: 1.02 }, slow)),
      play('into-the-most-holy-place', { done: [actor(PRIESTS, { x: PROCESSION.at(-1)!.x, y: PROCESSION.at(-1)!.y }, { seconds: 0.5 })] }),
      verse('1KI 8:6', ...swap(COURTS, HOLY), ...inTheCourts.map((id) => fadeOut(id)), fadeIn('cherub-1', 1.5), fadeIn('cherub-2', 1.5), fadeIn('ark', 1.5), camera({ zoom: 1 }, slow)),
      verse('1KI 8:9'),
      verse('1KI 8:10', fadeIn('cloud', 0.5, 0.8), actor('cloud-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('1KI 8:11', camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l21-e4-s2',
    title: 'Solomon’s prayer',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('1KI 8:22', ...swap(HOLY, COURTS), ...inTheHoly.map((id) => fadeOut(id)), ...['altar', 'people', 'solomon'].map((id) => fadeIn(id, 1.5)), fadeIn('temple-glory', 1.5, 0.5), actor('solomon', { x: 0.34, pose: 'lift' }, { seconds: 1.5, delay: 1.5 })),
      verse('1KI 8:23', camera({ zoom: 1.02 }, slow)),
      verse('1KI 8:27'),
      verse('1KI 8:30', camera({ zoom: 1 }, slow)),
      say('Solomon prayed even for foreigners, from far countries, who would come to pray toward the house of the LORD, “in order that all the peoples of the earth may know thy name.”', actor('solomon', { pose: 'idle' }, { seconds: 0.8 })),
    ],
  },
  {
    id: 'l21-e4-s3',
    title: 'Fire from heaven',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('2CH 7:1', fadeIn('fire', 0.3), actor('temple-glory', { opacity: 1 }, { seconds: 2 }), ...swap('forest-sky', 'evening-sky')),
      verse('2CH 7:3', actor('solomon', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: glorySet, scenes }
