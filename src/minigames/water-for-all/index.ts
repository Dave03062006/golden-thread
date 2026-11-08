import { JAR, POOL, THIRSTY, THIRSTY_Y } from '../../content/levels/12-forty-years-in-the-wilderness/episode-5'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Water for all (Level 12 script, Episode 5): serving and distributing. The water pours from
 * the rock into a pool, and all around it wait the thirsty: a mother, a child, an old man, a
 * shepherd, his flock, a donkey. The player carries water to each one who needs it, and each
 * one drinks. There is always more water than there are people.
 *
 * Tap someone thirsty (or press Space for the next) to carry water to them. In gentle mode a
 * tap anywhere carries it to the next.
 */

export const HINT: Hint = {
  pointer: 'Carry water from the pool to everyone who is thirsty: tap them.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long the water takes to carry; how long words show; how long the end shows. */
const NEAR = 0.06
export const CARRY = 1
const WORDS = 1.6
const SHOW = 2.4

interface WaterState {
  time: number
  /** When each one was brought water, or -1. */
  givenAt: number[]
  count: number
  lastAt: number
  doneAt: number
}

const DRANK = THIRSTY.map((p) => ({ title: p.name, text: p.id === 'flock' ? 'The sheep crowd round to drink.' : p.id === 'donkey' ? 'Even the donkey drinks its fill.' : 'Drinks, and stands up again.' }))
const ENOUGH = { title: 'Water abundantly', text: '“And water came forth abundantly, and the congregation drank, and their cattle.”' }

function whoAt(givenAt: number[], x: number, y: number, gentle: boolean): number {
  if (gentle) return givenAt.indexOf(-1)
  return THIRSTY.findIndex((p, i) => givenAt[i]! < 0 && Math.hypot(p.x - x, THIRSTY_Y - 0.03 - y) < NEAR)
}

export const waterForAll: GameRules<WaterState> = {
  id: 'water-for-all',
  start: () => ({ time: 0, givenAt: THIRSTY.map(() => -1), count: 0, lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    // One jar at a time: the next waits until this one has been carried.
    if (state.doneAt >= 0 || time - state.lastAt < CARRY) return { ...state, time }
    const givenAt = [...state.givenAt]
    let { count, lastAt, doneAt } = state
    for (const input of inputs) {
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = givenAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = whoAt(givenAt, input.x, input.y, context.gentle)
      if (which < 0) continue
      givenAt[which] = time
      lastAt = time
      count++
      if (count === THIRSTY.length) doneAt = time
      break
    }
    return { time, givenAt, count, lastAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    THIRSTY.forEach((p, i) => {
      const at = state.givenAt[i]!
      live[`actor:${p.glow}.opacity`] = at < 0 ? 0 : 0.8 * Math.min(1, Math.max(0, (state.time - at - CARRY) / 0.4))
    })
    // The jar goes from the pool to whoever is being given water, and is set down there.
    const carrying = state.count > 0 && state.time - state.lastAt < CARRY
    const to = THIRSTY[state.givenAt.indexOf(state.lastAt)]
    const t = carrying ? Math.min(1, (state.time - state.lastAt) / CARRY) : 0
    live[`actor:${JAR}.x`] = to ? lerp(POOL.x, to.x, t) : POOL.x
    live[`actor:${JAR}.y`] = to ? lerp(POOL.y, THIRSTY_Y, t) : POOL.y
    live[`actor:${JAR}.opacity`] = carrying ? 1 : 0
    const finished = state.doneAt >= 0
    const drank = state.count > 0 && state.time - state.lastAt >= CARRY && state.time - state.lastAt < CARRY + WORDS
    const message = finished && !drank && state.time - state.doneAt >= CARRY ? ENOUGH : drank && to ? DRANK[THIRSTY.indexOf(to)]! : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= CARRY + WORDS + SHOW }
  },
}
