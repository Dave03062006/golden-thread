import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Choose Life (Deuteronomy 30:11–20), from the approved Level 13 script.
 *
 * The word is not far off, in heaven or beyond the sea: it is very near, in the mouth and in
 * the heart. Moses sets before the people two roads, life and death, and begs them to choose
 * life. The player sends each choice to the road it belongs to, and the road of life lights up
 * all the way across the river, glowing (this episode's golden thread: "I am the way, and the
 * truth, and the life") ("choose life", minigames/choose-life).
 */

/** The choices, in the order they come, and whether each belongs to the road of life. */
export const CHOICES = [
  { text: 'Loving the LORD your God', life: true },
  { text: 'Turning away your heart', life: false },
  { text: 'Walking in his ways', life: true },
  { text: 'Keeping his commandments', life: true },
  { text: 'Serving other gods', life: false },
  { text: 'Listening to his voice', life: true },
  { text: 'Forgetting all he has done', life: false },
  { text: 'Holding fast to him', life: true },
]
/** The stretches of the road of life that light up, one for each choice that belongs to it. */
/** Where the family stands before choosing, at the parting of the roads. */
export const CHOOSER = { x: 0.46, y: 0.765 }
export const LIFE_ROAD = CHOICES.filter((c) => c.life).map((_, i) => ({ id: `life-${i + 1}`, x: Math.round((0.56 + i * 0.08) * 100) / 100, y: Math.round((0.78 - i * 0.04) * 100) / 100 }))

const CAMP = 'dry-hills'
const ROADS = 'two-roads'
const person = personOn(CAMP)
const AT_CAMP = ['tent-1', 'tent-2', 'people', 'moses', 'rod', 'girl', 'scroll', 'heart-glow']

export const lifeSet: SceneDescription = {
  id: 'l13-life',
  title: 'Choose life',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: CAMP, depth: 0.3 },
    { id: ROADS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp: Moses with the scroll; a child with her hand on her heart.
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: CAMP, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.22, { size: 0.12, facing: 1 }),
    { id: 'rod', prop: 'staff', above: CAMP, x: 0.518, y: 0.765, size: 0.012 },
    person('moses', 'moses-old', 0.5, { y: 0.765 }),
    { id: 'scroll', prop: 'scroll', above: CAMP, x: 0.47, y: 0.68, size: 0.03, opacity: 0 },
    { id: 'heart-glow', prop: 'halo', above: CAMP, x: 0.7, y: 0.74, size: 0.06, opacity: 0 },
    person('girl', 'girl', 0.7, { size: 0.026, y: 0.79 }),
    // The two roads: the road of life, lighting up across the river (the golden thread), and the road away.
    { id: 'life-glow', prop: 'halo', above: ROADS, x: 0.8, y: 0.6, size: 0.3, opacity: 0 },
    ...LIFE_ROAD.map((r): SceneActor => ({ id: r.id, prop: 'halo', above: ROADS, x: r.x, y: r.y, size: 0.07, opacity: 0 })),
    person('chooser', 'hebrew-family', CHOOSER.x, { y: CHOOSER.y + 0.02, size: 0.1, facing: 1, opacity: 0, above: ROADS }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l13-e4-s1',
    title: 'The word is very near you',
    music: 'amazing-grace',
    beats: [
      verse('DEU 30:11', fadeIn('scroll', 0.5), ...pose('moses', 'lift', 0.5, 4)),
      verse('DEU 30:12', camera({ zoom: 1.02, y: -0.02 }, slow)),
      verse('DEU 30:13', camera({ zoom: 1.02, x: 0.02, y: 0 }, slow)),
      verse('DEU 30:14', camera({ zoom: 1, x: 0 }, slow), fadeIn('heart-glow', 1, 0.8), ...pose('girl', 'pray', 1, 5)),
    ],
  },
  {
    id: 'l13-e4-s2',
    title: 'Life and death',
    music: 'amazing-grace',
    beats: [
      verse('DEU 30:15', ...swap(CAMP, ROADS), ...AT_CAMP.map((id) => fadeOut(id)), fadeIn('chooser', 1.5), fadeIn('life-glow', 2, 0.85)),
      verse('DEU 30:16', camera({ zoom: 1.02, x: 0.02 }, slow)),
      verse('DEU 30:19', camera({ zoom: 1, x: 0 }, slow)),
      play('choose-life', { done: [...LIFE_ROAD.map((r) => actor(r.id, { opacity: 0.85 }, { seconds: 0.5 })), actor('chooser', { x: LIFE_ROAD.at(-1)!.x, y: LIFE_ROAD.at(-1)!.y + 0.02 }, { seconds: 0.5 })] }),
      verse('DEU 30:20', camera({ zoom: 1.02 }, slow)),
      say('God did not force his people to love him. He set the choice before them, and begged them to choose life. He still does.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: lifeSet, scenes }
