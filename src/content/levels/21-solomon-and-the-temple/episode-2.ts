import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · The Two Mothers (1 Kings 3:16–4:34), from the approved Level 21 script.
 *
 * Two women stand before the king, each claiming the living baby. Solomon calls for a sword. The
 * player helps him judge, one question at a time ("the living child", minigames/the-living-child),
 * and the baby is given back to his true mother, and glows (this episode's golden thread: "Christ
 * the power of God and the wisdom of God"). Then the wise men of far countries come to hear him.
 */

/** The questions of the judgment: which woman, each time (the first is the true mother). */
export const JUDGMENT = [
  { question: 'When the sword is brought, who cries out, “Give her the living child, and by no means slay it”?', answer: 'first', note: '“Her heart yearned for her son.”' },
  { question: 'And who says, “It shall be neither mine nor yours; divide it”?', answer: 'other', note: 'She did not love the child.' },
  { question: 'So who is the true mother?', answer: 'first', note: '“Give the living child to the first woman… she is its mother.”' },
] as const
export const WOMEN = { first: 'The first woman, kneeling', other: 'The other woman, standing still' }
export const MOTHER = { x: 0.54 }

const HALL = 'house-inside'
const inHall = personOn(HALL)

export const judgmentSet: SceneDescription = {
  id: 'l21-judgment',
  title: 'The two mothers',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: HALL, depth: 0.3 },
  ],
  actors: [
    // The hall of judgment: the king on his throne, the two women, the baby, and the guard.
    { id: 'throne', prop: 'throne', above: HALL, x: 0.26, y: 0.8, size: 0.09 },
    inHall('solomon', 'solomon', 0.26, { pose: 'sit', facing: 1 }),
    inHall('mother', 'maid', MOTHER.x),
    inHall('other', 'daughter', 0.66),
    { id: 'baby', prop: 'swaddled-baby', above: HALL, x: 0.64, y: 0.7, size: 0.025 },
    inHall('guard', 'watchman', 0.8),
    { id: 'sword', prop: 'spear', above: HALL, x: 0.85, y: 0.79, size: 0.03, opacity: 0 },
    { id: 'child-glow', prop: 'halo', above: HALL, x: MOTHER.x + 0.02, y: 0.62, size: 0.18, opacity: 0 },
    // The wise men of far countries, come to hear Solomon.
    inHall('wise-men', 'elders', 0.68, { size: 0.12, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l21-e2-s1',
    title: 'Two women before the king',
    music: 'brahms-wiegenlied',
    beats: [
      say('Two women came to King Solomon. They lived in the same house, and each had a baby boy, born three days apart.', camera({ zoom: 1.02 }, slow)),
      say('One night one of the babies died. Now each woman said that the living baby was hers, and the dead baby was the other’s. No one else had been in the house; no one could tell who was telling the truth.', actor('mother', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 })),
      verse('1KI 3:22', actor('mother', { pose: 'idle' }, { seconds: 0.8 }), actor('other', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l21-e2-s2',
    title: '“Bring me a sword”',
    music: 'brahms-wiegenlied',
    beats: [
      verse('1KI 3:24', actor('other', { pose: 'idle' }, { seconds: 0.8 }), fadeIn('sword', 0.5), actor('guard', { pose: 'lift' }, { seconds: 0.8, delay: 1 })),
      verse('1KI 3:25', camera({ zoom: 1.04 }, slow)),
      say('Solomon did not mean to harm the child. He was testing the two women, to find out whose heart was a mother’s.', camera({ zoom: 1 }, slow)),
      verse('1KI 3:26', actor('mother', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 })),
      play('the-living-child', { done: [actor('baby', { x: MOTHER.x + 0.02 }, { seconds: 0.5 }), actor('guard', { pose: 'idle' }, { seconds: 0.5 }), actor('sword', { opacity: 0 }, { seconds: 0.5 })] }),
      verse('1KI 3:27', actor('mother', { pose: 'idle' }, { seconds: 0.8 })),
    ],
  },
  {
    id: 'l21-e2-s3',
    title: 'The wisdom of God was in him',
    music: 'brahms-wiegenlied',
    beats: [
      verse('1KI 3:28', actor('child-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 }), fadeOut('other'), fadeOut('guard')),
      verse('1KI 4:29', fadeOut('mother', 0.5), fadeOut('baby', 0.5), fadeOut('child-glow', 0.5), fadeIn('wise-men', 1.5), camera({ zoom: 1.02 }, slow)),
      verse('1KI 4:32', actor('solomon', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 })),
      verse('1KI 4:34', actor('solomon', { pose: 'sit' }, { seconds: 0.8, delay: 0.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: judgmentSet, scenes }
