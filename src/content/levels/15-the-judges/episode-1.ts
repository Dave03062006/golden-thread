import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · The Cycle of Forgetting (Judges 2:6–3:31), from the approved Level 15 script.
 *
 * Joshua and the elders die, and a generation grows up who do not know the LORD. They serve the
 * Baals; raiders come; they cry out; God raises up a judge; the land has rest; and it begins
 * again. The player sets the five steps of the circle in order, three times round ("around and
 * around", minigames/around-and-around). The light that comes down on Othniel glows (this
 * episode's golden thread: "If we are faithless, he remains faithful").
 */

/** The five steps of the circle, as pictures around a wheel in the sky, from the top, clockwise. */
export const CYCLE = [
  { id: 'cycle-idol', prop: 'idol', step: 'The people forget the LORD and serve the Baals', size: 0.03 },
  { id: 'cycle-raiders', prop: 'camel', step: 'Raiders come and take their harvest', size: 0.07 },
  { id: 'cycle-cry', prop: 'hebrew-mother', step: 'The people cry out to the LORD', size: 0.05, pose: 'pray' },
  { id: 'cycle-judge', prop: 'halo', step: 'The LORD raises up a judge to save them', size: 0.08 },
  { id: 'cycle-rest', prop: 'sheaf', step: 'The land has rest', size: 0.05, pose: 'stand' },
].map((c, i) => {
  const a = (i / 5) * Math.PI * 2
  return { ...c, x: Math.round((0.5 + Math.sin(a) * 0.17) * 1000) / 1000, y: Math.round((0.4 - Math.cos(a) * 0.2) * 1000) / 1000 }
})
/** How many times the circle turns in the play: once, then for Othniel, then for Ehud. */
export const TURNS = 3

const HILLS = 'canaan-hills'
const person = personOn(HILLS)

export const cycleSet: SceneDescription = {
  id: 'l15-cycle',
  title: 'The cycle of forgetting',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: HILLS, depth: 0.3 },
  ],
  actors: [
    // Joshua's tomb among the olive trees, the elders growing old, and the children who were never told.
    { id: 'tomb', prop: 'cave-tomb', above: HILLS, x: 0.16, y: 0.78, size: 0.12 },
    person('elders', 'elders', 0.42, { size: 0.12 }),
    person('children', 'hebrew-family', 0.66, { size: 0.12, facing: 1, opacity: 0 }),
    // The hilltop shrine, the people bowing to it, and the raiders.
    { id: 'shrine', prop: 'stone-pillar', above: HILLS, x: 0.3, y: 0.8, size: 0.04, pose: 'standing', opacity: 0 },
    { id: 'idol', prop: 'idol', above: HILLS, x: 0.35, y: 0.8, size: 0.022, opacity: 0 },
    person('bowing', 'hebrew-workers', 0.48, { size: 0.12, opacity: 0 }),
    person('raiders', 'camel', 0.98, { size: 0.08, opacity: 0 }),
    // The circle, as five pictures on a wheel in the sky.
    ...CYCLE.map((c): SceneActor => ({ id: c.id, prop: c.prop, above: HILLS, x: c.x, y: c.y, size: c.size, pose: c.pose, opacity: 0 })),
    // Othniel and Ehud, and the light that comes down on Othniel (the golden thread).
    { id: 'judge-glow', prop: 'halo', above: HILLS, x: 0.5, y: 0.64, size: 0.16, opacity: 0 },
    person('othniel', 'joseph-young', 0.5, { opacity: 0 }),
    person('ehud', 'hebrew-father', 0.7, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l15-e1-s1',
    title: 'A generation who did not know the LORD',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('JDG 2:7', camera({ zoom: 1.02 }, slow)),
      verse('JDG 2:8', camera({ zoom: 1 }, slow)),
      verse('JDG 2:10', fadeOut('elders', 0.5), fadeIn('children', 1), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l15-e1-s2',
    title: 'Around and around',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('JDG 2:11', fadeOut('children'), fadeIn('shrine', 0.5), fadeIn('idol', 0.8), fadeIn('bowing', 1)),
      verse('JDG 2:12', camera({ zoom: 1.02 }, slow)),
      verse('JDG 2:14', fadeIn('raiders', 0.3), actor('raiders', { x: 0.82, pose: 'walk' }, { seconds: 3, ease: 'inOutSine', delay: 0.3 }), actor('raiders', { pose: 'idle' }, { seconds: 0.4, delay: 3.3 }), camera({ zoom: 1 }, slow)),
      verse('JDG 2:16', fadeOut('shrine'), fadeOut('idol'), fadeOut('bowing'), fadeOut('raiders')),
      play('around-and-around', { done: CYCLE.map((c) => actor(c.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('JDG 2:18', ...CYCLE.map((c) => fadeOut(c.id, 0.5))),
      verse('JDG 2:19', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l15-e1-s3',
    title: 'Othniel and Ehud',
    music: 'bach-aus-tiefer-not',
    beats: [
      verse('JDG 3:7', camera({ zoom: 1 }, slow)),
      verse('JDG 3:9', fadeIn('othniel', 0.5)),
      verse('JDG 3:10', actor('judge-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...pose('othniel', 'lift', 0.5, 3)),
      verse('JDG 3:11', ...swap('forest-sky', 'evening-sky'), fadeOut('othniel', 1)),
      say('Then the people forgot God again, and Eglon king of Moab ruled over them for eighteen years. And again they cried to the LORD.', camera({ zoom: 1.02 }, slow)),
      verse('JDG 3:15', ...swap('evening-sky', 'forest-sky'), fadeIn('ehud', 0.5), ...walk('ehud', { x: 0.6 }, 2, 0.8)),
      verse('JDG 3:30', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: cycleSet, scenes }
