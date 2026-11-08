import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, walk } from './stage'

/**
 * Episode 1 · The Pattern of the Tabernacle (Exodus 25:1–9; 31:1–6; 35:20–36:7; 39:32–43),
 * from the approved Level 11 script.
 *
 * On the mountain, God shows Moses the plan of a sanctuary, drawn in light (this episode's
 * golden thread: "Destroy this temple, and in three days I will raise it up"). The people
 * bring their gifts from willing hearts, and the player brings each to its place in the
 * workshop ("gifts for the sanctuary", minigames/gifts-for-the-sanctuary), until there is
 * "much more than enough." Bezalel and Oholiab, filled with the Spirit of God, make it all.
 */

/** God's list (Exodus 25:3–7): each gift, where it comes from in the camp, and its place in the workshop. */
export const GIFTS = [
  { kind: 'gold', name: 'Gold', use: 'For the ark, the mercy seat and the lampstand.' },
  { kind: 'silver', name: 'Silver', use: 'For the bases that hold up the frames.' },
  { kind: 'bronze', name: 'Bronze', use: 'For the altar and the basin of water.' },
  { kind: 'yarn', name: 'Blue, purple and scarlet yarn', use: 'For the veil and the curtains.' },
  { kind: 'linen', name: 'Fine linen', use: 'For the curtains and the priests’ garments.' },
  { kind: 'goats-hair', name: 'Goats’ hair', use: 'Woven into the tent over the tabernacle.' },
  { kind: 'rams-skins', name: 'Rams’ skins, dyed red', use: 'A covering for the tent.' },
  { kind: 'acacia', name: 'Acacia wood', use: 'For the frames, the ark and the table.' },
  { kind: 'oil', name: 'Oil for the lamps', use: 'To keep the lampstand burning.' },
  { kind: 'spices', name: 'Spices', use: 'For the anointing oil and the sweet incense.' },
  { kind: 'onyx', name: 'Onyx and precious stones', use: 'For the ephod and the breastpiece.' },
].map((g, i) => ({
  ...g,
  id: `gift-${g.kind}`,
  place: `place-${g.kind}`,
  from: { x: Math.round((0.05 + (i % 6) * 0.055) * 1000) / 1000, y: i < 6 ? 0.7 : 0.66 },
  to: { x: Math.round((0.42 + i * 0.05) * 1000) / 1000, y: i % 2 ? 0.66 : 0.71 },
}))
/** The heap that grows past the list, at the end: how big it starts and ends. */
export const HEAP = { id: 'heap', x: 0.68, y: 0.79, from: 0.04, to: 0.12 }

const ABOVE = 'horeb'
const person = personOn(ABOVE)
/** Where the plan of the tabernacle is drawn in light, beside the mountain. */
const PLAN = { x: 0.64, y: 0.3 }
const WORKSHOP = ['bezalel', 'oholiab', 'weaver', 'sawyer']
const FINISHED = ['done-ark', 'done-table', 'done-lampstand']

export const patternSet: SceneDescription = {
  id: 'l11-pattern',
  title: 'The pattern of the tabernacle',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'horeb', depth: 0.3 },
  ],
  actors: [
    // Mount Sinai in its cloud, with Moses high on it, and the plan drawn in light (the golden thread).
    { id: 'storm', prop: 'storm-cloud', above: ABOVE, x: 0.44, y: 0.2, size: 0.3, opacity: 0.85 },
    person('moses-high', 'moses-shepherd', 0.44, { y: 0.27, size: 0.02, facing: 1 }),
    { id: 'plan-glow', prop: 'halo', above: ABOVE, x: PLAN.x, y: PLAN.y, size: 0.26, opacity: 0 },
    { id: 'plan', prop: 'tabernacle-plan', above: ABOVE, x: PLAN.x, y: PLAN.y, size: 0.22, opacity: 0 },
    // The camp.
    ...[0.08, 0.2, 0.9].map((x, i): SceneActor => ({ id: `tent-${i + 1}`, prop: 'striped-tent', above: ABOVE, x, y: 0.75, size: 0.1, pose: 'open', facing: i % 2 ? -1 : 1 })),
    person('people', 'hebrew-family', 0.28, { size: 0.12, facing: 1 }),
    { id: 'rod', prop: 'staff', above: ABOVE, x: 0.518, y: 0.785, size: 0.012, opacity: 0 },
    person('moses', 'moses-shepherd', 0.5, { opacity: 0 }),
    // The workshop: its empty places, the gifts brought to them, and the heap that grows past the list.
    ...GIFTS.map((g): SceneActor => ({ id: g.place, prop: 'halo', above: ABOVE, x: g.to.x, y: g.to.y - 0.015, size: 0.04, opacity: 0 })),
    ...GIFTS.map((g): SceneActor => ({ id: g.id, prop: 'gift', above: ABOVE, x: g.from.x, y: g.from.y, size: 0.034, pose: g.kind, opacity: 0 })),
    { id: HEAP.id, prop: 'gift', above: ABOVE, x: HEAP.x, y: HEAP.y, size: HEAP.from, pose: 'heap', opacity: 0 },
    // Bezalel at his forge, Oholiab weaving, a woman spinning, a man sawing acacia boards.
    { id: 'forge', prop: 'forge', above: ABOVE, x: 0.58, y: 0.8, size: 0.06, opacity: 0 },
    person('bezalel', 'bezalel', 0.53, { facing: 1, opacity: 0 }),
    person('oholiab', 'oholiab', 0.7, { opacity: 0 }),
    person('weaver', 'hebrew-mother', 0.78, { opacity: 0 }),
    person('sawyer', 'hebrew-father', 0.86, { opacity: 0 }),
    // The finished work, set out before Moses.
    { id: 'done-ark', prop: 'tabernacle-piece', above: ABOVE, x: pieceX('ark', 0.4, 0.4), y: 0.8, size: 0.4, pose: 'ark', opacity: 0 },
    { id: 'done-table', prop: 'tabernacle-piece', above: ABOVE, x: pieceX('table', 0.62, 0.4), y: 0.8, size: 0.4, pose: 'table', opacity: 0 },
    { id: 'done-lampstand', prop: 'tabernacle-piece', above: ABOVE, x: pieceX('lampstand', 0.72, 0.4), y: 0.8, size: 0.4, pose: 'lampstand', opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l11-e1-s1',
    title: '“That I may dwell in their midst”',
    music: 'parry-psalm-84',
    beats: [
      say('On the mountain, during his forty days with God, Moses had been shown something more than the commandments. God had shown him a plan.', camera({ zoom: 1.03, y: -0.02 }, slow), fadeIn('plan-glow', 1, 0.8)),
      verse('EXO 25:2', fadeIn('plan', 0.5, 0.9)),
      verse('EXO 25:8'),
      verse('EXO 25:9', actor('plan', { size: 0.26 }, { seconds: 6, ease: 'inOutSine' })),
      say('The people lived in tents. God wanted a tent too, in the middle of theirs. Now that he had forgiven them, it was time to build it.', camera({ zoom: 1, y: 0 }, slow), actor('plan', { size: 0.22 }, slow)),
    ],
  },
  {
    id: 'l11-e1-s2',
    title: 'Gifts for the sanctuary',
    music: 'parry-psalm-84',
    beats: [
      verse('EXO 35:21', fadeOut('plan'), fadeOut('plan-glow'), fadeOut('moses-high'), fadeIn('moses', 1), fadeIn('rod', 1), ...pose('moses', 'lift', 2)),
      verse('EXO 35:22', ...GIFTS.slice(0, 6).map((g, i) => fadeIn(g.id, 0.5 + i * 0.3))),
      say('The same people who had given their gold for a calf now gave it gladly for God’s house.', ...GIFTS.slice(6).map((g, i) => fadeIn(g.id, 0.5 + i * 0.3))),
      play('gifts-for-the-sanctuary', {
        cues: [fadeOut('moses'), fadeOut('rod'), ...GIFTS.map((g) => fadeIn(g.place, 0.5, 0.45))],
        done: [
          ...GIFTS.flatMap((g) => [actor(g.id, { ...g.to, opacity: 1 }, { seconds: 0.5 }), actor(g.place, { opacity: 0 }, { seconds: 0.5 })]),
          actor(HEAP.id, { size: HEAP.to, opacity: 1 }, { seconds: 0.5 }),
        ],
      }),
      verse('EXO 36:5', fadeIn('bezalel'), fadeIn('oholiab'), ...walk('oholiab', { x: 0.56 }, 3, 1)),
      verse('EXO 36:6', fadeIn('moses'), fadeIn('rod'), ...pose('moses', 'lift', 1)),
      verse('EXO 36:7', ...walk('oholiab', { x: 0.7, facing: -1 }, 3, 0.5)),
    ],
  },
  {
    id: 'l11-e1-s3',
    title: 'Filled with the Spirit of God',
    music: 'parry-psalm-84',
    beats: [
      verse('EXO 31:2', fadeOut('moses'), fadeOut('rod'), fadeIn('forge'), ...pose('bezalel', 'work', 1, 6)),
      verse('EXO 31:3', ...pose('oholiab', 'work', 0.5, 6)),
      say('Bezalel and Oholiab taught the others, and men and women worked side by side, each with the gift God had given.', fadeIn('weaver'), fadeIn('sawyer'), ...pose('sawyer', 'work', 1, 6), ...pose('weaver', 'carry', 1.5, 6)),
      verse('EXO 39:42', ...[...GIFTS.map((g) => g.id), HEAP.id, 'forge'].map((id) => fadeOut(id)), ...FINISHED.map((id, i) => fadeIn(id, 1 + i * 0.6))),
      verse('EXO 39:43', fadeIn('moses', 0.5), fadeIn('rod', 0.5), ...pose('moses', 'lift', 1.5, 6), ...WORKSHOP.map((id) => actor(id, { facing: 1 }, { seconds: 0.4, delay: 1 })), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: patternSet, scenes }
