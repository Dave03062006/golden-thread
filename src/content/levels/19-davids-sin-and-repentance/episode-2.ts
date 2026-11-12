import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · Nathan's Parable (2 Samuel 12:1–14), from the approved Level 19 script.
 *
 * Nathan tells the king a story, and it appears between them like a painted scroll: the rich
 * man's flocks, and the poor man's one little ewe lamb. David is furious with the rich man. The
 * player matches each part of the story to the real person it stands for ("you are the man",
 * minigames/you-are-the-man), and the rich man turns out to wear David's own face. David kneels:
 * "I have sinned against the LORD." Nathan's hand on his head glows (this episode's golden thread:
 * "If you forgive the sins of any, they are forgiven").
 */

/** Nathan's story, card by card, and who each part really stands for: the rich man last. */
export const CARDS = [
  { id: 'traveler', card: 'The traveler who came to the rich man', is: 'David’s own wanting' },
  { id: 'poor-man', card: 'The poor man, who had nothing but one little lamb', is: 'Uriah, the faithful soldier' },
  { id: 'lamb', card: 'The little ewe lamb, like a daughter to him', is: 'Bathsheba' },
  { id: 'rich-man', card: 'The rich man, with very many flocks and herds', is: 'King David' },
]

const PALACE = 'house-inside'
const STORY = 'home-land'
const inPalace = personOn(PALACE)
const inStory = personOn(STORY, 0.8)

export const nathanSet: SceneDescription = {
  id: 'l19-nathan',
  title: 'Nathan’s parable',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: PALACE, depth: 0.3 },
    { id: STORY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The throne room: David on his throne, Nathan before him.
    { id: 'throne', prop: 'throne', above: PALACE, x: 0.34, y: 0.8, size: 0.09 },
    inPalace('david', 'david', 0.34, { pose: 'sit', facing: 1 }),
    inPalace('nathan', 'nathan', 0.62),
    // Nathan's story, painted: the rich man and his flocks, the poor man, his children and the lamb, the traveler.
    inStory('rich-man', 'laban', 0.22, { facing: 1, opacity: 0 }),
    inStory('rich-david', 'david', 0.22, { facing: 1, opacity: 0 }),
    ...[0.08, 0.13, 0.31, 0.36].map((x, i): SceneActor => ({ id: `flock-${i + 1}`, prop: 'sheep', above: STORY, x, y: 0.72 + (i % 2) * 0.04, size: 0.04, opacity: 0 })),
    { id: 'herd', prop: 'ox', above: STORY, x: 0.04, y: 0.8, size: 0.06, opacity: 0 },
    inStory('poor-man', 'poor-man', 0.66, { opacity: 0 }),
    inStory('boy', 'boy', 0.74, { opacity: 0 }),
    inStory('girl', 'girl', 0.79, { opacity: 0 }),
    { id: 'lamb', prop: 'sheep', above: STORY, x: 0.7, y: 0.82, size: 0.025, opacity: 0 },
    inStory('traveler', 'stranger', 0.48, { facing: -1, opacity: 0 }),
    // Nathan's hand on David's head (the golden thread).
    { id: 'hand-glow', prop: 'halo', above: PALACE, x: 0.5, y: 0.66, size: 0.14, opacity: 0 },
  ],
  camera: DRIFT,
}

const story = ['rich-man', 'flock-1', 'flock-2', 'flock-3', 'flock-4', 'herd', 'poor-man', 'boy', 'girl', 'lamb', 'traveler', 'rich-david']

const scenes: StoryScene[] = [
  {
    id: 'l19-e2-s1',
    title: 'Two men in a certain city',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('2SA 12:1', camera({ zoom: 1.02 }, slow)),
      verse('2SA 12:2', ...swap(PALACE, STORY), fadeOut('throne'), fadeOut('david'), fadeOut('nathan'), fadeIn('rich-man', 1.5), ...[1, 2, 3, 4].map((n) => fadeIn(`flock-${n}`, 1.5 + n * 0.3)), fadeIn('herd', 2.5)),
      verse('2SA 12:3', fadeIn('poor-man', 0.5), fadeIn('boy', 1), fadeIn('girl', 1.2), fadeIn('lamb', 1.6)),
      verse('2SA 12:4', fadeIn('traveler', 0.5), actor('lamb', { x: 0.3 }, { seconds: 3, delay: 1.5, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l19-e2-s2',
    title: '“You are the man”',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('2SA 12:5', ...swap(STORY, PALACE), ...story.map((id) => fadeOut(id)), fadeIn('throne', 1.5), fadeIn('david', 1.5), fadeIn('nathan', 1.5), actor('david', { pose: 'lift' }, { seconds: 0.8, delay: 2.5 })),
      play('you-are-the-man', {
        cues: [...swap(PALACE, STORY), fadeOut('throne'), fadeOut('david'), fadeOut('nathan'), ...story.filter((id) => id !== 'rich-david').map((id) => fadeIn(id, 1))],
        done: [actor('rich-man', { opacity: 0 }, { seconds: 1 }), actor('rich-david', { opacity: 1 }, { seconds: 1 })],
      }),
      verse('2SA 12:7', ...swap(STORY, PALACE), ...story.map((id) => fadeOut(id)), fadeIn('throne', 1.5), fadeIn('david', 1.5), fadeIn('nathan', 1.5), actor('david', { pose: 'sit' }, { seconds: 0.8, delay: 1.5 })),
      say('Nathan reminded David that God had given him everything: the kingdom, a palace, and more besides, if he had asked. And yet he had taken Uriah’s wife, and had Uriah killed, and hidden it.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l19-e2-s3',
    title: '“I have sinned against the LORD”',
    music: 'bach-aus-tiefer-not',
    beats: [
      say('David didn’t make excuses, or blame anyone else.', actor('david', { pose: 'kneel', x: 0.46 }, { seconds: 1.5, delay: 0.3 }), actor('nathan', { x: 0.54 }, { seconds: 1.5, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      verse('2SA 12:13', ...swap('forest-sky', 'evening-sky'), actor('hand-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.8 })),
      say('God forgave David at once. But Nathan warned him that his sin would still bring sorrow to his family, and the trouble would come from his own house.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: nathanSet, scenes }
