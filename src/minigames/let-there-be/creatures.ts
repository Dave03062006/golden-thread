import { DAY_SIX_PLACES } from '../../content/levels/01-creation-and-fall/episode-1'
import { actor } from '../../scene/build'
import { projectPoint } from '../../scene/evaluate'
import { STEP, type GameRules } from '../framework'
import { HINTS, outCubic, pressed, smooth } from './shared'

/**
 * Day five: swipe down into the sea and shoals of fish burst out; swipe up into the sky
 * and flocks of birds fly out. Down and Up do the same, and Space does one, then the other.
 */

/** How long the creatures take to fill the sea or the sky, in seconds. */
const FILLING = 1.8

interface CreaturesState {
  /** Seconds since the fish (or birds) were released, or -1. */
  fish: number
  birds: number
  swipeFrom: { x: number; y: number } | null
}

export const creatures: GameRules<CreaturesState> = {
  id: 'creatures',
  start: () => ({ fish: -1, birds: -1, swipeFrom: null }),
  step(state, inputs, context) {
    let { fish, birds, swipeFrom } = state
    const swipe = context.gentle ? 0.05 : 0.08
    for (const input of inputs) {
      if (input.kind !== 'pointer') continue
      if (input.phase === 'down') swipeFrom = { x: input.x, y: input.y }
      else if (swipeFrom) {
        const dy = input.y - swipeFrom.y
        if (dy > swipe && fish < 0) {
          fish = 0
          swipeFrom = null
        } else if (dy < -swipe && birds < 0) {
          birds = 0
          swipeFrom = null
        }
        if (input.phase === 'up') swipeFrom = null
      }
    }
    if (pressed(inputs, 'down') && fish < 0) fish = 0
    if (pressed(inputs, 'up') && birds < 0) birds = 0
    if (pressed(inputs, 'primary')) {
      if (fish < 0) fish = 0
      else if (birds < 0) birds = 0
    }
    return { fish: fish >= 0 ? fish + STEP : fish, birds: birds >= 0 ? birds + STEP : birds, swipeFrom }
  },
  view(state) {
    const f = state.fish < 0 ? 0 : outCubic(state.fish / FILLING)
    const b = state.birds < 0 ? 0 : outCubic(state.birds / FILLING)
    return {
      live: {
        'actor:fish-a.opacity': f,
        'actor:fish-a.spread': f,
        'actor:fish-b.opacity': f,
        'actor:fish-b.spread': f,
        'actor:whale.opacity': state.fish < 0 ? 0 : smooth(state.fish / (FILLING * 1.4)),
        'actor:birds-a.opacity': b,
        'actor:birds-a.spread': b,
        'actor:birds-b.opacity': b,
        'actor:birds-b.spread': b,
      },
      hint: state.fish < 0 ? HINTS.fish : state.birds < 0 ? HINTS.birds : null,
      done: state.fish >= FILLING * 1.4 && state.birds >= FILLING * 1.4,
    }
  },
}

/**
 * Day six: the animals wait at the edges of the land. Tap each to welcome it, and it
 * walks to its place. Space welcomes them one by one.
 */

/** How long an animal takes to walk to its place, in seconds. */
const WALK = 2.6
const ORDER = Object.keys(DAY_SIX_PLACES) as (keyof typeof DAY_SIX_PLACES)[]

interface AnimalsState {
  /** Seconds since each animal was welcomed, or -1. */
  welcomed: Record<string, number>
}

export const animals: GameRules<AnimalsState> = {
  id: 'animals',
  start: () => ({ welcomed: Object.fromEntries(ORDER.map((id) => [id, -1])) }),
  step(state, inputs, context, emit) {
    const welcomed = { ...state.welcomed }
    const welcome = (id: keyof typeof DAY_SIX_PLACES) => {
      const place = DAY_SIX_PLACES[id]
      welcomed[id] = 0
      emit(actor(id, { x: place.x, facing: place.facing, pose: 'walk' }, { seconds: WALK, ease: 'inOutSine' }))
      emit(actor(id, { pose: 'idle' }, { seconds: 0.5, delay: WALK - 0.2 }))
    }
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase === 'down') {
        const frame = context.frame()
        const reach = context.gentle ? 1.4 : 1
        const hit = ORDER.filter((id) => welcomed[id]! < 0).find((id) => {
          const a = frame.actors.find((actor) => actor.id === id)
          if (!a) return false
          const p = projectPoint(a.x, a.y, a.depth, frame.camera)
          // Animals stand on their base: the tap area runs up from their feet.
          const halfWidth = (a.size * 0.6 + 0.025) * reach
          return Math.abs(input.x - p.x) < halfWidth && input.y < p.y + 0.03 && input.y > p.y - a.size * 1.8 * reach
        })
        if (hit) welcome(hit)
      } else if (input.kind === 'key' && input.down) {
        const next = ORDER.find((id) => welcomed[id]! < 0)
        if (next) welcome(next)
      }
    }
    for (const id of ORDER) if (welcomed[id]! >= 0) welcomed[id] = welcomed[id]! + STEP
    return { welcomed }
  },
  view(state) {
    const all = ORDER.every((id) => state.welcomed[id]! >= WALK + 0.3)
    return { live: {}, hint: ORDER.some((id) => state.welcomed[id]! < 0) ? HINTS.animals : null, done: all }
  },
}
