import { formatReference } from '../../content/bible/books'
import { verseText } from '../../content/bible/verses'
import { ELDERS, SIGNS } from '../../content/levels/07-moses-is-called/episode-5'
import { actor } from '../../scene/build'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The signs (Level 7 script, Episode 5): ordering. The elders of Israel watch, doubtful.
 * The player shows them the signs God gave Moses, in the order God gave them: the rod that
 * becomes a serpent and a rod again; the hand put into the cloak, white as snow, and healed;
 * the water from the Nile poured on the dry ground. Each sign plays out with God's words for
 * it, and more of the elders lean in, until all of them bow their heads. A sign chosen out of
 * turn gets a gentle word; in gentle mode the next sign glows.
 */

/** How long each sign takes to show. */
export const SHOW = 4
/** Within a sign: when the rod is down as a serpent, when the hand is white, when the water turns. */
const ROD_DOWN = [0.4, 2.2]
const HAND_WHITE = [0.5, 2.2]
const WATER_TURNS = 1.4

interface SignsState {
  time: number
  shown: number
  shownAt: number
  missed: boolean
}

const ASKED = ['Which sign does Moses show the elders first?', 'Which sign comes next?', 'And the last sign?']
const NOT_YET = 'Not yet. God gave that sign later: first the rod, then the hand, then the water.'
const OPTIONS = SIGNS.map((s) => ({ id: s.id, text: s.text }))
/** God's words for each sign, a verse at a time (the hand has two). */
const WORDS = SIGNS.map((s) => s.refs.map((ref) => ({ title: formatReference(ref), text: verseText(ref) })))

const views = new Map<string, Choice>()
function choiceFor(state: SignsState, gentle: boolean): Choice | null {
  if (state.shown > 0 && state.time - state.shownAt < SHOW) return null
  if (state.shown === SIGNS.length) return null
  const key = `${state.shown}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    view = {
      id: `sign-${state.shown}`,
      question: ASKED[state.shown]!,
      options: OPTIONS.filter((_, i) => i >= state.shown),
      feedback: state.missed ? { right: false, text: NOT_YET } : null,
      trail: SIGNS.slice(0, state.shown).map((s) => ({ title: s.text })),
      glow: gentle ? SIGNS[state.shown]!.id : undefined,
    }
    views.set(key, view)
  }
  return view
}

export const theSigns: GameRules<SignsState> = {
  id: 'the-signs',
  start: () => ({ time: 0, shown: 0, shownAt: -Infinity, missed: false }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { shown, shownAt, missed } = state
    const since = time - shownAt
    const before = state.time - shownAt
    const crossed = (at: number) => before < at && since >= at
    // The sign under way: Moses shows it, then the elders lean in (and at the last, bow).
    if (shown > 0) {
      const sign = SIGNS[shown - 1]!.id
      if (crossed(0.2)) emit(actor('moses', { pose: 'carry' }, { seconds: 0.3 }))
      if (sign === 'water' && crossed(WATER_TURNS)) emit(actor('poured-water', { pose: 'red' }, { seconds: 0.6 }))
      if (crossed(2.4)) emit(actor('moses', { pose: 'idle' }, { seconds: 0.3 }))
      if (crossed(2.8)) {
        const leaning = shown === SIGNS.length ? ELDERS : ELDERS.slice(0, shown * 2)
        for (const id of leaning) emit(actor(id, { pose: shown === SIGNS.length ? 'kneel' : 'pray' }, { seconds: 0.8 }))
      }
    }
    const asking = shown < SIGNS.length && (shown === 0 || since >= SHOW)
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === SIGNS[shown]!.id) {
        shown++
        shownAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, shown, shownAt, missed }
  },
  view(state, context): GameView {
    const since = state.time - state.shownAt
    const sign = state.shown > 0 ? SIGNS[state.shown - 1]!.id : null
    const during = (span: number[]) => since >= span[0]! && since < span[1]!
    const live: Record<string, number> = {
      'actor:rod.opacity': sign === 'rod' && during(ROD_DOWN) ? 0 : 1,
      'actor:serpent.opacity': sign === 'rod' && during(ROD_DOWN) ? 1 : 0,
      'actor:hand-glow.opacity': sign === 'hand' && during(HAND_WHITE) ? 0.9 : 0,
      'actor:poured-water.opacity': sign === 'water' && since >= 0.4 ? 1 : 0,
    }
    const words = sign ? WORDS[state.shown - 1]! : []
    const showing = state.shown > 0 && since < SHOW
    const message = showing ? (words.length > 1 && since >= HAND_WHITE[1]! - 0.6 ? words[1]! : words[0]!) : null
    const finished = state.shown === SIGNS.length
    return { live, hint: null, message, choice: choiceFor(state, context.gentle), done: finished && since >= SHOW + 0.6 }
  },
}
