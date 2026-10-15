import { evaluateScene, type SceneFrame } from './evaluate'
import { Timeline } from './timeline'
import type { Beat, SceneDescription, StoryScene } from './types'

/**
 * The director plays a story: a set (the world) and its scenes, beat by beat
 * (spec §13.6). Each beat starts its cues (the camera glides, light grows, a creature
 * appears) and then the director waits for the player. It reports a checkpoint at every
 * scene boundary, and it knows nothing about art styles: both styles simply ask it for
 * the frame at the current moment.
 *
 * Starting at a later scene (from a checkpoint) replays every earlier cue as already
 * finished, so the world is exactly as the player left it.
 */

export interface Story {
  set: SceneDescription
  scenes: StoryScene[]
}

export interface StoryPosition {
  scene: number
  beat: number
}

export type DirectorEvent =
  /** A scene has begun: write a checkpoint. */
  | { type: 'checkpoint'; scene: StoryScene; index: number }
  /** A new beat: show its line, or start its interaction. */
  | { type: 'beat'; beat: Beat; position: StoryPosition }
  /** A named event that came with a beat, like a music cue. */
  | { type: 'event'; name: string }
  /** The last beat of the last scene is done. */
  | { type: 'end' }

/** Earlier scenes are replayed this long ago, so every transition in them has finished. */
const LONG_AGO = -1e6

export class Director {
  readonly story: Story
  readonly timeline: Timeline
  private position: StoryPosition
  private finished = false
  private playDone = false
  private listeners = new Set<(event: DirectorEvent) => void>()

  constructor(story: Story, startScene = 0) {
    if (startScene < 0 || startScene >= story.scenes.length) throw new RangeError(`No scene ${startScene} in this story`)
    this.story = story
    this.timeline = new Timeline(story.set)
    this.position = { scene: startScene, beat: -1 }
    for (const scene of story.scenes.slice(0, startScene)) {
      for (const beat of scene.beats) {
        for (const cue of beat.cues) this.timeline.apply(cue, LONG_AGO)
        if (beat.kind === 'play') for (const cue of beat.done) this.timeline.apply(cue, LONG_AGO)
      }
    }
  }

  get current(): StoryPosition {
    return { ...this.position }
  }

  get scene(): StoryScene {
    return this.story.scenes[this.position.scene]!
  }

  get beat(): Beat | undefined {
    return this.scene.beats[this.position.beat]
  }

  get ended(): boolean {
    return this.finished
  }

  /** Whether the story is waiting on an interaction to finish. */
  get playing(): boolean {
    return this.beat?.kind === 'play' && !this.playDone
  }

  subscribe(listener: (event: DirectorEvent) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /** Begins the first scene at time `now`. Call once, after subscribing. */
  start(now: number): void {
    if (this.position.beat !== -1) return
    this.emit({ type: 'checkpoint', scene: this.scene, index: this.position.scene })
    this.enter(0, now)
  }

  /**
   * Moves on to the next beat, the next scene, or the end. Does nothing while an
   * interaction is still going (it finishes with `finishPlay`).
   */
  advance(now: number): void {
    if (this.finished || this.position.beat === -1 || this.playing) return
    const next = this.position.beat + 1
    if (next < this.scene.beats.length) {
      this.enter(next, now)
      return
    }
    if (this.position.scene + 1 < this.story.scenes.length) {
      this.position = { scene: this.position.scene + 1, beat: -1 }
      this.emit({ type: 'checkpoint', scene: this.scene, index: this.position.scene })
      this.enter(0, now)
      return
    }
    this.finished = true
    this.emit({ type: 'end' })
  }

  /** The interaction is finished: keep what it left, run its closing cues, and move on. */
  finishPlay(now: number): void {
    const beat = this.beat
    if (beat?.kind !== 'play' || this.playDone) return
    this.timeline.commitLive(now)
    for (const cue of beat.done) this.timeline.apply(cue, now)
    this.playDone = true
    this.advance(now)
  }

  /** The frame at time `now`, for whichever style is drawing. */
  frame(now: number): SceneFrame {
    return evaluateScene(this.story.set, now, this.timeline)
  }

  private enter(beatIndex: number, now: number) {
    this.position = { ...this.position, beat: beatIndex }
    this.playDone = false
    const beat = this.beat!
    for (const cue of beat.cues) this.timeline.apply(cue, now)
    this.emit({ type: 'beat', beat, position: this.current })
    for (const name of beat.events ?? []) this.emit({ type: 'event', name })
  }

  private emit(event: DirectorEvent) {
    for (const listener of this.listeners) listener(event)
  }
}

/** One line in the history panel. */
export interface HistoryLine {
  scene: string
  beat: Beat & { kind: 'say' | 'verse' }
}

/** Every line of the episode up to and including `position`, for the history panel (spec §3.2). */
export function historyUpTo(story: Story, position: StoryPosition): HistoryLine[] {
  const lines: HistoryLine[] = []
  story.scenes.forEach((scene, s) => {
    if (s > position.scene) return
    scene.beats.forEach((beat, b) => {
      if (s === position.scene && b > position.beat) return
      if (beat.kind !== 'play') lines.push({ scene: scene.id, beat })
    })
  })
  return lines
}
