import { ALL_SCENES } from '../scene/registry'
import { paperLayerHash, paperPropHash, pixelLayerHash, pixelsHash } from '../styles/art-hashes'
import {
  BACKDROP_WIDTHS,
  PAPER_FRAME_WIDTHS,
  PAPER_PART_WIDTHS,
  paperLayerFile,
  paperPartFile,
  paperBackdropFile,
  pixelBackdropFile,
  pixelLayerFile,
} from '../styles/bake-config'
import { BACKDROP_H, BACKDROP_W, heavenAndEarthSvg } from '../styles/paper-glass/backdrop/heaven-and-earth'
import { drawHeavenAndEarth } from '../styles/pixel/backdrop/heaven-and-earth'
import { fnv1a } from '../engine/save/checksum'
import { paperLayers, paperProps } from '../styles/paper-glass/art'
import { partShadow } from '../styles/paper-glass/prepare'
import { rasterize } from '../styles/paper-glass/raster'
import { LAYER_H, LAYER_W, pixelLayers } from '../styles/pixel/art'
import { PixelBuffer } from '../styles/pixel/buffer'
import { paperLayerSize } from './size'

/**
 * The art-baking page (bake.html), driven by scripts/bake-art.mjs. It draws every piece
 * of art the scenes use, with the same code the game uses, and hands back the images
 * plus a manifest of fingerprints.
 */

export interface BakedFile {
  path: string
  base64: string
}

export interface ArtManifest {
  paperLayers: Record<string, { hash: string }>
  paperProps: Record<string, { hash: string }>
  pixelLayers: Record<string, { hash: string }>
  backdrop: { paper: string; pixel: string }
}

async function encode(canvas: HTMLCanvasElement, type: 'image/webp' | 'image/png'): Promise<string> {
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('could not encode'))), type, 0.9),
  )
  const bytes = new Uint8Array(await blob.arrayBuffer())
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}

async function bake(): Promise<{ files: BakedFile[]; manifest: ArtManifest }> {
  const files: BakedFile[] = []
  const manifest: ArtManifest = { paperLayers: {}, paperProps: {}, pixelLayers: {}, backdrop: { paper: '', pixel: '' } }
  const layerIds = new Set(ALL_SCENES.flatMap((scene) => scene.layers.map((l) => l.id)))
  const propIds = new Set(ALL_SCENES.flatMap((scene) => scene.actors.map((a) => a.prop)))

  for (const id of layerIds) {
    const paper = paperLayers[id]
    if (paper) {
      const resolution = paper.resolution ?? 1
      for (const frameWidth of PAPER_FRAME_WIDTHS) {
        const size = paperLayerSize(paper.bounds, resolution, frameWidth)
        const frameHeight = (frameWidth * 9) / 16
        const canvas = await rasterize(paper.svg, paper.bounds, {
          ...size,
          shadowPx: paper.shadow ? Math.max(2, frameHeight * 0.006) * resolution : 0,
        })
        files.push({ path: paperLayerFile(id, frameWidth), base64: await encode(canvas, 'image/webp') })
      }
      manifest.paperLayers[id] = { hash: paperLayerHash(paper) }
    }

    const pixel = pixelLayers[id]
    if (pixel) {
      const buf = new PixelBuffer(LAYER_W, LAYER_H)
      pixel.draw(buf)
      files.push({ path: pixelLayerFile(id), base64: await encode(buf.toCanvas(), 'image/png') })
      manifest.pixelLayers[id] = { hash: pixelLayerHash(pixel) }
    }
  }

  for (const prop of propIds) {
    const art = paperProps[prop]
    if (!art) continue
    for (const width of PAPER_PART_WIDTHS) {
      const height = Math.round(width * (art.box.h / art.box.w))
      for (const part of art.parts) {
        const canvas = await rasterize(part.svg, art.box, { widthPx: width, heightPx: height, shadowPx: partShadow(art, width) })
        files.push({ path: paperPartFile(prop, part.id, width), base64: await encode(canvas, 'image/webp') })
      }
    }
    manifest.paperProps[prop] = { hash: paperPropHash(art) }
  }

  // The main background, heaven and earth.
  const svg = heavenAndEarthSvg()
  for (const width of BACKDROP_WIDTHS) {
    const canvas = await rasterize(svg, { x: 0, y: 0, w: BACKDROP_W, h: BACKDROP_H }, { widthPx: width, heightPx: Math.round((width * BACKDROP_H) / BACKDROP_W), shadowPx: 0 })
    files.push({ path: paperBackdropFile(width), base64: await encode(canvas, 'image/webp') })
  }
  const pixels = drawHeavenAndEarth()
  files.push({ path: pixelBackdropFile, base64: await encode(pixels.toCanvas(), 'image/png') })
  manifest.backdrop = { paper: fnv1a(svg), pixel: pixelsHash(pixels) }

  return { files, manifest }
}

declare global {
  interface Window {
    __bake?: typeof bake
  }
}

window.__bake = bake
