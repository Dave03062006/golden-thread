import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 7 · Jacob's Blessings (Genesis 47–50), from the approved Level 5 script.
 *
 * Old Jacob blesses Pharaoh, and Israel grows in Goshen. Jacob crosses his hands to bless
 * Joseph's sons, the younger first. Then he gathers his twelve sons: the player gives each
 * picture from his blessings to the son it belongs to ("the twelve blessings",
 * minigames/twelve-blessings), and the lion over Judah glows (this episode's golden thread:
 * the scepter of Judah, and the kingdom without end). Jacob dies and is buried at Mamre. His
 * sons, afraid, beg Joseph's forgiveness: "you meant evil against me; but God meant it for
 * good." Joseph, old, tells them God will bring them home, and dies in Egypt.
 */

/** The pictures of Jacob's blessings, in the order they rise, with whose each is and Jacob's words for it. */
export const BLESSINGS = [
  { picture: 'lion', shows: 'a lion', son: 'Judah', words: '“Judah is a lion’s whelp.”' },
  { picture: 'ship', shows: 'ships by the shore', son: 'Zebulun', words: '“Zebulun shall dwell at the shore of the sea; he shall become a haven for ships.”' },
  { picture: 'donkey', shows: 'a strong donkey', son: 'Issachar', words: '“Issachar is a strong ass.”' },
  { picture: 'serpent', shows: 'a serpent by the road', son: 'Dan', words: '“Dan shall be a serpent in the way.”' },
  { picture: 'deer', shows: 'a deer let loose', son: 'Naphtali', words: '“Naphtali is a hind let loose.”' },
  { picture: 'vine', shows: 'a fruitful vine over a wall', son: 'Joseph', words: '“Joseph is a fruitful bough.”' },
  { picture: 'wolf', shows: 'a wolf', son: 'Benjamin', words: '“Benjamin is a ravenous wolf.”' },
  { picture: 'bread', shows: 'rich bread', son: 'Asher', words: '“Asher’s food shall be rich.”' },
] as const
/** All twelve sons, eldest first, as the play offers them. */
export const SONS = ['Reuben', 'Simeon', 'Levi', 'Judah', 'Dan', 'Naphtali', 'Gad', 'Asher', 'Issachar', 'Zebulun', 'Joseph', 'Benjamin']
/** Where the pictures rise, over the sons gathered by Jacob's bed. */
export const SIGN_AT = { x: 0.68, y: 0.42 }

const ABOVE = 'pharaoh-hall'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'boy' || prop === 'girl' ? 0.026 : 0.042, facing: -1, ...extra })
const BROTHERS = ['reuben', 'simeon', 'judah', 'brother', 'benjamin']

export const blessingsSet: SceneDescription = {
  id: 'l05-blessings',
  title: 'Jacob’s blessings',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3 },
    // Pharaoh's hall, over everything outside.
    { id: 'pharaoh-hall', depth: 0.3 },
  ],
  actors: [
    // Pharaoh's hall.
    { id: 'throne', prop: 'throne', above: ABOVE, x: 0.7, y: 0.79, size: 0.06 },
    person('pharaoh', 'pharaoh', 0.7, 0.78, { pose: 'kneel' }),
    // Goshen: flocks, and children.
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.7, y: 0.79, size: 0.03, opacity: 0, group: { count: 7, w: 0.2, h: 0.03, seed: 71, bob: 0.002 } },
    // Jacob's bed, his twelve sons around it, and the pictures of his blessings.
    { id: 'bed', prop: 'feast-mat', above: ABOVE, x: 0.4, y: 0.8, size: 0.16, opacity: 0 },
    { id: 'sons', prop: 'twelve-sons', above: ABOVE, x: 0.68, y: 0.79, size: 0.32, opacity: 0 },
    { id: 'blessing', prop: 'blessing-sign', above: ABOVE, ...SIGN_AT, size: 0.1, pose: 'lion', opacity: 0 },
    // The lion over Judah: the golden thread.
    { id: 'judahs-lion', prop: 'halo', above: ABOVE, ...SIGN_AT, size: 0.12, opacity: 0 },
    // The cave of Machpelah at Mamre, and the funeral procession.
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.16, y: 0.8, size: 0.26, opacity: 0 },
    { id: 'cave', prop: 'cave-tomb', above: ABOVE, x: 0.72, y: 0.78, size: 0.2, opacity: 0 },
    { id: 'mourners', prop: 'crowd', above: ABOVE, x: 0.42, y: 0.8, size: 0.16, facing: 1, opacity: 0 },
    // The people.
    person('jacob', 'jacob-old', 0.46, 0.78),
    person('joseph', 'joseph-egypt', 0.38, 0.78, { facing: 1 }),
    person('manasseh', 'boy', 0.5, 0.795, { opacity: 0 }),
    person('ephraim', 'boy', 0.32, 0.8, { size: 0.022, facing: 1, opacity: 0 }),
    ...BROTHERS.map((id, i) => person(id, id, 0.12 + i * 0.065, 0.785, { facing: 1, opacity: 0 })),
    person('old-joseph', 'joseph-old', 0.58, 0.78, { opacity: 0 }),
    person('great-grandson', 'boy', 0.5, 0.795, { facing: 1, opacity: 0 }),
    person('great-granddaughter', 'girl', 0.45, 0.8, { facing: 1, opacity: 0 }),
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
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]

/** After the blessings: every picture given, the last one fading. */
const BLESSED = [actor('blessing', { opacity: 0, pose: BLESSINGS.at(-1)!.picture }, { seconds: 1 })]

const scenes: StoryScene[] = [
  {
    id: 'l05-e7-s1',
    title: 'Jacob before Pharaoh',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('GEN 47:7', actor('jacob', { x: 0.56, pose: 'walk', facing: 1 }, { seconds: 2, ease: 'inOutSine' }), actor('jacob', { pose: 'lift' }, { seconds: 1, delay: 2.5 })),
      verse(
        'GEN 47:27',
        // Goshen: Israel's flocks and children.
        layer('pharaoh-hall', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        ...['throne', 'pharaoh'].map((id) => fadeOut(id)),
        actor('jacob', { pose: 'idle', x: 0.46, facing: -1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('flock', 1),
        ...['manasseh', 'ephraim'].map((id, i) => fadeIn(id, 1.3 + i * 0.3)),
        camera({ zoom: 1.03 }, slow),
      ),
    ],
  },
  {
    id: 'l05-e7-s2',
    title: 'Crossed hands',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse(
        'GEN 48:14',
        camera({ zoom: 1 }, slow),
        // Jacob on his bed, the two boys before him.
        fadeOut('flock'),
        fadeIn('bed', 0.5),
        actor('jacob', { x: 0.42, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 0.5 }),
        actor('ephraim', { x: 0.36 }, { seconds: 1.5, ease: 'inOutSine', delay: 0.5 }),
        actor('manasseh', { x: 0.47, facing: -1 }, { seconds: 1.5, ease: 'inOutSine', delay: 0.5 }),
        actor('joseph', { x: 0.54, facing: -1 }, { seconds: 1.5, ease: 'inOutSine', delay: 0.5 }),
        actor('jacob', { pose: 'carry' }, { seconds: 1, delay: 3 }),
        actor('joseph', { pose: 'lift' }, { seconds: 1, delay: 5 }),
      ),
      verse('GEN 48:16', actor('joseph', { pose: 'idle' }, { seconds: 1 }), actor('jacob', { pose: 'pray' }, { seconds: 1 })),
      say('Once again, as with Isaac and Ishmael, Jacob and Esau, God’s blessing went to the younger.', actor('jacob', { pose: 'kneel' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l05-e7-s3',
    title: 'The twelve blessings',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('GEN 49:1', ...['manasseh', 'ephraim'].map((id) => fadeOut(id)), actor('joseph', { opacity: 0 }, { seconds: 1 }), fadeIn('sons', 1), fadeIn('judahs-lion', 0.5, 0.85)),
      play('twelve-blessings', { cues: [], done: BLESSED }),
      verse('GEN 49:9', actor('blessing', { pose: 'lion' }, { seconds: 0.4 }), fadeIn('blessing', 0, 0.9)),
      verse('GEN 49:10', camera({ zoom: 1.04, y: -0.02 }, slow)),
      verse('GEN 49:28', camera({ zoom: 1, y: 0 }, slow), fadeOut('blessing'), fadeOut('judahs-lion')),
    ],
  },
  {
    id: 'l05-e7-s4',
    title: '“God meant it for good”',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('GEN 49:33', actor('jacob', { opacity: 0 }, { seconds: 3, delay: 1 }), actor('sons', { opacity: 0.6 }, { seconds: 3 })),
      say(
        'Joseph and his brothers carried their father back to Canaan, and buried him in the cave of Machpelah with Abraham and Isaac.',
        // Mamre: the funeral procession at the cave.
        fadeOut('sons'),
        fadeOut('bed'),
        ...swap('goshen-fields', 'canaan-hills'),
        fadeIn('oak', 1),
        fadeIn('cave', 1),
        fadeIn('mourners', 1.5),
        actor('mourners', { x: 0.52 }, { seconds: 5, ease: 'inOutSine', delay: 1.5 }),
      ),
      verse(
        'GEN 50:15',
        // Back in Goshen, the brothers afraid before Joseph.
        ...['oak', 'cave', 'mourners'].map((id) => fadeOut(id)),
        ...swap('canaan-hills', 'goshen-fields'),
        actor('joseph', { x: 0.72, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 1.5),
        ...BROTHERS.map((id) => fadeIn(id, 1.5)),
        ...BROTHERS.map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 3 + i * 0.15 })),
      ),
      verse('GEN 50:19', actor('joseph', { pose: 'pray' }, { seconds: 1 })),
      verse('GEN 50:20', actor('joseph', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.03 }, slow)),
      verse('GEN 50:21', camera({ zoom: 1 }, slow), actor('joseph', { pose: 'carry' }, { seconds: 1 }), ...BROTHERS.map((id, i) => actor(id, { pose: 'idle' }, { seconds: 1, delay: 1 + i * 0.2 }))),
    ],
  },
  {
    id: 'l05-e7-s5',
    title: '“God will visit you”',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse(
        'GEN 50:24',
        // Joseph old, among his great-grandchildren, pointing north to Canaan.
        ...[...BROTHERS, 'joseph'].map((id) => fadeOut(id)),
        fadeIn('old-joseph', 1),
        fadeIn('great-grandson', 1.3),
        fadeIn('great-granddaughter', 1.5),
        actor('old-joseph', { pose: 'lift', facing: -1 }, { seconds: 1, delay: 3 }),
      ),
      verse('GEN 50:25', actor('old-joseph', { pose: 'idle' }, { seconds: 1 })),
      verse('GEN 50:26', ...swap('forest-sky', 'vineyard-sky'), ...['great-grandson', 'great-granddaughter'].map((id) => fadeOut(id, 1)), actor('old-joseph', { opacity: 0 }, { seconds: 3, delay: 2 })),
      say('So the book of Genesis ends, with God’s people in Egypt, waiting. Four hundred years later, Moses would carry Joseph’s bones out of Egypt, when God brought his people home.', camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: blessingsSet, scenes }
