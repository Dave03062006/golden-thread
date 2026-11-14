import { COURSES } from '../../content/levels/21-solomon-and-the-temple/episode-3'
import { atTheSignal } from '../at-the-signal'

/**
 * Without a sound (Level 21 script, Episode 3): building and timing. A finished stone hangs from
 * its rope, swaying; when it hangs still and in line, the player lowers it into place. A tap while
 * it swings does nothing. Six courses, and the walls stand: "neither hammer nor axe nor any tool
 * of iron was heard in the temple."
 *
 * Tap (or press Space) when the stone hangs still. In gentle mode it waits, still, for the tap.
 */

export const withoutASound = atTheSignal({
  id: 'without-a-sound',
  count: COURSES.length,
  open: 1,
  wait: 1.2,
  hint: { pointer: 'Lower each stone into place when it hangs still: tap.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: 'The stone sways on its rope', text: `${n} of ${COURSES.length} courses laid. Wait until it hangs still.` }),
  signal: () => ({ title: 'Still', text: 'Lower it now, gently.' }),
  finished: { title: 'The walls stand', text: '“Neither hammer nor axe nor any tool of iron was heard.”' },
  // Each course settles into place as it is lowered.
  live(n, t) {
    const live: Record<string, number> = {}
    COURSES.forEach((c, i) => (live[`actor:${c.id}.opacity`] = i < n - 1 ? 1 : i === n - 1 ? Math.min(1, t) : 0))
    return live
  },
})
