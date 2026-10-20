import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Rachel and Leah (Genesis 29–30:24), from the approved Level 4 script.
 *
 * At a well near Haran, three flocks wait for the great stone to be rolled away. Rachel
 * comes with her father's sheep, and Jacob rolls the stone off alone, waters her flock, and
 * weeps for joy. He serves seven years for her, and they seem but a few days. On the
 * wedding night Laban gives him Leah instead: the trickster is tricked. Rachel is loved;
 * Leah is not, but the LORD sees her. The player gives each baby the name his mother's
 * words call for ("the sons' names", minigames/the-sons-names): Reuben, Simeon, Levi,
 * Judah, and at last Rachel's Joseph. Baby Judah glows (this episode's golden thread: the
 * Lion of the tribe of Judah).
 */

/** The sons and the words their mothers said, and what each name means. */
export const SONS = [
  { name: 'Reuben', mother: 'Leah', words: '“The LORD has looked upon my affliction.”', meaning: 'Reuben: “See, a son!”' },
  { name: 'Simeon', mother: 'Leah', words: '“The LORD has heard.”', meaning: 'Simeon: “He has heard”' },
  { name: 'Levi', mother: 'Leah', words: '“Now this time my husband will be joined to me.”', meaning: 'Levi: “joined”' },
  { name: 'Judah', mother: 'Leah', words: '“This time I will praise the LORD.”', meaning: 'Judah: “praise”' },
  { name: 'Joseph', mother: 'Rachel', words: '“May the LORD add to me another son!”', meaning: 'Joseph: “may he add”' },
]
/** Where each baby lies (Leah's four on the mat, Rachel's in her arms), and the light over it when it is named. */
export const BABIES = SONS.map((_, i) => {
  const at = i < 4 ? { x: 0.53 + i * 0.045, y: 0.755 } : { x: 0.832, y: 0.645 }
  return { id: `baby-${i + 1}`, light: `name-light-${i + 1}`, at, lightAt: { x: at.x, y: at.y - 0.06 } }
})

const ABOVE = 'haran-hills'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'rachel' || prop === 'leah' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})
const flock = (id: string, x: number, y: number, seed: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop: 'sheep', above: ABOVE, x, y, size: 0.032, group: { count: 5, w: 0.1, h: 0.03, seed, bob: 0.002 }, ...extra })

export const rachelSet: SceneDescription = {
  id: 'l04-rachel',
  title: 'Rachel and Leah',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'haran-hills', depth: 0.3 },
  ],
  actors: [
    // The well in the field, with its great stone, and the three flocks waiting by it.
    { id: 'well', prop: 'stone-well', above: ABOVE, x: 0.5, y: 0.77, size: 0.09 },
    { id: 'well-stone', prop: 'well-stone', above: ABOVE, x: 0.5, y: 0.735, size: 0.075 },
    flock('flock-1', 0.22, 0.765, 3),
    flock('flock-2', 0.76, 0.76, 7),
    flock('flock-3', 0.9, 0.775, 13),
    { id: 'shepherds', prop: 'crowd', above: ABOVE, x: 0.68, y: 0.77, size: 0.09, facing: -1 },
    flock('rachels-flock', -0.08, 0.775, 21, { opacity: 0 }),
    // The wedding: lamps, and the guests.
    ...[0.2, 0.5, 0.8].map((x, i): SceneActor => ({ id: `lamp-${i + 1}`, prop: 'oil-lamp', above: ABOVE, x, y: 0.74, size: 0.022, opacity: 0 })),
    { id: 'guests', prop: 'crowd', above: ABOVE, x: 0.82, y: 0.77, size: 0.11, facing: -1, opacity: 0 },
    // Jacob's tents, years later: the mat where Leah's sons lie, and the babies.
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.6, y: 0.785, size: 0.2, opacity: 0 },
    ...BABIES.map((b): SceneActor => ({ id: b.id, prop: 'swaddled-baby', above: ABOVE, ...b.at, size: 0.026, opacity: 0 })),
    ...BABIES.map((b): SceneActor => ({ id: b.light, prop: 'halo', above: ABOVE, ...b.lightAt, size: 0.045, opacity: 0 })),
    // Baby Judah, glowing: the golden thread.
    { id: 'baby-judah', prop: 'halo', above: ABOVE, x: BABIES[3]!.at.x, y: 0.66, size: 0.06, opacity: 0 },
    // The people.
    person('jacob', 'jacob', -0.05, 0.775, { facing: 1 }),
    person('rachel', 'rachel', -0.05, 0.78, { facing: 1, opacity: 0 }),
    person('laban', 'laban', 0.62, 0.775, { opacity: 0 }),
    person('leah', 'leah', 0.7, 0.78, { opacity: 0 }),
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
const sky = (from: string, to: string, delay: number) => [layer(from, { opacity: 0 }, { seconds: 1.5, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 1.5, ease: 'inOutSine', delay })]

/** After the naming: every son named, each light shining over him, and Rachel holding Joseph. */
const NAMED = [...BABIES.map((b) => actor(b.light, { opacity: 0.8 }, { seconds: 1 })), actor(BABIES[4]!.id, { opacity: 1 }, { seconds: 1 }), actor('rachel', { pose: 'carry' }, { seconds: 1 })]

const scenes: StoryScene[] = [
  {
    id: 'l04-e5-s1',
    title: 'The stone on the well',
    music: 'pachelbel-canon',
    beats: [
      verse('GEN 29:2', walkTo('jacob', 0.36, 0, 6, 1), stop('jacob', 6)),
      verse('GEN 29:9', actor('rachels-flock', { opacity: 1, x: 0.24, y: 0.79 }, { seconds: 5, ease: 'inOutSine' }), fadeIn('rachel'), walkTo('rachel', 0.3, 0, 5, 1), stop('rachel', 5)),
      verse(
        'GEN 29:10',
        // Jacob sets his shoulder to the great stone and rolls it away alone.
        actor('jacob', { x: 0.44, pose: 'walk', facing: 1 }, { seconds: 1.5, ease: 'inOutSine' }),
        actor('jacob', { pose: 'work' }, { seconds: 0.5, delay: 1.5 }),
        actor('well-stone', { x: 0.6, y: 0.775 }, { seconds: 2.5, ease: 'inOutSine', delay: 2 }),
        stop('jacob', 4.5),
        actor('rachels-flock', { x: 0.42, y: 0.8 }, { seconds: 3, ease: 'inOutSine', delay: 4.5 }),
      ),
      verse('GEN 29:11', actor('rachel', { x: 0.38 }, { seconds: 1.5, ease: 'inOutSine' }), actor('jacob', { pose: 'pray', facing: -1 }, { seconds: 1, delay: 1.5 })),
      say('In those days, a kiss was how relatives greeted each other. Jacob had found his family, and after his long, lonely road, he wept for joy.', actor('jacob', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l04-e5-s2',
    title: 'Seven years',
    music: 'pachelbel-canon',
    beats: [
      verse(
        'GEN 29:17',
        // Laban's household: Laban and his two daughters.
        ...['well', 'well-stone', 'flock-1', 'flock-2', 'flock-3', 'shepherds', 'rachels-flock'].map((id) => fadeOut(id)),
        fadeIn('laban', 1),
        fadeIn('leah', 1.2),
        actor('rachel', { x: 0.78, facing: -1 }, { seconds: 0.1, delay: 1 }),
        actor('jacob', { x: 0.42, facing: 1 }, { seconds: 0.1, delay: 1 }),
      ),
      verse('GEN 29:18', actor('jacob', { pose: 'lift' }, { seconds: 1 })),
      verse(
        'GEN 29:20',
        // The seasons pass over Jacob and the flock: seven years like a few days.
        actor('jacob', { pose: 'idle' }, { seconds: 1 }),
        ...['laban', 'leah', 'rachel'].map((id) => fadeOut(id)),
        actor('rachels-flock', { x: 0.62, y: 0.785 }, { seconds: 0.1, delay: 1 }),
        fadeIn('rachels-flock', 1),
        ...sky('forest-sky', 'vineyard-sky', 2),
        ...sky('vineyard-sky', 'dawn-sky', 4),
        ...sky('dawn-sky', 'forest-sky', 6),
        camera({ zoom: 1.03 }, slow),
      ),
    ],
  },
  {
    id: 'l04-e5-s3',
    title: 'The trickster tricked',
    music: 'pachelbel-canon',
    beats: [
      say(
        'On the wedding night, the bride wore a veil. Laban gave Jacob his elder daughter instead.',
        camera({ zoom: 1 }, slow),
        // A wedding feast at night: lamps, music, and the bride.
        fadeOut('rachels-flock'),
        layer('forest-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('night-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...[1, 2, 3].map((i) => fadeIn(`lamp-${i}`, 1 + i * 0.3)),
        fadeIn('guests', 1.5),
        actor('leah', { x: 0.5, facing: -1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('leah', 1.5),
        actor('laban', { x: 0.62 }, { seconds: 0.1, delay: 1 }),
        fadeIn('laban', 1.8),
      ),
      verse(
        'GEN 29:25',
        // Morning: it was Leah. Jacob steps back, and goes to Laban.
        layer('night-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        ...[1, 2, 3].map((i) => fadeOut(`lamp-${i}`)),
        fadeOut('guests'),
        actor('jacob', { x: 0.38 }, { seconds: 1.5, ease: 'inOutSine', delay: 1 }),
        actor('jacob', { pose: 'lift' }, { seconds: 0.8, delay: 3 }),
      ),
      verse('GEN 29:26', actor('laban', { pose: 'carry' }, { seconds: 0.8 }), actor('jacob', { pose: 'idle' }, { seconds: 0.8 })),
      say('Jacob had tricked his blind father by pretending to be the firstborn. Now he was tricked, in the dark, by the firstborn. He learned what it felt like.', actor('laban', { pose: 'idle' }, { seconds: 0.8 })),
      say(
        'A week later, Laban gave him Rachel too, for seven more years of work. In those days a man could have more than one wife, but the Bible shows how much sadness it brought to this family.',
        layer('dawn-sky', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3, ease: 'inOutSine' }),
        actor('rachel', { x: 0.7, facing: -1 }, { seconds: 0.1 }),
        fadeIn('rachel', 0.5),
        fadeOut('laban', 1),
      ),
    ],
  },
  {
    id: 'l04-e5-s4',
    title: 'The LORD saw Leah',
    music: 'pachelbel-canon',
    beats: [
      verse(
        'GEN 29:30',
        // Years in Jacob's tents: Leah's sons on the mat beside her; Rachel watching.
        actor('leah', { x: 0.47, facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('jacob', { x: 0.74, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        actor('rachel', { x: 0.86, facing: -1 }, { seconds: 0.1, delay: 1 }),
        ...['leah', 'jacob', 'rachel'].map((id) => actor(id, { opacity: 0 }, { seconds: 1 })),
        ...['leah', 'jacob', 'rachel'].map((id) => fadeIn(id, 1.2)),
        fadeIn('mat', 1.5),
      ),
      verse('GEN 29:31', ...[0, 1, 2, 3].map((i) => fadeIn(BABIES[i]!.id, 1 + i * 0.6)), fadeIn('baby-judah', 3.5, 0.85)),
      say('“Hated” here means loved less. Jacob did not love Leah as he loved Rachel. But God saw her, and he did not forget her.', actor('leah', { pose: 'pray' }, { seconds: 1 })),
      play('the-sons-names', { cues: [actor('leah', { pose: 'idle' }, { seconds: 1 })], done: NAMED }),
      verse('GEN 29:35', camera({ zoom: 1.04, x: -0.02 }, slow)),
      verse('GEN 30:22', camera({ zoom: 1, x: 0 }, slow)),
      verse('GEN 30:24', fadeOut('baby-judah', 4)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: rachelSet, scenes }
