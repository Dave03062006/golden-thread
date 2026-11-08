import { FIELD, GLEANERS, REAPERS, ROWS } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-7'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The edges of the field (Level 11 script, Episode 7): serving and distributing. A field of
 * ripe grain. The player reaps it row by row, and the sheaves are bound; but at the edges of
 * the field the sickle stops: "Leave this for the poor and the stranger." When the harvest
 * is in, the gleaners come, and the player shows each of them to the grain left for them,
 * until the widow, the poor man and the stranger all go home with enough.
 *
 * Tap the field (or press Space) to reap the next row; then tap each gleaner (or press
 * Space) to show them the grain at the edge. In gentle mode a tap anywhere reaps the next
 * row, or sends the next gleaner.
 */

export const HINTS: Record<'reap' | 'glean', Hint> = {
  reap: { pointer: 'Reap the field row by row: tap the next row of grain.', keys: 'Or press Space.', gesture: 'tap' },
  glean: { pointer: 'Show each gleaner the grain left for them: tap them.', keys: 'Or press Space.', gesture: 'tap' },
}

/** How long a row takes to reap; how long a gleaner takes to reach the edge; how near a tap must be; how long words show; how long the end shows. */
export const REAP = 1.4
const GO = 1.8
const NEAR = 0.06
const WORDS = 1.8
const SHOW = 2.6

/** Which way the reapers walk along row `i`: they turn at the end of each row. */
export const along = (i: number) => (i % 2 ? { from: REAPERS.to, to: REAPERS.from, facing: -1 as const } : { from: REAPERS.from, to: REAPERS.to, facing: 1 as const })

interface FieldState {
  time: number
  reaped: number
  reapedAt: number
  sentAt: number[]
  sent: number
  lastSentAt: number
  doneAt: number
}

const STOPS = { title: 'The sickle stops at the edge', text: 'Leave this for the poor and the stranger.' }
const GLEANED = GLEANERS.map((g) => ({ title: g.name, text: 'Gathers the grain left at the edge of the field.' }))
const ENOUGH = { title: 'Enough for all', text: 'The widow, the poor man and the stranger all go home with enough.' }

const ease = (t: number) => t * t * (3 - 2 * t)

export const theEdgesOfTheField: GameRules<FieldState> = {
  id: 'the-edges-of-the-field',
  start: () => ({ time: 0, reaped: 0, reapedAt: -Infinity, sentAt: GLEANERS.map(() => -1), sent: 0, lastSentAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { reaped, reapedAt, sent, lastSentAt, doneAt } = state
    const sentAt = [...state.sentAt]
    for (const input of inputs) {
      const space = input.kind === 'key' && input.key === 'primary' && input.down
      const tap = input.kind === 'pointer' && input.phase === 'down' ? input : null
      if (!space && !tap) continue
      // Reaping, one row after another, each once the last is in.
      if (reaped < ROWS.length) {
        if (time - reapedAt < REAP) continue
        const onField = tap && Math.abs(tap.x - FIELD.x) < FIELD.size / 2 && tap.y > ROWS[0]!.y - 0.04 && tap.y < ROWS.at(-1)!.y + 0.02
        if (space || context.gentle || onField) {
          reaped++
          reapedAt = time
        }
        continue
      }
      if (time - reapedAt < REAP) continue
      // Then the gleaners, each shown to the grain at the edge.
      const which = space || context.gentle ? sentAt.indexOf(-1) : GLEANERS.findIndex((g, i) => sentAt[i]! < 0 && Math.hypot(g.from - tap!.x, g.y - 0.03 - tap!.y) < NEAR)
      if (which < 0) continue
      sentAt[which] = time
      lastSentAt = time
      sent++
      if (sent === GLEANERS.length) doneAt = time
    }
    return { time, reaped, reapedAt, sentAt, sent, lastSentAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    // The reapers walk along the row being reaped; it falls behind them, and its sheaves are bound.
    const row = Math.max(0, state.reaped - 1)
    const t = state.reaped === 0 ? 0 : ease(Math.min(1, (state.time - state.reapedAt) / REAP))
    const path = along(row)
    live[`actor:${REAPERS.id}.x`] = lerp(path.from, path.to, t)
    live[`actor:${REAPERS.id}.y`] = ROWS[row]!.y
    live[`actor:${REAPERS.id}.facing`] = path.facing
    ROWS.forEach((r, i) => {
      const k = i < state.reaped - 1 ? 1 : i === state.reaped - 1 ? t : 0
      live[`actor:${r.id}.opacity`] = 1 - k
      live[`actor:${r.sheaf}.opacity`] = k
    })
    GLEANERS.forEach((g, i) => {
      const at = state.sentAt[i]!
      live[`actor:${g.id}.x`] = lerp(g.from, g.to, at < 0 ? 0 : ease(Math.min(1, (state.time - at) / GO)))
    })
    live['actor:stranger-glow.x'] = live[`actor:${GLEANERS[2]!.id}.x`]!
    const finished = state.doneAt >= 0
    const reaping = state.reaped < ROWS.length || state.time - state.reapedAt < REAP
    const message = finished && state.time - state.doneAt >= WORDS ? ENOUGH : state.sent > 0 && state.time - state.lastSentAt < WORDS ? GLEANED[state.sentAt.indexOf(state.lastSentAt)]! : state.reaped > 0 && state.time - state.reapedAt < WORDS ? STOPS : null
    return { live, hint: finished ? null : reaping ? HINTS.reap : HINTS.glean, message, done: finished && state.time - state.doneAt >= GO + SHOW }
  },
}
