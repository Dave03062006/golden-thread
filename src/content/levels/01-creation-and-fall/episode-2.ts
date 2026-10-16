import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · The Garden of Eden (Genesis 2:4–25), from the approved Level 1 script.
 *
 * Creation told a second time, up close: bare ground and mist, the man formed from the
 * dust and filled with God's breath (God is shown as light, spec §6), the garden with
 * its river parting into four, the two trees, the animals coming to be named, and the
 * woman.
 *
 * Naming the animals (minigames/naming): each animal comes as a pair standing as one,
 * and once it is named the pair parts and goes to its place, so that at the end every
 * creature has its partner and the man stands alone.
 */

/** Where an animal waits to be named: in front of the man, on the ground or in the air. */
export const BEFORE_THE_MAN = { walk: { x: 0.65, y: 0.76 }, fly: { x: 0.64, y: 0.46 } }

export interface AnimalToName {
  id: string
  prop: string
  name: string
  /** The description that fits it, among the choices. */
  description: string
  flies: boolean
  size: number
  /** Which side it comes from: -1 the left, 1 the right. */
  from: -1 | 1
  /** Where the pair settles once named, and which way it faces. */
  place: { x: number; y: number; facing: -1 | 1 }
}

/** The animals, in the order they come (Genesis 2:19). */
export const ANIMALS_TO_NAME: AnimalToName[] = [
  { id: 'pair-lion', prop: 'lion', name: 'Lion', description: 'Strong and golden, his roar wakes the dawn.', flies: false, size: 0.11, from: 1, place: { x: 0.13, y: 0.8, facing: 1 } },
  { id: 'pair-eagle', prop: 'eagle', name: 'Eagle', description: 'Keen-eyed, she builds her nest on the cliffs.', flies: true, size: 0.07, from: -1, place: { x: 0.2, y: 0.24, facing: 1 } },
  { id: 'pair-deer', prop: 'deer', name: 'Deer', description: 'Light of foot, he leaps the streams with his crown of antlers.', flies: false, size: 0.08, from: 1, place: { x: 0.22, y: 0.69, facing: 1 } },
  { id: 'pair-sheep', prop: 'sheep', name: 'Sheep', description: 'Gentle and soft, she grazes close to her flock.', flies: false, size: 0.065, from: 1, place: { x: 0.77, y: 0.82, facing: -1 } },
  { id: 'pair-elephant', prop: 'elephant', name: 'Elephant', description: 'Great and grey, he lifts the water with his long nose.', flies: false, size: 0.16, from: 1, place: { x: 0.87, y: 0.68, facing: -1 } },
  { id: 'pair-dove', prop: 'dove', name: 'Dove', description: 'Soft-voiced and white, she coos among the branches.', flies: true, size: 0.07, from: 1, place: { x: 0.82, y: 0.28, facing: -1 } },
  { id: 'pair-horse', prop: 'horse', name: 'Horse', description: 'Swift and proud, his mane streams in the wind.', flies: false, size: 0.12, from: -1, place: { x: 0.75, y: 0.72, facing: -1 } },
  { id: 'pair-hare', prop: 'hare', name: 'Hare', description: 'Long-eared and quick, she hides in the tall grass.', flies: false, size: 0.045, from: -1, place: { x: 0.29, y: 0.79, facing: 1 } },
]

/** Each animal waits out of sight as a pair standing as one. */
function waiting(animal: AnimalToName, index: number): SceneActor {
  const spot = animal.flies ? BEFORE_THE_MAN.fly : BEFORE_THE_MAN.walk
  return {
    id: animal.id,
    prop: animal.prop,
    above: 'eden-river',
    x: animal.from === 1 ? 1.15 : -0.15,
    y: spot.y,
    size: animal.size,
    facing: animal.from === 1 ? -1 : 1,
    group: { count: 2, w: animal.size * 0.9, h: 0.012, seed: 40 + index, spread: 0 },
  }
}

export const gardenSet: SceneDescription = {
  id: 'l01-garden',
  title: 'The garden of Eden',
  layers: [
    { id: 'eden-sky', depth: 0 },
    { id: 'eden-hills', depth: 0.15 },
    { id: 'eden-trees', depth: 0.3, opacity: 0 },
    { id: 'eden-ground', depth: 0.45 },
    { id: 'eden-meadow', depth: 0.45, opacity: 0 },
    { id: 'eden-river', depth: 0.45, opacity: 0 },
    { id: 'eden-mist', depth: 0.5, opacity: 0.9, sway: { x: 0.02, seconds: 18 } },
    { id: 'eden-front', depth: 0.9, opacity: 0 },
  ],
  actors: [
    // The birds of the garden, wheeling far off.
    {
      id: 'eden-birds',
      prop: 'bird',
      above: 'eden-hills',
      x: 0.5,
      y: 0.2,
      size: 0.016,
      opacity: 0,
      group: { count: 6, w: 0.12, h: 0.06, seed: 31, bob: 0.008 },
      path: {
        loopSeconds: 50,
        x: [
          { at: 0, value: -0.62 },
          { at: 50, value: 0.62, ease: 'linear' },
        ],
        y: [
          { at: 0, value: 0 },
          { at: 25, value: -0.03 },
          { at: 50, value: 0 },
        ],
      },
    },
    // Trees of the garden, and the two in the middle.
    { id: 'garden-tree-1', prop: 'fruit-tree', above: 'eden-trees', x: 0.1, y: 0.63, size: 0.11, grow: 0 },
    { id: 'garden-tree-2', prop: 'fruit-tree', above: 'eden-trees', x: 0.93, y: 0.62, size: 0.12, grow: 0 },
    { id: 'tree-of-knowledge', prop: 'tree-knowledge', above: 'eden-river', x: 0.35, y: 0.71, size: 0.13, grow: 0 },
    { id: 'tree-of-life', prop: 'tree-of-life', above: 'eden-river', x: 0.63, y: 0.7, size: 0.13, grow: 0 },
    ...ANIMALS_TO_NAME.map(waiting),
    // God shown as light: a column of light, and the breath of life.
    { id: 'glory', prop: 'glory', above: 'eden-river', x: 0.5, y: 0.5, size: 0.42, opacity: 0 },
    { id: 'breath', prop: 'breath', above: 'eden-river', x: 0.5, y: 0.6, size: 0.14, opacity: 0 },
    // The light around the sleeping man, where this episode's golden thread is found.
    { id: 'sleep-light', prop: 'halo', above: 'eden-river', x: 0.5, y: 0.72, size: 0.28, opacity: 0 },
    { id: 'man', prop: 'man', above: 'eden-river', x: 0.5, y: 0.78, size: 0.045, grow: 0, facing: 1 },
    { id: 'woman', prop: 'woman', above: 'eden-river', x: 0.585, y: 0.78, size: 0.042, opacity: 0, facing: -1 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.008 },
      { at: 16, value: 0.008, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 16, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 16, value: 1.012, ease: 'smoother' },
    ],
  },
}

const quiet = { seconds: 4, ease: 'inOutSine' } as const

/** After naming, every pair is in its place: the cues the naming play ends with. */
const ALL_NAMED = ANIMALS_TO_NAME.map((a) =>
  actor(a.id, { x: a.place.x, y: a.place.y, facing: a.place.facing, spread: 1, pose: 'idle' }, { seconds: 1.5, ease: 'inOutSine' }),
)

const scenes: StoryScene[] = [
  {
    id: 'l01-e2-s1',
    title: 'Dust and breath',
    music: 'creation-native-worth',
    beats: [
      say(
        'Genesis now tells the story of creation a second time, up close. This time it’s told not from the heavens down, but from the ground up, through the eyes of the first man.',
        camera({ zoom: 1.08, y: 0.03 }, { seconds: 10, ease: 'inOutSine' }),
      ),
      say('When the LORD God made the earth and the heavens, no plant had yet sprung up, for there was no one to till the ground. A mist rose from the earth and watered it.'),
      say(
        'Then the LORD God bent low, the way a potter shapes clay.',
        actor('glory', { opacity: 0.95, y: 0.52 }, { seconds: 4, ease: 'inOutSine' }),
        actor('man', { grow: 0.45 }, { seconds: 5, ease: 'inOutSine', delay: 1.5 }),
      ),
      verse(
        'GEN 2:7',
        actor('breath', { opacity: 1 }, { seconds: 2.5 }),
        actor('man', { grow: 1 }, { seconds: 4, ease: 'outCubic', delay: 1 }),
        actor('glory', { opacity: 0.5 }, { seconds: 5, delay: 2 }),
        layer('eden-mist', { opacity: 0.35 }, { seconds: 6 }),
      ),
      say(
        'The Hebrew word for man, “adam,” sounds like the word for ground, “adamah.” We are made of earth and filled with God’s own breath.',
        actor('breath', { opacity: 0 }, { seconds: 4 }),
        actor('glory', { opacity: 0 }, { seconds: 6 }),
      ),
    ],
  },
  {
    id: 'l01-e2-s2',
    title: 'The garden and its rivers',
    music: 'creation-verdure',
    beats: [
      verse(
        'GEN 2:8',
        layer('eden-meadow', { opacity: 1 }, quiet),
        layer('eden-trees', { opacity: 1 }, quiet),
        layer('eden-mist', { opacity: 0 }, quiet),
        actor('garden-tree-1', { grow: 1 }, { seconds: 3, ease: 'outCubic', delay: 1 }),
        actor('garden-tree-2', { grow: 1 }, { seconds: 3, ease: 'outCubic', delay: 1.6 }),
        camera({ zoom: 1, y: 0 }, quiet),
      ),
      say(
        'Every tree that was beautiful to see and good to eat grew there. In the middle of the garden stood the tree of life, and the tree of the knowledge of good and evil.',
        layer('eden-front', { opacity: 1 }, quiet),
        actor('tree-of-life', { grow: 1 }, { seconds: 3.5, ease: 'outCubic' }),
        actor('tree-of-knowledge', { grow: 1 }, { seconds: 3.5, ease: 'outCubic', delay: 0.8 }),
        actor('eden-birds', { opacity: 1 }, { seconds: 3 }),
      ),
      say('A river flowed out of Eden and divided into four: the Pishon, the Gihon, the Tigris and the Euphrates.', layer('eden-river', { opacity: 1 }, quiet)),
      say('God put the man in the garden to till it and keep it. From the very beginning, work was a gift: a share in God’s care for the world.'),
    ],
  },
  {
    id: 'l01-e2-s3',
    title: 'The one command',
    music: 'creation-most-beautiful',
    beats: [
      verse('GEN 2:16-17', camera({ x: -0.05, zoom: 1.1, y: 0.01 }, { seconds: 5, ease: 'inOutSine' })),
      say('Everything was given: every tree but one.'),
      say(
        'The one limit wasn’t a trap. It was a reminder that the man was a creature, and that God alone decides what is good and what is evil.',
        camera({ x: 0, zoom: 1, y: 0 }, { seconds: 5, ease: 'inOutSine' }),
      ),
    ],
  },
  {
    id: 'l01-e2-s4',
    title: 'Naming the animals',
    music: 'creation-earth-bring-forth',
    beats: [
      verse('GEN 2:18', camera({ zoom: 1.06, y: 0.02 }, { seconds: 4 })),
      say('Out of the ground the LORD God formed every beast and every bird, and brought them to the man to see what he would call them.'),
      play('naming', { done: ALL_NAMED }),
      say('The man gave names to them all.'),
      verse('GEN 2:20', camera({ zoom: 1, y: 0 }, { seconds: 6, ease: 'inOutSine' })),
      say('Every creature had its partner. The man stood alone.'),
    ],
  },
  {
    id: 'l01-e2-s5',
    title: 'The woman',
    music: 'creation-fairest',
    beats: [
      say(
        'So the LORD God caused a deep sleep to fall upon the man. He took one of his ribs and closed up its place with flesh, and from the rib he made a woman, and brought her to the man.',
        actor('man', { pose: 'sleep' }, { seconds: 2.5, ease: 'inOutSine' }),
        actor('sleep-light', { opacity: 0.9 }, { seconds: 3, delay: 1 }),
        actor('woman', { opacity: 1 }, { seconds: 4, delay: 4 }),
        camera({ zoom: 1.12, x: 0.03, y: 0.03 }, { seconds: 6, ease: 'inOutSine' }),
      ),
      verse('GEN 2:23', actor('man', { pose: 'idle' }, { seconds: 2.5, ease: 'inOutSine' })),
      verse('GEN 2:24'),
      say(
        'They were naked, and they were not ashamed. Nothing stood between them, and nothing stood between them and God.',
        camera({ zoom: 1, x: 0, y: 0 }, { seconds: 6, ease: 'inOutSine' }),
      ),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = {
  set: gardenSet,
  scenes,
}
