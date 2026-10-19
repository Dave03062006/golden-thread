import { CLOUD_RISE, FAMILIES, MAP, SCRIPT_ABOVE, TOWER, tierHalf, towerTop } from '../../content/levels/02-noah-and-the-nations/episode-6'
import { actor } from '../../scene/build'
import { STEP, type GameKey, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The tower (Level 2 script, Episode 6), in two parts.
 *
 * First, stacking (the building kind of play): its first terrace already up, a load of
 * baked bricks swings over the top of the tower, and the player drops it when it's over the tower; two loads make a
 * terrace. The builders cheer, "Let us make a name for ourselves!", but however high the
 * tower climbs, the clouds rise too and stay out of reach. A load dropped beside the
 * tower only falls away, and the swing slows a little to help; after three misses the
 * load waits over the tower until it's dropped. Space drops the bricks:
 * the one-button way. In gentle mode the load swings slowly and any drop over the tower
 * holds.
 *
 * Then, scattered (the courier kind of play): on the map, each family, speaking its own
 * language now, is guided from Babel to its own land, as Genesis 10 tells it: Japheth's
 * to the coastlands, Ham's to Egypt and Canaan, Shem's to the east. A family brought to
 * the wrong land turns back, and a hint names where it belongs. Space leads each family
 * home by itself; the arrow keys move it. In gentle mode, each family's land glows.
 */

// ---------------------------------------------------------------------------------
// First part: stacking the tower.

export const STACK_HINT: Hint = {
  pointer: 'Tap to drop the bricks when they swing over the top of the tower.',
  keys: 'Or press Space to drop them.',
  gesture: 'tap',
}

/** Loads of bricks to a terrace; how wide the load swings, and how fast (radians a second). */
export const PER_TIER = 2
const SWING = 0.22
const SPEED = { normal: 1.7, gentle: 0.9 }
/** How much of a terrace's width counts as over it, and how much each miss slows the swing (at most three times). */
const OVER = { normal: 0.75, gentle: 1 }
const EASE_PER_MISS = 0.8
/** After this many misses on one terrace, the load stops swinging and waits over the tower. */
const STEADY = 3
/** How long a load takes to fall, how far above the top it hangs, and how long words show. */
const FALL = 0.35
const HANG = 0.12
const WORDS = 2.2
/** How long the finished tower stands before the story goes on. */
const STAND = 3

interface StackState {
  time: number
  tiers: number
  loads: number
  misses: number
  /** Where the swing is, as an angle. */
  phase: number
  /** A load falling: where it was let go, when, and whether it lands on the tower. */
  falling: { x: number; at: number; lands: boolean } | null
  /** The last thing that happened, for its words. */
  said: 'cheer' | 'miss' | null
  saidAt: number
  /** How far the clouds have risen so far, easing toward where they're going. */
  clouds: number
  finishedAt: number
}

const CHEER = { title: 'The builders', text: 'Let us make a name for ourselves!' }
const MISS = { title: 'Beside the tower', text: 'Let the bricks drop when they swing over the top.' }
const OUT_OF_REACH = { title: 'Higher and higher', text: 'But however high the tower climbs, the clouds stay out of reach.' }

const swingX = (phase: number) => TOWER.x + SWING * Math.sin(phase)

export const theTower: GameRules<StackState> = {
  id: 'the-tower',
  start: () => ({ time: 0, tiers: TOWER.begun, loads: 0, misses: 0, phase: 0, falling: null, said: null, saidAt: -Infinity, clouds: TOWER.begun, finishedAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    let { tiers, loads, misses, phase, falling, said, saidAt, finishedAt } = state
    const speed = (context.gentle ? SPEED.gentle : SPEED.normal) * EASE_PER_MISS ** Math.min(misses, 3)
    // After a few misses on a terrace, the builders steady the load: it waits over the middle.
    if (tiers < TOWER.tiers && misses < STEADY) phase += speed * STEP

    const drop = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down'))
    if (drop && !falling && tiers < TOWER.tiers) {
      const x = swingX(phase)
      falling = { x, at: time, lands: Math.abs(x - TOWER.x) < tierHalf(tiers) * (context.gentle ? OVER.gentle : OVER.normal) }
    }
    if (falling && time - falling.at >= FALL) {
      if (falling.lands) {
        loads++
        if (loads >= PER_TIER) {
          loads = 0
          misses = 0
          tiers++
          emit(actor('tower', { pose: `t${tiers}` }, { seconds: 0.4 }))
          said = 'cheer'
          saidAt = time
          if (tiers >= TOWER.tiers) finishedAt = time
        }
      } else {
        misses++
        said = 'miss'
        saidAt = time
      }
      falling = null
      // The next load comes up from the side, where the swing starts.
      phase = 0
    }
    const clouds = state.clouds + (tiers - state.clouds) * Math.min(1, STEP * 2)
    return { time, tiers, loads, misses, phase, falling, said, saidAt, clouds, finishedAt }
  },
  view(state): GameView {
    const top = towerTop(state.tiers)
    const live: Record<string, number> = {}
    if (state.falling) {
      const t = Math.min(1, (state.time - state.falling.at) / FALL)
      live['actor:brick-load.x'] = state.falling.x
      live['actor:brick-load.y'] = top - HANG + (state.falling.lands ? HANG : HANG + 0.2) * t * t
      live['actor:brick-load.opacity'] = state.falling.lands ? 1 : 1 - t
    } else {
      live['actor:brick-load.x'] = swingX(state.phase)
      live['actor:brick-load.y'] = top - HANG
      live['actor:brick-load.opacity'] = state.tiers >= TOWER.tiers ? 0 : 1
    }
    live['layer:high-clouds.offsetY'] = -CLOUD_RISE * (state.clouds - TOWER.begun)
    const finished = state.finishedAt >= 0
    const recent = state.time - state.saidAt < WORDS
    return {
      live,
      hint: finished ? null : STACK_HINT,
      message: finished ? OUT_OF_REACH : recent ? (state.said === 'cheer' ? CHEER : state.said === 'miss' ? MISS : null) : null,
      done: finished && state.time - state.finishedAt >= STAND,
    }
  },
}

// ---------------------------------------------------------------------------------
// Second part: scattered.

/** The hint for each family in turn, naming the land it goes to. */
export const SCATTER_HINTS: Hint[] = FAMILIES.map((f) => ({
  pointer: `Drag the families of ${f.name} to their land: ${f.to}.`,
  keys: 'Or press Space to lead them there, or move them with the arrow keys.',
  gesture: 'drag',
}))

/** How close to a land counts as there; how fast the keys move a family, and Space leads it. */
const NEAR = { normal: 0.08, gentle: 0.16 }
const MOVE = 0.4
const LEAD = 0.5
/** How long the words show when a family reaches its land, and how long the finished map stays. */
const SETTLED_FOR = 2.4
const REST = 2

type Arrow = Extract<GameKey, 'left' | 'right' | 'up' | 'down'>

interface ScatterState {
  time: number
  /** The family on its way now (those before it are home). */
  index: number
  at: { x: number; y: number }
  drag: { px: number; py: number; x: number; y: number } | null
  held: Arrow[]
  leading: boolean
  /** The family last brought to the wrong land, for its hint. */
  wrong: number
  /** When the last family reached its land. */
  settledAt: number
  finishedAt: number
}

const SETTLED = FAMILIES.map((f) => ({ title: 'A land of their own', text: f.where }))
const NOT_THERE = FAMILIES.map((f) => ({ title: 'Not that land', text: f.where }))

export const scatter: GameRules<ScatterState> = {
  id: 'scatter',
  start: () => ({ time: 0, index: 0, at: { ...MAP.babel }, drag: null, held: [], leading: false, wrong: -1, settledAt: -Infinity, finishedAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.index >= FAMILIES.length) return { ...state, time }
    const near = context.gentle ? NEAR.gentle : NEAR.normal
    let { index, drag, held, leading, wrong, settledAt, finishedAt } = state
    const at = { ...state.at }
    const family = FAMILIES[index]!

    const settle = () => {
      index++
      Object.assign(at, MAP.babel)
      drag = null
      leading = false
      wrong = -1
      settledAt = time
      if (index >= FAMILIES.length) finishedAt = time
    }
    /** Where the family has been brought: its own land, another family's, or nowhere yet. */
    const arrived = () => {
      const land = FAMILIES.findIndex((f) => Math.hypot(f.land.x - at.x, f.land.y - at.y) < near)
      if (land === index) settle()
      else if (land >= 0) {
        // The wrong land: the family turns back, and the hint names where it belongs.
        wrong = index
        Object.assign(at, MAP.babel)
        drag = null
      }
      return land
    }

    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down') drag = { px: input.x, py: input.y, x: at.x, y: at.y }
        else if (input.phase === 'move' && drag) {
          at.x = drag.x + (input.x - drag.px)
          at.y = drag.y + (input.y - drag.py)
        } else if (input.phase === 'up' && drag) {
          drag = null
          // Let go away from any land, it waits where it is.
          arrived()
        }
      } else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) leading = true
        } else if (input.down) held = held.includes(input.key) ? held : [...held, input.key]
        else held = held.filter((k) => k !== input.key)
      }
    }

    if (index < FAMILIES.length && FAMILIES[index] === family) {
      if (leading) {
        // Space leads the family straight to its land.
        const d = Math.hypot(family.land.x - at.x, family.land.y - at.y)
        const step = LEAD * STEP
        if (d <= step) settle()
        else {
          at.x += ((family.land.x - at.x) / d) * step
          at.y += ((family.land.y - at.y) / d) * step
        }
      } else if (!drag && held.length) {
        at.x += ((held.includes('right') ? 1 : 0) - (held.includes('left') ? 1 : 0)) * MOVE * STEP
        at.y += ((held.includes('down') ? 1 : 0) - (held.includes('up') ? 1 : 0)) * MOVE * STEP
        at.x = Math.min(0.97, Math.max(0.03, at.x))
        at.y = Math.min(0.95, Math.max(0.05, at.y))
        // Steered with the keys, it stops at a land once it's well inside it.
        if (FAMILIES.some((f) => Math.hypot(f.land.x - at.x, f.land.y - at.y) < near * 0.5)) arrived()
      }
    }
    return { time, index, at, drag, held, leading, wrong, settledAt, finishedAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    FAMILIES.forEach((f, i) => {
      const where = i < state.index ? f.land : i === state.index ? state.at : MAP.babel
      live[`actor:family-${f.id}.x`] = where.x
      live[`actor:family-${f.id}.y`] = where.y
      live[`actor:family-${f.id}.opacity`] = i <= state.index ? 1 : 0
      live[`actor:words-${f.id}.x`] = where.x
      live[`actor:words-${f.id}.y`] = where.y - SCRIPT_ABOVE
      live[`actor:words-${f.id}.opacity`] = i <= state.index ? 1 : 0
      // Each land shows faintly; in gentle mode, the land of the family on its way glows.
      const glowing = context.gentle && i === state.index
      live[`actor:land-${f.id}.opacity`] = glowing ? 0.8 + 0.2 * Math.sin(state.time * Math.PI * 2 * 0.8) : i < state.index ? 0.5 : 0.3
    })
    const finished = state.finishedAt >= 0
    const justSettled = state.index > 0 && state.time - state.settledAt < SETTLED_FOR
    return {
      live,
      hint: finished ? null : SCATTER_HINTS[state.index]!,
      message: justSettled ? SETTLED[state.index - 1]! : state.wrong >= 0 ? NOT_THERE[state.wrong]! : null,
      done: finished && state.time - state.finishedAt >= Math.max(REST, SETTLED_FOR),
    }
  },
}
