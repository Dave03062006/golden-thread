import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Songs of Repentance (Psalms 130, 32 and 103), from the approved Level 20 script.
 *
 * A watchman paces the walls of Jerusalem through the night: "Out of the depths." In the last
 * hour, the player waits with him and calls out the dawn each time the sky changes ("watchmen for
 * the morning", minigames/watchmen-for-the-morning), and the rising sun glows (this episode's
 * golden thread: "he will save his people from their sins"). Then morning sweeps the whole land,
 * from the east to the west.
 */

/** The three changes of the sky before sunrise, each called out from the wall. */
export const DAWN = ['A gray light in the east', 'Rose along the hills', 'Gold: the sun!']
export const WATCHMAN = 'watchman'

const WALL = 'jerusalem-roofs'
const LAND = 'canaan-hills'
const onWall = personOn(WALL, 0.7)

export const watchSet: SceneDescription = {
  id: 'l20-watch',
  title: 'Waiting for the morning',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: WALL, depth: 0.3 },
    { id: LAND, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The wall at night: the watchman and his lamp.
    onWall(WATCHMAN, 'watchman', 0.3, { facing: 1 }),
    { id: 'lamp', prop: 'oil-lamp', above: WALL, x: 0.34, y: 0.66, size: 0.02 },
    // The rising sun in the east (the golden thread).
    { id: 'sun', prop: 'sun', above: WALL, x: 0.84, y: 0.5, size: 0.07, opacity: 0 },
    { id: 'dawn-glow', prop: 'halo', above: WALL, x: 0.84, y: 0.5, size: 0.3, opacity: 0 },
    // Morning over the whole land.
    { id: 'land-sun', prop: 'sun', above: LAND, x: 0.9, y: 0.3, size: 0.07, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l20-e4-s1',
    title: 'Out of the depths',
    music: 'bach-aus-tiefer-not',
    beats: [
      say('Some psalms are prayers of sorrow for sin. The Church calls seven of them the penitential psalms. Level 19 told of the greatest of them, Psalm 51.', ...walk(WATCHMAN, { x: 0.5, facing: 1 }, 6), actor('lamp', { x: 0.54 }, { seconds: 6, ease: 'inOutSine' })),
      verse('PSA 130:1', camera({ zoom: 1.03 }, slow)),
      verse('PSA 130:3', ...walk(WATCHMAN, { x: 0.36, facing: -1 }, 6), actor('lamp', { x: 0.4 }, { seconds: 6, ease: 'inOutSine' })),
      verse('PSA 130:4', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l20-e4-s2',
    title: 'More than watchmen for the morning',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('PSA 130:5', actor(WATCHMAN, { facing: 1 }, { seconds: 0.5 }), actor('dawn-glow', { opacity: 0.3 }, { seconds: 0.6, delay: 0.2 })),
      play('watchmen-for-the-morning', { done: [layer('night-sky', { opacity: 0 }, { seconds: 1 }), layer('evening-sky', { opacity: 0 }, { seconds: 1 }), layer('dawn-sky', { opacity: 1 }, { seconds: 1 }), actor('sun', { opacity: 1, y: 0.42 }, { seconds: 1 }), actor('dawn-glow', { opacity: 0.85, y: 0.42 }, { seconds: 1 })] }),
      verse('PSA 130:6', actor(WATCHMAN, { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      verse('PSA 130:7', actor(WATCHMAN, { pose: 'idle' }, { seconds: 0.8 }), camera({ zoom: 1.02 }, slow)),
      verse('PSA 130:8', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l20-e4-s3',
    title: 'As far as the east is from the west',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('PSA 32:1', ...swap('dawn-sky', 'forest-sky'), ...swap(WALL, LAND), ...[WATCHMAN, 'lamp', 'sun', 'dawn-glow'].map((id) => fadeOut(id)), fadeIn('land-sun', 1.5)),
      verse('PSA 103:8', camera({ zoom: 1.02, x: 0.02 }, slow)),
      verse('PSA 103:10'),
      verse('PSA 103:12', actor('land-sun', { x: 0.1 }, { seconds: 8, ease: 'inOutSine' }), camera({ zoom: 1.02, x: -0.02 }, { seconds: 8, ease: 'inOutSine' })),
      verse('PSA 103:13', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: watchSet, scenes }
