import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · Pharaoh's Dreams (Genesis 41), from the approved Level 5 script.
 *
 * Two years later, Pharaoh dreams by the Nile: seven fat cows eaten by seven thin ones,
 * seven full ears swallowed by seven thin ones. None of his wise men can tell him what they
 * mean, and the butler remembers Joseph. Brought out of the dungeon, Joseph says, "It is not
 * in me": the player reads the dreams with him ("Pharaoh's dreams",
 * minigames/pharaohs-dreams). Pharaoh sets him over all Egypt and puts his ring on his hand,
 * and it glows (this episode's golden thread: "Do whatever he tells you"). Seven years of
 * plenty fill the storehouses; then famine, and Pharaoh sends the hungry: "Go to Joseph."
 */

/** The pictures of Pharaoh's dreams, as the play shows them, and what each means. */
export const DREAMS = [
  { id: 'fat-cows', picture: 'Seven fat cows come up out of the Nile.', meaning: 'plenty' },
  { id: 'thin-cows', picture: 'Seven thin cows come up after them, and eat them up.', meaning: 'famine' },
  { id: 'full-ears', picture: 'Seven full, good ears of grain grow on one stalk.', meaning: 'plenty' },
  { id: 'thin-ears', picture: 'Seven thin ears, blighted by the east wind, swallow them up.', meaning: 'famine' },
  { id: 'twice', picture: 'Pharaoh dreamed the same thing twice.', meaning: 'decided' },
] as const
/** Where each picture is shown by the Nile: the cows lower, the ears higher. */
export const DREAM_AT: Record<string, { x: number; y: number }> = {
  'fat-cows': { x: 0.32, y: 0.62 },
  'thin-cows': { x: 0.68, y: 0.62 },
  'full-ears': { x: 0.36, y: 0.42 },
  'thin-ears': { x: 0.64, y: 0.42 },
}
/** Where the pictures float in the throne hall while the dreams are read, clear of the choices. */
export const DREAM_IN_HALL: Record<string, { x: number; y: number }> = {
  'fat-cows': { x: 0.6, y: 0.32 },
  'thin-cows': { x: 0.84, y: 0.32 },
  'full-ears': { x: 0.6, y: 0.56 },
  'thin-ears': { x: 0.84, y: 0.56 },
}

const ABOVE = 'pharaoh-hall'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: 0.042, facing: -1, ...extra })
const herd = (id: string, prop: string, pose: string, at: { x: number; y: number }, seed: number, size: number): SceneActor => ({ id, prop, above: ABOVE, ...at, size, pose, facing: -1, opacity: 0, group: { count: 7, w: 0.2, h: 0.04, seed, bob: 0.002 } })

export const pharaohSet: SceneDescription = {
  id: 'l05-pharaoh',
  title: 'Pharaoh’s dreams',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'egypt-nile', depth: 0.3 },
    { id: 'desert', depth: 0.3, opacity: 0 },
    // The throne hall, over everything outside.
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The dreams: cows from the river, and ears of grain.
    herd('fat-cows', 'cow', 'fat', DREAM_AT['fat-cows']!, 51, 0.05),
    herd('thin-cows', 'cow', 'thin', DREAM_AT['thin-cows']!, 53, 0.05),
    herd('full-ears', 'grain-stalk', 'full', DREAM_AT['full-ears']!, 57, 0.02),
    herd('thin-ears', 'grain-stalk', 'thin', DREAM_AT['thin-ears']!, 59, 0.02),
    // The throne hall: the throne, the wise men.
    { id: 'throne', prop: 'throne', above: ABOVE, x: 0.66, y: 0.79, size: 0.06, opacity: 0 },
    { id: 'wise-men', prop: 'crowd', above: ABOVE, x: 0.86, y: 0.79, size: 0.12, facing: -1, opacity: 0 },
    // The people kneeling as he passes.
    { id: 'people', prop: 'crowd', above: ABOVE, x: 0.18, y: 0.8, size: 0.14, facing: 1, opacity: 0 },
    // The storehouses, Joseph's wife and sons, and the hungry crowds.
    ...[0.12, 0.26, 0.86].map((x, i): SceneActor => ({ id: `granary-${i + 1}`, prop: 'granary', above: ABOVE, x, y: 0.78, size: 0.08, opacity: 0 })),
    person('wife', 'sons-wife', 0.56, 0.785, { size: 0.038, opacity: 0 }),
    person('manasseh', 'boy', 0.62, 0.795, { size: 0.026, opacity: 0 }),
    person('ephraim', 'boy', 0.66, 0.8, { size: 0.022, opacity: 0 }),
    { id: 'hungry', prop: 'crowd', above: ABOVE, x: 0.3, y: 0.8, size: 0.14, facing: 1, opacity: 0 },
    // The people of the court.
    person('pharaoh', 'pharaoh', 0.66, 0.78, { pose: 'kneel' }),
    person('butler', 'butler', 0.42, 0.78, { opacity: 0 }),
    person('prisoner', 'joseph-slave', 0.36, 0.78, { facing: 1, opacity: 0 }),
    person('joseph', 'joseph-egypt', 0.46, 0.78, { facing: 1, opacity: 0 }),
    // Joseph's chariot and its horse, in front of him as he rides.
    { id: 'horse', prop: 'horse', above: ABOVE, x: 1.1, y: 0.75, size: 0.07, facing: -1 },
    { id: 'chariot', prop: 'chariot', above: ABOVE, x: 1.2, y: 0.755, size: 0.07, facing: -1 },
    // Pharaoh's ring on Joseph's hand: the golden thread.
    { id: 'the-ring', prop: 'halo', above: ABOVE, x: 0.47, y: 0.66, size: 0.06, opacity: 0 },
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
const HERDS = ['fat-cows', 'thin-cows', 'full-ears', 'thin-ears']

/** After the dreams are read: every picture fading, Joseph before Pharaoh. */
const READ = HERDS.map((id) => actor(id, { opacity: 0 }, { seconds: 1 }))

const scenes: StoryScene[] = [
  {
    id: 'l05-e3-s1',
    title: 'Two years later',
    music: 'handel-zadok',
    beats: [
      verse('GEN 41:1', fadeOut('pharaoh'), camera({ zoom: 1.03 }, slow)),
      say(
        'Out of the river came seven fat, healthy cows, and after them seven thin, ugly cows, and the thin cows ate up the fat ones. Then he dreamed of seven full, good ears of grain, and seven thin ears that swallowed them up.',
        camera({ zoom: 1 }, slow),
        fadeIn('fat-cows'),
        fadeIn('thin-cows', 2),
        actor('fat-cows', { opacity: 0 }, { seconds: 1.5, delay: 4 }),
        fadeIn('full-ears', 5),
        fadeIn('thin-ears', 7),
        actor('full-ears', { opacity: 0 }, { seconds: 1.5, delay: 9 }),
      ),
      verse(
        'GEN 41:8',
        // Morning in the throne hall: none of the wise men can tell him.
        fadeOut('thin-cows'),
        fadeOut('thin-ears'),
        layer('pharaoh-hall', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('throne', 1),
        fadeIn('pharaoh', 1.2),
        fadeIn('wise-men', 1.5),
        actor('pharaoh', { pose: 'lift' }, { seconds: 1, delay: 4 }),
      ),
      verse('GEN 41:9', actor('pharaoh', { pose: 'kneel' }, { seconds: 1 }), fadeIn('butler'), actor('butler', { x: 0.5, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }), actor('butler', { pose: 'kneel' }, { seconds: 0.6, delay: 2 })),
    ],
  },
  {
    id: 'l05-e3-s2',
    title: 'Before Pharaoh',
    music: 'handel-zadok',
    beats: [
      verse('GEN 41:14', fadeOut('butler'), fadeOut('wise-men'), fadeIn('prisoner', 1), actor('prisoner', { x: 0.46, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 1 }), actor('prisoner', { pose: 'idle' }, { seconds: 0.5, delay: 4 })),
      verse('GEN 41:16', actor('prisoner', { pose: 'pray' }, { seconds: 1 })),
      play('pharaohs-dreams', { cues: [actor('prisoner', { pose: 'idle' }, { seconds: 1 }), ...HERDS.map((id) => actor(id, DREAM_IN_HALL[id]!, { seconds: 0.1 }))], done: READ }),
      verse('GEN 41:25', actor('prisoner', { pose: 'lift' }, { seconds: 1 })),
      verse('GEN 41:29', fadeIn('fat-cows', 0, 0.8), fadeIn('full-ears', 0.5, 0.8)),
      verse('GEN 41:30', fadeOut('fat-cows'), fadeOut('full-ears'), fadeIn('thin-cows', 1, 0.8), fadeIn('thin-ears', 1.5, 0.8), actor('prisoner', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l05-e3-s3',
    title: 'Over all the land of Egypt',
    music: 'handel-zadok',
    beats: [
      say('Joseph told Pharaoh to choose a wise man, and store up grain in the good years against the years of famine.', fadeOut('thin-cows'), fadeOut('thin-ears'), fadeIn('the-ring', 1.5, 0.85)),
      verse('GEN 41:38', actor('pharaoh', { pose: 'lift' }, { seconds: 1 })),
      verse('GEN 41:41', actor('pharaoh', { pose: 'idle', x: 0.56 }, { seconds: 1.5, ease: 'inOutSine' })),
      verse(
        'GEN 41:42',
        // The ring, fine linen and a gold chain: the prisoner becomes the governor.
        actor('pharaoh', { pose: 'carry' }, { seconds: 1 }),
        actor('prisoner', { opacity: 0 }, { seconds: 1.5, delay: 1.5 }),
        actor('joseph', { opacity: 1 }, { seconds: 1.5, delay: 1.5 }),
      ),
      verse(
        'GEN 41:43',
        // Out through the city in the second chariot, the people kneeling as he passes.
        fadeOut('the-ring'),
        fadeOut('throne'),
        actor('pharaoh', { opacity: 0, pose: 'idle' }, { seconds: 1 }),
        layer('pharaoh-hall', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        ...swap('night-sky', 'forest-sky'),
        actor('joseph', { opacity: 0 }, { seconds: 1 }),
        fadeIn('people', 1),
        actor('people', { pose: 'idle' }, { seconds: 0.1 }),
        actor('horse', { x: 0.42, pose: 'walk' }, { seconds: 6, ease: 'outCubic', delay: 1.5 }),
        actor('chariot', { x: 0.52, pose: 'walk' }, { seconds: 6, ease: 'outCubic', delay: 1.5 }),
        // Joseph rides in it.
        actor('joseph', { x: 1.21, y: 0.725, facing: -1 }, { seconds: 0.1, delay: 1 }),
        actor('joseph', { opacity: 1 }, { seconds: 0.5, delay: 1.2 }),
        actor('joseph', { x: 0.53 }, { seconds: 6, ease: 'outCubic', delay: 1.5 }),
        actor('horse', { pose: 'idle' }, { seconds: 0.5, delay: 7.5 }),
        actor('chariot', { pose: 'idle' }, { seconds: 0.5, delay: 7.5 }),
      ),
      say('Joseph was thirty years old. Thirteen years had passed since his brothers sold him.', camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l05-e3-s4',
    title: '“Go to Joseph”',
    music: 'handel-zadok',
    beats: [
      verse(
        'GEN 41:49',
        camera({ zoom: 1 }, slow),
        // Seven golden harvests, poured into the storehouses.
        ...['horse', 'chariot', 'people'].map((id) => fadeOut(id)),
        ...[1, 2, 3].map((i) => fadeIn(`granary-${i}`, 1 + i * 0.4)),
        actor('joseph', { x: 0.46, y: 0.78 }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 1.5),
        fadeIn('full-ears', 2, 0.8),
      ),
      verse('GEN 41:52', fadeOut('full-ears'), ...['wife', 'manasseh', 'ephraim'].map((id, i) => fadeIn(id, 0.5 + i * 0.3))),
      verse(
        'GEN 41:54',
        // The fields dry and crack: the famine.
        ...['wife', 'manasseh', 'ephraim'].map((id) => fadeOut(id)),
        ...swap('egypt-nile', 'desert'),
        fadeIn('thin-ears', 2, 0.7),
      ),
      verse('GEN 41:55', fadeOut('thin-ears'), fadeIn('hungry', 0.5), actor('hungry', { x: 0.24 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }), actor('joseph', { pose: 'lift' }, { seconds: 1, delay: 2 })),
      verse('GEN 41:57', actor('joseph', { pose: 'carry' }, { seconds: 1 }), camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: pharaohSet, scenes }
