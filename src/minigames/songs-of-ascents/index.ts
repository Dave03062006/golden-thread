import { ASCENTS, STAIRS } from '../../content/levels/20-the-psalms/episode-6'
import { lerp } from '../../engine/motion'
import { inOrder } from '../in-order'

/**
 * Songs of ascents (Level 20 script, Episode 6): ordering and memory. The pilgrim family climbs
 * the Temple stairway; on each step the player chooses the next song of the road, from first
 * seeing the hills to blessing the LORD at night, and the family climbs a step. A wrong choice
 * gets a gentle "not yet"; in gentle mode the next song glows.
 */

const at = (k: number) => ({ x: lerp(STAIRS.from.x, STAIRS.to.x, k / ASCENTS.length), y: lerp(STAIRS.from.y, STAIRS.to.y, k / ASCENTS.length) })

export const songsOfAscents = inOrder({
  id: 'songs-of-ascents',
  steps: ASCENTS.map((text, i) => ({ id: `ascent-${i + 1}`, text, note: i === ASCENTS.length - 1 ? 'At the top of the stairway: the house of the LORD.' : 'One more step up.' })),
  question: (n) => (n === 0 ? 'Far off, the pilgrims first see the hills of Jerusalem. What do they sing?' : 'And on the next step?'),
  notYet: 'Not yet. Which song comes next on the road?',
  live(placed, t) {
    const from = at(Math.max(0, placed - 1))
    const to = at(placed)
    const k = placed === 0 ? 0 : Math.min(1, t)
    return { [`actor:${STAIRS.id}.x`]: lerp(from.x, to.x, k), [`actor:${STAIRS.id}.y`]: lerp(from.y, to.y, k) }
  },
})
