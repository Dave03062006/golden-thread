import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Return to Egypt (Exodus 4:18–31), from the approved Level 7 script.
 *
 * Moses says goodbye to Jethro, and sets out for Egypt with Zipporah and their sons, the rod
 * of God in his hand, which glows (this episode's golden thread: "those who sought the
 * child's life are dead"). Aaron meets him at the mountain of God. In Goshen, the elders
 * gather; the player shows them the signs God gave, in the order he gave them ("the
 * signs", minigames/the-signs), and the people believe, and bow their heads and worship.
 */

/** The signs, in the order God gave them, and what shows each one. */
export const SIGNS = [
  { id: 'rod', text: 'The rod and the serpent', refs: ['EXO 4:4'] },
  { id: 'hand', text: 'The hand in the cloak', refs: ['EXO 4:6', 'EXO 4:7'] },
  { id: 'water', text: 'The water from the Nile', refs: ['EXO 4:9'] },
] as const
export const ELDERS = ['elder-1', 'elder-2', 'elder-3', 'elder-4']
/** Where Moses stands before the elders, and his rod beside him. */
export const MOSES_AT = 0.54
/** Where people stand in Goshen: on the grass, above the canal. */
export const GOSHEN_Y = 0.745

const ABOVE = 'goshen-fields'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const MIDIAN = ['tent', 'jethro', 'zipporah', 'son-1', 'son-2', 'donkey']

export const returnSet: SceneDescription = {
  id: 'l07-return',
  title: 'Return to Egypt',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'desert', depth: 0.3 },
    { id: 'horeb', depth: 0.3, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Jethro's tent in Midian, and Moses' family setting out.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.16, y: 0.775, size: 0.12, pose: 'open' },
    person('jethro', 'jethro', 0.28, { facing: 1 }),
    { id: 'donkey', prop: 'donkey', above: ABOVE, x: 0.58, y: 0.79, size: 0.07, facing: 1 },
    person('zipporah', 'zipporah', 0.66, { facing: 1 }),
    person('son-1', 'boy', 0.72, { size: 0.026, y: 0.79, facing: 1 }),
    person('son-2', 'boy', 0.75, { size: 0.022, y: 0.79, facing: 1 }),
    // The elders in Goshen.
    // (In Goshen they stand on the grass above the canal.)
    ...ELDERS.map((id, i) => person(id, 'elder', 0.72 + i * 0.065, { y: GOSHEN_Y, opacity: 0 })),
    // The signs.
    { id: 'serpent', prop: 'serpent', above: ABOVE, x: MOSES_AT - 0.06, y: GOSHEN_Y + 0.015, size: 0.06, pose: 'ground', opacity: 0 },
    { id: 'hand-glow', prop: 'halo', above: ABOVE, x: MOSES_AT - 0.012, y: GOSHEN_Y - 0.085, size: 0.05, opacity: 0 },
    { id: 'poured-water', prop: 'poured-water', above: ABOVE, x: MOSES_AT - 0.08, y: GOSHEN_Y + 0.015, size: 0.07, pose: 'water', opacity: 0 },
    // Moses and his rod, which glows: the golden thread; and Aaron.
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.44 + 0.018, y: 0.785, size: 0.012 },
    { id: 'rod-glow', prop: 'halo', above: ABOVE, x: 0.44 + 0.018, y: 0.68, size: 0.07, opacity: 0 },
    person('moses', 'moses-shepherd', 0.44, { facing: -1 }),
    person('aaron', 'aaron', 1.1),
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
/** Moses, his rod and its glow move together. */
const mosesTo = (x: number, delay = 0, seconds = 4, facing: -1 | 1 = 1) => [
  actor('moses', { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay }),
  actor('rod', { x: x + 0.018 }, { seconds, ease: 'inOutSine', delay }),
  actor('rod-glow', { x: x + 0.018 }, { seconds, ease: 'inOutSine', delay }),
  actor('moses', { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds }),
]

const scenes: StoryScene[] = [
  {
    id: 'l07-e5-s1',
    title: '“Go in peace”',
    music: 'go-down-moses',
    beats: [
      verse('EXO 4:18', actor('jethro', { pose: 'lift' }, { seconds: 0.8, delay: 3 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 4:19', actor('jethro', { pose: 'idle' }, { seconds: 0.8 }), fadeIn('rod-glow', 0.5, 0.9), camera({ zoom: 1 }, slow)),
      verse(
        'EXO 4:20',
        // The family sets out along the road toward Egypt.
        ...mosesTo(1.15, 1, 7),
        ...['donkey', 'zipporah', 'son-1', 'son-2'].map((id, i) => actor(id, { x: 1.25 + i * 0.06, pose: 'walk' }, { seconds: 7, ease: 'inOutSine', delay: 0.5 })),
      ),
    ],
  },
  {
    id: 'l07-e5-s2',
    title: 'Two brothers',
    music: 'go-down-moses',
    beats: [
      verse(
        'EXO 4:27',
        // At the mountain of God, Aaron comes running and embraces him.
        ...MIDIAN.map((id) => fadeOut(id)),
        ...swap('desert', 'horeb', 0.5),
        actor('moses', { x: 0.3, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('rod', { x: 0.318 }, { seconds: 0.1, delay: 1 }),
        actor('rod-glow', { x: 0.318 }, { seconds: 0.1, delay: 1 }),
        actor('aaron', { pose: 'walk' }, { seconds: 0.1, delay: 2 }),
        actor('aaron', { x: 0.4, pose: 'walk' }, { seconds: 3.5, ease: 'inOutSine', delay: 2 }),
        actor('aaron', { pose: 'carry' }, { seconds: 0.5, delay: 5.5 }),
        actor('moses', { pose: 'carry' }, { seconds: 0.5, delay: 5.5 }),
      ),
      verse('EXO 4:28', ...['moses', 'aaron'].map((id) => actor(id, { pose: 'sit' }, { seconds: 1, delay: 0.5 })), camera({ zoom: 1.03, x: -0.02 }, slow)),
      say('Moses was not alone any more. God had given him a brother to stand beside him.', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l07-e5-s3',
    title: 'The people believed',
    music: 'go-down-moses',
    beats: [
      verse(
        'EXO 4:29',
        // Evening in Goshen: the elders of Israel gathered.
        fadeOut('rod-glow'),
        ...swap('horeb', 'goshen-fields', 0.5),
        ...swap('forest-sky', 'evening-sky', 0.5),
        actor('moses', { x: MOSES_AT, y: GOSHEN_Y, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('rod', { x: MOSES_AT + 0.018, y: GOSHEN_Y }, { seconds: 0.1, delay: 1 }),
        actor('aaron', { x: 0.62, y: GOSHEN_Y, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        ...ELDERS.map((id, i) => fadeIn(id, 1.5 + i * 0.3)),
      ),
      verse('EXO 4:30', actor('aaron', { pose: 'lift' }, { seconds: 0.8 }), actor('aaron', { pose: 'idle' }, { seconds: 0.8, delay: 4 })),
      play('the-signs', {
        done: [
          actor('moses', { pose: 'idle' }, { seconds: 0.3 }),
          actor('rod', { opacity: 1 }, { seconds: 0.3 }),
          actor('serpent', { opacity: 0 }, { seconds: 0.3 }),
          actor('hand-glow', { opacity: 0 }, { seconds: 0.3 }),
          actor('poured-water', { opacity: 0, pose: 'red' }, { seconds: 0.3 }),
          ...ELDERS.map((id) => actor(id, { pose: 'kneel' }, { seconds: 0.5 })),
        ],
      }),
      verse('EXO 4:31', actor('aaron', { pose: 'kneel' }, { seconds: 1 }), actor('moses', { pose: 'pray' }, { seconds: 1, delay: 0.5 })),
      say('They didn’t know yet how God would set them free. But after so many years, they knew he had seen them, and was coming.', camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: returnSet, scenes }
