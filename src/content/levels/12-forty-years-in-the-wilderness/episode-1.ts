import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, tabernacle, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · The Camp and the Priestly Blessing (Numbers 1–2; 6:22–27; 9:15–23; 10:11–36),
 * from the approved Level 12 script.
 *
 * The people are counted by name and camp tribe by tribe around the tabernacle. When the
 * cloud lifts, they set out; when it settles, they camp. The player leads the camp after the
 * cloud across the wilderness ("follow the cloud", minigames/follow-the-cloud). At a new camp,
 * Aaron lifts his hands and blesses the people (this episode's golden thread: Jesus, "lifting
 * up his hands he blessed them").
 */

/** The wilderness map: where the cloud settles, stage by stage, and how many days it stays at each. */
export const STAGES = [
  { x: 0.2, y: 0.62, days: 'a night' },
  { x: 0.42, y: 0.42, days: 'two days' },
  { x: 0.64, y: 0.6, days: 'a month' },
  { x: 0.84, y: 0.36, days: 'many days' },
]
/** Where the camp starts on the map: at Sinai, in the bottom left. */
export const START = { x: 0.08, y: 0.7 }
export const MAP_CAMP = 'map-camp'
export const MAP_CLOUD = 'map-cloud'

const ABOVE = 'horeb'
const ROAD = 'dry-hills'
const MAP = 'wilderness-map'
const person = personOn(ABOVE)
const onRoad = personOn(ROAD)
const CAMP = ['tabernacle-tent', 'tabernacle-court', 'cloud', 'people', 'more-people', 'tent-1', 'tent-2', 'moses', 'aaron', 'scroll', 'leader-1', 'leader-2']

export const campSet: SceneDescription = {
  id: 'l12-camp',
  title: 'The camp and the priestly blessing',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: ROAD, depth: 0.3, opacity: 0 },
    { id: MAP, depth: 0.1, opacity: 0 },
  ],
  actors: [
    // The camp at Sinai: the tabernacle in the middle under the cloud, and the tribes around it.
    ...tabernacle('tabernacle', ABOVE, { x: 0.5, y: 0.78, size: 0.36 }, ['tent', 'court']),
    { id: 'cloud', prop: 'pillar', above: ABOVE, x: 0.47, y: 0.62, size: 0.08, pose: 'cloud' },
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.08, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.92, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.18, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.82, { size: 0.12 }),
    { id: 'scroll', prop: 'scroll', above: ABOVE, x: 0.3, y: 0.76, size: 0.03 },
    person('moses', 'moses-shepherd', 0.26, { facing: 1, pose: 'sit' }),
    person('aaron', 'aaron', 0.34, { pose: 'sit' }),
    person('leader-1', 'elder', 0.7, { opacity: 0 }),
    person('leader-2', 'judah', 0.76, { opacity: 0 }),
    // The wilderness map, seen from above: the camp and the cloud it follows.
    { id: MAP_CLOUD, prop: 'pillar', above: MAP, x: START.x, y: START.y - 0.08, size: 0.05, pose: 'cloud', opacity: 0 },
    { id: MAP_CAMP, prop: 'striped-tent', above: MAP, x: START.x, y: START.y, size: 0.05, pose: 'open', opacity: 0 },
    // On the march: the ark going before, and the people behind it.
    { id: 'ark', prop: 'tabernacle-piece', above: ROAD, x: pieceX('ark', 0.6, 1.2), y: 0.8, size: 1.2, pose: 'ark', opacity: 0 },
    onRoad('bearer-1', 'priest', 0.56, { facing: 1, opacity: 0 }),
    onRoad('bearer-2', 'priest', 0.64, { facing: 1, opacity: 0 }),
    onRoad('marchers', 'hebrew-family', 0.3, { size: 0.12, facing: 1, opacity: 0 }),
    { id: 'march-cloud', prop: 'pillar', above: ROAD, x: 0.78, y: 0.56, size: 0.08, pose: 'cloud', opacity: 0 },
    // The blessing at the new camp: Aaron's lifted hands (the golden thread), and the light over the tents.
    onRoad('blesser', 'high-priest', 0.5, { opacity: 0 }),
    { id: 'hands-glow', prop: 'halo', above: ROAD, x: 0.5, y: 0.7, size: 0.1, opacity: 0 },
    { id: 'blessing', prop: 'halo', above: ROAD, x: 0.5, y: 0.6, size: 0.6, opacity: 0 },
    ...[0.12, 0.28, 0.72, 0.88].map((x, i): SceneActor => ({ id: `new-tent-${i + 1}`, prop: 'striped-tent', above: ROAD, x, y: 0.76, size: 0.09, pose: 'open', facing: i < 2 ? 1 : -1, opacity: 0 })),
  ],
  camera: DRIFT,
}

const MARCH = ['ark', 'bearer-1', 'bearer-2', 'marchers', 'march-cloud']

const scenes: StoryScene[] = [
  {
    id: 'l12-e1-s1',
    title: 'Counted by name',
    music: 'be-thou-my-vision',
    beats: [
      verse('NUM 1:1', camera({ zoom: 1.02 }, slow)),
      verse('NUM 1:2', fadeIn('leader-1', 0.5), fadeIn('leader-2', 1), ...walk('leader-1', { x: 0.4 }, 3, 1), ...walk('leader-2', { x: 0.45 }, 3, 1.5)),
      say('Every family was counted, every name written down. God knew each one of his people.', ...pose('moses', 'work', 0.5, 4)),
      verse('NUM 2:2', camera({ zoom: 1 }, slow), ...walk('leader-1', { x: 0.7, facing: 1 }, 3, 0.5), ...walk('leader-2', { x: 0.76, facing: 1 }, 3, 0.5)),
      say('Judah, Issachar and Zebulun camped on the east, toward the sunrise; Reuben, Simeon and Gad on the south; Ephraim, Manasseh and Benjamin on the west; and Dan, Asher and Naphtali on the north. In the middle of them all stood the tabernacle, where God lived among them.', camera({ zoom: 1.03, y: -0.01 }, slow)),
    ],
  },
  {
    id: 'l12-e1-s2',
    title: 'The cloud and the fire',
    music: 'be-thou-my-vision',
    beats: [
      verse('NUM 9:15', camera({ zoom: 1, y: 0 }, slow), ...swap('forest-sky', 'night-sky', 1), actor('cloud', { pose: 'fire' }, { seconds: 2, delay: 2 })),
      verse('NUM 9:17', ...swap('night-sky', 'forest-sky'), actor('cloud', { pose: 'cloud', y: 0.5 }, { seconds: 3 })),
      verse('NUM 9:18'),
      play('follow-the-cloud', {
        cues: [...swap('horeb', MAP), ...CAMP.map((id) => fadeOut(id)), fadeIn(MAP_CAMP, 1.5), fadeIn(MAP_CLOUD, 1.5)],
        done: [actor(MAP_CAMP, { ...STAGES.at(-1)! }, { seconds: 0.5 }), actor(MAP_CLOUD, { x: STAGES.at(-1)!.x, y: STAGES.at(-1)!.y - 0.08 }, { seconds: 0.5 })],
      }),
      verse('NUM 10:33', ...swap(MAP, ROAD), fadeOut(MAP_CAMP), fadeOut(MAP_CLOUD), ...MARCH.map((id) => fadeIn(id, 1.5)), ...['bearer-1', 'bearer-2', 'marchers'].flatMap((id) => walk(id, { x: id === 'marchers' ? 0.4 : id === 'bearer-1' ? 0.66 : 0.74 }, 5, 2)), actor('ark', { x: pieceX('ark', 0.7, 1.2) }, { seconds: 5, ease: 'inOutSine', delay: 2 })),
      verse('NUM 10:35', camera({ zoom: 1.02 }, slow)),
      verse('NUM 10:36', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l12-e1-s3',
    title: '“The LORD bless you”',
    music: 'be-thou-my-vision',
    beats: [
      verse('NUM 6:23', ...swap('forest-sky', 'evening-sky'), ...MARCH.map((id) => fadeOut(id)), ...[1, 2, 3, 4].map((i) => fadeIn(`new-tent-${i}`, 1 + i * 0.3)), fadeIn('blesser', 1.5), fadeIn('hands-glow', 2.5, 0.85)),
      verse('NUM 6:24', ...pose('blesser', 'lift', 0.3, 30), fadeIn('blessing', 1, 0.4)),
      verse('NUM 6:25', actor('blessing', { opacity: 0.55 }, slow)),
      verse('NUM 6:26', actor('blessing', { opacity: 0.7 }, slow)),
      verse('NUM 6:27', actor('blesser', { pose: 'idle' }, { seconds: 0.8, delay: 2 }), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: campSet, scenes }
