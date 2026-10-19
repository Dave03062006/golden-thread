import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 8 · Sodom and Gomorrah (Genesis 18:16–19:29), from the approved Level 3 script,
 * with the content note shown before it. It is told gently: no one is shown being hurt,
 * and the fire is seen only as smoke, from far away.
 *
 * On the hill above Mamre at evening, looking toward the cities of the valley, Abraham
 * pleads for them, asking again and again ("Abraham pleads", minigames/abraham-pleads),
 * the place where he stands glowing (this episode's golden thread: Christ intercedes for
 * us). At dawn, two angels lead Lot's family out of the gate of Sodom: flee to the hills,
 * do not look back. Lot's wife looks back. From his hill, Abraham sees the smoke rise; and
 * God remembered Abraham, and sent Lot out.
 */

/** Abraham's pleas, from fifty down to ten, and the higher number offered beside each (asked for already). */
export const PLEAS = [50, 45, 40, 30, 20, 10]

const ABOVE = 'sodom-gate'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'lots-wife' || prop === 'lots-daughter' ? 0.038 : 0.042,
  facing: 1,
  ...extra,
})

/** Where Abraham stands on the hill to plead. */
const HILL = { x: 0.45, y: 0.79 }

export const sodomSet: SceneDescription = {
  id: 'l03-sodom',
  title: 'Sodom and Gomorrah',
  layers: [
    { id: 'vineyard-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'jordan-valley', depth: 0.3 },
    { id: 'sodom-gate', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // On the hill above Mamre: Abraham, the three visitors, and the place where he pleads: the golden thread.
    ...[0.62, 0.7, 0.78].map((x, i): SceneActor => ({ id: `visitor-${i + 1}`, prop: 'angel', above: ABOVE, x, y: 0.8, size: 0.045 })),
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.62, y: 0.3, size: 0.32, opacity: 0 },
    { id: 'pleading-place', prop: 'halo', above: ABOVE, x: HILL.x, y: 0.69, size: 0.07, opacity: 0 },
    person('abraham', 'abram', 0.36, 0.8),
    // At the gate of Sodom at dawn: Lot's family, led out by two angels.
    person('lot', 'lot', 0.28, 0.76, { opacity: 0 }),
    person('wife', 'lots-wife', 0.22, 0.765, { opacity: 0 }),
    person('daughter-1', 'lots-daughter', 0.34, 0.77, { opacity: 0 }),
    person('daughter-2', 'lots-daughter', 0.39, 0.765, { opacity: 0 }),
    { id: 'angel-1', prop: 'angel', above: ABOVE, x: 0.32, y: 0.745, size: 0.045, opacity: 0 },
    { id: 'angel-2', prop: 'angel', above: ABOVE, x: 0.44, y: 0.745, size: 0.045, opacity: 0 },
    { id: 'pillar', prop: 'salt-pillar', above: ABOVE, x: 0.4, y: 0.77, size: 0.02, opacity: 0 },
    // The smoke of the valley, seen from far away.
    ...[0.66, 0.76, 0.86].map((x, i): SceneActor => ({ id: `smoke-${i + 1}`, prop: 'smoke-column', above: 'jordan-valley', x, y: 0.62, size: 0.05 + i * 0.01, opacity: 0 })),
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
const FAMILY = ['lot', 'wife', 'daughter-1', 'daughter-2']

const scenes: StoryScene[] = [
  {
    id: 'l03-e8-s1',
    title: 'The outcry',
    music: 'palestrina-kyrie',
    beats: [
      verse('GEN 18:20', camera({ zoom: 1.03, x: 0.02 }, slow)),
      say('The people of Sodom were cruel to the poor and the stranger, and proud in their sin. Lot lived among them.'),
      verse('GEN 18:23', camera({ zoom: 1, x: 0 }, slow), ...[2, 3].map((i) => fadeOut(`visitor-${i}`, 1 + i * 0.3))),
    ],
  },
  {
    id: 'l03-e8-s2',
    title: 'Suppose there are fifty',
    music: 'palestrina-kyrie',
    beats: [
      verse(
        'GEN 18:25',
        // Abraham alone before the light, on the hilltop.
        fadeOut('visitor-1'),
        fadeIn('glory', 0.5, 0.8),
        actor('abraham', { ...HILL, pose: 'kneel' }, { seconds: 2, ease: 'inOutSine' }),
        fadeIn('pleading-place', 1, 0.85),
      ),
      play('abraham-pleads', { cues: [], done: [actor('abraham', { pose: 'kneel' }, { seconds: 0.5 })] }),
      verse('GEN 18:32'),
      say('But not even ten righteous people could be found in Sodom.', fadeOut('glory', 1), fadeOut('pleading-place', 2)),
    ],
  },
  {
    id: 'l03-e8-s3',
    title: 'Flee to the hills',
    music: 'palestrina-kyrie',
    beats: [
      say(
        'Two angels came to Sodom. The men of the city surrounded Lot’s house, wanting to harm his guests, and the angels struck them blind. At dawn, the angels hurried Lot’s family out.',
        // Dawn at the gate of Sodom.
        layer('vineyard-sky', { opacity: 0 }, { seconds: 3 }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 3 }),
        layer('jordan-valley', { opacity: 0 }, { seconds: 3 }),
        layer('sodom-gate', { opacity: 1 }, { seconds: 3 }),
        fadeOut('abraham'),
        ...FAMILY.map((id, i) => fadeIn(id, 2 + i * 0.3)),
        fadeIn('angel-1', 2, 0.95),
        fadeIn('angel-2', 2.3, 0.95),
      ),
      verse(
        'GEN 19:16',
        // The angels lead them out by the hand: the family walks, the angels of light glide beside them.
        ...FAMILY.map((id, i) => actor(id, { x: [0.5, 0.42, 0.56, 0.61][i]!, pose: 'walk' }, { seconds: 5, ease: 'inOutSine', delay: 0.5 })),
        ...['angel-1', 'angel-2'].map((id, i) => actor(id, { x: [0.53, 0.66][i]! }, { seconds: 5, ease: 'inOutSine', delay: 0.5 })),
      ),
      verse(
        'GEN 19:17',
        ...['angel-1', 'angel-2'].map((id) => fadeOut(id, 1)),
        ...['lot', 'daughter-1', 'daughter-2'].map((id, i) => actor(id, { x: 0.92 + i * 0.03, pose: 'walk' }, { seconds: 8, ease: 'inOutSine', delay: 1 })),
        actor('wife', { x: 0.62, pose: 'walk' }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
      ),
      verse(
        'GEN 19:26',
        // She turns and looks back, and where she stood there is a pillar of salt.
        actor('wife', { facing: -1, pose: 'idle' }, { seconds: 0.5 }),
        actor('pillar', { x: 0.62, y: 0.77 }, { seconds: 0.1 }),
        fadeIn('pillar', 1.5),
        fadeOut('wife', 1.5),
        ...['lot', 'daughter-1', 'daughter-2'].map((id) => fadeOut(id, 2)),
      ),
    ],
  },
  {
    id: 'l03-e8-s4',
    title: 'Abraham looked down',
    music: 'palestrina-kyrie',
    beats: [
      verse(
        'GEN 19:28',
        // Morning on Abraham's hill: far off, smoke rising from the valley.
        layer('sodom-gate', { opacity: 0 }, { seconds: 3 }),
        layer('jordan-valley', { opacity: 1 }, { seconds: 3 }),
        fadeOut('pillar'),
        actor('abraham', { x: 0.3, y: 0.8, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('abraham', 1.5),
        ...[1, 2, 3].map((i) => fadeIn(`smoke-${i}`, 2 + i * 0.5, 0.8)),
      ),
      verse('GEN 19:29'),
      say('Abraham’s prayer was not wasted. Because he prayed, God saved Lot.', actor('abraham', { pose: 'pray' }, { seconds: 1 })),
    ],
  },
]

export const episode8: Pick<Episode, 'set' | 'scenes'> = { set: sodomSet, scenes }
