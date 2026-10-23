import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · The Night of Departure (Exodus 12:29–42; 13:17–22), from the approved Level 8
 * script.
 *
 * At midnight the firstborn of Egypt die, as God had warned (told gently; nothing is shown),
 * but the houses marked with the blood are safe. Pharaoh calls Moses by night: "Go!" The
 * people set out in haste by moonlight, their dough unleavened in their kneading bowls, and
 * the player keeps the march to the beat of the drum ("the march out of Egypt",
 * minigames/the-march-out), more families joining with every step in time. After four
 * hundred and thirty years they are free, and the LORD goes before them in a pillar of cloud
 * and fire, which glows (this episode's golden thread: Jesus' own "exodus").
 */

/** The groups that join the march, one with each step in time: who they are, and where they walk. */
export const MARCHERS = [
  { prop: 'hebrew-family', size: 0.12, text: 'A father, a child on his shoulders.' },
  { prop: 'sheep', size: 0.024, text: 'A shepherd’s flock.' },
  { prop: 'hebrew-workers', size: 0.15, text: 'The brick-makers, free at last.' },
  { prop: 'hebrew-family', size: 0.12, text: 'A mother with her kneading bowl.' },
  { prop: 'ox', size: 0.04, text: 'Herds of cattle.' },
  { prop: 'hebrew-workers', size: 0.15, text: 'A mixed multitude, going too.' },
  { prop: 'donkey', size: 0.034, text: 'Donkeys loaded with all they have.' },
  { prop: 'hebrew-family', size: 0.12, text: 'Grandparents, children, everyone.' },
].map((m, i) => ({ ...m, id: `march-${i + 1}`, x: 0.12 + i * 0.11 }))

const ABOVE = 'desert'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const departureSet: SceneDescription = {
  id: 'l08-departure',
  title: 'The night of departure',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'hebrew-quarter', depth: 0.3 },
    { id: 'pharaoh-hall', depth: 0.3, opacity: 0 },
    { id: 'desert', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The Hebrew street at midnight: every door marked, the lamps lit.
    ...[0.24, 0.38, 0.52, 0.66, 0.8].flatMap((x, i): SceneActor[] => [
      { id: `door-${i + 1}`, prop: 'blood-mark', above: ABOVE, x: x + 0.039, y: 0.66, size: 0.03, pose: 'lintel' },
      { id: `window-${i + 1}`, prop: 'halo', above: ABOVE, x, y: 0.555, size: 0.05, opacity: 0.85 },
    ]),
    // Pharaoh's palace by night.
    person('pharaoh', 'pharaoh', 0.68, { opacity: 0 }),
    // The march, and the beat of the drum.
    // The pillar of cloud and fire, far ahead on the horizon, behind the people going after it.
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: 0.88, y: 0.64, size: 0.07, pose: 'cloud', opacity: 0 },
    ...MARCHERS.map((m, i): SceneActor => ({ id: m.id, prop: m.prop, above: ABOVE, x: m.x, y: m.prop === 'sheep' ? 0.79 : 0.785, size: m.size, facing: 1, pose: 'walk', opacity: 0, ...(m.prop === 'sheep' || m.prop === 'ox' || m.prop === 'donkey' ? { group: { count: 3, w: 0.06, h: 0.01, seed: 161 + i, bob: 0.002 } } : {}) })),
    { id: 'drum', prop: 'halo', above: ABOVE, x: 0.5, y: 0.2, size: 0.08, opacity: 0 },
    // Moses and Aaron; an old man looking back.
    person('moses', 'moses-shepherd', 0.4, { facing: 1, opacity: 0 }),
    person('aaron', 'aaron', 0.32, { facing: 1, opacity: 0 }),
    person('old-man', 'elder', 0.5, { facing: 1, opacity: 0 }),
    // The pillar's glow: the golden thread.
    { id: 'pillar-glow', prop: 'halo', above: ABOVE, x: 0.88, y: 0.42, size: 0.14, opacity: 0 },
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
const STREET = [1, 2, 3, 4, 5].flatMap((i) => [`door-${i}`, `window-${i}`])

const scenes: StoryScene[] = [
  {
    id: 'l08-e5-s1',
    title: 'Midnight',
    music: 'handel-rejouissance',
    beats: [
      say('At midnight, as God had said, the firstborn of Egypt died. There was a great cry in the land. But in the houses marked with the blood of the lamb, God’s people were safe.', camera({ zoom: 1.02 }, slow)),
      verse(
        'EXO 12:31',
        // Pharaoh, standing in the night, calls for Moses and Aaron.
        camera({ zoom: 1 }, slow),
        ...STREET.map((id) => fadeOut(id)),
        ...swap('hebrew-quarter', 'pharaoh-hall', 1),
        fadeIn('pharaoh', 2.5),
        fadeIn('moses', 2.5),
        fadeIn('aaron', 2.5),
        actor('pharaoh', { pose: 'lift' }, { seconds: 0.8, delay: 4 }),
      ),
      verse('EXO 12:32', actor('pharaoh', { pose: 'idle' }, { seconds: 0.8, delay: 3 }), actor('moses', { facing: -1 }, { seconds: 0.5, delay: 4 })),
    ],
  },
  {
    id: 'l08-e5-s2',
    title: 'In haste',
    music: 'handel-rejouissance',
    beats: [
      verse(
        'EXO 12:34',
        // By moonlight, out on the road: the first families set out.
        ...['pharaoh', 'moses', 'aaron'].map((id) => fadeOut(id)),
        ...swap('pharaoh-hall', 'desert', 1),
      ),
      verse('EXO 12:37', camera({ zoom: 1.02 }, slow)),
      play('the-march-out', {
        cues: [camera({ zoom: 1 }, slow)],
        done: [...MARCHERS.map((m) => actor(m.id, { opacity: 1 }, { seconds: 0.5 })), actor('drum', { opacity: 0 }, { seconds: 0.5 })],
      }),
      verse('EXO 12:38', camera({ zoom: 1.03, x: 0.02 }, slow)),
    ],
  },
  {
    id: 'l08-e5-s3',
    title: 'Four hundred and thirty years',
    music: 'handel-rejouissance',
    beats: [
      verse('EXO 12:40', camera({ zoom: 1, x: 0 }, slow), fadeIn('old-man', 0.5)),
      verse('EXO 12:41', actor('old-man', { facing: -1 }, { seconds: 0.6, delay: 1 }), actor('old-man', { facing: 1 }, { seconds: 0.6, delay: 4 })),
      verse('EXO 12:42', actor('old-man', { x: 0.62, pose: 'walk' }, { seconds: 5, ease: 'inOutSine' }), actor('old-man', { pose: 'idle' }, { seconds: 0.4, delay: 5 })),
    ],
  },
  {
    id: 'l08-e5-s4',
    title: 'The pillar of cloud and fire',
    music: 'handel-rejouissance',
    beats: [
      say(
        'God did not lead them the short way, along the coast, where they would meet war. He led them through the wilderness, toward the sea.',
        // Dawn in the wilderness, and ahead of the people a pillar of cloud.
        fadeOut('old-man'),
        layer('night-sky', { opacity: 0 }, { seconds: 4, ease: 'inOutSine' }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        fadeIn('pillar', 1),
        fadeIn('pillar-glow', 1, 0.9),
      ),
      verse('EXO 13:21', layer('dawn-sky', { opacity: 0 }, { seconds: 4, delay: 2 }), layer('evening-sky', { opacity: 1 }, { seconds: 4, delay: 2 }), actor('pillar', { pose: 'fire' }, { seconds: 2, delay: 4 })),
      verse('EXO 13:22', camera({ zoom: 1.03, x: 0.03 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: departureSet, scenes }
