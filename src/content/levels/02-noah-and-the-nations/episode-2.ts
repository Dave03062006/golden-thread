import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · Building the Ark (Genesis 6:14–7:5), from the approved Level 2 script.
 *
 * A wide clearing among tall trees, far from any sea. The ark is built in the order of
 * God's plan ("building the ark", minigames/build-the-ark), part by part, then sealed
 * with pitch; the door in its side glows (this episode's golden thread: the Church, the
 * ark of salvation). Passersby laugh at the boat in a dry land, and Noah keeps building.
 * At the end, food is carried up the ramp in baskets.
 */

/** Where the ark stands, and how big it is (the ark's drawing is a 640 × 300 box). */
export const ARK = { x: 0.5, y: 0.79 }
const ARK_SIZE = 0.56

/** The parts of the ark, in the order of the plan, with the plan's words and a hint for each. */
export const ARK_PARTS = [
  { id: 'keel', actor: 'part-keel', words: 'Three hundred cubits long.', hint: 'The keel runs along the bottom.' },
  { id: 'ribs', actor: 'part-ribs', words: 'Fifty cubits wide.', hint: 'The ribs rise from the keel.' },
  { id: 'decks', actor: 'part-decks', words: 'Lower, second and third decks.', hint: 'The decks go inside the ribs.' },
  { id: 'hull', actor: 'part-hull', words: 'Rooms in the ark, thirty cubits high.', hint: 'The planks close in the sides.' },
  { id: 'roof', actor: 'part-roof', words: 'A roof, finished to a cubit above.', hint: 'The roof goes on top.' },
  { id: 'door', actor: 'part-door', words: 'The door in its side.', hint: 'The door goes in the side.' },
]

const person = (id: string, prop: string, x: number, size = 0.045, opacity = 1, pose = 'idle'): SceneActor => ({
  id,
  prop,
  above: 'clearing',
  x,
  y: 0.83,
  size,
  facing: x < 0.5 ? 1 : -1,
  pose,
  opacity,
})

const part = (id: string, prop: string): SceneActor => ({ id, prop, above: 'clearing', x: ARK.x, y: ARK.y, size: ARK_SIZE, opacity: 0 })

export const buildingTheArkSet: SceneDescription = {
  id: 'l02-building-the-ark',
  title: 'Building the ark',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'forest-far', depth: 0.15 },
    { id: 'clearing', depth: 0.45 },
  ],
  actors: [
    // The ark, part by part (the pitch goes over the hull and roof, the door over it).
    part('part-keel', 'ark-keel'),
    part('part-ribs', 'ark-ribs'),
    part('part-decks', 'ark-decks'),
    part('part-hull', 'ark-hull'),
    part('part-roof', 'ark-roof'),
    part('part-pitch', 'ark-pitch'),
    part('part-door', 'ark-door'),
    { ...part('ark-plan', 'ark-plan'), pose: 'idle' },
    // The ramp, rising leftward from the ground to the door.
    { id: 'ark-ramp', prop: 'ark-ramp', above: 'clearing', x: 0.69, y: 0.84, size: 0.13, facing: -1, opacity: 0 },
    // The door in its side, glowing: the golden thread.
    { id: 'ark-door', prop: 'halo', above: 'clearing', x: 0.6085, y: 0.672, size: 0.07, opacity: 0 },
    // God shown as light.
    { id: 'glory', prop: 'glory', above: 'clearing', x: 0.5, y: 0.26, size: 0.3, opacity: 0 },
    // Passersby who laugh at the boat in a dry land.
    { id: 'mockers', prop: 'crowd', above: 'clearing', x: 0.1, y: 0.8, size: 0.12, opacity: 0 },
    person('noah', 'noah', 0.3),
    person('shem', 'shem', 0.2),
    person('ham', 'ham', 0.84),
    person('japheth', 'japheth', 0.92),
    // Noah's wife and his sons' wives, who bring the food in the last scene.
    person('wife', 'noahs-wife', 0.78, 0.042, 0, 'carry'),
    person('shem-wife', 'sons-wife', 0.86, 0.04, 0, 'carry'),
    person('ham-wife', 'sons-wife', 0.94, 0.04, 0, 'carry'),
    ...[0, 1, 2].map((i): SceneActor => ({ id: `basket-${i + 1}`, prop: 'basket', above: 'clearing', x: 0.765 + i * 0.08, y: 0.735, size: 0.022, opacity: 0 })),
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
const fadeIn = (id: string, delay = 0) => actor(id, { opacity: 1 }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2.5, delay })

/** After "building the ark": every part in its place, the plan put away, the pitch on. */
const BUILT = [
  ...ARK_PARTS.map((p) => actor(p.actor, { x: ARK.x, y: ARK.y, opacity: 1 }, { seconds: 1, ease: 'inOutSine' })),
  actor('ark-plan', { opacity: 0, pose: 'idle' }, { seconds: 1.5 }),
  actor('part-pitch', { opacity: 1 }, { seconds: 1 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l02-e2-s1',
    title: 'The plan',
    music: 'navy-hymn',
    beats: [
      say('God told Noah exactly how to build the ark.', camera({ zoom: 1.05, y: 0.01 }, slow)),
      verse('GEN 6:15'),
      say('A cubit was about the length of a man’s forearm, close to half a meter. The ark would be longer than a football field and as tall as a four-story house.'),
      say(
        'It would have rooms, three decks, a roof, and a door in its side. Inside and out, it would be sealed with pitch to keep out the water.',
        actor('ark-plan', { opacity: 0.6 }, { seconds: 3 }),
        camera({ zoom: 1, y: 0 }, slow),
      ),
      play('build-the-ark', {
        cues: [actor('ark-plan', { opacity: 0.9, pose: 'keel' }, { seconds: 1 }), actor('noah', { pose: 'work' }, { seconds: 0.5 }), actor('ham', { pose: 'work' }, { seconds: 0.5, delay: 0.3 })],
        done: BUILT,
      }),
    ],
  },
  {
    id: 'l02-e2-s2',
    title: 'A covenant promised',
    music: 'navy-hymn',
    beats: [
      say(
        'Then God told Noah why.',
        actor('glory', { opacity: 0.6 }, { seconds: 4 }),
        actor('noah', { pose: 'pray' }, { seconds: 1.5 }),
        actor('ham', { pose: 'idle' }, { seconds: 1 }),
        actor('ark-door', { opacity: 0.8 }, { seconds: 3, delay: 2 }),
      ),
      verse('GEN 6:17'),
      verse('GEN 6:18'),
      say(
        'A covenant is more than a promise. It is a bond of family: God binding himself to his people, and his people to him. This is the first time the word appears in the Bible, and it will run through all the rest of it.',
      ),
    ],
  },
  {
    id: 'l02-e2-s3',
    title: 'Noah did all that God commanded',
    music: 'navy-hymn',
    beats: [
      say(
        'There was no sea nearby and no rain in the sky. People must have laughed at the old man and his boat.',
        actor('glory', { opacity: 0 }, { seconds: 3 }),
        fadeIn('mockers', 1),
        actor('mockers', { x: 0.16 }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
      ),
      say('But Noah kept building.', actor('noah', { pose: 'work' }, { seconds: 1 }), actor('shem', { pose: 'work' }, { seconds: 1, delay: 0.4 }), actor('japheth', { pose: 'work' }, { seconds: 1, delay: 0.8 })),
      verse('GEN 6:22'),
      say('The Letter to the Hebrews says:', fadeOut('mockers')),
      verse('HEB 11:7'),
      say('Faith is trusting God about what we cannot see yet, and acting on it.'),
    ],
  },
  {
    id: 'l02-e2-s4',
    title: 'Two of every sort',
    music: 'navy-hymn',
    beats: [
      say(
        'God told Noah to store food of every kind, for his family and for the animals.',
        ...['noah', 'shem', 'japheth'].map((id) => actor(id, { pose: 'idle' }, { seconds: 1 })),
        fadeIn('ark-ramp'),
        ...['wife', 'shem-wife', 'ham-wife', 'basket-1', 'basket-2', 'basket-3'].map((id, i) => fadeIn(id, 1 + i * 0.2)),
      ),
      verse(
        'GEN 6:19',
        // The food is carried up the ramp and in at the door.
        ...['wife', 'shem-wife', 'ham-wife'].map((id, i) => actor(id, { x: 0.635, y: 0.735, pose: 'walk' }, { seconds: 6, ease: 'inOutSine', delay: 1 + i * 2 })),
        ...['basket-1', 'basket-2', 'basket-3'].map((id, i) => actor(id, { x: 0.62, y: 0.645 }, { seconds: 6, ease: 'inOutSine', delay: 1 + i * 2 })),
        ...['wife', 'shem-wife', 'ham-wife', 'basket-1', 'basket-2', 'basket-3'].map((id, i) => fadeOut(id, 6 + (i % 3) * 2)),
      ),
      say('Of the clean animals, the ones that could be offered to God, Noah was to take seven pairs.'),
      verse('GEN 7:5'),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: buildingTheArkSet, scenes }
