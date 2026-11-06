import { CARVED, COMMANDMENTS, ORDINALS } from '../../content/levels/10-sinai/episode-2'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The ten words (Level 10 script, Episode 2): memory. Two tablets of stone, with ten places
 * to carve. One by one the player recalls the commandments in order: for each place, three
 * short forms are offered (the Catechism's), and the player chooses the one that belongs
 * there. Each one chosen is carved into the stone; a wrong choice gets a gentle "not yet."
 * When all ten are carved, the tablets shine. In gentle mode the right one glows.
 */

/** How long each carving shows before the next place is asked. */
export const SHOW = 1.8

interface WordsState {
  time: number
  carved: number
  carvedAt: number
  missed: boolean
}

/** The three short forms offered for a place: the right one, and two others, in an order that changes. */
export function offered(place: number): string[] {
  const others = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (place + d * 3) % COMMANDMENTS.length).filter((n, i, all) => n !== place && all.indexOf(n) === i)
  const three = [place, others[0]!, others[1]!]
  // Turn the three round by the place's number, so the right one isn't always first.
  const turn = place % 3
  return [...three.slice(turn), ...three.slice(0, turn)].map((n) => `word-${n}`)
}

const views = new Map<string, Choice>()
function choiceFor(state: WordsState, gentle: boolean): Choice {
  const showing = state.carved > 0 && (state.time - state.carvedAt < SHOW || state.carved === COMMANDMENTS.length)
  const key = `${state.carved}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = COMMANDMENTS.slice(0, state.carved).map((c, i) => ({ title: `${i + 1}. ${c}` }))
    if (showing) {
      const n = state.carved - 1
      view = { id: `carved-${n}`, question: `The ${ORDINALS[n]} word, carved in stone:`, options: [], feedback: { right: true, text: COMMANDMENTS[n]! }, trail }
    } else {
      const n = state.carved
      view = {
        id: `place-${n}`,
        question: `Which is the ${ORDINALS[n]} commandment?`,
        options: offered(n).map((id) => ({ id, text: COMMANDMENTS[Number(id.slice(5))]! })),
        feedback: state.missed ? { right: false, text: 'Not yet. Which comes next, after the ones already carved?' } : null,
        trail,
        glow: gentle ? `word-${n}` : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const theTenWords: GameRules<WordsState> = {
  id: 'the-ten-words',
  start: () => ({ time: 0, carved: 0, carvedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { carved, carvedAt, missed } = state
    const asking = carved < COMMANDMENTS.length && time - carvedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === `word-${carved}`) {
        carved++
        carvedAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, carved, carvedAt, missed }
  },
  view(state, context): GameView {
    const finished = state.carved === COMMANDMENTS.length
    const live: Record<string, number> = {}
    CARVED.forEach((c, i) => (live[`actor:${c.id}.opacity`] = i < state.carved ? 1 : 0))
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.carvedAt >= SHOW + 0.6 }
  },
}
