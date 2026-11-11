import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · The Shepherd Boy Anointed (1 Samuel 16), from the approved Level 18 script.
 *
 * Samuel goes to Bethlehem with his horn of oil. Jesse's sons pass before him, and the player
 * passes each by until Samuel asks for the youngest ("the LORD looks on the heart",
 * minigames/the-lord-looks-on-the-heart). David is anointed, and the oil glows (this episode's
 * golden thread: "I am the good shepherd"). Then he plays the lyre for troubled Saul.
 */

const RAMAH = 'city-street'
const BETHLEHEM = 'canaan-hills'
const PALACE = 'house-inside'
const inRamah = personOn(RAMAH)
const person = personOn(BETHLEHEM)
const inPalace = personOn(PALACE)

export const anointedSet: SceneDescription = {
  id: 'l18-anointed',
  title: 'The shepherd boy anointed',
  layers: [
    { id: 'forest-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: RAMAH, depth: 0.3 },
    { id: BETHLEHEM, depth: 0.3, opacity: 0 },
    { id: PALACE, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // Ramah: Samuel grieving, and God's light.
    inRamah('samuel', 'samuel', 0.5, { pose: 'sit' }),
    { id: 'light', prop: 'halo', above: RAMAH, x: 0.66, y: 0.36, size: 0.24, opacity: 0 },
    // Bethlehem: Samuel, Jesse, his sons, Eliab, and David from the sheep; the horn of oil (the golden thread).
    person('samuel-b', 'samuel', 0.3, { facing: 1, opacity: 0 }),
    person('jesse', 'hebrew-father', 0.44, { opacity: 0 }),
    person('eliab', 'barak', 0.58, { size: 0.05, opacity: 0 }),
    person('sons', 'hebrew-workers', 0.74, { size: 0.12, opacity: 0 }),
    person('david', 'david-young', 0.98, { size: 0.038, opacity: 0 }),
    { id: 'horn', prop: 'oil-vial', above: BETHLEHEM, x: 0.36, y: 0.68, size: 0.016, opacity: 0 },
    { id: 'horn-glow', prop: 'halo', above: BETHLEHEM, x: 0.4, y: 0.62, size: 0.14, opacity: 0 },
    // Saul's house: Saul troubled, and David with the lyre.
    inPalace('saul', 'saul', 0.62, { size: 0.05, pose: 'sit' }),
    inPalace('harpist', 'david-young', 0.44, { size: 0.038, pose: 'sit', facing: 1, opacity: 0 }),
    { id: 'lyre', prop: 'lyre', above: PALACE, x: 0.47, y: 0.76, size: 0.03, opacity: 0 },
  ],
  camera: DRIFT,
}

const scenes: StoryScene[] = [
  {
    id: 'l18-e1-s1',
    title: 'Fill your horn with oil',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('1SA 16:1', fadeIn('light', 0.5, 0.8), actor('samuel', { pose: 'idle' }, { seconds: 0.8, delay: 1 })),
      say('Samuel went to Bethlehem and invited Jesse and his sons to a sacrifice.', fadeOut('light'), ...walk('samuel', { x: 0.98, facing: 1 }, 4, 0.5), fadeOut('samuel', 3)),
    ],
  },
  {
    id: 'l18-e1-s2',
    title: 'The LORD looks on the heart',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      verse('1SA 16:6', ...swap(RAMAH, BETHLEHEM), ...['samuel-b', 'jesse', 'eliab', 'sons'].map((id) => fadeIn(id, 1.5))),
      verse('1SA 16:7', ...pose('samuel-b', 'pray', 0.5, 3)),
      verse('1SA 16:10', camera({ zoom: 1.02 }, slow)),
      play('the-lord-looks-on-the-heart', { done: [] }),
      verse('1SA 16:11', camera({ zoom: 1 }, slow)),
      verse('1SA 16:12', fadeIn('david', 0.3), ...walk('david', { x: 0.5 }, 3, 0.5)),
      verse('1SA 16:13', fadeIn('horn', 0.3), actor('horn-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.3 }), actor('david', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 })),
    ],
  },
  {
    id: 'l18-e1-s3',
    title: 'The shepherd with the lyre',
    music: 'bach-sheep-may-safely-graze',
    beats: [
      say('Saul was troubled by an evil spirit, and his servants looked for someone who could play the lyre to soothe him. One of them knew a son of Jesse of Bethlehem, “skilful in playing,” and “the LORD is with him.”', ...swap('forest-sky', 'evening-sky'), ...swap(BETHLEHEM, PALACE), ...['samuel-b', 'jesse', 'eliab', 'sons', 'david', 'horn', 'horn-glow'].map((id) => fadeOut(id))),
      verse('1SA 16:23', fadeIn('harpist', 0.5), fadeIn('lyre', 0.5), actor('saul', { pose: 'idle' }, { seconds: 1, delay: 2.5 })),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: anointedSet, scenes }
