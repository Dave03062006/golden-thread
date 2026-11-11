import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · To Obey Is Better Than Sacrifice (1 Samuel 13; 15), from the approved Level 17
 * script.
 *
 * At Gilgal Saul will not wait for Samuel and offers the sacrifice himself. Sent against Amalek
 * (told in a sentence, nothing shown), he keeps the best of the flocks; the player checks his
 * excuses against what happened ("the bleating of the sheep", minigames/the-bleating-of-the-sheep).
 * Samuel tells him, "to obey is better than sacrifice," with the light around him (this episode's
 * golden thread: "Lo, I have come to do thy will"), and the kingdom is torn from Saul.
 */

const GILGAL = 'jordan-valley'
const CARMEL = 'dry-hills'
const person = personOn(GILGAL)
const atCarmel = personOn(CARMEL)

export const obeySet: SceneDescription = {
  id: 'l17-obey',
  title: 'To obey is better than sacrifice',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: GILGAL, depth: 0.3 },
    { id: CARMEL, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Gilgal: Saul's army slipping away, the altar, and Samuel arriving.
    person('army', 'hebrew-workers', 0.24, { size: 0.12, facing: 1 }),
    person('saul', 'saul', 0.46, { size: 0.05, facing: 1 }),
    { id: 'altar', prop: 'altar', above: GILGAL, x: 0.6, y: 0.8, size: 0.06 },
    { id: 'smoke', prop: 'smoke', above: GILGAL, x: 0.6, y: 0.66, size: 0.1, pose: 'rising', opacity: 0 },
    person('samuel', 'samuel', 0.98, { opacity: 0 }),
    // Carmel: Saul's monument, the spared flocks, Samuel, and the light as he speaks (the golden thread).
    { id: 'monument', prop: 'stone-pillar', above: CARMEL, x: 0.16, y: 0.8, size: 0.05, pose: 'standing', opacity: 0 },
    ...[0.66, 0.74, 0.82].map((x, i) => ({ id: `sheep-${i + 1}`, prop: 'sheep', above: CARMEL, x, y: 0.82, size: 0.04, opacity: 0 })),
    atCarmel('saul-carmel', 'saul', 0.34, { size: 0.05, facing: 1, opacity: 0 }),
    atCarmel('samuel-carmel', 'samuel', 0.5, { opacity: 0 }),
    { id: 'word-glow', prop: 'halo', above: CARMEL, x: 0.5, y: 0.62, size: 0.16, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e6-s1',
    title: 'Saul could not wait',
    music: 'allegri-miserere',
    beats: [
      verse('1SA 13:8', ...walk('army', { x: -0.08, facing: -1 }, 4, 0.5), fadeOut('army', 3)),
      verse('1SA 13:9', fadeIn('smoke', 0.5, 0.8), ...pose('saul', 'lift', 0.5, 3)),
      verse('1SA 13:10', fadeIn('samuel', 0.3), ...walk('samuel', { x: 0.74 }, 3, 0.5)),
      verse('1SA 13:11', camera({ zoom: 1.02 }, slow)),
      verse('1SA 13:13', ...pose('samuel', 'lift', 0.5, 3)),
      verse('1SA 13:14', fadeOut('smoke'), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e6-s2',
    title: 'The bleating of the sheep',
    music: 'allegri-miserere',
    beats: [
      verse('1SA 15:1', ...swap(GILGAL, CARMEL), ...['saul', 'altar', 'samuel'].map((id) => fadeOut(id)), fadeIn('saul-carmel', 1.5), fadeIn('samuel-carmel', 1.5)),
      say('God sent Saul against the Amalekites, who had attacked Israel on the way out of Egypt. He was to keep nothing for himself: everything was to be “devoted,” given up to God, as at Jericho.', camera({ zoom: 1.02 }, slow)),
      verse('1SA 15:9', fadeIn('monument', 0.5), ...[1, 2, 3].map((i) => fadeIn(`sheep-${i}`, 0.5 + i * 0.3))),
      verse('1SA 15:11', ...swap('forest-sky', 'evening-sky'), actor('samuel-carmel', { pose: 'pray' }, { seconds: 0.8, delay: 0.5 })),
      verse('1SA 15:13', ...swap('evening-sky', 'forest-sky'), actor('samuel-carmel', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), ...pose('saul-carmel', 'lift', 0.5, 3)),
      verse('1SA 15:14', camera({ zoom: 1 }, slow)),
      play('the-bleating-of-the-sheep', { done: [] }),
      verse('1SA 15:15', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l17-e6-s3',
    title: 'To obey is better than sacrifice',
    music: 'allegri-miserere',
    beats: [
      verse('1SA 15:22', actor('word-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...pose('samuel-carmel', 'lift', 0.5, 3)),
      verse('1SA 15:23', camera({ zoom: 1 }, slow)),
      verse('1SA 15:27', actor('samuel-carmel', { x: 0.62, facing: 1 }, { seconds: 1.5, delay: 0.3 }), actor('saul-carmel', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('1SA 15:28', camera({ zoom: 1.02 }, slow)),
      verse('1SA 15:35', ...swap('forest-sky', 'evening-sky'), fadeOut('word-glow', 0.5), ...walk('samuel-carmel', { x: 1.04, facing: 1 }, 4, 0.5), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: obeySet, scenes }
