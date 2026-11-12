import { LAMP, SEARCH } from '../../content/levels/19-davids-sin-and-repentance/episode-1'
import { alongTheWay } from '../along-the-way'

/**
 * Nothing is hidden (Level 19 script, Episode 1): light and reveal. The palace is dark; the
 * player carries a lamp from one shadow to the next, and finds what David tried to cover up: the
 * gift, the mat at the door, the sealed letter, Uriah's spear. Then the whole palace fills with
 * light, because nothing is hidden from God.
 *
 * Drag the lamp (or steer with the arrow keys); Space goes on to the next shadow by itself. In
 * gentle mode the lamp goes there on its own.
 */

export const nothingIsHidden = alongTheWay({
  id: 'nothing-is-hidden',
  way: SEARCH,
  actor: LAMP,
  hint: { pointer: 'Carry the lamp through the dark palace, and find what David tried to hide.', keys: 'Or move it with the arrow keys, or press Space to go on.', gesture: 'drag' },
  leg: (next) => ({ title: `Found: ${next} of ${SEARCH.length - 1}`, text: SEARCH[next]!.leg }),
  arrived: { title: 'Nothing is hidden', text: '“For every one who does evil hates the light… But he who does what is true comes to the light.”' },
})
