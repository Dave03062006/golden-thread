import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Water from the Rock (Exodus 17:1–7), from the approved Level 9 script.
 *
 * At Rephidim there is no water, and the people find fault with Moses: "Give us water to
 * drink." The LORD sends Moses ahead with the elders to the rock at Horeb, which glows (this
 * episode's golden thread: "the Rock was Christ," and the blood and water from his side).
 * Moses strikes the rock, and water bursts out; the player sends the stream to everyone who
 * is thirsty ("streams in the desert", minigames/streams-in-the-desert). The place is named
 * Massah and Meribah, because the people asked, "Is the LORD among us or not?"
 */

/** Where the water comes out of the rock. */
export const ROCK = { x: 0.16, y: 0.79 }
/** The thirsty, each with the stone that blocks the way to them, and what the water brings. */
export const THIRSTY = [
  { name: 'families', x: 0.38, y: 0.8, text: 'The families fill their jars, and drink.' },
  { name: 'children', x: 0.54, y: 0.81, text: 'The children drink, and splash each other.' },
  { name: 'flocks', x: 0.7, y: 0.8, text: 'The flocks crowd to the water.' },
  { name: 'cattle', x: 0.86, y: 0.81, text: 'The cattle drink their fill.' },
].map((t, i) => ({ ...t, stone: `stone-${i + 1}`, stream: `stream-${i + 1}`, grass: `grass-${i + 1}`, stoneX: t.x - 0.07 }))

const ABOVE = 'rephidim'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const rockSet: SceneDescription = {
  id: 'l09-the-rock',
  title: 'Water from the rock',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'rephidim', depth: 0.3 },
  ],
  actors: [
    // The great rock at Horeb, its glow (the golden thread), and the water bursting from it.
    { id: 'rock', prop: 'great-rock', above: ABOVE, x: ROCK.x, y: 0.8, size: 0.18 },
    { id: 'rock-glow', prop: 'halo', above: ABOVE, x: ROCK.x, y: 0.64, size: 0.12, opacity: 0 },
    { id: 'gush', prop: 'water-stream', above: ABOVE, x: ROCK.x + 0.015, y: 0.73, size: 0.02, opacity: 0 },
    // The streams to each of the thirsty, the stones that block them, the green where the water runs.
    ...THIRSTY.map((t): SceneActor => ({ id: t.stream, prop: 'stream', above: ABOVE, x: (ROCK.x + 0.03 + t.x) / 2, y: t.y + 0.005, size: t.x - ROCK.x - 0.03, opacity: 0 })),
    ...THIRSTY.map((t): SceneActor => ({ id: t.grass, prop: 'desert-bush', above: ABOVE, x: t.x - 0.03, y: t.y - 0.03, size: 0.03, opacity: 0 })),
    ...THIRSTY.map((t): SceneActor => ({ id: t.stone, prop: 'well-stone', above: ABOVE, x: t.stoneX, y: t.y + 0.01, size: 0.03, opacity: 0 })),
    { id: 'stone-glow', prop: 'halo', above: ABOVE, x: THIRSTY[0]!.stoneX, y: 0.78, size: 0.05, opacity: 0 },
    // The thirsty: families with their empty jars, children, flocks, cattle.
    person('families', 'hebrew-family', 0.4, { size: 0.12 }),
    ...[0.33, 0.36].map((x, i): SceneActor => ({ id: `jar-${i + 1}`, prop: 'water-jar', above: ABOVE, x, y: 0.79, size: 0.018 })),
    person('boy', 'boy', 0.53, { size: 0.026, y: 0.79 }),
    person('girl', 'girl', 0.57, { size: 0.026, y: 0.79 }),
    { id: 'flocks', prop: 'sheep', above: ABOVE, x: 0.72, y: 0.8, size: 0.026, group: { count: 5, w: 0.08, h: 0.012, seed: 231, bob: 0.002 } },
    { id: 'cattle', prop: 'ox', above: ABOVE, x: 0.88, y: 0.81, size: 0.05, group: { count: 2, w: 0.06, h: 0.01, seed: 233, bob: 0.001 } },
    person('more-people', 'hebrew-workers', 0.62, { size: 0.12, y: 0.76 }),
    // Moses and his rod, and the elders who go with him.
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.488, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.47, { facing: 1 }),
    person('elder-1', 'elder', 0.34, { facing: -1, opacity: 0 }),
    person('elder-2', 'elder', 0.39, { facing: -1, opacity: 0 }),
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
/** Moses and his rod move together. */
const mosesTo = (x: number, delay = 0, seconds = 3) => [
  actor('moses', { x, pose: 'walk', facing: x < 0.47 ? -1 : 1 }, { seconds, ease: 'inOutSine', delay }),
  actor('rod', { x: x + (x < 0.47 ? -0.018 : 0.018) }, { seconds, ease: 'inOutSine', delay }),
  actor('moses', { pose: 'idle' }, { seconds: 0.4, delay: delay + seconds }),
]

const scenes: StoryScene[] = [
  {
    id: 'l09-e5-s1',
    title: 'No water at Rephidim',
    music: 'rock-of-ages',
    beats: [
      verse('EXO 17:1', camera({ zoom: 1.02 }, slow)),
      verse('EXO 17:2', actor('more-people', { x: 0.56, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('more-people', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('EXO 17:3', actor('families', { x: 0.44, pose: 'walk' }, { seconds: 1.5, ease: 'inOutSine', delay: 1 }), actor('families', { pose: 'idle' }, { seconds: 0.4, delay: 2.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l09-e5-s2',
    title: 'Strike the rock',
    music: 'rock-of-ages',
    beats: [
      verse('EXO 17:4', fadeIn('rock-glow', 0.5, 0.85), actor('moses', { pose: 'pray' }, { seconds: 0.8, delay: 1 })),
      verse('EXO 17:5', actor('moses', { pose: 'idle' }, { seconds: 0.6 }), fadeIn('elder-1', 1), fadeIn('elder-2', 1.3), ...mosesTo(0.27, 1.5)),
      verse(
        'EXO 17:6',
        // Moses strikes the rock, and the water bursts out.
        actor('moses', { pose: 'lift' }, { seconds: 0.5, delay: 2 }),
        actor('moses', { pose: 'carry' }, { seconds: 0.25, delay: 3 }),
        fadeIn('gush', 3.2),
        ...THIRSTY.map((t, i) => fadeIn(t.stone, 0.5 + i * 0.2)),
        actor('moses', { pose: 'idle' }, { seconds: 0.5, delay: 4 }),
      ),
      play('streams-in-the-desert', {
        done: [
          ...THIRSTY.flatMap((t) => [actor(t.stream, { opacity: 1 }, { seconds: 0.5 }), actor(t.grass, { opacity: 1 }, { seconds: 0.5 }), actor(t.stone, { x: t.stoneX + 0.03, y: t.y + 0.025 }, { seconds: 0.5 })]),
          actor('stone-glow', { x: THIRSTY[0]!.stoneX, opacity: 0 }, { seconds: 0.5 }),
        ],
      }),
    ],
  },
  {
    id: 'l09-e5-s3',
    title: '“Is the LORD among us?”',
    music: 'rock-of-ages',
    beats: [
      verse('EXO 17:7', actor('boy', { x: 0.5, pose: 'walk' }, { seconds: 1.5, ease: 'inOutSine', delay: 1 }), actor('boy', { pose: 'idle' }, { seconds: 0.4, delay: 2.5 }), camera({ zoom: 1.02 }, slow)),
      say('The LORD had been among them all along: in the pillar of cloud, in the bread each morning, and now in the water from the rock.', actor('moses', { facing: -1 }, { seconds: 0.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: rockSet, scenes }
