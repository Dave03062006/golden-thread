import { ALTAR_STEPS } from '../../content/levels/19-davids-sin-and-repentance/episode-5'
import { inOrder } from '../in-order'

/**
 * What costs me nothing (Level 19 script, Episode 5): building. On the threshing floor of Araunah,
 * the player chooses what David does, step by step: turn down the free gift, weigh out the fifty
 * shekels, and build the altar stone by stone until the wood and the offering are laid on it and
 * fire falls. A wrong choice gets a gentle "not that"; in gentle mode the right one glows.
 */

export const whatCostsMeNothing = inOrder({
  id: 'what-costs-me-nothing',
  steps: ALTAR_STEPS.map((s, i) => ({
    id: `altar-${i + 1}`,
    text: s.text,
    note: i === 0 ? '“I will not offer burnt offerings to the LORD my God which cost me nothing.”' : i === ALTAR_STEPS.length - 1 ? 'And fire came down on the altar.' : 'One more step.',
  })),
  question: (n) => (n === 0 ? 'Araunah offers the king everything, for nothing. What does David do?' : 'And then?'),
  notYet: 'Not that. A gift to God should cost something.',
  offer: (n) => {
    const options = [
      { id: `altar-${n + 1}`, text: ALTAR_STEPS[n]!.text },
      { id: `decoy-${n + 1}`, text: ALTAR_STEPS[n]!.decoy },
      { id: `decoy-${((n + 1) % ALTAR_STEPS.length) + 1}`, text: ALTAR_STEPS[(n + 1) % ALTAR_STEPS.length]!.decoy },
    ]
    const turn = n % options.length
    return [...options.slice(turn), ...options.slice(0, turn)]
  },
  // The silver on the scales, then the altar rising stone by stone, then the fire.
  live(placed, t) {
    const k = Math.min(1, t)
    const step = (n: number) => (placed > n ? 1 : placed === n ? k : 0)
    return {
      'actor:silver.opacity': step(2),
      'actor:altar.opacity': placed < 3 ? 0 : (placed - 3 + (placed === ALTAR_STEPS.length ? 1 : k)) / 3,
      'actor:fire.opacity': step(ALTAR_STEPS.length),
    }
  },
})
