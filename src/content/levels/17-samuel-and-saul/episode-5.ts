import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · Saul Anointed (1 Samuel 9–10), from the approved Level 17 script.
 *
 * Saul, out looking for his father's donkeys, meets Samuel, who pours a vial of oil on his head;
 * the vial glows (this episode's golden thread: "he has anointed me"). At Mizpah the lot falls
 * on Saul, but he is hiding among the baggage, and the player finds him ("hidden among the
 * baggage", minigames/hidden-among-the-baggage).
 */

/** The piles of baggage at the edge of the camp, and the one Saul is hiding behind. */
export const PILES = [0.2, 0.34, 0.48, 0.62, 0.76].map((x, i) => ({ id: `pile-${i + 1}`, x, prop: i % 2 ? 'water-jar' : 'sack' }))
export const HIDING = 3
export const SAUL = 'saul-found'

const HILLS = 'canaan-hills'
const CAMP = 'dry-hills'
const person = personOn(HILLS)
const inCamp = personOn(CAMP)

export const anointedSet: SceneDescription = {
  id: 'l17-anointed',
  title: 'Saul anointed',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: HILLS, depth: 0.3 },
    { id: CAMP, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The hill country: Saul and his servant, and Samuel; the vial of oil (the golden thread).
    person('saul', 'saul', 0.9, { facing: -1 }),
    person('servant', 'hebrew-father', 0.98, { size: 0.04 }),
    person('samuel', 'samuel', 0.3, { facing: 1 }),
    { id: 'vial', prop: 'oil-vial', above: HILLS, x: 0.42, y: 0.7, size: 0.015, opacity: 0 },
    { id: 'oil-glow', prop: 'halo', above: HILLS, x: 0.42, y: 0.64, size: 0.12, opacity: 0 },
    // Mizpah: the tribes, the baggage, and Saul found.
    inCamp('tribes', 'crowd', 0.24, { size: 0.2, opacity: 0 }),
    inCamp('samuel-camp', 'samuel', 0.4, { opacity: 0 }),
    ...PILES.map((p): SceneActor => ({ id: p.id, prop: p.prop, above: CAMP, x: p.x + 0.12, y: 0.84, size: p.prop === 'sack' ? 0.05 : 0.02, pose: p.prop === 'sack' ? 'full' : undefined, opacity: 0 })),
    inCamp(SAUL, 'saul', PILES[HIDING]!.x + 0.12, { size: 0.055, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e5-s1',
    title: 'The lost donkeys',
    music: 'handel-zadok',
    beats: [
      verse('1SA 9:2', camera({ zoom: 1.02 }, slow)),
      verse('1SA 9:3', ...walk('saul', { x: 0.62 }, 3, 0.3), ...walk('servant', { x: 0.72 }, 3, 0.3)),
      verse('1SA 9:16', camera({ zoom: 1 }, slow)),
      verse('1SA 9:17', ...pose('samuel', 'lift', 0.5, 3)),
      verse('1SA 9:20', ...walk('saul', { x: 0.5 }, 2, 0.3)),
    ],
  },
  {
    id: 'l17-e5-s2',
    title: 'A vial of oil',
    music: 'handel-zadok',
    beats: [
      verse('1SA 10:1', ...swap('forest-sky', 'dawn-sky'), fadeOut('servant', 0.3), fadeIn('vial', 0.5), actor('oil-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.5 }), actor('saul', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('1SA 10:6', camera({ zoom: 1.02 }, slow)),
      verse('1SA 10:9', actor('saul', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 }), ...walk('saul', { x: 0.98, facing: 1 }, 3, 1.2), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e5-s3',
    title: 'Among the baggage',
    music: 'handel-zadok',
    beats: [
      verse('1SA 10:20', ...swap('dawn-sky', 'forest-sky'), ...swap(HILLS, CAMP), ...['saul', 'samuel', 'vial', 'oil-glow'].map((id) => fadeOut(id)), fadeIn('tribes', 1.5), fadeIn('samuel-camp', 1.5), ...PILES.map((p) => fadeIn(p.id, 2))),
      verse('1SA 10:21', camera({ zoom: 1.02 }, slow)),
      play('hidden-among-the-baggage', { done: [actor(SAUL, { opacity: 1 }, { seconds: 0.5 })] }),
      verse('1SA 10:22', camera({ zoom: 1 }, slow)),
      verse('1SA 10:23', ...walk(SAUL, { x: 0.52 }, 2, 0.3)),
      verse('1SA 10:24', ...pose('samuel-camp', 'lift', 0.5, 3)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: anointedSet, scenes }
