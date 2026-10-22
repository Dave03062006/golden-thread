import { formatReference } from '../../content/bible/books'
import { verseText } from '../../content/bible/verses'
import { WONDERS, cloudOf } from '../../content/levels/06-job/episode-5'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Where were you? (Level 6 script, Episode 5): searching. The whirlwind fills the sky with
 * cloud. The player sweeps the clouds away, and in each clearing a wonder of creation is
 * found, with God's question to Job: the sea held back by its doors, the storehouses of
 * the snow, the Pleiades and Orion, the lion, the raven, the war horse, the eagle. When all
 * seven are found, the storm begins to still.
 *
 * Sweeping over a cloud clears it, in any order; Space clears the next one: the one-button
 * way. In gentle mode a sweep anywhere clears the next cloud, and the wonder behind it
 * glows faintly through.
 */

export const HINT: Hint = {
  pointer: 'Sweep the storm clouds away to find the wonders God shows Job.',
  keys: 'Or press Space to find the next wonder.',
  gesture: 'sweep',
}

/** How close a sweep must pass to a cloud, how much sweeping clears one, and how long Space takes. */
const NEAR = 0.11
const SWEEP_TO_CLEAR = 0.45
const SPACE_SECONDS = 0.9
/** How long God's question shows for a wonder found, and how long the end shows. */
const WORDS = 3
const SHOW = 2.2

interface WonderState {
  time: number
  /** How far each cloud is cleared, from 0 to 1. */
  cleared: number[]
  /** The wonder found last, and when. */
  last: number
  foundAt: number
  /** Space asked for the next wonder. */
  auto: boolean
  pointer: { x: number; y: number } | null
  doneAt: number
}

/** God's question for each wonder, as the verse puts it: a partial verse keeps its "…", unless it ends a question. */
const asked = (text: string) => text.replace(/^[“‘]+/, '').replace(/[;,]+$/, '').replace(/([?!])…$/, '$1')
const QUESTIONS = WONDERS.map((w) => ({ title: `${w.title} · ${formatReference(w.ref)}`, text: asked(verseText(w.ref)) }))
const STILLED = { title: 'The storm begins to still', text: 'God showed Job how great and wise he is, and how he cares for all he has made.' }

export const whereWereYou: GameRules<WonderState> = {
  id: 'where-were-you',
  start: () => ({ time: 0, cleared: WONDERS.map(() => 0), last: -1, foundAt: -Infinity, auto: false, pointer: null, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const cleared = [...state.cleared]
    let { last, foundAt, auto, pointer } = state
    const next = cleared.findIndex((c) => c < 1)
    const clear = (i: number, by: number) => {
      if (i < 0 || cleared[i]! >= 1) return
      cleared[i] = Math.min(1, cleared[i]! + by)
      if (cleared[i]! >= 1) {
        last = i
        foundAt = time
      }
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.key === 'primary' && input.down) auto = true
      else if (input.kind === 'pointer') {
        if (input.phase === 'up') pointer = null
        else {
          if (pointer) {
            const moved = Math.hypot(input.x - pointer.x, input.y - pointer.y)
            const near = WONDERS.findIndex((w, i) => cleared[i]! < 1 && Math.hypot(input.x - w.x, input.y - w.y) < NEAR)
            clear(near >= 0 ? near : context.gentle ? next : -1, moved / SWEEP_TO_CLEAR)
          }
          pointer = { x: input.x, y: input.y }
        }
      }
    }
    if (auto) {
      const target = cleared.findIndex((c) => c < 1)
      clear(target, STEP / SPACE_SECONDS)
      if (target < 0 || cleared[target]! >= 1) auto = false
    }
    const doneAt = cleared.every((c) => c >= 1) ? time : -1
    return { time, cleared, last, foundAt, auto, pointer, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    WONDERS.forEach((w, i) => {
      const c = state.cleared[i]!
      live[`actor:${cloudOf(w.id)}.opacity`] = 1 - c
      live[`actor:${w.id}.opacity`] = c >= 1 ? 1 : 0.6 * c
    })
    // In gentle mode, the next wonder glows faintly through its cloud.
    const next = state.cleared.findIndex((c) => c < 1)
    const glowAt = WONDERS[next < 0 ? 0 : next]!
    live['actor:wonder-glow.x'] = glowAt.x
    live['actor:wonder-glow.y'] = glowAt.y - 0.03
    live['actor:wonder-glow.opacity'] = context.gentle && next >= 0 ? 0.5 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0
    const finished = state.doneAt >= 0
    const asking = state.last >= 0 && state.time - state.foundAt < WORDS
    const message = asking ? QUESTIONS[state.last]! : finished ? STILLED : null
    // The last wonder's question shows in full, then the storm begins to still.
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
