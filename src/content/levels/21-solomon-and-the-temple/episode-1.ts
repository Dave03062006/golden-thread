import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'
import { kidronGround } from './ground'

/**
 * Episode 1 · Solomon Asks for Wisdom (1 Kings 1:38–3:15), from the approved Level 21 script.
 *
 * Solomon rides King David's mule down to the spring of Gihon and is anointed king. Old David
 * gives him his last charge. At Gibeon, God appears to him in a dream: "Ask what I shall give
 * you." The player puts Solomon's prayer in order, leaving aside long life and riches ("an
 * understanding mind", minigames/an-understanding-mind), and the light of the dream glows (this
 * episode's golden thread: "if any of you lacks wisdom, let him ask God").
 */

/** Solomon's prayer at Gibeon, in order, and the things he did not ask for. */
export const PRAYER = [
  { text: 'Thank God for his great and steadfast love to David', decoy: 'Ask for a long life' },
  { text: '“I am but a little child; I do not know how to go out or come in.”', decoy: 'Ask for riches' },
  { text: '“Give thy servant therefore an understanding mind.”', decoy: 'Ask for the life of his enemies' },
]
export const DREAM = 'dream-glow'

const GIHON = 'kidron-olives'
const HOME = 'house-inside'
const GIBEON = 'canaan-hills'
const at = (x: number) => ({ above: GIHON, x, y: kidronGround(x), size: 0.044, facing: -1 as const })
const inHome = personOn(HOME)
const atGibeon = personOn(GIBEON)

export const wisdomSet: SceneDescription = {
  id: 'l21-wisdom',
  title: 'Solomon asks for wisdom',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: GIHON, depth: 0.3 },
    { id: HOME, depth: 0.3, opacity: 0 },
    { id: GIBEON, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The spring of Gihon: Solomon on David's mule, Zadok with the horn of oil, Nathan, the crowd.
    { id: 'spring', prop: 'pool', above: GIHON, x: 0.44, y: 0.9, size: 0.08 },
    { id: 'mule', prop: 'donkey', ...at(0.4), size: 0.07, facing: 1 },
    { id: 'solomon', prop: 'solomon', ...at(0.4), y: kidronGround(0.4) - 0.05, facing: 1 },
    { id: 'zadok', prop: 'high-priest', ...at(0.5) },
    { id: 'horn', prop: 'oil-vial', above: GIHON, x: 0.455, y: kidronGround(0.5) - 0.1, size: 0.015 },
    { id: 'nathan', prop: 'nathan', ...at(0.56) },
    { id: 'crowd', prop: 'hebrew-family', ...at(0.24), size: 0.12, facing: 1 },
    // David's room: the old king in his bed, and Solomon kneeling beside him.
    inHome('david', 'david-old', 0.4, { pose: 'sit', facing: 1, opacity: 0 }),
    inHome('solomon-home', 'solomon', 0.54, { pose: 'kneel', opacity: 0 }),
    // Gibeon at night: the great altar, Solomon asleep, the light of the dream (the golden thread).
    { id: 'altar', prop: 'altar', above: GIBEON, x: 0.3, y: 0.8, size: 0.08, opacity: 0 },
    atGibeon('solomon-gibeon', 'solomon', 0.48, { pose: 'sit', facing: 1, opacity: 0 }),
    { id: DREAM, prop: 'halo', above: GIBEON, x: 0.5, y: 0.6, size: 0.3, opacity: 0 },
  ],
  camera: DRIFT,
}

const atGihonNow = ['spring', 'mule', 'solomon', 'zadok', 'horn', 'nathan', 'crowd']

const scenes: StoryScene[] = [
  {
    id: 'l21-e1-s1',
    title: '“Long live King Solomon!”',
    music: 'handel-zadok',
    beats: [
      say('King David was old. Before he died, he kept his promise to Bathsheba: their son Solomon would be king after him.', camera({ zoom: 1.02 }, slow)),
      verse('1KI 1:39', actor('horn', { y: kidronGround(0.4) - 0.14, x: 0.42 }, { seconds: 2, delay: 0.5 }), actor('zadok', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 })),
      verse('1KI 1:40', actor('zadok', { pose: 'idle' }, { seconds: 0.8 }), actor('crowd', { x: 0.3 }, { seconds: 4, ease: 'inOutSine' }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l21-e1-s2',
    title: '“Be strong, and show yourself a man”',
    music: 'handel-zadok',
    beats: [
      say('Before he died, David gave his son a last charge.', ...swap(GIHON, HOME), ...atGihonNow.map((id) => fadeOut(id)), fadeIn('david', 1.5), fadeIn('solomon-home', 1.5)),
      verse('1KI 2:2', actor('david', { pose: 'lift' }, { seconds: 0.8, delay: 0.5 }), camera({ zoom: 1.03 }, slow)),
      verse('1KI 2:3', actor('david', { pose: 'sit' }, { seconds: 0.8, delay: 1 })),
      say('David died, and was buried in the city of David. He had reigned over Israel for forty years.', fadeOut('david', 1), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l21-e1-s3',
    title: '“Ask what I shall give you”',
    music: 'handel-zadok',
    beats: [
      verse('1KI 3:5', ...swap('forest-sky', 'night-sky'), ...swap(HOME, GIBEON), fadeOut('solomon-home'), fadeIn('altar', 1.5), fadeIn('solomon-gibeon', 1.5), actor(DREAM, { opacity: 0.35 }, { seconds: 0.6, delay: 0.2 })),
      verse('1KI 3:7', camera({ zoom: 1.03 }, slow)),
      play('an-understanding-mind', { done: [actor(DREAM, { opacity: 0.9 }, { seconds: 0.5 })] }),
      verse('1KI 3:9'),
      verse('1KI 3:11', camera({ zoom: 1 }, slow)),
      verse('1KI 3:12', actor('solomon-gibeon', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('1KI 3:13', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: wisdomSet, scenes }
