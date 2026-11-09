import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 7 · "As for Me and My House" (Joshua 24), from the approved Level 14 script.
 *
 * Old Joshua gathers all the tribes at Shechem, under the oak where God first promised Abraham
 * the land, and sets the choice before them: "As for me and my house, we will serve the LORD."
 * One family at a time, the player helps the families lay down their idols at the foot of the
 * oak and come to stand by Joshua's family ("we will serve the LORD",
 * minigames/we-will-serve-the-lord). Joshua sets up a great stone under the oak, which glows
 * (this episode's golden thread: "Lord, to whom shall we go?"), and dies at a hundred and ten.
 */

/** The families who come one by one, each from where it stands with its idols, to stand by the stone. */
export const FAMILIES = [
  { id: 'family-1', prop: 'hebrew-family', from: 0.08, to: 0.3 },
  { id: 'family-2', prop: 'hebrew-workers', from: 0.16, to: 0.38 },
  { id: 'family-3', prop: 'elders', from: 0.24, to: 0.46 },
  { id: 'family-4', prop: 'hebrew-women', from: 0.32, to: 0.54 },
].map((f, i) => ({ ...f, idol: `idol-${i + 1}`, idolAt: { x: f.from + 0.02, y: 0.76 }, laid: { x: 0.12 + i * 0.03, y: 0.82 } }))
export const FRONT = 0.84

const SHECHEM = 'canaan-hills'
const person = personOn(SHECHEM)

export const shechemSet: SceneDescription = {
  id: 'l14-shechem',
  title: 'As for me and my house',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: SHECHEM, depth: 0.3 },
  ],
  actors: [
    // Shechem: the great oak, Joshua white-haired with his family, and the tribes gathered, some still holding idols.
    { id: 'oak', prop: 'great-oak', above: SHECHEM, x: 0.14, y: 0.8, size: 0.3 },
    person('joshua', 'joshua-old', 0.7),
    person('joshua-house', 'hebrew-family', 0.8, { size: 0.12 }),
    ...FAMILIES.map((f) => person(f.id, f.prop, f.from, { size: 0.12, facing: 1, opacity: 0 })),
    ...FAMILIES.map((f): SceneActor => ({ id: f.idol, prop: 'idol', above: SHECHEM, x: f.idolAt.x, y: f.idolAt.y, size: 0.018, opacity: 0 })),
    // The great stone under the oak (the golden thread), and the book of the law.
    { id: 'stone-glow', prop: 'halo', above: SHECHEM, x: 0.6, y: 0.68, size: 0.2, opacity: 0 },
    { id: 'great-stone', prop: 'stone-pillar', above: SHECHEM, x: 0.6, y: 0.8, size: 0.04, pose: 'standing', opacity: 0 },
    { id: 'book', prop: 'stone-tablets', above: SHECHEM, x: 0.66, y: 0.66, size: 0.06, pose: 'written', opacity: 0 },
  ],
  camera: DRIFT,
}

const SETTLED = [...FAMILIES.map((f) => actor(f.id, { x: f.to, y: FRONT }, { seconds: 0.5 })), ...FAMILIES.map((f) => actor(f.idol, { x: f.laid.x, y: f.laid.y }, { seconds: 0.5 }))]

const scenes: StoryScene[] = [
  {
    id: 'l14-e7-s1',
    title: 'At Shechem',
    music: 'bach-wer-nur',
    beats: [
      verse('JOS 24:1', ...FAMILIES.map((f, i) => fadeIn(f.id, 0.3 + i * 0.4)), ...FAMILIES.map((f, i) => fadeIn(f.idol, 1 + i * 0.4))),
      verse('JOS 24:2', camera({ zoom: 1.02 }, slow)),
      verse('JOS 24:13', camera({ zoom: 1 }, slow)),
      verse('JOS 24:14', ...pose('joshua', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l14-e7-s2',
    title: 'Choose this day',
    music: 'bach-wer-nur',
    beats: [
      verse('JOS 24:15', ...pose('joshua', 'lift', 0.5, 3)),
      verse('JOS 24:16'),
      verse('JOS 24:17', camera({ zoom: 1.02 }, slow)),
      verse('JOS 24:18', camera({ zoom: 1 }, slow)),
      play('we-will-serve-the-lord', { done: SETTLED }),
      verse('JOS 24:24', ...pose('joshua', 'lift', 0.5, 3)),
    ],
  },
  {
    id: 'l14-e7-s3',
    title: 'A great stone under the oak',
    music: 'bach-wer-nur',
    beats: [
      verse('JOS 24:25', fadeIn('book', 0.5)),
      verse('JOS 24:26', fadeOut('book'), fadeIn('great-stone', 0.5), fadeIn('stone-glow', 1, 0.85)),
      verse('JOS 24:29', ...swap('forest-sky', 'evening-sky'), fadeOut('joshua', 1)),
      verse('JOS 24:31', ...swap('evening-sky', 'forest-sky'), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode7: Pick<Episode, 'set' | 'scenes'> = { set: shechemSet, scenes }
