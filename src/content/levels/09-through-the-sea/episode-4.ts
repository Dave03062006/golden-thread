import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · Manna and Quail (Exodus 15:22–16:36), from the approved Level 9 script.
 *
 * Three days into the wilderness the water at Marah is bitter, and the LORD shows Moses a
 * tree that makes it sweet; then they camp at Elim, by twelve springs. In the wilderness of
 * Sin the people are hungry and grumble, and God rains bread from heaven: quails at evening,
 * and in the morning a fine white flake on the ground. "What is it?" The player gathers it for
 * one family, an omer for each ("enough for each", minigames/enough-for-each), and every jar
 * comes out exactly full. On the sixth day twice as much; on the seventh, rest. Aaron keeps a
 * jar of manna before the LORD, and it glows (this episode's golden thread: "I am the living
 * bread which came down from heaven").
 */

/** The patches of manna on the ground, as fractions of the frame. */
export const MANNA = [
  [0.34, 0.66],
  [0.42, 0.72],
  [0.5, 0.64],
  [0.57, 0.71],
  [0.64, 0.65],
  [0.7, 0.73],
  [0.77, 0.66],
  [0.84, 0.72],
  [0.9, 0.64],
  [0.46, 0.68],
].map(([x, y], i) => ({ id: `manna-${i + 1}`, x: x!, y: y! }))
/** The family of six and their jars, an omer for each, and the heaped jars of the sixth day. */
export const FAMILY = [
  { id: 'grandmother', prop: 'grandmother' },
  { id: 'father', prop: 'hebrew-father' },
  { id: 'mother', prop: 'hebrew-mother' },
  { id: 'son', prop: 'boy' },
  { id: 'daughter', prop: 'girl' },
  { id: 'little-son', prop: 'boy' },
].map((f, i) => ({ ...f, x: 0.06 + i * 0.036, jar: `jar-${i + 1}`, full: `jar-full-${i + 1}`, heaped: `jar-heaped-${i + 1}` }))
export const JAR_Y = 0.795

const ABOVE = 'elim-oasis'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const MARAH = ['pool', 'wood', 'people', 'more-people', 'moses', 'rod']
const HUNGRY = ['tent-1', 'tent-2', 'tent-3', 'boy', 'girl', 'aaron']
const GATHERING = [...FAMILY.flatMap((f) => [f.id, f.jar]), 'family-tent']

export const mannaSet: SceneDescription = {
  id: 'l09-manna',
  title: 'Bread from heaven',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'desert', depth: 0.3 },
    { id: 'elim-oasis', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Marah: the bitter pool, the piece of wood, the thirsty people, Moses.
    { id: 'pool', prop: 'pool', above: ABOVE, x: 0.62, y: 0.745, size: 0.16 },
    { id: 'wood', prop: 'wood-bundle', above: ABOVE, x: 0.5, y: 0.785, size: 0.03, opacity: 0 },
    person('people', 'hebrew-family', 0.24, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.86, { size: 0.12 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.428, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.41, { facing: 1 }),
    // The wilderness of Sin: tents, hungry children, Aaron.
    ...[0.14, 0.7, 0.86].map((x, i): SceneActor => ({ id: `tent-${i + 1}`, prop: 'striped-tent', above: ABOVE, x, y: 0.75, size: 0.1, pose: 'open', facing: i % 2 ? 1 : -1, opacity: 0 })),
    person('boy', 'boy', 0.56, { size: 0.026, y: 0.79, opacity: 0 }),
    person('girl', 'girl', 0.6, { size: 0.026, y: 0.79, opacity: 0 }),
    person('aaron', 'aaron', 0.48, { facing: 1, opacity: 0 }),
    // Quails at evening.
    { id: 'quails', prop: 'bird', above: ABOVE, x: 0.55, y: 0.3, size: 0.02, opacity: 0, group: { count: 12, w: 0.7, h: 0.14, seed: 221, bob: 0.008 } },
    // The morning's manna; one family, their tent, and their jars, empty, full, and heaped.
    ...MANNA.map((m): SceneActor => ({ id: m.id, prop: 'manna', above: ABOVE, x: m.x, y: m.y, size: 0.05, opacity: 0 })),
    { id: 'family-tent', prop: 'striped-tent', above: ABOVE, x: 0.15, y: 0.73, size: 0.1, pose: 'open', opacity: 0 },
    ...FAMILY.map((f): SceneActor => person(f.id, f.prop, f.x, { facing: 1, y: 0.765, opacity: 0, ...(f.prop === 'boy' || f.prop === 'girl' ? { size: 0.026, y: 0.77 } : {}) })),
    ...FAMILY.flatMap((f): SceneActor[] => [
      { id: f.jar, prop: 'omer-jar', above: ABOVE, x: f.x, y: JAR_Y, size: 0.022, pose: 'empty', opacity: 0 },
      { id: f.full, prop: 'omer-jar', above: ABOVE, x: f.x, y: JAR_Y, size: 0.022, pose: 'full', opacity: 0 },
      { id: f.heaped, prop: 'omer-jar', above: ABOVE, x: f.x, y: JAR_Y, size: 0.022, pose: 'heaped', opacity: 0 },
    ]),
    // The jar of manna kept before the LORD, which glows: the golden thread.
    { id: 'kept-jar', prop: 'omer-jar', above: ABOVE, x: 0.5, y: 0.75, size: 0.03, pose: 'full', opacity: 0 },
    { id: 'jar-glow', prop: 'halo', above: ABOVE, x: 0.5, y: 0.7, size: 0.08, opacity: 0 },
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

const scenes: StoryScene[] = [
  {
    id: 'l09-e4-s1',
    title: 'Bitter water',
    music: 'franck-panis-angelicus',
    beats: [
      verse('EXO 15:22', camera({ zoom: 1.02 }, slow), actor('people', { x: 0.3, pose: 'walk' }, { seconds: 3, ease: 'inOutSine' }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('EXO 15:23', actor('more-people', { facing: 1 }, { seconds: 0.4, delay: 1 }), actor('more-people', { facing: -1 }, { seconds: 0.4, delay: 3 })),
      verse('EXO 15:25', actor('moses', { pose: 'pray' }, { seconds: 0.8 }), fadeIn('wood', 2), actor('moses', { pose: 'carry' }, { seconds: 0.6, delay: 3 }), actor('wood', { x: 0.6, y: 0.745 }, { seconds: 1.2, ease: 'inOutSine', delay: 3.4 }), fadeOut('wood', 4.6), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 4.6 })),
      verse(
        'EXO 15:27',
        // Elim: palms and springs, the camp in the shade.
        camera({ zoom: 1 }, slow),
        ...MARAH.map((id) => fadeOut(id)),
        ...swap('desert', 'elim-oasis', 1),
        actor('people', { x: 0.36 }, { seconds: 0.1, delay: 2.5 }),
        actor('more-people', { x: 0.62 }, { seconds: 0.1, delay: 2.5 }),
        fadeIn('people', 3),
        fadeIn('more-people', 3),
      ),
    ],
  },
  {
    id: 'l09-e4-s2',
    title: 'Hungry in the wilderness',
    music: 'franck-panis-angelicus',
    beats: [
      verse(
        'EXO 16:2',
        // The wilderness of Sin: the tents, the hungry people, Moses and Aaron.
        ...['people', 'more-people'].map((id) => fadeOut(id)),
        ...swap('elim-oasis', 'desert', 1),
        actor('people', { x: 0.3 }, { seconds: 0.1, delay: 2.5 }),
        actor('more-people', { x: 0.74, facing: -1 }, { seconds: 0.1, delay: 2.5 }),
        actor('moses', { x: 0.42, facing: 1 }, { seconds: 0.1, delay: 2.5 }),
        actor('rod', { x: 0.438 }, { seconds: 0.1, delay: 2.5 }),
        ...['people', 'more-people', 'moses', 'rod', ...HUNGRY].map((id) => fadeIn(id, 3)),
      ),
      verse('EXO 16:3', actor('more-people', { x: 0.66, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('more-people', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('EXO 16:4', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02, y: -0.01 }, slow)),
    ],
  },
  {
    id: 'l09-e4-s3',
    title: '“What is it?”',
    music: 'franck-panis-angelicus',
    beats: [
      verse('EXO 16:13', camera({ zoom: 1, y: 0 }, slow), actor('moses', { pose: 'idle' }, { seconds: 0.6 }), ...swap('forest-sky', 'evening-sky'), fadeIn('quails', 1), actor('quails', { y: 0.7 }, { seconds: 4, ease: 'inOutSine', delay: 1.5 }), fadeOut('quails', 5)),
      verse(
        'EXO 16:14',
        // Morning: the dew lifts, and the ground is white with manna.
        ...swap('evening-sky', 'dawn-sky'),
        ...MANNA.map((m, i) => fadeIn(m.id, 1.5 + i * 0.15)),
      ),
      verse('EXO 16:15', actor('boy', { x: 0.5, pose: 'walk' }, { seconds: 2, ease: 'inOutSine' }), actor('boy', { pose: 'idle' }, { seconds: 0.4, delay: 2 }), actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 3 })),
      verse(
        'EXO 16:16',
        // One family before their tent, with a jar for each.
        actor('moses', { pose: 'idle' }, { seconds: 0.8 }),
        ...['people', 'more-people', 'moses', 'rod', ...HUNGRY].map((id) => fadeOut(id, 1)),
        ...GATHERING.map((id) => fadeIn(id, 2.5)),
      ),
      play('enough-for-each', {
        done: [...MANNA.map((m) => actor(m.id, { opacity: 0 }, { seconds: 0.5 })), ...FAMILY.flatMap((f) => [actor(f.full, { opacity: 1 }, { seconds: 0.5 }), actor(f.heaped, { opacity: 1 }, { seconds: 0.5 })])],
      }),
      verse('EXO 16:18', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l09-e4-s4',
    title: 'Bread from heaven',
    music: 'franck-panis-angelicus',
    beats: [
      verse(
        'EXO 16:21',
        // The jar of manna, which will be kept before the LORD, glows.
        camera({ zoom: 1 }, slow),
        ...[...GATHERING, ...FAMILY.flatMap((f) => [f.full, f.heaped])].map((id) => fadeOut(id)),
        fadeIn('kept-jar', 0.5),
        fadeIn('jar-glow', 0.5, 0.85),
        ...['people', 'more-people', 'tent-1', 'tent-2', 'tent-3'].map((id) => fadeIn(id, 2)),
      ),
      say('On the sixth day God gave twice as much, so that on the seventh day, the sabbath, the whole people could rest.', ...swap('dawn-sky', 'forest-sky')),
      verse('EXO 16:31', camera({ zoom: 1.02 }, slow)),
      verse('EXO 16:33', actor('aaron', { x: 0.44, facing: 1 }, { seconds: 0.1 }), fadeIn('aaron'), actor('aaron', { pose: 'pray' }, { seconds: 0.8, delay: 2 })),
      verse('EXO 16:35', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: mannaSet, scenes }
