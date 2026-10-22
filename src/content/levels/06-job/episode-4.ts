import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · "I Know That My Redeemer Lives" (Job 19), from the approved Level 6 script.
 *
 * Job sits alone among the ashes; people pass by and turn their faces away. He wishes his
 * words could be carved in the rock for ever. Then, in the darkest place, he says, "I know
 * that my Redeemer lives," and his words are carved into the great rock beside him in
 * letters of light, which glow (this episode's golden thread: "I am the resurrection and
 * the life"). The player learns them by heart ("carved in the rock",
 * minigames/carved-in-the-rock), choosing the missing words, and each is carved back.
 */

/** Job 19:25 in the play: the words, and the four that fade and are carved back, one to a line on the rock. */
export const REDEEMER = {
  text: 'For I know that my Redeemer lives, and at last he will stand upon the earth;',
  missing: ['Redeemer', 'lives', 'stand', 'earth'],
  others: ['brother', 'sleeps', 'fall', 'sea'],
}
/** The lines carved in the rock, from the top. */
export const LINES = [0, 1, 2, 3].map((i) => ({ id: `line-${i + 1}`, x: 0.74 + (i % 2) * 0.01, y: 0.3 + i * 0.08 }))
/** How faint a line is while its word is missing. */
export const FAINT = 0.25

const ABOVE = 'rock-face'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: 1, ...extra })

export const redeemerSet: SceneDescription = {
  id: 'l06-redeemer',
  title: 'I know that my Redeemer lives',
  layers: [
    { id: 'gray-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'ash-heap', depth: 0.3 },
    { id: 'rock-face', depth: 0.3 },
  ],
  actors: [
    // The words carved in the rock, and their glow: the golden thread.
    { id: 'carved-words', prop: 'halo', above: ABOVE, x: 0.745, y: 0.42, size: 0.26, opacity: 0 },
    ...LINES.map((l): SceneActor => ({ id: l.id, prop: 'carved-line', above: ABOVE, x: l.x, y: l.y, size: 0.2, opacity: 0 })),
    // People passing by on the road, turning away; children pointing.
    { id: 'passers-by', prop: 'crowd', above: ABOVE, x: -0.12, y: 0.77, size: 0.09, facing: 1 },
    person('boy', 'boy', -0.1, { size: 0.026, y: 0.79 }),
    person('girl', 'girl', -0.14, { size: 0.026, y: 0.79 }),
    person('job', 'job-mourning', 0.46, { pose: 'sit' }),
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

const scenes: StoryScene[] = [
  {
    id: 'l06-e4-s1',
    title: 'Alone',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      say(
        'Job’s friends had turned against him. Even his servants and his neighbors had forgotten him.',
        // People pass by on the road and look away; the children point.
        actor('passers-by', { x: 1.15, pose: 'walk' }, { seconds: 12, ease: 'inOutSine' }),
        actor('passers-by', { facing: -1 }, { seconds: 0.4, delay: 4 }),
        actor('passers-by', { facing: 1 }, { seconds: 0.4, delay: 6 }),
        actor('boy', { x: 0.3, pose: 'walk' }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        actor('girl', { x: 0.26, pose: 'walk' }, { seconds: 4, ease: 'inOutSine', delay: 1.2 }),
        actor('boy', { pose: 'idle' }, { seconds: 0.4, delay: 5 }),
        actor('girl', { pose: 'idle', facing: -1 }, { seconds: 0.4, delay: 5.2 }),
        actor('girl', { facing: 1 }, { seconds: 0.4, delay: 6.4 }),
      ),
      verse(
        'JOB 19:23',
        ...['boy', 'girl'].map((id, i) => actor(id, { x: -0.12, pose: 'walk', facing: -1 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 + i * 0.2 })),
        ...['boy', 'girl'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 4.8 })),
        actor('passers-by', { pose: 'idle' }, { seconds: 0.4, delay: 1 }),
        camera({ zoom: 1.03, x: 0.02 }, slow),
      ),
      verse('JOB 19:24', actor('job', { facing: 1 }, { seconds: 0.5 }), camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l06-e4-s2',
    title: '“I know that my Redeemer lives”',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      say('Then, in the darkest place, Job said something astonishing.', actor('job', { pose: 'lift' }, { seconds: 1.5, delay: 0.5 })),
      verse(
        'JOB 19:25',
        // As he speaks, his words are carved into the rock in letters of light.
        ...LINES.map((l, i) => fadeIn(l.id, 0.3 + i * 0.5)),
        fadeIn('carved-words', 0.5, 0.72),
        camera({ zoom: 1.02, x: 0.02 }, slow),
      ),
      play('carved-in-the-rock', { cues: [camera({ zoom: 1, x: 0 }, slow)], done: LINES.map((l) => actor(l.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('JOB 19:26', actor('job', { pose: 'pray' }, { seconds: 1.5 })),
      verse('JOB 19:27', camera({ zoom: 1.03, x: 0.03, y: -0.01 }, slow)),
    ],
  },
  {
    id: 'l06-e4-s3',
    title: 'Words graven for ever',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      say(
        'A redeemer, in Job’s time, was a close relative who stood up for you: who bought you back from slavery, or defended your name. Job believed that God himself would be his Redeemer, and that he would see him.',
        // Night falls, and the carved words glow on, and stay.
        camera({ zoom: 1, x: 0, y: 0 }, slow),
        layer('evening-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 4 }),
      ),
      say('Job’s wish came true. His words were written in a book, and they have been read for thousands of years.', actor('job', { pose: 'sit' }, { seconds: 1.5 }), fadeOut('passers-by')),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: redeemerSet, scenes }
