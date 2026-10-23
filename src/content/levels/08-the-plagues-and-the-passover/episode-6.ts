import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · Remember This Day (Exodus 12:14–17, 24–27; 13:3–16), from the approved Level 8
 * script.
 *
 * In the camp in the wilderness, Moses tells the people never to forget: "Remember this
 * day," and tell your children. Years later, a family keeps the Passover, and the youngest
 * child asks about each thing on the table; the player answers ("when your children ask",
 * minigames/when-your-children-ask). Then, softly, another table: the bread and the cup that
 * Jesus gave a new meaning at the Passover before he died, which glow (this episode's golden
 * thread: "Do this in remembrance of me").
 */

/** The things on the table the child asks about, and what each means. */
export const ASKED = [
  { id: 'lamb', name: 'the lamb', x: 0.44, answer: 'passed-over' },
  { id: 'bread', name: 'the flat bread', x: 0.5, answer: 'in-haste' },
  { id: 'herbs', name: 'the bitter herbs', x: 0.56, answer: 'bitter' },
  { id: 'staff', name: 'the staff by the wall', x: 0.66, answer: 'ready' },
] as const
export const MEANINGS = [
  { id: 'passed-over', text: 'The LORD passed over our houses, and kept us safe.' },
  { id: 'in-haste', text: 'We left Egypt in a hurry, before the dough could rise.' },
  { id: 'bitter', text: 'Slavery in Egypt was bitter.' },
  { id: 'ready', text: 'We were ready to go when God brought us out.' },
]

const ABOVE = 'house-inside'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const CAMP = ['tent-1', 'tent-2', 'people', 'moses', 'rod', 'pillar', 'pillar-light']
const TABLE = ['mat', 'dish-lamb', 'dish-bread', 'dish-herbs', 'table-staff', 'father', 'mother', 'grandfather', 'child', 'lamp-glow']

export const rememberSet: SceneDescription = {
  id: 'l08-remember',
  title: 'Remember this day',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'desert', depth: 0.3 },
    { id: 'house-inside', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp in the wilderness at evening, the pillar of fire behind it.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.12, y: 0.775, size: 0.11, pose: 'open' },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.3, y: 0.77, size: 0.1, pose: 'open', facing: -1 },
    { id: 'pillar-light', prop: 'halo', above: ABOVE, x: 0.84, y: 0.55, size: 0.16, opacity: 0 },
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: 0.84, y: 0.78, size: 0.07, pose: 'fire', opacity: 0 },
    person('people', 'hebrew-family', 0.58, { size: 0.12, facing: 1 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.438, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.42, { facing: 1 }),
    // Years later, the Passover table: the mat, the lamb, the bread, the herbs, a staff by the wall.
    { id: 'lamp-glow', prop: 'halo', above: ABOVE, x: 0.3, y: 0.6, size: 0.12, opacity: 0 },
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.5, y: 0.8, size: 0.16, opacity: 0 },
    ...[
      ['dish-lamb', 'lamb', 0.44],
      ['dish-bread', 'bread', 0.5],
      ['dish-herbs', 'herbs', 0.56],
    ].map(([id, pose, x]): SceneActor => ({ id: id as string, prop: 'passover-dish', above: ABOVE, x: x as number, y: 0.775, size: 0.035, pose: pose as string, opacity: 0 })),
    { id: 'table-staff', prop: 'staff', above: ABOVE, x: 0.66, y: 0.785, size: 0.012, opacity: 0 },
    { id: 'asking', prop: 'halo', above: ABOVE, x: 0.44, y: 0.75, size: 0.06, opacity: 0 },
    person('grandfather', 'elder', 0.34, { facing: 1, pose: 'sit', opacity: 0 }),
    person('father', 'hebrew-father', 0.72, { pose: 'sit', opacity: 0 }),
    person('mother', 'hebrew-mother', 0.8, { pose: 'sit', opacity: 0 }),
    person('child', 'boy', 0.62, { size: 0.026, y: 0.79, opacity: 0 }),
    // Softly, another table: the bread and the cup, which glow: the golden thread.
    { id: 'bread-and-cup', prop: 'bread-and-wine', above: ABOVE, x: 0.5, y: 0.74, size: 0.08, opacity: 0 },
    { id: 'bread-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.68, size: 0.12, opacity: 0 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.003 },
      { at: 20, value: 0.003, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.002, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.006, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]

const scenes: StoryScene[] = [
  {
    id: 'l08-e6-s1',
    title: 'A memorial day',
    music: 'handel-worthy-is-the-lamb',
    beats: [
      say('Even before they left Egypt, God told his people to remember this night for ever.', camera({ zoom: 1.02 }, slow)),
      verse('EXO 12:14', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
      verse('EXO 12:17', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l08-e6-s2',
    title: 'Remember this day',
    music: 'handel-worthy-is-the-lamb',
    beats: [
      verse('EXO 13:3', ...swap('evening-sky', 'night-sky'), fadeIn('pillar', 1), fadeIn('pillar-light', 1, 0.8), actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 2 })),
      verse('EXO 13:8', actor('moses', { pose: 'idle' }, { seconds: 0.8 }), actor('people', { facing: -1 }, { seconds: 0.5, delay: 1 }), camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l08-e6-s3',
    title: 'When your children ask',
    music: 'handel-worthy-is-the-lamb',
    beats: [
      verse(
        'EXO 12:26',
        // Years later, a family at the Passover table; the youngest child looks up and asks.
        camera({ zoom: 1 }, slow),
        ...CAMP.map((id) => fadeOut(id)),
        ...swap('desert', 'house-inside', 1),
        ...TABLE.map((id) => fadeIn(id, 2.5, id === 'lamp-glow' ? 0.8 : 1)),
      ),
      play('when-your-children-ask', { done: [actor('asking', { x: ASKED.at(-1)!.x, opacity: 0 }, { seconds: 0.5 })] }),
      verse('EXO 12:27', ...['father', 'mother', 'grandfather'].map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 3 + i * 0.3 }))),
    ],
  },
  {
    id: 'l08-e6-s4',
    title: 'Every year since',
    music: 'handel-worthy-is-the-lamb',
    beats: [
      say(
        'Jewish families still keep the Passover every spring. At the meal, the youngest child asks, “Why is this night different from all other nights?”, and the family tells the story of what God did.',
        ...['father', 'mother', 'grandfather'].map((id) => actor(id, { pose: 'sit' }, { seconds: 1 })),
        // A glow on the unleavened bread, which stays as the table becomes another: the golden thread.
        fadeIn('bread-glow', 0.5, 0.9),
      ),
      say(
        'Jesus kept the Passover with his friends, the night before he died. He took the bread and the cup, and gave them a new meaning.',
        // Softly, another table: the bread and the cup.
        ...TABLE.filter((id) => id !== 'lamp-glow').map((id) => fadeOut(id)),
        fadeIn('bread-and-cup', 1.5),
      ),
      verse('EXO 13:14', camera({ zoom: 1.03, y: -0.01 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: rememberSet, scenes }
