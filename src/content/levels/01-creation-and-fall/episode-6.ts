import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · From Adam to Noah (Genesis 4:17–5:32), from the approved Level 1 script.
 *
 * Two families. Cain's line in the land of Nod builds the first city and makes the first
 * herds, music and metalwork, and Lamech boasts of revenge. Seth's line, back on the
 * hillside, calls on the name of the LORD. Then the great family tree from Adam to Noah,
 * which the player fills ("the family tree", minigames/family-tree), with its glowing root
 * where this episode's golden thread is found (Luke 3:38); Enoch walking up a path into
 * the light; and a weary father lifting up his newborn son, Noah.
 */

/** The ten generations from Adam to Noah (Genesis 5), with the short fact the tree shows for some. */
export const GENERATIONS = [
  { name: 'Adam', note: 'lived 930 years' },
  { name: 'Seth' },
  { name: 'Enosh', note: 'in his days people began to call upon the LORD' },
  { name: 'Kenan' },
  { name: 'Mahalalel' },
  { name: 'Jared' },
  { name: 'Enoch', note: 'walked with God' },
  { name: 'Methuselah', note: '969 years, the longest life in the Bible' },
  { name: 'Lamech' },
  { name: 'Noah', note: 'this one shall bring us relief' },
].map((g, i) => ({ ...g, leaf: `leaf-${i + 1}`, branch: `branch-${i + 1}` }))

/** Where the family tree stands: to the right of the card the names are chosen on. */
const TREE = { x: 0.66, base: 0.74, size: 0.22 }
/** The tree's drawing is 200 × 300 units; this many frame units each. */
const UNIT = (TREE.size * 1600) / 200

/**
 * Each name's branch: where it leaves the trunk, which side it goes, how big it's drawn,
 * and where its leaf hangs at the tip. The branches alternate sides as the tree rises,
 * reaching 50 to 66 of the tree's units. A branch's drawing reaches 60 units out and 20
 * up within a box 140 wide, from its middle (see the 'tree-branch' prop).
 */
function branchOf(i: number) {
  const side: -1 | 1 = i % 2 ? 1 : -1
  const reach = 50 + (i % 3) * 8
  const joint = { x: TREE.x, y: TREE.base - ((300 - (260 - 24 * i)) * UNIT) / 900 }
  const scale = (reach * UNIT) / 60
  return {
    joint,
    side,
    size: (140 * scale) / 1600,
    leaf: { x: joint.x + (side * 60 * scale) / 1600, y: joint.y - (20 * scale) / 900 },
  }
}

const person = (id: string, prop: string, x: number, facing: -1 | 1, pose = 'clothed', opacity = 0): SceneActor => ({
  id,
  prop,
  above: 'east-land',
  x,
  y: 0.78,
  size: prop === 'woman' ? 0.042 : 0.045,
  facing,
  pose,
  opacity,
})

export const generationsSet: SceneDescription = {
  id: 'l01-generations',
  title: 'From Adam to Noah',
  layers: [
    { id: 'home-sky', depth: 0 },
    { id: 'home-hills', depth: 0.15 },
    { id: 'home-land', depth: 0.45 },
    // The land of Nod, where Cain's line builds: seen first.
    { id: 'east-sky', depth: 0 },
    { id: 'east-hills', depth: 0.15 },
    { id: 'east-land', depth: 0.45 },
    { id: 'enoch-path', depth: 0.3, opacity: 0 },
    { id: 'eden-dusk', depth: 0, opacity: 0 },
  ],
  actors: [
    // Cain's line: the city, its tents and herds, its music and its forge.
    { id: 'city', prop: 'city', above: 'east-land', x: 0.3, y: 0.62, size: 0.3, grow: 0 },
    { id: 'tent-1', prop: 'tent', above: 'east-land', x: 0.58, y: 0.66, size: 0.1, opacity: 0 },
    { id: 'tent-2', prop: 'tent', above: 'east-land', x: 0.7, y: 0.68, size: 0.09, opacity: 0 },
    { id: 'herd', prop: 'sheep', above: 'east-land', x: 0.84, y: 0.7, size: 0.04, opacity: 0, group: { count: 4, w: 0.12, h: 0.03, seed: 61 } },
    { id: 'lyre', prop: 'lyre', above: 'east-land', x: 0.5, y: 0.72, size: 0.05, opacity: 0 },
    { id: 'forge', prop: 'forge', above: 'east-land', x: 0.12, y: 0.74, size: 0.08, opacity: 0 },
    person('lamech', 'cain', 0.44, -1, 'idle'),
    person('wife-1', 'woman', 0.34, 1),
    person('wife-2', 'woman', 0.3, 1),
    // Seth's line, back on the hillside, and their altar.
    { id: 'altar', prop: 'altar', above: 'east-land', x: 0.36, y: 0.76, size: 0.07, opacity: 0 },
    person('adam', 'man', 0.5, -1),
    person('eve', 'woman', 0.56, -1),
    person('seth', 'man', 0.44, -1),
    // The great family tree, its root glowing (the golden thread), and a leaf for each name.
    { id: 'family-tree', prop: 'family-tree', above: 'eden-dusk', x: TREE.x, y: TREE.base, size: TREE.size, opacity: 0 },
    { id: 'tree-root', prop: 'tree-root', above: 'eden-dusk', x: TREE.x, y: TREE.base - 0.01, size: 0.2, opacity: 0 },
    ...GENERATIONS.map((g, i) => {
      const b = branchOf(i)
      return { id: g.branch, prop: 'tree-branch', above: 'eden-dusk', x: b.joint.x, y: b.joint.y, size: b.size, facing: b.side, grow: 0 }
    }),
    ...GENERATIONS.map((g, i) => ({ id: g.leaf, prop: 'name-leaf', above: 'eden-dusk', ...branchOf(i).leaf, size: 0.035, opacity: 0 })),
    // Enoch, on the path into the light.
    { id: 'enoch', prop: 'man', above: 'enoch-path', x: 0.58, y: 0.92, size: 0.05, facing: 1, pose: 'clothed', opacity: 0 },
    // Noah's father in his hard field, and the light on his newborn son.
    { id: 'thorns-1', prop: 'thorns', above: 'enoch-path', x: 0.2, y: 0.84, size: 0.09, grow: 0 },
    { id: 'thorns-2', prop: 'thorns', above: 'enoch-path', x: 0.82, y: 0.8, size: 0.08, grow: 0 },
    { id: 'child-light', prop: 'halo', above: 'eden-dusk', x: 0.49, y: 0.58, size: 0.13, opacity: 0 },
    person('father', 'man', 0.52, -1, 'lift'),
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.006 },
      { at: 18, value: 0.006, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 18, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 18, value: 1.012, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0) => actor(id, { opacity: 1 }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2.5, delay })

/** After the family tree: every branch grown, every name on its branch. */
const TREE_GROWN = GENERATIONS.flatMap((g) => [actor(g.branch, { grow: 1 }, { seconds: 1.5 }), actor(g.leaf, { opacity: 1 }, { seconds: 1 })])

const scenes: StoryScene[] = [
  {
    id: 'l01-e6-s1',
    title: 'Cain’s line',
    music: 'bach-wer-nur',
    beats: [
      say(
        'Cain’s family grew. He built a city and named it Enoch, after his son.',
        actor('city', { grow: 1 }, { seconds: 6, ease: 'outCubic', delay: 0.5 }),
        fadeIn('tent-1', 3),
        fadeIn('tent-2', 3.6),
      ),
      say(
        'His descendants were makers and builders: Jabal, father of those who live in tents and keep herds; Jubal, father of all who play the lyre and pipe; and Tubal-cain, who forged bronze and iron.',
        fadeIn('herd', 1),
        fadeIn('lyre', 5),
        fadeIn('forge', 9),
      ),
      say(
        'But skill did not make them good. Lamech, of Cain’s line, boasted to his wives that he had killed a man for wounding him. If Cain would be avenged seven times, he said, then Lamech seventy-seven.',
        fadeIn('lamech'),
        fadeIn('wife-1', 0.6),
        fadeIn('wife-2', 1),
        actor('lamech', { pose: 'offer' }, { seconds: 1.2, ease: 'inOutSine', delay: 2.5 }),
        camera({ zoom: 1.1, x: -0.06, y: 0.03 }, slow),
      ),
      say('One day Jesus would turn Lamech’s boast inside out. Forgive, he would say,', actor('lamech', { pose: 'idle' }, { seconds: 1.5 })),
      verse('MAT 18:22', camera({ zoom: 1, x: 0, y: 0 }, slow)),
    ],
  },
  {
    id: 'l01-e6-s2',
    title: 'Seth',
    music: 'bach-wer-nur',
    beats: [
      say(
        'Adam and Eve had another son. Eve called him Seth, and said:',
        ...['east-sky', 'east-hills', 'east-land'].map((id) => layer(id, { opacity: 0 }, { seconds: 4, ease: 'inOutSine' })),
        ...['city', 'tent-1', 'tent-2', 'herd', 'lyre', 'forge', 'lamech', 'wife-1', 'wife-2'].map((id) => fadeOut(id)),
        fadeIn('adam', 2),
        fadeIn('eve', 2.4),
        actor('eve', { pose: 'hold' }, { seconds: 1.5, delay: 2.4 }),
      ),
      verse('GEN 4:25'),
      say('Seth had a son, Enosh.', actor('eve', { pose: 'clothed' }, { seconds: 1.5 }), fadeIn('seth', 0.5)),
      verse(
        'GEN 4:26',
        layer('eden-dusk', { opacity: 0.6 }, { seconds: 5, ease: 'inOutSine' }),
        fadeIn('altar'),
        actor('adam', { pose: 'pray' }, { seconds: 1.6, ease: 'inOutSine', delay: 2 }),
        actor('eve', { pose: 'pray' }, { seconds: 1.6, ease: 'inOutSine', delay: 2.3 }),
        actor('seth', { pose: 'pray' }, { seconds: 1.6, ease: 'inOutSine', delay: 2.6 }),
      ),
      say('Two families now walked the earth: one building cities and boasting of revenge, the other calling on the name of the LORD.'),
    ],
  },
  {
    id: 'l01-e6-s3',
    title: 'Ten generations',
    music: 'bach-wer-nur',
    beats: [
      say(
        '“This is the book of the generations of Adam,” Genesis says, and it lists them one by one.',
        ...['adam', 'eve', 'seth', 'altar'].map((id) => fadeOut(id)),
        layer('eden-dusk', { opacity: 0.85 }, slow),
        actor('family-tree', { opacity: 1 }, { seconds: 2, delay: 1 }),
        actor('tree-root', { opacity: 1 }, { seconds: 3, delay: 1.5 }),
      ),
      play('family-tree', { done: TREE_GROWN }),
      say('Ten generations: Adam, Seth, Enosh, Kenan, Mahalalel, Jared, Enoch, Methuselah, Lamech and Noah. Each lived, had children, and died.'),
      say(
        'The great ages in this chapter, Adam 930 years and Methuselah 969, have puzzled readers for centuries, and they have been understood in different ways. Whatever their meaning, Genesis makes its point: generation after generation, the line of the promise goes on.',
      ),
    ],
  },
  {
    id: 'l01-e6-s4',
    title: 'Enoch walked with God',
    music: 'bach-wer-nur',
    beats: [
      say(
        'One name breaks the pattern. Of every other man in the list it says, “and he died.” But of Enoch it is written:',
        layer('enoch-path', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        layer('eden-dusk', { opacity: 0 }, { seconds: 5 }),
        ...['family-tree', 'tree-root', ...GENERATIONS.flatMap((g) => [g.leaf, g.branch])].map((id) => fadeOut(id)),
        fadeIn('enoch', 3),
      ),
      verse(
        'GEN 5:24',
        // He walks up the path into the light, smaller and smaller, and then he is not.
        actor('enoch', { x: 0.61, y: 0.5, size: 0.012 }, { seconds: 9, ease: 'inOutSine' }),
        actor('enoch', { opacity: 0 }, { seconds: 2.5, delay: 7.5 }),
      ),
      say('The Letter to the Hebrews says:'),
      verse('HEB 11:5'),
      say('Enoch shows what human life was meant to be: walking with God.'),
    ],
  },
  {
    id: 'l01-e6-s5',
    title: 'Noah is born',
    music: 'bach-wer-nur',
    beats: [
      say(
        'Methuselah’s son was named Lamech too, a different Lamech from Cain’s line. He had a son.',
        layer('enoch-path', { opacity: 0 }, { seconds: 5, ease: 'inOutSine' }),
        ...['east-sky', 'east-hills', 'east-land'].map((id) => layer(id, { opacity: 1 }, { seconds: 5, ease: 'inOutSine' })),
        layer('eden-dusk', { opacity: 0.45 }, { seconds: 6 }),
        actor('thorns-1', { grow: 1 }, { seconds: 3, ease: 'outCubic', delay: 1 }),
        actor('thorns-2', { grow: 1 }, { seconds: 3, ease: 'outCubic', delay: 1.6 }),
        fadeIn('father', 2.5),
      ),
      verse(
        'GEN 5:29',
        actor('child-light', { opacity: 0.9 }, { seconds: 4, delay: 1 }),
        camera({ zoom: 1.08, x: 0.01, y: -0.02 }, { seconds: 8, ease: 'inOutSine' }),
      ),
      say(
        'The ground was cursed and life was toil, and a father hoped this child would bring relief. He would, in a way no one could imagine. That is the next level’s story.',
        camera({ zoom: 1, x: 0, y: 0 }, { seconds: 8, ease: 'inOutSine' }),
      ),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: generationsSet, scenes }
