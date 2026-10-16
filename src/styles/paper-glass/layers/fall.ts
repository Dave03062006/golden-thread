import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP } from '../frame'

/**
 * Level 1, Episode 3: two veils laid over the garden. The first dims everything but the
 * fruit as the serpent lies (Genesis 3:4–5). The second is the cold of evening after the
 * Fall, when God comes walking in the garden.
 */

/** Where the fruit hangs on the forbidden tree, in frame units (see episode-3.ts). */
export const FRUIT_AT = { x: 584, y: 450 }

export const fallLayers: Record<string, PaperLayerArt> = {
  'eden-dim': {
    bounds: FULL,
    shadow: false,
    resolution: 0.3,
    svg: `
      <defs>
        <radialGradient id="dim" cx="${FRUIT_AT.x}" cy="${FRUIT_AT.y}" r="760" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#140e28" stop-opacity="0"/>
          <stop offset=".04" stop-color="#140e28" stop-opacity=".2"/>
          <stop offset=".15" stop-color="#140e28" stop-opacity=".75"/>
          <stop offset="1" stop-color="#140e28" stop-opacity=".88"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dim)"/>`,
  },

  'eden-dusk': {
    bounds: FULL,
    shadow: false,
    resolution: 0.3,
    svg: `
      <defs>
        <linearGradient id="dusk" x1="0" y1="${TOP}" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#1e2a6e" stop-opacity=".78"/>
          <stop offset=".5" stop-color="#3a3a7a" stop-opacity=".6"/>
          <stop offset=".62" stop-color="#6a4a7a" stop-opacity=".5"/>
          <stop offset="1" stop-color="#141838" stop-opacity=".7"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dusk)"/>`,
  },
}
