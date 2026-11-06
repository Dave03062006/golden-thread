import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · The Golden Calf (Exodus 31:18–32:20), from the approved Level 10 script.
 *
 * Moses is gone forty days, and the people ask Aaron, "Make us gods." He makes a calf of
 * their gold, and they say, "These are your gods, O Israel." The player sets God's words
 * from the mountain beside theirs, and finds the words that twist them ("the true words and
 * the twisted", minigames/the-calf). On the mountain, God gives Moses the two tablets,
 * written with the finger of God, which glow (this episode's golden thread: "Do not be
 * idolaters"). Moses comes down, sees the calf and the dancing, and breaks the tablets at the
 * foot of the mountain.
 */

const ABOVE = 'sinai-summit'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const CAMP = ['tent-1', 'tent-2', 'people', 'more-people', 'aaron', 'rings', 'calf', 'altar', 'fire']
/** Where Moses stands on the slope above the camp, and where the tablets fall. */
const SLOPE = { x: 0.16, y: 0.7 }
const FALLEN = { x: 0.28, y: 0.8 }

export const calfSet: SceneDescription = {
  id: 'l10-calf',
  title: 'The golden calf',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'storm-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'sinai-summit', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp at the foot of the mountain: the restless people, Aaron, the gold, the calf on its altar, the fire.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.1, y: 0.75, size: 0.1, pose: 'open' },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.34, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.7, { size: 0.12 }),
    person('aaron', 'aaron', 0.52),
    { id: 'rings', prop: 'gold-rings', above: ABOVE, x: 0.47, y: 0.79, size: 0.03, opacity: 0 },
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.5, y: 0.785, size: 0.06, opacity: 0 },
    { id: 'calf', prop: 'golden-calf', above: ABOVE, x: 0.5, y: 0.79, size: 0.05, opacity: 0 },
    { id: 'fire', prop: 'campfire', above: ABOVE, x: 0.42, y: 0.8, size: 0.045, opacity: 0 },
    // On the mountain: Moses, the two tablets and their glow (the golden thread); Joshua waiting.
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.618, y: 0.785, size: 0.012, opacity: 0 },
    person('moses', 'moses-shepherd', 0.6, { opacity: 0 }),
    person('joshua', 'joshua', 0.3, { facing: 1, opacity: 0 }),
    { id: 'tablets', prop: 'stone-tablets', above: ABOVE, x: 0.585, y: 0.68, size: 0.05, pose: 'written', opacity: 0 },
    { id: 'tablets-glow', prop: 'halo', above: ABOVE, x: 0.585, y: 0.66, size: 0.08, opacity: 0 },
    { id: 'cloud', prop: 'storm-cloud', above: ABOVE, x: 0.5, y: 0.22, size: 0.45, opacity: 0 },
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
/** The people dance around the calf: walking one way, then the other. */
const dance = (delay: number) => [
  actor('people', { x: 0.3, pose: 'walk', facing: -1 }, { seconds: 2, ease: 'inOutSine', delay }),
  actor('people', { x: 0.36, facing: 1 }, { seconds: 2, ease: 'inOutSine', delay: delay + 2 }),
  actor('more-people', { x: 0.74, pose: 'walk', facing: 1 }, { seconds: 2, ease: 'inOutSine', delay }),
  actor('more-people', { x: 0.68, facing: -1 }, { seconds: 2, ease: 'inOutSine', delay: delay + 2 }),
]
/** Moses, his rod and the tablets (with their glow) move together. */
const mosesAt = (x: number, y: number, extra: { facing?: -1 | 1 } = {}, delay = 0) => [
  actor('moses', { x, y, ...extra }, { seconds: 0.1, delay }),
  actor('rod', { x: x + 0.018, y }, { seconds: 0.1, delay }),
  actor('tablets', { x: x - 0.015, y: y - 0.105 }, { seconds: 0.1, delay }),
  actor('tablets-glow', { x: x - 0.015, y: y - 0.125 }, { seconds: 0.1, delay }),
]

const scenes: StoryScene[] = [
  {
    id: 'l10-e4-s1',
    title: '“Make us gods”',
    music: 'allegri-miserere',
    beats: [
      say('Moses was gone a long time, forty days. Down in the camp, the people grew restless.', camera({ zoom: 1.02 }, slow)),
      verse('EXO 32:1', actor('people', { x: 0.42, pose: 'walk' }, { seconds: 2, ease: 'inOutSine', delay: 1 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 3 })),
      verse('EXO 32:3', fadeIn('rings', 1)),
      verse('EXO 32:4', fadeIn('fire', 0.5), fadeOut('rings', 2), fadeIn('calf', 3), actor('people', { x: 0.34 }, { seconds: 2, ease: 'inOutSine', delay: 2 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l10-e4-s2',
    title: 'A feast before the calf',
    music: 'allegri-miserere',
    beats: [
      verse('EXO 32:5', fadeIn('altar', 0.5), actor('calf', { y: 0.715 }, { seconds: 0.1, delay: 1.5 }), fadeOut('fire', 1), actor('aaron', { pose: 'lift' }, { seconds: 0.8, delay: 2 }), actor('aaron', { x: 0.6 }, { seconds: 1.5, delay: 0.5 })),
      verse('EXO 32:6', actor('aaron', { pose: 'idle' }, { seconds: 0.6 }), ...swap('forest-sky', 'evening-sky', 1), ...dance(0.5)),
      play('the-calf', { done: [] }),
    ],
  },
  {
    id: 'l10-e4-s3',
    title: 'Two tablets of stone',
    music: 'allegri-miserere',
    beats: [
      verse(
        'EXO 31:18',
        // On the mountain, in the cloud: God gives Moses the tablets, which glow.
        ...CAMP.map((id) => fadeOut(id)),
        ...swap('horeb', 'sinai-summit'),
        ...swap('evening-sky', 'storm-sky'),
        fadeIn('cloud', 1),
        ...mosesAt(0.6, 0.785, { facing: -1 }),
        ...['moses', 'rod'].map((id) => fadeIn(id, 1.5)),
        fadeIn('tablets', 0.5),
        fadeIn('tablets-glow', 0.5, 0.85),
      ),
      verse('EXO 32:7', actor('moses', { pose: 'carry' }, { seconds: 0.6, delay: 1 })),
      verse('EXO 32:15', fadeIn('joshua', 1), ...['moses', 'rod', 'tablets', 'tablets-glow'].map((id) => actor(id, { x: id === 'moses' ? 0.42 : id === 'rod' ? 0.438 : 0.405 }, { seconds: 4, ease: 'inOutSine', delay: 1.5 })), actor('moses', { pose: 'walk' }, { seconds: 0.3, delay: 1.5 }), actor('moses', { pose: 'carry' }, { seconds: 0.3, delay: 5.5 })),
      verse('EXO 32:16', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l10-e4-s4',
    title: 'The broken tablets',
    music: 'allegri-miserere',
    beats: [
      verse(
        'EXO 32:17',
        // On the slope above the camp: Moses and Joshua hear the singing below.
        camera({ zoom: 1 }, slow),
        ...['moses', 'rod', 'tablets', 'tablets-glow', 'joshua', 'cloud'].map((id) => fadeOut(id)),
        ...swap('sinai-summit', 'horeb', 1),
        ...swap('storm-sky', 'evening-sky', 1),
        ...mosesAt(SLOPE.x, SLOPE.y, { facing: 1 }, 2.5),
        actor('joshua', { x: SLOPE.x - 0.06, y: SLOPE.y, facing: 1 }, { seconds: 0.1, delay: 2.5 }),
        ...['moses', 'rod', 'tablets', 'joshua', 'people', 'more-people', 'aaron', 'calf', 'altar', 'tent-1', 'tent-2'].map((id) => fadeIn(id, 3)),
        fadeIn('tablets-glow', 3, 0.85),
        ...dance(4),
      ),
      verse('EXO 32:18', ...dance(0.5)),
      verse('EXO 32:19', actor('moses', { pose: 'lift' }, { seconds: 0.5, delay: 1 }), ...['tablets', 'tablets-glow'].map((id) => actor(id, { x: FALLEN.x, y: FALLEN.y - (id === 'tablets' ? 0 : 0.08) }, { seconds: 0.8, delay: 1.5 })), actor('tablets', { pose: 'broken' }, { seconds: 0.2, delay: 2.3 }), actor('moses', { pose: 'idle' }, { seconds: 0.5, delay: 3 })),
      verse('EXO 32:20', fadeIn('fire', 0.5), fadeOut('calf', 2), fadeOut('altar', 2.5)),
      say('Only forty days before, they had promised, “All that the LORD has spoken we will do.” Now they had broken the covenant, as the tablets lay broken on the ground.', fadeOut('fire', 2), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: calfSet, scenes }
