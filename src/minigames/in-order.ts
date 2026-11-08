import { STEP, type Choice, type GameRules, type GameView } from './framework'

/**
 * A play of ordering by choosing (spec §13.7, kind 9): one step after another, the player
 * chooses which comes next from three, and each one chosen takes its place while a few words
 * say what it means. A wrong choice gets a gentle "not yet"; in gentle mode the right one
 * glows. Level 11 raises the tabernacle and clothes Aaron this way.
 */

export interface OrderStep {
  id: string
  /** What the player chooses. */
  text: string
  /** What it means, shown once it's in place. */
  note: string
}

export interface InOrder {
  id: string
  steps: readonly OrderStep[]
  question: (n: number) => string
  notYet: string
  /** What the scene shows, with `placed` steps done and the last of them `t` of the way in (0 to 1). */
  live: (placed: number, t: number) => Record<string, number>
}

/** How long each step shows before the next is asked; how long a step takes to take its place. */
export const SHOW = 2
export const SETTLE = 0.8

interface OrderState {
  time: number
  placed: number
  placedAt: number
  missed: boolean
}

/** The three offered for step `n`: the right one and the two after it (or before, near the end), turned round so the right one moves. */
export function offered(count: number, n: number): number[] {
  const others = [n + 1, n + 2, n - 1, n - 2].filter((i) => i >= 0 && i < count).slice(0, 2)
  const three = [n, ...others]
  const turn = n % three.length
  return [...three.slice(turn), ...three.slice(0, turn)]
}

export function inOrder(config: InOrder): GameRules<OrderState> {
  const { steps } = config
  const views = new Map<string, Choice>()
  const choiceFor = (state: OrderState, gentle: boolean): Choice => {
    const showing = state.placed > 0 && (state.time - state.placedAt < SHOW || state.placed === steps.length)
    const key = `${state.placed}|${showing}|${state.missed}|${gentle}`
    let view = views.get(key)
    if (!view) {
      const trail = steps.slice(0, state.placed).map((s) => ({ title: s.text }))
      if (showing) {
        const s = steps[state.placed - 1]!
        view = { id: `placed-${state.placed}`, question: s.text, options: [], feedback: { right: true, text: s.note }, trail }
      } else {
        const n = state.placed
        view = {
          id: `step-${n}`,
          question: config.question(n),
          options: offered(steps.length, n).map((i) => ({ id: steps[i]!.id, text: steps[i]!.text })),
          feedback: state.missed ? { right: false, text: config.notYet } : null,
          trail,
          glow: gentle ? steps[n]!.id : undefined,
        }
      }
      views.set(key, view)
    }
    return view
  }
  return {
    id: config.id,
    start: () => ({ time: 0, placed: 0, placedAt: -Infinity, missed: false }),
    step(state, inputs) {
      const time = state.time + STEP
      let { placed, placedAt, missed } = state
      const asking = placed < steps.length && time - placedAt >= SHOW
      for (const input of inputs) {
        if (input.kind !== 'choose' || !asking) continue
        if (input.option === steps[placed]!.id) {
          placed++
          placedAt = time
          missed = false
          break
        }
        missed = true
      }
      return { time, placed, placedAt, missed }
    },
    view(state, context): GameView {
      const t = state.placed === 0 ? 0 : Math.min(1, (state.time - state.placedAt) / SETTLE)
      const finished = state.placed === steps.length
      return { live: config.live(state.placed, t), hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.placedAt >= SHOW + 0.6 }
    },
  }
}
