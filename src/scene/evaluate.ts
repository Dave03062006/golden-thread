import { pingPong, sampleTrack, trackLength } from '../engine/motion'
import { createRng } from '../engine/random'
import type { Timeline } from './timeline'
import type { SceneActor, SceneDescription } from './types'

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
  opacity: number
  /** How far it's lowered, as a fraction of the frame height. */
  offsetY: number
}

/** One member of a group (a bird in a flock), placed relative to the group's middle. */
export interface ActorInstance {
  /** Offset from the actor's place, as fractions of the frame. */
  dx: number
  dy: number
  /** Its own size, as a multiple of the actor's size. */
  scale: number
  /** Puts its animation out of step with the others, from 0 to 1. */
  phase: number
}

export interface ActorState {
  id: string
  prop: string
  above: string
  depth: number
  x: number
  y: number
  /** Which way it faces: -1 left, 1 right. */
  facing: -1 | 1
  size: number
  opacity: number
  grow: number
  pose: string
  /** The pose it's blending from, and how far along (1 = fully in `pose`). */
  previousPose: string
  poseBlend: number
  /** The actor's own time, for animations like flapping wings. */
  time: number
  /** For a group: each member. A single actor has none. */
  instances?: ActorInstance[]
}

/** Everything a renderer needs to draw one moment of a scene. */
export interface SceneFrame {
  time: number
  camera: CameraState
  layers: LayerState[]
  actors: ActorState[]
}

/** The names of every channel a scene's layers and actors have, built once per scene. */
interface ChannelNames {
  layers: { opacity: string; offsetY: string }[]
  actors: { x: string; y: string; facing: string; size: string; opacity: string; grow: string; spread: string }[]
}
const channelNames = new WeakMap<SceneDescription, ChannelNames>()
function namesOf(scene: SceneDescription): ChannelNames {
  let names = channelNames.get(scene)
  if (!names) {
    names = {
      layers: scene.layers.map((l) => ({ opacity: `layer:${l.id}.opacity`, offsetY: `layer:${l.id}.offsetY` })),
      actors: scene.actors.map((a) => {
        const key = `actor:${a.id}`
        return {
          x: `${key}.x`,
          y: `${key}.y`,
          facing: `${key}.facing`,
          size: `${key}.size`,
          opacity: `${key}.opacity`,
          grow: `${key}.grow`,
          spread: `${key}.spread`,
        }
      }),
    }
    channelNames.set(scene, names)
  }
  return names
}

/** Each layer's depth by id, built once per scene. */
const depths = new WeakMap<SceneDescription, Map<string, number>>()
function depthsOf(scene: SceneDescription): Map<string, number> {
  let map = depths.get(scene)
  if (!map) {
    map = new Map(scene.layers.map((layer) => [layer.id, layer.depth]))
    depths.set(scene, map)
  }
  return map
}

/** Where each member of a group sits, scattered the same way every time. */
const groupLayouts = new WeakMap<SceneActor, { x: number; y: number; scale: number; phase: number }[]>()
function groupLayout(actor: SceneActor) {
  let layout = groupLayouts.get(actor)
  if (!layout && actor.group) {
    const rng = createRng(actor.group.seed)
    layout = Array.from({ length: actor.group.count }, () => ({
      x: rng.next() - 0.5,
      y: rng.next() - 0.5,
      scale: 0.75 + rng.next() * 0.5,
      phase: rng.next(),
    }))
    groupLayouts.set(actor, layout)
  }
  return layout ?? []
}

/**
 * Works out where everything is at a given moment. Pure: the same time (and the same
 * story so far, in `timeline`) always gives the same frame, so both styles draw alike.
 */
export function evaluateScene(scene: SceneDescription, time: number, timeline?: Timeline): SceneFrame {
  const { camera } = scene
  const camLength = Math.max(trackLength(camera.x), trackLength(camera.y), trackLength(camera.zoom))
  const camTime = camera.loop === 'pingpong' ? pingPong(time, camLength) : time
  const value = (channel: string, fallback: number) => (timeline ? timeline.value(channel, time) : fallback)

  const depthOf = depthsOf(scene)
  const names = namesOf(scene)

  return {
    time,
    camera: {
      x: value('camera.x', 0) + sampleTrack(camera.x, camTime),
      y: value('camera.y', 0) + sampleTrack(camera.y, camTime),
      zoom: value('camera.zoom', 1) * (sampleTrack(camera.zoom, camTime) || 1),
    },
    layers: scene.layers.map((layer, i) => {
      const channel = names.layers[i]!
      let opacity = value(channel.opacity, layer.opacity ?? 1)
      if (layer.pulse) {
        const wave = 0.5 + 0.5 * Math.sin(((time / layer.pulse.seconds) + (layer.pulse.phase ?? 0)) * Math.PI * 2)
        opacity *= layer.pulse.min + (1 - layer.pulse.min) * wave
      }
      return {
        id: layer.id,
        depth: layer.depth,
        swayX: layer.sway ? layer.sway.x * Math.sin((time / layer.sway.seconds) * Math.PI * 2) : 0,
        opacity,
        offsetY: value(channel.offsetY, layer.offsetY ?? 0),
      }
    }),
    actors: scene.actors.map((actor, i) => {
      const channel = names.actors[i]!
      let x = value(channel.x, actor.x)
      let y = value(channel.y, actor.y)
      let facing: -1 | 1 = value(channel.facing, actor.facing ?? 1) < 0 ? -1 : 1
      if (actor.path) {
        const t = actor.path.loopSeconds ? time % actor.path.loopSeconds : time
        const px = sampleTrack(actor.path.x, t)
        x += px
        y += sampleTrack(actor.path.y, t)
        // An actor on a path faces the way it's going.
        const ahead = sampleTrack(actor.path.x, t + 0.05)
        if (Math.abs(ahead - px) > 1e-6) facing = ahead < px ? -1 : 1
      }
      const pose = timeline ? timeline.pose(actor.id, time) : { pose: actor.pose ?? 'idle', previous: actor.pose ?? 'idle', blend: 1 }
      const state: ActorState = {
        id: actor.id,
        prop: actor.prop,
        above: actor.above,
        depth: depthOf.get(actor.above) ?? 1,
        x,
        y,
        facing,
        size: value(channel.size, actor.size),
        opacity: value(channel.opacity, actor.opacity ?? 1),
        grow: value(channel.grow, actor.grow ?? 1),
        pose: pose.pose,
        previousPose: pose.previous,
        poseBlend: pose.blend,
        time,
      }
      if (actor.group) {
        const spread = value(channel.spread, 1)
        const { w, h, bob = 0 } = actor.group
        state.instances = groupLayout(actor).map((m) => ({
          dx: m.x * w * spread,
          dy: m.y * h * spread + bob * Math.sin((time * 0.9 + m.phase) * Math.PI * 2),
          scale: m.scale,
          phase: m.phase,
        }))
      }
      return state
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

/** The opposite of projectPoint: which point at `depth` is under a spot on screen. */
export function unprojectPoint(screenX: number, screenY: number, depth: number, camera: CameraState) {
  const { dx, dy, scale } = layerTransform(depth, camera)
  return {
    x: (screenX - 0.5) / scale + 0.5 - dx,
    y: (screenY - 0.5) / scale + 0.5 - dy,
  }
}

/** Every layer and prop id a scene needs. Both styles must provide all of them. */
export function artIdsOf(scene: SceneDescription) {
  return {
    layers: scene.layers.map((l) => l.id),
    props: [...new Set(scene.actors.map((a) => a.prop))],
  }
}
