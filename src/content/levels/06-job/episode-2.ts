import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · Job's Lament (Job 2:11–3:26), from the approved Level 6 script.
 *
 * Job's three friends come from three directions, weep, and sit with him on the ground.
 * The player lets the days pass ("seven days", minigames/seven-days): the sun crosses the
 * sky, night falls, morning returns, and a mark is scratched in the dust for each day, and
 * no one speaks. Then Job cries out in the night, cursing the day of his birth, asking
 * God why; at last the first gray light of morning comes, which glows (this episode's
 * golden thread: "My God, my God, why hast thou forsaken me?").
 */

/** Where the sun stands as each day begins (low in the east), and the top of its path. */
export const SUN = { x: 0.88, y: 0.5, top: 0.16, west: 0.12 }
/** The seven marks scratched in the dust, one for each day. */
export const MARKS = Array.from({ length: 7 }, (_, i) => ({ id: `mark-${i + 1}`, x: 0.07 + i * 0.016, y: 0.8 }))

const ABOVE = 'ash-heap'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const FRIENDS = ['eliphaz', 'bildad', 'zophar']

export const lamentSet: SceneDescription = {
  id: 'l06-lament',
  title: 'Job’s lament',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'ash-heap', depth: 0.3 },
  ],
  actors: [
    // The sun crosses the sky above the evening (and sets under the night); the moon rises with the night.
    { id: 'sun', prop: 'sun', above: 'evening-sky', x: SUN.x, y: SUN.y, size: 0.07 },
    { id: 'moon', prop: 'moon', above: 'night-sky', x: 0.24, y: 0.22, size: 0.05, opacity: 0 },
    // The first gray light of morning: the golden thread.
    { id: 'first-light', prop: 'halo', above: 'dawn-sky', x: 0.62, y: 0.52, size: 0.16, opacity: 0 },
    ...MARKS.map((m): SceneActor => ({ id: m.id, prop: 'dust-mark', above: ABOVE, x: m.x, y: m.y, size: 0.012, opacity: 0 })),
    person('job', 'job-mourning', 0.5, { pose: 'sit', facing: 1 }),
    // The three friends, from three directions: from the west, from the east, and over the hill.
    person('eliphaz', 'eliphaz', -0.08, { facing: 1 }),
    person('bildad', 'bildad', 1.08),
    person('zophar', 'zophar', 0.74, { y: 0.7, size: 0.03, opacity: 0 }),
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
const walkTo = (id: string, x: number, delay = 0, seconds = 5, facing: -1 | 1 = x < 0.5 ? -1 : 1) => actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay })

const scenes: StoryScene[] = [
  {
    id: 'l06-e2-s1',
    title: 'Three friends',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'JOB 2:11',
        walkTo('eliphaz', 0.36, 0.5, 6, 1),
        walkTo('bildad', 0.64, 1, 6, -1),
        fadeIn('zophar', 1),
        actor('zophar', { x: 0.7, y: 0.785, size: 0.044, pose: 'walk', facing: -1 }, { seconds: 6, ease: 'inOutSine', delay: 1.5 }),
        ...FRIENDS.map((id) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay: 7.5 })),
      ),
      verse('JOB 2:12', ...FRIENDS.map((id, i) => actor(id, { pose: 'lift' }, { seconds: 1, delay: i * 0.4 })), camera({ zoom: 1.03 }, slow)),
      play('seven-days', {
        // They sit down on the ground around him.
        cues: [...FRIENDS.map((id, i) => actor(id, { pose: 'sit' }, { seconds: 1.2, delay: i * 0.3 })), camera({ zoom: 1 }, slow)],
        done: [
          layer('evening-sky', { opacity: 0 }, { seconds: 0.5 }),
          layer('night-sky', { opacity: 0 }, { seconds: 0.5 }),
          actor('sun', { x: SUN.x, y: SUN.y, opacity: 1 }, { seconds: 0.5 }),
          actor('moon', { opacity: 0 }, { seconds: 0.5 }),
          ...MARKS.map((m) => actor(m.id, { opacity: 1 }, { seconds: 0.5 })),
        ],
      }),
      verse('JOB 2:13'),
      say('Sometimes the best comfort is not words at all, but simply being there.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l06-e2-s2',
    title: '“Let the day perish”',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'JOB 3:1',
        // Night: Job lifts his face to the dark sky.
        camera({ zoom: 1 }, slow),
        actor('sun', { opacity: 0 }, { seconds: 2 }),
        layer('night-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('moon', 2, 0.8),
        actor('job', { pose: 'kneel' }, { seconds: 1.5, delay: 2 }),
      ),
      verse('JOB 3:3', camera({ zoom: 1.03, y: -0.01 }, slow)),
      verse('JOB 3:20', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l06-e2-s3',
    title: 'No rest',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'JOB 3:24',
        // Job bows his face into his hands; then, faintly, the first gray light on the hills.
        actor('job', { pose: 'sit' }, { seconds: 1.5 }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        actor('moon', { opacity: 0 }, { seconds: 3, delay: 1 }),
        fadeIn('first-light', 0.5, 0.9),
      ),
      verse('JOB 3:26', camera({ zoom: 1.02 }, slow)),
      say('Job did not curse God. He told God the truth about his pain. The Bible keeps his words, so that we know we can do the same.', camera({ zoom: 1 }, slow), actor('job', { pose: 'kneel' }, { seconds: 1.5, delay: 1 })),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: lamentSet, scenes }
