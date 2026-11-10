import { MESSENGERS, WAY } from '../../content/levels/15-the-judges/episode-4'
import { alongTheWay } from '../along-the-way'
import type { Hint } from '../framework'

/**
 * The way we came (Level 15 script, Episode 4): courier routes. The king of Ammon says Israel
 * stole his land; Jephthah answers with the story of how Israel really came, and the player
 * traces it on the map, turn by turn: out of Egypt to the Red Sea, to Kadesh, around Edom and
 * Moab (never through them), across the Arnon, and up to the Jabbok.
 *
 * Drag the messengers (or steer with the arrow keys); Space goes on to the next turn by
 * itself. In gentle mode they follow the way on their own.
 */

export const HINT: Hint = {
  pointer: 'Trace the way Israel came, as Jephthah told it: lead the messengers along it.',
  keys: 'Or steer with the arrow keys, or press Space to go on.',
  gesture: 'drag',
}

export const theWayWeCame = alongTheWay({
  id: 'the-way-we-came',
  way: WAY,
  actor: MESSENGERS,
  hint: HINT,
  leg: (next) => ({ title: `${next} of ${WAY.length - 1}`, text: WAY[next]!.leg }),
  arrived: { title: 'The way we came', text: '“Israel did not take away the land of Moab or the land of the Ammonites.”' },
})
