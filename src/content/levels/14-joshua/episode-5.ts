import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · The Sun Stands Still (Joshua 10:6–14), from the approved Level 14 script.
 *
 * Gibeon, which has made peace with Israel, is surrounded by five kings, and sends to Joshua
 * for help. The player leads Joshua's army all night, up through the dark hills from Gilgal to
 * Gibeon ("all night from Gilgal", minigames/all-night-from-gilgal). God throws the armies
 * into confusion, and Joshua prays: "Sun, stand thou still at Gibeon." The sun stands still
 * over Gibeon, glowing (this episode's golden thread: "If God is for us, who is against us?").
 * No fighting is shown.
 */

/** The way up through the hills at night, from Gilgal (bottom right) to Gibeon (top left), turn by turn. */
export const WAY = [
  { x: 0.86, y: 0.76 },
  { x: 0.7, y: 0.66 },
  { x: 0.6, y: 0.5 },
  { x: 0.42, y: 0.46 },
  { x: 0.3, y: 0.32 },
  { x: 0.16, y: 0.24 },
]
export const ARMY = 'army'

const CAMP = 'dry-hills'
const MAP = 'hill-road-map'
const VALLEY = 'canaan-hills'
const person = personOn(CAMP)
const inValley = personOn(VALLEY)

export const sunSet: SceneDescription = {
  id: 'l14-sun',
  title: 'The sun stands still',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: MAP, depth: 0.1, opacity: 0 },
    { id: VALLEY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp at Gilgal, and the messenger from Gibeon.
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.12, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    person('joshua', 'joshua', 0.42),
    person('messenger', 'messenger', 0.94, { facing: -1 }),
    person('soldiers', 'hebrew-workers', 0.24, { size: 0.12, facing: 1, opacity: 0 }),
    // The way up through the hills at night, and Gibeon's watch fire.
    { id: 'watch-fire', prop: 'halo', above: MAP, x: WAY.at(-1)!.x, y: WAY.at(-1)!.y, size: 0.08, opacity: 0 },
    { id: ARMY, prop: 'hebrew-workers', above: MAP, x: WAY[0]!.x, y: WAY[0]!.y, size: 0.05, facing: -1, opacity: 0 },
    // The valley below Gibeon: the sun standing still over the town (the golden thread), the moon over Aijalon, and Joshua praying.
    { id: 'gibeon', prop: 'city', above: VALLEY, x: 0.3, y: 0.56, size: 0.1, opacity: 0 },
    { id: 'sun-glow', prop: 'halo', above: VALLEY, x: 0.3, y: 0.24, size: 0.2, opacity: 0 },
    { id: 'sun', prop: 'sun', above: VALLEY, x: 0.3, y: 0.24, size: 0.06, opacity: 0 },
    { id: 'moon', prop: 'moon', above: VALLEY, x: 0.78, y: 0.3, size: 0.04, opacity: 0 },
    inValley('valley-joshua', 'joshua', 0.54, { facing: -1, opacity: 0 }),
    { id: 'hail', prop: 'storm-cloud', above: VALLEY, x: 0.7, y: 0.3, size: 0.3, opacity: 0 },
  ],
  camera: DRIFT,
}

const AT_CAMP = ['tent-1', 'joshua', 'messenger', 'soldiers']

const scenes: StoryScene[] = [
  {
    id: 'l14-e5-s1',
    title: '“Come up to us quickly”',
    music: 'vivaldi-summer-presto',
    beats: [
      verse('JOS 10:6', actor('messenger', { x: 0.52, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 0.3 }), actor('messenger', { pose: 'kneel' }, { seconds: 0.8, delay: 2.4 })),
      verse('JOS 10:7', fadeIn('soldiers', 0.5)),
      verse('JOS 10:8', ...pose('joshua', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l14-e5-s2',
    title: 'All night from Gilgal',
    music: 'vivaldi-summer-presto',
    beats: [
      verse('JOS 10:9', ...swap('forest-sky', 'night-sky'), ...swap(CAMP, MAP), ...AT_CAMP.map((id) => fadeOut(id)), fadeIn(ARMY, 1.5), fadeIn('watch-fire', 1.5, 0.9)),
      play('all-night-from-gilgal', { done: [actor(ARMY, { ...WAY.at(-1)! }, { seconds: 0.5 })] }),
      say('The armies of the kings were thrown into confusion and fled down the steep pass of Beth-horon, and a terrible storm of great hailstones fell on them as they ran.', ...swap('night-sky', 'dawn-sky'), ...swap(MAP, VALLEY), fadeOut(ARMY), fadeOut('watch-fire'), fadeIn('gibeon', 1.5), fadeIn('hail', 2, 0.9)),
    ],
  },
  {
    id: 'l14-e5-s3',
    title: '“Sun, stand thou still”',
    music: 'vivaldi-summer-presto',
    beats: [
      verse('JOS 10:12', ...swap('dawn-sky', 'forest-sky'), fadeOut('hail'), fadeIn('valley-joshua', 0.5), actor('valley-joshua', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), fadeIn('sun', 1), fadeIn('moon', 1.5), fadeIn('sun-glow', 1.5, 0.85)),
      verse('JOS 10:13', camera({ zoom: 1.02, y: -0.02 }, slow)),
      verse('JOS 10:14', camera({ zoom: 1, y: 0 }, slow)),
      say('Joshua had kept his word to the people of Gibeon, and God kept his word to Joshua.', actor('valley-joshua', { pose: 'idle' }, { seconds: 0.8 })),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: sunSet, scenes }
