import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · Sparing the LORD's Anointed (1 Samuel 24; 26), from the approved Level 18 script.
 *
 * In the cave at En-gedi David cuts only the corner of Saul's robe, which glows (this episode's
 * golden thread: "Love your enemies"), and calls after him; Saul weeps. Later, the player leads
 * David and Abishai through Saul's sleeping camp to take his spear and water jar ("through the
 * sleeping camp", minigames/through-the-sleeping-camp).
 */

/** The way through the sleeping camp, gap by gap, to Saul's head and out again. */
export const WAY = [
  { x: 0.1, y: 0.82 },
  { x: 0.24, y: 0.76 },
  { x: 0.38, y: 0.84 },
  { x: 0.52, y: 0.78 },
  { x: 0.64, y: 0.82 },
]
export const RAIDERS = 'david-and-abishai'

const CAVE = 'rock-face'
const CAMP = 'night-hill'
const inCave = personOn(CAVE)
const inCamp = personOn(CAMP)

export const spareSet: SceneDescription = {
  id: 'l18-spare',
  title: 'Sparing the LORD’s anointed',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: CAVE, depth: 0.3 },
    { id: CAMP, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The cave at En-gedi: David's men in the dark, Saul, and the corner of the robe (the golden thread).
    inCave('men', 'hebrew-workers', 0.16, { size: 0.1, facing: 1 }),
    inCave('david', 'david', 0.32, { facing: 1 }),
    inCave('saul', 'saul', 0.66, { size: 0.05 }),
    { id: 'corner', prop: 'cloak', above: CAVE, x: 0.4, y: 0.72, size: 0.02, opacity: 0 },
    { id: 'corner-glow', prop: 'halo', above: CAVE, x: 0.4, y: 0.64, size: 0.12, opacity: 0 },
    // Saul's camp at night: the sleeping army, Saul, his spear and jar, and David with Abishai.
    inCamp('army', 'hebrew-workers', 0.36, { size: 0.12, opacity: 0 }),
    inCamp('saul-asleep', 'saul', 0.7, { size: 0.05, pose: 'sit', opacity: 0 }),
    { id: 'spear', prop: 'spear', above: CAMP, x: 0.76, y: 0.8, size: 0.05, opacity: 0 },
    { id: 'jar', prop: 'water-jar', above: CAMP, x: 0.66, y: 0.8, size: 0.016, opacity: 0 },
    inCamp(RAIDERS, 'david', WAY[0]!.x, { y: WAY[0]!.y, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e5-s1',
    title: 'The cave at En-gedi',
    music: 'faure-agnus-dei',
    beats: [
      say('Saul came with three thousand men to hunt David among the rocks of En-gedi. He went into a cave alone, and David and his men were hiding deep inside it.', camera({ zoom: 1.02 }, slow)),
      say('David’s men whispered that God had given his enemy into his hand. David crept up behind Saul, but he only cut off the corner of his robe, and afterward his heart troubled him even for that.', ...walk('david', { x: 0.56 }, 2, 0.5), fadeIn('corner', 2.5), ...walk('david', { x: 0.36, facing: 1 }, 2, 3)),
      verse('1SA 24:6', actor('corner-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l18-e5-s2',
    title: '“Is this your voice, my son David?”',
    music: 'faure-agnus-dei',
    beats: [
      verse('1SA 24:10', ...walk('saul', { x: 0.84 }, 2, 0.3), actor('david', { pose: 'kneel' }, { seconds: 0.8, delay: 1 })),
      verse('1SA 24:11', camera({ zoom: 1.02 }, slow)),
      verse('1SA 24:16', actor('saul', { facing: -1, pose: 'pray' }, { seconds: 0.8, delay: 0.3 })),
      verse('1SA 24:17', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l18-e5-s3',
    title: 'The spear and the jar',
    music: 'faure-agnus-dei',
    beats: [
      verse('1SA 26:7', ...swap('forest-sky', 'night-sky'), ...swap(CAVE, CAMP), ...['men', 'david', 'saul', 'corner', 'corner-glow'].map((id) => fadeOut(id)), ...['army', 'saul-asleep', 'spear', 'jar', RAIDERS].map((id) => fadeIn(id, 1.5))),
      verse('1SA 26:9', camera({ zoom: 1.02 }, slow)),
      verse('1SA 26:11', camera({ zoom: 1 }, slow)),
      play('through-the-sleeping-camp', { done: [actor(RAIDERS, { x: WAY.at(-1)!.x, y: WAY.at(-1)!.y }, { seconds: 0.5 })] }),
      verse('1SA 26:12', fadeOut('spear', 0.3), fadeOut('jar', 0.3), ...walk(RAIDERS, { x: -0.06, facing: -1 }, 4, 0.8)),
      verse('1SA 26:23', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: spareSet, scenes }
