import type { PaperPropArt, PartMotion } from '../art'

/**
 * Props of Level 2, Episode 1: the crowds of the city at dusk. A crowd is a knot of four
 * silhouettes, shoulder to shoulder, caught by the red light of the fires. They walk
 * left, the other way from Noah; the world going its own way.
 */

const TAU = Math.PI * 2
const DARK = '#1e1420'
const RIM = '#e07a4a'

/** One silhouette at x, of height h (its feet at the bottom of the box), facing left. */
function figure(x: number, h: number, cloak: string): string {
  const top = 120 - h
  const s = h / 110
  return `
    <circle cx="${x}" cy="${top + 10 * s}" r="${8.5 * s}" fill="${DARK}"/>
    <path d="M${x - 11 * s} ${top + 22 * s}C${x - 6 * s} ${top + 18 * s} ${x + 7 * s} ${top + 18 * s} ${x + 12 * s} ${top + 22 * s}L${x + 15 * s} 116L${x - 14 * s} 116Z" fill="${cloak}"/>
    <path d="M${x - 11 * s} ${top + 24 * s}L${x - 14 * s} 114M${x - 8 * s} ${top + 4 * s}C${x - 11 * s} ${top + 8 * s} ${x - 11 * s} ${top + 13 * s} ${x - 8 * s} ${top + 17 * s}" stroke="${RIM}" stroke-width="${1.6 * s}" fill="none" opacity=".85"/>`
}

const crowd: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 120 },
  facing: -1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'back', svg: `${figure(40, 104, '#2a1a26')}${figure(98, 108, '#2e1e22')}` },
    { id: 'front', svg: `${figure(18, 96, '#3a2228')}${figure(68, 112, '#34202a')}${figure(122, 98, '#3a2622')}` },
  ],
  animate(part, pose, time): PartMotion {
    // Walking, they bob out of step with each other; standing, they shift their weight.
    const speed = pose === 'walk' ? 1.6 : 0.3
    const bob = Math.abs(Math.sin(time * TAU * speed + (part === 'back' ? 1.3 : 0)))
    return { y: pose === 'walk' ? -2.4 * bob : 0.6 * Math.sin(time * TAU * speed) }
  },
}

export const worldGoneWrongProps: Record<string, PaperPropArt> = { crowd }
