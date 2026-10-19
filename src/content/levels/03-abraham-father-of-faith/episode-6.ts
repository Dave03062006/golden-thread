import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · New Names, Everlasting Covenant (Genesis 17), from the approved Level 3
 * script.
 *
 * Abram, ninety-nine, bows before the light: "I am God Almighty; walk before me." God makes
 * his covenant everlasting and gives new names: the player gives each its new name ("new
 * names", minigames/new-names): Abram becomes Abraham, "father of a multitude," Sarai
 * becomes Sarah, and the son not yet born is named Isaac, "he laughs." The new name shines
 * in the air (this episode's golden thread: "You are Peter"). The sign of the covenant;
 * and Abraham, on his face, laughing.
 */

/** The names God gives, with the other names offered, and what each new name means. */
export const NAMES = [
  { old: 'Abram', question: 'God gives Abram a new name. What is it?', answer: 'Abraham', others: ['Israel', 'Isaac', 'Peter'], meaning: 'Abraham: “father of a multitude”' },
  { old: 'Sarai', question: 'And Sarai, his wife: what is her new name?', answer: 'Sarah', others: ['Rebekah', 'Rachel', 'Hagar'], meaning: 'Sarah: “princess,” the mother of nations' },
  { old: '', question: 'And the son God promises them: what will his name be?', answer: 'Isaac', others: ['Ishmael', 'Jacob', 'Esau'], meaning: 'Isaac: “he laughs”' },
]

const ABOVE = 'canaan-hills'
const person = (id: string, prop: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: ABOVE, x, y, size: prop === 'sarai' || prop === 'boy' ? (prop === 'boy' ? 0.03 : 0.038) : 0.042, facing: 1, ...extra })

export const newNamesSet: SceneDescription = {
  id: 'l03-new-names',
  title: 'New names',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'canaan-hills', depth: 0.3 },
  ],
  actors: [
    { id: 'oak', prop: 'great-oak', above: ABOVE, x: 0.18, y: 0.8, size: 0.28 },
    { id: 'tent', prop: 'striped-tent', above: ABOVE, x: 0.72, y: 0.77, size: 0.13, pose: 'open' },
    { id: 'glory', prop: 'glory', above: ABOVE, x: 0.52, y: 0.32, size: 0.32, opacity: 0 },
    // The new name, shining in the air: the golden thread; and soft lights for each name given.
    { id: 'new-name', prop: 'halo', above: ABOVE, x: 0.4, y: 0.22, size: 0.08, opacity: 0 },
    ...NAMES.map((_, i): SceneActor => ({ id: `name-light-${i + 1}`, prop: 'halo', above: ABOVE, x: 0.3 + i * 0.2, y: 0.36, size: 0.06, opacity: 0 })),
    person('abraham', 'abram', 0.44, 0.8, { pose: 'kneel' }),
    person('sarah', 'sarai', 0.62, 0.81, { facing: -1, opacity: 0 }),
    // His household, Ishmael among them.
    { id: 'household', prop: 'crowd', above: ABOVE, x: 0.6, y: 0.82, size: 0.11, facing: -1, opacity: 0 },
    person('ishmael', 'boy', 0.52, 0.83, { facing: -1, opacity: 0 }),
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

/** After the names are given: each name's light shining. */
const NAMED = NAMES.map((_, i) => actor(`name-light-${i + 1}`, { opacity: 0.8 }, { seconds: 1 }))

const scenes: StoryScene[] = [
  {
    id: 'l03-e6-s1',
    title: 'Walk before me',
    music: 'bach-jesu-joy',
    beats: [
      say('Abram was ninety-nine years old, and still there was no son from Sarai. Then God spoke again.', fadeIn('glory', 0.5, 0.8)),
      verse('GEN 17:1', camera({ zoom: 1.04, y: -0.01 }, slow)),
      verse('GEN 17:7', camera({ zoom: 1, y: 0 }, slow)),
    ],
  },
  {
    id: 'l03-e6-s2',
    title: 'Abraham and Sarah',
    music: 'bach-jesu-joy',
    beats: [
      verse('GEN 17:5', fadeIn('new-name', 0.5, 0.9)),
      verse('GEN 17:15', fadeIn('sarah', 0.5)),
      play('new-names', { cues: [], done: NAMED }),
      say('In the Bible, when God gives someone a new name, he gives them a new mission.'),
    ],
  },
  {
    id: 'l03-e6-s3',
    title: 'The sign of the covenant',
    music: 'bach-jesu-joy',
    beats: [
      say(
        'God gave Abraham a sign of the covenant, to be marked on the body of every male in his family, from generation to generation: circumcision.',
        ...NAMES.map((_, i) => fadeOut(`name-light-${i + 1}`)),
        fadeOut('glory'),
        actor('abraham', { pose: 'idle', facing: 1 }, { seconds: 1 }),
        fadeIn('household', 1),
        fadeIn('ishmael', 1.4),
      ),
      verse('GEN 17:10', actor('abraham', { pose: 'lift' }, { seconds: 1 })),
      say('It marked them as belonging to God’s family. Christians receive a new sign of belonging, not cut by hands: Baptism.', actor('abraham', { pose: 'idle' }, { seconds: 1 })),
    ],
  },
  {
    id: 'l03-e6-s4',
    title: 'Abraham laughed',
    music: 'bach-jesu-joy',
    beats: [
      say('Then God promised that Sarah herself would have a son.', fadeOut('household'), fadeOut('ishmael'), fadeIn('glory', 0.5, 0.6)),
      verse('GEN 17:17', actor('abraham', { pose: 'kneel' }, { seconds: 1 })),
      verse('GEN 17:21'),
      say('God even chose the child’s name: Isaac, which means “he laughs.”', fadeOut('glory', 2)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: newNamesSet, scenes }
