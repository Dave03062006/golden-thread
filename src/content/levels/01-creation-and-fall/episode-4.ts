import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · The Promise and the Exile (Genesis 3:14–24), from the approved Level 1
 * script.
 *
 * The garden at dusk, where Episode 3 left it. The serpent sinks into the dust, and in the
 * darkening garden a single point of light appears and grows: the promise, the first
 * gospel, where this episode's golden thread (the main thread of Level 1) is found. Then
 * the garden's colors fade and thorns rise; the man names his wife Eve; God himself
 * clothes them; and they go out east into a harder land, past the cherub and the flaming
 * sword, carrying the light of "Lights in the dark" (minigames/lights-in-the-dark).
 *
 * Nothing of the judgment is shown harshly: no one is struck, the serpent simply sinks
 * away, and the light of God stays near them throughout.
 */

/** The signs of mercy found in "Lights in the dark", in the order Space visits them. */
export const MERCY_SIGNS = [
  { id: 'sign-promise', pose: 'promise', title: 'The promise', ref: 'GEN 3:15', x: 0.24, y: 0.34 },
  { id: 'sign-garments', pose: 'garments', title: 'The garments', ref: 'GEN 3:21', x: 0.17, y: 0.8 },
  { id: 'sign-eve', pose: 'eve', title: 'The name Eve', ref: 'GEN 3:20', x: 0.64, y: 0.68 },
] as const

/** Where the light starts: with the man and the woman. */
export const LAMP_START = { x: 0.46, y: 0.62 }

export const exileSet: SceneDescription = {
  id: 'l01-exile',
  title: 'The garden at dusk, and the land east of Eden',
  layers: [
    { id: 'eden-sky', depth: 0 },
    { id: 'eden-hills', depth: 0.15 },
    { id: 'eden-trees', depth: 0.3 },
    { id: 'eden-meadow', depth: 0.45 },
    { id: 'eden-river', depth: 0.45 },
    // The land east of Eden, waiting unseen until they go out.
    { id: 'east-sky', depth: 0, opacity: 0 },
    { id: 'east-hills', depth: 0.15, opacity: 0 },
    { id: 'east-land', depth: 0.45, opacity: 0 },
    { id: 'east-path', depth: 0.45, opacity: 0 },
    { id: 'eden-front', depth: 0.9 },
    { id: 'eden-grey', depth: 0, opacity: 0 },
    { id: 'eden-dusk', depth: 0 },
  ],
  actors: [
    { id: 'garden-tree-1', prop: 'fruit-tree', above: 'eden-trees', x: 0.1, y: 0.63, size: 0.11 },
    { id: 'garden-tree-2', prop: 'fruit-tree', above: 'eden-trees', x: 0.93, y: 0.62, size: 0.12 },
    { id: 'tree-of-life', prop: 'tree-of-life', above: 'eden-river', x: 0.63, y: 0.7, size: 0.13 },
    { id: 'forbidden-tree', prop: 'tree-knowledge', above: 'eden-river', x: 0.35, y: 0.71, size: 0.13 },
    // Thorns rising from the ground (Genesis 3:18).
    { id: 'thorns-1', prop: 'thorns', above: 'eden-river', x: 0.15, y: 0.82, size: 0.09, grow: 0 },
    { id: 'thorns-2', prop: 'thorns', above: 'eden-river', x: 0.78, y: 0.79, size: 0.08, grow: 0 },
    { id: 'thorns-3', prop: 'thorns', above: 'eden-river', x: 0.9, y: 0.86, size: 0.1, grow: 0 },
    { id: 'serpent', prop: 'serpent', above: 'eden-river', x: 0.405, y: 0.765, size: 0.1, pose: 'ground' },
    // The guardians at the east of the garden, seen once they have gone out.
    { id: 'cherub', prop: 'cherub', above: 'east-path', x: 0.86, y: 0.48, size: 0.17, opacity: 0 },
    { id: 'flaming-sword', prop: 'flaming-sword', above: 'east-path', x: 0.74, y: 0.5, size: 0.11, opacity: 0 },
    // The signs of mercy, and the light that finds them.
    ...MERCY_SIGNS.map((s) => ({ id: s.id, prop: 'sign', above: 'east-path', x: s.x, y: s.y, size: 0.07, pose: s.pose, opacity: 0 })),
    { id: 'lamp', prop: 'halo', above: 'east-path', x: LAMP_START.x, y: LAMP_START.y, size: 0.1, opacity: 0 },
    // The warm light that passes between them when he names her.
    { id: 'eve-light', prop: 'halo', above: 'east-path', x: 0.575, y: 0.66, size: 0.12, opacity: 0 },
    { id: 'woman', prop: 'woman', above: 'east-path', x: 0.52, y: 0.78, size: 0.042, facing: -1, pose: 'ashamed' },
    { id: 'man', prop: 'man', above: 'east-path', x: 0.63, y: 0.78, size: 0.045, facing: -1, pose: 'ashamed' },
    // God shown as light, and the promise: above the dusk, so they glow in it.
    { id: 'glory', prop: 'glory', above: 'eden-dusk', x: 0.26, y: 0.5, size: 0.34, opacity: 0.8 },
    { id: 'promise-light', prop: 'first-light', above: 'eden-dusk', x: 0.47, y: 0.3, size: 0.02, opacity: 0 },
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

/** After "Lights in the dark": the light with the couple, the path bright, the signs glowing quietly. */
const ALL_FOUND = [
  actor('lamp', { x: 0.4, y: 0.6, size: 0.1 }, { seconds: 2, ease: 'inOutSine' }),
  layer('east-path', { opacity: 1 }, { seconds: 1.5 }),
  ...MERCY_SIGNS.map((s) => actor(s.id, { opacity: 0.45 }, { seconds: 1.5 })),
]

const scenes: StoryScene[] = [
  {
    id: 'l01-e4-s1',
    title: 'The serpent cursed, and the promise',
    music: 'parsons-ave-maria',
    beats: [
      say(
        'Then the LORD God turned to the serpent. It would go on its belly, and eat dust, all the days of its life.',
        actor('serpent', { y: 0.8, opacity: 0 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        actor('glory', { x: 0.3, opacity: 1 }, slow),
      ),
      verse(
        'GEN 3:15',
        actor('promise-light', { opacity: 1 }, { seconds: 3, delay: 1 }),
        actor('promise-light', { size: 0.09 }, { seconds: 9, ease: 'inOutSine', delay: 1 }),
        camera({ zoom: 1.05, y: -0.02 }, { seconds: 8, ease: 'inOutSine' }),
      ),
      say('In the darkest moment of the story, God speaks a promise. The battle isn’t over. A child of the woman will strike the serpent’s head, though he himself will be wounded.'),
      say('The Church calls this verse the first gospel: the first announcement of the good news.', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l01-e4-s2',
    title: 'The consequences',
    music: 'parsons-ave-maria',
    beats: [
      say(
        'To the woman, God foretold pain in bearing children and a broken harmony with her husband.',
        layer('eden-grey', { opacity: 1 }, { seconds: 8, ease: 'inOutSine' }),
        actor('promise-light', { size: 0.05, opacity: 0.8 }, slow),
      ),
      say(
        'To the man, God said that the ground would now yield bread only through toil and sweat, until he returned to the ground from which he was taken.',
        actor('thorns-1', { grow: 1 }, { seconds: 4, ease: 'outCubic', delay: 0.5 }),
        actor('thorns-2', { grow: 1 }, { seconds: 4, ease: 'outCubic', delay: 1.4 }),
        actor('thorns-3', { grow: 1 }, { seconds: 4, ease: 'outCubic', delay: 2.2 }),
        actor('man', { x: 0.7, facing: 1 }, { seconds: 3, ease: 'inOutSine' }),
        actor('man', { pose: 'toil' }, { seconds: 2, ease: 'inOutSine', delay: 2.6 }),
      ),
      verse('GEN 3:19'),
      say('Every Ash Wednesday the Church marks our foreheads with these words. It’s not to crush us, but to remind us who we are, and who alone can save us.'),
    ],
  },
  {
    id: 'l01-e4-s3',
    title: 'Eve',
    music: 'parsons-ave-maria',
    beats: [
      verse(
        'GEN 3:20',
        actor('man', { pose: 'ashamed', x: 0.63, facing: -1 }, { seconds: 3, ease: 'inOutSine' }),
        actor('woman', { facing: 1 }, { seconds: 0, delay: 2 }),
        actor('eve-light', { opacity: 0.9 }, { seconds: 3, delay: 3 }),
      ),
      say('Death had entered the world, and the man answered by naming his wife Life. Eve means “living.”', actor('woman', { facing: -1 }, { seconds: 0, delay: 4 })),
    ],
  },
  {
    id: 'l01-e4-s4',
    title: 'Garments of skins',
    music: 'parsons-ave-maria',
    beats: [
      verse(
        'GEN 3:21',
        actor('glory', { x: 0.42 }, { seconds: 6, ease: 'inOutSine' }),
        actor('eve-light', { opacity: 0 }, { seconds: 3 }),
        actor('woman', { pose: 'clothed' }, { seconds: 3, ease: 'inOutSine', delay: 4 }),
        actor('man', { pose: 'clothed' }, { seconds: 3, ease: 'inOutSine', delay: 4.4 }),
      ),
      say('Even in judgment, God cared for them. Their fig leaves would not last, so God himself clothed them.'),
    ],
  },
  {
    id: 'l01-e4-s5',
    title: 'East of Eden',
    music: 'parsons-ave-maria',
    beats: [
      say('God would not let them reach for the tree of life and live forever in their broken state.', camera({ x: 0.03, zoom: 1.04 }, slow)),
      say(
        'So the LORD God sent them out of the garden, to till the ground from which the man had been taken.',
        layer('east-sky', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('east-hills', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('east-land', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('east-path', { opacity: 0.25 }, { seconds: 7, ease: 'inOutSine', delay: 2 }),
        layer('eden-front', { opacity: 0 }, { seconds: 5, delay: 1 }),
        layer('eden-grey', { opacity: 0 }, { seconds: 5, delay: 3 }),
        layer('eden-dusk', { opacity: 0 }, { seconds: 7, delay: 1 }),
        actor('glory', { opacity: 0 }, { seconds: 5 }),
        actor('promise-light', { opacity: 0 }, { seconds: 5 }),
        actor('woman', { x: 0.42, facing: -1 }, { seconds: 7, ease: 'inOutSine' }),
        actor('man', { x: 0.5, facing: -1 }, { seconds: 7.4, ease: 'inOutSine' }),
        camera({ x: 0, zoom: 1 }, slow),
      ),
      verse(
        'GEN 3:24',
        actor('cherub', { opacity: 1 }, { seconds: 4 }),
        actor('flaming-sword', { opacity: 1 }, { seconds: 3, delay: 1.5 }),
      ),
      play('lights-in-the-dark', {
        cues: [
          actor('lamp', { opacity: 1 }, { seconds: 1.5 }),
          ...MERCY_SIGNS.map((s, i) => actor(s.id, { opacity: 1 }, { seconds: 2, delay: 0.5 + i * 0.6 })),
        ],
        done: ALL_FOUND,
      }),
      say(
        'The way back was closed. But the promise went with them.',
        actor('woman', { x: 0.2 }, { seconds: 9, ease: 'inOutSine' }),
        actor('man', { x: 0.27 }, { seconds: 9, ease: 'inOutSine' }),
        actor('lamp', { x: 0.24, y: 0.6 }, { seconds: 9, ease: 'inOutSine' }),
      ),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: exileSet, scenes }
