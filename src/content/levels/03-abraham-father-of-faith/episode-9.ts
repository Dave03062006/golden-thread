import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 9 · Laughter: Isaac Is Born (Genesis 21:1–8), from the approved Level 3 script.
 *
 * Spring at Mamre: Sarah, ninety, holds her newborn son (this episode's golden thread:
 * children of promise), and Abraham kneels beside them. The whole camp comes running,
 * laughing. At the feast for Isaac, the player keeps the beat on a drum ("the feast",
 * minigames/the-feast): every beat kept brings more dancers and lamps, until the whole
 * camp is dancing.
 */

/** The dancers who join, and the lamps lit, as the beat is kept. */
export const DANCERS = ['dancers-1', 'dancers-2', 'dancers-3']
export const LAMPS = ['lamp-1', 'lamp-2', 'lamp-3', 'lamp-4']

const ABOVE = 'canaan-hills'

export const isaacBornSet: SceneDescription = {
  id: 'l03-isaac-born',
  title: 'Isaac is born',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3 },
  ],
  actors: [
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.28, y: 0.79, size: 0.32 },
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.74, y: 0.76, size: 0.14, pose: 'open' },
    ...LAMPS.map((id, i): SceneActor => ({ id, prop: 'oil-lamp', above: ABOVE, x: 0.12 + i * 0.25, y: 0.78, size: 0.022, opacity: 0 })),
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.4, y: 0.8, size: 0.18, opacity: 0 },
    ...DANCERS.map((id, i): SceneActor => ({
      id,
      prop: 'crowd',
      above: ABOVE,
      x: 0.16 + i * 0.3,
      y: 0.82,
      size: 0.1,
      facing: i % 2 ? -1 : 1,
      pose: 'walk',
      opacity: 0,
      path: {
        loopSeconds: 4,
        x: [
          { at: 0, value: -0.02 },
          { at: 2, value: 0.02, ease: 'inOutSine' },
          { at: 4, value: -0.02, ease: 'inOutSine' },
        ],
        y: [
          { at: 0, value: 0 },
          { at: 1, value: -0.01, ease: 'inOutSine' },
          { at: 2, value: 0, ease: 'inOutSine' },
          { at: 3, value: -0.01, ease: 'inOutSine' },
          { at: 4, value: 0, ease: 'inOutSine' },
        ],
      },
    })),
    { id: 'drum', prop: 'hand-drum', above: ABOVE, x: 0.6, y: 0.8, size: 0.03, opacity: 0 },
    // The beat, pulsing: something to follow by eye as well as by ear.
    { id: 'beat', prop: 'halo', above: ABOVE, x: 0.6, y: 0.72, size: 0.05, opacity: 0 },
    // Sarah with the newborn Isaac: the golden thread; Abraham beside them; the camp.
    { id: 'sarah', prop: 'sarai', above: ABOVE, x: 0.5, y: 0.79, size: 0.038, facing: -1, pose: 'carry' },
    { id: 'baby', prop: 'swaddled-baby', above: ABOVE, x: 0.482, y: 0.735, size: 0.026 },
    { id: 'baby-isaac', prop: 'halo', above: ABOVE, x: 0.482, y: 0.7, size: 0.06, opacity: 0 },
    { id: 'abraham', prop: 'abram', above: ABOVE, x: 0.42, y: 0.8, size: 0.042, facing: 1, pose: 'kneel' },
    { id: 'camp', prop: 'crowd', above: ABOVE, x: 0.86, y: 0.82, size: 0.12, facing: -1, opacity: 0 },
    { id: 'isaac', prop: 'boy', above: ABOVE, x: 0.46, y: 0.83, size: 0.022, facing: 1, opacity: 0 },
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

/** After the feast: every dancer dancing, every lamp lit. */
const FEASTED = [...DANCERS.map((id) => actor(id, { opacity: 1 }, { seconds: 1 })), ...LAMPS.map((id) => actor(id, { opacity: 1 }, { seconds: 1 })), actor('beat', { opacity: 0, size: 0.05 }, { seconds: 1 })]

const scenes: StoryScene[] = [
  {
    id: 'l03-e9-s1',
    title: 'As he had said',
    music: 'mozart-alleluja',
    beats: [
      verse('GEN 21:1', fadeIn('baby-isaac', 0.5, 0.85), camera({ zoom: 1.05, x: 0.01, y: 0.01 }, slow)),
      verse('GEN 21:2'),
      say('Twenty-five years after God first called Abram from Haran, the promise was in Sarah’s arms.', camera({ zoom: 1, x: 0, y: 0 }, slow)),
    ],
  },
  {
    id: 'l03-e9-s2',
    title: 'God has made laughter for me',
    music: 'mozart-alleluja',
    beats: [
      verse('GEN 21:3', fadeIn('camp'), actor('camp', { x: 0.66 }, { seconds: 4, ease: 'inOutSine' }), actor('abraham', { pose: 'lift' }, { seconds: 1 })),
      say('Once Abraham and Sarah had laughed because they could not believe. Now they laughed for joy.'),
      verse('GEN 21:6', actor('abraham', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l03-e9-s3',
    title: 'A great feast',
    music: 'mozart-alleluja',
    beats: [
      verse(
        'GEN 21:8',
        // Some years on: Isaac toddles between the guests at his feast, at evening.
        layer('vineyard-sky', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        fadeOut('baby'),
        fadeOut('baby-isaac'),
        actor('sarah', { pose: 'idle' }, { seconds: 1 }),
        fadeIn('isaac', 1),
        actor('isaac', { x: 0.36, pose: 'walk' }, { seconds: 5, ease: 'inOutSine', delay: 1.5 }),
        actor('isaac', { pose: 'idle' }, { seconds: 0.5, delay: 6.5 }),
        fadeIn('mat', 1),
        fadeIn('drum', 1.5),
        fadeOut('camp', 1),
      ),
      play('the-feast', { cues: [], done: FEASTED }),
    ],
  },
]

export const episode9: Pick<Episode, 'set' | 'scenes'> = { set: isaacBornSet, scenes }
