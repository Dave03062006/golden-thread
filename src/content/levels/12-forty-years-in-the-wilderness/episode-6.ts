import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · The Bronze Serpent (Numbers 21:4–9), from the approved Level 12 script.
 *
 * On the long road around Edom the people grow impatient and speak against God, and fiery
 * serpents come among them. They confess their sin, and Moses prays; God has him set a
 * serpent of bronze on a pole, which glows (this episode's golden thread: "so must the Son of
 * man be lifted up"). The player helps each one who was bitten to look up at it, and live
 * ("look and live", minigames/look-and-live).
 */

/** Those who were bitten, lying in the camp, each with the glow that shows they have looked and live. */
export const BITTEN = [
  { id: 'bitten-1', prop: 'hebrew-father', x: 0.14 },
  { id: 'bitten-2', prop: 'hebrew-mother', x: 0.24 },
  { id: 'bitten-3', prop: 'elder', x: 0.34 },
  { id: 'bitten-4', prop: 'slave', x: 0.66 },
  { id: 'bitten-5', prop: 'grandmother', x: 0.76 },
  { id: 'bitten-6', prop: 'servant', x: 0.88 },
].map((b) => ({ ...b, glow: `${b.id}-glow` }))
export const BITTEN_Y = 0.8
export const POLE = { x: 0.5, y: 0.78 }

const ROAD = 'desert'
const CAMP = 'dry-hills'
const onRoad = personOn(ROAD)
const person = personOn(CAMP, BITTEN_Y)

export const serpentSet: SceneDescription = {
  id: 'l12-serpent',
  title: 'The bronze serpent',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: ROAD, depth: 0.3 },
    { id: CAMP, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The long road around Edom, and the people trudging along it.
    onRoad('walkers', 'hebrew-family', 0.2, { size: 0.12, facing: 1 }),
    onRoad('more-walkers', 'hebrew-workers', 0.36, { size: 0.12, facing: 1 }),
    { id: 'manna', prop: 'manna', above: ROAD, x: 0.6, y: 0.82, size: 0.018, group: { count: 10, w: 0.5, h: 0.02, seed: 216 } },
    { id: 'snakes', prop: 'bronze-serpent', above: ROAD, x: 0.62, y: 0.82, size: 0.03, pose: 'snake', opacity: 0, group: { count: 5, w: 0.5, h: 0.02, seed: 2161 } },
    // The camp: Moses, the serpent of bronze on its pole (the golden thread), and those who were bitten.
    { id: 'rod', prop: 'staff', above: CAMP, x: 0.438, y: 0.785, size: 0.012, opacity: 0 },
    person('moses', 'moses-shepherd', 0.42, { y: 0.785, facing: 1, opacity: 0 }),
    { id: 'forge', prop: 'forge', above: CAMP, x: 0.58, y: 0.8, size: 0.06, opacity: 0 },
    { id: 'serpent-glow', prop: 'halo', above: CAMP, x: POLE.x, y: 0.5, size: 0.2, opacity: 0 },
    { id: 'pole', prop: 'bronze-serpent', above: CAMP, x: POLE.x, y: POLE.y, size: 0.05, pose: 'pole', opacity: 0 },
    person('penitents', 'hebrew-family', 0.3, { y: 0.785, size: 0.12, facing: 1, opacity: 0 }),
    ...BITTEN.flatMap((b): SceneActor[] => [
      { id: b.glow, prop: 'halo', above: CAMP, x: b.x, y: BITTEN_Y - 0.06, size: 0.07, opacity: 0 },
      person(b.id, b.prop, b.x, { pose: 'sit', facing: b.x < 0.5 ? 1 : -1, opacity: 0 }),
    ]),
  ],
  camera: DRIFT,
}

const ROADSIDE = ['walkers', 'more-walkers', 'manna', 'snakes']

const scenes: StoryScene[] = [
  {
    id: 'l12-e6-s1',
    title: 'Impatient on the way',
    music: 'rock-of-ages',
    beats: [
      verse('NUM 21:4', ...walk('walkers', { x: 0.34 }, 5, 0.5), ...walk('more-walkers', { x: 0.5 }, 5, 0.5)),
      verse('NUM 21:5', ...pose('walkers', 'idle', 0, 1)),
      verse('NUM 21:6', fadeIn('snakes', 0.5, 0.9), actor('snakes', { x: 0.45, spread: 1 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 })),
    ],
  },
  {
    id: 'l12-e6-s2',
    title: '“We have sinned”',
    music: 'rock-of-ages',
    beats: [
      verse('NUM 21:7', ...swap(ROAD, CAMP), ...ROADSIDE.map((id) => fadeOut(id)), fadeIn('moses', 1.5), fadeIn('rod', 1.5), fadeIn('penitents', 1.5), ...pose('moses', 'pray', 3, 4)),
      verse('NUM 21:8', fadeIn('forge', 0.5), ...pose('moses', 'work', 1, 4)),
      verse('NUM 21:9', fadeOut('forge', 0.5), fadeIn('pole', 1), fadeIn('serpent-glow', 1.5, 0.85), camera({ zoom: 1.02, y: -0.01 }, slow)),
    ],
  },
  {
    id: 'l12-e6-s3',
    title: 'Look and live',
    music: 'rock-of-ages',
    beats: [
      say('All anyone had to do was look. It was not the bronze that healed them, but God, who had promised.', camera({ zoom: 1, y: 0 }, slow), ...swap('forest-sky', 'evening-sky'), fadeOut('penitents'), ...BITTEN.map((b, i) => fadeIn(b.id, 0.5 + i * 0.2))),
      play('look-and-live', { done: BITTEN.flatMap((b) => [actor(b.id, { pose: 'pray' }, { seconds: 0.5 }), actor(b.glow, { opacity: 0.8 }, { seconds: 0.5 })]) }),
      say('Long afterward, the bronze serpent was kept in Jerusalem, until the people began to burn incense to it as if it were a god. Then good King Hezekiah broke it to pieces (2 Kings 18:4). A sign must never take God’s place.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: serpentSet, scenes }
