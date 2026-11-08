import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeLayer, fadeOut, personOn, pieceX, pose, slow, swap, walk } from './stage'

/**
 * Episode 6 · The Feasts of the Year (Leviticus 23), from the approved Level 11 script.
 *
 * The year is a wheel of twelve moons around the tabernacle. The sabbath, and the passover
 * in spring; then, looking ahead to the promised land, the first sheaf of the harvest,
 * waved before the LORD "on the morrow after the sabbath," which glows (this episode's
 * golden thread: Christ raised, "the first fruits," and the Spirit at Pentecost); the feast
 * of weeks fifty days later; and in autumn the trumpets, the Day of Atonement, and the feast
 * of booths. The player matches each feast to what it remembers ("the feasts of the year",
 * minigames/the-feasts-of-the-year), and it takes its place on the wheel.
 */

/** What the feasts remember or give thanks for, as the player chooses them. */
export const MEANINGS = [
  { id: 'freed', text: 'The night God set his people free from Egypt' },
  { id: 'first', text: 'The first of the harvest, given back to God' },
  { id: 'wheat', text: 'The wheat harvest, fifty days later' },
  { id: 'remember', text: 'A day for remembering, at the turn of the year' },
  { id: 'cleansed', text: 'The day their sins were taken away' },
  { id: 'tents', text: 'The years of living in tents in the wilderness' },
]
/** The middle of the wheel of the year, and how far out its moons are. */
export const WHEEL = { x: 0.5, y: 0.4, rx: 0.2, ry: 0.27 }
/** Where on the wheel month `m` (1 to 12) is, the first month at the top, turned a little by `turn`. */
export const onWheel = (m: number, turn = 0) => {
  const a = ((m - 1 + turn) / 12) * Math.PI * 2
  return { x: Math.round((WHEEL.x + Math.sin(a) * WHEEL.rx * 0.78) * 1000) / 1000, y: Math.round((WHEEL.y - Math.cos(a) * WHEEL.ry * 0.78) * 1000) / 1000 }
}
/** Each feast, with its sign, its season on the wheel, and what it remembers. */
export const FEASTS = [
  { kind: 'passover', name: 'The passover', sign: 'bread', with: 'with its unleavened bread', month: 1, turn: -0.3, answer: 'freed' },
  { kind: 'first-fruits', name: 'The first fruits', sign: 'sheaf', with: 'with the first sheaf', month: 1, turn: 0.35, answer: 'first' },
  { kind: 'weeks', name: 'The feast of weeks', sign: 'loaves', with: 'with two loaves of new wheat', month: 3, turn: 0, answer: 'wheat' },
  { kind: 'trumpets', name: 'The day of trumpets', sign: 'horn', with: 'with the ram’s horn', month: 7, turn: -0.35, answer: 'remember' },
  { kind: 'atonement', name: 'The Day of Atonement', sign: 'veil', with: 'with the veil', month: 7, turn: 0, answer: 'cleansed' },
  { kind: 'booths', name: 'The feast of booths', sign: 'booth', with: 'with its shelter of branches', month: 7, turn: 0.35, answer: 'tents' },
].map((f) => ({ ...f, id: `feast-${f.kind}`, at: onWheel(f.month, f.turn) }))

const ABOVE = 'horeb'
const FIELD = 'wheat-field'
const WHEEL_LAYER = 'year-wheel'
const person = personOn(ABOVE)
const reaper = personOn(FIELD, 0.8)
const HOME = ['father', 'mother', 'child', 'dish']
const AUTUMN = ['horn', 'booth-1', 'booth-2', 'booth-3', 'family-1', 'family-2']

export const feastsSet: SceneDescription = {
  id: 'l11-feasts',
  title: 'The feasts of the year',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: WHEEL_LAYER, depth: 0.1 },
    { id: 'horeb', depth: 0.3, opacity: 0 },
    { id: FIELD, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The tabernacle at the middle of the wheel of the year, and the feasts on it.
    { id: 'wheel-tent', prop: 'tabernacle-piece', above: WHEEL_LAYER, x: pieceX('tent', WHEEL.x, 0.36), y: WHEEL.y + 0.06, size: 0.36, pose: 'tent' },
    ...FEASTS.map((f): SceneActor => ({ id: f.id, prop: 'feast-sign', above: WHEEL_LAYER, x: f.at.x, y: f.at.y, size: 0.05, pose: f.sign, opacity: 0 })),
    // A family resting on the sabbath, and at the passover meal.
    person('father', 'hebrew-father', 0.38, { facing: 1, opacity: 0 }),
    person('mother', 'hebrew-mother', 0.62, { opacity: 0 }),
    person('child', 'girl', 0.55, { size: 0.026, y: 0.79, opacity: 0 }),
    { id: 'dish', prop: 'passover-dish', above: ABOVE, x: 0.5, y: 0.785, size: 0.04, pose: 'bread', opacity: 0 },
    // The barley harvest: the first sheaf (the golden thread), the priest who waves it, and the two loaves.
    reaper('farmer', 'hebrew-father', 0.3, { facing: 1, opacity: 0 }),
    { id: 'sheaf-glow', prop: 'halo', above: FIELD, x: 0.46, y: 0.66, size: 0.14, opacity: 0 },
    { id: 'sheaf', prop: 'feast-sign', above: FIELD, x: 0.4, y: 0.79, size: 0.05, pose: 'sheaf', opacity: 0 },
    reaper('priest', 'priest', 0.62, { opacity: 0 }),
    { id: 'loaves', prop: 'feast-sign', above: FIELD, x: 0.5, y: 0.79, size: 0.05, pose: 'loaves', opacity: 0 },
    // Autumn: the ram's horn, and the camp full of shelters of branches.
    { id: 'horn', prop: 'feast-sign', above: ABOVE, x: 0.5, y: 0.62, size: 0.07, pose: 'horn', opacity: 0 },
    ...[0.2, 0.5, 0.8].map((x, i): SceneActor => ({ id: `booth-${i + 1}`, prop: 'feast-sign', above: ABOVE, x, y: 0.8, size: 0.14, pose: 'booth', opacity: 0 })),
    person('family-1', 'hebrew-family', 0.2, { size: 0.1, y: 0.8, opacity: 0 }),
    person('family-2', 'hebrew-family', 0.8, { size: 0.1, y: 0.8, facing: 1, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l11-e6-s1',
    title: 'The sabbath and the passover',
    music: 'veni-sancte-spiritus',
    beats: [
      verse('LEV 23:2', camera({ zoom: 1.02 }, slow)),
      verse('LEV 23:3', ...swap('night-sky', 'forest-sky'), fadeLayer(WHEEL_LAYER, 0), fadeOut('wheel-tent'), fadeLayer('horeb', 1), fadeIn('father', 1.5), fadeIn('mother', 1.5), fadeIn('child', 1.5), actor('father', { pose: 'sit' }, { seconds: 0.8, delay: 2.5 }), actor('mother', { pose: 'sit' }, { seconds: 0.8, delay: 2.5 }), camera({ zoom: 1 }, slow)),
      verse('LEV 23:5', ...swap('forest-sky', 'evening-sky'), fadeIn('dish', 1)),
      verse('LEV 23:6', ...pose('father', 'pray', 0.5, 4)),
      say('Every spring, they would remember the night God set them free (Level 8).', camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l11-e6-s2',
    title: 'The first fruits and the fifty days',
    music: 'veni-sancte-spiritus',
    beats: [
      verse('LEV 23:10', ...swap('evening-sky', 'forest-sky'), fadeLayer('horeb', 0), fadeLayer(FIELD, 1), ...HOME.map((id) => fadeOut(id)), camera({ zoom: 1 }, slow), fadeIn('farmer', 1.5), ...pose('farmer', 'work', 2, 3), fadeIn('sheaf', 2), fadeIn('sheaf-glow', 2, 0.85)),
      verse('LEV 23:11', fadeIn('priest', 0.5), ...walk('farmer', { x: 0.46 }, 2, 0.5), actor('sheaf', { x: 0.52, y: 0.72 }, { seconds: 2, ease: 'inOutSine', delay: 2.5 }), actor('sheaf-glow', { x: 0.52, y: 0.66 }, { seconds: 2, ease: 'inOutSine', delay: 2.5 }), ...pose('priest', 'lift', 3, 5)),
      verse('LEV 23:15', fadeOut('sheaf', 0.5), camera({ zoom: 1.02 }, slow)),
      verse('LEV 23:16', fadeOut('sheaf-glow'), fadeIn('loaves', 0.5), ...pose('priest', 'lift', 1.5, 4)),
    ],
  },
  {
    id: 'l11-e6-s3',
    title: 'The feast of booths',
    music: 'veni-sancte-spiritus',
    beats: [
      say('In the seventh month, in autumn, came three more: a day of trumpets, the Day of Atonement, and the feast of booths.', fadeLayer(FIELD, 0), fadeLayer('horeb', 1), ...['farmer', 'priest', 'loaves'].map((id) => fadeOut(id)), camera({ zoom: 1 }, slow), fadeIn('horn', 1.5), fadeOut('horn', 5)),
      verse('LEV 23:40', ...['booth-1', 'booth-2', 'booth-3'].map((id, i) => fadeIn(id, 0.5 + i * 0.5))),
      verse('LEV 23:42', fadeIn('family-1', 0.5), fadeIn('family-2', 0.5)),
      verse('LEV 23:43', ...swap('forest-sky', 'night-sky'), camera({ zoom: 1.02 }, slow)),
      play('the-feasts-of-the-year', {
        cues: [fadeLayer('horeb', 0), fadeLayer(WHEEL_LAYER, 1), fadeIn('wheel-tent', 1), ...AUTUMN.map((id) => fadeOut(id)), camera({ zoom: 1 }, slow)],
        done: FEASTS.map((f) => actor(f.id, { ...f.at, opacity: 1 }, { seconds: 0.5 })),
      }),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: feastsSet, scenes }
