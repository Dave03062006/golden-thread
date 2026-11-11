import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Naomi's Sorrow (Ruth 1:1–7), from the approved Level 16 script.
 *
 * Famine in Bethlehem, "the house of bread," sends Elimelech's family to Moab, where Naomi loses
 * her husband and both her sons. When she hears that the LORD has visited his people, a light
 * rises over Bethlehem (this episode's golden thread: "your sorrow will turn into joy"), and the
 * player walks the three widows home along the road, stop by stop ("the long road home",
 * minigames/the-long-road-home).
 */

/** The road home from Moab, stop by stop, east to west, and what Naomi remembers at each. */
export const ROAD = [
  { x: 0.88, y: 0.8, memory: 'Moab' },
  { x: 0.72, y: 0.8, memory: 'Elimelech, her husband, buried in Moab.' },
  { x: 0.56, y: 0.8, memory: 'Mahlon and Chilion, her two sons.' },
  { x: 0.4, y: 0.8, memory: 'The famine that drove them from Bethlehem.' },
  { x: 0.26, y: 0.8, memory: 'And the news: “the LORD had visited his people and given them food.”' },
]
export const WIDOWS = 'widows'

const BETHLEHEM = 'canaan-hills'
const MOAB = 'dry-hills'
const person = personOn(BETHLEHEM)
const inMoab = personOn(MOAB)

export const sorrowSet: SceneDescription = {
  id: 'l16-sorrow',
  title: 'Naomi’s sorrow',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: BETHLEHEM, depth: 0.3 },
    { id: MOAB, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Bethlehem in the famine, and the family setting out.
    { id: 'town', prop: 'city', above: BETHLEHEM, x: 0.24, y: 0.6, size: 0.12 },
    person('elimelech', 'hebrew-father', 0.4, { facing: 1 }),
    person('naomi', 'naomi', 0.46, { facing: 1 }),
    person('sons', 'hebrew-workers', 0.56, { size: 0.1, facing: 1 }),
    { id: 'donkey', prop: 'donkey', above: BETHLEHEM, x: 0.64, y: 0.8, size: 0.06, facing: 1 },
    // Moab: the graves under the tree, the two weddings, and the three widows.
    { id: 'tree', prop: 'great-oak', above: MOAB, x: 0.8, y: 0.76, size: 0.22, opacity: 0 },
    ...[0.74, 0.8, 0.86].map((x, i) => ({ id: `grave-${i + 1}`, prop: 'stone-pillar', above: MOAB, x, y: 0.82, size: 0.03, pose: 'standing', opacity: 0 })),
    inMoab('naomi-moab', 'naomi', 0.5, { opacity: 0 }),
    inMoab('orpah', 'orpah', 0.38, { facing: 1, opacity: 0 }),
    inMoab('ruth', 'ruth', 0.6, { opacity: 0 }),
    inMoab('husbands', 'hebrew-workers', 0.28, { size: 0.1, facing: 1, opacity: 0 }),
    // The light over Bethlehem, far to the west (the golden thread), and the widows on the road.
    { id: 'bethlehem-light', prop: 'halo', above: MOAB, x: 0.1, y: 0.5, size: 0.2, opacity: 0 },
    inMoab(WIDOWS, 'hebrew-women', ROAD[0]!.x, { size: 0.1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l16-e1-s1',
    title: 'Famine in the house of bread',
    music: 'dvorak-largo',
    beats: [
      verse('RUT 1:1', camera({ zoom: 1.02 }, slow)),
      verse('RUT 1:2', ...['elimelech', 'naomi', 'sons'].flatMap((id) => walk(id, { x: 1.04, facing: 1 }, 4, 0.5)), actor('donkey', { x: 1.1, pose: 'walk' }, { seconds: 4, delay: 0.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l16-e1-s2',
    title: 'In the country of Moab',
    music: 'dvorak-largo',
    beats: [
      verse('RUT 1:3', ...swap(BETHLEHEM, MOAB), ...['town', 'elimelech', 'naomi', 'sons', 'donkey'].map((id) => fadeOut(id)), fadeIn('tree', 1.5), fadeIn('grave-1', 2), fadeIn('naomi-moab', 2)),
      verse('RUT 1:4', fadeIn('husbands', 0.5), fadeIn('orpah', 0.8), fadeIn('ruth', 0.8)),
      say('Ten years passed in Moab. Naomi’s daughters-in-law were good to her, and she loved them like her own daughters.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l16-e1-s3',
    title: 'Three widows',
    music: 'dvorak-largo',
    beats: [
      verse('RUT 1:5', ...swap('forest-sky', 'evening-sky'), fadeOut('husbands', 0.5), fadeIn('grave-2', 1), fadeIn('grave-3', 1.4), ...pose('naomi-moab', 'kneel', 1, 3), camera({ zoom: 1 }, slow)),
      verse('RUT 1:6', ...swap('evening-sky', 'forest-sky'), actor('bethlehem-light', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('RUT 1:7', ...['naomi-moab', 'orpah', 'ruth'].map((id) => fadeOut(id, 0.5)), fadeIn(WIDOWS, 1)),
      play('the-long-road-home', { done: [actor(WIDOWS, { x: ROAD.at(-1)!.x, y: ROAD.at(-1)!.y }, { seconds: 0.5 })] }),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: sorrowSet, scenes }
