import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · Count the Stars (Genesis 15), from the approved Level 3 script.
 *
 * Abram at his tent at Mamre at dusk, an old man with no child. God brings him outside:
 * "number the stars." The player counts them, one by one, until they come faster than
 * anyone could count ("count the stars", minigames/count-the-stars) and the Milky Way
 * fills the sky; the brightest star glows (this episode's golden thread: all who believe
 * are Abraham's children). Abram believes. Then the covenant between the pieces: a smoking
 * fire pot and a flaming torch pass between them while Abram sleeps. At last, the land
 * promised, glowing on the map.
 */

/** Where the stars the player counts by hand light up, if no place is pointed to. */
export const STARS = [
  { x: 0.2, y: 0.2 },
  { x: 0.36, y: 0.12 },
  { x: 0.5, y: 0.26 },
  { x: 0.7, y: 0.1 },
  { x: 0.82, y: 0.3 },
  { x: 0.28, y: 0.38 },
  { x: 0.6, y: 0.4 },
  { x: 0.12, y: 0.08 },
  { x: 0.9, y: 0.16 },
  { x: 0.44, y: 0.44 },
]
export const STAR_FIELDS = ['star-field-1', 'star-field-2', 'star-field-3', 'milky-way']

const ABOVE = 'canaan-hills'

export const countTheStarsSet: SceneDescription = {
  id: 'l03-count-the-stars',
  title: 'Count the stars',
  layers: [
    { id: 'vineyard-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    ...STAR_FIELDS.map((id) => ({ id, depth: 0, opacity: 0 })),
    { id: 'canaan-hills', depth: 0.3 },
    { id: 'nations-tapestry', depth: 0, opacity: 0 },
  ],
  actors: [
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.22, y: 0.8, size: 0.28 },
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.62, y: 0.78, size: 0.13, pose: 'open' },
    { id: 'abram', prop: 'abram', above: ABOVE, x: 0.5, y: 0.79, size: 0.042, facing: 1, pose: 'kneel' },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.4, y: 0.3, size: 0.3, opacity: 0 },
    // The stars counted by hand, and the brightest: the golden thread.
    ...STARS.map((at, i): SceneActor => ({ id: `star-${i + 1}`, prop: 'counted-star', above: ABOVE, ...at, size: 0.02, opacity: 0 })),
    { id: 'brightest-star', prop: 'halo', above: ABOVE, x: 0.34, y: 0.1, size: 0.06, opacity: 0 },
    // The covenant between the pieces, and the fire that passes between them.
    { id: 'pieces', prop: 'covenant-pieces', above: ABOVE, x: 0.42, y: 0.765, size: 0.26, opacity: 0 },
    { id: 'fire-pot', prop: 'fire-pot', above: ABOVE, x: 0.22, y: 0.75, size: 0.035, opacity: 0 },
    { id: 'torch', prop: 'flaming-torch', above: ABOVE, x: 0.17, y: 0.75, size: 0.025, opacity: 0 },
    // The land promised, glowing on the map.
    { id: 'promised-land', prop: 'halo', above: 'nations-tapestry', x: 0.47, y: 0.52, size: 0.22, opacity: 0 },
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

/** After counting: the whole sky full of stars, the hand-lit ones melted into it. */
const COUNTED = [...STAR_FIELDS.map((id) => layer(id, { opacity: 1 }, { seconds: 1 })), ...STARS.map((at, i) => actor(`star-${i + 1}`, { ...at, opacity: 0 }, { seconds: 1 }))]

const scenes: StoryScene[] = [
  {
    id: 'l03-e4-s1',
    title: 'Fear not, Abram',
    music: 'creation-heavens-telling',
    beats: [
      verse('GEN 15:1', fadeIn('glory', 0.5, 0.6), camera({ zoom: 1.04, y: -0.01 }, slow)),
      say('But Abram had a sorrow he could not hide.', fadeOut('glory', 1)),
      verse('GEN 15:3', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l03-e4-s2',
    title: 'Number the stars',
    music: 'creation-heavens-telling',
    beats: [
      verse(
        'GEN 15:5',
        // Outside, under the night sky.
        layer('vineyard-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('abram', { x: 0.44, y: 0.8, pose: 'lift' }, { seconds: 2, ease: 'inOutSine' }),
        fadeIn('brightest-star', 1, 0.85),
      ),
      play('count-the-stars', { cues: [], done: COUNTED }),
      verse('GEN 15:6', actor('abram', { pose: 'pray' }, { seconds: 1 })),
      say('Abram could see no child. He believed anyway. That trust is what the Bible calls faith.'),
    ],
  },
  {
    id: 'l03-e4-s3',
    title: 'The covenant between the pieces',
    music: 'creation-heavens-telling',
    beats: [
      say(
        'Then God made a covenant with Abram in the way of those days: people who made a solemn agreement walked between the halves of animals, as if to say, “May this happen to me if I break my word.”',
        ...STAR_FIELDS.map((id) => layer(id, { opacity: 0 }, { seconds: 3 })),
        fadeOut('brightest-star'),
        fadeIn('pieces', 1),
        actor('abram', { x: 0.13, y: 0.79, pose: 'kneel' }, { seconds: 2, ease: 'inOutSine' }),
      ),
      verse(
        'GEN 15:17',
        // In the dark, only God passes between the pieces.
        fadeIn('fire-pot'),
        fadeIn('torch'),
        actor('fire-pot', { x: 0.68 }, { seconds: 9, ease: 'inOutSine', delay: 1 }),
        actor('torch', { x: 0.63 }, { seconds: 9, ease: 'inOutSine', delay: 1 }),
        fadeOut('fire-pot', 10),
        fadeOut('torch', 10),
      ),
      say('Only God passed between the pieces. Abram slept. God bound himself alone to keep the promise.'),
    ],
  },
  {
    id: 'l03-e4-s4',
    title: 'The land promised',
    music: 'creation-heavens-telling',
    beats: [
      verse('GEN 15:18', layer('nations-tapestry', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }), fadeOut('pieces'), fadeIn('promised-land', 2, 0.85)),
      say('Abram still had no son. But now he had God’s oath.', camera({ zoom: 1.05, x: -0.02, y: 0.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: countTheStarsSet, scenes }
