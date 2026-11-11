import { RAIDERS, WAY } from '../../content/levels/18-david-the-shepherd-king/episode-5'
import { alongTheWay } from '../along-the-way'

/**
 * Through the sleeping camp (Level 18 script, Episode 5): stealth. David and Abishai creep
 * through the gaps between the sleeping soldiers to Saul's head, where his spear and water jar
 * are. Drag them on (or steer with the arrow keys); Space goes on to the next gap by itself. In
 * gentle mode they walk on by themselves. Nobody wakes.
 */

export const throughTheSleepingCamp = alongTheWay({
  id: 'through-the-sleeping-camp',
  way: WAY,
  actor: RAIDERS,
  hint: { pointer: 'Lead David and Abishai through the sleeping camp to Saul’s spear and jar.', keys: 'Or steer with the arrow keys, or press Space to go on.', gesture: 'drag' },
  leg: (next) => ({ title: `Gap ${next} of ${WAY.length - 1}`, text: 'Quietly, between the sleeping soldiers.' }),
  arrived: { title: 'Saul’s spear and jar', text: '“No man saw it, or knew it, nor did any awake.”' },
})
