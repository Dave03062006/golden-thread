import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · Building the Temple (1 Kings 5–6), from the approved Level 21 script.
 *
 * Cedars are felled in the mountains of Lebanon. On Mount Moriah the Temple rises course by course
 * from stones prepared at the quarry: the player lowers each one when it hangs still, and nothing
 * is hammered ("without a sound", minigames/without-a-sound). The newest stone glows (this
 * episode's golden thread: "like living stones be yourselves built into a spiritual house").
 * Inside, everything is overlaid with gold.
 */

/** The courses of the Temple wall, from the bottom up, each lowered into place. */
export const COURSES = Array.from({ length: 6 }, (_, i) => ({ id: `course-${i + 1}`, y: Math.round((0.8 - i * 0.045) * 1000) / 1000 }))

const LEBANON = 'forest-far'
const MORIAH = 'moriah-top'
const GOLD = 'holy-place'
const inLebanon = personOn(LEBANON)
const onMoriah = personOn(MORIAH)

export const buildingSet: SceneDescription = {
  id: 'l21-building',
  title: 'Building the Temple',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: LEBANON, depth: 0.3 },
    { id: MORIAH, depth: 0.3, opacity: 0 },
    { id: GOLD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The mountains of Lebanon: the cedars, and the woodcutters.
    ...[0.18, 0.34, 0.72].map((x, i): SceneActor => ({ id: `cedar-${i + 1}`, prop: 'cedar', above: LEBANON, x, y: 0.8, size: 0.12 })),
    inLebanon('woodcutters', 'hebrew-workers', 0.52, { size: 0.12 }),
    // Mount Moriah: the courses of the wall, the builders, the glow on the newest stone.
    ...COURSES.map((c): SceneActor => ({ id: c.id, prop: 'stone-course', above: MORIAH, x: 0.56, y: c.y, size: 0.24, opacity: 0 })),
    onMoriah('builders', 'hebrew-workers', 0.22, { size: 0.12, facing: 1, opacity: 0 }),
    onMoriah('solomon', 'solomon', 0.86, { opacity: 0 }),
    { id: 'stone-glow', prop: 'halo', above: MORIAH, x: 0.56, y: 0.56, size: 0.16, opacity: 0 },
    // Inside the house: the gold, shining in the lamplight.
    { id: 'gold-light', prop: 'halo', above: GOLD, x: 0.5, y: 0.5, size: 0.6, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l21-e3-s1',
    title: 'The cedars of Lebanon',
    music: 'pachelbel-canon',
    beats: [
      say('David had wanted to build a house for God, but God had promised that his son would build it (Level 18). Now Solomon was ready.', camera({ zoom: 1.02 }, slow)),
      verse('1KI 5:5', camera({ zoom: 1.03 }, slow)),
      say('He made a treaty with Hiram, the king of Tyre, who sent cedar and cypress from the mountains of Lebanon. Thousands of workers cut stone in the hills.', actor('cedar-2', { opacity: 0 }, { seconds: 2, delay: 1 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l21-e3-s2',
    title: 'Neither hammer nor axe',
    music: 'pachelbel-canon',
    beats: [
      verse('1KI 6:1', ...swap(LEBANON, MORIAH), ...['cedar-1', 'cedar-2', 'cedar-3', 'woodcutters'].map((id) => fadeOut(id)), fadeIn('builders', 1.5), fadeIn('solomon', 1.5), actor('stone-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('1KI 6:7', camera({ zoom: 1.02 }, slow)),
      play('without-a-sound', { done: [...COURSES.map((c) => actor(c.id, { opacity: 1 }, { seconds: 0.5 }))] }),
      verse('1KI 6:12', camera({ zoom: 1 }, slow)),
      verse('1KI 6:13'),
    ],
  },
  {
    id: 'l21-e3-s3',
    title: 'Overlaid with gold',
    music: 'pachelbel-canon',
    beats: [
      verse('1KI 6:19', ...swap(MORIAH, GOLD), ...[...COURSES.map((c) => c.id), 'builders', 'solomon', 'stone-glow'].map((id) => fadeOut(id)), fadeIn('gold-light', 1.5, 0.5)),
      verse('1KI 6:22', actor('gold-light', { opacity: 0.8 }, { seconds: 3 }), camera({ zoom: 1.03 }, slow)),
      verse('1KI 6:38', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: buildingSet, scenes }
