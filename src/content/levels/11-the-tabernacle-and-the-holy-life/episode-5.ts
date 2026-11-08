import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, tabernacle, walk } from './stage'

/**
 * Episode 5 · The Day of Atonement (Leviticus 16), from the approved Level 11 script.
 *
 * Once a year, the high priest passes the veil, where the light of the lampstand falls (this
 * episode's golden thread: Christ "entered once for all into the Holy Place… taking… his own
 * blood," and the curtain of the temple is torn in two). Aaron, in plain linen, brings
 * incense within the veil, and the blood of the offering, never shown, only as drops of
 * light before the mercy seat. Then the player lays the people's sins on the live goat, and
 * it carries them far away into the wilderness ("carried far away",
 * minigames/carried-far-away).
 */

/** The people's sins, each a small dark stone with a word, around the camp. */
export const SINS = ['pride', 'lies', 'anger', 'stealing', 'unkindness', 'forgetting God'].map((word, i) => ({
  word,
  id: `sin-${i + 1}`,
  x: [0.12, 0.22, 0.32, 0.78, 0.86, 0.94][i]!,
  y: [0.7, 0.66, 0.72, 0.68, 0.72, 0.66][i]!,
}))
/** The live goat, where the sins rest on its back, and how far away it goes. */
export const GOAT = { x: 0.56, y: 0.79, size: 0.05, back: 0.75, away: 1.08, farSize: 0.025 }
export const LEADER = { id: 'leader', x: 0.6 }
/** Where each sin rests on the goat's back, across from its middle. */
export const onBack = (i: number) => (i - (SINS.length - 1) / 2) * 0.006

const ABOVE = 'horeb'
const INSIDE = 'holy-place'
const person = personOn(ABOVE)
const COURT = ['tabernacle-tent', 'tabernacle-screen', 'tabernacle-altar', 'tabernacle-laver', 'tabernacle-court']

export const atonementSet: SceneDescription = {
  id: 'l11-atonement',
  title: 'The Day of Atonement',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: 'horeb', depth: 0.3 },
    { id: 'holy-place', depth: 0.3 },
  ],
  actors: [
    // Inside: the light of the lampstand on the veil (the golden thread); behind it, the ark in a cloud of incense.
    { id: 'veil-glow', prop: 'halo', above: INSIDE, x: 0.42, y: 0.52, size: 0.3, opacity: 0 },
    { id: 'lampstand', prop: 'tabernacle-piece', above: INSIDE, x: pieceX('lampstand', 0.78, 1.4), y: 0.8, size: 1.4, pose: 'lampstand' },
    { id: 'ark', prop: 'tabernacle-piece', above: INSIDE, x: pieceX('ark', 0.38, 1.6), y: 0.78, size: 1.6, pose: 'ark', opacity: 0 },
    { id: 'incense', prop: 'smoke-column', above: INSIDE, x: 0.4, y: 0.74, size: 0.14, opacity: 0 },
    ...[0, 1, 2, 3, 4, 5, 6].map((i): SceneActor => ({ id: `drop-${i + 1}`, prop: 'counted-star', above: INSIDE, x: 0.32 + i * 0.026, y: 0.72, size: 0.012, opacity: 0 })),
    person('aaron-inside', 'aaron-linen', 0.62, { y: 0.8, size: 0.05, opacity: 0 }),
    { id: 'censer', prop: 'fire-pot', above: INSIDE, x: 0.585, y: 0.72, size: 0.016, opacity: 0 },
    // Outside: the tabernacle in its court, Aaron, the two goats, and the people's sins around the camp.
    ...tabernacle('tabernacle', ABOVE, { x: 0.26, y: 0.8, size: 0.5 }, ['tent', 'screen', 'altar', 'laver', 'court'], { opacity: 0 }),
    person('aaron', 'aaron-linen', 0.48, { facing: 1, opacity: 0 }),
    person('aaron-robed', 'high-priest', 0.48, { facing: 1, opacity: 0 }),
    { id: 'goat', prop: 'goat', above: ABOVE, x: GOAT.x, y: GOAT.y, size: GOAT.size, opacity: 0 },
    { id: 'goat-for-the-lord', prop: 'goat', above: ABOVE, x: 0.66, y: 0.79, size: GOAT.size, facing: -1, opacity: 0 },
    person(LEADER.id, 'servant', LEADER.x, { facing: 1, opacity: 0 }),
    ...SINS.map((s): SceneActor => ({ id: s.id, prop: 'dark-stone', above: ABOVE, x: s.x, y: s.y, size: 0.022, opacity: 0 })),
    person('people', 'hebrew-family', 0.84, { size: 0.12, opacity: 0 }),
  ],
  camera: DRIFT,
}

const OUTSIDE = [...COURT, 'aaron']
const INSIDE_ACTORS = ['veil-glow', 'lampstand', 'ark', 'incense', 'aaron-inside', 'censer']

const scenes: StoryScene[] = [
  {
    id: 'l11-e5-s1',
    title: 'Once in the year',
    music: 'o-haupt-voll-blut',
    beats: [
      verse('LEV 16:2', fadeIn('veil-glow', 0, 0.85), camera({ zoom: 1.02 }, slow)),
      say('Only one man, on one day a year, could pass the veil and come before the ark: the high priest, on the Day of Atonement.', camera({ zoom: 1 }, slow)),
      verse('LEV 16:4', ...swap('holy-place', 'horeb'), ...INSIDE_ACTORS.map((id) => fadeOut(id)), ...OUTSIDE.map((id) => fadeIn(id, 1.5))),
      verse('LEV 16:34', ...pose('aaron', 'pray', 1, 5)),
    ],
  },
  {
    id: 'l11-e5-s2',
    title: 'Within the veil',
    music: 'o-haupt-voll-blut',
    beats: [
      verse('LEV 16:12', ...swap('horeb', 'holy-place'), ...OUTSIDE.map((id) => fadeOut(id)), fadeIn('lampstand', 1), fadeIn('veil-glow', 1, 0.85), fadeIn('aaron-inside', 1.5), fadeIn('censer', 1.5), ...walk('aaron-inside', { x: 0.48 }, 3, 2.5), actor('censer', { x: 0.445 }, { seconds: 3, ease: 'inOutSine', delay: 2.5 })),
      verse('LEV 16:13', fadeIn('ark', 0.5), fadeIn('incense', 1, 0.8), camera({ zoom: 1.03, x: -0.02 }, slow)),
      verse('LEV 16:15', ...[0, 1, 2, 3, 4, 5, 6].map((i) => fadeIn(`drop-${i + 1}`, 1 + i * 0.5, 0.9))),
      verse('LEV 16:16', camera({ zoom: 1, x: 0 }, slow)),
    ],
  },
  {
    id: 'l11-e5-s3',
    title: 'The goat that was sent away',
    music: 'o-haupt-voll-blut',
    beats: [
      verse(
        'LEV 16:8',
        ...swap('dawn-sky', 'forest-sky'),
        ...swap('holy-place', 'horeb'),
        ...[...INSIDE_ACTORS, ...[0, 1, 2, 3, 4, 5, 6].map((i) => `drop-${i + 1}`)].map((id) => fadeOut(id)),
        ...COURT.map((id) => fadeIn(id, 1.5)),
        fadeIn('aaron', 1.5),
        fadeIn('goat', 2),
        fadeIn('goat-for-the-lord', 2),
        ...pose('aaron', 'lift', 3, 2),
      ),
      verse('LEV 16:21', ...walk('aaron', { x: 0.52 }, 1.5, 0.5), ...pose('aaron', 'lift', 2.2, 30), fadeOut('goat-for-the-lord', 1), fadeIn(LEADER.id, 2), ...SINS.map((s, i) => fadeIn(s.id, 2.5 + i * 0.3))),
      play('carried-far-away', {
        done: [
          actor('goat', { x: GOAT.away, size: GOAT.farSize, opacity: 0, pose: 'walk' }, { seconds: 0.5 }),
          actor(LEADER.id, { x: GOAT.away + 0.04, opacity: 0, pose: 'walk' }, { seconds: 0.5 }),
          ...SINS.map((s, i) => actor(s.id, { x: GOAT.away + onBack(i) * (GOAT.farSize / GOAT.size), y: GOAT.back, opacity: 0 }, { seconds: 0.5 })),
        ],
      }),
      verse('LEV 16:22', actor('aaron', { pose: 'idle' }, { seconds: 0.8 }), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l11-e5-s4',
    title: 'Clean before the LORD',
    music: 'o-haupt-voll-blut',
    beats: [
      verse('LEV 16:30', ...swap('forest-sky', 'evening-sky'), camera({ zoom: 1 }, slow), fadeOut('aaron', 1), fadeIn('aaron-robed', 1), fadeIn('people', 1.5), ...pose('aaron-robed', 'lift', 3, 4)),
      say('Every year the people were made clean, and every year they needed it again. They were waiting for something more.', camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: atonementSet, scenes }
