import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · Slavery and the Brave Midwives (Exodus 1), from the approved Level 7 script.
 *
 * Jacob's family has grown into a great people in Goshen. A new Pharaoh, afraid of them,
 * makes them slaves at the brick pits of Pithom and Raamses, and orders the Hebrew midwives,
 * Shiphrah and Puah, to kill the baby boys. They fear God and do not. At night the player
 * guides them through the Hebrew quarter past Pharaoh's watchmen, bringing the newborn sons
 * safely home ("the midwives' night", minigames/the-midwives-night), and a lamp is lit in
 * each window. In the morning one lamp still glows, where a baby is safe (this episode's
 * golden thread: Herod and the Holy Innocents).
 */

/** The houses along the street, each with the window where its lamp is lit. */
export const HOUSES = [0.24, 0.38, 0.52, 0.66, 0.8].map((x, i) => ({ id: `lamp-${i + 1}`, x, y: 0.555 }))
/** Where the midwives start the night, how far apart they walk, and where the watchman stands. */
export const MIDWIVES = { from: 0.08, gap: 0.035, y: 0.785 }
export const WATCHMAN = { x: 0.93 }

const ABOVE = 'hebrew-quarter'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const GOSHEN = ['family-1', 'family-2', 'tent-1', 'tent-2', 'flock']
const PITS = ['workers', 'carrier-1', 'carrier-2', 'taskmaster-1', 'taskmaster-2', 'bricks']

export const slaverySet: SceneDescription = {
  id: 'l07-slavery',
  title: 'Slavery in Egypt',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3 },
    { id: 'brick-pits', depth: 0.3, opacity: 0 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
    { id: 'hebrew-quarter', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Goshen, crowded with Jacob's descendants.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.12, y: 0.735, size: 0.11, pose: 'open' },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.88, y: 0.73, size: 0.1, pose: 'open', facing: -1 },
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.62, y: 0.66, size: 0.024, group: { count: 6, w: 0.14, h: 0.03, seed: 101, bob: 0.002 } },
    // (In Goshen they stand on the grass above the canal.)
    person('family-1', 'hebrew-family', 0.32, { y: 0.74, size: 0.12, facing: 1 }),
    person('family-2', 'hebrew-family', 0.72, { y: 0.74, size: 0.12 }),
    // The brick pits: the workers, the bricks, the taskmasters.
    { id: 'bricks', prop: 'brick-pile', above: ABOVE, x: 0.5, y: 0.79, size: 0.09, opacity: 0 },
    person('workers', 'hebrew-workers', 0.24, { size: 0.15, opacity: 0, facing: 1 }),
    person('carrier-1', 'slave', 0.6, { pose: 'carry', opacity: 0 }),
    person('carrier-2', 'slave', 0.7, { pose: 'carry', opacity: 0, facing: 1 }),
    person('taskmaster-1', 'taskmaster', 0.82, { pose: 'carry', opacity: 0 }),
    person('taskmaster-2', 'taskmaster', 0.42, { opacity: 0, facing: 1 }),
    // Pharaoh's hall.
    { id: 'throne', prop: 'throne', above: ABOVE, x: 0.7, y: 0.79, size: 0.06, opacity: 0 },
    person('pharaoh', 'pharaoh', 0.7, { pose: 'kneel', opacity: 0 }),
    // The Hebrew quarter at night: the lamps in the windows, the watchman's light.
    ...HOUSES.map((h): SceneActor => ({ id: h.id, prop: 'halo', above: ABOVE, x: h.x, y: h.y, size: 0.05, opacity: 0 })),
    { id: 'safe-lamp', prop: 'halo', above: ABOVE, x: HOUSES[2]!.x, y: HOUSES[2]!.y, size: 0.09, opacity: 0 },
    { id: 'watch-light', prop: 'halo', above: ABOVE, x: 0.5, y: 0.7, size: 0.3, opacity: 0 },
    person('watchman', 'watchman', WATCHMAN.x, { pose: 'carry', facing: 1, opacity: 0 }),
    { id: 'lantern', prop: 'halo', above: ABOVE, x: WATCHMAN.x - 0.025, y: 0.7, size: 0.05, opacity: 0 },
    // The midwives.
    person('shiphrah', 'shiphrah', 0.56, { opacity: 0 }),
    person('puah', 'puah', 0.6, { opacity: 0 }),
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
/** Where the midwives stand at the end of the night: at the last house. */
const NIGHT_DONE = [
  actor('shiphrah', { x: HOUSES.at(-1)!.x, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
  actor('puah', { x: HOUSES.at(-1)!.x - MIDWIVES.gap, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
  actor('watch-light', { x: 0.5, opacity: 0 }, { seconds: 0.5 }),
  actor('watchman', { facing: -1 }, { seconds: 0.3 }),
  ...HOUSES.map((h) => actor(h.id, { opacity: 0.9 }, { seconds: 0.5 })),
]

const scenes: StoryScene[] = [
  {
    id: 'l07-e1-s1',
    title: 'A new king',
    music: 'nobody-knows',
    beats: [
      say('Joseph died, and his brothers, and all that generation. But their families stayed in Egypt.', camera({ zoom: 1.02 }, slow)),
      verse('EXO 1:7', camera({ zoom: 1 }, slow), actor('family-1', { x: 0.36 }, { seconds: 4, ease: 'inOutSine' })),
      verse(
        'EXO 1:8',
        // The scene darkens: in his palace, a new Pharaoh frowns.
        ...GOSHEN.map((id) => fadeOut(id)),
        ...swap('goshen-fields', 'pharaoh-hall', 1),
        fadeIn('throne', 2.5),
        fadeIn('pharaoh', 2.5),
      ),
      verse('EXO 1:9', actor('pharaoh', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.03, x: 0.02 }, slow)),
    ],
  },
  {
    id: 'l07-e1-s2',
    title: 'Mortar and brick',
    music: 'nobody-knows',
    beats: [
      verse(
        'EXO 1:11',
        // The brick pits under a hot sun.
        camera({ zoom: 1, x: 0 }, slow),
        fadeOut('throne'),
        fadeOut('pharaoh'),
        ...swap('pharaoh-hall', 'brick-pits', 1),
        ...PITS.map((id) => fadeIn(id, 2.5)),
        ...walkTo('carrier-1', 0.52, 3, 4),
      ),
      verse('EXO 1:12', ...walkTo('carrier-2', 0.86, 0.5, 4, 1), actor('taskmaster-1', { pose: 'lift' }, { seconds: 0.6, delay: 1 }), actor('taskmaster-1', { pose: 'carry' }, { seconds: 0.6, delay: 2 })),
      verse('EXO 1:14', ...walkTo('carrier-1', 0.62, 0.5, 4, 1), camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l07-e1-s3',
    title: 'Shiphrah and Puah',
    music: 'nobody-knows',
    beats: [
      say(
        'Then Pharaoh sent for two Hebrew midwives, Shiphrah and Puah, who helped the mothers when their babies were born. He commanded them: let the baby girls live, but kill the baby boys.',
        // Back in Pharaoh's hall, the two midwives before him.
        camera({ zoom: 1 }, slow),
        ...PITS.map((id) => fadeOut(id)),
        ...swap('brick-pits', 'pharaoh-hall', 1),
        fadeIn('throne', 2.5),
        fadeIn('pharaoh', 2.5),
        actor('shiphrah', { x: 0.36, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('puah', { x: 0.3, facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('shiphrah', 2.5),
        fadeIn('puah', 2.5),
        actor('pharaoh', { pose: 'lift' }, { seconds: 1, delay: 4 }),
      ),
      verse(
        'EXO 1:17',
        // Night in the Hebrew quarter: the lamps not yet lit, the watchman at the end of the street.
        actor('pharaoh', { pose: 'kneel' }, { seconds: 0.5 }),
        fadeOut('throne'),
        fadeOut('pharaoh'),
        fadeOut('shiphrah'),
        fadeOut('puah'),
        ...swap('pharaoh-hall', 'hebrew-quarter', 1),
        ...swap('forest-sky', 'night-sky', 1),
        actor('shiphrah', { x: MIDWIVES.from }, { seconds: 0.1, delay: 2 }),
        actor('puah', { x: MIDWIVES.from - MIDWIVES.gap }, { seconds: 0.1, delay: 2 }),
        fadeIn('shiphrah', 3),
        fadeIn('puah', 3),
        fadeIn('watchman', 3),
        fadeIn('lantern', 3, 0.9),
      ),
      play('the-midwives-night', { done: NIGHT_DONE }),
      verse(
        'EXO 1:18',
        // Morning, and Pharaoh summons them again.
        ...HOUSES.map((h) => fadeOut(h.id)),
        ...['shiphrah', 'puah', 'watchman', 'lantern'].map((id) => fadeOut(id)),
        ...swap('hebrew-quarter', 'pharaoh-hall', 1),
        ...swap('night-sky', 'forest-sky', 1),
        fadeIn('throne', 2.5),
        fadeIn('pharaoh', 2.5),
        actor('shiphrah', { x: 0.36, facing: 1 }, { seconds: 0.1, delay: 2 }),
        actor('puah', { x: 0.3, facing: 1 }, { seconds: 0.1, delay: 2 }),
        fadeIn('shiphrah', 3),
        fadeIn('puah', 3),
        actor('pharaoh', { pose: 'lift' }, { seconds: 1, delay: 4 }),
      ),
      verse('EXO 1:19', actor('pharaoh', { pose: 'kneel' }, { seconds: 0.8 }), actor('shiphrah', { pose: 'carry' }, { seconds: 0.8, delay: 0.5 }), actor('shiphrah', { pose: 'idle' }, { seconds: 0.8, delay: 4 })),
    ],
  },
  {
    id: 'l07-e1-s4',
    title: 'God dealt well with the midwives',
    music: 'nobody-knows',
    beats: [
      verse(
        'EXO 1:20',
        // Dawn in the Hebrew quarter: one lamp still glows, where a baby is safe.
        fadeOut('throne'),
        fadeOut('pharaoh'),
        ...swap('pharaoh-hall', 'hebrew-quarter', 0.5),
        layer('forest-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }),
        fadeIn('safe-lamp', 1, 0.9),
        actor('shiphrah', { x: 0.44, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('puah', { x: 0.4, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('family-1', { x: 0.58, y: 0.785, size: 0.12 }, { seconds: 0.1, delay: 1 }),
        fadeIn('family-1', 2),
      ),
      verse('EXO 1:21', actor('shiphrah', { pose: 'pray' }, { seconds: 1 }), actor('puah', { pose: 'pray' }, { seconds: 1, delay: 0.3 })),
      verse(
        'EXO 1:22',
        // Pharaoh, angry, points toward the river.
        ...['shiphrah', 'puah', 'family-1'].map((id) => fadeOut(id)),
        ...swap('hebrew-quarter', 'pharaoh-hall', 1),
        layer('dawn-sky', { opacity: 0 }, { seconds: 3, delay: 1 }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3, delay: 1 }),
        fadeIn('throne', 2),
        fadeIn('pharaoh', 2),
        actor('pharaoh', { pose: 'lift' }, { seconds: 1, delay: 3.5 }),
      ),
      say('The Bible remembers the names of the two brave midwives, Shiphrah and Puah. It doesn’t even tell us the name of the powerful Pharaoh.', actor('pharaoh', { pose: 'kneel' }, { seconds: 1 }), camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: slaverySet, scenes }
