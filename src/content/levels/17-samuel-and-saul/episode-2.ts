import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, slow, swap } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 2 · "Speak, Lord, for Your Servant Hears" (1 Samuel 3), from the approved Level 17
 * script.
 *
 * At night in the house of the LORD, with the lamp of God burning low (this episode's golden
 * thread: "My sheep hear my voice"), the LORD calls Samuel. The player chooses what Samuel does
 * at each call, until he answers, "Speak, for thy servant hears" ("here I am",
 * minigames/here-i-am).
 */

const INSIDE = 'holy-place'
const HILLS = 'canaan-hills'
const inside = personOn(INSIDE)
const person = personOn(HILLS)

export const callSet: SceneDescription = {
  id: 'l17-call',
  title: 'Speak, Lord',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'dawn-sky', depth: 0, opacity: 0 },
    { id: INSIDE, depth: 0.3 },
    { id: HILLS, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The house of the LORD at night: the lampstand burning low (the golden thread), Samuel asleep, and Eli.
    { id: 'lampstand', prop: 'tabernacle-piece', above: INSIDE, x: pieceX('lampstand', 0.66, 1.4), y: 0.8, size: 1.4, pose: 'lampstand' },
    { id: 'lamp-glow', prop: 'halo', above: INSIDE, x: 0.66, y: 0.5, size: 0.18, opacity: 0 },
    inside('samuel', 'samuel-boy', 0.4, { size: 0.03, pose: 'sit', facing: 1 }),
    inside('eli', 'high-priest', 0.14, { pose: 'sit', facing: 1 }),
    // Samuel grown, and the people coming to hear him.
    person('samuel-grown', 'samuel', 0.4, { facing: 1, opacity: 0 }),
    person('people', 'hebrew-family', 0.66, { size: 0.12, opacity: 0 }),
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e2-s1',
    title: 'The lamp of God',
    music: 'brahms-wiegenlied',
    beats: [
      verse('1SA 3:1', camera({ zoom: 1.02 }, slow)),
      verse('1SA 3:2', camera({ zoom: 1 }, slow)),
      verse('1SA 3:3', actor('lamp-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 })),
    ],
  },
  {
    id: 'l17-e2-s2',
    title: '“Samuel! Samuel!”',
    music: 'brahms-wiegenlied',
    beats: [
      verse('1SA 3:4', actor('samuel', { pose: 'idle' }, { seconds: 0.6, delay: 0.3 })),
      verse('1SA 3:7', camera({ zoom: 1.02 }, slow)),
      play('here-i-am', { done: [] }),
      verse('1SA 3:10', actor('samuel', { pose: 'kneel' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e2-s3',
    title: 'A prophet of the LORD',
    music: 'brahms-wiegenlied',
    beats: [
      say('That night God told Samuel a hard thing: Eli’s sons had robbed God’s offerings and done evil at Shiloh, and Eli had not stopped them, so judgment would come on his house. In the morning Samuel was afraid to tell Eli, but he told him everything.', ...swap('night-sky', 'dawn-sky'), actor('samuel', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 })),
      verse('1SA 3:19', ...swap(INSIDE, HILLS), ...['lampstand', 'lamp-glow', 'samuel', 'eli'].map((id) => fadeOut(id)), fadeIn('samuel-grown', 1.5)),
      verse('1SA 3:20', fadeIn('people', 0.5), camera({ zoom: 1.02 }, slow)),
    ],
  },
]

export const episode2: Pick<Episode, 'set' | 'scenes'> = { set: callSet, scenes }
