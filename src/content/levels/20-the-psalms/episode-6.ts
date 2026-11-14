import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · Songs of the Road to Jerusalem (Psalms 121, 122, 133 and 134), from the approved
 * Level 20 script.
 *
 * A pilgrim family climbs the road to Jerusalem, a boy of twelve among them, singing the Songs of
 * Ascents. At the Temple, the Temple gate glows (this episode's golden thread: "his parents went to
 * Jerusalem every year"), and the player leads the family up the great stairway, one song of the
 * road for each step ("songs of ascents", minigames/songs-of-ascents). At night the Levites lift up
 * their hands and bless the LORD.
 */

/** The songs of the road, in the order a pilgrim sings them. */
export const ASCENTS = [
  '“I lift up my eyes to the hills.”',
  '“I was glad when they said to me, ‘Let us go to the house of the LORD!’”',
  '“Our feet have been standing within your gates, O Jerusalem!”',
  '“Behold, how good and pleasant it is when brothers dwell in unity!”',
  '“Come, bless the LORD, all you servants of the LORD.”',
]
/** The family's climb up the Temple stairway, one step for each song. */
export const STAIRS = { id: 'climbers', from: { x: 0.3, y: 0.86 }, to: { x: 0.5, y: 0.62 } }

const ROAD = 'canaan-hills'
const COURTS = 'temple-courts'
const onRoad = personOn(ROAD)
const inCourts = personOn(COURTS)

export const ascentsSet: SceneDescription = {
  id: 'l20-ascents',
  title: 'Songs of the road',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: ROAD, depth: 0.3 },
    { id: COURTS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The road: the pilgrim family, the grandmother on a donkey, and the boy of twelve.
    onRoad('family', 'hebrew-family', 0.24, { size: 0.12, facing: 1 }),
    { id: 'donkey', prop: 'donkey', above: ROAD, x: 0.08, y: 0.8, size: 0.07, facing: 1 },
    onRoad('grandmother', 'grandmother', 0.08, { facing: 1, y: 0.74 }),
    onRoad('boy', 'boy', 0.36, { facing: 1 }),
    // The Temple: the gate (the golden thread), the family climbing, the Levites at night.
    { id: 'gate-glow', prop: 'halo', above: COURTS, x: 0.5, y: 0.5, size: 0.22, opacity: 0 },
    { id: STAIRS.id, prop: 'hebrew-family', above: COURTS, x: STAIRS.from.x, y: STAIRS.from.y, size: 0.1, facing: 1, opacity: 0 },
    inCourts('levite-1', 'aaron-linen', 0.22, { facing: 1, opacity: 0 }),
    inCourts('levite-2', 'aaron-linen', 0.78, { opacity: 0 }),
    inCourts('temple-boy', 'boy', 0.64, { opacity: 0 }),
    { id: 'lamp-1', prop: 'torches', above: COURTS, x: 0.14, y: 0.7, size: 0.04, opacity: 0 },
    { id: 'lamp-2', prop: 'torches', above: COURTS, x: 0.86, y: 0.7, size: 0.04, opacity: 0 },
  ],
  camera: DRIFT,
}

const onTheRoad = ['family', 'donkey', 'grandmother', 'boy']

const scenes: StoryScene[] = [
  {
    id: 'l20-e6-s1',
    title: 'I lift up my eyes to the hills',
    music: 'parry-psalm-84',
    beats: [
      say('Three times a year, families from all over the land went up to Jerusalem for the great feasts. On the long climb they sang the Songs of Ascents, fifteen short psalms for the road.', ...walk('family', { x: 0.44, facing: 1 }, 8), ...walk('boy', { x: 0.56, facing: 1 }, 8), actor('donkey', { x: 0.26 }, { seconds: 8, ease: 'inOutSine' }), actor('grandmother', { x: 0.26 }, { seconds: 8, ease: 'inOutSine' })),
      verse('PSA 121:1', camera({ zoom: 1.02, y: -0.02 }, slow)),
      verse('PSA 121:2'),
      verse('PSA 121:3', camera({ zoom: 1, y: 0 }, slow)),
      verse('PSA 121:8'),
    ],
  },
  {
    id: 'l20-e6-s2',
    title: 'I was glad',
    music: 'parry-psalm-84',
    beats: [
      verse('PSA 122:1', ...swap('forest-sky', 'evening-sky'), ...swap(ROAD, COURTS), ...onTheRoad.map((id) => fadeOut(id)), fadeIn(STAIRS.id, 1.5), actor('gate-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      play('songs-of-ascents', { done: [actor(STAIRS.id, { x: STAIRS.to.x, y: STAIRS.to.y }, { seconds: 0.5 })] }),
      verse('PSA 122:2', camera({ zoom: 1.03, y: -0.02 }, slow)),
      verse('PSA 122:6', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l20-e6-s3',
    title: 'Who stand by night in the house of the LORD',
    music: 'parry-psalm-84',
    beats: [
      verse('PSA 133:1', ...swap('evening-sky', 'night-sky'), actor(STAIRS.id, { x: 0.36, y: 0.8 }, { seconds: 2 }), fadeIn('temple-boy', 1), fadeIn('lamp-1', 1), fadeIn('lamp-2', 1)),
      verse('PSA 134:1', fadeIn('levite-1', 0.5), fadeIn('levite-2', 0.5)),
      verse('PSA 134:2', actor('levite-1', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 }), actor('levite-2', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      verse('PSA 134:3', camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: ascentsSet, scenes }
