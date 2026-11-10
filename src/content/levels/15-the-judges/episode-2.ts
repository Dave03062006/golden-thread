import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeLayer, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · Deborah and Barak (Judges 4–5), from the approved Level 15 script.
 *
 * Deborah judges Israel under her palm tree, and sends Barak to Mount Tabor. The player sends the
 * storm down on the plain until the river Kishon floods and Sisera's chariots sink in the mud
 * ("the torrent Kishon", minigames/the-torrent-kishon). Sisera flees to Jael's tent, seen only
 * from outside; Deborah and Barak sing, and the sun rises over Tabor, glowing (this episode's
 * golden thread: "Then the righteous will shine like the sun"). No fighting is shown.
 */

/** The river in flood: the layer the rain fills, and the chariots that sink in the mud as it rises. */
export const FLOOD = 'kishon-flood'
export const CHARIOTS = [0.56, 0.7, 0.84].map((x, i) => ({ id: `chariot-${i + 1}`, x, y: 0.8 }))
/** How far a chariot sinks when the plain is all mud. */
export const SINK = 0.025
/** Barak's ten thousand on the slopes of Tabor, and where they come down to. */
export const ARMY = { id: 'barak-army', from: { x: 0.2, y: 0.58 }, to: { x: 0.42, y: 0.8 } }

const PALM = 'canaan-hills'
const PLAIN = 'tabor-plain'
const person = personOn(PALM)
const onPlain = personOn(PLAIN)

export const deborahSet: SceneDescription = {
  id: 'l15-deborah',
  title: 'Deborah and Barak',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: PALM, depth: 0.3 },
    { id: PLAIN, depth: 0.3, opacity: 0 },
    { id: FLOOD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Under the palm of Deborah: Deborah, the people bringing their quarrels, and Barak.
    { id: 'palm', prop: 'palm-tree', above: PALM, x: 0.3, y: 0.8, size: 0.16 },
    person('deborah', 'deborah', 0.36, { pose: 'sit', facing: 1 }),
    person('people', 'hebrew-family', 0.62, { size: 0.12 }),
    person('barak', 'barak', 0.96, { opacity: 0 }),
    // The plain below Tabor: the chariots by the river, the storm, and Barak's men on the mountain.
    ...CHARIOTS.map((c): SceneActor => ({ id: c.id, prop: 'chariot', above: PLAIN, x: c.x, y: c.y, size: 0.09, facing: -1, opacity: 0 })),
    { id: 'storm', prop: 'storm-cloud', above: PLAIN, x: 0.4, y: 0.2, size: 0.4, opacity: 0 },
    { id: 'rain', prop: 'rain', above: PLAIN, x: 0.5, y: 0.6, size: 0.8, opacity: 0 },
    onPlain(ARMY.id, 'hebrew-workers', ARMY.from.x, { y: ARMY.from.y, size: 0.06, facing: 1, opacity: 0 }),
    // Jael's tent at night, its lamp, and Sisera fleeing on foot.
    { id: 'jael-tent', prop: 'tent', above: PALM, x: 0.62, y: 0.8, size: 0.14, opacity: 0 },
    { id: 'tent-lamp', prop: 'halo', above: PALM, x: 0.62, y: 0.72, size: 0.05, opacity: 0 },
    person('sisera', 'watchman', 0.98, { opacity: 0 }),
    // The sunrise over Tabor (the golden thread), and Deborah and Barak singing.
    { id: 'sun-glow', prop: 'halo', above: PLAIN, x: 0.26, y: 0.3, size: 0.22, opacity: 0 },
    { id: 'sun', prop: 'sun', above: PLAIN, x: 0.26, y: 0.3, size: 0.06, opacity: 0 },
    onPlain('singer-deborah', 'deborah', 0.5, { facing: 1, opacity: 0 }),
    onPlain('singer-barak', 'barak', 0.58, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const AT_PALM = ['palm', 'deborah', 'people', 'barak']
const ON_PLAIN = [...CHARIOTS.map((c) => c.id), 'storm', 'rain', ARMY.id]

const scenes: StoryScene[] = [
  {
    id: 'l15-e2-s1',
    title: 'Under the palm of Deborah',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('JDG 4:3', camera({ zoom: 1.02 }, slow)),
      verse('JDG 4:4', camera({ zoom: 1 }, slow)),
      verse('JDG 4:5', ...pose('deborah', 'lift', 0.5, 3)),
      verse('JDG 4:6', fadeIn('barak', 0.3), ...walk('barak', { x: 0.5 }, 2.5, 0.5)),
      verse('JDG 4:7', ...pose('deborah', 'lift', 0.5, 3)),
      verse('JDG 4:8'),
      verse('JDG 4:9', actor('deborah', { pose: 'idle' }, { seconds: 0.6, delay: 0.3 })),
    ],
  },
  {
    id: 'l15-e2-s2',
    title: 'Down from Mount Tabor',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('JDG 4:14', ...swap('forest-sky', 'storm-sky'), ...swap(PALM, PLAIN), ...AT_PALM.map((id) => fadeOut(id)), ...CHARIOTS.map((c, i) => fadeIn(c.id, 1.5 + i * 0.3)), fadeIn('storm', 1.5), fadeIn(ARMY.id, 2)),
      play('the-torrent-kishon', {
        done: [
          fadeLayer(FLOOD, 1),
          actor('rain', { opacity: 0.8 }, { seconds: 0.5 }),
          ...CHARIOTS.map((c) => actor(c.id, { y: c.y + SINK }, { seconds: 0.5 })),
        ],
      }),
      verse('JDG 5:20', actor(ARMY.id, { ...ARMY.to, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 0.3 }), actor(ARMY.id, { pose: 'idle' }, { seconds: 0.4, delay: 3.3 })),
      verse('JDG 5:21', fadeOut('rain', 0.5)),
      verse('JDG 4:15', ...CHARIOTS.map((c) => fadeOut(c.id, 0.5))),
    ],
  },
  {
    id: 'l15-e2-s3',
    title: 'The song of Deborah',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('JDG 4:17', ...swap('storm-sky', 'night-sky'), ...swap(PLAIN, PALM), fadeLayer(FLOOD, 0), ...ON_PLAIN.map((id) => fadeOut(id)), fadeIn('jael-tent', 1.5), fadeIn('tent-lamp', 1.8, 0.8), fadeIn('sisera', 2), ...walk('sisera', { x: 0.7 }, 3, 2.5)),
      say('Jael welcomed him in, gave him milk, and covered him with a rug. And while he lay asleep, she killed him. As Deborah had said, the enemy’s general fell “into the hand of a woman.”', fadeOut('sisera', 0.3), fadeOut('tent-lamp', 2)),
      verse('JDG 5:1', ...swap('night-sky', 'dawn-sky'), ...swap(PALM, PLAIN), fadeOut('jael-tent'), fadeIn('singer-deborah', 1.5), fadeIn('singer-barak', 1.5), fadeIn('sun', 1.5), actor('sun-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 1.5 })),
      verse('JDG 5:3', ...pose('singer-deborah', 'lift', 0.5, 3)),
      verse('JDG 5:7', camera({ zoom: 1.02 }, slow)),
      verse('JDG 5:12', ...pose('singer-barak', 'lift', 0.5, 3)),
      say('Far away, Sisera’s mother waited at her window for a son who would never come home.', camera({ zoom: 1 }, slow)),
      verse('JDG 5:31', ...swap('dawn-sky', 'forest-sky'), camera({ zoom: 1.02, y: -0.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: deborahSet, scenes }
