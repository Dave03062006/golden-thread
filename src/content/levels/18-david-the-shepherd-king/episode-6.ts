import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · King in Jerusalem (1 Samuel 31; 2 Samuel 1–5), from the approved Level 18 script.
 *
 * Saul and Jonathan die on Mount Gilboa, told in a sentence and not shown; David laments them.
 * He is anointed king at Hebron, first over Judah, then over all Israel, and takes the stronghold
 * of Zion, where his banner glows (this episode's golden thread: "the heavenly Jerusalem"). The
 * player sets the road to the throne in order ("the road to the throne",
 * minigames/the-road-to-the-throne), and David climbs a step with each.
 */

/** The steps of David's road to the throne, up the hill of Zion. */
export const THRONE_ROAD = [
  'Anointed by Samuel at Bethlehem',
  'Goliath falls in the valley of Elah',
  'Jonathan’s friendship, sealed with a covenant',
  'Years on the run from Saul',
  'Anointed king of Judah at Hebron',
  'King over all Israel',
  'The stronghold of Zion taken',
]
export const CLIMB = { id: 'david-climbing', from: { x: 0.2, y: 0.84 }, to: { x: 0.56, y: 0.6 } }

const GILBOA = 'canaan-hills'
const HEBRON = 'city-street'
const ZION = 'salem-hill'
const onGilboa = personOn(GILBOA)
const inHebron = personOn(HEBRON)

export const kingSet: SceneDescription = {
  id: 'l18-king',
  title: 'King in Jerusalem',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: GILBOA, depth: 0.3 },
    { id: HEBRON, depth: 0.3, opacity: 0 },
    { id: ZION, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Gilboa at dusk, and David's camp with the messenger.
    { id: 'bow', prop: 'spear', above: GILBOA, x: 0.3, y: 0.84, size: 0.04 },
    onGilboa('david-mourning', 'david', 0.6, { opacity: 0 }),
    onGilboa('messenger', 'messenger', 0.76, { opacity: 0 }),
    // Hebron: the men of Judah, then the elders of all Israel.
    inHebron('david-hebron', 'david', 0.46, { opacity: 0 }),
    inHebron('judah', 'hebrew-workers', 0.74, { size: 0.12, opacity: 0 }),
    inHebron('elders', 'elders', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    // Zion: David climbing the hill, and his banner over the stronghold (the golden thread).
    { id: CLIMB.id, prop: 'david', above: ZION, x: CLIMB.from.x, y: CLIMB.from.y, size: 0.04, facing: 1, opacity: 0 } as SceneActor,
    { id: 'banner', prop: 'banner', above: ZION, x: 0.6, y: 0.5, size: 0.02, pose: 'israel', opacity: 0 },
    { id: 'banner-glow', prop: 'halo', above: ZION, x: 0.6, y: 0.44, size: 0.16, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e6-s1',
    title: '“How are the mighty fallen!”',
    music: 'parry-psalm-84',
    beats: [
      say('The Philistines fought against Israel on Mount Gilboa. Jonathan and his brothers were killed, and Saul, badly wounded, took his own life rather than be captured.', camera({ zoom: 1.02 }, slow)),
      verse('1SA 31:6', camera({ zoom: 1 }, slow)),
      verse('2SA 1:19', fadeOut('bow'), fadeIn('david-mourning', 0.5), fadeIn('messenger', 0.5), actor('david-mourning', { pose: 'kneel' }, { seconds: 0.8, delay: 1.5 })),
      verse('2SA 1:23', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l18-e6-s2',
    title: 'King at Hebron',
    music: 'parry-psalm-84',
    beats: [
      verse('2SA 2:4', ...swap('evening-sky', 'forest-sky'), ...swap(GILBOA, HEBRON), fadeOut('david-mourning'), fadeOut('messenger'), fadeIn('david-hebron', 1.5), fadeIn('judah', 1.5)),
      verse('2SA 5:3', fadeIn('elders', 0.5), ...pose('david-hebron', 'lift', 1, 3)),
      verse('2SA 5:4', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l18-e6-s3',
    title: 'The stronghold of Zion',
    music: 'parry-psalm-84',
    beats: [
      verse('2SA 5:6', ...swap(HEBRON, ZION), ...['david-hebron', 'judah', 'elders'].map((id) => fadeOut(id)), fadeIn(CLIMB.id, 1.5)),
      verse('2SA 5:7', fadeIn('banner', 0.5), actor('banner-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 })),
      play('the-road-to-the-throne', { done: [actor(CLIMB.id, { ...CLIMB.to }, { seconds: 0.5 })] }),
      verse('2SA 5:10', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: kingSet, scenes }
