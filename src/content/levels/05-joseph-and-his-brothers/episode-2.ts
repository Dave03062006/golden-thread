import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · Faithful in Potiphar's House and in Prison (Genesis 39–40), from the approved
 * Level 5 script.
 *
 * Joseph, a slave in Potiphar's house, prospers, for the LORD is with him. He refuses
 * Potiphar's wife ("how then can I do this great wickedness, and sin against God?"), and on
 * her lie is thrown into prison. There too the LORD is with him, and the keeper puts him in
 * charge: the player brings each prisoner what he needs ("caring for the prisoners",
 * minigames/caring-for-prisoners). The last two are Pharaoh's butler and baker, troubled by
 * their dreams. Joseph asks the butler to remember him, and the butler forgets. The golden
 * cup glows (this episode's golden thread: "Jesus, remember me").
 */

/** The prisoners Joseph cares for, in turn: where each sits, and what he needs. */
export const PRISONERS = [
  { id: 'prisoner-1', x: 0.5, need: 'bread' },
  { id: 'prisoner-2', x: 0.58, need: 'water' },
  { id: 'prisoner-3', x: 0.86, need: 'blanket' },
  { id: 'prisoner-4', x: 0.94, need: 'lamp' },
  { id: 'butler', x: 0.68, need: 'listen' },
  { id: 'baker', x: 0.76, need: 'listen' },
] as const
export const SITTING_Y = 0.785
/** Where the picture of what he needs floats, above a sitting prisoner. */
export const NEED_ABOVE = 0.22
/** How bright the light from the window is, before and as each prisoner is cared for. */
export const LIGHT = { from: 0.25, each: 0.1 }

const ABOVE = 'prison'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: 0.042, facing: -1, ...extra })

export const faithfulSet: SceneDescription = {
  id: 'l05-faithful',
  title: 'Faithful in Potiphar’s house and in prison',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'egypt-house', depth: 0.3 },
    { id: 'prison', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Potiphar's house: servants carrying jars and baskets.
    { id: 'servants', prop: 'crowd', above: ABOVE, x: 0.78, y: 0.79, size: 0.1, facing: -1 },
    { id: 'jar', prop: 'water-jar', above: ABOVE, x: 0.7, y: 0.79, size: 0.02 },
    { id: 'cloak', prop: 'cloak', above: ABOVE, x: 0.58, y: 0.79, size: 0.04, opacity: 0 },
    // The prison: the light from the window, the prisoners, and the picture of what each needs.
    { id: 'window-light', prop: 'halo', above: ABOVE, x: 0.5, y: 0.22, size: 0.22, opacity: 0 },
    ...PRISONERS.slice(0, 4).map((p) => person(p.id, 'prisoner', p.x, SITTING_Y, { pose: 'kneel', opacity: 0 })),
    person('butler', 'butler', PRISONERS[4].x, SITTING_Y, { pose: 'kneel', opacity: 0 }),
    person('baker', 'baker', PRISONERS[5].x, SITTING_Y, { pose: 'kneel', opacity: 0 }),
    { id: 'need', prop: 'need', above: ABOVE, x: PRISONERS[0].x, y: SITTING_Y - NEED_ABOVE, size: 0.04, pose: 'bread', opacity: 0 },
    // The dreams, seen above the butler and the baker; and the butler's golden cup: the golden thread.
    { id: 'vine', prop: 'vine', above: ABOVE, x: 0.6, y: 0.42, size: 0.1, opacity: 0 },
    { id: 'baskets', prop: 'bread-baskets', above: ABOVE, x: 0.84, y: 0.42, size: 0.08, opacity: 0 },
    { id: 'cup', prop: 'golden-cup', above: ABOVE, x: PRISONERS[4].x + 0.015, y: 0.745, size: 0.014, opacity: 0 },
    { id: 'the-cup', prop: 'halo', above: ABOVE, x: PRISONERS[4].x + 0.015, y: 0.68, size: 0.06, opacity: 0 },
    // Potiphar, Joseph, and the keeper of the prison.
    person('potiphar', 'potiphar', 0.6, 0.78),
    person('joseph', 'joseph-slave', 0.44, 0.78, { facing: 1 }),
    person('keeper', 'keeper', 1.05, 0.78, { opacity: 0 }),
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
const walkTo = (id: string, x: number, delay = 0, seconds = 5, facing: -1 | 1 = x < 0.5 ? -1 : 1) => actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay })
const stop = (id: string, delay: number, pose = 'idle') => actor(id, { pose }, { seconds: 0.5, delay })

/** After the caring: each prisoner standing, the light bright, the picture gone; Joseph beside the butler and the baker. */
const CARED = [
  ...PRISONERS.slice(0, 4).map((p) => actor(p.id, { pose: 'idle' }, { seconds: 0.6 })),
  actor('need', { x: PRISONERS[5].x, y: SITTING_Y - NEED_ABOVE, opacity: 0, pose: 'listen' }, { seconds: 0.6 }),
  actor('window-light', { opacity: LIGHT.from + LIGHT.each * PRISONERS.length }, { seconds: 1 }),
  actor('joseph', { x: 0.6, facing: 1, pose: 'idle' }, { seconds: 1, ease: 'inOutSine' }),
]

const scenes: StoryScene[] = [
  {
    id: 'l05-e2-s1',
    title: 'In Potiphar’s house',
    music: 'nobody-knows',
    beats: [
      verse('GEN 39:1', camera({ zoom: 1.03 }, slow), actor('potiphar', { facing: 1 }, { seconds: 0.5, delay: 2 })),
      verse('GEN 39:2', camera({ zoom: 1 }, slow), actor('joseph', { pose: 'work' }, { seconds: 0.6 })),
      verse('GEN 39:5', actor('joseph', { pose: 'carry' }, { seconds: 0.6 }), actor('potiphar', { pose: 'carry' }, { seconds: 0.8, delay: 1 }), actor('servants', { x: 0.84 }, { seconds: 4, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l05-e2-s2',
    title: '“How can I sin against God?”',
    music: 'nobody-knows',
    beats: [
      say(
        'Potiphar’s wife wanted Joseph to do wrong with her, behind her husband’s back. Day after day she asked him, and day after day he refused.',
        // Dusk at the house.
        layer('forest-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeOut('potiphar'),
        fadeOut('servants'),
        fadeOut('jar'),
        actor('joseph', { pose: 'idle', x: 0.56, facing: -1 }, { seconds: 2, ease: 'inOutSine' }),
      ),
      verse('GEN 39:9', actor('joseph', { pose: 'lift' }, { seconds: 1 })),
      say(
        'One day he ran from her, leaving his cloak in her hand. She lied, and said Joseph had attacked her.',
        actor('joseph', { pose: 'idle' }, { seconds: 0.5 }),
        fadeIn('cloak', 0.5),
        walkTo('joseph', 0.04, 0.5, 3, -1),
        actor('joseph', { opacity: 0 }, { seconds: 1, delay: 3 }),
      ),
      verse(
        'GEN 39:20',
        // The king's prison.
        fadeOut('cloak'),
        layer('egypt-house', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('prison', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('window-light', 1, LIGHT.from),
        ...PRISONERS.slice(0, 4).map((p, i) => fadeIn(p.id, 1.5 + i * 0.3)),
        actor('joseph', { x: 0.42, y: 0.785, pose: 'kneel', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('joseph', 2),
      ),
    ],
  },
  {
    id: 'l05-e2-s3',
    title: 'The LORD was with him in prison',
    music: 'nobody-knows',
    beats: [
      verse('GEN 39:21', actor('joseph', { pose: 'pray' }, { seconds: 1 }), fadeIn('keeper', 1), walkTo('keeper', 0.66, 1, 3, -1), stop('keeper', 4)),
      verse('GEN 39:22', actor('keeper', { pose: 'carry' }, { seconds: 0.8 }), actor('joseph', { pose: 'idle', y: 0.78 }, { seconds: 1 })),
      play('caring-for-prisoners', {
        cues: [actor('keeper', { pose: 'idle' }, { seconds: 0.8 }), walkTo('keeper', 1.06, 0.5, 3, 1), fadeIn('butler', 1), fadeIn('baker', 1.3), fadeIn('need', 0.5)],
        done: CARED,
      }),
      say('Joseph had done nothing wrong. He could have been bitter. Instead, he served.', camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l05-e2-s4',
    title: 'Two dreams',
    music: 'nobody-knows',
    beats: [
      verse('GEN 40:8', camera({ zoom: 1 }, slow), fadeIn('cup', 0.5), fadeIn('the-cup', 1, 0.85), actor('joseph', { pose: 'lift' }, { seconds: 1, delay: 3 })),
      say('The butler had dreamed of a vine, and of squeezing its grapes into Pharaoh’s cup. The baker had dreamed of birds eating Pharaoh’s bread from the baskets on his head.', actor('joseph', { pose: 'idle' }, { seconds: 1 }), fadeIn('vine', 0.5, 0.9), fadeIn('baskets', 2.5, 0.9)),
      say('God showed Joseph the meaning: in three days the butler would be set free and given back his work. But the baker would die.', fadeOut('vine', 3), fadeOut('baskets', 3), actor('baker', { pose: 'pray' }, { seconds: 1, delay: 4 })),
      verse('GEN 40:14', actor('butler', { pose: 'idle' }, { seconds: 1 }), actor('joseph', { pose: 'carry' }, { seconds: 1, delay: 1 })),
      verse(
        'GEN 40:21',
        // The butler goes back to Pharaoh, his cup in his hand.
        actor('joseph', { pose: 'idle' }, { seconds: 1 }),
        fadeOut('the-cup', 1),
        walkTo('butler', 1.06, 1, 4, 1),
        actor('cup', { x: 1.075 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        fadeOut('baker', 2),
      ),
      verse('GEN 40:23', actor('joseph', { pose: 'kneel' }, { seconds: 1 }), camera({ zoom: 1.04 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: faithfulSet, scenes }
