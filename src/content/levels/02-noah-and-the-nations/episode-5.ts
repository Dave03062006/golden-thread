import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · The Rainbow Covenant (Genesis 8:20–9:29), from the approved Level 2 script.
 *
 * On the mountainside, below the ark, Noah builds an altar and the family kneels as the
 * smoke rises straight up. They sow a field and pitch a tent; children are born. Rain
 * clouds come, and the family looks up, afraid; then the sun breaks through and the
 * rainbow is drawn across the sky band by band ("colors of the promise",
 * minigames/colors-of-the-promise), its highest point glowing (this episode's golden
 * thread: the new covenant). Years later, "even Noah": shown only from outside, at
 * evening: the vineyard, the closed tent, and two brothers walking backward with a cloak.
 */

/** The rainbow's circle, in frame fractions, and the middle radius of each band (red outside), as in the art. */
export const RAINBOW = { x: 0.5, y: 640 / 900, bands: Array.from({ length: 7 }, (_, i) => 600 - i * 22 - 11) }
/** Where a band is at a point along its arc, from its left end (0) to its right end (1). */
export function onBand(band: number, along: number) {
  const r = RAINBOW.bands[band]!
  const angle = Math.PI * (1 - along)
  return { x: RAINBOW.x + (r * Math.cos(angle)) / 1600, y: RAINBOW.y - (r * Math.sin(angle)) / 900 }
}
/** The rainbow's highest point. */
const CROWN = onBand(3, 0.5)

/** The words of God's promise (Genesis 9:11–15), a few lighting up with each band. */
export const PROMISE = ['Never again', 'shall all flesh be cut off', 'by the waters of a flood.', 'Every living creature,', 'for all future generations:', 'I set my bow in the cloud.', 'I will remember.']

const ARK = { x: 0.42, y: 0.7, size: 0.4 }
const ALTAR = { x: 0.66, y: 0.735 }

const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: 'ararat-grass',
  x,
  y,
  size: prop === 'sons-wife' || prop === 'noahs-wife' ? 0.04 : prop === 'boy' || prop === 'girl' ? 0.026 : 0.045,
  facing: x < ALTAR.x ? 1 : -1,
  ...extra,
})

const FAMILY: SceneActor[] = [
  person('noah', 'noah', 0.6, 0.77),
  person('wife', 'noahs-wife', 0.55, 0.78),
  person('shem', 'shem', 0.72, 0.775),
  person('shem-wife', 'sons-wife', 0.765, 0.785),
  person('ham', 'ham', 0.5, 0.8),
  person('ham-wife', 'sons-wife', 0.455, 0.81),
  person('japheth', 'japheth', 0.81, 0.8),
  person('japheth-wife', 'sons-wife', 0.855, 0.81),
]

export const theRainbowCovenantSet: SceneDescription = {
  id: 'l02-the-rainbow-covenant',
  title: 'The rainbow covenant',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'vineyard-sky', depth: 0, opacity: 0 },
    ...Array.from({ length: 7 }, (_, i) => ({ id: `rainbow-${i + 1}`, depth: 0.05, opacity: 0 })),
    { id: 'far-peaks', depth: 0.15 },
    { id: 'green-hills', depth: 0.3 },
    { id: 'vineyard', depth: 0.35, opacity: 0 },
    { id: 'ararat-grass', depth: 0.5 },
  ],
  actors: [
    { id: 'ark', prop: 'ark', above: 'green-hills', ...ARK, pose: 'open' },
    // The altar of stones, and the smoke rising from it.
    { id: 'altar-smoke', prop: 'smoke-column', above: 'ararat-grass', x: ALTAR.x, y: ALTAR.y - 0.07, size: 0.06, opacity: 0 },
    { id: 'altar', prop: 'noah-altar', above: 'ararat-grass', ...ALTAR, size: 0.07, pose: 'idle', opacity: 0 },
    // The first field and the family's tent, and Noah's tent years later.
    { id: 'field', prop: 'field', above: 'ararat-grass', x: 0.2, y: 0.85, size: 0.2, opacity: 0 },
    { id: 'home', prop: 'striped-tent', above: 'ararat-grass', x: 0.08, y: 0.8, size: 0.12, pose: 'open', opacity: 0 },
    { id: 'noah-tent', prop: 'striped-tent', above: 'ararat-grass', x: 0.75, y: 0.78, size: 0.15, pose: 'closed', opacity: 0 },
    // The animals grazing.
    { id: 'sheep-1', prop: 'sheep', above: 'ararat-grass', x: 0.3, y: 0.86, size: 0.042, facing: 1, opacity: 0 },
    { id: 'sheep-2', prop: 'sheep', above: 'ararat-grass', x: 0.355, y: 0.875, size: 0.04, facing: -1, opacity: 0 },
    { id: 'deer-1', prop: 'deer', above: 'ararat-grass', x: 0.93, y: 0.86, size: 0.055, facing: -1, opacity: 0 },
    ...FAMILY.map((p) => ({ ...p, pose: 'idle' })),
    // The children born to them.
    person('boy', 'boy', 0.33, 0.8, { opacity: 0 }),
    person('girl', 'girl', 0.37, 0.805, { opacity: 0, facing: -1 }),
    // The cloak Shem and Japheth carry, years later.
    { id: 'cloak', prop: 'cloak', above: 'ararat-grass', x: 0.34, y: 0.765, size: 0.05, opacity: 0 },
    // The rain, and the sun breaking through.
    { id: 'rain', prop: 'rain', above: 'ararat-grass', x: 0.5, y: 0.5, size: 1.1, opacity: 0 },
    { id: 'glory', prop: 'glory', above: 'ararat-grass', x: 0.78, y: 0.16, size: 0.3, opacity: 0 },
    // The light that draws the rainbow, and its highest point: the golden thread.
    { id: 'brush', prop: 'halo', above: 'ararat-grass', ...onBand(0, 0), size: 0.05, opacity: 0 },
    { id: 'rainbow-crown', prop: 'halo', above: 'ararat-grass', ...CROWN, size: 0.06, opacity: 0 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.005 },
      { at: 20, value: 0.005, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.01, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })
const pose = (id: string, to: string, delay = 0) => actor(id, { pose: to }, { seconds: 0.8, delay })

/** After "colors of the promise": every band drawn, the brush put away, the crown glowing. */
const RAINBOW_DONE = [
  ...Array.from({ length: 7 }, (_, i) => layer(`rainbow-${i + 1}`, { opacity: 1 }, { seconds: 1 })),
  actor('brush', { ...CROWN, opacity: 0 }, { seconds: 1 }),
  actor('rainbow-crown', { opacity: 0.85 }, { seconds: 2 }),
]

/** Fading out, moving while unseen, and fading in again somewhere else. */
const elsewhere = (id: string, to: { x: number; y: number; facing?: -1 | 1; pose?: string }, delay = 0) => [
  actor(id, { opacity: 0 }, { seconds: 1.2, delay }),
  actor(id, to, { seconds: 0.1, delay: delay + 1.3 }),
  actor(id, { opacity: 1 }, { seconds: 1.2, delay: delay + 1.5 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l02-e5-s1',
    title: 'The altar',
    music: 'creation-heavens-telling',
    beats: [
      say('The first thing Noah did in the new world was to worship.', fadeIn('altar', 0.5), pose('noah', 'work', 0.5)),
      verse(
        'GEN 8:20',
        pose('noah', 'lift'),
        actor('altar', { pose: 'lit' }, { seconds: 0.8, delay: 1 }),
        fadeIn('altar-smoke', 1.5, 0.85),
        ...FAMILY.filter((p) => p.id !== 'noah').map((p, i) => pose(p.id, 'kneel', 1 + i * 0.25)),
      ),
      say('God received his offering, and he made a promise in his heart:', pose('noah', 'kneel'), camera({ zoom: 1.04, y: -0.01 }, slow)),
      verse('GEN 8:22', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l02-e5-s2',
    title: 'A new beginning',
    music: 'creation-heavens-telling',
    beats: [
      verse(
        'GEN 9:1',
        fadeOut('altar-smoke'),
        actor('altar', { pose: 'idle' }, { seconds: 1, delay: 1 }),
        ...FAMILY.map((p, i) => pose(p.id, 'idle', i * 0.2)),
        // The sons go to sow the first field; a tent goes up; the animals graze.
        ...['shem', 'ham', 'japheth'].map((id, i) => actor(id, { x: 0.13 + i * 0.07, y: 0.82 + (i % 2) * 0.015, pose: 'walk', facing: -1 }, { seconds: 5, ease: 'inOutSine', delay: 1 + i * 0.4 })),
        ...['shem', 'ham', 'japheth'].map((id, i) => pose(id, 'work', 6.2 + i * 0.4)),
        fadeIn('field', 2),
        fadeIn('home', 3),
        ...['sheep-1', 'sheep-2', 'deer-1'].map((id, i) => fadeIn(id, 2 + i * 0.5)),
      ),
      say('It is the same blessing God gave Adam and Eve at the beginning. The human story was starting again.', fadeIn('boy', 1), fadeIn('girl', 1.6)),
      say('God also taught them that every human life is sacred:'),
      verse('GEN 9:6'),
      say('Before the Flood the earth was filled with violence. In the new world, God set a guard around every human life, because every person bears his image.'),
    ],
  },
  {
    id: 'l02-e5-s3',
    title: 'The bow in the cloud',
    music: 'creation-heavens-telling',
    beats: [
      say(
        'Then God made a covenant with Noah, with his family, and with every living creature.',
        // Rain clouds roll in, and the family looks up, afraid.
        layer('storm-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        fadeIn('rain', 2, 0.6),
        ...['noah', 'wife', 'shem', 'ham', 'japheth'].map((id, i) => pose(id, 'pray', 2 + i * 0.3)),
      ),
      verse(
        'GEN 9:11',
        // Then the sun breaks through.
        fadeOut('rain', 3),
        layer('storm-sky', { opacity: 0 }, { seconds: 5, ease: 'inOutSine', delay: 3 }),
        fadeIn('glory', 5, 0.7),
      ),
      play('colors-of-the-promise', { cues: [], done: RAINBOW_DONE }),
      verse('GEN 9:13'),
    ],
  },
  {
    id: 'l02-e5-s4',
    title: '“I will remember”',
    music: 'creation-heavens-telling',
    beats: [
      verse('GEN 9:15', camera({ zoom: 0.97, y: 0.01 }, { seconds: 8, ease: 'inOutSine' }), fadeOut('glory', 2)),
      say('Every time we see a rainbow, God’s promise is shining in the sky.'),
    ],
  },
  {
    id: 'l02-e5-s5',
    title: 'Even Noah',
    music: 'creation-heavens-telling',
    beats: [
      say(
        'Noah became a farmer and planted a vineyard.',
        // Years later, at evening: the vineyard on the hillside, and Noah's tent.
        camera({ zoom: 1, y: 0 }, slow),
        layer('vineyard-sky', { opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        ...Array.from({ length: 7 }, (_, i) => layer(`rainbow-${i + 1}`, { opacity: 0 }, { seconds: 4 })),
        fadeOut('rainbow-crown'),
        layer('vineyard', { opacity: 1 }, { seconds: 4, delay: 1 }),
        ...['altar', 'field', 'home', 'boy', 'girl', 'sheep-1', 'sheep-2', 'deer-1', 'noah', 'wife', 'shem-wife', 'ham-wife', 'japheth-wife'].map((id) => fadeOut(id)),
        fadeIn('noah-tent', 2),
        ...elsewhere('ham', { x: 0.64, y: 0.8, facing: -1, pose: 'idle' }),
        ...elsewhere('shem', { x: 0.3, y: 0.79, facing: -1, pose: 'idle' }),
        ...elsewhere('japheth', { x: 0.38, y: 0.795, facing: -1, pose: 'idle' }),
      ),
      say('One day he drank too much of its wine and fell asleep uncovered in his tent.'),
      say(
        'His son Ham saw him and told his brothers, mocking his father. But Shem and Japheth took a cloak and walked in backward, faces turned away, and covered him.',
        actor('ham', { x: 0.47, pose: 'walk' }, { seconds: 3, ease: 'inOutSine' }),
        pose('ham', 'idle', 3),
        // The brothers walk to the tent backward, facing away from it, the cloak held up between them.
        actor('cloak', { opacity: 1 }, { seconds: 1, delay: 3.5 }),
        ...['shem', 'japheth'].map((id) => pose(id, 'carry', 3.5)),
        ...[
          ['shem', 0.62],
          ['japheth', 0.7],
        ].map(([id, x]) => actor(id as string, { x: x as number, y: 0.79, pose: 'walk' }, { seconds: 6, ease: 'inOutSine', delay: 4.5 })),
        actor('cloak', { x: 0.66, y: 0.765 }, { seconds: 6, ease: 'inOutSine', delay: 4.5 }),
        ...['shem', 'japheth', 'cloak'].map((id) => fadeOut(id, 10.5)),
        pose('shem', 'idle', 12.5),
        pose('japheth', 'idle', 12.5),
      ),
      say('Even Noah, who walked with God, was not without sin. Only one man would ever be without sin, and he would come from the line of Shem.', fadeOut('ham')),
      verse('GEN 9:29', camera({ zoom: 0.98 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: theRainbowCovenantSet, scenes }
