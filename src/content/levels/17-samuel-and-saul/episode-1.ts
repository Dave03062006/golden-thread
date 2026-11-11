import { actor, camera, play, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, tabernacle, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Hannah's Prayer (1 Samuel 1:1–2:26), from the approved Level 17 script.
 *
 * Hannah, mocked by Peninnah for having no child, prays in silence at Shiloh; the player holds
 * while she pours out her soul ("pouring out her soul", minigames/pouring-out-her-soul). Eli
 * blesses her, Samuel is born, and she gives him to the LORD. As she sings, the light rises
 * around her (this episode's golden thread: Mary's Magnificat).
 */

/** The light of Hannah's silent prayer, rising as she prays. */
export const PRAYER = { id: 'prayer-light', from: 0.66, to: 0.4 }

const SHILOH = 'canaan-hills'
const person = personOn(SHILOH)

export const hannahSet: SceneDescription = {
  id: 'l17-hannah',
  title: 'Hannah’s prayer',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: SHILOH, depth: 0.3 },
  ],
  actors: [
    // The house of the LORD at Shiloh, and the family at the feast.
    ...tabernacle('shiloh', SHILOH, { x: 0.22, y: 0.7, size: 0.32 }, ['tent', 'court']),
    person('eli', 'high-priest', 0.36, { pose: 'sit', facing: 1 }),
    person('elkanah', 'hebrew-father', 0.62),
    person('peninnah', 'hebrew-family', 0.8, { size: 0.12 }),
    person('hannah', 'hannah', 0.52, { facing: 1 }),
    { id: PRAYER.id, prop: 'halo', above: SHILOH, x: 0.5, y: PRAYER.from, size: 0.1, opacity: 0 },
    // Samuel as a baby, then a small boy; and the light of Hannah's song (the golden thread).
    { id: 'baby', prop: 'swaddled-baby', above: SHILOH, x: 0.5, y: 0.74, size: 0.03, opacity: 0 },
    person('samuel', 'samuel-boy', 0.58, { size: 0.03, opacity: 0 }),
    { id: 'song-glow', prop: 'halo', above: SHILOH, x: 0.52, y: 0.62, size: 0.2, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l17-e1-s1',
    title: 'At Shiloh',
    music: 'mozart-alleluja',
    beats: [
      verse('1SA 1:2', camera({ zoom: 1.02 }, slow)),
      verse('1SA 1:6', camera({ zoom: 1 }, slow)),
      verse('1SA 1:10', ...walk('hannah', { x: 0.46, facing: -1 }, 2, 0.3), actor('hannah', { pose: 'kneel' }, { seconds: 0.8, delay: 2.4 })),
      verse('1SA 1:11', fadeIn(PRAYER.id, 0.5, 0.6)),
      play('pouring-out-her-soul', { done: [actor(PRAYER.id, { y: PRAYER.to, opacity: 0.9 }, { seconds: 0.5 })] }),
    ],
  },
  {
    id: 'l17-e1-s2',
    title: 'Only her lips moved',
    music: 'mozart-alleluja',
    beats: [
      verse('1SA 1:13', fadeOut(PRAYER.id), camera({ zoom: 1.02 }, slow)),
      verse('1SA 1:15', actor('hannah', { pose: 'idle' }, { seconds: 0.8, delay: 0.3 })),
      verse('1SA 1:17', ...pose('eli', 'lift', 0.5, 3)),
      verse('1SA 1:20', ...swap('forest-sky', 'evening-sky'), fadeIn('baby', 1), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l17-e1-s3',
    title: 'Lent to the LORD',
    music: 'mozart-alleluja',
    beats: [
      verse('1SA 1:24', ...swap('evening-sky', 'forest-sky'), fadeOut('baby'), fadeOut('peninnah'), fadeIn('samuel', 1)),
      verse('1SA 1:27', camera({ zoom: 1.02 }, slow)),
      verse('1SA 1:28', ...walk('samuel', { x: 0.4 }, 2, 0.3), camera({ zoom: 1 }, slow)),
      verse('1SA 2:1', actor('song-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), ...pose('hannah', 'lift', 0.5, 4)),
      verse('1SA 2:2', ...pose('hannah', 'lift', 0.5, 4)),
      verse('1SA 2:8', camera({ zoom: 1.02 }, slow)),
      verse('1SA 2:10', camera({ zoom: 1 }, slow)),
      verse('1SA 2:19', camera({ zoom: 1.02 }, slow)),
      verse('1SA 2:26', camera({ zoom: 1 }, slow)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: hannahSet, scenes }
