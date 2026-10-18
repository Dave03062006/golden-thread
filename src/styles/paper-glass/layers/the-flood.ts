import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud, waterPath } from '../shapes'

/**
 * Level 2, Episode 3: the Flood. Over the clearing a storm sky gathers; floodwater rises
 * over the ground; then there is only the sea, rolling under the storm, and at last wide
 * and still under a gray sky. No one is shown suffering: only water, to the horizon.
 */

const STORM_CLOUDS: [number, number, number][] = [
  [-180, 20, 2.6],
  [260, -40, 3],
  [700, 10, 2.4],
  [1080, -50, 3.2],
  [1400, 30, 2.4],
  [100, 220, 2],
  [560, 180, 2.4],
  [1000, 220, 2],
]

/** Rows of rolling sea from the horizon down, each wave a little darker and bigger. */
function sea(horizon: number, colors: [string, string, string], amp: number): string {
  let out = `<rect x="${LEFT}" y="${horizon}" width="${RIGHT - LEFT}" height="${BOTTOM - horizon}" fill="${colors[2]}"/>`
  for (let i = 0; i < 6; i++) {
    const y = horizon + 10 + i * i * 14 + i * 26
    const { fill, crest } = waterPath(y, amp * (0.4 + i * 0.25), 110 + i * 50)
    out += `<path d="${fill}" fill="${i % 2 ? colors[1] : colors[2]}"/><path d="${crest}" stroke="${colors[0]}" stroke-width="${2 + i * 0.6}" fill="none" opacity=".8"/>`
  }
  return out
}

export const theFloodLayers: Record<string, PaperLayerArt> = {
  'storm-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="ssky" x1="0" y1="${TOP}" x2="0" y2="700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#20263a"/>
          <stop offset=".6" stop-color="#3a4258"/>
          <stop offset="1" stop-color="#5a6276"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#ssky)"/>
      ${STORM_CLOUDS.map(([x, y, s]) => cloud(x, y, s, ['#4a526a', '#3a4258', '#2c3246'])).join('')}`,
  },

  'flood-rising': {
    bounds: bandFrom(500),
    shadow: true,
    svg: (() => {
      const { fill, crest } = waterPath(540, 16, 140)
      const low = waterPath(620, 12, 180)
      return `<path d="${fill}" fill="#3e5e7a"/><path d="${crest}" stroke="#a8c4d8" stroke-width="4" fill="none"/><path d="${low.fill}" fill="#34526e"/><path d="${low.crest}" stroke="#8aa8c0" stroke-width="3" fill="none" opacity=".7"/>`
    })(),
  },

  'gray-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="gsky" x1="0" y1="${TOP}" x2="0" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#6a7486"/>
          <stop offset="1" stop-color="#b4bcc4"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#gsky)"/>
      ${cloud(200, 80, 2.2, ['#9aa2b0', '#8a92a2', '#7a8294'])}${cloud(1000, 30, 2.6, ['#9aa2b0', '#8a92a2', '#7a8294'])}`,
  },

  'open-sea': {
    bounds: bandFrom(440),
    shadow: false,
    svg: sea(470, ['#c8d8e4', '#4a6a86', '#3a5a76'], 14),
  },
}
