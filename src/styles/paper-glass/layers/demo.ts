import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, LEFT, OVER_Y, RIGHT } from '../frame'
import { cloud, rays, waterPath } from '../shapes'

/** The milestone 1 demo: evening over the waters, with Ararat's two peaks behind. */

function stars(): string {
  const rng = createRng(77)
  let out = ''
  for (let i = 0; i < 46; i++) {
    const x = LEFT + rng.next() * 1300
    const y = -OVER_Y + rng.next() * 520
    const r = 1.6 + rng.next() * 3.4
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" opacity="${(0.35 + rng.next() * 0.65).toFixed(2)}"/>`
  }
  return out
}

const SUN = { x: 1336, y: 470 }

const back = waterPath(690, 24, 120)
const mid = waterPath(752, 30, 176)
const front = waterPath(818, 38, 240)

export const demoLayers: Record<string, PaperLayerArt> = {
  'evening-sky': {
    bounds: { x: LEFT, y: -OVER_Y, w: RIGHT - LEFT, h: BOTTOM + OVER_Y },
    shadow: false,
    resolution: 0.5,
    svg: `
      <defs>
        <radialGradient id="sky" cx="${SUN.x}" cy="${SUN.y}" r="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff6d8"/>
          <stop offset=".06" stop-color="#ffe08a"/>
          <stop offset=".15" stop-color="#ffb35c"/>
          <stop offset=".28" stop-color="#f2667a"/>
          <stop offset=".45" stop-color="#b2408f"/>
          <stop offset=".64" stop-color="#5b2e96"/>
          <stop offset=".84" stop-color="#2a2470"/>
          <stop offset="1" stop-color="#171a4f"/>
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="36"/></filter>
      </defs>
      <rect x="${LEFT}" y="${-OVER_Y}" width="${RIGHT - LEFT}" height="${BOTTOM + OVER_Y}" fill="url(#sky)"/>
      <g fill="#fff2c4" opacity=".09">${rays(SUN.x, SUN.y)}</g>
      <g fill="#fff4dc">${stars()}</g>
      <circle cx="${SUN.x}" cy="${SUN.y}" r="170" fill="#ffe7a6" opacity=".55" filter="url(#glow)"/>
      <circle cx="${SUN.x}" cy="${SUN.y}" r="86" fill="#fff4d2"/>`,
  },

  'evening-clouds': {
    bounds: { x: 1000, y: -OVER_Y, w: RIGHT - 1000, h: 560 },
    shadow: true,
    resolution: 0.75,
    svg: `
      ${cloud(1190, 40, 3, ['#ff9db8', '#f06f9a', '#c94f87'])}
      ${cloud(1390, 270, 1.7, ['#ffd0a0', '#ffa47e', '#f2667a'])}`,
  },

  'far-hills': {
    bounds: { x: LEFT, y: 320, w: RIGHT - LEFT, h: BOTTOM - 320 },
    shadow: true,
    svg: `
      <path d="M${LEFT} ${BOTTOM}L${LEFT} 650C-60 610 120 560 304 440L384 375C400 360 416 352 432 360L472 389C536 440 600 490 672 526C760 562 856 562 912 526C944 497 968 475 992 461C1008 454 1024 454 1040 464C1080 497 1144 562 1272 612C1384 641 1496 652 1600 655L${RIGHT} 660L${RIGHT} ${BOTTOM}Z" fill="#6a3fb0"/>
      <path d="M360 389L384 375C400 360 416 352 432 360L472 389L448 400L424 382L400 403L380 392Z" fill="#eadcff"/>
      <path d="M964 479C976 468 988 457 1000 455C1012 453 1028 456 1040 464L1056 477L1032 484L1012 472L992 487L976 479Z" fill="#eadcff"/>
      <path d="M${LEFT} 650C-60 610 120 560 304 440L384 375M472 389C536 440 600 490 672 526C760 562 856 562 912 526M1040 464C1080 497 1144 562 1272 612C1384 641 1496 652 1600 655" fill="none" stroke="#ff9db8" stroke-width="3" opacity=".45"/>`,
  },

  'water-back': {
    bounds: { x: LEFT, y: 640, w: RIGHT - LEFT + 140, h: BOTTOM - 640 },
    shadow: true,
    svg: `<path d="${back.fill}" fill="#2f86b5"/><path d="${back.crest}" fill="none" stroke="#9be3f2" stroke-width="3.5" opacity=".75"/>`,
  },

  'water-mid': {
    bounds: { x: LEFT, y: 700, w: RIGHT - LEFT + 190, h: BOTTOM - 700 },
    shadow: true,
    svg: `<path d="${mid.fill}" fill="#2563a0"/><path d="${mid.crest}" fill="none" stroke="#7cc8ea" stroke-width="3" opacity=".6"/>`,
  },

  'water-front': {
    bounds: { x: LEFT, y: 760, w: RIGHT - LEFT + 250, h: BOTTOM - 760 },
    shadow: true,
    svg: `<path d="${front.fill}" fill="#1b3f7c"/>`,
  },
}
