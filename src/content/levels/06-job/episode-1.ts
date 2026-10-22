import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · The Trial (Job 1:1–2:10), from the approved Level 6 script.
 *
 * Job, blameless and upright, prays at his altar at dawn while his children sleep. The
 * player lights up each of his blessings in the dawn ("Job's blessings",
 * minigames/jobs-blessings): his sons and daughters, his flocks and herds, his servants.
 * In the court of heaven, Satan asks to test him, and God sets a limit; the glow of Job
 * at prayer is this episode's golden thread (Jesus to Peter: "I have prayed for you").
 * Then messenger after messenger comes: everything is lost, even his children, and Job
 * worships. Among the ashes, his grieving wife tells him to curse God, and he will not.
 */

/** Job's blessings, as the play lights them: where each stands, and the thanks that rises. */
export const BLESSINGS = [
  { id: 'sons', prop: 'jobs-sons', x: 0.19, y: 0.785, size: 0.2, spread: 0.2, count: 1, title: 'His seven sons', thanks: 'Thank you, Lord, for my sons.' },
  { id: 'daughters', prop: 'jobs-daughters', x: 0.65, y: 0.785, size: 0.09, spread: 0.09, count: 1, title: 'His three daughters', thanks: 'Thank you, Lord, for my daughters.' },
  { id: 'sheep', prop: 'sheep', x: 0.31, y: 0.595, size: 0.024, spread: 0.14, count: 6, title: 'Seven thousand sheep', thanks: 'Thank you, Lord, for the flocks on the hills.' },
  { id: 'camels', prop: 'camel', x: 0.83, y: 0.6, size: 0.045, spread: 0.1, count: 3, title: 'Three thousand camels', thanks: 'Thank you, Lord, for the camels that carry our loads.' },
  { id: 'oxen', prop: 'ox', x: 0.56, y: 0.63, size: 0.04, spread: 0.07, count: 2, title: 'Five hundred yoke of oxen', thanks: 'Thank you, Lord, for the oxen that plow the fields.' },
  { id: 'donkeys', prop: 'donkey', x: 0.09, y: 0.6, size: 0.034, spread: 0.06, count: 2, title: 'Five hundred donkeys', thanks: 'Thank you, Lord, for the donkeys and their foals.' },
  { id: 'servants', prop: 'jobs-servants', x: 0.79, y: 0.785, size: 0.09, spread: 0.09, count: 1, title: 'Very many servants', thanks: 'Thank you, Lord, for everyone who works with me.' },
] as const
/** The glow that rises behind a blessing once it is lit. */
export const glowOf = (id: string) => `glow-${id}`
/** The sun: low behind the hills at dawn, and where it stands once everything is lit. */
export const SUN = { x: 0.8, low: 0.62, high: 0.26 }

const ABOVE = 'heaven-court'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const MESSENGERS = ['messenger-1', 'messenger-2', 'messenger-3']

export const trialSet: SceneDescription = {
  id: 'l06-trial',
  title: 'The trial',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'uz-pastures', depth: 0.3 },
    { id: 'ash-heap', depth: 0.3, opacity: 0 },
    { id: 'heaven-court', depth: 0.1, opacity: 0 },
  ],
  actors: [
    // The sun, low behind the hills at dawn.
    { id: 'sun', prop: 'sun', above: 'evening-sky', x: SUN.x, y: SUN.low, size: 0.07 },
    // Job's farmstead: the tent where his children sleep, and his altar.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.9, y: 0.775, size: 0.12, pose: 'closed' },
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.4, y: 0.78, size: 0.06, pose: 'lit' },
    { id: 'altar-smoke', prop: 'smoke-column', above: ABOVE, x: 0.4, y: 0.715, size: 0.05 },
    // His blessings, in the dawn, and the glow behind each one the play lights.
    ...BLESSINGS.map((b): SceneActor => ({ id: glowOf(b.id), prop: 'halo', above: ABOVE, x: b.x, y: b.y - 0.05, size: Math.min(0.14, b.spread + 0.04), opacity: 0 })),
    ...BLESSINGS.map((b, i): SceneActor => ({ id: b.id, prop: b.prop, above: ABOVE, x: b.x, y: b.y, size: b.size, facing: i % 2 ? -1 : 1, ...(b.count > 1 ? { group: { count: b.count, w: b.spread, h: b.y > 0.7 ? 0.006 : 0.03, seed: 61 + i, bob: b.y > 0.7 ? 0 : 0.002 } } : {}) })),
    { id: 'next-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.6, size: 0.1, opacity: 0 },
    // The court of heaven: the great light, the angels, and the accuser before it.
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.5, y: 0.24, size: 0.3, opacity: 0 },
    { id: 'angels', prop: 'angel', above: ABOVE, x: 0.42, y: 0.66, size: 0.04, opacity: 0, group: { count: 6, w: 0.5, h: 0.05, seed: 71, bob: 0.004 } },
    { id: 'accuser', prop: 'accuser', above: ABOVE, x: 0.82, y: 0.74, size: 0.07, facing: -1, opacity: 0 },
    // Job, and the glow of his prayer: the golden thread.
    person('job', 'job', 0.48, { pose: 'pray' }),
    { id: 'job-at-prayer', prop: 'halo', above: ABOVE, x: 0.45, y: 0.66, size: 0.1, opacity: 0 },
    ...MESSENGERS.map((id) => person(id, 'messenger', 1.12)),
    // Among the ashes: Job in sackcloth, and his wife.
    person('job-mourning', 'job-mourning', 0.46, { pose: 'sit', facing: 1, opacity: 0 }),
    person('wife', 'jobs-wife', 0.7, { opacity: 0 }),
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
const runIn = (id: string, x: number, delay: number) => [actor(id, { x, pose: 'walk', facing: -1 }, { seconds: 3, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + 3 })]
const FARM = ['job', 'tent', 'altar', 'altar-smoke', ...BLESSINGS.map((b) => b.id)]

const scenes: StoryScene[] = [
  {
    id: 'l06-e1-s1',
    title: 'A man in the land of Uz',
    music: 'handel-sarabande',
    beats: [
      verse('JOB 1:1', fadeIn('job-at-prayer', 1, 0.9), camera({ zoom: 1.03, x: -0.01 }, slow)),
      verse('JOB 1:2', camera({ zoom: 1, x: 0 }, slow)),
      play('jobs-blessings', {
        cues: [actor('job', { pose: 'lift' }, { seconds: 1 })],
        done: [
          ...BLESSINGS.map((b) => actor(glowOf(b.id), { opacity: 0 }, { seconds: 1 })),
          actor('next-glow', { x: 0.5, y: 0.6, opacity: 0 }, { seconds: 0.5 }),
          actor('sun', { y: SUN.high }, { seconds: 1 }),
          layer('forest-sky', { opacity: 1 }, { seconds: 1 }),
        ],
      }),
      verse('JOB 1:3', actor('job', { pose: 'idle' }, { seconds: 1 }), camera({ zoom: 1.02 }, slow)),
      say(
        'Every time his children had held a feast, Job rose early and offered a sacrifice for each of them, in case they had sinned. He loved God, and he loved his children.',
        camera({ zoom: 1 }, slow),
        actor('job', { pose: 'pray' }, { seconds: 1, delay: 0.5 }),
      ),
    ],
  },
  {
    id: 'l06-e1-s2',
    title: 'In the court of heaven',
    music: 'handel-sarabande',
    beats: [
      say(
        'The Bible lets us see what Job could not: a day when the angels came before God, and Satan came among them.',
        // Above the clouds: the great light, and the angels before it.
        ...FARM.map((id) => fadeOut(id)),
        fadeOut('job-at-prayer'),
        layer('heaven-court', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 1 }),
        fadeIn('glory', 2.5),
        fadeIn('angels', 3),
        fadeIn('accuser', 4.5),
      ),
      verse('JOB 1:8', actor('glory', { size: 0.34 }, slow)),
      verse('JOB 1:9', actor('accuser', { x: 0.72 }, { seconds: 3, ease: 'inOutSine' })),
      verse('JOB 1:11', actor('accuser', { x: 0.68 }, { seconds: 2, ease: 'inOutSine' })),
      verse('JOB 1:12', actor('glory', { size: 0.3 }, slow), actor('accuser', { x: 0.95, opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay: 3 })),
    ],
  },
  {
    id: 'l06-e1-s3',
    title: 'The messengers',
    music: 'handel-sarabande',
    beats: [
      say(
        'One day, messenger after messenger came running to Job. Raiders had taken the oxen and donkeys. Fire had fallen on the sheep. The camels had been carried off.',
        // Back at the farmstead, the hills empty; the messengers come one after another.
        fadeOut('glory'),
        fadeOut('angels'),
        layer('heaven-court', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        actor('job', { x: 0.42, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('job', 1.5),
        fadeIn('tent', 1.5),
        ...runIn('messenger-1', 0.6, 2.5),
        ...runIn('messenger-2', 0.7, 5),
        ...runIn('messenger-3', 0.8, 7.5),
      ),
      say('Then the worst news of all: a great wind had struck the house where his sons and daughters were feasting, and they had died.', actor('messenger-1', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.03, x: -0.02 }, slow)),
      verse(
        'JOB 1:20',
        actor('messenger-1', { pose: 'idle' }, { seconds: 1 }),
        ...MESSENGERS.map((id, i) => actor(id, { x: 1.12, pose: 'walk', facing: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 + i * 0.6 })),
        ...MESSENGERS.map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 5 + i * 0.6 })),
        actor('job', { pose: 'kneel' }, { seconds: 1.5, delay: 1.5 }),
      ),
      verse('JOB 1:21', actor('job', { pose: 'pray' }, { seconds: 1.5 })),
      verse('JOB 1:22', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l06-e1-s4',
    title: 'Among the ashes',
    music: 'handel-sarabande',
    beats: [
      say(
        'Satan came before God again, and God allowed Job’s own body to be struck, but not his life.',
        // Evening, outside the town: Job alone among the ashes, in sackcloth.
        fadeOut('job'),
        fadeOut('tent'),
        ...swap('uz-pastures', 'ash-heap'),
        ...swap('forest-sky', 'evening-sky'),
        actor('sun', { y: SUN.low, opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        fadeIn('job-mourning', 2.5),
      ),
      verse('JOB 2:8', camera({ zoom: 1.03, x: -0.01 }, slow)),
      verse('JOB 2:9', fadeIn('wife'), actor('wife', { x: 0.58, pose: 'walk' }, { seconds: 3, ease: 'inOutSine' }), actor('wife', { pose: 'lift' }, { seconds: 0.8, delay: 3 })),
      verse('JOB 2:10', actor('wife', { pose: 'idle' }, { seconds: 1 })),
      say(
        'His wife had lost her children too. Her words came from grief. Job did not stop loving her, or God.',
        camera({ zoom: 1, x: 0 }, slow),
        actor('job-mourning', { facing: -1 }, { seconds: 0.5 }),
        actor('wife', { x: 0.54, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 1 }),
        actor('wife', { pose: 'sit' }, { seconds: 1, delay: 3 }),
      ),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: trialSet, scenes }
