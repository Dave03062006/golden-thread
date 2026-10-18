import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Flood (Genesis 7:6–24), from the approved Level 2 script. It is told
 * gently (the content note says so before it starts): no one is shown suffering, only
 * water, to the horizon.
 *
 * The animals come to the finished ark two by two, and Noah's family goes in after them;
 * the LORD shuts the door. Storm clouds gather, the waters rise, and the ark lifts off the
 * ground. Then there is only the sea: the ark rides out the storm ("through the storm",
 * minigames/through-the-storm), lamplight glowing in its window (this episode's golden
 * thread: the waters of Baptism), until the rain stops and it floats, small and alone,
 * on a wide, still sea.
 */

/** A window on an ark standing at a place with a size: the lit window under its roof (the ark's drawing is a 640 × 300 box). */
export const windowOf = (ark: { x: number; y: number; size: number }) => ({ x: ark.x, y: ark.y - ark.size * 0.5056, size: ark.size * 0.09 })

/** Where the ark stands by the forest, and where it rides out the storm. */
const ARK = { x: 0.5, y: 0.79, size: 0.56 }
export const STORM_ARK = { x: 0.5, y: 0.76, size: 0.4 }
/** Where the ark is at the end, small and alone on the sea. */
const ALONE = { x: 0.5, y: 0.6, size: 0.2 }

/** The great waves of the storm, from one side or the other, and when each reaches the ark. */
const SIDES = ['left', 'right', 'right', 'left', 'right', 'left', 'left', 'right', 'left', 'right', 'right', 'left', 'right'] as const
export const STORM_WAVES = SIDES.map((side, i) => ({ id: `wave-${i + 1}`, side, at: 4 + i * 3.6 }))

/** The foot of the ramp, and its top at the door. */
const FOOT = { x: 0.76, y: 0.845 }
const DOOR = { x: 0.635, y: 0.735 }

/** The animals, pair by pair, each pair coming from one side. */
const PAIRS = [
  { prop: 'lion', from: 'left', size: 0.06 },
  { prop: 'deer', from: 'right', size: 0.055 },
  { prop: 'sheep', from: 'left', size: 0.042 },
  { prop: 'elephant', from: 'right', size: 0.075 },
] as const

const animals = PAIRS.flatMap(({ prop, from, size }) =>
  [0, 1].map((j): SceneActor => ({
    id: `${prop}-${j + 1}`,
    prop,
    above: 'clearing',
    x: from === 'left' ? -0.08 - j * 0.07 : 1.08 + j * 0.07,
    y: 0.86 + j * 0.012,
    size: size * (j ? 0.92 : 1),
    facing: from === 'left' ? 1 : -1,
    pose: 'walk',
  })),
)

/** Noah's family, in the order they go in: Noah last, and the LORD shuts him in. */
const FAMILY: [string, string][] = [
  ['wife', 'noahs-wife'],
  ['shem', 'shem'],
  ['shem-wife', 'sons-wife'],
  ['ham', 'ham'],
  ['ham-wife', 'sons-wife'],
  ['japheth', 'japheth'],
  ['japheth-wife', 'sons-wife'],
  ['noah', 'noah'],
]

const family = FAMILY.map(([id, prop], i): SceneActor => ({ id, prop, above: 'clearing', x: 0.06 + i * 0.035, y: 0.87, size: prop === 'sons-wife' ? 0.04 : 0.045, facing: 1, pose: 'walk', opacity: 0 }))

const sized = (at: { x: number; y: number; size: number }) => ({ x: at.x, y: at.y, size: at.size })

export const theFloodSet: SceneDescription = {
  id: 'l02-the-flood',
  title: 'The Flood',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'gray-sky', depth: 0, opacity: 0 },
    { id: 'forest-far', depth: 0.15 },
    { id: 'clearing', depth: 0.45 },
    // The floodwater, rising from below the frame over the clearing.
    { id: 'flood-rising', depth: 0.5, offsetY: 0.5 },
    { id: 'open-sea', depth: 0.5, opacity: 0, sway: { x: 0.006, seconds: 7 } },
  ],
  actors: [
    // The finished ark by the forest: its door open, then shut.
    { id: 'ark', prop: 'ark', above: 'clearing', ...sized(ARK), pose: 'open' },
    { id: 'ark-ramp', prop: 'ark-ramp', above: 'clearing', x: 0.69, y: 0.84, size: 0.13, facing: -1 },
    // God shown as light, at the door he shuts.
    { id: 'glory', prop: 'glory', above: 'clearing', x: 0.61, y: 0.6, size: 0.24, opacity: 0 },
    ...animals,
    // Birds of the air, in pairs above them.
    { id: 'birds', prop: 'bird', above: 'clearing', x: -0.1, y: 0.3, size: 0.02, group: { count: 6, w: 0.12, h: 0.06, seed: 7, bob: 0.008 } },
    ...family,
    // On the sea: the great waves, rolling in from the sides behind the ark, and the ark riding them.
    ...STORM_WAVES.map((w): SceneActor => ({ id: w.id, prop: 'wave', above: 'open-sea', x: w.side === 'left' ? -0.15 : 1.15, y: 0.82, size: 0.26, facing: w.side === 'left' ? 1 : -1, opacity: 0 })),
    { id: 'ark-sea', prop: 'ark', above: 'open-sea', x: ARK.x, y: 0.75, size: ARK.size, pose: 'rock', opacity: 0 },
    // The window, lit from within: the golden thread.
    { id: 'ark-window', prop: 'halo', above: 'open-sea', ...windowOf(ARK), opacity: 0 },
    // The rain, over everything.
    { id: 'rain', prop: 'rain', above: 'open-sea', x: 0.5, y: 0.5, size: 1.1, opacity: 0 },
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

/** Walking along the ground to the foot of the ramp, up it to the door, and in. */
function goIn(id: string, delay: number, facing: -1 | 1, walk = 4, climb = 2.5) {
  return [
    actor(id, { x: FOOT.x, y: FOOT.y, pose: 'walk', facing }, { seconds: walk, ease: 'inOutSine', delay }),
    actor(id, { x: DOOR.x, y: DOOR.y, facing: -1 }, { seconds: climb, ease: 'inOutSine', delay: delay + walk }),
    actor(id, { opacity: 0, pose: 'idle' }, { seconds: 1, delay: delay + walk + climb - 0.5 }),
  ]
}

/** After "through the storm": the waves gone by, the ark riding steady, its window lit. */
const STORM_DONE = [
  ...STORM_WAVES.map((w) => actor(w.id, { opacity: 0 }, { seconds: 1 })),
  ...STORM_WAVES.map((w) => actor(w.id, { x: w.side === 'left' ? -0.15 : 1.15 }, { seconds: 0.1, delay: 1 })),
  actor('ark-sea', { ...sized(STORM_ARK), pose: 'rock' }, { seconds: 1, ease: 'inOutSine' }),
  actor('ark-window', { ...windowOf(STORM_ARK), opacity: 0.85 }, { seconds: 1, ease: 'inOutSine' }),
]

const scenes: StoryScene[] = [
  {
    id: 'l02-e3-s1',
    title: 'Into the ark',
    music: 'vivaldi-summer-presto',
    beats: [
      say(
        'Then the animals came, two and two, as if called.',
        ...PAIRS.flatMap(({ prop, from }, i) => [0, 1].flatMap((j) => goIn(`${prop}-${j + 1}`, i * 1.4 + j * 0.4, from === 'left' ? 1 : -1))),
        actor('birds', { x: 0.5, y: 0.42 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        actor('birds', { opacity: 0 }, { seconds: 1.5, delay: 7.5 }),
      ),
      verse('GEN 7:9'),
      say(
        'Noah, his wife, his three sons and their wives went in after them: eight people in all.',
        ...FAMILY.flatMap(([id], i) => [actor(id, { opacity: 1 }, { seconds: 1, delay: i * 0.5 }), ...goIn(id, i * 0.5, 1, 3, 2)]),
      ),
      verse(
        'GEN 7:16',
        // Once the last of them is in, the LORD shuts the door.
        actor('glory', { opacity: 0.55 }, { seconds: 2, delay: 2.5 }),
        actor('ark', { pose: 'shut' }, { seconds: 0.6, delay: 4 }),
        actor('glory', { opacity: 0 }, { seconds: 3, delay: 7 }),
        actor('ark-ramp', { opacity: 0 }, { seconds: 2, delay: 5 }),
        actor('ark-window', { opacity: 0.85 }, { seconds: 3, delay: 5 }),
        layer('storm-sky', { opacity: 0.45 }, { seconds: 8, delay: 5 }),
      ),
      say('God himself closed the door. Inside the ark, Noah’s family was safe in God’s hands.'),
    ],
  },
  {
    id: 'l02-e3-s2',
    title: 'The fountains of the deep',
    music: 'vivaldi-summer-presto',
    beats: [
      verse(
        'GEN 7:11',
        layer('storm-sky', { opacity: 1 }, { seconds: 4 }),
        actor('rain', { opacity: 0.85 }, { seconds: 4, delay: 1 }),
        layer('flood-rising', { offsetY: 0.25 }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
        camera({ zoom: 0.98 }, slow),
      ),
      verse(
        'GEN 7:12',
        layer('flood-rising', { offsetY: 0.1 }, { seconds: 10, ease: 'inOutSine' }),
        // The ark lifts gently off the earth.
        actor('ark', { y: 0.75 }, { seconds: 8, ease: 'inOutSine', delay: 2 }),
        actor('ark-window', { y: windowOf({ ...ARK, y: 0.75 }).y }, { seconds: 8, ease: 'inOutSine', delay: 2 }),
      ),
      say('On the second day of creation, God had separated the waters above from the waters below. Now the waters came together again, as if creation were going back to the beginning, to be made new.', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l02-e3-s3',
    title: 'The ark on the waters',
    music: 'vivaldi-summer-presto',
    beats: [
      verse(
        'GEN 7:17',
        // Only the sea is left: the ark rides it, coming nearer.
        ...['forest-far', 'clearing', 'flood-rising'].map((id) => layer(id, { opacity: 0 }, { seconds: 3 })),
        layer('open-sea', { opacity: 1 }, { seconds: 3 }),
        actor('ark', { opacity: 0 }, { seconds: 1.5 }),
        actor('ark-sea', { opacity: 1 }, { seconds: 1.5 }),
        actor('ark-sea', sized(STORM_ARK), { seconds: 4, ease: 'inOutSine', delay: 1.5 }),
        actor('ark-window', windowOf(STORM_ARK), { seconds: 4, ease: 'inOutSine', delay: 1.5 }),
      ),
      play('through-the-storm', { cues: [], done: STORM_DONE }),
      verse(
        'GEN 7:18',
        // The rain stops; the sea lies wide and still under a gray sky.
        actor('rain', { opacity: 0 }, { seconds: 6 }),
        layer('gray-sky', { opacity: 1 }, { seconds: 8 }),
      ),
    ],
  },
  {
    id: 'l02-e3-s4',
    title: 'Only Noah was left',
    music: 'vivaldi-summer-presto',
    beats: [
      say(
        'The waters covered even the highest mountains. Everything that lived on the land and breathed the air was gone.',
        actor('ark-sea', sized(ALONE), { seconds: 10, ease: 'inOutSine' }),
        actor('ark-window', windowOf(ALONE), { seconds: 10, ease: 'inOutSine' }),
      ),
      verse('GEN 7:23'),
      verse('GEN 7:24'),
      say('It is a hard story. God’s judgment on sin is real. But it is never God’s last word. Even here, God was keeping a remnant safe, to begin again.'),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: theFloodSet, scenes }
