import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · The Redeemer (Ruth 4), from the approved Level 16 script.
 *
 * At Bethlehem's gate, before ten elders, the nearer kinsman gives up his right and hands Boaz
 * his sandal, which glows (this episode's golden thread: "ransomed… with the precious blood of
 * Christ"). Boaz redeems the land and marries Ruth; their son Obed is laid in Naomi's lap. Then
 * the family line grows across the sky, and the player sets it in order, from Perez to David
 * ("Perez to David", minigames/perez-to-david).
 */

/** The family line from Perez to David (Ruth 4:18–22), each name a leaf on the tree. */
export const LINE = ['Perez', 'Hezron', 'Ram', 'Amminadab', 'Nahshon', 'Salmon', 'Boaz', 'Obed', 'Jesse', 'David'].map((name, i) => ({
  id: `leaf-${name.toLowerCase()}`,
  name,
  x: Math.round((0.16 + i * 0.075) * 1000) / 1000,
  y: Math.round((0.62 - Math.sin((i / 9) * Math.PI) * 0.22) * 1000) / 1000,
}))

const GATE = 'city-street'
const HOME = 'house-inside'
const HILLS = 'canaan-hills'
const atGate = personOn(GATE)
const atHome = personOn(HOME)

export const redeemerSet: SceneDescription = {
  id: 'l16-redeemer',
  title: 'The redeemer',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: GATE, depth: 0.3 },
    { id: HOME, depth: 0.3, opacity: 0 },
    { id: HILLS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The gate: Boaz, the nearer kinsman, the elders, and the sandal (the golden thread).
    atGate('boaz', 'boaz', 0.44, { pose: 'sit', facing: 1 }),
    atGate('kinsman', 'achan', 0.96, { opacity: 0 }),
    atGate('elders', 'elders', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    { id: 'sandal', prop: 'sandal', above: GATE, x: 0.52, y: 0.78, size: 0.02, opacity: 0 },
    { id: 'sandal-glow', prop: 'halo', above: GATE, x: 0.52, y: 0.64, size: 0.12, opacity: 0 },
    // Naomi's house: the women, and Naomi with the baby Obed.
    atHome('women', 'hebrew-women', 0.72, { size: 0.12, opacity: 0 }),
    atHome('naomi', 'naomi', 0.46, { pose: 'sit', facing: 1, opacity: 0 }),
    { id: 'obed', prop: 'swaddled-baby', above: HOME, x: 0.48, y: 0.76, size: 0.03, opacity: 0 },
    // The family tree over Bethlehem, a leaf for each name.
    { id: 'tree', prop: 'family-tree', above: HILLS, x: 0.5, y: 0.82, size: 0.6, opacity: 0 },
    ...LINE.map((l): SceneActor => ({ id: l.id, prop: 'name-leaf', above: HILLS, x: l.x, y: l.y, size: 0.035, opacity: 0 })),
    { id: 'bethlehem', prop: 'city', above: HILLS, x: 0.84, y: 0.66, size: 0.1, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l16-e5-s1',
    title: 'At the gate',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      verse('RUT 4:1', fadeIn('kinsman', 0.3), ...walk('kinsman', { x: 0.6 }, 3, 0.5)),
      verse('RUT 4:2', fadeIn('elders', 0.5)),
      verse('RUT 4:3', camera({ zoom: 1.02 }, slow)),
      say('At first the kinsman said that he would buy the land.', ...pose('kinsman', 'lift', 0.5, 2)),
      verse('RUT 4:5', camera({ zoom: 1 }, slow)),
      verse('RUT 4:6', ...pose('kinsman', 'pray', 0.5, 2)),
      verse('RUT 4:7', fadeIn('sandal', 0.5), actor('sandal-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 })),
      verse('RUT 4:9', actor('boaz', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), ...pose('boaz', 'lift', 1, 3)),
      verse('RUT 4:10', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l16-e5-s2',
    title: 'A son is born to Naomi',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      verse('RUT 4:11', camera({ zoom: 1 }, slow)),
      say('Boaz and Ruth were married, and the LORD gave them a son.', ...swap(GATE, HOME), ...['boaz', 'kinsman', 'elders', 'sandal', 'sandal-glow'].map((id) => fadeOut(id)), fadeIn('women', 1.5)),
      verse('RUT 4:14', fadeIn('naomi', 0.5)),
      verse('RUT 4:15', camera({ zoom: 1.02 }, slow)),
      verse('RUT 4:16', fadeIn('obed', 0.5)),
      verse('RUT 4:17', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l16-e5-s3',
    title: 'From Perez to David',
    music: 'handel-i-know-that-my-redeemer',
    beats: [
      verse('RUT 4:18', ...swap('forest-sky', 'evening-sky'), ...swap(HOME, HILLS), ...['women', 'naomi', 'obed'].map((id) => fadeOut(id)), fadeIn('tree', 1.5, 0.6), fadeIn('bethlehem', 1.5)),
      play('perez-to-david', { done: LINE.map((l) => actor(l.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('RUT 4:21', camera({ zoom: 1.02 }, slow)),
      verse('RUT 4:22', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: redeemerSet, scenes }
