import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 5 · David's Last Words (2 Samuel 22–24), from the approved Level 19 script.
 *
 * Old David sings that the LORD is his rock, and speaks his last words at sunrise: a just ruler
 * "dawns on them like the morning light." Then the census and the plague, told in a sentence;
 * the angel stops by the threshing floor of Araunah, on Mount Moriah. David will not take it as a
 * gift: the player pays the fifty shekels and builds the altar ("what costs me nothing",
 * minigames/what-costs-me-nothing), the threshing floor glows from the first (this episode's golden
 * thread: "ransomed… with the precious blood of Christ").
 */

/** What David does on the threshing floor, in order: pay the price, then build the altar. */
export const ALTAR_STEPS = [
  { text: 'Turn down the gift: “No, but I will buy it of you for a price.”', decoy: 'Take the threshing floor as a free gift' },
  { text: 'Weigh out fifty shekels of silver', decoy: 'Pay with Araunah’s own oxen' },
  { text: 'Lay the first stones on the bare rock', decoy: 'Build a golden altar' },
  { text: 'Raise the altar, stone upon stone', decoy: 'Leave the altar half built' },
  { text: 'Lay the wood and the offering on the altar', decoy: 'Keep the best for himself' },
]

const ZION = 'salem-hill'
const PALACE = 'house-inside'
const FLOOR = 'moriah-top'
const onZion = personOn(ZION)
const inPalace = personOn(PALACE)
const onFloor = personOn(FLOOR)

export const lastWordsSet: SceneDescription = {
  id: 'l19-last-words',
  title: 'David’s last words',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: ZION, depth: 0.3 },
    { id: PALACE, depth: 0.3, opacity: 0 },
    { id: FLOOR, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Zion: old David singing with his lyre, held in a great light.
    onZion('david-singing', 'david-old', 0.42, { pose: 'sit', facing: 1 }),
    { id: 'lyre', prop: 'lyre', above: ZION, x: 0.47, y: 0.77, size: 0.03 },
    { id: 'great-light', prop: 'halo', above: ZION, x: 0.44, y: 0.6, size: 0.4, opacity: 0 },
    // David's room at sunrise: the old king, Nathan and young Solomon.
    inPalace('david-old', 'david-old', 0.34, { pose: 'sit', facing: 1, opacity: 0 }),
    inPalace('solomon', 'boy', 0.56, { opacity: 0 }),
    inPalace('nathan', 'nathan', 0.68, { opacity: 0 }),
    { id: 'sunrise', prop: 'sun', above: PALACE, x: 0.82, y: 0.5, size: 0.08, opacity: 0 },
    // The threshing floor of Araunah: the angel, Araunah and his oxen, the silver, the altar and its fire.
    { id: 'angel', prop: 'angel', above: FLOOR, x: 0.7, y: 0.42, size: 0.1, opacity: 0 },
    onFloor('araunah', 'araunah', 0.66, { opacity: 0 }),
    { id: 'oxen', prop: 'ox', above: FLOOR, x: 0.86, y: 0.8, size: 0.07, opacity: 0 },
    onFloor('david', 'david-old', 0.28, { facing: 1, opacity: 0 }),
    { id: 'scales', prop: 'scales', above: FLOOR, x: 0.56, y: 0.8, size: 0.05, pose: 'tip-3', opacity: 0 },
    { id: 'silver', prop: 'silver-coins', above: FLOOR, x: 0.52, y: 0.82, size: 0.03, opacity: 0 },
    { id: 'altar', prop: 'altar', above: FLOOR, x: 0.44, y: 0.8, size: 0.1, opacity: 0 },
    { id: 'fire', prop: 'flame', above: FLOOR, x: 0.44, y: 0.72, size: 0.05, opacity: 0 },
    { id: 'altar-glow', prop: 'halo', above: FLOOR, x: 0.44, y: 0.72, size: 0.16, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l19-e5-s1',
    title: 'The LORD is my rock',
    music: 'rock-of-ages',
    beats: [
      verse('2SA 22:1', camera({ zoom: 1.02 }, slow)),
      verse('2SA 22:2', fadeIn('great-light', 0.5, 0.6)),
      verse('2SA 22:20', camera({ zoom: 1 }, slow)),
      verse('2SA 22:29', actor('great-light', { opacity: 0.9 }, { seconds: 2 })),
    ],
  },
  {
    id: 'l19-e5-s2',
    title: 'The sweet psalmist of Israel',
    music: 'rock-of-ages',
    beats: [
      verse('2SA 23:1', ...swap(ZION, PALACE), ...swap('forest-sky', 'dawn-sky'), fadeOut('david-singing'), fadeOut('lyre'), fadeOut('great-light'), fadeIn('david-old', 1.5), fadeIn('solomon', 1.5), fadeIn('nathan', 1.5)),
      verse('2SA 23:3', camera({ zoom: 1.02 }, slow)),
      verse('2SA 23:4', fadeIn('sunrise', 0.3), actor('sunrise', { y: 0.4 }, { seconds: 5, ease: 'inOutSine' })),
      verse('2SA 23:5', camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l19-e5-s3',
    title: 'The threshing floor of Araunah',
    music: 'rock-of-ages',
    beats: [
      say('Near the end of his reign, David proudly had all his fighting men counted, as if Israel’s strength were in its numbers and not in God. Then his conscience troubled him.', ...swap(PALACE, FLOOR), ...['david-old', 'solomon', 'nathan', 'sunrise'].map((id) => fadeOut(id)), fadeIn('araunah', 1.5), fadeIn('oxen', 1.5), fadeIn('david', 1.5), actor('altar-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 })),
      verse('2SA 24:10', actor('david', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
      say('A plague struck Israel. But when the angel reached Jerusalem, God said, “It is enough,” and the angel stopped by the threshing floor of Araunah.', fadeIn('angel', 0.5)),
      verse('2SA 24:17', actor('david', { pose: 'pray' }, { seconds: 0.8, delay: 0.3 })),
      say('Araunah offered to give the king his threshing floor, his oxen and the wood for the fire, for nothing.', actor('david', { pose: 'idle' }, { seconds: 0.8 }), ...walk('araunah', { x: 0.52 }, 2)),
      verse('2SA 24:24', camera({ zoom: 1.02 }, slow)),
      play('what-costs-me-nothing', { cues: [fadeIn('scales')], done: [actor('altar', { opacity: 1 }, { seconds: 0.5 }), actor('fire', { opacity: 1 }, { seconds: 0.5 }), actor('silver', { opacity: 1 }, { seconds: 0.5 })] }),
      verse('2SA 24:25', fadeOut('angel', 0.5), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode5: Pick<Episode, 'set' | 'scenes'> = { set: lastWordsSet, scenes }
