import type { PixelDrawnArt } from '../art'
import { C, hash } from '../palette'

/**
 * Props of Level 2, Episode 3 in pixel art: the rain, falling forty days and forty
 * nights, and the great swells rolling toward the ark in the storm.
 */

/**
 * Rain over the whole frame, its streaks falling and slanting, drawn fresh each frame. The
 * streaks of each color are filled together in one go, which keeps it quick when the rain
 * is faded (each fill at a fade sets up its own pattern).
 */
const rain: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  live: true,
  anchor: 'center',
  draw(paint, { time, width }) {
    const h = Math.round((width * 9) / 16)
    const runs: [number, number, number][][] = [[], []]
    for (let i = 0; i < 150; i++) {
      const x0 = Math.floor(hash(i * 3.7) * (width + 20)) - width / 2 - 10
      const fall = (hash(i * 9.1) + time / 1.3) % 1
      const y = Math.round(fall * (h + 10)) - h / 2 - 5
      const x = Math.round(x0 - fall * 8)
      for (let k = 0; k < 4; k++) runs[i % 4 ? 0 : 1]!.push([y + k, x, x])
    }
    paint.spans(runs[0]!, C.pale, 1)
    paint.spans(runs[1]!, C.white, 1)
  },
}

/** A great swell with a foaming, curling crest, rolling the way it faces. */
const wave: PixelDrawnArt = {
  kind: 'drawn',
  poses: ['idle'],
  fps: 4,
  loop: 2,
  anchor: 'base',
  draw(paint, { width, time, facing }) {
    const w = width
    const h = Math.round(w * 0.42)
    const bob = Math.round(Math.sin(time * Math.PI * 2 * 0.5))
    // Drawn rolling right (the long back on the left, the steep face on the right), and mirrored to roll left.
    const at = (x: number) => Math.round(facing === 1 ? x - w / 2 : w / 2 - 1 - x)
    for (let x = 0; x < w; x++) {
      const t = x / w
      const top = Math.round(h * (t < 0.7 ? Math.sin((t / 0.7) * Math.PI * 0.5) : 1 - ((t - 0.7) / 0.3) ** 0.7)) + bob
      if (top <= 0) continue
      // Light water toward the crest, darkening to the sea's blue below it, and foam along the top.
      const light = Math.round(top * 0.45)
      paint.rect(at(x), -top, 1, light, C.sky)
      paint.rect(at(x), -top + light, 1, top - light, C.blue)
      paint.dither(at(x), -top + light, 1, top - light, C.sky, 0.5)
      paint.rect(at(x), -top, 1, 2, t > 0.45 && t < 0.8 ? C.white : C.pale)
    }
    // The curl of foam over the face.
    const cx = Math.round(w * 0.7)
    for (let i = 0; i < 5; i++) paint.rect(at(cx + i), -h - bob + i, 2, 1, C.white)
  },
}

export const theFloodProps: Record<string, PixelDrawnArt> = { rain, wave }
