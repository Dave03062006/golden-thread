import type { Keyframe } from '../engine/motion'

/**
 * A scene, described without any art. Both art styles read the same description and
 * draw it their own way (spec §13.3). Positions and sizes are fractions of the frame:
 * x runs from 0 (left) to 1 (right), y from 0 (top) to 1 (bottom).
 */
export interface SceneDescription {
  id: string
  title: string
  /** Back to front. */
  layers: SceneLayer[]
  actors: SceneActor[]
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
}

export interface SceneActor {
  id: string
  /** The art both styles must provide for this actor. */
  prop: string
  /** The actor is drawn just in front of this layer, and moves with its depth. */
  above: string
  /** The path, as keyframed x and y positions over time. */
  x: Keyframe[]
  y: Keyframe[]
  /** If set, the path repeats with this period. */
  loopSeconds?: number
  /** Width as a fraction of the frame width. */
  size: number
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
