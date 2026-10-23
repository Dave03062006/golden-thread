import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The First Nine Plagues (Exodus 7:14–10:29), from the approved Level 8 script.
 *
 * Moses strikes the Nile with his rod, and its water turns to blood; the river glows (this
 * episode's golden thread: at Cana, Jesus' first sign turns water into wine). Then frogs,
 * gnats and flies, though not over Goshen; sickness, hail and locusts; then darkness over
 * Egypt, and light in the homes of Israel. The player puts the nine plagues in the order
 * they came ("the plagues in order", minigames/the-plagues-in-order). Each time Pharaoh
 * promises, and each time he hardens his heart, until he sends Moses away for good.
 */

/** The nine plagues, in order, with a word about each (see the plague-sign prop's poses). */
export const PLAGUES = [
  { id: 'blood', name: 'Blood', word: 'The Nile turned to blood.' },
  { id: 'frogs', name: 'Frogs', word: 'Frogs came up out of the river and filled the land.' },
  { id: 'gnats', name: 'Gnats', word: 'The dust became gnats. “This is the finger of God.”' },
  { id: 'flies', name: 'Flies', word: 'Swarms of flies, but none in Goshen.' },
  { id: 'cattle', name: 'Sick cattle', word: 'The cattle of Egypt fell sick, but not one of Israel’s.' },
  { id: 'boils', name: 'Boils', word: 'Sores broke out on people and animals.' },
  { id: 'hail', name: 'Hail', word: 'A storm of hail and fire, but none in Goshen.' },
  { id: 'locusts', name: 'Locusts', word: 'Locusts ate every green thing that was left.' },
  { id: 'darkness', name: 'Darkness', word: 'Three days of darkness, but light where Israel lived.' },
] as const
/** Where the plagues' pictures show while the player orders them. */
export const SIGN_AT = { x: 0.64, y: 0.42 }

const ABOVE = 'darkness'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const RIVERSIDE = ['pharaoh', 'servant', 'aaron', 'aarons-rod', 'river-glow']

export const plaguesSet: SceneDescription = {
  id: 'l08-plagues',
  title: 'The plagues',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'gray-sky', depth: 0, opacity: 0 },
    { id: 'nile-reeds', depth: 0.3 },
    { id: 'blood-nile', depth: 0.3, opacity: 0 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3, opacity: 0 },
    { id: 'darkness', depth: 0, opacity: 0 },
  ],
  actors: [
    // The river, and its glow: the golden thread.
    { id: 'river-glow', prop: 'halo', above: ABOVE, x: 0.62, y: 0.68, size: 0.16, opacity: 0 },
    // The plagues.
    { id: 'frogs', prop: 'frog', above: ABOVE, x: 0.5, y: 0.765, size: 0.03, opacity: 0, group: { count: 11, w: 0.92, h: 0.04, seed: 141, bob: 0.003 } },
    { id: 'swarm', prop: 'swarm', above: ABOVE, x: 0.5, y: 0.45, size: 0.5, pose: 'gnats', opacity: 0 },
    { id: 'hail', prop: 'rain', above: ABOVE, x: 0.5, y: 0.5, size: 1.1, opacity: 0 },
    { id: 'plague-sign', prop: 'plague-sign', above: ABOVE, ...SIGN_AT, size: 0.14, pose: 'blood', opacity: 0 },
    // Goshen: the tents of Israel, and the light in them.
    ...[0.2, 0.5, 0.8].flatMap((x, i): SceneActor[] => [
      { id: `tent-${i + 1}`, prop: 'striped-tent', above: ABOVE, x, y: 0.735, size: 0.11, pose: 'open', opacity: 0 },
      { id: `tent-light-${i + 1}`, prop: 'halo', above: ABOVE, x, y: 0.68, size: 0.1, opacity: 0 },
    ]),
    // Pharaoh and his servant, Moses and Aaron with their rods; the lamp in the dark hall.
    { id: 'lamp', prop: 'halo', above: ABOVE, x: 0.62, y: 0.62, size: 0.12, opacity: 0 },
    person('pharaoh', 'pharaoh', 1.1),
    person('servant', 'steward', 1.18),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.318, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.3, { facing: 1 }),
    { id: 'aarons-rod', prop: 'staff', above: ABOVE, x: 0.238, y: 0.785, size: 0.012 },
    person('aaron', 'aaron', 0.22, { facing: 1 }),
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
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const walkTo = (id: string, x: number, delay = 0, seconds = 4, facing: -1 | 1 = x < 0.5 ? -1 : 1) => [actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay }), actor(id, { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds })]
const TENTS = [1, 2, 3].flatMap((i) => [`tent-${i}`, `tent-light-${i}`])

const scenes: StoryScene[] = [
  {
    id: 'l08-e3-s1',
    title: 'The river turns to blood',
    music: 'mozart-dies-irae',
    beats: [
      verse('EXO 7:16', ...walkTo('pharaoh', 0.74, 0.3, 4, -1), ...walkTo('servant', 0.84, 0.6, 4, -1), fadeIn('river-glow', 0.5, 0.85)),
      verse(
        'EXO 7:20',
        // Moses lifts the rod over the river, and its water turns red from bank to bank.
        actor('moses', { pose: 'lift' }, { seconds: 0.8 }),
        actor('rod', { opacity: 0 }, { seconds: 0.3 }),
        ...swap('nile-reeds', 'blood-nile', 1.5),
      ),
      verse('EXO 7:21', actor('moses', { pose: 'idle' }, { seconds: 0.8 }), actor('rod', { opacity: 1 }, { seconds: 0.3 }), camera({ zoom: 1.03, x: 0.02 }, slow)),
      verse('EXO 7:23', ...walkTo('pharaoh', 1.12, 0.5, 4, 1), ...walkTo('servant', 1.2, 0.8, 4, 1), camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l08-e3-s2',
    title: 'Frogs, gnats and flies',
    music: 'mozart-dies-irae',
    beats: [
      say(
        'Then God sent frogs. They came up out of the river and filled the land: the houses, the beds, even the ovens.',
        // Frogs everywhere, even in Pharaoh's hall.
        ...RIVERSIDE.map((id) => fadeOut(id)),
        ...swap('blood-nile', 'pharaoh-hall', 1),
        actor('pharaoh', { x: 0.74, pose: 'idle', facing: -1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('pharaoh', 2),
        fadeIn('frogs', 3),
      ),
      verse('EXO 8:6', actor('aaron', { pose: 'lift' }, { seconds: 0.8 }), fadeIn('aaron', 0.5), fadeIn('aarons-rod', 0.5)),
      say(
        'Then the dust became gnats. Pharaoh’s magicians tried to do the same, and could not.',
        actor('aaron', { pose: 'idle' }, { seconds: 0.8 }),
        fadeOut('frogs'),
        fadeIn('swarm', 1, 0.9),
      ),
      verse('EXO 8:19', actor('pharaoh', { pose: 'lift' }, { seconds: 0.8 }), actor('pharaoh', { facing: 1 }, { seconds: 0.5, delay: 4 })),
      verse(
        'EXO 8:22',
        // Swarms of flies over Egypt, but the green fields of Goshen are clear.
        actor('swarm', { pose: 'flies' }, { seconds: 0.5 }),
        fadeOut('swarm', 3),
        ...['pharaoh', 'aaron', 'aarons-rod'].map((id) => fadeOut(id, 3)),
        ...swap('pharaoh-hall', 'goshen-fields', 3.5),
        ...TENTS.filter((id) => id.startsWith('tent-') && !id.includes('light')).map((id) => fadeIn(id, 5)),
      ),
    ],
  },
  {
    id: 'l08-e3-s3',
    title: 'Sickness, hail, locusts and darkness',
    music: 'mozart-dies-irae',
    beats: [
      say(
        'Again and again, Pharaoh promised to let the people go, and again and again he hardened his heart. The cattle of Egypt fell sick; boils broke out on people and animals; a storm of hail and fire flattened the fields; locusts ate every green thing that was left.',
        // Over Egypt: hail out of a gray sky, then the locusts.
        ...TENTS.map((id) => fadeOut(id)),
        ...swap('goshen-fields', 'nile-reeds', 0.5),
        ...swap('forest-sky', 'gray-sky', 0.5),
        fadeIn('hail', 2, 0.8),
        fadeOut('hail', 6),
        actor('swarm', { pose: 'locusts' }, { seconds: 0.1, delay: 6 }),
        fadeIn('swarm', 7, 0.9),
      ),
      play('the-plagues-in-order', {
        cues: [fadeOut('swarm')],
        done: [actor('plague-sign', { pose: 'darkness', opacity: 0 }, { seconds: 0.5 })],
      }),
      verse(
        'EXO 10:22',
        // Darkness over all the land.
        fadeIn('moses', 0.1),
        actor('moses', { x: 0.5, pose: 'lift', facing: 1 }, { seconds: 0.1 }),
        actor('rod', { x: 0.518 }, { seconds: 0.1 }),
        layer('darkness', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        fadeOut('moses', 4),
        fadeOut('rod', 4),
      ),
      verse(
        'EXO 10:23',
        // But in the homes of Israel, there is light.
        layer('nile-reeds', { opacity: 0 }, { seconds: 0.1 }),
        layer('goshen-fields', { opacity: 1 }, { seconds: 0.1 }),
        ...TENTS.map((id) => fadeIn(id, 0.5, id.includes('light') ? 0.9 : 0.6)),
      ),
    ],
  },
  {
    id: 'l08-e3-s4',
    title: 'A hardened heart',
    music: 'mozart-dies-irae',
    beats: [
      verse(
        'EXO 9:27',
        // Pharaoh in his darkened hall, a single lamp beside him, and Moses before him.
        ...TENTS.map((id) => fadeOut(id)),
        layer('goshen-fields', { opacity: 0 }, { seconds: 0.1, delay: 2 }),
        layer('pharaoh-hall', { opacity: 1 }, { seconds: 0.1, delay: 2 }),
        actor('pharaoh', { x: 0.66, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 2 }),
        actor('moses', { x: 0.42, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 2 }),
        actor('rod', { x: 0.438 }, { seconds: 0.1, delay: 2 }),
        fadeIn('lamp', 2.5, 0.8),
        ...['pharaoh', 'moses', 'rod'].map((id) => fadeIn(id, 2.5)),
      ),
      say('But each time the plague stopped, Pharaoh changed his mind. His heart grew harder and harder.', actor('pharaoh', { facing: 1 }, { seconds: 0.5, delay: 1 })),
      verse('EXO 10:28', actor('pharaoh', { pose: 'lift', facing: -1 }, { seconds: 0.8 })),
      verse('EXO 10:29', actor('pharaoh', { pose: 'kneel' }, { seconds: 0.8 }), ...walkTo('moses', -0.1, 1.5, 4, -1), actor('rod', { x: -0.082 }, { seconds: 4, ease: 'inOutSine', delay: 1.5 })),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: plaguesSet, scenes }
