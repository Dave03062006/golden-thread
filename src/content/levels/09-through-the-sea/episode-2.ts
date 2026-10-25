import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · The Waters Part (Exodus 14:15–31), from the approved Level 9 script.
 *
 * "Tell the people of Israel to go forward." Moses stretches out his hand over the sea, and
 * a strong east wind blows all night and makes the sea dry land. The people walk into the
 * sea on dry ground, the waters a wall on their right and on their left, and the dry path
 * glows (this episode's golden thread: Baptism). The player leads them across, seen from
 * above ("the path through the sea", minigames/the-path-through-the-sea), gathering the
 * stragglers on the way. At dawn the waters return, and nothing of Pharaoh's army is seen;
 * the people stand safe on the far shore, and believe.
 */

/** The crossroads on the seabed, seen from above (as fractions of the frame), and the paths between them. */
export const NODES = [
  { x: 0.08, y: 0.48 },
  { x: 0.2, y: 0.4 },
  { x: 0.24, y: 0.62 },
  { x: 0.34, y: 0.32 },
  { x: 0.44, y: 0.5 },
  { x: 0.38, y: 0.16 },
  { x: 0.56, y: 0.42 },
  { x: 0.58, y: 0.64 },
  { x: 0.68, y: 0.28 },
  { x: 0.78, y: 0.44 },
  { x: 0.76, y: 0.14 },
  { x: 0.92, y: 0.38 },
]
export const PATHS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 5],
  [3, 4],
  [4, 7],
  [4, 6],
  [6, 8],
  [8, 10],
  [8, 9],
  [9, 11],
]
export const START = 0
export const SHORE = 11
/** The stragglers on the way across, where each waits, and what each one tells. */
export const STRAGGLERS: Record<number, { id: string; pose: string; title: string; text: string }> = {
  3: { id: 'map-child', pose: 'child', title: 'A child', text: 'Stopped to look at the fish in the wall of water. She takes Moses’ hand.' },
  6: { id: 'map-elder', pose: 'elder', title: 'An old man', text: 'Resting on a rock. He gets up and walks on.' },
  9: { id: 'map-lamb', pose: 'lamb', title: 'A lost lamb', text: 'Wandered off from the flock. Now it follows too.' },
}
/** What blocks each way that goes nowhere. */
export const DEAD_ENDS: Record<number, { title: string; text: string }> = {
  2: { title: 'A deep pool', text: 'Water left in a hollow of the seabed. The people turn back.' },
  5: { title: 'Rocks', text: 'Too steep for the flocks and the carts. The people turn back.' },
  7: { title: 'A deep pool', text: 'No way on through the water. The people turn back.' },
  10: { title: 'Rocks', text: 'A reef of rock blocks the way. The people turn back.' },
}
/** The families who follow Moses all the way, behind him on the map. */
export const FOLLOWERS = ['map-family-1', 'map-family-2']

const ABOVE = 'sea-map'
const MAP = 'sea-map'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: 1, ...extra })
const SHORE_ACTORS = ['moses', 'rod', 'people', 'more-people', 'flock', 'pillar', 'pillar-light']
const CROSSING = ['walkers', 'walkers-2', 'walk-flock', 'fish', 'path-glow-thread']

export const partingSet: SceneDescription = {
  id: 'l09-the-sea-parts',
  title: 'The waters part',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'red-sea-shore', depth: 0.3 },
    { id: 'sea-walls', depth: 0.3, opacity: 0 },
    { id: 'sea-map', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // On the shore at night: Moses with his rod raised over the sea, the people behind him, the pillar of fire.
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: 0.12, y: 0.76, size: 0.06, pose: 'fire' },
    { id: 'pillar-light', prop: 'halo', above: ABOVE, x: 0.12, y: 0.56, size: 0.14, opacity: 0.8 },
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.2, y: 0.8, size: 0.026, group: { count: 5, w: 0.1, h: 0.012, seed: 201, bob: 0.002 } },
    person('people', 'hebrew-family', 0.32, { size: 0.12 }),
    person('more-people', 'hebrew-workers', 0.48, { size: 0.12 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.678, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.66),
    // Between the walls of water: the people walking through, the fish in the walls, the dry path's glow: the golden thread.
    { id: 'fish', prop: 'fish', above: ABOVE, x: 0.5, y: 0.45, size: 0.02, opacity: 0, group: { count: 9, w: 0.8, h: 0.18, seed: 203, bob: 0.006 } },
    { id: 'path-glow-thread', prop: 'halo', above: ABOVE, x: 0.5, y: 0.7, size: 0.1, opacity: 0 },
    person('walkers', 'hebrew-family', -0.2, { size: 0.12, pose: 'walk', opacity: 0 }),
    person('walkers-2', 'hebrew-workers', -0.45, { size: 0.12, pose: 'walk', opacity: 0 }),
    { id: 'walk-flock', prop: 'sheep', above: ABOVE, x: -0.6, y: 0.8, size: 0.026, pose: 'walk', facing: 1, opacity: 0, group: { count: 4, w: 0.08, h: 0.01, seed: 205, bob: 0.002 } },
    // The map of the seabed: the stragglers, the families following, the way's glow, and Moses.
    ...Object.entries(STRAGGLERS).map(([n, s]): SceneActor => ({ id: s.id, prop: 'map-token', above: MAP, x: NODES[Number(n)]!.x + 0.04, y: NODES[Number(n)]!.y - 0.04, size: 0.032, pose: s.pose, opacity: 0 })),
    ...FOLLOWERS.map((id): SceneActor => ({ id, prop: 'map-token', above: MAP, x: NODES[START]!.x, y: NODES[START]!.y, size: 0.032, pose: 'family', opacity: 0 })),
    { id: 'way-glow', prop: 'halo', above: MAP, ...NODES[1]!, size: 0.05, opacity: 0 },
    { id: 'map-moses', prop: 'map-token', above: MAP, ...NODES[START]!, size: 0.04, pose: 'moses', opacity: 0 },
    // On the far shore in the morning: children running on the sand.
    person('boy', 'boy', 0.58, { size: 0.026, y: 0.79, opacity: 0 }),
    person('girl', 'girl', 0.64, { size: 0.026, y: 0.79, facing: -1, opacity: 0 }),
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.004 },
      { at: 20, value: 0.004, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.003, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.008, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const MAP_TOKENS = [...Object.values(STRAGGLERS).map((s) => s.id), ...FOLLOWERS, 'map-moses']

const scenes: StoryScene[] = [
  {
    id: 'l09-e2-s1',
    title: '“Go forward”',
    music: 'victimae-paschali',
    beats: [
      verse('EXO 14:15', camera({ zoom: 1.02 }, slow)),
      verse('EXO 14:16', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 })),
      verse(
        'EXO 14:21',
        // The east wind: the sea draws back, and the walls of water stand.
        camera({ zoom: 1 }, slow),
        ...SHORE_ACTORS.map((id) => fadeOut(id, 1)),
        ...swap('red-sea-shore', 'sea-walls', 2),
        fadeIn('fish', 4),
      ),
    ],
  },
  {
    id: 'l09-e2-s2',
    title: 'On dry ground',
    music: 'victimae-paschali',
    beats: [
      verse(
        'EXO 14:22',
        // The people walk into the sea on dry ground; the dry path glows.
        fadeIn('path-glow-thread', 0.5, 0.85),
        ...['walkers', 'walkers-2', 'walk-flock'].map((id) => fadeIn(id, 0.5)),
        actor('walkers', { x: 0.56 }, { seconds: 9, delay: 0.5 }),
        actor('walkers-2', { x: 0.32 }, { seconds: 9, delay: 0.5 }),
        actor('walk-flock', { x: 0.14 }, { seconds: 9, delay: 0.5 }),
      ),
      play('the-path-through-the-sea', {
        // The dry path's glow stays, for the golden thread.
        cues: [...swap('sea-walls', 'sea-map'), ...CROSSING.filter((id) => id !== 'path-glow-thread').map((id) => fadeOut(id)), ...MAP_TOKENS.map((id) => fadeIn(id, 1.5))],
        done: [
          actor('map-moses', NODES[SHORE]!, { seconds: 0.5 }),
          ...FOLLOWERS.map((id) => actor(id, NODES[SHORE]!, { seconds: 0.5 })),
          ...Object.values(STRAGGLERS).map((s) => actor(s.id, NODES[SHORE]!, { seconds: 0.5 })),
          actor('way-glow', { ...NODES[SHORE]!, opacity: 0 }, { seconds: 0.5 }),
        ],
      }),
      say(
        'All night they walked, and before morning the whole people had come across, the old and the young, the flocks and the herds. Not one was left behind.',
        ...swap('sea-map', 'sea-walls'),
        ...MAP_TOKENS.map((id) => fadeOut(id)),
        ...CROSSING.map((id) => fadeIn(id, 1, id === 'path-glow-thread' ? 0.85 : 1)),
        actor('walkers', { x: 1.2 }, { seconds: 8, delay: 1 }),
        actor('walkers-2', { x: 0.96 }, { seconds: 8, delay: 1 }),
        actor('walk-flock', { x: 0.8 }, { seconds: 8, delay: 1 }),
      ),
    ],
  },
  {
    id: 'l09-e2-s3',
    title: 'The sea returns',
    music: 'victimae-paschali',
    beats: [
      verse(
        'EXO 14:25',
        // Dawn on the far shore: Moses, and the people safe behind him.
        ...CROSSING.map((id) => fadeOut(id)),
        ...swap('sea-walls', 'red-sea-shore', 1),
        ...swap('night-sky', 'dawn-sky', 1),
        actor('moses', { x: 0.3, pose: 'idle', facing: -1 }, { seconds: 0.1 }),
        actor('rod', { x: 0.282 }, { seconds: 0.1 }),
        actor('people', { x: 0.56, facing: -1 }, { seconds: 0.1 }),
        actor('more-people', { x: 0.72, facing: -1 }, { seconds: 0.1 }),
        actor('flock', { x: 0.86 }, { seconds: 0.1 }),
        ...['moses', 'rod', 'people', 'more-people', 'flock'].map((id) => fadeIn(id, 2.5)),
      ),
      verse('EXO 14:26', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 14:28', actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 4 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e2-s4',
    title: 'They believed',
    music: 'victimae-paschali',
    beats: [
      verse('EXO 14:29', ...swap('dawn-sky', 'forest-sky'), fadeIn('boy', 1), fadeIn('girl', 1.3), actor('boy', { x: 0.44, pose: 'walk', facing: -1 }, { seconds: 3, ease: 'inOutSine', delay: 2 }), actor('boy', { pose: 'idle' }, { seconds: 0.4, delay: 5 })),
      verse('EXO 14:31', actor('people', { pose: 'walk' }, { seconds: 0.4 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 0.8 }), camera({ zoom: 1.02 }, slow)),
      say('The day before, they had been slaves running for their lives. Now they were free, and the sea lay between them and Egypt.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: partingSet, scenes }
