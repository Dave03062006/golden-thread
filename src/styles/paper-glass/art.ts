import { createRng } from '../../engine/random'
import type { StyleArtIndex } from '../contract'

/**
 * Paper & Glass art for scenes. Each layer is a piece of SVG drawn in "frame units":
 * the visible frame is 1600 × 900, and layers reach past its edges so the camera can
 * drift without showing a gap. When a scene loads, each layer is turned into a sharp
 * image once (see raster.ts); animation then only moves those images.
 */

export const FRAME_W = 1600
export const FRAME_H = 900

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface PaperLayerArt {
  /** The part of the world this layer covers, in frame units. Only this part is drawn. */
  bounds: Box
  /** SVG markup in frame units. */
  svg: string
  /** Cut paper casts a soft shadow onto the layer behind it. The sky doesn't. */
  shadow: boolean
  /** Soft layers (like the sky) can be drawn at lower resolution to save memory. */
  resolution?: number
}

export interface PaperPropPart {
  id: string
  svg: string
  /** The joint this part turns around, in the prop's own units. */
  pivot?: { x: number; y: number }
}

export interface PaperPropArt {
  /** The prop's own drawing space. Its width is what the actor's `size` refers to. */
  box: Box
  /** Which way the drawing faces: -1 left, 1 right. */
  facing: -1 | 1
  parts: PaperPropPart[]
}

/** Overscan: how far layers reach past the frame on each side. */
const OVER_X = 240
const OVER_Y = 135
const LEFT = -OVER_X
const RIGHT = FRAME_W + OVER_X
const BOTTOM = FRAME_H + OVER_Y

/** A wavy top edge from LEFT to RIGHT, then down and around: a band of water. */
function waterPath(y: number, amp: number, period: number): { fill: string; crest: string } {
  let crest = `M${LEFT} ${y}`
  for (let x = LEFT; x < RIGHT; x += period) {
    crest += `Q${x + period / 4} ${y - amp} ${x + period / 2} ${y}T${x + period} ${y}`
  }
  return { crest, fill: `${crest}L${RIGHT + period} ${BOTTOM}L${LEFT} ${BOTTOM}Z` }
}

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

function rays(cx: number, cy: number): string {
  let out = ''
  for (let i = 0; i < 18; i += 2) {
    const a = Math.PI + ((i + 0.5) / 18) * Math.PI
    const w = 0.03
    const r = 2400
    const p1 = `${(cx + Math.cos(a - w) * r).toFixed(1)} ${(cy + Math.sin(a - w) * r).toFixed(1)}`
    const p2 = `${(cx + Math.cos(a + w) * r).toFixed(1)} ${(cy + Math.sin(a + w) * r).toFixed(1)}`
    out += `<path d="M${cx} ${cy}L${p1}L${p2}Z"/>`
  }
  return out
}

/** The layered "cloud of many edges" motif (inspired by the mega mendung batik clouds). */
const CLOUD = 'M6 34C0 34 0 24 8 23C6 13 20 9 28 15C30 5 46 1 54 10C60 2 76 2 80 12C88 6 102 9 102 19C112 18 118 26 112 34Z'
function cloud(x: number, y: number, scale: number, colors: [string, string, string]): string {
  const [outer, middle, inner] = colors
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="${CLOUD}" fill="${outer}"/>
    <path d="${CLOUD}" fill="${middle}" transform="translate(12.5 7.5) scale(.78)"/>
    <path d="${CLOUD}" fill="${inner}" transform="translate(25.1 15) scale(.56)"/>
  </g>`
}

const SUN = { x: 1336, y: 470 }

const back = waterPath(690, 24, 120)
const mid = waterPath(752, 30, 176)
const front = waterPath(818, 38, 240)

export const paperLayers: Record<string, PaperLayerArt> = {
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

/** The dove: a paper puppet whose near wing turns at the shoulder. It faces left. */
export const paperProps: Record<string, PaperPropArt> = {
  dove: {
    box: { x: -12, y: -4, w: 74, h: 40 },
    facing: -1,
    parts: [
      {
        id: 'body',
        svg: `
          <path d="M24 18C24 10 20 5 13 1L16 8L11 7L16 12C19 15 21 17 24 18Z" fill="#ded3ee"/>
          <path d="M42 20L58 14L56 21L59 27L42 26Z" fill="#efe9f7"/>
          <path d="M9 20C10 15 17 14 19 18C26 18 36 18 44 20L44 26C36 30 22 31 15 27C12 26 10 24 9 23Z" fill="#fffaf2"/>
          <path d="M3.5 21.8L9 20L9 23Z" fill="#ffb35c"/>
          <path d="M4.5 22.5Q1 26 -4 29" stroke="#3d7a3a" stroke-width="1" fill="none"/>
          <path d="M3 24Q-1.15 25.62 -1.41 30.06Q2.73 28.44 3 24Z" fill="#5cb86a"/>
          <path d="M0 26.5Q-2.15 30.16 0.5 33.48Q2.64 29.82 0 26.5Z" fill="#79cf7d"/>
          <path d="M-3 28.5Q-7.1 27.41 -9.6 30.85Q-5.49 31.93 -3 28.5Z" fill="#46a05a"/>
          <circle cx="11.6" cy="19.6" r="1" fill="#2b1b3a"/>`,
      },
      {
        id: 'wing',
        pivot: { x: 22, y: 19 },
        svg: `
          <path d="M20 19C22 10 28 4 38 0L36 6L42 4L39 10L45 9L40 15L44 16C38 20 30 21 20 19Z" fill="#fffdf8"/>
          <path d="M27 17.6C31 14 35 11 40.5 7.4M30.5 18.6C34 16 37.5 14 42.5 11.8" stroke="#cdbfe0" stroke-width=".55" fill="none"/>`,
      },
    ],
  },
}

/** How a puppet part moves over time: the dove's near wing beats. */
export function partPose(prop: string, part: string, time: number): { rotate: number } {
  if (prop === 'dove' && part === 'wing') return { rotate: 8 + 20 * Math.sin(time * Math.PI * 2 * 2.2) }
  return { rotate: 0 }
}

export const paperArtIndex: StyleArtIndex = {
  style: 'paper-glass',
  layers: Object.keys(paperLayers),
  props: Object.keys(paperProps),
}
