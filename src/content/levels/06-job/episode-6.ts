import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · Restored (Job 42:7–17), from the approved Level 6 script.
 *
 * God tells the three friends that they have not spoken rightly of him, and sends them to
 * Job with bulls and rams for an offering. Job prays for the men who accused him; his
 * prayer glows (this episode's golden thread: "You have heard of the steadfastness of
 * Job"), and God restores his fortunes. Green returns to the hills, and the player calls
 * Job's new herds home to the fold ("home to the fold", minigames/home-to-the-fold), twice
 * as many as before. Years later, Job, white-haired, feasts with his seven sons and three
 * daughters, his grandchildren and great-grandchildren all around.
 */

/** Job's new herds: where each grazes on the hills, where it comes to rest in the fold, and the count doubled. */
export const HERDS = [
  { id: 'sheep', prop: 'sheep', from: { x: 0.5, y: 0.6 }, to: { x: 0.72, y: 0.745 }, size: 0.026, count: 9, title: 'Fourteen thousand sheep', text: 'Seven thousand before; now fourteen thousand.' },
  { id: 'camels', prop: 'camel', from: { x: 0.88, y: 0.57 }, to: { x: 0.88, y: 0.73 }, size: 0.045, count: 3, title: 'Six thousand camels', text: 'Three thousand before; now six thousand.' },
  { id: 'oxen', prop: 'ox', from: { x: 0.62, y: 0.6 }, to: { x: 0.8, y: 0.77 }, size: 0.04, count: 3, title: 'A thousand yoke of oxen', text: 'Five hundred before; now a thousand.' },
  { id: 'donkeys', prop: 'donkey', from: { x: 0.74, y: 0.59 }, to: { x: 0.65, y: 0.78 }, size: 0.034, count: 3, title: 'A thousand donkeys', text: 'Five hundred before; now a thousand.' },
] as const

const ABOVE = 'home-fold'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const FRIENDS = ['eliphaz', 'bildad', 'zophar']
const DAUGHTERS = ['jemimah', 'keziah', 'keren-happuch']

export const restoredSet: SceneDescription = {
  id: 'l06-restored',
  title: 'Restored',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'green-hills', depth: 0.3 },
    { id: 'ash-heap', depth: 0.3 },
    { id: 'home-fold', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The new herds out on the green hills, waiting to be called home.
    ...HERDS.map((h, i): SceneActor => ({ id: h.id, prop: h.prop, above: ABOVE, ...h.from, size: h.size, facing: 1, opacity: 0, group: { count: h.count, w: 0.09, h: 0.025, seed: 81 + i, bob: 0.002 } })),
    { id: 'herd-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.6, size: 0.1, opacity: 0 },
    // The altar, and the friends' offering of bulls and rams.
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.1, y: 0.78, size: 0.06, pose: 'idle' },
    { id: 'altar-smoke', prop: 'smoke-column', above: ABOVE, x: 0.1, y: 0.715, size: 0.05, opacity: 0 },
    { id: 'bulls', prop: 'ox', above: ABOVE, x: 0.55, y: 0.79, size: 0.04, facing: -1, opacity: 0, group: { count: 3, w: 0.07, h: 0.006, seed: 91, bob: 0 } },
    { id: 'rams', prop: 'sheep', above: ABOVE, x: 0.63, y: 0.79, size: 0.028, facing: -1, opacity: 0, group: { count: 3, w: 0.05, h: 0.006, seed: 92, bob: 0 } },
    // Job, and his prayer for his friends: the golden thread.
    person('job', 'job-mourning', 0.2, { pose: 'sit', facing: 1 }),
    person('job-restored', 'job', 0.19, { facing: -1, pose: 'pray', opacity: 0 }),
    { id: 'job-prays-for-friends', prop: 'halo', above: ABOVE, x: 0.16, y: 0.66, size: 0.1, opacity: 0 },
    ...FRIENDS.map((id, i) => person(id, id, 1.1 + i * 0.07)),
    // Years later: the feast, with Job's children and grandchildren.
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.5, y: 0.8, size: 0.16, opacity: 0 },
    { id: 'lamp-1', prop: 'oil-lamp', above: ABOVE, x: 0.42, y: 0.79, size: 0.02, opacity: 0 },
    { id: 'lamp-2', prop: 'oil-lamp', above: ABOVE, x: 0.58, y: 0.79, size: 0.02, opacity: 0 },
    { id: 'sons', prop: 'jobs-sons', above: ABOVE, x: 0.2, y: 0.785, size: 0.22, facing: 1, opacity: 0 },
    ...DAUGHTERS.map((id, i) => person(id, 'daughter', 0.64 + i * 0.05, { size: 0.04, opacity: 0 })),
    { id: 'grandsons', prop: 'boy', above: ABOVE, x: 0.82, y: 0.79, size: 0.024, facing: -1, opacity: 0, group: { count: 4, w: 0.1, h: 0.006, seed: 94, bob: 0 } },
    { id: 'granddaughters', prop: 'girl', above: ABOVE, x: 0.12, y: 0.79, size: 0.024, facing: 1, opacity: 0, group: { count: 3, w: 0.08, h: 0.006, seed: 95, bob: 0 } },
    person('job-old', 'job-old', 0.5, { y: 0.78, facing: 1, opacity: 0 }),
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
    id: 'l06-e6-s1',
    title: '“You have not spoken of me what is right”',
    music: 'handel-hallelujah',
    beats: [
      verse(
        'JOB 42:7',
        // The three friends come, ashamed, leading bulls and rams; Job rises to meet them.
        ...FRIENDS.map((id, i) => actor(id, { x: 0.3 + i * 0.07, pose: 'walk' }, { seconds: 6, ease: 'inOutSine', delay: 0.5 + i * 0.3 })),
        ...FRIENDS.map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 6.5 + i * 0.3 })),
        fadeIn('bulls', 2),
        fadeIn('rams', 2.3),
        actor('job', { pose: 'idle' }, { seconds: 1.5, delay: 4 }),
      ),
      verse('JOB 42:8', ...FRIENDS.map((id, i) => actor(id, { pose: 'kneel' }, { seconds: 1, delay: 1 + i * 0.3 })), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l06-e6-s2',
    title: 'Job prays for his friends',
    music: 'handel-hallelujah',
    beats: [
      verse(
        'JOB 42:10',
        // Job at the altar, praying for the men who accused him; then green returns to the hills.
        camera({ zoom: 1 }, slow),
        actor('altar', { pose: 'lit' }, { seconds: 1 }),
        fadeIn('altar-smoke', 0.5),
        actor('job', { pose: 'lift', facing: -1 }, { seconds: 1.5 }),
        fadeIn('job-prays-for-friends', 0.5, 0.9),
        layer('ash-heap', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 3 }),
        layer('home-fold', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 4 }),
        fadeOut('job', 3),
        fadeIn('job-restored', 3),
        fadeOut('bulls', 3),
        fadeOut('rams', 3),
        ...HERDS.map((h, i) => fadeIn(h.id, 4.5 + i * 0.3)),
      ),
      play('home-to-the-fold', {
        cues: [...FRIENDS.map((id) => actor(id, { pose: 'idle' }, { seconds: 1 }))],
        done: [
          ...HERDS.map((h) => actor(h.id, { ...h.to, pose: 'idle', facing: 1 }, { seconds: 0.5 })),
          actor('herd-glow', { x: 0.5, y: 0.6, opacity: 0 }, { seconds: 0.5 }),
        ],
      }),
      say('Job prayed for the friends who had hurt him. It was then that God restored him.', camera({ zoom: 1.02, x: -0.02 }, slow)),
    ],
  },
  {
    id: 'l06-e6-s3',
    title: 'The latter days',
    music: 'handel-hallelujah',
    beats: [
      verse(
        'JOB 42:12',
        // Years later: an evening feast, the lamps lit, the family all around.
        camera({ zoom: 1, x: 0 }, slow),
        ...['job-restored', 'job-prays-for-friends', 'altar', 'altar-smoke', ...FRIENDS, ...HERDS.map((h) => h.id)].map((id) => fadeOut(id)),
        layer('home-fold', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('forest-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay: 1 }),
        layer('evening-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay: 1 }),
        fadeIn('job-old', 2.5),
        ...['mat', 'lamp-1', 'lamp-2'].map((id) => fadeIn(id, 2.5)),
      ),
      verse('JOB 42:13', fadeIn('sons'), ...DAUGHTERS.map((id, i) => fadeIn(id, 0.5 + i * 0.3))),
      verse('JOB 42:14', ...DAUGHTERS.map((id, i) => actor(id, { pose: 'lift' }, { seconds: 0.8, delay: 0.5 + i * 1.2 })), ...DAUGHTERS.map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.8, delay: 1.5 + i * 1.2 }))),
      verse('JOB 42:16', fadeIn('grandsons'), fadeIn('granddaughters', 0.5), camera({ zoom: 1.03 }, slow)),
      say('Then Job died, an old man, full of days.', camera({ zoom: 1 }, slow), actor('job-old', { pose: 'pray' }, { seconds: 1.5 })),
      say(
        'The children Job had lost were not replaced: they were still his, and they were with God. The Book of Job does not say that every sorrow is undone on earth. It says that God is faithful, and that he has the last word.',
        camera({ zoom: 1.02, y: -0.01 }, slow),
        actor('job-old', { pose: 'lift' }, { seconds: 1.5, delay: 1 }),
      ),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: restoredSet, scenes }
