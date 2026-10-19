import { createRng } from '../../../engine/random'
import type { PaperLayerArt } from '../art'
import { FULL } from '../frame'

/**
 * Level 3, Episode 4: "number the stars, if you are able to number them." Three fields of
 * stars, each denser than the last, fade in as the counting runs away; then the Milky Way
 * spills across the whole sky.
 */

function field(seed: number, count: number, size: [number, number], colors: string[]): string {
  const rng = createRng(seed)
  let out = ''
  for (let i = 0; i < count; i++) {
    const x = -200 + rng.next() * 2000
    const y = -120 + rng.next() * 760
    const r = size[0] + rng.next() * (size[1] - size[0])
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${colors[i % colors.length]}"/>`
  }
  return out
}

/** The Milky Way: a soft band of light across the sky, thick with tiny stars. */
function milkyWay(): string {
  const rng = createRng(77)
  let stars = ''
  for (let i = 0; i < 900; i++) {
    const t = rng.next()
    const x = -200 + t * 2000
    const band = 120 + t * 420
    const y = band + (rng.next() + rng.next() - 1) * 120
    stars += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(0.8 + rng.next() * 1.4).toFixed(1)}" fill="#f4f0ff" opacity="${(0.4 + rng.next() * 0.6).toFixed(2)}"/>`
  }
  return `<defs><filter id="milky" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="40"/></filter></defs>
    <path d="M-200 60L1800 500L1800 660L-200 220Z" fill="#b8b0e0" opacity=".28" filter="url(#milky)"/>
    <path d="M-200 110L1800 550L1800 610L-200 170Z" fill="#f0e8ff" opacity=".2" filter="url(#milky)"/>${stars}`
}

export const countTheStarsLayers: Record<string, PaperLayerArt> = {
  'star-field-1': { bounds: FULL, shadow: false, resolution: 0.5, svg: field(11, 70, [1.6, 3], ['#ffffff', '#fff2c0', '#e0e8ff']) },
  'star-field-2': { bounds: FULL, shadow: false, resolution: 0.5, svg: field(23, 220, [1.1, 2.4], ['#ffffff', '#fff2c0', '#e0e8ff', '#ffe0e0']) },
  'star-field-3': { bounds: FULL, shadow: false, resolution: 0.5, svg: field(37, 600, [0.8, 1.8], ['#ffffff', '#e8ecff', '#fff4d0']) },
  'milky-way': { bounds: FULL, shadow: false, resolution: 0.5, svg: milkyWay() },
}
