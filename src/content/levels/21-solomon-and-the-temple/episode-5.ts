import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · The Queen of Sheba (1 Kings 10), from the approved Level 21 script.
 *
 * A caravan of camels comes up from the far south. The queen tests Solomon with hard questions:
 * the player answers her riddles of creation, and each answer appears in the hall ("hard
 * questions", minigames/hard-questions). She gives her gifts, and the gold glows (this episode's
 * golden thread: "something greater than Solomon is here").
 */

/** The queen's riddles, about the things Solomon spoke of: each answer, and two wrong ones. */
export const RIDDLES = [
  { id: 'cedar', prop: 'cedar', riddle: 'I am the tallest tree on the mountains of Lebanon, and my wood lines the house of the LORD. What am I?', answer: 'The cedar', wrong: ['The palm', 'The vine'] },
  { id: 'hyssop', prop: 'hyssop', riddle: 'I am small, and I grow out of a wall; with my branches the priests sprinkle. What am I?', answer: 'The hyssop', wrong: ['The lily', 'The thorn'] },
  { id: 'lion', prop: 'lion', riddle: 'Twelve of us stand on the steps of the king’s throne. What are we?', answer: 'Lions', wrong: ['Eagles', 'Oxen'] },
  { id: 'dove', prop: 'dove', riddle: 'I flew from the ark, and came back with an olive leaf. What am I?', answer: 'The dove', wrong: ['The raven', 'The sparrow'] },
  { id: 'fish', prop: 'fish', riddle: 'I live in the sea, and fill the nets of the fishermen. What am I?', answer: 'The fish', wrong: ['The camel', 'The eagle'] },
]

const ROAD = 'desert'
const HALL = 'house-inside'
const onRoad = personOn(ROAD)
const inHall = personOn(HALL)

export const shebaSet: SceneDescription = {
  id: 'l21-sheba',
  title: 'The Queen of Sheba',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: ROAD, depth: 0.3 },
    { id: HALL, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The caravan from the far south: camels, servants and the queen.
    ...[0.04, 0.16, 0.28].map((x, i): SceneActor => ({ id: `camel-${i + 1}`, prop: 'camel', above: ROAD, x, y: 0.8, size: 0.09, facing: 1 })),
    onRoad('queen-road', 'queen-of-sheba', 0.4, { facing: 1 }),
    onRoad('servants', 'hebrew-workers', -0.08, { size: 0.12, facing: 1 }),
    // The hall: the throne, the king, the queen, the answers to her riddles, and her gifts.
    { id: 'throne', prop: 'throne', above: HALL, x: 0.26, y: 0.8, size: 0.09, opacity: 0 },
    inHall('solomon', 'solomon', 0.26, { pose: 'sit', facing: 1, opacity: 0 }),
    inHall('queen', 'queen-of-sheba', 0.6, { opacity: 0 }),
    ...RIDDLES.map((r, i): SceneActor => ({ id: r.id, prop: r.prop, above: HALL, x: 0.34 + i * 0.1, y: 0.42, size: r.id === 'cedar' ? 0.06 : 0.04, opacity: 0 })),
    { id: 'gold', prop: 'gold-rings', above: HALL, x: 0.46, y: 0.82, size: 0.04, opacity: 0 },
    { id: 'cup', prop: 'golden-cup', above: HALL, x: 0.42, y: 0.82, size: 0.02, opacity: 0 },
    { id: 'spices', prop: 'water-jar', above: HALL, x: 0.5, y: 0.82, size: 0.04, opacity: 0 },
    { id: 'gold-glow', prop: 'halo', above: HALL, x: 0.46, y: 0.62, size: 0.2, opacity: 0 },
  ],
  camera: DRIFT,
}

const caravan = ['camel-1', 'camel-2', 'camel-3', 'queen-road', 'servants']

const scenes: StoryScene[] = [
  {
    id: 'l21-e5-s1',
    title: 'From the ends of the earth',
    music: 'handel-rejouissance',
    beats: [
      verse('1KI 10:1', ...caravan.map((id, i) => actor(id, { x: [0.24, 0.36, 0.48, 0.6, 0.12][i]! }, { seconds: 8, ease: 'inOutSine' }))),
      verse('1KI 10:2', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l21-e5-s2',
    title: 'Hard questions',
    music: 'handel-rejouissance',
    beats: [
      verse('1KI 10:3', ...swap(ROAD, HALL), ...caravan.map((id) => fadeOut(id)), fadeIn('throne', 1.5), fadeIn('solomon', 1.5), fadeIn('queen', 1.5), camera({ zoom: 1 }, slow)),
      play('hard-questions', { done: RIDDLES.map((r) => actor(r.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('1KI 10:6', actor('queen', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      verse('1KI 10:7', actor('queen', { pose: 'idle' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l21-e5-s3',
    title: 'The half was not told me',
    music: 'handel-rejouissance',
    beats: [
      verse('1KI 10:9', ...RIDDLES.map((r) => fadeOut(r.id)), fadeIn('gold', 1), fadeIn('cup', 1), fadeIn('spices', 1), actor('gold-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('1KI 10:10', actor('queen', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 })),
      verse('1KI 10:23', actor('queen', { pose: 'idle' }, { seconds: 0.8 }), ...walk('queen', { x: 1.1, facing: 1 }, 5, 1), camera({ zoom: 1 }, slow)),
      verse('1KI 10:24', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: shebaSet, scenes }
