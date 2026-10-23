import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · The Passover Lamb (Exodus 11:1–12:28), from the approved Level 8 script.
 *
 * God warns of one plague more, and tells his people how to keep the Passover: a lamb for
 * each household, without blemish; its blood on the doorposts and the lintel; the meal eaten
 * that night with unleavened bread and bitter herbs, everyone dressed to travel. The player
 * helps one family get ready, step by step ("the Passover night",
 * minigames/the-passover-night). Then every door in the street is marked, and the blood on
 * the doorposts glows (this episode's golden thread: "Behold, the Lamb of God").
 */

/** The family's door (the third house of the Hebrew quarter): its posts and its lintel. */
export const DOOR = { left: 0.548, right: 0.57, x: 0.559, postY: 0.722, lintelY: 0.66 }
/** Everything the family does to get ready, in order: where each is, and the word for it. */
export const STEPS = [
  { id: 'mark-left', x: DOOR.left, y: DOOR.postY, word: 'The blood on the first doorpost.' },
  { id: 'mark-right', x: DOOR.right, y: DOOR.postY, word: 'On the second doorpost.' },
  { id: 'mark-top', x: DOOR.x, y: DOOR.lintelY, word: 'And on the lintel. The house is marked.' },
  { id: 'dish-lamb', x: 0.44, y: 0.775, word: 'The lamb, roasted.' },
  { id: 'dish-bread', x: 0.5, y: 0.775, word: 'The unleavened bread.' },
  { id: 'dish-herbs', x: 0.56, y: 0.775, word: 'The bitter herbs.' },
  { id: 'belts', x: 0.7, y: 0.7, word: 'Belts tied, sandals on their feet.' },
  { id: 'staffs', x: 0.66, y: 0.74, word: 'A staff in each hand. Ready to go.' },
] as const
/** The steps done outside, at the door; the rest are inside, at the table. */
export const OUTSIDE = 3

const ABOVE = 'house-inside'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const ELDERS = ['elder-1', 'elder-2', 'elder-3']
const FAMILY = ['father', 'mother', 'son', 'daughter']

export const passoverSet: SceneDescription = {
  id: 'l08-passover',
  title: 'The Passover',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3 },
    { id: 'hebrew-quarter', depth: 0.3, opacity: 0 },
    { id: 'house-inside', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Goshen at evening: Moses among the elders.
    person('moses', 'moses-shepherd', 0.4, { y: 0.745, facing: 1 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.418, y: 0.745, size: 0.012 },
    ...ELDERS.map((id, i) => person(id, 'elder', 0.56 + i * 0.07, { y: 0.745 })),
    // The family's lamb, chosen from the flock.
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.3, y: 0.79, size: 0.026, opacity: 0, group: { count: 4, w: 0.1, h: 0.01, seed: 151, bob: 0.002 } },
    { id: 'lamb', prop: 'sheep', above: ABOVE, x: 0.46, y: 0.79, size: 0.022, facing: 1, opacity: 0 },
    // The marks on the door, and the glow of the blood: the golden thread; the other doors of the street.
    { id: 'mark-left', prop: 'blood-mark', above: ABOVE, x: DOOR.left, y: DOOR.postY, size: 0.008, pose: 'post', opacity: 0 },
    { id: 'mark-right', prop: 'blood-mark', above: ABOVE, x: DOOR.right, y: DOOR.postY, size: 0.008, pose: 'post', opacity: 0 },
    { id: 'mark-top', prop: 'blood-mark', above: ABOVE, x: DOOR.x, y: DOOR.lintelY, size: 0.03, pose: 'lintel', opacity: 0 },
    { id: 'door-blood', prop: 'halo', above: ABOVE, x: DOOR.x, y: 0.69, size: 0.07, opacity: 0 },
    ...[0.24, 0.38, 0.66, 0.8].map((x, i): SceneActor => ({ id: `other-door-${i + 1}`, prop: 'blood-mark', above: ABOVE, x: x + 0.039, y: DOOR.lintelY, size: 0.03, pose: 'lintel', opacity: 0 })),
    ...[0.24, 0.38, 0.52, 0.66, 0.8].map((x, i): SceneActor => ({ id: `window-${i + 1}`, prop: 'halo', above: ABOVE, x, y: 0.555, size: 0.05, opacity: 0 })),
    // The table inside: the mat, the three dishes, the lamp; the staffs.
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.5, y: 0.8, size: 0.16, opacity: 0 },
    ...[
      ['dish-lamb', 'lamb', 0.44],
      ['dish-bread', 'bread', 0.5],
      ['dish-herbs', 'herbs', 0.56],
    ].map(([id, pose, x]): SceneActor => ({ id: id as string, prop: 'passover-dish', above: ABOVE, x: x as number, y: 0.775, size: 0.035, pose: pose as string, opacity: 0 })),
    { id: 'lamp-glow', prop: 'halo', above: ABOVE, x: 0.3, y: 0.6, size: 0.12, opacity: 0 },
    { id: 'next-glow', prop: 'halo', above: ABOVE, x: DOOR.left, y: DOOR.postY, size: 0.07, opacity: 0 },
    // The family.
    person('father', 'hebrew-father', 0.62, { opacity: 0 }),
    person('mother', 'hebrew-mother', 0.69, { opacity: 0 }),
    person('son', 'boy', 0.74, { size: 0.026, y: 0.79, opacity: 0 }),
    person('daughter', 'girl', 0.78, { size: 0.026, y: 0.79, opacity: 0 }),
    { id: 'staff-1', prop: 'staff', above: ABOVE, x: 0.638, y: 0.785, size: 0.012, opacity: 0 },
    { id: 'staff-2', prop: 'staff', above: ABOVE, x: 0.708, y: 0.785, size: 0.012, opacity: 0 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.003 },
      { at: 20, value: 0.003, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.002, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.006, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const TABLE = ['mat', 'dish-lamb', 'dish-bread', 'dish-herbs', 'staff-1', 'staff-2', 'lamp-glow']

const scenes: StoryScene[] = [
  {
    id: 'l08-e4-s1',
    title: 'One plague more',
    music: 'faure-agnus-dei',
    beats: [
      verse('EXO 11:1', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
      say('God warned that at midnight the firstborn in every house of Egypt would die, from Pharaoh’s own son to the son of the poorest servant. But his own people would be kept safe.', ...ELDERS.map((id, i) => actor(id, { pose: 'pray' }, { seconds: 1, delay: 1 + i * 0.4 }))),
      verse('EXO 11:7', ...ELDERS.map((id) => actor(id, { pose: 'idle' }, { seconds: 1 })), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l08-e4-s2',
    title: 'A lamb for a household',
    music: 'faure-agnus-dei',
    beats: [
      verse(
        'EXO 12:3',
        // A family before their house: the father chooses a lamb from the flock.
        camera({ zoom: 1 }, slow),
        ...['moses', 'rod', ...ELDERS].map((id) => fadeOut(id)),
        ...swap('goshen-fields', 'hebrew-quarter', 1),
        ...FAMILY.map((id) => fadeIn(id, 2.5)),
        fadeIn('flock', 2.5),
      ),
      verse('EXO 12:5', fadeIn('lamb'), actor('father', { pose: 'carry' }, { seconds: 0.8, delay: 1 }), actor('son', { x: 0.5, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('son', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('EXO 12:7', actor('father', { pose: 'idle' }, { seconds: 0.8 }), fadeOut('flock', 1)),
      verse('EXO 12:8', camera({ zoom: 1.02 }, slow), actor('son', { x: 0.74, pose: 'idle' }, { seconds: 0.1, delay: 1 })),
    ],
  },
  {
    id: 'l08-e4-s3',
    title: 'Ready to go',
    music: 'faure-agnus-dei',
    beats: [
      verse('EXO 12:11', camera({ zoom: 1 }, slow), fadeOut('lamb'), layer('evening-sky', { opacity: 0 }, { seconds: 3 }), layer('night-sky', { opacity: 1 }, { seconds: 3 })),
      play('the-passover-night', {
        done: [
          ...STEPS.filter((s) => s.id.startsWith('mark') || s.id.startsWith('dish')).map((s) => actor(s.id, { opacity: 1 }, { seconds: 0.5 })),
          ...['staff-1', 'staff-2', 'mat'].map((id) => actor(id, { opacity: 1 }, { seconds: 0.5 })),
          actor('lamp-glow', { opacity: 0.85 }, { seconds: 0.5 }),
          actor('next-glow', { x: 0.5, y: 0.7, opacity: 0 }, { seconds: 0.5 }),
          layer('hebrew-quarter', { opacity: 0 }, { seconds: 0.5 }),
          layer('house-inside', { opacity: 1 }, { seconds: 0.5 }),
          ...FAMILY.slice(0, 2).map((id) => actor(id, { pose: 'idle' }, { seconds: 0.5 })),
        ],
      }),
      verse('EXO 12:13', ...FAMILY.map((id, i) => actor(id, { pose: 'pray' }, { seconds: 1, delay: 0.5 + i * 0.3 }))),
    ],
  },
  {
    id: 'l08-e4-s4',
    title: 'The people did so',
    music: 'faure-agnus-dei',
    beats: [
      verse(
        'EXO 12:21',
        // The whole street at night: every door marked, the lamps lit inside; the blood glows.
        ...[...FAMILY, ...TABLE].map((id) => fadeOut(id)),
        ...swap('house-inside', 'hebrew-quarter', 1),
        fadeIn('door-blood', 1, 0.9),
        ...[1, 2, 3, 4].map((i) => fadeIn(`other-door-${i}`, 2 + i * 0.2)),
        ...[1, 2, 3, 4, 5].map((i) => fadeIn(`window-${i}`, 2.5 + i * 0.2, 0.85)),
      ),
      verse('EXO 12:28', camera({ zoom: 1.02 }, slow)),
      say('They trusted God, and did what he said, though they could not yet see how he would save them.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: passoverSet, scenes }
