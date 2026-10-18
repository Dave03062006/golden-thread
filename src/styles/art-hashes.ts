import { fnv1a } from '../engine/save/checksum'
import type { PaperLayerArt, PaperPropArt } from './paper-glass/art'
import { LAYER_H, LAYER_W, type PixelLayerArt } from './pixel/art'
import { PixelBuffer } from './pixel/buffer'

/**
 * Fingerprints of art sources. The bake script stores them next to the baked images, and
 * a test compares them with the current code, so changed art that wasn't re-baked is
 * caught before it ships.
 */
export function paperLayerHash(art: PaperLayerArt): string {
  return fnv1a(JSON.stringify(art))
}

export function paperPropHash(art: PaperPropArt): string {
  return fnv1a(JSON.stringify(art))
}

/** Pixel art is fingerprinted by the pixels it draws. */
export function pixelLayerHash(art: PixelLayerArt): string {
  const buf = new PixelBuffer(LAYER_W, LAYER_H)
  art.draw(buf)
  return pixelsHash(buf)
}

export function pixelsHash(buf: PixelBuffer): string {
  let text = ''
  // Sample every pixel's color into the fingerprint, compactly.
  for (let i = 0; i < buf.data.length; i += 4) {
    text += String.fromCharCode(buf.data[i]!, buf.data[i + 1]!, buf.data[i + 2]!, buf.data[i + 3]!)
  }
  return fnv1a(text)
}
