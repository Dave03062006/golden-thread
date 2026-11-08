import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, tabernacle, walk } from './stage'

/**
 * Episode 3 · Priests and Their Vestments (Exodus 28:1–38; Leviticus 8:1–13; 9:22–23), from
 * the approved Level 11 script.
 *
 * God calls Aaron and his sons to serve him as priests, and has holy garments made for
 * Aaron, "for glory and for beauty." The breastpiece with its twelve stones glows (this
 * episode's golden thread: "We have a great high priest… Jesus, the Son of God"). Moses
 * washes Aaron and his sons, and the player dresses Aaron in the order of Leviticus 8
 * ("clothed for glory", minigames/clothed-for-glory). Moses anoints him, and Aaron lifts his
 * hands to bless the people.
 */

/** The holy garments, in the order Moses put them on Aaron (Leviticus 8:7–9), and what each one means. */
export const GARMENTS = [
  { kind: 'coat', name: 'The coat', note: 'A coat of fine linen, white and pure.' },
  { kind: 'girdle', name: 'The girdle', note: 'A girdle woven of blue, purple and scarlet.' },
  { kind: 'robe', name: 'The blue robe', note: 'Golden bells on its hem, so he would be heard in the holy place.' },
  { kind: 'ephod', name: 'The ephod', note: 'An onyx stone on each shoulder, engraved with the names of the tribes.' },
  { kind: 'breastpiece', name: 'The breastpiece', note: 'Twelve stones, one for each tribe, upon his heart.' },
  { kind: 'turban', name: 'The turban', note: 'A turban of fine linen.' },
  { kind: 'plate', name: 'The golden plate', note: 'On his forehead, the holy name: “Holy to the LORD.”' },
].map((g, i) => ({ ...g, id: `garment-${g.kind}`, x: Math.round((0.7 + i * 0.035) * 1000) / 1000, y: 0.69 }))
/** Aaron at the door of the tent: in plain linen, and in his holy garments, drawn over him as he's dressed. */
export const AARON = { x: 0.56, plain: 'aaron', robed: 'aaron-robed' }

const ABOVE = 'horeb'
const person = personOn(ABOVE)
const SONS = ['son-1', 'son-2', 'son-3', 'son-4']

export const priestsSet: SceneDescription = {
  id: 'l11-priests',
  title: 'Priests and their vestments',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'horeb', depth: 0.3 },
  ],
  actors: [
    // The tabernacle in its court, and the people gathered at its door.
    ...tabernacle('tabernacle', ABOVE, { x: 0.27, y: 0.8, size: 0.5 }, ['tent', 'screen', 'altar', 'laver', 'court']),
    { id: 'tent-1', prop: 'striped-tent', above: ABOVE, x: 0.94, y: 0.75, size: 0.1, pose: 'open', facing: -1 },
    person('people', 'hebrew-family', 0.84, { size: 0.12, opacity: 0 }),
    person('more-people', 'hebrew-workers', 0.06, { size: 0.12, facing: 1, opacity: 0 }),
    // Aaron and his four sons; Moses.
    person(AARON.plain, 'aaron-linen', AARON.x),
    person(AARON.robed, 'high-priest', AARON.x, { opacity: 0 }),
    ...SONS.map((id, i) => person(id, 'priest', 0.43 + i * 0.03, { size: 0.04, facing: 1 })),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.638, y: 0.785, size: 0.012 },
    person('moses', 'moses-shepherd', 0.62),
    // The rail with the holy garments, and the glow of the breastpiece (the golden thread).
    { id: 'rail', prop: 'vestment', above: ABOVE, x: 0.805, y: 0.79, size: 0.28, pose: 'rail' },
    { id: 'breastpiece-glow', prop: 'halo', above: ABOVE, x: GARMENTS[4]!.x, y: GARMENTS[4]!.y - 0.03, size: 0.08, opacity: 0 },
    ...GARMENTS.map((g): SceneActor => ({ id: g.id, prop: 'vestment', above: ABOVE, x: g.x, y: g.y, size: 0.034, pose: g.kind })),
    // The anointing oil, and the light over the camp.
    { id: 'oil-glow', prop: 'halo', above: ABOVE, x: AARON.x, y: 0.66, size: 0.06, opacity: 0 },
    { id: 'blessing', prop: 'halo', above: ABOVE, x: 0.5, y: 0.5, size: 0.7, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l11-e3-s1',
    title: 'For glory and for beauty',
    music: 'handel-zadok',
    beats: [
      verse('EXO 28:1', ...pose('moses', 'lift', 1)),
      verse('EXO 28:2', fadeIn('breastpiece-glow', 1, 0.8), camera({ zoom: 1.03, x: 0.02 }, slow)),
      say('On Aaron’s shoulders were two onyx stones, and on his heart twelve precious stones, each engraved with the name of one of the tribes.'),
      verse('EXO 28:29', actor('breastpiece-glow', { size: 0.1 }, slow)),
      verse('EXO 28:36', camera({ zoom: 1, x: 0 }, slow), actor('breastpiece-glow', { size: 0.08 }, slow)),
    ],
  },
  {
    id: 'l11-e3-s2',
    title: 'Moses clothes Aaron',
    music: 'handel-zadok',
    beats: [
      verse('LEV 8:4', fadeIn('people', 0.5), fadeIn('more-people', 0.5), fadeOut('breastpiece-glow')),
      verse('LEV 8:6', ...walk('moses', { x: 0.6 }, 1.5, 0.5), ...pose('moses', 'pray', 2.5, 3)),
      play('clothed-for-glory', { done: [...GARMENTS.map((g) => actor(g.id, { opacity: 0 }, { seconds: 0.5 })), actor(AARON.robed, { opacity: 1 }, { seconds: 0.5 })] }),
      verse('LEV 8:12', fadeIn('oil-glow', 0.5, 0.9), ...pose('moses', 'lift', 0.5, 4), fadeOut('oil-glow', 4)),
    ],
  },
  {
    id: 'l11-e3-s3',
    title: 'Aaron blesses the people',
    music: 'handel-zadok',
    beats: [
      verse('LEV 9:22', ...walk(AARON.plain, { x: 0.52 }, 1, 0), ...walk(AARON.robed, { x: 0.52 }, 1, 0), ...pose(AARON.robed, 'lift', 1.6, 5)),
      verse(
        'LEV 9:23',
        // Moses and Aaron go into the tent, then come out together, and a light shines over the whole camp.
        ...[AARON.plain, AARON.robed, 'moses'].flatMap((id) => walk(id, { x: 0.36, facing: -1 }, 2, 0.5)),
        actor('rod', { opacity: 0 }, { seconds: 0.6, delay: 0.5 }),
        ...[AARON.plain, AARON.robed, 'moses'].flatMap((id) => walk(id, { x: id === 'moses' ? 0.6 : 0.52, facing: 1 }, 2, 3.5)),
        fadeIn('blessing', 5, 0.8),
      ),
      say('Aaron stood between God and his people. He brought their gifts to God, and God’s blessing to them.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: priestsSet, scenes }
