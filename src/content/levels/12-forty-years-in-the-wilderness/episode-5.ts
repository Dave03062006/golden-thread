import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · Water at Meribah (Numbers 20:1–13, 22–29), from the approved Level 12 script.
 *
 * Miriam dies at Kadesh, and the springs run dry. God tells Moses to speak to the rock; in his
 * anger Moses strikes it, twice, and still the water pours out, and glows (this episode's
 * golden thread: "If any one thirst, let him come to me and drink"). The player carries water
 * to everyone who is thirsty ("water for all", minigames/water-for-all). Moses and Aaron will
 * not lead the people into the land. On Mount Hor, Aaron's garments are put on his son
 * Eleazar, and Aaron dies there; the people mourn him thirty days.
 */

/** Everyone waiting by the pool, thirsty: who they are, where they stand, and the glow that shows they have drunk. */
export const THIRSTY = [
  { id: 'mother', name: 'A mother', x: 0.18 },
  { id: 'child', name: 'A child', x: 0.26 },
  { id: 'old-man', name: 'An old man', x: 0.34 },
  { id: 'shepherd', name: 'A shepherd', x: 0.68 },
  { id: 'flock', name: 'The flock', x: 0.78 },
  { id: 'donkey', name: 'A donkey', x: 0.88 },
].map((p) => ({ ...p, glow: `${p.id}-drank` }))
/** Where the water gathers below the rock, and the jar that carries it. */
export const POOL = { x: 0.5, y: 0.82 }
export const JAR = 'jar'
export const THIRSTY_Y = 0.8

const CAMP = 'dry-hills'
const HOR = 'hilltop'
const person = personOn(CAMP)
const onHor = personOn(HOR, 0.74)
const BELOW = [...THIRSTY.flatMap((p) => [p.id, p.glow]), 'rock', 'stream', 'stream-glow', 'pool', 'moses', 'rod', 'aaron', 'grave', 'tent-1']

export const meribahSet: SceneDescription = {
  id: 'l12-meribah',
  title: 'Water at Meribah',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: HOR, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Kadesh, with Miriam's grave; the rock, and the water that comes from it.
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.06, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'grave', prop: 'dark-stone', above: CAMP, x: 0.12, y: 0.82, size: 0.04 },
    { id: 'rock', prop: 'great-rock', above: CAMP, x: 0.5, y: 0.74, size: 0.16 },
    { id: 'stream', prop: 'stream', above: CAMP, x: 0.5, y: 0.79, size: 0.05, opacity: 0 },
    { id: 'stream-glow', prop: 'halo', above: CAMP, x: 0.5, y: 0.7, size: 0.14, opacity: 0 },
    { id: 'pool', prop: 'pool', above: CAMP, x: POOL.x, y: POOL.y + 0.02, size: 0.12, opacity: 0 },
    // The thirsty, each with the glow that shows they have drunk.
    ...THIRSTY.flatMap((p): SceneActor[] => [
      { id: p.glow, prop: 'halo', above: CAMP, x: p.x, y: THIRSTY_Y - 0.05, size: 0.07, opacity: 0 },
      p.id === 'flock'
        ? { id: p.id, prop: 'sheep', above: CAMP, x: p.x, y: THIRSTY_Y, size: 0.03, group: { count: 3, w: 0.05, h: 0.01, seed: 205 } }
        : p.id === 'donkey'
          ? { id: p.id, prop: 'donkey', above: CAMP, x: p.x, y: THIRSTY_Y, size: 0.05, facing: -1 }
          : person(p.id, { mother: 'hebrew-mother', child: 'girl', 'old-man': 'elder', shepherd: 'hebrew-father' }[p.id]!, p.x, { y: THIRSTY_Y, size: p.id === 'child' ? 0.026 : 0.044, facing: p.x < 0.5 ? 1 : -1, pose: p.id === 'child' ? 'idle' : 'sit' }),
    ]),
    { id: JAR, prop: 'water-jar', above: CAMP, x: POOL.x, y: POOL.y, size: 0.02, opacity: 0 },
    { id: 'rod', prop: 'staff', above: CAMP, x: 0.428, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.41, { facing: 1 }),
    person('aaron', 'high-priest', 0.58),
    { id: 'glory', prop: 'halo', above: CAMP, x: 0.5, y: 0.6, size: 0.4, opacity: 0 },
    // Mount Hor: Moses, Aaron and Eleazar on the top.
    onHor('hor-moses', 'moses-shepherd', 0.42, { facing: 1, opacity: 0 }),
    onHor('hor-aaron', 'high-priest', 0.5, { opacity: 0 }),
    onHor('eleazar', 'eleazar', 0.58, { opacity: 0 }),
    onHor('eleazar-robed', 'high-priest', 0.58, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l12-e5-s1',
    title: 'No water',
    music: 'nobody-knows',
    beats: [
      verse('NUM 20:1', camera({ zoom: 1.03, x: -0.02 }, slow)),
      verse('NUM 20:2', camera({ zoom: 1, x: 0 }, slow), ...['mother', 'old-man', 'shepherd'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.8, delay: 0.5 }))),
      verse('NUM 20:5', ...pose('old-man', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l12-e5-s2',
    title: 'Speak to the rock',
    music: 'nobody-knows',
    beats: [
      verse('NUM 20:6', actor('moses', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 }), actor('aaron', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 }), fadeIn('glory', 1, 0.8)),
      verse('NUM 20:8', fadeOut('glory', 2), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 2 }), actor('aaron', { pose: 'idle' }, { seconds: 0.8, delay: 2 })),
      verse('NUM 20:10', ...pose('moses', 'lift', 0.5, 3)),
      verse('NUM 20:11', ...pose('moses', 'work', 0.3, 1.5), fadeIn('stream', 1.5), fadeIn('pool', 2), fadeIn('stream-glow', 2, 0.85)),
      play('water-for-all', {
        cues: THIRSTY.filter((p) => !['flock', 'donkey', 'child'].includes(p.id)).map((p) => actor(p.id, { pose: 'sit' }, { seconds: 0.6 })),
        done: [...THIRSTY.map((p) => actor(p.glow, { opacity: 0.8 }, { seconds: 0.5 })), actor(JAR, { opacity: 0 }, { seconds: 0.5 })],
      }),
      verse('NUM 20:12', ...THIRSTY.map((p) => fadeOut(p.glow, 1))),
      say('God had told Moses to speak to the rock. Instead, in his anger, Moses struck it, and spoke as if the water came from him and Aaron. God still gave the water, but Moses and Aaron would not lead the people into the land.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l12-e5-s3',
    title: 'Aaron on Mount Hor',
    music: 'nobody-knows',
    beats: [
      verse('NUM 20:24', camera({ zoom: 1 }, slow), ...swap(CAMP, HOR), ...BELOW.map((id) => fadeOut(id)), ...['hor-moses', 'hor-aaron', 'eleazar'].map((id) => fadeIn(id, 1.5))),
      verse('NUM 20:26'),
      verse('NUM 20:27', ...swap('forest-sky', 'evening-sky')),
      say('On the top of the mountain, Moses put Aaron’s priestly garments on Eleazar his son, and Aaron died there. When the people saw that Aaron was gone, they wept for him thirty days.', fadeIn('eleazar-robed', 1.5), fadeOut('eleazar', 1.5), fadeOut('hor-aaron', 4), ...walk('hor-moses', { x: 0.46 }, 2, 5)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: meribahSet, scenes }
