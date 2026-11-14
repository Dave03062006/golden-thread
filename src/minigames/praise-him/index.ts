import { INSTRUMENTS } from '../../content/levels/20-the-psalms/episode-1'
import { atTheSignal } from '../at-the-signal'

/**
 * Praise him! (Level 20 script, Episode 1): rhythm. A drum keeps the beat in the Temple courts;
 * on each beat the player taps, and the next instrument of Psalm 150 joins the song: the
 * trumpet, the lute and harp, the timbrel and dance, the strings and pipe, the cymbals.
 *
 * Tap (or press Space) on the beat. In gentle mode any tap counts.
 */

export const praiseHim = atTheSignal({
  id: 'praise-him',
  count: INSTRUMENTS.length,
  open: 0.9,
  wait: 0.8,
  hint: { pointer: 'Keep the beat: tap on the drum, and another instrument joins the song.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: n === 0 ? 'The drum begins' : `${INSTRUMENTS[n - 1]!.name} joins the song`, text: `${n} of ${INSTRUMENTS.length} instruments.` }),
  signal: (n) => ({ title: 'The beat!', text: `Bring in ${INSTRUMENTS[n]!.name.toLowerCase()}.` }),
  finished: { title: 'Praise him!', text: '“Let everything that breathes praise the LORD!”' },
  // Each instrument appears as it joins.
  live(n, t) {
    const live: Record<string, number> = {}
    INSTRUMENTS.forEach((i, k) => (live[`actor:${i.id}.opacity`] = k < n - 1 ? 1 : k === n - 1 ? Math.min(1, t) : 0))
    return live
  },
})
