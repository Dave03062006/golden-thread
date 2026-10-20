import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · Jacob's Ladder (Genesis 28:10–22), from the approved Level 4 script.
 *
 * Jacob, alone on the road north, lies down at sunset with a stone for a pillow. He dreams:
 * the player lights the steps of a ladder from the earth to heaven ("the ladder",
 * minigames/the-ladder), and angels go up and down it. The LORD stands above it and makes
 * him the promise: "I am with you." The foot of the ladder glows (this episode's golden
 * thread: the Son of man). At dawn: "Surely the LORD is in this place." Jacob sets up his
 * stone as a pillar, pours oil on it, and names the place Bethel.
 */

/** The ladder: where it stands, how tall it is, and how many steps it has. */
export const LADDER = { x: 0.47, base: 0.765, height: 0.69, steps: 8 }
/** How high a step is, in the frame, from the first (0) to the top. */
export const stepY = (i: number) => LADDER.base - ((60 + i * 80) / 700) * LADDER.height
/** How far across a rail is at a height on the ladder (they draw together as they rise). */
export const railX = (y: number, side: -1 | 1) => LADDER.x + side * (0.03375 - ((LADDER.base - y) / LADDER.height) * 0.0225)

/** The angels on the ladder: going up on one side and down on the other, each at its own place in the climb. */
export const ANGELS = Array.from({ length: 6 }, (_, j) => ({ id: `angel-${j + 1}`, up: j % 2 === 0, phase: j / 6, from: j + 2 }))

const ABOVE = 'bethel-stones'

export const bethelSet: SceneDescription = {
  id: 'l04-bethel',
  title: 'Jacob’s ladder',
  layers: [
    { id: 'vineyard-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'bethel-stones', depth: 0.3 },
  ],
  actors: [
    // The ladder of the dream, and the LORD's glory above it.
    { id: 'ladder', prop: 'ladder', above: ABOVE, x: LADDER.x, y: LADDER.base, size: 0.09, pose: 'lit-0' },
    { id: 'glory', prop: 'glory', above: ABOVE, x: LADDER.x, y: 0.12, size: 0.3, opacity: 0 },
    ...ANGELS.map(
      (a): SceneActor => ({
        id: a.id,
        prop: 'angel',
        above: ABOVE,
        x: railX(LADDER.base, a.up ? -1 : 1),
        y: LADDER.base,
        size: 0.03,
        opacity: 0,
        facing: a.up ? 1 : -1,
      }),
    ),
    // The foot of the ladder, by Jacob's head, glowing: the golden thread.
    { id: 'ladder-foot', prop: 'halo', above: ABOVE, x: LADDER.x, y: 0.69, size: 0.06, opacity: 0 },
    // Jacob, his stone pillow (later the pillar), and Jacob asleep.
    { id: 'stone', prop: 'stone-pillar', above: ABOVE, x: 0.4, y: 0.765, size: 0.035, pose: 'lying', opacity: 0 },
    { id: 'sleeper', prop: 'jacob-asleep', above: ABOVE, x: 0.465, y: 0.77, size: 0.09, opacity: 0 },
    { id: 'jacob', prop: 'jacob', above: ABOVE, x: -0.05, y: 0.77, size: 0.042, facing: 1 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.004 },
      { at: 20, value: 0.004, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.003, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.008, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })

/** Where an angel rests once the whole ladder is lit, at its place in the climb. */
export const restingAt = (a: (typeof ANGELS)[number]) => {
  const y = stepY(0) + (stepY(LADDER.steps - 1) - stepY(0)) * (a.up ? a.phase : 1 - a.phase)
  return { x: railX(y, a.up ? -1 : 1), y }
}

/** After the dream: every step lit, the angels on the ladder. */
const DREAMT = [actor('ladder', { pose: `lit-${LADDER.steps}` }, { seconds: 0.5 }), ...ANGELS.map((a) => actor(a.id, { ...restingAt(a), opacity: 0.9 }, { seconds: 1, ease: 'inOutSine' }))]

const scenes: StoryScene[] = [
  {
    id: 'l04-e4-s1',
    title: 'Alone on the road',
    music: 'nearer-my-god',
    beats: [
      verse('GEN 28:10', actor('jacob', { x: 0.4, pose: 'walk' }, { seconds: 7, ease: 'inOutSine' }), actor('jacob', { pose: 'idle', facing: -1 }, { seconds: 0.5, delay: 7 })),
      say('He had his father’s blessing, but no home, no brother, and no idea what lay ahead.', camera({ zoom: 1.03 }, slow)),
      verse(
        'GEN 28:11',
        camera({ zoom: 1 }, slow),
        // Night falls. He sets down a stone, and lies down to sleep.
        layer('vineyard-sky', { opacity: 0 }, { seconds: 5, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        actor('jacob', { pose: 'kneel' }, { seconds: 1, delay: 1 }),
        fadeIn('stone', 1.5),
        actor('jacob', { opacity: 0 }, { seconds: 1.5, delay: 4 }),
        fadeIn('sleeper', 4),
      ),
    ],
  },
  {
    id: 'l04-e4-s2',
    title: 'The dream',
    music: 'nearer-my-god',
    beats: [
      verse('GEN 28:12', fadeIn('ladder-foot', 0.5, 0.85), camera({ zoom: 1.02, y: -0.01 }, slow)),
      play('the-ladder', { cues: [], done: DREAMT }),
      verse('GEN 28:13', fadeIn('glory', 0, 0.8), camera({ zoom: 1, y: 0 }, slow)),
      verse('GEN 28:15'),
      say('Jacob had done nothing to deserve this. He was running away from the trouble he had caused. God came to him anyway.', fadeOut('glory', 2)),
    ],
  },
  {
    id: 'l04-e4-s3',
    title: 'The gate of heaven',
    music: 'nearer-my-god',
    beats: [
      verse(
        'GEN 28:16',
        // Dawn: the ladder is gone. Jacob sits up, staring at the empty hillside.
        fadeOut('ladder'),
        fadeOut('ladder-foot'),
        ...ANGELS.map((a, i) => fadeOut(a.id, i * 0.2)),
        layer('night-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        actor('sleeper', { opacity: 0 }, { seconds: 1, delay: 2 }),
        actor('jacob', { x: 0.44, pose: 'kneel', facing: 1 }, { seconds: 0.1, delay: 1.5 }),
        actor('jacob', { opacity: 1 }, { seconds: 1, delay: 2 }),
      ),
      verse('GEN 28:17', actor('jacob', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l04-e4-s4',
    title: 'Bethel',
    music: 'nearer-my-god',
    beats: [
      verse(
        'GEN 28:18',
        camera({ zoom: 1 }, slow),
        // He sets the stone up as a pillar, and pours oil on its top.
        actor('jacob', { pose: 'idle', facing: -1 }, { seconds: 1 }),
        actor('stone', { pose: 'standing', size: 0.04 }, { seconds: 1.2, delay: 1 }),
        actor('jacob', { pose: 'carry' }, { seconds: 0.8, delay: 2.5 }),
        actor('stone', { pose: 'anointed' }, { seconds: 1.5, delay: 3.2 }),
      ),
      verse('GEN 28:19', actor('jacob', { pose: 'kneel' }, { seconds: 1 })),
      say('Bethel means “house of God.”', camera({ zoom: 1.04, x: -0.01 }, slow)),
      say('Jacob made a vow: if God would bring him home in peace, the LORD would be his God, and he would give him a tenth of all he had.', camera({ zoom: 1, x: 0 }, slow), actor('jacob', { pose: 'pray' }, { seconds: 1 })),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: bethelSet, scenes }
