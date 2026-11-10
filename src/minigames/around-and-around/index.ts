import { CYCLE, TURNS } from '../../content/levels/15-the-judges/episode-1'
import { inOrder } from '../in-order'

/**
 * Around and around (Level 15 script, Episode 1): ordering. Five pictures on a wheel: the
 * people bowing to idols, raiders taking the harvest, the people crying out, God raising up a
 * judge, the land at rest. The player sets them in order, and the wheel turns, three times
 * round: once, then in the days of Othniel, then in the days of Ehud. Each picture lights up
 * on the wheel as it is chosen. A wrong choice gets a gentle "not yet"; in gentle mode the
 * right one glows.
 */

const TIMES = ['The circle begins.', 'In the days of Othniel, the circle turns again.', 'In the days of Ehud, the circle turns once more.']
const NOTES = ['They forgot all that the LORD had done.', 'And they could no longer stand against their enemies.', '“We have sinned against thee.”', 'And the LORD was with the judge.', 'Until the judge died, and they forgot again.']

export const aroundAndAround = inOrder({
  id: 'around-and-around',
  steps: Array.from({ length: TURNS }, (_, turn) => CYCLE.map((c, i) => ({ id: `${c.id}-${turn + 1}`, text: c.step, note: NOTES[i]! }))).flat(),
  question: (n) => (n % CYCLE.length === 0 ? `${TIMES[n / CYCLE.length]} What happens first?` : 'And then what happens?'),
  notYet: 'Not yet. Think of what comes next around the circle.',
  live(placed, t) {
    // Each turn of the wheel starts dark, and lights its pictures one by one.
    const turn = placed === 0 ? 0 : Math.floor((placed - 1) / CYCLE.length)
    const lit = placed - turn * CYCLE.length
    const live: Record<string, number> = {}
    CYCLE.forEach((c, i) => (live[`actor:${c.id}.opacity`] = i < lit - 1 ? 1 : i === lit - 1 ? t : 0))
    return live
  },
})
