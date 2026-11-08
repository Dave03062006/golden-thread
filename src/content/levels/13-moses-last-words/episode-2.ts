import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · "Hear, O Israel" (Deuteronomy 6), from the approved Level 13 script.
 *
 * Moses gives the people the words every Jewish family still prays: "Hear, O Israel: The LORD
 * our God is one LORD; and you shall love the LORD your God with all your heart." They are to
 * talk of them at home and on the road, lying down and rising up, and write them on their
 * doorposts: the player carves the missing words into the doorpost, where they glow (this
 * episode's golden thread: Jesus, "The first is, 'Hear, O Israel…'") ("on the doorposts",
 * minigames/on-the-doorposts). Years later, a son asks what it all means, and his father
 * tells him the whole story.
 */

/** The words of Deuteronomy 6:4–5 the player carves, in order, each with where it goes on the doorpost. */
export const WORDS = [
  { word: 'Hear', line: '“___, O Israel:' },
  { word: 'one', line: 'The LORD our God is ___ LORD;' },
  { word: 'love', line: 'and you shall ___ the LORD your God' },
  { word: 'heart', line: 'with all your ___,' },
  { word: 'soul', line: 'and with all your ___,' },
  { word: 'might', line: 'and with all your ___.”' },
].map((w, i) => ({ ...w, id: `word-${i + 1}`, x: 0.66, y: Math.round((0.32 + i * 0.06) * 100) / 100 }))
export const MEZUZAH = 'mezuzah'

const CAMP = 'dry-hills'
const HOME = 'house-inside'
const person = personOn(CAMP)
const inside = personOn(HOME)
const OUTSIDE = ['tent-1', 'tent-2', 'people', 'moses', 'rod', 'father', 'son', 'cloud']

export const shemaSet: SceneDescription = {
  id: 'l13-shema',
  title: 'Hear, O Israel',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: HOME, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp, with the cloud over the tabernacle behind Moses; a father and his son.
    { id: 'cloud', prop: 'pillar', above: CAMP, x: 0.7, y: 0.5, size: 0.07, pose: 'cloud' },
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: CAMP, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.24, { size: 0.12, facing: 1 }),
    { id: 'rod', prop: 'staff', above: CAMP, x: 0.558, y: 0.765, size: 0.012 },
    person('moses', 'moses-old', 0.54, { y: 0.765 }),
    person('father', 'hebrew-father', 0.76, { pose: 'sit' }),
    person('son', 'girl', 0.8, { size: 0.026, y: 0.79 }),
    // The doorpost of a house, and the words carved on it (the golden thread), and the little case of the mezuzah.
    { id: 'doorpost-glow', prop: 'halo', above: HOME, x: 0.66, y: 0.46, size: 0.24, opacity: 0 },
    ...WORDS.map((w): SceneActor => ({ id: w.id, prop: 'carved-line', above: HOME, x: w.x, y: w.y, size: 0.06, opacity: 0 })),
    { id: MEZUZAH, prop: 'scroll', above: HOME, x: 0.7, y: 0.36, size: 0.03, opacity: 0 },
    // In the house, years later: a father and the son who asks him.
    inside('home-father', 'hebrew-father', 0.36, { facing: 1, pose: 'sit', opacity: 0 }),
    inside('home-son', 'girl', 0.42, { size: 0.026, y: 0.79, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l13-e2-s1',
    title: 'The LORD our God is one',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('DEU 6:3', ...pose('moses', 'lift', 0.5, 4)),
      verse('DEU 6:4', camera({ zoom: 1.03 }, slow)),
      verse('DEU 6:5', camera({ zoom: 1 }, slow), ...walk('son', { x: 0.77 }, 1, 0.5)),
      verse('DEU 6:6', ...pose('father', 'pray', 0.5, 4)),
      say('These words are called the Shema, from the Hebrew for “Hear.” Jewish families still pray them every morning and every evening, and Jesus himself grew up praying them.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l13-e2-s2',
    title: 'On your doorposts',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('DEU 6:7', camera({ zoom: 1 }, slow), ...walk('father', { x: 0.7 }, 3, 0.5), ...walk('son', { x: 0.74 }, 3, 0.5)),
      verse('DEU 6:8', ...swap('forest-sky', 'evening-sky')),
      verse('DEU 6:9', ...swap(CAMP, HOME), ...OUTSIDE.map((id) => fadeOut(id)), fadeIn('doorpost-glow', 1.5, 0.85)),
      play('on-the-doorposts', { done: [...WORDS.map((w) => actor(w.id, { opacity: 1 }, { seconds: 0.5 })), actor(MEZUZAH, { opacity: 1 }, { seconds: 0.5 })] }),
    ],
  },
  {
    id: 'l13-e2-s3',
    title: 'When your son asks',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('DEU 6:20', ...swap('evening-sky', 'forest-sky'), fadeIn('home-father', 1), fadeIn('home-son', 1), ...walk('home-son', { x: 0.39, facing: 1 }, 1.5, 1.5)),
      verse('DEU 6:21', ...pose('home-father', 'lift', 0.5, 4)),
      verse('DEU 6:23', camera({ zoom: 1.02 }, slow)),
      verse('DEU 6:24', camera({ zoom: 1 }, slow), ...pose('home-father', 'pray', 0.5, 4)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: shemaSet, scenes }
