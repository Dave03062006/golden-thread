import { DREAMS } from '../../content/levels/05-joseph-and-his-brothers/episode-3'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Pharaoh's dreams (Level 5 script, Episode 3): decoding. The pictures of Pharaoh's dreams
 * appear in the throne hall one after another: seven fat cows, seven thin cows, seven full
 * ears, seven thin ears, and the dream that came twice. For each, the player chooses what
 * God was showing. A wrong choice gets a gentle word, Joseph's own: the meaning comes from
 * God. In gentle mode the right meaning glows.
 */

/** How long each meaning shows before the next picture. */
const SHOW = 2

const MEANINGS = [
  { id: 'plenty', text: 'Seven years of plenty', told: 'Seven years of great plenty in all the land of Egypt.' },
  { id: 'famine', text: 'Seven years of famine', told: 'Seven years of famine, when the plenty will be forgotten.' },
  { id: 'war', text: 'A war with seven nations', told: '' },
  { id: 'sons', text: 'Seven sons for Pharaoh', told: '' },
  { id: 'decided', text: 'God has decided it, and will do it soon', told: 'The dream came twice because God has decided it, and will do it soon.' },
]
const OPTIONS = MEANINGS.map((m) => ({ id: m.id, text: m.text }))
const NOT_QUITE = 'Not quite. Joseph said, “It is not in me; God will give Pharaoh a favorable answer.”'

/** Which pictures show for each dream, and how brightly. */
const SHOWN: Record<string, Record<string, number>> = {
  'fat-cows': { 'fat-cows': 1 },
  'thin-cows': { 'fat-cows': 0.4, 'thin-cows': 1 },
  'full-ears': { 'full-ears': 1 },
  'thin-ears': { 'full-ears': 0.4, 'thin-ears': 1 },
  twice: { 'fat-cows': 0.6, 'thin-cows': 0.6, 'full-ears': 0.6, 'thin-ears': 0.6 },
}
const PICTURES = ['fat-cows', 'thin-cows', 'full-ears', 'thin-ears']

interface DreamsState {
  time: number
  read: number
  readAt: number
  missed: string | null
}

const views = new Map<string, Choice>()
function choiceFor(state: DreamsState, gentle: boolean): Choice {
  const showing = state.read > 0 && (state.time - state.readAt < SHOW || state.read === DREAMS.length)
  const key = `${state.read}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = DREAMS.slice(0, state.read).map((d) => ({ title: MEANINGS.find((m) => m.id === d.meaning)!.text }))
    if (showing) {
      const d = DREAMS[state.read - 1]!
      view = { id: `read-${state.read}`, question: d.picture, options: [], feedback: { right: true, text: MEANINGS.find((m) => m.id === d.meaning)!.told }, trail }
    } else {
      const d = DREAMS[state.read]!
      view = { id: `dream-${state.read}`, question: `${d.picture} What is God showing Pharaoh?`, options: OPTIONS, feedback: state.missed ? { right: false, text: NOT_QUITE } : null, trail, glow: gentle ? d.meaning : undefined }
    }
    views.set(key, view)
  }
  return view
}

export const pharaohsDreams: GameRules<DreamsState> = {
  id: 'pharaohs-dreams',
  start: () => ({ time: 0, read: 0, readAt: -Infinity, missed: null }),
  step(state, inputs) {
    const time = state.time + STEP
    let { read, readAt, missed } = state
    const asking = read < DREAMS.length && time - readAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === DREAMS[read]!.meaning) {
        read++
        readAt = time
        missed = null
        break
      }
      missed = input.option
    }
    return { time, read, readAt, missed }
  },
  view(state, context): GameView {
    // The picture being read, or (while its meaning shows) the one just read.
    const showing = state.read > 0 && state.time - state.readAt < SHOW
    const finished = state.read === DREAMS.length
    const current = DREAMS[Math.min(DREAMS.length - 1, showing || finished ? state.read - 1 : state.read)]!
    const shown = finished && !showing ? {} : SHOWN[current.id]!
    const live: Record<string, number> = {}
    for (const id of PICTURES) live[`actor:${id}.opacity`] = shown[id] ?? 0
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.readAt >= SHOW + 0.6 }
  },
}
