import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Jephthah's Vow (Judges 10:6–11:40), from the approved Level 15 script.
 *
 * The people put away their idols and cry to the LORD, and the elders of Gilead fetch Jephthah,
 * the outcast, to lead them. Before any fighting, he sends the king of Ammon the story of how
 * Israel came, which the player traces on the map ("the way we came", minigames/the-way-we-came).
 * Then the careless vow, and his only daughter coming out to meet him with her timbrel. What
 * happened to her is told in one plain sentence and not shown. Her timbrel, remembered by the
 * daughters of Israel, glows (this episode's golden thread: "Let what you say be simply 'Yes'
 * or 'No'").
 */

/** The way Israel came, as Jephthah told it, turn by turn on the map: out of Egypt, around Edom and Moab, to the Jabbok. */
export const WAY = [
  { x: 0.1, y: 0.6, leg: 'Egypt' },
  { x: 0.3, y: 0.8, leg: 'Out of Egypt, to the Red Sea' },
  { x: 0.42, y: 0.58, leg: 'Through the wilderness to Kadesh' },
  { x: 0.5, y: 0.86, leg: 'The king of Edom would not let them pass: around Edom' },
  { x: 0.88, y: 0.84, leg: 'Around the land of Edom' },
  { x: 0.88, y: 0.52, leg: 'Around the land of Moab, by the east' },
  { x: 0.74, y: 0.42, leg: 'Across the Arnon, the border of Moab' },
  { x: 0.7, y: 0.2, leg: 'Up to the Jabbok, the land of Sihon' },
]
export const MESSENGERS = 'messengers'

const GILEAD = 'canaan-hills'
const TOB = 'dry-hills'
const MAP = 'jephthah-map'
const HOME = 'city-street'
const person = personOn(GILEAD)
const inTob = personOn(TOB)
const atHome = personOn(HOME)

export const jephthahSet: SceneDescription = {
  id: 'l15-jephthah',
  title: 'Jephthah’s vow',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: GILEAD, depth: 0.3 },
    { id: TOB, depth: 0.3, opacity: 0 },
    { id: MAP, depth: 0.1, opacity: 0 },
    { id: HOME, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Gilead: the families putting away their idols.
    person('families', 'hebrew-family', 0.5, { size: 0.12 }),
    ...[0.38, 0.44, 0.58].map((x, i): SceneActor => ({ id: `idol-${i + 1}`, prop: 'idol', above: GILEAD, x, y: 0.8, size: 0.02 })),
    // The land of Tob: Jephthah at the outlaws' fire, and the elders coming up the road.
    { id: 'fire', prop: 'campfire', above: TOB, x: 0.3, y: 0.78, size: 0.06, opacity: 0 },
    inTob('jephthah', 'jephthah', 0.38, { opacity: 0 }),
    inTob('outlaws', 'hebrew-workers', 0.18, { size: 0.12, facing: 1, opacity: 0 }),
    inTob('elders', 'elders', 0.98, { size: 0.12, opacity: 0 }),
    // The map of the way Israel came, and Jephthah's messengers tracing it.
    { id: MESSENGERS, prop: 'map-token', above: MAP, x: WAY[0]!.x, y: WAY[0]!.y, size: 0.05, pose: 'man', opacity: 0 },
    // Mizpah: Jephthah coming home, and his only daughter with her timbrel (the golden thread).
    atHome('jephthah-home', 'jephthah', 0.9, { opacity: 0 }),
    atHome('daughter', 'jephthahs-daughter', 0.3, { facing: 1, opacity: 0 }),
    { id: 'timbrel', prop: 'hand-drum', above: HOME, x: 0.33, y: 0.7, size: 0.025, opacity: 0 },
    { id: 'timbrel-glow', prop: 'halo', above: HOME, x: 0.33, y: 0.64, size: 0.12, opacity: 0 },
    atHome('companions', 'hebrew-women', 0.14, { size: 0.12, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const IN_TOB = ['fire', 'jephthah', 'outlaws', 'elders']

const scenes: StoryScene[] = [
  {
    id: 'l15-e4-s1',
    title: '“Only deliver us”',
    music: 'mozart-lacrimosa',
    beats: [
      verse('JDG 10:10', camera({ zoom: 1.02 }, slow)),
      verse('JDG 10:15', camera({ zoom: 1 }, slow)),
      verse('JDG 10:16', ...[1, 2, 3].map((i) => fadeOut(`idol-${i}`, 0.3 + i * 0.3))),
      verse('JDG 11:1', ...swap('forest-sky', 'evening-sky'), ...swap(GILEAD, TOB), fadeOut('families'), fadeIn('fire', 1.5), fadeIn('jephthah', 1.5), fadeIn('outlaws', 1.8)),
      verse('JDG 11:2', camera({ zoom: 1.02 }, slow)),
      say('When the Ammonites made war on Gilead, the elders came looking for the man they had driven away.', fadeIn('elders', 0.3), ...walk('elders', { x: 0.62 }, 3, 0.5), camera({ zoom: 1 }, slow)),
      verse('JDG 11:7', ...pose('jephthah', 'lift', 0.5, 3)),
      verse('JDG 11:11', ...pose('jephthah', 'pray', 0.5, 3)),
    ],
  },
  {
    id: 'l15-e4-s2',
    title: 'The message to Ammon',
    music: 'mozart-lacrimosa',
    beats: [
      verse('JDG 11:12', ...swap('evening-sky', 'forest-sky'), ...swap(TOB, MAP), ...IN_TOB.map((id) => fadeOut(id)), fadeIn(MESSENGERS, 1.5)),
      verse('JDG 11:13', camera({ zoom: 1.02 }, slow)),
      play('the-way-we-came', { done: [actor(MESSENGERS, { x: WAY.at(-1)!.x, y: WAY.at(-1)!.y }, { seconds: 0.5 })] }),
      verse('JDG 11:27', camera({ zoom: 1 }, slow)),
      verse('JDG 11:28', fadeOut(MESSENGERS, 0.5)),
    ],
  },
  {
    id: 'l15-e4-s3',
    title: 'The vow',
    music: 'mozart-lacrimosa',
    beats: [
      verse('JDG 11:29', ...swap(MAP, HOME), fadeIn('jephthah-home', 1.5)),
      verse('JDG 11:30', ...pose('jephthah-home', 'lift', 0.5, 3)),
      verse('JDG 11:31', camera({ zoom: 1.02 }, slow)),
      verse('JDG 11:32', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1 }, slow)),
      verse('JDG 11:34', fadeIn('daughter', 0.3), fadeIn('timbrel', 0.3), actor('timbrel-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...walk('daughter', { x: 0.5 }, 2.5, 0.8), actor('timbrel', { x: 0.53 }, { seconds: 2.5, ease: 'inOutSine', delay: 0.8 }), actor('timbrel-glow', { x: 0.53 }, { seconds: 2.5, ease: 'inOutSine', delay: 0.8 })),
      verse('JDG 11:35', ...pose('jephthah-home', 'kneel', 0.5, 3)),
      verse('JDG 11:36', camera({ zoom: 1.02 }, slow)),
      verse('JDG 11:37', fadeIn('companions', 0.5), camera({ zoom: 1 }, slow)),
      say('When the two months were over, she came home, and the Bible says only that her father “did with her according to his vow which he had made.”', ...swap('evening-sky', 'night-sky'), fadeOut('daughter', 1), fadeOut('jephthah-home', 1)),
      verse('JDG 11:40', ...swap('night-sky', 'evening-sky'), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: jephthahSet, scenes }
