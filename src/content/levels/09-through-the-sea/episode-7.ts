import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 7 · Jethro's Advice (Exodus 18), from the approved Level 9 script.
 *
 * Jethro, the priest of Midian, comes to the camp at the mountain of God with Zipporah and
 * her two sons; Moses tells him all the LORD has done, and Jethro blesses the LORD. The next
 * day Moses sits to judge the people from morning till evening, alone. "What you are doing
 * is not good," Jethro tells him: choose able men, and let them judge the small matters, and
 * bring the great ones to you. The player sends each person in the line to the right one
 * ("sharing the load", minigames/sharing-the-load), and the new leaders, standing together,
 * glow (this episode's golden thread: Jesus appoints the Twelve).
 */

/** The matters the people bring, and whether each is great (for Moses) or small (for the leaders). */
export const CASES = [
  { text: 'A man has lost a sheep, and his neighbor has found one just like it.', great: false },
  { text: 'Two brothers quarrel over whose turn it is to carry the water.', great: false },
  { text: 'A question no one has asked before: what does God want of his people in this?', great: true },
  { text: 'A borrowed cooking pot came back broken.', great: false },
  { text: 'Two families argue over where one tent’s ground ends and the next begins.', great: false },
  { text: 'A hard case: the leaders themselves cannot agree what is just.', great: true },
  { text: 'A child has wandered off, and his mother is looking for him.', great: false },
  { text: 'A man asks for his case to be brought before God.', great: true },
]
export const ANSWERS = [
  { id: 'leaders', text: 'One of the new leaders: a small matter.' },
  { id: 'moses', text: 'Moses: a great matter.' },
]
/** The people waiting in line, group by group, and the leaders Moses chooses. */
export const LINE = ['line-1', 'line-2', 'line-3', 'line-4']
export const LEADERS = [
  { id: 'leader-1', prop: 'elder', x: 0.42 },
  { id: 'leader-2', prop: 'hebrew-father', x: 0.56 },
  { id: 'leader-3', prop: 'slave', x: 0.7 },
  { id: 'leader-4', prop: 'brother', x: 0.84 },
].map((l, i) => ({ ...l, glow: `leader-glow-${i + 1}` }))

const ABOVE = 'horeb'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const jethroSet: SceneDescription = {
  id: 'l09-jethro',
  title: 'Jethro’s advice',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
  ],
  actors: [
    // The camp at the mountain of God: Moses' tent, and the awning where he sits to judge.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.2, y: 0.76, size: 0.12, pose: 'open', facing: 1 },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.348, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.33, { facing: 1 }),
    // Jethro, Zipporah and Moses' two sons, arriving.
    person('jethro', 'jethro', 1.1),
    person('zipporah', 'zipporah', 1.17),
    person('gershom', 'boy', 1.22, { size: 0.03, y: 0.79 }),
    person('eliezer', 'boy', 1.26, { size: 0.026, y: 0.79 }),
    // The long line of people waiting with their matters.
    ...LINE.map((id, i) => person(id, i % 2 ? 'hebrew-workers' : 'hebrew-family', 0.5 + i * 0.13, { size: 0.12, opacity: 0 })),
    // The leaders Moses chooses, and the glow of each as he helps the people sent to him.
    ...LEADERS.map((l) => person(l.id, l.prop, l.x, { y: 0.795, opacity: 0 })),
    ...LEADERS.map((l): SceneActor => ({ id: l.glow, prop: 'halo', above: ABOVE, x: l.x, y: 0.68, size: 0.06, opacity: 0 })),
    { id: 'moses-glow', prop: 'halo', above: ABOVE, x: 0.33, y: 0.68, size: 0.06, opacity: 0 },
    // The new leaders standing together, who glow: the golden thread.
    { id: 'leaders-glow', prop: 'halo', above: ABOVE, x: 0.63, y: 0.66, size: 0.16, opacity: 0 },
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
const walkIn = (id: string, x: number, delay: number) => [actor(id, { x, pose: 'walk' }, { seconds: 4, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + 4 })]

const scenes: StoryScene[] = [
  {
    id: 'l09-e7-s1',
    title: 'Jethro comes',
    music: 'be-thou-my-vision',
    beats: [
      verse('EXO 18:5', ...walkIn('jethro', 0.62, 0.5), ...walkIn('zipporah', 0.7, 0.8), ...walkIn('gershom', 0.76, 1), ...walkIn('eliezer', 0.8, 1.1)),
      verse('EXO 18:7', actor('moses', { x: 0.52, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }), actor('rod', { x: 0.538 }, { seconds: 2, ease: 'inOutSine' }), actor('moses', { pose: 'kneel' }, { seconds: 0.6, delay: 2 }), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 4 })),
      verse('EXO 18:8', actor('moses', { pose: 'lift' }, { seconds: 0.6, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 5 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 18:11', actor('jethro', { pose: 'pray' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e7-s2',
    title: 'From morning till evening',
    music: 'be-thou-my-vision',
    beats: [
      verse(
        'EXO 18:13',
        // The next morning: Moses sits to judge, and the line stretches through the camp.
        ...['moses', 'rod', 'zipporah', 'gershom', 'eliezer', 'jethro'].map((id) => fadeOut(id)),
        actor('moses', { x: 0.33, pose: 'sit', facing: 1 }, { seconds: 0.1, delay: 2 }),
        actor('rod', { x: 0.348 }, { seconds: 0.1, delay: 2 }),
        actor('jethro', { x: 0.14, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 2 }),
        ...['moses', 'rod', 'jethro', ...LINE].map((id) => fadeIn(id, 2.5)),
      ),
      verse('EXO 18:14', actor('jethro', { x: 0.22, pose: 'walk' }, { seconds: 1.5, ease: 'inOutSine' }), actor('jethro', { pose: 'idle' }, { seconds: 0.4, delay: 1.5 }), ...swap('forest-sky', 'evening-sky', 1)),
      verse('EXO 18:17', camera({ zoom: 1.02 }, slow)),
      verse('EXO 18:18', actor('jethro', { pose: 'lift' }, { seconds: 0.6, delay: 1 }), actor('jethro', { pose: 'idle' }, { seconds: 0.6, delay: 4 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e7-s3',
    title: 'Able men',
    music: 'be-thou-my-vision',
    beats: [
      verse(
        'EXO 18:21',
        // A new morning: the leaders Moses chooses stand together, and glow.
        ...swap('evening-sky', 'forest-sky'),
        ...LEADERS.map((l, i) => fadeIn(l.id, 1 + i * 0.3)),
        fadeIn('leaders-glow', 0.5, 0.85),
        actor('moses', { pose: 'idle' }, { seconds: 0.6 }),
        // The line steps back, to gather in small circles around the leaders.
        ...LINE.map((id) => actor(id, { y: 0.755 }, { seconds: 2, ease: 'inOutSine', delay: 0.5 })),
      ),
      verse('EXO 18:22', camera({ zoom: 1.02 }, slow)),
      play('sharing-the-load', {
        cues: [camera({ zoom: 1 }, slow)],
        done: [...LINE.map((id) => actor(id, { opacity: 0 }, { seconds: 0.5 })), ...LEADERS.map((l) => actor(l.glow, { opacity: 0.8 }, { seconds: 0.5 })), actor('moses-glow', { opacity: 0.8 }, { seconds: 0.5 })],
      }),
      verse('EXO 18:24', actor('moses', { pose: 'pray' }, { seconds: 0.8, delay: 1 }), actor('jethro', { x: -0.2, pose: 'walk', facing: -1 }, { seconds: 5, ease: 'inOutSine', delay: 2 })),
      say('Moses was the greatest leader his people ever had, and he was humble enough to listen to good advice.', fadeOut('jethro'), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: jethroSet, scenes }
