import { FAMILIES, FRONT } from '../../content/levels/14-joshua/episode-7'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * We will serve the LORD (Level 14 script, Episode 7): a quiet interaction. The great oak at
 * Shechem, and the families of Israel gathered, some still holding little idols from the past.
 * One family at a time, the player helps them lay their idols down at the foot of the oak and
 * come to stand by the stone with Joshua's family, saying, "We will serve the LORD."
 *
 * Tap (or press Space) for the next family to come. In gentle mode they come by themselves.
 */

export const HINT: Hint = {
  pointer: 'Tap to help the next family lay down its idols and come to serve the LORD.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** How long a family takes to come; how long its words show before the next can come; how long the end shows. */
export const COME = 2
const WORDS = 2.4
const SHOW = 2.4

interface ServeState {
  time: number
  come: number
  cameAt: number
}

const CAME = { title: 'We will serve the LORD', text: 'They lay their idols down at the foot of the oak, and come to stand with Joshua’s house.' }
const ALL = { title: 'The whole people', text: '“The LORD our God we will serve, and his voice we will obey.”' }

export const weWillServeTheLord: GameRules<ServeState> = {
  id: 'we-will-serve-the-lord',
  start: () => ({ time: 0, come: 0, cameAt: -Infinity }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    let { come, cameAt } = state
    // The next family comes only once the last one's words have been read.
    const ready = come < FAMILIES.length && time - cameAt >= COME + WORDS
    const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    if (ready && (asked || context.gentle)) {
      come++
      cameAt = time
    }
    return { time, come, cameAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    FAMILIES.forEach((f, i) => {
      const t = i < state.come - 1 ? 1 : i === state.come - 1 ? Math.min(1, (state.time - state.cameAt) / COME) : 0
      live[`actor:${f.id}.x`] = lerp(f.from, f.to, t)
      live[`actor:${f.id}.y`] = lerp(0.785, FRONT, t)
      // The idols are laid down at the foot of the oak in the first part of the walk.
      const laid = Math.min(1, t * 2)
      live[`actor:${f.idol}.x`] = lerp(f.idolAt.x, f.laid.x, laid)
      live[`actor:${f.idol}.y`] = lerp(f.idolAt.y, f.laid.y, laid)
    })
    const finished = state.come === FAMILIES.length
    const since = state.time - state.cameAt
    const message = state.come === 0 ? null : finished && since >= COME ? ALL : CAME
    return { live, hint: finished ? null : HINT, message, done: finished && since >= COME + SHOW }
  },
}
