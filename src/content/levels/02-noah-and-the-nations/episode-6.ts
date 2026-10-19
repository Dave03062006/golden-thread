import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'

/**
 * Episode 6 · The Tower of Babel (Genesis 10:1–11:9), from the approved Level 2 script.
 *
 * The world after the Flood as a tapestry map, where the families of Noah's three sons
 * spread out from Ararat. Then the plain of Shinar: a people settles, fires bricks, and
 * raises a city and a stepped tower ("the tower", minigames/the-tower, first part:
 * stacking it terrace by terrace, the clouds always out of reach). The LORD comes down;
 * the builders' words become scripts no one else can read, and the work stops. On the
 * map again, each family is guided to its own land (the second part). A brick left at the
 * foot of the empty tower glows: this episode's golden thread, Babel and Pentecost.
 */

/** Places on the tapestry map, in frame fractions (the map's art is drawn to match). */
export const MAP = { ararat: { x: 0.66, y: 0.24 }, babel: { x: 0.74, y: 0.6 } }

/** The families of Noah's sons, each with its own land on the map, its own script, and where Genesis 10 says it went. */
export const FAMILIES = [
  { id: 'japheth', name: 'Japheth', to: 'the coastlands, in the northwest', land: { x: 0.24, y: 0.27 }, script: 'letters', where: 'The families of Japheth went to the coastlands of the west and north.' },
  { id: 'ham', name: 'Ham', to: 'Egypt and Canaan, in the southwest', land: { x: 0.39, y: 0.7 }, script: 'signs', where: 'The families of Ham went south, to Egypt and Canaan.' },
  { id: 'shem', name: 'Shem', to: 'the lands of the east', land: { x: 0.9, y: 0.52 }, script: 'wedges', where: 'The families of Shem went to the lands of the east.' },
] as const

/** How high a family's script floats above it. */
export const SCRIPT_ABOVE = 0.085

/** The tower: where it stands, its size, and its six terraces (its drawing is a 600 × 520 box, each terrace 70 high). */
export const TOWER = { x: 0.5, y: 0.82, size: 0.36, tiers: 6, begun: 1 }
const UNIT = (TOWER.size * 1600) / 600
/** The top of the tower with `n` terraces built, and half the width of terrace `k` (from 0), in frame fractions. */
export const towerTop = (n: number) => TOWER.y - (n * 70 * UNIT) / 900
export const tierHalf = (k: number) => ((560 - k * 80) * UNIT) / 1600 / 2
/** How far the high clouds rise for each terrace the builders add: always out of reach. */
export const CLOUD_RISE = 0.05

const crowd = (id: string, x: number, y: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop: 'crowd', above: 'shinar-plain', x, y, size: 0.1, facing: -1, pose: 'idle', opacity: 0, ...extra })
const onMap = (id: string, prop: string, at: { x: number; y: number }, size: number, extra: Partial<SceneActor> = {}): SceneActor => ({ id, prop, above: 'nations-tapestry', ...at, size, opacity: 0, ...extra })

const SCRIPTS: [string, number, number][] = [
  ['wedges', 0.28, 0.62],
  ['signs', 0.4, 0.5],
  ['letters', 0.62, 0.53],
  ['curls', 0.74, 0.63],
]

export const theTowerOfBabelSet: SceneDescription = {
  id: 'l02-the-tower-of-babel',
  title: 'The Tower of Babel',
  layers: [
    { id: 'shinar-sky', depth: 0 },
    { id: 'high-clouds', depth: 0.05, sway: { x: 0.008, seconds: 16 } },
    { id: 'babel-city', depth: 0.25, opacity: 0 },
    { id: 'shinar-plain', depth: 0.45 },
    // The tapestry map, over everything while it shows.
    { id: 'nations-tapestry', depth: 0 },
  ],
  actors: [
    { id: 'tower', prop: 'ziggurat', above: 'shinar-plain', x: TOWER.x, y: TOWER.y, size: TOWER.size, pose: 't0', opacity: 0 },
    { id: 'kiln-1', prop: 'kiln', above: 'shinar-plain', x: 0.07, y: 0.8, size: 0.07, opacity: 0 },
    { id: 'kiln-2', prop: 'kiln', above: 'shinar-plain', x: 0.93, y: 0.79, size: 0.065, opacity: 0 },
    { id: 'bricks-1', prop: 'brick-pile', above: 'shinar-plain', x: 0.3, y: 0.83, size: 0.07, opacity: 0 },
    { id: 'bricks-2', prop: 'brick-pile', above: 'shinar-plain', x: 0.71, y: 0.84, size: 0.06, opacity: 0 },
    // The brick left on the lowest terrace, at the foot of the stair: the golden thread.
    { id: 'lone-brick', prop: 'brick', above: 'shinar-plain', x: 0.56, y: towerTop(1), size: 0.022, opacity: 0 },
    { id: 'last-brick', prop: 'halo', above: 'shinar-plain', x: 0.56, y: towerTop(1) - 0.012, size: 0.045, opacity: 0 },
    crowd('crowd-a', 1.12, 0.84),
    crowd('crowd-b', 1.2, 0.86),
    { id: 'sheep-1', prop: 'sheep', above: 'shinar-plain', x: 1.16, y: 0.85, size: 0.04, facing: -1, pose: 'walk', opacity: 0 },
    { id: 'sheep-2', prop: 'sheep', above: 'shinar-plain', x: 1.22, y: 0.865, size: 0.038, facing: -1, pose: 'walk', opacity: 0 },
    { id: 'brick-load', prop: 'brick-load', above: 'shinar-plain', x: TOWER.x, y: 0.3, size: 0.06, opacity: 0 },
    ...SCRIPTS.map(([pose, x, y], i): SceneActor => ({ id: `script-${i + 1}`, prop: 'script-words', above: 'shinar-plain', x, y, size: 0.11, pose, opacity: 0 })),
    // God shown as light, coming down to see the tower.
    { id: 'glory', prop: 'glory', above: 'shinar-plain', x: 0.5, y: -0.15, size: 0.34, opacity: 0 },
    // On the map: the families spreading out from Ararat, and later, from Babel, each to its land.
    ...FAMILIES.map((f) => onMap(`stream-${f.id}`, 'family-band', MAP.ararat, 0.06, { pose: f.id })),
    ...FAMILIES.map((f) => onMap(`land-${f.id}`, 'halo', f.land, 0.09)),
    ...FAMILIES.map((f) => onMap(`family-${f.id}`, 'family-band', MAP.babel, 0.065, { pose: f.id })),
    ...FAMILIES.map((f) => onMap(`words-${f.id}`, 'script-words', { x: MAP.babel.x, y: MAP.babel.y - SCRIPT_ABOVE }, 0.08, { pose: f.script })),
  ],
  camera: {
    loop: 'pingpong',
    x: [
      { at: 0, value: -0.004 },
      { at: 20, value: 0.004, ease: 'smoother' },
    ],
    y: [
      { at: 0, value: 0 },
      { at: 20, value: -0.003, ease: 'smoother' },
    ],
    zoom: [
      { at: 0, value: 1 },
      { at: 20, value: 1.008, ease: 'smoother' },
    ],
  },
}

const slow = { seconds: 5, ease: 'inOutSine' } as const
const fadeIn = (id: string, delay = 0, to = 1) => actor(id, { opacity: to }, { seconds: 2, delay })
const fadeOut = (id: string, delay = 0) => actor(id, { opacity: 0 }, { seconds: 2, delay })

/** After stacking the tower: all six terraces up, the load put away, the clouds high above. */
const TOWER_DONE = [
  actor('tower', { pose: `t${TOWER.tiers}` }, { seconds: 0.4 }),
  actor('brick-load', { x: TOWER.x, y: towerTop(TOWER.tiers) - 0.1, opacity: 0 }, { seconds: 1 }),
  layer('high-clouds', { offsetY: -CLOUD_RISE * (TOWER.tiers - TOWER.begun) }, { seconds: 1 }),
]

/** After scattering: every family in its own land, its words above it. */
const SCATTER_DONE = [
  ...FAMILIES.map((f) => actor(`family-${f.id}`, { ...f.land, opacity: 1 }, { seconds: 1, ease: 'inOutSine' })),
  ...FAMILIES.map((f) => actor(`words-${f.id}`, { x: f.land.x, y: f.land.y - SCRIPT_ABOVE, opacity: 1 }, { seconds: 1, ease: 'inOutSine' })),
  ...FAMILIES.map((f) => actor(`land-${f.id}`, { opacity: 0.5 }, { seconds: 1 })),
]

const scenes: StoryScene[] = [
  {
    id: 'l02-e6-s1',
    title: 'The families of the earth',
    music: 'veni-sancte-spiritus',
    beats: [
      say('After the Flood, Noah’s sons had children, and their children had children.', ...FAMILIES.map((f, i) => fadeIn(`stream-${f.id}`, 1 + i * 0.4))),
      verse('GEN 10:32', ...FAMILIES.map((f, i) => actor(`stream-${f.id}`, f.land, { seconds: 8, ease: 'inOutSine', delay: 0.5 + i * 0.6 }))),
      say('The families of Japheth spread to the coastlands; the families of Ham to Egypt, Cush and Canaan; the families of Shem to the lands of the east.', ...FAMILIES.map((f, i) => fadeIn(`land-${f.id}`, i * 1.2, 0.6))),
      say('Genesis lists seventy nations in all: the whole human family, every one of them coming from Noah.'),
    ],
  },
  {
    id: 'l02-e6-s2',
    title: 'One language',
    music: 'veni-sancte-spiritus',
    beats: [
      verse(
        'GEN 11:1',
        // From the map to the plain of Shinar.
        layer('nations-tapestry', { opacity: 0 }, { seconds: 3, ease: 'inOutSine' }),
        ...FAMILIES.flatMap((f) => [fadeOut(`stream-${f.id}`), fadeOut(`land-${f.id}`)]),
      ),
      verse(
        'GEN 11:2',
        // A people arrives with its herds, and settles.
        ...['crowd-a', 'crowd-b', 'sheep-1', 'sheep-2'].map((id) => fadeIn(id)),
        ...[
          ['crowd-a', 0.18],
          ['crowd-b', 0.82],
          ['sheep-1', 0.62],
          ['sheep-2', 0.67],
        ].map(([id, x], i) => actor(id as string, { x: x as number, pose: 'walk' }, { seconds: 7, ease: 'inOutSine', delay: i * 0.4 })),
        ...['crowd-a', 'crowd-b', 'sheep-1', 'sheep-2'].map((id, i) => actor(id, { pose: 'idle' }, { seconds: 0.5, delay: 7 + i * 0.4 })),
      ),
      say('There was no stone on the plain, so they made bricks of clay and baked them hard in fire. With bricks, they could build anything.', ...['kiln-1', 'kiln-2', 'bricks-1', 'bricks-2'].map((id, i) => fadeIn(id, i * 0.6))),
    ],
  },
  {
    id: 'l02-e6-s3',
    title: '“Let us make a name for ourselves”',
    music: 'veni-sancte-spiritus',
    beats: [
      verse('GEN 11:4', layer('babel-city', { opacity: 1 }, { seconds: 4, ease: 'inOutSine' }), actor('tower', { pose: `t${TOWER.begun}` }, { seconds: 0.4 }), fadeIn('tower', 1), fadeIn('brick-load', 3)),
      play('the-tower', { cues: [], done: TOWER_DONE }),
      say('God had told the human family to fill the earth. Instead, they wanted to stay together and climb to heaven by their own strength, and to make their own name great instead of God’s.'),
    ],
  },
  {
    id: 'l02-e6-s4',
    title: 'The LORD came down',
    music: 'veni-sancte-spiritus',
    beats: [
      verse(
        'GEN 11:5',
        // From high above, the tower looks tiny; the light of God comes down to it.
        camera({ zoom: 0.8, y: -0.04 }, { seconds: 6, ease: 'inOutSine' }),
        fadeIn('glory', 1, 0.75),
        actor('glory', { y: 0.28 }, { seconds: 7, ease: 'inOutSine', delay: 1 }),
      ),
      say('There is gentle humor here. The tower that was meant to reach the heavens was so small that God had to come down to see it.'),
      verse(
        'GEN 11:7',
        camera({ zoom: 1, y: 0 }, slow),
        // The builders call to one another, and their words come out in scripts no one else can read.
        ...SCRIPTS.map((_, i) => fadeIn(`script-${i + 1}`, 2 + i * 0.7)),
      ),
      say('The builders could no longer understand one another, and the work stopped.', fadeOut('glory', 1)),
    ],
  },
  {
    id: 'l02-e6-s5',
    title: 'Scattered',
    music: 'veni-sancte-spiritus',
    beats: [
      verse(
        'GEN 11:8',
        // The families leave the tower empty, and a brick lies where it fell.
        ...SCRIPTS.map((_, i) => fadeOut(`script-${i + 1}`, i * 0.3)),
        ...[
          ['crowd-a', -0.2],
          ['crowd-b', 1.2],
          ['sheep-1', 1.25],
          ['sheep-2', 1.3],
        ].map(([id, x]) => actor(id as string, { x: x as number, pose: 'walk', facing: (x as number) < 0.5 ? -1 : 1 }, { seconds: 8, ease: 'inOutSine', delay: 1 })),
        ...['crowd-a', 'crowd-b', 'sheep-1', 'sheep-2'].map((id) => actor(id, { opacity: 0, pose: 'idle' }, { seconds: 2, delay: 7 })),
        fadeIn('lone-brick', 2),
        fadeIn('last-brick', 3, 0.85),
      ),
      play('scatter', {
        cues: [layer('nations-tapestry', { opacity: 1 }, { seconds: 2, ease: 'inOutSine' }), ...FAMILIES.map((f) => fadeIn(`land-${f.id}`, 1, 0.3))],
        done: SCATTER_DONE,
      }),
      verse(
        'GEN 11:9',
        // Back to the empty tower, and the brick at its foot.
        layer('nations-tapestry', { opacity: 0 }, { seconds: 3, ease: 'inOutSine', delay: 2 }),
        ...FAMILIES.flatMap((f) => [fadeOut(`family-${f.id}`, 2), fadeOut(`words-${f.id}`, 2), fadeOut(`land-${f.id}`, 2)]),
      ),
      say('Babel had tried to make a name for itself and reach heaven by its own bricks. In the next level, God will promise one man, Abram, “I will make your name great.” What people could not seize, God would give.'),
    ],
  },
]

export const episode6: Pick<Episode, 'set' | 'scenes'> = { set: theTowerOfBabelSet, scenes }
