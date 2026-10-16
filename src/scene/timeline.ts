import { ease, lerp, progress, type EaseName } from '../engine/motion'
import type { Cue, CueValues, SceneDescription } from './types'

/**
 * Everything the story can change, kept as "channels": the camera's x, a layer's
 * opacity, an actor's size, and so on. A channel is named like "camera.zoom",
 * "layer:land.offsetY" or "actor:sun.x".
 *
 * Each change is a transition that starts at a moment in time, from wherever the value
 * is at that moment, and eases to its new value. Because the value at any time is
 * simply worked out from the list of transitions, both art styles can ask for the same
 * moment and get exactly the same answer, and a checkpoint can rebuild a scene by
 * replaying its transitions as already finished.
 */

interface Transition {
  start: number
  seconds: number
  ease: EaseName
  from: number
  to: number
}

interface PoseChange {
  start: number
  seconds: number
  from: string
  to: string
}

export interface PoseValue {
  pose: string
  /** The pose it's blending from, and how far the blend has got (1 = fully in the new pose). */
  previous: string
  blend: number
}

/** Values that change in an instant rather than gliding. */
const STEPPED = new Set(['facing'])

/** The value a channel has before the story changes it, from the scene description. */
export function initialValue(scene: SceneDescription, channel: string): number {
  const [target, key] = splitChannel(channel)
  if (target === 'camera') return key === 'zoom' ? 1 : 0
  if (target.startsWith('layer:')) {
    const layer = scene.layers.find((l) => l.id === target.slice(6))
    if (key === 'opacity') return layer?.opacity ?? 1
    if (key === 'offsetY') return layer?.offsetY ?? 0
    return 0
  }
  const actor = scene.actors.find((a) => a.id === target.slice(6))
  switch (key) {
    case 'x':
      return actor?.x ?? 0
    case 'y':
      return actor?.y ?? 0
    case 'size':
      return actor?.size ?? 0
    case 'opacity':
      return actor?.opacity ?? 1
    case 'grow':
      return actor?.grow ?? 1
    case 'facing':
      return actor?.facing ?? 1
    case 'spread':
      return actor?.group?.spread ?? 1
    default:
      return 1
  }
}

function splitChannel(channel: string): [target: string, key: string] {
  const dot = channel.lastIndexOf('.')
  return [channel.slice(0, dot), channel.slice(dot + 1)]
}

export class Timeline {
  private readonly scene: SceneDescription
  private readonly numbers = new Map<string, Transition[]>()
  private readonly poses = new Map<string, PoseChange[]>()
  /** Starting values, looked up in the scene once per channel and remembered. */
  private readonly initials = new Map<string, number>()
  private readonly initialPoses = new Map<string, string>()
  /** Values an interaction is setting right now, which win over everything else. */
  readonly live = new Map<string, number>()

  constructor(scene: SceneDescription) {
    this.scene = scene
  }

  /** A channel's value at time `t`. */
  value(channel: string, t: number): number {
    const live = this.live.get(channel)
    if (live !== undefined) return live
    const list = this.numbers.get(channel)
    if (!list || list.length === 0) return this.initial(channel)
    for (let i = list.length - 1; i >= 0; i--) {
      const tr = list[i]!
      if (tr.start <= t) return lerp(tr.from, tr.to, ease[tr.ease](progress(tr.start, tr.seconds, t)))
    }
    return list[0]!.from
  }

  private initial(channel: string): number {
    let value = this.initials.get(channel)
    if (value === undefined) {
      value = initialValue(this.scene, channel)
      this.initials.set(channel, value)
    }
    return value
  }

  /** An actor's pose at time `t`, with the blend from its previous pose. */
  pose(actorId: string, t: number): PoseValue {
    let initial = this.initialPoses.get(actorId)
    if (initial === undefined) {
      initial = this.scene.actors.find((a) => a.id === actorId)?.pose ?? 'idle'
      this.initialPoses.set(actorId, initial)
    }
    const list = this.poses.get(actorId)
    if (list) {
      for (let i = list.length - 1; i >= 0; i--) {
        const change = list[i]!
        if (change.start > t) continue
        const blend = progress(change.start, change.seconds, t)
        // Once the blend is over, there's nothing left to blend from.
        return { pose: change.to, previous: blend >= 1 ? change.to : change.from, blend }
      }
    }
    return { pose: initial, previous: initial, blend: 1 }
  }

  /** Starts a cue's transitions, `cue.delay` seconds after `beatStart`. */
  apply(cue: Cue, beatStart: number): void {
    const start = beatStart + cue.delay
    for (const [key, to] of Object.entries(cue.to) as [keyof CueValues, number | string][]) {
      if (key === 'pose') {
        this.changePose(cue.target.slice(6), to as string, start, cue.seconds)
        continue
      }
      const stepped = STEPPED.has(key)
      this.add(`${cue.target}.${key}`, to as number, start, stepped ? 0 : cue.seconds, cue.ease)
    }
  }

  /** Sets a channel to a value at once, at time `at`. */
  set(channel: string, value: number, at: number): void {
    this.add(channel, value, at, 0, 'linear')
  }

  /** Fixes whatever an interaction was setting, so the story carries on from there. */
  commitLive(at: number): void {
    for (const [channel, value] of this.live) {
      this.live.delete(channel)
      this.set(channel, value, at)
    }
  }

  private add(channel: string, to: number, start: number, seconds: number, easing: EaseName) {
    const from = this.value(channel, start)
    // A newer change wins over older ones that haven't begun yet.
    const list = (this.numbers.get(channel) ?? []).filter((tr) => tr.start <= start)
    list.push({ start, seconds, ease: easing, from, to })
    this.numbers.set(channel, list)
  }

  private changePose(actorId: string, to: string, start: number, seconds: number) {
    const from = this.pose(actorId, start).pose
    const list = (this.poses.get(actorId) ?? []).filter((change) => change.start <= start)
    list.push({ start, seconds: Math.max(seconds, 0), from, to })
    this.poses.set(actorId, list)
  }
}
