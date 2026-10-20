import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 7 · Brothers Reconciled (Genesis 33–35), from the approved Level 4 script.
 *
 * Esau is coming with four hundred men. Jacob lines up his family and goes on ahead of
 * them, bowing to the ground seven times: the player bows with him, step by step ("seven
 * bows", minigames/seven-bows), while the dust of Esau's company draws near. And Esau runs
 * to meet him, embraces him, and they weep. The lamb Jacob brought as a gift glows (this
 * episode's golden thread: the father ran to meet his son). Back at Bethel, God renews the
 * name Israel. On the road to Bethlehem Rachel dies giving birth to Benjamin. At Mamre,
 * Esau and Jacob bury their father together, and the twelve sons of Israel stand in a row.
 */

/** Where Jacob starts, how far each bow takes him, and where his brother meets him. */
export const BOWS = 7
export const JACOB_FROM = 0.3
export const BOW_STEP = 0.035
export const MEET = JACOB_FROM + BOWS * BOW_STEP
/** Where Jacob holds the lamb he brings as a gift, from where he stands (raised as he stands, lowered as he bows). */
export const LAMB = { dx: 0.026, standing: 0.705, bowing: 0.74 }
/** Esau's company, far off at first and nearer with every bow. */
export const COMPANY = {
  dust: { from: { x: 0.96, size: 0.14, opacity: 0.5 }, to: { x: 0.82, size: 0.24, opacity: 0.9 } },
  men: { from: { x: 1.04, opacity: 0 }, to: { x: 0.84, opacity: 1 } },
}

const ABOVE = 'dry-hills'
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

export const reconciledSet: SceneDescription = {
  id: 'l04-reconciled',
  title: 'Brothers reconciled',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3, opacity: 0 },
    { id: 'dry-hills', depth: 0.3 },
  ],
  actors: [
    // Esau's company, far off: a cloud of dust, and his four hundred men.
    { id: 'dust', prop: 'dust-cloud', above: ABOVE, x: COMPANY.dust.from.x, y: 0.76, size: COMPANY.dust.from.size, opacity: COMPANY.dust.from.opacity },
    { id: 'esaus-men', prop: 'crowd', above: ABOVE, x: COMPANY.men.from.x, y: 0.77, size: 0.14, facing: -1, opacity: 0 },
    // At Bethel: the oak, the old pillar, and the altar.
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.15, y: 0.8, size: 0.26, opacity: 0 },
    { id: 'pillar', prop: 'stone-pillar', above: ABOVE, x: 0.62, y: 0.77, size: 0.04, pose: 'anointed', opacity: 0 },
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.46, y: 0.775, size: 0.06, pose: 'lit', opacity: 0 },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.5, y: 0.3, size: 0.3, opacity: 0 },
    // On the road to Bethlehem: the newborn Benjamin, and the pillar over Rachel's grave.
    { id: 'benjamin', prop: 'swaddled-baby', above: ABOVE, x: 0.522, y: 0.645, size: 0.026, opacity: 0 },
    { id: 'tomb', prop: 'stone-pillar', above: ABOVE, x: 0.4, y: 0.775, size: 0.045, pose: 'standing', opacity: 0 },
    // At Mamre: the cave of Machpelah, and the twelve sons of Israel.
    { id: 'cave', prop: 'cave-tomb', above: ABOVE, x: 0.74, y: 0.78, size: 0.2, opacity: 0 },
    { id: 'sons', prop: 'twelve-sons', above: ABOVE, x: 0.42, y: 0.79, size: 0.32, opacity: 0 },
    // The family, lined up behind Jacob: the maids and their children first, then Leah, then Rachel and Joseph.
    person('maid', 'maid', 0.22, 0.78),
    person('child', 'girl', 0.18, 0.79),
    person('leah', 'leah', 0.13, 0.78),
    person('rachel', 'rachel', 0.06, 0.78),
    person('joseph', 'boy', 0.02, 0.79),
    person('esau', 'esau', 0.86, 0.775, { facing: -1, opacity: 0 }),
    person('jacob', 'jacob-grown', JACOB_FROM, 0.775, { pose: 'carry' }),
    // The lamb Jacob brings his brother as a gift, and its glow: the golden thread.
    { id: 'lamb', prop: 'sheep', above: ABOVE, x: JACOB_FROM + LAMB.dx, y: LAMB.standing, size: 0.022, facing: 1 },
    { id: 'the-gift', prop: 'halo', above: ABOVE, x: MEET - 0.03, y: 0.69, size: 0.07, opacity: 0 },
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
const stop = (id: string, delay: number, pose = 'idle') => actor(id, { pose }, { seconds: 0.5, delay })
const FAMILY = ['maid', 'child', 'leah', 'rachel', 'joseph']

/** After the seven bows: Jacob on his knees before his brother's company, the lamb beside him. */
const BOWED = [
  actor('jacob', { x: MEET, pose: 'kneel' }, { seconds: 1, ease: 'inOutSine' }),
  actor('lamb', { x: MEET + LAMB.dx, y: LAMB.bowing }, { seconds: 1, ease: 'inOutSine' }),
  actor('dust', COMPANY.dust.to, { seconds: 1, ease: 'inOutSine' }),
  actor('esaus-men', COMPANY.men.to, { seconds: 1, ease: 'inOutSine' }),
]

const scenes: StoryScene[] = [
  {
    id: 'l04-e7-s1',
    title: 'Esau is coming',
    music: 'amazing-grace',
    beats: [
      verse('GEN 33:1', ...FAMILY.map((id, i) => actor(id, { facing: 1 }, { seconds: 0.5, delay: i * 0.2 })), camera({ zoom: 1.02, x: 0.02 }, slow)),
      verse('GEN 33:3', camera({ zoom: 1, x: 0 }, slow)),
      play('seven-bows', { cues: [], done: BOWED }),
    ],
  },
  {
    id: 'l04-e7-s2',
    title: 'Esau ran',
    music: 'amazing-grace',
    beats: [
      verse(
        'GEN 33:4',
        fadeIn('the-gift', 0.5, 0.85),
        // Esau breaks away from his men and runs to his brother.
        actor('esau', { x: COMPANY.men.to.x - 0.04 }, { seconds: 0.1 }),
        fadeIn('esau', 0.2),
        actor('esau', { x: MEET + 0.05, pose: 'walk', facing: -1 }, { seconds: 2.2, ease: 'inOutSine', delay: 0.5 }),
        actor('jacob', { pose: 'idle', facing: 1 }, { seconds: 0.8, delay: 2.2 }),
        actor('lamb', { x: MEET - 0.03, y: 0.775 }, { seconds: 1, ease: 'inOutSine', delay: 2 }),
        actor('esau', { x: MEET + 0.03, pose: 'carry' }, { seconds: 0.8, ease: 'inOutSine', delay: 2.7 }),
        actor('jacob', { pose: 'carry' }, { seconds: 0.8, delay: 3 }),
      ),
      verse('GEN 33:9', actor('esau', { pose: 'idle' }, { seconds: 1 }), actor('jacob', { pose: 'idle' }, { seconds: 1 })),
      verse('GEN 33:10', actor('jacob', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.04 }, slow)),
      say('The night before, Jacob had seen God’s face and lived. Now, in his brother’s forgiving face, he saw something of God’s face again.', camera({ zoom: 1 }, slow), actor('jacob', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l04-e7-s3',
    title: 'Back to Bethel',
    music: 'amazing-grace',
    beats: [
      verse(
        'GEN 35:1',
        // Bethel again, years after the dream: the old pillar still standing.
        ...['esau', 'esaus-men', 'dust', 'lamb', 'the-gift'].map((id) => fadeOut(id)),
        layer('dry-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        fadeIn('oak', 1.5),
        fadeIn('pillar', 1.8),
        actor('jacob', { x: 0.52, pose: 'idle', facing: -1 }, { seconds: 0.1, delay: 1 }),
        ...FAMILY.map((id, i) => actor(id, { x: 0.68 + i * 0.05, facing: -1 }, { seconds: 0.1, delay: 1 + i * 0.1 })),
        fadeIn('glory', 0.5, 0.7),
        fadeOut('glory', 6),
      ),
      verse('GEN 35:2', actor('jacob', { pose: 'lift', facing: 1 }, { seconds: 1 })),
      verse('GEN 35:10', fadeIn('altar'), actor('jacob', { pose: 'kneel', facing: -1 }, { seconds: 1, delay: 1 }), fadeIn('glory', 1, 0.7)),
      verse('GEN 35:11', camera({ zoom: 1.04, y: -0.01 }, slow)),
      say('God had kept every word he spoke at Bethel: he had been with Jacob, kept him, and brought him home.', camera({ zoom: 1, y: 0 }, slow), fadeOut('glory', 2), actor('jacob', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l04-e7-s4',
    title: 'On the way to Bethlehem',
    music: 'amazing-grace',
    beats: [
      say(
        'On the road south, Rachel gave birth to her second son. It was a hard birth, and she did not live.',
        // The road south: the women gather round.
        ...['oak', 'pillar', 'altar'].map((id) => fadeOut(id)),
        layer('canaan-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dry-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        layer('forest-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('jacob', { x: 0.36, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('maid', { x: 0.55, facing: -1, pose: 'carry' }, { seconds: 0.1, delay: 1 }),
        actor('leah', { x: 0.62, facing: -1 }, { seconds: 0.1, delay: 1 }),
        ...['rachel', 'joseph', 'child'].map((id) => actor(id, { opacity: 0 }, { seconds: 1 })),
        fadeIn('benjamin', 2),
      ),
      verse('GEN 35:18'),
      say('Ben-oni means “son of my sorrow.” Jacob called him Benjamin, “son of the right hand”: a name of strength and hope.', camera({ zoom: 1.03 }, slow)),
      verse('GEN 35:19', camera({ zoom: 1 }, slow), fadeIn('tomb', 1), actor('jacob', { x: 0.44, pose: 'walk', facing: -1 }, { seconds: 2, ease: 'inOutSine' }), stop('jacob', 2, 'kneel')),
      verse('GEN 35:20'),
    ],
  },
  {
    id: 'l04-e7-s5',
    title: 'Gathered to his people',
    music: 'amazing-grace',
    beats: [
      verse(
        'GEN 35:22',
        // Mamre: the twelve sons of Jacob.
        ...['tomb', 'benjamin', 'maid', 'leah'].map((id) => fadeOut(id)),
        layer('vineyard-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dry-hills', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('canaan-hills', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        actor('jacob', { opacity: 0 }, { seconds: 1 }),
        fadeIn('oak', 1.5),
        fadeIn('sons', 2),
      ),
      verse(
        'GEN 35:29',
        // Esau and Jacob, side by side, at the cave of Machpelah.
        fadeOut('sons'),
        fadeIn('cave', 1),
        actor('esau', { x: 0.5, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('jacob', { x: 0.44, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('esau', 1.5),
        fadeIn('jacob', 1.5),
      ),
      say('The brothers who had been enemies buried their father together, in peace.', actor('esau', { pose: 'pray' }, { seconds: 1 }), actor('jacob', { pose: 'pray' }, { seconds: 1, delay: 0.3 })),
      say('God’s promise to Abraham now rested on Jacob, Israel, and his twelve sons. The next level tells of the favorite of them all: Joseph.', fadeIn('sons', 1), camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: reconciledSet, scenes }
