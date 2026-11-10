import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · Samson (Judges 13–16), from the approved Level 15 script.
 *
 * An angel promises Manoah's wife a son, a Nazirite to God from birth, and goes up in the flame
 * of the altar, which glows (this episode's golden thread: John the Baptist, "filled with the
 * Holy Spirit, even from his mother's womb"). Samson kills a lion with his bare hands (a blur of
 * shadow) and finds honey in it; at his wedding feast the player solves his riddle ("out of the
 * eater", minigames/out-of-the-eater). Delilah has his hair shaved; he is blinded and grinds at
 * the mill in Gaza, and his hair begins to grow. At Dagon's feast he prays, "remember me," and
 * the house falls, seen only as dust from far off.
 */

const ZORAH = 'canaan-hills'
const TIMNAH = 'green-hills'
const HOUSE = 'house-inside'
const PRISON = 'prison-mill'
const HALL = 'dagon-hall'
const FALLEN = 'dagon-fallen'
const person = personOn(ZORAH)
const inVineyard = personOn(TIMNAH)
const inHouse = personOn(HOUSE)
const inPrison = personOn(PRISON)
const inHall = personOn(HALL)

export const samsonSet: SceneDescription = {
  id: 'l15-samson',
  title: 'Samson',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: ZORAH, depth: 0.3 },
    { id: TIMNAH, depth: 0.3, opacity: 0 },
    { id: HOUSE, depth: 0.3, opacity: 0 },
    { id: PRISON, depth: 0.3, opacity: 0 },
    { id: HALL, depth: 0.3, opacity: 0 },
    { id: FALLEN, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Zorah: Manoah's wife in the field, the angel, Manoah, and the altar on the rock (the golden thread).
    person('mother', 'hebrew-mother', 0.42, { pose: 'sit', facing: 1 }),
    { id: 'angel', prop: 'angel', above: ZORAH, x: 0.62, y: 0.72, size: 0.07, opacity: 0 },
    person('manoah', 'hebrew-father', 0.3, { facing: 1, opacity: 0 }),
    { id: 'altar', prop: 'altar', above: ZORAH, x: 0.54, y: 0.8, size: 0.06, opacity: 0 },
    { id: 'altar-glow', prop: 'halo', above: ZORAH, x: 0.54, y: 0.64, size: 0.14, opacity: 0 },
    person('baby-samson', 'hebrew-family', 0.66, { size: 0.12, opacity: 0 }),
    // The vineyards of Timnah: the lion, Samson, and the bees and honey.
    inVineyard('samson', 'samson', 0.3, { facing: 1, opacity: 0 }),
    { id: 'lion', prop: 'lion', above: TIMNAH, x: 0.7, y: 0.8, size: 0.08, facing: -1, opacity: 0 },
    { id: 'honey', prop: 'honeycomb', above: TIMNAH, x: 0.62, y: 0.8, size: 0.03, opacity: 0 },
    { id: 'bees', prop: 'swarm', above: TIMNAH, x: 0.62, y: 0.7, size: 0.06, pose: 'flies', opacity: 0 },
    // The wedding feast, and later Delilah's house: Samson, Delilah, and the man with the razor.
    { id: 'feast', prop: 'feast-mat', above: HOUSE, x: 0.5, y: 0.82, size: 0.2, opacity: 0 },
    inHouse('companions', 'crowd', 0.68, { size: 0.16, opacity: 0 }),
    inHouse('samson-feast', 'samson', 0.3, { facing: 1, opacity: 0 }),
    inHouse('delilah', 'delilah', 0.56, { opacity: 0 }),
    inHouse('samson-asleep', 'samson', 0.46, { pose: 'sit', facing: 1, opacity: 0 }),
    inHouse('shorn', 'samson-shorn', 0.46, { pose: 'sit', facing: 1, opacity: 0 }),
    inHouse('barber', 'watchman', 0.9, { opacity: 0 }),
    // The prison at Gaza: Samson, blind, at the mill.
    { id: 'mill', prop: 'millstone', above: PRISON, x: 0.5, y: 0.8, size: 0.1, opacity: 0 },
    inPrison('grinding', 'samson-shorn', 0.38, { pose: 'work', facing: 1, opacity: 0 }),
    // The house of Dagon: the crowd, the boy who leads Samson, and the dust when it falls.
    inHall('feasters', 'crowd', 0.78, { size: 0.18, opacity: 0 }),
    inHall('blind-samson', 'samson-shorn', 0.12, { facing: 1, opacity: 0 }),
    inHall('boy', 'joseph-young', 0.18, { size: 0.034, facing: 1, opacity: 0 }),
    { id: 'dust', prop: 'dust-cloud', above: FALLEN, x: 0.5, y: 0.7, size: 0.5, opacity: 0 },
    // His family carrying him home to Zorah.
    person('family', 'hebrew-workers', 0.3, { size: 0.12, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const IN_ZORAH = ['mother', 'manoah', 'altar', 'altar-glow', 'baby-samson']
const IN_TIMNAH = ['samson', 'lion', 'honey', 'bees']
const AT_FEAST = ['feast', 'companions', 'samson-feast']

const scenes: StoryScene[] = [
  {
    id: 'l15-e5-s1',
    title: 'The angel’s promise',
    music: 'handel-harmonious-blacksmith',
    beats: [
      verse('JDG 13:2', camera({ zoom: 1.02 }, slow)),
      verse('JDG 13:3', fadeIn('angel', 0.5, 0.9)),
      verse('JDG 13:5', camera({ zoom: 1 }, slow)),
      verse('JDG 13:8', fadeOut('angel'), fadeIn('manoah', 0.5), ...pose('manoah', 'pray', 1, 3)),
      verse('JDG 13:18', fadeIn('angel', 0.3, 0.9), fadeIn('altar', 0.5), actor('altar-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 })),
      verse('JDG 13:20', actor('angel', { y: 0.4, opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay: 0.3 }), ...['mother', 'manoah'].map((id) => actor(id, { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 }))),
      verse('JDG 13:24', ...['mother', 'manoah'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.8, delay: 0.3 })), fadeIn('baby-samson', 0.8)),
    ],
  },
  {
    id: 'l15-e5-s2',
    title: 'Out of the eater',
    music: 'handel-harmonious-blacksmith',
    beats: [
      verse('JDG 14:5', ...swap(ZORAH, TIMNAH), ...IN_ZORAH.map((id) => fadeOut(id)), fadeIn('samson', 1.5), fadeIn('lion', 2), actor('lion', { x: 0.5, pose: 'walk' }, { seconds: 1.2, delay: 2.5 }), actor('lion', { pose: 'idle' }, { seconds: 0.4, delay: 3.7 })),
      verse('JDG 14:6', ...pose('samson', 'lift', 0.3, 2), fadeOut('lion', 0.5)),
      verse('JDG 14:8', fadeIn('honey', 0.5), fadeIn('bees', 0.5), ...walk('samson', { x: 0.56 }, 2, 0.8)),
      say('At his wedding feast, Samson made a bet with thirty young Philistines: thirty sets of fine clothes, if they could solve his riddle in seven days.', ...swap(TIMNAH, HOUSE), ...IN_TIMNAH.map((id) => fadeOut(id)), ...AT_FEAST.map((id) => fadeIn(id, 1.5))),
      verse('JDG 14:14', ...pose('samson-feast', 'lift', 0.5, 3)),
      play('out-of-the-eater', { done: [] }),
      say('They couldn’t solve it, so they made Samson’s bride find out the answer for them. On the seventh day they came back with it.', camera({ zoom: 1.02 }, slow)),
      verse('JDG 14:18', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l15-e5-s3',
    title: 'Delilah',
    music: 'handel-harmonious-blacksmith',
    beats: [
      verse('JDG 16:4', ...AT_FEAST.map((id) => fadeOut(id)), fadeIn('samson-asleep', 1.5), fadeIn('delilah', 1.5)),
      verse('JDG 16:5', camera({ zoom: 1.02 }, slow)),
      verse('JDG 16:15', ...pose('delilah', 'lift', 0.5, 3)),
      verse('JDG 16:17', camera({ zoom: 1 }, slow)),
      verse('JDG 16:19', ...swap('forest-sky', 'night-sky'), fadeIn('barber', 0.5), ...walk('barber', { x: 0.56 }, 2, 0.8), fadeOut('samson-asleep', 3), fadeIn('shorn', 3)),
      verse('JDG 16:20', fadeOut('barber', 0.3), actor('shorn', { pose: 'idle' }, { seconds: 0.8, delay: 0.5 })),
      verse('JDG 16:21', ...swap(HOUSE, PRISON), ...['delilah', 'shorn'].map((id) => fadeOut(id)), fadeIn('mill', 1.5), fadeIn('grinding', 1.5)),
      verse('JDG 16:22', camera({ zoom: 1.04, y: -0.01 }, slow)),
    ],
  },
  {
    id: 'l15-e5-s4',
    title: 'Only this once',
    music: 'handel-harmonious-blacksmith',
    beats: [
      verse('JDG 16:23', ...swap('night-sky', 'forest-sky'), ...swap(PRISON, HALL), fadeOut('mill'), fadeOut('grinding'), fadeIn('feasters', 1.5), camera({ zoom: 1 }, slow)),
      verse('JDG 16:25', fadeIn('blind-samson', 0.5), fadeIn('boy', 0.5), ...walk('blind-samson', { x: 0.44 }, 3, 1), ...walk('boy', { x: 0.5 }, 3, 1)),
      verse('JDG 16:26', camera({ zoom: 1.02 }, slow)),
      verse('JDG 16:28', fadeOut('boy', 0.3), ...pose('blind-samson', 'lift', 0.5, 4)),
      verse('JDG 16:30', ...swap(HALL, FALLEN, 0.5), fadeOut('feasters', 0.5), fadeOut('blind-samson', 0.5), fadeIn('dust', 0.5, 0.9), camera({ zoom: 1 }, slow)),
      verse('JDG 16:31', ...swap(FALLEN, ZORAH), ...swap('forest-sky', 'evening-sky'), fadeOut('dust'), fadeIn('family', 1.5), ...walk('family', { x: 0.5 }, 3, 2)),
      say('Samson’s strength had never really been in his hair. It came from God, and the hair was the sign of his promise to God. At the very end, blind and in chains, Samson turned back to God, and God heard him.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: samsonSet, scenes }
