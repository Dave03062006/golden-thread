import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · Melchizedek's Bread and Wine (Genesis 14), from the approved Level 3 script.
 *
 * Four kings carry off Lot from the Jordan valley. By night, near Dan, Abram's men close
 * in on the sleeping camp from two sides, their torches moving from cover to cover while
 * the watchman looks the other way ("by night", minigames/by-night); no fighting is
 * shown, only torches and the captives freed. In the King's Valley at morning,
 * Melchizedek, king of Salem and priest of God Most High, brings out bread and wine and
 * blesses Abram (this episode's golden thread: the Eucharist). Abram refuses the king of
 * Sodom's riches.
 */

/** The night raid: the camp, and each band of torches' way to it, from cover to cover. */
export const NIGHT = {
  camp: { x: 0.5, y: 0.72 },
  bands: [
    {
      id: 'torches-left',
      side: 'left',
      path: [
        { x: 0.06, y: 0.8 },
        { x: 0.18, y: 0.79 },
        { x: 0.29, y: 0.77 },
        { x: 0.38, y: 0.755 },
      ],
    },
    {
      id: 'torches-right',
      side: 'right',
      path: [
        { x: 0.94, y: 0.8 },
        { x: 0.82, y: 0.79 },
        { x: 0.71, y: 0.77 },
        { x: 0.62, y: 0.755 },
      ],
    },
  ],
} as const

const ABOVE = 'salem-hill'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: 0.042, facing: 1, ...extra })

/** Where Melchizedek sets down his gift, and where its glow shows. */
const GIFT = { x: 0.5, y: 0.8 }

export const melchizedekSet: SceneDescription = {
  id: 'l03-melchizedek',
  title: 'Melchizedek’s bread and wine',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'jordan-valley', depth: 0.3 },
    { id: 'night-hill', depth: 0.3, opacity: 0 },
    { id: 'salem-hill', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The four kings' army, marching away with the captives and the spoil.
    ...[0, 1, 2].map((i): SceneActor => ({ id: `army-${i + 1}`, prop: 'crowd', above: ABOVE, x: 0.18 + i * 0.12, y: 0.84 + (i % 2) * 0.01, size: 0.1, facing: 1, pose: 'walk', opacity: 0 })),
    { id: 'spoil', prop: 'cart', above: ABOVE, x: 0.52, y: 0.85, size: 0.1, facing: 1, opacity: 0 },
    { id: 'captives', prop: 'crowd', above: ABOVE, x: 0.06, y: 0.86, size: 0.09, facing: 1, pose: 'walk', opacity: 0 },
    // The camp by night: tents, fires, sleepers, the watchman, and the captives.
    { id: 'camp-tent-1', prop: 'striped-tent', above: ABOVE, x: 0.42, y: 0.7, size: 0.09, pose: 'closed', opacity: 0 },
    { id: 'camp-tent-2', prop: 'striped-tent', above: ABOVE, x: 0.58, y: 0.7, size: 0.09, pose: 'closed', opacity: 0 },
    { id: 'fire-1', prop: 'campfire', above: ABOVE, x: 0.46, y: 0.735, size: 0.04, opacity: 0 },
    { id: 'fire-2', prop: 'campfire', above: ABOVE, x: 0.55, y: 0.74, size: 0.035, opacity: 0 },
    { id: 'watchman', prop: 'crowd', above: ABOVE, x: 0.535, y: 0.73, size: 0.05, facing: -1, opacity: 0 },
    ...NIGHT.bands.map((b): SceneActor => ({ id: b.id, prop: 'torches', above: ABOVE, ...b.path[0], size: 0.08, facing: b.side === 'left' ? 1 : -1, opacity: 0 })),
    // Abram and his people, and Lot.
    person('abram', 'abram', 0.4, 0.82),
    person('lot', 'lot', 0.5, 0.86, { opacity: 0, pose: 'walk' }),
    { id: 'men', prop: 'crowd', above: ABOVE, x: 0.22, y: 0.84, size: 0.1, facing: 1, opacity: 0 },
    // Melchizedek, coming down from Salem with bread and wine: the golden thread.
    person('melchizedek', 'melchizedek', 0.72, 0.62, { facing: -1, opacity: 0 }),
    { id: 'gift', prop: 'bread-and-wine', above: ABOVE, x: 0.7, y: 0.6, size: 0.04, opacity: 0 },
    { id: 'bread-and-wine', prop: 'halo', above: ABOVE, x: GIFT.x, y: 0.735, size: 0.055, opacity: 0 },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.55, y: 0.35, size: 0.3, opacity: 0 },
    // The king of Sodom, with carts of riches.
    person('king', 'king-of-sodom', 0.8, 0.83, { facing: -1, opacity: 0 }),
    { id: 'riches', prop: 'cart', above: ABOVE, x: 0.92, y: 0.85, size: 0.1, facing: -1, opacity: 0 },
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

/** After the raid: both bands of torches around the camp, the watchman turned away. */
const RAID_DONE = [...NIGHT.bands.map((b) => actor(b.id, b.path.at(-1)!, { seconds: 1 })), actor('watchman', { facing: 1 }, { seconds: 0.2 })]
const CAMP = ['camp-tent-1', 'camp-tent-2', 'fire-1', 'fire-2', 'watchman']

const scenes: StoryScene[] = [
  {
    id: 'l03-e3-s1',
    title: 'Lot taken captive',
    music: 'byrd-ave-verum',
    beats: [
      say(
        'War came to the cities of the plain. Four kings from the east defeated the king of Sodom and his allies.',
        actor('abram', { opacity: 0 }, { seconds: 0.1 }),
        ...['army-1', 'army-2', 'army-3', 'spoil'].map((id, i) => fadeIn(id, i * 0.3)),
        ...['army-1', 'army-2', 'army-3', 'spoil'].map((id, i) => actor(id, { x: 0.62 + i * 0.12 }, { seconds: 10, ease: 'inOutSine', delay: 1 + i * 0.2 })),
      ),
      verse(
        'GEN 14:12',
        fadeIn('captives'),
        fadeIn('lot'),
        actor('captives', { x: 0.36 }, { seconds: 8, ease: 'inOutSine' }),
        actor('lot', { x: 0.46, y: 0.86 }, { seconds: 8, ease: 'inOutSine' }),
      ),
      say('A man who escaped ran all the way to Mamre to tell Abram.', ...['army-1', 'army-2', 'army-3', 'spoil', 'captives', 'lot'].map((id) => fadeOut(id, 1))),
    ],
  },
  {
    id: 'l03-e3-s2',
    title: 'By night',
    music: 'byrd-ave-verum',
    beats: [
      verse(
        'GEN 14:14',
        // Night in the far north: the enemy camp asleep around its fires.
        layer('forest-sky', { opacity: 0 }, { seconds: 3 }),
        layer('night-sky', { opacity: 1 }, { seconds: 3 }),
        layer('jordan-valley', { opacity: 0 }, { seconds: 3 }),
        layer('night-hill', { opacity: 1 }, { seconds: 3 }),
        ...CAMP.map((id, i) => fadeIn(id, 1 + i * 0.3)),
        actor('lot', { x: 0.455, y: 0.74, pose: 'idle' }, { seconds: 0.1 }),
        fadeIn('lot', 2),
        ...NIGHT.bands.map((b) => fadeIn(b.id, 2.5)),
      ),
      play('by-night', { cues: [], done: RAID_DONE }),
      verse(
        'GEN 14:16',
        // The captives run free to Abram's men.
        actor('lot', { x: 0.36, y: 0.79, pose: 'walk', facing: -1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('lot', { pose: 'idle' }, { seconds: 0.5, delay: 4 }),
        ...CAMP.map((id) => fadeOut(id, 3)),
      ),
    ],
  },
  {
    id: 'l03-e3-s3',
    title: 'The priest-king of Salem',
    music: 'byrd-ave-verum',
    beats: [
      say(
        'On the way home, a mysterious man came out to meet Abram.',
        // The King's Valley at morning, below Salem on its hill.
        layer('night-sky', { opacity: 0 }, { seconds: 3 }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3 }),
        layer('night-hill', { opacity: 0 }, { seconds: 3 }),
        layer('salem-hill', { opacity: 1 }, { seconds: 3 }),
        ...NIGHT.bands.map((b) => fadeOut(b.id)),
        actor('abram', { x: 0.4, y: 0.82, facing: 1, pose: 'idle' }, { seconds: 0.1 }),
        fadeIn('abram', 1),
        actor('lot', { x: 0.32, y: 0.83, facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('men', 1.2),
        fadeIn('melchizedek', 2),
        fadeIn('gift', 2),
        actor('melchizedek', { x: 0.58, y: 0.82, pose: 'walk' }, { seconds: 6, ease: 'inOutSine', delay: 2.5 }),
        actor('gift', { x: GIFT.x, y: GIFT.y }, { seconds: 6, ease: 'inOutSine', delay: 2.5 }),
        actor('melchizedek', { pose: 'carry' }, { seconds: 0.5, delay: 8.5 }),
      ),
      verse('GEN 14:18', fadeIn('bread-and-wine', 0.5, 0.85), fadeIn('glory', 1, 0.5), actor('abram', { pose: 'kneel' }, { seconds: 1, delay: 1 })),
      verse('GEN 14:19', actor('melchizedek', { pose: 'lift' }, { seconds: 1 })),
      verse('GEN 14:20', actor('melchizedek', { pose: 'idle' }, { seconds: 1, delay: 3 }), fadeOut('glory', 4)),
    ],
  },
  {
    id: 'l03-e3-s4',
    title: 'Not a thread',
    music: 'byrd-ave-verum',
    beats: [
      say('The king of Sodom offered Abram all the riches he had won back.', actor('abram', { pose: 'idle' }, { seconds: 1 }), fadeIn('king'), fadeIn('riches', 0.4), camera({ x: 0.02 }, slow)),
      verse('GEN 14:23', actor('abram', { pose: 'lift' }, { seconds: 1 })),
      say('Abram would be made rich by God alone, not by Sodom.', camera({ x: 0 }, slow), actor('king', { x: 0.92, pose: 'walk', facing: 1 }, { seconds: 5, ease: 'inOutSine', delay: 1 }), fadeOut('king', 4), fadeOut('riches', 4)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: melchizedekSet, scenes }
