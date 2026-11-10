import { CHARIOTS, FLOOD, SINK } from '../../content/levels/15-the-judges/episode-2'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The torrent Kishon (Level 15 script, Episode 2): pouring and water. The plain below Mount
 * Tabor, the dry bed of the Kishon, Sisera's iron chariots along its banks, and the storm over
 * the hills. Each tap sends the rain down; the river rises and floods the plain, and the
 * chariots sink to their axles in the mud. When the plain is all water, Deborah cries "Up!"
 *
 * Tap the storm (or press Space). In gentle mode each tap sends more rain.
 */

export const HINT: Hint = {
  pointer: 'Tap the storm clouds to send the rain down on the plain.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** How much one burst of rain raises the river (in gentle mode, more); how fast the water rises to it; how long the end shows. */
export const BURST = 1 / 8
const GENTLE_BURST = 1 / 4
const RISE = 0.6
const SHOW = 2.4

interface KishonState {
  time: number
  /** How full the river is, as the rain has made it (0 to 1). */
  target: number
  /** How full it looks, rising toward the target. */
  level: number
  doneAt: number
}

const FULL = { title: 'Deborah', text: '“Up! For this is the day in which the LORD has given Sisera into your hand.”' }

export const theTorrentKishon: GameRules<KishonState> = {
  id: 'the-torrent-kishon',
  start: () => ({ time: 0, target: 0, level: 0, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    let { target, doneAt } = state
    for (const input of inputs) {
      const tap = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
      if (tap && target < 1) target = Math.min(1, target + (context.gentle ? GENTLE_BURST : BURST))
    }
    const level = Math.min(target, state.level + STEP / RISE)
    if (doneAt < 0 && level >= 1) doneAt = time
    return { time, target, level, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {
      [`layer:${FLOOD}.opacity`]: state.level,
      'actor:rain.opacity': state.target > 0 ? 0.8 : 0,
    }
    for (const c of CHARIOTS) live[`actor:${c.id}.y`] = c.y + SINK * state.level
    const finished = state.doneAt >= 0
    const message = finished ? FULL : state.target > 0 ? { title: 'The rain', text: '“The torrent Kishon swept them away, the onrushing torrent.”' } : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
