import { MEN, ROCKS } from '../../content/levels/18-david-the-shepherd-king/episode-4'
import { lerp } from '../../engine/motion'
import { atTheSignal } from '../at-the-signal'

/**
 * The other side of the mountain (Level 18 script, Episode 4): timing. Saul's lookout sweeps the
 * slopes; when he looks away, the player moves David's men on to the next rock, and while he
 * looks this way, they keep still. Six rocks, and they are over the ridge and safe.
 *
 * Tap (or press Space) while the lookout looks away. In gentle mode he looks away until they move.
 */

export const theOtherSideOfTheMountain = atTheSignal({
  id: 'the-other-side-of-the-mountain',
  count: ROCKS.length - 1,
  open: 1.4,
  wait: 1.2,
  hint: { pointer: 'When Saul’s lookout looks away, tap to move David’s men to the next rock.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: (n) => ({ title: 'Keep still', text: `The lookout is looking this way. ${n} of ${ROCKS.length - 1} rocks.` }),
  signal: () => ({ title: 'He looks away', text: 'Now! On to the next rock.' }),
  finished: { title: 'Over the ridge', text: '“Saul sought him every day, but God did not give him into his hand.”' },
  live: (n, t) => ({ [`actor:${MEN}.x`]: n === 0 ? ROCKS[0]! : t >= 1 ? ROCKS[n]! : lerp(ROCKS[n - 1]!, ROCKS[n]!, t) }),
})
