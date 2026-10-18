import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · A World Gone Wrong, a Man Who Walked with God (Genesis 6:1–13), from the
 * approved Level 2 script.
 *
 * A great city at dusk under a smoky sky, crowded and loud; nothing violent is shown up
 * close, only felt. At its edge, on the right, Noah's home, where his family waits by
 * lamplight: the lamp in the window is this episode's golden thread (Luke 1:30). Noah
 * walks home through the crowds ("walk with God", minigames/walk-with-god), and then, on
 * a hill at night, God speaks to him.
 */

/** Where Noah walks home along the street: from the city to his gate. */
export const WALK = { start: 0.08, home: 0.76, y: 0.835 }

/** The crowds coming along the street the other way, and when each sets off. */
export const CROWDS = [
  { id: 'crowd-1', x: 0.36, starts: 1.2 },
  { id: 'crowd-2', x: 0.57, starts: 3.6 },
  { id: 'crowd-3', x: 0.74, starts: 5.6 },
]

const person = (id: string, prop: string, x: number, size = 0.045, opacity = 0): SceneActor => ({
  id,
  prop,
  above: 'city-street',
  x,
  y: 0.775,
  size,
  facing: -1,
  opacity,
})

export const worldGoneWrongSet: SceneDescription = {
  id: 'l02-world-gone-wrong',
  title: 'A world gone wrong',
  layers: [
    { id: 'violent-sky', depth: 0 },
    { id: 'city-far', depth: 0.15 },
    { id: 'city-street', depth: 0.45 },
    // Night, on a hill above the sleeping land.
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'night-hill', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Far off down the street, more of the crowd, drifting.
    { id: 'crowd-a', prop: 'crowd', above: 'city-street', x: 0.16, y: 0.765, size: 0.1, pose: 'walk' },
    { id: 'crowd-b', prop: 'crowd', above: 'city-street', x: 0.64, y: 0.765, size: 0.1 },
    ...CROWDS.map((c): SceneActor => ({ id: c.id, prop: 'crowd', above: 'city-street', x: c.x, y: 0.8, size: 0.14 })),
    // Noah's family at home by lamplight, and the lamp in the window (the golden thread).
    { id: 'noah-lamp', prop: 'halo', above: 'city-street', x: 0.924, y: 0.606, size: 0.07, opacity: 0 },
    person('wife', 'noahs-wife', 0.82, 0.042),
    person('shem', 'shem', 0.86),
    person('shem-wife', 'sons-wife', 0.885, 0.04),
    person('ham', 'ham', 0.91),
    person('ham-wife', 'sons-wife', 0.935, 0.04),
    person('japheth', 'japheth', 0.96),
    person('japheth-wife', 'sons-wife', 0.985, 0.04),
    // The light on the path ahead of Noah, as he walks home.
    { id: 'path-light', prop: 'halo', above: 'city-street', x: WALK.start + 0.07, y: WALK.y - 0.01, size: 0.16, opacity: 0 },
    { id: 'noah', prop: 'noah', above: 'city-street', x: 0.7, y: 0.79, size: 0.046, facing: -1, pose: 'pray', opacity: 0 },
    // On the hill at night: Noah, and God shown as light.
    { id: 'noah-night', prop: 'noah', above: 'night-hill', x: 0.5, y: 0.69, size: 0.034, facing: -1, pose: 'pray', opacity: 0 },
    { id: 'glory', prop: 'glory', above: 'night-hill', x: 0.5, y: 0.34, size: 0.32, opacity: 0 },
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
const FAMILY = ['wife', 'shem', 'shem-wife', 'ham', 'ham-wife', 'japheth', 'japheth-wife']

/** After "walk with God": Noah home at his gate, the light gone in, the crowds gone by. */
const WALKED_HOME = [
  actor('noah', { x: WALK.home, pose: 'idle' }, { seconds: 1, ease: 'inOutSine' }),
  actor('path-light', { x: WALK.home + 0.02, opacity: 0 }, { seconds: 1.5 }),
  ...CROWDS.map((c) => actor(c.id, { x: -0.3, pose: 'idle', opacity: 0 }, { seconds: 1.5 })),
]

const scenes: StoryScene[] = [
  {
    id: 'l02-e1-s1',
    title: 'The earth filled with violence',
    music: 'bach-aus-tiefer-not',
    beats: [
      say(
        'The children of Adam spread across the earth, and their cities grew.',
        camera({ zoom: 1.06, x: -0.03 }, { seconds: 10, ease: 'inOutSine' }),
        actor('crowd-a', { x: 0.08 }, { seconds: 14, ease: 'linear' }),
      ),
      say('But they forgot the God who made them, and they turned on one another.', actor('crowd-b', { pose: 'walk' }, { seconds: 0.4 }), actor('crowd-b', { x: 0.54 }, { seconds: 14, ease: 'linear' })),
      verse('GEN 6:5'),
      verse('GEN 6:6', camera({ zoom: 1, x: 0 }, { seconds: 8, ease: 'inOutSine' })),
      say('This is the first time the Bible tells us that God grieved. Sin is not only breaking a rule. It wounds the heart of the One who loves us.'),
    ],
  },
  {
    id: 'l02-e1-s2',
    title: 'But Noah',
    music: 'bach-aus-tiefer-not',
    beats: [
      say('And yet, in that whole dark world, one man was different.', camera({ zoom: 1.12, x: 0.07, y: 0.02 }, slow), fadeIn('noah', 2)),
      verse('GEN 6:8'),
      verse('GEN 6:9'),
      say('“Walked with God”: the same words Genesis used for Enoch. Noah was the great-grandson of Enoch, and he walked the same path.'),
    ],
  },
  {
    id: 'l02-e1-s3',
    title: 'Noah’s family',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'GEN 6:10',
        camera({ zoom: 1.14, x: 0.1, y: 0.02 }, slow),
        fadeOut('noah'),
        ...FAMILY.map((id, i) => fadeIn(id, 1 + i * 0.3)),
        actor('noah-lamp', { opacity: 1 }, { seconds: 3, delay: 1 }),
      ),
      say('Noah was not perfect, but he listened to God, and he taught his family to listen too.'),
      verse('GEN 6:11', camera({ zoom: 1, x: 0, y: 0 }, slow)),
      play('walk-with-god', {
        cues: [
          // That evening, Noah walks home through the city: from the far end of the street.
          actor('noah', { x: WALK.start, y: WALK.y, pose: 'idle' }, { seconds: 0.01 }),
          actor('noah', { opacity: 1 }, { seconds: 1.5, delay: 0.2 }),
          actor('path-light', { x: WALK.start + 0.07, opacity: 0.9 }, { seconds: 1.5, delay: 0.5 }),
          fadeOut('crowd-a'),
          fadeOut('crowd-b'),
        ],
        done: WALKED_HOME,
      }),
    ],
  },
  {
    id: 'l02-e1-s4',
    title: 'God speaks to Noah',
    music: 'bach-aus-tiefer-not',
    beats: [
      say(
        'Then God spoke to Noah.',
        layer('night-sky', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        layer('night-hill', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        fadeOut('noah-lamp'),
        fadeIn('noah-night', 3),
        actor('glory', { opacity: 0.85 }, { seconds: 5, delay: 4 }),
      ),
      verse('GEN 6:13'),
      say('God would not leave his creation ruined forever. He would wash the earth clean and begin again, and Noah would be part of that new beginning.'),
      verse('GEN 6:14', camera({ zoom: 1.06, y: -0.02 }, { seconds: 8, ease: 'inOutSine' })),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: worldGoneWrongSet, scenes }
