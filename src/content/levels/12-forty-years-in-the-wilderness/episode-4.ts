import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Korah's Rebellion and Aaron's Rod (Numbers 16–17), from the approved Level 12
 * script.
 *
 * Korah and two hundred and fifty leaders rise up against Moses and Aaron, and the ground
 * opens under Korah's tents. When a plague spreads, Aaron runs with his censer and stands
 * between the dead and the living. Then the leaders of the twelve tribes bring their staffs,
 * and the player matches each leader with his tribe's staff ("the twelve rods",
 * minigames/the-twelve-rods), laid before the ark. In the morning, Aaron's rod has blossomed
 * (this episode's golden thread: Christ, called by God "just as Aaron was").
 */

/** The twelve staffs, one for each tribe (Joseph's one, and Levi's with Aaron's name), each with its tribe's sign. */
export const RODS = [
  ['Judah', 'The lion'],
  ['Issachar', 'The donkey'],
  ['Zebulun', 'The ship'],
  ['Reuben', 'The water'],
  ['Simeon', 'The tower'],
  ['Gad', 'The tent'],
  ['Joseph', 'The fruitful vine'],
  ['Benjamin', 'The wolf'],
  ['Dan', 'The scales'],
  ['Asher', 'The olive tree'],
  ['Naphtali', 'The deer'],
  ['Levi', 'Aaron’s name'],
].map(([tribe, sign], i) => ({ tribe: tribe!, sign: sign!, id: `rod-${tribe!.toLowerCase()}`, x: Math.round((0.17 + i * 0.06) * 1000) / 1000 }))
export const RODS_Y = 0.8

const CAMP = 'dry-hills'
const TENT = 'holy-place'
const person = personOn(CAMP)
const REBELS = ['korah', 'rebels', 'censers', 'korah-tent']

export const rodSet: SceneDescription = {
  id: 'l12-rod',
  title: 'Korah’s rebellion and Aaron’s rod',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: TENT, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp: Korah's tent, Korah and his company with their censers, and Moses and Aaron.
    { id: 'korah-tent', prop: 'striped-tent', above: CAMP, x: 0.84, y: 0.75, size: 0.11, pose: 'open', facing: -1 },
    person('rebels', 'elders', 0.72, { size: 0.12 }),
    { id: 'censers', prop: 'fire-pot', above: CAMP, x: 0.68, y: 0.74, size: 0.016 },
    person('korah', 'korah', 0.62),
    { id: 'rod', prop: 'staff', above: CAMP, x: 0.318, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.3, { facing: 1 }),
    person('aaron', 'high-priest', 0.38, { facing: 1 }),
    { id: 'dust', prop: 'dust-cloud', above: CAMP, x: 0.76, y: 0.74, size: 0.3, opacity: 0 },
    person('people', 'hebrew-family', 0.14, { size: 0.12, facing: 1, opacity: 0 }),
    // The plague stopped: Aaron's censer and its smoke between the dead and the living.
    { id: 'incense', prop: 'smoke-column', above: CAMP, x: 0.52, y: 0.73, size: 0.06, opacity: 0 },
    { id: 'censer', prop: 'fire-pot', above: CAMP, x: 0.5, y: 0.74, size: 0.016, opacity: 0 },
    // In the tent, before the ark: the twelve staffs, and Aaron's rod, blossomed (the golden thread).
    { id: 'ark', prop: 'tabernacle-piece', above: TENT, x: pieceX('ark', 0.5, 1.4), y: 0.7, size: 1.4, pose: 'ark', opacity: 0 },
    ...RODS.map((r): SceneActor => ({ id: r.id, prop: 'rod', above: TENT, x: r.x, y: RODS_Y, size: 0.012, pose: 'dry', opacity: 0 })),
    { id: 'rod-glow', prop: 'halo', above: TENT, x: RODS.at(-1)!.x, y: 0.7, size: 0.12, opacity: 0 },
    { id: 'budded', prop: 'rod', above: TENT, x: RODS.at(-1)!.x, y: RODS_Y, size: 0.012, pose: 'budded', opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l12-e4-s1',
    title: '“You have gone too far!”',
    music: 'vivaldi-spring-allegro',
    beats: [
      verse('NUM 16:3', ...pose('korah', 'lift', 0.5, 4)),
      verse('NUM 16:9', ...walk('moses', { x: 0.42 }, 1.5, 0.5), actor('rod', { x: 0.438 }, { seconds: 1.5, ease: 'inOutSine', delay: 0.5 })),
      verse('NUM 16:10'),
      say('Korah and his men were not content to serve God; they wanted to take for themselves what God had given to Aaron. Moses left it to God to show whom he had chosen.', camera({ zoom: 1.02 }, slow)),
      verse('NUM 16:31', camera({ zoom: 1, x: 0.004 }, { seconds: 0.5 }), camera({ zoom: 1, x: -0.004 }, { seconds: 0.5, delay: 0.5 }), camera({ zoom: 1, x: 0 }, { seconds: 0.5, delay: 1 }), fadeIn('dust', 0.3, 0.9), ...REBELS.map((id) => fadeOut(id, 0.8)), fadeOut('dust', 3)),
    ],
  },
  {
    id: 'l12-e4-s2',
    title: 'Between the dead and the living',
    music: 'vivaldi-spring-allegro',
    beats: [
      verse('NUM 16:41', fadeIn('people', 0.5), ...walk('people', { x: 0.24 }, 2, 0.5)),
      verse('NUM 16:46', ...swap('forest-sky', 'storm-sky'), ...pose('moses', 'lift', 0.5, 3)),
      verse('NUM 16:47', fadeIn('censer', 0.3), ...walk('aaron', { x: 0.5 }, 1.2, 0.3), actor('censer', { x: 0.52 }, { seconds: 1.2, ease: 'inOutSine', delay: 0.3 }), fadeIn('incense', 1.5, 0.8)),
      verse('NUM 16:48', ...swap('storm-sky', 'forest-sky', 1), actor('aaron', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 }), actor('aaron', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
    ],
  },
  {
    id: 'l12-e4-s3',
    title: 'The rod that budded',
    music: 'vivaldi-spring-allegro',
    beats: [
      verse('NUM 17:2', ...swap(CAMP, TENT), ...['moses', 'rod', 'aaron', 'people', 'censer', 'incense'].map((id) => fadeOut(id)), fadeIn('ark', 1.5)),
      verse('NUM 17:5', fadeIn('rod-glow', 0.5, 0.85)),
      play('the-twelve-rods', { done: RODS.map((r) => actor(r.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('NUM 17:8', fadeOut(RODS.at(-1)!.id, 1), fadeIn('budded', 1), actor('rod-glow', { size: 0.18 }, slow), camera({ zoom: 1.03 }, slow)),
      verse('NUM 17:10', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: rodSet, scenes }
