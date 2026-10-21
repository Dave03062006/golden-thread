import type { PaperPropArt } from '../art'

/** Props of Level 5, Episode 6: an Egyptian wagon, sent by Joseph to carry his father. */

const TAU = Math.PI * 2
const wagon: PaperPropArt = {
  box: { x: 0, y: 0, w: 140, h: 80 },
  facing: -1,
  poses: ['idle', 'walk'],
  anchor: 'base',
  parts: [
    { id: 'bed', svg: `<path d="M20 26L124 26L118 50L26 50Z" fill="#a8743a"/><path d="M24 34L120 34" stroke="#e0b060" stroke-width="3"/><path d="M30 14L60 14L64 26L28 26ZM70 10L104 10L108 26L68 26Z" fill="#d8c09a"/><path d="M2 44L28 40" stroke="#8a6a3a" stroke-width="5" stroke-linecap="round"/>` },
    ...[44, 102].map((x, i) => ({ id: `wheel-${i}`, pivot: { x, y: 60 }, svg: `<circle cx="${x}" cy="60" r="18" fill="none" stroke="#6a4a2a" stroke-width="5"/><path d="M${x - 17} 60L${x + 17} 60M${x} 43L${x} 77" stroke="#6a4a2a" stroke-width="3"/>` })),
  ],
  animate: (part, pose, time) => (part.startsWith('wheel') && pose === 'walk' ? { rotate: -((time * 180) % 360) } : part === 'bed' && pose === 'walk' ? { y: 0.8 * Math.sin(time * TAU * 2) } : {}),
}

export const goshenProps: Record<string, PaperPropArt> = { wagon }
