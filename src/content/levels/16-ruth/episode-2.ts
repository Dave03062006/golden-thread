import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · "Where You Go I Will Go" (Ruth 1:8–22), from the approved Level 16 script.
 *
 * At the crossroads Naomi sends her daughters-in-law home. Orpah goes back; Ruth holds on to
 * Naomi and will not let go, and a light glows where she holds her (this episode's golden
 * thread: "no longer strangers and sojourners"). The player puts Ruth's promise back together in
 * order ("where you go", minigames/where-you-go), and Ruth comes a step closer with each part.
 * At Bethlehem's gate Naomi says, "Call me Mara."
 */

/** Ruth's promise, part by part, in order. */
export const PROMISE = ['where you go I will go', 'and where you lodge I will lodge', 'your people shall be my people', 'and your God my God', 'where you die I will die', 'and there will I be buried']
/** Ruth comes closer to Naomi with each part of her promise. */
export const RUTH = { id: 'ruth', from: 0.66, to: 0.54 }

const ROADS = 'two-roads'
const GATE = 'city-street'
const person = personOn(ROADS)
const atGate = personOn(GATE)

export const promiseSet: SceneDescription = {
  id: 'l16-promise',
  title: 'Where you go I will go',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: ROADS, depth: 0.3 },
    { id: GATE, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The crossroads: Naomi and her two daughters-in-law, and the light where Ruth holds on (the golden thread).
    person('naomi', 'naomi', 0.5),
    person('orpah', 'orpah', 0.38, { facing: 1 }),
    person(RUTH.id, 'ruth', 0.6),
    { id: 'hands-glow', prop: 'halo', above: ROADS, x: 0.53, y: 0.64, size: 0.14, opacity: 0 },
    // Bethlehem's gate, and the women of the town.
    atGate('women', 'hebrew-women', 0.7, { size: 0.12, opacity: 0 }),
    atGate('naomi-home', 'naomi', 0.46, { facing: 1, opacity: 0 }),
    atGate('ruth-home', 'ruth', 0.36, { facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l16-e2-s1',
    title: 'At the crossroads',
    music: 'bach-jesu-joy',
    beats: [
      verse('RUT 1:8', camera({ zoom: 1.02 }, slow)),
      verse('RUT 1:9', ...pose('naomi', 'lift', 0.5, 3)),
      verse('RUT 1:10', camera({ zoom: 1 }, slow)),
      verse('RUT 1:13', ...pose('naomi', 'pray', 0.5, 3)),
      verse('RUT 1:14', ...walk('orpah', { x: -0.06, facing: -1 }, 4, 1), fadeOut('orpah', 4), actor(RUTH.id, { x: RUTH.from }, { seconds: 1, delay: 0.5 })),
    ],
  },
  {
    id: 'l16-e2-s2',
    title: 'Ruth’s promise',
    music: 'bach-jesu-joy',
    beats: [
      verse('RUT 1:15', camera({ zoom: 1.02 }, slow)),
      verse('RUT 1:16', actor('hands-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...pose(RUTH.id, 'kneel', 0.5, 3)),
      verse('RUT 1:17', camera({ zoom: 1 }, slow)),
      play('where-you-go', { done: [actor(RUTH.id, { x: RUTH.to }, { seconds: 0.5 })] }),
      verse('RUT 1:18', ...pose('naomi', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l16-e2-s3',
    title: '“Call me Mara”',
    music: 'bach-jesu-joy',
    beats: [
      verse('RUT 1:19', ...swap(ROADS, GATE), ...['naomi', RUTH.id, 'hands-glow'].map((id) => fadeOut(id)), fadeIn('naomi-home', 1.5), fadeIn('ruth-home', 1.5), fadeIn('women', 2)),
      verse('RUT 1:20', ...pose('naomi-home', 'pray', 0.5, 3)),
      verse('RUT 1:21', camera({ zoom: 1.02 }, slow)),
      verse('RUT 1:22', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: promiseSet, scenes }
