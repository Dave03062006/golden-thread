import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · Crossing the Jordan (Joshua 3–5), from the approved Level 14 script.
 *
 * The priests carry the ark into the Jordan in flood, and the river stops; the ark stands in
 * the middle of the dry riverbed, glowing (this episode's golden thread: Jesus baptized in the
 * Jordan), while all Israel crosses. Twelve men, one from each tribe, carry a stone each from
 * the riverbed up to the bank ("twelve stones from the Jordan",
 * minigames/twelve-stones-from-the-jordan), and they are set up at Gilgal. The people keep
 * the Passover, the manna stops, and Joshua meets the commander of the LORD's army.
 */

/** The twelve tribes, each with the stone its man carries from the riverbed up to the bank, and where it stands in the circle at Gilgal. */
export const STONES = ['Reuben', 'Simeon', 'Levi', 'Judah', 'Dan', 'Naphtali', 'Gad', 'Asher', 'Issachar', 'Zebulun', 'Joseph', 'Benjamin'].map((tribe, i) => {
  const a = (i / 12) * Math.PI * 2
  return {
    tribe,
    id: `stone-${i + 1}`,
    circle: `gilgal-stone-${i + 1}`,
    x: Math.round((0.3 + (i % 6) * 0.08) * 1000) / 1000,
    y: i < 6 ? 0.76 : 0.82,
    cx: Math.round((0.5 + Math.sin(a) * 0.16) * 1000) / 1000,
    cy: Math.round((0.74 + Math.cos(a) * 0.04) * 1000) / 1000,
  }
})
/** Where the stones are carried to: up onto the bank, out of the riverbed. */
export const BANK = { y: 0.56 }

const RIVER = 'jordan-valley'
const DRY = 'sea-walls'
const CAMP = 'dry-hills'
const person = personOn(RIVER)
const inRiver = personOn(DRY)
const atGilgal = personOn(CAMP)

export const jordanSet: SceneDescription = {
  id: 'l14-jordan',
  title: 'Crossing the Jordan',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: RIVER, depth: 0.3 },
    { id: DRY, depth: 0.3, opacity: 0 },
    { id: CAMP, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The river in flood, and the priests carrying the ark down to it, with the people behind.
    person('people', 'hebrew-family', 0.14, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.26, { size: 0.12, facing: 1 }),
    person('joshua', 'joshua', 0.36, { facing: 1 }),
    { id: 'ark', prop: 'tabernacle-piece', above: RIVER, x: pieceX('ark', 0.5, 1.2), y: 0.76, size: 1.2, pose: 'ark' },
    person('bearer-1', 'priest', 0.46, { y: 0.79, facing: 1 }),
    person('bearer-2', 'priest', 0.54, { y: 0.79, facing: 1 }),
    // In the dry riverbed: the ark standing still in the middle (the golden thread), and the twelve stones.
    { id: 'ark-glow', prop: 'halo', above: DRY, x: 0.5, y: 0.62, size: 0.2, opacity: 0 },
    { id: 'ark-standing', prop: 'tabernacle-piece', above: DRY, x: pieceX('ark', 0.5, 1.2), y: 0.7, size: 1.2, pose: 'ark', opacity: 0 },
    inRiver('crossers', 'hebrew-family', 0.2, { y: 0.84, size: 0.12, facing: 1, opacity: 0 }),
    ...STONES.map((s): SceneActor => ({ id: s.id, prop: 'stone-pillar', above: DRY, x: s.x, y: s.y, size: 0.025, pose: 'standing', opacity: 0 })),
    // Gilgal: the circle of stones, the Passover, and the commander of the LORD's army.
    ...STONES.map((s): SceneActor => ({ id: s.circle, prop: 'stone-pillar', above: CAMP, x: s.cx, y: s.cy, size: 0.025, pose: 'standing', opacity: 0 })),
    atGilgal('family', 'hebrew-family', 0.82, { size: 0.12, opacity: 0 }),
    { id: 'bread', prop: 'passover-dish', above: CAMP, x: 0.74, y: 0.8, size: 0.04, pose: 'bread', opacity: 0 },
    atGilgal('gilgal-joshua', 'joshua', 0.24, { facing: 1, opacity: 0 }),
    atGilgal('commander', 'angel', 0.36, { size: 0.06, opacity: 0 }),
  ],
  camera: DRIFT,
}

const AT_RIVER = ['people', 'more-people', 'joshua', 'ark', 'bearer-1', 'bearer-2']

const scenes: StoryScene[] = [
  {
    id: 'l14-e2-s1',
    title: 'The ark goes first',
    music: 'swing-low',
    beats: [
      verse('JOS 3:5', ...pose('joshua', 'lift', 0.5, 3)),
      verse('JOS 3:6', ...['ark', 'bearer-1', 'bearer-2'].map((id) => actor(id, { x: id === 'ark' ? pieceX('ark', 0.62, 1.2) : id === 'bearer-1' ? 0.58 : 0.66 }, { seconds: 3, ease: 'inOutSine', delay: 0.5 }))),
      verse('JOS 3:13', camera({ zoom: 1.02 }, slow)),
      verse('JOS 3:15', camera({ zoom: 1 }, slow)),
      verse('JOS 3:16', ...swap(RIVER, DRY), ...AT_RIVER.map((id) => fadeOut(id)), fadeIn('ark-standing', 1.5), fadeIn('ark-glow', 2, 0.85)),
      verse('JOS 3:17', fadeIn('crossers', 0.5), ...walk('crossers', { x: 0.84 }, 6, 0.5)),
    ],
  },
  {
    id: 'l14-e2-s2',
    title: 'Twelve stones',
    music: 'swing-low',
    beats: [
      verse('JOS 4:2', fadeOut('crossers'), ...STONES.map((s, i) => fadeIn(s.id, 0.5 + i * 0.1))),
      verse('JOS 4:3'),
      play('twelve-stones-from-the-jordan', { done: STONES.map((s) => actor(s.id, { y: BANK.y, opacity: 0 }, { seconds: 0.5 })) }),
      verse('JOS 4:6', camera({ zoom: 1.02 }, slow)),
      verse('JOS 4:7', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l14-e2-s3',
    title: 'Gilgal',
    music: 'swing-low',
    beats: [
      verse('JOS 4:19', ...swap(DRY, CAMP), fadeOut('ark-standing'), fadeOut('ark-glow')),
      verse('JOS 4:20', ...STONES.map((s, i) => fadeIn(s.circle, 0.3 + i * 0.15))),
      verse('JOS 5:10', ...swap('forest-sky', 'evening-sky'), fadeIn('family', 1), fadeIn('bread', 1.5)),
      verse('JOS 5:12', ...swap('evening-sky', 'forest-sky')),
      verse('JOS 5:13', fadeOut('family'), fadeOut('bread'), fadeIn('gilgal-joshua', 0.5), fadeIn('commander', 1.5)),
      say('He answered that he came as commander of the army of the LORD. Joshua fell on his face and worshiped.', actor('gilgal-joshua', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      verse('JOS 5:15', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: jordanSet, scenes }
