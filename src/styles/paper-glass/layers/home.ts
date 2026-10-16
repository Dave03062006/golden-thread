import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { BOTTOM, FULL, LEFT, RIGHT, TOP, bandFrom } from '../frame'
import { cloud, hillCrest, hills } from '../shapes'

/**
 * Level 1, Episode 5: the first family's home outside the garden, on a hillside. Cain's
 * field lies to the left, ploughed in furrows; Abel's pasture rises to the right, with a
 * stone fold for the sheep. A veil of evening falls over it as the story darkens.
 */

const FAR = [470, 446, 430, 452, 476, 458, 440, 452, 470, 450, 436, 452, 472]
const NEAR = [560, 556, 552, 556, 560, 552, 540, 530, 520, 512, 506, 512, 520]

/** Furrows across the field on the left, curving with the hill. */
function furrows(): string {
  let out = ''
  for (let i = 0; i < 9; i++) {
    const y = 600 + i * 34 + i * i * 2
    out += `<path d="M${LEFT} ${y}C200 ${y - 10} 420 ${y + 6} 640 ${y + 18}" stroke="#7a5236" stroke-width="${2 + i * 0.5}" fill="none" opacity=".7"/>`
  }
  return out
}

/** Grass tufts and small flowers across the pasture on the right. */
function tufts(): string {
  const rng = createRng(512)
  let out = ''
  for (let i = 0; i < 40; i++) {
    const x = 760 + rng.next() * (RIGHT - 760)
    const y = 560 + rng.next() * 440
    const s = 0.6 + (y - 560) / 300
    out += `<path d="M${x.toFixed(0)} ${y.toFixed(0)}l${(-4 * s).toFixed(1)} ${(-9 * s).toFixed(1)}M${x.toFixed(0)} ${y.toFixed(0)}l${(1 * s).toFixed(1)} ${(-11 * s).toFixed(1)}M${x.toFixed(0)} ${y.toFixed(0)}l${(5 * s).toFixed(1)} ${(-8 * s).toFixed(1)}" stroke="#3e7a3a" stroke-width="${(1.4 * s).toFixed(1)}" fill="none"/>`
    if (i % 5 === 0) out += `<circle cx="${x.toFixed(0)}" cy="${(y - 10 * s).toFixed(0)}" r="${(2.4 * s).toFixed(1)}" fill="#fff4d0"/>`
  }
  return out
}

/** The sheepfold: a ring of piled stones with a gap for a gate, facing the hillside. */
function fold(): string {
  const rng = createRng(77)
  const cx = 1240
  const cy = 700
  const rx = 190
  const ry = 64
  let out = `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 10}" ry="${ry - 8}" fill="#5a8a4a"/>`
  for (let a = 0; a < 360; a += 7) {
    // The gate, toward the hillside on the left.
    if (a > 150 && a < 200) continue
    const t = (a * Math.PI) / 180
    const x = cx + Math.cos(t) * rx
    const y = cy + Math.sin(t) * ry
    const r = 11 + rng.next() * 5
    const shade = ['#9a9080', '#8a8070', '#aaa090'][Math.floor(rng.next() * 3)]
    out += `<ellipse cx="${x.toFixed(0)}" cy="${(y - 6).toFixed(0)}" rx="${r.toFixed(1)}" ry="${(r * 0.7).toFixed(1)}" fill="${shade}"/>`
  }
  return out
}

export const homeLayers: Record<string, PaperLayerArt> = {
  'home-sky': {
    bounds: FULL,
    shadow: false,
    resolution: 0.4,
    svg: `
      <defs>
        <linearGradient id="sky" x1="0" y1="${TOP}" x2="0" y2="620" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#6aa0d0"/>
          <stop offset=".6" stop-color="#b8d4e0"/>
          <stop offset="1" stop-color="#f0dcb0"/>
        </linearGradient>
      </defs>
      <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="${BOTTOM - TOP}" fill="url(#sky)"/>
      ${cloud(420, 110, 1.8, ['#ffffff', '#f2f4f8', '#dde4ec'])}
      ${cloud(1260, 60, 2.2, ['#ffffff', '#f2f4f8', '#dde4ec'])}`,
  },

  'home-hills': {
    bounds: bandFrom(400),
    shadow: true,
    svg: `
      <path d="${hills(FAR)}" fill="#8aa078"/>
      <path d="${hillCrest(FAR)}" fill="none" stroke="#e0ead0" stroke-width="2.5" opacity=".6"/>`,
  },

  // The hillside: Cain's ploughed field on the left, Abel's pasture on the right.
  'home-land': {
    bounds: bandFrom(500),
    shadow: true,
    svg: `
      <defs>
        <linearGradient id="field" x1="${LEFT}" y1="0" x2="${RIGHT}" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#a87a50"/>
          <stop offset=".36" stop-color="#9a7048"/>
          <stop offset=".46" stop-color="#7aa858"/>
          <stop offset="1" stop-color="#6a9a4c"/>
        </linearGradient>
      </defs>
      <path d="${hills(NEAR)}" fill="url(#field)"/>
      <path d="${hillCrest(NEAR)}" fill="none" stroke="#f0e0b0" stroke-width="2.5" opacity=".6"/>
      ${furrows()}
      ${tufts()}`,
  },

  'home-fold': {
    bounds: { x: 1000, y: 600, w: 500, h: 180 },
    shadow: true,
    svg: fold(),
  },
}
