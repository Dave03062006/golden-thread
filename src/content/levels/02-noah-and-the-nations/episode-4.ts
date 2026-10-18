import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { windowOf } from './episode-3'

/**
 * Episode 4 · The Dove Returns (Genesis 8:1–19), from the approved Level 2 script.
 *
 * Over the gray water a wind blows and the clouds part. The ark comes to rest on the
 * mountains of Ararat, and other peaks rise from the sea around it. Noah sends out a
 * raven, which flies to and fro, and then the dove, three times ("the dove",
 * minigames/the-dove): she finds nowhere to land and comes home; she brings back an olive
 * leaf (this episode's golden thread: the Spirit descending like a dove); she finds a
 * home in the new world and does not return. Then the door opens onto a washed, green
 * world, and everyone comes out.
 */

/** The ark at rest on the mountainside (the shelf is at y 0.7), and its window, where Noah waits. */
const ARK = { x: 0.42, y: 0.7, size: 0.4 }
const WINDOW = windowOf(ARK)
/** Where the dove perches, on Noah's hand at the window. */
export const HOME = { x: WINDOW.x, y: WINDOW.y + 0.004 }
/** The olive tree's top, just above the water, and the tree on the green hills where the dove settles at last. */
export const OLIVE_TOP = { x: 0.8, y: 0.65 }
export const HILL_PERCH = { x: 0.8, y: 0.54 }
/** How far ahead of the dove's middle her beak is, where the leaf is held. */
export const BEAK = { x: 0.014, y: 0.006 }

export interface FlightStage {
  /** Where she must fly to. */
  at: { x: number; y: number }
  /** What to do, said in the hint. */
  goal: string
  /** What she finds there, shown for a moment. */
  found?: { title: string; text: string }
  /** She plucks the olive leaf here. */
  pluck?: boolean
}

/** The dove's three flights, each from Noah's window: where she goes, in order, and what she finds. */
export const FLIGHTS: Record<'dove-1' | 'dove-2' | 'dove-3', FlightStage[]> = {
  'dove-1': [
    { at: { x: 0.15, y: 0.24 }, goal: 'Fly out over the waters.', found: { title: 'Only water', text: 'Water and bare rock, as far as she can see. Nowhere to set her foot.' } },
    { at: { x: 0.86, y: 0.3 }, goal: 'Look the other way.', found: { title: 'Still only water', text: 'The waters still cover the earth.' } },
    { at: HOME, goal: 'Bring her home to Noah’s hand at the window.' },
  ],
  'dove-2': [
    { at: OLIVE_TOP, goal: 'Find the olive tree: its top shows just above the water.', found: { title: 'An olive leaf', text: 'She plucks a fresh green leaf.' }, pluck: true },
    { at: HOME, goal: 'Carry the leaf home to Noah.' },
  ],
  'dove-3': [{ at: HILL_PERCH, goal: 'Fly free over the green hills, to a tree.', found: { title: 'A home', text: 'She has found a home in the new world.' } }],
}

/** The door, the foot of the ramp below it, and the ground in front of the ark. */
const DOOR = { x: 0.5, y: 0.665 }
const RAMP_FOOT = { x: 0.62, y: 0.77 }

const below = (id: string, prop: string, size: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: 'ararat-grass', x: DOOR.x, y: DOOR.y, size, facing: 1, opacity: 0, ...extra })

const FAMILY: [string, string, number][] = [
  ['noah', 'noah', 0.6],
  ['wife', 'noahs-wife', 0.66],
  ['shem', 'shem', 0.72],
  ['shem-wife', 'sons-wife', 0.77],
  ['ham', 'ham', 0.82],
  ['ham-wife', 'sons-wife', 0.86],
  ['japheth', 'japheth', 0.9],
  ['japheth-wife', 'sons-wife', 0.94],
]
/** The animals coming out, and where each runs off to. */
const ANIMALS: [string, string, number, number][] = [
  ['lion-1', 'lion', 0.06, -0.12],
  ['lion-2', 'lion', 0.055, -0.18],
  ['deer-1', 'deer', 0.055, 1.12],
  ['deer-2', 'deer', 0.05, 1.18],
  ['sheep-1', 'sheep', 0.042, 0.06],
  ['sheep-2', 'sheep', 0.04, 0.12],
  ['elephant-1', 'elephant', 0.075, -0.2],
  ['elephant-2', 'elephant', 0.07, -0.28],
]

export const theDoveReturnsSet: SceneDescription = {
  id: 'l02-the-dove-returns',
  title: 'The dove returns',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'gray-sky', depth: 0 },
    { id: 'parting-clouds', depth: 0.05, opacity: 0, sway: { x: 0.01, seconds: 14 } },
    { id: 'far-peaks', depth: 0.15, offsetY: 0.3 },
    { id: 'green-hills', depth: 0.3, opacity: 0, offsetY: 0.1 },
    { id: 'open-sea', depth: 0.5, sway: { x: 0.006, seconds: 7 } },
    { id: 'ararat-slope', depth: 0.5, offsetY: 0.45 },
    { id: 'ararat-grass', depth: 0.5, opacity: 0 },
  ],
  actors: [
    // The tree on the hills where the dove settles (behind the sea until the waters are gone).
    { id: 'hill-tree', prop: 'fruit-tree', above: 'green-hills', x: 0.8, y: 0.74, size: 0.12, opacity: 0 },
    // The ark, riding the swell and then at rest on the mountainside.
    { id: 'ark', prop: 'ark', above: 'open-sea', ...ARK, pose: 'rock' },
    // Treetops just above the water as it goes down, one of them the olive.
    { id: 'treetop-1', prop: 'treetop', above: 'open-sea', x: 0.69, y: 0.7, size: 0.07, opacity: 0 },
    { id: 'olive-top', prop: 'treetop', above: 'open-sea', x: OLIVE_TOP.x, y: 0.72, size: 0.09, pose: 'olive', opacity: 0 },
    { id: 'treetop-2', prop: 'treetop', above: 'open-sea', x: 0.93, y: 0.695, size: 0.08, opacity: 0 },
    { id: 'ark-ramp', prop: 'ark-ramp', above: 'ararat-grass', x: 0.565, y: 0.77, size: 0.13, facing: -1, opacity: 0 },
    // The raven, flying to and fro in the distance.
    {
      id: 'raven',
      prop: 'raven',
      above: 'ararat-grass',
      x: 0.24,
      y: 0.24,
      size: 0.035,
      opacity: 0,
      path: {
        loopSeconds: 12,
        x: [
          { at: 0, value: 0 },
          { at: 3, value: 0.12, ease: 'inOutSine' },
          { at: 6, value: 0, ease: 'inOutSine' },
          { at: 9, value: -0.12, ease: 'inOutSine' },
          { at: 12, value: 0, ease: 'inOutSine' },
        ],
        y: [
          { at: 0, value: -0.04 },
          { at: 3, value: 0, ease: 'inOutSine' },
          { at: 6, value: 0.04, ease: 'inOutSine' },
          { at: 9, value: 0, ease: 'inOutSine' },
          { at: 12, value: -0.04, ease: 'inOutSine' },
        ],
      },
    },
    // God shown as light, when he speaks.
    { id: 'glory', prop: 'glory', above: 'ararat-grass', x: 0.5, y: 0.2, size: 0.3, opacity: 0 },
    ...FAMILY.map(([id, prop]) => below(id, prop, prop === 'sons-wife' ? 0.04 : 0.045, { pose: 'walk' })),
    ...ANIMALS.map(([id, prop, size]) => below(id, prop, size, { pose: 'walk' })),
    { id: 'birds', prop: 'bird', above: 'ararat-grass', x: DOOR.x, y: 0.6, size: 0.02, opacity: 0, group: { count: 8, w: 0.1, h: 0.05, seed: 11, bob: 0.008, spread: 0 } },
    // Where the dove is to fly next, glowing softly.
    { id: 'goal', prop: 'halo', above: 'ararat-grass', x: HOME.x, y: HOME.y, size: 0.085, opacity: 0 },
    // The dove, and the olive leaf in her beak: the golden thread.
    { id: 'dove', prop: 'dove', above: 'ararat-grass', ...HOME, size: 0.045, facing: -1, pose: 'fly', opacity: 0 },
    { id: 'olive-leaf', prop: 'halo', above: 'ararat-grass', ...OLIVE_TOP, size: 0.035, opacity: 0 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.005 },
      { at: 20, value: 0.005, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.01, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const settle = { seconds: 1, ease: 'inOutSine' } as const

/** After each flight: the dove where it ended, the goal put away. */
const goalAway = (at: { x: number; y: number }) => actor('goal', { ...at, opacity: 0 }, settle)
const DOVE_1_DONE = [actor('dove', { ...HOME, facing: -1 }, settle), goalAway(HOME)]
const DOVE_2_DONE = [
  actor('dove', { ...HOME, facing: -1, pose: 'leaf' }, settle),
  actor('olive-leaf', { x: HOME.x - BEAK.x, y: HOME.y + BEAK.y, opacity: 0.85 }, settle),
  goalAway(HOME),
]
const DOVE_3_DONE = [actor('dove', { ...HILL_PERCH, facing: 1 }, settle), goalAway(HILL_PERCH)]

/** Coming out of the door, down the ramp, and off to a place on the mountainside. */
function comeOut(id: string, delay: number, x: number, y: number, run = 3) {
  return [
    actor(id, { opacity: 1 }, { seconds: 0.6, delay }),
    actor(id, { ...RAMP_FOOT, facing: 1 }, { seconds: 2, ease: 'inOutSine', delay }),
    actor(id, { x, y, facing: x < RAMP_FOOT.x ? -1 : 1 }, { seconds: run, ease: 'inOutSine', delay: delay + 2 }),
  ]
}

const scenes: StoryScene[] = [
  {
    id: 'l02-e4-s1',
    title: 'God remembered Noah',
    music: 'komm-heiliger-geist',
    beats: [
      say('Inside the ark, the days were long and the waiting longer.'),
      verse(
        'GEN 8:1',
        // A wind over the water, and the clouds part: a first patch of blue.
        layer('gray-sky', { opacity: 0 }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
        layer('parting-clouds', { opacity: 1 }, { seconds: 6 }),
        camera({ zoom: 1.03, y: -0.01 }, slow),
      ),
      say('“God remembered” does not mean God had forgotten. In the Bible, when God remembers, he acts. A wind blew over the waters, as the Spirit had moved over the waters at the very beginning.', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l02-e4-s2',
    title: 'The mountains of Ararat',
    music: 'komm-heiliger-geist',
    beats: [
      verse('GEN 8:4', layer('ararat-slope', { offsetY: 0 }, { seconds: 8, ease: 'inOutSine' }), actor('ark', { pose: 'shut' }, { seconds: 1, delay: 7 })),
      say('Months passed, and slowly the tops of the mountains appeared.', layer('far-peaks', { offsetY: 0 }, { seconds: 10, ease: 'inOutSine' }), layer('open-sea', { offsetY: 0.06 }, { seconds: 10, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l02-e4-s3',
    title: 'The raven and the dove',
    music: 'komm-heiliger-geist',
    beats: [
      say('Noah opened the window of the ark and sent out a raven. It flew to and fro until the waters dried up.', fadeIn('raven', 1)),
      verse('GEN 8:8', fadeIn('dove', 1)),
      play('dove-1', { cues: [], done: DOVE_1_DONE }),
      verse('GEN 8:9'),
    ],
  },
  {
    id: 'l02-e4-s4',
    title: 'The olive leaf',
    music: 'komm-heiliger-geist',
    beats: [
      say(
        'Noah waited seven days and sent the dove out again.',
        // The waters are lower: treetops show here and there.
        layer('open-sea', { offsetY: 0.15 }, { seconds: 8, ease: 'inOutSine' }),
        ...['treetop-1', 'olive-top', 'treetop-2'].map((id, i) => fadeIn(id, 2 + i * 0.6)),
        fadeOut('raven'),
      ),
      play('dove-2', { cues: [], done: DOVE_2_DONE }),
      verse('GEN 8:11'),
      say(
        'After seven more days he sent her out a third time, and she did not come back. She had found a home in the new world.',
        // The leaf stays with Noah; the dove flies free over green hills.
        actor('dove', { pose: 'fly' }, { seconds: 0.5 }),
        actor('olive-leaf', { x: HOME.x, y: HOME.y + 0.02 }, { seconds: 1.5, ease: 'inOutSine' }),
        layer('open-sea', { offsetY: 0.45, opacity: 0 }, { seconds: 8, ease: 'inOutSine' }),
        layer('green-hills', { offsetY: 0, opacity: 1 }, { seconds: 8, ease: 'inOutSine' }),
        fadeIn('hill-tree', 3),
        ...['treetop-1', 'olive-top', 'treetop-2'].map((id) => fadeOut(id, 1)),
      ),
      play('dove-3', { cues: [], done: DOVE_3_DONE }),
    ],
  },
  {
    id: 'l02-e4-s5',
    title: 'Out of the ark',
    music: 'komm-heiliger-geist',
    beats: [
      verse(
        'GEN 8:16',
        fadeIn('glory', 0, 0.6),
        fadeOut('glory', 5),
        fadeOut('olive-leaf'),
        layer('ararat-grass', { opacity: 1 }, { seconds: 6, ease: 'inOutSine' }),
        actor('ark', { pose: 'open' }, { seconds: 0.6, delay: 3 }),
        fadeIn('ark-ramp', 3),
      ),
      say(
        'More than a year after they went in, Noah and his family came out.',
        ...FAMILY.flatMap(([id, , x], i) => comeOut(id, i * 0.7, x, 0.84 + (i % 2) * 0.03)),
        ...FAMILY.map(([id], i) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay: i * 0.7 + 5.2 })),
      ),
      verse(
        'GEN 8:19',
        // The animals run off across the hills, and the birds fly up into the sky.
        ...ANIMALS.flatMap(([id, , , x], i) => [...comeOut(id, i * 0.6, x, 0.8 + (i % 3) * 0.025, 5), actor(id, { opacity: 0, pose: 'idle' }, { seconds: 1, delay: i * 0.6 + 7 })]),
        actor('birds', { opacity: 1, spread: 1, y: 0.25 }, { seconds: 6, ease: 'inOutSine', delay: 1 }),
        actor('birds', { opacity: 0 }, { seconds: 2, delay: 7 }),
      ),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: theDoveReturnsSet, scenes }
