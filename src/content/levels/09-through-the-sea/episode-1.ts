import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · Trapped at the Sea (Exodus 14:1–14, 19–20), from the approved Level 9 script.
 *
 * God's people camp by the sea, the wilderness behind them and the water in front. Pharaoh
 * changes his mind and comes after them with six hundred chariots, and the people cry out in
 * fear. Moses says, "Fear not, stand firm," and the dark water of the sea glows (this
 * episode's golden thread: Jesus walking on the sea, "Take heart, it is I"). At night the
 * pillar of cloud moves behind the camp, between Israel and the Egyptians, and the player
 * brings its light to every frightened tent ("the light in the camp",
 * minigames/the-light-in-the-camp).
 */

/** The tents of the camp, where their lamps glow once the pillar's light reaches them, and what it finds there. */
export const TENTS = [
  { x: 0.3, text: 'A mother hushes her baby.' },
  { x: 0.42, text: 'An old man stops trembling.' },
  { x: 0.54, text: 'Two brothers stop quarreling, and watch the light.' },
  { x: 0.66, text: 'A father lifts his head.' },
  { x: 0.78, text: 'The children fall asleep.' },
].map((t, i) => ({ ...t, id: `tent-${i + 1}`, light: `tent-light-${i + 1}`, y: 0.7 }))
/** Where the pillar stands before the camp, and behind it, between Israel and the chariots. */
export const PILLAR = { front: 0.88, behind: 0.14, y: 0.76 }
/** Where the light starts, and how far over the camp it can go. */
export const LIGHT = { x: 0.2, y: 0.62, left: 0.2, right: 0.86, top: 0.5, bottom: 0.74 }

const ABOVE = 'pharaoh-hall'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const CAMP = [...TENTS.map((t) => t.id), 'people', 'more-people', 'flock', 'moses', 'rod', 'pillar']

export const seaSet: SceneDescription = {
  id: 'l09-by-the-sea',
  title: 'By the sea',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'red-sea-shore', depth: 0.3 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp by the sea: the tents and their lamps, the people, the flocks, Moses.
    ...TENTS.map((t, i): SceneActor => ({ id: t.id, prop: 'striped-tent', above: ABOVE, x: t.x, y: 0.735, size: 0.085, pose: 'open', facing: i % 2 ? -1 : 1 })),
    ...TENTS.map((t): SceneActor => ({ id: t.light, prop: 'halo', above: ABOVE, x: t.x, y: t.y, size: 0.06, opacity: 0 })),
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.86, y: 0.8, size: 0.026, group: { count: 5, w: 0.1, h: 0.012, seed: 191, bob: 0.002 } },
    person('people', 'hebrew-family', 0.42, { size: 0.12 }),
    person('more-people', 'hebrew-workers', 0.6, { size: 0.12 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.738, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.72),
    // The pillar of cloud, and its light; the light the player brings to the tents.
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: PILLAR.front, y: PILLAR.y, size: 0.06, pose: 'cloud' },
    { id: 'pillar-light', prop: 'halo', above: ABOVE, x: PILLAR.front, y: 0.56, size: 0.14, opacity: 0 },
    { id: 'camp-light', prop: 'halo', above: ABOVE, x: LIGHT.x, y: LIGHT.y, size: 0.12, opacity: 0 },
    // The chariots of Egypt, far off behind the camp in their dust.
    { id: 'dust', prop: 'dust-cloud', above: ABOVE, x: 0.06, y: 0.72, size: 0.16, opacity: 0 },
    { id: 'chariots', prop: 'chariot', above: ABOVE, x: 0.08, y: 0.73, size: 0.035, facing: 1, opacity: 0, group: { count: 4, w: 0.1, h: 0.01, seed: 193, bob: 0.001 } },
    // The dark water of the sea, which glows: the golden thread.
    { id: 'sea-glow', prop: 'halo', above: ABOVE, x: 0.66, y: 0.55, size: 0.12, opacity: 0 },
    // Pharaoh's hall: Pharaoh, a servant, his chariot.
    person('pharaoh', 'pharaoh', 0.62, { opacity: 0 }),
    person('servant', 'steward', 0.76, { opacity: 0 }),
    { id: 'chariot', prop: 'chariot', above: ABOVE, x: 0.34, y: 0.79, size: 0.07, facing: 1, opacity: 0 },
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

const scenes: StoryScene[] = [
  {
    id: 'l09-e1-s1',
    title: 'Camped by the sea',
    music: 'navy-hymn',
    beats: [
      say('God led his people to camp by the sea, with the wilderness behind them and the water in front of them. It looked as if they were trapped. But God knew what he would do.', camera({ zoom: 1.02 }, slow)),
      verse(
        'EXO 14:5',
        // Far away in Egypt, Pharaoh changes his mind.
        camera({ zoom: 1 }, slow),
        ...CAMP.map((id) => fadeOut(id)),
        ...swap('red-sea-shore', 'pharaoh-hall', 1),
        fadeIn('pharaoh', 2.5),
        fadeIn('servant', 2.5),
        actor('pharaoh', { pose: 'lift' }, { seconds: 0.8, delay: 4.5 }),
      ),
      verse('EXO 14:6', fadeIn('chariot'), actor('pharaoh', { x: 0.42, pose: 'walk', facing: -1 }, { seconds: 2.5, ease: 'inOutSine', delay: 1 }), actor('pharaoh', { pose: 'idle' }, { seconds: 0.4, delay: 3.5 })),
      verse('EXO 14:7', fadeOut('pharaoh', 0.5), fadeOut('servant', 0.5), actor('chariot', { x: -0.2, pose: 'walk', facing: -1 }, { seconds: 4, ease: 'inOutSine', delay: 1 })),
    ],
  },
  {
    id: 'l09-e1-s2',
    title: 'The chariots are coming',
    music: 'navy-hymn',
    beats: [
      verse(
        'EXO 14:10',
        // Back at the camp, at evening: the dust of the chariots on the horizon behind it.
        ...swap('pharaoh-hall', 'red-sea-shore'),
        ...swap('forest-sky', 'evening-sky'),
        ...CAMP.map((id) => fadeIn(id, 1)),
        fadeIn('sea-glow', 0.5, 0.85),
        fadeIn('dust', 3),
        fadeIn('chariots', 3.5),
        actor('people', { facing: 1 }, { seconds: 0.4, delay: 4 }),
        actor('more-people', { facing: 1 }, { seconds: 0.4, delay: 4.3 }),
      ),
      verse('EXO 14:11', actor('people', { facing: -1 }, { seconds: 0.4, delay: 1 }), actor('more-people', { x: 0.64, facing: -1 }, { seconds: 1.5, ease: 'inOutSine', delay: 1 })),
      verse('EXO 14:13', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 14:14', actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 4 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e1-s3',
    title: 'The pillar moves',
    music: 'navy-hymn',
    beats: [
      // Night: the people go into their tents, and the pillar shines.
      verse('EXO 14:19', ...swap('evening-sky', 'night-sky'), fadeIn('pillar-light', 1.5, 0.8), fadeOut('people', 1), fadeOut('more-people', 1.3)),
      verse('EXO 14:20', camera({ zoom: 1.02 }, slow)),
      play('the-light-in-the-camp', {
        done: [
          actor('pillar', { x: PILLAR.behind }, { seconds: 0.5 }),
          actor('pillar-light', { x: PILLAR.behind, opacity: 0.8 }, { seconds: 0.5 }),
          actor('dust', { opacity: 0 }, { seconds: 0.5 }),
          actor('chariots', { opacity: 0 }, { seconds: 0.5 }),
          actor('camp-light', { x: LIGHT.x, y: LIGHT.y, opacity: 0 }, { seconds: 0.5 }),
          ...TENTS.map((t) => actor(t.light, { opacity: 0.85 }, { seconds: 0.5 })),
        ],
      }),
      say('All night long, the Egyptians could not come near. God himself stood between his people and their enemies.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: seaSet, scenes }
