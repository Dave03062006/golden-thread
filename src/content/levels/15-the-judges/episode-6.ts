import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · Everyone Did What Was Right in His Own Eyes (Judges 17–18; 20–21), from the
 * approved Level 15 script.
 *
 * Micah makes a shrine with his mother's silver, and hires a young Levite from Bethlehem as his
 * priest. The player finds the word of God's law that each thing in the shrine breaks ("in his
 * own eyes", minigames/in-his-own-eyes). The Danites carry it all off to Laish, which they call
 * Dan. The crime at Gibeah and the war that followed are told in a sentence each, and nothing
 * is shown. At the end the camera turns to Bethlehem, where a lamp glows (this episode's golden
 * thread: the ruler born in Bethlehem).
 */

/** What Micah gathered in his shrine, and the word of God's law each one breaks. */
export const SHRINE = [
  { id: 'carved-image', prop: 'idol', x: 0.3, size: 0.03, name: 'The carved silver image', law: '“You shall not make yourself a graven image” (the Ten Commandments)' },
  { id: 'molten-image', prop: 'idol', x: 0.36, size: 0.024, name: 'The image cast in silver', law: '“You shall make for yourself no molten gods”' },
  { id: 'teraphim', prop: 'idol', x: 0.42, size: 0.016, name: 'The household gods', law: '“You shall have no other gods before me”' },
  { id: 'ephod', prop: 'cloak', x: 0.48, size: 0.04, name: 'A shrine of his own, with an ephod', law: 'Worship at the one place the LORD chooses: the tabernacle at Shiloh' },
  { id: 'son-priest', prop: 'isaac', x: 0.56, size: 0.04, name: 'Micah’s son, made a priest', law: 'Only Aaron and his sons may serve as priests' },
]
/** How much each one fades once the player has found the law it breaks. */
export const FOUND = 0.3

const HOUSE = 'house-inside'
const HILLS = 'canaan-hills'
const DAN = 'green-hills'
const inHouse = personOn(HOUSE)
const person = personOn(HILLS)

export const micahSet: SceneDescription = {
  id: 'l15-micah',
  title: 'In his own eyes',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: HOUSE, depth: 0.3 },
    { id: HILLS, depth: 0.3, opacity: 0 },
    { id: DAN, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Micah's house: Micah, his mother and her silver, the shrine, and the young Levite.
    inHouse('micah', 'micah', 0.72),
    inHouse('mother', 'hebrew-mother', 0.82, { facing: -1 }),
    { id: 'silver', prop: 'silver-coins', above: HOUSE, x: 0.77, y: 0.78, size: 0.03 },
    ...SHRINE.map((s): SceneActor => (s.prop === 'isaac' ? inHouse(s.id, s.prop, s.x, { facing: 1, opacity: 0 }) : { id: s.id, prop: s.prop, above: HOUSE, x: s.x, y: 0.78, size: s.size, opacity: 0 })),
    inHouse('levite', 'levite', 0.98, { opacity: 0 }),
    // The Danites at Micah's gate, and their new city at the springs of the Jordan.
    person('danites', 'hebrew-workers', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    person('levite-going', 'levite', 0.3, { facing: 1, opacity: 0 }),
    person('micah-running', 'micah', 0.9, { opacity: 0 }),
    { id: 'dan-city', prop: 'city', above: DAN, x: 0.6, y: 0.62, size: 0.12, opacity: 0 },
    { id: 'dan-idol', prop: 'idol', above: DAN, x: 0.42, y: 0.8, size: 0.03, opacity: 0 },
    // The tribes gathered, weeping at Bethel; and Bethlehem, where one lamp is burning (the golden thread).
    person('tribes', 'crowd', 0.5, { size: 0.2, opacity: 0 }),
    { id: 'bethlehem', prop: 'city', above: HILLS, x: 0.8, y: 0.6, size: 0.08, opacity: 0 },
    { id: 'lamp-glow', prop: 'halo', above: HILLS, x: 0.8, y: 0.56, size: 0.12, opacity: 0 },
    { id: 'lamp', prop: 'oil-lamp', above: HILLS, x: 0.8, y: 0.6, size: 0.02, opacity: 0 },
  ],
  camera: DRIFT,
}

const IN_HOUSE = ['micah', 'mother', 'silver', 'levite', ...SHRINE.map((s) => s.id)]

const scenes: StoryScene[] = [
  {
    id: 'l15-e6-s1',
    title: 'Micah’s silver',
    music: 'bach-ich-ruf',
    beats: [
      verse('JDG 17:1', camera({ zoom: 1.02 }, slow)),
      verse('JDG 17:3', fadeOut('silver', 0.5), ...SHRINE.slice(0, 2).map((s, i) => fadeIn(s.id, 1 + i * 0.4))),
      verse('JDG 17:5', ...SHRINE.slice(2).map((s, i) => fadeIn(s.id, 0.5 + i * 0.4))),
      verse('JDG 17:6', camera({ zoom: 1 }, slow)),
      verse('JDG 17:9', fadeIn('levite', 0.3), ...walk('levite', { x: 0.88 }, 2, 0.5)),
      verse('JDG 17:10', ...pose('micah', 'lift', 0.5, 3)),
      verse('JDG 17:13', ...pose('micah', 'pray', 0.5, 3)),
      play('in-his-own-eyes', { done: SHRINE.map((s) => actor(s.id, { opacity: FOUND }, { seconds: 0.5 })) }),
    ],
  },
  {
    id: 'l15-e6-s2',
    title: 'The Danites',
    music: 'bach-ich-ruf',
    beats: [
      verse('JDG 18:1', ...swap(HOUSE, HILLS), ...IN_HOUSE.map((id) => fadeOut(id)), fadeIn('danites', 1.5)),
      verse('JDG 18:17', camera({ zoom: 1.02 }, slow)),
      verse('JDG 18:19', fadeIn('levite-going', 0.5)),
      verse('JDG 18:20', ...walk('levite-going', { x: 0.24 }, 2, 0.3)),
      verse('JDG 18:24', fadeIn('micah-running', 0.3), ...walk('micah-running', { x: 0.6 }, 2, 0.3), camera({ zoom: 1 }, slow)),
      say('The Danites went north to Laish, a quiet town that wasn’t expecting anyone, took it, and built it again as their own.', ...swap(HILLS, DAN), ...['danites', 'levite-going', 'micah-running'].map((id) => fadeOut(id)), fadeIn('dan-city', 1.5)),
      verse('JDG 18:29', camera({ zoom: 1.02 }, slow)),
      verse('JDG 18:30', fadeIn('dan-idol', 0.5), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l15-e6-s3',
    title: 'One tribe lacking',
    music: 'bach-ich-ruf',
    beats: [
      say('Then something terrible happened in Gibeah, a town of the tribe of Benjamin: some of its men cruelly attacked a woman who was traveling with her husband, and she died. And the people of Benjamin would not hand over the men who had done it.', ...swap(DAN, HILLS), ...swap('forest-sky', 'evening-sky'), fadeOut('dan-city'), fadeOut('dan-idol')),
      verse('JDG 20:1', fadeIn('tribes', 0.5)),
      say('War broke out among God’s own people, tribe against tribe, and the tribe of Benjamin was almost wiped out.', camera({ zoom: 1.02 }, slow)),
      verse('JDG 21:2', camera({ zoom: 1 }, slow)),
      verse('JDG 21:3', camera({ zoom: 1.02 }, slow)),
      verse('JDG 21:6', ...swap('evening-sky', 'forest-sky'), fadeIn('bethlehem', 0.5), fadeIn('lamp', 0.5), actor('lamp-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 }), camera({ zoom: 1 }, slow)),
      say('So they found a way for Benjamin to live on, and went home, every man to his own land.', fadeOut('tribes', 0.5)),
      verse('JDG 21:25', camera({ zoom: 1.02, x: 0.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: micahSet, scenes }
