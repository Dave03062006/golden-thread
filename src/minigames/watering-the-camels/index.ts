import { CAMELS, DRINK_AT, JAR_IN_WELL, JAR_ON_SHOULDER, REBEKAH } from '../../content/levels/04-isaac-and-jacob/episode-1'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Watering the camels (Level 4 script, Episode 1): pouring and water. Rebekah draws water
 * from the well and pours it into the stone trough, and the servant's ten thirsty camels
 * come up to it one after another. Each one that has had enough walks back and kneels down
 * contentedly. A full trough waters faster; a camel at an empty trough waits for the next jar.
 *
 * Hold at the well (or hold Space) to let the jar down and draw it up full; Rebekah carries
 * it to the trough by herself. Tap (or press Space) to pour. In gentle mode, one tap at the
 * well does the whole trip: the jar fills and pours by itself.
 */

export const HINT: Hint = {
  pointer: 'Hold to draw water from the well, then tap to pour it into the trough for the camels.',
  keys: 'Or hold Space to draw, and press it again to pour.',
  gesture: 'hold',
}

/** How long a jar takes to fill and to pour, how much it holds, and how much the trough holds. */
const FILL = 1
const POUR = 0.8
const JAR = 0.5
const TROUGH_FULL = 1
/** How much each camel drinks, and how fast, in troughs (a second). */
const THIRST = 0.25
const DRINK = 0.3
/** How fast Rebekah and the camels walk, in frame widths a second. */
const WALK = 0.2
const CAMEL_WALK = 0.24
/** In gentle mode, how long the jar waits at the trough before it pours by itself. */
const GENTLE_WAIT = 0.4
/** How long the last word shows before the story goes on. */
const SHOW = 2.4

type Rebekah = 'well' | 'carry' | 'trough' | 'pour' | 'back'
type Camel = { x: number; y: number; facing: -1 | 1; thirst: number; state: 'waiting' | 'coming' | 'drinking' | 'going' | 'resting' }

interface CamelsState {
  time: number
  rebekah: { x: number; facing: -1 | 1; state: Rebekah; since: number }
  /** How full the jar is, from 0 to 1, and whether it's being held down in the well. */
  jar: number
  holding: boolean
  /** Gentle mode: a tap at the well sets the whole trip going. */
  auto: boolean
  water: number
  camels: Camel[]
  doneAt: number
}

const WATERED = Array.from({ length: CAMELS.length + 1 }, (_, n) => ({ title: 'Camels watered', text: `${n} of ${CAMELS.length}` }))
const FINISHED = { title: 'All ten camels watered', text: '“I will draw for your camels also, until they have done drinking.”' }

const pressed = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
const released = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'up') || (i.kind === 'key' && i.key === 'primary' && !i.down))

/** Moves toward a point at a speed; whether it got there. */
function toward(c: { x: number; y: number }, to: { x: number; y: number }, speed: number): boolean {
  const dx = to.x - c.x
  const dy = to.y - c.y
  const d = Math.hypot(dx, dy)
  if (d <= speed * STEP) {
    c.x = to.x
    c.y = to.y
    return true
  }
  c.x += (dx / d) * speed * STEP
  c.y += (dy / d) * speed * STEP
  return false
}

export const wateringTheCamels: GameRules<CamelsState> = {
  id: 'watering-the-camels',
  start: () => ({
    time: 0,
    rebekah: { x: REBEKAH.atWell, facing: 1, state: 'well', since: 0 },
    jar: 0,
    holding: false,
    auto: false,
    water: 0,
    camels: CAMELS.map((c) => ({ ...c.home, facing: -1, thirst: THIRST, state: 'waiting' })),
    doneAt: -1,
  }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const rebekah = { ...state.rebekah }
    const camels = state.camels.map((c) => ({ ...c }))
    let { jar, holding, auto, water, doneAt } = state
    if (pressed(inputs)) holding = true
    if (released(inputs)) holding = false
    const press = pressed(inputs)
    const go = (to: Rebekah, pose: string, facing: -1 | 1 = rebekah.facing) => {
      rebekah.state = to
      rebekah.since = time
      rebekah.facing = facing
      emit(actor('rebekah', { pose, facing }, { seconds: 0.3 }))
    }

    switch (rebekah.state) {
      case 'well':
        if (context.gentle && press) auto = true
        if (holding || auto) jar = Math.min(1, jar + STEP / FILL)
        if (jar >= 1) {
          auto = context.gentle && auto
          go('carry', 'walk', 1)
        }
        break
      case 'carry':
        rebekah.x = Math.min(REBEKAH.atTrough, rebekah.x + WALK * STEP)
        if (rebekah.x >= REBEKAH.atTrough) go('trough', 'idle')
        break
      case 'trough':
        if (press || (auto && time - rebekah.since >= GENTLE_WAIT)) go('pour', 'carry')
        break
      case 'pour': {
        const poured = Math.min(jar, STEP / POUR)
        jar -= poured
        water = Math.min(TROUGH_FULL, water + poured * JAR)
        if (jar <= 1e-9) {
          jar = 0
          auto = false
          go('back', 'walk', -1)
        }
        break
      }
      case 'back':
        rebekah.x = Math.max(REBEKAH.atWell, rebekah.x - WALK * STEP)
        // Back at the well: if the player is still holding, the next jar starts filling at once.
        if (rebekah.x <= REBEKAH.atWell) go('well', 'idle')
        break
    }

    // The camels come up one at a time: the next sets off when the one before has drunk its fill.
    const busy = camels.some((c) => c.state === 'coming' || c.state === 'drinking')
    const next = camels.findIndex((c) => c.state === 'waiting')
    if (!busy && next >= 0) {
      camels[next]!.state = 'coming'
      camels[next]!.facing = -1
      emit(actor(CAMELS[next]!.id, { pose: 'walk', facing: -1 }, { seconds: 0.3 }))
    }
    camels.forEach((c, i) => {
      const id = CAMELS[i]!.id
      if (c.state === 'coming' && toward(c, DRINK_AT, CAMEL_WALK)) {
        c.state = 'drinking'
        emit(actor(id, { pose: 'drink' }, { seconds: 0.4 }))
      } else if (c.state === 'drinking' && water > 0) {
        const drunk = Math.min(water, c.thirst, DRINK * STEP)
        water -= drunk
        c.thirst -= drunk
        if (c.thirst <= 1e-9) {
          c.state = 'going'
          c.facing = 1
          emit(actor(id, { pose: 'walk', facing: 1 }, { seconds: 0.3 }))
        }
      } else if (c.state === 'going' && toward(c, CAMELS[i]!.home, CAMEL_WALK)) {
        c.state = 'resting'
        c.facing = -1
        emit(actor(id, { pose: 'kneel', facing: -1 }, { seconds: 0.5 }))
      }
    })

    if (camels.every((c) => c.state === 'resting')) doneAt = time
    return { time, rebekah, jar, holding, auto, water, camels, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    const { rebekah } = state
    live['actor:rebekah.x'] = rebekah.x
    live['actor:rebekah.facing'] = rebekah.facing
    // The jar rides on her shoulder; at the well it goes down into the water while she holds.
    const inWell = rebekah.state === 'well' && state.jar > 0 && state.jar < 1
    const jar = inWell ? JAR_IN_WELL : { x: rebekah.x + JAR_ON_SHOULDER.dx * rebekah.facing, y: REBEKAH.y + JAR_ON_SHOULDER.dy + (rebekah.state === 'pour' ? 0.07 : 0) }
    live['actor:jar.x'] = jar.x
    live['actor:jar.y'] = jar.y
    live['actor:trough-water.opacity'] = state.water > 0 ? 0.35 + 0.65 * (state.water / TROUGH_FULL) : 0
    live['actor:stream.opacity'] = rebekah.state === 'pour' ? 0.9 : 0
    state.camels.forEach((c, i) => {
      const id = CAMELS[i]!.id
      live[`actor:${id}.x`] = c.x
      live[`actor:${id}.y`] = c.y
      live[`actor:${id}.facing`] = c.facing
    })
    const finished = state.doneAt >= 0
    const watered = state.camels.filter((c) => c.state === 'resting').length
    return { live, hint: finished ? null : HINT, message: finished ? FINISHED : watered > 0 ? WATERED[watered]! : null, done: finished && state.time - state.doneAt >= SHOW }
  },
}
