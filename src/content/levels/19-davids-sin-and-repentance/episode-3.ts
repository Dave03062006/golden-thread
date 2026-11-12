import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneActor, SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · "Have Mercy on Me, O God" (2 Samuel 12:15–25; Psalm 51), from the approved
 * Level 19 script.
 *
 * David lies all night on the ground, praying for his baby son; the child's death is told in a
 * sentence, with David's hope of seeing him again. Then Psalm 51: the player sprinkles David's
 * stained robe with hyssop until it is white ("whiter than snow", minigames/whiter-than-snow),
 * and snow falls over Jerusalem; the white robe glows (this episode's golden thread: "he is a new
 * creation"). Last, Solomon is born, "beloved of the LORD."
 */

/** The stains on David's robe, each washed away by one sprinkle of hyssop. */
export const STAINS = [
  { x: 0.47, y: 0.7 },
  { x: 0.5, y: 0.66 },
  { x: 0.53, y: 0.71 },
  { x: 0.48, y: 0.76 },
  { x: 0.52, y: 0.75 },
]
/** A line of Psalm 51 for each part of the robe made clean. */
export const LINES = [
  '“Have mercy on me, O God, according to thy steadfast love.”',
  '“Wash me thoroughly from my iniquity, and cleanse me from my sin!”',
  '“Create in me a clean heart, O God.”',
  '“Restore to me the joy of thy salvation.”',
  '“A broken and contrite heart, O God, thou wilt not despise.”',
]
export const SNOW = 'snowfall'

const PALACE = 'house-inside'
const inPalace = personOn(PALACE)

export const mercySet: SceneDescription = {
  id: 'l19-mercy',
  title: 'Have mercy on me, O God',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: PALACE, depth: 0.3 },
  ],
  actors: [
    // The night of prayer: David on the ground, the elders of his house, a candle burning low.
    inPalace('david', 'david', 0.4, { pose: 'kneel', facing: 1 }),
    inPalace('elders', 'elders', 0.66, { size: 0.12 }),
    { id: 'candle', prop: 'oil-lamp', above: PALACE, x: 0.28, y: 0.8, size: 0.03 },
    // The psalm: the robe on the basin, its stains, the hyssop, and the snow at the window.
    { id: 'basin', prop: 'basin', above: PALACE, x: 0.5, y: 0.84, size: 0.08, opacity: 0 },
    { id: 'robe', prop: 'linen-robe', above: PALACE, x: 0.5, y: 0.8, size: 0.16, opacity: 0 },
    ...STAINS.map((s, i): SceneActor => ({ id: `stain-${i + 1}`, prop: 'stain', above: PALACE, x: s.x, y: s.y, size: 0.035, opacity: 0 })),
    { id: 'hyssop', prop: 'hyssop', above: PALACE, x: 0.62, y: 0.8, size: 0.028, opacity: 0 },
    { id: SNOW, prop: 'snowfall', above: PALACE, x: 0.5, y: 0.5, size: 1, opacity: 0 },
    { id: 'robe-glow', prop: 'halo', above: PALACE, x: 0.5, y: 0.74, size: 0.2, opacity: 0 },
    // Solomon born: Bathsheba with the baby, and Nathan.
    inPalace('bathsheba', 'bathsheba', 0.5, { opacity: 0 }),
    { id: 'baby', prop: 'swaddled-baby', above: PALACE, x: 0.5, y: 0.7, size: 0.03, opacity: 0 },
    inPalace('nathan', 'nathan', 0.7, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const psalm = ['basin', 'robe', 'hyssop', ...STAINS.map((_, i) => `stain-${i + 1}`)]

const scenes: StoryScene[] = [
  {
    id: 'l19-e3-s1',
    title: 'All night upon the ground',
    music: 'allegri-miserere',
    beats: [
      say('Bathsheba’s baby boy fell very ill.', camera({ zoom: 1.02 }, slow)),
      verse('2SA 12:16', actor('elders', { x: 0.58 }, { seconds: 3, delay: 0.5, ease: 'inOutSine' })),
      say('On the seventh day the child died. Then David got up, washed, and went to worship God.', ...swap('night-sky', 'dawn-sky'), actor('david', { pose: 'idle' }, { seconds: 0.8, delay: 2 }), actor('candle', { opacity: 0 }, { seconds: 2, delay: 1 }), camera({ zoom: 1 }, slow)),
      say('David said, “I shall go to him, but he will not return to me”: one day, he would be with his son again.', actor('david', { pose: 'pray' }, { seconds: 0.8, delay: 0.5 })),
    ],
  },
  {
    id: 'l19-e3-s2',
    title: 'Whiter than snow',
    music: 'allegri-miserere',
    beats: [
      say('David poured out his sorrow to God in a song. It is Psalm 51, which the Church still prays every Friday morning.', ...swap('dawn-sky', 'night-sky'), fadeOut('elders'), ...walk('david', { x: 0.32, facing: 1 }, 2), actor('david', { pose: 'kneel' }, { seconds: 0.8, delay: 2.2 }), ...psalm.map((id) => fadeIn(id, 1.5))),
      verse('PSA 51:1', camera({ zoom: 1.04, y: 0.02 }, slow)),
      verse('PSA 51:2', camera({ zoom: 1.02 }, slow)),
      play('whiter-than-snow', { done: [...STAINS.map((_, i) => actor(`stain-${i + 1}`, { opacity: 0 }, { seconds: 0.5 })), actor(SNOW, { opacity: 1 }, { seconds: 1 })] }),
      verse('PSA 51:7', actor('robe-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
      verse('PSA 51:10', camera({ zoom: 1 }, slow)),
      verse('PSA 51:17', actor('david', { pose: 'pray' }, { seconds: 0.8, delay: 0.5 })),
    ],
  },
  {
    id: 'l19-e3-s3',
    title: 'Beloved of the LORD',
    music: 'allegri-miserere',
    beats: [
      say('In time, God gave David and Bathsheba another son. They called him Solomon, and the LORD loved him.', ...swap('night-sky', 'forest-sky'), ...[...psalm, SNOW, 'robe-glow'].map((id) => fadeOut(id)), actor('david', { pose: 'idle', x: 0.38 }, { seconds: 1.5 }), fadeIn('bathsheba', 1.5), fadeIn('baby', 1.8)),
      say('God sent Nathan with a second name for the baby: Jedidiah, which means “beloved of the LORD.” The son of David’s sorrow would be the king who built God’s Temple.', fadeIn('nathan', 0.5), actor('nathan', { pose: 'lift' }, { seconds: 0.8, delay: 2 }), camera({ zoom: 1.02 }, slow)),
      verse('PSA 51:13', actor('nathan', { pose: 'idle' }, { seconds: 0.8 }), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: mercySet, scenes }
