import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Moses Intercedes (Exodus 32:9–14, 30–32; 33:7–14), from the approved Level 10
 * script.
 *
 * God tells Moses to let him alone, so that his wrath may burn against the stiff-necked
 * people. Moses pleads for them, and the player matches each of his three pleas to what it
 * asks God to remember ("Moses pleads", minigames/moses-pleads); with each, the storm on the
 * mountain clears, and the LORD turns from his anger. The next day Moses offers himself for
 * his people: "blot me out." In the tent of meeting outside the camp, the pillar of cloud
 * stands at the door, which glows (this episode's golden thread: "I have called you
 * friends"), and the LORD speaks with Moses face to face, as a man speaks to his friend.
 */

/** Moses' three pleas (Exodus 32:11–13), in his own words, and what each asks God to remember. */
export const PLEAS = [
  { words: '“Why does thy wrath burn hot against thy people, whom thou hast brought forth out of the land of Egypt…?”', answer: 'people' },
  { words: '“Why should the Egyptians say, ‘With evil intent did he bring them forth…’?”', answer: 'name' },
  { words: '“Remember Abraham, Isaac, and Israel, thy servants…”', answer: 'promise' },
]
export const REMEMBERED = [
  { id: 'people', text: 'They are your own people, whom you saved.' },
  { id: 'name', text: 'Your holy name, before the nations.' },
  { id: 'promise', text: 'Your promise to their fathers.' },
]
/** The storm clouds on the mountain, which clear as Moses prays. */
export const STORMS = ['storm-1', 'storm-2', 'storm-3']

const ABOVE = 'horeb'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const TENTS = [0.1, 0.3, 0.5].map((x, i) => ({ id: `tent-${i + 1}`, x }))

export const pleadSet: SceneDescription = {
  id: 'l10-intercession',
  title: 'Moses intercedes',
  layers: [
    { id: 'storm-sky', depth: 0 },
    { id: 'gray-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'sinai-summit', depth: 0.3 },
    { id: 'horeb', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // On the mountain: the storm, and Moses on his knees.
    ...STORMS.map((id, i): SceneActor => ({ id, prop: 'storm-cloud', above: ABOVE, x: 0.22 + i * 0.28, y: 0.2 + (i % 2) * 0.04, size: 0.3 })),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.618, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.6, { pose: 'kneel' }),
    // The camp: the people at their tent doors.
    ...TENTS.map((t, i): SceneActor => ({ id: t.id, prop: 'striped-tent', above: ABOVE, x: t.x, y: 0.75, size: 0.1, pose: 'open', facing: i % 2 ? -1 : 1, opacity: 0 })),
    person('people', 'hebrew-family', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    person('more-people', 'hebrew-workers', 0.42, { size: 0.12, facing: 1, opacity: 0 }),
    // The tent of meeting outside the camp, the pillar of cloud at its door, and the glow there: the golden thread.
    { id: 'meeting-tent', prop: 'striped-tent', above: ABOVE, x: 0.84, y: 0.75, size: 0.11, pose: 'open', facing: -1, opacity: 0 },
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: 0.76, y: 0.5, size: 0.05, pose: 'cloud', opacity: 0 },
    { id: 'door-glow', prop: 'halo', above: ABOVE, x: 0.78, y: 0.69, size: 0.09, opacity: 0 },
    person('joshua', 'joshua', 0.92, { opacity: 0 }),
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
const CAMP = [...TENTS.map((t) => t.id), 'people', 'more-people']

const scenes: StoryScene[] = [
  {
    id: 'l10-e5-s1',
    title: '“Let me alone”',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('EXO 32:9', camera({ zoom: 1.02 }, slow)),
      verse('EXO 32:10', camera({ zoom: 1 }, slow)),
      play('moses-pleads', { done: STORMS.map((id) => actor(id, { opacity: 0 }, { seconds: 0.5 })) }),
      verse('EXO 32:14', ...swap('storm-sky', 'gray-sky'), actor('moses', { pose: 'pray' }, { seconds: 1, delay: 1 })),
    ],
  },
  {
    id: 'l10-e5-s2',
    title: '“Blot me out”',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'EXO 32:30',
        // The next morning, in the camp: Moses before the people.
        ...['moses', 'rod'].map((id) => fadeOut(id)),
        ...swap('sinai-summit', 'horeb', 1),
        actor('moses', { x: 0.62, pose: 'idle' }, { seconds: 0.1, delay: 2.5 }),
        actor('rod', { x: 0.638 }, { seconds: 0.1, delay: 2.5 }),
        ...['moses', 'rod', ...CAMP].map((id) => fadeIn(id, 3)),
        actor('moses', { pose: 'lift' }, { seconds: 0.6, delay: 5 }),
      ),
      verse('EXO 32:31', actor('moses', { pose: 'walk', x: 0.44, y: 0.64, facing: -1 }, { seconds: 5, ease: 'inOutSine', delay: 0.5 }), actor('rod', { x: 0.422, y: 0.64 }, { seconds: 5, ease: 'inOutSine', delay: 0.5 }), fadeOut('moses', 3.5), fadeOut('rod', 3.5)),
      verse('EXO 32:32', camera({ zoom: 1.02, y: -0.01 }, slow)),
      say('Moses loved his people so much that he offered himself in their place.', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l10-e5-s3',
    title: 'The tent of meeting',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse(
        'EXO 33:7',
        // The tent outside the camp, and Moses walking out to it.
        ...swap('gray-sky', 'forest-sky'),
        fadeIn('meeting-tent', 0.5),
        fadeIn('door-glow', 0.5, 0.85),
        fadeIn('joshua', 1),
        actor('moses', { x: 0.5, y: 0.785, pose: 'walk', facing: 1 }, { seconds: 0.1 }),
        actor('rod', { x: 0.518, y: 0.785 }, { seconds: 0.1 }),
        fadeIn('moses', 1),
        fadeIn('rod', 1),
        actor('moses', { x: 0.74 }, { seconds: 5, ease: 'inOutSine', delay: 1.5 }),
        actor('rod', { x: 0.758 }, { seconds: 5, ease: 'inOutSine', delay: 1.5 }),
        actor('moses', { pose: 'idle' }, { seconds: 0.4, delay: 6.5 }),
      ),
      verse('EXO 33:9', fadeIn('pillar', 0.5), actor('pillar', { y: 0.765 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 })),
      verse('EXO 33:10', ...['people', 'more-people'].map((id) => actor(id, { pose: 'walk' }, { seconds: 0.4, delay: 1 })), ...['people', 'more-people'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 2 }))),
      verse('EXO 33:11', actor('moses', { pose: 'pray' }, { seconds: 1, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 33:14', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: pleadSet, scenes }
