import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · Flight to Midian (Exodus 2:11–25), from the approved Level 7 script.
 *
 * Moses, grown up, goes out to his people and sees an Egyptian beating a Hebrew; he kills
 * him, in secret (told in a few words, nothing shown). The next day his own people turn on
 * him, "Who made you a prince and a judge over us?", and he flees to Midian. At a well
 * there, shepherds drive away the seven daughters of the priest of Midian, and Moses stands
 * up for them; the player helps him draw water for their flock ("watering the flock",
 * minigames/watering-the-flock). The well glows (this episode's golden thread: the
 * deliverer his own refused). Moses settles in Midian; years later, God hears his people's
 * cry.
 */

/** The well, the bucket's way up out of it, and the four troughs with their part of the flock. */
export const WELL = { x: 0.43, y: 0.78 }
export const BUCKET = { down: 0.8, up: 0.68 }
export const TROUGHS = [0.56, 0.67, 0.78, 0.89].map((x, i) => ({ id: `trough-${i + 1}`, water: `water-${i + 1}`, flock: `flock-${i + 1}`, x, y: 0.79, flockFrom: 0.7, flockTo: 0.745 }))

const ABOVE = 'desert'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const PITS = ['workers', 'taskmaster', 'beaten', 'quarreler-1', 'quarreler-2']
const WELLSIDE = ['well', 'bucket', 'daughters', 'shepherds', 'midian-well', ...TROUGHS.flatMap((t) => [t.id, t.water, t.flock])]

export const midianSet: SceneDescription = {
  id: 'l07-midian',
  title: 'Flight to Midian',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'brick-pits', depth: 0.3 },
    { id: 'desert', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The brick pits: the workers, a taskmaster and the Hebrew he beats; the next day, two Hebrews quarrelling.
    person('workers', 'hebrew-workers', 0.2, { size: 0.15, facing: 1 }),
    person('taskmaster', 'taskmaster', 0.66, { pose: 'lift' }),
    person('beaten', 'slave', 0.6, { pose: 'sit', facing: 1 }),
    person('quarreler-1', 'slave', 0.58, { facing: 1, opacity: 0 }),
    person('quarreler-2', 'brother', 0.66, { opacity: 0 }),
    // At the well in Midian: the troughs and the flock, the seven daughters, the shepherds.
    { id: 'well', prop: 'stone-well', above: ABOVE, ...WELL, size: 0.08, opacity: 0 },
    { id: 'midian-well', prop: 'halo', above: ABOVE, x: WELL.x, y: 0.69, size: 0.1, opacity: 0 },
    { id: 'bucket', prop: 'water-jar', above: ABOVE, x: WELL.x + 0.005, y: BUCKET.down, size: 0.022, opacity: 0 },
    ...TROUGHS.flatMap((t, i): SceneActor[] => [
      { id: t.flock, prop: 'sheep', above: ABOVE, x: t.x, y: t.flockFrom, size: 0.024, facing: -1, opacity: 0, group: { count: 3, w: 0.07, h: 0.01, seed: 111 + i, bob: 0.002 } },
      { id: t.id, prop: 'trough', above: ABOVE, x: t.x, y: t.y, size: 0.08, opacity: 0 },
      { id: t.water, prop: 'trough-water', above: ABOVE, x: t.x, y: t.y, size: 0.08, opacity: 0 },
    ]),
    person('daughters', 'reuel-daughters', 0.17, { size: 0.19, facing: 1, opacity: 0 }),
    person('shepherds', 'crowd', 1.15, { size: 0.09 }),
    // Moses: a prince of Egypt, then a shepherd in Midian.
    person('moses', 'moses-prince', 0.3, { facing: 1 }),
    person('moses-shepherd', 'moses-shepherd', 0.5, { opacity: 0 }),
    { id: 'shepherds-flock', prop: 'sheep', above: ABOVE, x: 0.66, y: 0.77, size: 0.026, opacity: 0, group: { count: 5, w: 0.14, h: 0.02, seed: 121, bob: 0.002 } },
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
const walkTo = (id: string, x: number, delay = 0, seconds = 4, facing: -1 | 1 = x < 0.5 ? -1 : 1) => [actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds })]

const scenes: StoryScene[] = [
  {
    id: 'l07-e3-s1',
    title: 'Among his people',
    music: 'dvorak-largo',
    beats: [
      verse('EXO 2:11', ...walkTo('moses', 0.46, 0.5, 4, 1), camera({ zoom: 1.03, x: 0.02 }, slow)),
      say(
        'Moses looked this way and that. He was angry, and he struck the Egyptian, and the man died. Moses hid him in the sand.',
        // Nothing is shown: the taskmaster is simply gone, and the beaten man gets up and flees.
        actor('moses', { facing: -1 }, { seconds: 0.4, delay: 0.5 }),
        actor('moses', { facing: 1 }, { seconds: 0.4, delay: 1.3 }),
        camera({ zoom: 1, x: 0 }, slow),
        fadeOut('taskmaster', 2),
        actor('beaten', { pose: 'idle' }, { seconds: 0.6, delay: 3 }),
        ...walkTo('beaten', 1.12, 3.5, 4, 1),
      ),
      say('He wanted to help his people. But he did it in his own way, with violence, and in secret.', actor('moses', { pose: 'kneel' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l07-e3-s2',
    title: '“Who made you a prince?”',
    music: 'dvorak-largo',
    beats: [
      verse(
        'EXO 2:13',
        // The next day: two Hebrews quarrelling; Moses steps between them.
        actor('moses', { x: 0.42, pose: 'idle', facing: 1 }, { seconds: 0.1 }),
        fadeIn('quarreler-1', 0.5),
        fadeIn('quarreler-2', 0.5),
        actor('quarreler-2', { pose: 'lift' }, { seconds: 0.6, delay: 1.5 }),
        actor('quarreler-2', { pose: 'idle' }, { seconds: 0.6, delay: 2.5 }),
        ...walkTo('moses', 0.5, 3, 1.5, 1),
        actor('moses', { pose: 'carry' }, { seconds: 0.6, delay: 4.6 }),
      ),
      verse('EXO 2:14', actor('quarreler-1', { pose: 'lift', facing: -1 }, { seconds: 0.6 }), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 3 }), ...walkTo('moses', 0.42, 4, 1.5, -1)),
      verse(
        'EXO 2:15',
        // He flees into the desert, and sits down by a well.
        ...walkTo('moses', -0.1, 0.3, 3, -1),
        ...PITS.map((id) => fadeOut(id, 1)),
        ...swap('brick-pits', 'desert', 2),
        fadeIn('well', 4),
        ...TROUGHS.flatMap((t) => [fadeIn(t.id, 4), fadeIn(t.flock, 4.5)]),
        actor('moses', { x: 1.1, pose: 'walk', facing: -1 }, { seconds: 0.1, delay: 4 }),
        ...walkTo('moses', WELL.x - 0.05, 4.5, 4, -1),
        actor('moses', { pose: 'sit' }, { seconds: 0.8, delay: 8.6 }),
      ),
    ],
  },
  {
    id: 'l07-e3-s3',
    title: 'At the well',
    music: 'dvorak-largo',
    beats: [
      verse(
        'EXO 2:16',
        // The seven daughters come to draw water; the well glows.
        fadeIn('daughters', 0.5),
        fadeIn('bucket', 1),
        fadeIn('midian-well', 0.5, 0.9),
        ...walkTo('daughters', 0.24, 1, 3, 1),
      ),
      verse(
        'EXO 2:17',
        // The shepherds push in and drive them away; Moses stands up.
        ...walkTo('shepherds', 0.66, 0, 3, -1),
        ...walkTo('daughters', 0.14, 2.5, 2, -1),
        actor('moses', { pose: 'idle', facing: 1 }, { seconds: 0.8, delay: 3.5 }),
        actor('moses', { pose: 'lift' }, { seconds: 0.6, delay: 4.5 }),
        ...walkTo('shepherds', 1.2, 5.5, 3, 1),
        actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 6 }),
        actor('daughters', { facing: 1 }, { seconds: 0.4, delay: 6 }),
      ),
      play('watering-the-flock', {
        done: [
          actor('bucket', { y: BUCKET.down }, { seconds: 0.5 }),
          actor('moses', { pose: 'idle', facing: 1 }, { seconds: 0.5 }),
          ...TROUGHS.flatMap((t) => [actor(t.water, { opacity: 1 }, { seconds: 0.5 }), actor(t.flock, { y: t.flockTo }, { seconds: 0.5 })]),
        ],
      }),
      verse('EXO 2:19', ...walkTo('daughters', -0.15, 0.5, 4, -1)),
      verse('EXO 2:20', ...walkTo('moses', -0.1, 1, 3.5, -1)),
      say(
        'Moses stayed with Reuel, the priest of Midian, and married his daughter Zipporah.',
        ...WELLSIDE.map((id) => fadeOut(id)),
        fadeOut('moses'),
        camera({ zoom: 1.02 }, slow),
      ),
      verse('EXO 2:22', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l07-e3-s4',
    title: 'God heard their groaning',
    music: 'dvorak-largo',
    beats: [
      verse(
        'EXO 2:23',
        // Far away in Egypt, at evening, the slaves still toil, and lift their faces to the sky.
        ...swap('desert', 'brick-pits'),
        ...swap('forest-sky', 'evening-sky'),
        actor('workers', { x: 0.42, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('workers', 1.5),
        actor('beaten', { x: 0.62, pose: 'pray', facing: -1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('beaten', 1.5),
      ),
      verse(
        'EXO 2:24',
        // Years pass over Midian: Moses, older, with his flock under the stars.
        ...['workers', 'beaten'].map((id) => fadeOut(id)),
        ...swap('brick-pits', 'desert', 1),
        ...swap('evening-sky', 'night-sky', 1),
        fadeIn('moses-shepherd', 2.5),
        fadeIn('shepherds-flock', 2.5),
      ),
      verse('EXO 2:25', actor('moses-shepherd', { pose: 'pray' }, { seconds: 1.5, delay: 0.5 }), camera({ zoom: 1.03, y: -0.01 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: midianSet, scenes }
