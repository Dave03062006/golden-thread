import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 1 · "Let My People Go" (Exodus 5:1–5; 6:1–9; 7:8–13), from the approved Level 8
 * script.
 *
 * Moses and Aaron stand before Pharaoh with God's word: "Let my people go." Pharaoh refuses:
 * "Who is the LORD?" At evening, God speaks his promises to Moses, and the player catches
 * them as they fall like stars ("God's promises", minigames/gods-promises): I will bring you
 * out, I will deliver you, I will redeem you, I will take you for my people, I will be your
 * God, I will bring you into the land. Before Pharaoh again, Aaron's rod becomes a serpent
 * and swallows the magicians' rods. The rod in Moses' hand glows: this episode's golden
 * thread, "If the Son makes you free, you will be free indeed."
 */

/** God's promises (Exodus 6:6–8), where each starts to fall, and where it shines once caught. */
export const PROMISES = [
  { text: 'I will bring you out', x: 0.32 },
  { text: 'I will deliver you', x: 0.62 },
  { text: 'I will redeem you', x: 0.44 },
  { text: 'I will take you for my people', x: 0.74 },
  { text: 'I will be your God', x: 0.26 },
  { text: 'I will bring you into the land', x: 0.56 },
].map((p, i) => ({ ...p, id: `promise-${i + 1}`, held: { x: 0.3 + i * 0.08, y: 0.2 + Math.abs(i - 2.5) * 0.035 } }))
/** Where the promises start, where Moses' hands catch them, and the way he can walk. */
export const FALL = { from: 0.1, hands: 0.56, gone: 0.7 }
export const MOSES = { y: 0.745, from: 0.5, left: 0.15, right: 0.85 }

const ABOVE = 'pharaoh-hall'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const HALL = ['throne', 'pharaoh', 'official-1', 'official-2', 'magician-1', 'magician-2', 'aaron', 'aarons-rod']

export const pharaohSet: SceneDescription = {
  id: 'l08-before-pharaoh',
  title: 'Before Pharaoh',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'goshen-fields', depth: 0.3, opacity: 0 },
    { id: 'pharaoh-hall', depth: 0.3 },
  ],
  actors: [
    // Pharaoh's hall: the throne, his officials, his magicians.
    { id: 'throne', prop: 'throne', above: ABOVE, x: 0.74, y: 0.79, size: 0.06 },
    person('pharaoh', 'pharaoh', 0.74, { pose: 'kneel' }),
    person('official-1', 'steward', 0.86),
    person('official-2', 'butler', 0.93),
    person('magician-1', 'magician', 0.62, { opacity: 0 }),
    person('magician-2', 'magician', 0.68, { opacity: 0 }),
    // The serpents: Aaron's, and the two the magicians make.
    ...['serpent', 'serpent-1', 'serpent-2'].map((id, i): SceneActor => ({ id, prop: 'serpent', above: ABOVE, x: [0.44, 0.58, 0.64][i]!, y: 0.8, size: 0.055, pose: 'ground', facing: i ? -1 : 1, opacity: 0 })),
    // Moses and Aaron, with their rods; the glow of Moses' rod is the golden thread.
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.318, y: 0.785, size: 0.012 },
    { id: 'rod-glow', prop: 'halo', above: ABOVE, x: 0.318, y: 0.68, size: 0.07, opacity: 0 },
    person('moses', 'moses-shepherd', 0.3, { facing: 1 }),
    { id: 'aarons-rod', prop: 'staff', above: ABOVE, x: 0.398, y: 0.785, size: 0.012 },
    person('aaron', 'aaron', 0.38, { facing: 1 }),
    // God's promises, falling like stars, and the glow at Moses' hands.
    ...PROMISES.map((p): SceneActor => ({ id: p.id, prop: 'counted-star', above: ABOVE, x: p.x, y: FALL.from, size: 0.03, opacity: 0 })),
    { id: 'hands-glow', prop: 'halo', above: ABOVE, x: MOSES.from, y: FALL.hands, size: 0.06, opacity: 0 },
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
/** Moses and his rod (and its glow) move together. */
const mosesAt = (x: number, y: number, extra: { facing?: -1 | 1 } = {}) => [actor('moses', { x, y, ...extra }, { seconds: 0.1 }), actor('rod', { x: x + 0.018, y }, { seconds: 0.1 }), actor('rod-glow', { x: x + 0.018, y: y - 0.105 }, { seconds: 0.1 })]

const scenes: StoryScene[] = [
  {
    id: 'l08-e1-s1',
    title: 'Before Pharaoh',
    music: 'go-down-moses',
    beats: [
      say('Moses and Aaron came back to Egypt, and went to the most powerful man in the world.', fadeIn('rod-glow', 0.5, 0.9), camera({ zoom: 1.02 }, slow)),
      verse('EXO 5:1', actor('aaron', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), actor('aaron', { pose: 'idle' }, { seconds: 0.8, delay: 5 })),
      verse('EXO 5:2', actor('pharaoh', { pose: 'lift' }, { seconds: 0.8 }), camera({ zoom: 1.03, x: 0.03 }, slow)),
      verse('EXO 5:4', actor('pharaoh', { pose: 'kneel' }, { seconds: 0.8, delay: 3 }), camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l08-e1-s2',
    title: '“I am the LORD”',
    music: 'go-down-moses',
    beats: [
      verse(
        'EXO 6:2',
        // Evening in Goshen: Moses alone under the first stars.
        ...[...HALL, 'rod-glow'].map((id) => fadeOut(id)),
        ...swap('pharaoh-hall', 'goshen-fields', 1),
        ...swap('forest-sky', 'evening-sky', 1),
        ...mosesAt(MOSES.from, MOSES.y, { facing: 1 }),
        actor('moses', { pose: 'lift' }, { seconds: 1, delay: 3 }),
      ),
      verse('EXO 6:6', ...swap('evening-sky', 'night-sky', 0.5), actor('moses', { pose: 'idle' }, { seconds: 1 })),
      verse('EXO 6:7', fadeIn('hands-glow', 0.5, 0.5)),
      play('gods-promises', {
        done: [
          actor('moses', { x: MOSES.from, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
          actor('rod', { x: MOSES.from + 0.018 }, { seconds: 0.5 }),
          actor('hands-glow', { x: MOSES.from, opacity: 0 }, { seconds: 0.5 }),
          ...PROMISES.map((p) => actor(p.id, { ...p.held, opacity: 1 }, { seconds: 0.5 })),
        ],
      }),
      verse('EXO 6:9', ...PROMISES.map((p, i) => fadeOut(p.id, 2 + i * 0.2)), actor('moses', { pose: 'sit' }, { seconds: 1.5, delay: 1 })),
    ],
  },
  {
    id: 'l08-e1-s3',
    title: 'Aaron’s rod',
    music: 'go-down-moses',
    beats: [
      verse(
        'EXO 7:10',
        // Back before Pharaoh: Aaron casts down his rod, and it becomes a serpent.
        ...swap('goshen-fields', 'pharaoh-hall'),
        ...swap('night-sky', 'forest-sky'),
        actor('moses', { pose: 'idle' }, { seconds: 0.5 }),
        ...mosesAt(0.3, 0.785, { facing: 1 }),
        ...['throne', 'pharaoh', 'official-1', 'official-2', 'aaron', 'aarons-rod'].map((id) => fadeIn(id, 1.5)),
        actor('aaron', { pose: 'carry' }, { seconds: 0.6, delay: 4 }),
        actor('aarons-rod', { opacity: 0 }, { seconds: 0.4, delay: 4.4 }),
        fadeIn('serpent', 4.4),
      ),
      verse('EXO 7:11', fadeIn('magician-1', 0.5), fadeIn('magician-2', 0.8), actor('magician-1', { pose: 'carry' }, { seconds: 0.6, delay: 3 })),
      verse(
        'EXO 7:12',
        // Their rods become serpents too; then Aaron's swallows them up.
        fadeIn('serpent-1', 0.3),
        fadeIn('serpent-2', 0.6),
        actor('serpent', { x: 0.56 }, { seconds: 2.5, ease: 'inOutSine', delay: 2.5 }),
        fadeOut('serpent-1', 4),
        fadeOut('serpent-2', 4.3),
      ),
      verse(
        'EXO 7:13',
        // The serpent is a rod in Aaron's hand again; Pharaoh turns away.
        fadeOut('serpent'),
        actor('aarons-rod', { opacity: 1 }, { seconds: 0.6, delay: 1.5 }),
        actor('aaron', { pose: 'idle' }, { seconds: 0.6, delay: 1.5 }),
        actor('pharaoh', { facing: 1 }, { seconds: 0.6, delay: 2 }),
        ...['magician-1', 'magician-2'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.5 })),
      ),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: pharaohSet, scenes }
