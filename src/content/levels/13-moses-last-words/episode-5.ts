import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · Moses Sees the Land (Deuteronomy 34), from the approved Level 13 script.
 *
 * Moses climbs Mount Nebo alone, and God shows him the whole promised land; the player lights
 * each part of it in turn, until it all shines below him ("all the land",
 * minigames/all-the-land), and the land glows (this episode's golden thread: Moses at last in
 * the land, with Jesus on the mountain of the Transfiguration). Moses dies there at sunset, in
 * God's care; his body is never shown. The people mourn him, and follow Joshua.
 */

/** The parts of the land God shows Moses (Deuteronomy 34:1–3), and where each lies in the view from Nebo. */
export const REGIONS = [
  { id: 'gilead', name: 'Gilead, as far as Dan', x: 0.72, y: 0.3 },
  { id: 'naphtali', name: 'All Naphtali', x: 0.52, y: 0.24 },
  { id: 'ephraim', name: 'Ephraim and Manasseh', x: 0.38, y: 0.36 },
  { id: 'judah', name: 'Judah, as far as the western sea', x: 0.2, y: 0.46 },
  { id: 'negeb', name: 'The Negeb', x: 0.26, y: 0.6 },
  { id: 'jericho', name: 'Jericho, the city of palm trees, as far as Zoar', x: 0.56, y: 0.56 },
].map((r) => ({ ...r, glow: `${r.id}-glow` }))

const NEBO = 'hilltop'
const VIEW = 'nebo-view'
const PLAINS = 'dry-hills'
const onNebo = personOn(NEBO, 0.74)
const person = personOn(PLAINS)

export const neboSet: SceneDescription = {
  id: 'l13-nebo',
  title: 'Moses sees the land',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: NEBO, depth: 0.3 },
    { id: VIEW, depth: 0.2, opacity: 0 },
    { id: PLAINS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Moses on the top of Nebo, with his staff.
    { id: 'rod', prop: 'staff', above: NEBO, x: 0.318, y: 0.74, size: 0.012 },
    onNebo('moses', 'moses-old', 0.3, { facing: 1 }),
    // The land God shows him, each part with its glow, and the whole land shining (the golden thread).
    { id: 'land-glow', prop: 'halo', above: VIEW, x: 0.45, y: 0.42, size: 0.5, opacity: 0 },
    ...REGIONS.map((r): SceneActor => ({ id: r.glow, prop: 'halo', above: VIEW, x: r.x, y: r.y, size: 0.14, opacity: 0 })),
    // The plains of Moab: the people mourning, and Joshua before them.
    { id: 'tent-1', prop: 'striped-tent', above: PLAINS, x: 0.1, y: 0.75, size: 0.1, pose: 'open', facing: 1, opacity: 0 },
    { id: 'tent-2', prop: 'striped-tent', above: PLAINS, x: 0.9, y: 0.75, size: 0.1, pose: 'open', facing: -1, opacity: 0 },
    person('people', 'hebrew-family', 0.24, { size: 0.12, facing: 1, opacity: 0 }),
    person('more-people', 'hebrew-workers', 0.74, { size: 0.12, opacity: 0 }),
    person('joshua', 'joshua', 0.5, { opacity: 0 }),
    { id: 'memory', prop: 'halo', above: PLAINS, x: 0.5, y: 0.36, size: 0.3, opacity: 0 },
  ],
  camera: DRIFT,
}

const MOURNERS = ['tent-1', 'tent-2', 'people', 'more-people']

const scenes: StoryScene[] = [
  {
    id: 'l13-e5-s1',
    title: 'From the top of Pisgah',
    music: 'abide-with-me',
    beats: [
      verse('DEU 34:1', ...walk('moses', { x: 0.42 }, 4, 0.5), actor('rod', { x: 0.438 }, { seconds: 4, ease: 'inOutSine', delay: 0.5 })),
      verse('DEU 34:2', ...swap(NEBO, VIEW), fadeOut('moses'), fadeOut('rod'), fadeIn('land-glow', 1.5, 0.85)),
      verse('DEU 34:3', camera({ zoom: 1.02 }, slow)),
      play('all-the-land', { cues: [camera({ zoom: 1 }, slow)], done: REGIONS.map((r) => actor(r.glow, { opacity: 0.85 }, { seconds: 0.5 })) }),
      verse('DEU 34:4', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l13-e5-s2',
    title: 'Moses the servant of the LORD',
    music: 'abide-with-me',
    beats: [
      verse('DEU 34:5', ...swap(VIEW, NEBO), ...[...REGIONS.map((r) => r.glow), 'land-glow'].map((id) => fadeOut(id)), fadeIn('moses', 1.5), fadeIn('rod', 1.5), actor('moses', { pose: 'sit' }, { seconds: 0.8, delay: 2 }), camera({ zoom: 1 }, slow)),
      verse('DEU 34:6', ...swap('evening-sky', 'night-sky'), fadeOut('moses', 2), fadeOut('rod', 2)),
      verse('DEU 34:7'),
      verse('DEU 34:8', ...swap(NEBO, PLAINS), ...MOURNERS.map((id) => fadeIn(id, 1.5)), actor('people', { pose: 'walk' }, { seconds: 0.4, delay: 3 }), actor('people', { pose: 'idle' }, { seconds: 0.4, delay: 4 })),
    ],
  },
  {
    id: 'l13-e5-s3',
    title: 'Face to face',
    music: 'abide-with-me',
    beats: [
      verse('DEU 34:9', ...swap('night-sky', 'dawn-sky'), fadeIn('joshua', 1), ...pose('joshua', 'lift', 2, 4)),
      verse('DEU 34:10', fadeIn('memory', 0.5, 0.8), camera({ zoom: 1.02, y: -0.01 }, slow)),
      verse('DEU 34:11', fadeOut('memory', 3), camera({ zoom: 1, y: 0 }, slow)),
      say('Moses had brought God’s people out of slavery and all the way to the edge of the promised land. Now Joshua would lead them in.', ...walk('joshua', { x: 0.56, facing: 1 }, 3, 0.5)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: neboSet, scenes }
