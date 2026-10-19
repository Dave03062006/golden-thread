import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Hagar and Ishmael (Genesis 16 and 21:8–21), from the approved Level 3 script.
 *
 * Ten years without a child: Sarai gives her Egyptian maid Hagar to Abram, and jealousy
 * comes into the household; Hagar runs away. By a spring on the road to Shur, the angel of
 * the LORD finds her, and she names him "a God of seeing." Years later Abraham sends her
 * away with the boy Ishmael; in the wilderness of Beer-sheba the water runs out. God hears
 * the boy and opens Hagar's eyes: the player sweeps away the heat haze, following the signs
 * of water to the well ("the well", minigames/the-well), which glows (this episode's
 * golden thread: living water).
 */

/** The signs of water in the wilderness, in the order they lead to the well, and the well itself. */
export const SIGNS = [
  { id: 'sign-1', prop: 'seed-plant', at: { x: 0.4, y: 0.79 }, size: 0.03 },
  { id: 'sign-2', prop: 'seed-plant', at: { x: 0.49, y: 0.76 }, size: 0.035 },
  { id: 'sign-3', prop: 'bird', at: { x: 0.57, y: 0.7 }, size: 0.025 },
]
export const WELL_AT = { x: 0.64, y: 0.78 }

const ABOVE = 'heat-haze'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'boy' ? 0.026 : prop === 'sarai' || prop === 'hagar' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

export const hagarSet: SceneDescription = {
  id: 'l03-hagar',
  title: 'Hagar and Ishmael',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3 },
    { id: 'desert', depth: 0.3, opacity: 0 },
    // The haze over the wilderness: the signs and the well are behind it, the people in front.
    { id: 'heat-haze', depth: 0.3, opacity: 0 },
  ],
  actors: [
    // At Mamre.
    { id: 'oak', prop: 'great-oak', above: 'canaan-hills', x: 0.2, y: 0.8, size: 0.28 },
    { id: 'tent', prop: 'striped-tent', above: 'canaan-hills', x: 0.66, y: 0.77, size: 0.13, pose: 'open' },
    // The spring on the road to Shur, where the angel finds Hagar.
    { id: 'spring', prop: 'stone-well', above: 'desert', x: 0.46, y: 0.77, size: 0.08, opacity: 0 },
    // In the wilderness of Beer-sheba: the bushes, the signs of water, and the well: the golden thread.
    { id: 'bush-1', prop: 'desert-bush', above: 'desert', x: 0.18, y: 0.8, size: 0.1, opacity: 0 },
    { id: 'bush-2', prop: 'desert-bush', above: 'desert', x: 0.84, y: 0.8, size: 0.09, opacity: 0 },
    ...SIGNS.map((s): SceneActor => ({ id: s.id, prop: s.prop, above: 'desert', ...s.at, size: s.size, opacity: 0 })),
    { id: 'well', prop: 'stone-well', above: 'desert', ...WELL_AT, size: 0.08, opacity: 0 },
    { id: 'the-well', prop: 'halo', above: ABOVE, x: WELL_AT.x, y: 0.69, size: 0.07, opacity: 0 },
    // A soft glow over the next sign, in gentle mode.
    { id: 'sign-glow', prop: 'halo', above: ABOVE, ...SIGNS[0]!.at, size: 0.06, opacity: 0 },
    // The people.
    person('abraham', 'abram', 0.48, 0.8, { facing: 1 }),
    person('sarai', 'sarai', 0.56, 0.81),
    person('hagar', 'hagar', 0.36, 0.81, { facing: 1 }),
    person('ishmael', 'boy', 0.42, 0.82, { opacity: 0 }),
    { id: 'angel', prop: 'angel', above: ABOVE, x: 0.58, y: 0.79, size: 0.05, opacity: 0 },
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
const toDesert = [layer('canaan-hills', { opacity: 0 }, { seconds: 3 }), layer('desert', { opacity: 1 }, { seconds: 3 }), fadeOut('oak'), fadeOut('tent')]
const toMamre = [layer('desert', { opacity: 0 }, { seconds: 3 }), layer('canaan-hills', { opacity: 1 }, { seconds: 3 }), fadeIn('oak'), fadeIn('tent')]

/** After the well is found: the haze gone, every sign and the well in sight. */
const FOUND = [layer('heat-haze', { opacity: 0 }, { seconds: 1 }), ...SIGNS.map((s) => actor(s.id, { opacity: 1 }, { seconds: 1 })), actor('well', { opacity: 1 }, { seconds: 1 }), actor('sign-glow', { ...SIGNS.at(-1)!.at, opacity: 0 }, { seconds: 1 })]

const scenes: StoryScene[] = [
  {
    id: 'l03-e5-s1',
    title: 'A plan of their own',
    music: 'swing-low',
    beats: [
      say('Ten years passed in the land, and still Sarai had no child.'),
      verse('GEN 16:2', actor('sarai', { facing: 1 }, { seconds: 0.5 })),
      say(
        'It was a custom of that time, but it was not God’s plan. Hagar became pregnant, and jealousy came into the household. Sarai treated Hagar harshly, and Hagar ran away into the desert.',
        actor('hagar', { x: 0.05, pose: 'walk', facing: -1 }, { seconds: 6, ease: 'inOutSine', delay: 3 }),
        fadeOut('hagar', 7),
      ),
    ],
  },
  {
    id: 'l03-e5-s2',
    title: 'The God who sees',
    music: 'swing-low',
    beats: [
      verse(
        'GEN 16:7',
        ...toDesert,
        fadeOut('abraham'),
        fadeOut('sarai'),
        fadeIn('spring', 1),
        actor('hagar', { x: 0.38, y: 0.8, facing: 1, pose: 'kneel' }, { seconds: 0.1, delay: 1 }),
        fadeIn('hagar', 1.5),
        fadeIn('angel', 3, 0.95),
      ),
      verse('GEN 16:11'),
      say('The name Ishmael means “God hears.”'),
      verse('GEN 16:13', actor('hagar', { pose: 'lift' }, { seconds: 1 })),
      say('Hagar was a slave, a foreigner, running away. She is the first person in the Bible to give God a name: the God who sees.', fadeOut('angel', 2)),
    ],
  },
  {
    id: 'l03-e5-s3',
    title: 'Sent away',
    music: 'swing-low',
    beats: [
      say(
        'After Isaac was born (Episode 9 tells it), Sarah would not let Ishmael stay. Abraham was grieved, but God told him he would care for the boy.',
        // Years later, at Mamre, at dawn.
        ...toMamre,
        layer('forest-sky', { opacity: 0 }, { seconds: 3 }),
        layer('dawn-sky', { opacity: 1 }, { seconds: 3 }),
        fadeOut('spring'),
        actor('hagar', { x: 0.42, y: 0.81, facing: 1, pose: 'idle' }, { seconds: 0.1 }),
        actor('ishmael', { x: 0.36, y: 0.82, facing: 1 }, { seconds: 0.1 }),
        fadeIn('ishmael', 1),
        actor('abraham', { x: 0.52, y: 0.8, facing: -1, pose: 'idle' }, { seconds: 0.1 }),
        fadeIn('abraham', 1),
      ),
      verse(
        'GEN 21:14',
        actor('abraham', { pose: 'carry' }, { seconds: 0.6 }),
        actor('abraham', { pose: 'idle' }, { seconds: 0.6, delay: 2 }),
        ...['hagar', 'ishmael'].map((id, i) => actor(id, { x: 0.02 + i * 0.05, pose: 'walk', facing: -1 }, { seconds: 7, ease: 'inOutSine', delay: 2.5 + i * 0.3 })),
        ...['hagar', 'ishmael'].map((id) => fadeOut(id, 7.5)),
      ),
    ],
  },
  {
    id: 'l03-e5-s4',
    title: 'God heard the boy',
    music: 'swing-low',
    beats: [
      say(
        'The water ran out. Hagar could not bear to watch her son die.',
        // The wilderness of Beer-sheba, shimmering in the heat.
        ...toDesert,
        layer('dawn-sky', { opacity: 0 }, { seconds: 3 }),
        layer('forest-sky', { opacity: 1 }, { seconds: 3 }),
        layer('heat-haze', { opacity: 1 }, { seconds: 3 }),
        fadeOut('abraham'),
        fadeIn('bush-1', 1),
        fadeIn('bush-2', 1),
        actor('ishmael', { x: 0.8, y: 0.82, facing: -1, pose: 'idle' }, { seconds: 0.1, delay: 1 }),
        fadeIn('ishmael', 1.5),
        actor('hagar', { x: 0.22, y: 0.82, facing: -1, pose: 'kneel' }, { seconds: 0.1, delay: 1 }),
        fadeIn('hagar', 1.5),
      ),
      verse('GEN 21:17', fadeIn('angel', 1, 0.6), actor('angel', { x: 0.5, y: 0.6 }, { seconds: 0.1 })),
      play('the-well', { cues: [fadeOut('angel')], done: FOUND }),
      verse(
        'GEN 21:19',
        fadeIn('the-well', 0, 0.85),
        actor('hagar', { x: 0.6, y: 0.8, facing: 1, pose: 'walk' }, { seconds: 4, ease: 'inOutSine' }),
        actor('hagar', { pose: 'carry' }, { seconds: 0.5, delay: 4 }),
        actor('ishmael', { x: 0.7, y: 0.81, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 4 }),
        actor('ishmael', { pose: 'idle' }, { seconds: 0.5, delay: 7 }),
      ),
      verse('GEN 21:20', camera({ zoom: 1.03 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: hagarSet, scenes }
