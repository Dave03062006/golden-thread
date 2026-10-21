import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · Sold for Silver (Genesis 37), from the approved Level 5 script.
 *
 * Jacob loves Joseph more than his other sons and gives him a long robe; his brothers hate
 * him, and hate him more for his dreams: sheaves bowing to his sheaf, the sun, moon and
 * eleven stars bowing to him. Sent to find his brothers, Joseph searches the fields near
 * Shechem: the player leads him across the map to Dothan ("to Dothan",
 * minigames/to-dothan). There his brothers cast him into a dry pit and sell him for twenty
 * shekels of silver, which glows (this episode's golden thread: thirty pieces of silver).
 * Jacob refuses to be comforted.
 */

/** The map's crossroads (as fractions of the frame), the paths between them, and the way to Dothan. */
export const NODES = [
  { x: 0.14, y: 0.74 },
  { x: 0.3, y: 0.62 },
  { x: 0.2, y: 0.42 },
  { x: 0.46, y: 0.56 },
  { x: 0.36, y: 0.26 },
  { x: 0.62, y: 0.44 },
  { x: 0.54, y: 0.16 },
  { x: 0.78, y: 0.34 },
  { x: 0.88, y: 0.16 },
]
export const PATHS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 7],
  [7, 8],
]
export const START = 0
export const DOTHAN = 8
/** The signs on the right way, and what each one tells. */
export const SIGNS: Record<number, { id: string; title: string; text: string }> = {
  3: { id: 'sign-fire', title: 'A shepherd’s fire', text: 'Still warm. The flocks were here not long ago.' },
  5: { id: 'sign-man', title: 'A man in the field', text: 'He points north: they have gone away, to Dothan.' },
  7: { id: 'sign-lamb', title: 'A lost lamb', text: 'Strayed from a big flock. Dothan is near.' },
}
/** How far from its crossroads Joseph's token sits on the map (it sits right on it). */
export const ON_MAP = 0

const ABOVE = 'dry-hills'
const MAP = 'field-map'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'joseph-young' || prop === 'benjamin' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})
/** Jacob's ten older sons: five drawn on their own, the rest as a group behind them. */
const BROTHERS = ['reuben', 'simeon', 'judah', 'brother-1', 'brother-2']
const brotherProp = (id: string) => (id.startsWith('brother') ? 'brother' : id)
/** The eleven sheaves of the dream, in a ring around Joseph's. */
const SHEAVES = Array.from({ length: 11 }, (_, i) => {
  const a = Math.PI * (0.1 + (0.8 * i) / 10)
  return { id: `sheaf-${i + 1}`, x: 0.5 + Math.cos(a) * 0.3 * (i % 2 ? 1 : 0.8), y: 0.7 + (i % 2) * 0.025, facing: (Math.cos(a) > 0 ? -1 : 1) as -1 | 1 }
})
/** The eleven stars of the second dream, around Joseph's star. */
const STARS = Array.from({ length: 11 }, (_, i) => {
  const a = (i / 11) * Math.PI * 2
  return { id: `star-${i + 1}`, x: 0.5 + Math.cos(a) * 0.17, y: 0.36 + Math.sin(a) * 0.17 }
})

export const soldSet: SceneDescription = {
  id: 'l05-sold',
  title: 'Sold for silver',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3 },
    { id: 'wheat-field', depth: 0.3, opacity: 0 },
    { id: 'dry-hills', depth: 0.3, opacity: 0 },
    { id: 'field-map', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Jacob's tents near Hebron.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.8, y: 0.76, size: 0.13, pose: 'open' },
    // The first dream: the sheaves.
    ...SHEAVES.map((s): SceneActor => ({ id: s.id, prop: 'sheaf', above: ABOVE, x: s.x, y: s.y, size: 0.03, facing: s.facing, pose: 'stand', opacity: 0 })),
    { id: 'josephs-sheaf', prop: 'sheaf', above: ABOVE, x: 0.5, y: 0.66, size: 0.036, pose: 'stand', opacity: 0 },
    // The second dream: the sun, the moon and eleven stars around Joseph's star.
    { id: 'sun', prop: 'sun', above: ABOVE, x: 0.2, y: 0.36, size: 0.08, opacity: 0 },
    { id: 'moon', prop: 'moon', above: ABOVE, x: 0.8, y: 0.38, size: 0.06, opacity: 0 },
    ...STARS.map((s): SceneActor => ({ id: s.id, prop: 'counted-star', above: ABOVE, x: s.x, y: s.y, size: 0.02, opacity: 0 })),
    { id: 'josephs-star', prop: 'counted-star', above: ABOVE, x: 0.5, y: 0.36, size: 0.04, opacity: 0 },
    // The map of the fields between Shechem and Dothan: the signs, and Joseph on his way.
    ...Object.entries(SIGNS).map(([n, s]): SceneActor => ({ id: s.id, prop: 'map-token', above: MAP, x: NODES[Number(n)]!.x + 0.04, y: NODES[Number(n)]!.y - 0.04, size: 0.032, pose: s.id.slice(5), opacity: 0 })),
    { id: 'path-glow', prop: 'halo', above: MAP, ...NODES[1]!, size: 0.05, opacity: 0 },
    { id: 'map-joseph', prop: 'map-token', above: MAP, x: NODES[START]!.x, y: NODES[START]!.y + ON_MAP, size: 0.04, pose: 'joseph', opacity: 0 },
    // At Dothan: the flocks, the pit, the traders' caravan, and the silver: the golden thread.
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.8, y: 0.78, size: 0.03, opacity: 0, group: { count: 6, w: 0.14, h: 0.03, seed: 41, bob: 0.002 } },
    { id: 'pit', prop: 'pit', above: ABOVE, x: 0.5, y: 0.8, size: 0.1, opacity: 0 },
    { id: 'robe', prop: 'cloak', above: ABOVE, x: 0.4, y: 0.79, size: 0.04, opacity: 0 },
    { id: 'camel-1', prop: 'camel', above: ABOVE, x: 1.12, y: 0.74, size: 0.07, facing: -1 },
    { id: 'camel-2', prop: 'camel', above: ABOVE, x: 1.22, y: 0.75, size: 0.07, facing: -1 },
    { id: 'traders', prop: 'crowd', above: ABOVE, x: 1.1, y: 0.78, size: 0.09, facing: -1, opacity: 0 },
    { id: 'silver', prop: 'silver-coins', above: ABOVE, x: 0.6, y: 0.745, size: 0.03, opacity: 0 },
    { id: 'the-silver', prop: 'halo', above: ABOVE, x: 0.6, y: 0.67, size: 0.06, opacity: 0 },
    // The family.
    person('jacob', 'jacob-old', 0.56, 0.78, { facing: -1 }),
    person('joseph', 'joseph-young', 0.48, 0.785, { facing: 1 }),
    ...BROTHERS.map((id, i) => person(id, brotherProp(id), 0.12 + i * 0.055, 0.78 + (i % 2) * 0.005, { facing: 1 })),
    { id: 'more-brothers', prop: 'crowd', above: ABOVE, x: 0.05, y: 0.78, size: 0.08, facing: 1 },
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
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const FAMILY = ['jacob', 'joseph', ...BROTHERS, 'more-brothers', 'tent']

/** After the search: Joseph at Dothan on the map. */
const FOUND = [actor('map-joseph', { x: NODES[DOTHAN]!.x, y: NODES[DOTHAN]!.y + ON_MAP }, { seconds: 0.8 }), actor('path-glow', { ...NODES[DOTHAN]!, opacity: 0 }, { seconds: 0.5 })]

const scenes: StoryScene[] = [
  {
    id: 'l05-e1-s1',
    title: 'The long robe',
    music: 'handel-messiah-overture',
    beats: [
      verse('GEN 37:3', actor('jacob', { pose: 'carry' }, { seconds: 1, delay: 1 }), actor('joseph', { pose: 'lift' }, { seconds: 1, delay: 2 }), camera({ zoom: 1.03, x: 0.01 }, slow)),
      verse('GEN 37:4', camera({ zoom: 1, x: 0 }, slow), actor('jacob', { pose: 'idle' }, { seconds: 1 }), actor('joseph', { pose: 'idle' }, { seconds: 1 }), ...BROTHERS.map((id, i) => actor(id, { facing: -1 }, { seconds: 0.5, delay: 1 + i * 0.3 }))),
    ],
  },
  {
    id: 'l05-e1-s2',
    title: 'The dreams',
    music: 'handel-messiah-overture',
    beats: [
      verse('GEN 37:5', ...BROTHERS.map((id) => actor(id, { facing: 1 }, { seconds: 0.5 })), actor('joseph', { pose: 'lift', facing: -1 }, { seconds: 1, delay: 0.5 })),
      verse(
        'GEN 37:7',
        // The dream: a golden field, the sheaves bowing around Joseph's.
        ...FAMILY.map((id) => fadeOut(id)),
        ...swap('canaan-hills', 'wheat-field'),
        fadeIn('josephs-sheaf', 1.5),
        ...SHEAVES.map((s, i) => fadeIn(s.id, 1.5 + i * 0.1)),
        ...SHEAVES.map((s, i) => actor(s.id, { pose: 'bow' }, { seconds: 1.5, delay: 4 + i * 0.1 })),
      ),
      verse(
        'GEN 37:8',
        // Back among the angry brothers.
        ...SHEAVES.map((s) => fadeOut(s.id)),
        fadeOut('josephs-sheaf'),
        ...swap('wheat-field', 'canaan-hills'),
        ...FAMILY.filter((id) => id !== 'jacob').map((id) => fadeIn(id, 1)),
        actor('joseph', { pose: 'idle' }, { seconds: 0.5 }),
      ),
      verse(
        'GEN 37:9',
        // The second dream, at night: the sun, the moon and eleven stars bowing to Joseph's star.
        ...FAMILY.map((id) => fadeOut(id)),
        ...swap('forest-sky', 'night-sky'),
        layer('canaan-hills', { opacity: 0 }, { seconds: 3 }),
        fadeIn('josephs-star', 1.5),
        fadeIn('sun', 2),
        fadeIn('moon', 2.3),
        ...STARS.map((s, i) => fadeIn(s.id, 2.5 + i * 0.12)),
        ...STARS.map((s, i) => actor(s.id, { x: 0.5 + (s.x - 0.5) * 0.7, y: 0.36 + (s.y - 0.36) * 0.7 }, { seconds: 3, ease: 'inOutSine', delay: 4 + i * 0.05 })),
      ),
      verse(
        'GEN 37:11',
        ...['sun', 'moon', 'josephs-star', ...STARS.map((s) => s.id)].map((id) => fadeOut(id)),
        ...swap('night-sky', 'forest-sky'),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3 }),
        ...FAMILY.map((id) => fadeIn(id, 1)),
        actor('jacob', { pose: 'pray' }, { seconds: 1, delay: 2 }),
      ),
    ],
  },
  {
    id: 'l05-e1-s3',
    title: '“I am seeking my brothers”',
    music: 'handel-messiah-overture',
    beats: [
      verse(
        'GEN 37:13',
        // The brothers have gone north with the flocks; Jacob sends Joseph after them.
        ...[...BROTHERS, 'more-brothers'].map((id) => fadeOut(id)),
        actor('jacob', { pose: 'lift' }, { seconds: 1, delay: 1 }),
        actor('joseph', { facing: 1 }, { seconds: 0.5, delay: 1 }),
      ),
      verse(
        'GEN 37:15',
        // The empty fields near Shechem, and a man who finds him wandering.
        fadeOut('jacob'),
        fadeOut('tent'),
        walkTo('joseph', 0.4, 0.5, 4, -1),
        stop('joseph', 4.5),
        camera({ zoom: 1.02 }, slow),
      ),
      verse('GEN 37:16', actor('joseph', { pose: 'lift' }, { seconds: 1 })),
      verse('GEN 37:17', actor('joseph', { pose: 'idle' }, { seconds: 1 }), camera({ zoom: 1 }, slow)),
      play('to-dothan', {
        cues: [
          // The fields seen from above, like a map; Joseph sets out across them.
          fadeOut('joseph'),
          layer('field-map', { opacity: 1 }, { seconds: 1.5, ease: 'inOutSine' }),
          ...Object.values(SIGNS).map((s) => fadeIn(s.id, 0.5)),
          fadeIn('map-joseph', 0.8),
        ],
        done: FOUND,
      }),
    ],
  },
  {
    id: 'l05-e1-s4',
    title: 'Twenty shekels of silver',
    music: 'handel-messiah-overture',
    beats: [
      verse(
        'GEN 37:18',
        // Dothan: the brothers by their flocks see the long robe coming.
        layer('field-map', { opacity: 0 }, { seconds: 2 }),
        ...['map-joseph', ...Object.values(SIGNS).map((s) => s.id)].map((id) => fadeOut(id)),
        ...swap('canaan-hills', 'dry-hills'),
        fadeIn('flock', 1),
        fadeIn('pit', 1),
        ...BROTHERS.map((id, i) => actor(id, { x: 0.3 + i * 0.06, facing: -1 }, { seconds: 0.1, delay: 1 })),
        ...[...BROTHERS, 'more-brothers'].map((id) => fadeIn(id, 1.2)),
        actor('more-brothers', { x: 0.66, facing: -1 }, { seconds: 0.1, delay: 1 }),
        actor('joseph', { x: -0.05, facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 1.5),
        walkTo('joseph', 0.14, 2, 5, 1),
        stop('joseph', 7),
      ),
      verse('GEN 37:19', ...BROTHERS.map((id, i) => actor(id, { facing: i % 2 ? 1 : -1 }, { seconds: 0.4, delay: i * 0.2 }))),
      verse('GEN 37:21', actor('reuben', { pose: 'lift', facing: -1 }, { seconds: 0.8 }), actor('reuben', { pose: 'idle' }, { seconds: 0.8, delay: 4 })),
      verse(
        'GEN 37:24',
        // They pull off his robe, and lower him into the empty pit.
        actor('joseph', { x: 0.42, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }),
        actor('joseph', { pose: 'idle' }, { seconds: 0.5, delay: 2 }),
        fadeIn('robe', 2.5),
        actor('joseph', { x: 0.5, y: 0.83, opacity: 0 }, { seconds: 2, ease: 'inOutSine', delay: 3 }),
      ),
      verse(
        'GEN 37:28',
        // The traders' caravan comes along the road; the silver changes hands.
        fadeIn('traders'),
        actor('traders', { x: 0.84 }, { seconds: 5, ease: 'inOutSine' }),
        actor('camel-1', { x: 0.88, pose: 'walk' }, { seconds: 5, ease: 'inOutSine' }),
        actor('camel-2', { x: 0.98, pose: 'walk' }, { seconds: 5, ease: 'inOutSine' }),
        ...['camel-1', 'camel-2'].map((id) => stop(id, 5)),
        fadeIn('silver', 0.5),
        fadeIn('the-silver', 1, 0.85),
        actor('joseph', { x: 0.72, y: 0.785, facing: 1, pose: 'idle' }, { seconds: 0.1, delay: 5.5 }),
        fadeIn('joseph', 6),
      ),
      say(
        'The brothers dipped Joseph’s robe in a goat’s blood and brought it to their father, and let him believe that a wild animal had killed his son.',
        // The caravan goes on to Egypt, Joseph with it.
        ...['traders', 'joseph'].map((id) => actor(id, { x: 1.2, facing: 1, pose: 'walk' }, { seconds: 8, ease: 'inOutSine' })),
        ...['camel-1', 'camel-2'].map((id, i) => actor(id, { x: 1.25 + i * 0.1, facing: 1, pose: 'walk' }, { seconds: 8, ease: 'inOutSine' })),
        actor('judah', { pose: 'carry' }, { seconds: 1, delay: 3 }),
      ),
      verse(
        'GEN 37:35',
        // At home, Jacob holds the torn robe and weeps.
        fadeOut('the-silver', 4),
        fadeOut('silver', 4),
        ...['flock', 'pit', 'traders', 'joseph', ...BROTHERS, 'more-brothers'].map((id) => fadeOut(id)),
        ...swap('dry-hills', 'canaan-hills'),
        layer('forest-sky', { opacity: 0 }, { seconds: 3 }),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 3 }),
        fadeIn('tent', 1),
        actor('robe', { x: 0.53, y: 0.73 }, { seconds: 0.1, delay: 1 }),
        actor('jacob', { x: 0.56, pose: 'kneel' }, { seconds: 0.1, delay: 1 }),
        fadeIn('jacob', 1.5),
      ),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: soldSet, scenes }
