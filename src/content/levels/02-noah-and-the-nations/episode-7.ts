import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { GENERATIONS as ADAM_TO_NOAH, TREE, branchOf } from '../01-creation-and-fall/episode-6'

/**
 * Episode 7 · From Shem to Abram (Genesis 11:10–32 and 12:1), from the approved Level 2
 * script.
 *
 * The family tree from Level 1, grown up to Noah, appears again under the stars; then a
 * new line grows from it, Shem's, name by name to Abram ("the family tree",
 * minigames/family-tree, played again). Ur of the Chaldeans by the Euphrates, where
 * Terah's family lives; the caravan along the river to Haran; and at night in Haran,
 * Abram outside his tent hears God call. The brightest star above him glows: this
 * episode's golden thread, all nations blessed.
 */

/** The ten generations from Shem to Abram (Genesis 11), with the short fact the tree shows for some. */
export const SHEM_LINE = [
  { name: 'Shem', note: 'son of Noah, blessed by his father' },
  { name: 'Arpachshad', note: 'born two years after the Flood' },
  { name: 'Shelah' },
  { name: 'Eber', note: 'from whose name may come the word “Hebrew”' },
  { name: 'Peleg', note: 'in his days the earth was divided' },
  { name: 'Reu' },
  { name: 'Serug' },
  { name: 'Nahor' },
  { name: 'Terah', note: 'father of Abram, Nahor and Haran' },
  { name: 'Abram', note: 'the LORD will call him' },
].map((g, i) => ({ ...g, leaf: `shem-leaf-${i + 1}`, branch: `shem-branch-${i + 1}` }))

const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: 'shinar-plain',
  x,
  y,
  size: prop === 'sarai' ? 0.04 : 0.045,
  facing: -1,
  opacity: 0,
  ...extra,
})

/** The tree's branches and leaves: Adam's line, grown already, and Shem's, to grow. */
const branch = (id: string, i: number, grow: number): SceneActor => {
  const b = branchOf(i)
  return { id, prop: 'tree-branch', above: 'night-sky', x: b.joint.x, y: b.joint.y, size: b.size, facing: b.side, grow }
}
const leaf = (id: string, i: number, opacity: number): SceneActor => ({ id, prop: 'name-leaf', above: 'night-sky', ...branchOf(i).leaf, size: 0.035, opacity })

export const fromShemToAbramSet: SceneDescription = {
  id: 'l02-from-shem-to-abram',
  title: 'From Shem to Abram',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'shinar-sky', depth: 0, opacity: 0 },
    { id: 'ur-city', depth: 0.25, opacity: 0 },
    { id: 'shinar-plain', depth: 0.45, opacity: 0 },
    { id: 'night-hill', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The family tree under the stars: Adam's line grown, then Shem's.
    { id: 'family-tree', prop: 'family-tree', above: 'night-sky', x: TREE.x, y: TREE.base, size: TREE.size },
    { id: 'tree-root', prop: 'tree-root', above: 'night-sky', x: TREE.x, y: TREE.base - 0.01, size: 0.2, opacity: 0.8 },
    ...ADAM_TO_NOAH.map((g, i) => branch(g.branch, i, 1)),
    ...ADAM_TO_NOAH.map((g, i) => leaf(g.leaf, i, 1)),
    ...SHEM_LINE.map((g, i) => branch(g.branch, i, 0)),
    ...SHEM_LINE.map((g, i) => leaf(g.leaf, i, 0)),
    // Terah's family in Ur.
    person('terah', 'terah', 0.58, 0.785),
    person('abram', 'abram', 0.5, 0.79),
    person('nahor', 'nahor', 0.66, 0.79),
    person('haran', 'haran', 0.73, 0.8),
    person('sarai', 'sarai', 0.44, 0.8, { facing: 1 }),
    person('lot', 'lot', 0.8, 0.805),
    // The caravan to Haran.
    { id: 'camel-1', prop: 'camel', above: 'shinar-plain', x: 1.12, y: 0.78, size: 0.14, facing: -1, pose: 'walk', opacity: 0 },
    { id: 'camel-2', prop: 'camel', above: 'shinar-plain', x: 1.24, y: 0.79, size: 0.13, facing: -1, pose: 'walk', opacity: 0 },
    { id: 'herd', prop: 'sheep', above: 'shinar-plain', x: 1.34, y: 0.805, size: 0.04, facing: -1, pose: 'walk', opacity: 0, group: { count: 4, w: 0.1, h: 0.03, seed: 23 } },
    // Haran at night: Abram outside his tent, the light resting on him, and the brightest star: the golden thread.
    { id: 'abram-tent', prop: 'striped-tent', above: 'night-hill', x: 0.62, y: 0.71, size: 0.09, pose: 'open', opacity: 0 },
    { id: 'abram-night', prop: 'abram', above: 'night-hill', x: 0.5, y: 0.69, size: 0.034, facing: 1, pose: 'idle', opacity: 0 },
    { id: 'glory', prop: 'glory', above: 'night-hill', x: 0.5, y: 0.34, size: 0.3, opacity: 0 },
    { id: 'abram-star', prop: 'halo', above: 'night-hill', x: 0.66, y: 0.16, size: 0.05, opacity: 0 },
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

/** After the family tree: every branch of Shem's line grown, every leaf out. */
const SHEM_TREE_GROWN = SHEM_LINE.flatMap((g) => [actor(g.branch, { grow: 1 }, { seconds: 1.5 }), actor(g.leaf, { opacity: 1 }, { seconds: 1 })])

const TREE_ACTORS = ['family-tree', 'tree-root', ...ADAM_TO_NOAH.flatMap((g) => [g.branch, g.leaf]), ...SHEM_LINE.flatMap((g) => [g.branch, g.leaf])]

const scenes: StoryScene[] = [
  {
    id: 'l02-e7-s1',
    title: 'The line of Shem',
    music: 'bach-wer-nur',
    beats: [
      say('Out of all the scattered families, Genesis follows one: the line of Shem.', camera({ zoom: 1.03 }, slow)),
      verse(
        'GEN 11:10',
        // Adam's line, up to Noah, steps back, and a new line springs from Noah.
        camera({ zoom: 1 }, slow),
        ...ADAM_TO_NOAH.flatMap((g, i) => [actor(g.leaf, { opacity: 0 }, { seconds: 1.5, delay: i * 0.15 }), actor(g.branch, { grow: 0 }, { seconds: 1.5, delay: 0.5 + i * 0.15 })]),
      ),
      play('family-tree-shem', { done: SHEM_TREE_GROWN }),
      say('Ten generations from Adam to Noah, and ten from Shem to Abram. After the Flood, lives grow shorter, from six hundred years to about two hundred.'),
    ],
  },
  {
    id: 'l02-e7-s2',
    title: 'Ur of the Chaldeans',
    music: 'bach-wer-nur',
    beats: [
      verse(
        'GEN 11:26',
        // From the tree to Ur, by the Euphrates.
        ...TREE_ACTORS.map((id) => fadeOut(id)),
        layer('shinar-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        layer('ur-city', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }),
        layer('shinar-plain', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }),
        ...['terah', 'abram', 'nahor', 'haran'].map((id, i) => fadeIn(id, 2 + i * 0.4)),
      ),
      say('Haran died young, in Ur, leaving his son Lot.', fadeOut('haran', 1), fadeIn('lot', 2.5)),
      say('Abram married Sarai.', fadeIn('sarai', 0.5)),
      verse('GEN 11:30'),
      say('In a family with no child, God’s promise of a Savior seemed to come to a stop. But God loves to begin where people see an end.'),
    ],
  },
  {
    id: 'l02-e7-s3',
    title: 'The road to Haran',
    music: 'bach-wer-nur',
    beats: [
      verse(
        'GEN 11:31',
        // The caravan sets out along the river, northwest; Nahor stays behind.
        layer('ur-city', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        fadeOut('nahor'),
        ...['camel-1', 'camel-2', 'herd'].map((id) => fadeIn(id)),
        ...[
          ['camel-1', 0.3],
          ['camel-2', 0.42],
          ['herd', 0.56],
        ].map(([id, x], i) => actor(id as string, { x: x as number }, { seconds: 11, ease: 'inOutSine', delay: i * 0.5 })),
        ...[
          ['abram', 0.2],
          ['terah', 0.14],
          ['sarai', 0.25],
          ['lot', 0.68],
        ].map(([id, x], i) => actor(id as string, { x: x as number, pose: 'walk', facing: -1 }, { seconds: 11, ease: 'inOutSine', delay: 0.5 + i * 0.3 })),
        ...['abram', 'terah', 'sarai', 'lot'].map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay: 12 + i * 0.3 })),
        ...['camel-1', 'camel-2', 'herd'].map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay: 11.5 + i * 0.5 })),
      ),
      verse('GEN 11:32', fadeOut('terah', 2)),
    ],
  },
  {
    id: 'l02-e7-s4',
    title: 'A voice calling',
    music: 'bach-wer-nur',
    beats: [
      say(
        'In Haran, Abram heard a voice.',
        // Haran at night: Abram outside his tent, under a sky full of stars.
        ...['abram', 'sarai', 'lot', 'camel-1', 'camel-2', 'herd'].map((id) => fadeOut(id)),
        layer('shinar-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('shinar-plain', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('night-hill', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        fadeIn('abram-tent', 2),
        fadeIn('abram-night', 3),
        fadeIn('abram-star', 1, 0.9),
      ),
      verse('GEN 12:1', actor('glory', { opacity: 0.8 }, { seconds: 5, delay: 1 }), actor('abram-night', { pose: 'pray' }, { seconds: 1, delay: 2 })),
      say('At Babel, the nations were scattered. Now, through one man, God would begin to gather them back.', camera({ zoom: 1.04, y: -0.02 }, { seconds: 8, ease: 'inOutSine' })),
      say('That is the next Age’s story.'),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: fromShemToAbramSet, scenes }
