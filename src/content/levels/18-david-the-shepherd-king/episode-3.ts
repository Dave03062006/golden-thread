import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · Jonathan's Friendship (1 Samuel 18; 20), from the approved Level 18 script.
 *
 * Jonathan gives David his royal robe, which glows (this episode's golden thread: "He must
 * increase, but I must decrease"), and his armor and sword. When Saul wants David dead, Jonathan
 * sends the secret sign: the player shoots the arrow beyond the boy ("the arrow beyond you",
 * minigames/the-arrow-beyond-you). The friends say goodbye.
 */

/** The arrow's sweep across the field, the boy, and the place "beyond" him that means flee. */
export const ARROW = { marker: 'arrow-aim', from: 0.36, to: 0.94, target: 0.86, y: 0.7 }
export const LAD = { id: 'lad', x: 0.6 }

const COURT = 'house-inside'
const FIELD = 'wheat-field'
const inCourt = personOn(COURT)
const inField = personOn(FIELD)

export const friendshipSet: SceneDescription = {
  id: 'l18-friendship',
  title: 'Jonathan’s friendship',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: COURT, depth: 0.3 },
    { id: FIELD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Saul's court: Jonathan, David, the robe (the golden thread), Saul, and the women singing.
    inCourt('jonathan', 'jonathan', 0.4, { facing: 1 }),
    inCourt('david', 'david-young', 0.56, { size: 0.04 }),
    { id: 'robe', prop: 'cloak', above: COURT, x: 0.48, y: 0.74, size: 0.04, opacity: 0 },
    { id: 'robe-glow', prop: 'halo', above: COURT, x: 0.48, y: 0.64, size: 0.14, opacity: 0 },
    inCourt('saul', 'saul', 0.16, { size: 0.05, pose: 'sit', facing: 1, opacity: 0 }),
    inCourt('women', 'hebrew-women', 0.8, { size: 0.12, opacity: 0 }),
    // The field: the stone heap where David hides, Jonathan with his bow, the boy, and the arrow's aim.
    { id: 'heap', prop: 'great-rock', above: FIELD, x: 0.2, y: 0.82, size: 0.1, opacity: 0 },
    inField('david-hiding', 'david-young', 0.16, { size: 0.04, pose: 'kneel', facing: 1, opacity: 0 }),
    inField('jonathan-field', 'jonathan', 0.32, { facing: 1, opacity: 0 }),
    inField(LAD.id, 'joseph-young', LAD.x, { size: 0.03, facing: 1, opacity: 0 }),
    { id: ARROW.marker, prop: 'halo', above: FIELD, x: ARROW.from, y: ARROW.y, size: 0.03, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e3-s1',
    title: 'Knit to the soul of David',
    music: 'elgar-nimrod',
    beats: [
      verse('1SA 18:1', camera({ zoom: 1.02 }, slow)),
      verse('1SA 18:3', ...pose('jonathan', 'lift', 0.5, 3)),
      verse('1SA 18:4', fadeIn('robe', 0.3), actor('robe-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('1SA 18:7', fadeIn('women', 0.5), fadeIn('saul', 0.5), camera({ zoom: 1 }, slow)),
      verse('1SA 18:9', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l18-e3-s2',
    title: 'The sign of the arrows',
    music: 'elgar-nimrod',
    beats: [
      say('Saul’s jealousy grew until he wanted David dead. Jonathan promised to find out what his father meant to do, and to tell David by a secret sign: arrows shot in the field.', ...swap('forest-sky', 'dawn-sky'), ...swap(COURT, FIELD), ...['jonathan', 'david', 'robe', 'robe-glow', 'saul', 'women'].map((id) => fadeOut(id)), fadeIn('heap', 1.5), fadeIn('david-hiding', 1.5)),
      verse('1SA 20:17', camera({ zoom: 1 }, slow)),
      verse('1SA 20:35', fadeIn('jonathan-field', 0.3), fadeIn(LAD.id, 0.5)),
      verse('1SA 20:36', ...walk(LAD.id, { x: LAD.x + 0.04 }, 1, 0.3)),
      play('the-arrow-beyond-you', { cues: [fadeIn(ARROW.marker, 0, 0.9)], done: [actor(ARROW.marker, { x: ARROW.target, opacity: 0 }, { seconds: 0.5 })] }),
      verse('1SA 20:37', ...pose('jonathan-field', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l18-e3-s3',
    title: '“Go in peace”',
    music: 'elgar-nimrod',
    beats: [
      verse('1SA 20:41', fadeOut(LAD.id), actor('david-hiding', { pose: 'idle', x: 0.26 }, { seconds: 1.5, delay: 0.5 })),
      verse('1SA 20:42', ...walk('david-hiding', { x: -0.06, facing: -1 }, 4, 2), ...walk('jonathan-field', { x: 1.06, facing: 1 }, 4, 2)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: friendshipSet, scenes }
