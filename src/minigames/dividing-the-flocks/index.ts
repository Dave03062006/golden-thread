import { FLOCKS, SIDES } from '../../content/levels/03-abraham-father-of-faith/episode-2'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Dividing the flocks (Level 3 script, Episode 2): the herding kind of play. Abram's sheep
 * and Lot's goats have mixed together at the crowded well. The player sends each animal
 * to its own flock: Abram's toward the hills on the left, Lot's toward the valley path on
 * the right. An animal brought to the wrong side trots back to the well, and a gentle
 * word says whose it is. When every animal is home, there is peace between the camps.
 *
 * Drag an animal to a side; or, with the keys, the left and right arrows send the next
 * one; Space sends the next one to its own flock: the one-button way. In gentle mode the
 * animals drift toward their own side by themselves, and the player only nudges.
 */

export const HINT: Hint = {
  pointer: 'Drag each animal to its own flock: Abram’s sheep to the hills on the left, Lot’s goats to the right.',
  keys: 'Or send the next one with the left and right arrows, or press Space to send it home.',
  gesture: 'drag',
}

/** How fast an animal walks home, and how far it drifts in gentle mode, in frame widths a second. */
const WALK = 0.18
const DRIFT = 0.03
/** How close to the pointer an animal must be to be picked up. */
const PICK = 0.07
/** How long a word shows, and how long the peaceful camps show at the end. */
const WORDS = 2.2
const PEACE = 2

type Owner = 'abram' | 'lot'

interface Animal {
  x: number
  y: number
  /** At the well, being dragged, walking somewhere, or home in its flock. */
  state: 'mixed' | 'held' | 'going' | 'home'
  /** Where it's walking to. */
  to: { x: number; y: number } | null
  facing: -1 | 1
}

interface FlockState {
  time: number
  animals: Animal[]
  /** The one being dragged, and how far the pointer is from its middle. */
  holding: { index: number; dx: number; dy: number } | null
  /** The last word said: whose an animal is, after it went the wrong way. */
  wrongOwner: Owner | null
  saidAt: number
  doneAt: number
}

const WRONG: Record<Owner, { title: string; text: string }> = {
  abram: { title: 'One of Abram’s sheep', text: 'Abram’s flock is going up into the hills, on the left.' },
  lot: { title: 'One of Lot’s goats', text: 'Lot’s flock is going down toward the valley, on the right.' },
}
const PEACEFUL = { title: 'Peace between the camps', text: '“Let there be no strife between you and me.”' }

const sideOf = (x: number): Owner | null => (x < SIDES.abram.edge ? 'abram' : x > SIDES.lot.edge ? 'lot' : null)

export const dividingTheFlocks: GameRules<FlockState> = {
  id: 'dividing-the-flocks',
  start: () => ({
    time: 0,
    animals: FLOCKS.map((a) => ({ ...a.at, state: 'mixed', to: null, facing: a.owner === 'abram' ? -1 : 1 })),
    holding: null,
    wrongOwner: null,
    saidAt: -Infinity,
    doneAt: -1,
  }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const animals = state.animals.map((a) => ({ ...a }))
    let { holding, wrongOwner, saidAt, doneAt } = state

    /** Sends an animal toward a side: home if it's its own, or back to the well with a word. */
    const send = (i: number, side: Owner) => {
      const a = animals[i]!
      const flock = FLOCKS[i]!
      if (side === flock.owner) {
        a.state = 'going'
        a.to = flock.home
      } else {
        a.state = 'going'
        a.to = flock.at
        wrongOwner = flock.owner
        saidAt = time
      }
      emit(actor(flock.id, { pose: 'walk' }, { seconds: 0.2 }))
    }
    const next = () => animals.findIndex((a) => a.state === 'mixed')

    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down') {
          // Pick up the nearest animal still at the well.
          let best = -1
          let bestD = PICK
          animals.forEach((a, i) => {
            const d = Math.hypot(a.x - input.x, a.y - input.y)
            if (a.state === 'mixed' && d < bestD) {
              best = i
              bestD = d
            }
          })
          if (best >= 0) {
            holding = { index: best, dx: animals[best]!.x - input.x, dy: animals[best]!.y - input.y }
            animals[best]!.state = 'held'
          }
        } else if (input.phase === 'move' && holding) {
          const a = animals[holding.index]!
          a.x = input.x + holding.dx
          a.y = Math.min(0.8, Math.max(0.66, input.y + holding.dy))
        } else if (input.phase === 'up' && holding) {
          const i = holding.index
          const side = sideOf(animals[i]!.x)
          holding = null
          if (side) send(i, side)
          else animals[i]!.state = 'mixed'
        }
      } else if (input.kind === 'key' && input.down) {
        const i = next()
        if (i < 0) continue
        if (input.key === 'primary') send(i, FLOCKS[i]!.owner)
        else if (input.key === 'left') send(i, 'abram')
        else if (input.key === 'right') send(i, 'lot')
      }
    }

    animals.forEach((a, i) => {
      const flock = FLOCKS[i]!
      if (a.state === 'going' && a.to) {
        const dx = a.to.x - a.x
        const dy = a.to.y - a.y
        const d = Math.hypot(dx, dy)
        if (Math.abs(dx) > 0.002) a.facing = dx > 0 ? 1 : -1
        if (d <= WALK * STEP) {
          a.x = a.to.x
          a.y = a.to.y
          // Arrived: home in its flock, or back at the well to be sent again.
          a.state = a.to === flock.home ? 'home' : 'mixed'
          a.to = null
          emit(actor(flock.id, { pose: 'idle' }, { seconds: 0.2 }))
        } else {
          a.x += (dx / d) * WALK * STEP
          a.y += (dy / d) * WALK * STEP
        }
      } else if (a.state === 'mixed' && context.gentle) {
        // Gentle mode: it wanders toward its own side, and goes home once it gets there.
        a.x += (flock.owner === 'abram' ? -1 : 1) * DRIFT * STEP
        const side = sideOf(a.x)
        if (side === flock.owner) send(i, side)
      }
    })

    if (doneAt < 0 && animals.every((a) => a.state === 'home')) doneAt = time
    return { time, animals, holding, wrongOwner, saidAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    state.animals.forEach((a, i) => {
      const id = FLOCKS[i]!.id
      live[`actor:${id}.x`] = a.x
      live[`actor:${id}.y`] = a.y
      live[`actor:${id}.facing`] = a.facing
    })
    const finished = state.doneAt >= 0
    const saying = state.wrongOwner && state.time - state.saidAt < WORDS ? WRONG[state.wrongOwner] : null
    return {
      live,
      hint: finished ? null : HINT,
      message: finished ? PEACEFUL : saying,
      done: finished && state.time - state.doneAt >= PEACE,
    }
  },
}
