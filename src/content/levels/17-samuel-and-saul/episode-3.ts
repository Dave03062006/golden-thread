import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · The Ark Is Captured (1 Samuel 4–6), from the approved Level 17 script.
 *
 * The elders carry the ark into battle like a lucky charm, and it is captured; the battle is told
 * in a sentence and not shown. Eli hears the news and dies; "the glory has departed." In Dagon's
 * temple the statue falls on its face before the ark, which glows (this episode's golden thread:
 * "at the name of Jesus every knee should bow"). The cows bring the ark home, and the player
 * leads them along the road ("the road to Beth-shemesh", minigames/the-road-to-beth-shemesh).
 */

/** The road from Ekron to Beth-shemesh, bend by bend, and the cows that pull the cart along it. */
export const ROAD = [
  { x: 0.9, y: 0.8 },
  { x: 0.72, y: 0.78 },
  { x: 0.56, y: 0.82 },
  { x: 0.4, y: 0.8 },
  { x: 0.26, y: 0.8 },
]
export const COWS = 'cows'

const CAMP = 'dry-hills'
const GATE = 'city-street'
const HALL = 'dagon-hall'
const FIELD = 'wheat-field'
const inCamp = personOn(CAMP)
const atGate = personOn(GATE)
const onRoad = personOn(FIELD)

const ark = (id: string, above: string, x: number, extra = {}) => ({ id, prop: 'tabernacle-piece', above, x: pieceX('ark', x, 0.4), y: 0.8, size: 0.4, pose: 'ark', ...extra })

export const arkSet: SceneDescription = {
  id: 'l17-ark',
  title: 'The ark is captured',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: GATE, depth: 0.3, opacity: 0 },
    { id: HALL, depth: 0.3, opacity: 0 },
    { id: FIELD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Israel's camp, and the ark carried into it.
    inCamp('soldiers', 'hebrew-workers', 0.3, { size: 0.12, facing: 1 }),
    ark('camp-ark', CAMP, 0.96, { opacity: 0 }),
    { id: 'dust', prop: 'dust-cloud', above: CAMP, x: 0.7, y: 0.66, size: 0.4, opacity: 0 },
    // Shiloh's gate: Eli waiting, the runner, and the young mother.
    atGate('eli', 'high-priest', 0.4, { pose: 'sit', facing: 1, opacity: 0 }),
    atGate('runner', 'messenger', 0.98, { opacity: 0 }),
    atGate('mother', 'hebrew-mother', 0.6, { pose: 'sit', opacity: 0 }),
    { id: 'baby', prop: 'swaddled-baby', above: GATE, x: 0.6, y: 0.74, size: 0.03, opacity: 0 },
    // The house of Dagon at Ashdod: Dagon standing, then fallen, and the ark (the golden thread).
    { id: 'dagon', prop: 'stone-pillar', above: HALL, x: 0.62, y: 0.8, size: 0.07, pose: 'standing', opacity: 0 },
    { id: 'dagon-fallen', prop: 'stone-pillar', above: HALL, x: 0.6, y: 0.82, size: 0.07, pose: 'lying', opacity: 0 },
    ark('hall-ark', HALL, 0.4, { opacity: 0 }),
    { id: 'ark-glow', prop: 'halo', above: HALL, x: 0.4, y: 0.62, size: 0.2, opacity: 0 },
    // The road to Beth-shemesh: the cows with the cart and the ark, and the reapers.
    onRoad(COWS, 'cow', ROAD[0]!.x, { y: ROAD[0]!.y, size: 0.07, pose: 'fat', opacity: 0 }),
    onRoad('reapers', 'hebrew-workers', 0.12, { size: 0.12, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e3-s1',
    title: 'The ark taken into battle',
    music: 'mozart-lacrimosa',
    beats: [
      verse('1SA 4:3', fadeIn('camp-ark', 0.5), actor('camp-ark', { x: pieceX('ark', 0.6, 0.4) }, { seconds: 3, ease: 'inOutSine', delay: 0.8 })),
      say('They treated the ark like a lucky charm, as if God had to win for them whether they obeyed him or not.', camera({ zoom: 1.02 }, slow)),
      verse('1SA 4:10', ...swap('forest-sky', 'storm-sky'), fadeIn('dust', 0.5, 0.8), fadeOut('soldiers', 1)),
      verse('1SA 4:11', fadeOut('camp-ark', 1), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e3-s2',
    title: '“The glory has departed”',
    music: 'mozart-lacrimosa',
    beats: [
      verse('1SA 4:17', ...swap(CAMP, GATE), fadeOut('dust'), fadeIn('eli', 1.5), fadeIn('runner', 1.5), ...walk('runner', { x: 0.52 }, 2, 2)),
      verse('1SA 4:18', fadeOut('eli', 1), camera({ zoom: 1.02 }, slow)),
      say('At that moment Phinehas’ wife gave birth to a son, and as she was dying, she gave him his name.', fadeOut('runner'), fadeIn('mother', 0.5), fadeIn('baby', 0.8)),
      verse('1SA 4:21', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e3-s3',
    title: 'Dagon falls, and the ark comes home',
    music: 'mozart-lacrimosa',
    beats: [
      verse('1SA 5:2', ...swap('storm-sky', 'forest-sky'), ...swap(GATE, HALL), fadeOut('mother'), fadeOut('baby'), fadeIn('dagon', 1.5), fadeIn('hall-ark', 1.5)),
      verse('1SA 5:3', fadeOut('dagon', 0.3), fadeIn('dagon-fallen', 0.3), actor('ark-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('1SA 5:4', camera({ zoom: 1.02 }, slow)),
      verse('1SA 5:6', camera({ zoom: 1 }, slow)),
      verse('1SA 6:7', ...swap(HALL, FIELD), ...['dagon-fallen', 'hall-ark', 'ark-glow'].map((id) => fadeOut(id)), fadeIn(COWS, 1.5), fadeIn('reapers', 1.5)),
      play('the-road-to-beth-shemesh', { done: [actor(COWS, { x: ROAD.at(-1)!.x, y: ROAD.at(-1)!.y }, { seconds: 0.5 })] }),
      verse('1SA 6:12', camera({ zoom: 1.02 }, slow)),
      verse('1SA 6:13', ...pose('reapers', 'walk', 0.5, 2), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: arkSet, scenes }
