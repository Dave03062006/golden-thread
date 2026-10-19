import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 7 · Three Visitors at Mamre (Genesis 18:1–15), from the approved Level 3 script.
 *
 * In the heat of the day, three figures of light stand near Abraham's tent, and the old
 * man runs to welcome them. He hurries to serve them: water for their feet, cakes of fine
 * meal, a calf, curds and milk, carried to the mat in the shade of the oak ("serving the
 * guests", minigames/serving-the-guests). Sarah, listening at the tent door (this
 * episode's golden thread: the Annunciation), laughs at the promise of a son. "Is
 * anything too hard for the LORD?"
 */

/** Where the guests sit, the mat set before them, and each dish: where it's fetched from, its place on the mat, and what's said as it's served. */
export const MAT = { x: 0.32, y: 0.78 }
export const DISHES = [
  { id: 'water-jar', prop: 'water-jar', from: { x: 0.6, y: 0.79 }, to: { x: 0.22, y: 0.79 }, size: 0.03, title: 'Water', text: '“Let a little water be brought, and wash your feet, and rest yourselves under the tree.”' },
  { id: 'cakes', prop: 'cakes', from: { x: 0.74, y: 0.8 }, to: { x: 0.29, y: 0.785 }, size: 0.05, title: 'Cakes of fine meal', text: 'Sarah’s cakes, hot from the fire.' },
  { id: 'calf', prop: 'calf', from: { x: 0.9, y: 0.81 }, to: { x: 0.36, y: 0.79 }, size: 0.07, title: 'A calf', text: '“Tender and good,” prepared for the guests.' },
  { id: 'milk-bowls', prop: 'milk-bowls', from: { x: 0.66, y: 0.8 }, to: { x: 0.43, y: 0.785 }, size: 0.045, title: 'Curds and milk', text: 'Everything set before them, under the tree.' },
]

const ABOVE = 'canaan-hills'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'sarai' ? 0.038 : 0.042, facing: -1, ...extra })

export const mamreSet: SceneDescription = {
  id: 'l03-mamre',
  title: 'Three visitors at Mamre',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'canaan-hills', depth: 0.3 },
  ],
  actors: [
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.3, y: 0.79, size: 0.34 },
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.68, y: 0.76, size: 0.14, pose: 'open' },
    // The three visitors, figures of light, and the mat in the shade before them.
    ...[0.16, 0.25, 0.34].map((x, i): SceneActor => ({ id: `visitor-${i + 1}`, prop: 'angel', above: ABOVE, x: x + 0.5, y: 0.78, size: 0.045, opacity: 0 })),
    { id: 'mat', prop: 'feast-mat', above: ABOVE, ...MAT, size: 0.16, opacity: 0 },
    ...DISHES.map((d): SceneActor => ({ id: d.id, prop: d.prop, above: ABOVE, ...d.from, size: d.size, facing: -1, opacity: 0 })),
    // In gentle mode, the next dish glows.
    { id: 'dish-glow', prop: 'halo', above: ABOVE, ...DISHES[0]!.from, size: 0.05, opacity: 0 },
    // The tent door where Sarah listens: the golden thread.
    { id: 'tent-door', prop: 'halo', above: ABOVE, x: 0.68, y: 0.7, size: 0.06, opacity: 0 },
    person('abraham', 'abram', 0.62, 0.8, { pose: 'kneel', facing: -1 }),
    person('sarah', 'sarai', 0.7, 0.77, { opacity: 0 }),
    { id: 'servant', prop: 'ham', above: ABOVE, x: 0.86, y: 0.81, size: 0.04, facing: -1, opacity: 0 },
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

/** After serving: every dish set out on the mat before the guests. */
const SERVED = [...DISHES.map((d) => actor(d.id, { ...d.to, opacity: 1 }, { seconds: 1, ease: 'inOutSine' })), actor('dish-glow', { ...DISHES.at(-1)!.to, y: DISHES.at(-1)!.to.y - 0.03, opacity: 0 }, { seconds: 1 })]

const scenes: StoryScene[] = [
  {
    id: 'l03-e7-s1',
    title: 'In the heat of the day',
    music: 'holy-holy-holy',
    beats: [
      verse('GEN 18:1', camera({ zoom: 1.03 }, slow)),
      verse(
        'GEN 18:2',
        // Three figures of light; the old man runs to meet them.
        ...[1, 2, 3].map((i) => fadeIn(`visitor-${i}`, 0.5 + i * 0.4, 0.95)),
        ...[1, 2, 3].map((i) => actor(`visitor-${i}`, { x: [0.16, 0.25, 0.34][i - 1]! }, { seconds: 4, ease: 'inOutSine', delay: 1 })),
        actor('abraham', { pose: 'walk', x: 0.46 }, { seconds: 3, ease: 'inOutSine', delay: 2 }),
        actor('abraham', { pose: 'kneel' }, { seconds: 0.8, delay: 5 }),
        camera({ zoom: 1 }, slow),
      ),
      say('An old man, at the hottest hour of the day, ran.'),
    ],
  },
  {
    id: 'l03-e7-s2',
    title: 'Abraham hastened',
    music: 'holy-holy-holy',
    beats: [
      verse(
        'GEN 18:6',
        actor('abraham', { pose: 'idle', facing: 1 }, { seconds: 0.5 }),
        fadeIn('sarah'),
        fadeIn('servant', 0.5),
        fadeIn('mat', 0.5),
        ...DISHES.map((d, i) => fadeIn(d.id, 1 + i * 0.3)),
      ),
      play('serving-the-guests', { cues: [], done: SERVED }),
      verse('GEN 18:8', actor('abraham', { x: 0.52, y: 0.79, facing: -1, pose: 'idle' }, { seconds: 2, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l03-e7-s3',
    title: 'Sarah laughed',
    music: 'holy-holy-holy',
    beats: [
      verse('GEN 18:10', actor('sarah', { x: 0.68, y: 0.76 }, { seconds: 1.5, ease: 'inOutSine' }), fadeIn('tent-door', 0.5, 0.85)),
      verse('GEN 18:12'),
    ],
  },
  {
    id: 'l03-e7-s4',
    title: 'Is anything too hard?',
    music: 'holy-holy-holy',
    beats: [
      verse('GEN 18:14', actor('sarah', { x: 0.62, y: 0.79 }, { seconds: 2, ease: 'inOutSine' }), camera({ zoom: 1.04, x: -0.02 }, slow)),
      say('Christians have long seen in the three visitors a hint of the Holy Trinity: one LORD, and three who came to Abraham’s table.', camera({ zoom: 1, x: 0 }, slow), ...[1, 2, 3].map((i) => fadeOut(`visitor-${i}`, 3 + i * 0.4))),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: mamreSet, scenes }
