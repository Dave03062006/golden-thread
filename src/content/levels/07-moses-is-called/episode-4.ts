import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 4 · The Burning Bush (Exodus 3:1–4:17), from the approved Level 7 script.
 *
 * Moses, an old shepherd now, leads Jethro's flock to Horeb, the mountain of God, and sees
 * a bush burning that is not burnt up. The player leads him closer as the light reveals more
 * ("turn aside and see", minigames/turn-aside-and-see). God calls him by name; Moses takes
 * off his shoes and hides his face. God has seen his people's suffering and is sending him;
 * when Moses asks his name, the flame fills everything with gold: "I AM WHO I AM" (this
 * episode's golden thread: "Before Abraham was, I am"). God gives him signs, and Aaron.
 */

/** The bush, where Moses starts, how far he comes, and how many steps it takes him. */
export const BUSH = { x: 0.66, y: 0.75 }
export const APPROACH = { from: 0.16, to: 0.5, steps: 6 }
/** The light around the bush, from far off to close by. */
export const LIGHT = { far: { size: 0.14, opacity: 0.35 }, near: { size: 0.46, opacity: 0.75 } }

const ABOVE = 'brick-pits'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })

export const bushSet: SceneDescription = {
  id: 'l07-bush',
  title: 'The burning bush',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'green-hills', depth: 0.3, opacity: 0 },
    { id: 'brick-pits', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The light of the bush, the bush itself, and its flame: the golden thread.
    { id: 'bush-light', prop: 'halo', above: ABOVE, x: BUSH.x, y: BUSH.y - 0.08, ...LIGHT.far },
    { id: 'bush', prop: 'burning-bush', above: ABOVE, ...BUSH, size: 0.09, pose: 'far' },
    { id: 'bush-flame', prop: 'halo', above: ABOVE, x: BUSH.x, y: BUSH.y - 0.1, size: 0.1, opacity: 0 },
    // Jethro's flock on the mountainside.
    { id: 'flock', prop: 'sheep', above: ABOVE, x: 0.3, y: 0.77, size: 0.026, group: { count: 5, w: 0.16, h: 0.02, seed: 131, bob: 0.002 } },
    // What God shows in the flame: the slaves in Egypt, and the good land.
    person('workers', 'hebrew-workers', 0.5, { size: 0.15, opacity: 0 }),
    { id: 'good-land-flock', prop: 'sheep', above: ABOVE, x: 0.5, y: 0.66, size: 0.024, opacity: 0, group: { count: 7, w: 0.3, h: 0.04, seed: 132, bob: 0.002 } },
    // Moses, his rod, and the serpent it becomes; Aaron, far off.
    { id: 'rod', prop: 'staff', above: ABOVE, x: APPROACH.from + 0.018, y: 0.785, size: 0.012 },
    { id: 'serpent', prop: 'serpent', above: ABOVE, x: 0.46, y: 0.79, size: 0.06, pose: 'ground', opacity: 0 },
    person('moses', 'moses-shepherd', APPROACH.from, { facing: 1 }),
    person('aaron', 'aaron', 1.05, { y: 0.7, size: 0.03 }),
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
const vision = (to: string, from = 'horeb') => [layer(from, { opacity: 0 }, { seconds: 2.5, ease: 'inOutSine' }), layer(to, { opacity: 1 }, { seconds: 2.5, ease: 'inOutSine' })]

const scenes: StoryScene[] = [
  {
    id: 'l07-e4-s1',
    title: 'At Horeb, the mountain of God',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 3:1', actor('flock', { x: 0.36 }, { seconds: 6, ease: 'inOutSine' }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 3:2', actor('bush-light', { opacity: 0.5 }, { seconds: 2 }), camera({ zoom: 1.04, x: 0.03 }, slow)),
      verse('EXO 3:3', camera({ zoom: 1, x: 0 }, slow), actor('moses', { pose: 'lift' }, { seconds: 0.8 }), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 2.5 })),
      play('turn-aside-and-see', {
        done: [
          actor('moses', { x: APPROACH.to, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
          actor('rod', { x: APPROACH.to + 0.018 }, { seconds: 0.5 }),
          actor('bush-light', LIGHT.near, { seconds: 0.5 }),
          actor('bush', { pose: 'near' }, { seconds: 0.3 }),
        ],
      }),
    ],
  },
  {
    id: 'l07-e4-s2',
    title: 'Holy ground',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 3:4', camera({ zoom: 1.04, x: 0.04 }, slow), actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 2.5 })),
      verse('EXO 3:5', actor('moses', { pose: 'kneel' }, { seconds: 1.5, delay: 1 })),
      verse('EXO 3:6', actor('moses', { pose: 'sit' }, { seconds: 1.5, delay: 2 }), camera({ zoom: 1.02, x: 0.02 }, slow)),
    ],
  },
  {
    id: 'l07-e4-s3',
    title: '“I have seen the affliction of my people”',
    music: 'holy-holy-holy',
    beats: [
      verse(
        'EXO 3:7',
        // In the flame, like a picture: the slaves at their bricks.
        camera({ zoom: 1, x: 0 }, slow),
        ...['moses', 'rod', 'flock', 'bush', 'bush-light'].map((id) => fadeOut(id)),
        ...vision('brick-pits'),
        fadeIn('workers', 1.5),
      ),
      verse(
        'EXO 3:8',
        // Beyond them, a good and broad land of hills and flocks.
        fadeOut('workers'),
        ...vision('green-hills', 'brick-pits'),
        fadeIn('good-land-flock', 1.5),
      ),
      verse(
        'EXO 3:10',
        // Back on the mountain, before the bush.
        fadeOut('good-land-flock'),
        ...vision('horeb', 'green-hills'),
        ...['moses', 'rod', 'flock', 'bush'].map((id) => fadeIn(id, 1)),
        fadeIn('bush-light', 1, LIGHT.near.opacity),
      ),
    ],
  },
  {
    id: 'l07-e4-s4',
    title: '“I AM WHO I AM”',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 3:11', actor('moses', { pose: 'kneel' }, { seconds: 1 }), fadeIn('bush-flame', 0.3, 0.9)),
      verse('EXO 3:12', camera({ zoom: 1.03, x: 0.03 }, slow)),
      verse('EXO 3:13', actor('moses', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1, x: 0 }, slow)),
      verse(
        'EXO 3:14',
        // The flame grows taller and brighter, and fills the view with gold.
        actor('moses', { pose: 'sit' }, { seconds: 1.5 }),
        actor('bush-flame', { size: 0.18, opacity: 1 }, { seconds: 5, ease: 'inOutSine' }),
        camera({ zoom: 1.04, x: 0.03, y: -0.01 }, slow),
      ),
      say(
        'God’s name means that he simply is: he was before everything, and always will be, and he is always there for his people.',
        actor('bush-flame', { size: 0.1, opacity: 0.9 }, { seconds: 4, ease: 'inOutSine', delay: 1 }),
        camera({ zoom: 1, x: 0, y: 0 }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
      ),
    ],
  },
  {
    id: 'l07-e4-s5',
    title: '“What is that in your hand?”',
    music: 'holy-holy-holy',
    beats: [
      verse('EXO 4:1', actor('moses', { pose: 'idle' }, { seconds: 1 }), fadeOut('bush-flame')),
      verse('EXO 4:2', actor('moses', { pose: 'carry' }, { seconds: 0.8, delay: 1 })),
      verse(
        'EXO 4:3',
        // He casts it down: it becomes a serpent, and he runs from it.
        actor('rod', { opacity: 0 }, { seconds: 0.3, delay: 0.5 }),
        fadeIn('serpent', 0.5),
        actor('moses', { x: 0.36, pose: 'walk', facing: -1 }, { seconds: 1.5, ease: 'inOutSine', delay: 1.5 }),
        actor('moses', { pose: 'idle', facing: 1 }, { seconds: 0.4, delay: 3 }),
      ),
      say(
        'God gave Moses signs to show the people: the rod that became a serpent and then a rod again, and his hand that turned white and was healed.',
        // He takes it by the tail, and it is a rod in his hand again.
        actor('moses', { x: 0.44, pose: 'walk', facing: 1 }, { seconds: 1.5, ease: 'inOutSine' }),
        actor('moses', { pose: 'carry' }, { seconds: 0.4, delay: 1.5 }),
        fadeOut('serpent', 2),
        actor('rod', { x: 0.458, opacity: 1 }, { seconds: 0.5, delay: 2.5 }),
        actor('moses', { pose: 'idle' }, { seconds: 0.4, delay: 3.5 }),
      ),
      verse('EXO 4:10', actor('moses', { pose: 'kneel' }, { seconds: 1 }), camera({ zoom: 1.03, x: 0.02 }, slow)),
      verse('EXO 4:12', camera({ zoom: 1, x: 0 }, slow)),
      say(
        'Moses still asked God to send someone else. So God gave him his brother Aaron to speak for him.',
        // Far off, a figure walks toward the mountain.
        actor('moses', { pose: 'idle' }, { seconds: 1 }),
        actor('aaron', { x: 0.88, pose: 'walk' }, { seconds: 6, ease: 'inOutSine', delay: 0.5 }),
        actor('aaron', { pose: 'idle' }, { seconds: 0.4, delay: 6.5 }),
      ),
      verse('EXO 4:17', actor('moses', { pose: 'carry' }, { seconds: 0.8, delay: 0.5 })),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: bushSet, scenes }
