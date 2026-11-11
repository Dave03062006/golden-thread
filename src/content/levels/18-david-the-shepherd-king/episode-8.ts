import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 8 · God's Covenant with David (2 Samuel 7), from the approved Level 18 script.
 *
 * David, in his cedar house, wants to build God a house; God promises instead to build David a
 * house, a throne for ever. A light grows over David's house (this episode's golden thread:
 * "Jesus Christ, the son of David"), and the player puts the promise together, beam by beam
 * ("a house for ever", minigames/a-house-for-ever). David sits before the ark, amazed.
 */

/** God's promise to David, part by part, each a beam of light in the house that rises. */
export const PROMISE = ['I will raise up your offspring after you', 'he shall build a house for my name', 'I will establish the throne of his kingdom for ever', 'I will be his father, and he shall be my son', 'your throne shall be established for ever']
export const BEAMS = PROMISE.map((_, i) => ({ id: `beam-${i + 1}`, x: 0.5, y: Math.round((0.64 - i * 0.05) * 1000) / 1000 }))

const PALACE = 'house-inside'
const CITY = 'salem-hill'
const inPalace = personOn(PALACE)
const inCity = personOn(CITY)

export const covenantSet: SceneDescription = {
  id: 'l18-covenant',
  title: 'God’s covenant with David',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: PALACE, depth: 0.3 },
    { id: CITY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The cedar palace: David and Nathan.
    inPalace('david', 'david', 0.42, { facing: 1 }),
    inPalace('nathan', 'nathan', 0.6),
    // Jerusalem at night: the light over David's house (the golden thread), its beams, the tent and the ark.
    { id: 'house-glow', prop: 'halo', above: CITY, x: 0.5, y: 0.5, size: 0.3, opacity: 0 },
    ...BEAMS.map((b): SceneActor => ({ id: b.id, prop: 'halo', above: CITY, x: b.x, y: b.y, size: 0.05, opacity: 0 })),
    { id: 'tent', prop: 'tent', above: CITY, x: 0.22, y: 0.8, size: 0.12, opacity: 0 },
    { id: 'ark', prop: 'tabernacle-piece', above: CITY, x: pieceX('ark', 0.26, 0.4), y: 0.8, size: 0.4, pose: 'ark', opacity: 0 },
    inCity('david-before-ark', 'david', 0.36, { pose: 'sit', opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e8-s1',
    title: 'A house of cedar',
    music: 'handel-hallelujah',
    beats: [
      verse('2SA 7:1', camera({ zoom: 1.02 }, slow)),
      verse('2SA 7:2', actor('david', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 })),
      say('That night the word of the LORD came to Nathan, with a message for David.', actor('david', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      verse('2SA 7:5', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l18-e8-s2',
    title: 'The LORD will make you a house',
    music: 'handel-hallelujah',
    beats: [
      verse('2SA 7:8', ...swap('forest-sky', 'night-sky'), ...swap(PALACE, CITY), fadeOut('david'), fadeOut('nathan'), fadeIn('tent', 1.5), fadeIn('ark', 1.5)),
      verse('2SA 7:11', actor('house-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      play('a-house-for-ever', { done: BEAMS.map((b) => actor(b.id, { opacity: 0.9 }, { seconds: 0.5 })) }),
      verse('2SA 7:12', camera({ zoom: 1 }, slow)),
      verse('2SA 7:13', camera({ zoom: 1.02 }, slow)),
      verse('2SA 7:16', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l18-e8-s3',
    title: '“Who am I, O Lord GOD?”',
    music: 'handel-hallelujah',
    beats: [
      verse('2SA 7:18', fadeIn('david-before-ark', 0.5)),
      say('David wanted to build a house for God. Instead, God promised to build a “house” for David: a family of kings, and one King whose throne would last for ever.', camera({ zoom: 1.02, y: -0.02 }, slow)),
    ],
  },
]

export const episode8: Pick<Episode, 'set' | 'scenes'> = { set: covenantSet, scenes }
