import { LIGHT, NEED_ABOVE, PRISONERS, SITTING_Y } from '../../content/levels/05-joseph-and-his-brothers/episode-2'
import { actor } from '../../scene/build'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Caring for the prisoners (Level 5 script, Episode 2): serving and distributing. The dim
 * prison, with prisoners along the walls. A little picture above each shows what he needs:
 * bread, water, a blanket, a lamp. Joseph comes to each in turn, and the player chooses from
 * the tray what to give him. Each one cared for gets up, and a little more light comes into
 * the room. The last two are Pharaoh's butler and baker, who need someone to ask what
 * troubles them. In gentle mode the right thing glows on the tray.
 */

/** How long the word after each gift shows before Joseph goes on to the next. */
const SHOW = 1.8

const TRAY = [
  { id: 'bread', text: 'Bread', given: 'Bread for a hungry man.' },
  { id: 'water', text: 'Water', given: 'Water for a thirsty man.' },
  { id: 'blanket', text: 'A blanket', given: 'A blanket against the cold of the night.' },
  { id: 'lamp', text: 'A lamp', given: 'A lamp in the dark.' },
  { id: 'listen', text: 'Ask what is wrong', given: 'Joseph saw that they were troubled, and asked why.' },
]
const OPTIONS = TRAY.map((t) => ({ id: t.id, text: t.text }))

interface CareState {
  time: number
  cared: number
  caredAt: number
  missed: string | null
}

const views = new Map<string, Choice>()
function choiceFor(state: CareState, gentle: boolean): Choice {
  const showing = state.cared > 0 && (state.time - state.caredAt < SHOW || state.cared === PRISONERS.length)
  const key = `${state.cared}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    if (showing) {
      const need = PRISONERS[state.cared - 1]!.need
      view = { id: `cared-${state.cared}`, question: 'Joseph cares for the prisoners.', options: [], feedback: { right: true, text: TRAY.find((t) => t.id === need)!.given } }
    } else {
      const p = PRISONERS[state.cared]!
      const who = p.id === 'butler' ? 'Pharaoh’s butler' : p.id === 'baker' ? 'Pharaoh’s baker' : 'This prisoner'
      view = {
        id: `prisoner-${state.cared}`,
        question: `${who} ${p.need === 'listen' ? 'sits with his head in his hands.' : 'is in need.'} What will Joseph give him?`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: 'Not that. Look at the picture above him.' } : null,
        glow: gentle ? p.need : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const caringForPrisoners: GameRules<CareState> = {
  id: 'caring-for-prisoners',
  start: () => ({ time: 0, cared: 0, caredAt: -Infinity, missed: null }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { cared, caredAt, missed } = state
    const asking = cared < PRISONERS.length && time - caredAt >= SHOW
    // As each turn begins, the picture shows what this prisoner needs.
    if (asking && state.time - caredAt < SHOW) emit(actor('need', { pose: PRISONERS[cared]!.need }, { seconds: 0.2 }))
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      const p = PRISONERS[cared]!
      if (input.option === p.need) {
        if (p.need !== 'listen') emit(actor(p.id, { pose: 'idle' }, { seconds: 0.8 }))
        cared++
        caredAt = time
        missed = null
        break
      }
      missed = input.option
    }
    return { time, cared, caredAt, missed }
  },
  view(state, context): GameView {
    const turn = PRISONERS[Math.min(state.cared, PRISONERS.length - 1)]!
    const showing = state.time - state.caredAt < SHOW
    const finished = state.cared === PRISONERS.length
    const live: Record<string, number> = {
      'actor:need.x': turn.x,
      'actor:need.y': SITTING_Y - NEED_ABOVE,
      'actor:need.opacity': finished || showing ? 0 : 0.95,
      'actor:window-light.opacity': LIGHT.from + LIGHT.each * state.cared,
    }
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.caredAt >= SHOW + 0.4 }
  },
}
