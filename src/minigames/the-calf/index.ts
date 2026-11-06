import { formatReference } from '../../content/bible/books'
import { ACTIVE_TRANSLATION, verseText } from '../../content/bible/verses'
import type { Compare, GameRules } from '../framework'
import { pressed } from '../let-there-be/shared'
import { CALF_LINES, TWISTS } from './passages'

/**
 * The true words and the twisted (Level 10 script, Episode 4): spot the twist, as in Level
 * 1. On the left, what God said from the mountain (Exodus 20:2–3); on the right, what the
 * people and Aaron said before the golden calf (Exodus 32:4–5). The player taps the words on
 * the right that twist God's word, and one sentence explains each find. Tapping words that
 * aren't a twist only says so. In gentle mode the twists are faintly underlined.
 */

const LINES = CALF_LINES[ACTIVE_TRANSLATION]
const TOTAL = Object.keys(TWISTS).length

const NOT_THAT = { right: false, text: 'Those words don’t twist what God said. Look again.' }

interface CalfState {
  found: string[]
  /** The part tapped last: a twist's id, or 'miss'. */
  last: string | null
  done: boolean
}

/** The passage on each side, made once. */
const LEFT = { title: 'What God said from the mountain', reference: formatReference('EXO 20:2-3'), text: verseText('EXO 20:2-3') }
const RIGHT = {
  title: 'What was said before the calf',
  reference: formatReference('EXO 32:4-5'),
  lines: LINES.map(({ speaker, parts }) => ({ speaker, parts })),
}
const ALL_PARTS = new Map(LINES.flatMap((line) => line.parts.map((part) => [part.id, part] as const)))

/** What the screen shows, kept the same object while nothing changes. */
const views = new Map<string, Compare>()
function compare(state: CalfState, gentle: boolean): Compare {
  const key = `${state.found.join(',')}|${state.last}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const finished = state.found.length === TOTAL
    let note: Compare['note'] = null
    if (state.last === 'miss') note = NOT_THAT
    else if (state.last) note = { right: true, text: TWISTS[state.last]!.explanation }
    view = {
      instruction: finished ? 'You found all three.' : `Tap each phrase on the right that twists what God said. Found ${state.found.length} of ${TOTAL}.`,
      left: LEFT,
      right: RIGHT,
      found: state.found,
      total: TOTAL,
      note,
      showTwists: gentle,
      finished,
    }
    views.set(key, view)
  }
  return view
}

export const theCalf: GameRules<CalfState> = {
  id: 'the-calf',
  start: () => ({ found: [], last: null, done: false }),
  step(state, inputs) {
    let { found, last, done } = state
    for (const input of inputs) {
      if (input.kind !== 'choose') continue
      const part = ALL_PARTS.get(input.option)
      if (!part || part.kind === 'mark') continue
      if (part.kind === 'twist') {
        if (!found.includes(part.id)) found = [...found, part.id]
        last = part.id
      } else {
        last = 'miss'
      }
    }
    // Once all are found, Continue (or Space) moves on, after the last explanation is read.
    if (found.length === TOTAL && pressed(inputs, 'primary')) done = true
    return found === state.found && last === state.last && done === state.done ? state : { found, last, done }
  },
  view(state, context) {
    return { live: {}, hint: null, compare: compare(state, context.gentle), done: state.done }
  },
}
