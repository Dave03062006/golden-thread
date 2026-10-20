import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · The Birthright (Genesis 25:7–34), from the approved Level 4 script.
 *
 * Isaac and Ishmael bury Abraham at the cave of Machpelah. Rebekah, barren like Sarah,
 * conceives when Isaac prays, and the LORD tells her: two nations are in your womb, the
 * elder shall serve the younger. The twins: Esau, red and hairy; Jacob, holding his
 * brother's heel. They grow up a hunter and a quiet man of the tents. Esau comes in
 * famished, and Jacob, stirring red stew, says, "First sell me your birthright." The player
 * weighs the bowl against what the birthright meant ("what is it worth?",
 * minigames/what-is-it-worth), and the stew flies up, light as nothing. Esau takes it
 * anyway. The bowl glows (this episode's golden thread: not by bread alone).
 */

/** The five things the birthright meant, placed one by one on the scales against the bowl of stew. */
export const PIECES = [
  { title: 'A double share', text: 'The eldest son inherited twice as much as each of his brothers.' },
  { title: 'Head of the family', text: 'After his father, the firstborn led the whole household.' },
  { title: 'The blessing of Abraham', text: 'God’s blessing, handed down from Abraham to Isaac, and on to his heir.' },
  { title: 'A land and a great nation', text: 'God’s promise: this land for his children, and descendants as many as the stars.' },
  { title: 'The line of the Savior', text: 'From this family, one day, the Savior of the world would come.' },
]

const ABOVE = 'dry-hills'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'rebekah' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

export const birthrightSet: SceneDescription = {
  id: 'l04-birthright',
  title: 'The birthright',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3 },
    { id: 'dry-hills', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // At Mamre: the oak, and the cave of Machpelah where Abraham is buried.
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.16, y: 0.8, size: 0.26 },
    { id: 'cave', prop: 'cave-tomb', above: ABOVE, x: 0.7, y: 0.78, size: 0.2 },
    // Isaac's tents in the south.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.8, y: 0.76, size: 0.13, pose: 'open', opacity: 0 },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.5, y: 0.3, size: 0.3, opacity: 0 },
    // The twins, newborn.
    { id: 'baby-esau', prop: 'swaddled-baby', above: ABOVE, x: 0.523, y: 0.645, size: 0.026, opacity: 0 },
    { id: 'baby-jacob', prop: 'swaddled-baby', above: ABOVE, x: 0.488, y: 0.64, size: 0.026, opacity: 0 },
    // Jacob's fire, the pot of red stew on it, and the bowl he holds out: the golden thread.
    { id: 'fire', prop: 'campfire', above: ABOVE, x: 0.36, y: 0.8, size: 0.045, opacity: 0 },
    { id: 'pot', prop: 'stew-pot', above: ABOVE, x: 0.36, y: 0.785, size: 0.04, opacity: 0 },
    { id: 'bowl', prop: 'stew-bowl', above: ABOVE, x: 0.43, y: 0.8, size: 0.026, opacity: 0 },
    { id: 'the-stew', prop: 'halo', above: ABOVE, x: 0.43, y: 0.7, size: 0.06, opacity: 0 },
    // The scales of the play, seen above the scene.
    { id: 'scales', prop: 'scales', above: ABOVE, x: 0.5, y: 0.36, size: 0.3, pose: 'stew', opacity: 0 },
    // The people.
    person('isaac', 'isaac', 0.42, 0.78, { pose: 'kneel', facing: 1 }),
    person('ishmael', 'ishmael', 0.52, 0.78, { pose: 'kneel' }),
    person('rebekah', 'rebekah', 0.58, 0.785, { opacity: 0 }),
    person('esau', 'esau', 0.7, 0.785, { opacity: 0 }),
    person('jacob', 'jacob', 0.3, 0.79, { facing: 1, opacity: 0 }),
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

/** After the weighing: every piece on the scales, and the stew light as nothing. */
const WEIGHED = [actor('scales', { pose: 'tip-5' }, { seconds: 0.8 })]

const scenes: StoryScene[] = [
  {
    id: 'l04-e2-s1',
    title: 'Two nations',
    music: 'franck-panis-angelicus',
    beats: [
      verse('GEN 25:8', camera({ zoom: 1.03 }, slow)),
      say(
        'Rebekah, like Sarah, was barren.',
        camera({ zoom: 1 }, slow),
        // Isaac's tents in the dry south, years later.
        ...['oak', 'cave', 'ishmael'].map((id) => fadeOut(id)),
        layer('canaan-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dry-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('tent', 1.5),
        actor('isaac', { x: 0.46, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('rebekah', 1.5),
      ),
      verse('GEN 25:21', actor('isaac', { pose: 'pray' }, { seconds: 1 }), actor('isaac', { pose: 'idle' }, { seconds: 1, delay: 5 })),
      verse('GEN 25:23', fadeIn('glory', 0, 0.7), actor('rebekah', { pose: 'pray' }, { seconds: 1, delay: 0.5 }), fadeOut('glory', 7)),
    ],
  },
  {
    id: 'l04-e2-s2',
    title: 'Twins',
    music: 'franck-panis-angelicus',
    beats: [
      verse('GEN 25:25', actor('rebekah', { x: 0.55, pose: 'carry' }, { seconds: 1 }), fadeIn('baby-esau', 1)),
      verse('GEN 25:26', actor('isaac', { pose: 'carry', facing: 1 }, { seconds: 1 }), fadeIn('baby-jacob', 0.5), camera({ zoom: 1.04, y: 0.01 }, slow)),
      say('The name Jacob sounds like the Hebrew word for “heel.” It came to mean one who grabs from behind: a supplanter.', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l04-e2-s3',
    title: 'The hunter and the quiet man',
    music: 'franck-panis-angelicus',
    beats: [
      verse(
        'GEN 25:27',
        // The boys grown: Esau striding out to the hills, Jacob by the fire at the tents.
        fadeOut('baby-esau'),
        fadeOut('baby-jacob'),
        actor('rebekah', { x: 0.62, pose: 'idle' }, { seconds: 1, delay: 1 }),
        actor('isaac', { pose: 'idle' }, { seconds: 1, delay: 1 }),
        fadeIn('fire', 1),
        fadeIn('pot', 1.4),
        fadeIn('jacob', 1.5),
        actor('esau', { x: 0.5 }, { seconds: 0.1, delay: 1 }),
        fadeIn('esau', 1.5),
        walkTo('esau', 1.08, 3, 5, 1),
        actor('jacob', { pose: 'work' }, { seconds: 0.6, delay: 3 }),
      ),
      verse('GEN 25:28', actor('isaac', { facing: 1 }, { seconds: 0.5 }), actor('rebekah', { facing: -1 }, { seconds: 0.5, delay: 1 })),
    ],
  },
  {
    id: 'l04-e2-s4',
    title: 'A bowl of red stew',
    music: 'franck-panis-angelicus',
    beats: [
      verse(
        'GEN 25:30',
        // Evening: Esau comes in from the field, starving; Jacob holds out the bowl, but not yet.
        layer('vineyard-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        fadeOut('isaac'),
        fadeOut('rebekah'),
        actor('esau', { x: 0.62, pose: 'walk', facing: -1 }, { seconds: 4, ease: 'inOutSine' }),
        stop('esau', 4),
        actor('jacob', { pose: 'carry' }, { seconds: 0.6, delay: 1 }),
        fadeIn('bowl', 1),
        fadeIn('the-stew', 1.5, 0.85),
      ),
      verse('GEN 25:31', actor('jacob', { pose: 'idle' }, { seconds: 0.6 })),
      say('The birthright was the eldest son’s inheritance: a double share, the leadership of the family, and in this family, God’s promise to Abraham.', camera({ zoom: 1.03 }, slow)),
      play('what-is-it-worth', { cues: [fadeIn('scales'), camera({ zoom: 1 }, slow)], done: WEIGHED }),
      verse('GEN 25:32', fadeOut('scales'), actor('esau', { pose: 'carry' }, { seconds: 0.6, delay: 1 })),
      verse(
        'GEN 25:34',
        fadeOut('the-stew'),
        // He eats, and goes his way.
        actor('esau', { x: 0.48, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }),
        actor('bowl', { x: 0.465, y: 0.76 }, { seconds: 1, ease: 'inOutSine', delay: 1.5 }),
        stop('esau', 2, 'kneel'),
        fadeOut('bowl', 5),
        actor('esau', { pose: 'walk', facing: 1 }, { seconds: 0.5, delay: 6 }),
        actor('esau', { x: 1.08 }, { seconds: 4, ease: 'inOutSine', delay: 6 }),
      ),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: birthrightSet, scenes }
