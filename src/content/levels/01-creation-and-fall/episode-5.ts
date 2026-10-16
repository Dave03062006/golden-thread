import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 5 · Cain and Abel (Genesis 4:1–16), from the approved Level 1 script. A
 * content note is shown before it (see level.ts).
 *
 * The family's home on a hillside outside the garden: Cain's field on the left, Abel's
 * pasture and sheepfold on the right. The brothers grow up; Abel's flock comes home and
 * he chooses his offering ("Abel's flock", minigames/abels-flock); the two altars, the
 * smoke rising and the smoke that hangs low; sin crouching at the door at dusk; the two
 * walking out into the field.
 *
 * The murder is told with restraint, as the script asks: the two walk away into the
 * distance, the light fails, and only a single bird rises from the field. Nothing is
 * shown. Then the ground where Abel fell glows faintly (this episode's golden thread),
 * and Cain goes east with a small light on his forehead, the mark of God's protection
 * (Cain's 'marked' pose).
 */

export interface FlockAnimal {
  id: string
  lamb: boolean
  /** One of the firstborn lambs, the first and best of the flock (Genesis 4:4). */
  firstborn: boolean
  /** Lambs that wander off and need nudging back (not in gentle mode). */
  wanders: boolean
  /** Where it grazes at first. */
  x: number
  y: number
  /** Its place inside the fold. */
  slot: { x: number; y: number }
}

/** Abel's flock, scattered over the pasture. */
export const FLOCK: FlockAnimal[] = [
  { id: 'sheep-1', lamb: false, firstborn: false, wanders: false, x: 0.52, y: 0.72, slot: { x: 0.71, y: 0.765 } },
  { id: 'sheep-2', lamb: false, firstborn: false, wanders: false, x: 0.57, y: 0.8, slot: { x: 0.765, y: 0.75 } },
  { id: 'sheep-3', lamb: false, firstborn: false, wanders: false, x: 0.5, y: 0.84, slot: { x: 0.82, y: 0.76 } },
  { id: 'sheep-4', lamb: false, firstborn: false, wanders: false, x: 0.6, y: 0.7, slot: { x: 0.86, y: 0.78 } },
  { id: 'sheep-5', lamb: false, firstborn: false, wanders: false, x: 0.55, y: 0.85, slot: { x: 0.735, y: 0.805 } },
  { id: 'sheep-6', lamb: false, firstborn: false, wanders: false, x: 0.47, y: 0.78, slot: { x: 0.8, y: 0.805 } },
  { id: 'lamb-1', lamb: true, firstborn: true, wanders: false, x: 0.58, y: 0.76, slot: { x: 0.745, y: 0.78 } },
  { id: 'lamb-2', lamb: true, firstborn: true, wanders: true, x: 0.53, y: 0.82, slot: { x: 0.79, y: 0.78 } },
  { id: 'lamb-3', lamb: true, firstborn: false, wanders: true, x: 0.62, y: 0.84, slot: { x: 0.845, y: 0.805 } },
]

/** The fold's gate, on its left side, facing the pasture. */
export const FOLD_GATE = { x: 0.655, y: 0.778 }
/** Where the staff starts: behind the flock, on the hillside. */
export const STAFF_START = { x: 0.4, y: 0.8 }

const animal = (a: FlockAnimal): SceneActor => ({
  id: a.id,
  prop: 'sheep',
  above: 'home-fold',
  x: a.x,
  y: a.y,
  size: a.lamb ? 0.034 : 0.05,
  facing: 1,
  opacity: 0,
})

export const homeSet: SceneDescription = {
  id: 'l01-home',
  title: 'A hillside home outside the garden',
  layers: [
    { id: 'home-sky', depth: 0 },
    { id: 'home-hills', depth: 0.15 },
    { id: 'home-land', depth: 0.45 },
    { id: 'home-fold', depth: 0.45 },
    // The barren land east of Eden, where Cain goes at the end.
    { id: 'east-sky', depth: 0, opacity: 0 },
    { id: 'east-hills', depth: 0.15, opacity: 0 },
    { id: 'east-land', depth: 0.45, opacity: 0 },
    { id: 'eden-dusk', depth: 0, opacity: 0 },
  ],
  actors: [
    { id: 'tent', prop: 'tent', above: 'home-fold', x: 0.2, y: 0.72, size: 0.14 },
    { id: 'altar-cain', prop: 'altar', above: 'home-fold', x: 0.36, y: 0.74, size: 0.07, opacity: 0 },
    { id: 'altar-abel', prop: 'altar', above: 'home-fold', x: 0.5, y: 0.74, size: 0.07, opacity: 0 },
    { id: 'smoke-cain', prop: 'smoke', above: 'home-fold', x: 0.36, y: 0.672, size: 0.1, pose: 'low', opacity: 0 },
    { id: 'smoke-abel', prop: 'smoke', above: 'home-fold', x: 0.5, y: 0.672, size: 0.1, pose: 'rising', opacity: 0 },
    // Sin couching at the door of the tent, unseen until scene 5.3.
    { id: 'sin', prop: 'sin', above: 'home-fold', x: 0.2, y: 0.72, size: 0.06, opacity: 0 },
    // The ground where Abel fell, where this episode's golden thread is found.
    // Out in the field where the two walked, above the story's panel so it can be reached.
    { id: 'crying-ground', prop: 'ground-glow', above: 'home-fold', x: 0.09, y: 0.68, size: 0.14, opacity: 0 },
    ...FLOCK.map(animal),
    // The firstborn lambs' soft glow, once they're in the fold.
    ...FLOCK.filter((a) => a.firstborn).map((a, i) => ({ id: `firstborn-glow-${i + 1}`, prop: 'halo', above: 'home-fold', x: a.slot.x, y: a.slot.y - 0.02, size: 0.05, opacity: 0 })),
    { id: 'staff', prop: 'staff', above: 'home-fold', x: STAFF_START.x, y: STAFF_START.y, size: 0.03, opacity: 0 },
    { id: 'bird', prop: 'bird', above: 'east-land', x: 0.18, y: 0.66, size: 0.02, opacity: 0 },
    { id: 'man', prop: 'man', above: 'east-land', x: 0.27, y: 0.75, size: 0.045, facing: 1, pose: 'clothed' },
    { id: 'woman', prop: 'woman', above: 'east-land', x: 0.31, y: 0.75, size: 0.042, facing: -1, pose: 'clothed' },
    { id: 'cain', prop: 'cain', above: 'east-land', x: 0.29, y: 0.77, size: 0.02, facing: 1, opacity: 0 },
    { id: 'abel', prop: 'abel', above: 'east-land', x: 0.34, y: 0.77, size: 0.019, facing: 1, opacity: 0 },
    // God shown as light.
    { id: 'glory', prop: 'glory', above: 'eden-dusk', x: 0.5, y: 0.42, size: 0.3, opacity: 0 },
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.006 },
      { at: 18, value: 0.006, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 18, value: -0.004, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 18, value: 1.012, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const

/** After "Abel's flock": every animal in its place in the fold, the staff put away. */
const FLOCK_HOME = [
  ...FLOCK.map((a) => actor(a.id, { x: a.slot.x, y: a.slot.y, facing: 1, pose: 'idle' }, { seconds: 1.5, ease: 'inOutSine' })),
  actor('staff', { x: FOLD_GATE.x, y: FOLD_GATE.y + 0.04, opacity: 0 }, { seconds: 1.5 }),
  actor('firstborn-glow-1', { opacity: 0 }, { seconds: 2 }),
  actor('firstborn-glow-2', { opacity: 0 }, { seconds: 2 }),
]

const scenes: StoryScene[] = [
  {
    id: 'l01-e5-s1',
    title: 'Two brothers',
    music: 'bach-ich-ruf',
    beats: [
      say('Outside the garden, life went on.', camera({ zoom: 1.06, x: -0.04 }, slow)),
      say('Eve bore a son, Cain, and said:', actor('cain', { opacity: 1 }, { seconds: 2, delay: 1 })),
      verse('GEN 4:1'),
      say('Then she bore his brother, Abel.', actor('abel', { opacity: 1 }, { seconds: 2, delay: 0.5 })),
      say(
        'Abel became a keeper of sheep, and Cain a tiller of the ground.',
        camera({ zoom: 1, x: 0 }, slow),
        actor('cain', { size: 0.045, x: 0.14, y: 0.84, facing: -1, pose: 'work' }, { seconds: 6, ease: 'inOutSine' }),
        // Beside the fold, watching over the flock, clear of its gate.
        actor('abel', { size: 0.044, x: 0.94, y: 0.8, facing: -1, pose: 'tend' }, { seconds: 6, ease: 'inOutSine' }),
        ...FLOCK.map((a, i) => actor(a.id, { opacity: 1 }, { seconds: 2, delay: 2 + i * 0.25 })),
        actor('man', { opacity: 0 }, { seconds: 4, delay: 2 }),
        actor('woman', { opacity: 0 }, { seconds: 4, delay: 2 }),
      ),
    ],
  },
  {
    id: 'l01-e5-s2',
    title: 'Two offerings',
    music: 'bach-ich-ruf',
    beats: [
      play('abels-flock', { cues: [actor('staff', { opacity: 1 }, { seconds: 1 }), actor('abel', { pose: 'idle' }, { seconds: 1 })], done: FLOCK_HOME }),
      say(
        'In time, both brothers brought offerings to the LORD. Cain brought some of the fruit of the ground.',
        actor('altar-cain', { opacity: 1 }, { seconds: 2 }),
        actor('altar-abel', { opacity: 1 }, { seconds: 2 }),
        actor('cain', { x: 0.31, y: 0.77, pose: 'offer' }, { seconds: 4, ease: 'inOutSine' }),
        actor('smoke-cain', { opacity: 0.8 }, { seconds: 3, delay: 3 }),
        camera({ zoom: 1.08, x: -0.03, y: 0.02 }, slow),
      ),
      verse(
        'GEN 4:4',
        actor('abel', { x: 0.55, y: 0.77, facing: -1, pose: 'offer' }, { seconds: 4, ease: 'inOutSine' }),
        actor('smoke-abel', { opacity: 1 }, { seconds: 3, delay: 3 }),
      ),
      say('The LORD had regard for Abel and his offering, but not for Cain’s.', actor('glory', { opacity: 0.55 }, { seconds: 4 })),
      say('Why? Genesis notices the difference in the gifts: Abel gave the first and the best. The Letter to the Hebrews sees the difference in the heart:'),
      verse('HEB 11:4', actor('glory', { opacity: 0 }, { seconds: 5, delay: 3 })),
    ],
  },
  {
    id: 'l01-e5-s3',
    title: 'Sin at the door',
    music: 'bach-ich-ruf',
    beats: [
      say(
        'Cain was very angry, and his face fell.',
        layer('eden-dusk', { opacity: 0.7 }, { seconds: 6, ease: 'inOutSine' }),
        actor('smoke-cain', { opacity: 0 }, { seconds: 3 }),
        actor('smoke-abel', { opacity: 0 }, { seconds: 3 }),
        actor('abel', { opacity: 0 }, { seconds: 3 }),
        actor('cain', { x: 0.27, y: 0.75, facing: 1, pose: 'fallen' }, { seconds: 4, ease: 'inOutSine' }),
        camera({ zoom: 1.12, x: -0.06, y: 0.03 }, slow),
      ),
      say(
        'The LORD spoke to him: why are you angry, and why has your face fallen?',
        actor('glory', { x: 0.42, y: 0.42, opacity: 0.45 }, { seconds: 4 }),
      ),
      verse('GEN 4:7', actor('sin', { opacity: 0.95 }, { seconds: 5, ease: 'inOutSine' })),
      say(
        'God warned Cain the way a father warns a son. Sin was waiting at the door like a crouching animal, but Cain could still master it. The choice was still his.',
      ),
    ],
  },
  {
    id: 'l01-e5-s4',
    title: 'In the field',
    music: 'bach-ich-ruf',
    beats: [
      say(
        'Cain said to his brother Abel, “Let us go out to the field.”',
        actor('glory', { opacity: 0 }, { seconds: 3 }),
        actor('sin', { opacity: 0 }, { seconds: 4 }),
        actor('abel', { x: 0.3, y: 0.75, facing: -1, pose: 'idle', opacity: 1 }, { seconds: 2 }),
        actor('cain', { pose: 'idle', facing: -1 }, { seconds: 1 }),
        // The two walk away into the field, growing small in the distance.
        actor('cain', { x: 0.05, y: 0.67, size: 0.024 }, { seconds: 9, ease: 'inOutSine', delay: 2 }),
        actor('abel', { x: 0.09, y: 0.67, size: 0.024 }, { seconds: 9, ease: 'inOutSine', delay: 2 }),
        camera({ zoom: 1, x: 0, y: 0 }, { seconds: 8, ease: 'inOutSine' }),
      ),
      say(
        'And there, in the field, Cain rose up against his brother Abel and killed him.',
        layer('eden-dusk', { opacity: 1 }, { seconds: 6, ease: 'inOutSine' }),
        actor('abel', { opacity: 0 }, { seconds: 4, delay: 1 }),
        actor('cain', { opacity: 0.4 }, { seconds: 4, delay: 1 }),
        actor('bird', { opacity: 1 }, { seconds: 1, delay: 3 }),
        actor('bird', { x: 0.36, y: 0.2 }, { seconds: 7, ease: 'inOutSine', delay: 3 }),
        actor('bird', { opacity: 0 }, { seconds: 2, delay: 9 }),
      ),
    ],
  },
  {
    id: 'l01-e5-s5',
    title: '“Where is your brother?”',
    music: 'bach-ich-ruf',
    beats: [
      verse(
        'GEN 4:9',
        actor('cain', { x: 0.24, y: 0.78, size: 0.045, facing: 1, pose: 'fallen', opacity: 1 }, { seconds: 4, ease: 'inOutSine' }),
        actor('glory', { x: 0.44, y: 0.44, opacity: 0.7 }, { seconds: 5, ease: 'inOutSine' }),
      ),
      say('Once, God had asked, “Where are you?” Now he asked, “Where is your brother?” The first sin broke trust with God. This one broke the human family.'),
    ],
  },
  {
    id: 'l01-e5-s6',
    title: 'The voice of blood, and the mark',
    music: 'bach-ich-ruf',
    beats: [
      verse('GEN 4:10', actor('crying-ground', { opacity: 1 }, { seconds: 4, delay: 1 })),
      say('Cain would wander the earth, and the ground would no longer yield its strength to him.'),
      say('Cain cried out that his punishment was more than he could bear, and that anyone who found him would kill him.'),
      say(
        'Even then, God protected him. The LORD put a mark on Cain so that no one who came upon him would kill him.',
        // The mark: a small light on his forehead (his 'marked' pose).
        actor('cain', { pose: 'marked' }, { seconds: 2, ease: 'inOutSine', delay: 1 }),
      ),
      say(
        'And Cain went away from the presence of the LORD and settled in the land of Nod,',
        layer('east-sky', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('east-hills', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('east-land', { opacity: 1 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
        layer('eden-dusk', { opacity: 0.35 }, { seconds: 7, delay: 1 }),
        actor('glory', { opacity: 0 }, { seconds: 4 }),
        actor('crying-ground', { opacity: 0 }, { seconds: 5, delay: 2 }),
        actor('cain', { x: 0.06, facing: -1 }, { seconds: 10, ease: 'inOutSine', delay: 1 }),
      ),
      verse('GEN 4:16'),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: homeSet, scenes }
