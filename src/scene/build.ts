import { timing, type EaseName } from '../engine/motion'
import type { Beat, Cue, CueValues } from './types'

/**
 * Small helpers for writing stories, so a scene reads almost like its script:
 *
 *   say('Then God spoke.'),
 *   verse('GEN 1:3', layer('daylight', { opacity: 1 }, { seconds: 3 })),
 *
 * Unless told otherwise, changes take the story timing (spec §10, rule 3).
 */

export interface CueTiming {
  seconds?: number
  ease?: EaseName
  delay?: number
}

function cue(target: string, to: CueValues, { seconds = timing.story.seconds, ease = timing.story.ease, delay = 0 }: CueTiming = {}): Cue {
  return { target, to, seconds, ease, delay }
}

/** Moves the camera: pan (x, y) and zoom. */
export const camera = (to: Pick<CueValues, 'x' | 'y' | 'zoom'>, when?: CueTiming) => cue('camera', to, when)

/** Changes a layer: fades it (opacity) or raises and lowers it (offsetY). */
export const layer = (id: string, to: Pick<CueValues, 'opacity' | 'offsetY'>, when?: CueTiming) => cue(`layer:${id}`, to, when)

/** Changes an actor: moves, fades, grows, turns or takes a pose. */
export const actor = (id: string, to: Omit<CueValues, 'zoom' | 'offsetY'>, when?: CueTiming) => cue(`actor:${id}`, to, when)

/** A line of narration in our own words. */
export function say(text: string, ...cues: Cue[]): Beat {
  return { kind: 'say', text, cues }
}

/** An exact quotation from the Bible (spec §12.1). */
export function verse(ref: string, ...cues: Cue[]): Beat {
  return { kind: 'verse', ref, cues }
}

/** An interactive moment; `done` leaves things where the interaction leaves them. */
export function play(game: string, { cues = [], done = [] }: { cues?: Cue[]; done?: Cue[] } = {}): Beat {
  return { kind: 'play', game, cues, done }
}

/** Fires named events with a beat, like a music cue (milestone 3 plays them). */
export function withEvents(beat: Beat, ...events: string[]): Beat {
  return { ...beat, events }
}
