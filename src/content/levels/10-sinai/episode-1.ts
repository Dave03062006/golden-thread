import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · The Mountain of Fire (Exodus 19), from the approved Level 10 script.
 *
 * Three months out of Egypt, the people camp before Mount Sinai, and the camp glows (this
 * episode's golden thread: "a chosen race, a royal priesthood, a holy nation"). God calls
 * them to be his own possession, a kingdom of priests and a holy nation. Moses goes up and
 * down the mountain, carrying God's words to the people and their answer back ("up and down
 * the mountain", minigames/up-and-down-the-mountain): "All that the LORD has spoken we will
 * do." On the third day the LORD comes down on the mountain in thunder, cloud and fire.
 */

/** The stops on the mountain path, from the camp at its foot to the top. */
export const STOPS = [
  { x: 0.12, y: 0.8 },
  { x: 0.34, y: 0.71 },
  { x: 0.24, y: 0.6 },
  { x: 0.46, y: 0.5 },
  { x: 0.38, y: 0.39 },
  { x: 0.6, y: 0.3 },
  { x: 0.7, y: 0.19 },
]
/** Moses' four journeys, up and down, and the words he carries at the end of each. */
export const JOURNEYS = [
  { to: STOPS.length - 1, title: 'God’s word', text: '“You shall be my own possession among all peoples… a kingdom of priests and a holy nation.”' },
  { to: 0, title: 'To the elders', text: 'Moses set before them all the words the LORD had commanded him.' },
  { to: STOPS.length - 1, title: 'The people’s answer', text: '“All that the LORD has spoken we will do.”' },
  { to: 0, title: 'Be ready', text: 'Wash your garments, and be ready by the third day.' },
]

const ABOVE = 'sinai-path'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const CAMP = ['tent-1', 'tent-2', 'tent-3', 'tent-4', 'people', 'more-people', 'flock']

export const mountainSet: SceneDescription = {
  id: 'l10-mountain-of-fire',
  title: 'The mountain of fire',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'sinai-path', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp on the plain before the mountain, and its glow: the golden thread.
    ...[0.1, 0.24, 0.72, 0.88].map((x, i): SceneActor => ({ id: `tent-${i + 1}`, prop: 'striped-tent', above: ABOVE, x, y: 0.75, size: 0.1, pose: 'open', facing: i % 2 ? -1 : 1 })),
    { id: 'camp-glow', prop: 'halo', above: ABOVE, x: 0.24, y: 0.66, size: 0.1, opacity: 0 },
    person('people', 'hebrew-family', 0.4, { size: 0.12 }),
    person('more-people', 'hebrew-workers', 0.58, { size: 0.12 }),
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.8, y: 0.8, size: 0.026, group: { count: 5, w: 0.1, h: 0.012, seed: 241, bob: 0.002 } },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.508, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.49, { facing: 1 }),
    // The eagle over the mountain.
    { id: 'eagle', prop: 'eagle', above: ABOVE, x: 0.62, y: 0.26, size: 0.05, opacity: 0 },
    // The mountain path: Moses climbing, and the next stop's glow.
    { id: 'next-stop', prop: 'halo', above: ABOVE, ...STOPS[1]!, size: 0.05, opacity: 0 },
    person('climber', 'moses-shepherd', STOPS[0]!.x, { y: STOPS[0]!.y, size: 0.028, facing: 1, opacity: 0 }),
    // The third day: the cloud, the smoke, the fire and the lightning on the mountain.
    { id: 'storm', prop: 'storm-cloud', above: ABOVE, x: 0.44, y: 0.24, size: 0.4, opacity: 0 },
    { id: 'smoke', prop: 'smoke-column', above: ABOVE, x: 0.44, y: 0.32, size: 0.09, opacity: 0 },
    { id: 'fire-glow', prop: 'halo', above: ABOVE, x: 0.44, y: 0.28, size: 0.16, opacity: 0 },
    { id: 'lightning', prop: 'lightning', above: ABOVE, x: 0.58, y: 0.3, size: 0.06, opacity: 0 },
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
/** Where Moses climbs to, into the cloud on the mountain. */
const CLIMB = { x: 0.44, y: 0.62 }

const scenes: StoryScene[] = [
  {
    id: 'l10-e1-s1',
    title: 'Before the mountain',
    music: 'bach-toccata',
    beats: [
      say('Three months after they left Egypt, God’s people came to the mountain where God had first spoken to Moses from the burning bush.', fadeIn('camp-glow', 0.5, 0.85), camera({ zoom: 1.02 }, slow)),
      verse('EXO 19:2', camera({ zoom: 1 }, slow)),
      verse('EXO 19:4', fadeIn('eagle', 0.5), actor('eagle', { x: 0.36, y: 0.22 }, { seconds: 8, ease: 'inOutSine', delay: 0.5 })),
      verse('EXO 19:5', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), actor('eagle', { x: 0.7, y: 0.24 }, { seconds: 8, ease: 'inOutSine' })),
      verse('EXO 19:6', actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 3 }), fadeOut('eagle', 3)),
    ],
  },
  {
    id: 'l10-e1-s2',
    title: 'Up and down the mountain',
    music: 'bach-toccata',
    beats: [
      verse('EXO 19:7', actor('people', { x: 0.36, pose: 'walk' }, { seconds: 1.5, ease: 'inOutSine', delay: 1 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 2.5 })),
      verse('EXO 19:8', actor('more-people', { pose: 'walk' }, { seconds: 0.4, delay: 1 }), actor('more-people', { pose: 'idle' }, { seconds: 0.4, delay: 2 })),
      play('up-and-down-the-mountain', {
        // The mountain path: Moses goes up and down it.
        cues: [...['moses', 'rod', 'camp-glow', ...CAMP].map((id) => fadeOut(id)), ...swap('horeb', 'sinai-path'), fadeIn('climber', 2), fadeIn('next-stop', 2, 0.8)],
        done: [actor('climber', { ...STOPS[0]!, pose: 'idle', facing: -1 }, { seconds: 0.5 }), actor('next-stop', { ...STOPS[1]!, opacity: 0 }, { seconds: 0.5 })],
      }),
      verse(
        'EXO 19:10',
        // Back in the camp: the people wash their garments.
        fadeOut('climber'),
        ...swap('sinai-path', 'horeb'),
        ...['moses', 'rod', 'camp-glow', ...CAMP].map((id) => fadeIn(id, 1.5, id === 'camp-glow' ? 0.85 : 1)),
      ),
      verse('EXO 19:11', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l10-e1-s3',
    title: 'The third day',
    music: 'bach-toccata',
    beats: [
      verse(
        'EXO 19:16',
        // Thunder, lightning, a thick cloud on the mountain.
        camera({ zoom: 1 }, slow),
        ...swap('forest-sky', 'storm-sky'),
        fadeIn('storm', 0.5),
        fadeIn('lightning', 2),
        ...['people', 'more-people'].map((id) => actor(id, { facing: 1 }, { seconds: 0.4, delay: 1.5 })),
      ),
      verse('EXO 19:18', fadeIn('smoke', 0.5), fadeIn('fire-glow', 1, 0.9), camera({ zoom: 1.02, x: 0.004 }, { seconds: 0.6 }), camera({ zoom: 1.02, x: -0.004 }, { seconds: 0.6, delay: 0.6 }), camera({ zoom: 1.02, x: 0 }, { seconds: 0.6, delay: 1.2 })),
      verse('EXO 19:19', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 })),
      verse('EXO 19:20', actor('moses', { pose: 'walk', x: CLIMB.x, y: CLIMB.y, facing: -1 }, { seconds: 6, ease: 'inOutSine', delay: 1 }), actor('rod', { x: CLIMB.x - 0.018, y: CLIMB.y }, { seconds: 6, ease: 'inOutSine', delay: 1 }), fadeOut('moses', 4), fadeOut('rod', 4), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: mountainSet, scenes }
