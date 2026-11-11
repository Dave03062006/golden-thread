import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · David and Goliath (1 Samuel 17), from the approved Level 18 script.
 *
 * Goliath of Gath defies Israel for forty days. David, too small for Saul's armor, chooses five
 * smooth stones, and the stone in his sling glows (this episode's golden thread: "the victory
 * through our Lord Jesus Christ"). The player aims the sling ("five smooth stones",
 * minigames/five-smooth-stones), and the giant falls, seen from far off.
 */

/** The sling's swing, across Goliath's helmet, and the bare forehead it must find. */
export const SLING = { marker: 'aim', from: 0.62, to: 0.82, target: 0.72, y: 0.48 }
export const GOLIATH = 'goliath'

const VALLEY = 'green-hills'
const CAMP = 'dry-hills'
const person = personOn(VALLEY)
const inCamp = personOn(CAMP)

export const goliathSet: SceneDescription = {
  id: 'l18-goliath',
  title: 'David and Goliath',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: CAMP, depth: 0.3 },
    { id: VALLEY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp of Israel: the soldiers, Saul, and David with bread for his brothers.
    inCamp('soldiers', 'hebrew-workers', 0.24, { size: 0.12, facing: 1 }),
    inCamp('saul', 'saul', 0.5, { size: 0.05 }),
    inCamp('david-camp', 'david-young', 0.96, { size: 0.038, opacity: 0 }),
    { id: 'stone-glow', prop: 'halo', above: CAMP, x: 0.62, y: 0.64, size: 0.1, opacity: 0 },
    // The valley floor: David, Goliath, and the sling's aim.
    person('david', 'david-young', 0.3, { size: 0.038, facing: 1, opacity: 0 }),
    person(GOLIATH, 'goliath', 0.72, { size: 0.075, opacity: 0 }),
    { id: SLING.marker, prop: 'halo', above: VALLEY, x: SLING.from, y: SLING.y, size: 0.035, opacity: 0 },
    person('philistines', 'crowd', 0.94, { size: 0.16, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e2-s1',
    title: 'The champion of Gath',
    music: 'charpentier-te-deum',
    beats: [
      verse('1SA 17:4', camera({ zoom: 1.02 }, slow)),
      say('For forty days Goliath came out, morning and evening, and challenged Israel to send one man to fight him.', camera({ zoom: 1 }, slow)),
      verse('1SA 17:11', actor('soldiers', { x: 0.16 }, { seconds: 2, delay: 0.5 })),
      verse('1SA 17:26', fadeIn('david-camp', 0.3), ...walk('david-camp', { x: 0.66 }, 3, 0.5)),
    ],
  },
  {
    id: 'l18-e2-s2',
    title: '“Let no man’s heart fail”',
    music: 'charpentier-te-deum',
    beats: [
      verse('1SA 17:32', ...pose('david-camp', 'lift', 0.5, 3)),
      verse('1SA 17:33', camera({ zoom: 1.02 }, slow)),
      verse('1SA 17:34', camera({ zoom: 1 }, slow)),
      verse('1SA 17:37', ...pose('saul', 'lift', 0.5, 3)),
      verse('1SA 17:40', actor('david-camp', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 }), actor('stone-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 })),
    ],
  },
  {
    id: 'l18-e2-s3',
    title: 'The battle is the LORD’s',
    music: 'charpentier-te-deum',
    beats: [
      verse('1SA 17:45', ...swap(CAMP, VALLEY), ...['soldiers', 'saul', 'david-camp', 'stone-glow'].map((id) => fadeOut(id)), fadeIn('david', 1.5), fadeIn(GOLIATH, 1.5), fadeIn('philistines', 1.5)),
      verse('1SA 17:47', ...pose('david', 'lift', 0.5, 3)),
      play('five-smooth-stones', {
        cues: [fadeIn(SLING.marker, 0, 0.9)],
        done: [actor(SLING.marker, { x: SLING.target, opacity: 0 }, { seconds: 0.5 }), actor(GOLIATH, { opacity: 0 }, { seconds: 0.5 })],
      }),
      verse('1SA 17:49', actor('philistines', { x: 1.1, pose: 'walk' }, { seconds: 3, delay: 0.5 })),
      verse('1SA 17:50', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: goliathSet, scenes }
