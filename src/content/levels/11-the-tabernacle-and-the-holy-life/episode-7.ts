import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, tabernacle, walk } from './stage'

/**
 * Episode 7 · "Love Your Neighbor as Yourself" (Leviticus 19), from the approved Level 11
 * script.
 *
 * "You shall be holy; for I the LORD your God am holy." Holiness is for every day: at home,
 * in the field and in the market. Looking ahead to the promised land, the player reaps a
 * field of grain, but leaves its edges standing for the poor and the stranger, and shows
 * each gleaner to the grain left for them ("the edges of the field",
 * minigames/the-edges-of-the-field). The stranger gleaning at the edge glows (this
 * episode's golden thread: the Good Samaritan, "Go and do likewise"). Then the camp at
 * evening: a stone moved from a blind man's path, a young man standing as an old man passes,
 * a stranger welcomed to a family's meal.
 */

/** The rows of grain the player reaps, top to bottom, and the edges of the field left standing. */
export const ROWS = [0.62, 0.655, 0.69, 0.725].map((y, i) => ({ id: `row-${i + 1}`, sheaf: `sheaves-${i + 1}`, y }))
export const FIELD = { x: 0.5, size: 0.56, edges: [0.14, 0.86] }
/** The reapers, who walk along each row as it's reaped. */
export const REAPERS = { id: 'reapers', from: 0.22, to: 0.78 }
/** The widow, the poor man and the stranger: where they wait, and where they glean, at the edges. */
export const GLEANERS = [
  { id: 'widow', prop: 'widow', name: 'The widow', from: 0.04, to: 0.12, y: 0.8 },
  { id: 'poor-man', prop: 'poor-man', name: 'The poor man', from: 0.96, to: 0.88, y: 0.8 },
  { id: 'stranger', prop: 'sojourner', name: 'The stranger', from: 0.97, to: 0.84, y: 0.72 },
]

const CAMP = 'horeb'
const LAND = 'wheat-field'
const person = personOn(CAMP)
const reaper = personOn(LAND, 0.8)

export const neighborSet: SceneDescription = {
  id: 'l11-neighbor',
  title: 'Love your neighbor as yourself',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: LAND, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp at evening, around the tabernacle, with the cloud glowing above.
    ...tabernacle('tabernacle', CAMP, { x: 0.5, y: 0.8, size: 0.44 }, ['tent', 'screen', 'altar', 'laver', 'court']),
    { id: 'glory', prop: 'halo', above: CAMP, x: 0.45, y: 0.54, size: 0.26, opacity: 0.7 },
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: CAMP, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('grandmother', 'grandmother', 0.2, { facing: 1 }),
    person('girl', 'girl', 0.24, { size: 0.026, y: 0.79 }),
    person('family', 'hebrew-family', 0.8, { size: 0.12 }),
    // The field at harvest: its rows, its edges, the sheaves, the reapers and the gleaners.
    ...ROWS.flatMap((r): SceneActor[] => [
      { id: r.id, prop: 'grain-row', above: LAND, x: FIELD.x, y: r.y, size: FIELD.size, opacity: 0 },
      { id: r.sheaf, prop: 'sheaf', above: LAND, x: FIELD.x, y: r.y, size: 0.03, pose: 'stand', opacity: 0, group: { count: 4, w: FIELD.size * 0.8, h: 0.004, seed: 71 + r.y * 100 } },
    ]),
    ...FIELD.edges.map((x, i): SceneActor => ({ id: `edge-${i + 1}`, prop: 'grain-row', above: LAND, x, y: ROWS.at(-1)!.y, size: 0.12, pose: 'edge', opacity: 0 })),
    reaper(REAPERS.id, 'hebrew-workers', REAPERS.from, { y: ROWS[0]!.y, size: 0.08, facing: 1, opacity: 0 }),
    ...GLEANERS.map((g) => reaper(g.id, g.prop, g.from, { y: g.y, facing: g.from < 0.5 ? 1 : -1, opacity: 0 })),
    { id: 'stranger-glow', prop: 'halo', above: LAND, x: GLEANERS[2]!.from, y: GLEANERS[2]!.y - 0.04, size: 0.1, opacity: 0 },
    // The camp again: a blind man, the stone in his path and the neighbor who moves it; an old man; a stranger welcomed.
    person('blind-man', 'poor-man', 0.3, { facing: 1, opacity: 0 }),
    { id: 'stumbling-stone', prop: 'dark-stone', above: CAMP, x: 0.36, y: 0.79, size: 0.02, opacity: 0 },
    person('neighbor', 'hebrew-father', 0.42, { opacity: 0 }),
    person('old-man', 'elder', 0.62, { opacity: 0 }),
    person('young-man', 'servant', 0.7, { pose: 'sit', opacity: 0 }),
    person('guest', 'sojourner', 0.97, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const HOME = ['grandmother', 'girl', 'family']
const FIELD_ACTORS = [...ROWS.flatMap((r) => [r.id, r.sheaf]), 'edge-1', 'edge-2', REAPERS.id, ...GLEANERS.map((g) => g.id), 'stranger-glow']

const scenes: StoryScene[] = [
  {
    id: 'l11-e7-s1',
    title: 'You shall be holy',
    music: 'bach-jesu-joy',
    beats: [
      verse('LEV 19:2', camera({ zoom: 1.02 }, slow)),
      say('God is holy. To be holy is to belong to him, and to become like him.', camera({ zoom: 1 }, slow)),
      verse('LEV 19:3', ...walk('girl', { x: 0.215 }, 1, 0.5), actor('grandmother', { pose: 'sit' }, { seconds: 0.8, delay: 1.8 })),
      say('Holiness was not only for the tabernacle. It was for every day: at home, in the field and in the market.', ...pose('family', 'walk', 0.5, 2)),
    ],
  },
  {
    id: 'l11-e7-s2',
    title: 'The edges of the field',
    music: 'bach-jesu-joy',
    beats: [
      verse(
        'LEV 19:9',
        ...swap('evening-sky', 'forest-sky'),
        ...swap(CAMP, LAND),
        ...['tabernacle-tent', 'tabernacle-screen', 'tabernacle-altar', 'tabernacle-laver', 'tabernacle-court', 'glory', 'tent-1', 'tent-2', ...HOME].map((id) => fadeOut(id)),
        ...[...ROWS.map((r) => r.id), 'edge-1', 'edge-2', REAPERS.id].map((id) => fadeIn(id, 1.5)),
      ),
      verse('LEV 19:10', ...GLEANERS.map((g, i) => fadeIn(g.id, 0.5 + i * 0.5)), fadeIn('stranger-glow', 1.5, 0.85)),
      play('the-edges-of-the-field', {
        cues: [actor(REAPERS.id, { pose: 'walk' }, { seconds: 0.4 })],
        done: [
          ...ROWS.flatMap((r) => [actor(r.id, { opacity: 0 }, { seconds: 0.5 }), actor(r.sheaf, { opacity: 1 }, { seconds: 0.5 })]),
          // The reapers turn at the end of each row, so they finish at the side the last row ends.
          actor(REAPERS.id, { x: (ROWS.length - 1) % 2 ? REAPERS.from : REAPERS.to, y: ROWS.at(-1)!.y, facing: (ROWS.length - 1) % 2 ? -1 : 1, pose: 'idle' }, { seconds: 0.5 }),
          ...GLEANERS.map((g) => actor(g.id, { x: g.to }, { seconds: 0.5 })),
          actor('stranger-glow', { x: GLEANERS[2]!.to }, { seconds: 0.5 }),
        ],
      }),
    ],
  },
  {
    id: 'l11-e7-s3',
    title: 'As yourself',
    music: 'bach-jesu-joy',
    beats: [
      verse(
        'LEV 19:14',
        ...swap('forest-sky', 'evening-sky'),
        ...swap(LAND, CAMP),
        ...FIELD_ACTORS.map((id) => fadeOut(id)),
        ...['tabernacle-tent', 'tabernacle-screen', 'tabernacle-altar', 'tabernacle-laver', 'tabernacle-court', 'glory', 'tent-1', 'tent-2'].map((id) => fadeIn(id, 1.5, id === 'glory' ? 0.7 : 1)),
        fadeIn('blind-man', 1.5),
        fadeIn('stumbling-stone', 1.5),
        fadeIn('neighbor', 1.5),
        ...walk('neighbor', { x: 0.37 }, 1.5, 3),
        actor('stumbling-stone', { x: 0.4, y: 0.81 }, { seconds: 1.2, ease: 'inOutSine', delay: 4.6 }),
        ...walk('blind-man', { x: 0.34 }, 2, 6),
      ),
      verse('LEV 19:18', camera({ zoom: 1.02 }, slow)),
      verse('LEV 19:32', fadeIn('old-man', 0.5), fadeIn('young-man', 0.5), ...walk('old-man', { x: 0.66 }, 3, 1), actor('young-man', { pose: 'idle' }, { seconds: 0.8, delay: 2.5 })),
      verse('LEV 19:34', camera({ zoom: 1 }, slow), fadeIn('family', 0.5), fadeIn('guest', 0.5), ...walk('guest', { x: 0.88 }, 3, 1)),
      say('Again and again God said, “I am the LORD.” Loving their neighbor was how his people would show whose they were.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: neighborSet, scenes }
