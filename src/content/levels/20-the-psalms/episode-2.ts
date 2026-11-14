import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · The Lord Is My Shepherd (Psalm 23), from the approved Level 20 script.
 *
 * Young David leads his flock out at dawn. Then the psalm itself, as a landscape: the player leads
 * the shepherd through it, stop by stop, from the green pastures through the dark valley to the
 * open door of the house ("paths of righteousness", minigames/paths-of-righteousness). In the
 * evening the table is set, and the open door glows (this episode's golden thread: "In my
 * Father's house are many rooms").
 */

/** The places of Psalm 23, in order, across the hills. */
export const PSALM_WAY = [
  { x: 0.08, y: 0.78, leg: 'The fold, at dawn' },
  { x: 0.2, y: 0.8, leg: '“He makes me lie down in green pastures.”' },
  { x: 0.33, y: 0.84, leg: '“He leads me beside still waters.”' },
  { x: 0.47, y: 0.72, leg: '“He leads me in paths of righteousness for his name’s sake.”' },
  { x: 0.62, y: 0.86, leg: '“Even though I walk through the valley of the shadow of death, I fear no evil.”' },
  { x: 0.76, y: 0.8, leg: '“Thou preparest a table before me.”' },
  { x: 0.88, y: 0.76, leg: '“And I shall dwell in the house of the Lord for ever.”' },
]
export const SHEPHERD = 'shepherd'

const HILLS = 'canaan-hills'
const PSALM = 'green-hills'
const onHills = personOn(HILLS)

export const shepherdSet: SceneDescription = {
  id: 'l20-shepherd',
  title: 'The Lord is my shepherd',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: HILLS, depth: 0.3 },
    { id: PSALM, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Dawn on the hills of Bethlehem: David leading his flock out.
    onHills('david-young', 'david-young', 0.2, { facing: 1 }),
    ...[0.1, 0.06, 0.14].map((x, i): SceneActor => ({ id: `sheep-${i + 1}`, prop: 'sheep', above: HILLS, x, y: 0.8 + (i % 2) * 0.02, size: 0.04 })),
    // The psalm as a landscape: the pool, the dark valley, the table, and the house with its open door.
    { id: 'pool', prop: 'pool', above: PSALM, x: PSALM_WAY[2]!.x, y: 0.88, size: 0.1, opacity: 0 },
    { id: 'valley-rock', prop: 'great-rock', above: PSALM, x: PSALM_WAY[4]!.x + 0.04, y: 0.88, size: 0.08, opacity: 0 },
    { id: 'table', prop: 'feast-mat', above: PSALM, x: PSALM_WAY[5]!.x, y: 0.84, size: 0.08, opacity: 0 },
    { id: 'cup', prop: 'golden-cup', above: PSALM, x: PSALM_WAY[5]!.x + 0.02, y: 0.82, size: 0.02, opacity: 0 },
    { id: 'house', prop: 'tent', above: PSALM, x: 0.92, y: 0.78, size: 0.12, opacity: 0 },
    { id: 'lamp', prop: 'oil-lamp', above: PSALM, x: 0.92, y: 0.64, size: 0.025, opacity: 0 },
    { id: 'door-glow', prop: 'halo', above: PSALM, x: 0.92, y: 0.7, size: 0.16, opacity: 0 },
    { id: SHEPHERD, prop: 'david-young', above: PSALM, x: PSALM_WAY[0]!.x, y: PSALM_WAY[0]!.y, size: 0.044, facing: 1, opacity: 0 },
  ],
  camera: DRIFT,
}

const psalm = ['pool', 'valley-rock', 'table', 'cup', 'house', SHEPHERD]

const scenes: StoryScene[] = [
  {
    id: 'l20-e2-s1',
    title: 'I shall not want',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      say('David knew what a good shepherd does. He finds grass and water for his sheep, guides them on safe paths, and protects them from danger. So when he sang about God, he sang about a shepherd.', ...walk('david-young', { x: 0.5, facing: 1 }, 6), ...[1, 2, 3].map((n) => actor(`sheep-${n}`, { x: 0.36 + n * 0.04 }, { seconds: 6, delay: 0.6, ease: 'inOutSine' }))),
      verse('PSA 23:1', camera({ zoom: 1.02 }, slow)),
      verse('PSA 23:2', ...swap('dawn-sky', 'forest-sky'), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l20-e2-s2',
    title: 'The valley of the shadow',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('PSA 23:3', ...swap(HILLS, PSALM), ...['david-young', 'sheep-1', 'sheep-2', 'sheep-3'].map((id) => fadeOut(id)), ...psalm.map((id) => fadeIn(id, 1.5))),
      play('paths-of-righteousness', { done: [actor(SHEPHERD, { x: PSALM_WAY.at(-1)!.x, y: PSALM_WAY.at(-1)!.y }, { seconds: 0.5 })] }),
      verse('PSA 23:4', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l20-e2-s3',
    title: 'My cup overflows',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('PSA 23:5', ...swap('forest-sky', 'evening-sky'), fadeIn('lamp', 0.5), actor('door-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 }), camera({ zoom: 1 }, slow)),
      verse('PSA 23:6', camera({ zoom: 1.03, x: 0.02 }, slow)),
      say('A thousand years later, Jesus took up David’s song: “I am the good shepherd” (Level 18). And on the night before he died, he promised his friends a place in his Father’s house.', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: shepherdSet, scenes }
