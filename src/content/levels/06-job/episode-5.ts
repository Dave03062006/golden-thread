import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · God Answers from the Whirlwind (Job 38–42:6), from the approved Level 6 script.
 *
 * The sky darkens and a great whirlwind sweeps across the hills, with a light at its heart
 * that glows (this episode's golden thread: Jesus calms the storm). The LORD answers Job
 * out of it: "Where were you when I laid the foundation of the earth?" The storm opens
 * like a curtain, and the player sweeps its clouds away ("where were you?",
 * minigames/where-were-you) to find seven wonders of creation, each with God's question
 * to Job. Then the storm quiets; Job lays his hand on his mouth, and in the morning light
 * says, "Now my eye sees thee."
 */

/** The wonders God shows Job, each behind a cloud, with the verse of God's question. */
export const WONDERS = [
  { id: 'sea', prop: 'wave', x: 0.15, y: 0.5, size: 0.16, ref: 'JOB 38:8', title: 'The sea held back by its shore' },
  { id: 'snow', prop: 'snow-store', x: 0.38, y: 0.36, size: 0.1, ref: 'JOB 38:22', title: 'The storehouses of the snow' },
  { id: 'stars', prop: 'constellation', x: 0.62, y: 0.32, size: 0.13, ref: 'JOB 38:31', title: 'The Pleiades and Orion' },
  { id: 'lion', prop: 'lion', x: 0.85, y: 0.5, size: 0.09, ref: 'JOB 38:39', title: 'The lion' },
  { id: 'raven', prop: 'raven', x: 0.24, y: 0.68, size: 0.06, ref: 'JOB 38:41', title: 'The raven and its young' },
  { id: 'horse', prop: 'horse', x: 0.5, y: 0.66, size: 0.09, ref: 'JOB 39:19', title: 'The war horse' },
  { id: 'eagle', prop: 'eagle', x: 0.76, y: 0.68, size: 0.08, ref: 'JOB 39:27', title: 'The eagle on the heights' },
] as const
/** The cloud over each wonder, until it's swept away. */
export const cloudOf = (id: string) => `cloud-${id}`

const ABOVE = 'ash-heap'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: 1, ...extra })
const FRIENDS = ['eliphaz', 'bildad', 'zophar']
const PEOPLE = ['job', ...FRIENDS]

export const whirlwindSet: SceneDescription = {
  id: 'l06-whirlwind',
  title: 'The whirlwind',
  layers: [
    { id: 'gray-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'ash-heap', depth: 0.3 },
  ],
  actors: [
    // The whirlwind, and the light at its heart: the golden thread.
    { id: 'whirlwind', prop: 'whirlwind', above: ABOVE, x: 1.2, y: 0.8, size: 0.32, opacity: 0 },
    { id: 'storm-heart', prop: 'halo', above: ABOVE, x: 0.56, y: 0.44, size: 0.14, opacity: 0 },
    // The wonders of creation, each behind its cloud.
    ...WONDERS.map((w): SceneActor => ({ id: w.id, prop: w.prop, above: ABOVE, x: w.x, y: w.y, size: w.size, facing: w.x < 0.5 ? 1 : -1, opacity: 0 })),
    ...WONDERS.map((w): SceneActor => ({ id: cloudOf(w.id), prop: 'storm-cloud', above: ABOVE, x: w.x, y: w.y - 0.03, size: 0.2, opacity: 0 })),
    { id: 'wonder-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.5, size: 0.12, opacity: 0 },
    person('job', 'job-mourning', 0.4, { pose: 'sit' }),
    ...FRIENDS.map((id, i) => person(id, id, 0.62 + i * 0.08, { facing: -1 })),
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

const scenes: StoryScene[] = [
  {
    id: 'l06-e5-s1',
    title: 'Out of the whirlwind',
    music: 'vivaldi-summer-presto',
    beats: [
      say(
        'Job had asked God to answer him. At last, God did.',
        // The sky darkens; the whirlwind sweeps in over the hills; a light at its heart.
        layer('storm-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('whirlwind', 0.5),
        actor('whirlwind', { x: 0.56 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 }),
        fadeIn('storm-heart', 1.5, 0.9),
        ...FRIENDS.map((id, i) => actor(id, { pose: 'pray' }, { seconds: 1, delay: 1.5 + i * 0.3 })),
      ),
      verse('JOB 38:1', actor('job', { pose: 'lift' }, { seconds: 1.5 }), actor('whirlwind', { size: 0.36 }, slow)),
      verse('JOB 38:4', camera({ zoom: 1.03, y: -0.01 }, slow)),
      verse('JOB 38:7', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l06-e5-s2',
    title: 'The wonders of creation',
    music: 'vivaldi-summer-presto',
    beats: [
      verse(
        'JOB 38:8',
        // The storm opens like a curtain, and the wonders lie behind its clouds.
        ...PEOPLE.map((id) => fadeOut(id)),
        actor('whirlwind', { opacity: 0.35 }, { seconds: 3 }),
        ...WONDERS.map((w, i) => fadeIn(cloudOf(w.id), 1 + i * 0.2)),
      ),
      verse('JOB 38:11'),
      play('where-were-you', {
        done: [
          ...WONDERS.map((w) => actor(w.id, { opacity: 1 }, { seconds: 0.5 })),
          ...WONDERS.map((w) => actor(cloudOf(w.id), { opacity: 0 }, { seconds: 0.5 })),
          actor('wonder-glow', { x: 0.5, y: 0.5, opacity: 0 }, { seconds: 0.5 }),
        ],
      }),
      verse('JOB 38:41', actor('raven', { size: 0.07 }, { seconds: 2, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l06-e5-s3',
    title: 'I lay my hand on my mouth',
    music: 'vivaldi-summer-presto',
    beats: [
      say(
        'God did not tell Job why he had suffered. Instead, he showed Job how great and how wise he is, and how he cares for every creature he has made.',
        // The storm quiets; Job kneels, his hand over his mouth.
        ...WONDERS.map((w) => fadeOut(w.id)),
        fadeOut('whirlwind'),
        fadeOut('storm-heart'),
        layer('storm-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        ...FRIENDS.map((id) => actor(id, { pose: 'kneel' }, { seconds: 0.5, delay: 1 })),
        actor('job', { pose: 'kneel' }, { seconds: 0.5, delay: 1 }),
        ...PEOPLE.map((id) => fadeIn(id, 1.5)),
      ),
      verse('JOB 40:4', camera({ zoom: 1.03, x: -0.02 }, slow)),
    ],
  },
  {
    id: 'l06-e5-s4',
    title: 'Now my eye sees thee',
    music: 'vivaldi-summer-presto',
    beats: [
      verse('JOB 42:2', layer('dawn-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }), camera({ zoom: 1, x: 0 }, slow), actor('job', { pose: 'lift' }, { seconds: 1.5, delay: 1 })),
      verse('JOB 42:5', camera({ zoom: 1.02 }, slow)),
      say('Job still did not know why. But he had met God, and that was enough.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: whirlwindSet, scenes }
