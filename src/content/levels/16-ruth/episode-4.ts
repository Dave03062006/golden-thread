import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · The Threshing Floor (Ruth 3), from the approved Level 16 script.
 *
 * Boaz winnows barley at evening, and the player tosses the grain while the wind blows
 * ("winnowing", minigames/winnowing). At midnight Ruth, at his feet, asks him to spread his
 * cloak over her, as the next of kin: told in a sentence, and Boaz honors her. At dawn he fills
 * her shawl with six measures of barley, and she comes home to Naomi not empty, the barley
 * glowing (this episode's golden thread: "from his fulness have we all received").
 */

/** The heap of clean barley, growing with each toss, and the chaff blowing away. */
export const CLEAN = 'clean-heap'
export const CHAFF = 'chaff'

const FLOOR = 'stubble-field'
const HOME = 'house-inside'
const person = personOn(FLOOR)
const atHome = personOn(HOME)

export const floorSet: SceneDescription = {
  id: 'l16-floor',
  title: 'The threshing floor',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: FLOOR, depth: 0.3 },
    { id: HOME, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The threshing floor at evening: Boaz and his workers, the beaten barley, and the chaff.
    person('workers', 'hebrew-workers', 0.3, { size: 0.12, facing: 1 }),
    person('boaz', 'boaz', 0.46, { pose: 'work', facing: 1 }),
    { id: CLEAN, prop: 'grain-heap', above: FLOOR, x: 0.6, y: 0.82, size: 0.08, opacity: 0.3 },
    { id: CHAFF, prop: 'dust-cloud', above: FLOOR, x: 0.7, y: 0.66, size: 0.2, opacity: 0 },
    // Naomi's house, and Ruth at midnight.
    atHome('naomi', 'naomi', 0.66, { opacity: 0 }),
    person('ruth', 'ruth', 0.96, { opacity: 0 }),
    // Ruth home at dawn with the barley (the golden thread).
    atHome('ruth-home', 'ruth', 0.4, { facing: 1, pose: 'carry', opacity: 0 }),
    { id: 'barley-glow', prop: 'halo', above: HOME, x: 0.42, y: 0.64, size: 0.14, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l16-e4-s1',
    title: 'Winnowing barley tonight',
    music: 'franck-panis-angelicus',
    beats: [
      verse('RUT 3:1', camera({ zoom: 1.02 }, slow)),
      verse('RUT 3:2', camera({ zoom: 1 }, slow)),
      play('winnowing', { done: [actor(CLEAN, { opacity: 1 }, { seconds: 0.5 }), actor(CHAFF, { opacity: 0 }, { seconds: 0.5 })] }),
      verse('RUT 3:5', ...pose('boaz', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l16-e4-s2',
    title: 'At midnight',
    music: 'franck-panis-angelicus',
    beats: [
      verse('RUT 3:6', ...swap('evening-sky', 'night-sky'), fadeOut('workers'), actor('boaz', { pose: 'sit', x: 0.52 }, { seconds: 1, delay: 1 }), fadeIn('ruth', 1.5), actor('ruth', { x: 0.62 }, { seconds: 2.5, ease: 'inOutSine', delay: 1.8 })),
      say('In the custom of that time, Ruth went and lay down at the feet of Boaz as he slept: a way of asking him, humbly and in secret, to take her as his wife.', actor('ruth', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 })),
      verse('RUT 3:8', actor('boaz', { pose: 'idle', facing: 1 }, { seconds: 0.8, delay: 0.3 })),
      verse('RUT 3:9', camera({ zoom: 1.02 }, slow)),
      verse('RUT 3:10', ...pose('boaz', 'lift', 0.5, 3)),
      verse('RUT 3:11', actor('ruth', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      verse('RUT 3:12', camera({ zoom: 1.02 }, slow)),
      verse('RUT 3:13', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l16-e4-s3',
    title: 'Not empty-handed',
    music: 'franck-panis-angelicus',
    beats: [
      verse('RUT 3:15', ...swap('night-sky', 'dawn-sky'), actor('ruth', { pose: 'carry' }, { seconds: 0.8, delay: 1 })),
      verse('RUT 3:16', ...swap(FLOOR, HOME), ...['boaz', 'ruth', CLEAN].map((id) => fadeOut(id)), fadeIn('naomi', 1.5), fadeIn('ruth-home', 1.5), actor('barley-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 1.5 })),
      verse('RUT 3:17', ...pose('naomi', 'lift', 0.5, 3)),
      verse('RUT 3:18', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: floorSet, scenes }
