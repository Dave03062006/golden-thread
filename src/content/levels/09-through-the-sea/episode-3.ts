import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Song of Moses and Miriam (Exodus 15:1–21), from the approved Level 9 script.
 *
 * On the far shore in the morning, Moses and the people sing to the LORD, who has triumphed
 * gloriously. Then Miriam the prophetess takes a timbrel, which glows (this episode's golden
 * thread: in heaven the saints "sing the song of Moses… and the song of the Lamb"), and the
 * women go out after her with timbrels and dancing. The player answers her timbrel, phrase by
 * phrase ("Miriam's song", minigames/miriams-song), until the whole shore is singing. At
 * evening, the song looks ahead: "The LORD will reign for ever and ever."
 */

/** The phrases Miriam plays, as beats from the first, and the words of her song each one brings. */
export const PHRASES = [
  { beats: [0, 1, 2], words: '“Sing to the LORD,”' },
  { beats: [0, 1, 2, 3], words: '“for he has triumphed gloriously;”' },
  { beats: [0, 1, 1.5, 2], words: '“the horse and his rider”' },
  { beats: [0, 0.5, 1, 2, 3], words: '“he has thrown into the sea.”' },
]
/** The women who join the dance, a group with each phrase answered. */
export const DANCERS = ['dancers-1', 'dancers-2', 'dancers-3', 'dancers-4']
/** Where Miriam stands with her timbrel. */
export const MIRIAM = { x: 0.32, timbrel: 0.336, y: 0.575 }

const ABOVE = 'red-sea-shore'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const songSet: SceneDescription = {
  id: 'l09-the-song',
  title: 'The song of the sea',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'red-sea-shore', depth: 0.3 },
  ],
  actors: [
    // The people on the shore, Moses before them.
    person('people', 'hebrew-family', 0.5, { size: 0.12 }),
    person('more-people', 'hebrew-workers', 0.68, { size: 0.12 }),
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.88, y: 0.8, size: 0.026, group: { count: 5, w: 0.1, h: 0.012, seed: 211, bob: 0.002 } },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.282, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.3, { facing: 1 }),
    // Miriam with her timbrel, its glow (the golden thread), and the pulse of each beat she plays.
    person('miriam', 'miriam-old', MIRIAM.x, { facing: 1, opacity: 0 }),
    { id: 'timbrel', prop: 'hand-drum', above: ABOVE, x: MIRIAM.timbrel, y: MIRIAM.y, size: 0.018, opacity: 0 },
    { id: 'timbrel-glow', prop: 'halo', above: ABOVE, x: MIRIAM.timbrel, y: MIRIAM.y - 0.02, size: 0.07, opacity: 0 },
    { id: 'miriam-beat', prop: 'halo', above: ABOVE, x: MIRIAM.timbrel, y: MIRIAM.y - 0.02, size: 0.05, opacity: 0 },
    // The women who answer her and dance, and the pulse of the player's answer.
    ...DANCERS.map((id, i) => person(id, 'hebrew-women', 0.48 + i * 0.13, { size: 0.12, pose: 'walk', facing: i % 2 ? -1 : 1, opacity: 0 })),
    { id: 'answer-beat', prop: 'halo', above: ABOVE, x: 0.6, y: 0.66, size: 0.09, opacity: 0 },
    // At evening, the pillar of fire over the camp.
    { id: 'pillar', prop: 'pillar', above: ABOVE, x: 0.9, y: 0.66, size: 0.05, pose: 'fire', opacity: 0 },
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
    id: 'l09-e3-s1',
    title: '“I will sing to the LORD”',
    music: 'charpentier-te-deum',
    beats: [
      say('On the far shore, the people sang. Their song is one of the oldest in the whole Bible.', ...swap('dawn-sky', 'forest-sky', 0.5)),
      verse('EXO 15:1', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 15:2', actor('people', { pose: 'walk' }, { seconds: 0.4, delay: 1 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 2 })),
      verse('EXO 15:11', actor('moses', { pose: 'pray' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e3-s2',
    title: 'Miriam’s timbrel',
    music: 'charpentier-te-deum',
    beats: [
      verse(
        'EXO 15:20',
        // Miriam steps out with her timbrel, which glows; the people make room.
        actor('moses', { x: 0.12, pose: 'idle' }, { seconds: 0.1 }),
        actor('rod', { x: 0.102 }, { seconds: 0.1 }),
        actor('people', { x: 0.16 }, { seconds: 0.1 }),
        ...['more-people', 'flock'].map((id) => fadeOut(id)),
        fadeIn('miriam', 0.5),
        actor('miriam', { pose: 'lift' }, { seconds: 0.6, delay: 1.5 }),
        fadeIn('timbrel', 2),
        fadeIn('timbrel-glow', 2, 0.85),
      ),
      play('miriams-song', { done: [...DANCERS.map((id) => actor(id, { opacity: 1 }, { seconds: 0.5 })), actor('miriam-beat', { opacity: 0 }, { seconds: 0.5 }), actor('answer-beat', { opacity: 0 }, { seconds: 0.5 })] }),
      verse('EXO 15:21', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l09-e3-s3',
    title: '“The LORD will reign”',
    music: 'charpentier-te-deum',
    beats: [
      verse(
        'EXO 15:13',
        // Evening: the camp by the sea, the pillar of fire over it.
        camera({ zoom: 1 }, slow),
        ...swap('forest-sky', 'evening-sky', 0.5),
        ...[...DANCERS, 'miriam', 'timbrel', 'timbrel-glow', 'people', 'moses', 'rod'].map((id) => fadeOut(id, 1)),
        actor('people', { x: 0.5 }, { seconds: 0.1, delay: 3 }),
        actor('more-people', { x: 0.68 }, { seconds: 0.1, delay: 3 }),
        actor('moses', { x: 0.3 }, { seconds: 0.1, delay: 3 }),
        actor('rod', { x: 0.282 }, { seconds: 0.1, delay: 3 }),
        ...['people', 'more-people', 'flock', 'moses', 'rod'].map((id) => fadeIn(id, 3.2)),
        fadeIn('pillar', 2),
      ),
      verse('EXO 15:17', camera({ zoom: 1.02, y: -0.01 }, slow)),
      verse('EXO 15:18', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: songSet, scenes }
