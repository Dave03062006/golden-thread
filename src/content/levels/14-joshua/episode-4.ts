import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Achan and Ai (Joshua 7–8), from the approved Level 14 script.
 *
 * Israel is driven back from little Ai, and Joshua lies on his face before the ark. God tells
 * him why: someone has stolen and hidden what was his. Joshua asks Achan gently not to hide it,
 * and the player searches Achan's tent with a lamp for what he buried, which glints (this
 * episode's golden thread: "If we confess our sins, he is faithful and just, and will forgive
 * our sins"), and brings each thing into the light ("brought into the light",
 * minigames/brought-into-the-light). Then Joshua builds an altar on Mount Ebal, writes the law
 * on stones, and reads it to all the people.
 */

/** What Achan hid in the ground of his tent, and where; and the door, where each is brought into the light. */
export const HIDDEN = [
  { id: 'mantle', prop: 'cloak', pose: 'idle', name: 'A beautiful mantle from Shinar', x: 0.28, y: 0.78 },
  { id: 'silver', prop: 'gift', pose: 'silver', name: 'Two hundred shekels of silver', x: 0.5, y: 0.82 },
  { id: 'gold', prop: 'gift', pose: 'gold', name: 'A bar of gold', x: 0.7, y: 0.76 },
]
export const DOOR = { x: 0.92, y: 0.78 }
export const LAMP = { id: 'lamp', x: 0.86, y: 0.6, left: 0.1, right: 0.9, top: 0.5, bottom: 0.84 }

const CAMP = 'dry-hills'
const TENT = 'tent-inside'
const HILLS = 'canaan-hills'
const person = personOn(CAMP)
const onHills = personOn(HILLS)

export const achanSet: SceneDescription = {
  id: 'l14-achan',
  title: 'Achan and Ai',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: CAMP, depth: 0.3 },
    { id: TENT, depth: 0.3, opacity: 0 },
    { id: HILLS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Ai on its hill, the men running back, and Joshua before the ark.
    { id: 'ai', prop: 'city', above: CAMP, x: 0.8, y: 0.56, size: 0.1 },
    person('soldiers', 'hebrew-workers', 0.66, { size: 0.1, facing: -1 }),
    { id: 'ark', prop: 'tabernacle-piece', above: CAMP, x: pieceX('ark', 0.3, 1.2), y: 0.76, size: 1.2, pose: 'ark' },
    person('joshua', 'joshua', 0.4),
    person('elders', 'elders', 0.18, { size: 0.12, facing: 1, opacity: 0 }),
    { id: 'god-light', prop: 'halo', above: CAMP, x: 0.38, y: 0.4, size: 0.3, opacity: 0 },
    // Achan's tent: what he hid in the ground (the golden thread), the lamp, and Achan at the door.
    { id: 'hidden-glow', prop: 'halo', above: TENT, x: 0.5, y: 0.66, size: 0.2, opacity: 0 },
    ...HIDDEN.map((h): SceneActor => ({ id: h.id, prop: h.prop, above: TENT, x: h.x, y: h.y, size: 0.04, pose: h.pose, opacity: 0.25 })),
    { id: LAMP.id, prop: 'halo', above: TENT, x: LAMP.x, y: LAMP.y, size: 0.16, opacity: 0 },
    personOn(TENT)('achan', 'achan', DOOR.x - 0.04, { pose: 'sit', opacity: 0 }),
    personOn(TENT)('tent-joshua', 'joshua', DOOR.x + 0.03, { opacity: 0 }),
    // Mount Ebal: the altar of unhewn stones, the law written on great stones, and all the people.
    { id: 'altar', prop: 'noah-altar', above: HILLS, x: 0.42, y: 0.76, size: 0.06, pose: 'lit', opacity: 0 },
    { id: 'law-stones', prop: 'stone-tablets', above: HILLS, x: 0.6, y: 0.66, size: 0.1, pose: 'written', opacity: 0 },
    onHills('ebal-joshua', 'joshua', 0.52, { opacity: 0 }),
    onHills('all-people', 'hebrew-family', 0.2, { size: 0.12, facing: 1, opacity: 0 }),
    onHills('more-people', 'hebrew-women', 0.82, { size: 0.12, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l14-e4-s1',
    title: 'Defeat at Ai',
    music: 'allegri-miserere',
    beats: [
      verse('JOS 7:1', camera({ zoom: 1.02 }, slow)),
      verse('JOS 7:4', camera({ zoom: 1 }, slow), ...walk('soldiers', { x: 0.54 }, 3, 0.5)),
      verse('JOS 7:6', fadeOut('soldiers', 1), fadeIn('elders', 0.5), actor('joshua', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('JOS 7:7'),
    ],
  },
  {
    id: 'l14-e4-s2',
    title: '“Do not hide it from me”',
    music: 'allegri-miserere',
    beats: [
      verse('JOS 7:10', fadeIn('god-light', 0.5, 0.85), actor('joshua', { pose: 'idle' }, { seconds: 0.8, delay: 1 })),
      verse('JOS 7:11'),
      verse('JOS 7:19', ...swap('forest-sky', 'evening-sky'), ...swap(CAMP, TENT), ...['ai', 'ark', 'joshua', 'elders', 'god-light'].map((id) => fadeOut(id)), fadeIn('achan', 1.5), fadeIn('tent-joshua', 1.5), actor('hidden-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('JOS 7:20', actor('achan', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('JOS 7:21'),
      play('brought-into-the-light', {
        cues: [fadeIn(LAMP.id, 0, 0.9)],
        done: [...HIDDEN.map((h) => actor(h.id, { x: DOOR.x - 0.08, y: DOOR.y, opacity: 1 }, { seconds: 0.5 })), actor(LAMP.id, { x: DOOR.x, y: DOOR.y, opacity: 0 }, { seconds: 0.5 })],
      }),
    ],
  },
  {
    id: 'l14-e4-s3',
    title: 'The altar on Mount Ebal',
    music: 'allegri-miserere',
    beats: [
      say('Achan’s sin had brought trouble on the whole people. He and what he had stolen were taken out of the camp, and a great heap of stones was raised over the place, called the Valley of Achor, which means “trouble.”', ...swap('evening-sky', 'forest-sky'), ...swap(TENT, HILLS), ...['achan', 'tent-joshua', 'hidden-glow', ...HIDDEN.map((h) => h.id)].map((id) => fadeOut(id))),
      verse('JOS 8:1', fadeIn('ebal-joshua', 0.5)),
      verse('JOS 8:30', fadeIn('altar', 0.5)),
      verse('JOS 8:34', fadeIn('law-stones', 0.5), fadeIn('all-people', 1), fadeIn('more-people', 1), ...pose('ebal-joshua', 'lift', 1.5, 4)),
      verse('JOS 8:35', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: achanSet, scenes }
