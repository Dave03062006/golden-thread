import { actor, camera, layer, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · "I Am Joseph" (Genesis 45–46), from the approved Level 5 script.
 *
 * Joseph can bear it no longer: he sends everyone out, weeps aloud, and tells his brothers,
 * "I am Joseph." They draw back in fear, and he holds out his arms: "Come near to me." The
 * player helps each brother come near ("come near to me", minigames/come-near), and Joseph's
 * open arms glow (this episode's golden thread: "Father, forgive them"). It was not you who
 * sent me here, but God. Jacob hears that Joseph is alive, sees the wagons, and believes.
 * God tells him not to be afraid to go down to Egypt, and in Goshen Joseph runs to his
 * father and weeps on his neck.
 */

/** The brothers who come near: where each stands back in fear, where he comes to, and how many steps it takes him. */
export const COMERS = [
  { id: 'reuben', from: 0.12, to: 0.5, steps: 1 },
  { id: 'simeon', from: 0.18, to: 0.46, steps: 2 },
  { id: 'judah', from: 0.24, to: 0.54, steps: 1 },
  { id: 'brother-1', from: 0.3, to: 0.42, steps: 2 },
  { id: 'brother-2', from: 0.36, to: 0.38, steps: 1 },
  { id: 'more-brothers', from: 0.05, to: 0.3, steps: 1 },
  { id: 'benjamin', from: 0.42, to: 0.6, steps: 1 },
] as const
export const COMERS_Y = 0.785

const ABOVE = 'storehouse-hall'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'benjamin' ? 0.038 : 0.042, facing: 1, ...extra })
const BROTHERS = ['reuben', 'simeon', 'judah', 'brother-1', 'brother-2']
const brotherProp = (id: string) => (id.startsWith('brother') ? 'brother' : id)

export const iAmJosephSet: SceneDescription = {
  id: 'l05-i-am-joseph',
  title: 'I am Joseph',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dry-hills', depth: 0.3 },
    { id: 'goshen-fields', depth: 0.3, opacity: 0 },
    { id: 'storehouse-hall', depth: 0.3 },
  ],
  actors: [
    // Joseph's hall: the servants sent out.
    { id: 'servants', prop: 'crowd', above: ABOVE, x: 0.88, y: 0.79, size: 0.12, facing: -1 },
    // Jacob's tent, the wagons, the altar at Beer-sheba, and Joseph's chariot.
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.8, y: 0.76, size: 0.13, pose: 'open', opacity: 0 },
    { id: 'wagon-1', prop: 'wagon', above: ABOVE, x: 1.15, y: 0.79, size: 0.09, facing: -1 },
    { id: 'wagon-2', prop: 'wagon', above: ABOVE, x: 1.3, y: 0.8, size: 0.09, facing: -1 },
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.42, y: 0.78, size: 0.06, pose: 'lit', opacity: 0 },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.5, y: 0.3, size: 0.3, opacity: 0 },
    { id: 'horse', prop: 'horse', above: ABOVE, x: 1.1, y: 0.78, size: 0.07, facing: -1 },
    { id: 'chariot', prop: 'chariot', above: ABOVE, x: 1.2, y: 0.785, size: 0.07, facing: -1 },
    // Joseph's open arms: the golden thread.
    { id: 'open-arms', prop: 'halo', above: ABOVE, x: 0.7, y: 0.62, size: 0.09, opacity: 0 },
    // The brothers, Jacob, and Joseph.
    ...BROTHERS.map((id, i) => person(id, brotherProp(id), 0.2 + i * 0.07, COMERS_Y)),
    { id: 'more-brothers', prop: 'crowd', above: ABOVE, x: 0.08, y: 0.79, size: 0.08, facing: 1 },
    person('benjamin', 'benjamin', 0.58, COMERS_Y),
    person('jacob', 'jacob-old', 0.7, 0.78, { facing: -1, opacity: 0 }),
    person('joseph', 'joseph-egypt', 0.72, 0.775, { facing: -1 }),
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
const walkTo = (id: string, x: number, delay = 0, seconds = 5, facing: -1 | 1 = x < 0.5 ? -1 : 1) => actor(id, { x, pose: 'walk', facing }, { seconds, ease: 'inOutSine', delay })
const stop = (id: string, delay: number, pose = 'idle') => actor(id, { pose }, { seconds: 0.5, delay })
const swap = (from: string, to: string, delay = 0) => [layer(from, { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay }), layer(to, { opacity: 1 }, { seconds: 3, ease: 'inOutSine', delay })]
const KNEELS = (id: string) => id !== 'more-brothers'

/** After they have all come near: each brother close by Joseph, standing. */
const NEAR = COMERS.map((c) => actor(c.id, { x: c.to, pose: 'idle', facing: 1 }, { seconds: 0.8, ease: 'inOutSine' }))

const scenes: StoryScene[] = [
  {
    id: 'l05-e6-s1',
    title: '“I am Joseph”',
    music: 'elgar-nimrod',
    beats: [
      verse('GEN 45:1', actor('joseph', { pose: 'lift' }, { seconds: 1 }), walkTo('servants', 1.15, 1, 4, 1), actor('joseph', { pose: 'idle' }, { seconds: 1, delay: 4 })),
      verse('GEN 45:2', actor('joseph', { pose: 'pray' }, { seconds: 1 }), camera({ zoom: 1.04, x: 0.02 }, slow)),
      verse(
        'GEN 45:3',
        camera({ zoom: 1, x: 0 }, slow),
        actor('joseph', { pose: 'lift' }, { seconds: 1 }),
        // The brothers draw back in fear, heads down.
        ...COMERS.map((c) => actor(c.id, { x: c.from, facing: 1 }, { seconds: 2, ease: 'inOutSine', delay: 1 })),
        ...COMERS.filter((c) => KNEELS(c.id)).map((c, i) => actor(c.id, { pose: 'kneel' }, { seconds: 0.8, delay: 3 + i * 0.1 })),
      ),
    ],
  },
  {
    id: 'l05-e6-s2',
    title: '“Come near to me”',
    music: 'elgar-nimrod',
    beats: [
      verse('GEN 45:4', actor('joseph', { pose: 'carry' }, { seconds: 1 }), fadeIn('open-arms', 1, 0.85)),
      play('come-near', { cues: [], done: NEAR }),
      verse('GEN 45:5', actor('joseph', { pose: 'idle' }, { seconds: 1 })),
      verse('GEN 45:8', actor('joseph', { pose: 'lift' }, { seconds: 1 }), actor('joseph', { pose: 'idle' }, { seconds: 1, delay: 5 })),
      verse('GEN 45:14', fadeOut('open-arms'), actor('benjamin', { x: 0.68 }, { seconds: 1.5, ease: 'inOutSine' }), actor('joseph', { pose: 'carry' }, { seconds: 1, delay: 1 }), actor('benjamin', { pose: 'carry' }, { seconds: 1, delay: 1 })),
      verse('GEN 45:15', actor('benjamin', { pose: 'idle', x: 0.62 }, { seconds: 1.5, ease: 'inOutSine' }), actor('joseph', { pose: 'idle' }, { seconds: 1 }), ...BROTHERS.map((id, i) => actor(id, { x: 0.4 + i * 0.045 }, { seconds: 2, ease: 'inOutSine', delay: 1 + i * 0.2 }))),
    ],
  },
  {
    id: 'l05-e6-s3',
    title: '“Joseph is still alive”',
    music: 'elgar-nimrod',
    beats: [
      verse(
        'GEN 45:26',
        // Jacob's tent in Canaan: the brothers come home with news.
        layer('storehouse-hall', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        fadeOut('joseph'),
        fadeIn('tent', 1),
        actor('jacob', { x: 0.72, pose: 'idle' }, { seconds: 0.1 }),
        fadeIn('jacob', 1),
        ...[...BROTHERS, 'more-brothers', 'benjamin'].map((id, i) => actor(id, { x: 0.2 + i * 0.055, facing: 1 }, { seconds: 0.1, delay: 1 })),
        actor('jacob', { pose: 'kneel' }, { seconds: 1, delay: 4 }),
      ),
      verse('GEN 45:27', ...['wagon-1', 'wagon-2'].map((id, i) => actor(id, { x: 0.88 + i * 0.12, pose: 'walk' }, { seconds: 4, ease: 'outCubic', delay: i * 0.4 })), ...['wagon-1', 'wagon-2'].map((id) => stop(id, 4.5)), actor('jacob', { pose: 'idle', facing: 1 }, { seconds: 1, delay: 5 })),
      verse('GEN 45:28', actor('jacob', { pose: 'lift' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l05-e6-s4',
    title: 'Father and son',
    music: 'elgar-nimrod',
    beats: [
      verse(
        'GEN 46:3',
        // Night at Beer-sheba: Jacob prays at the altar, and God speaks.
        ...['tent', 'wagon-1', 'wagon-2', ...BROTHERS, 'more-brothers', 'benjamin'].map((id) => fadeOut(id)),
        ...swap('forest-sky', 'night-sky'),
        fadeIn('altar', 1),
        actor('jacob', { x: 0.5, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 1.5 }),
        fadeIn('glory', 2, 0.75),
      ),
      verse('GEN 46:4', camera({ zoom: 1.03 }, slow)),
      verse(
        'GEN 46:29',
        camera({ zoom: 1 }, slow),
        // Goshen: Joseph's chariot races to meet the caravan, and he runs to his father.
        fadeOut('glory'),
        fadeOut('altar'),
        ...swap('night-sky', 'forest-sky'),
        ...swap('dry-hills', 'goshen-fields'),
        actor('jacob', { x: 0.36, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        actor('wagon-1', { x: 0.22, facing: 1, opacity: 1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        actor('horse', { x: 0.7, pose: 'walk' }, { seconds: 3, ease: 'outCubic', delay: 1.5 }),
        actor('chariot', { x: 0.8, pose: 'walk' }, { seconds: 3, ease: 'outCubic', delay: 1.5 }),
        ...['horse', 'chariot'].map((id) => stop(id, 4.5)),
        actor('joseph', { x: 0.74, y: 0.78, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 4.5 }),
        fadeIn('joseph', 4.5),
        walkTo('joseph', 0.42, 5, 2.5, -1),
        actor('joseph', { pose: 'carry' }, { seconds: 0.6, delay: 7.5 }),
        actor('jacob', { pose: 'carry' }, { seconds: 0.6, delay: 7.5 }),
      ),
      verse('GEN 46:30', camera({ zoom: 1.04, x: -0.03 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: iAmJosephSet, scenes }
