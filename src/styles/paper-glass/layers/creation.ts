import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { hillCrest, hills, sparkle, stars, waterPath } from '../shapes'

/**
 * Level 1, Episode 1: the world of the six days, as cut and backlit paper. The palette is
 * Age I's: dawn gold, Eden green and deep indigo night (spec §9.3).
 *
 * Light comes from the top-left corner, where the first light of day one comes to rest,
 * so every later day is lit from that point.
 */

/** Where the first light rests, in frame units (see episode-1.ts). */
const LIGHT = { x: 120, y: 90 }

/** The crest heights of the land, from LEFT to RIGHT. */
const LAND = [522, 474, 452, 478, 506, 474, 452, 470, 498, 470, 448, 468, 516]
const GRASS = LAND.map((h) => h + 4)

const seaFar = waterPath(540, 6, 84)
const seaMid = waterPath(600, 11, 150)
const seaNear = waterPath(722, 17, 230)

/** The underside of the waters above: a dome, highest in the middle. */
const DOME = `M${LEFT} 290C200 40 1400 40 ${RIGHT} 290`

/** Light rays fanning from the first light down across the world. */
function lightRays(): string {
  const beams: [number, number][] = [
    [0.18, 0.05],
    [0.32, 0.035],
    [0.47, 0.06],
    [0.63, 0.03],
    [0.8, 0.05],
    [0.98, 0.04],
  ]
  return beams
    .map(([angle, width]) => {
      const a1 = angle - width
      const a2 = angle + width
      const r = 2600
      return `<path d="M${LIGHT.x} ${LIGHT.y}L${(LIGHT.x + Math.cos(a1) * r).toFixed(0)} ${(LIGHT.y + Math.sin(a1) * r).toFixed(0)}L${(LIGHT.x + Math.cos(a2) * r).toFixed(0)} ${(LIGHT.y + Math.sin(a2) * r).toFixed(0)}Z"/>`
    })
    .join('')
}

export const creationLayers: Record<string, PaperLayerArt> = {
  // Before anything: the deep, dark and formless.
  void: {
    bounds: FULL,
    shadow: false,
    resolution: 0.25,
    svg: `
      <defs>
        <linearGradient id="void" x1="0" y1="${TOP}" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0c0a2b"/>
          <stop offset=".55" stop-color="#090822"/>
          <stop offset="1" stop-color="#05040f"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#void)"/>`,
  },

  // Day one: light and darkness side by side, before there is any sky.
  'sky-light': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="dn" x1="${LEFT}" y1="0" x2="${RIGHT}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fbe9bd"/>
          <stop offset=".3" stop-color="#f2c991"/>
          <stop offset=".45" stop-color="#c58aa6"/>
          <stop offset=".55" stop-color="#6a4a9e"/>
          <stop offset=".7" stop-color="#2a2370"/>
          <stop offset="1" stop-color="#110e3a"/>
        </linearGradient>
        <radialGradient id="dawn" cx="${LIGHT.x}" cy="${LIGHT.y}" r="950" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fffdf4" stop-opacity=".95"/>
          <stop offset=".35" stop-color="#fff1cf" stop-opacity=".55"/>
          <stop offset="1" stop-color="#fff1cf" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dn)"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#dawn)"/>`,
  },

  // Day two: the sky opens, blue by day and deep violet by night.
  'sky-blue': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="sky" x1="${LEFT}" y1="0" x2="${RIGHT}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#8ccaf4"/>
          <stop offset=".32" stop-color="#5a9ee4"/>
          <stop offset=".47" stop-color="#6f6cc4"/>
          <stop offset=".58" stop-color="#3a2f8a"/>
          <stop offset=".75" stop-color="#1c1860"/>
          <stop offset="1" stop-color="#0f0d38"/>
        </linearGradient>
        <linearGradient id="horizon" x1="0" y1="${TOP}" x2="0" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0b0a30" stop-opacity=".35"/>
          <stop offset=".55" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset=".9" stop-color="#e6f6ff" stop-opacity=".45"/>
          <stop offset="1" stop-color="#fff4dc" stop-opacity=".6"/>
        </linearGradient>
        <radialGradient id="sun-side" cx="${LIGHT.x}" cy="${LIGHT.y}" r="800" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fffbea" stop-opacity=".9"/>
          <stop offset=".4" stop-color="#fff3d1" stop-opacity=".35"/>
          <stop offset="1" stop-color="#fff3d1" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#sky)"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#horizon)"/>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#sun-side)"/>`,
  },

  // Day four: the stars, thrown across the night side "almost in passing". Two layers
  // twinkle out of step with each other.
  'stars-a': {
    bounds: { x: 700, y: TOP, w: RIGHT - 700, h: 700 },
    shadow: false,
    svg: `<g fill="#fff6de">${stars(301, 90, { x: 760, y: TOP + 10, w: RIGHT - 780, h: 660 }, [1.4, 3.6])}</g>`,
  },
  'stars-b': {
    bounds: { x: 700, y: TOP, w: RIGHT - 700, h: 700 },
    shadow: false,
    svg: `
      <g fill="#e9e4ff">${stars(302, 60, { x: 740, y: TOP + 10, w: RIGHT - 760, h: 660 }, [1.2, 3])}</g>
      <g fill="#fffaf0">${[
        [960, 120, 11],
        [1210, 60, 9],
        [1480, 170, 13],
        [1690, 80, 8],
        [1100, 330, 7],
        [1560, 400, 9],
      ]
        .map(([x, y, r]) => sparkle(x!, y!, r!))
        .join('')}</g>`,
  },

  // Day two: the waters above, held up by the dome of the firmament. It rises out of the
  // sea, so it starts lowered behind the waves.
  firmament: {
    bounds: { x: LEFT, y: TOP, w: RIGHT - LEFT, h: 470 },
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="above" x1="0" y1="${TOP}" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0f3a66" stop-opacity="0"/>
          <stop offset=".09" stop-color="#16497c"/>
          <stop offset=".8" stop-color="#2a74ad"/>
          <stop offset="1" stop-color="#3a8cc2"/>
        </linearGradient>
        <filter id="rim-glow" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
      </defs>
      <path d="${DOME}L${RIGHT} ${TOP}L${LEFT} ${TOP}Z" fill="url(#above)"/>
      <g fill="none" stroke="#8fd3f0" stroke-linecap="round">
        <path d="M${LEFT} 240C220 0 1380 0 ${RIGHT} 240" stroke-width="3" opacity=".45"/>
        <path d="M${LEFT} 180C240 -45 1360 -45 ${RIGHT} 180" stroke-width="2.5" opacity=".35"/>
        <path d="M${LEFT} 115C260 -95 1340 -95 ${RIGHT} 115" stroke-width="2" opacity=".25"/>
      </g>
      <path d="${DOME}" fill="none" stroke="#dff7ff" stroke-width="16" opacity=".55" filter="url(#rim-glow)"/>
      <path d="${DOME}" fill="none" stroke="#f2fcff" stroke-width="5"/>
      <path d="M${LEFT} 304C200 54 1400 54 ${RIGHT} 304" fill="none" stroke="#bfe9ff" stroke-width="2" opacity=".6"/>`,
  },

  // The deep: three bands of sea.
  'sea-far': {
    bounds: bandFrom(520, 90),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="far" x1="0" y1="530" x2="0" y2="800" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#3a90bf"/>
          <stop offset="1" stop-color="#1f5f92"/>
        </linearGradient>
      </defs>
      <path d="${seaFar.fill}" fill="url(#far)"/>
      <path d="${seaFar.crest}" fill="none" stroke="#b5ecf7" stroke-width="3" opacity=".7"/>`,
  },

  // Day three: the dry land rises out of the sea. It starts lowered behind the waves.
  land: {
    bounds: bandFrom(430),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="earth" x1="0" y1="440" x2="0" y2="760" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#a8744a"/>
          <stop offset=".5" stop-color="#875a38"/>
          <stop offset="1" stop-color="#5d3c26"/>
        </linearGradient>
      </defs>
      <path d="${hills(LAND)}" fill="url(#earth)"/>
      <path d="${hills(LAND.map((h, i) => h + 34 + (i % 3) * 8))}" fill="#6e4730" opacity=".55"/>
      <path d="${hillCrest(LAND)}" fill="none" stroke="#f0be82" stroke-width="4" opacity=".8"/>`,
  },

  // Day three: the green that spreads over the land.
  grass: {
    bounds: bandFrom(430),
    shadow: false,
    svg: `
      <defs>
        <linearGradient id="green" x1="0" y1="440" x2="0" y2="740" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#78c75a"/>
          <stop offset=".45" stop-color="#4f9e45"/>
          <stop offset="1" stop-color="#2f6f37"/>
        </linearGradient>
      </defs>
      <path d="${hills(GRASS)}" fill="url(#green)"/>
      <path d="${hills(GRASS.map((h, i) => h + 30 + (i % 3) * 9))}" fill="#3f8a3d" opacity=".6"/>
      <path d="${hillCrest(GRASS)}" fill="none" stroke="#c4f08e" stroke-width="4" opacity=".85"/>
      <g fill="#fff1a8" opacity=".85">
        ${[
          [150, 540],
          [330, 520],
          [520, 548],
          [690, 528],
          [900, 540],
          [1080, 522],
          [1290, 534],
          [1470, 528],
        ]
          .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/><circle cx="${x! + 14}" cy="${y! + 8}" r="3"/>`)
          .join('')}
      </g>`,
  },

  'sea-mid': {
    bounds: bandFrom(580, 160),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="mid" x1="0" y1="590" x2="0" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#2669a3"/>
          <stop offset="1" stop-color="#173f73"/>
        </linearGradient>
      </defs>
      <path d="${seaMid.fill}" fill="url(#mid)"/>
      <path d="${seaMid.crest}" fill="none" stroke="#86d0ee" stroke-width="3" opacity=".6"/>`,
  },

  'sea-near': {
    bounds: bandFrom(695, 240),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="near" x1="0" y1="700" x2="0" y2="${BOTTOM}" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#18467c"/>
          <stop offset="1" stop-color="#0c2550"/>
        </linearGradient>
      </defs>
      <path d="${seaNear.fill}" fill="url(#near)"/>
      <path d="${seaNear.crest}" fill="none" stroke="#5fa8d8" stroke-width="3" opacity=".5"/>`,
  },

  // Day seven: soft light streaming from the first light over the finished world.
  'light-rays': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <radialGradient id="fade" cx="${LIGHT.x}" cy="${LIGHT.y}" r="1700" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fffbe8" stop-opacity=".5"/>
          <stop offset=".6" stop-color="#fff2c8" stop-opacity=".22"/>
          <stop offset="1" stop-color="#fff2c8" stop-opacity="0"/>
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>
      </defs>
      <g fill="url(#fade)" filter="url(#soft)">${lightRays()}</g>`,
  },

  // After day one, the night side of the world below the horizon lies in shadow.
  'night-veil': {
    bounds: { x: 560, y: 380, w: RIGHT - 560, h: BOTTOM - 380 },
    shadow: false,
    resolution: 0.25,
    svg: `
      <defs>
        <linearGradient id="veil" x1="640" y1="0" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0b0930" stop-opacity="0"/>
          <stop offset="1" stop-color="#0b0930" stop-opacity=".5"/>
        </linearGradient>
        <linearGradient id="veil-top" x1="0" y1="380" x2="0" y2="470" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#fff" stop-opacity="1"/>
        </linearGradient>
        <mask id="veil-mask"><rect x="560" y="380" width="${RIGHT - 560}" height="${BOTTOM - 380}" fill="url(#veil-top)"/></mask>
      </defs>
      <rect x="560" y="380" width="${RIGHT - 560}" height="${BOTTOM - 380}" fill="url(#veil)" mask="url(#veil-mask)"/>`,
  },

  // The darkness over the face of the deep, before the first word.
  darkness: {
    bounds: FULL,
    shadow: false,
    resolution: 0.1,
    svg: `<rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="#05040f"/>`,
  },
}

