import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'
import { kidronGround } from './ground'

/**
 * Episode 6 · Solomon's Heart Turns Away (1 Kings 11), from the approved Level 21 script.
 *
 * Old Solomon walks with his foreign wives up the hill east of Jerusalem, where he has built
 * shrines to their gods. Alone on his throne at night, he hears God's word: the kingdom will be
 * torn. The player walks back through Solomon's life and chooses at each crossroads what a heart
 * wholly true to God would do ("a heart wholly true", minigames/a-heart-wholly-true). Last, the
 * prophet Ahijah tears his new cloak into twelve pieces and gives ten to Jeroboam; the torn cloak
 * glows (this episode's golden thread: "no one can serve two masters").
 */

/** The crossroads of Solomon's life: the true choice, and the one that turns the heart away. */
export const CROSSROADS = [
  { when: 'God says, “Ask what I shall give you.”', right: 'Ask for an understanding mind', wrong: 'Ask for riches and a long life' },
  { when: 'The Temple is finished.', right: 'Give it to God, and pray for all his people', wrong: 'Keep it as a monument to himself' },
  { when: 'Foreign princesses come, serving other gods.', right: 'Keep God’s command, and guard his heart', wrong: 'Marry them all, and follow their ways' },
  { when: 'They ask for shrines to their gods on the hill.', right: 'Worship the LORD alone', wrong: 'Build the shrines, to please them' },
]

const HILL = 'kidron-olives'
const PALACE = 'house-inside'
const ROAD = 'canaan-hills'
const onHill = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: HILL, x, y: kidronGround(x), size: 0.044, facing: 1, ...extra })
const inPalace = personOn(PALACE)
const onRoad = personOn(ROAD)

export const heartSet: SceneDescription = {
  id: 'l21-heart',
  title: 'Solomon’s heart turns away',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: HILL, depth: 0.3 },
    { id: PALACE, depth: 0.3, opacity: 0 },
    { id: ROAD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The hill east of Jerusalem: old Solomon, his foreign wives, and the shrines with their smoke.
    onHill('solomon-hill', 'solomon-old', 0.54),
    onHill('wives', 'hebrew-women', 0.62, { size: 0.1 }),
    ...[0.74, 0.8, 0.88].map((x, i): SceneActor => ({ id: `shrine-${i + 1}`, prop: 'idol', above: HILL, x, y: kidronGround(x), size: 0.02 })),
    { id: 'shrine-smoke', prop: 'smoke', above: HILL, x: 0.8, y: kidronGround(0.8) - 0.04, size: 0.06, pose: 'rising' },
    // The palace at night: Solomon alone on his throne, and the lamps of the true choices.
    { id: 'throne', prop: 'throne', above: PALACE, x: 0.3, y: 0.8, size: 0.09, opacity: 0 },
    inPalace('solomon', 'solomon-old', 0.3, { pose: 'sit', facing: 1, opacity: 0 }),
    ...CROSSROADS.map((_, i): SceneActor => ({ id: `lamp-${i + 1}`, prop: 'oil-lamp', above: PALACE, x: 0.48 + i * 0.1, y: 0.7, size: 0.025, opacity: 0 })),
    // The road: Ahijah, Jeroboam, and the pieces of the torn cloak.
    onRoad('ahijah', 'ahijah', 0.42, { facing: 1, opacity: 0 }),
    onRoad('jeroboam', 'jeroboam', 0.58, { opacity: 0 }),
    { id: 'cloak', prop: 'cloak', above: ROAD, x: 0.48, y: 0.74, size: 0.05, opacity: 0 },
    ...Array.from({ length: 10 }, (_, i): SceneActor => ({ id: `piece-${i + 1}`, prop: 'cloak', above: ROAD, x: 0.62 + (i % 5) * 0.025, y: 0.8 + Math.floor(i / 5) * 0.025, size: 0.018, opacity: 0 })),
    { id: 'cloak-glow', prop: 'halo', above: ROAD, x: 0.5, y: 0.62, size: 0.18, opacity: 0 },
  ],
  camera: DRIFT,
}

const onTheHill = ['solomon-hill', 'wives', 'shrine-1', 'shrine-2', 'shrine-3', 'shrine-smoke']
const inThePalace = ['throne', 'solomon', ...CROSSROADS.map((_, i) => `lamp-${i + 1}`)]

const scenes: StoryScene[] = [
  {
    id: 'l21-e6-s1',
    title: 'His heart was not wholly true',
    music: 'abide-with-me',
    beats: [
      say('As he grew richer and more powerful, Solomon married many foreign princesses, against the command of God, who had warned that they would turn his heart to their own gods.', camera({ zoom: 1.02 }, slow)),
      verse('1KI 11:4', actor('solomon-hill', { x: 0.62, y: kidronGround(0.62) }, { seconds: 5, ease: 'inOutSine' }), actor('wives', { x: 0.7, y: kidronGround(0.7) }, { seconds: 5, ease: 'inOutSine' })),
      say('On the hill east of Jerusalem, Solomon built shrines to the gods of his wives.', camera({ zoom: 1.02, x: 0.03 }, slow)),
      verse('1KI 11:9', ...swap('evening-sky', 'night-sky'), camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l21-e6-s2',
    title: '“I will surely tear the kingdom from you”',
    music: 'abide-with-me',
    beats: [
      verse('1KI 11:11', ...swap(HILL, PALACE), ...onTheHill.map((id) => fadeOut(id)), fadeIn('throne', 1.5), fadeIn('solomon', 1.5)),
      verse('1KI 11:12', camera({ zoom: 1.03 }, slow)),
      play('a-heart-wholly-true', { done: CROSSROADS.map((_, i) => actor(`lamp-${i + 1}`, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('1KI 11:13', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l21-e6-s3',
    title: 'Twelve pieces',
    music: 'abide-with-me',
    beats: [
      verse('1KI 11:29', ...swap('night-sky', 'forest-sky'), ...swap(PALACE, ROAD), ...inThePalace.map((id) => fadeOut(id)), fadeIn('ahijah', 1.5), fadeIn('jeroboam', 1.5), fadeIn('cloak', 1.5), actor('cloak-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('1KI 11:30', actor('ahijah', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 }), actor('cloak', { opacity: 0 }, { seconds: 1, delay: 1 })),
      verse('1KI 11:31', actor('ahijah', { pose: 'idle' }, { seconds: 0.8 }), ...Array.from({ length: 10 }, (_, i) => fadeIn(`piece-${i + 1}`, 0.3 + i * 0.15))),
      say('Solomon died after reigning forty years, and his son Rehoboam became king. The story of the kingdom torn in two is told in Level 23.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: heartSet, scenes }
