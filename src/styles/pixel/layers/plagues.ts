import type { PixelLayerArt } from '../art'
import { C, dither } from '../palette'
import { crest, fill } from './creation'
import { nileReeds } from './exodus'

/**
 * Level 8 · The Plagues and the Passover in pixel art: the harvested field of stubble, with
 * the mud of the brick pit at its edge; and the Nile turned to blood. The shapes follow the
 * paper version, at a fifth of its size.
 */

const div = (heights: number[]) => heights.map((h) => h / 5)

export const plaguesLayers: Record<string, PixelLayerArt> = {
  'stubble-field': {
    draw: (buf) => {
      fill(buf, (x, y) => (y >= Math.round(crest(div([470, 462, 474, 458, 468, 472, 460, 470, 464, 468]), x)) ? (dither(x, y) < 0.5 ? C.green : C.sand2) : null))
      fill(buf, (x, y) => {
        // Palms on the far side.
        for (const [i, px] of [32, 84, 196, 260].entries()) {
          const top = 80 - (i % 2) * 4
          if (x >= px && x < px + 2 && y >= top && y < 96) return C.wood1
          if (y >= top - 3 && y < top + 3 && Math.abs(x - px - 1) < 8 - Math.abs(y - top) * 2 && (x + y) % 2) return C.teal
        }
        if (y < Math.round(crest(div([500, 494, 504, 490, 500, 506, 494, 502, 496, 500]), x))) return null
        // The brick pit's mud, at the edge of the field.
        const pit = ((x - 12) / 50) ** 2 + ((y - 156) / 9) ** 2
        if (pit < 1) return pit < 0.55 ? C.wood2 : C.wood1
        // The field, in rows, with the stubble standing short.
        if (y >= 172) return dither(x, y) < 0.4 ? C.wood3 : C.sand2
        const row = Math.floor((y - 100) / 7)
        if ((y - 100) % 7 === 0) return C.wood3
        if ((x * 5 + row * 11) % 13 === 0 && (y - 100) % 7 > 3) return C.wood2
        return (x + y) % 2 && row % 2 ? C.sand2 : C.sand
      })
    },
  },
  'blood-nile': nileReeds(C.purple, C.rose),
}
