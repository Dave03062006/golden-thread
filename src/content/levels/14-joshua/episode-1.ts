import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Rahab and the Spies (Joshua 1–2), from the approved Level 14 script.
 *
 * God tells Joshua to be strong and of good courage. Joshua sends two spies to Jericho, and
 * Rahab hides them on her roof: the player covers them with flax before the king's men reach
 * the top, then lets them down the wall while the guard looks away ("hidden on the roof",
 * minigames/hidden-on-the-roof). They give her a scarlet cord to tie in her window, which
 * glows (this episode's golden thread: "By faith Rahab… did not perish," and Rahab in Jesus'
 * family tree).
 */

/** The flax that covers each spy, bundle by bundle, and where the spies lie on the roof. */
export const SPIES = [
  { id: 'spy-1', x: 0.38 },
  { id: 'spy-2', x: 0.5 },
]
export const BUNDLES = SPIES.flatMap((s, i) => [-0.03, 0, 0.03].map((dx, j) => ({ id: `flax-${i * 3 + j + 1}`, x: Math.round((s.x + dx) * 1000) / 1000, y: 0.7 })))
/** The king's men on the stairs, from the bottom to the top of the roof. */
export const SOLDIERS = { id: 'soldiers', from: { x: 0.9, y: 0.86 }, to: { x: 0.76, y: 0.72 } }
/** The spies let down the wall from the window, one at a time, and the guard on the wall. */
export const WINDOW = { x: 0.62, y: 0.42 }
export const ROPE = 'rope'
export const DOWN = { y: 0.8 }
export const GUARD = { id: 'guard', x: 0.3, y: 0.34 }

const PLAINS = 'jordan-valley'
const ROOF = 'rahab-roof'
const WALLS = 'jericho-walls'
const person = personOn(PLAINS)
const onRoof = personOn(ROOF, 0.72)
const onWall = personOn(WALLS, 0.8)
const BY_THE_RIVER = ['joshua', 'light', 'tent-1', 'tent-2']

export const rahabSet: SceneDescription = {
  id: 'l14-rahab',
  title: 'Rahab and the spies',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: PLAINS, depth: 0.3 },
    { id: WALLS, depth: 0.3, opacity: 0 },
    { id: ROOF, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // By the Jordan: Joshua, alone, and God's light.
    { id: 'tent-1', prop: 'striped-tent', above: PLAINS, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    { id: 'tent-2', prop: 'striped-tent', above: PLAINS, x: 0.2, y: 0.76, size: 0.09, pose: 'open', facing: 1 },
    { id: 'light', prop: 'halo', above: PLAINS, x: 0.62, y: 0.3, size: 0.3, opacity: 0 },
    person('joshua', 'joshua', 0.5, { facing: 1 }),
    // Rahab's roof: the spies under the flax, Rahab, and the king's men on the stairs.
    ...SPIES.map((s): SceneActor => onRoof(s.id, 'hebrew-father', s.x, { pose: 'sit', opacity: 0 })),
    ...BUNDLES.map((b): SceneActor => ({ id: b.id, prop: 'flax', above: ROOF, x: b.x, y: b.y + 0.02, size: 0.05, opacity: 0 })),
    onRoof('rahab', 'rahab', 0.64, { opacity: 0 }),
    onRoof(SOLDIERS.id, 'watchman', SOLDIERS.from.x, { y: SOLDIERS.from.y, opacity: 0 }),
    // The city wall at night: Rahab's window, the rope, the spies coming down, the guard, and the scarlet cord (the golden thread).
    { id: 'cord-glow', prop: 'halo', above: WALLS, x: WINDOW.x, y: WINDOW.y + 0.02, size: 0.1, opacity: 0 },
    { id: 'cord', prop: 'scarlet-cord', above: WALLS, x: WINDOW.x, y: WINDOW.y + 0.06, size: 0.02, opacity: 0 },
    { id: ROPE, prop: 'scarlet-cord', above: WALLS, x: WINDOW.x + 0.02, y: DOWN.y, size: 0.02, pose: 'rope', opacity: 0 },
    onWall('climber-1', 'hebrew-father', WINDOW.x + 0.02, { y: WINDOW.y + 0.06, size: 0.03, opacity: 0 }),
    onWall('climber-2', 'hebrew-workers', WINDOW.x + 0.02, { y: WINDOW.y + 0.06, size: 0.05, opacity: 0 }),
    onWall(GUARD.id, 'watchman', GUARD.x, { y: GUARD.y, size: 0.03, opacity: 0 }),
  ],
  camera: DRIFT,
}

const ON_ROOF = [...SPIES.map((s) => s.id), ...BUNDLES.map((b) => b.id), 'rahab', SOLDIERS.id]

const scenes: StoryScene[] = [
  {
    id: 'l14-e1-s1',
    title: 'Be strong and of good courage',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('JOS 1:1', fadeIn('light', 0.5, 0.8), camera({ zoom: 1.02 }, slow)),
      verse('JOS 1:2', ...walk('joshua', { x: 0.56 }, 2, 0.5)),
      verse('JOS 1:5', camera({ zoom: 1 }, slow)),
      verse('JOS 1:9', ...pose('joshua', 'lift', 0.5, 4)),
    ],
  },
  {
    id: 'l14-e1-s2',
    title: 'Hidden on the roof',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('JOS 2:1', ...swap('dawn-sky', 'evening-sky'), ...swap(PLAINS, ROOF), ...BY_THE_RIVER.map((id) => fadeOut(id)), ...SPIES.map((s) => fadeIn(s.id, 1.5)), fadeIn('rahab', 1.5)),
      verse('JOS 2:3', fadeIn(SOLDIERS.id, 0.5)),
      play('hidden-on-the-roof', {
        done: [
          ...BUNDLES.map((b) => actor(b.id, { opacity: 1 }, { seconds: 0.5 })),
          actor(SOLDIERS.id, { ...SOLDIERS.from, opacity: 0 }, { seconds: 0.5 }),
        ],
      }),
      verse('JOS 2:4', ...pose('rahab', 'lift', 0.5, 3)),
      verse('JOS 2:9', ...BUNDLES.map((b) => fadeOut(b.id, 0.5))),
      verse('JOS 2:11', ...pose('rahab', 'pray', 0.5, 4)),
    ],
  },
  {
    id: 'l14-e1-s3',
    title: 'The scarlet cord',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('JOS 2:12', ...swap('evening-sky', 'night-sky'), ...swap(ROOF, WALLS), ...ON_ROOF.map((id) => fadeOut(id)), fadeIn(ROPE, 1.5), fadeIn('climber-1', 2), fadeIn(GUARD.id, 2)),
      verse('JOS 2:15', actor('climber-1', { y: DOWN.y }, { seconds: 4, ease: 'inOutSine', delay: 0.5 }), fadeIn('climber-2', 3), actor('climber-2', { y: DOWN.y }, { seconds: 4, ease: 'inOutSine', delay: 4 })),
      verse('JOS 2:18', fadeOut(ROPE, 0.5), fadeIn('cord', 1), fadeIn('cord-glow', 1, 0.85)),
      verse('JOS 2:21', ...['climber-1', 'climber-2'].flatMap((id) => walk(id, { x: 0.96, facing: 1 }, 3, 0.5)), fadeOut('climber-1', 2.5), fadeOut('climber-2', 2.5)),
      verse('JOS 2:24', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: rahabSet, scenes }
