import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 10 · The Binding of Isaac (Genesis 22–23), from the approved Level 3 script,
 * with the content note shown before it. It is told gently and shown from a distance, and
 * no one is harmed.
 *
 * At night in Beer-sheba, God tests Abraham. At dawn they set out; on the third day the
 * mountain appears, and father and son climb it together, Isaac carrying the wood ("the
 * climb", minigames/the-climb). Halfway up, Isaac asks where the lamb is: "God will
 * provide." On the mountaintop the angel stops Abraham's hand, and a ram is caught in the
 * thicket (this episode's golden thread: the Lamb of God). Abraham and Isaac walk home
 * under the stars; years later, Abraham buries Sarah at Machpelah.
 */

/** The climb: father and son along the path up the mountainside, to where they stop to rest. */
export const CLIMB = [
  { x: 0.25, y: 0.89 },
  { x: 0.33, y: 0.845 },
  { x: 0.41, y: 0.8 },
  { x: 0.5, y: 0.75 },
  { x: 0.565, y: 0.69 },
]
/** How far behind his father Isaac walks along the path, and where the wood sits on his back. */
export const ISAAC_BEHIND = 0.06
export const WOOD_ON = { x: -0.006, y: -0.066 }

const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: 'moriah-top', x, y, size: 0.042, facing: 1, ...extra })

export const moriahSet: SceneDescription = {
  id: 'l03-moriah',
  title: 'The binding of Isaac',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'star-field-1', depth: 0, opacity: 0 },
    { id: 'desert', depth: 0.3 },
    { id: 'dry-hills', depth: 0.3, opacity: 0 },
    { id: 'moriah-far', depth: 0.15, opacity: 0 },
    { id: 'moriah-path', depth: 0.3, opacity: 0 },
    { id: 'canaan-hills', depth: 0.3, opacity: 0 },
    { id: 'moriah-top', depth: 0.3, opacity: 0 },
  ],
  actors: [
    { id: 'tent', prop: 'striped-tent', above: 'moriah-top', x: 0.7, y: 0.78, size: 0.13, pose: 'closed' },
    { id: 'glory', prop: 'glory', above: 'moriah-top', x: 0.45, y: 0.32, size: 0.3, opacity: 0 },
    // On the mountaintop: the altar, the angel, and the ram in the thicket: the golden thread.
    { id: 'altar', prop: 'noah-altar', above: 'moriah-top', x: 0.52, y: 0.745, size: 0.07, pose: 'idle', opacity: 0 },
    { id: 'angel', prop: 'angel', above: 'moriah-top', x: 0.34, y: 0.5, size: 0.05, opacity: 0 },
    { id: 'ram', prop: 'ram-in-thicket', above: 'moriah-top', x: 0.75, y: 0.75, size: 0.12, opacity: 0 },
    { id: 'the-ram', prop: 'halo', above: 'moriah-top', x: 0.77, y: 0.68, size: 0.07, opacity: 0 },
    // The cave of Machpelah, at Hebron.
    { id: 'cave', prop: 'cave-tomb', above: 'moriah-top', x: 0.66, y: 0.78, size: 0.2, opacity: 0 },
    // The journey: the donkey and the two young men.
    { id: 'donkey', prop: 'donkey', above: 'moriah-top', x: 0.12, y: 0.82, size: 0.07, facing: 1, opacity: 0 },
    person('servant-1', 'servant', 0.06, 0.825, { opacity: 0 }),
    person('servant-2', 'servant', 0.2, 0.83, { opacity: 0 }),
    person('isaac', 'isaac', 0.3, 0.83, { opacity: 0 }),
    { id: 'wood', prop: 'wood-bundle', above: 'moriah-top', x: 0.3 + WOOD_ON.x, y: 0.83 + WOOD_ON.y, size: 0.04, opacity: 0 },
    person('abraham', 'abram', 0.5, 0.8),
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
const show = (id: string, to: number) => layer(id, { opacity: to }, { seconds: 3, ease: 'inOutSine' })

/** Where the climb ends: halfway up, father and son, Isaac with the wood. */
const top = CLIMB.at(-1)!
const ISAAC_REST = { x: top.x - ISAAC_BEHIND, y: top.y + 0.035 }
const CLIMBED = [
  actor('abraham', { ...top, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
  actor('isaac', { ...ISAAC_REST, pose: 'idle', facing: 1 }, { seconds: 0.5 }),
  actor('wood', { x: ISAAC_REST.x + WOOD_ON.x, y: ISAAC_REST.y + WOOD_ON.y }, { seconds: 0.5 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l03-e10-s1',
    title: 'Here am I',
    music: 'o-haupt-voll-blut',
    beats: [
      verse('GEN 22:1', fadeIn('glory', 0.5, 0.75), actor('abraham', { pose: 'pray' }, { seconds: 1, delay: 1 })),
      verse('GEN 22:2'),
      say('It was the hardest thing God ever asked of anyone. The son of the promise, the one through whom all the nations were to be blessed.', fadeOut('glory', 2), actor('abraham', { pose: 'idle' }, { seconds: 1, delay: 2 })),
    ],
  },
  {
    id: 'l03-e10-s2',
    title: 'Three days',
    music: 'o-haupt-voll-blut',
    beats: [
      say(
        'Abraham rose early in the morning. He did not argue. He went.',
        // Dawn: the donkey saddled, the young men, Isaac, and the road through the dry hills.
        show('night-sky', 0),
        show('dawn-sky', 1),
        show('desert', 0),
        show('dry-hills', 1),
        fadeOut('tent'),
        ...['donkey', 'servant-1', 'servant-2', 'isaac', 'wood'].map((id, i) => fadeIn(id, 1 + i * 0.3)),
        actor('abraham', { x: 0.4, y: 0.82 }, { seconds: 0.1 }),
        ...[
          ['donkey', 0.62],
          ['servant-1', 0.56],
          ['servant-2', 0.7],
          ['isaac', 0.8],
          ['abraham', 0.88],
        ].map(([id, x], i) => actor(id as string, { x: x as number, pose: 'walk' }, { seconds: 8, ease: 'inOutSine', delay: 2 + i * 0.2 })),
        actor('wood', { x: 0.8 + WOOD_ON.x }, { seconds: 8, ease: 'inOutSine', delay: 2.6 }),
        // On the third day, the mountain far off.
        show('forest-sky', 1),
        layer('moriah-far', { opacity: 1 }, { seconds: 4, ease: 'inOutSine', delay: 6 }),
      ),
      verse(
        'GEN 22:6',
        // Father and son at the foot of the mountain path; the young men and the donkey wait below.
        show('dry-hills', 0),
        show('moriah-path', 1),
        ...['donkey', 'servant-1', 'servant-2'].map((id) => fadeOut(id)),
        actor('abraham', { ...CLIMB[0], pose: 'idle' }, { seconds: 0.1, delay: 2.5 }),
        actor('isaac', { x: CLIMB[0]!.x - ISAAC_BEHIND, y: CLIMB[0]!.y + 0.01, pose: 'idle' }, { seconds: 0.1, delay: 2.5 }),
        actor('wood', { x: CLIMB[0]!.x - ISAAC_BEHIND + WOOD_ON.x, y: CLIMB[0]!.y + 0.01 + WOOD_ON.y }, { seconds: 0.1, delay: 2.5 }),
      ),
      play('the-climb', { cues: [], done: CLIMBED }),
    ],
  },
  {
    id: 'l03-e10-s3',
    title: 'God will provide',
    music: 'o-haupt-voll-blut',
    beats: [
      verse('GEN 22:7', actor('isaac', { facing: -1 }, { seconds: 0.5 })),
      verse('GEN 22:8', actor('abraham', { facing: -1, pose: 'carry' }, { seconds: 0.8 })),
      say('The Letter to the Hebrews says Abraham believed that God could even raise the dead. Whatever happened, he trusted that God would keep his promise.', actor('abraham', { facing: 1, pose: 'idle' }, { seconds: 0.8 }), actor('isaac', { facing: 1 }, { seconds: 0.5 })),
    ],
  },
  {
    id: 'l03-e10-s4',
    title: 'The ram in the thicket',
    music: 'o-haupt-voll-blut',
    beats: [
      say(
        'Abraham built an altar, laid the wood on it, bound Isaac, and laid him on the wood. Isaac, strong enough to carry the wood up a mountain, did not resist his old father.',
        // The mountaintop, seen from a distance.
        show('moriah-path', 0),
        show('moriah-far', 0),
        show('moriah-top', 1),
        camera({ zoom: 0.94, y: -0.01 }, slow),
        fadeIn('altar', 1),
        fadeOut('wood'),
        actor('isaac', { x: 0.52, y: 0.705, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 1 }),
        actor('abraham', { x: 0.4, y: 0.76, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
      ),
      verse('GEN 22:11', fadeIn('angel', 0, 0.95), fadeIn('glory', 0.5, 0.6)),
      verse('GEN 22:12', actor('abraham', { pose: 'kneel' }, { seconds: 1 })),
      verse('GEN 22:13', actor('abraham', { pose: 'idle', facing: 1 }, { seconds: 0.5 }), fadeIn('ram'), fadeIn('the-ram', 1, 0.85), actor('isaac', { x: 0.46, y: 0.76, pose: 'idle' }, { seconds: 1.5, delay: 1 })),
      verse('GEN 22:14', actor('altar', { pose: 'lit' }, { seconds: 1 }), camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l03-e10-s5',
    title: 'As the stars of heaven',
    music: 'o-haupt-voll-blut',
    beats: [
      verse(
        'GEN 22:17',
        // Night again: father and son walk home together under the stars.
        show('forest-sky', 0),
        show('dawn-sky', 0),
        show('night-sky', 1),
        show('star-field-1', 1),
        ...['angel', 'glory', 'ram', 'the-ram', 'altar'].map((id) => fadeOut(id)),
        actor('abraham', { x: 0.72, pose: 'walk' }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
        actor('isaac', { x: 0.66, pose: 'walk' }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
      ),
      verse('GEN 22:18'),
      say(
        'Years later, Sarah died, at a hundred and twenty-seven. Abraham wept for her.',
        // Hebron, years later: the cave of Machpelah.
        show('night-sky', 0),
        show('star-field-1', 0),
        show('forest-sky', 1),
        show('moriah-top', 0),
        show('canaan-hills', 1),
        fadeOut('isaac'),
        fadeIn('cave', 1),
        actor('abraham', { x: 0.42, y: 0.8, pose: 'kneel', facing: 1 }, { seconds: 0.1, delay: 1 }),
      ),
      verse('GEN 23:19'),
      say('It was the first piece of the promised land Abraham ever owned: a grave, bought with silver. The rest he held only in faith. His son Isaac would carry the promise on. That is the next level’s story.'),
    ],
  },
]

export const episode10: Pick<Episode, 'set' | 'scenes'> = { set: moriahSet, scenes }
