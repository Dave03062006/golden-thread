import type { SceneDescription } from '../../scene/types'
import manifest from '../art-manifest.json'
import { pixelLayerFile } from '../bake-config'
import { loadArt } from '../load-image'
import { LAYER_H, LAYER_W, pixelLayers, pixelProps } from './art'
import { PixelBuffer } from './buffer'
import { buildSprite } from './sprites'

export interface PreparedPixelScene {
  layers: Map<string, CanvasImageSource>
  sprites: Map<string, { right: HTMLCanvasElement[]; left: HTMLCanvasElement[] }>
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

    // Sprites are tiny, so they're always built on the spot.
    const sprites = new Map<string, { right: HTMLCanvasElement[]; left: HTMLCanvasElement[] }>()
    for (const prop of new Set(scene.actors.map((a) => a.prop))) {
      const def = pixelProps[prop]
      if (!def) continue
      const natural = def.frames.map((f) => buildSprite(f, def.colors))
      const mirrored = def.frames.map((f) => buildSprite(f, def.colors, { mirror: true }))
      sprites.set(prop, def.facing === 1 ? { right: natural, left: mirrored } : { right: mirrored, left: natural })
    }
    return { layers, sprites }
  })()

  cache.set(scene.id, job)
  job.catch(() => cache.delete(scene.id))
  return job
}
