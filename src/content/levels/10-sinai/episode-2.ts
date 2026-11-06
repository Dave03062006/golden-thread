import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · The Ten Commandments (Exodus 20:1–21), from the approved Level 10 script.
 *
 * God speaks the ten words from the mountain: first what he has done, "I am the LORD your
 * God, who brought you out of the land of Egypt," then three words about loving him and
 * seven about loving one's neighbor. Two tablets of stone glow on the mountainside (this
 * episode's golden thread: "You shall love the Lord your God… and your neighbor as
 * yourself"). The player recalls the commandments in order, and each is carved into the
 * stone ("the ten words", minigames/the-ten-words). The people stand afar off, afraid.
 */

/** The Ten Commandments, in the Catechism's traditional short forms, in the Church's order. */
export const COMMANDMENTS = [
  'I am the LORD your God: you shall not have strange gods before me.',
  'You shall not take the name of the LORD your God in vain.',
  'Remember to keep holy the LORD’s Day.',
  'Honor your father and your mother.',
  'You shall not kill.',
  'You shall not commit adultery.',
  'You shall not steal.',
  'You shall not bear false witness against your neighbor.',
  'You shall not covet your neighbor’s wife.',
  'You shall not covet your neighbor’s goods.',
]
export const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
/** Where the two tablets stand on the mountainside, and where each word is carved on them. */
export const TABLETS = { x: 0.66, y: 0.4 }
export const CARVED = COMMANDMENTS.map((_, i) => ({ id: `carved-${i + 1}`, x: TABLETS.x + (i < 5 ? -0.045 : 0.045), y: TABLETS.y - 0.075 + (i % 5) * 0.035 }))

const ABOVE = 'horeb'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const wordsSet: SceneDescription = {
  id: 'l10-ten-words',
  title: 'The ten words',
  layers: [
    { id: 'storm-sky', depth: 0 },
    { id: 'gray-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
  ],
  actors: [
    // The mountain in cloud and fire.
    { id: 'storm', prop: 'storm-cloud', above: ABOVE, x: 0.44, y: 0.24, size: 0.4 },
    { id: 'fire-glow', prop: 'halo', above: ABOVE, x: 0.44, y: 0.28, size: 0.16, opacity: 0.8 },
    // The two tablets of stone, their glow (the golden thread), and the words carved on them.
    { id: 'tablets-glow', prop: 'halo', above: ABOVE, x: TABLETS.x, y: TABLETS.y, size: 0.2, opacity: 0 },
    { id: 'tablets', prop: 'stone-tablets', above: ABOVE, x: TABLETS.x, y: TABLETS.y, size: 0.2, pose: 'blank', opacity: 0 },
    ...CARVED.map((c): SceneActor => ({ id: c.id, prop: 'carved-line', above: ABOVE, x: c.x, y: c.y, size: 0.05, opacity: 0 })),
    // The people in the camp, and Moses.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.1, y: 0.75, size: 0.1, pose: 'open' },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.3, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.74, { size: 0.12 }),
    person('elder', 'elder', 0.2, { facing: 1, opacity: 0 }),
    person('mother', 'hebrew-mother', 0.42, { opacity: 0 }),
    person('child', 'girl', 0.46, { size: 0.026, y: 0.79, opacity: 0 }),
    person('father', 'hebrew-father', 0.56, { facing: 1, opacity: 0 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.538, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.52, { facing: 1 }),
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
const NEIGHBORS = ['elder', 'mother', 'child', 'father']

const scenes: StoryScene[] = [
  {
    id: 'l10-e2-s1',
    title: '“I am the LORD your God”',
    music: 'palestrina-kyrie',
    beats: [
      verse('EXO 20:1', fadeIn('tablets', 0.5), fadeIn('tablets-glow', 0.5, 0.85), camera({ zoom: 1.02, y: -0.01 }, slow)),
      verse('EXO 20:2', actor('people', { facing: 1 }, { seconds: 0.4, delay: 1 })),
      say('God spoke first of what he had done. He had set his people free. His commandments were for a free people, to keep them free.', camera({ zoom: 1, y: 0 }, slow)),
      verse('EXO 20:3'),
      verse('EXO 20:7'),
      verse('EXO 20:8', actor('moses', { pose: 'pray' }, { seconds: 0.8, delay: 1 })),
    ],
  },
  {
    id: 'l10-e2-s2',
    title: 'Love of neighbor',
    music: 'palestrina-kyrie',
    beats: [
      verse('EXO 20:12', actor('moses', { pose: 'idle' }, { seconds: 0.8 }), ...NEIGHBORS.map((id, i) => fadeIn(id, 0.5 + i * 0.3))),
      verse('EXO 20:13'),
      verse('EXO 20:14'),
      verse('EXO 20:15', actor('child', { x: 0.5, pose: 'walk' }, { seconds: 1.5, ease: 'inOutSine' }), actor('child', { pose: 'idle' }, { seconds: 0.4, delay: 1.5 })),
      verse('EXO 20:16'),
      verse('EXO 20:17', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l10-e2-s3',
    title: 'The people stood afar off',
    music: 'palestrina-kyrie',
    beats: [
      say('Ten words God spoke: the first three about loving God, the other seven about loving our neighbor.', camera({ zoom: 1 }, slow), ...NEIGHBORS.map((id) => fadeOut(id))),
      play('the-ten-words', { done: CARVED.map((c) => actor(c.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('EXO 20:18', ...['people', 'more-people'].map((id, i) => actor(id, { x: i ? 0.84 : 0.16, pose: 'walk', facing: i ? 1 : -1 }, { seconds: 3, ease: 'inOutSine', delay: 1 })), ...['people', 'more-people'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 4 }))),
      verse('EXO 20:20', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
      verse('EXO 20:21', actor('moses', { x: 0.44, y: 0.66, pose: 'walk', facing: -1 }, { seconds: 6, ease: 'inOutSine', delay: 1 }), actor('rod', { x: 0.422, y: 0.66 }, { seconds: 6, ease: 'inOutSine', delay: 1 }), ...swap('storm-sky', 'gray-sky', 2), fadeOut('moses', 5), fadeOut('rod', 5)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: wordsSet, scenes }
