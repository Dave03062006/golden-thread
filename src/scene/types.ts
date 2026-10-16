import type { EaseName, Keyframe } from '../engine/motion'

/**
 * A scene, described without any art. Both art styles read the same description and
 * draw it their own way (spec §13.3). Positions and sizes are fractions of the frame:
 * x runs from 0 (left) to 1 (right), y from 0 (top) to 1 (bottom).
 *
 * A description is the set: what's there when it begins and how it breathes on its own.
 * A story moves things on from there, beat by beat (see StoryScene below).
 */
export interface SceneDescription {
  id: string
  title: string
  /** Back to front. */
  layers: SceneLayer[]
  actors: SceneActor[]
  /** The camera's own gentle drift, on top of wherever the story points it. */
  camera: CameraTrack
}

export interface SceneLayer {
  /** The art both styles must provide for this layer. */
  id: string
  /**
   * How far away the layer is: 0 is the far sky, which doesn't move with the camera,
   * and 1 is the nearest ground. Near layers move more than far ones, which creates depth.
   */
  depth: number
  /** A gentle back-and-forth, like water or drifting cloud. `x` is a fraction of the frame width. */
  sway?: { x: number; seconds: number }
  /** A slow breathing of brightness, like twinkling stars. Opacity swings between the two values. */
  pulse?: { min: number; seconds: number; phase?: number }
  /** How visible it is at first, from 0 to 1. The story can change it. */
  opacity?: number
  /** How far it's lowered at first, as a fraction of the frame height (land rising from the sea starts low). */
  offsetY?: number
}

export interface SceneActor {
  id: string
  /** The art both styles must provide for this actor. */
  prop: string
  /** The actor is drawn just in front of this layer, and moves with its depth. */
  above: string
  /** Where it starts, at its layer's depth. The story can move it. */
  x: number
  y: number
  /** Width as a fraction of the frame width. */
  size: number
  /** Its own wandering, added to its place: a looping path of x and y offsets. */
  path?: { x: Keyframe[]; y: Keyframe[]; loopSeconds?: number }
  opacity?: number
  /** How far it has grown, from 0 (not yet) to 1 (full). Plants and lights grow in. */
  grow?: number
  /** A named pose. Both styles must provide every pose a scene uses. Defaults to 'idle'. */
  pose?: string
  /** Which way it faces when standing still: -1 left, 1 right. */
  facing?: -1 | 1
  /** Many of the same, like a flock of birds or a shoal of fish, scattered over an area. */
  group?: ActorGroup
}

export interface ActorGroup {
  count: number
  /** The area they're scattered over, as fractions of the frame. */
  w: number
  h: number
  /** Scatters them the same way every time. */
  seed: number
  /** Each one bobs up and down by this much, out of step with the others. */
  bob?: number
}

export interface CameraTrack {
  /** Pan, as a fraction of the frame width (x) and height (y). */
  x: Keyframe[]
  y: Keyframe[]
  /** 1 is normal. Above 1 moves in closer. */
  zoom: Keyframe[]
  /** 'pingpong' glides back and forth forever; 'hold' stops at the end. */
  loop: 'pingpong' | 'hold'
}

// ---------------------------------------------------------------------------------
// Stories: a scene played beat by beat (spec §13.6).

/** What a cue can change on an actor, a layer or the camera. */
export interface CueValues {
  x?: number
  y?: number
  zoom?: number
  opacity?: number
  offsetY?: number
  size?: number
  grow?: number
  /** How far a group has spread out from its middle, from 0 to 1. */
  spread?: number
  /** Which way an actor faces. It turns at once, at the start of the cue. */
  facing?: -1 | 1
  pose?: string
}

/** One change that starts with a beat: something moves, appears or fades over time. */
export interface Cue {
  /** 'camera', 'layer:<id>' or 'actor:<id>'. */
  target: string
  to: CueValues
  seconds: number
  ease: EaseName
  /** Seconds after the beat begins. */
  delay: number
}

/** One step of a story. The player moves to the next beat when ready. */
export type Beat =
  | { kind: 'say'; text: string; cues: Cue[]; events?: string[] }
  /** An exact quotation from the Bible, looked up in verses.ts. */
  | { kind: 'verse'; ref: string; cues: Cue[]; events?: string[] }
  /**
   * An interactive moment. The story waits until it's finished, then runs `done`, which
   * must leave things exactly where the interaction leaves them, so a checkpoint can
   * rebuild the scene without replaying it.
   */
  | { kind: 'play'; game: string; cues: Cue[]; done: Cue[]; events?: string[] }

/** A scene of a story. Every scene is a checkpoint (spec §4). */
export interface StoryScene {
  id: string
  title: string
  /** The piece of music the scene begins with (a track id); otherwise the music plays on. */
  music?: string
  beats: Beat[]
}
