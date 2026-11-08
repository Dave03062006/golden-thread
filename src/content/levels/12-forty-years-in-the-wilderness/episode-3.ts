import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · The Twelve Spies (Numbers 13–14), from the approved Level 12 script.
 *
 * From Kadesh, Moses sends twelve men to spy out Canaan. The player moves them from cover to
 * cover past the watchmen of the walled cities, gathering the fruit of the land, and the great
 * cluster of grapes, which glows (this episode's golden thread: "There remains a sabbath rest
 * for the people of God"), and brings them home ("forty days in Canaan",
 * minigames/forty-days-in-canaan). Ten of them say the land cannot be taken; the people refuse
 * to go in, and must wander forty years. Only Joshua and Caleb trusted God.
 */

/** The covers the spies move between, across the hill country, and the fruit gathered at some of them. */
export const COVERS = [
  { x: 0.06, y: 0.8 },
  { x: 0.2, y: 0.76, fruit: 'figs' },
  { x: 0.36, y: 0.79, fruit: 'pomegranates' },
  { x: 0.54, y: 0.77, fruit: 'grapes' },
  { x: 0.72, y: 0.79 },
  { x: 0.92, y: 0.8 },
]
/** The watchman on the city wall, who looks out over the hills, then away. */
export const WATCHMAN = { id: 'watchman', x: 0.62, y: 0.5 }
export const SPIES = 'spies'
export const CLUSTER = 'cluster'

const KADESH = 'elim-oasis'
const LAND = 'canaan-hills'
const DESERT = 'dry-hills'
const person = personOn(KADESH)
const inLand = personOn(LAND)

export const spiesSet: SceneDescription = {
  id: 'l12-spies',
  title: 'The twelve spies',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: KADESH, depth: 0.3 },
    { id: LAND, depth: 0.3, opacity: 0 },
    { id: DESERT, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp at Kadesh, Moses, and the twelve: Joshua and Caleb, and the ten.
    { id: 'tent-1', prop: 'striped-tent', above: KADESH, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: KADESH, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.2, { size: 0.12, facing: 1 }),
    { id: 'rod', prop: 'staff', above: KADESH, x: 0.318, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.3, { facing: 1 }),
    person('joshua', 'joshua', 0.46),
    person('caleb', 'caleb', 0.51),
    person('ten-spies', 'hebrew-workers', 0.68, { size: 0.12 }),
    { id: 'fruit', prop: 'grape-cluster', above: KADESH, x: 0.58, y: 0.78, size: 0.07, opacity: 0 },
    // The hill country of Canaan: a walled city and its watchman, the spies, and the fruit of the land.
    { id: 'city', prop: 'city', above: LAND, x: WATCHMAN.x, y: 0.62, size: 0.2, opacity: 0 },
    inLand(WATCHMAN.id, 'watchman', WATCHMAN.x, { y: WATCHMAN.y, size: 0.03, opacity: 0 }),
    inLand(SPIES, 'hebrew-workers', COVERS[0]!.x, { y: COVERS[0]!.y, size: 0.09, facing: 1, opacity: 0 }),
    { id: 'cluster-glow', prop: 'halo', above: LAND, x: COVERS[3]!.x, y: 0.7, size: 0.12, opacity: 0 },
    { id: CLUSTER, prop: 'grape-cluster', above: LAND, x: COVERS[3]!.x, y: COVERS[3]!.y, size: 0.07, opacity: 0 },
    // The forty years: the long road back into the desert, and the children who grow up on it.
    person('wanderers', 'hebrew-family', 0.7, { size: 0.12, opacity: 0 }),
    person('children', 'girl', 0.4, { size: 0.026, y: 0.79, opacity: 0 }),
    { id: 'glory', prop: 'halo', above: KADESH, x: 0.5, y: 0.5, size: 0.5, opacity: 0 },
  ] satisfies SceneActor[],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l12-e3-s1',
    title: 'Go up and see the land',
    music: 'swing-low',
    beats: [
      verse('NUM 13:2', ...pose('moses', 'lift', 0.5, 4)),
      say('Moses gave one of the twelve, Hoshea, a new name: Joshua, which means “The LORD saves.” In Greek, the same name is Jesus.', ...walk('joshua', { x: 0.4 }, 1.5, 0.5), camera({ zoom: 1.03, x: -0.01 }, slow)),
      verse('NUM 13:18', camera({ zoom: 1, x: 0 }, slow)),
      verse('NUM 13:20', ...['joshua', 'caleb', 'ten-spies'].flatMap((id) => walk(id, { x: 0.96, facing: 1 }, 4, 1)), ...['joshua', 'caleb', 'ten-spies'].map((id) => fadeOut(id, 3))),
    ],
  },
  {
    id: 'l12-e3-s2',
    title: 'A single cluster of grapes',
    music: 'swing-low',
    beats: [
      verse('NUM 13:21', ...swap(KADESH, LAND), ...['tent-1', 'tent-2', 'people', 'moses', 'rod'].map((id) => fadeOut(id)), fadeIn('city', 1.5), fadeIn(WATCHMAN.id, 1.5), fadeIn(SPIES, 2)),
      verse('NUM 13:23', fadeIn(CLUSTER, 0.5), fadeIn('cluster-glow', 0.5, 0.85)),
      play('forty-days-in-canaan', {
        done: [actor(SPIES, { ...COVERS.at(-1)! }, { seconds: 0.5 }), actor(CLUSTER, { x: COVERS.at(-1)!.x, y: COVERS.at(-1)!.y }, { seconds: 0.5 }), actor('cluster-glow', { x: COVERS.at(-1)!.x }, { seconds: 0.5 })],
      }),
      verse('NUM 13:25', ...swap(LAND, KADESH), ...[SPIES, CLUSTER, 'cluster-glow', 'city', WATCHMAN.id].map((id) => fadeOut(id)), ...['tent-1', 'tent-2', 'people', 'moses', 'rod'].map((id) => fadeIn(id, 1.5)), ...['joshua', 'caleb', 'ten-spies'].map((id) => fadeIn(id, 1.5)), ...['joshua', 'caleb', 'ten-spies'].flatMap((id, i) => walk(id, { x: [0.46, 0.51, 0.68][i]!, facing: -1 }, 3, 1.5)), fadeIn('fruit', 2.5)),
      verse('NUM 13:27', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l12-e3-s3',
    title: 'Like grasshoppers',
    music: 'swing-low',
    beats: [
      verse('NUM 13:28', camera({ zoom: 1 }, slow)),
      verse('NUM 13:30', ...walk('caleb', { x: 0.42 }, 1.5, 0.5), ...pose('caleb', 'lift', 2, 3)),
      verse('NUM 13:31', ...pose('ten-spies', 'walk', 0.5, 1)),
      verse('NUM 13:33', camera({ zoom: 1.03 }, slow)),
      verse('NUM 14:1', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1 }, slow), actor('people', { pose: 'walk' }, { seconds: 0.4, delay: 1 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('NUM 14:4'),
    ],
  },
  {
    id: 'l12-e3-s4',
    title: 'Forty years',
    music: 'swing-low',
    beats: [
      verse('NUM 14:6', ...swap('evening-sky', 'forest-sky'), ...walk('joshua', { x: 0.38 }, 1.5, 0.5), actor('joshua', { pose: 'kneel' }, { seconds: 0.8, delay: 2.2 }), actor('caleb', { pose: 'kneel' }, { seconds: 0.8, delay: 2.2 })),
      verse('NUM 14:7', actor('joshua', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 }), actor('caleb', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 })),
      verse('NUM 14:8'),
      verse('NUM 14:9'),
      verse('NUM 14:10', fadeIn('glory', 0.5, 0.9), actor('joshua', { pose: 'idle' }, { seconds: 0.8 }), actor('caleb', { pose: 'idle' }, { seconds: 0.8 })),
      say('Moses prayed for the people again, and God forgave them. But those who had refused to trust him would not enter the land.', fadeOut('glory', 1), ...pose('moses', 'pray', 1, 4)),
      verse('NUM 14:24', ...pose('caleb', 'lift', 0.5, 3)),
      verse('NUM 14:34', ...swap(KADESH, DESERT), ...['tent-1', 'tent-2', 'people', 'moses', 'rod', 'joshua', 'caleb', 'ten-spies', 'fruit'].map((id) => fadeOut(id)), fadeIn('wanderers', 1.5), fadeIn('children', 2), ...walk('wanderers', { x: 0.3 }, 6, 2), ...walk('children', { x: 0.2 }, 6, 2.5)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: spiesSet, scenes }
