import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, tabernacle, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 6 · Dividing the Land (Joshua 14:6–14; 18:1–10; 21:43–45), from the approved Level 14
 * script.
 *
 * Old Caleb, eighty-five and still strong, asks for the hill country of Hebron. At Shiloh,
 * where the tent of meeting is set up, Joshua casts lots before the LORD, and the player sets
 * each tribe in its portion on the map of the land ("a portion for each",
 * minigames/a-portion-for-each). Then the whole map shines, every part with its tribe (this
 * episode's golden thread: "All the promises of God find their Yes in him").
 */

/** The tribes, in the order their lots come up, each with its portion on the map of the land. */
export const PORTIONS = [
  { tribe: 'Judah', land: 'The southern hill country, around Hebron and Bethlehem', x: 0.44, y: 0.7 },
  { tribe: 'Ephraim', land: 'The hills in the middle of the land, with Shiloh', x: 0.46, y: 0.5 },
  { tribe: 'Manasseh', land: 'The hills north of Ephraim, down to the sea', x: 0.42, y: 0.4 },
  { tribe: 'Benjamin', land: 'The narrow land between Judah and Ephraim, with Jericho', x: 0.52, y: 0.6 },
  { tribe: 'Dan', land: 'The low hills in the west, toward the sea', x: 0.32, y: 0.57 },
  { tribe: 'Zebulun', land: 'The hills of Galilee, between the lake and the sea', x: 0.45, y: 0.25 },
  { tribe: 'Issachar', land: 'The wide valley of Jezreel', x: 0.54, y: 0.33 },
  { tribe: 'Asher', land: 'The coast in the far north-west, toward Tyre', x: 0.35, y: 0.16 },
  { tribe: 'Naphtali', land: 'The far north, beside the Sea of Galilee', x: 0.52, y: 0.14 },
  { tribe: 'Simeon', land: 'The dry south, inside the land of Judah', x: 0.36, y: 0.8 },
  { tribe: 'Reuben', land: 'Across the Jordan, east of the Dead Sea', x: 0.75, y: 0.68 },
  { tribe: 'Gad', land: 'Across the Jordan, in Gilead', x: 0.75, y: 0.45 },
  { tribe: 'Half of Manasseh', land: 'Across the Jordan, in Bashan, far to the north-east', x: 0.76, y: 0.2 },
].map((p) => ({ ...p, id: `portion-${p.tribe.toLowerCase().replace(/ /g, '-')}` }))

const CAMP = 'dry-hills'
const HILLS = 'canaan-hills'
const MAP = 'tribes-map'
const person = personOn(CAMP)
const atShiloh = personOn(HILLS)

export const landSet: SceneDescription = {
  id: 'l14-land',
  title: 'Dividing the land',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: CAMP, depth: 0.3 },
    { id: HILLS, depth: 0.3, opacity: 0 },
    { id: MAP, depth: 0.1, opacity: 0 },
  ],
  actors: [
    // The camp at Gilgal: Joshua, and old Caleb striding up to him.
    { id: 'tent-1', prop: 'striped-tent', above: CAMP, x: 0.14, y: 0.75, size: 0.1, pose: 'open', facing: 1 },
    person('joshua', 'joshua-old', 0.36, { facing: 1 }),
    person('judah-men', 'hebrew-workers', 0.88, { size: 0.12, facing: -1 }),
    person('caleb', 'caleb-old', 0.78, { facing: -1 }),
    // Shiloh: the tent of meeting set up in the land, and the men back with their descriptions of it.
    ...tabernacle('shiloh', HILLS, { x: 0.32, y: 0.76, size: 0.3 }, ['tent', 'court'], { opacity: 0 }),
    atShiloh('shiloh-joshua', 'joshua-old', 0.58, { opacity: 0 }),
    atShiloh('surveyors', 'hebrew-workers', 0.8, { size: 0.12, opacity: 0 }),
    // The map of the land: each tribe's portion, and the whole land shining (the golden thread).
    { id: 'land-glow', prop: 'halo', above: MAP, x: 0.52, y: 0.46, size: 0.6, opacity: 0 },
    ...PORTIONS.map((p): SceneActor => ({ id: p.id, prop: 'halo', above: MAP, x: p.x, y: p.y, size: 0.09, opacity: 0 })),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l14-e6-s1',
    title: '“Give me this hill country”',
    music: 'pachelbel-canon',
    beats: [
      verse('JOS 14:6', ...walk('caleb', { x: 0.5 }, 3, 0.3)),
      verse('JOS 14:7'),
      verse('JOS 14:10', camera({ zoom: 1.02 }, slow)),
      verse('JOS 14:11', camera({ zoom: 1 }, slow)),
      verse('JOS 14:12', ...pose('caleb', 'lift', 0.5, 3)),
      verse('JOS 14:13', ...pose('joshua', 'lift', 0.5, 3), ...walk('caleb', { x: 0.84, facing: 1 }, 4, 3.6), fadeOut('caleb', 6), fadeOut('judah-men', 6)),
    ],
  },
  {
    id: 'l14-e6-s2',
    title: 'Lots at Shiloh',
    music: 'pachelbel-canon',
    beats: [
      verse('JOS 18:1', ...swap(CAMP, HILLS), fadeOut('tent-1'), fadeOut('joshua'), ...['shiloh-tent', 'shiloh-court', 'shiloh-joshua'].map((id) => fadeIn(id, 1))),
      verse('JOS 18:8', fadeIn('surveyors', 0.5)),
      verse('JOS 18:10', ...pose('shiloh-joshua', 'lift', 0.5, 3)),
      play('a-portion-for-each', { cues: [...swap(HILLS, MAP), ...['shiloh-tent', 'shiloh-court', 'shiloh-joshua', 'surveyors'].map((id) => fadeOut(id))], done: PORTIONS.map((p) => actor(p.id, { opacity: 1 }, { seconds: 0.5 })) }),
    ],
  },
  {
    id: 'l14-e6-s3',
    title: 'Not one promise failed',
    music: 'pachelbel-canon',
    beats: [
      verse('JOS 21:43', fadeIn('land-glow', 0.3, 0.85)),
      verse('JOS 21:45', camera({ zoom: 1.02 }, slow)),
      say('God had promised Abraham this land hundreds of years before. Every word had come true.', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: landSet, scenes }
