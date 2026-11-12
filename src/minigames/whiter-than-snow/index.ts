import { LINES, SNOW, STAINS } from '../../content/levels/19-davids-sin-and-repentance/episode-3'
import { atTheSignal } from '../at-the-signal'

/**
 * Whiter than snow (Level 19 script, Episode 3): pouring and water. David's robe lies stained on
 * the basin; the player dips the hyssop, and when the drop is ready, sprinkles it, and a stain
 * fades while a line of Psalm 51 is said. When the robe is white, snow falls over Jerusalem.
 *
 * Tap (or press Space) when the drop is ready. In gentle mode the drop waits for the tap.
 */

export const whiterThanSnow = atTheSignal({
  id: 'whiter-than-snow',
  count: STAINS.length,
  open: 1.2,
  wait: 1,
  hint: { pointer: 'Dip the hyssop in the water, and sprinkle the robe when the drop is ready.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: n === 0 ? 'Dip the hyssop' : `Made clean: ${n} of ${STAINS.length}`, text: n === 0 ? '“Purge me with hyssop, and I shall be clean.”' : LINES[n - 1]! }),
  signal: () => ({ title: 'The drop is ready', text: 'Sprinkle!' }),
  finished: { title: 'Whiter than snow', text: '“Wash me, and I shall be whiter than snow.”' },
  // Each sprinkle washes one stain away; when the last is gone, the snow begins.
  live(n, t) {
    const k = Math.min(1, t)
    const live: Record<string, number> = {}
    STAINS.forEach((_, i) => (live[`actor:stain-${i + 1}.opacity`] = i < n - 1 ? 0 : i === n - 1 ? 1 - k : 1))
    live[`actor:${SNOW}.opacity`] = n === STAINS.length ? k : 0
    return live
  },
})
