import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Remember the Way (Deuteronomy 1:1–5; 8:1–18), from the approved Level 13 script.
 *
 * On the plains of Moab, old Moses gathers the new generation, who never saw Egypt or the sea,
 * and tells them to remember the way God led them. The player carries his memory along the
 * road, stop by stop, from Egypt to Moab ("remember the way", minigames/remember-the-way). The
 * manna on the ground glows (this episode's golden thread: Jesus, forty days in the
 * wilderness: "Man shall not live by bread alone"). Then Moses describes the good land, and
 * warns them not to forget the God who gave it.
 */

/** The stops of the journey on the map, and what is remembered at each. */
export const STOPS = [
  { place: 'Egypt', x: 0.08, y: 0.7, prop: 'passover-dish', pose: 'lamb', text: 'The night of the Passover, when the LORD brought you out of the house of bondage.' },
  { place: 'The Red Sea', x: 0.15, y: 0.66, prop: 'pool', pose: 'idle', text: 'The sea divided, and you walked through on dry ground.' },
  { place: 'The wilderness of Sin', x: 0.22, y: 0.6, prop: 'manna', pose: 'idle', text: 'He fed you with manna, morning by morning.' },
  { place: 'Mount Sinai', x: 0.32, y: 0.51, prop: 'stone-tablets', pose: 'written', text: 'He spoke to you out of the fire, and gave you his commandments.' },
  { place: 'Kadesh', x: 0.53, y: 0.51, prop: 'great-rock', pose: 'idle', text: 'He brought you water out of the flinty rock.' },
  { place: 'The way around Edom', x: 0.66, y: 0.57, prop: 'bronze-serpent', pose: 'pole', text: 'Everyone who looked at the bronze serpent lived.' },
  { place: 'The plains of Moab', x: 0.84, y: 0.36, prop: 'striped-tent', pose: 'open', text: 'And here you are, at the edge of the land he promised.' },
].map((s, i) => ({ ...s, id: `memory-${i + 1}` }))
export const TOKEN = 'memory-light'

const PLAINS = 'dry-hills'
const MAP = 'wilderness-map'
const person = personOn(PLAINS)
const CAMP = ['tent-1', 'tent-2', 'tent-3', 'people', 'more-people', 'children', 'moses', 'rod', 'jericho']

export const rememberSet: SceneDescription = {
  id: 'l13-remember',
  title: 'Remember the way',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: PLAINS, depth: 0.3 },
    { id: MAP, depth: 0.1, opacity: 0 },
  ],
  actors: [
    // The plains of Moab, with Jericho shining far across the river.
    { id: 'jericho', prop: 'city', above: PLAINS, x: 0.86, y: 0.6, size: 0.12, opacity: 0.8 },
    ...[0.08, 0.2, 0.92].map((x, i): SceneActor => ({ id: `tent-${i + 1}`, prop: 'striped-tent', above: PLAINS, x, y: 0.75, size: 0.1, pose: 'open', facing: i === 2 ? -1 : 1 })),
    person('people', 'hebrew-family', 0.28, { size: 0.12, facing: 1 }),
    person('more-people', 'hebrew-workers', 0.68, { size: 0.12 }),
    person('children', 'girl', 0.36, { size: 0.026, y: 0.79, facing: 1 }),
    { id: 'rod', prop: 'staff', above: PLAINS, x: 0.538, y: 0.765, size: 0.012 },
    person('moses', 'moses-old', 0.52, { y: 0.765 }),
    // The manna on the ground, remembered (the golden thread).
    { id: 'manna-glow', prop: 'halo', above: PLAINS, x: 0.5, y: 0.7, size: 0.16, opacity: 0 },
    { id: 'manna', prop: 'manna', above: PLAINS, x: 0.5, y: 0.82, size: 0.02, opacity: 0, group: { count: 7, w: 0.4, h: 0.03, seed: 1301 } },
    // The map of the journey, with each memory, and the light that carries them.
    ...STOPS.map((s): SceneActor => ({ id: s.id, prop: s.prop, above: MAP, x: s.x, y: s.y - 0.06, size: s.prop === 'bronze-serpent' ? 0.012 : 0.04, pose: s.pose, opacity: 0 })),
    { id: TOKEN, prop: 'halo', above: MAP, x: STOPS[0]!.x, y: STOPS[0]!.y, size: 0.06, opacity: 0 },
    // The good land, as Moses describes it.
    { id: 'land', prop: 'grain-row', above: PLAINS, x: 0.5, y: 0.66, size: 0.6, opacity: 0 },
    { id: 'vines', prop: 'vine', above: PLAINS, x: 0.2, y: 0.66, size: 0.06, opacity: 0 },
    { id: 'olives', prop: 'great-oak', above: PLAINS, x: 0.8, y: 0.66, size: 0.08, opacity: 0 },
  ],
  camera: DRIFT,
}

const LAND = ['land', 'vines', 'olives']

const scenes: StoryScene[] = [
  {
    id: 'l13-e1-s1',
    title: 'Beyond the Jordan',
    music: 'god-of-abraham-praise',
    beats: [
      verse('DEU 1:1', ...swap('dawn-sky', 'forest-sky'), camera({ zoom: 1.02 }, slow)),
      verse('DEU 1:3', ...walk('people', { x: 0.34 }, 3, 0.5), ...walk('more-people', { x: 0.62 }, 3, 0.5)),
      say('Almost everyone who had left Egypt as a grown-up was gone now. Those listening had been children in the wilderness, or had been born there. They had never seen Egypt, or the sea part, or the fire on Sinai.', camera({ zoom: 1 }, slow), ...walk('children', { x: 0.42 }, 2, 0.5)),
      verse('DEU 1:5', ...pose('moses', 'lift', 0.5, 4)),
    ],
  },
  {
    id: 'l13-e1-s2',
    title: 'Remember all the way',
    music: 'god-of-abraham-praise',
    beats: [
      verse('DEU 8:2', camera({ zoom: 1.02 }, slow), fadeIn('manna', 0), fadeIn('manna-glow', 0, 0.85)),
      verse('DEU 8:3'),
      play('remember-the-way', {
        cues: [...swap(PLAINS, MAP), ...[...CAMP, 'manna', 'manna-glow'].map((id) => fadeOut(id)), fadeIn(TOKEN, 1.5, 0.9), camera({ zoom: 1 }, slow)],
        done: [...STOPS.map((s) => actor(s.id, { opacity: 1 }, { seconds: 0.5 })), actor(TOKEN, { x: STOPS.at(-1)!.x, y: STOPS.at(-1)!.y }, { seconds: 0.5 })],
      }),
      verse('DEU 8:4', ...swap(MAP, PLAINS), ...[...STOPS.map((s) => s.id), TOKEN].map((id) => fadeOut(id)), ...CAMP.map((id) => fadeIn(id, 1.5, id === 'jericho' ? 0.8 : 1))),
    ],
  },
  {
    id: 'l13-e1-s3',
    title: 'A good land',
    music: 'god-of-abraham-praise',
    beats: [
      verse('DEU 8:7', ...pose('moses', 'lift', 0.5, 4), ...LAND.map((id, i) => fadeIn(id, 1 + i * 0.4))),
      verse('DEU 8:8', camera({ zoom: 1.02, x: 0.01 }, slow)),
      verse('DEU 8:10', camera({ zoom: 1, x: 0 }, slow), ...pose('people', 'walk', 0.5, 1)),
      verse('DEU 8:11', ...LAND.map((id) => fadeOut(id, 0.5))),
      verse('DEU 8:17'),
      verse('DEU 8:18', ...pose('moses', 'pray', 0.5, 4), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: rememberSet, scenes }
