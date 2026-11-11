import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · Gleaning in Boaz's Field (Ruth 2), from the approved Level 16 script.
 *
 * Ruth gleans behind the reapers, and "happens" to come to the field of Boaz. He blesses her,
 * and the light spreads around her like wings (this episode's golden thread: "as a hen gathers
 * her brood under her wings"). His young men leave handfuls on purpose, and the player gathers
 * them until evening ("gleaning", minigames/gleaning): an ephah of barley.
 */

/** The stalks left behind the reapers, and the heap of barley Ruth has gathered. */
export const STALKS = [0.2, 0.3, 0.42, 0.5, 0.6, 0.7, 0.78, 0.88].map((x, i) => ({ id: `stalk-${i + 1}`, x, y: i % 2 ? 0.84 : 0.88 }))
export const HEAP = 'gleaned'

const FIELD = 'wheat-field'
const person = personOn(FIELD)

export const gleaningSet: SceneDescription = {
  id: 'l16-gleaning',
  title: 'Gleaning in Boaz’s field',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: FIELD, depth: 0.3 },
  ],
  actors: [
    // The reapers and the sheaves, Ruth gleaning behind them, and Boaz coming out from the town.
    person('reapers', 'hebrew-workers', 0.3, { size: 0.12, facing: 1 }),
    ...[0.18, 0.42].map((x, i): SceneActor => ({ id: `sheaf-${i + 1}`, prop: 'sheaf', above: FIELD, x, y: 0.82, size: 0.04, pose: 'stand' })),
    person('ruth', 'ruth', 0.68, { pose: 'work' }),
    person('boaz', 'boaz', -0.06, { facing: 1 }),
    // The light that spreads around Ruth like wings (the golden thread).
    { id: 'wings-glow', prop: 'halo', above: FIELD, x: 0.66, y: 0.62, size: 0.26, opacity: 0 },
    // The midday meal, the stalks left on purpose, and the barley she has gathered.
    { id: 'meal', prop: 'bread-and-wine', above: FIELD, x: 0.5, y: 0.82, size: 0.06, opacity: 0 },
    ...STALKS.map((s): SceneActor => ({ id: s.id, prop: 'grain-stalk', above: FIELD, x: s.x, y: s.y, size: 0.03, pose: 'full', opacity: 0 })),
    { id: HEAP, prop: 'grain-heap', above: FIELD, x: 0.74, y: 0.82, size: 0.06, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l16-e3-s1',
    title: 'She happened to come to Boaz’s field',
    music: 'vivaldi-autumn-allegro',
    beats: [
      verse('RUT 2:1', camera({ zoom: 1.02 }, slow)),
      verse('RUT 2:2', camera({ zoom: 1 }, slow)),
      verse('RUT 2:3', ...pose('ruth', 'work', 0.5, 3)),
      verse('RUT 2:4', ...walk('boaz', { x: 0.42, facing: 1 }, 3, 0.3), ...pose('boaz', 'lift', 3.5, 2)),
    ],
  },
  {
    id: 'l16-e3-s2',
    title: 'Under his wings',
    music: 'vivaldi-autumn-allegro',
    beats: [
      verse('RUT 2:5', camera({ zoom: 1.02 }, slow)),
      verse('RUT 2:8', ...walk('boaz', { x: 0.56, facing: 1 }, 2, 0.3)),
      verse('RUT 2:10', actor('ruth', { pose: 'kneel', facing: -1 }, { seconds: 0.8, delay: 0.3 })),
      verse('RUT 2:11', actor('ruth', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      verse('RUT 2:12', actor('wings-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...pose('boaz', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l16-e3-s3',
    title: 'Handfuls on purpose',
    music: 'vivaldi-autumn-allegro',
    beats: [
      verse('RUT 2:14', fadeIn('meal', 0.5), actor('ruth', { pose: 'sit' }, { seconds: 0.8, delay: 0.5 })),
      verse('RUT 2:15', fadeOut('meal'), fadeOut('wings-glow'), actor('ruth', { pose: 'work' }, { seconds: 0.8, delay: 0.5 })),
      verse('RUT 2:16', ...STALKS.map((s, i) => fadeIn(s.id, 0.3 + i * 0.15))),
      play('gleaning', { done: [...STALKS.map((s) => actor(s.id, { opacity: 0 }, { seconds: 0.5 })), actor(HEAP, { opacity: 1 }, { seconds: 0.5 })] }),
      verse('RUT 2:17', actor('ruth', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1.02 }, slow)),
      verse('RUT 2:20', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: gleaningSet, scenes }
