import { GOAT, LEADER, SINS, onBack } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-5'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Carried far away (Level 11 script, Episode 5): a quiet interaction. Aaron's hands rest on
 * the head of the live goat. Around the camp, the people's sins are small dark stones, each
 * with a word: pride, lies, anger, stealing, unkindness, forgetting God. The player brings
 * each one to the goat as Aaron confesses it. When all are laid on it, the player holds to
 * send it away, and the goat walks off into the desert, carrying every one, smaller and
 * smaller until it is out of sight. The camp is clear.
 *
 * Tap a stone (or press Space for the next) to bring it to the goat; then press and hold (or
 * hold Space) to send it away. In gentle mode a tap anywhere brings the nearest stone, and a
 * short hold is enough.
 */

export const HINTS: Record<'lay' | 'send', Hint> = {
  lay: { pointer: 'Bring each dark stone to the goat: tap it.', keys: 'Or press Space for the next.', gesture: 'tap' },
  send: { pointer: 'Now press and hold to send the goat away.', keys: 'Or hold Space.', gesture: 'hold' },
}

/** How near a tap must be; how long a stone takes to reach the goat; how long a hold sends it (in gentle mode); how long it walks away; how long words show. */
const NEAR = 0.06
const CARRY = 0.8
export const HOLD = { normal: 1.2, gentle: 0.5 }
export const AWAY = 7
const WORDS = 1.8
const SHOW = 2.4

interface GoatState {
  time: number
  laidAt: number[]
  count: number
  lastAt: number
  holding: boolean
  held: number
  sentAt: number
}

const LAID = SINS.map((s) => ({ title: s.word[0]!.toUpperCase() + s.word.slice(1), text: 'Aaron confesses it, and lays it on the goat.' }))
const SENT = { title: 'Carried far away', text: '“The goat shall bear all their iniquities upon him to a solitary land.”' }
const CLEAR = { title: 'The camp is clear', text: 'God does not just cover sin. He takes it away, far from us.' }

function stoneAt(laidAt: number[], x: number, y: number, gentle: boolean): number {
  let best = -1
  let bestD = Infinity
  SINS.forEach((s, i) => {
    if (laidAt[i]! >= 0) return
    const d = Math.hypot(s.x - x, s.y - 0.01 - y)
    if (d < bestD && (gentle || d < NEAR)) {
      best = i
      bestD = d
    }
  })
  return best
}

const ease = (t: number) => t * t * (3 - 2 * t)

export const carriedFarAway: GameRules<GoatState> = {
  id: 'carried-far-away',
  start: () => ({ time: 0, laidAt: SINS.map(() => -1), count: 0, lastAt: -Infinity, holding: false, held: 0, sentAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.sentAt >= 0) return { ...state, time }
    const laidAt = [...state.laidAt]
    let { count, lastAt, holding, held, sentAt } = state
    const allLaid = count === SINS.length && time - lastAt >= CARRY
    for (const input of inputs) {
      const press = (input.kind === 'key' && input.key === 'primary') || (input.kind === 'pointer' && input.phase !== 'move')
      const down = input.kind === 'key' ? input.down : input.kind === 'pointer' && input.phase === 'down'
      if (allLaid) {
        if (press) holding = down
        continue
      }
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = laidAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = stoneAt(laidAt, input.x, input.y, context.gentle)
      if (which < 0) continue
      laidAt[which] = time
      lastAt = time
      count++
    }
    if (allLaid) {
      held = holding ? held + STEP : 0
      if (held >= (context.gentle ? HOLD.gentle : HOLD.normal)) {
        sentAt = time
        // The goat and the man who leads it set off into the wilderness.
        emit(actor('goat', { pose: 'walk' }, { seconds: 0.4 }))
        emit(actor(LEADER.id, { pose: 'walk' }, { seconds: 0.4 }))
      }
    }
    return { time, laidAt, count, lastAt, holding, held, sentAt }
  },
  view(state): GameView {
    const sent = state.sentAt >= 0
    const away = sent ? ease(Math.min(1, (state.time - state.sentAt) / AWAY)) : 0
    const goatX = lerp(GOAT.x, GOAT.away, away)
    const scale = lerp(1, GOAT.farSize / GOAT.size, away)
    // It fades only at the end, as it goes out of sight.
    const seen = Math.max(0, 1 - Math.max(0, (away - 0.7) / 0.3))
    const live: Record<string, number> = {
      'actor:goat.x': goatX,
      'actor:goat.size': GOAT.size * scale,
      'actor:goat.opacity': seen,
      [`actor:${LEADER.id}.x`]: lerp(LEADER.x, GOAT.away + 0.04, away),
      [`actor:${LEADER.id}.opacity`]: seen,
    }
    SINS.forEach((s, i) => {
      const at = state.laidAt[i]!
      const t = at < 0 ? 0 : ease(Math.min(1, (state.time - at) / CARRY))
      live[`actor:${s.id}.x`] = lerp(s.x, goatX + onBack(i) * scale, t)
      live[`actor:${s.id}.y`] = lerp(s.y, GOAT.back, t)
      live[`actor:${s.id}.opacity`] = seen
    })
    const laying = state.count < SINS.length || state.time - state.lastAt < CARRY
    const telling = state.count > 0 && state.time - state.lastAt < WORDS
    const message = sent ? (away < 1 ? SENT : CLEAR) : telling ? LAID[state.laidAt.indexOf(state.lastAt)]! : null
    const hint = sent ? null : laying ? HINTS.lay : HINTS.send
    return { live, hint, message, done: sent && state.time - state.sentAt >= AWAY + SHOW }
  },
}
