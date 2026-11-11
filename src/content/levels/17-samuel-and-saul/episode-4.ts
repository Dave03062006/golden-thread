import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Israel Asks for a King (1 Samuel 7–8), from the approved Level 17 script.
 *
 * At Mizpah the people turn back to God, the LORD thunders, and Samuel sets up the stone
 * Ebenezer, which glows (this episode's golden thread: "The Lord is my helper"). Years later the
 * elders ask for "a king to govern us like all the nations." Samuel warns them what a king will
 * take, and the player names it, item by item ("what the king will take",
 * minigames/what-the-king-will-take). The people want a king anyway.
 */

/** What a king will take, in the order Samuel says it, each one something in the village street. */
export const TAKEN = [
  { id: 'taken-sons', prop: 'hebrew-workers', x: 0.16, size: 0.1, text: 'Your sons, for his chariots and horsemen' },
  { id: 'taken-daughters', prop: 'hebrew-women', x: 0.3, size: 0.1, text: 'Your daughters, as perfumers, cooks and bakers' },
  { id: 'taken-vineyards', prop: 'vine', x: 0.44, size: 0.06, text: 'The best of your fields, vineyards and olive orchards' },
  { id: 'taken-grain', prop: 'sheaf', x: 0.56, size: 0.04, pose: 'stand', text: 'A tenth of your grain and of your vineyards' },
  { id: 'taken-cattle', prop: 'cow', x: 0.7, size: 0.06, pose: 'fat', text: 'Your servants, and the best of your cattle and asses' },
  { id: 'taken-flocks', prop: 'sheep', x: 0.84, size: 0.05, text: 'A tenth of your flocks: and you shall be his slaves' },
]

const MIZPAH = 'green-hills'
const RAMAH = 'city-street'
const person = personOn(MIZPAH)
const inTown = personOn(RAMAH)

export const kingSet: SceneDescription = {
  id: 'l17-king',
  title: 'Israel asks for a king',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: MIZPAH, depth: 0.3 },
    { id: RAMAH, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Mizpah: the people praying, Samuel, and the stone Ebenezer (the golden thread).
    person('people', 'hebrew-family', 0.66, { size: 0.12 }),
    person('samuel', 'samuel', 0.44, { facing: 1 }),
    { id: 'ebenezer', prop: 'stone-pillar', above: MIZPAH, x: 0.3, y: 0.8, size: 0.05, pose: 'standing', opacity: 0 },
    { id: 'stone-glow', prop: 'halo', above: MIZPAH, x: 0.3, y: 0.64, size: 0.14, opacity: 0 },
    // Ramah: the elders, and the village with all a king will take.
    inTown('samuel-old', 'samuel', 0.46, { opacity: 0 }),
    inTown('elders', 'elders', 0.96, { size: 0.12, opacity: 0 }),
    ...TAKEN.map((t): SceneActor => ({ id: t.id, prop: t.prop, above: RAMAH, x: t.x, y: 0.82, size: t.size, pose: t.pose, facing: 1, opacity: 0 })),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e4-s1',
    title: 'Ebenezer',
    music: 'god-of-abraham-praise',
    beats: [
      verse('1SA 7:3', ...pose('samuel', 'lift', 0.5, 3)),
      say('The people put away their idols and gathered at Mizpah to pray. When the Philistines attacked, the LORD thundered against them with a great voice, and they ran.', ...swap('forest-sky', 'storm-sky'), ...swap('storm-sky', 'forest-sky', 3)),
      verse('1SA 7:12', fadeIn('ebenezer', 0.5), actor('stone-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 })),
      verse('1SA 7:15', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l17-e4-s2',
    title: '“Give us a king”',
    music: 'god-of-abraham-praise',
    beats: [
      verse('1SA 8:1', ...swap(MIZPAH, RAMAH), ...['people', 'samuel', 'ebenezer', 'stone-glow'].map((id) => fadeOut(id)), fadeIn('samuel-old', 1.5), camera({ zoom: 1 }, slow)),
      verse('1SA 8:3', camera({ zoom: 1.02 }, slow)),
      verse('1SA 8:5', fadeIn('elders', 0.3), ...walk('elders', { x: 0.66 }, 3, 0.5)),
      verse('1SA 8:6', actor('samuel-old', { pose: 'pray' }, { seconds: 0.8, delay: 0.3 })),
      verse('1SA 8:7', actor('samuel-old', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e4-s3',
    title: 'The ways of the king',
    music: 'god-of-abraham-praise',
    beats: [
      verse('1SA 8:11', fadeOut('elders'), actor('samuel-old', { x: 0.5 }, { seconds: 1, delay: 0.3 }), ...TAKEN.map((t, i) => fadeIn(t.id, 0.5 + i * 0.2))),
      play('what-the-king-will-take', { done: TAKEN.map((t) => actor(t.id, { opacity: 0 }, { seconds: 0.5 })) }),
      verse('1SA 8:18', camera({ zoom: 1.02 }, slow)),
      verse('1SA 8:19', fadeIn('elders', 0.5)),
      verse('1SA 8:20', camera({ zoom: 1 }, slow)),
      verse('1SA 8:22', ...pose('samuel-old', 'lift', 0.5, 3)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: kingSet, scenes }
