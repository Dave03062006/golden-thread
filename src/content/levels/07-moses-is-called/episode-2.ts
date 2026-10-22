import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 2 · The Baby in the Basket (Exodus 2:1–10), from the approved Level 7 script.
 *
 * A Levite mother hides her baby son for three months. When she can hide him no longer,
 * the player helps her weave a basket of bulrushes and seal it with pitch ("a basket of
 * bulrushes", minigames/a-basket-of-bulrushes), and she sets it among the reeds, while his
 * sister watches. Pharaoh's daughter finds him, takes pity on him, and holds him in her
 * arms, which glow (this episode's golden thread: adoption as God's children). His own
 * mother nurses him; then he becomes the princess's son, and she names him Moses.
 */

/** The basket while it's woven: where it stands, close up, and the reed swinging into place. */
export const BASKET = { x: 0.5, y: 0.66, size: 0.2, among: { x: 0.43, y: 0.755, size: 0.05 } }
export const ROWS = 6
/** How high the reed swings for a row: just above the rows already woven. */
export const reedY = (row: number) => BASKET.y - 0.012 - 0.0235 * row
/** How far the reed swings either side of the basket while it waits to be woven in. */
export const SWING = 0.13

const ABOVE = 'house-inside'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const HOME = ['father', 'mother', 'baby', 'lamp', 'lamp-glow', 'sister']

export const basketSet: SceneDescription = {
  id: 'l07-basket',
  title: 'The baby in the basket',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'nile-reeds', depth: 0.3, opacity: 0 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
    { id: 'house-inside', depth: 0.3 },
  ],
  actors: [
    // At home: the lamp, the father, the mother with her baby, the sister at the door.
    { id: 'lamp-glow', prop: 'halo', above: ABOVE, x: 0.3, y: 0.6, size: 0.12, opacity: 0.7 },
    { id: 'lamp', prop: 'oil-lamp', above: ABOVE, x: 0.3, y: 0.64, size: 0.022 },
    person('father', 'slave', 0.36, { facing: 1 }),
    person('mother', 'moses-mother', 0.48, { pose: 'sit' }),
    { id: 'baby', prop: 'swaddled-baby', above: ABOVE, x: 0.465, y: 0.74, size: 0.026 },
    person('sister', 'miriam', 0.74, { size: 0.034, facing: 1 }),
    // At the river: the basket, the reed being woven in, the princess and her maidens.
    { id: 'basket', prop: 'reed-basket', above: ABOVE, ...BASKET, pose: 'row-0', opacity: 0 },
    { id: 'loose-reed', prop: 'loose-reed', above: ABOVE, x: BASKET.x, y: reedY(1), size: 0.22, opacity: 0 },
    person('princess', 'princess', 1.1),
    person('maiden-1', 'maid', 1.18),
    person('maiden-2', 'maid', 1.25),
    { id: 'princess-baby', prop: 'halo', above: ABOVE, x: 0.6, y: 0.66, size: 0.09, opacity: 0 },
    // At the palace: the boy Moses.
    person('young-moses', 'boy', 0.4, { size: 0.026, y: 0.79, facing: 1, opacity: 0 }),
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.003 },
      { at: 20, value: 0.003, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.002, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.006, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const walkTo = (id: string, x: number, delay = 0, seconds = 4, facing: -1 | 1 = x < 0.5 ? -1 : 1) => [actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds })]

const scenes: StoryScene[] = [
  {
    id: 'l07-e2-s1',
    title: 'A goodly child',
    music: 'brahms-wiegenlied',
    beats: [
      verse('EXO 2:1', camera({ zoom: 1.02 }, slow)),
      verse('EXO 2:2', actor('baby', { size: 0.028 }, slow), camera({ zoom: 1.04, x: -0.01 }, slow)),
      say('For three months they kept him hidden, and hushed him whenever he cried. But babies grow, and they get louder.', camera({ zoom: 1, x: 0 }, slow), actor('sister', { facing: -1 }, { seconds: 0.4, delay: 2 }), actor('sister', { facing: 1 }, { seconds: 0.4, delay: 3.5 })),
    ],
  },
  {
    id: 'l07-e2-s2',
    title: 'A basket of bulrushes',
    music: 'brahms-wiegenlied',
    beats: [
      verse(
        'EXO 2:3',
        // Early morning at the river's edge: the mother weaves a little basket.
        ...HOME.map((id) => fadeOut(id)),
        ...swap('house-inside', 'nile-reeds', 1),
        ...swap('night-sky', 'dawn-sky', 1),
        actor('mother', { x: 0.3, pose: 'carry', facing: 1 }, { seconds: 0.1, delay: 2 }),
        fadeIn('mother', 2.5),
        fadeIn('basket', 3),
      ),
      play('a-basket-of-bulrushes', {
        done: [actor('basket', { pose: 'closed' }, { seconds: 0.3 }), actor('loose-reed', { x: BASKET.x, y: reedY(ROWS), opacity: 0 }, { seconds: 0.3 })],
      }),
      verse(
        'EXO 2:4',
        // The basket among the reeds; the sister hides in the papyrus to watch.
        actor('mother', { pose: 'idle' }, { seconds: 0.5 }),
        actor('basket', BASKET.among, { seconds: 2.5, ease: 'inOutSine' }),
        ...walkTo('mother', -0.1, 2, 4, -1),
        actor('sister', { x: 0.8, y: 0.79, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('sister', 2),
      ),
    ],
  },
  {
    id: 'l07-e2-s3',
    title: 'Pharaoh’s daughter',
    music: 'brahms-wiegenlied',
    beats: [
      verse(
        'EXO 2:5',
        // The princess comes down to the river with her maidens; a maid fetches the basket.
        ...swap('dawn-sky', 'forest-sky'),
        ...walkTo('princess', 0.6, 0.5, 5, -1),
        ...walkTo('maiden-1', 0.7, 0.8, 5, -1),
        ...walkTo('maiden-2', 0.78, 1.1, 5, -1),
        ...walkTo('maiden-1', 0.47, 6, 2.5, -1),
        actor('maiden-1', { pose: 'carry' }, { seconds: 0.5, delay: 8.6 }),
      ),
      verse(
        'EXO 2:6',
        // She opens the basket, and holds the crying baby.
        actor('basket', { x: 0.55, y: 0.74 }, { seconds: 2, ease: 'inOutSine' }),
        actor('basket', { pose: 'sealed' }, { seconds: 0.4, delay: 2 }),
        actor('baby', { x: 0.585, y: 0.66, size: 0.026 }, { seconds: 0.1, delay: 2 }),
        fadeIn('baby', 2.2),
        actor('princess', { pose: 'carry' }, { seconds: 0.8, delay: 2 }),
        fadeIn('princess-baby', 2.5, 0.9),
        actor('maiden-1', { pose: 'idle' }, { seconds: 0.5, delay: 2 }),
      ),
      verse('EXO 2:7', ...walkTo('sister', 0.7, 0.5, 2.5, -1), actor('sister', { pose: 'lift' }, { seconds: 0.6, delay: 3 })),
      verse('EXO 2:8', actor('sister', { pose: 'idle' }, { seconds: 0.5 }), ...walkTo('sister', 1.1, 1, 3, 1)),
      verse(
        'EXO 2:9',
        // The sister comes back with their mother, who takes her own son in her arms.
        actor('mother', { x: 1.1, pose: 'idle', facing: -1 }, { seconds: 0.1 }),
        ...walkTo('mother', 0.68, 0.5, 4, -1),
        ...walkTo('sister', 0.78, 1, 3.5, -1),
        actor('baby', { x: 0.665, y: 0.66 }, { seconds: 1.5, ease: 'inOutSine', delay: 5 }),
        actor('mother', { pose: 'carry' }, { seconds: 0.6, delay: 5 }),
        actor('princess', { pose: 'idle' }, { seconds: 0.6, delay: 5 }),
      ),
    ],
  },
  {
    id: 'l07-e2-s4',
    title: 'Drawn out of the water',
    music: 'brahms-wiegenlied',
    beats: [
      say('His own mother was paid to care for him. God had given him back to her.', fadeOut('princess-baby'), actor('mother', { pose: 'pray' }, { seconds: 1 }), camera({ zoom: 1.03 }, slow)),
      verse(
        'EXO 2:10',
        // Years later, at the palace: the princess kneels to welcome the boy.
        camera({ zoom: 1 }, slow),
        ...['baby', 'basket', 'sister', 'maiden-1', 'maiden-2'].map((id) => fadeOut(id)),
        ...swap('nile-reeds', 'pharaoh-hall', 1),
        actor('princess', { x: 0.62, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 2 }),
        actor('mother', { x: 0.3, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 2 }),
        fadeIn('young-moses', 2.5),
        ...walkTo('young-moses', 0.54, 4, 3, 1),
        actor('young-moses', { facing: -1 }, { seconds: 0.4, delay: 7.5 }),
      ),
      say('So Moses grew up in Pharaoh’s palace, as a prince of Egypt. But he never forgot that he was a Hebrew.', actor('young-moses', { facing: 1 }, { seconds: 0.4, delay: 1 }), actor('princess', { pose: 'carry' }, { seconds: 0.8, delay: 1.5 }), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: basketSet, scenes }
