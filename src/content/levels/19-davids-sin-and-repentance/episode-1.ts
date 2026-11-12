import { actor, camera, layer, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 1 · Bathsheba and Uriah (2 Samuel 11), from the approved Level 19 script.
 *
 * Spring: the army marches out, and David stays home. From the palace roof he sees Bathsheba,
 * Uriah's wife; what he does is told simply and not shown. Uriah, called home, sleeps at the
 * king's door with the servants. Then the sealed letter, carried by Uriah's own hand. In the dark
 * palace the player carries a lamp and finds what David tried to hide ("nothing is hidden",
 * minigames/nothing-is-hidden), and the lamp in the window glows (this episode's golden thread:
 * "he who does what is true comes to the light").
 */

/** Where the lamp goes in the dark palace, finding what David tried to cover up. */
export const SEARCH = [
  { x: 0.5, y: 0.5, leg: 'The dark palace' },
  { x: 0.2, y: 0.74, leg: 'The king’s gift, sent after Uriah to send him home' },
  { x: 0.38, y: 0.8, leg: 'The mat at the king’s door, where Uriah slept with the servants' },
  { x: 0.62, y: 0.72, leg: 'The letter, sealed, and carried by Uriah’s own hand' },
  { x: 0.82, y: 0.78, leg: 'Uriah’s spear: he never came home' },
]
export const LAMP = 'search-light'

const ROOFS = 'jerusalem-roofs'
const PALACE = 'house-inside'
const onRoofs = personOn(ROOFS, 0.7)
const inPalace = personOn(PALACE)
const FOUND = ['gift', 'mat', 'letter', 'spear'] as const

export const uriahSet: SceneDescription = {
  id: 'l19-uriah',
  title: 'Bathsheba and Uriah',
  layers: [
    { id: 'evening-sky', depth: 0 },
    { id: 'night-sky', depth: 0, opacity: 0 },
    { id: ROOFS, depth: 0.3 },
    { id: PALACE, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The roof: the army marching out, David staying behind, and a lamp lit across the city.
    onRoofs('army', 'hebrew-workers', 0.62, { size: 0.1, facing: 1 }),
    onRoofs('david-roof', 'david', 0.3, { facing: 1 }),
    { id: 'far-lamp', prop: 'halo', above: ROOFS, x: 0.78, y: 0.46, size: 0.04, opacity: 0 },
    // The palace: Uriah before the king, the gift, the mat at the door, the letter and the spear.
    inPalace('david', 'david', 0.36, { facing: 1, opacity: 0 }),
    inPalace('uriah', 'uriah', 0.58, { opacity: 0 }),
    { id: 'gift', prop: 'golden-cup', above: PALACE, x: SEARCH[1]!.x, y: SEARCH[1]!.y, size: 0.03, opacity: 0 },
    { id: 'mat', prop: 'feast-mat', above: PALACE, x: SEARCH[2]!.x, y: SEARCH[2]!.y, size: 0.1, opacity: 0 },
    { id: 'letter', prop: 'scroll', above: PALACE, x: SEARCH[3]!.x, y: SEARCH[3]!.y, size: 0.04, opacity: 0 },
    { id: 'spear', prop: 'spear', above: PALACE, x: SEARCH[4]!.x, y: SEARCH[4]!.y, size: 0.1, opacity: 0 },
    inPalace('bathsheba', 'bathsheba', 0.7, { pose: 'kneel', opacity: 0 }),
    // The lamp the player carries, and the lamp in the window (the golden thread).
    { id: LAMP, prop: 'halo', above: PALACE, x: SEARCH[0]!.x, y: SEARCH[0]!.y, size: 0.16, opacity: 0 },
    { id: 'window-lamp', prop: 'oil-lamp', above: PALACE, x: 0.5, y: 0.42, size: 0.03, opacity: 0 },
    { id: 'lamp-glow', prop: 'halo', above: PALACE, x: 0.5, y: 0.41, size: 0.14, opacity: 0 },
  ],
  camera: DRIFT,
}

const inThePalace = ['david', 'uriah']

const scenes: StoryScene[] = [
  {
    id: 'l19-e1-s1',
    title: 'The time when kings go forth to battle',
    music: 'palestrina-kyrie',
    beats: [
      verse('2SA 11:1', ...walk('army', { x: 1.1, facing: 1 }, 8), camera({ zoom: 1.02 }, slow)),
      say('One evening, walking on the palace roof, David saw a very beautiful woman.', fadeIn('far-lamp', 0.5, 0.7), ...swap('evening-sky', 'night-sky')),
      verse('2SA 11:3', camera({ zoom: 1 }, slow)),
      say('David wanted her for himself, though she was another man’s wife. He sent for her and took her, and soon she sent him word that she was going to have his child.', actor('david-roof', { facing: -1 }, { seconds: 0.5, delay: 1 })),
    ],
  },
  {
    id: 'l19-e1-s2',
    title: 'Uriah at the king’s door',
    music: 'palestrina-kyrie',
    beats: [
      say('David sent for Uriah from the battlefield, and told him to go home and rest. He hoped that people would think the child was Uriah’s.', ...swap('night-sky', 'evening-sky'), ...swap(ROOFS, PALACE), fadeOut('david-roof'), fadeOut('far-lamp'), fadeOut('army'), ...inThePalace.map((id) => fadeIn(id, 1.5)), fadeIn('gift', 2.5)),
      verse('2SA 11:9', ...swap('evening-sky', 'night-sky'), ...walk('uriah', { x: SEARCH[2]!.x + 0.04 }, 3), fadeIn('mat', 1), actor('uriah', { pose: 'sit' }, { seconds: 0.8, delay: 3.2 })),
      say('Uriah said that while the ark of God and his fellow soldiers were camping in the open field, he would not go home to eat and drink and be with his wife: “As you live, and as your soul lives, I will not do this thing.”', actor('uriah', { pose: 'idle' }, { seconds: 0.8 }), camera({ zoom: 1.02 }, slow)),
      say('David kept him another day, and made him drunk, but still Uriah slept with the servants at the king’s door.', actor('uriah', { pose: 'sit' }, { seconds: 0.8, delay: 0.5 }), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l19-e1-s3',
    title: 'The letter',
    music: 'palestrina-kyrie',
    beats: [
      verse('2SA 11:14', fadeIn('window-lamp', 0.1), actor('lamp-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 0.2 }), fadeIn('letter', 0.3), ...pose('david', 'work', 0.3, 3), actor('uriah', { pose: 'idle' }, { seconds: 0.8 })),
      say('In it he told Joab to put Uriah where the fighting was hardest, and then to leave him there alone. And so Uriah, David’s faithful soldier, was killed in battle.', ...walk('uriah', { x: 1.1, facing: 1 }, 4), fadeIn('spear', 4), camera({ zoom: 1.02 }, slow)),
      say('When Bathsheba’s time of mourning was over, David brought her to the palace, and she became his wife and had a son. David thought no one would ever know.', fadeIn('bathsheba', 0.5), camera({ zoom: 1 }, slow)),
      play('nothing-is-hidden', {
        cues: [fadeOut('bathsheba'), fadeOut('david'), ...FOUND.map((id) => fadeIn(id, 0, 0.35)), fadeIn(LAMP, 0.5, 0.8)],
        done: [...FOUND.map((id) => actor(id, { opacity: 1 }, { seconds: 1 })), layer('night-sky', { opacity: 0 }, { seconds: 2 }), layer('evening-sky', { opacity: 1 }, { seconds: 2 })],
      }),
      verse('2SA 11:27', fadeOut(LAMP)),
    ],
  },
]

export const episode1: Pick<Episode, 'set' | 'scenes'> = { set: uriahSet, scenes }
