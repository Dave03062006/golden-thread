import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · God's Glory Passes By (Exodus 33:18–23; 34:1–9, 28–35), from the approved
 * Level 10 script.
 *
 * "I pray thee, show me thy glory." God puts Moses in a cleft of the rock and covers him with
 * his hand while his glory passes by. Moses cuts two new tablets and climbs the mountain
 * again, and the LORD passes before him, proclaiming his name: the player follows the light
 * across the rock, and the words of God's name shine out ("the LORD passed by",
 * minigames/the-lord-passed-by). Moses comes down with the new tablets, his face shining,
 * and it glows (this episode's golden thread: "No one has ever seen God; the only Son… has
 * made him known").
 */

/** The words of God's name (Exodus 34:6–7), and where each shines out on the rock face. */
export const NAMES = ['merciful', 'gracious', 'slow to anger', 'abounding in steadfast love', 'and faithfulness', 'keeping steadfast love for thousands', 'forgiving iniquity and transgression and sin'].map((text, i) => ({
  text,
  id: `name-${i + 1}`,
  x: Math.round((0.3 + i * 0.1) * 100) / 100,
  y: Math.round((0.32 + (i % 2) * 0.12 + Math.abs(i - 3) * 0.02) * 100) / 100,
}))
/** Where the light of God's glory begins, and how far across the rock it can go. */
export const GLORY = { x: 0.18, y: 0.4, left: 0.16, right: 0.94, top: 0.22, bottom: 0.62 }

const ABOVE = 'horeb'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const glorySet: SceneDescription = {
  id: 'l10-glory',
  title: 'God’s glory passes by',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'sinai-summit', depth: 0.3 },
    { id: 'glory-rock', depth: 0.3, opacity: 0 },
    { id: 'horeb', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // On the mountain: the great rock with its cleft, Moses, and the new tablets.
    { id: 'rock', prop: 'great-rock', above: ABOVE, x: 0.3, y: 0.8, size: 0.2 },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.618, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.6),
    { id: 'tablets', prop: 'stone-tablets', above: ABOVE, x: 0.66, y: 0.79, size: 0.05, pose: 'blank', opacity: 0 },
    { id: 'cloud', prop: 'storm-cloud', above: ABOVE, x: 0.5, y: 0.2, size: 0.45, opacity: 0 },
    // In the cleft of the rock: Moses, the light of God's glory, and the words of his name.
    person('hidden-moses', 'moses-shepherd', 0.1, { size: 0.03, y: 0.8, facing: 1, opacity: 0 }),
    ...NAMES.map((n): SceneActor => ({ id: n.id, prop: 'halo', above: ABOVE, x: n.x, y: n.y, size: 0.06, opacity: 0 })),
    { id: 'glory', prop: 'halo', above: ABOVE, x: GLORY.x, y: GLORY.y, size: 0.16, opacity: 0 },
    // In the camp: the people, and Moses coming down with his face shining (the golden thread), then veiled.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.1, y: 0.75, size: 0.1, pose: 'open', opacity: 0 },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1, opacity: 0 },
    person('people', 'hebrew-family', 0.66, { size: 0.12, opacity: 0 }),
    person('aaron', 'aaron', 0.56, { opacity: 0 }),
    person('veiled-moses', 'moses-veiled', 0.36, { facing: 1, opacity: 0 }),
    { id: 'face-glow', prop: 'halo', above: ABOVE, x: 0.36, y: 0.6, size: 0.08, opacity: 0 },
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
const SUMMIT = ['rock', 'moses', 'rod', 'tablets', 'cloud']

const scenes: StoryScene[] = [
  {
    id: 'l10-e6-s1',
    title: '“Show me thy glory”',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('EXO 33:18', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), camera({ zoom: 1.02, y: -0.01 }, slow)),
      verse('EXO 33:19', actor('moses', { pose: 'idle' }, { seconds: 0.8 })),
      verse('EXO 33:20', camera({ zoom: 1, y: 0 }, slow)),
      verse('EXO 33:22', actor('moses', { x: 0.36, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 1 }), actor('rod', { x: 0.342 }, { seconds: 3, ease: 'inOutSine', delay: 1 }), actor('moses', { pose: 'idle', facing: 1 }, { seconds: 0.4, delay: 4 })),
    ],
  },
  {
    id: 'l10-e6-s2',
    title: 'New tablets',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse('EXO 34:1', fadeIn('tablets', 1), actor('moses', { x: 0.6, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }), actor('rod', { x: 0.618 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }), actor('moses', { pose: 'work', facing: 1 }, { seconds: 0.4, delay: 3.5 })),
      verse('EXO 34:4', ...swap('dawn-sky', 'forest-sky'), actor('moses', { pose: 'carry' }, { seconds: 0.6 })),
      verse('EXO 34:5', fadeIn('cloud', 0.5), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l10-e6-s3',
    title: 'The LORD passed by',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse(
        'EXO 34:6',
        // Moses in the cleft of the rock; the light of God's glory on the rock face.
        camera({ zoom: 1 }, slow),
        ...SUMMIT.map((id) => fadeOut(id)),
        ...swap('sinai-summit', 'glory-rock', 1),
        fadeIn('hidden-moses', 2.5),
        fadeIn('glory', 3, 0.9),
      ),
      play('the-lord-passed-by', {
        done: [...NAMES.map((n) => actor(n.id, { opacity: 0.85 }, { seconds: 0.5 })), actor('glory', { x: GLORY.right, y: GLORY.y, opacity: 0 }, { seconds: 0.5 })],
      }),
      verse('EXO 34:8', actor('hidden-moses', { pose: 'kneel' }, { seconds: 1, delay: 0.5 })),
      verse('EXO 34:9', ...NAMES.map((n, i) => fadeOut(n.id, 2 + i * 0.2))),
    ],
  },
  {
    id: 'l10-e6-s4',
    title: 'Moses’ face shone',
    music: 'handel-glory-of-the-lord',
    beats: [
      verse(
        'EXO 34:28',
        // The camp: Moses comes down with the new tablets, his face shining.
        fadeOut('hidden-moses'),
        ...swap('glory-rock', 'horeb', 0.5),
        actor('moses', { x: 0.36, y: 0.785, pose: 'carry', facing: 1 }, { seconds: 0.1 }),
        actor('rod', { x: 0.378, y: 0.785 }, { seconds: 0.1 }),
        actor('tablets', { x: 0.385, y: 0.69, pose: 'written' }, { seconds: 0.1 }),
        ...['moses', 'rod', 'tablets'].map((id) => fadeIn(id, 0.5)),
        fadeIn('face-glow', 0.5, 0.9),
        ...['tent-1', 'tent-2', 'people', 'aaron'].map((id) => fadeIn(id, 2)),
      ),
      verse('EXO 34:29', camera({ zoom: 1.02 }, slow)),
      verse('EXO 34:30', actor('people', { x: 0.74, pose: 'walk', facing: 1 }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('aaron', { x: 0.62, pose: 'walk', facing: 1 }, { seconds: 2, ease: 'inOutSine', delay: 1 }), ...['people', 'aaron'].map((id) => actor(id, { pose: 'idle', facing: -1 }, { seconds: 0.4, delay: 3 }))),
      verse('EXO 34:33', camera({ zoom: 1 }, slow), fadeOut('moses', 1), fadeIn('veiled-moses', 1), fadeOut('face-glow', 1.5), fadeOut('tablets', 1)),
      say('God had not given up on his stiff-necked people. He gave the covenant again, and wrote his words on stone once more.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: glorySet, scenes }
