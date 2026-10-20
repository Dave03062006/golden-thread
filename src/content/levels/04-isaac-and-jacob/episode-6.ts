import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · Wrestling with God (Genesis 31–32), from the approved Level 4 script.
 *
 * After twenty years with Laban, God tells Jacob to go home, and the messengers come back:
 * Esau is coming, with four hundred men. Jacob, afraid, divides his camp and prays his
 * first humble prayer. At night by the Jabbok he sends his family across and is left
 * alone, and a man wrestles with him until the breaking of the day: the player holds on
 * through the night ("hold on", minigames/hold-on). "I will not let you go, unless you
 * bless me." At dawn, a new name: Israel. The first light glows over the hills (this
 * episode's golden thread: pray and do not lose heart). The sun rises on Jacob, limping.
 */

/** Where the wrestlers stand, and the ring of light around their hands. */
export const WRESTLE_AT = { x: 0.5, y: 0.775 }
export const GRIP_AT = { x: 0.5, y: 0.66 }
/** The sun, rising from behind the far hills as the night of wrestling goes on: where it starts, and where it is at daybreak. */
export const SUN = { x: 0.74, from: 0.72, to: 0.6 }

const ABOVE = 'jabbok-gorge'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'rachel' || prop === 'leah' || prop === 'maid' ? 0.038 : prop === 'boy' || prop === 'girl' ? 0.026 : 0.042,
  facing: 1,
  ...extra,
})
const herd = (id: string, prop: string, x: number, y: number, seed: number, count = 5): SceneActor => ({ id, prop, above: ABOVE, x, y, size: 0.032, facing: 1, opacity: 0, group: { count, w: 0.12, h: 0.03, seed, bob: 0.002 } })

export const jabbokSet: SceneDescription = {
  id: 'l04-jabbok',
  title: 'Wrestling with God',
  layers: [
    { id: 'vineyard-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'haran-hills', depth: 0.3 },
    { id: 'dry-hills', depth: 0.3, opacity: 0 },
    { id: 'jabbok-gorge', depth: 0.3, opacity: 0 },
  ],
  actors: [
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.3, y: 0.3, size: 0.28, opacity: 0 },
    // The sun, behind the hills until the day breaks.
    { id: 'sun', prop: 'sun', above: 'dawn-sky', x: SUN.x, y: SUN.from, size: 0.08, opacity: 0 },
    // Jacob's great flocks, his camels, and the camp divided in two.
    herd('sheep', 'sheep', 0.66, 0.77, 31, 6),
    herd('goats', 'goat', 0.84, 0.78, 37),
    { id: 'camel-1', prop: 'camel', above: ABOVE, x: 0.74, y: 0.74, size: 0.06, facing: -1, opacity: 0 },
    { id: 'camel-2', prop: 'camel', above: ABOVE, x: 0.9, y: 0.745, size: 0.06, facing: -1, opacity: 0 },
    { id: 'camp-1', prop: 'crowd', above: ABOVE, x: 0.2, y: 0.775, size: 0.1, facing: 1, opacity: 0 },
    { id: 'camp-2', prop: 'crowd', above: ABOVE, x: 0.82, y: 0.775, size: 0.1, facing: -1, opacity: 0 },
    // The messenger back from Esau.
    person('messenger', 'servant', 1.06, 0.775, { facing: -1, opacity: 0 }),
    // The family.
    person('rachel', 'rachel', 0.32, 0.78),
    person('leah', 'leah', 0.25, 0.78),
    person('maid', 'maid', 0.18, 0.785),
    person('joseph', 'boy', 0.36, 0.79),
    person('child', 'girl', 0.22, 0.795),
    // By the Jabbok: the stranger, the two wrestling, the ring of light around their hands,
    // and the first light of dawn: the golden thread.
    person('stranger', 'stranger', 0.62, 0.775, { facing: -1, opacity: 0 }),
    { id: 'wrestlers', prop: 'wrestlers', above: ABOVE, ...WRESTLE_AT, size: 0.1, pose: 'hold', opacity: 0 },
    { id: 'grip', prop: 'halo', above: ABOVE, ...GRIP_AT, size: 0.12, opacity: 0 },
    { id: 'first-light', prop: 'halo', above: ABOVE, x: SUN.x, y: 0.5, size: 0.09, opacity: 0 },
    person('jacob', 'jacob-grown', 0.44, 0.775),
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
const FAMILY = ['rachel', 'leah', 'maid', 'joseph', 'child']

/** At daybreak: the sun at the edge of the hills, the two still locked together, the ring of light gone. */
const DAYBREAK = [
  actor('sun', { y: SUN.to, opacity: 1 }, { seconds: 1.5 }),
  actor('wrestlers', { pose: 'hold' }, { seconds: 0.6 }),
  actor('grip', { opacity: 0, size: 0.12 }, { seconds: 0.6 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l04-e6-s1',
    title: 'Go home',
    music: 'dvorak-largo',
    beats: [
      say('Jacob served Laban twenty years. Laban cheated him again and again, but God blessed Jacob, and his flocks grew great.', ...['sheep', 'goats', 'camel-1', 'camel-2'].map((id, i) => fadeIn(id, 0.5 + i * 0.4)), camera({ zoom: 1.02 }, slow)),
      verse('GEN 31:3', fadeIn('glory', 0, 0.7), actor('jacob', { pose: 'pray', facing: -1 }, { seconds: 1, delay: 0.5 }), fadeOut('glory', 6)),
      say(
        'But going home meant facing Esau.',
        camera({ zoom: 1 }, slow),
        actor('jacob', { pose: 'idle', facing: 1 }, { seconds: 1 }),
        // The long caravan sets off south.
        ...['sheep', 'goats', 'camel-1', 'camel-2'].map((id, i) => actor(id, { x: 1.2 + i * 0.05 }, { seconds: 8, ease: 'inOutSine', delay: 1 + i * 0.3 })),
        ...['camel-1', 'camel-2'].map((id) => actor(id, { pose: 'walk', facing: 1 }, { seconds: 0.5, delay: 1 })),
        ...FAMILY.map((id, i) => walkTo(id, 1.1 + i * 0.03, 2 + i * 0.3, 8, 1)),
        walkTo('jacob', 1.12, 2.5, 8, 1),
      ),
      verse(
        'GEN 32:6',
        // On the way: the messenger comes back.
        layer('haran-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dry-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...['sheep', 'goats', 'camel-1', 'camel-2', ...FAMILY].map((id) => actor(id, { opacity: 0 }, { seconds: 0.5 })),
        actor('jacob', { x: 0.4, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('messenger', 1),
        walkTo('messenger', 0.56, 1, 3, -1),
        stop('messenger', 4),
      ),
    ],
  },
  {
    id: 'l04-e6-s2',
    title: 'Jacob prays',
    music: 'dvorak-largo',
    beats: [
      verse(
        'GEN 32:7',
        // Dusk: the camp divided in two.
        fadeOut('messenger'),
        fadeIn('camp-1', 0.5),
        fadeIn('camp-2', 0.8),
        actor('sheep', { x: 0.28, opacity: 1, pose: 'idle', facing: 1 }, { seconds: 2, delay: 0.5 }),
        actor('goats', { x: 0.72, opacity: 1, facing: -1 }, { seconds: 2, delay: 0.8 }),
        actor('jacob', { x: 0.5 }, { seconds: 2, ease: 'inOutSine', delay: 1 }),
      ),
      verse('GEN 32:10', actor('jacob', { pose: 'kneel' }, { seconds: 1 }), camera({ zoom: 1.04 }, slow)),
      verse('GEN 32:11', actor('jacob', { pose: 'pray' }, { seconds: 1 })),
      say(
        'It was the first humble prayer we hear from Jacob. Then he sent herds of animals ahead as a present for his brother, hoping to calm his anger.',
        camera({ zoom: 1 }, slow),
        actor('jacob', { pose: 'idle' }, { seconds: 1 }),
        // The gifts are driven on ahead, toward Esau.
        actor('goats', { x: 1.2, facing: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        actor('sheep', { x: 1.1, facing: 1 }, { seconds: 8, ease: 'inOutSine', delay: 1.5 }),
      ),
    ],
  },
  {
    id: 'l04-e6-s3',
    title: 'Until the breaking of the day',
    music: 'dvorak-largo',
    beats: [
      verse(
        'GEN 32:22',
        // Night by the Jabbok: the family crosses the ford.
        ...['camp-1', 'camp-2', 'sheep', 'goats'].map((id) => fadeOut(id)),
        layer('dry-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('jabbok-gorge', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        layer('vineyard-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('jacob', { x: 0.34 }, { seconds: 0.1, delay: 1 }),
        ...FAMILY.map((id, i) => actor(id, { x: 0.2 + i * 0.04, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 })),
        ...FAMILY.map((id) => fadeIn(id, 1.5)),
        ...FAMILY.map((id, i) => walkTo(id, 1.1 + i * 0.03, 3 + i * 0.4, 7, 1)),
      ),
      verse(
        'GEN 32:24',
        // Jacob alone; a figure steps out of the darkness, and they grapple.
        ...FAMILY.map((id) => actor(id, { opacity: 0 }, { seconds: 0.5 })),
        actor('jacob', { x: 0.46, pose: 'walk', facing: 1 }, { seconds: 2, ease: 'inOutSine' }),
        stop('jacob', 2),
        fadeIn('stranger', 1),
        actor('stranger', { x: 0.54 }, { seconds: 2, ease: 'inOutSine', delay: 2 }),
        actor('jacob', { opacity: 0 }, { seconds: 1, delay: 4.5 }),
        actor('stranger', { opacity: 0 }, { seconds: 1, delay: 4.5 }),
        actor('wrestlers', { opacity: 1 }, { seconds: 1, delay: 4.5 }),
      ),
      play('hold-on', { cues: [], done: DAYBREAK }),
      verse('GEN 32:25', actor('wrestlers', { pose: 'touch' }, { seconds: 0.8, delay: 2 })),
      verse('GEN 32:26', camera({ zoom: 1.04 }, slow)),
    ],
  },
  {
    id: 'l04-e6-s4',
    title: 'Israel',
    music: 'dvorak-largo',
    beats: [
      verse(
        'GEN 32:27',
        // The day breaks.
        layer('night-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        actor('sun', { y: 0.5 }, { seconds: 8, ease: 'inOutSine' }),
        fadeIn('first-light', 0.5, 0.9),
        camera({ zoom: 1 }, slow),
      ),
      say('To say his name was to admit who he had been: Jacob, the heel-grabber, the one who tricked his brother.', actor('wrestlers', { pose: 'hold' }, { seconds: 1 })),
      verse('GEN 32:28', camera({ zoom: 1.04 }, slow)),
      verse(
        'GEN 32:30',
        camera({ zoom: 1 }, slow),
        // The stranger is gone.
        actor('wrestlers', { opacity: 0 }, { seconds: 2 }),
        actor('jacob', { x: 0.47, pose: 'kneel', facing: 1 }, { seconds: 0.1 }),
        actor('jacob', { opacity: 1 }, { seconds: 2 }),
      ),
      verse('GEN 32:31', fadeOut('first-light', 1), actor('sun', { y: 0.4 }, { seconds: 10, ease: 'inOutSine' }), actor('jacob', { pose: 'walk', facing: 1 }, { seconds: 0.8, delay: 2 }), actor('jacob', { x: 1.08 }, { seconds: 10, ease: 'inOutSine', delay: 2 })),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: jabbokSet, scenes }
