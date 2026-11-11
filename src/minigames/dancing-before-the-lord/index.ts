import { DANCER, STEPS } from '../../content/levels/18-david-the-shepherd-king/episode-7'
import { atTheSignal } from '../at-the-signal'

/**
 * Dancing before the LORD (Level 18 script, Episode 7): rhythm. The procession climbs toward the
 * city, and the drum beats; the player dances with David on the beat, and he leaps for joy. A
 * missed beat doesn't matter: David just dances on. Six steps, and the ark reaches the gate.
 *
 * Tap (or press Space) on the beat. In gentle mode any tap counts.
 */

export const dancingBeforeTheLord = atTheSignal({
  id: 'dancing-before-the-lord',
  count: STEPS,
  open: 1,
  wait: 0.8,
  hint: { pointer: 'Dance with David: tap on the beat of the drum.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: 'The procession climbs', text: `${n} of ${STEPS} steps.` }),
  signal: () => ({ title: 'The drum!', text: 'Dance!' }),
  finished: { title: 'At the gate', text: '“And David danced before the LORD with all his might.”' },
  // David leaps on each step, and lands again.
  live: (n, t) => ({ [`actor:${DANCER.id}.y`]: n === 0 || t >= 1 ? DANCER.y : DANCER.y - DANCER.leap * Math.sin(Math.PI * t) }),
})
