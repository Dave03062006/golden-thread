import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 7 · Balaam and His Donkey (Numbers 22), from the approved Level 12 script.
 *
 * Balak, king of Moab, afraid of Israel camped on his plains, sends for the prophet Balaam to
 * curse them; God says they are blessed (this episode's golden thread: Christ "became a curse
 * for us, that… the blessing of Abraham might come upon the Gentiles"), but lets Balaam go,
 * to say only God's word. On the road, only his donkey sees the angel of the LORD: the player
 * steers her around him, into the field, against the vineyard wall, and at the narrow place
 * she lies down ("the narrow way", minigames/the-narrow-way). Then God opens Balaam's eyes.
 */

/** The road: the rider's lane, the three places the angel stands, and the safe way past each. */
export const ROAD_Y = 0.8
export const LANES = { top: 0.7, bottom: 0.86 }
export const MEETINGS = [
  { x: 0.34, safe: 0.72, title: 'Into the field', text: 'The donkey saw the angel standing in the road, and turned aside into the field.' },
  { x: 0.62, safe: 0.85, title: 'Against the wall', text: 'In the narrow path between the vineyards, she pushed against the wall, and pressed Balaam’s foot.' },
  { x: 0.86, safe: ROAD_Y, title: 'No way to turn', text: 'In the narrow place there was no way to turn to the right or to the left, and she lay down under Balaam.' },
]
export const RIDER = { id: 'rider', from: 0.06 }
export const ANGEL = 'angel'
/** How far behind the rider his two servants walk. */
export const BEHIND = 0.1

const PLAINS = 'dry-hills'
const ROAD = 'balaam-road'
const person = personOn(PLAINS)
const onRoad = personOn(ROAD)
const MOAB = ['camp-1', 'camp-2', 'camp-3', 'israel', 'camp-glow', 'balak', 'princes']

export const balaamSet: SceneDescription = {
  id: 'l12-balaam',
  title: 'Balaam and his donkey',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: PLAINS, depth: 0.3 },
    { id: ROAD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The plains of Moab, covered with the tents of Israel (the golden thread: a people God has blessed), and Balak on his hill.
    ...[0.52, 0.66, 0.8].map((x, i) => ({ id: `camp-${i + 1}`, prop: 'striped-tent', above: PLAINS, x, y: 0.72, size: 0.07, pose: 'open', facing: (i % 2 ? -1 : 1) as -1 | 1 })),
    person('israel', 'hebrew-family', 0.72, { y: 0.74, size: 0.09 }),
    { id: 'camp-glow', prop: 'halo', above: PLAINS, x: 0.66, y: 0.66, size: 0.3, opacity: 0 },
    person('balak', 'balak', 0.2, { facing: 1 }),
    person('princes', 'elders', 0.32, { size: 0.12 }),
    // Balaam, far away at home.
    person('balaam', 'balaam', 0.7, { opacity: 0 }),
    // The road: Balaam on his donkey, his two servants, and the angel of the LORD.
    onRoad('servants', 'hebrew-workers', RIDER.from - BEHIND, { size: 0.07, facing: 1, opacity: 0 }),
    { id: RIDER.id, prop: 'balaam-riding', above: ROAD, x: RIDER.from, y: ROAD_Y, size: 0.1, pose: 'walk', opacity: 0 },
    { id: ANGEL, prop: 'angel', above: ROAD, x: MEETINGS[0]!.x, y: ROAD_Y - 0.01, size: 0.07, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l12-e7-s1',
    title: '“Come now, curse this people”',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('NUM 22:3', fadeIn('camp-glow', 0.5, 0.8), camera({ zoom: 1.02, x: 0.01 }, slow)),
      verse('NUM 22:6', camera({ zoom: 1, x: 0 }, slow), ...pose('balak', 'lift', 0.5, 3), ...walk('princes', { x: 0.6, facing: 1 }, 3, 1)),
      verse('NUM 22:12', fadeIn('balaam', 0.5), ...pose('balaam', 'pray', 1, 4)),
      verse('NUM 22:18', ...pose('balaam', 'lift', 0.5, 3)),
      say('Still, Balaam’s heart was drawn to Balak’s silver. God let him go with the messengers, but warned him to say only what God told him.'),
    ],
  },
  {
    id: 'l12-e7-s2',
    title: 'The donkey saw the angel',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('NUM 22:21', ...swap(PLAINS, ROAD), ...[...MOAB, 'balaam'].map((id) => fadeOut(id)), fadeIn(RIDER.id, 1.5), fadeIn('servants', 1.5)),
      verse('NUM 22:22', fadeIn(ANGEL, 1, 0.9)),
      verse('NUM 22:23', camera({ zoom: 1.02 }, slow)),
      play('the-narrow-way', {
        cues: [camera({ zoom: 1 }, slow)],
        done: [actor(RIDER.id, { x: MEETINGS.at(-1)!.x - 0.08, y: ROAD_Y, pose: 'lie' }, { seconds: 0.5 }), actor('servants', { x: MEETINGS.at(-1)!.x - 0.08 - BEHIND }, { seconds: 0.5 }), actor(ANGEL, { x: MEETINGS.at(-1)!.x, opacity: 0.9 }, { seconds: 0.5 })],
      }),
      verse('NUM 22:27'),
      verse('NUM 22:28', camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l12-e7-s3',
    title: 'His eyes opened',
    music: 'handel-water-music-hornpipe',
    beats: [
      verse('NUM 22:30', camera({ zoom: 1 }, slow)),
      verse('NUM 22:31', actor(ANGEL, { size: 0.09 }, slow)),
      verse('NUM 22:34'),
      verse('NUM 22:35', actor(RIDER.id, { pose: 'walk' }, { seconds: 0.6, delay: 1 })),
      say('The great prophet could not see what his donkey saw. God opened Balaam’s eyes, and sent him on, with only one thing to say: God’s word.', fadeOut(ANGEL, 0.5), actor(RIDER.id, { x: 1.05 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 }), actor('servants', { x: 0.99 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 })),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: balaamSet, scenes }
