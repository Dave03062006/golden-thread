import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · On the Run from Saul (1 Samuel 21–23), from the approved Level 18 script.
 *
 * At Nob the priest gives hungry David the holy bread of the Presence, which glows (this
 * episode's golden thread: "Have you not read what David did?"). At the cave of Adullam four
 * hundred men gather to him. In the wilderness of Ziph the player moves David's men from rock to
 * rock while Saul's lookouts look away ("the other side of the mountain",
 * minigames/the-other-side-of-the-mountain), and Jonathan comes to strengthen him.
 */

/** The rocks David's men move between, over the ridge, and the band of men itself. */
export const ROCKS = [0.86, 0.74, 0.62, 0.5, 0.38, 0.26, 0.14]
export const MEN = 'davids-men'

const NOB = 'holy-place'
const CAVE = 'rock-face'
const ZIPH = 'dry-hills'
const atNob = personOn(NOB)
const atCave = personOn(CAVE)
const inZiph = personOn(ZIPH)

export const runSet: SceneDescription = {
  id: 'l18-run',
  title: 'On the run from Saul',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: NOB, depth: 0.3 },
    { id: CAVE, depth: 0.3, opacity: 0 },
    { id: ZIPH, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Nob: the table with the bread of the Presence (the golden thread), the priest, and David.
    { id: 'table', prop: 'tabernacle-piece', above: NOB, x: pieceX('table', 0.5, 1.4), y: 0.8, size: 1.4, pose: 'table' },
    { id: 'bread-glow', prop: 'halo', above: NOB, x: 0.5, y: 0.62, size: 0.16, opacity: 0 },
    atNob('priest', 'high-priest', 0.36, { facing: 1 }),
    atNob('david', 'david', 0.7),
    // The cave of Adullam: David, and the people who gather to him.
    atCave('david-cave', 'david', 0.3, { facing: 1, opacity: 0 }),
    atCave('gathered', 'crowd', 0.68, { size: 0.18, opacity: 0 }),
    // The wilderness of Ziph: the ridge, David's men, Saul's lookout, and Jonathan.
    ...ROCKS.slice(1).map((x, i): SceneActor => ({ id: `rock-${i + 1}`, prop: 'great-rock', above: ZIPH, x, y: 0.82, size: 0.06, opacity: 0 })),
    inZiph(MEN, 'hebrew-workers', ROCKS[0]!, { size: 0.1, opacity: 0 }),
    inZiph('lookout', 'watchman', 0.5, { y: 0.5, size: 0.03, opacity: 0 }),
    inZiph('jonathan', 'jonathan', 0.02, { facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const IN_ZIPH = [...ROCKS.slice(1).map((_, i) => `rock-${i + 1}`), MEN, 'lookout']

const scenes: StoryScene[] = [
  {
    id: 'l18-e4-s1',
    title: 'The holy bread',
    music: 'nobody-knows',
    beats: [
      say('David fled from Saul with nothing, and came to Nob, the town of the priests, where the tabernacle stood. He asked the priest for bread.', actor('bread-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('1SA 21:6', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l18-e4-s2',
    title: 'The cave of Adullam',
    music: 'nobody-knows',
    beats: [
      verse('1SA 22:1', ...swap(NOB, CAVE), ...['table', 'priest', 'david'].map((id) => fadeOut(id)), fadeOut('bread-glow', 1.5), fadeIn('david-cave', 1.5), camera({ zoom: 1 }, slow)),
      verse('1SA 22:2', fadeIn('gathered', 0.5)),
    ],
  },
  {
    id: 'l18-e4-s3',
    title: 'The wilderness of Ziph',
    music: 'nobody-knows',
    beats: [
      verse('1SA 23:14', ...swap('forest-sky', 'evening-sky'), ...swap(CAVE, ZIPH), fadeOut('david-cave'), fadeOut('gathered'), ...IN_ZIPH.map((id) => fadeIn(id, 1.5))),
      play('the-other-side-of-the-mountain', { done: [actor(MEN, { x: ROCKS.at(-1)! }, { seconds: 0.5 })] }),
      verse('1SA 23:16', ...swap('evening-sky', 'forest-sky'), fadeOut('lookout'), fadeIn('jonathan', 0.5), actor('jonathan', { x: 0.24 }, { seconds: 2, delay: 0.8 })),
      verse('1SA 23:17', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: runSet, scenes }
