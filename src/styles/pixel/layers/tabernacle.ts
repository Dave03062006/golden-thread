import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { fill } from './creation'

/**
 * Level 11 · The Tabernacle and the Holy Life in pixel art: the holy place inside the
 * tabernacle, its walls of golden boards and the veil before the ark; and the wheel of the
 * year, twelve moons in a ring around the tabernacle. The shapes follow the paper version, at
 * a fifth of its size.
 */

/** The wheel's middle and its moons' ring, in frame pixels (see content/levels/11-the-tabernacle-and-the-holy-life/episode-6.ts). */
const WHEEL = { x: 160, y: 72, rx: 64, ry: 48.6 }
const MOONS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return { x: Math.round(WHEEL.x + Math.sin(a) * WHEEL.rx), y: Math.round(WHEEL.y - Math.cos(a) * WHEEL.ry), phase: i / 12 }
})

export const tabernacleLayers: Record<string, PixelLayerArt> = {
  'holy-place': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // The coverings overhead, and the floor.
        if (y < 18) return y < 6 ? C.wood1 : C.rose
        if (y >= 160) return dither(x, y) < 0.3 ? C.sand2 : C.wood3
        // The veil, with cherubim worked in gold.
        if (x >= 94 && x < 162) {
          const band = Math.floor((x - 94) / 6) % 3
          if ((x + y * 2) % 26 === 0 && y > 30 && y < 150) return C.gold
          return band === 0 ? C.purple : band === 1 ? C.blue : C.rose
        }
        // The golden boards, in the lamp's light (brighter to the right, where the lampstand stands).
        const light = Math.min(1, Math.max(0, (x - 40) / 260))
        if (x % 12 === 0) return C.wood2
        return dither(x, y) < 0.35 + light * 0.4 ? C.gold : C.sand2
      }),
  },
  'year-wheel': {
    draw: (buf) =>
      fill(buf, (x, y) => {
        // A faint ring through the moons.
        const ring = Math.abs(Math.hypot((x - WHEEL.x) / WHEEL.rx, (y - WHEEL.y) / WHEEL.ry) - 1)
        for (const m of MOONS) {
          const d = Math.hypot(x - m.x, y - m.y)
          if (d < 5) {
            // Each moon a little further through its phases, as the months go round.
            const lit = (x - m.x) / 5 > Math.cos(m.phase * Math.PI * 2)
            return lit ? C.white : C.slate
          }
          if (d < 6.2) return C.dslate
        }
        if (ring < 0.025 && (x + y) % 3 === 0) return C.pale
        // A little ground for the tabernacle to stand on, in the middle.
        if (((x - WHEEL.x) / 34) ** 2 + ((y - (WHEEL.y + 11)) / 4) ** 2 < 1) return dither(x, y) < 0.4 ? C.sand2 : C.wood3
        return null
      }),
  },
}
