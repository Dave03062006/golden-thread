import { paperLayerSize } from '../../bake/size'
import type { SceneDescription } from '../../scene/types'
import manifest from '../art-manifest.json'
import { PAPER_FRAME_WIDTHS, PAPER_PART_WIDTHS, paperLayerFile, paperPartFile, pickSize } from '../bake-config'
import { loadArt } from '../load-image'
import { paperLayers, paperProps, type PaperPropArt } from './art'
import { rasterize } from './raster'

type Art = HTMLImageElement | HTMLCanvasElement

export interface PreparedPaperScene {
  layers: Map<string, Art>
  /** Puppet parts, by "actorId/partId". */
  parts: Map<string, Art>
}

/** How many prepared scenes to keep. Paper layers are big, so only the latest couple. */
const KEEP = 2

const cache = new Map<string, Promise<PreparedPaperScene>>()

/**
 * The finished game loads art baked by `npm run bake`. While developing, art is drawn
 * live instead, so changes show up without baking.
 */
const useBaked = import.meta.env.PROD

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/** The soft shadow under a puppet part drawn `widthPx` wide. Lights cast none. */
export function partShadow(art: PaperPropArt, widthPx: number): number {
  return art.shadow === false ? 0 : Math.max(2, widthPx * 0.025)
}

/**
 * Gets a scene's paper art ready: baked images when available (decoded off the main
 * thread), otherwise drawn live one piece per frame. The result is kept, so switching
 * styles back and forth shows art that's already prepared.
 */
export function preparePaperScene(scene: SceneDescription, width: number, height: number, dpr: number): Promise<PreparedPaperScene> {
  const frameWidth = Math.round(width * dpr)
  const key = `${scene.id}@${frameWidth}`
  const cached = cache.get(key)
  if (cached) return cached

  const bakedWidth = pickSize(PAPER_FRAME_WIDTHS, frameWidth)
  const job = (async () => {
    const layers = new Map<string, Art>()
    const parts = new Map<string, Art>()

    await Promise.all(
      scene.layers.map(async (layer) => {
        const art = paperLayers[layer.id]
        if (!art) return
        if (useBaked && layer.id in manifest.paperLayers) {
          layers.set(layer.id, await loadArt(paperLayerFile(layer.id, bakedWidth)))
          return
        }
        await nextFrame()
        const size = paperLayerSize(art.bounds, art.resolution ?? 1, frameWidth)
        const shadowPx = art.shadow ? Math.max(2, height * dpr * 0.006) * (art.resolution ?? 1) : 0
        layers.set(layer.id, await rasterize(art.svg, art.bounds, { ...size, shadowPx }))
      }),
    )

    await Promise.all(
      scene.actors.flatMap((actor) => {
        const art = paperProps[actor.prop]
        if (!art) return []
        // Parts are drawn a little larger than needed, so they stay sharp when the camera moves
        // in. Soft art (a glow) is drawn smaller and enlarged, which loses nothing.
        const needed = Math.max(16, Math.round(actor.size * width * dpr * 1.15 * (art.resolution ?? 1)))
        return art.parts.map(async (part) => {
          const key = `${actor.id}/${part.id}`
          if (useBaked && actor.prop in manifest.paperProps) {
            parts.set(key, await loadArt(paperPartFile(actor.prop, part.id, pickSize(PAPER_PART_WIDTHS, needed))))
            return
          }
          await nextFrame()
          const heightPx = Math.round(needed * (art.box.h / art.box.w))
          parts.set(key, await rasterize(part.svg, art.box, { widthPx: needed, heightPx, shadowPx: partShadow(art, needed) }))
        })
      }),
    )
    return { layers, parts }
  })()

  cache.set(key, job)
  // Forget the oldest prepared scenes.
  while (cache.size > KEEP) cache.delete(cache.keys().next().value!)
  job.catch(() => cache.delete(key))
  return job
}
