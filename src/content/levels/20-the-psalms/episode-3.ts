import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 3 · Songs of Lament (Psalms 13, 42 and 22), from the approved Level 20 script.
 *
 * David alone in a cave at night: the player puts the four parts of Psalm 13 in order, from the
 * cry to the praise, and the fire grows ("how long, O LORD?", minigames/how-long-o-lord). A deer
 * searches a dry riverbed and finds a spring. Then Psalm 22, the psalm Jesus prayed on the cross:
 * on a bare hill the sky darkens, and nothing else is shown; the sun breaks out again, and glows
 * (this episode's golden thread).
 */

/** The four parts of Psalm 13, in the order it prays them. */
export const LAMENT = [
  { text: '“How long, O LORD?”', note: 'The cry: telling God how it hurts.' },
  { text: '“Consider and answer me, O LORD my God.”', note: 'The plea: asking God to help.' },
  { text: '“But I have trusted in thy steadfast love.”', note: 'The trust: the turn of every lament.' },
  { text: '“I will sing to the LORD.”', note: 'The praise: the cry ends in a song.' },
]
export const FIRE = 'fire-glow'

const CAVE = 'rock-face'
const DRY = 'desert'
const HILL = 'canaan-hills'
const inCave = personOn(CAVE)

export const lamentSet: SceneDescription = {
  id: 'l20-lament',
  title: 'Songs of lament',
  layers: [
    { id: 'night-sky', depth: 0 },
    { id: 'forest-sky', depth: 0, opacity: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: CAVE, depth: 0.3 },
    { id: DRY, depth: 0.3, opacity: 0 },
    { id: HILL, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The cave: David alone by a tiny fire.
    inCave('david', 'david', 0.42, { pose: 'sit', facing: 1 }),
    { id: 'fire', prop: 'campfire', above: CAVE, x: 0.52, y: 0.8, size: 0.04 },
    { id: FIRE, prop: 'halo', above: CAVE, x: 0.52, y: 0.72, size: 0.3, opacity: 0.2 },
    // The dry riverbed: the deer, and the spring.
    { id: 'deer', prop: 'deer', above: DRY, x: 0.12, y: 0.8, size: 0.07, facing: 1, opacity: 0 },
    { id: 'spring', prop: 'pool', above: DRY, x: 0.72, y: 0.84, size: 0.1, opacity: 0 },
    // The bare hill: the sun, hidden and breaking out again (the golden thread).
    { id: 'sun', prop: 'sun', above: HILL, x: 0.5, y: 0.3, size: 0.07, opacity: 0 },
    { id: 'sun-glow', prop: 'halo', above: HILL, x: 0.5, y: 0.3, size: 0.3, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l20-e3-s1',
    title: '“How long, O LORD?”',
    music: 'mozart-lacrimosa',
    beats: [
      say('Not every psalm is happy. More psalms are laments than any other kind: prayers from people who are sad, afraid or hurting, telling God exactly how they feel.', camera({ zoom: 1.03 }, slow)),
      verse('PSA 13:1', actor('david', { pose: 'pray' }, { seconds: 0.8, delay: 0.5 })),
      play('how-long-o-lord', { done: [actor(FIRE, { opacity: 0.9 }, { seconds: 0.5 })] }),
      verse('PSA 13:5', actor('david', { pose: 'lift' }, { seconds: 0.8, delay: 0.3 }), camera({ zoom: 1 }, slow)),
      say('Laments almost always turn, as this one does, from “How long?” to “But I have trusted.” God can take our honest prayers, even our angry ones.', actor('david', { pose: 'sit' }, { seconds: 0.8 })),
    ],
  },
  {
    id: 'l20-e3-s2',
    title: 'As a hart longs for flowing streams',
    music: 'mozart-lacrimosa',
    beats: [
      verse('PSA 42:1', ...swap('night-sky', 'forest-sky'), ...swap(CAVE, DRY), fadeOut('david'), fadeOut('fire'), fadeOut(FIRE), fadeIn('deer', 1.5), ...walk('deer', { x: 0.4, facing: 1 }, 5, 1.5)),
      verse('PSA 42:2', ...walk('deer', { x: 0.56, facing: 1 }, 4)),
      verse('PSA 42:5', fadeIn('spring', 0.3), ...walk('deer', { x: 0.64, facing: 1 }, 3, 1), camera({ zoom: 1.02 }, slow)),
    ],
  },
  {
    id: 'l20-e3-s3',
    title: '“My God, my God”',
    music: 'mozart-lacrimosa',
    beats: [
      say('One psalm of David begins with the saddest cry in the Bible.', ...swap(DRY, HILL), fadeOut('deer'), fadeOut('spring'), fadeIn('sun', 1.5), actor('sun-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 }), camera({ zoom: 1 }, slow)),
      verse('PSA 22:1', ...swap('forest-sky', 'night-sky'), actor('sun', { opacity: 0.2 }, { seconds: 3 })),
      say('It goes on to describe a man surrounded and mocked by his enemies, whose hands and feet are pierced, and who sees his clothes divided by the casting of lots.', camera({ zoom: 1.02 }, slow)),
      say('But the psalm doesn’t end in darkness. It ends in praise, with the whole world turning to God:', layer('night-sky', { opacity: 0 }, { seconds: 3 }), layer('evening-sky', { opacity: 1 }, { seconds: 3 }), actor('sun', { opacity: 1 }, { seconds: 3 })),
      verse('PSA 22:27', ...swap('evening-sky', 'forest-sky'), camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode3: Pick<Episode, 'set' | 'scenes'> = { set: lamentSet, scenes }
