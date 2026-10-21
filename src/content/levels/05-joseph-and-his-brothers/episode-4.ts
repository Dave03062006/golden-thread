import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · The Brothers Come for Grain (Genesis 42–43), from the approved Level 5 script.
 *
 * Famine in Canaan: Jacob sends ten sons to Egypt for grain, and keeps Benjamin at home. In
 * the great grain hall the brothers bow to the ground before the governor, and do not know
 * him. Joseph knows them. He tests them, keeps Simeon, and hears them say, "we are guilty
 * concerning our brother"; he turns away and weeps. Then he orders their sacks filled and
 * their money put back: the player fills and loads them ("filling the sacks",
 * minigames/filling-the-sacks), and the sacks glow (this episode's golden thread: the bread
 * of life). When they return with Benjamin, Joseph must go and weep alone; then a feast.
 */

/** The five donkeys, two sacks each, and where each sack rides. */
export const DONKEYS = [0.6, 0.68, 0.76, 0.84, 0.92]
export const DONKEY_Y = 0.795
export const SACKS = DONKEYS.flatMap((x, d) => [-1, 1].map((side, k) => ({ id: `sack-${d * 2 + k + 1}`, x: x + side * 0.011, y: DONKEY_Y - 0.035 })))
/** Where a sack is filled, beside the heap of grain. */
export const FILLING_AT = { x: 0.44, y: 0.795 }

const ABOVE = 'storehouse-hall'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'benjamin' ? 0.038 : 0.042, facing: 1, ...extra })
const BROTHERS = ['reuben', 'simeon', 'judah', 'brother-1', 'brother-2']
const brotherProp = (id: string) => (id.startsWith('brother') ? 'brother' : id)

export const grainSet: SceneDescription = {
  id: 'l05-grain',
  title: 'The brothers come for grain',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dry-hills', depth: 0.3 },
    // Joseph's grain hall, over everything outside.
    { id: 'storehouse-hall', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Jacob's tents in the famine.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.82, y: 0.76, size: 0.13, pose: 'open' },
    // The grain hall: a heap to fill from, the foreigners buying, the donkeys and their sacks.
    { id: 'heap', prop: 'grain-heap', above: ABOVE, x: 0.3, y: 0.795, size: 0.14, opacity: 0 },
    { id: 'buyers', prop: 'crowd', above: ABOVE, x: 0.2, y: 0.8, size: 0.13, facing: 1, opacity: 0 },
    ...DONKEYS.map((x, i): SceneActor => ({ id: `donkey-${i + 1}`, prop: 'donkey', above: ABOVE, x, y: DONKEY_Y, size: 0.06, facing: 1, opacity: 0 })),
    ...SACKS.map((s): SceneActor => ({ id: s.id, prop: 'sack', above: ABOVE, x: s.x, y: s.y, size: 0.018, pose: 'full', opacity: 0 })),
    { id: 'filling-sack', prop: 'sack', above: ABOVE, ...FILLING_AT, size: 0.034, pose: 'empty', opacity: 0 },
    { id: 'silver', prop: 'silver-coins', above: ABOVE, x: FILLING_AT.x, y: FILLING_AT.y - 0.075, size: 0.022, opacity: 0 },
    // The brothers' sacks of grain, glowing: the golden thread.
    { id: 'the-sacks', prop: 'halo', above: ABOVE, x: 0.76, y: 0.67, size: 0.08, opacity: 0 },
    // The feast at Joseph's table.
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.5, y: 0.8, size: 0.3, opacity: 0 },
    { id: 'cakes', prop: 'cakes', above: ABOVE, x: 0.62, y: 0.79, size: 0.05, opacity: 0 },
    // The family, Joseph and his steward.
    person('jacob', 'jacob-old', 0.7, 0.78, { facing: -1 }),
    person('benjamin', 'benjamin', 0.76, 0.785, { facing: -1 }),
    ...BROTHERS.map((id, i) => person(id, brotherProp(id), 0.22 + i * 0.065, 0.78 + (i % 2) * 0.005)),
    { id: 'more-brothers', prop: 'crowd', above: ABOVE, x: 0.1, y: 0.785, size: 0.08, facing: 1 },
    person('joseph', 'joseph-egypt', 0.76, 0.775, { facing: -1, opacity: 0 }),
    person('steward', 'steward', 0.86, 0.78, { facing: -1, opacity: 0 }),
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
const walkTo = (id: string, x: number, delay = 0, seconds = 5, facing: -1 | 1 = x < 0.5 ? -1 : 1) => actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay })
const stop = (id: string, delay: number, pose = 'idle') => actor(id, { pose }, { seconds: 0.5, delay })
const ALL_BROTHERS = [...BROTHERS, 'more-brothers']
const HALL = ['heap', ...DONKEYS.map((_, i) => `donkey-${i + 1}`)]

/** After the filling: every sack loaded, the filling done. */
const LOADED = [...SACKS.map((s) => actor(s.id, { opacity: 1 }, { seconds: 0.6 })), actor('filling-sack', { opacity: 0, pose: 'empty' }, { seconds: 0.6 }), actor('silver', { opacity: 0 }, { seconds: 0.4 })]

const scenes: StoryScene[] = [
  {
    id: 'l05-e4-s1',
    title: 'Grain in Egypt',
    music: 'alyabyev-cherubic-hymn',
    beats: [
      verse('GEN 42:2', actor('jacob', { pose: 'lift' }, { seconds: 1, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('GEN 42:4', camera({ zoom: 1 }, slow), actor('jacob', { pose: 'idle' }, { seconds: 1 }), ...ALL_BROTHERS.map((id, i) => actor(id, { x: -0.1 - i * 0.04, pose: 'walk', facing: -1 }, { seconds: 7, ease: 'inOutSine', delay: 1.5 + i * 0.2 }))),
    ],
  },
  {
    id: 'l05-e4-s2',
    title: 'They bowed themselves before him',
    music: 'alyabyev-cherubic-hymn',
    beats: [
      verse(
        'GEN 42:6',
        // The grain hall: the governor; the brothers come in and bow to the ground.
        ...['jacob', 'benjamin', 'tent'].map((id) => fadeOut(id)),
        layer('storehouse-hall', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('heap', 1),
        fadeIn('buyers', 1.2),
        fadeIn('joseph', 1.5),
        ...ALL_BROTHERS.map((id, i) => actor(id, { x: 0.36 + i * 0.05, pose: 'walk', facing: 1 }, { seconds: 0.1, delay: 1 + i * 0.05 })),
        ...BROTHERS.map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 3 + i * 0.15 })),
        actor('more-brothers', { pose: 'idle' }, { seconds: 0.5, delay: 3 }),
      ),
      verse('GEN 42:8', camera({ zoom: 1.04, x: 0.02 }, slow)),
      verse('GEN 42:9', camera({ zoom: 1, x: 0 }, slow), actor('joseph', { pose: 'lift' }, { seconds: 1 })),
      say(
        'Joseph wanted to know if his brothers had changed. He kept Simeon in prison, and told the others to come back with their youngest brother, Benjamin.',
        actor('joseph', { pose: 'idle' }, { seconds: 1 }),
        ...BROTHERS.map((id) => actor(id, { pose: 'idle' }, { seconds: 1 })),
        fadeIn('steward', 1),
        walkTo('simeon', 1.06, 2, 5, 1),
        actor('simeon', { opacity: 0 }, { seconds: 1, delay: 6 }),
      ),
    ],
  },
  {
    id: 'l05-e4-s3',
    title: '“We are guilty concerning our brother”',
    music: 'alyabyev-cherubic-hymn',
    beats: [
      verse('GEN 42:21', ...['reuben', 'judah', 'brother-1', 'brother-2'].map((id, i) => actor(id, { facing: i % 2 ? -1 : 1 }, { seconds: 0.5, delay: i * 0.2 })), fadeIn('the-sacks', 1, 0.85)),
      verse('GEN 42:24', actor('joseph', { facing: 1, pose: 'pray' }, { seconds: 1 }), actor('joseph', { facing: -1, pose: 'idle' }, { seconds: 1, delay: 5 })),
      play('filling-the-sacks', {
        // The brothers step back; the donkeys wait to be loaded.
        cues: [
          ...['reuben', 'judah', 'brother-1', 'brother-2', 'more-brothers'].map((id, i) => actor(id, { x: 0.04 + i * 0.045, facing: 1 }, { seconds: 1.5, ease: 'inOutSine' })),
          fadeOut('buyers'),
          actor('joseph', { x: 0.53 }, { seconds: 1.5, ease: 'inOutSine' }),
          actor('steward', { x: 0.5 }, { seconds: 0.1 }),
          fadeOut('steward'),
          ...DONKEYS.map((_, i) => fadeIn(`donkey-${i + 1}`, 0.5 + i * 0.15)),
          fadeIn('filling-sack', 1),
        ],
        done: LOADED,
      }),
      verse('GEN 42:25'),
      verse('GEN 42:28', fadeOut('the-sacks', 3), actor('reuben', { pose: 'carry' }, { seconds: 1 }), actor('reuben', { pose: 'idle' }, { seconds: 1, delay: 5 })),
    ],
  },
  {
    id: 'l05-e4-s4',
    title: 'Benjamin',
    music: 'alyabyev-cherubic-hymn',
    beats: [
      verse(
        'GEN 43:1',
        // Back in Canaan, the grain eaten.
        layer('storehouse-hall', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        ...[...HALL, ...SACKS.map((s) => s.id), 'joseph'].map((id) => fadeOut(id)),
        fadeIn('tent', 1),
        fadeIn('jacob', 1),
        fadeIn('benjamin', 1.2),
        ...['reuben', 'judah', 'brother-1', 'brother-2', 'more-brothers'].map((id, i) => actor(id, { x: 0.3 + i * 0.06, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 })),
      ),
      say('Jacob would not let Benjamin go. Then Judah, the brother who had once wanted to sell Joseph, stood up for his youngest brother.', actor('judah', { x: 0.6, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }), stop('judah', 2)),
      verse('GEN 43:9', actor('judah', { pose: 'kneel' }, { seconds: 1 }), actor('jacob', { pose: 'pray' }, { seconds: 1, delay: 3 })),
      verse(
        'GEN 43:30',
        // In Egypt again, Benjamin among them: Joseph hurries away to weep.
        layer('storehouse-hall', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeOut('tent'),
        fadeOut('jacob'),
        actor('judah', { pose: 'idle', x: 0.36 }, { seconds: 0.1, delay: 1.5 }),
        actor('benjamin', { x: 0.62, facing: 1 }, { seconds: 0.1, delay: 1.5 }),
        actor('simeon', { x: 0.24, opacity: 1, pose: 'idle', facing: 1 }, { seconds: 1.5, delay: 1.5 }),
        actor('joseph', { x: 0.78, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 1.5),
        walkTo('joseph', 1.08, 4, 3, 1),
      ),
      verse(
        'GEN 43:34',
        // The feast: Benjamin's portion five times as much.
        actor('joseph', { x: 0.8, facing: -1, pose: 'idle' }, { seconds: 0.1 }),
        fadeIn('mat', 0.5),
        fadeIn('cakes', 1),
        ...['reuben', 'simeon', 'judah', 'brother-1', 'brother-2', 'benjamin'].map((id) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 1 })),
        camera({ zoom: 1.03 }, slow),
      ),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: grainSet, scenes }
