import { ANIMALS_TO_NAME, BEFORE_THE_MAN, type AnimalToName } from '../../content/levels/01-creation-and-fall/episode-2'
import { actor } from '../../scene/build'
import type { Cue } from '../../scene/types'
import { STEP, type Choice, type GameRules } from '../framework'

/**
 * Naming the animals (Level 1 script, scene 2.4). The animals come to the man one at a
 * time, each a pair standing as one. For each, the player picks the words that fit it
 * from three (two in gentle mode); the man names it, and the pair parts and goes to its
 * place. A wrong choice only brings a gentle "Not quite", and the animal waits.
 */

/** How long an animal takes to come before the man, in seconds. */
export const ARRIVE = 2.6
/** How long the name stays before the pair sets off. */
export const NAMED = 1.8
/** How long a pair takes to reach its place. */
export const GO = 3

const QUESTION = 'Which words fit this animal?'
const NOT_QUITE = { right: false, text: 'Not quite. Look again.' }

/**
 * The choices for each animal, made once so the screen sees the same objects while
 * nothing changes. The other descriptions come from animals further along the list,
 * and the right one takes a different place each time.
 */
function choicesFor(gentle: boolean) {
  return ANIMALS_TO_NAME.map((animal, i) => {
    const others = (gentle ? [3] : [3, 5]).map((k) => ANIMALS_TO_NAME[(i + k) % ANIMALS_TO_NAME.length]!)
    const options = others.map((a) => ({ id: a.id, text: a.description }))
    options.splice(i % (options.length + 1), 0, { id: animal.id, text: animal.description })
    const asking: Choice = { id: animal.id, question: QUESTION, options, feedback: null }
    return {
      asking,
      wrong: { ...asking, feedback: NOT_QUITE },
      right: { ...asking, feedback: { right: true, text: `“${animal.name}!”` } },
    }
  })
}

const CHOICES = { normal: choicesFor(false), gentle: choicesFor(true) }

type Phase = 'coming' | 'asking' | 'named' | 'leaving'

interface NamingState {
  /** Which animal is before the man. */
  index: number
  phase: Phase
  /** Seconds since the phase began. */
  clock: number
  /** Whether the last answer was wrong, until the next one. */
  missed: boolean
}

/** The cues that bring an animal before the man. */
function arrive(animal: AnimalToName): Cue[] {
  const spot = animal.flies ? BEFORE_THE_MAN.fly : BEFORE_THE_MAN.walk
  if (animal.flies) return [actor(animal.id, { x: spot.x, y: spot.y }, { seconds: ARRIVE, ease: 'outCubic' })]
  return [
    actor(animal.id, { x: spot.x, pose: 'walk' }, { seconds: ARRIVE, ease: 'outCubic' }),
    actor(animal.id, { pose: 'idle' }, { seconds: 0.5, delay: ARRIVE - 0.4 }),
  ]
}

/** The cues that part the pair and send it to its place: the same places the play's end sets. */
function leave(animal: AnimalToName): Cue[] {
  const { x, y, facing } = animal.place
  const spot = animal.flies ? BEFORE_THE_MAN.fly : BEFORE_THE_MAN.walk
  const heading = x < spot.x ? -1 : 1
  const cues = [
    actor(animal.id, { x, y, spread: 1, facing: heading }, { seconds: GO, ease: 'inOutSine' }),
    actor(animal.id, { facing }, { seconds: 0, delay: GO - 0.2 }),
  ]
  if (!animal.flies) {
    cues.push(actor(animal.id, { pose: 'walk' }, { seconds: 0.4 }))
    cues.push(actor(animal.id, { pose: 'idle' }, { seconds: 0.5, delay: GO - 0.3 }))
  }
  return cues
}

export const naming: GameRules<NamingState> = {
  id: 'naming',
  start: () => ({ index: -1, phase: 'coming', clock: 0, missed: false }),
  step(state, inputs, _context, emit) {
    let { index, phase, clock, missed } = state
    const send = (cues: Cue[]) => cues.forEach((cue) => emit(cue))
    const enter = (next: Phase) => {
      phase = next
      clock = 0
    }
    if (index < 0) {
      index = 0
      send(arrive(ANIMALS_TO_NAME[0]!))
    }
    const animal = ANIMALS_TO_NAME[index]!
    if (phase === 'coming' && clock >= ARRIVE) enter('asking')
    if (phase === 'asking') {
      for (const input of inputs) {
        if (input.kind !== 'choose') continue
        if (input.option === animal.id) {
          missed = false
          enter('named')
          break
        }
        missed = true
      }
    } else if (phase === 'named' && clock >= NAMED) {
      send(leave(animal))
      if (index + 1 < ANIMALS_TO_NAME.length) {
        index += 1
        send(arrive(ANIMALS_TO_NAME[index]!))
        enter('coming')
      } else {
        enter('leaving')
      }
    }
    return { index, phase, clock: clock + STEP, missed }
  },
  view(state, context) {
    const choices = (context.gentle ? CHOICES.gentle : CHOICES.normal)[Math.max(0, state.index)]!
    let choice: Choice | null = null
    if (state.phase === 'asking') choice = state.missed ? choices.wrong : choices.asking
    else if (state.phase === 'named') choice = choices.right
    return { live: {}, hint: null, choice, done: state.phase === 'leaving' && state.clock >= GO + 0.3 }
  },
}
