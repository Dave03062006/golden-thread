import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · Bricks Without Straw (Exodus 5:6–6:1), from the approved Level 8 script.
 *
 * Pharaoh gives no more straw for the bricks, but demands the same number. The people
 * scatter over the harvested fields, and the player gathers the stubble ("gathering
 * stubble", minigames/gathering-stubble): however much is gathered, it is never enough. The
 * foremen are punished, and turn on Moses and Aaron. Alone by the river at evening, Moses
 * brings his question to God; his open hands glow (this episode's golden thread: "Come to
 * me, all who labor"), and God answers: "Now you shall see what I will do to Pharaoh."
 */

/** The patches of stubble left in the field, the pile by the brick pit, and the count. */
export const PATCHES = [
  [0.12, 0.66],
  [0.26, 0.7],
  [0.38, 0.64],
  [0.5, 0.71],
  [0.62, 0.65],
  [0.74, 0.7],
  [0.86, 0.64],
  [0.94, 0.71],
].map(([x, y], i) => ({ id: `stubble-${i + 1}`, x: x!, y: y! }))
export const PILE = { x: 0.08, y: 0.79, from: 0.02, to: 0.07 }
/** How many bricks Pharaoh demands each day, and how many each patch of stubble makes. */
export const DEMANDED = 30
export const PER_PATCH = 3

const ABOVE = 'nile-reeds'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const strawSet: SceneDescription = {
  id: 'l08-bricks',
  title: 'Bricks without straw',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'brick-pits', depth: 0.3 },
    { id: 'stubble-field', depth: 0.3, opacity: 0 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
    { id: 'nile-reeds', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The brick pits: the taskmaster with Pharaoh's order, the workers.
    person('taskmaster', 'taskmaster', 0.66, { pose: 'carry' }),
    person('workers', 'hebrew-workers', 0.28, { size: 0.15, facing: 1 }),
    // The field: the stubble, the pile of it by the pit, the gatherers.
    ...PATCHES.map((p): SceneActor => ({ id: p.id, prop: 'stubble', above: ABOVE, x: p.x, y: p.y, size: 0.05, opacity: 0 })),
    { id: 'pile', prop: 'stubble', above: ABOVE, x: PILE.x, y: PILE.y, size: PILE.from, opacity: 0 },
    // Pharaoh's hall: the foremen before him.
    { id: 'throne', prop: 'throne', above: ABOVE, x: 0.74, y: 0.79, size: 0.06, opacity: 0 },
    person('pharaoh', 'pharaoh', 0.74, { pose: 'kneel', opacity: 0 }),
    person('foreman-1', 'slave', 0.5, { facing: 1, opacity: 0 }),
    person('foreman-2', 'brother', 0.42, { facing: 1, opacity: 0 }),
    // Moses and Aaron; Moses' open hands as he prays are the golden thread.
    person('moses', 'moses-shepherd', 1.1),
    person('aaron', 'aaron', 1.18),
    { id: 'moses-prayer', prop: 'halo', above: ABOVE, x: 0.5, y: 0.66, size: 0.08, opacity: 0 },
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
const walkTo = (id: string, x: number, delay = 0, seconds = 4, facing: -1 | 1 = x < 0.5 ? -1 : 1) => [actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds })]

const scenes: StoryScene[] = [
  {
    id: 'l08-e2-s1',
    title: 'No more straw',
    music: 'mozart-lacrimosa',
    beats: [
      verse('EXO 5:6', actor('taskmaster', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 5:7', actor('taskmaster', { pose: 'carry' }, { seconds: 0.8 })),
      verse('EXO 5:9', actor('workers', { facing: -1 }, { seconds: 0.4, delay: 2 }), camera({ zoom: 1 }, slow)),
      verse(
        'EXO 5:12',
        // The people scatter over the harvested fields, gathering stubble.
        fadeOut('taskmaster'),
        ...swap('brick-pits', 'stubble-field', 1),
        // They walk off across the field, leaving the stubble to the player.
        actor('workers', { x: 1.2, pose: 'walk', facing: 1 }, { seconds: 5, ease: 'inOutSine', delay: 0.5 }),
        ...PATCHES.map((p, i) => fadeIn(p.id, 2 + i * 0.15)),
        fadeIn('pile', 3),
      ),
      play('gathering-stubble', {
        done: [...PATCHES.map((p) => actor(p.id, { opacity: 0 }, { seconds: 0.5 })), actor('pile', { size: PILE.to }, { seconds: 0.5 })],
      }),
      verse(
        'EXO 5:13',
        fadeIn('taskmaster', 0.5),
        actor('taskmaster', { x: 0.7, pose: 'lift' }, { seconds: 0.1 }),
        actor('workers', { x: 0.36, pose: 'walk', facing: -1 }, { seconds: 4, ease: 'outCubic' }),
        actor('workers', { pose: 'idle' }, { seconds: 0.4, delay: 4 }),
      ),
    ],
  },
  {
    id: 'l08-e2-s2',
    title: 'The foremen cry out',
    music: 'mozart-lacrimosa',
    beats: [
      say(
        'The foremen were punished, because the people could not make as many bricks as before.',
        ...['taskmaster', 'workers', 'pile'].map((id) => fadeOut(id)),
        ...swap('stubble-field', 'pharaoh-hall', 1),
        ...['throne', 'pharaoh', 'foreman-1', 'foreman-2'].map((id) => fadeIn(id, 2.5)),
      ),
      verse('EXO 5:15', ...['foreman-1', 'foreman-2'].map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 0.5 + i * 0.3 }))),
      verse('EXO 5:17', actor('pharaoh', { pose: 'lift' }, { seconds: 0.8 }), actor('pharaoh', { facing: 1 }, { seconds: 0.5, delay: 4 })),
      verse(
        'EXO 5:21',
        // Outside, the foremen meet Moses and Aaron, and turn on them.
        ...['throne', 'pharaoh'].map((id) => fadeOut(id)),
        ...swap('pharaoh-hall', 'brick-pits', 0.5),
        ...['foreman-1', 'foreman-2'].map((id) => actor(id, { pose: 'idle', facing: 1 }, { seconds: 0.5, delay: 1 })),
        ...walkTo('moses', 0.66, 1.5, 4, -1),
        ...walkTo('aaron', 0.74, 1.8, 4, -1),
        actor('foreman-1', { pose: 'lift' }, { seconds: 0.6, delay: 6 }),
      ),
    ],
  },
  {
    id: 'l08-e2-s3',
    title: '“Why didst thou ever send me?”',
    music: 'mozart-lacrimosa',
    beats: [
      verse(
        'EXO 5:22',
        // Moses alone by the river at evening, his hands open to God.
        ...['foreman-1', 'foreman-2', 'aaron'].map((id) => fadeOut(id)),
        ...swap('brick-pits', 'nile-reeds', 1),
        ...swap('forest-sky', 'evening-sky', 1),
        actor('moses', { x: 0.5, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1.5 }),
        actor('moses', { pose: 'lift' }, { seconds: 1, delay: 3 }),
        fadeIn('moses-prayer', 1, 0.9),
      ),
      verse('EXO 5:23', camera({ zoom: 1.03, y: -0.01 }, slow)),
      verse('EXO 6:1', camera({ zoom: 1, y: 0 }, slow), actor('moses', { pose: 'kneel' }, { seconds: 1.5, delay: 1 })),
      say('When things got worse, Moses did not give up. He took his question straight to God, and God answered him.'),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: strawSet, scenes }
