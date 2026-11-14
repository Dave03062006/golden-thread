import { DAWN } from '../../content/levels/20-the-psalms/episode-4'
import { atTheSignal } from '../at-the-signal'

/**
 * Watchmen for the morning (Level 20 script, Episode 4): a quiet waiting play. The watchman looks
 * east into the dark; three times the sky changes, gray, then rose, then gold, and each time the
 * player calls it out from the wall. A tap in the dark does nothing. The waits are long, on
 * purpose: "my soul waits for the Lord more than watchmen for the morning."
 *
 * Tap (or press Space) when the light changes. In gentle mode the light waits for the tap.
 */

export const watchmenForTheMorning = atTheSignal({
  id: 'watchmen-for-the-morning',
  count: DAWN.length,
  open: 2,
  wait: 3.5,
  hint: { pointer: 'Wait with the watchman, and call out when the light changes: tap.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: 'The watchman waits', text: n === 0 ? '“I wait for the LORD, my soul waits.”' : `${DAWN[n - 1]!}. Not yet the morning…` }),
  signal: (n) => ({ title: DAWN[n]!, text: 'Call it out: the morning is coming!' }),
  finished: { title: 'The morning', text: '“More than watchmen for the morning.”' },
  // The night lifts in three steps: gray, rose, gold.
  live(n, t) {
    const k = Math.min(1, t)
    const step = (s: number) => (n > s ? 1 : n === s ? k : 0)
    return {
      'layer:night-sky.opacity': 1 - step(2),
      'layer:evening-sky.opacity': step(2) * (1 - step(3)),
      'layer:dawn-sky.opacity': step(3),
      'actor:sun.opacity': step(3),
      'actor:dawn-glow.opacity': 0.3 + 0.2 * step(1) + 0.35 * step(3),
    }
  },
})
