import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { bandColor, fill } from './creation'

/**
 * Level 2, Episode 5 in pixel art: the rainbow, one layer for each of its seven bands, so
 * it can be drawn a band at a time; and years later, an evening sky over a vineyard on the
 * hillside. The shapes follow the paper version, at a fifth of its size.
 */

/** The rainbow's circle (centered below the hills) and its bands, outermost first. */
const RAINBOW = { x: 160, y: 128, outer: 120, band: 4.4 }
const BANDS = [C.rose, C.orange, C.gold, C.lime, C.sky, C.blue, C.purple]

function band(i: number): PixelLayerArt {
  const outer = RAINBOW.outer - i * RAINBOW.band
  const inner = outer - RAINBOW.band
  return {
    draw: (buf) =>
      fill(buf, (x, y) => {
        if (y > RAINBOW.y) return null
        const d = Math.hypot(x - RAINBOW.x, y - RAINBOW.y)
        return d < outer && d >= inner ? BANDS[i]! : null
      }),
  }
}

/** The hillside's crest, rising to the right, as in the paper version. */
const hillside = (x: number) => {
  if (x < 112) return Infinity
  const t = Math.min(1, (x - 112) / 256)
  return 207 - (207 - 94) * (1 - (1 - t) ** 2.2)
}

export const theRainbowCovenantLayers: Record<string, PixelLayerArt> = {
  ...Object.fromEntries(BANDS.map((_, i) => [`rainbow-${i + 1}`, band(i)])),
  'vineyard-sky': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const sun = Math.hypot(x - 250, y - 108)
        if (sun < 9) return sun < 7 ? C.white : C.gold
        if (sun < 30 && (30 - sun) / 30 > dither(x, y) * 1.6) return C.gold
        return bandColor([C.navy, C.purple, C.rose, C.orange, C.gold], Math.max(0, (y + 14) / 136), x, y)
      }),
  },
  vineyard: {
    draw: (buf) =>
      fill(buf, (x, y) => {
        const top = Math.round(hillside(x))
        if (y < top) return null
        if (y <= top + 1) return C.lime
        // Rows of vines across the hillside, with clusters of grapes hanging below.
        const below = y - top
        const k = Math.floor((below - 5) / 9)
        const inRow = below - 5 - k * 9
        if (k >= 0 && k < 6) {
          if (inRow <= 2) return x % 9 === 0 ? C.wood1 : C.teal
          if (inRow === 3 && x % 5 === 2) return C.purple
        }
        return C.green
      }),
  },
}
