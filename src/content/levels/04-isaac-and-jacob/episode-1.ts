import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · A Bride for Isaac (Genesis 24), from the approved Level 4 script.
 *
 * Abraham, very old, sends his oldest servant north to find a wife for Isaac among his own
 * kindred. At evening, by the well outside the city of Nahor, the servant prays for a sign:
 * the girl who offers to water his camels too. Rebekah comes with her jar on her shoulder,
 * gives him a drink, and then waters all ten camels: the player draws and pours with her
 * ("watering the camels", minigames/watering-the-camels). Asked, "Will you go with this
 * man?", she says, "I will go." Her water jar glows (this episode's golden thread: Mary's
 * "let it be"). At evening in the field, Isaac sees the camels coming.
 */

/** The well, the trough, and where Rebekah stands at each. */
export const WELL_AT = { x: 0.26, y: 0.765 }
export const TROUGH_AT = { x: 0.52, y: 0.785 }
export const REBEKAH = { atWell: 0.33, atTrough: 0.42, y: 0.795 }
/** Where a camel stands to drink, at the end of the trough. */
export const DRINK_AT = { x: 0.645, y: 0.8 }
/** How far above Rebekah's feet her jar rides on her shoulder, and where it goes down into the well. */
export const JAR_ON_SHOULDER = { dx: 0.006, dy: -0.152 }
export const JAR_IN_WELL = { x: WELL_AT.x + 0.01, y: WELL_AT.y - 0.03 }

/** The ten camels, each with the place where it waits and, watered, kneels to rest: two rows on the right. */
export const CAMELS = Array.from({ length: 10 }, (_, i) => {
  const back = i % 2 === 0
  const k = Math.floor(i / 2)
  return { id: `camel-${i + 1}`, home: back ? { x: 0.7 + k * 0.055, y: 0.72 } : { x: 0.73 + k * 0.065, y: 0.76 }, size: back ? 0.055 : 0.065 }
})

const ABOVE = 'haran-hills'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'rebekah' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

export const aBrideSet: SceneDescription = {
  id: 'l04-a-bride',
  title: 'A bride for Isaac',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3 },
    { id: 'haran-hills', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // At Mamre: the oak and Abraham's tent.
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.18, y: 0.8, size: 0.28 },
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.72, y: 0.77, size: 0.13, pose: 'open' },
    // By the city of Nahor: the well and the trough.
    { id: 'well', prop: 'stone-well', above: ABOVE, ...WELL_AT, size: 0.09, opacity: 0 },
    { id: 'trough', prop: 'trough', above: ABOVE, ...TROUGH_AT, size: 0.16, opacity: 0 },
    { id: 'trough-water', prop: 'trough-water', above: ABOVE, ...TROUGH_AT, size: 0.16, opacity: 0 },
    { id: 'stream', prop: 'water-stream', above: ABOVE, x: REBEKAH.atTrough + 0.035, y: 0.7, size: 0.012, opacity: 0 },
    // The servant's ten camels, loaded with gifts, kneeling.
    ...CAMELS.map((c): SceneActor => ({ id: c.id, prop: 'camel', above: ABOVE, ...c.home, size: c.size, facing: -1, pose: 'kneel', opacity: 0 })),
    // The people.
    person('abraham', 'abraham-old', 0.44, 0.8, { facing: 1, pose: 'kneel' }),
    person('servant', 'servant', 0.56, 0.8),
    person('rebekah', 'rebekah', -0.04, REBEKAH.y, { facing: 1, opacity: 0 }),
    { id: 'jar', prop: 'water-jar', above: ABOVE, x: -0.04 + JAR_ON_SHOULDER.dx, y: REBEKAH.y + JAR_ON_SHOULDER.dy, size: 0.022, opacity: 0 },
    person('laban', 'laban', 0.56, 0.81, { opacity: 0 }),
    person('bethuel', 'bethuel', 0.63, 0.815, { opacity: 0 }),
    person('isaac', 'isaac', 0.3, 0.8, { facing: 1, opacity: 0 }),
    // Rebekah's water jar, glowing: the golden thread.
    { id: 'rebekahs-jar', prop: 'halo', above: ABOVE, x: 0.45 + JAR_ON_SHOULDER.dx, y: 0.635, size: 0.06, opacity: 0 },
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
const walkTo = (id: string, x: number, delay = 0, seconds = 5, facing: -1 | 1 = x < 0.5 ? -1 : 1) => actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay })
const stop = (id: string, delay: number, pose = 'idle') => actor(id, { pose }, { seconds: 0.5, delay })
const shoulder = (x: number) => ({ x: x + JAR_ON_SHOULDER.dx, y: REBEKAH.y + JAR_ON_SHOULDER.dy })

/** After the camels are watered: every camel kneeling, the trough half full, Rebekah by it with her jar. */
const WATERED = [
  ...CAMELS.map((c) => actor(c.id, { ...c.home, facing: -1, pose: 'kneel' }, { seconds: 1, ease: 'inOutSine' })),
  actor('rebekah', { x: REBEKAH.atTrough, facing: 1, pose: 'idle' }, { seconds: 1, ease: 'inOutSine' }),
  actor('jar', shoulder(REBEKAH.atTrough), { seconds: 1, ease: 'inOutSine' }),
  actor('trough-water', { opacity: 0.6 }, { seconds: 1 }),
  actor('stream', { opacity: 0 }, { seconds: 0.5 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l04-e1-s1',
    title: 'Abraham’s charge',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('GEN 24:1', camera({ zoom: 1.03 }, slow), ...[0, 2, 4].map((i, k) => fadeIn(CAMELS[i]!.id, 1 + k * 0.4))),
      say('One thing remained: a wife for Isaac, from Abraham’s own people, not from the Canaanites around them.', camera({ zoom: 1 }, slow), actor('abraham', { pose: 'lift' }, { seconds: 1 })),
      verse('GEN 24:4', actor('abraham', { pose: 'kneel' }, { seconds: 1 }), actor('servant', { pose: 'pray' }, { seconds: 1, delay: 2 })),
    ],
  },
  {
    id: 'l04-e1-s2',
    title: 'A prayer at the well',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse(
        'GEN 24:10',
        // The long road north, to an evening outside the city of Nahor.
        ...['oak', 'tent', 'abraham'].map((id) => fadeOut(id)),
        layer('canaan-hills', { opacity: 0 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        layer('haran-hills', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
        actor('servant', { pose: 'walk', facing: 1 }, { seconds: 0.5 }),
        actor('servant', { x: 0.36, facing: -1 }, { seconds: 0.1, delay: 2 }),
        stop('servant', 5),
        ...CAMELS.map((c, i) => fadeIn(c.id, 2.5 + i * 0.2)),
        fadeIn('well', 3),
        fadeIn('trough', 3.4),
      ),
      verse('GEN 24:12', actor('servant', { pose: 'pray' }, { seconds: 1 })),
      say('He asked God for a sign: the girl who offers water not only to him, but to his camels too.', camera({ zoom: 1.03, x: -0.01 }, slow)),
    ],
  },
  {
    id: 'l04-e1-s3',
    title: 'Rebekah',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse(
        'GEN 24:15',
        camera({ zoom: 1, x: 0 }, slow),
        actor('servant', { pose: 'idle', facing: 1 }, { seconds: 0.5 }),
        actor('servant', { x: 0.5 }, { seconds: 2, ease: 'inOutSine' }),
        // Rebekah comes out of the city with her jar on her shoulder, down to the well.
        fadeIn('rebekah'),
        fadeIn('jar'),
        walkTo('rebekah', REBEKAH.atWell, 0.5, 5, 1),
        actor('jar', shoulder(REBEKAH.atWell), { seconds: 5, ease: 'inOutSine', delay: 0.5 }),
        stop('rebekah', 5.5),
      ),
      verse(
        'GEN 24:18',
        // The servant runs to her; she lets down her jar.
        actor('servant', { x: 0.39, pose: 'walk', facing: -1 }, { seconds: 1.5, ease: 'inOutSine' }),
        stop('servant', 1.5),
        actor('rebekah', { pose: 'carry' }, { seconds: 0.6, delay: 1.5 }),
        actor('jar', { x: REBEKAH.atWell + 0.022, y: REBEKAH.y - 0.1 }, { seconds: 0.8, ease: 'inOutSine', delay: 1.5 }),
      ),
      verse(
        'GEN 24:19',
        actor('rebekah', { pose: 'idle' }, { seconds: 0.6 }),
        actor('jar', shoulder(REBEKAH.atWell), { seconds: 0.8, ease: 'inOutSine' }),
        // The servant steps back to watch.
        actor('servant', { x: 0.16, y: 0.78, pose: 'walk', facing: -1 }, { seconds: 3, ease: 'inOutSine', delay: 1 }),
        actor('servant', { facing: 1, pose: 'idle' }, { seconds: 0.5, delay: 4 }),
      ),
      play('watering-the-camels', { cues: [], done: WATERED }),
      say('A thirsty camel can drink a great deal of water. Ten camels meant many trips up and down to the well. Rebekah’s kindness was not small.', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l04-e1-s4',
    title: '“I will go”',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      say(
        'The servant told her family everything: his master’s prayer, his own, and God’s answer at the well.',
        camera({ zoom: 1 }, slow),
        // Rebekah's family: her brother Laban and her father Bethuel. Her jar rests at her feet.
        ...['trough', 'trough-water', 'well'].map((id) => fadeOut(id)),
        actor('servant', { x: 0.3, y: 0.8, facing: 1 }, { seconds: 0.1, delay: 2 }),
        actor('rebekah', { x: 0.45, facing: 1 }, { seconds: 0.1, delay: 2 }),
        actor('jar', shoulder(0.45), { seconds: 0.1, delay: 2 }),
        fadeIn('laban', 2),
        fadeIn('bethuel', 2.3),
        fadeIn('rebekahs-jar', 1, 0.85),
      ),
      verse('GEN 24:58', actor('rebekah', { pose: 'lift' }, { seconds: 0.8, delay: 2 }), actor('rebekah', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
      verse(
        'GEN 24:63',
        // Back in Canaan, at evening: Isaac walking in the field, and the camels coming.
        ...['laban', 'bethuel', 'jar', 'servant', 'rebekah'].map((id) => fadeOut(id)),
        fadeOut('rebekahs-jar', 2),
        layer('haran-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...CAMELS.flatMap((c, i) => [
          actor(c.id, { x: 1.12 + (i % 5) * 0.045, y: i % 2 ? 0.8 : 0.77, pose: 'walk', facing: -1 }, { seconds: 0.1, delay: 2 }),
          actor(c.id, { x: 0.78 + (i % 5) * 0.045 }, { seconds: 6, ease: 'outCubic', delay: 2.2 }),
        ]),
        fadeIn('isaac', 2),
        walkTo('isaac', 0.38, 2.5, 5, 1),
        stop('isaac', 7.5),
      ),
      verse(
        'GEN 24:67',
        ...CAMELS.map((c) => stop(c.id, 0, 'kneel')),
        actor('rebekah', { x: 0.6, y: 0.81, facing: -1 }, { seconds: 0.1 }),
        fadeIn('rebekah', 0.5),
        walkTo('rebekah', 0.46, 1, 3, -1),
        stop('rebekah', 4),
        fadeIn('tent', 2),
        camera({ zoom: 1.03 }, slow),
      ),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: aBrideSet, scenes }
