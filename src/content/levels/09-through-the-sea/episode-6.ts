import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · Hands Raised Against Amalek (Exodus 17:8–16), from the approved Level 9 script.
 *
 * Amalek comes and fights with Israel at Rephidim. Moses sends Joshua out with chosen men,
 * and goes up to the top of the hill with Aaron and Hur and the rod of God in his hand.
 * Whenever he holds up his hands, Israel prevails; whenever he lowers them, Amalek prevails.
 * His raised hands glow (this episode's golden thread: Jesus on the cross, "when I am lifted
 * up"). The player lifts them each time they begin to sink, until Aaron and Hur set a stone
 * for him and hold up his hands until sunset ("hands held high", minigames/hands-held-high).
 * Nothing of the fighting is shown: only dust and banners far below. Moses builds an altar,
 * "The LORD is my banner."
 */

/** Where Moses stands on the hilltop, and Aaron and Hur beside him and then holding his hands. */
export const HILL = { moses: 0.5, aaron: { from: 0.38, holding: 0.465 }, hur: { from: 0.62, holding: 0.535 }, y: 0.74 }
/** The two banners far below in the valley: how high each stands as the battle turns. */
export const BANNERS = { israel: { x: 0.17 }, amalek: { x: 0.84 }, high: 0.61, low: 0.68 }

const ABOVE = 'hilltop'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const CAMP = ['joshua', 'men', 'warriors', 'tent-1', 'tent-2']
const HILLTOP = ['moses', 'rod', 'aaron', 'hur', 'banner-israel', 'banner-amalek', 'dust', 'hands-glow']

export const amalekSet: SceneDescription = {
  id: 'l09-amalek',
  title: 'Hands held high',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'rephidim', depth: 0.3 },
    { id: 'hilltop', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The camp at Rephidim: the warriors of Amalek on the ridge, Joshua and his men.
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.12, y: 0.75, size: 0.1, pose: 'open' },
    { id: 'tent-2', prop: 'striped-tent', above: ABOVE, x: 0.26, y: 0.745, size: 0.09, pose: 'open', facing: -1 },
    person('warriors', 'amalekites', 0.84, { size: 0.08, y: 0.62, opacity: 0 }),
    person('men', 'hebrew-workers', 0.66, { size: 0.12 }),
    person('joshua', 'joshua', 0.54, { facing: -1 }),
    // Far below in the valley, behind the hilltop: only dust and the two banners.
    { id: 'dust', prop: 'dust-cloud', above: ABOVE, x: 0.5, y: 0.7, size: 0.4, opacity: 0 },
    // Moses with the rod of God, Aaron and Hur, and the stone they set for him.
    { id: 'stone', prop: 'well-stone', above: ABOVE, x: HILL.moses, y: HILL.y + 0.01, size: 0.04, opacity: 0 },
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.398, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.38, { facing: 1 }),
    person('aaron', 'aaron', 0.3, { facing: 1 }),
    person('hur', 'hur', 0.24, { facing: 1 }),
    // Moses' raised hands, which glow: the golden thread.
    { id: 'hands-glow', prop: 'halo', above: ABOVE, x: HILL.moses, y: 0.6, size: 0.09, opacity: 0 },
    { id: 'banner-israel', prop: 'banner', above: ABOVE, x: BANNERS.israel.x, y: BANNERS.high, size: 0.018, pose: 'israel', opacity: 0 },
    { id: 'banner-amalek', prop: 'banner', above: ABOVE, x: BANNERS.amalek.x, y: BANNERS.low, size: 0.018, pose: 'amalek', opacity: 0 },
    // At sunset, the altar Moses builds.
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: 0.7, y: HILL.y + 0.01, size: 0.06, opacity: 0 },
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
    id: 'l09-e6-s1',
    title: 'Amalek comes',
    music: 'elgar-nimrod',
    beats: [
      verse('EXO 17:8', fadeIn('warriors', 0.5), actor('men', { facing: 1 }, { seconds: 0.4, delay: 2 }), camera({ zoom: 1.02 }, slow)),
      verse('EXO 17:9', actor('moses', { pose: 'lift' }, { seconds: 0.6, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 4 }), actor('joshua', { facing: 1 }, { seconds: 0.4, delay: 4.5 })),
      verse(
        'EXO 17:10',
        // Joshua and his men go out; Moses, Aaron and Hur climb the hill.
        camera({ zoom: 1 }, slow),
        actor('joshua', { x: 1.2, pose: 'walk' }, { seconds: 4, ease: 'inOutSine', delay: 0.5 }),
        actor('men', { x: 1.3, pose: 'walk' }, { seconds: 4, ease: 'inOutSine', delay: 0.8 }),
        fadeOut('warriors', 1),
      ),
    ],
  },
  {
    id: 'l09-e6-s2',
    title: 'On the top of the hill',
    music: 'elgar-nimrod',
    beats: [
      verse(
        'EXO 17:11',
        // The hilltop: Moses with the rod raised, his hands glowing; far below, the battle.
        ...CAMP.map((id) => fadeOut(id)),
        ...['moses', 'rod', 'aaron', 'hur'].map((id) => fadeOut(id)),
        ...swap('rephidim', 'hilltop', 1),
        actor('moses', { x: HILL.moses, y: HILL.y, pose: 'lift', facing: 1 }, { seconds: 0.1, delay: 2.5 }),
        actor('rod', { x: HILL.moses + 0.018, y: HILL.y }, { seconds: 0.1, delay: 2.5 }),
        actor('aaron', { x: HILL.aaron.from, y: HILL.y, facing: 1 }, { seconds: 0.1, delay: 2.5 }),
        actor('hur', { x: HILL.hur.from, y: HILL.y, facing: -1 }, { seconds: 0.1, delay: 2.5 }),
        ...HILLTOP.map((id) => fadeIn(id, 3, id === 'hands-glow' ? 0.85 : id === 'dust' ? 0.8 : 1)),
      ),
      play('hands-held-high', {
        done: [
          actor('stone', { opacity: 1 }, { seconds: 0.5 }),
          actor('moses', { pose: 'kneel' }, { seconds: 0.5 }),
          actor('aaron', { x: HILL.aaron.holding, pose: 'lift' }, { seconds: 0.5 }),
          actor('hur', { x: HILL.hur.holding, pose: 'lift' }, { seconds: 0.5 }),
          actor('banner-israel', { y: BANNERS.high }, { seconds: 0.5 }),
          actor('banner-amalek', { y: BANNERS.low }, { seconds: 0.5 }),
          layer('forest-sky', { opacity: 0 }, { seconds: 0.5 }),
          layer('evening-sky', { opacity: 1 }, { seconds: 0.5 }),
        ],
      }),
      verse('EXO 17:12', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l09-e6-s3',
    title: '“The LORD is my banner”',
    music: 'elgar-nimrod',
    beats: [
      say('By evening, Joshua and his men had won the battle.', camera({ zoom: 1 }, slow), fadeOut('dust'), fadeOut('banner-amalek'), actor('aaron', { pose: 'idle' }, { seconds: 0.8 }), actor('hur', { pose: 'idle' }, { seconds: 0.8 }), actor('moses', { pose: 'idle' }, { seconds: 0.8, delay: 0.5 })),
      verse('EXO 17:15', fadeIn('altar', 1), actor('moses', { y: HILL.y, pose: 'pray' }, { seconds: 1, delay: 2 }), fadeOut('stone', 0.5)),
      say('Moses knew who had won the battle. It was not the sword, but the LORD, while his people prayed.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: amalekSet, scenes }
