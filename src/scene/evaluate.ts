import { pingPong, sampleTrack, trackLength } from '../engine/motion'
import type { SceneDescription } from './types'

export interface CameraState {
  x: number
  y: number
  zoom: number
}

export interface LayerState {
  id: string
  depth: number
  /** The layer's own sway right now, as a fraction of the frame width. */
  swayX: number
}

export interface ActorState {
  id: string
  prop: string
  above: string
  depth: number
  x: number
  y: number
  /** Which way it's moving: -1 left, 1 right. */
  facing: -1 | 1
  size: number
  /** The actor's own time, for animations like flapping wings. */
  time: number
}

/** Everything a renderer needs to draw one moment of a scene. */
export interface SceneFrame {
  time: number
  camera: CameraState
  layers: LayerState[]
  actors: ActorState[]
}

/** Works out where everything is at a given moment. Pure: the same time gives the same frame. */
export function evaluateScene(scene: SceneDescription, time: number): SceneFrame {
  const { camera } = scene
  const camLength = Math.max(trackLength(camera.x), trackLength(camera.y), trackLength(camera.zoom))
  const camTime = camera.loop === 'pingpong' ? pingPong(time, camLength) : time

  const depthOf = new Map(scene.layers.map((layer) => [layer.id, layer.depth]))

  return {
    time,
    camera: {
      x: sampleTrack(camera.x, camTime),
      y: sampleTrack(camera.y, camTime),
      zoom: sampleTrack(camera.zoom, camTime) || 1,
    },
    layers: scene.layers.map((layer) => ({
      id: layer.id,
      depth: layer.depth,
      swayX: layer.sway ? layer.sway.x * Math.sin((time / layer.sway.seconds) * Math.PI * 2) : 0,
    })),
    actors: scene.actors.map((actor) => {
      const t = actor.loopSeconds ? time % actor.loopSeconds : time
      const x = sampleTrack(actor.x, t)
      const ahead = sampleTrack(actor.x, t + 0.05)
      return {
        id: actor.id,
        prop: actor.prop,
        above: actor.above,
        depth: depthOf.get(actor.above) ?? 1,
        x,
        y: sampleTrack(actor.y, t),
        facing: ahead < x ? -1 : 1,
        size: actor.size,
        time,
      }
    }),
  }
}

/**
 * Where a layer at `depth` sits on screen: how far it's shifted (as fractions of the
 * frame) and how much it's enlarged around the frame's center. Near layers move and
 * grow more than far ones, which is what makes the scene feel deep.
 */
export function layerTransform(depth: number, camera: CameraState, swayX = 0) {
  return {
    dx: -camera.x * depth + swayX,
    dy: -camera.y * depth,
    scale: 1 + (camera.zoom - 1) * depth,
  }
}

/** Where a point at `depth` lands on screen, as fractions of the frame. */
export function projectPoint(x: number, y: number, depth: number, camera: CameraState) {
  const { dx, dy, scale } = layerTransform(depth, camera)
  return {
    x: 0.5 + (x - 0.5 + dx) * scale,
    y: 0.5 + (y - 0.5 + dy) * scale,
    scale,
  }
}

/** Every layer and prop id a scene needs. Both styles must provide all of them. */
export function artIdsOf(scene: SceneDescription) {
  return {
    layers: scene.layers.map((l) => l.id),
    props: [...new Set(scene.actors.map((a) => a.prop))],
  }
}
