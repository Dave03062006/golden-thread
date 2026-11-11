import { PROMISE, RUTH } from '../../content/levels/16-ruth/episode-2'
import { lerp } from '../../engine/motion'
import { inOrder } from '../in-order'

/**
 * Where you go (Level 16 script, Episode 2): memory. Ruth's promise to Naomi, in pieces; the
 * player puts it back together in order, and Ruth comes a step closer to Naomi with each part.
 * A wrong choice gets a gentle "not yet"; in gentle mode the next part glows.
 */

export const whereYouGo = inOrder({
  id: 'where-you-go',
  steps: PROMISE.map((text, i) => ({ id: `promise-${i + 1}`, text, note: i === PROMISE.length - 1 ? '“May the LORD do so to me and more also if even death parts me from you.”' : 'Ruth holds on to Naomi.' })),
  question: (n) => (n === 0 ? '“Entreat me not to leave you…” What did Ruth promise first?' : 'And then?'),
  notYet: 'Not yet. What comes next in Ruth’s promise?',
  live: (placed, t) => {
    const step = (RUTH.to - RUTH.from) / PROMISE.length
    return { [`actor:${RUTH.id}.x`]: placed === PROMISE.length && t >= 1 ? RUTH.to : lerp(RUTH.from + step * Math.max(0, placed - 1), RUTH.from + step * placed, placed === 0 ? 0 : t) }
  },
})
