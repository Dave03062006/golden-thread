import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Serpent and the Fall (Genesis 3:1–13), from the approved Level 1
 * script.
 *
 * The same garden, in the afternoon. The serpent on a branch of the forbidden tree; the
 * lie, as everything dims but the fruit (and "Spot the twist", minigames/twist); the
 * fruit passed between them; shame and fig leaves in a colder light; God walking in the
 * garden at evening, shown as light (spec §6), and the two hiding; then the blame,
 * which runs right to left like a chain: the man points at the woman, the woman at the
 * serpent, and beyond them stands the light.
 *
 * The serpent is drawn as a subtle creature, not a monster, and nothing is shown of the
 * eating itself: the fruit passes between their hands and is gone.
 */

/** Where the one fruit hangs on the forbidden tree (the paper and pixel veils dim around it). */
export const FRUIT_ON_TREE = { x: 0.365, y: 0.5 }

export const fallSet: SceneDescription = {
  id: 'l01-fall',
  title: 'The garden of Eden, afternoon',
  layers: [
    { id: 'eden-sky', depth: 0 },
    { id: 'eden-hills', depth: 0.15 },
    { id: 'eden-trees', depth: 0.3 },
    { id: 'eden-meadow', depth: 0.45 },
    { id: 'eden-river', depth: 0.45 },
    { id: 'eden-front', depth: 0.9 },
    { id: 'eden-dim', depth: 0.45, opacity: 0 },
    { id: 'eden-dusk', depth: 0, opacity: 0 },
  ],
  actors: [
    { id: 'garden-tree-1', prop: 'fruit-tree', above: 'eden-trees', x: 0.1, y: 0.63, size: 0.11 },
    { id: 'garden-tree-2', prop: 'fruit-tree', above: 'eden-trees', x: 0.93, y: 0.62, size: 0.12 },
    { id: 'tree-of-life', prop: 'tree-of-life', above: 'eden-river', x: 0.63, y: 0.7, size: 0.13 },
    // The forbidden tree, where this episode's golden thread is found.
    { id: 'forbidden-tree', prop: 'tree-knowledge', above: 'eden-river', x: 0.35, y: 0.71, size: 0.13 },
    { id: 'serpent', prop: 'serpent', above: 'eden-river', x: 0.405, y: 0.555, size: 0.1, opacity: 0 },
    { id: 'woman', prop: 'woman', above: 'eden-river', x: 0.47, y: 0.78, size: 0.042, facing: -1 },
    { id: 'man', prop: 'man', above: 'eden-river', x: 0.6, y: 0.78, size: 0.045, facing: -1 },
    // In front of the man and the woman, so they can hide in it from God, who comes from the left.
    { id: 'thicket', prop: 'thicket', above: 'eden-river', x: 0.83, y: 0.86, size: 0.22 },
    // God shown as light, walking in the garden at evening: above the dusk, so it glows in it.
    { id: 'glory', prop: 'glory', above: 'eden-dusk', x: -0.2, y: 0.5, size: 0.34, opacity: 0 },
    // The fruit glows above the veil that dims everything else.
    { id: 'fruit', prop: 'fruit', above: 'eden-dim', x: FRUIT_ON_TREE.x, y: FRUIT_ON_TREE.y, size: 0.045, opacity: 0 },
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

const slow = { seconds: 4, ease: 'inOutSine' } as const

/** Where the woman's hand is when she reaches: where she takes the fruit. */
const HER_HAND = { x: 0.437, y: 0.592 }

const scenes: StoryScene[] = [
  {
    id: 'l01-e3-s1',
    title: 'The serpent’s question',
    music: 'allegri-miserere',
    beats: [
      verse(
        'GEN 3:1',
        actor('serpent', { opacity: 1 }, { seconds: 3, delay: 0.5 }),
        camera({ x: -0.04, zoom: 1.12, y: 0.03 }, { seconds: 8, ease: 'inOutSine' }),
      ),
      say(
        'It wasn’t even a lie yet, just a question. But it made God’s generous gift sound like a harsh rule. God had said every tree, freely, except one. The serpent said: not any tree?',
      ),
      verse('GEN 3:2-3', actor('woman', { x: 0.46 }, { seconds: 3, ease: 'inOutSine' })),
      say('Later Scripture names who speaks through the serpent:'),
      verse('REV 12:9'),
    ],
  },
  {
    id: 'l01-e3-s2',
    title: 'The lie',
    music: 'allegri-miserere',
    beats: [
      verse(
        'GEN 3:4-5',
        actor('serpent', { x: 0.42, y: 0.56 }, { seconds: 5, ease: 'inOutSine' }),
        layer('eden-dim', { opacity: 1 }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
        actor('fruit', { opacity: 1 }, { seconds: 3, delay: 2 }),
        camera({ x: -0.03, zoom: 1.08, y: 0.02 }, slow),
      ),
      play('twist'),
      say('Now the lie was out in the open, and with it a darker suggestion: that God was holding something back, that he could not be trusted.'),
    ],
  },
  {
    id: 'l01-e3-s3',
    title: 'The fruit',
    music: 'allegri-miserere',
    beats: [
      verse(
        'GEN 3:6',
        actor('woman', { pose: 'reach' }, { seconds: 1.6, ease: 'inOutSine', delay: 1 }),
        actor('fruit', HER_HAND, { seconds: 1.8, ease: 'inOutSine', delay: 2.4 }),
        actor('woman', { pose: 'idle' }, { seconds: 1.6, ease: 'inOutSine', delay: 4.4 }),
        actor('man', { x: 0.53 }, { seconds: 3.5, ease: 'inOutSine', delay: 3 }),
        actor('fruit', { x: 0.5, y: 0.62 }, { seconds: 2, ease: 'inOutSine', delay: 6.5 }),
        actor('fruit', { opacity: 0 }, { seconds: 2, delay: 9 }),
        layer('eden-dim', { opacity: 0.45 }, { seconds: 6, delay: 2 }),
      ),
      say(
        'Every good thing in the garden had come from God’s hand. Now they reached to take it, to decide for themselves what was good.',
        actor('serpent', { x: 0.36, opacity: 0 }, { seconds: 5, ease: 'inOutSine' }),
      ),
    ],
  },
  {
    id: 'l01-e3-s4',
    title: 'Eyes opened',
    music: 'allegri-miserere',
    beats: [
      say(
        'Their eyes were opened, but not the way the serpent had promised. They saw that they were naked, and they were ashamed. They sewed fig leaves together to cover themselves.',
        layer('eden-dim', { opacity: 0 }, { seconds: 5 }),
        layer('eden-dusk', { opacity: 0.55 }, { seconds: 6, ease: 'inOutSine' }),
        actor('man', { facing: 1, x: 0.56 }, { seconds: 2.5, ease: 'inOutSine', delay: 1 }),
        actor('woman', { x: 0.44 }, { seconds: 2.5, ease: 'inOutSine', delay: 1 }),
        actor('man', { pose: 'ashamed' }, { seconds: 2.5, ease: 'inOutSine', delay: 2 }),
        actor('woman', { pose: 'ashamed' }, { seconds: 2.5, ease: 'inOutSine', delay: 2.4 }),
        camera({ x: 0, zoom: 1.04, y: 0.01 }, slow),
      ),
      say('The first thing sin brought was shame, and something now stood between them.'),
    ],
  },
  {
    id: 'l01-e3-s5',
    title: '“Where are you?”',
    music: 'allegri-miserere',
    beats: [
      say(
        'In the cool of the day they heard the sound of the LORD God walking in the garden, and they hid themselves among the trees.',
        layer('eden-dusk', { opacity: 1 }, { seconds: 6, ease: 'inOutSine' }),
        actor('glory', { opacity: 0.8 }, { seconds: 4, delay: 1 }),
        actor('glory', { x: 0.2 }, { seconds: 9, ease: 'inOutSine', delay: 1 }),
        actor('woman', { x: 0.79, facing: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1.5 }),
        actor('man', { x: 0.86, facing: 1 }, { seconds: 4.4, ease: 'inOutSine', delay: 1.5 }),
        actor('woman', { pose: 'hide' }, { seconds: 1.5, ease: 'inOutSine', delay: 5 }),
        actor('man', { pose: 'hide' }, { seconds: 1.5, ease: 'inOutSine', delay: 5.4 }),
        camera({ x: 0, zoom: 1, y: 0 }, { seconds: 6, ease: 'inOutSine' }),
      ),
      verse('GEN 3:9', actor('glory', { x: 0.26 }, { seconds: 6, ease: 'inOutSine' })),
      say('God knew where they were. The question was for them. It’s the first time in the Bible that God comes seeking the lost, and he has been asking it ever since.'),
      say('The man answered that he had heard God, and was afraid because he was naked, and had hidden himself.'),
    ],
  },
  {
    id: 'l01-e3-s6',
    title: 'Blame',
    music: 'allegri-miserere',
    beats: [
      say(
        '“Have you eaten of the tree I commanded you not to eat?” God asked.',
        actor('woman', { x: 0.52, facing: -1, pose: 'ashamed' }, { seconds: 3, ease: 'inOutSine' }),
        actor('man', { x: 0.63, facing: -1, pose: 'ashamed' }, { seconds: 3, ease: 'inOutSine' }),
        actor('serpent', { x: 0.405, y: 0.765, pose: 'ground', opacity: 1 }, { seconds: 3, delay: 1 }),
      ),
      say('The man said: the woman you gave to be with me, she gave me the fruit, and I ate.', actor('man', { pose: 'point' }, { seconds: 1.2, ease: 'inOutSine', delay: 0.5 })),
      say('The woman said: the serpent deceived me, and I ate.', actor('woman', { pose: 'point' }, { seconds: 1.2, ease: 'inOutSine', delay: 0.5 })),
      say(
        'The man blamed the woman, and even God who had given her. The woman blamed the serpent. Sin had broken trust with God, and between each other.',
        actor('man', { pose: 'ashamed' }, { seconds: 2, ease: 'inOutSine', delay: 2 }),
        actor('woman', { pose: 'ashamed' }, { seconds: 2, ease: 'inOutSine', delay: 2.4 }),
      ),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: fallSet, scenes }
