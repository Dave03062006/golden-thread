import type { SceneDescription } from '../../scene/types'
import manifest from '../art-manifest.json'
import { pixelLayerFile } from '../bake-config'
import { loadArt } from '../load-image'
import { LAYER_H, LAYER_W, pixelLayers, pixelProps } from './art'
import { PixelBuffer } from './buffer'
import { prepareFades } from './dither-fade'
import { buildSprite } from './sprites'

/** A sprite's frames for one pose, drawn facing right and facing left. */
export interface PoseFrames {
  right: HTMLCanvasElement[]
  left: HTMLCanvasElement[]
  fps: number
}

export interface PreparedPixelScene {
  layers: Map<string, CanvasImageSource>
  /** Sprite frames by prop, then by pose. Drawn props need nothing prepared. */
  sprites: Map<string, Map<string, PoseFrames>>
}

const cache = new Map<string, Promise<PreparedPixelScene>>()

/** The finished game loads baked art; while developing, art is drawn live. */
const useBaked = import.meta.env.PROD

/**
 * Gets a scene's pixel art ready once and keeps it, so returning to the scene or
 * switching styles back and forth costs nothing.
 */
export function preparePixelScene(scene: SceneDescription): Promise<PreparedPixelScene> {
  const cached = cache.get(scene.id)
  if (cached) return cached

  const job = (async () => {
    const layers = new Map<string, CanvasImageSource>()
    await Promise.all(
      scene.layers.map(async (layer) => {
        const def = pixelLayers[layer.id]
        if (!def) return
        if (useBaked && layer.id in manifest.pixelLayers) {
          // A bitmap is decoded once, off the main thread, and ready to draw at any time.
          layers.set(layer.id, await createImageBitmap(await loadArt(pixelLayerFile(layer.id))))
          return
        }
        const buf = new PixelBuffer(LAYER_W, LAYER_H)
        def.draw(buf)
        layers.set(layer.id, buf.toCanvas())
      }),
    )

    prepareFades(LAYER_W, LAYER_H)

    // Sprites are tiny, so they're always built on the spot.
    const sprites = new Map<string, Map<string, PoseFrames>>()
    for (const prop of new Set(scene.actors.map((a) => a.prop))) {
      const def = pixelProps[prop]
      if (!def || def.kind !== 'sprite') continue
      const poses = new Map<string, PoseFrames>()
      for (const [pose, { frames, fps }] of Object.entries(def.poses)) {
        const natural = frames.map((f) => buildSprite(f, def.colors))
        const mirrored = frames.map((f) => buildSprite(f, def.colors, { mirror: true }))
        poses.set(pose, def.facing === 1 ? { right: natural, left: mirrored, fps } : { right: mirrored, left: natural, fps })
      }
      sprites.set(prop, poses)
    }
    return { layers, sprites }
  })()

  cache.set(scene.id, job)
  job.catch(() => cache.delete(scene.id))
  return job
}
