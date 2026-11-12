import { actor, camera, play, say, verse } from '../../../scene/build'
import type { SceneDescription, StoryScene } from '../../../scene/types'
import type { Episode } from '../../types'
import { DRIFT, fadeIn, fadeOut, personOn, pieceX, pose, slow, swap, walk } from '../11-the-tabernacle-and-the-holy-life/stage'

/**
 * Episode 4 · Absalom's Rebellion (2 Samuel 15–18), from the approved Level 19 script.
 *
 * Absalom steals the hearts of Israel at the city gate. David flees Jerusalem with everyone loyal
 * to him; the player leads the weeping king down across the brook Kidron and up the Mount of
 * Olives, meeting Ittai, the priests with the ark, and Hushai on the way ("up the Mount of
 * Olives", minigames/up-the-mount-of-olives), and the brook glows (this episode's golden thread:
 * Jesus "went forth with his disciples across the Kidron valley"). At Mahanaim, David asks his
 * commanders to deal gently with Absalom; Absalom's death is told in a sentence, and the king weeps.
 */

/** David's road out of Jerusalem: down to the brook Kidron, across, and up the Mount of Olives. */
export const FLIGHT = [
  { x: 0.14, y: 0.6, leg: 'The city gate' },
  { x: 0.3, y: 0.78, leg: 'Ittai the Gittite: “Wherever my lord the king shall be, there also will your servant be.”' },
  { x: 0.44, y: 0.86, leg: 'The brook Kidron: “All the country wept aloud as all the people passed by.”' },
  { x: 0.58, y: 0.76, leg: 'Zadok and the priests with the ark: “Carry the ark of God back into the city.”' },
  { x: 0.72, y: 0.6, leg: 'Up the Mount of Olives, weeping, barefoot, his head covered' },
  { x: 0.84, y: 0.44, leg: 'The summit, where God was worshiped: Hushai, David’s friend, comes to meet him' },
]
export const KING = 'david-fleeing'

const GATE = 'sodom-gate'
const VALLEY = 'kidron-olives'
const atGate = personOn(GATE)
const inValley = (id: string, prop: string, at: { x: number; y: number }, extra = {}) => ({ id, prop, above: VALLEY, x: at.x, y: at.y + 0.01, size: 0.036, facing: -1 as const, opacity: 0, ...extra })

export const absalomSet: SceneDescription = {
  id: 'l19-absalom',
  title: 'Absalom’s rebellion',
  layers: [
    { id: 'dawn-sky', depth: 0 },
    { id: 'evening-sky', depth: 0, opacity: 0 },
    { id: GATE, depth: 0.3 },
    { id: VALLEY, depth: 0.3, opacity: 0 },
  ],
  actors: [
    // The city gate: Absalom with his chariot, greeting the people who come to the king.
    { id: 'chariot', prop: 'chariot', above: GATE, x: 0.2, y: 0.8, size: 0.1, facing: 1 },
    atGate('absalom', 'absalom', 0.42, { facing: 1 }),
    atGate('people', 'hebrew-family', 0.66, { size: 0.12 }),
    // The road out: the king, and those he meets on the way, and the brook Kidron (the golden thread).
    { ...inValley(KING, 'david', FLIGHT[0]!), facing: 1 },
    inValley('ittai', 'ittai', FLIGHT[1]!, { x: FLIGHT[1]!.x + 0.04 }),
    inValley('weepers', 'hebrew-women', FLIGHT[2]!, { x: FLIGHT[2]!.x - 0.06, size: 0.08 }),
    inValley('zadok', 'high-priest', FLIGHT[3]!, { x: FLIGHT[3]!.x + 0.05 }),
    { id: 'ark', prop: 'tabernacle-piece', above: VALLEY, x: pieceX('ark', FLIGHT[3]!.x + 0.1, 0.3), y: FLIGHT[3]!.y + 0.01, size: 0.3, pose: 'ark', opacity: 0 },
    inValley('hushai', 'elder', FLIGHT[5]!, { x: FLIGHT[5]!.x + 0.05 }),
    { id: 'kidron-glow', prop: 'halo', above: VALLEY, x: FLIGHT[2]!.x, y: 0.64, size: 0.22, opacity: 0 },
    // Mahanaim: David at the gate, and the runner from the forest.
    atGate('david', 'david', 0.44, { facing: 1, opacity: 0 }),
    atGate('runner', 'messenger', 1.1, { opacity: 0 }),
  ],
  camera: DRIFT,
}

const onTheRoad = [KING, 'ittai', 'weepers', 'zadok', 'ark', 'hushai']

const scenes: StoryScene[] = [
  {
    id: 'l19-e4-s1',
    title: 'Absalom at the gate',
    music: 'o-haupt-voll-blut',
    beats: [
      say('Absalom was David’s son, the most handsome man in all Israel. Every morning he stood by the city gate and told people with a complaint that the king would never listen to them, but that if he were judge, he would give them justice.', ...walk('people', { x: 0.56 }, 3), camera({ zoom: 1.02 }, slow)),
      verse('2SA 15:6', ...pose('absalom', 'lift', 0.5, 2.5), actor('people', { facing: 1 }, { seconds: 0.5, delay: 3 })),
      say('Then he went to Hebron and had himself proclaimed king.', ...walk('absalom', { x: -0.1, facing: -1 }, 4), ...walk('people', { x: 0.08, facing: -1 }, 5, 0.5), actor('chariot', { x: -0.1 }, { seconds: 4 }), camera({ zoom: 1 }, slow)),
      verse('2SA 15:13'),
    ],
  },
  {
    id: 'l19-e4-s2',
    title: 'Across the brook Kidron',
    music: 'o-haupt-voll-blut',
    beats: [
      say('David would not let a battle be fought in the city, so he left Jerusalem with everyone loyal to him.', ...swap(GATE, VALLEY), fadeIn(KING, 1.5), camera({ zoom: 1.02 }, slow)),
      say('Ittai, a foreign soldier from Gath, could have gone home, but he said, “Wherever my lord the king shall be, whether for death or for life, there also will your servant be.”', fadeIn('ittai', 0.5)),
      verse('2SA 15:23', fadeIn('weepers', 0.5), actor('kidron-glow', { opacity: 0.85 }, { seconds: 0.6, delay: 1 }), camera({ zoom: 1 }, slow)),
      play('up-the-mount-of-olives', { cues: [fadeIn('zadok'), fadeIn('ark'), fadeIn('hushai')], done: [actor(KING, { x: FLIGHT.at(-1)!.x, y: FLIGHT.at(-1)!.y + 0.01 }, { seconds: 0.5 })] }),
      verse('2SA 15:25', actor('zadok', { x: 0.4 }, { seconds: 4, delay: 0.5 }), actor('ark', { x: pieceX('ark', 0.5, 0.3) }, { seconds: 4, delay: 0.5 })),
      verse('2SA 15:26', camera({ zoom: 1.02 }, slow)),
      verse('2SA 15:30', ...swap('dawn-sky', 'evening-sky'), camera({ zoom: 1 }, slow)),
    ],
  },
  {
    id: 'l19-e4-s3',
    title: '“O my son Absalom”',
    music: 'o-haupt-voll-blut',
    beats: [
      say('Absalom’s army came after David across the Jordan. Before the battle, David gave his commanders one order:', ...swap(VALLEY, GATE), ...[...onTheRoad, 'kidron-glow'].map((id) => fadeOut(id)), fadeIn('david', 1.5)),
      verse('2SA 18:5', camera({ zoom: 1.02 }, slow)),
      say('Absalom’s army was defeated. As Absalom fled through the forest on his mule, his head caught in the branches of a great oak, and Joab’s men killed him, against the king’s command.', fadeIn('runner'), ...walk('runner', { x: 0.62, facing: -1 }, 3, 0.5), camera({ zoom: 1 }, slow)),
      verse('2SA 18:33', actor('david', { pose: 'kneel' }, { seconds: 0.8, delay: 0.5 }), fadeOut('runner', 1)),
    ],
  },
]

export const episode4: Pick<Episode, 'set' | 'scenes'> = { set: absalomSet, scenes }
