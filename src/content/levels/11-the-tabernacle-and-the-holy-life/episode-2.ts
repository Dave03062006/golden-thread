import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, PIECES, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, tabernacle, walk } from './stage'

/**
 * Episode 2 · The Ark of the Covenant (Exodus 25:10–40; 27:20–21; 40:1–38), from the
 * approved Level 11 script.
 *
 * Bezalel makes the ark of acacia wood and gold, with the mercy seat and its two cherubim on
 * top, where God will meet his people; the ark glows (this episode's golden thread: Mary,
 * whom "the power of the Most High will overshadow"). Then the table with its twelve loaves,
 * and the lampstand. On the first day of the first month the player raises the tabernacle
 * piece by piece, in the order of Exodus 40 ("raise the tabernacle",
 * minigames/raise-the-tabernacle), and the cloud of the LORD's glory fills it.
 */

/** What the player chooses at each step of the raising, in order. */
export const PIECE_NAMES: Record<(typeof PIECES)[number], string> = {
  frames: 'The bases and the frames',
  coverings: 'The coverings of the tent',
  ark: 'The ark, with the tablets and the mercy seat',
  veil: 'The veil before the ark',
  table: 'The table, with its bread',
  lampstand: 'The lampstand',
  incense: 'The golden altar of incense',
  screen: 'The screen for the door',
  altar: 'The altar of burnt offering',
  laver: 'The laver of water',
  court: 'The hangings of the court',
}
/** Where the tabernacle rises, in the middle of the camp. */
export const RAISE = { x: 0.5, y: 0.8, size: 0.8 }
/** How far below its place a piece starts as it rises. */
export const RISE_FROM = 0.03
export const RAISED = PIECES.map((piece) => ({ piece, id: `raise-${piece}` }))

const ABOVE = 'horeb'
const INSIDE = 'holy-place'
const person = personOn(ABOVE)
const CAMP = ['tent-1', 'tent-2', 'people', 'more-people']

export const arkSet: SceneDescription = {
  id: 'l11-ark',
  title: 'The ark of the covenant',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'holy-place', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The workshop: the ark, its glow (the golden thread), and Bezalel.
    { id: 'ark-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.66, size: 0.22, opacity: 0 },
    { id: 'ark', prop: 'tabernacle-piece', above: ABOVE, x: pieceX('ark', 0.5, 1.6), y: 0.76, size: 1.6, pose: 'ark', opacity: 0 },
    person('bezalel', 'bezalel', 0.36, { facing: 1 }),
    person('oholiab', 'oholiab', 0.66),
    // Inside: the table with its bread, and the lampstand.
    { id: 'table', prop: 'tabernacle-piece', above: INSIDE, x: pieceX('table', 0.36, 1.4), y: 0.8, size: 1.4, pose: 'table', opacity: 0 },
    { id: 'lamp-glow', prop: 'halo', above: INSIDE, x: 0.64, y: 0.56, size: 0.2, opacity: 0 },
    { id: 'lampstand', prop: 'tabernacle-piece', above: INSIDE, x: pieceX('lampstand', 0.64, 1.4), y: 0.8, size: 1.4, pose: 'lampstand', opacity: 0 },
    // The camp, gathered to watch, and the tabernacle raised piece by piece.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.06, y: 0.75, size: 0.1, pose: 'open', facing: 1, opacity: 0 },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.94, y: 0.75, size: 0.1, pose: 'open', facing: -1, opacity: 0 },
    person('people', 'hebrew-family', 0.14, { size: 0.12, facing: 1, opacity: 0 }),
    person('more-people', 'hebrew-workers', 0.86, { size: 0.12, opacity: 0 }),
    ...tabernacle('raise', ABOVE, RAISE, PIECES, { opacity: 0 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.258, y: 0.785, size: 0.012, opacity: 0 },
    person('moses', 'moses-shepherd', 0.24, { facing: 1, opacity: 0 }),
    // The cloud of glory, by day and by night.
    { id: 'glory', prop: 'halo', above: ABOVE, x: 0.37, y: 0.58, size: 0.4, opacity: 0 },
    { id: 'cloud', prop: 'storm-cloud', above: ABOVE, x: 0.37, y: 0.46, size: 0.36, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l11-e2-s1',
    title: 'The ark and the mercy seat',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 25:10', fadeIn('ark', 0.5), ...pose('bezalel', 'work', 1, 5)),
      verse('EXO 25:20', fadeIn('ark-glow', 0.5, 0.8), camera({ zoom: 1.03, y: 0.01 }, slow)),
      verse('EXO 25:21', ...walk('oholiab', { x: 0.6 }, 2, 0.5)),
      verse('EXO 25:22', camera({ zoom: 1, y: 0 }, slow)),
      say('The ark was the heart of the whole tabernacle: the place where God would meet his people.', ...pose('bezalel', 'kneel', 1, 5)),
    ],
  },
  {
    id: 'l11-e2-s2',
    title: 'Bread and light',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 25:30', ...swap('horeb', 'holy-place'), ...['ark', 'ark-glow', 'bezalel', 'oholiab'].map((id) => fadeOut(id)), fadeIn('table', 1.5)),
      say('Twelve loaves, one for each tribe, were always before God, and every sabbath they were made new.', camera({ zoom: 1.02, x: -0.01 }, slow)),
      verse('EXO 25:37', fadeIn('lampstand', 0.5), fadeIn('lamp-glow', 1, 0.75), camera({ zoom: 1.02, x: 0.01 }, slow)),
      verse('EXO 27:20', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l11-e2-s3',
    title: 'Raising the tabernacle',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 40:2', ...swap('holy-place', 'horeb'), ...['table', 'lampstand', 'lamp-glow'].map((id) => fadeOut(id)), ...CAMP.map((id) => fadeIn(id, 1.5)), fadeIn('moses', 2), fadeIn('rod', 2)),
      verse('EXO 40:17', ...pose('moses', 'lift', 1)),
      play('raise-the-tabernacle', { done: RAISED.map((r) => actor(r.id, { y: RAISE.y, opacity: 1 }, { seconds: 0.5 })) }),
      verse('EXO 40:33', ...walk('moses', { x: 0.2 }, 2, 0.5)),
    ],
  },
  {
    id: 'l11-e2-s4',
    title: 'The glory of the LORD',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 40:34', fadeIn('cloud', 0.5, 0.9), actor('cloud', { y: 0.5 }, { seconds: 5, ease: 'inOutSine' }), fadeIn('glory', 2, 0.9)),
      verse('EXO 40:35', ...walk('moses', { x: 0.14, facing: 1 }, 2, 0.5), camera({ zoom: 1.02 }, slow)),
      verse('EXO 40:36', actor('cloud', { y: 0.44 }, { seconds: 4, ease: 'inOutSine' }), camera({ zoom: 1 }, slow)),
      verse('EXO 40:38', ...swap('forest-sky', 'night-sky'), actor('cloud', { y: 0.5 }, { seconds: 4, ease: 'inOutSine' }), actor('glory', { size: 0.5 }, slow)),
      say('God had come to live among his people, as he had promised.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: arkSet, scenes }
