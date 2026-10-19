import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · The Call (Genesis 12:1–9), from the approved Level 3 script.
 *
 * Haran at dawn, picking up where Level 2 ended: Abram outside his tent hears God's call
 * and promise. The caravan sets out, and on the map the player leads it from Haran to
 * Canaan ("the journey", minigames/the-journey). At Shechem, under a great oak, Abram
 * builds his first altar and leaves his staff leaning against it (this episode's golden
 * thread: the call to follow); then a second altar on the mountain east of Bethel.
 */

/** The journey on the tapestry map (Level 2's map of the nations), from Haran to Shechem, and what each stop brings. */
export const JOURNEY = {
  start: { x: 0.64, y: 0.3 },
  stops: [
    { at: { x: 0.61, y: 0.33 }, title: 'The Euphrates', text: 'They crossed the great river, leaving the land of their fathers behind.' },
    { at: { x: 0.56, y: 0.42 }, title: 'An oasis', text: 'Water for the flocks, and rest in the shade of palms.' },
    { at: { x: 0.5, y: 0.46 }, title: 'Damascus', text: 'A long way from home, and still the land was not in sight.' },
    { at: { x: 0.47, y: 0.52 }, title: 'Canaan', text: 'The hills of the land God would show him.' },
  ],
}

const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  // In front of both hill layers (the same depth), so the family stays in front at Shechem too.
  above: 'canaan-hills',
  x,
  y,
  size: prop === 'sarai' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

/** Where the family stands at Shechem, by the altar under the oak. */
const SHECHEM = { altar: { x: 0.46, y: 0.79 }, staff: { x: 0.425, y: 0.78 } }

export const theCallSet: SceneDescription = {
  id: 'l03-the-call',
  title: 'The call',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'haran-hills', depth: 0.3 },
    { id: 'canaan-hills', depth: 0.3, opacity: 0 },
    // The map of the journey, over everything while it shows.
    { id: 'nations-tapestry', depth: 0, opacity: 0 },
  ],
  actors: [
    { id: 'abram-tent', prop: 'striped-tent', above: 'haran-hills', x: 0.64, y: 0.73, size: 0.1, pose: 'open' },
    person('abram', 'abram', 0.5, 0.74, { facing: 1 }),
    person('sarai', 'sarai', 0.58, 0.75, { opacity: 0 }),
    person('lot', 'lot', 0.7, 0.76, { opacity: 0 }),
    // The caravan, ready on the road below.
    { id: 'camel-1', prop: 'camel', above: 'canaan-hills', x: 0.78, y: 0.86, size: 0.14, facing: -1, pose: 'idle', opacity: 0 },
    { id: 'camel-2', prop: 'camel', above: 'canaan-hills', x: 0.9, y: 0.87, size: 0.13, facing: -1, pose: 'idle', opacity: 0 },
    { id: 'herd', prop: 'sheep', above: 'canaan-hills', x: 1.02, y: 0.89, size: 0.04, facing: -1, pose: 'idle', opacity: 0, group: { count: 5, w: 0.12, h: 0.03, seed: 31 } },
    { id: 'servants', prop: 'crowd', above: 'canaan-hills', x: 0.66, y: 0.88, size: 0.1, facing: -1, opacity: 0 },
    // God shown as light, and the promise shining in the sky, word by word.
    { id: 'glory', prop: 'glory', above: 'haran-hills', x: 0.5, y: 0.3, size: 0.3, opacity: 0 },
    ...[0.3, 0.5, 0.7].map((x, i): SceneActor => ({ id: `promise-${i + 1}`, prop: 'halo', above: 'haran-hills', x, y: 0.2 + (i % 2) * 0.06, size: 0.07, opacity: 0 })),
    // At Shechem: the great oak, the altar, and the staff left leaning on it: the golden thread.
    { id: 'oak', prop: 'great-oak', above: 'canaan-hills', x: 0.27, y: 0.84, size: 0.3, opacity: 0 },
    { id: 'altar', prop: 'noah-altar', above: 'canaan-hills', ...SHECHEM.altar, size: 0.07, pose: 'idle', opacity: 0 },
    { id: 'staff', prop: 'walking-staff', above: 'canaan-hills', ...SHECHEM.staff, size: 0.014, opacity: 0 },
    { id: 'abram-staff', prop: 'halo', above: 'canaan-hills', x: SHECHEM.staff.x + 0.004, y: 0.695, size: 0.05, opacity: 0 },
    // The second altar, far off on the mountain east of Bethel.
    { id: 'bethel-altar', prop: 'noah-altar', above: 'canaan-hills', x: 0.78, y: 0.62, size: 0.035, pose: 'lit', opacity: 0 },
    // On the map: the caravan, and the next stop glowing.
    { id: 'caravan', prop: 'family-band', above: 'nations-tapestry', ...JOURNEY.start, size: 0.06, pose: 'shem', opacity: 0 },
    { id: 'goal', prop: 'halo', above: 'nations-tapestry', ...JOURNEY.stops[0]!.at, size: 0.07, opacity: 0 },
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

/** After the journey: the caravan in Canaan, the map put away. */
const last = JOURNEY.stops.at(-1)!.at
const JOURNEY_DONE = [actor('caravan', { ...last, facing: -1 }, { seconds: 1 }), actor('goal', { ...last, opacity: 0 }, { seconds: 1 })]

/** The family and the caravan, setting out together along the road to the left. */
const CARAVAN = ['abram', 'sarai', 'lot', 'servants', 'camel-1', 'camel-2', 'herd']

const scenes: StoryScene[] = [
  {
    id: 'l03-e1-s1',
    title: 'Go from your country',
    music: 'god-of-abraham-praise',
    beats: [
      say(
        'Abram was seventy-five years old, and he had lived all his life among people who worshiped the moon.',
        // Dawn over Haran.
        layer('night-sky', { opacity: 0 }, { seconds: 6, ease: 'inOutSine' }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 6, ease: 'inOutSine' }),
      ),
      verse('GEN 12:1', fadeIn('glory', 0, 0.75), actor('abram', { pose: 'pray' }, { seconds: 1, delay: 1 })),
      say('God did not tell him where. Only: go, and I will show you.'),
    ],
  },
  {
    id: 'l03-e1-s2',
    title: 'The promise',
    music: 'god-of-abraham-praise',
    beats: [
      say('With the command came a promise, the greatest anyone had ever heard.', camera({ zoom: 1.04, y: -0.02 }, slow)),
      verse('GEN 12:2', fadeIn('promise-1'), fadeIn('promise-2', 1.2)),
      verse('GEN 12:3', fadeIn('promise-3')),
      say(
        'At Babel, people tried to make a name for themselves. Here God promises to make Abram’s name great, and through him, to bless every family on earth.',
        camera({ zoom: 1, y: 0 }, slow),
        ...['promise-1', 'promise-2', 'promise-3'].map((id, i) => fadeOut(id, 2 + i * 0.4)),
        fadeOut('glory', 2),
      ),
    ],
  },
  {
    id: 'l03-e1-s3',
    title: 'So Abram went',
    music: 'god-of-abraham-praise',
    beats: [
      verse(
        'GEN 12:4',
        // The caravan gathers and sets out along the road, to the southwest.
        actor('abram', { pose: 'idle' }, { seconds: 1 }),
        ...['sarai', 'lot', 'servants', 'camel-1', 'camel-2', 'herd'].map((id, i) => fadeIn(id, i * 0.3)),
        ...CARAVAN.map((id, i) => actor(id, { x: 0.02 + i * 0.07, y: 0.86 + (i % 2) * 0.01, pose: 'walk', facing: -1 }, { seconds: 9, ease: 'inOutSine', delay: 2 + i * 0.2 })),
        fadeOut('abram-tent', 6),
      ),
      play('the-journey', {
        cues: [layer('nations-tapestry', { opacity: 1 }, { seconds: 2, ease: 'inOutSine' }), fadeIn('caravan', 1), ...CARAVAN.map((id) => actor(id, { opacity: 0, pose: 'idle' }, { seconds: 1, delay: 1 }))],
        done: JOURNEY_DONE,
      }),
    ],
  },
  {
    id: 'l03-e1-s4',
    title: 'An altar at Shechem',
    music: 'god-of-abraham-praise',
    beats: [
      verse(
        'GEN 12:7',
        // In Canaan, under the oak at Shechem: the first altar.
        layer('nations-tapestry', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        fadeOut('caravan'),
        layer('haran-hills', { opacity: 0 }, { seconds: 2 }),
        layer('dawn-sky', { opacity: 0 }, { seconds: 3 }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3 }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3 }),
        fadeIn('oak', 1),
        fadeIn('altar', 2),
        ...[
          ['abram', 0.52, 0.84],
          ['sarai', 0.58, 0.85],
          ['lot', 0.66, 0.855],
        ].flatMap(([id, x, y]) => [actor(id as string, { x: x as number, y: y as number, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }), fadeIn(id as string, 2)]),
        actor('abram', { pose: 'work' }, { seconds: 0.8, delay: 2 }),
        fadeIn('staff', 0.5),
        fadeIn('abram-staff', 0.5, 0.8),
        actor('altar', { pose: 'lit' }, { seconds: 0.8, delay: 4 }),
        actor('abram', { pose: 'pray' }, { seconds: 0.8, delay: 4.5 }),
      ),
      say('Wherever Abram went in the land, he built an altar. It was his way of saying: this land, and my life, belong to God.'),
      verse('GEN 12:8', fadeIn('bethel-altar', 1), camera({ zoom: 1.03, x: 0.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: theCallSet, scenes }
