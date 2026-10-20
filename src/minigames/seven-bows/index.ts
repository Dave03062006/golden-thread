import { BOWS, BOW_STEP, COMPANY, JACOB_FROM, LAMB } from '../../content/levels/04-isaac-and-jacob/episode-7'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Seven bows (Level 4 script, Episode 7): a quiet interaction. A long, open field, Jacob
 * limping at one end with the lamb he brings as a gift, and Esau's company far off at the
 * other. Each press, Jacob steps forward and bows to the ground; each bow takes a moment,
 * and he can't hurry it. Seven times he bows, a little closer each time, while the dust of
 * Esau's four hundred men grows nearer. After the seventh, Jacob stays on his knees, and
 * the player waits (the next scene: Esau runs to meet him).
 *
 * A tap anywhere (or Space) makes the next bow. In gentle mode, Jacob bows on his own
 * after the first press.
 */

export const HINT: Hint = {
  pointer: 'Tap to step forward and bow, seven times, as Jacob comes to his brother.',
  keys: 'Or press Space for each bow.',
  gesture: 'tap',
}

/** How long a step forward takes, and the bow after it; and how long he kneels at the end before the story goes on. */
const WALK = 0.9
const BOW = 1.1
const WAIT = 2.6

interface BowsState {
  time: number
  /** Bows made, and the one under way: when it began. */
  bowed: number
  startedAt: number
  /** Gentle mode: the first press sets him going. */
  going: boolean
  doneAt: number
}

const COUNT = Array.from({ length: BOWS + 1 }, (_, n) => ({ title: 'Bowing to the ground', text: `${n} of ${BOWS}` }))
const KNEELING = { title: 'Seven times', text: 'Jacob stays on his knees, and waits.' }

export const sevenBows: GameRules<BowsState> = {
  id: 'seven-bows',
  start: () => ({ time: 0, bowed: 0, startedAt: -Infinity, going: false, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { bowed, startedAt, going, doneAt } = state
    const since = time - startedAt
    const busy = since < WALK + BOW
    // The bow under way: he walks, then goes down; when it's done, he rises for the next.
    if (state.time - startedAt < WALK && since >= WALK) emit(actor('jacob', { pose: 'kneel' }, { seconds: 0.5 }))
    if (state.time - startedAt < WALK + BOW && since >= WALK + BOW) {
      bowed++
      if (bowed === BOWS) doneAt = time
      else emit(actor('jacob', { pose: 'carry' }, { seconds: 0.5 }))
    }
    const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    if (asked && context.gentle) going = true
    if (!busy && doneAt < 0 && bowed < BOWS && (asked || going)) {
      startedAt = time
      emit(actor('jacob', { pose: 'walk', facing: 1 }, { seconds: 0.3 }))
    }
    return { time, bowed, startedAt, going, doneAt }
  },
  view(state): GameView {
    const since = state.time - state.startedAt
    const walking = since < WALK
    const bowing = !walking && since < WALK + BOW
    // How far he has come: each bow's step, eased as he walks it.
    const stepping = walking ? since / WALK : 1
    const steps = state.bowed + (walking || bowing ? stepping : 0)
    const x = JACOB_FROM + Math.min(BOWS, steps) * BOW_STEP
    const near = Math.min(1, steps / BOWS)
    const down = bowing || state.doneAt >= 0
    const live: Record<string, number> = {
      'actor:jacob.x': x,
      'actor:lamb.x': x + LAMB.dx,
      'actor:lamb.y': down ? LAMB.bowing : LAMB.standing,
      'actor:dust.x': lerp(COMPANY.dust.from.x, COMPANY.dust.to.x, near),
      'actor:dust.size': lerp(COMPANY.dust.from.size, COMPANY.dust.to.size, near),
      'actor:dust.opacity': lerp(COMPANY.dust.from.opacity, COMPANY.dust.to.opacity, near),
      'actor:esaus-men.x': lerp(COMPANY.men.from.x, COMPANY.men.to.x, near),
      'actor:esaus-men.opacity': lerp(COMPANY.men.from.opacity, COMPANY.men.to.opacity, near),
    }
    const finished = state.doneAt >= 0
    return { live, hint: finished ? null : HINT, message: finished ? KNEELING : state.bowed > 0 ? COUNT[state.bowed]! : null, done: finished && state.time - state.doneAt >= WAIT }
  },
}
