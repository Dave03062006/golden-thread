import { CLIMB, THRONE_ROAD } from '../../content/levels/18-david-the-shepherd-king/episode-6'
import { lerp } from '../../engine/motion'
import { inOrder } from '../in-order'

/**
 * The road to the throne (Level 18 script, Episode 6): ordering. The events of David's life, from
 * the sheepfold to Zion; the player sets them in order, and David climbs a step up the hill with
 * each. A wrong choice gets a gentle "not yet"; in gentle mode the next one glows.
 */

const at = (k: number) => ({ x: lerp(CLIMB.from.x, CLIMB.to.x, k / THRONE_ROAD.length), y: lerp(CLIMB.from.y, CLIMB.to.y, k / THRONE_ROAD.length) })

export const theRoadToTheThrone = inOrder({
  id: 'the-road-to-the-throne',
  steps: THRONE_ROAD.map((text, i) => ({ id: `throne-${i + 1}`, text, note: i === THRONE_ROAD.length - 1 ? '“David took the stronghold of Zion, that is, the city of David.”' : 'One more step on the long road.' })),
  question: (n) => (n === 0 ? 'Where did David’s road begin?' : 'And then?'),
  notYet: 'Not yet. What came next in David’s life?',
  live(placed, t) {
    if (placed === THRONE_ROAD.length && t >= 1) return { [`actor:${CLIMB.id}.x`]: CLIMB.to.x, [`actor:${CLIMB.id}.y`]: CLIMB.to.y }
    const from = at(Math.max(0, placed - 1))
    const to = at(placed)
    const k = placed === 0 ? 0 : t
    return { [`actor:${CLIMB.id}.x`]: lerp(from.x, to.x, k), [`actor:${CLIMB.id}.y`]: lerp(from.y, to.y, k) }
  },
})
