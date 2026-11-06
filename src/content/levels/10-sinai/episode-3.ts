import { actor, camera, layer, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Blood of the Covenant (Exodus 24), from the approved Level 10 script.
 *
 * Moses tells the people all the words of the LORD, and they answer with one voice, "All
 * the words which the LORD has spoken we will do." He builds an altar at the foot of the
 * mountain, and the player sets up twelve pillars around it, one for each tribe ("twelve
 * pillars", minigames/twelve-pillars). Moses reads the book of the covenant and sprinkles the
 * people with the blood in the basin, which glows (this episode's golden thread: "This is my
 * blood of the covenant"). On the mountain, the elders see the God of Israel, and eat and
 * drink; then Moses goes up into the cloud for forty days.
 */

/** The twelve tribes, and where each one's pillar stands, in an arc behind the altar. */
export const TRIBES = ['Reuben', 'Simeon', 'Levi', 'Judah', 'Issachar', 'Zebulun', 'Dan', 'Naphtali', 'Gad', 'Asher', 'Joseph', 'Benjamin']
export const PILLARS = TRIBES.map((tribe, i) => {
  const t = i / (TRIBES.length - 1)
  return { tribe, id: `pillar-${i + 1}`, x: Math.round((0.2 + t * 0.6) * 1000) / 1000, y: Math.round((0.735 - Math.sin(t * Math.PI) * 0.035) * 1000) / 1000 }
})
export const ALTAR = { x: 0.5, y: 0.78 }

const ABOVE = 'sinai-summit'
const person = (id: string, prop: string, x: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y: 0.785, size: 0.044, facing: -1, ...extra })
const FOOT = ['altar', 'basin', 'basin-glow', 'scroll', 'people', 'more-people', 'altar-smoke', ...PILLARS.map((p) => p.id)]

export const covenantSet: SceneDescription = {
  id: 'l10-covenant',
  title: 'The blood of the covenant',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'sinai-summit', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // At the foot of the mountain: the twelve pillars, the altar, the basin of blood and its glow (the golden thread).
    ...PILLARS.map((p): SceneActor => ({ id: p.id, prop: 'stone-pillar', above: ABOVE, x: p.x, y: p.y, size: 0.026, pose: 'standing', opacity: 0 })),
    { id: 'altar-smoke', prop: 'smoke-column', above: ABOVE, x: ALTAR.x, y: ALTAR.y - 0.05, size: 0.03, opacity: 0 },
    { id: 'altar', prop: 'noah-altar', above: ABOVE, x: ALTAR.x, y: ALTAR.y, size: 0.06, opacity: 0 },
    { id: 'basin', prop: 'basin', above: ABOVE, x: 0.6, y: 0.79, size: 0.03, opacity: 0 },
    { id: 'basin-glow', prop: 'halo', above: ABOVE, x: 0.6, y: 0.73, size: 0.07, opacity: 0 },
    { id: 'next-pillar', prop: 'halo', above: ABOVE, x: PILLARS[0]!.x, y: PILLARS[0]!.y - 0.03, size: 0.05, opacity: 0 },
    person('people', 'hebrew-family', 0.09, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.91, { size: 0.12 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.688, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.67),
    { id: 'scroll', prop: 'scroll', above: ABOVE, x: 0.65, y: 0.7, size: 0.025, opacity: 0 },
    // On the mountain: the pavement like sapphire, the elders, Aaron, the meal, the glory in the cloud.
    { id: 'pavement', prop: 'sapphire-pavement', above: ABOVE, x: 0.5, y: 0.82, size: 0.9, opacity: 0 },
    person('elders', 'elders', 0.4, { size: 0.12, facing: 1, opacity: 0 }),
    person('more-elders', 'elders', 0.58, { size: 0.12, opacity: 0 }),
    person('aaron', 'aaron', 0.26, { facing: 1, opacity: 0 }),
    { id: 'meal', prop: 'bread-and-wine', above: ABOVE, x: 0.49, y: 0.8, size: 0.05, opacity: 0 },
    { id: 'glory', prop: 'halo', above: ABOVE, x: 0.5, y: 0.26, size: 0.14, opacity: 0 },
    { id: 'cloud', prop: 'storm-cloud', above: ABOVE, x: 0.5, y: 0.2, size: 0.3, opacity: 0 },
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
    id: 'l10-e3-s1',
    title: 'Twelve pillars',
    music: 'byrd-ave-verum',
    beats: [
      verse('EXO 24:3', actor('moses', { pose: 'lift' }, { seconds: 0.8, delay: 1 }), ...['people', 'more-people'].map((id) => actor(id, { pose: 'walk' }, { seconds: 0.4, delay: 4 })), ...['people', 'more-people'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.4, delay: 5 }))),
      verse('EXO 24:4', actor('moses', { pose: 'carry' }, { seconds: 0.8 }), fadeIn('scroll', 0.5), ...swap('dawn-sky', 'forest-sky', 2), fadeIn('altar', 3)),
      play('twelve-pillars', {
        cues: [actor('moses', { pose: 'idle' }, { seconds: 0.6 }), fadeOut('scroll'), fadeIn('next-pillar', 0.5, 0.8)],
        done: [...PILLARS.map((p) => actor(p.id, { opacity: 1 }, { seconds: 0.5 })), actor('next-pillar', { x: PILLARS.at(-1)!.x, y: PILLARS.at(-1)!.y - 0.03, opacity: 0 }, { seconds: 0.5 })],
      }),
      verse('EXO 24:5', actor('altar', { pose: 'lit' }, { seconds: 0.5, delay: 1 }), fadeIn('altar-smoke', 1.5)),
    ],
  },
  {
    id: 'l10-e3-s2',
    title: 'The blood of the covenant',
    music: 'byrd-ave-verum',
    beats: [
      verse('EXO 24:6', fadeIn('basin', 0.5), fadeIn('basin-glow', 0.5, 0.85), camera({ zoom: 1.02 }, slow)),
      verse('EXO 24:7', fadeIn('scroll'), actor('moses', { pose: 'carry' }, { seconds: 0.8 }), ...['people', 'more-people'].map((id) => actor(id, { pose: 'walk' }, { seconds: 0.4, delay: 5 }))),
      verse('EXO 24:8', ...['people', 'more-people'].map((id) => actor(id, { pose: 'idle' }, { seconds: 0.4 })), fadeOut('scroll'), actor('moses', { pose: 'lift' }, { seconds: 0.6, delay: 1 }), actor('moses', { pose: 'idle' }, { seconds: 0.6, delay: 4 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l10-e3-s3',
    title: 'They beheld God',
    music: 'byrd-ave-verum',
    beats: [
      verse(
        'EXO 24:9',
        // High on the mountain: the elders go up with Moses and Aaron.
        ...[...FOOT, 'moses', 'rod'].map((id) => actor(id, { opacity: 0 }, { seconds: 1 })),
        ...swap('horeb', 'sinai-summit', 1.2),
        actor('moses', { x: 0.74 }, { seconds: 0.1, delay: 2.5 }),
        actor('rod', { x: 0.758 }, { seconds: 0.1, delay: 2.5 }),
        ...['moses', 'rod', 'aaron', 'elders', 'more-elders'].map((id) => fadeIn(id, 3)),
      ),
      verse('EXO 24:10', fadeIn('pavement', 0.5), fadeIn('glory', 1, 0.85), camera({ zoom: 1.02, y: -0.01 }, slow)),
      verse('EXO 24:11', fadeIn('meal', 0.5), camera({ zoom: 1, y: 0 }, slow)),
      verse(
        'EXO 24:18',
        // Moses goes on alone, up into the cloud.
        fadeIn('cloud', 0.5),
        actor('moses', { x: 0.62, y: 0.6, pose: 'walk', facing: -1 }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
        actor('rod', { x: 0.602, y: 0.6 }, { seconds: 5, ease: 'inOutSine', delay: 1 }),
        fadeOut('moses', 4),
        fadeOut('rod', 4),
      ),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: covenantSet, scenes }
