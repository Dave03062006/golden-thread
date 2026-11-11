import { actor, camera, layer, play, say, verse, withEvents } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · In the Beginning (Genesis 1:1–2:3), from the approved Level 1 script.
 *
 * The whole episode happens in one world that grows day by day: darkness over the
 * waters, then light, the sky, the land, the lights, the creatures and, last of all,
 * the man and the woman. Each day is a scene, and every scene is a checkpoint.
 *
 * The play "Let there be…" is woven through the days (see minigames/let-there-be).
 * Each interaction's `done` cues leave the world exactly where the player's gesture
 * leaves it, so a checkpoint can rebuild any day without replaying the ones before.
 */

/** Where the first light comes to rest after day one: a point in the top-left corner. */
const FIRST_LIGHT_HOME = { x: 0.075, y: 0.1 }

/** On day four the sun and moon first rise from behind the hills... */
const SUN_RISEN = { x: 0.44, y: 0.43 }
const MOON_RISEN = { x: 0.72, y: 0.42 }
/** ...and are then set in their places: the sun on the day side, the moon on the night side. */
const SUN_HOME = { x: 0.2, y: 0.22 }
const MOON_HOME = { x: 0.8, y: 0.2 }

/** Where the animals finally stand, facing the middle. */
const ANIMAL_PLACES = {
  lion: { x: 0.25, facing: 1 },
  deer: { x: 0.37, facing: 1 },
  sheep: { x: 0.56, facing: -1 },
  elephant: { x: 0.8, facing: -1 },
} as const

const PLANTS = ['tree-1', 'tree-2', 'tree-3', 'plant-1', 'plant-2', 'plant-3'] as const

/** A flock or shoal crossing the view slowly, from one side to the other and round again. */
const crossing = (seconds: number, direction: 1 | -1, bob: number) => ({
  loopSeconds: seconds,
  x: [
    { at: 0, value: -0.62 * direction },
    { at: seconds, value: 0.62 * direction, ease: 'linear' as const },
  ],
  y: [
    { at: 0, value: 0 },
    { at: seconds * 0.25, value: -bob },
    { at: seconds * 0.5, value: 0 },
    { at: seconds * 0.75, value: bob },
    { at: seconds, value: 0 },
  ],
})

export const creationSet: SceneDescription = {
  id: 'l01-creation',
  title: 'In the beginning',
  layers: [
    { id: 'void', depth: 0 },
    { id: 'sky-light', depth: 0, opacity: 0 },
    { id: 'sky-blue', depth: 0, opacity: 0 },
    { id: 'stars-a', depth: 0.02, opacity: 0, pulse: { min: 0.45, seconds: 4.3 } },
    { id: 'stars-b', depth: 0.02, opacity: 0, pulse: { min: 0.35, seconds: 5.9, phase: 0.5 } },
    { id: 'firmament', depth: 0.05, opacity: 0, offsetY: 0.76 },
    { id: 'sea-far', depth: 0.3, sway: { x: 0.006, seconds: 11 } },
    { id: 'land', depth: 0.36, offsetY: 0.34 },
    { id: 'grass', depth: 0.36, offsetY: 0.34, opacity: 0 },
    { id: 'sea-mid', depth: 0.55, sway: { x: 0.01, seconds: 8 } },
    { id: 'sea-near', depth: 0.8, sway: { x: 0.014, seconds: 6.5 } },
    { id: 'light-rays', depth: 0.1, opacity: 0, sway: { x: 0.012, seconds: 17 }, pulse: { min: 0.65, seconds: 9 } },
    { id: 'night-veil', depth: 0.36, opacity: 0 },
    { id: 'darkness', depth: 0, opacity: 0.94 },
  ],
  actors: [
    // The sun and moon wait below the horizon, behind the sea.
    { id: 'sun', prop: 'sun', above: 'firmament', x: 0.44, y: 0.74, size: 0.09, opacity: 0 },
    { id: 'moon', prop: 'moon', above: 'firmament', x: 0.72, y: 0.74, size: 0.06, opacity: 0 },

    // Trees and plants, which grow on day three.
    { id: 'tree-1', prop: 'fruit-tree', above: 'grass', x: 0.15, y: 0.585, size: 0.1, grow: 0 },
    { id: 'tree-2', prop: 'fruit-tree', above: 'grass', x: 0.585, y: 0.545, size: 0.085, grow: 0 },
    { id: 'tree-3', prop: 'fruit-tree', above: 'grass', x: 0.9, y: 0.585, size: 0.1, grow: 0 },
    { id: 'plant-1', prop: 'seed-plant', above: 'grass', x: 0.31, y: 0.6, size: 0.05, grow: 0 },
    { id: 'plant-2', prop: 'seed-plant', above: 'grass', x: 0.44, y: 0.585, size: 0.042, grow: 0 },
    { id: 'plant-3', prop: 'seed-plant', above: 'grass', x: 0.665, y: 0.6, size: 0.05, grow: 0 },

    // Birds, which fill the sky on day five.
    {
      id: 'birds-a',
      prop: 'bird',
      above: 'grass',
      x: 0.5,
      y: 0.3,
      size: 0.022,
      opacity: 0,
      group: { count: 8, w: 0.16, h: 0.08, seed: 5, bob: 0.008 },
      path: crossing(46, 1, 0.03),
    },
    {
      id: 'birds-b',
      prop: 'bird',
      above: 'grass',
      x: 0.5,
      y: 0.2,
      size: 0.018,
      opacity: 0,
      group: { count: 6, w: 0.12, h: 0.06, seed: 9, bob: 0.007 },
      path: crossing(58, -1, 0.025),
    },

    // The animals of day six, waiting out of sight.
    { id: 'lion', prop: 'lion', above: 'grass', x: -0.12, y: 0.635, size: 0.1, facing: 1 },
    { id: 'deer', prop: 'deer', above: 'grass', x: -0.08, y: 0.61, size: 0.075, facing: 1 },
    { id: 'sheep', prop: 'sheep', above: 'grass', x: 1.08, y: 0.63, size: 0.06, facing: -1 },
    { id: 'elephant', prop: 'elephant', above: 'grass', x: 1.15, y: 0.615, size: 0.15, facing: -1 },

    // The man and the woman, in a soft light of their own, turned toward the first light.
    { id: 'halo', prop: 'halo', above: 'grass', x: 0.5, y: 0.56, size: 0.2, opacity: 0 },
    { id: 'man', prop: 'man', above: 'grass', x: 0.475, y: 0.635, size: 0.034, opacity: 0, facing: -1 },
    { id: 'woman', prop: 'woman', above: 'grass', x: 0.525, y: 0.635, size: 0.032, opacity: 0, facing: -1 },

    // The great sea creature, surfacing in the open sea.
    {
      id: 'whale',
      prop: 'whale',
      above: 'sea-mid',
      x: 0.72,
      y: 0.765,
      size: 0.13,
      opacity: 0,
      facing: -1,
      path: { loopSeconds: 14, x: [{ at: 0, value: 0 }], y: [{ at: 0, value: 0.008 }, { at: 7, value: -0.006 }, { at: 14, value: 0.008 }] },
    },

    // Fish, which swarm in the sea on day five.
    {
      id: 'fish-a',
      prop: 'fish',
      above: 'sea-mid',
      x: 0.5,
      y: 0.735,
      size: 0.024,
      opacity: 0,
      group: { count: 9, w: 0.18, h: 0.05, seed: 11, bob: 0.004 },
      path: crossing(52, -1, 0.01),
    },
    {
      id: 'fish-b',
      prop: 'fish',
      above: 'sea-mid',
      x: 0.5,
      y: 0.775,
      size: 0.02,
      opacity: 0,
      group: { count: 7, w: 0.14, h: 0.04, seed: 23, bob: 0.004 },
      path: crossing(40, 1, 0.008),
    },

    // God's Spirit, a breath of light hovering over the waters like wings.
    {
      id: 'spirit',
      prop: 'spirit',
      above: 'darkness',
      x: 0.5,
      y: 0.52,
      size: 0.2,
      opacity: 0,
      path: {
        loopSeconds: 26,
        x: [
          { at: 0, value: -0.14 },
          { at: 13, value: 0.14, ease: 'inOutSine' },
          { at: 26, value: -0.14, ease: 'inOutSine' },
        ],
        y: [
          { at: 0, value: 0 },
          { at: 6.5, value: -0.025 },
          { at: 13, value: 0 },
          { at: 19.5, value: -0.02 },
          { at: 26, value: 0 },
        ],
      },
    },

    // Day one: light floods out from where the player holds, until it fills everything.
    { id: 'light-flood', prop: 'light-flood', above: 'darkness', x: 0.5, y: 0.42, size: 2.6, opacity: 0, grow: 0 },
    // The first light: the point the light broke from. It comes to rest in the corner and
    // shines on there, and it is where the golden thread of this episode is found.
    { id: 'first-light', prop: 'first-light', above: 'darkness', x: 0.5, y: 0.42, size: 0.075, opacity: 0 },
  ],
  // The camera's own slow breathing.
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.008 },
      { at: 15, value: 0.008, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 15, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 15, value: 1.012, ease: 'smoother' },
    ],
  },
}

const quiet = { seconds: 4, ease: 'inOutSine' } as const

const scenes: StoryScene[] = [
  {
    id: 'l01-e1-s1',
    title: 'Before the beginning',
    music: 'creation-chaos',
    beats: [
      say('Before mountains, before stars, before time itself, there was God, and God alone.', camera({ zoom: 1.08, y: 0.03 }, { seconds: 12, ease: 'inOutSine' })),
      say('Then God began to create.'),
      verse('GEN 1:1'),
      verse('GEN 1:2', actor('spirit', { opacity: 0.9 }, { seconds: 5, ease: 'inOutSine' })),
      say(
        'The Hebrew word for “moving” is the word for a bird hovering over its nest. Before anything had shape, God’s Spirit was already brooding over it, ready to bring forth life.',
      ),
    ],
  },
  {
    id: 'l01-e1-s2',
    title: 'Day one: light',
    beats: [
      say('Then God spoke.', camera({ zoom: 1, y: 0 }, { seconds: 3 })),
      play('light', {
        done: [
          actor('light-flood', { grow: 1, opacity: 1 }, { seconds: 0.8, ease: 'outCubic' }),
          actor('first-light', { opacity: 1 }, { seconds: 0.8 }),
          layer('darkness', { opacity: 0 }, { seconds: 0.8 }),
          actor('spirit', { opacity: 0 }, { seconds: 2 }),
          // Ready beneath the flood of light, to be uncovered as it settles.
          layer('sky-light', { opacity: 1 }, { seconds: 0.5 }),
        ],
      }),
      withEvents(verse('GEN 1:3'), 'music:there-was-light'),
      say(
        'God saw that the light was good. He separated the light from the darkness, and called the light Day and the darkness Night.',
        // The flood fades, drifting back to the middle from wherever the player called it.
        actor('light-flood', { opacity: 0, x: 0.5, y: 0.42 }, { seconds: 5, ease: 'inOutSine' }),
        actor('first-light', FIRST_LIGHT_HOME, { seconds: 5, ease: 'inOutCubic' }),
        layer('night-veil', { opacity: 1 }, { seconds: 4, delay: 1.5 }),
      ),
      say('And there was evening and there was morning, one day.'),
    ],
  },
  {
    id: 'l01-e1-s3',
    title: 'Day two: the sky',
    music: 'creation-marvelous-work',
    beats: [
      say(
        'On the second day God made a great dome, the firmament, to separate the waters below from the waters above.',
        layer('firmament', { opacity: 1 }, { seconds: 2 }),
        camera({ y: -0.03 }, { seconds: 3 }),
      ),
      play('firmament', { done: [layer('firmament', { offsetY: 0 }, { seconds: 1.4, ease: 'outCubic' })] }),
      say('He called the firmament Heaven.', layer('sky-blue', { opacity: 1 }, quiet), camera({ y: 0 }, quiet)),
      say('And there was evening and there was morning, a second day.'),
    ],
  },
  {
    id: 'l01-e1-s4',
    title: 'Day three: land, seas and plants',
    music: 'creation-rolling-billows',
    beats: [
      say('God gathered the waters under the sky into one place, and the dry land appeared. He called the land Earth, and the gathered waters Seas.'),
      play('land', {
        done: [layer('land', { offsetY: 0 }, { seconds: 1.2, ease: 'outCubic' }), layer('grass', { offsetY: 0 }, { seconds: 1.2, ease: 'outCubic' })],
      }),
      say('Then the earth sprouted green: plants bearing seed and trees bearing fruit, each according to its kind.', camera({ zoom: 1.05, y: 0.01 }, { seconds: 3 })),
      play('plants', {
        done: [layer('grass', { opacity: 1 }, { seconds: 2 }), ...PLANTS.map((id) => actor(id, { grow: 1 }, { seconds: 2.2, ease: 'outCubic' }))],
      }),
      say('God saw that it was good. Evening came, and morning: a third day.', camera({ zoom: 1, y: 0 }, quiet)),
    ],
  },
  {
    id: 'l01-e1-s5',
    title: 'Day four: sun, moon and stars',
    music: 'creation-splendour',
    beats: [
      say(
        'God set lights in the firmament to separate the day from the night, and to mark signs and seasons, days and years.',
        actor('sun', { opacity: 1, ...SUN_RISEN }, { seconds: 3.5 }),
        actor('moon', { opacity: 1, ...MOON_RISEN }, { seconds: 3.5, delay: 0.8 }),
        camera({ y: -0.025 }, { seconds: 3 }),
      ),
      play('sun-and-moon', {
        done: [actor('sun', SUN_HOME, { seconds: 1.6, ease: 'outCubic' }), actor('moon', MOON_HOME, { seconds: 1.6, ease: 'outCubic' })],
      }),
      say('The sun to rule the day, the moon to rule the night, and then, almost in passing, he made the stars as well.'),
      play('stars', { done: [layer('stars-a', { opacity: 1 }, { seconds: 1.5 }), layer('stars-b', { opacity: 1 }, { seconds: 1.5 })] }),
      say(
        'The nations around Israel worshiped the sun, the moon and the stars as gods. Genesis calls them simply lights: made things, set in place by the one true God.',
      ),
      say('Evening came, and morning: a fourth day.', camera({ y: 0 }, quiet)),
    ],
  },
  {
    id: 'l01-e1-s6',
    title: 'Day five: fish and birds',
    music: 'creation-mighty-pens',
    beats: [
      say('God said, let the waters swarm with living creatures, and let birds fly above the earth across the sky.'),
      play('creatures', {
        done: [
          ...['fish-a', 'fish-b', 'birds-a', 'birds-b'].map((id) => actor(id, { opacity: 1, spread: 1 }, { seconds: 1.5, ease: 'outCubic' })),
          actor('whale', { opacity: 1 }, { seconds: 2 }),
        ],
      }),
      say('So he made the great creatures of the sea, every fish, and every winged bird.'),
      say('God blessed them and said, be fruitful and multiply.'),
      say('Evening came, and morning: a fifth day.'),
    ],
  },
  {
    id: 'l01-e1-s7',
    title: 'Day six: animals, and man and woman',
    music: 'creation-earth-bring-forth',
    beats: [
      say(
        'God said, let the earth bring forth living creatures: cattle, creeping things and wild beasts, each according to its kind. And so it was.',
        // The animals arrive at the edges and wait to be welcomed.
        actor('lion', { x: 0.17, pose: 'walk' }, { seconds: 4, ease: 'outCubic' }),
        actor('lion', { pose: 'idle' }, { seconds: 0.6, delay: 3.4 }),
        actor('deer', { x: 0.06, pose: 'walk' }, { seconds: 4.5, ease: 'outCubic', delay: 0.8 }),
        actor('deer', { pose: 'idle' }, { seconds: 0.6, delay: 4.6 }),
        actor('sheep', { x: 0.9, pose: 'walk' }, { seconds: 4, ease: 'outCubic', delay: 0.4 }),
        actor('sheep', { pose: 'idle' }, { seconds: 0.6, delay: 3.8 }),
        actor('elephant', { x: 0.97, pose: 'walk' }, { seconds: 5, ease: 'outCubic', delay: 1.2 }),
        actor('elephant', { pose: 'idle' }, { seconds: 0.6, delay: 5.6 }),
      ),
      play('animals', {
        done: Object.entries(ANIMAL_PLACES).map(([id, place]) => actor(id, { x: place.x, facing: place.facing, pose: 'idle' }, { seconds: 1.5 })),
      }),
      say('Then God did something new. This time he did not say “Let there be.” He said:', camera({ zoom: 1.12, y: 0.025 }, { seconds: 5 })),
      verse('GEN 1:26'),
      verse(
        'GEN 1:27',
        actor('halo', { opacity: 0.85 }, { seconds: 4 }),
        actor('man', { opacity: 1 }, { seconds: 3.5, delay: 0.6 }),
        actor('woman', { opacity: 1 }, { seconds: 3.5, delay: 1.4 }),
      ),
      say('God blessed them and gave them the earth to care for, his stewards in his creation.'),
      verse('GEN 1:31', camera({ zoom: 1, y: 0 }, { seconds: 6, ease: 'inOutSine' })),
      say('Evening came, and morning: a sixth day.'),
    ],
  },
  {
    id: 'l01-e1-s8',
    title: 'Day seven: God rests',
    music: 'creation-glorious-work',
    beats: [
      say('So the heavens and the earth were finished, in all their array.', layer('light-rays', { opacity: 0.85 }, { seconds: 6, ease: 'inOutSine' })),
      say('On the seventh day God rested from all the work he had done. He blessed the seventh day and made it holy.'),
      play('rest'),
      say('God did not rest because he was tired. He rested the way an artist steps back from a finished work, and he invited his creation to rest with him.'),
      say('For Israel this day became the Sabbath. For Christians, the Lord’s Day is Sunday, the day of the Resurrection and the first day of a new creation.'),
    ],
  },
]

export const episode1: Episode = {
  id: 'l01-e1',
  number: 1,
  emblem: 'creation',
  title: 'In the Beginning',
  passage: 'GEN 1:1-2:3',
  minutes: 12,
  set: creationSet,
  scenes,
  thread: { id: 'creation-by-the-word', spot: 'first-light', fromScene: 'l01-e1-s2' },
  whereWhen: {
    places: [],
    when: 'Before recorded history',
    notes: [
      {
        title: 'Before recorded history',
        text: 'Genesis 1–11 tells of the time before any history can be dated. The Church reads these chapters as revealing true things about God, creation and humanity in symbolic language (Catechism 337, 390).',
      },
      {
        title: 'A careful pattern',
        text: 'Days 1–3 create spaces (light and dark, sky and sea, land), and days 4–6 fill them (sun, moon and stars; fish and birds; animals and people). Day 7 crowns everything with rest.',
      },
      {
        title: 'Against its neighbors',
        text: 'In Babylon’s creation story the gods fight each other, and humans are made as slaves for them. Genesis tells of one God who creates in peace by his word, calls everything good, and makes humans in his own image.',
      },
      {
        title: '“Let us”',
        text: 'Christian readers have long heard in “Let us make man” (1:26) a first whisper of the Trinity.',
      },
    ],
  },
  read: ['GEN 1:1-2:3'],
}

/** For the interactions: which actors grow on day three, where the sun and moon go, and where the animals end up. */
export const DAY_THREE_PLANTS = PLANTS
export const DAY_FOUR_RISEN = { sun: SUN_RISEN, moon: MOON_RISEN }
export const DAY_FOUR_HOMES = { sun: SUN_HOME, moon: MOON_HOME }
export const DAY_SIX_PLACES = ANIMAL_PLACES
