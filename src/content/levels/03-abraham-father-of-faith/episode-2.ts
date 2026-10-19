import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · Lot Chooses the Plain (Genesis 12:10–13:18), from the approved Level 3
 * script.
 *
 * Famine, and the journey down to Egypt, where Abram, afraid, says Sarai is his sister.
 * Back near Bethel, two great camps crowd the same well, and their herdsmen quarrel; the
 * player sorts Abram's sheep from Lot's goats ("dividing the flocks",
 * minigames/dividing-the-flocks). Lot looks down on the green Jordan valley and chooses
 * it. On the hilltop at evening, God tells Abram to look all around: all this land is his.
 * The altar on the hill glows (this episode's golden thread: seek first the kingdom).
 */

/** The well in the middle, and where each side's flock goes: Abram's to the hills on the left, Lot's toward the valley on the right. */
export const WELL = { x: 0.5, y: 0.71 }
export const SIDES = { abram: { edge: 0.4 }, lot: { edge: 0.6 } }

/** The two flocks, mixed together at the well: each animal, whose it is, where it stands, and its place in its own flock. */
export const FLOCKS = [
  { id: 'sheep-1', prop: 'sheep', owner: 'abram', at: { x: 0.42, y: 0.75 }, home: { x: 0.14, y: 0.76 } },
  { id: 'goat-1', prop: 'goat', owner: 'lot', at: { x: 0.46, y: 0.775 }, home: { x: 0.74, y: 0.76 } },
  { id: 'sheep-2', prop: 'sheep', owner: 'abram', at: { x: 0.56, y: 0.76 }, home: { x: 0.2, y: 0.775 } },
  { id: 'goat-2', prop: 'goat', owner: 'lot', at: { x: 0.37, y: 0.77 }, home: { x: 0.8, y: 0.775 } },
  { id: 'sheep-3', prop: 'sheep', owner: 'abram', at: { x: 0.62, y: 0.775 }, home: { x: 0.26, y: 0.76 } },
  { id: 'goat-3', prop: 'goat', owner: 'lot', at: { x: 0.51, y: 0.78 }, home: { x: 0.86, y: 0.76 } },
] as const

const ABOVE = 'jordan-valley'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'sarai' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

export const lotChoosesSet: SceneDescription = {
  id: 'l03-lot-chooses',
  title: 'Lot chooses the plain',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'dry-hills', depth: 0.3 },
    { id: 'egypt-nile', depth: 0.3, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3, opacity: 0 },
    { id: 'jordan-valley', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The two camps, and the crowded well between them.
    { id: 'tent-abram', prop: 'striped-tent', above: ABOVE, x: 0.12, y: 0.68, size: 0.12, pose: 'open', opacity: 0 },
    { id: 'tent-lot', prop: 'striped-tent', above: ABOVE, x: 0.88, y: 0.68, size: 0.12, pose: 'open', opacity: 0 },
    { id: 'well', prop: 'stone-well', above: ABOVE, ...WELL, size: 0.09, opacity: 0 },
    { id: 'herdsmen-abram', prop: 'crowd', above: ABOVE, x: 0.3, y: 0.73, size: 0.09, facing: 1, opacity: 0 },
    { id: 'herdsmen-lot', prop: 'crowd', above: ABOVE, x: 0.7, y: 0.73, size: 0.09, facing: -1, opacity: 0 },
    ...FLOCKS.map((a): SceneActor => ({ id: a.id, prop: a.prop, above: ABOVE, ...a.at, size: a.prop === 'goat' ? 0.045 : 0.042, facing: a.owner === 'abram' ? -1 : 1, pose: 'idle', opacity: 0 })),
    // The family.
    person('abram', 'abram', 0.62, 0.84),
    person('sarai', 'sarai', 0.68, 0.85),
    person('lot', 'lot', 0.75, 0.855),
    { id: 'servants', prop: 'crowd', above: ABOVE, x: 0.86, y: 0.86, size: 0.1, facing: -1 },
    // On the hilltop at Bethel: the altar, glowing (the golden thread), and the oaks of Mamre.
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.42, y: 0.76, size: 0.06, pose: 'lit', opacity: 0 },
    { id: 'bethel-altar', prop: 'halo', above: ABOVE, x: 0.42, y: 0.68, size: 0.06, opacity: 0 },
    { id: 'oak-1', prop: 'great-oak', above: ABOVE, x: 0.2, y: 0.8, size: 0.26, opacity: 0 },
    { id: 'oak-2', prop: 'great-oak', above: ABOVE, x: 0.82, y: 0.79, size: 0.24, opacity: 0 },
    { id: 'mamre-tent', prop: 'striped-tent', above: ABOVE, x: 0.66, y: 0.78, size: 0.12, pose: 'open', opacity: 0 },
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
const walkTo = (id: string, x: number, y: number, delay = 0, seconds = 6) => actor(id, { x, y, pose: 'walk', facing: x < 0.5 ? -1 : 1 }, { seconds, ease: 'inOutSine', delay })
const stop = (id: string, delay: number) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay })

/** After the flocks are divided: each animal standing in its own flock. */
const DIVIDED = FLOCKS.flatMap((a) => [actor(a.id, { ...a.home, facing: a.owner === 'abram' ? -1 : 1, pose: 'idle' }, { seconds: 1, ease: 'inOutSine' })])

const scenes: StoryScene[] = [
  {
    id: 'l03-e2-s1',
    title: 'Famine, and a fearful lie',
    music: 'be-thou-my-vision',
    beats: [
      verse(
        'GEN 12:10',
        // The family goes down to Egypt, green along the Nile.
        ...['abram', 'sarai', 'lot', 'servants'].map((id, i) => walkTo(id, 0.2 + i * 0.08, 0.84 + (i % 2) * 0.01, 1 + i * 0.3, 7)),
        layer('dry-hills', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 4 }),
        layer('egypt-nile', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 4 }),
        ...['abram', 'sarai', 'lot', 'servants'].map((id, i) => stop(id, 8 + i * 0.3)),
      ),
      say('In Egypt, Abram was afraid. Sarai was beautiful, and he feared the Egyptians would kill him to take her. So he told her to say she was only his sister.', actor('sarai', { facing: 1 }, { seconds: 0.5 })),
      say(
        'Pharaoh took Sarai into his house, and God sent plagues on Pharaoh’s household until the truth came out. Pharaoh sent them away. Even Abram, the man of faith, could be afraid and fail. God kept his promise anyway.',
        // Sarai is taken to the palace, and comes back.
        walkTo('sarai', 0.66, 0.79, 0, 4),
        actor('sarai', { opacity: 0 }, { seconds: 1.5, delay: 3.5 }),
        actor('sarai', { opacity: 1, x: 0.34, y: 0.85, pose: 'idle', facing: -1 }, { seconds: 1.5, delay: 7 }),
      ),
    ],
  },
  {
    id: 'l03-e2-s2',
    title: 'Too many flocks',
    music: 'be-thou-my-vision',
    beats: [
      verse(
        'GEN 13:6',
        // Back in the hills near Bethel: two great camps at one crowded well.
        layer('egypt-nile', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...['tent-abram', 'tent-lot', 'well'].map((id, i) => fadeIn(id, 1 + i * 0.4)),
        ...FLOCKS.map((a, i) => fadeIn(a.id, 2 + i * 0.2)),
        // The family steps back to the edges, by their tents.
        actor('abram', { x: 0.22, y: 0.74, facing: 1 }, { seconds: 2, ease: 'inOutSine' }),
        actor('sarai', { x: 0.17, y: 0.745, facing: 1 }, { seconds: 2, ease: 'inOutSine' }),
        actor('lot', { x: 0.78, y: 0.74, facing: -1 }, { seconds: 2, ease: 'inOutSine' }),
        fadeOut('servants'),
      ),
      say('Abram’s herdsmen and Lot’s herdsmen began to quarrel over water and grass.', fadeIn('herdsmen-abram'), fadeIn('herdsmen-lot', 0.3)),
      verse('GEN 13:8', actor('abram', { pose: 'lift' }, { seconds: 0.8 })),
      say('Abram was the elder. He could have chosen first. Instead he let Lot choose.', actor('abram', { pose: 'idle' }, { seconds: 0.8 })),
      play('dividing-the-flocks', { cues: [], done: DIVIDED }),
    ],
  },
  {
    id: 'l03-e2-s3',
    title: 'Lot chooses',
    music: 'be-thou-my-vision',
    beats: [
      verse(
        'GEN 13:10',
        // From a high place, Lot looks down on the green Jordan valley.
        layer('canaan-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('jordan-valley', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...['tent-abram', 'tent-lot', 'well', 'herdsmen-abram', 'herdsmen-lot', 'abram', 'sarai', ...FLOCKS.map((a) => a.id)].map((id) => fadeOut(id)),
        actor('lot', { x: 0.15, y: 0.81, facing: 1 }, { seconds: 3, ease: 'inOutSine' }),
      ),
      say('Lot chose what looked best. He moved his tents down toward the city of Sodom.', walkTo('lot', 0.42, 0.86, 0.5, 6), fadeOut('lot', 5)),
      verse('GEN 13:13'),
    ],
  },
  {
    id: 'l03-e2-s4',
    title: 'Look north and south and east and west',
    music: 'be-thou-my-vision',
    beats: [
      say(
        'After Lot had gone, God spoke to Abram.',
        // Evening on the hilltop near Bethel, by the altar.
        layer('jordan-valley', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('abram', { x: 0.5, y: 0.765, facing: -1, pose: 'pray' }, { seconds: 0.1, delay: 1 }),
        fadeIn('abram', 1.5),
        fadeIn('altar', 1.5),
        fadeIn('bethel-altar', 3, 0.85),
      ),
      verse('GEN 13:14', camera({ x: -0.03 }, { seconds: 4, ease: 'inOutSine' }), camera({ x: 0.03 }, { seconds: 4, ease: 'inOutSine', delay: 4 })),
      verse('GEN 13:15', camera({ x: 0 }, slow), actor('abram', { pose: 'lift' }, { seconds: 1 })),
      verse(
        'GEN 13:18',
        // On to the oaks of Mamre.
        layer('vineyard-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        fadeIn('oak-1', 1),
        fadeIn('oak-2', 1.4),
        fadeIn('mamre-tent', 2),
        actor('abram', { pose: 'idle' }, { seconds: 1 }),
      ),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: lotChoosesSet, scenes }
