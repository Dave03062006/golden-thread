import { DANCERS, PHRASES } from '../../content/levels/09-through-the-sea/episode-3'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Miriam's song (Level 9 script, Episode 3): rhythm, as call and response. Miriam beats a
 * short phrase on her timbrel, and the player answers with the same phrase; the women echo
 * it. Each phrase answered brings more women into the dance, and the next words of her song
 * (Exodus 15:21), until the whole shore is singing. A phrase missed doesn't stop the song:
 * Miriam simply plays it again.
 *
 * Tap (or press Space) to answer, after she plays; each beat also shows as a pulse on screen.
 * In gentle mode any answer with the right number of taps counts. After two misses on a
 * phrase, the women sing it with the player, and any answer counts.
 */

export const HINTS: Record<'listen' | 'answer', Hint> = {
  listen: { pointer: 'Listen to Miriam’s timbrel, then answer her.', keys: 'Then press Space for each beat.', gesture: 'tap' },
  answer: { pointer: 'Now answer her: tap the same beats.', keys: 'Or press Space for each beat.', gesture: 'tap' },
}

/** One beat, in seconds; the pause before Miriam plays; how near a tap must be to its beat. */
export const BEAT = 0.42
const LEAD = 0.8
export const TOLERANCE = 0.16
/** How long the player has to begin, and how long after the last beat to finish. */
const WAIT = 5
const AFTER = 0.7
/** How long a pulse lasts; how long each phrase's words show; how long the end shows. */
const PULSE = 0.28
const WORDS = 1.8
const SHOW = 2.6

interface SongState {
  time: number
  phrase: number
  mode: 'listen' | 'answer'
  /** When Miriam began playing the phrase, or when the answer began to be awaited. */
  since: number
  taps: number[]
  /** How many times this phrase has been missed. */
  tries: number
  answeredAt: number
  missedAt: number
  doneAt: number
}

/** After this many misses, the women sing the phrase with the player. */
export const HELPED_AFTER = 2

/** When Miriam plays the beats of a phrase that began at `since`. */
const callBeats = (phrase: number, since: number) => PHRASES[phrase]!.beats.map((b) => since + LEAD + b * BEAT)
const callLength = (phrase: number) => LEAD + PHRASES[phrase]!.beats.at(-1)! * BEAT + AFTER

/** Whether an answer matches the phrase: the same number of beats, each in time with the first. */
export function matches(phrase: number, taps: readonly number[], gentle: boolean): boolean {
  const beats = PHRASES[phrase]!.beats
  if (taps.length !== beats.length) return false
  if (gentle) return true
  return taps.every((t, i) => Math.abs(t - taps[0]! - beats[i]! * BEAT) <= TOLERANCE)
}

const SUNG = PHRASES.map((p, n) => ({ title: `${n + 1} of ${PHRASES.length}`, text: p.words }))
const AGAIN = { title: 'Again', text: 'Miriam plays the phrase again. Listen, then answer.' }
const TOGETHER = { title: 'All together', text: 'Miriam plays it again, and the women sing it with you.' }
const ALL = { title: 'The whole shore is singing', text: '“Sing to the LORD, for he has triumphed gloriously.”' }

export const miriamsSong: GameRules<SongState> = {
  id: 'miriams-song',
  start: () => ({ time: 0, phrase: 0, mode: 'listen', since: 0, taps: [], tries: 0, answeredAt: -Infinity, missedAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { phrase, mode, since, taps, tries, answeredAt, missedAt, doneAt } = state
    const tapped = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    if (mode === 'listen') {
      if (time - since >= callLength(phrase)) {
        mode = 'answer'
        since = time
        taps = []
      }
    } else {
      if (tapped) taps = [...taps, time]
      const beats = PHRASES[phrase]!.beats
      const late = taps.length > 0 ? time - taps[0]! > beats.at(-1)! * BEAT + AFTER : time - since > WAIT
      const helped = tries >= HELPED_AFTER
      if (taps.length === beats.length || late || (helped && taps.length > 0)) {
        if (matches(phrase, taps, context.gentle) || (helped && taps.length > 0)) {
          answeredAt = time
          phrase++
          tries = 0
          if (phrase === PHRASES.length) doneAt = time
        } else {
          missedAt = time
          tries++
        }
        // Miriam plays the next phrase, or the same again, after a moment.
        mode = 'listen'
        since = time + WORDS * 0.5
        taps = []
      }
    }
    return { time, phrase, mode, since, taps, tries, answeredAt, missedAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {}
    DANCERS.forEach((id, i) => (live[`actor:${id}.opacity`] = i < state.phrase ? Math.min(1, (state.time - (i === state.phrase - 1 ? state.answeredAt : -Infinity)) / 0.6) : 0))
    // The pulse of each beat Miriam plays, and of each beat the player answers.
    const sinceBeat = state.mode === 'listen' && !finished ? Math.min(...callBeats(state.phrase, state.since).map((b) => (state.time >= b ? state.time - b : Infinity))) : Infinity
    live['actor:miriam-beat.opacity'] = sinceBeat < PULSE ? 0.9 * (1 - sinceBeat / PULSE) : 0
    const sinceTap = state.taps.length ? state.time - state.taps.at(-1)! : Infinity
    live['actor:answer-beat.opacity'] = sinceTap < PULSE ? 0.9 * (1 - sinceTap / PULSE) : 0
    const message = finished ? (state.time - state.doneAt < WORDS ? SUNG.at(-1)! : ALL) : state.time - state.answeredAt < WORDS ? SUNG[state.phrase - 1]! : state.time - state.missedAt < WORDS ? (state.tries >= HELPED_AFTER ? TOGETHER : AGAIN) : null
    return { live, hint: finished ? null : HINTS[state.mode], message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
