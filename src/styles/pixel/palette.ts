/**
 * The pixel style's colors: the "Sweetie 16" palette by GrafxKid, plus a few browns and
 * sands. Pixel art looks best with a small, fixed set of colors.
 */
export const C = {
  ink: '#1a1c2c',
  purple: '#5d275d',
  rose: '#b13e53',
  orange: '#ef7d57',
  gold: '#ffcd75',
  lime: '#a7f070',
  green: '#38b764',
  teal: '#257179',
  navy: '#29366f',
  blue: '#3b5dc9',
  sky: '#41a6f6',
  cyan: '#73eff7',
  white: '#f4f4f4',
  pale: '#94b0c2',
  slate: '#566c86',
  dslate: '#333c57',
  wood0: '#2a1a1c',
  wood1: '#55301f',
  wood2: '#8a4f2c',
  wood3: '#c07a41',
  sand: '#e0b46e',
  sand2: '#cc9a58',
} as const

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]

/** The ordered-dithering threshold at a pixel, from 0 to 1. Blends two colors in a checker-like pattern. */
export function dither(x: number, y: number): number {
  return (BAYER[(y & 3) * 4 + (x & 3)]! + 0.5) / 16
}

/** A repeatable pseudo-random number from 0 to 1 for a given input. */
export function hash(n: number): number {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return v - Math.floor(v)
}
