import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 3 · The Stolen Blessing (Genesis 27), from the approved Level 4 script.
 *
 * Isaac, old and blind, sends Esau to hunt so that he may bless him before he dies.
 * Rebekah, listening, makes a plan of her own: she cooks, dresses Jacob in Esau's best
 * robe, and ties goatskins on his hands and neck. "The voice is Jacob's voice, but the
 * hands are the hands of Esau." Isaac blesses him, and the player sets the words of the
 * blessing in the order he spoke them ("the blessing", minigames/the-blessing). The robe
 * Jacob wears glows (this episode's golden thread: clothed in Christ). Esau comes back, and
 * his bitter cry; Jacob flees into the night.
 */

/** The words of Isaac's blessing, in the order he spoke them, and the hint for each when another is chosen. */
export const BLESSING = [
  { words: 'The dew of heaven', hint: 'First come the gifts of the land: dew, earth, grain and wine.' },
  { words: 'The fatness of the earth', hint: 'First come the gifts of the land: dew, earth, grain and wine.' },
  { words: 'Plenty of grain and wine', hint: 'First come the gifts of the land: dew, earth, grain and wine.' },
  { words: 'Peoples serve you', hint: 'After the land, the nations: peoples and nations bowing down.' },
  { words: 'Lord over your brothers', hint: 'Then his own family: his brothers.' },
  { words: 'Blessed be every one who blesses you', hint: 'Last, a blessing on all who bless him.' },
]
/** Where each word's light shines, in an arc over Isaac and Jacob. */
export const WORD_LIGHTS = BLESSING.map((_, i) => ({ id: `word-${i + 1}`, x: 0.33 + i * 0.05, y: 0.46 - Math.sin(((i + 0.5) / BLESSING.length) * Math.PI) * 0.07 }))

const ABOVE = 'tent-inside'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({
  id,
  prop,
  above: ABOVE,
  x,
  y,
  size: prop === 'rebekah' ? 0.038 : 0.042,
  facing: -1,
  ...extra,
})

export const blessingSet: SceneDescription = {
  id: 'l04-blessing',
  title: 'The stolen blessing',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dry-hills', depth: 0.3 },
    // Inside Isaac's tent; it fades away for the night outside.
    { id: 'tent-inside', depth: 0.3 },
  ],
  actors: [
    { id: 'mat', prop: 'feast-mat', above: ABOVE, x: 0.42, y: 0.79, size: 0.16 },
    { id: 'lamp', prop: 'oil-lamp', above: ABOVE, x: 0.33, y: 0.775, size: 0.022 },
    // Rebekah's cooking fire, in another tent.
    { id: 'fire', prop: 'campfire', above: ABOVE, x: 0.74, y: 0.8, size: 0.045, opacity: 0 },
    { id: 'pot', prop: 'stew-pot', above: ABOVE, x: 0.74, y: 0.785, size: 0.04, opacity: 0 },
    // The savory food Jacob brings his father.
    { id: 'dish', prop: 'stew-bowl', above: ABOVE, x: 0.49, y: 0.785, size: 0.026, opacity: 0 },
    // The robe Jacob wears, glowing: the golden thread.
    { id: 'esaus-robe', prop: 'halo', above: ABOVE, x: 0.525, y: 0.62, size: 0.07, opacity: 0 },
    // The words of the blessing, as lights over them.
    ...WORD_LIGHTS.map((w): SceneActor => ({ id: w.id, prop: 'halo', above: ABOVE, x: w.x, y: w.y, size: 0.05, opacity: 0 })),
    // The people.
    person('isaac', 'isaac-old', 0.42, 0.775, { pose: 'kneel', facing: 1 }),
    person('esau', 'esau', 0.53, 0.785, { pose: 'kneel' }),
    person('rebekah', 'rebekah', 0.82, 0.785),
    person('jacob', 'jacob', 0.62, 0.785, { opacity: 0 }),
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

/** After the blessing: every word of it shining over them. */
const BLESSED = WORD_LIGHTS.map((w) => actor(w.id, { opacity: 0.85 }, { seconds: 1 }))

const scenes: StoryScene[] = [
  {
    id: 'l04-e3-s1',
    title: 'Isaac grows old',
    music: 'bach-air',
    beats: [
      verse('GEN 27:1', camera({ zoom: 1.03, x: -0.01 }, slow)),
      verse(
        'GEN 27:4',
        camera({ zoom: 1, x: 0 }, slow),
        // Esau goes out to hunt; at the tent door, Rebekah has heard it all.
        actor('esau', { pose: 'idle' }, { seconds: 0.8, delay: 3 }),
        walkTo('esau', 1.08, 4, 4, 1),
        actor('esau', { opacity: 0 }, { seconds: 1, delay: 7 }),
      ),
      say('In those days a father’s blessing before he died was solemn and final. Once given, it could not be taken back.', actor('rebekah', { facing: 1 }, { seconds: 0.5, delay: 2 })),
    ],
  },
  {
    id: 'l04-e3-s2',
    title: 'Rebekah’s plan',
    music: 'bach-air',
    beats: [
      say(
        'Rebekah remembered what God had said: the elder shall serve the younger. But instead of trusting God, she made a plan of her own.',
        // In Rebekah's tent: she cooks quickly, and calls Jacob.
        ...['isaac', 'mat', 'lamp'].map((id) => fadeOut(id)),
        fadeIn('fire', 1),
        fadeIn('pot', 1.4),
        actor('rebekah', { x: 0.68, pose: 'walk', facing: -1 }, { seconds: 3, ease: 'inOutSine' }),
        stop('rebekah', 3, 'work'),
        actor('jacob', { x: 0.5, facing: 1 }, { seconds: 0.1 }),
        fadeIn('jacob', 2),
      ),
      verse('GEN 27:16', actor('rebekah', { pose: 'carry', facing: -1 }, { seconds: 0.6 }), actor('rebekah', { x: 0.56 }, { seconds: 2, ease: 'inOutSine' }), actor('jacob', { pose: 'lift' }, { seconds: 0.8, delay: 1 })),
      say('Jacob was afraid of being found out. But he went along with the lie.', actor('jacob', { pose: 'idle' }, { seconds: 0.8 }), actor('rebekah', { pose: 'idle', x: 0.66 }, { seconds: 2, ease: 'inOutSine' })),
    ],
  },
  {
    id: 'l04-e3-s3',
    title: 'The voice is Jacob’s voice',
    music: 'bach-air',
    beats: [
      verse(
        'GEN 27:22',
        // Back in Isaac's tent: Jacob kneels at his father's bedside with the dish.
        ...['fire', 'pot', 'rebekah'].map((id) => fadeOut(id)),
        ...['isaac', 'mat', 'lamp'].map((id) => fadeIn(id, 0.5)),
        actor('jacob', { x: 0.525, pose: 'kneel', facing: -1 }, { seconds: 0.1, delay: 0.5 }),
        fadeIn('dish', 1),
        fadeIn('esaus-robe', 1.5, 0.85),
        actor('isaac', { pose: 'carry' }, { seconds: 1, delay: 3 }),
      ),
      verse('GEN 27:27', actor('isaac', { pose: 'lift' }, { seconds: 1 }), camera({ zoom: 1.04, y: -0.01 }, slow)),
      play('the-blessing', { cues: [], done: BLESSED }),
      verse('GEN 27:28', camera({ zoom: 1, y: 0 }, slow)),
      verse('GEN 27:29', ...WORD_LIGHTS.map((w, i) => fadeOut(w.id, 3 + i * 0.2)), actor('isaac', { pose: 'kneel' }, { seconds: 1, delay: 4 })),
    ],
  },
  {
    id: 'l04-e3-s4',
    title: 'A bitter cry',
    music: 'bach-air',
    beats: [
      verse(
        'GEN 27:34',
        fadeOut('esaus-robe'),
        fadeOut('dish'),
        // Jacob slips out; Esau comes in with his own dish, and falls to his knees.
        walkTo('jacob', 1.08, 0, 3, 1),
        actor('jacob', { opacity: 0 }, { seconds: 1, delay: 2.5 }),
        actor('esau', { x: 0.8, pose: 'walk', facing: -1 }, { seconds: 0.1 }),
        fadeIn('esau', 0.5),
        actor('esau', { x: 0.53 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }),
        stop('esau', 3.5, 'kneel'),
        actor('isaac', { pose: 'pray' }, { seconds: 1, delay: 3 }),
      ),
      say('Esau’s grief turned to hatred, and he swore to kill his brother.', actor('esau', { pose: 'idle' }, { seconds: 1, delay: 1 })),
      verse(
        'GEN 27:43',
        // Night outside: Rebekah sends Jacob away.
        layer('tent-inside', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        ...['isaac', 'esau', 'mat', 'lamp'].map((id) => fadeOut(id)),
        actor('rebekah', { x: 0.56, pose: 'idle', facing: -1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('rebekah', 1.5),
        actor('jacob', { x: 0.48, pose: 'idle', facing: 1 }, { seconds: 0.1, delay: 1 }),
        fadeIn('jacob', 1.5),
      ),
      say(
        'Everyone in this family did wrong: Isaac favored one son, Rebekah plotted, Jacob lied, and Esau had despised what he now wept for. God’s plan went on, but the sin cost them dearly: Rebekah never saw her favorite son again.',
        walkTo('jacob', -0.06, 2, 7, -1),
        actor('rebekah', { pose: 'pray' }, { seconds: 1, delay: 4 }),
      ),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: blessingSet, scenes }
