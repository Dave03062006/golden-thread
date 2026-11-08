import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · A Prophet Like Moses (Deuteronomy 18:15–19; 31:1–8, 23–24), from the approved
 * Level 13 script.
 *
 * Moses remembers the people's fear at Sinai, and promises that God will raise up another
 * prophet like him; he looks far beyond the camp, and glows (this episode's golden thread:
 * "This is my beloved Son… listen to him"). He is a hundred and twenty years old and will not
 * cross the Jordan. Before all Israel he lays his hands on Joshua, and the player holds them
 * there while the light passes to Joshua and the tribes turn to follow him ("be strong and of
 * good courage", minigames/be-strong). Then Moses writes the law in a book.
 */

/** Moses and Joshua, the light that passes between them, and the tribes that come to follow him. */
export const MOSES = { id: 'moses', x: 0.46, glow: 'moses-glow' }
export const JOSHUA = { id: 'joshua', x: 0.52, glow: 'joshua-glow' }
export const TRIBES = [0.1, 0.24, 0.76, 0.9].map((x, i) => ({ id: `tribe-${i + 1}`, prop: ['hebrew-family', 'hebrew-workers', 'elders', 'hebrew-women'][i]!, x, to: x + (x < 0.5 ? 0.08 : -0.08) }))
/** Moses' words, which rise one by one while his hands rest on Joshua. */
export const COURAGE = ['Be strong', 'and of good courage;', 'the LORD goes before you;', 'he will be with you;', 'he will not fail you or forsake you.']

const CAMP = 'dry-hills'
const SINAI = 'horeb'
const person = personOn(CAMP)

export const prophetSet: SceneDescription = {
  id: 'l13-prophet',
  title: 'A prophet like Moses',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: SINAI, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Sinai remembered: the mountain in fire, and the people standing far off.
    { id: 'storm', prop: 'storm-cloud', above: SINAI, x: 0.44, y: 0.24, size: 0.3, opacity: 0 },
    { id: 'fire', prop: 'halo', above: SINAI, x: 0.44, y: 0.3, size: 0.16, opacity: 0 },
    person('afraid', 'hebrew-family', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    // The plains of Moab: the tribes, Moses and his glow (the golden thread), Joshua, and the book of the law.
    ...TRIBES.map((t): SceneActor => person(t.id, t.prop, t.x, { size: 0.11, facing: t.x < 0.5 ? 1 : -1 })),
    { id: MOSES.glow, prop: 'halo', above: CAMP, x: MOSES.x, y: 0.7, size: 0.12, opacity: 0 },
    { id: JOSHUA.glow, prop: 'halo', above: CAMP, x: JOSHUA.x, y: 0.7, size: 0.12, opacity: 0 },
    { id: 'rod', prop: 'staff', above: CAMP, x: MOSES.x + 0.018, y: 0.765, size: 0.012 },
    person(MOSES.id, 'moses-old', MOSES.x, { y: 0.765, facing: 1 }),
    person(JOSHUA.id, 'joshua', JOSHUA.x, { opacity: 0 }),
    { id: 'book', prop: 'scroll', above: CAMP, x: 0.4, y: 0.76, size: 0.03, opacity: 0 },
    person('priest', 'priest', 0.32, { facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l13-e3-s1',
    title: 'A prophet like me',
    music: 'go-down-moses',
    beats: [
      verse('DEU 18:15', fadeIn(MOSES.glow, 0.5, 0.85), camera({ zoom: 1.02 }, slow)),
      verse('DEU 18:16', camera({ zoom: 1 }, slow), ...swap(CAMP, SINAI), ...swap('forest-sky', 'storm-sky'), ...[...TRIBES.map((t) => t.id), MOSES.id, 'rod', MOSES.glow].map((id) => fadeOut(id)), fadeIn('storm', 1), fadeIn('fire', 1.5, 0.9), fadeIn('afraid', 1.5)),
      verse('DEU 18:18', ...swap(SINAI, CAMP), ...swap('storm-sky', 'forest-sky'), ...['storm', 'fire', 'afraid'].map((id) => fadeOut(id)), ...[...TRIBES.map((t) => t.id), MOSES.id, 'rod'].map((id) => fadeIn(id, 1.5)), fadeIn(MOSES.glow, 2, 0.85)),
      say('Through the centuries, many prophets came to Israel: Samuel, Elijah, Isaiah, Jeremiah. But the people kept waiting for the one prophet who would be truly like Moses, who would know God face to face.', camera({ zoom: 1.02, x: 0.01 }, slow)),
    ],
  },
  {
    id: 'l13-e3-s2',
    title: '“I am no longer able”',
    music: 'go-down-moses',
    beats: [
      verse('DEU 31:2', camera({ zoom: 1, x: 0 }, slow), ...pose(MOSES.id, 'lift', 0.5, 3)),
      verse('DEU 31:6', ...pose(MOSES.id, 'lift', 0.5, 4)),
      say('He had led them for forty years. Now God would lead them on with someone else.', fadeIn(JOSHUA.id, 0.5), ...walk(JOSHUA.id, { x: JOSHUA.x - 0.01 }, 1, 0.5)),
    ],
  },
  {
    id: 'l13-e3-s3',
    title: 'Be strong and of good courage',
    music: 'go-down-moses',
    beats: [
      verse('DEU 31:7', actor(JOSHUA.id, { pose: 'kneel', facing: -1 }, { seconds: 0.8, delay: 0.5 })),
      verse('DEU 31:8'),
      play('be-strong', {
        cues: [actor(MOSES.id, { pose: 'lift' }, { seconds: 0.8 })],
        done: [actor(MOSES.glow, { opacity: 0.3 }, { seconds: 0.5 }), actor(JOSHUA.glow, { opacity: 0.85 }, { seconds: 0.5 }), actor(MOSES.id, { pose: 'idle' }, { seconds: 0.5 }), actor(JOSHUA.id, { pose: 'idle' }, { seconds: 0.5 }), ...TRIBES.map((t) => actor(t.id, { x: t.to }, { seconds: 0.5 }))],
      }),
      verse('DEU 31:23', camera({ zoom: 1.02 }, slow)),
      verse('DEU 31:24', camera({ zoom: 1 }, slow), fadeIn('book', 0.5), fadeIn('priest', 1), ...walk('priest', { x: 0.37 }, 2, 1.5)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: prophetSet, scenes }
