import { lerp } from '../engine/motion'
import type { Timeline } from '../scene/timeline'
import type { Cue } from '../scene/types'
import { STEP, type AnyGameRules, type GameContext, type GameInput, type GameView } from './framework'

/** At most this many steps are run at once, so a long stall can't freeze the game catching up. */
const MAX_STEPS = 30

/**
 * Runs a game's rules on the scene clock. Inputs are queued as they arrive and handed to
 * the next step; each frame, the rules catch up in fixed steps, and the values shown are
 * blended between the last two steps by how far the clock has got between them. The
 * blended values are written to the timeline as live values, so both styles draw them.
 */
export class GameRunner {
  private readonly rules: AnyGameRules
  private readonly context: GameContext
  private readonly timeline: Timeline
  private state: unknown
  private previous: GameView
  private current: GameView
  /** The scene time the rules have reached. */
  private reached: number
  private inputs: GameInput[] = []

  constructor(rules: AnyGameRules, context: GameContext, timeline: Timeline, now: number) {
    this.rules = rules
    this.context = context
    this.timeline = timeline
    this.state = rules.start(context)
    this.current = rules.view(this.state, context)
    this.previous = this.current
    this.reached = now
  }

  get view(): GameView {
    return this.current
  }

  queue(input: GameInput): void {
    this.inputs.push(input)
  }

  /** Brings the rules up to `time`, writes what they show, and returns it. */
  advanceTo(time: number): GameView {
    let steps = 0
    while (this.reached + STEP <= time && steps < MAX_STEPS) {
      const at = this.reached + STEP
      const emitted: Cue[] = []
      this.state = this.rules.step(this.state, this.inputs, this.context, (cue) => emitted.push(cue))
      this.inputs = []
      for (const cue of emitted) this.timeline.apply(cue, at)
      this.previous = this.current
      this.current = this.rules.view(this.state, this.context)
      this.reached = at
      steps++
    }
    // After a long stall, skip ahead rather than racing to catch up.
    if (steps === MAX_STEPS) this.reached = time

    const blend = Math.min(1, Math.max(0, (time - this.reached) / STEP))
    for (const [channel, value] of Object.entries(this.current.live)) {
      const before = this.previous.live[channel]
      this.timeline.live.set(channel, before === undefined ? value : lerp(before, value, blend))
    }
    return this.current
  }
}
