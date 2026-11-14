import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Songs of Praise (Psalms 8, 19, 100 and 150), from the approved Level 20 script.
 *
 * Young David under the stars on the hills of Bethlehem; the Levites and the children singing
 * before the ark in Jerusalem (the children glow: this episode's golden thread, "out of the mouth
 * of babes"); and the Temple courts, where the player keeps the beat and the instruments of
 * Psalm 150 join one by one ("praise him!", minigames/praise-him).
 */

/** The instruments of Psalm 150, in its order, each joining the song on a beat. */
export const INSTRUMENTS = [
  { id: 'shofar', name: 'The trumpet', prop: 'shofar', x: 0.2, size: 0.04 },
  { id: 'harp', name: 'The lute and harp', prop: 'lyre', x: 0.32, size: 0.035 },
  { id: 'timbrel', name: 'The timbrel and dance', prop: 'hand-drum', x: 0.44, size: 0.03 },
  { id: 'strings', name: 'The strings and pipe', prop: 'lyre', x: 0.68, size: 0.035 },
  { id: 'cymbals', name: 'The cymbals', prop: 'cymbals', x: 0.8, size: 0.04 },
]

const HILLS = 'canaan-hills'
const ZION = 'salem-hill'
const COURTS = 'temple-courts'
const onHills = personOn(HILLS)
const onZion = personOn(ZION)
const inCourts = personOn(COURTS)

export const praiseSet: SceneDescription = {
  id: 'l20-praise',
  title: 'Songs of praise',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: HILLS, depth: 0.3 },
    { id: ZION, depth: 0.3, opacity: 0 },
    { id: COURTS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The hills of Bethlehem at night: David with his lyre, his sleeping flock, under the stars.
    onHills('david-young', 'david-young', 0.34, { pose: 'sit', facing: 1 }),
    { id: 'lyre', prop: 'lyre', above: HILLS, x: 0.38, y: 0.77, size: 0.025 },
    ...[0.5, 0.58, 0.64].map((x, i): SceneActor => ({ id: `sheep-${i + 1}`, prop: 'sheep', above: HILLS, x, y: 0.8 + (i % 2) * 0.02, size: 0.04 })),
    // Before the ark in Jerusalem: the tent, the Levites with their harps, the children, and King David.
    { id: 'tent', prop: 'tent', above: ZION, x: 0.2, y: 0.8, size: 0.14, opacity: 0 },
    onZion('levite-1', 'aaron-linen', 0.36, { facing: 1, opacity: 0 }),
    onZion('levite-2', 'aaron-linen', 0.44, { facing: 1, opacity: 0 }),
    onZion('boy', 'boy', 0.54, { opacity: 0 }),
    onZion('girl', 'girl', 0.59, { opacity: 0 }),
    onZion('david', 'david', 0.72, { opacity: 0 }),
    { id: 'babes-glow', prop: 'halo', above: ZION, x: 0.565, y: 0.72, size: 0.14, opacity: 0 },
    // The Temple courts: the crowd, and the instruments of Psalm 150.
    inCourts('crowd', 'hebrew-family', 0.3, { size: 0.12, opacity: 0 }),
    inCourts('women', 'hebrew-women', 0.72, { size: 0.12, opacity: 0 }),
    ...INSTRUMENTS.map((i): SceneActor => ({ id: i.id, prop: i.prop, above: COURTS, x: i.x, y: 0.7, size: i.size, opacity: 0 })),
  ],
  camera: DRIFT,
}

const onZionNow = ['tent', 'levite-1', 'levite-2', 'boy', 'girl', 'david']

const scenes: StoryScene[] = [
  {
    id: 'l20-e1-s1',
    title: 'The heavens are telling',
    music: 'mozart-laudate-dominum',
    beats: [
      say('Many of the Psalms were first sung by David, the shepherd boy who became king. Out on the hills at night, with his sheep asleep around him, he looked up.', camera({ zoom: 1.02, y: -0.02 }, slow)),
      verse('PSA 8:1'),
      verse('PSA 8:3', camera({ zoom: 1, y: 0 }, slow)),
      verse('PSA 8:4'),
      verse('PSA 19:1', camera({ zoom: 1.03, y: -0.03 }, slow)),
    ],
  },
  {
    id: 'l20-e1-s2',
    title: 'Make a joyful noise',
    music: 'mozart-laudate-dominum',
    beats: [
      say('When David brought the ark of God to Jerusalem, he appointed Levites to sing and play before the LORD every day. The songs they sang became the Psalms, the songbook of God’s people.', ...swap('night-sky', 'forest-sky'), ...swap(HILLS, ZION), ...['david-young', 'lyre', 'sheep-1', 'sheep-2', 'sheep-3'].map((id) => fadeOut(id)), ...onZionNow.map((id) => fadeIn(id, 1.5)), actor('babes-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 }), camera({ zoom: 1, y: 0 }, slow)),
      verse('PSA 100:1', actor('david', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      verse('PSA 100:3', actor('levite-1', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      verse('PSA 100:4', actor('levite-2', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 })),
      say('Even the children sang. A psalm says that God’s glory is “chanted by the mouth of babes and infants.”', camera({ zoom: 1.03 }, slow)),
    ],
  },
  {
    id: 'l20-e1-s3',
    title: 'Let everything that breathes',
    music: 'mozart-laudate-dominum',
    beats: [
      verse('PSA 150:1', ...swap(ZION, COURTS), ...[...onZionNow, 'babes-glow'].map((id) => fadeOut(id)), fadeIn('crowd', 1.5), fadeIn('women', 1.5), camera({ zoom: 1 }, slow)),
      play('praise-him', { done: INSTRUMENTS.map((i) => actor(i.id, { opacity: 1 }, { seconds: 0.5 })) }),
      verse('PSA 150:3'),
      verse('PSA 150:4', camera({ zoom: 1.02 }, slow)),
      verse('PSA 150:5'),
      verse('PSA 150:6', camera({ zoom: 1.04 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: praiseSet, scenes }
