import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Friends' Arguments (Job 4–31), from the approved Level 6 script.
 *
 * Around a low fire, the friends take their turns: Eliphaz, the eldest, then Bildad and
 * Zophar, louder and louder, their words hanging in the air like smoke. They are sure that
 * Job's suffering must be his own fault. The player weighs what they said ("true or
 * twisted?", minigames/true-or-twisted): true of God, or twisted? Then Job, alone, looks
 * up at the evening sky, where a single star appears and glows (this episode's golden
 * thread: "Rabbi, who sinned?"), and says that his witness is in heaven.
 */

/** The friends' words for the play: who said each, the verse, and whether it is true of God. */
export const CLAIMS = [
  {
    speaker: 'Bildad',
    ref: 'JOB 8:3',
    answer: 'true',
    why: 'True. God is always just. But Bildad used it to say that Job was being punished, and he wasn’t.',
    hint: 'Look again. Is God ever unjust?',
  },
  {
    speaker: 'Eliphaz',
    ref: 'JOB 4:7',
    answer: 'twisted',
    why: 'Twisted. Job was innocent, and he was suffering. The innocent do suffer, and God has not forgotten them.',
    hint: 'Look again. Was Job innocent? And was he suffering?',
  },
  {
    speaker: 'Zophar',
    ref: 'JOB 11:6',
    answer: 'twisted',
    why: 'Twisted. God himself had called Job blameless. His suffering was not a punishment.',
    hint: 'Look again. What did God say about Job?',
  },
  {
    speaker: 'Eliphaz',
    ref: 'JOB 5:17',
    answer: 'true',
    why: 'True of God’s correction: he corrects those he loves, like a good father. But it was not the reason Job was suffering.',
    hint: 'Look again. Does a good father correct the children he loves?',
  },
] as const

const ABOVE = 'ash-heap'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, pose: 'sit', facing: 1, ...extra })
const FRIENDS = ['eliphaz', 'bildad', 'zophar']
const SMOKE = ['words-1', 'words-2', 'words-3']

export const argumentsSet: SceneDescription = {
  id: 'l06-arguments',
  title: 'The friends’ arguments',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'ash-heap', depth: 0.3 },
  ],
  actors: [
    // The evening star over Job: the golden thread.
    { id: 'star', prop: 'counted-star', above: 'night-sky', x: 0.8, y: 0.2, size: 0.024, opacity: 0 },
    { id: 'evening-star', prop: 'halo', above: 'night-sky', x: 0.8, y: 0.2, size: 0.08, opacity: 0 },
    { id: 'fire', prop: 'campfire', above: ABOVE, x: 0.7, y: 0.8, size: 0.045 },
    // The friends' words, hanging in the air like smoke.
    ...SMOKE.map((id, i): SceneActor => ({ id, prop: 'smoke', above: ABOVE, x: 0.44 + i * 0.08, y: 0.66, size: 0.09, pose: 'rising', opacity: 0 })),
    ...FRIENDS.map((id, i) => person(id, id, 0.44 + i * 0.08)),
    person('job', 'job-mourning', 0.82, { facing: -1 }),
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
const speak = (id: string, smoke: string, delay = 0) => [actor(id, { pose: 'lift' }, { seconds: 1, delay }), fadeIn(smoke, delay + 0.8, 0.7)]

const scenes: StoryScene[] = [
  {
    id: 'l06-e3-s1',
    title: 'Eliphaz speaks',
    music: 'bach-cello-suite-prelude',
    beats: [
      say(
        'At last the friends spoke. They were sure they knew why Job was suffering: God punishes the wicked, so Job must have done something wicked.',
        // Eliphaz, the eldest, stands.
        actor('eliphaz', { pose: 'idle' }, { seconds: 1, delay: 1 }),
        camera({ zoom: 1.03, x: 0.02 }, slow),
      ),
      verse('JOB 4:7', ...speak('eliphaz', 'words-1')),
      verse('JOB 4:8', actor('job', { facing: 1 }, { seconds: 0.4, delay: 1 }), actor('job', { facing: -1 }, { seconds: 0.4, delay: 1.6 }), actor('job', { facing: 1 }, { seconds: 0.4, delay: 2.2 }), actor('job', { facing: -1 }, { seconds: 0.4, delay: 2.8 })),
    ],
  },
  {
    id: 'l06-e3-s2',
    title: 'True, or twisted?',
    music: 'bach-cello-suite-prelude',
    beats: [
      verse('JOB 8:3', actor('eliphaz', { pose: 'sit' }, { seconds: 1 }), actor('bildad', { pose: 'idle' }, { seconds: 1 }), ...speak('bildad', 'words-2', 1)),
      verse('JOB 11:6', actor('bildad', { pose: 'sit' }, { seconds: 1 }), actor('zophar', { pose: 'idle' }, { seconds: 1 }), ...speak('zophar', 'words-3', 1), camera({ zoom: 1 }, slow)),
      play('true-or-twisted', { cues: [actor('zophar', { pose: 'sit' }, { seconds: 1 })] }),
      say('Some of what the friends said was true about God. But they used it to accuse a man God himself had called blameless.', ...SMOKE.map((id) => fadeOut(id))),
    ],
  },
  {
    id: 'l06-e3-s3',
    title: 'Job answers',
    music: 'bach-cello-suite-prelude',
    beats: [
      say(
        'Job would not pretend to be guilty. He longed to bring his case before God himself.',
        // The friends turn away; night falls, and a single star appears.
        ...FRIENDS.map((id, i) => actor(id, { pose: 'idle', facing: -1 }, { seconds: 1, delay: i * 0.4 })),
        ...FRIENDS.map((id, i) => actor(id, { x: 0.24 + i * 0.07, pose: 'walk' }, { seconds: 5, ease: 'inOutSine', delay: 1.5 + i * 0.4 })),
        ...FRIENDS.map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 6.5 + i * 0.4 })),
        layer('night-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        actor('fire', { size: 0.035 }, { seconds: 4, delay: 1 }),
        fadeIn('star', 0.5),
        fadeIn('evening-star', 0.5, 0.9),
        actor('job', { pose: 'lift' }, { seconds: 1.5, delay: 4 }),
      ),
      verse('JOB 16:19', camera({ zoom: 1.03, x: 0.02, y: -0.01 }, slow)),
      verse('JOB 23:10', camera({ zoom: 1, x: 0, y: 0 }, slow), actor('job', { pose: 'pray' }, { seconds: 1.5 })),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: argumentsSet, scenes }
