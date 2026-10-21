import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Benjamin and the Silver Cup (Genesis 44), from the approved Level 5 script.
 *
 * Joseph has his steward fill the brothers' sacks, and hide his silver cup in Benjamin's.
 * On the road, the steward catches up with them. The sacks are searched from the eldest to
 * the youngest: the player opens them in order ("the silver cup", minigames/the-silver-cup),
 * and the cup is found in Benjamin's. None of the brothers goes home without him. Before
 * Joseph, Judah steps forward and offers himself as a slave in the boy's place, and he
 * glows (this episode's golden thread: greater love).
 */

/** The eleven sacks by the road, in order from the eldest brother's to the youngest's. */
export const SACK_OWNERS = ['Reuben', 'Simeon', 'Levi', 'Judah', 'Dan', 'Naphtali', 'Gad', 'Asher', 'Issachar', 'Zebulun', 'Benjamin']
export const ROADSIDE = SACK_OWNERS.map((owner, i) => ({ id: `sack-${i + 1}`, owner, x: 0.08 + i * 0.084, y: 0.77 }))

const ABOVE = 'storehouse-hall'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'benjamin' ? 0.038 : 0.042, facing: 1, ...extra })
const BROTHERS = ['reuben', 'simeon', 'judah', 'brother-1', 'brother-2']
const brotherProp = (id: string) => (id.startsWith('brother') ? 'brother' : id)

export const cupSet: SceneDescription = {
  id: 'l05-cup',
  title: 'Benjamin and the silver cup',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'dry-hills', depth: 0.3 },
    { id: 'storehouse-hall', depth: 0.3 },
  ],
  actors: [
    // In Joseph's house by night: the sacks filled, the cup hidden in the youngest's.
    { id: 'sack', prop: 'sack', above: ABOVE, x: 0.5, y: 0.795, size: 0.034, pose: 'full' },
    { id: 'cup', prop: 'silver-cup', above: ABOVE, x: 0.5, y: 0.73, size: 0.016 },
    // On the road: the brothers' donkeys, and their sacks in a row.
    { id: 'donkeys', prop: 'donkey', above: ABOVE, x: 0.8, y: 0.8, size: 0.06, facing: 1, opacity: 0, group: { count: 4, w: 0.18, h: 0.02, seed: 61 } },
    ...ROADSIDE.map((s): SceneActor => ({ id: s.id, prop: 'sack', above: ABOVE, x: s.x, y: s.y, size: 0.03, pose: 'full', opacity: 0 })),
    { id: 'search-glow', prop: 'halo', above: ABOVE, x: ROADSIDE[0]!.x, y: ROADSIDE[0]!.y - 0.04, size: 0.05, opacity: 0 },
    // Judah, stepping forward between Joseph and Benjamin: the golden thread.
    { id: 'judahs-offer', prop: 'halo', above: ABOVE, x: 0.52, y: 0.6, size: 0.08, opacity: 0 },
    // The brothers, Joseph and his steward.
    ...BROTHERS.map((id, i) => person(id, brotherProp(id), 0.2 + i * 0.06, 0.785, { opacity: 0 })),
    { id: 'more-brothers', prop: 'crowd', above: ABOVE, x: 0.08, y: 0.79, size: 0.08, facing: 1, opacity: 0 },
    person('benjamin', 'benjamin', 0.52, 0.79, { opacity: 0 }),
    person('joseph', 'joseph-egypt', 0.74, 0.78, { facing: -1 }),
    person('steward', 'steward', 0.58, 0.785, { facing: -1 }),
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
const ALL_BROTHERS = [...BROTHERS, 'more-brothers', 'benjamin']

/** After the search: every sack open, the cup in sight on Benjamin's. */
const FOUND = [
  ...ROADSIDE.map((s) => actor(s.id, { pose: 'half' }, { seconds: 0.4 })),
  actor('search-glow', { ...ROADSIDE.at(-1)!, y: ROADSIDE.at(-1)!.y - 0.04, opacity: 0 }, { seconds: 0.4 }),
  actor('cup', { opacity: 1 }, { seconds: 0.4 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l05-e5-s1',
    title: 'The cup in the sack',
    music: 'allegri-miserere',
    beats: [
      verse('GEN 44:1', actor('joseph', { pose: 'lift' }, { seconds: 1 }), actor('steward', { pose: 'work' }, { seconds: 0.6, delay: 1 })),
      verse('GEN 44:2', actor('joseph', { pose: 'carry' }, { seconds: 1 }), actor('cup', { y: 0.765 }, { seconds: 2, ease: 'inOutSine', delay: 1.5 }), actor('cup', { opacity: 0 }, { seconds: 1, delay: 3.5 }), actor('steward', { pose: 'idle' }, { seconds: 0.6, delay: 3 })),
      say(
        'The brothers had not gone far when the steward caught up with them. Why had they returned evil for good, he asked, and stolen his lord’s silver cup?',
        // Morning on the road: the brothers setting off, and the steward hurrying after them.
        actor('joseph', { pose: 'idle' }, { seconds: 1 }),
        fadeOut('joseph'),
        fadeOut('sack'),
        layer('storehouse-hall', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('donkeys', 1),
        ...ALL_BROTHERS.map((id) => fadeIn(id, 1)),
        actor('benjamin', { x: 0.62, facing: -1 }, { seconds: 0.1, delay: 1 }),
        actor('steward', { x: 1.06, facing: -1 }, { seconds: 0.1, delay: 1 }),
        walkTo('steward', 0.74, 2, 4, -1),
        stop('steward', 6),
      ),
      say('The brothers were sure they were innocent. If the cup was found with any of them, they said, he should die, and the rest would become slaves.', actor('judah', { pose: 'lift' }, { seconds: 1 }), actor('judah', { pose: 'idle' }, { seconds: 1, delay: 4 })),
    ],
  },
  {
    id: 'l05-e5-s2',
    title: 'The search',
    music: 'allegri-miserere',
    beats: [
      play('the-silver-cup', {
        // The sacks set down in a row by the road, from the eldest to the youngest; the brothers stand back.
        cues: [
          ...ALL_BROTHERS.map((id, i) => actor(id, { x: 0.04 + i * 0.05, y: 0.715 }, { seconds: 1.5, ease: 'inOutSine' })),
          ...ROADSIDE.map((s, i) => fadeIn(s.id, 0.5 + i * 0.08)),
          actor('cup', { x: ROADSIDE.at(-1)!.x, y: ROADSIDE.at(-1)!.y - 0.045 }, { seconds: 0.1 }),
          actor('steward', { x: 0.88 }, { seconds: 1.5, ease: 'inOutSine' }),
        ],
        done: FOUND,
      }),
      verse('GEN 44:12', camera({ zoom: 1.04, x: 0.03 }, slow)),
      verse('GEN 44:13', camera({ zoom: 1, x: 0 }, slow), ...BROTHERS.map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: i * 0.15 }))),
      say('This was the test. More than twenty years before, they had let their father’s favorite son be carried off as a slave. Would they do it again? They could have gone home without Benjamin. Not one of them did.', ...BROTHERS.map((id) => actor(id, { pose: 'idle' }, { seconds: 1, delay: 2 }))),
    ],
  },
  {
    id: 'l05-e5-s3',
    title: 'Judah’s plea',
    music: 'allegri-miserere',
    beats: [
      verse(
        'GEN 44:16',
        // Back in Joseph's hall, the brothers on their faces before him.
        layer('storehouse-hall', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...[...ROADSIDE.map((s) => s.id), 'cup', 'donkeys', 'steward'].map((id) => fadeOut(id)),
        ...ALL_BROTHERS.map((id, i) => actor(id, { x: 0.12 + i * 0.05, y: 0.785, facing: 1 }, { seconds: 0.1, delay: 1 })),
        actor('benjamin', { x: 0.6 }, { seconds: 0.1, delay: 1 }),
        actor('joseph', { x: 0.76, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 1.5),
        ...BROTHERS.map((id) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 2 })),
        fadeIn('judahs-offer', 2.5, 0.85),
      ),
      verse('GEN 44:18', actor('judah', { pose: 'idle' }, { seconds: 1 }), actor('judah', { x: 0.52, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 1 }), stop('judah', 4, 'carry')),
      verse('GEN 44:30', camera({ zoom: 1.04, x: 0.01 }, slow)),
      verse('GEN 44:33', actor('judah', { pose: 'kneel' }, { seconds: 1 })),
      verse('GEN 44:34', actor('joseph', { pose: 'pray' }, { seconds: 1, delay: 3 }), camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: cupSet, scenes }
