import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeLayer, fadeOut, personOn, pieceX, pose, slow, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · The Walls of Jericho (Joshua 6), from the approved Level 14 script.
 *
 * Jericho is shut up tight. The procession circles it in silence: soldiers, seven priests with
 * rams' horns, and the ark, which glows (this episode's golden thread: "By faith the walls of
 * Jericho fell down"). The player keeps the march in step, once a day for six days and seven
 * times on the seventh, then the trumpets sound, the people shout, and the walls fall flat
 * ("seven times around", minigames/seven-times-around). Only the house with the scarlet cord
 * still stands, and Rahab and her family are brought out safe. No one is shown being hurt.
 */

/** Where the procession walks, across the front of the walls, and the ark at its middle. */
export const MARCH = { from: 0.08, to: 0.92, y: 0.84 }
export const PROCESSION = ['marchers', 'trumpeters', 'ark-carried', 'ark-glow']
export const WALLS = 'jericho-walls'
export const FALLEN = 'jericho-fallen'

const CAMP = 'dry-hills'
const person = personOn(WALLS, MARCH.y)
const inCamp = personOn(CAMP)

export const jerichoSet: SceneDescription = {
  id: 'l14-jericho',
  title: 'The walls of Jericho',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: WALLS, depth: 0.3, opacity: 0 },
    { id: FALLEN, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp: Joshua listening; the seven priests with their trumpets; the ark lifted up.
    inCamp('joshua', 'joshua', 0.3, { facing: 1 }),
    inCamp('priests', 'elders', 0.56, { size: 0.12 }),
    { id: 'horns', prop: 'feast-sign', above: CAMP, x: 0.6, y: 0.7, size: 0.04, pose: 'horn' },
    { id: 'camp-ark', prop: 'tabernacle-piece', above: CAMP, x: pieceX('ark', 0.76, 1.2), y: 0.76, size: 1.2, pose: 'ark' },
    // The procession around the walls: the soldiers, the priests with their trumpets, and the ark (the golden thread).
    person('marchers', 'hebrew-workers', MARCH.from, { size: 0.1, facing: 1, opacity: 0 }),
    person('trumpeters', 'elders', MARCH.from + 0.1, { size: 0.1, facing: 1, opacity: 0 }),
    { id: 'ark-glow', prop: 'halo', above: WALLS, x: MARCH.from + 0.2, y: 0.62, size: 0.14, opacity: 0 },
    { id: 'ark-carried', prop: 'tabernacle-piece', above: WALLS, x: pieceX('ark', MARCH.from + 0.2, 1.2), y: MARCH.y - 0.02, size: 1.2, pose: 'ark', opacity: 0 },
    { id: 'beat', prop: 'halo', above: WALLS, x: 0.5, y: 0.3, size: 0.06, opacity: 0 },
    // After: the house with the scarlet cord, still standing, and Rahab's family brought out.
    { id: 'cord', prop: 'scarlet-cord', above: FALLEN, x: 0.7, y: 0.46, size: 0.02, opacity: 0 },
    personOn(FALLEN)('rahab', 'rahab', 0.62, { opacity: 0 }),
    personOn(FALLEN)('rahab-family', 'hebrew-family', 0.72, { size: 0.12, opacity: 0 }),
  ],
  camera: DRIFT,
}

const AT_CAMP = ['joshua', 'priests', 'horns', 'camp-ark']

const scenes: StoryScene[] = [
  {
    id: 'l14-e3-s1',
    title: 'Jericho shut up',
    music: 'charpentier-te-deum',
    beats: [
      verse('JOS 6:1', fadeLayer(CAMP, 0), fadeLayer(WALLS, 1), ...AT_CAMP.map((id) => fadeOut(id)), camera({ zoom: 1.02 }, slow)),
      verse('JOS 6:2', fadeLayer(WALLS, 0), fadeLayer(CAMP, 1), ...AT_CAMP.map((id) => fadeIn(id, 1)), camera({ zoom: 1 }, slow), ...pose('joshua', 'pray', 1.5, 3)),
      verse('JOS 6:3'),
      verse('JOS 6:4', ...pose('priests', 'walk', 0.5, 1)),
      verse('JOS 6:5', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l14-e3-s2',
    title: 'Seven times around',
    music: 'charpentier-te-deum',
    beats: [
      verse('JOS 6:10', camera({ zoom: 1 }, slow), fadeLayer(CAMP, 0), fadeLayer(WALLS, 1), ...AT_CAMP.map((id) => fadeOut(id)), ...PROCESSION.map((id) => (id === 'ark-glow' ? actor(id, { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }) : fadeIn(id, 1.5)))),
      verse('JOS 6:15', fadeLayer('forest-sky', 0), fadeLayer('dawn-sky', 1)),
      play('seven-times-around', {
        cues: [fadeLayer('dawn-sky', 0), fadeLayer('forest-sky', 1)],
        done: [fadeLayer(WALLS, 0), fadeLayer(FALLEN, 1), actor('beat', { opacity: 0 }, { seconds: 0.5 }), ...PROCESSION.map((id) => actor(id, { ...(id === 'ark-glow' ? { opacity: 0.85 } : {}), x: id === 'ark-carried' ? pieceX('ark', MARCH.from + 0.2, 1.2) : id === 'ark-glow' ? MARCH.from + 0.2 : id === 'trumpeters' ? MARCH.from + 0.1 : MARCH.from }, { seconds: 0.5 }))],
      }),
      verse('JOS 6:16', camera({ zoom: 1.02 }, slow)),
      verse('JOS 6:20', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l14-e3-s3',
    title: 'Rahab’s house',
    music: 'charpentier-te-deum',
    beats: [
      say('In all the fallen city, one house in the wall still stood: the house with the scarlet cord.', fadeIn('cord', 0.5), camera({ zoom: 1.03, x: 0.02 }, slow)),
      verse('JOS 6:25', camera({ zoom: 1, x: 0 }, slow), fadeIn('rahab', 0.5), fadeIn('rahab-family', 1), ...walk('rahab', { x: 0.4 }, 4, 1.5), ...walk('rahab-family', { x: 0.5 }, 4, 1.5)),
      verse('JOS 6:27'),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: jerichoSet, scenes }
