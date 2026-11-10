import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · Gideon's Fleece and Three Hundred Men (Judges 6–8), from the approved Level 15
 * script.
 *
 * The angel finds Gideon threshing wheat in a wine press: "The LORD is with you, you mighty man
 * of valor." Gideon asks for the sign of the fleece, and God sends home all but three hundred
 * men. At night the three companies creep down around the Midianite camp; the player watches
 * Gideon and does as he does, blowing the trumpets and smashing the jars until the torches ring
 * the valley ("torches and trumpets", minigames/torches-and-trumpets). The torches, shining out
 * of the broken jars, glow (this episode's golden thread: "We have this treasure in earthen
 * vessels"). No fighting is shown: the camp wakes and runs away.
 */

/** The three companies on the hills around the camp, each with its jar and the torch hidden in it. */
export const COMPANIES = [0.16, 0.5, 0.84].map((x, i) => ({ id: `company-${i + 1}`, jar: `jar-${i + 1}`, torch: `torch-${i + 1}`, x, y: i === 1 ? 0.5 : 0.56 }))
/** The camp of Midian in the valley below. */
export const CAMP = 'midian-tents'

const PRESS = 'wine-press'
const FLOOR = 'stubble-field'
const SPRING = 'green-hills'
const VALLEY = 'midian-camp'
const person = personOn(PRESS)
const onFloor = personOn(FLOOR)
const bySpring = personOn(SPRING)
const onHill = personOn(VALLEY)

export const gideonSet: SceneDescription = {
  id: 'l15-gideon',
  title: 'Gideon',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: PRESS, depth: 0.3 },
    { id: FLOOR, depth: 0.3, opacity: 0 },
    { id: SPRING, depth: 0.3, opacity: 0 },
    { id: VALLEY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The wine press: Gideon threshing in hiding, the angel under the oak, and the fire from the rock.
    { id: 'oak', prop: 'great-oak', above: PRESS, x: 0.2, y: 0.74, size: 0.26 },
    { id: 'angel', prop: 'angel', above: PRESS, x: 0.24, y: 0.72, size: 0.07, opacity: 0 },
    person('gideon', 'gideon', 0.56, { y: 0.8, pose: 'work' }),
    { id: 'offering-fire', prop: 'campfire', above: PRESS, x: 0.34, y: 0.76, size: 0.05, opacity: 0 },
    // The threshing floor at night, and the fleece.
    { id: 'fleece', prop: 'fleece', above: FLOOR, x: 0.5, y: 0.8, size: 0.08, pose: 'dry', opacity: 0 },
    onFloor('gideon-floor', 'gideon', 0.66, { opacity: 0 }),
    // The spring of Harod: the men who kneel to drink, and the three hundred who lap from their hands.
    { id: 'spring', prop: 'pool', above: SPRING, x: 0.5, y: 0.84, size: 0.24, opacity: 0 },
    bySpring('kneelers', 'hebrew-workers', 0.3, { size: 0.12, facing: 1, opacity: 0 }),
    bySpring('lappers', 'hebrew-father', 0.68, { size: 0.05, pose: 'kneel', opacity: 0 }),
    // The night: the camp of Midian in the valley, the three companies with their jars and torches, and Gideon.
    { id: CAMP, prop: 'camel', above: VALLEY, x: 0.5, y: 0.84, size: 0.08, pose: 'kneel', opacity: 0 },
    ...COMPANIES.flatMap((c): SceneActor[] => [
      onHill(c.id, 'hebrew-workers', c.x, { y: c.y, size: 0.05, facing: c.x < 0.5 ? 1 : -1, opacity: 0 }),
      { id: c.jar, prop: 'water-jar', above: VALLEY, x: c.x + 0.03, y: c.y, size: 0.016, opacity: 0 },
      { id: c.torch, prop: 'flaming-torch', above: VALLEY, x: c.x + 0.03, y: c.y, size: 0.03, opacity: 0 },
    ]),
    { id: 'torch-glow', prop: 'halo', above: VALLEY, x: 0.53, y: 0.46, size: 0.16, opacity: 0 },
    onHill('gideon-night', 'gideon', 0.1, { y: 0.56, size: 0.03, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const NIGHT = [CAMP, ...COMPANIES.flatMap((c) => [c.id, c.jar, c.torch]), 'torch-glow', 'gideon-night']

const scenes: StoryScene[] = [
  {
    id: 'l15-e3-s1',
    title: 'In the wine press',
    music: 'bach-brandenburg-1-allegro',
    beats: [
      verse('JDG 6:6', camera({ zoom: 1.02 }, slow)),
      verse('JDG 6:11', fadeIn('angel', 0.5, 0.9)),
      verse('JDG 6:12', actor('gideon', { pose: 'idle', facing: 1 }, { seconds: 0.6, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      verse('JDG 6:13', ...pose('gideon', 'lift', 0.5, 3)),
      verse('JDG 6:14'),
      verse('JDG 6:15', ...pose('gideon', 'kneel', 0.5, 3)),
      verse('JDG 6:16', camera({ zoom: 1.02 }, slow)),
      say('Fire sprang from the rock and burned up Gideon’s offering, and the angel vanished. That night Gideon pulled down his father’s altar to Baal, and built an altar to the LORD.', fadeIn('offering-fire', 0.3), fadeOut('angel', 1), fadeOut('offering-fire', 3), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l15-e3-s2',
    title: 'The fleece and the water',
    music: 'bach-brandenburg-1-allegro',
    beats: [
      verse('JDG 6:37', ...swap('forest-sky', 'night-sky'), ...swap(PRESS, FLOOR), ...['oak', 'gideon'].map((id) => fadeOut(id)), fadeIn('fleece', 1.5), fadeIn('gideon-floor', 1.5)),
      verse('JDG 6:38', ...swap('night-sky', 'dawn-sky'), actor('fleece', { pose: 'wet' }, { seconds: 1, delay: 1 })),
      verse('JDG 6:39', ...swap('dawn-sky', 'night-sky'), ...pose('gideon-floor', 'pray', 0.5, 3)),
      verse('JDG 6:40', ...swap('night-sky', 'dawn-sky'), actor('fleece', { pose: 'dry' }, { seconds: 1, delay: 1 })),
      verse('JDG 7:2', ...swap('dawn-sky', 'forest-sky'), ...swap(FLOOR, SPRING), fadeOut('fleece'), fadeOut('gideon-floor'), fadeIn('spring', 1.5), fadeIn('kneelers', 2), fadeIn('lappers', 2)),
      say('Twenty-two thousand men who were afraid went home. Ten thousand stayed, and still God said, “The people are still too many.”', camera({ zoom: 1.02 }, slow)),
      verse('JDG 7:6', camera({ zoom: 1 }, slow)),
      verse('JDG 7:7', fadeOut('kneelers', 0.5)),
    ],
  },
  {
    id: 'l15-e3-s3',
    title: 'For the LORD and for Gideon',
    music: 'bach-brandenburg-1-allegro',
    beats: [
      verse('JDG 7:16', ...swap('forest-sky', 'night-sky'), ...swap(SPRING, VALLEY), fadeOut('spring'), fadeOut('lappers'), fadeIn(CAMP, 1.5), ...COMPANIES.flatMap((c, i) => [fadeIn(c.id, 1.8 + i * 0.3), fadeIn(c.jar, 1.8 + i * 0.3)]), fadeIn('gideon-night', 2)),
      verse('JDG 7:17', ...pose('gideon-night', 'lift', 0.5, 3)),
      play('torches-and-trumpets', { done: COMPANIES.flatMap((c) => [actor(c.jar, { opacity: 0 }, { seconds: 0.5 }), actor(c.torch, { opacity: 1 }, { seconds: 0.5 })]) }),
      verse('JDG 7:20', actor('torch-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('JDG 7:21', actor(CAMP, { x: 0.3, opacity: 0, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 0.5 })),
      verse('JDG 8:22', ...swap('night-sky', 'dawn-sky')),
      verse('JDG 8:23', ...pose('gideon-night', 'lift', 0.5, 3)),
      say('But Gideon took the Midianites’ gold and made a priestly garment, an ephod, and set it up in his town. Before long the people were worshiping it, and it became a snare to Gideon and his family.', camera({ zoom: 1.02 }, slow)),
      verse('JDG 8:28', ...swap('dawn-sky', 'forest-sky'), ...NIGHT.filter((id) => id !== CAMP).map((id) => fadeOut(id, 0.5)), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: gideonSet, scenes }
